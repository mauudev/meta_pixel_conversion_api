import { MetaConversionsClient } from "../core";
import { ViewCategoryEvent } from "../CustomEvents";
import { mapToException } from "../utils";
export const viewCategoryEventHandler = async (
  event: ViewCategoryEvent,
  metaSdkClient: MetaConversionsClient
): Promise<any> => {
  try {
    const eventObj = event.buildEvent();
    console.log(`Sending ViewCategoryEvent event: ${JSON.stringify(eventObj.normalize())}`);
    return await metaSdkClient.sendEvent(eventObj);
  } catch (error: any) {
    mapToException(error);
  }
};
