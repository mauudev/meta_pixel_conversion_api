import { CustomDataSchema, UserDataSchema, EventName, MetaCustomEvent } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import Joi from 'joi'

const viewCategoryEventSchema = Joi.object({
	category_path: Joi.string().required(),
	brand: Joi.string().optional(),
	model: Joi.string().optional(),
	product_type: Joi.string().optional(),
	type: Joi.string().optional(),
})

export class ViewCategoryEvent extends MetaCustomEvent {
	override eventName = EventName.ViewCategory

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const isValid = viewCategoryEventSchema.validate(this.customData).error === undefined
		if (!isValid) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
