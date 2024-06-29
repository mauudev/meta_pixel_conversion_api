import { EventRequest, ServerEvent, FacebookAdsApi, EventResponse } from "facebook-nodejs-business-sdk";
import { MetaClientInitializationError } from "./Exceptions";

export class MetaConversionsClient {
  private static instance: MetaConversionsClient;
  private _api: FacebookAdsApi | undefined;
  private _metaAccessToken: string;
  private _pixelId: string;
  private _testEventCode: string | undefined;
  private _initialized: boolean = false;

  private constructor(metaAccessToken: string, pixelId: string, testEventCode: string | undefined) {
    this._metaAccessToken = metaAccessToken;
    this._pixelId = pixelId;
    this._testEventCode = testEventCode;
  }

  static getInstance(
    metaAccessToken: string,
    pixelId: string,
    testEventCode: string | undefined
  ): MetaConversionsClient {
    let newClientInstance = MetaConversionsClient.instance;
    if (!newClientInstance) {
      newClientInstance = new MetaConversionsClient(metaAccessToken, pixelId, testEventCode);
    }
    newClientInstance.init();
    return newClientInstance;
  }

  init(): void {
    if (this._initialized) {
      return;
    }
    const maxRetries = 3;
    let attempts = 0;
    const retryDelay = 1000;

    const initialize = () => {
      try {
        this._api = FacebookAdsApi.init(this._metaAccessToken);
        this._initialized = true;
      } catch (error) {
        if (attempts < maxRetries) {
          attempts++;
          console.log(`Initialization failed, retrying... Attempt ${attempts}`);
          setTimeout(initialize, retryDelay);
        } else {
          throw new MetaClientInitializationError(
            `Initialization failed after ${maxRetries} attempts: ${(error as Error).message}`
          );
        }
      }
    };

    initialize();
  }

  async sendEvent(eventData: ServerEvent | ServerEvent[]): Promise<EventResponse> {
    const eventsData = Array.isArray(eventData) ? eventData : [eventData];
    const eventRequest = new EventRequest(
      this._metaAccessToken,
      this._pixelId,
      eventsData,
      undefined, // partner id
      this._testEventCode
    );

    return await eventRequest.execute();
  }
}
