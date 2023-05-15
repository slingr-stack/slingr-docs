---
title: "Endpoints"
lead: "Description of what endpoint are and how to use them to connect with external apps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---


Endpoints are components that run along with your app. They have their own resources and the main
purpose is to extend the features of the platform.

The most common use case is to connect your app with other apps by sending, receiving and fetching
data using their APIs. For example there are endpoints for Slack, Google Contacts, Google Calendar
and other popular cloud services so your app can easily take advantage of the features offered by
those apps.

## Global vs user endpoints

There are two types of endpoints:

- **Global endpoints**: these endpoints have a global configuration for the app, no matter which user is using
  it. For example the SparkPost endpoint is a global one as operations are not associated to any particular
  user of the app.
- **User endpoints**: these endpoints have a global configuration but also a configuration per user,
  configure in the tab `My integrations` under `My profile` in the app runtime.
  This is important when the external service needs to know which user is making the calls. For example 
  most Google endpoints need users to grant permissions so all operations are done on user's behalf. For
  example when you configure the Google Calendar endpoint, each user will need to grant permissions to
  start using it.
  There are two important things to keep in mind when using user endpoints:
  - **Method calls need a valid current user**: when you call a method in the endpoint's API, the current
    user in the context of execution must be connected to the endpoint, otherwise an error will be thrown.
    For example let's suppose you have a `contacts` entity and when a user creates a new record in that
    entity a contact is created in Google. If the user of the Slingr app that creates the record didn't
    connect the Google Contacts endpoint, the call to create the contact in Google will fail.
  - **Events could be generated per user**: if the event is per user, you might get many events when
    you might be expecting just one. For example if you have a Google Contacts endpoint and a listener
    for the event `Contact updated`, when a new contact is created in Google you will get one event
    **per user** instead of just one event. This means that if 10 users in your app are connected to
    the Google Contacts endpoint, you will get 10 events (assuming all 10 users have permissions to
    see the new contact).
    The reason for this behavior is that, based on settings or security rules, each user might see
    different things in the external system. For example a contact is created in Google but only 4 out
    of the 10 users in the app have access to see it based on the rules defined in Google Contacts.
    This way users that do not have access to the contact won't get the event and you don't need
    to repeat the security rules in your app that you have already set in Google.
  
## Endpoints configuration

All endpoints share some settings, however each endpoint will have additional settings. You should check
their documentation to know what they mean.

Here we will describe common settings.

### Label

This is the human-readable name of the endpoint. It doesn't have any usage during the execution of the app.

### Name

This is the internal name of the endpoint and it will be used in the Javascript API.

The name cannot contain special characters or spaces. Only letters and numbers.

One thing to keep in mind is that changing the name of the endpoint could have some side effects in scripts 
that were referencing the endpoint. For example if the name was `slack` and it is changed to something
like `slackmaster`, you might need to change calls like `app.endpoints.slack.*` to `app.endpoints.slackmaster.*`. In
the near feature we will provide some tools to help on these cases, but for know it must be done manually.

### Initial status

This is the initial status of the endpoint when it is pushed or synced for the first time. This means it
only has effect the first time. Once the endpoint is pushed or synced, the status it has will be kept and
you should change it from the app monitor.

This flag is specially useful when you build template apps that will be cloned, but you don't want endpoints
to be deployed until they are configured. This way the initial status can be set to `Undeployed` and it
won't be active until it is configured and deployed.

### Profile

Profiles are different deployment configurations for the endpoint, like memory allocation or other resources
needed by the endpoint. For example you might have an endpoint for Slack with profiles `Default`, `Medium team`
and `Big team`, where each one supports a different number of concurrent users in the Slack team. Each endpoint
will provide a meaningful description of each profile so you know which one you need.

This setting is only available on endpoints that support different profiles.

### Force end user configuration

This flag is only available for user endpoints. If this flag is set, when the user logs into the app, it will
be asked to configure the endpoint for its account. The user can still decide to close it and do it later,
but every time the user logs in the configuration screen will show up.

### Groups

This setting is only available for user endpoints. It indicates which groups can use this endpoint. You can
select all groups or just a few groups. Users must belong to at least one of the selected groups in order
to be able to use the endpoint, otherwise they won't see the endpoint at all.

### Endpoint-specific configuration

Apart from the common settings you should check each endpoint's documentation to see which are the settings
that can be configured. These settings are usually credentials and some configurations to determine the
behavior of the endpoint.

As endpoints are usually environment-dependent you should try to use environment variables to configure
things like credentials so you can use different accounts for production and development.

#### Secure endpoint-specific configuration

It is highly recommended to use environment variables to store sensitive information like passwords, keys, etc.
Then a specific configuration property can point to an environment variable. Please refer to [Environment variables]({{site.baseurl}}/app-development-environment-environment-variables.html)
 for more information.

## Endpoint properties

For all configured endpoints we have some properties that can be useful in some scenarios for developers. These properties are allocated on the
`app.endpoints.<endpointName>` namespace where `endpointName` is the name of the endpoint. Some of them are endpoint-specific but there are also
a couple of generic properties. These generic properties are:

### _name

This is the internal name of the endpoint and it will be used in the Javascript API.

### _configuration

Here we will find a `JSON` representation for the [endpoint-specific configuration]({{site.baseurl}}/app-development-model-endpoints.html#endpoint-specific-configuration).

### _token

This is the token used to validate messages between the endpoint and the platform.

For example if you have an endpoint called `fullcontact` you can see all the properties like this:

```js
sys.logs.info(JSON.stringify(app.endpoints.fullcontact));
```
Or having an endpoint called ftp you can print the `_token`:

```js
sys.logs.info(app.endpoints.ftp._token);
```

## Endpoints usage

When an endpoint is added it will provide two new features to the app:

- **Functions**: these functions can be called from any script. These functions are usually used to to
  send and fetch data from an external app.
- **Events**: these are events triggered by the external app that can be processed through listeners. This
  way when you create a listener for endpoints you will see the endpoint and its events so you can process
  them.

### Functions

Endpoint functions can be called from any script. They are under the namespace `app.endpoints.<endpointName>`
where `endpointName` is the name of the endpoint. For example if an endpoint with name `slack` provides 
a function called  `sendMessage()` it can be called from any script using `app.endpoints.slack.sendMessage()`.

For example this is a call to send a message using the Slack endpoint:

```js
const msg = action.field('message').val();
app.endpoints.slack.sendMessage({channel: '#test', message: msg});
```

If there are errors during the execution of the function, an exception will be thrown. By default the
exception will stop the execution of the script and the error will be logged, but you can handle it
if you want:

```js
const msg = action.field('message').val();
try {
  app.endpoints.slack.sendMessage({channel: '#test', message: msg});
} catch (e) {
  sys.logs.warn('There was a problem sending a message through Slack: '+sys.exceptions.getMessage(e));
}
// execution will continue even if the message to Slack couldn't be sent
```

You should check each endpoint's documentation to see which functions are available.

### User endpoint functions

When it is a user endpoint, probably most functions calls will be associated to a user. For example, if
we are using the Google Contacts user endpoint, when we create a new contact in the endpoint it has to 
be added to the Google account of the user using the app.
 
This is determined through the current user of the execution context (you can always check it in a
script using {% include js_symbol.html symbol='sys.context.getCurrentUser()' %}). This means that, 
following our previous example, when we call the function to create a contact in Google Contacts, the 
endpoint will check who is the current user and will create the contact on behalf of that user. As 
you would expect, this requires that current user has already connected to the endpoint, otherwise 
the function call will fail.

There are cases where the current user could be the system one. In this cases if you call a method
of the endpoint that needs to be associated to the user, it will fail. If you know the user that should
be used to call the function, you can set it using the method {% include js_symbol.html symbol='sys.context.setCurrentUser()' %} 
and then call the endpoint's function.

All user endpoints implement the following functions:

- `connectUser(config)`: connects the current user to the endpoint, where `config` is the configuration
  of user for that endpoint. For example:
  
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
- `disconnectUser()`: disconnects the current user from the endpoint. For example:

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
- `isUserConnected()`: returns `true` if current user is connected to the endpoint, `false` otherwise.
  For example:
  
  
  ```js
  if (app.endpoints.googleContacts.isUserConnected()){
      sys.logs.info('User connected');
  } else {
      sys.logs.info('User disconnected');
  }
  ```

### Callbacks

There are some functions that provides callbacks that allow to receive an async response easily. For
example when sending an email with Mandrill you can put a callback to do something when the email is
replied:

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

When callbacks are allowed, two parameters are available at the end:

- `callbackData`: this is an object you can send that you will get back when the callback is processed.
  This is important because in the function that processes the callback you won't have access to any
  variable outside the function. For example in the code above you won't be able to reference the
  variable `msg` because it is outside the callback function. The reason for this is that as the callback
  is async the context is lost, which is different from regular Javascript code, so keep that in mind.
- `callbacks`: this is a map where you can listener for different callbacks. The example above only listens
  to the `responseArrived` callback, but the Mandrill endpoint can send more callbacks based on different
  events. Functions in this callback have two parameters:
  - `event`: this is the event information which is exactly the same as the event available in listeners.
    Please check the docs for [Endpoint listeners]({{site.baseurl}}/app-development-model-listeners.html#endpoint-listeners).
  - `data`: this is the callback data that was sent when the function was called.
  
You should check each endpoint's documentation to see which are the available callbacks for each function.

### Events

Events indicates that something happened in the external app that must be notified. It could be generated by
the external app itself or the endpoint might detect something and sends an event to the app. For example it could be 
that a message was sent to a channel in Slack or the FTP endpoint detected that there is a new file in the folder
it is watching.

Events can be handled trough [Endpoint listeners]({{site.baseurl}}/app-development-model-listeners.html#endpoint-listeners).
Each endpoint provides its own events, so you should check their documentation.

### User endpoint events

There is one important thing about user endpoints. When events arrived, in the context of execution current user
is set to the user where the event comes from. This way, when processing the event in the listener, if you call
{% include js_symbol.html symbol='sys.context.getCurrentUserRecord()' %} you will get the user associated to the event:

```js
const currentUser = sys.context.getCurrentUserRecord();
sys.logs.info('*** EVENT FOR USER: '+currentUser.field('email').val());
```

Keep in mind that there might be global events in a user endpoint, so in those cases current user will be `null`.
You should check that in the endpoint's documentation.

Finally, user endpoints have two additional events that are always available:

- `User connected`: indicates that a user connected to the endpoint, which usually means that the user granted
  permissions. This event has some information about the configuration that you can get at `event.data.configuration`:
  
  ```js
  sys.logs.info('User connected to Google Calendar: '+sys.context.getCurrentUserRecord().field('email').val());
  sys.logs.info(' - Configuration: '+JSON.stringify(event.data.configuration));
  ```
- `User disconnected`: indicates that a user disconnected from the endpoint.

