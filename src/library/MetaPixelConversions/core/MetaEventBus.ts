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
    console.log(`Bus initialized: ${JSON.stringify(this.metaSdkClient)}`);
    this.busInitialized = true;
  }

  getHandlerRegistry<T extends BaseEvent>(): Map<string, EventHandler<T>> {
    return this.handlerRegistry;
  }

  getErrorHandlerRegistry<T extends BaseEvent, K extends BaseException>(): Map<string, ErrorHandler<T, K>> {
    return this.errorHandlerRegistry;
  }

  register<T extends BaseEvent>(eventClass: typeof BaseEvent, handler: EventHandler<T>): void {
    console.log(`Registering event: ${eventClass.name}`);
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
    console.log(`Handling event: ${event.constructor.name}`);
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
      return await handlerFn(event, this.metaSdkClient);
    } catch (error) {
      return this.handleErrors(event, handlerFn, error as BaseException);
    }
  }

  async handleErrors<T extends BaseEvent, K extends BaseException>(
    event: T,
    errHandler: any,
    error: K
  ): Promise<any> {
    if (error instanceof MetaServerError || error instanceof MetaRequestError) {
      console.log(`Sending event: '${event.constructor.name}' failed, retrying ...`);
      try {
        const result = await retry(
          () => errHandler(event, this.metaSdkClient),
          MAX_EVENT_SENDING_RETRIES,
          RETRY_DELAY,
          RETRY_BACKOFF
        );
        return { success: true, metadata: result };
      } catch (retryError: any) {
        return { success: false, metadata: { message: retryError.message } };
      }
    }
    if (error instanceof MetaRequestLimitError) {
      return Promise.resolve();
    }
    return Promise.reject(error);
  }
}
