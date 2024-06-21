import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from "../core/Abstractions";
import { EventValidationError } from "../core/Exceptions";
import Joi from "joi";

const contactEventSchema = Joi.object({
  content_ids: Joi.array().items(Joi.string()).required(),
});

export class ContactEvent extends MetaStandardEvent {
  eventName = EventName.Contact;

  constructor(userData: UserDataSchema, customData: CustomDataSchema) {
    super(userData, customData);
  }

  validate(): void {
    const isValid = contactEventSchema.validate(this.customData).error === undefined;
    if (!isValid) {
      throw new EventValidationError(
        `Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
      );
    }
  }
}
