import MetaEventBus from "./core/MetaEventBus";
import PurchaseEvent from "./StandardEvents/PurchaseEvent";
import PageViewEvent from "./StandardEvents/PageViewEvent";
import PurchaseEventHandler from "./EventHandlers/PurchaseEventHandler";
import PageViewEventHandler from "./EventHandlers/PageViewEventHandler";

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
metaEventBus.register(PageViewEvent.name, PageViewEventHandler);

console.log("Event bus registered handlers: ", metaEventBus.getHandlerRegistry());
metaEventBus.initialize();
const purchaseEvent = new PurchaseEvent(eventData.userData, eventData.customData);
// metaEventBus.handle(purchaseEvent);

const pageViewEvent = new PageViewEvent({}, {});
const event = pageViewEvent.buildEvent();
console.log("Event: ", event);
metaEventBus.handle(pageViewEvent);
