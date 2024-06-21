import { BaseHandler } from "../core/Abstractions";
import { AddToCartEvent } from "../StandardEvents";
import { EventHandlerException } from "../core/Exceptions";

export default class AddToCartEventHandler extends BaseHandler {
  constructor(client: any) {
    super(client);
  }

  async handle(event: AddToCartEvent): Promise<any> {
    try {
      return await this.client.sendEvent(event.buildEvent());
    } catch (error) {
      throw new EventHandlerException(`Error handling event '${event.eventName}': ${error.message}`);
    }
  }
}
