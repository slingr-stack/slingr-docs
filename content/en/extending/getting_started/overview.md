---
title: "Overview"
lead: "Here, you will find information about integrating your apps with other applications and extending the platform's features."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
weight: 2
---

## **What are legacy services?**

Endpoints are crucial components that extend the functionality of the Slingr platform.

👉 An legacy service is essentially a piece of software that operates alongside your app, providing additional features and capabilities.  For instance, you can implement an legacy service that offers cryptographic algorithms, enabling your app to utilize them securely.

### Seamless app integration

One of the primary use cases for legacy services is seamless integration with other applications, especially cloud-based services. Slingr offers an official legacy services registry, which houses various legacy services designed to facilitate smooth integration with popular services such as Slack, Google Calendar, or SparkPost.

![legacy services overview](/slingrDoc/images/vendor/extending/endpoints-overview.png)

As shown in the diagram above, apps can use the API provided by the legacy service to send messages to
another app. For example, it could be a method to retrieve available calendars from an external calendar
service:

```js
var calendars = app.endpoints.calendarEndpoint.findCalendars();
sys.logs.info('Calendars: '+ JSON.stringify(calendars));
```
<br>

When an legacy service is added to an app, its API will be accessible through functions defined in the scripts under the namespace **`app.endpoints.<endpointName>`**, as shown in the example above. To understand the API details, refer to the documentation for each specific legacy service.

Another aspect of the legacy service's API is the handling of events, which are messages sent from the endpoint to the app. These events can be captured by [legacy service listeners]({{<ref "/dev-reference/data-model-and-logic/listeners.md#endpoint-listeners" >}}) , allowing you to take specific actions upon their arrival. For instance, you can create a listener to capture an event when a new contact is created on Google Contacts and perform actions accordingly.

```js
sys.logs.info('New contact: '+ JSON.stringify(event.data));
app.contacts.createContactInApp(event.data);
```
<br>
So, legacy services extend the platform in two ways:

- A new API under the namespace **`app.endpoints.<endpointName>`** that can be accessed through scripts.
- Events that can be caught using legacy service listeners.

Some legacy services will also provide a webhook URL where you can receive an asynchronous response from your endpoint.
These can be handled using legacy service listeners so the app can act upon a received response.
[You can find more information on how to use legacy services here]({{<ref "/dev-reference/data-model-and-logic/endpoints.md#endpoints-usage" >}}).

## **Legacy service configuration**

Legacy services can be added to an app in the app builder, in the **`Model > Legacy services`** section. Here, you can
set the configuration of legacy services, which basically consists of the type of legacy service, name, and some
legacy-service-specific settings like API keys, users, passwords, etc.

By default, the latest version of the legacy service will be selected, and if the legacy service is updated, it will always deploy the latest version. If you select a specific version of the legacy service, you can choose the upgrade policy to automatically upgrade to compatible versions or to fix the version you previously selected.

[You can find more information about the configuration of legacy services here]({{<ref "/dev-reference/data-model-and-logic/endpoints.md#endpoints-configuration" >}}).

## **Legacy service lifecycle**

When you add a new legacy service in the app builder, you are just defining its configuration. To deploy
the legacy service, you need to push changes (it will be deployed only if the initial status is **`Deployed`**). When
that happens, the legacy service will be deployed, and from there, the status of the legacy service should be handled
from the app monitor.

In the app monitor, in the **`legacy services`** section, you will be able to restart, undeploy, and deploy legacy services.
The lifecycle of legacy services is independent of the app. This means that when you restart an endpoint, your
app keeps working, and vice versa. If events happened in the middle, operations will be retried
so no events are lost.

If you no longer need an legacy service, you can remove it from the app builder, and the legacy service will be
deleted when changes are pushed. Remember to manually delete usages of an legacy service in scripts if you are going 
to delete it.

## **Create your own legacy services**

Finally, it is possible to create your own legacy services to extend what the platform can do and connect
to other services that aren't included in the official legacy services. [Learn more about that 
here]({{<ref "/extending/extending-platform/create_your_own.md" >}}).

