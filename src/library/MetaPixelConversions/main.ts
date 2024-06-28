import { EventHandlerException, MetaEventBus, PurchaseEvent, purchaseEventHandler } from './index'
import { v4 as uuid } from 'uuid'

function retry(fn: () => Promise<any>, retries: number, delay: number): Promise<any> {
	return new Promise((resolve, reject) => {
		const attempt = () => {
			fn()
				.then(resolve)
				.catch(error => {
					if (retries === 0) {
						reject(error)
					} else {
						setTimeout(attempt, delay)
						console.log('Retrying... attempts left:', retries)
						retries--
						delay *= 2
					}
				})
		}
		attempt()
	})
}

const retryHandler = async (retryFn: () => Promise<any>, event: PurchaseEvent, error: EventHandlerException) => {
	console.log('Error handling event', error)
	await retry(retryFn, 3, 1000)
}

const META_ACCESS_TOKEN =
	'EAAGhTpVxZCKQBOZBfEsRJXzAmb55CP4wet8fbF4KCjopNYQPfeEnlS2BGBMdcHcKBaKBCVGZA1zCkSelrkHFZAJliEAWJl4ZBD7U0ixycWuJNwTqysMLQS12EJtlngfmuOZBTo1dfZAiCrB4bbShjw6g2Fp3bEksnwvXxWz51mHoJogEkUdo6LVOgZBmliVWsQKezwZDZD'
const PIXEL_ID = '435714932594774'
const TEST_EVENT_CODE = 'TEST40117'

const eventBus = new MetaEventBus(META_ACCESS_TOKEN, PIXEL_ID, TEST_EVENT_CODE)
eventBus.initialize()
eventBus.register(PurchaseEvent, purchaseEventHandler)
eventBus.registerErrorHandler(EventHandlerException, retryHandler)

console.log(eventBus.getHandlerRegistry())
console.log(eventBus.getErrorHandlerRegistry())

const eventData = {
	customData: {
		value: 100,
		currency: 'USD',
		num_items: 1,
	},
	userData: {
		emails: ['mtrigo143@gmail.com'],
		phones: ['123456789'],
	},
}

const eventData1 = {
	customData: {
		value: 200,
		currency: 'USD',
		num_items: 2,
	},
	userData: {
		emails: ['mtrigo1432@gmail.com'],
		phones: ['1234567890'],
	},
}

const eventData2 = {
	customData: {
		value: 300,
		currency: 'USD',
		num_items: 3,
	},
	userData: {
		emails: ['mtrigo1433@gmail.com'],
		phones: ['12345678901'],
	},
}

const purchaseEvent = new PurchaseEvent(eventData.userData, eventData.customData)
const purchaseEvent1 = new PurchaseEvent(eventData1.userData, eventData1.customData)
const purchaseEvent2 = new PurchaseEvent(eventData2.userData, eventData2.customData)

eventBus
	.handle(purchaseEvent)
	.then(res => console.log('Event handled res ->', res))
	.catch(error => console.error('Error handling event', error))
