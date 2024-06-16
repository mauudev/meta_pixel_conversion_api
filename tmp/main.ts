import {
  Content,
  CustomData,
  DeliveryCategory,
  EventRequest,
  UserData,
  ServerEvent,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";
// EAAGhTpVxZCKQBO9SFk76VQlnO0F0IQ1APZBcVFZAmW2uB3GCSt5V9rtsCZCDZB7X39qKMytI0aJZB2T57atgTHAVzbOQvAGBZBhYwhdb1BPGJYjdZBMJ9g2RZAb1K6YWKCvibpdCt14JO6IUbgJfgPXKCle9MGuUYO1vMoZCFlqtrmS0Tzg7bh6wI0mr5ygeDWdSybdQZDZD
const access_token: string =
  "EAAGhTpVxZCKQBO9SFk76VQlnO0F0IQ1APZBcVFZAmW2uB3GCSt5V9rtsCZCDZB7X39qKMytI0aJZB2T57atgTHAVzbOQvAGBZBhYwhdb1BPGJYjdZBMJ9g2RZAb1K6YWKCvibpdCt14JO6IUbgJfgPXKCle9MGuUYO1vMoZCFlqtrmS0Tzg7bh6wI0mr5ygeDWdSybdQZDZD";
const pixel_id: string = "484978870726745";
const api = FacebookAdsApi.init(access_token);

let current_timestamp: number = Math.floor(new Date().getTime() / 1000);

const userData: UserData = new UserData()
  .setEmails(["joe@eg.com"])
  .setPhones(["12345678901", "14251234567"])
  // It is recommended to send Client IP and User Agent for Conversions API Events.
  // .setClientIpAddress(request.connection.remoteAddress)
  // .setClientUserAgent(request.headers["user-agent"])
  .setFbp("fb.1.1558571054389.1098115397")
  .setFbc("fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890");

const content: Content = new Content()
  .setId("product123")
  .setQuantity(1)
  .setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);

const customData: CustomData = new CustomData().setContents([content]).setCurrency("usd").setValue(123.45);

const serverEvent: ServerEvent = new ServerEvent()
  .setEventName("Purchase")
  .setEventTime(current_timestamp)
  .setUserData(userData)
  .setCustomData(customData)
  .setEventSourceUrl("http://jaspers-market.com/product/123")
  .setActionSource("website");

const eventsData: ServerEvent[] = [serverEvent];
const eventRequest: EventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);

eventRequest.execute().then(
  (response: any) => {
    console.log("Response: ", response);
  },
  (err: any) => {
    console.error("Error: ", err);
  }
);
