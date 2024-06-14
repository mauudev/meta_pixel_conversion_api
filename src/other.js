import {
  Content as _Content,
  CustomData as _CustomData,
  DeliveryCategory as _DeliveryCategory,
  EventRequest as _EventRequest,
  UserData as _UserData,
  ServerEvent as _ServerEvent,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";
const Content = _Content;
const CustomData = _CustomData;
const DeliveryCategory = _DeliveryCategory;
const EventRequest = _EventRequest;
const UserData = _UserData;
const ServerEvent = _ServerEvent;
const data = [
  {
    action_source: "website",
    event_id: 12345,
    event_name: "MyTestEvent",
    event_time: 1718385788,
    user_data: {
      client_ip_address: "254.254.254.254",
      client_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0",
      em: "f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a",
    },
  },
];
const access_token =
  "EAAGhTpVxZCKQBO4ew8y6F5ZBGIFqqZCGh7xBItl02TraZBZBVWgOaq1RY9cEQ1nDH7ZBC3yHkRoZBe8wALwJ6hOU0z1yTMzmZCCbZCXG4NFcIhGPZAoe76XX9P7KedMGhFkK55El5noJYc4FJaMuWHAs6q58CzvpZBZCKs3f7OXxYgVX4CYF07AkP6CNfsyGckdQw9g6PgZDZD";
const pixel_id = "484978870726745";
const api = FacebookAdsApi.init(access_token);

let current_timestamp = Math.floor(new Date() / 1000);

const userData = new UserData()
  .setEmails(["joe@eg.com"])
  .setPhones(["12345678901", "14251234567"])
  // It is recommended to send Client IP and User Agent for Conversions API Events.
  // .setClientIpAddress(request.connection.remoteAddress)
  // .setClientUserAgent(request.headers["user-agent"])
  .setClientIpAddress("254.254.254.254")
  .setClientUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0")
  .setFbp("fb.1.1558571054389.1098115397")
  .setFbc("fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890");

const content = new Content()
  .setId("product123")
  .setQuantity(1)
  .setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);

const customData = new CustomData().setContents([content]).setCurrency("usd").setValue(123.45);

const serverEvent = new ServerEvent()
  .setEventId(123456789)
  .setEventName("Purchase")
  .setEventTime(current_timestamp)
  .setUserData(userData)
  .setCustomData(customData)
  .setEventSourceUrl("http://jaspers-market.com/product/123")
  .setActionSource("website");

const eventsData = [serverEvent];
const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);

eventRequest.execute().then(
  (response) => {
    console.log("Response: ", response);
  },
  (err) => {
    console.error("Error: ", err);
  }
);
