import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from "../core/Abstractions";
import { EventValidationError } from "../core/Exceptions";
import Joi from "joi";

const initiateCheckoutEventSchema = Joi.object({
  content_ids: Joi.array().items(Joi.string()).required(),
  num_items: Joi.number().required(),
  value: Joi.number().required(),
  currency: Joi.string().required(),
});

export class InitiateCheckoutEvent extends MetaStandardEvent {
  eventName = EventName.InitiateCheckout;

  constructor(userData: UserDataSchema, customData: CustomDataSchema) {
    super(userData, customData);
  }

  validate(): void {
    const isValid = initiateCheckoutEventSchema.validate(this.customData).error === undefined;
    if (!isValid) {
      throw new EventValidationError(
        `Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
      );
    }
  }
}
