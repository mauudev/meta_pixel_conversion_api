import { MetaEventBus } from "./core/MetaEventBus";
import { PurchaseEvent } from "./StandardEvents";
import { purchaseEventHandler } from "./EventHandlers";
import { config } from "dotenv-esm";

config();

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const PIXEL_ID = process.env.PIXEL_ID;
const TEST_EVENT_CODE = process.env.TEST_EVENT_CODE;

console.log("META_ACCESS_TOKEN: ", META_ACCESS_TOKEN);
console.log("PIXEL_ID: ", PIXEL_ID);
console.log("TEST_EVENT_CODE: ", TEST_EVENT_CODE);

const eventData = [
  {
    customData: {
      value: 100,
      currency: "USD",
      num_items: 1,
    },
    userData: {
      emails: ["mtrigo143@gmail.com"],
      phones: ["123456789"],
    },
  },
  {
    customData: {
      value: 200,
      currency: "USD",
      num_items: 1,
    },
    userData: {
      emails: ["mtrigo1432@gmail.com"],
      phones: ["123456789"],
    },
  },
  {
    customData: {
      value: 300,
      currency: "USD",
      num_items: 1,
    },
    userData: {
      emails: ["mtrigo1433@gmail.com"],
      phones: ["123456789"],
    },
  },
  {
    customData: {
      value: 400,
      currency: "USD",
      num_items: 1,
    },
    userData: {
      emails: ["mtrigo1434@gmail.com"],
      phones: ["123456789"],
    },
  },
];

const metaEventBus = new MetaEventBus(META_ACCESS_TOKEN, PIXEL_ID, TEST_EVENT_CODE);
metaEventBus.register(PurchaseEvent, purchaseEventHandler);
metaEventBus.initialize();

const events = eventData.map((data) => new PurchaseEvent(data.userData, data.customData));

async function processEvents(events) {
  try {
    const results = await Promise.all(events.map((event) => metaEventBus.handle(event)));
    console.log("Results: ", results);
  } catch (error) {
    console.error("Error processing events: ", error);
  }
}

processEvents(events);
