import { BaseHandler } from "../core/Abstractions";
import { EventHandlerException } from "../core/Exceptions";
import PageViewEvent from "../StandardEvents/PageViewEvent";

export default class PageViewEventHandler extends BaseHandler {
  constructor(client: any) {
    super(client);
  }

  async handle(event: PageViewEvent): Promise<any> {
    // try {
    return await this.client.sendEvent(event.buildEvent());
    // } catch (error) {
    //   if (error instanceof Error) {
    //     throw new EventHandlerException(`Error handling PageView event: ${error.message}`);
    //   }
    //   throw new EventHandlerException("Unknown error");
    // }
  }
}
