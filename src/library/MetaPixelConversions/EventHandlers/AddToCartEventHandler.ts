import { AddToCartEvent } from "../StandardEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";
export const addToCartEventHandler = async (
  event: AddToCartEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    const eventObj = event.buildEvent();
    console.log(`Sending AddToCartEvent event: ${JSON.stringify(eventObj.normalize())}`);
    return await metaSdkClient.sendEvent(eventObj);
  } catch (error: any) {
    mapToException(error);
  }
};
