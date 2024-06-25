import { UserDataSchema, CustomDataSchema, MetaCustomEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import Joi from 'joi'

const abandonedCheckoutEventSchema = Joi.object({
	content_ids: Joi.array().items(Joi.string()).required(),
	num_items: Joi.number().integer().required(),
	currency: Joi.string().valid('DKK').required(),
	value: Joi.number().required(),
})

export class AbandonedCheckoutEvent extends MetaCustomEvent {
	override eventName = EventName.AbandonedCheckout

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const isValid = abandonedCheckoutEventSchema.validate(this.customData).error === undefined
		if (!isValid) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
