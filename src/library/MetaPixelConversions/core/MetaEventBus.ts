import { BaseBus } from "./abstractions";
import { BaseHandler } from "./abstractions";
import { BaseEvent } from "./abstractions";

export default class MetaEventBus extends BaseBus {
  private handlerRegistry: Map<BaseHandler, BaseEvent>;
  private dependencies = {};
  private busInitialized = false;

  constructor() {
    super();
    this.handlerRegistry = new Map();
  }

  initialize(): void {}

  register(handler: BaseHandler, event: BaseEvent): void {
    this.handlers.push(handler);
    this.events.push(event);
  }

  handle(): void {
    this.handlers.forEach((handler, index) => {
      handler.handle(this.events[index]);
    });
  }

  addDependency(name: string, dependency: any): void {
    this.dependencies[name] = dependency;
  }

  injectDependencies(): void {
    // Inject dependencies to handlers
  }
}
