import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import Joi from 'joi'

const leadEventSchema = Joi.object({
	content_category: Joi.string().required(),
	content_name: Joi.string().required(),
})

export class LeadEvent extends MetaStandardEvent {
	override eventName = EventName.Lead

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const isValid = leadEventSchema.validate(this.customData).error === undefined
		if (!isValid) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
