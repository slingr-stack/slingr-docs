---
title: "Services"
description: "Learn about services and how to utilize them for connecting with external applications."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 28
---

Services are essential components that run alongside your application. They possess their own set of resources and are primarily designed to extend the capabilities of the platform.

The most common use case for services is to facilitate connections between your application and external apps by enabling the sending, receiving, and fetching of data through external APIs. For instance, you can create a service to manage HTTP requests or to generate PDF files.

## **Services configuration**

All services share some common settings, although each service may have additional settings that are specific to its functionality. It's important to refer to the service's documentation for a detailed explanation of these settings.

Here, we will describe some of the common settings:

### Label

This is the human-readable name of the service, primarily for organizational purposes and does not impact the app's execution.

### Name

This is the internal name of the service, used in the JavaScript API. It should not contain special characters or spaces, only letters and numbers. Be cautious when changing the service name, as it may require updates in scripts that reference it.

### Instance type

The HTTP service, for instance, offers two instance types: dedicated and shared. Shared instances do not require deployment configuration and use a platform component, while dedicated instances have specific components deployed for exclusive app usage, incurring additional costs.

### Initial status

This represents the initial status of the service when it is first pushed or synced. It only affects the service's first deployment. Afterward, the status should be managed through the app monitor. This feature is particularly useful for template apps that will be cloned; you can set the initial status to 'Undeployed' to delay activation until it's configured and deployed.

## **Service properties**

All configured services offer properties that can be valuable for developers. These properties are organized under the **`svc.<serviceName>`** namespace, where **`serviceName`** corresponds to the name of the service. While some properties are service-specific, there are also a couple of generic properties:

### Name 

This is the internal name of the service, used in the JavaScript API.

### Configuration

This JSON representation holds service-specific configurations.

### Token

This token is used to validate messages exchanged between the service and the platform.

For example, if you have a service named **`'fullcontact,'`** you can access its properties as follows:

``` js
sys.logs.info(JSON.stringify(svc.fullcontact));
```
<br>

Or having an service named ftp you can print the **`_token`**:

``` js
sys.logs.info(svc.ftp._token);
```
<br>

## **Service usage**

### Functions

Service functions are callable from any script and are accessed via the **`svc.<serviceName>`** namespace, where **`serviceName`** corresponds to the name of the service. For instance, if a service named 'pdfGenerator' provides a function called **`'generatePdf()'`**, you can invoke it from any script using the following syntax: **`svc.pdfGenerator.generatePdf()`**.

For example, here's a GET request using the HTTP service:

``` js
const resquest = 'https://www.slingr.io/';
var response = svc.http.get({url:request});
log(JSON.stringify("Response: " + response));
```
<br>

During the execution of a function, if errors occur, an exception will be thrown. By default, this exception halts the execution of the script, and the error is logged. However, you have the option to handle errors if desired.

Please refer to each service's documentation to identify the available functions and their respective error handling mechanisms.

### Callbacks

Some functions provide callbacks that facilitate the receipt of asynchronous responses. For example, when generating a PDF file using a PDF generator, you can incorporate a callback to perform actions once the image is returned:

``` js
try {
  let userName = sys.context.getCurrentUserRecord().label();
  let callbackData = {company: record, currentUserEmail: sys.context.getCurrentUserRecord().field('email').val()};
  let response = svc.pdf.generatePdf({}, callbackData, {
    responseArrived: function(event, data) {
      // event data
      sys.logs.info('Response arrived:');
      sys.logs.info('event: '+JSON.stringify(event));
      // callback data
      sys.logs.info('Record ID: '+data.company.id());
      sys.logs.info('User email: '+data.currentUserEmail);
    }
  }); 
  sys.logs.info("Pdf response: "+JSON.stringify(response));
} catch(e) {
   sys.logs.error('Error when try to generate a pdf file: '+sys.exceptions.getMessage(e));
}
```
<br>

When callbacks are supported, two parameters are available at the end:

- **`callbackData`**: This is an object that you can send and will be returned when the callback is processed. This is important because, in the function processing the callback, you won't have access to any variables outside the function scope. For instance, in the code above, you won't be able to reference the **`userName`** variable because it exists outside the callback function. This limitation arises because callback execution is asynchronous, resulting in a different context compared to regular JavaScript code. Keep this in mind when working with callbacks.

- **`callbacks`**: This is a map where you can register listeners for various callbacks. In the example above, it's listening only for the **`responseArrived`** callback, but certain services, like Mandrill, can trigger multiple callbacks based on different events. Functions within this callback have two parameters:
  - **`event`**: This parameter contains event information, identical to the event data available in listeners. Please refer to the service's documentation for details on service-specific events.
  - **`data`**: This parameter holds the callback data that was sent when the function was initially called.

Please consult each service's documentation to determine the available callbacks for each function.

### Events

Events signify occurrences within the service or an external app that require notification. These events can be triggered by the external app itself or detected by the service, prompting it to send an event to the app. For instance, an event might be generated when a message is sent to a Slack channel or when the FTP service detects a new file in the watched folder.

Events can be managed through service listeners. Each service offers its own set of events, so it's essential to consult the service's documentation for specific event details.
