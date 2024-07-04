# Steps to integrate PubSub
- Message payload definition:
/home/mauudev/Desktop/develoop/intergraphics/guloggratis/Library/src/PubSub/Message.ts

- Topic & subscription definitions:
/home/mauudev/Desktop/develoop/intergraphics/guloggratis/Library/src/PubSub/Message.ts

- Topics to create:
  - `meta-event-tracking`
  - `meta-event-tracking-retry` 
  - `meta-event-tracking-dead-letter`

- route or gql mutation
/home/mauudev/Desktop/develoop/intergraphics/guloggratis/Services/Api/src/routes/EventsTracking.ts
Resolver or controller

- event handler
/home/mauudev/Desktop/develoop/intergraphics/guloggratis/Workers/LatestSearches/src/MessageHandler.ts

- listener service
/home/mauudev/Desktop/develoop/intergraphics/guloggratis/Workers/LatestSearches/src/start.ts

- Message bus
