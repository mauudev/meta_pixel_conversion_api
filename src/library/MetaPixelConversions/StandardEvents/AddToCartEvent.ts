import { UserDataSchema, CustomDataSchema, MetaStandardEvent, EventName } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import { z } from 'zod'

const addToCartEventSchema = z.object({
	content_ids: z.array(z.string()).nonempty(),
	content_name: z.string(),
	content_type: z.string(),
})

export class AddToCartEvent extends MetaStandardEvent {
	override eventName = EventName.AddToCart

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const result = addToCartEventSchema.safeParse(this.customData)

		if (!result.success) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
