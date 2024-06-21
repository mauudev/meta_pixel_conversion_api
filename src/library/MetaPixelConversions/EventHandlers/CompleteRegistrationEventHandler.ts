import { BaseHandler } from "../core/Abstractions";
import { CompleteRegistrationEvent } from "../StandardEvents";
import { EventHandlerException } from "../core/Exceptions";

export default class CompleteRegistrationEventHandler extends BaseHandler {
  constructor(client: any) {
    super(client);
  }

  async handle(event: CompleteRegistrationEvent): Promise<any> {
    try {
      return await this.client.sendEvent(event.buildEvent());
    } catch (error) {
      throw new EventHandlerException(`Error handling event '${event.eventName}': ${error.message}`);
    }
  }
}
