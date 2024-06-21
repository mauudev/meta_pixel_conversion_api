import { BaseHandler } from "../core/Abstractions";
import { AbandonedCheckoutEvent } from "../CustomEvents";
import { EventHandlerException } from "../core/Exceptions";

export default class AbandonedCheckoutEventHandler extends BaseHandler {
  constructor(client: any) {
    super(client);
  }

  async handle(event: AbandonedCheckoutEvent): Promise<any> {
    try {
      return await this.client.sendEvent(event.buildEvent());
    } catch (error) {
      throw new EventHandlerException(`Error handling event '${event.eventName}': ${error.message}`);
    }
  }
}
