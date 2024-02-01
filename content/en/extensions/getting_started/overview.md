---
title: "Overview"
description: "Here, you will find information about integrating your apps with other applications and extending the platform's features."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "services"
toc: true
weight: 2
---

## **What are services?**

Services are crucial components that extend the functionality of the Slingr platform.

👉 An service is essentially a piece of software that operates alongside your app, providing additional features and capabilities.  For instance, you can implement an service that offers cryptographic algorithms, enabling your app to utilize them securely.

### Seamless app integration

One of the primary use cases for services is seamless integration with other applications, especially cloud-based services. Slingr offers an official services registry, which houses various services designed to facilitate smooth integration with popular services such as http, proxy pdf, or ftp.

![services overview](/images/vendor/extensions/service-overview.png)

As shown in the diagram above, apps can use the API provided by the service to send messages to another app. For example, it could be a method to request an external service:

```js
var url = "https://postman-echo.com/get"
var res = svc.http.get({
  url: url
});

log(JSON.stringify(res));
```
<br>

When an service is added to an app, its API will be accessible through functions defined in the scripts under the namespace **`svc.<serviceName>`**, as shown in the example above. To understand the API details, refer to the documentation for each specific service.

<br>
So, services extend the platform in two ways:

- A new API under the namespace **`svc.<serviceName>`** that can be accessed through scripts.
- Events that can be caught using service listeners.

Some external services will also provide a webhook URL where you can receive an asynchronous response from your service.
These can be handled using service listeners so the app can act upon a received response.
[You can find more information on how to use services here]({{<ref "/dev-reference/data-model-and-logic/services.md#endpoints-usage" >}}).

## **Service configuration**

Services can be added to an app in the app builder, in the **`Model > Services`** section. Here, you can
set the configuration of services, which basically consists of the type of service, name, and some
service specific settings like API keys, users, passwords, etc.

By default, the latest version of the service will be selected, and if the service is updated, it will always deploy the latest version. If you select a specific version of the service, you can choose the upgrade policy to automatically upgrade to compatible versions or to fix the version you previously selected.

[You can find more information about the configuration of services here]({{<ref "/dev-reference/data-model-and-logic/services.md#endpoints-configuration" >}}).

## **Service lifecycle**

When you add a new service in the app builder, you are just defining its configuration. To deploy
the service, you need to push changes (it will be deployed only if the initial status is **`Deployed`**). When
that happens, the service will be deployed, and from there, the status of the service should be handled
from the app monitor.

In the app monitor, in the **`Services`** section, you will be able to restart, undeploy, and deploy services.
The lifecycle of services is independent of the app. This means that when you restart an service, your
app keeps working, and vice versa. If events happened in the middle, operations will be retried
so no events are lost.

If you no longer need an service, you can remove it from the app builder, and the service will be
deleted when changes are pushed. Remember to manually delete usages of an service in scripts if you are going
to delete it.

## **Create your own services**

Finally, it is possible to create your own services to extend what the platform can do and connect
to other services that aren't included in the official services. [Learn more about that
here]({{<ref "/extensions/services/create_your_own.md" >}}).

