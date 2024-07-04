import { PurchaseEvent } from "../StandardEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";
export const purchaseEventHandler = async (
  event: PurchaseEvent,
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
