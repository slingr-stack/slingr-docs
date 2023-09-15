---
title: "UI services"
lead: "Explains what ui services are and how they can be set up."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 30
---

UI Services are client-side components designed to enhance the user interface (UI) features of the platform.

The primary use case for UI Services is to facilitate interactions with external applications on the client side. For example, a UI Service could be created to interact with Twilio, allowing it to display an incoming call and enabling users to answer it directly within the platform's UI.

## **Action definition**

When an action is defined for an entity, it becomes accessible through the UI, REST API, and JavaScript API.

## **Action settings**

### Label

This is the human-readable name of the UI Service, and it's displayed in the user interface (UI).

### Name

This internal name is used when sending messages to the UI Service from the backend using the JavaScript API. The name should not contain special characters or spaces, only letters and numbers.

### By groups

This option filters access to the UI Service by app groups.

### Places

Indicates where the UI Service should be loaded on the client side. Possible values include:
  - **`APP`**
  - **`LOGIN`**

### Dependencies

This feature allows you to load dependencies from external sources or files within the UI Service files. These dependencies can be placed at the top or bottom of the HTML and can be either JavaScript or CSS sources.

### Functions

Here, you should specify the exported functions. Each function should have a label, name, and whether they have callbacks or not.

### Events

List the events that can be triggered by the UI Service.

### Main file

This file contains the code that will be injected into the client-side UI. The exposed methods should be added to a service object and listed in the UI Service configuration.

### UI service helpers

These are utility functions designed to facilitate communication with the backend of your app from scripts within the UI Service.

For detailed information on configuring and using UI Services, refer to the UI Service's specific documentation.

#### sendEvent(eventName, eventData)

> Triggers a ui service event in the app.

##### Parameters

| Name            | Type           | Required | Description                                              |
|-----------------|----------------|----------|----------------------------------------------------------|
| **`eventName`** | string         | yes      |A simple string representing the event name.             |
| **`eventData`** | object         | no       | An optional object to be included in the event data.    |

##### Samples

``` js
// Trigger a ui service event
service.sendEvent('test', {msg:"this is a test event"});
```
<br>

#### callback(message, eventName, eventData)

> Triggers the callback of function of the ui service in the backend.

##### Parameters

| Name       | Type    | Required | Default | Description                                             |
|------------|---------|----------|---------|---------------------------------------------------------|
| **`message`** | object  | yes      |         | Used to send the function context back to the app.     |
| **`eventName`**| string | yes      |         | A simple string representing the callback event name.  |
| **`eventData`**| object  | no       |         | An optional object to be included in the event data.   |

##### Samples

``` js
// Trigger a ui service event in the backend
service.callback(originalMessage, 'fail', {msg: ' callback data'});
```
<br>

#### uiCallbacks(message, eventName, eventData)

> Triggers the callback of function of the ui service in the client side.

##### Parameters

| Name       | Type    | Required | Default | Description                                             |
|------------|---------|----------|---------|---------------------------------------------------------|
| **`message`** | object  | yes      |         | Used to send the function context back to the app.     |
| **`eventName`**| string | yes      |         | A simple string representing the callback event name.  |
| **`eventData`**| object  | no       |         | Data that the callback needs   |

##### Samples

``` js
// Trigger a ui service event callback client side
service.uiCallback(originalMessage, 'fail', {msg: ' callback data'});
```
<br>

## **Sending message to ui service**

It is possible to send messages to UI Services from a backend script using the JavaScript API. For example, to call the UI Service named **`'sample'`** for the **`'event1'`** event, you would use the following syntax:

```
sys.ui.sendMessage({
    scope: 'uiService:sample',
    name: 'event1',
    companyId: record.id(),
    callbacks: {
      callback1: function(originalMessage, callbackData) {
        sys.logs.debug("Here is the original message for callback 1");
        sys.logs.debug(JSON.stringify(originalMessage));
        sys.logs.debug("Here is the callback data for callback 1");
        sys.logs.debug(JSON.stringify(callbackData));
      },
      callback2: function(originalMessage, callbackData) {
        //do something
      }
    }
});
```
<br>

## **Events**

UI Services have the capability to send events to the backend. These events can be captured and processed by listeners configured with the type **`'UI Service'`** and selecting the corresponding event.

##### Parameters

| Name        | Type           | Description                                                     |
|-------------|----------------|-----------------------------------------------------------------|
| **`record`**  | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) | Represents the record where the action will be executed. This variable is available when the action type is **`One record`** or when applying the action to many records. |
| **`query`**   | [sys.data.Query]({{<ref "/dev-reference/scripting/sys-data.md#sysdataquery">}})  | A query object with filters to find all records affected by this action. This variable is used for actions of type Many records. |
| **`action`**  | [sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md#sysdataaction">}}) | Action object that provides access to the parameters of the action. |
| **`job`**     | [sys.jobs.Job]({{<ref "/dev-reference/scripting/sys-jobs.md#sysjobsjob">}})   | The job object, which is available when the action is executed in the background. It's important to note that the after-action executed script runs immediately after triggering the action from the UI, and the job may still be in a pending or running state. |


##### Samples

``` js
// after action is executed redirect to read only view of given record
var record = sys.data.findOne(query);
sys.ui.sendMessage({
    scope: 'global',
    name: 'navigate',
    view: '590ce2e38a2....',
    recordId: record.id()
  });
```
<br>
