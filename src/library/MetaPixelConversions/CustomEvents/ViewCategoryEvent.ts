import { CustomDataSchema, UserDataSchema, EventName, MetaCustomEvent } from '../core/Abstractions'
import { EventValidationError } from '../core/Exceptions'
import { z } from 'zod'

const viewCategoryEventSchema = z.object({
	category_path: z.string(),
	brand: z.string().optional(),
	model: z.string().optional(),
	product_type: z.string().optional(),
	type: z.string().optional(),
})

export class ViewCategoryEvent extends MetaCustomEvent {
	override eventName = EventName.ViewCategory

	constructor(userData: UserDataSchema, customData: CustomDataSchema) {
		super(userData, customData)
	}

	validate(): void {
		const result = viewCategoryEventSchema.safeParse(this.customData)

		if (!result.success) {
			throw new EventValidationError(
				`Error creating '${this.eventName}' event: Invalid data, provide the required parameters.`
			)
		}
	}
}
