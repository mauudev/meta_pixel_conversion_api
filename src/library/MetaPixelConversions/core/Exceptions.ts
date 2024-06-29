/**
 * BaseExceptions
 */
export class BaseException extends Error {
  errorData: any;

  constructor(message?: string, errorData?: any) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.errorData = errorData;
  }
}

/**
 * Bus exceptions
 */
export class MetaEventBusException extends BaseException {
  constructor(message?: string, errorData?: any) {
    super(message || "MetaEventBusException");
    this.errorData = errorData;
  }
}

/**
 * Handler exceptions
 */

export class EventHandlerException extends BaseException {
  constructor(message?: string, errorData?: any) {
    super(message || "EventHandlerException");
    this.errorData = errorData;
  }
}

export class EventHandlerInitializationError extends EventHandlerException {
  constructor(message?: string, errorData?: any) {
    super(message || "EventHandlerInitializationError");
    this.errorData = errorData;
  }
}

export class EventReceiptError extends EventHandlerException {
  constructor(message?: string, errorData?: any) {
    super(message || "EventReceiptError");
    this.errorData = errorData;
  }
}

/**
 * MetaClient exceptions
 */
export class MetaClientException extends BaseException {
  constructor(message?: string, errorData?: any) {
    super(message || "MetaClientException");
    this.errorData = errorData;
  }
}

export class MetaServerError extends MetaClientException {
  constructor(message?: string, errorData?: any) {
    super(message || "MetaServerError");
    this.errorData = errorData;
  }
}

export class MetaRequestLimitError extends MetaClientException {
  constructor(message?: string, errorData?: any) {
    super(message || "MetaRequestLimitError");
    this.errorData = errorData;
  }
}

export class MetaRequestError extends MetaClientException {
  constructor(message?: string, errorData?: any) {
    super(message || "MetaRequestError");
    this.errorData = errorData;
  }
}

export class MetaClientInitializationError extends MetaClientException {
  constructor(message?: string, errorData?: any) {
    super(message || "MetaClientInitializationError");
    this.errorData = errorData;
  }
}

/**
 * Event exceptions
 */
export class EventException extends BaseException {
  constructor(message?: string, errorData?: any) {
    super(message || "EventException");
    this.errorData = errorData;
  }
}

export class EventValidationError extends EventException {
  constructor(message?: string, errorData?: any) {
    super(message || "EventValidationError");
    this.errorData = errorData;
  }
}

export class EventSentError extends EventException {
  constructor(message?: string, errorData?: any) {
    super(message || "EventSentError");
    this.errorData = errorData;
  }
}
