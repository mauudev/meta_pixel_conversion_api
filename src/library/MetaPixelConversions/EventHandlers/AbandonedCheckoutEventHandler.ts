import { AbandonedCheckoutEvent } from "../CustomEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";

export const abandonedCheckoutEventHandler = async (
  event: AbandonedCheckoutEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    const eventObj = event.buildEvent();
    console.log(`Sending AbandonedCheckoutEvent event: ${JSON.stringify(eventObj.normalize())}`);
    return await metaSdkClient.sendEvent(eventObj);
  } catch (error: any) {
    mapToException(error);
  }
};
