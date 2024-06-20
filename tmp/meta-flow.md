# Main flow of the entire integration

## Introduction

The entire flow of the integration is divided into the following main parts:

- Frontend side
- MetaConversions Bus & MetaConversions API
- Admin management
- Data Access Layer
- Workers

## Frontend side

Divided into 2 main parts:

- Meta Pixel integration
- MetaConversions API integration via custom hook

### Meta Pixel integration

Using the npm package (https://www.npmjs.com/package/react-facebook-pixel), the Meta Pixel integration is done by adding the Meta Pixel script to the website. This script is responsible for tracking events on the website and sending them to MetaConversions API.

### MetaConversions API integration via custom hook

A custom hook is created to handle the integration with MetaConversions API which is integrated in multiple components of the website.
This hook is responsible for sending events to the MetaConversions Bus, which then sends them to the MetaConversions API.

## MetaConversions Bus & MetaConversions API

A library created using the meta sdk (https://www.npmjs.com/package/facebook-nodejs-business-sdk) is used to send events to MetaConversions API and exposed in a custom hook.

A new database table is created for storing events that are not delivered to MetaConversions API. This table is used to store events that are not delivered due to network issues or other reasons.
If the sending process fails after a few retries, the event is marked as `not_delivered` and stored in the database. The `useEventBus` hook is responsible for retrying the sending process.

## Admin management

An admin panel is created to manage the events that are being to sent to MetaConversions API.
The admin panel will have the following features:

- The list of all Standard/Custom Events that are being sent to MetaConversions API
- Enable/Disable the sending of specific events
- Configurations settings to manage the sending process
- Retry sending events that are not delivered
- View the status of events that are being sent

## Data Access Layer

A new database table is created to store events that are being tracked to MetaConversions API.
This table is used to store events that are being sent to MetaConversions API and their status.
Before sending an event, we verify the status of the event, if its enabled or disabled to be sent.
When a event is sent to MetaConversions API, it is marked as `delivered` in the database.

## Workers

A worker is created to handle the sending of events to MetaConversions API.
This worker is responsible for sending events that are stored in the database and have not been delivered.
The worker runs in the background and checks for events that are not delivered and retries sending them.

# Events creation

- Pageview: Looks like managed only by the pixel
- ViewCategory: Lookssadas as
