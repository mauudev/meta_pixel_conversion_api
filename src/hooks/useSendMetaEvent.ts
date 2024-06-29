import { useState, useEffect, useRef } from "react";
import { MetaEventBus } from "../library/MetaPixelConversions/core/MetaEventBus";
import { AddToCartEvent, PurchaseEvent } from "../library/MetaPixelConversions/StandardEvents";
import { addToCartEventHandler, purchaseEventHandler } from "../library/MetaPixelConversions/EventHandlers";

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const PIXEL_ID = process.env.PIXEL_ID;
const TEST_EVENT_CODE = process.env.TEST_EVENT_CODE;

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

  const sendEvents = async (events) => {
    setIsLoading(true);
    setError(null);

    try {
      const processedEvents = events.map((data) => new PurchaseEvent(data.userData, data.customData));
      const results = await Promise.allSettled(
        processedEvents.map((event) => metaEventBusRef.current.handle(event))
      );

      setResults(results);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { sendEvents, isLoading, results, error };
};
