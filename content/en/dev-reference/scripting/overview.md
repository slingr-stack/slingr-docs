---
title: "Javascript API overview"
lead: "The Slingr platform allows to use Javascript scripts to define behavior and processes. This section provides an overview on how scripts can be used to extend the functionality of your app."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 58
---

## Overview

Scripts are a very flexible way to extend and customize your apps. Using a declarative
way is usually preferred, but we acknowledge that in many situations it is just not possible to
consider all cases or it is just easier to write a few lines of code instead of going
through a complicated and time consuming UI to express things in a declarative way.

The goal is that you only write scripts to express the behavior of your application. You 
will never write boilerplate code or infrastructure code. That's all handled by the platform
so you can focus on what's more important to you: solve problems and provide business value.

In this document you will find general information about scripts, but you should check
the documentation to see the different places where you can write scripts and how they
are used in each case.

In order to make it easier to write scripts, we have created a [Javascript API]({{site.baseurl}}/app-development-js-api.html) 
that provides services to easily access your application's features and data. You will
be making an extensive you of the API while writing scripts, so be sure to have it accessible,
though there are many links from the app builder to the documentation as well.

Apart from the Javascript API, you can also access endpoints features as well as
custom libraries.

With the endpoints API you will be able to call functions in endpoints, sending messages
to external services as if that were just a simple method invocation. [You can find more
information on how to use endpoints through scripts here]({{site.baseurl}}/app-development-model-endpoints.html).

Custom libraries allow you to keep reusable code in a central place. This can be referenced
anywhere in your app. [You can find more information on custom libraries 
here]({{site.baseurl}}/app-development-model-libraries.html).

## Permissions

When executing scripts permissions are not taken into account. For example if a user has
permissions to execute action `A` but not permissions to access entity `E`, but the
script in action `A` performs operations in entity `E`, this action will still work
well when the user executes it.

The rational behind this is that developers are in control of scripts and if they
grant permissions to execute a script, the platform assumes the script does things
that are allowed to the user.

## Exception handling

When there is an error, an exception will be thrown. For example if you call a method in
the Javascript API with invalid parameters, an exception will be thrown. If there is an
error executing an endpoint's function, an exception will be thrown.

If you don't catch the exception, it will rise until it is caught by the platform and will
be logged so you can see the error in the app monitor. There you will be able to see where
the exception was thrown, the snippet of your code as well as a stack trace so you can
follow the different calls made.

There are cases where you might want to handle the exception because you don't want the
execution of the script to be interrupted. In these cases you can use the regular tools
provided by Javascript to do so:

```js
...
try {
  app.endpoints.slack.sendMessage(params);
} catch (e) {
  sys.logs.warn('There were errors sending message to Slack: '+sys.exceptions.getMessage(e), e);
}
```

The Javascript API provides some tools to help getting the error message and code from
exceptions (this is good because some exceptions have different internal structures) in
[sys.exceptions]({{site.baseurl}}/app-development-js-api-exceptions.html) package.

Also remember that you can always log the exception, even when you log as `INFO`. This might
be useful when debugging an app. You can find that in the logging methods in the
[sys.logs]({{site.baseurl}}/app-development-js-api-logs.html) package.

## Throwing exceptions

If your code needs to throw exceptions, we recommend you to use the method `throwException(code, message)`
in package [sys.exceptions]({{site.baseurl}}/app-development-js-api-exceptions.html). When calling this
method an exception will be thrown and the stack trace will be kept.

If you use the Javascript `throw` keyword and you catch it on your code, when you log it the stack trace
will be lost so you won't be able to know where exactly the problem was.

For this reason the recommendation is to always use `throwException(code, message)` instead of just `throw`.
For example, instead of writing this code:

```js
if (record.field('state').val() != 'new') {
    throw 'Task must be in state new';
}
```

we recommend to write this code:

```js
if (record.field('state').val() != 'new') {
    sys.exceptions.throwException('invalidState', 'Task must be in state new');
}
```

## Context

When scripts are executed, there will be a `context` object available that you can use to
get information about where your script is being executed. For example, if you have a library
you might want to know if you are being called from one specific action to do something
different, or you might want a listener to be executed only under some specific context.

You can find detailed information about the how to work with context in the 
[sys.context]({{site.baseurl}}/app-development-js-api-context.html) package.

One important thing to understand is the scope of the context. The scope of the context
is opened when an external events arrives (a REST API call or an endpoint event). The scope
will be preserved as long as we are in the same thread. This means that if the script
triggers a background job, that will be executed in another scope and the context won't be
the same.

For example you have an action, and the action script saves a record. The entity the record
belongs to has a listener attached when a record is changed, and this listener is flagged
to be executed in the background. When the listener is executed it won't know anything about
the action that was originally executed because the job is run in a different thread and it
doesn't know anything about the action.

However, in the above example, if the listener is not flagged to be executed in the background,
it will be able to check that the listener was triggered during the execution of the action,
because it will be run immediately in the same thread.

## Execution limitations

Scripts that aren't running on a background job (they are executed as part of the REST API call)
are limited to a maximum of 30 seconds. After that an exception will be thrown and your script
will be interrupted.

If a script can take long to run you should probably execute it in the background to avoid issues.