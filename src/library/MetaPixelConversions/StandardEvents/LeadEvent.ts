import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import { z } from 'zod'

const leadEventSchema = z.object({
	content_category: z.string(),
	content_name: z.string(),
})

export class LeadEvent extends MetaStandardEvent {
	override eventName = EventName.Lead

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const result = leadEventSchema.safeParse(this.customData)

		if (!result.success) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
