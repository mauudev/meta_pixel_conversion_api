import { BaseHandler } from "../core/Abstractions";
import { ContactEvent } from "../StandardEvents";
import { EventHandlerException } from "../core/Exceptions";

export default class ContactEventHandler extends BaseHandler {
  constructor(client: any) {
    super(client);
  }

  async handle(event: ContactEvent): Promise<any> {
    try {
      return await this.client.sendEvent(event.buildEvent());
    } catch (error) {
      throw new EventHandlerException(`Error handling event '${event.eventName}': ${error.message}`);
    }
  }
}
