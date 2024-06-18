class BaseException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class MetaEventBusException extends BaseException {
  constructor(message?: string) {
    super(message || "MetaEventBusException");
  }
}

class EventHandlerException extends BaseException {
  constructor(message?: string) {
    super(message || "EventHandlerException");
  }
}

class EventException extends BaseException {
  constructor(message?: string) {
    super(message || "EventException");
  }
}

export { BaseException, MetaEventBusException, EventHandlerException, EventException };

