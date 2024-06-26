import {
  BaseBus,
  BaseEvent,
  ErrorHandler,
  EventHandler,
  MetaCustomEvent,
  MetaStandardEvent,
} from "./Abstractions";
import {
  BaseException,
  MetaEventBusException,
  MetaServerError,
  MetaRequestError,
  MetaRequestLimitError,
} from "./Exceptions";
import { MetaConversionsClient } from "./MetaClient";
import { TaskQueue, retry } from "../utils";

const MAX_EVENT_SENDING_RETRIES = 5;
const RETRY_DELAY = 1000;
const RETRY_BACKOFF = 2;

export class MetaEventBus extends BaseBus {
  private errorHandlerRegistry: Map<string, ErrorHandler<BaseEvent, BaseException>> = new Map();
  private handlerRegistry: Map<string, EventHandler<BaseEvent>> = new Map();
  private metaSdkClient: MetaConversionsClient | undefined;
  private taskQueue = new TaskQueue();
  private busInitialized = false;

  constructor(metaPixelAccessToken: string, pixelId: string, testEventCode?: string) {
    super(metaPixelAccessToken, pixelId, testEventCode);
  }

  initialize(): void {
    if (!this.metaPixelAccessToken || !this.pixelId) {
      throw new MetaEventBusException("Missing required environment variables");
    }

    try {
      this.metaSdkClient = MetaConversionsClient.getInstance(
        this.metaPixelAccessToken,
        this.pixelId,
        this.testEventCode
      );
    } catch (error) {
      throw new MetaEventBusException(`Error initializing Meta SDK client: ${(error as Error).message}`);
    }
    console.log(`bus initialized: ${JSON.stringify(this.metaSdkClient, null, 2)}`);
    this.busInitialized = true;
  }

  getHandlerRegistry<T extends BaseEvent>(): Map<string, EventHandler<T>> {
    return this.handlerRegistry;
  }

  getErrorHandlerRegistry<T extends BaseEvent, K extends BaseException>(): Map<string, ErrorHandler<T, K>> {
    return this.errorHandlerRegistry;
  }

  register<T extends BaseEvent>(eventClass: typeof BaseEvent, handler: EventHandler<T>): void {
    console.log("Registering event: ", eventClass.name);
    const eventName = eventClass.name;
    if (!eventName || eventName.trim() === "") {
      throw new MetaEventBusException("Unable to register event, provide a valid event class");
    }
    this.handlerRegistry.set(eventName, handler as EventHandler<BaseEvent>);
  }

  registerErrorHandler<T extends BaseEvent, K extends BaseException>(
    errorClass: new () => K,
    errHandler: ErrorHandler<T, K>
  ): void {
    const exceptionName = errorClass.name;
    if (!exceptionName || exceptionName.trim() === "") {
      throw new MetaEventBusException("Unable to register error handler, provide a valid exception class");
    }
    this.errorHandlerRegistry.set(exceptionName, errHandler as ErrorHandler<BaseEvent, BaseException>);
  }

  async handle(event: MetaStandardEvent | MetaCustomEvent): Promise<any> {
    console.log("Handling event: ", event.constructor.name);
    return this.taskQueue.enqueue(() => this.processEvent(event));
  }

  private async processEvent(event: MetaStandardEvent | MetaCustomEvent): Promise<any> {
    if (!this.busInitialized) {
      throw new MetaEventBusException("Bus not initialized");
    }
    const handlerFn = this.handlerRegistry.get(event.constructor.name);
    if (!handlerFn) {
      throw new MetaEventBusException(`No handler registered for event ${event.constructor.name}`);
    }

    try {
      console.log("---> Processing event: ", event.constructor.name);
      return await handlerFn(event, this.metaSdkClient);
    } catch (error) {
      return this.handleErrors(event, handlerFn, error);
    }
  }

  async handleErrors<T extends BaseEvent, K extends BaseException>(
    event: T,
    errHandler: any,
    error: K
  ): Promise<any> {
    if (error instanceof MetaServerError || error instanceof MetaRequestError) {
      console.log("Attempting to retry...");
      try {
        const result = await retry(
          () => errHandler(event, this.metaSdkClient),
          MAX_EVENT_SENDING_RETRIES,
          RETRY_DELAY,
          RETRY_BACKOFF
        );
        console.log("Retry successful");
        return { success: true, metadata: result };
      } catch (retryError) {
        console.log("Retry failed after maximum attempts: ", retryError.message);
        return { success: false, metadata: { message: retryError.message } };
      }
    }
    if (error instanceof MetaRequestLimitError) {
      console.log("Handling MetaRequestLimitError ......", error.errorData);
      console.log("Finished handling MetaRequestLimitError ......");
      return Promise.resolve();
    }
    return Promise.reject(error);
  }
}
