---
title: "Other tools"
lead: "Describes some tools available in the app monitor"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---


Here we will describe a few tools available in the app monitor that can help when managing your
environment.

## App explorer

The app explorer allows to see what's the metadata of the running app, which could be different
than the metadata you see in the app explorer (if you haven't pushed all changes).

Also in production this will be the only way to explore metadata because there isn't an app builder
instance there.

## Storage

From the `Storage` section in the app monitor you can explore what's in the temporary 
[key-value storage engine]({{site.baseurl}}/app-development-js-api-storage.html). You can do the
following things:

- See existing key-value pairs
- Edit value of an existing key
- Create new key-value pairs
- Clear storage, which will remove all key-value pairs

## Users management

In the section `Users` of the app monitor it is possible to manage users. 
[Here you can find more information about what you can do there.]({{site.baseurl}}/app-development-security-users.html)

## Console

The console allows to execute scripts directly in the app runtime. This is very useful for
maintenance tasks. For example let's suppose you need to update many records due to an unexpected
event and you don't have any feature in the app to do that. In this case, instead of going record
by record making the requested updates, you can write a script to update all affected records and
run it from the console.

When you execute a script in the console a job is created to execute it. All logs done in the job
will appear in the console output. You can write add logs to the job with the methods 
{% include js_symbol.html symbol='sys.jobs.logInfo()' %} or {% include js_symbol.html symbol='sys.jobs.logError()' %}, 
but there is a shortcut when executing a script in the console which is `log()`:

```js
for (var i = 0; i < 10; i++) {
  log('i: '+i);
}
```

Keep in mind that if you use {% include js_symbol.html symbol='sys.logs.info()' %} or 
{% include js_symbol.html symbol='sys.logs.error()' %}, those logs won't be in the console output 
but the app logs.

## REST API

Here we can find information about the REST API calls in our app over time:

- `Number of calls`: number of API calls that have been made to the app.
- `Average response time`: the average response time of API calls. If you see this number growing
  in a persistent way, you might need to add more instances to your app or increase the size of
  your instances.
- `Min response time`: the minimum response time to calls in the API of the app.
- `Max response time`: the maximum response time to calls in the API of the app.
