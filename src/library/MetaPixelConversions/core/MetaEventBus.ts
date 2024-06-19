import { BaseBus, BaseHandler, BaseEvent } from "./Abstractions";
import MetaConversionsClient from "./MetaClient";
import { config } from "dotenv-esm";

config();

// eslint-disable-next-line no-undef
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
// eslint-disable-next-line no-undef
const PIXEL_ID = process.env.PIXEL_ID;

export default class MetaEventBus implements BaseBus {
  private handlerRegistry: Map<string, new () => BaseHandler> = new Map();

  private busInitialized = false;

  initialize(): void {
    if (!META_ACCESS_TOKEN || !PIXEL_ID) {
      throw new Error("MetaEventBusException: Missing required environment variables");
    }

    this.busInitialized = true;
  }

  getHandlerRegistry(): Map<string, new () => BaseHandler> {
    return this.handlerRegistry;
  }

  register(eventName: string, handler: new () => BaseHandler): void {
    this.handlerRegistry.set(eventName, handler);
  }

  handle(event: BaseEvent): void {
    if (!this.busInitialized) {
      throw new Error("MetaEventBusException: Bus not initialized");
    }

    const handlerClass = this.handlerRegistry.get(event.constructor.name);

    if (!handlerClass) {
      throw new Error(`No handler registered for event ${event.constructor.name}`);
    }

    const handler = new handlerClass();
    console.log(handler.sayHello());

    // const handler = new handlerClass();
    // handler.handle(event);
  }

  // addDependency(name: string, dependency: any): void {
  //   this.dependencies[name] = dependency;
  // }

  // injectDependencies(): void {
  //   // Inject dependencies to handlers
  // }
}
