import { UserDataSchema, CustomDataSchema, MetaCustomEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import { z } from 'zod'

const abandonedCheckoutEventSchema = z.object({
	content_ids: z.array(z.string()).nonempty(),
	num_items: z.number().int(),
	currency: z.enum(['DKK']),
	value: z.number(),
})

export class AbandonedCheckoutEvent extends MetaCustomEvent {
	override eventName = EventName.AbandonedCheckout

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const result = abandonedCheckoutEventSchema.safeParse(this.customData)

		if (!result.success) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
