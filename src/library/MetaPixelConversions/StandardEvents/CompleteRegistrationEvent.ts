import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from "../core/Abstractions";
import { EventValidationError } from "../core/Exceptions";
import Joi from "joi";

const completeRegistrationEventSchema = Joi.object({
  content_name: Joi.string().valid("Pakkepost").required(),
  currency: Joi.string().valid("DKK").required(),
  value: Joi.number().required(),
  status: Joi.boolean().valid(true).required(),
});

export class CompleteRegistrationEvent extends MetaStandardEvent {
  eventName = EventName.CompleteRegistration;

  constructor(userData: UserDataSchema, customData: CustomDataSchema) {
    super(userData, customData);
  }

  validate(): void {
    const isValid = completeRegistrationEventSchema.validate(this.customData).error === undefined;
    if (!isValid) {
      throw new EventValidationError(
        `Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
      );
    }
  }
}
