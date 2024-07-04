import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import { z } from 'zod'

const purchaseEventSchema = z.object({
	value: z.number(),
	currency: z.string(),
	num_items: z.number().int(),
})

export class PurchaseEvent extends MetaStandardEvent {
	override eventName = EventName.Purchase

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const result = purchaseEventSchema.safeParse(this.customData)

		if (!result.success) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
