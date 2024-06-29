import { AbandonedCheckoutEvent } from "../CustomEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";

export const abandonedCheckoutEventHandler = async (
  event: AbandonedCheckoutEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    console.log("Sending AbandonedCheckoutEvent event...");
    const response = await metaSdkClient.sendEvent(event.buildEvent());
    console.log(`--> result: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    if (error.response && error.response.code) {
      mapToException(error);
    }
  }
};
