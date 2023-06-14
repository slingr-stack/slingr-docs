---
title: "Extending the platform overview"
lead: "Here you will find information about how to integrate your apps with other apps as well as how to extend the features of the platform."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
---

The Slingr platform can be extended through endpoints. An endpoint is a piece of software that runs 
along the app and provides additional functionality. For example there could be an endpoint that
provides cryptographic algorithms so your app can use them.

However the most common usage for endpoints is to connect to other apps, specially other cloud apps.
That's what you'll find in our official endpoints registry, where there are endpoints to easily
integrate your apps with services like Slack, Google Calendar or SparkPost.

![Endpoints overview](/images/vendor/extending/endpoints-overview.png)

As shown in the diagram above apps can use the API provided by the endpoint to send messages to
the other app. For example, it could be a method to get available calendars in an external calendar
service:

```js
var calendars = app.endpoints.calendarEndpoint.findCalendars();
sys.logs.info('calendars: '+JSON.stringify(calendars));
```

When an endpoint is added to an app, the API for it will be accessible through functions defined in the scripts under the
namespace `app.endpoints.<endpointName>`, as can be seen in the example above. You should check the
documentation for each endpoint to know what's the API.

The other part of the API of the endpoint are events, which are messages coming from the endpoint
to the app. These events can be captured by [endpoint listeners](app-development-model-listeners.html#endpoint-listeners)
so you can do something upon arrival. For example you could create a listener to catch an event 
when a new contact is created on Google Contacts and do something like this:

```js
sys.logs.info('new contact from google contacts: '+JSON.stringify(event.data));
app.contacts.createContactInApp(event.data);
```

So endpoints will extend the platform in two ways:

- A new API under the namespace `app.endpoints.<endpointName>` that can be accessed through scripts
- Events that can be caught using endpoint listeners

Some endpoints will also provide a webhook URL where you can receive an async response from your endpoint.
These can be handled using endpoint listeners so the app can act upon a received response.
[You can find more information on how to use endpoints here](app-development-model-endpoints.html#endpoints-usage).

## Configuration of endpoints

Endpoints can be added to an app in the app builder, in section `Model > Endpoints`. Here you can
set the configuration of endpoints which basically consists of the type of endpoint, name and some
endpoint-specific settings like API keys, users, passwords, etc. 

By default, the latest version of the endpoint will be selected, and if the endpoint is updated it will always deploy the latest
version. If you select a specific version of the endpoint you can select the upgrade policy to automatically upgrade to
compatible versions or to fix the version you previously selected.

[You can find more information about the configuration of endpoints here](app-development-model-endpoints.html#endpoints-configuration).

## Lifecycle of endpoints

When you add a new endpoint in the app builder you are just defining its configuration. In order to deploy
the endpoint you need to push changes (it will be deployed only if the initial status is `Deployed`). When
that happens the endpoint will be deployed and from there the status of the endpoint should be handled
from the app monitor.

In the app monitor, in the section `Endpoints`, you will be able to restart, undeploy and deploy endpoints.
The lifecycle of endpoints is independent from the app. This means that when you restart an endpoint your
app keeps working and the other way around. If events happened in the middle operations will be retried
so no events are lost.

If you don't want an endpoint any longer, you can remove it from the app builder and the endpoint will be
removed when changes are pushed. Remember to manually delete usages of an endpoint in scripts if you are going 
to delete it.

## Create your own endpoints

Finally it is possible to create your own endpoints to extend what the platform can do and connect
to other services that aren't included in the official endpoints. [Learn more about that 
here](extensions-create-your-own-endpoints.html).

