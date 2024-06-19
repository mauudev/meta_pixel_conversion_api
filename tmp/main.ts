import {
  Content as _Content,
  CustomData as _CustomData,
  DeliveryCategory as _DeliveryCategory,
  EventRequest as _EventRequest,
  UserData as _UserData,
  ServerEvent as _ServerEvent,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";
import crypto from "crypto";

const CustomData = _CustomData;
const EventRequest = _EventRequest;
const UserData = _UserData;
const ServerEvent = _ServerEvent;

const META_ACCESS_TOKEN = "<META_ACCESS_TOKEN>";
const PIXEL_ID = "<PIXEL_ID>";
const TEST_EVENT_CODE = "<TEST_EVENT_CODE>";

const createHash = (data: string): string => {
  return crypto.createHash("sha256").update(data, "utf-8").digest("hex");
};

let current_timestamp: number = Math.floor(new Date().getTime() / 1000);

const api = FacebookAdsApi.init(META_ACCESS_TOKEN);

const userData_0 = new UserData()
  .setEmail(createHash("mtrigo143@gmail.com"))
  .setGender(createHash("M"))
  .setCountry(createHash("US"))
  .setPhone(createHash("7956565656"))
  .setClientIpAddress("4.4.4.4")
  .setClientUserAgent("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0");

const customData_0 = new CustomData().setValue(142.52).setCurrency("USD");
const purchaseEvent1 = new ServerEvent()
  .setEventName("Purchase")
  .setEventTime(current_timestamp)
  .setUserData(userData_0)
  .setCustomData(customData_0)
  .setActionSource("website");

const viewContentEvent = new ServerEvent()
  .setEventName("ViewContent")
  .setEventTime(current_timestamp)
  .setUserData(userData_0)
  .setActionSource("website");

const eventsData = [viewContentEvent, purchaseEvent1];

const eventRequest = new EventRequest(META_ACCESS_TOKEN, PIXEL_ID, eventsData, undefined, TEST_EVENT_CODE);

eventRequest.execute().then(
  (response: any) => {
    console.log("Response: ", response);
  },
  (err: any) => {
    console.error("Error: ", err);
  }
);
