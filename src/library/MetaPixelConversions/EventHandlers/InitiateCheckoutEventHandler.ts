import { InitiateCheckoutEvent } from "../StandardEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";
export const initiateCheckoutEventHandler = async (
  event: InitiateCheckoutEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    const eventObj = event.buildEvent();
    console.log(`Sending InitiateCheckoutEvent event: ${JSON.stringify(eventObj.normalize())}`);
    return await metaSdkClient.sendEvent(eventObj);
  } catch (error: any) {
    mapToException(error);
  }
};
