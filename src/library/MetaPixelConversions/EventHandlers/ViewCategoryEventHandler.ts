import { MetaConversionsClient } from "../core";
import { ViewCategoryEvent } from "../CustomEvents";
import { mapToException } from "../utils";

export const viewCategoryEventHandler = async (
  event: ViewCategoryEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    console.log("Sending ViewCategoryEvent event...");
    const response = await metaSdkClient.sendEvent(event.buildEvent());
    console.log(`--> result: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    if (error.response && error.response.code) {
      mapToException(error);
    }
  }
};
