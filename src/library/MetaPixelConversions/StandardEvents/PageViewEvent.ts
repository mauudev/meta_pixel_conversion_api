import { BaseEvent, CustomDataSchema, UserDataSchema } from "../core/Abstractions";
import { EventCreationError } from "../core/Exceptions";
import { CustomData, UserData, ServerEvent } from "facebook-nodejs-business-sdk";

export default class PageViewEvent extends BaseEvent {
  constructor(userData: UserDataSchema, customData: CustomDataSchema) {
    super(userData, customData);
    this.customData = customData;
    this.userData = userData;
  }
  buildEvent(): ServerEvent {
    // try {
    const userData = new UserData();
    Object.assign(userData, this.userData);

    const customData = new CustomData();
    Object.assign(customData, this.customData);

    return new ServerEvent()
      .setEventName("PageView")
      .setEventTime(Math.floor(new Date().getTime() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website");
    // } catch (error) {
    //   if (error instanceof Error) {
    //     throw new EventCreationError(`Error creating PageView event: ${error.message}`);
    //   }
    //   throw new EventCreationError("Unknown error");
    // }
  }

  isValid(): boolean {
    return true;
  }
}
