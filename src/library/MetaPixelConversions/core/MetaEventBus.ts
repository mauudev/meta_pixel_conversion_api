import { BaseBus, BaseEvent, ErrorHandler, EventHandler } from './Abstractions'
import { BaseException, EventHandlerException, MetaEventBusException, EventReceiptError } from './Exceptions'
import { MetaConversionsClient } from './MetaClient'

export class MetaEventBus extends BaseBus {
	private errorHandlerRegistry: Map<string, ErrorHandler<BaseEvent, BaseException>> = new Map()
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

		try {
			this.metaSdkClient = MetaConversionsClient.getInstance(
				this.metaPixelAccessToken,
				this.pixelId,
				this.testEventCode
			)
		} catch (error) {
			throw new MetaEventBusException(`Error initializing Meta SDK client: ${(error as Error).message}`)
		}

		this.busInitialized = true
	}

	getHandlerRegistry<T extends BaseEvent>(): Map<string, EventHandler<T>> {
		return this.handlerRegistry
	}

	getErrorHandlerRegistry<T extends BaseEvent, K extends BaseException>(): Map<string, ErrorHandler<T, K>> {
		return this.errorHandlerRegistry
	}

	register<T extends BaseEvent>(eventClass: typeof BaseEvent, handler: EventHandler<T>): void {
		const eventName = eventClass.name
		if (!eventName || eventName.trim() === '') {
			throw new MetaEventBusException('Unable to register event, provide a valid event class')
		}
		this.handlerRegistry.set(eventName, handler as EventHandler<BaseEvent>)
	}

	registerErrorHandler<T extends BaseEvent, K extends BaseException>(
		errorClass: new () => K,
		errHandler: ErrorHandler<T, K>
	): void {
		const exceptionName = errorClass.name
		if (!exceptionName || exceptionName.trim() === '') {
			throw new MetaEventBusException('Unable to register error handler, provide a valid exception class')
		}
		this.errorHandlerRegistry.set(exceptionName, errHandler as ErrorHandler<BaseEvent, BaseException>)
	}

	async handle(event: BaseEvent): Promise<any> {
		if (!this.busInitialized) {
			throw new MetaEventBusException('Bus not initialized')
		}

		const handlerFn = this.handlerRegistry.get(event.constructor.name)
		if (!handlerFn) {
			throw new Error(`No handler registered for event ${event.constructor.name}`)
		}

		try {
			return await handlerFn(event, this.metaSdkClient)
		} catch (error) {
			this.handleErrors(error as BaseException)
		}
	}

	handleErrors(error: BaseException): void {
		if (error instanceof EventHandlerException) {
			console.log('Handling EventHandlerException ......', error.errorData)
			console.log('finished handling error ......')
		}
		if (error instanceof MetaEventBusException) {
			console.log('Handling MetaEventBusException ......', error.errorData)
			console.log('finished handling error ......')
		}
		if (error instanceof EventReceiptError) {
			console.log('Handling EventReceiptError ......', error.errorData)
			console.log('finished handling error ......')
		}
		if (error instanceof BaseException) {
			console.log('Handling BaseException ......', error.errorData)
			console.log('finished handling error ......')
		}
	}
}
