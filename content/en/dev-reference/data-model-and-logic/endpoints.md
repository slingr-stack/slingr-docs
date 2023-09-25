---
title: "Legacy services"
description: "Learn about legacy services and how to utilize them to establish connections with external applications."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 27
---

Legacy services are components that operate alongside your app. They possess their own resources and their primary purpose is to enhance the platform's capabilities.

A prevalent use case is establishing connections between your app and other applications through the utilization of APIs for sending, receiving, and retrieving data. For instance, endpoints exist for services like Slack, Google Contacts, Google Calendar, and various other widely-used cloud platforms. This allows your app to seamlessly leverage the functionalities provided by these external services.

## **Global vs. user legacy services**

There are two categories of legacy services:

- **`Global legacy services`**: These legacy services boast a universal configuration for the entire app, irrespective of the user. For instance, the SparkPost legacy service falls under this category as its operations aren't tied to any specific app user.
- **`User legacy services`**: These legacy services feature both a global configuration and an individual configuration per user. This configuration is managed within the **`My integrations`** tab under **`My profile`** in the app runtime. This distinction becomes crucial when the external service necessitates awareness of the user initiating the calls. For instance, most Google legacy services require users to grant permissions so that all operations are executed on the user's behalf. Consider the Google Calendar legacy service configuration; each user must grant permission to access it. Two key considerations when employing user legacy services are:
  - **`Valid Current User for Method Calls`**: When calling a method in the legacy service's API, the current user within the execution context must be connected to the legacy service. Failure to meet this requirement will result in an error. For instance, if a user creates a new record in a **`contacts`** entity, and the Slingr app user hasn't connected the Google Contacts endpoint, the attempt to create the contact in Google will fail.
  - **`User-Based Event Generation`**: Events generated per user might lead to multiple events when you expect only one. For example, with a Google Contacts endpoint and a **`Contact updated`** event listener, creating a new contact in Google results in an event **p`er user`**, rather than a single event. This means that if 10 users in your app are connected to the Google Contacts endpoint, you will receive 10 events, assuming all 10 users have permission to view the new contact. This behavior acknowledges that each user may have varying levels of access in the external system based on settings or security rules. This way, users without access to specific content won't receive irrelevant events, sparing the need to replicate security rules within your app.

## **Legacy service configuration**

While there are certain shared settings among legacy services, each legacy service may have distinct additional settings. Documentation for each specific legacy service should be consulted for detailed explanations of these settings.

Here, we will elucidate common settings.

### Label

This stands as the human-readable legacy service name, serving no operational purpose during app execution.

### Name

This internal legacy service name is used within the JavaScript API.

The name should exclusively consist of letters and numbers, with no special characters or spaces.

It's worth noting that altering the legacy service name could have ramifications for scripts referencing the legacy service. For example, if the name changed from **`slack`** to something like **`slackmaster`**, calls like **`app.endpoints.slack.*`** might need to be updated to **`app.endpoints.slackmaster.*`**. Although we intend to provide tools to assist in such cases, for now, changes must be made manually.

### Initial status

This signifies the legacy service's initial status when first pushed or synced. This setting exclusively affects the initial deployment. Once the legacy service is pushed or synced, its status remains unchanged and should be modified through the app monitor.

This flag is particularly useful when constructing template apps that will be cloned, but you wish to delay legacy service deployment until they are configured. Thus, the initial status can be set to **`Undeployed`**, ensuring it remains inactive until configured and deployed.

### Profile

Profiles represent distinct deployment configurations for a legacy service, encompassing resource allocation and other necessities. For instance, a Slack legacy service might feature profiles like **`Default`**, **`Medium team`**, and **`Big team`**, each accommodating a different number of concurrent Slack team users. The legacy service documentation should provide a comprehensive description of each profile, aiding in selecting the suitable one.

This setting is only applicable to legacy services that support multiple profiles.

### Force end user configuration

This flag is exclusive to user legacy services. When enabled, users logging into the app will be prompted to configure the legacy service for their accounts. Although users can postpone this process and configure it later, the configuration screen will appear whenever they log in.

### Groups

Applicable only to user legacy services, this setting designates which groups are permitted to use the legacy service. Selection can be made from all groups or specific ones. Users must belong to at least one selected group to access the legacy service; otherwise, the legacy service will be invisible to them.

### Legacy service-specific configuration

In addition to common settings, legacy service-specific configuration options should be explored in each legacy service's documentation. These typically encompass credentials and configurations influencing legacy service behavior.

Due to the environment-dependent nature of legacy services, employing environment variables for configuration, especially for sensitive information like credentials, is advisable. This facilitates the use of distinct accounts for development and production.

#### Secure legacy service-specific configuration

Storing sensitive data, such as passwords and keys, in environment variables is highly recommended. Configuration properties can then reference these environment variables. For further details, consult the documentation on [Environment Variables]({{<ref "/dev-reference/environment-settings/environment-var.md">}}).

## **Legacy service properties**

For all configured legacy services, several properties prove useful to developers in certain scenarios. These properties are accessible through the **`app.endpoints.<endpointName>`** namespace, where **`endpointName`** represents the legacy service's name. While some are endpoint-specific, a couple of generic properties exist:

### _name

This is the internal name of the legacy service, used within the JavaScript API.

### _configuration

This property contains a **`JSON`** representation of the legacy-service-specific configuration.

### _token

This token is employed to validate messages exchanged between the legacy service and the platform.

For example, if a legacy service is named **`fullcontact`**, the properties can be accessed like this:

```js
sys.logs.info(JSON.stringify(app.endpoints.fullcontact));
```
<br>

Or having a legacy service called ftp you can print the **`_token`**:

```js
sys.logs.info(app.endpoints.ftp._token);
```
<br>

## **Legacy services usage**

When a legacy service is added, it introduces two new features to the app:

- **`Functions`**: These functions can be invoked from any script and are typically used to send and retrieve data from an external app.
- **`Events`**: These events are triggered by the external app and can be handled through listeners. By creating listeners for legacy services, you can intercept and process these events.

### Functions

Legacy service functions are accessible from any script using the namespace **`app.endpoints.<endpointName>`**, where **`endpointName`** refers to the legacy service's name. For instance, if there's a legacy service named **`slack`** that offers a function called **`sendMessage()`**, you can call it from any script using **`app.endpoints.slack.sendMessage()`**.

For instance, the following is an example of a call to send a message using the Slack legacy service:

```js
const msg = action.field('message').val();
app.endpoints.slack.sendMessage({channel: '#test', message: msg});
```
<br>

If errors occur during the execution of a function, an exception will be raised. By default, this exception halts the execution of the script, and the error is logged. However, you have the option to handle it if desired:

```js
const msg = action.field('message').val();
try {
  app.endpoints.slack.sendMessage({channel: '#test', message: msg});
} catch (e) {
  sys.logs.warn('There was a problem sending a message through Slack: '+sys.exceptions.getMessage(e));
}
// execution will continue even if the message to Slack couldn't be sent
```
<br>

You should refer to each legacy service's documentation to identify the functions that are available.

For example, to learn about the functions provided by the Slack legacy service, consult the Slack legacy service's documentation.

### User legacy service functions

For user legacy services, most function calls are likely to be tied to a specific user. For instance, consider the case of using the Google Contacts user legacy service. When creating a new contact within this legacy service, it needs to be added to the Google account of the user currently utilizing the app.

This determination hinges on the current user within the execution context (you can check this using the script: **`sys.context.getCurrentUser()`**. In the aforementioned example, when invoking the function to create a contact in Google Contacts, the legacy service identifies the current user and performs the contact creation on behalf of that user. Naturally, this assumes that the current user has previously connected to the legacy service; otherwise, the function call will fail.

There are instances where the current user might be the system user. In such cases, if you attempt to call a legacy service method requiring association with a user, the call will fail. If you possess the information about the user intended for this function call, you can set it using the method **`sys.context.setCurrentUser()`** before calling the legacy service's function.

All user legacy service incorporate the following functions:

- **`connectUser(config)`**: Establishes a connection between the current user and the legacy service. Here, **`config`** pertains to the user's configuration for that specific legacy service. For instance:
  
  ```js
  const msg = {};
  msg.configuration = {};
  msg.configuration.code = 'user-code'; // code generated on the authentication page by the user
  try {
      const response = app.endpoints.googleContacts.connectUser(msg, {
          'userConnected': function(event) {
              sys.logs.info('User connected to Google Contacts: '+sys.context.getCurrentUser().fullName());
              sys.logs.info(' - Configuration: '+JSON.stringify(event.data.configuration));
          },
          'userDisconnected': function(event) {
              sys.logs.info('Could not connect user to Google Contacts:'+sys.context.getCurrentUser().fullName());
          }
      });    
      sys.logs.info('Response: '+JSON.stringify(response));
  } catch(e) {
      sys.logs.error('Error when try to execute function ['+sys.exceptions.getMessage(e)+']');
  }
  ```
  <br>

- **`disconnectUser()`**: disconnects the current user from the endpoint. For example:

  ```js
  const msg = {};
  try {
      const response = app.endpoints.googleContacts.disconnectUser(msg, {
          'userDisconnected': function(event) {
              sys.logs.info('User disconnected from Google Contacts:'+sys.context.getCurrentUser().fullName());
          }
      });
      sys.logs.info("Response: "+JSON.stringify(response));
  } catch(e) {
      sys.logs.error('Error when try to execute function ['+sys.exceptions.getMessage(e)+']');
  }
  ```
  <br>
- **`isUserConnected()`**: returns **`true`** if current user is connected to the endpoint, **`false`** otherwise.
  For example:
  
  ```js
  if (app.endpoints.googleContacts.isUserConnected()){
      sys.logs.info('User connected');
  } else {
      sys.logs.info('User disconnected');
  }
  ```
  <br>

### Callbacks

Certain functions offer callbacks that enable easy handling of asynchronous responses. For instance, when utilizing the function to send an email with Mandrill, you can include a callback to perform an action when a reply to the email is received:

```js
let msg = {};
msg.subject = "A test subject.";
msg.templateName = "test-template";
msg.important = true;
msg.to = "user1@test.com";
msg.globalMergeVars = {
  companyName: record.field('name').val(),
  companyId: record.id()
};
msg.waitResponse = true;
 
try {
  let callbackData = {company: record, currentUserEmail: sys.context.getCurrentUserRecord().field('email').val()};
  let response = app.endpoints.mandrill.sendEmail(msg, callbackData, {
    responseArrived: function(event, data) {
      // event data
      sys.logs.info('Response arrived:');
      sys.logs.info('Date/Time: '+event.data.eventTime);
      sys.logs.info('From: '+event.data.fromName+' <'+event.data.fromEmail+'>');
      sys.logs.info('Subject: '+event.data.subject);
      sys.logs.info('Text: '+event.data.text);
      // callback data
      sys.logs.info('Record ID: '+data.company.id());
      sys.logs.info('User email: '+data.currentUserEmail);
    }
  }); 
  sys.logs.info("Mandrill response: "+JSON.stringify(response));
} catch(e) {
   sys.logs.error('Error when try to send an email: '+sys.exceptions.getMessage(e));
}
```
<br>

When callbacks are supported, two parameters are available at the end:

- **`callbackData`**: This object can be sent, and it will be returned when the callback is processed. This is crucial because, in the function processing the callback, access to variables outside the function is restricted. For instance, in the previously provided code, referencing the variable **`msg`** outside the callback function isn't feasible. This limitation arises due to the asynchronous nature of callbacks, causing a loss of context, which differs from standard JavaScript behavior. Hence, it's important to keep this in mind.
- **`callbacks`**: This map allows you to listen for various callbacks. The earlier example only listens to the **`responseArrived`** callback. However, the Mandrill legacy service can trigger additional callbacks based on diverse events. Functions within this callback possess two parameters:
  - **`event`**: This encompasses the event information, identical to the event available in listeners. Refer to the documentation on [Legacy service Listeners]({{<ref "/dev-reference/data-model-and-logic/listeners.md#endpoint-listeners">}}).
  - **`data`**: This constitutes the callback data dispatched when the function was called.

Please consult each legacy service's documentation to ascertain the available callbacks for each function.

### Events

Events signify occurrences within the external app that require notification. These events can originate from the external app itself, or the legacy service might identify certain events and relay them to the app. For instance, this could involve a message sent to a Slack channel or the FTP legacy service detecting a new file in a monitored folder.

Events can be managed via [Legacy service Listeners]({{<ref "/dev-reference/data-model-and-logic/listeners.md#endpoint-listeners">}}). Each legacy service provides its own distinct events; therefore, consulting the documentation for each legacy service is advised.

### User legacy service events

A key aspect regarding user legacy services pertains to event processing. When events arrive, the current execution context is aligned with the user from whom the event originated. Consequently, during event handling within the listener, if you invoke **`'sys.context.getCurrentUserRecord()'`** you will get the user associated to the event:

```js
const currentUser = sys.context.getCurrentUserRecord();
sys.logs.info('*** EVENT FOR USER: '+currentUser.field('email').val());
```
<br>

Keep in mind that there might be global events in a user legacy service, so in those cases current user will be **`null`**.
You should check that in the legacy service's documentation.

Finally, user legacy services have two additional events that are always available:

- **`User connected`**: indicates that a user connected to the legacy service, which usually means that the user granted
  permissions. This event has some information about the configuration that you can get at **`event.data.configuration`**:
  
  ```js
  sys.logs.info('User connected to Google Calendar: '+sys.context.getCurrentUserRecord().field('email').val());
  sys.logs.info(' - Configuration: '+JSON.stringify(event.data.configuration));
  ```
  <br>
- `User disconnected`: indicates that a user disconnected from the legacy service.

