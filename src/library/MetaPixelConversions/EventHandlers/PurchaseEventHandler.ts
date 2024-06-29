import { PurchaseEvent } from "../StandardEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";

export const purchaseEventHandler = async (
  event: PurchaseEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    console.log("Sending purchase event...");
    const response = await metaSdkClient.sendEvent(event.buildEvent());
    return response;
  } catch (error) {
    if (error.response && error.response.code) {
      mapToException(error);
    }
  }
};
