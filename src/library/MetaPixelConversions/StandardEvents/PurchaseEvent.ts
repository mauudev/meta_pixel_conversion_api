import { BaseEvent, UserDataSchema, CustomDataSchema } from "../core/abstractions";
import { CustomData, UserData, ServerEvent } from "facebook-nodejs-business-sdk";

export class PurchaseEvent extends BaseEvent {
  constructor(userData: UserDataSchema, customData: CustomDataSchema) {
    super(userData, customData);
    this.customData = customData;
  }

  public buildEvent(): ServerEvent {
    const userData = new UserData();
    Object.assign(userData, this.userData);

    const customData = new CustomData();
    Object.assign(customData, this.customData);

    return new ServerEvent()
      .setEventName("Purchase")
      .setEventTime(Math.floor(new Date().getTime() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website");
  }
}
