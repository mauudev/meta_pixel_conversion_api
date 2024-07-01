import { useState, useEffect, useRef } from "react";
import { MetaEventBus } from "../library/MetaPixelConversions/core/MetaEventBus";
import { AddToCartEvent, PurchaseEvent } from "../library/MetaPixelConversions/StandardEvents";
import { addToCartEventHandler, purchaseEventHandler } from "../library/MetaPixelConversions/EventHandlers";

const META_ACCESS_TOKEN =
  "EAAGhTpVxZCKQBOx5796S4JVHZCrCPuO8IXNzNnlory15vrZBoJcQNaKBmyDXdfM1JCsXyFi578Exjk8btcRikRAgO8B3ezJKksFkill5T3zhaiqoSsxbRpgKkfF7X6Q16YXinOnZBUjwvR8hFYXDTsy9bOouUl5T7UOSylOZC3JQZA2JyEvZBYaxWytCQPBejMemgZDZD";
const PIXEL_ID = "435714932594774";
const TEST_EVENT_CODE = "TEST29800";

const TRACKING_EVENTS = {
  PURCHASE: PurchaseEvent,
  ADD_TO_CART: AddToCartEvent,
};

export const useSendMetaEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const metaEventBusRef = useRef(null);

  useEffect(() => {
    if (!metaEventBusRef.current) {
      metaEventBusRef.current = new MetaEventBus(META_ACCESS_TOKEN, PIXEL_ID, TEST_EVENT_CODE);
      metaEventBusRef.current.register(PurchaseEvent, purchaseEventHandler);
      metaEventBusRef.current.register(AddToCartEvent, addToCartEventHandler);
      metaEventBusRef.current.initialize();
    }
  }, []);

  const sendEvent = async (eventType: string, eventData: { userData: any; customData: any }) => {
    setIsLoading(true);
    setError(null);

    try {
      const event =
        TRACKING_EVENTS[eventType] &&
        new TRACKING_EVENTS[eventType](eventData.userData, eventData.customData);

      const result = await Promise.all([metaEventBusRef.current.handle(event)]);
      setResults(result);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { sendEvent, isLoading, results, error };
};
