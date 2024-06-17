import {
  Content as _Content,
  CustomData as _CustomData,
  DeliveryCategory as _DeliveryCategory,
  EventRequest as _EventRequest,
  UserData as _UserData,
  ServerEvent as _ServerEvent,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";
// const Content = _Content;
const CustomData = _CustomData;
// const DeliveryCategory = _DeliveryCategory;
const EventRequest = _EventRequest;
const UserData = _UserData;
const ServerEvent = _ServerEvent;

let current_timestamp = Math.floor(new Date() / 1000);
const access_token =
  "EAAGhTpVxZCKQBOzdSQeX6FZCZBt1ieOOAZBpurfwGFZA7L5MjHgZAwegmnZCHZC0AQ7X86pKYwLsooRbIRtg6wl4Aiu1CyQCHWRVEh0jPtmOIfeK753SdWEjVdvtBv5Iur20z8xNb9daubxOWh5tdeCaC5NVal6bpu0OukKnviI6nWl7kOP54bi070nGSpx5tMFmZBwZDZD";
const pixel_id = "25810445075237872";
const api = FacebookAdsApi.init(access_token);
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
  .setEmails(["7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"])
  .setGender("M")
  .setCountry("US")
  .setPhones(["f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a"]);

const userData_1 = new UserData()
  .setEmails(["7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"])
  .setGender("M")
  .setCountry("US")
  .setFirstName("JohnSalchichon")
  .setPhones(["f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a"]);

const userData_2 = new UserData()
  .setEmails(["joe@eg.com"])
  .setPhones(["12345678901", "14251234567"])
  // It is recommended to send Client IP and User Agent for Conversions API Events.
  .setClientIpAddress("4.4.4.4")
  .setClientUserAgent("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0")
  .setFbp("fb.1.1558571054389.1098115397")
  .setFbc("fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890");

const customData_0 = new CustomData().setValue(142.52).setCurrency("USD");
const purchaseEvent1 = new ServerEvent()
  .setEventName("Purchase")
  .setEventTime(current_timestamp)
  .setUserData(userData_2)
  // .setCustomData(customData_0)
  .setActionSource("website");

const viewContentEvent = new ServerEvent()
  .setEventName("ViewContent")
  .setEventTime(current_timestamp)
  .setUserData(userData_2)
  .setActionSource("website");

const eventsData = [viewContentEvent];

// const eventRequest = new EventRequest(access_token, pixel_id, eventsData, "TEST63411");
const eventRequest = new EventRequest(access_token, pixel_id, eventsData);

eventRequest.execute().then(
  (response) => {
    console.log("Response: ", response);
  },
  (err) => {
    console.error("Error: ", err);
  }
);
