import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import Joi from 'joi'

const addToCartEventSchema = Joi.object({
	content_ids: Joi.array().items(Joi.string()).required(),
	content_name: Joi.string().required(),
	content_type: Joi.string().required(),
})

export class AddToCartEvent extends MetaStandardEvent {
	override eventName = EventName.AddToCart

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const isValid = addToCartEventSchema.validate(this.customData).error === undefined
		if (!isValid) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
