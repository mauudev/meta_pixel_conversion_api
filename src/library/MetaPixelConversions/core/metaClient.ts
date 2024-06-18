import {
  Content as _Content,
  CustomData as _CustomData,
  DeliveryCategory as _DeliveryCategory,
  EventRequest as _EventRequest,
  UserData as _UserData,
  ServerEvent as _ServerEvent,
  FacebookAdsApi,
  EventRequest,
  ServerEvent,
} from "facebook-nodejs-business-sdk";

export default class MetaConversionsClient {
  private _api: FacebookAdsApi;
  private _metaAccessToken: string;
  private _pixelId: string;
  private _testEventCode: string;
  private _initialized: boolean = false;

  constructor(metaAccessToken: string, pixelId: string, testEventCode: string) {
    this._metaAccessToken = metaAccessToken;
    this._pixelId = pixelId;
    this._testEventCode = testEventCode;
  }

  public init(): void {
    if (!this._initialized) {
      this._api = FacebookAdsApi.init(this._metaAccessToken);
    }
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
      (response: any) => {
        console.log("Response: ", response);
      },
      (err: any) => {
        console.error("Error: ", err);
      }
    );
  }
}
