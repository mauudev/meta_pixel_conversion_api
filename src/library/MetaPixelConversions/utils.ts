import { META_ERROR_CODES } from "./core/ErrorCodes";
import {
  EventSentError,
  MetaClientException,
  MetaRequestLimitError,
  MetaServerError,
  MetaRequestError,
} from "./core/Exceptions";

export const mapToException = (error: any) => {
  const errorCode = error.response.code;
  if (!errorCode) {
    throw new EventSentError("No error code found in response", error.response);
  }
  if (META_ERROR_CODES.metaServerErrors[errorCode as keyof typeof META_ERROR_CODES.metaServerErrors]) {
    throw new MetaServerError(`An error occurred while sending the event: ${error.message}`, error.response);
  }
  if (META_ERROR_CODES.metaRequestErrors[errorCode as keyof typeof META_ERROR_CODES.metaRequestErrors]) {
    throw new MetaRequestError(
      `An error occurred while sending the event: ${error.message}`,
      error.response.status,
      error.response,
      error.headers,
      error.errorData
    );
  }
  if (
    META_ERROR_CODES.metaRequestLimitErrors[errorCode as keyof typeof META_ERROR_CODES.metaRequestLimitErrors]
  ) {
    throw new MetaRequestLimitError(
      `An error occurred while sending the event: ${error.message}`,
      error.response
    );
  }
  throw new MetaClientException(
    `An error occurred while sending the event: ${error.message}`,
    error.response
  );
};

export function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 5,
  delay: number = 1000,
  backoff: number = 2
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const execute = () => {
      fn()
        .then(resolve)
        .catch((error) => {
          if (++attempts >= maxAttempts) {
            reject(error);
          } else {
            console.log(`Retrying in ${delay}ms...`);
            console.log(`Attempts: ${attempts}`);
            setTimeout(execute, delay);
            delay *= backoff;
          }
        });
    };
    execute();
  });
}

export class TaskQueue {
  private queue: (() => Promise<any>)[] = [];
  private processing = false;

  enqueue(task: () => Promise<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve).catch(reject));
      if (!this.processing) {
        this.processNext();
      }
    });
  }

  private async processNext(): Promise<void> {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }
    this.processing = true;
    await this.queue.shift()!();
    this.processNext();
  }
}
