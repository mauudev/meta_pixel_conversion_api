import { EventRequest, ServerEvent, FacebookAdsApi } from "facebook-nodejs-business-sdk";
import { MetaClientInitializationError } from "./Exceptions";

export default class MetaConversionsClient {
  private static instance: MetaConversionsClient;
  private _api: FacebookAdsApi;
  private _metaAccessToken: string;
  private _pixelId: string;
  private _testEventCode: string | undefined;
  private _initialized: boolean = false;

  private constructor(metaAccessToken: string, pixelId: string, testEventCode: string | undefined) {
    this._metaAccessToken = metaAccessToken;
    this._pixelId = pixelId;
    this._testEventCode = testEventCode;
  }

  public static getInstance(
    metaAccessToken: string,
    pixelId: string,
    testEventCode: string | undefined
  ): MetaConversionsClient {
    if (!MetaConversionsClient.instance) {
      if (!metaAccessToken || !pixelId) {
        throw new MetaClientInitializationError("MetaConversionsClient: Missing required parameters");
      }
      MetaConversionsClient.instance = new MetaConversionsClient(metaAccessToken, pixelId, testEventCode);
    }
    return MetaConversionsClient.instance;
  }

  public init(): void {
    if (this._initialized) {
      return;
    }
    this._api = FacebookAdsApi.init(this._metaAccessToken);
    this._initialized = true;
  }

  public sendEvent(eventData: ServerEvent | ServerEvent[]): void {
    this.init();
    const eventsData = Array.isArray(eventData) ? eventData : [eventData];
    const eventRequest = new EventRequest(
      this._metaAccessToken,
      this._pixelId,
      eventsData,
      undefined,
      this._testEventCode
    );
    eventRequest.execute().then(
      (response: never) => {
        console.log("Response: ", response);
      },
      (err: never) => {
        console.error("Error: ", err);
      }
    );
  }
}
