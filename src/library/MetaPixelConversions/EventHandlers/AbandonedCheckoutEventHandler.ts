import { AbandonedCheckoutEvent } from '../CustomEvents'
import { MetaConversionsClient, EventHandlerException } from '../core'

export const abandonedCheckoutEventHandler = async (
	event: AbandonedCheckoutEvent,
	metaSdkClient: MetaConversionsClient
): Promise<any> => {
	try {
		return await metaSdkClient.sendEvent(event.buildEvent())
	} catch (error) {
		throw new EventHandlerException(`Error handling event '${event.eventName}': ${(error as Error).message}`)
	}
}
