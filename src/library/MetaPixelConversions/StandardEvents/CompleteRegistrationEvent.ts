import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import { z } from 'zod'

const completeRegistrationEventSchema = z.object({
	content_name: z.enum(['Pakkepost']),
	currency: z.enum(['DKK']),
	value: z.number(),
	status: z.literal(true),
})

export class CompleteRegistrationEvent extends MetaStandardEvent {
	override eventName = EventName.CompleteRegistration

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const result = completeRegistrationEventSchema.safeParse(this.customData)

		if (!result.success) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
