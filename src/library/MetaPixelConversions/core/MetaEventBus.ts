import { BaseBus, BaseEvent, ErrorHandler, EventHandler } from './Abstractions'
import { BaseException, MetaEventBusException } from './Exceptions'
import { MetaConversionsClient } from './MetaClient'

export class MetaEventBus extends BaseBus {
	private handlerRegistry: Map<string, EventHandler<BaseEvent>> = new Map()
	private metaSdkClient: MetaConversionsClient | undefined
	private busInitialized = false

	constructor(metaPixelAccessToken: string, pixelId: string, testEventCode?: string) {
		super(metaPixelAccessToken, pixelId, testEventCode)
	}

	initialize(): void {
		if (!this.metaPixelAccessToken || !this.pixelId) {
			throw new MetaEventBusException('Missing required environment variables')
		}
		this.metaSdkClient = MetaConversionsClient.getInstance(
			this.metaPixelAccessToken,
			this.pixelId,
			this.testEventCode
		)

		this.busInitialized = true
	}

	getHandlerRegistry<T extends BaseEvent>(): Map<string, EventHandler<T>> {
		return this.handlerRegistry
	}

	register<T extends BaseEvent>(eventClass: typeof BaseEvent, handler: EventHandler<T>): void {
		const eventName = eventClass.name
		if (!eventName || eventName.trim() === '') {
			throw new MetaEventBusException('Unable to register event, provide a valid event class')
		}
		this.handlerRegistry.set(eventName, handler as EventHandler<BaseEvent>)
	}

	registerErrorHandler<K extends BaseException>(errHandler: ErrorHandler<K>): void {
		throw new Error(`Method not implemented for error handling: ${errHandler}`)
	}

	async handle(event: BaseEvent): Promise<any> {
		if (!this.busInitialized) {
			throw new MetaEventBusException('Bus not initialized')
		}

		const handlerFn = this.handlerRegistry.get(event.constructor.name)

		if (!handlerFn) {
			throw new Error(`No handler registered for event ${event.constructor.name}`)
		}

		return await handlerFn(event, this.metaSdkClient)
	}
}
