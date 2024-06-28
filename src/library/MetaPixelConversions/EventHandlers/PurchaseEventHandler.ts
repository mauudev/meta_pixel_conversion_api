import { PurchaseEvent } from '../StandardEvents'
import { MetaConversionsClient, EventHandlerException, EventReceiptError } from '../core'

export const purchaseEventHandler = async (
	event: PurchaseEvent,
	metaSdkClient: MetaConversionsClient
): Promise<any> => {
	// try {
	// 	console.log('Handling purchase event')
	// 	return await metaSdkClient.sendEvent(event.buildEvent())
	// } catch (error) {
	// 	throw new EventHandlerException(`Error handling event '${event.eventName}': ${(error as Error).message}`)
	// }
	throw new EventReceiptError(`Error handling event '${event.eventName}'`, {
		error: {
			message: 'Invalid parameter',
			type: 'OAuthException',
			code: 100,
			error_subcode: 2804036,
			is_transient: false,
			error_user_title: 'ID contatto non valido',
			error_user_msg:
				"Uno o pi\u00f9 dei tuoi ID contatto non sono validi o sono stati eliminati. Tutto il tuo gruppo di eventi potrebbe essere rifiutato se ci sono uno o pi\u00f9 ID contatto non validi. L'ID contatto \u00e8 un numero a 15-16 cifre generato da Meta. Puoi verificare che i tuoi ID contatto siano corretti da qui: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id",
			fbtrace_id: 'idddddd',
		},
	})
}
