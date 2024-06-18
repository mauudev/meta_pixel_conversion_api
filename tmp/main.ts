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
import { pixelId, metaAccessToken } from "./envvars";

const CustomData = _CustomData;
const EventRequest = _EventRequest;
const UserData = _UserData;
const ServerEvent = _ServerEvent;

const createHash = (data: string): string => {
  return crypto.createHash("sha256").update(data, "utf-8").digest("hex");
};

let current_timestamp: number = Math.floor(new Date().getTime() / 1000);

const api = FacebookAdsApi.init(metaAccessToken);
const data = {
  data: [
    {
      event_name: "TestEvent",
      event_time: current_timestamp,
      action_source: "email",
      user_data: {
        em: "f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a",
        client_ip_address: "254.254.254.254",
        client_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0",
      },
    },
  ],
  test_event_code: "TEST63411",
};

const userData_0 = new UserData()
  .setEmail(createHash("mtrigo143@gmail.com"))
  .setGender(createHash("M"))
  .setCountry(createHash("US"))
  .setPhone(createHash("7956565656"))
  .setClientIpAddress("4.4.4.4")
  .setClientUserAgent("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0");

const userData_2 = new UserData()
  .setEmails(["joe@eg.com"])
  .setPhones(["f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a"])
  .setGender("M")
  .setClientIpAddress("4.4.4.4")
  .setClientUserAgent("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0")
  .setFbp("fb.1.1558571054389.1098115397")
  .setFbc("fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890");

const customData_0 = new CustomData().setValue(142.52).setCurrency("USD");
const purchaseEvent1 = new ServerEvent()
  .setEventName("Luquito's Event 2")
  .setEventTime(current_timestamp)
  .setUserData(userData_0)
  .setActionSource("website");

const viewContentEvent = new ServerEvent()
  .setEventName("ViewContent")
  .setEventTime(current_timestamp)
  .setUserData(userData_0)
  .setActionSource("website");

const eventsData = [viewContentEvent, purchaseEvent1];

const eventRequest = new EventRequest(metaAccessToken, pixelId, eventsData, undefined, "TEST63411");

console.log(`META_ACCESS_TOKEN: ${metaAccessToken}`);
console.log(`PIXEL_ID: ${pixelId}`);

eventRequest.execute().then(
  (response: any) => {
    console.log("Response: ", response);
  },
  (err: any) => {
    console.error("Error: ", err);
  }
);
