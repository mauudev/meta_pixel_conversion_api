import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import Joi from 'joi'

const purchaseEventSchema = Joi.object({
	value: Joi.number().required(),
	currency: Joi.string().required(),
	num_items: Joi.number().required(),
})

export class PurchaseEvent extends MetaStandardEvent {
	override eventName = EventName.Purchase

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const isValid = purchaseEventSchema.validate(this.customData).error === undefined
		if (!isValid) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
