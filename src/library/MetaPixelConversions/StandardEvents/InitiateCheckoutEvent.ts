import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import { z } from 'zod'

const initiateCheckoutEventSchema = z.object({
	content_ids: z.array(z.string()).nonempty(),
	num_items: z.number().int(),
	value: z.number(),
	currency: z.string(),
})

export class InitiateCheckoutEvent extends MetaStandardEvent {
	override eventName = EventName.InitiateCheckout

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const result = initiateCheckoutEventSchema.safeParse(this.customData)

		if (!result.success) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
