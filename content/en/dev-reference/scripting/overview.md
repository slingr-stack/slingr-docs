---
title: "Overview"
lead: "The Slingr platform empowers you to leverage JavaScript scripts to define behaviors and processes. This section offers an overview of how scripts can be harnessed to expand the functionality of your app."
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

## **Javascript API Overview**

Scripts provide a highly flexible means of extending and customizing your apps. While a declarative approach is often preferred, we recognize that in certain situations, it may not be feasible to cover all scenarios. Sometimes, writing a few lines of code is more straightforward than navigating a complex and time-consuming user interface to express certain functionalities in a declarative manner.

The primary objective is for you to write scripts solely to define your application's behavior. You won't need to write boilerplate or infrastructure code. The platform handles these aspects, enabling you to focus on what truly matters: solving problems and delivering business value.

This document offers general insights into scripts, but you should consult the documentation to understand the various locations where scripts can be written and how they are employed in each scenario.

To simplify script writing, we've developed a [Javascript API]({{<ref "/dev-reference/scripting/namespaces.md">}}) that provides services for seamless access to your application's features and data. When writing scripts, you will extensively utilize this API. Make sure to have it accessible; however, you'll also find numerous links from the app builder leading to the documentation.

In addition to the Javascript API, you can also tap into endpoint features and custom libraries.

With the endpoints API, you can invoke functions within endpoints, sending messages to external services as though it were a straightforward method call. [More information on using endpoints through scripts can be found here]({{<ref "/dev-reference/data-model-and-logic/endpoints.md">}}).

Custom libraries empower you to centralize reusable code. This code can be referenced throughout your app. [For more details on custom libraries, refer to this link]({{<ref "/dev-reference/data-model-and-logic/libraries.md">}}).

## **Permissions**

When executing scripts, permissions are not rigorously enforced. For example, if a user has permissions to execute action **`A`** but lacks permissions to access entity **`E`**, yet the script within action **`A`** involves operations on entity **`E`**, this action will still proceed without issue when executed by the user.

This approach is rooted in the idea that developers are in command of scripts. If they grant permission to execute a script, the platform assumes the script's actions align with what the user is allowed to perform.

## **Exception handling**

In case of an error, an exception will be raised. For instance, calling a method in the Javascript API with invalid parameters triggers an exception. Similarly, an exception will be thrown if there is an error executing an endpoint function.

If you do not catch the exception, it will propagate until it's captured by the platform, where it will be logged. You can then view the error in the app monitor. Here, you'll see the point where the exception occurred, a snippet of your code, and a stack trace to help trace the sequence of calls made.

There are instances where you might want to manage the exception to prevent script execution from halting. In such cases, you can employ standard Javascript tools to achieve this:

```js
...
try {
  app.endpoints.slack.sendMessage(params);
} catch (e) {
  sys.logs.warn('There were errors sending message to Slack: '+sys.exceptions.getMessage(e), e);
}
```
<br>

The Javascript API provides several tools to assist in obtaining error messages and codes from exceptions. This is particularly beneficial because certain exceptions may have varying internal structures. These tools are available within the [sys.exceptions]({{<ref "/dev-reference/scripting/sys-exceptions.md">}}) package.

Also, remember that you can log exceptions even when using the **`INFO`** log level. This can prove to be valuable during the app debugging process. You can find this capability in the logging methods provided by the [sys.logs]({{<ref "/dev-reference/scripting/sys-logs.md">}}) package.

## **Throwing exceptions**

If your code necessitates throwing exceptions, we strongly recommend using the **`throwException(code, message)`**
method within the [sys.exceptions]({{<ref "/dev-reference/scripting/sys-exceptions.md">}}) package. When invoking this
method, an exception will be thrown while retaining the stack trace.

Using the Javascript **`throw`** keyword and subsequently capturing it in your code will lead to the stack trace being lost. Consequently, you won't have visibility into the exact location of the problem.

For this reason, it is highly recommended to consistently use **`throwException(code, message)`** instead of just **`throw`**.
As an example, rather than writing this code:

```js
if (record.field('state').val() != 'new') {
    throw 'Task must be in state new';
}
```
<br>

we recommend to write this code:

```js
if (record.field('state').val() != 'new') {
    sys.exceptions.throwException('invalidState', 'Task must be in state new');
}
```
<br>

## **Context**

When scripts are executed, a **`context`** object will be available, offering information about the execution environment of your script. For instance, when working with a library, you might want to differentiate actions between different contexts or ensure that a listener is only executed under specific circumstances.

Comprehensive information about working with context can be found in the [sys.context]({{<ref "/dev-reference/scripting/sys-context.md">}}) package.

It's crucial to comprehend the scope of the context. This scope initiates when an external event occurs, such as a REST API call or an endpoint event. The scope persists as long as we remain in the same thread. This implies that if a script triggers a background job, that job will execute in a separate scope, distinct from the original context.

For instance, consider an action that, when its script runs, saves a record. If this record belongs to an entity with a listener attached for record changes, and this listener is designated to execute in the background, the listener won't possess knowledge of the original action. This is because the background job runs in a distinct thread and lacks awareness of the action.

However, in the above scenario, if the listener isn't set to execute in the background, it can identify that it was triggered during the execution of the action. This is because it runs immediately in the same thread as the action.

## **Execution limitations**

Scripts running outside of a background job (those executed as part of a REST API call) are subject to a maximum execution time of 30 seconds. Beyond this threshold, an exception will be thrown, halting the script.

For scripts with the potential for extended runtime, it's advisable to execute them in the background to prevent disruptions.