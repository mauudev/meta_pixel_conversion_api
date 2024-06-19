import { BaseBus, BaseHandler, BaseEvent } from "./Abstractions";
import MetaConversionsClient from "./MetaClient";
import { config } from "dotenv-esm";

config();

// eslint-disable-next-line no-undef
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
// eslint-disable-next-line no-undef
const PIXEL_ID = process.env.PIXEL_ID;
// eslint-disable-next-line no-undef
const TEST_EVENT_CODE = process.env.TEST_EVENT_CODE;

export default class MetaEventBus implements BaseBus {
  private handlerRegistry: Map<string, new (client: any) => BaseHandler> = new Map();

  private busInitialized = false;

  initialize(): void {
    if (!META_ACCESS_TOKEN || !PIXEL_ID) {
      throw new Error("MetaEventBusException: Missing required environment variables");
    }

    this.busInitialized = true;
  }

  getHandlerRegistry(): Map<string, new (client: any) => BaseHandler> {
    return this.handlerRegistry;
  }

  register(eventName: string, handler: new (client: any) => BaseHandler): void {
    this.handlerRegistry.set(eventName, handler);
  }

  async handle(event: BaseEvent): Promise<any> {
    if (!this.busInitialized) {
      throw new Error("MetaEventBusException: Bus not initialized");
    }

    const handlerClass = this.handlerRegistry.get(event.constructor.name);

    if (!handlerClass) {
      throw new Error(`No handler registered for event ${event.constructor.name}`);
    }

    const client = MetaConversionsClient.getInstance(META_ACCESS_TOKEN, PIXEL_ID, TEST_EVENT_CODE);
    const handler = new handlerClass(client);
    return await handler.handle(event);
  }

  // addDependency(name: string, dependency: any): void {
  //   this.dependencies[name] = dependency;
  // }

  // injectDependencies(): void {
  //   // Inject dependencies to handlers
  // }
}
