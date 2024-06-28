import { MetaEventBus, PurchaseEvent, purchaseEventHandler } from "./MetaPixelConversions";

const META_ACCESS_TOKEN =
  "EAAGhTpVxZCKQBOZBfEsRJXzAmb55CP4wet8fbF4KCjopNYQPfeEnlS2BGBMdcHcKBaKBCVGZA1zCkSelrkHFZAJliEAWJl4ZBD7U0ixycWuJNwTqysMLQS12EJtlngfmuOZBTo1dfZAiCrB4bbShjw6g2Fp3bEksnwvXxWz51mHoJogEkUdo6LVOgZBmliVWsQKezwZDZD";
const PIXEL_ID = "435714932594774";
const TEST_EVENT_CODE = "TEST82398";

export const eventBus = new MetaEventBus(META_ACCESS_TOKEN, PIXEL_ID, TEST_EVENT_CODE);
eventBus.initialize();
eventBus.register(PurchaseEvent, purchaseEventHandler);

const eventData = {
  customData: {
    value: 100,
    currency: "USD",
    num_items: 1,
  },
  userData: {
    emails: ["mtrigo143@gmail.com"],
    phones: ["123456789"],
  },
};

const purchaseEvent = new PurchaseEvent(eventData.userData, eventData.customData);

eventBus.handle(purchaseEvent);
