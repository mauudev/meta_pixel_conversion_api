import { PurchaseEvent } from "../StandardEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";
// import { FacebookRequestError } from "facebook-nodejs-business-sdk";

export const purchaseEventHandler = async (
  event: PurchaseEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    console.log("Sending purchase event...");
    const response = await metaSdkClient.sendEvent(event.buildEvent());
    console.log(`--> result: ${JSON.stringify(response)}`);
    return response;
  } catch (error: any) {
    console.error("============> Facebook error:", error);
    // mapToException(error);
  }
};
