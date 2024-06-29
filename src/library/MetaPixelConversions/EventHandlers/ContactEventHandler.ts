import { ContactEvent } from "../StandardEvents";
import { MetaConversionsClient } from "../core";
import { mapToException } from "../utils";

export const contactEventHandler = async (
  event: ContactEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    console.log("Sending ContactEvent event...");
    const response = await metaSdkClient.sendEvent(event.buildEvent());
    console.log(`--> result: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    if (error.response && error.response.code) {
      mapToException(error);
    }
  }
};
