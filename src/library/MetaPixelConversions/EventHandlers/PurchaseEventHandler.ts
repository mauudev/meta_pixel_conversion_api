import { BaseHandler } from "../core/Abstractions";
import PurchaseEvent from "../StandardEvents/PurchaseEvent";
import { EventHandlerException } from "../core/Exceptions";

export default class PurchaseEventHandler extends BaseHandler {
  constructor(client: any) {
    super(client);
  }

  public handle(event: PurchaseEvent): void {
    try {
      this.client.sendEvent(event.buildEvent());
    } catch (error) {
      if (error instanceof Error) {
        throw new EventHandlerException(`Error handling purchase event: ${error.message}`);
      }
      throw new EventHandlerException("Unknown error");
    }
  }

  public sayHello(): string {
    return "Hello";
  }
}
