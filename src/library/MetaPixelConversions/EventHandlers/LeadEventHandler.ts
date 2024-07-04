import { LeadEvent } from "../StandardEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";
export const leadEventHandler = async (
  event: LeadEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    const eventObj = event.buildEvent();
    console.log(`Sending LeadEvent event: ${JSON.stringify(eventObj.normalize())}`);
    return await metaSdkClient.sendEvent(eventObj);
  } catch (error: any) {
    mapToException(error);
  }
};
