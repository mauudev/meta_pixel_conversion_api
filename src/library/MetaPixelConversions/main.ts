import MetaEventBus from "./core/MetaEventBus";
import PurchaseEventHandler from "./EventHandlers/PurchaseEventHandler";
import PurchaseEvent from "./StandardEvents/PurchaseEvent";

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

class MyEvent {
  constructor() {}
}

const someEvent = new MyEvent();

console.log(`Event class name: ${PurchaseEvent.name}`);
console.log(`Event class name: ${someEvent.constructor.name}`);
// const purchaseEvent = new PurchaseEvent(eventData.userData, eventData.customData).buildEvent();

const metaEventBus = new MetaEventBus();
metaEventBus.register(PurchaseEvent.name, PurchaseEventHandler);

console.log("Event bus registered handlers: ", metaEventBus.getHandlerRegistry());
metaEventBus.initialize();
const purchaseEvent = new PurchaseEvent(eventData.userData, eventData.customData);
metaEventBus.handle(purchaseEvent);
