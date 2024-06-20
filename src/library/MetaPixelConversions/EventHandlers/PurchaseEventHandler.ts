import { BaseHandler } from "../core/Abstractions";
import PurchaseEvent from "../StandardEvents/PurchaseEvent";
import { EventHandlerException } from "../core/Exceptions";

export default class PurchaseEventHandler extends BaseHandler {
  constructor(client: any) {
    super(client);
  }

  async handle(event: PurchaseEvent): Promise<any> {
    try {
      return await this.client.sendEvent(event.buildEvent());
    } catch (error) {
      if (error instanceof Error) {
        throw new EventHandlerException(`Error handling Purchase event: ${error.message}`);
      }
      throw new EventHandlerException("Unknown error");
    }
  }
}
