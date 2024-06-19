import { BaseEvent, UserDataSchema, CustomDataSchema } from "../core/Abstractions";
import { EventCreationError, InvalidPurchaseEventData } from "../core/Exceptions";
import { CustomData, UserData, ServerEvent } from "facebook-nodejs-business-sdk";
import Joi from "joi";

const purchaseEventSchema = Joi.object({
  value: Joi.number().required(),
  currency: Joi.string().required(),
  num_items: Joi.number().required(),
});

export default class PurchaseEvent extends BaseEvent {
  constructor(userData: UserDataSchema, customData: CustomDataSchema) {
    super(userData, customData);
    this.customData = customData;
    this.userData = userData;
  }

  buildEvent(): ServerEvent {
    try {
      if (!this.isValid()) {
        throw new InvalidPurchaseEventData("Invalid custom data, provide the required fields");
      }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new EventCreationError(`Error creating purchase event: ${error.message}`);
      }
      throw new EventCreationError("Unknown error");
    }
  }

  isValid(): boolean {
    return purchaseEventSchema.validate(this.customData).error === undefined;
  }
}
