/**
 * Meta Event Framework Base exception class
 */
export class BaseException extends Error {
	constructor(
		message: string,
		public status?: number,
		public response?: {
			message: string
			type: string
			code: number
			error_subcode: number
			is_transient: boolean
			error_user_title: string
			error_user_msg: string
			fbtrace_id: string
		},
		public headers?: any,
		public data?: any
	) {
		super(message)
	}
}

/**
 * Meta Event Bus exceptions
 */
export class MetaEventBusException extends BaseException {}

/**
 * Event Handler exceptions
 */
export class EventHandlerException extends BaseException {}

export class EventHandlerInitializationError extends EventHandlerException {}

export class EventReceiptError extends EventHandlerException {}

/**
 * Event exceptions
 */
export class EventException extends BaseException {}

export class EventValidationError extends EventException {}

export class EventSentError extends EventException {}

/**
 * Meta SDK Client Exceptions
 */
export class MetaClientException extends BaseException {}

export class MetaServerError extends MetaClientException {}

export class MetaRequestLimitError extends MetaClientException {}

export class MetaRequestError extends MetaClientException {}

export class MetaClientInitializationError extends MetaClientException {}
