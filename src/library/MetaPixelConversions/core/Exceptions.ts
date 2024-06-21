/**
 * BaseExceptions
 */
export class BaseException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Bus exceptions
 */
export class MetaEventBusException extends BaseException {
  constructor(message?: string) {
    super(message || "MetaEventBusException");
  }
}

/**
 * Handler exceptions
 */

export class EventHandlerException extends BaseException {
  constructor(message?: string) {
    super(message || "EventHandlerException");
  }
}

/**
 * MetaClient exceptions
 */
export class MetaClientException extends BaseException {
  constructor(message?: string) {
    super(message || "MetaClientException");
  }
}

export class MetaClientInitializationError extends MetaClientException {
  constructor(message?: string) {
    super(message || "MetaClientInitializationError");
  }
}

/**
 * Event exceptions
 */
export class EventException extends BaseException {
  constructor(message?: string) {
    super(message || "EventException");
  }
}

export class EventValidationError extends EventException {
  constructor(message?: string) {
    super(message || "EventValidationError");
  }
}
