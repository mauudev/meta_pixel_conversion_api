import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import { z } from 'zod'

const contactEventSchema = z.object({
	content_ids: z.array(z.string()).nonempty(),
})

export class ContactEvent extends MetaStandardEvent {
	override eventName = EventName.Contact

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const result = contactEventSchema.safeParse(this.customData)

		if (!result.success) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
