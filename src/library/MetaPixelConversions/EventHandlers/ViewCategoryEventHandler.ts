import { MetaConversionsClient, EventHandlerException } from '../core'
import { ViewCategoryEvent } from '../CustomEvents'

export const viewCategoryEventHandler = async (
	event: ViewCategoryEvent,
	metaSdkClient: MetaConversionsClient
): Promise<any> => {
	try {
		return await metaSdkClient.sendEvent(event.buildEvent())
	} catch (error) {
		throw new EventHandlerException(`Error handling event '${event.eventName}': ${(error as Error).message}`)
	}
}
