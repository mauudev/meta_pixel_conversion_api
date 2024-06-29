import { LeadEvent } from "../StandardEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";

export const leadEventHandler = async (
  event: LeadEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    console.log("Sending LeadEvent event...");
    const response = await metaSdkClient.sendEvent(event.buildEvent());
    console.log(`--> result: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    if (error.response && error.response.code) {
      mapToException(error);
    }
  }
};
