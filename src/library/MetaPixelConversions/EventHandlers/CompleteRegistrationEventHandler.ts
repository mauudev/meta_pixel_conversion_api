import { CompleteRegistrationEvent } from '../StandardEvents'
import { MetaConversionsClient, EventHandlerException } from '../core'

export const completeRegistrationEventHandler = async (
	event: CompleteRegistrationEvent,
	metaSdkClient: MetaConversionsClient
): Promise<any> => {
	try {
		return await metaSdkClient.sendEvent(event.buildEvent())
	} catch (error) {
		throw new EventHandlerException(`Error handling event '${event.eventName}': ${(error as Error).message}`)
	}
}
