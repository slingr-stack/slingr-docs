---
title: "sys.logs"
description: "Describes utilities in the Javascript API to write logs."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 70
---

## **sys.logs**

The **`sys.logs`** package provides methods for logging application events. These logs are accessible in the app monitor, serving as valuable tools to understand your app's activities.

You have the option to set up your app to generate alerts when error or warning messages are logged. This proactive approach aids in monitoring your app effectively.

###  info(message,exception)

This method logs a message at the **`INFO`** level.

##### Parameters

Name|Type|Required|Description
---|---|---|---
message|string|yes|The message to be logged.
exception|[sys.exceptions.ScriptException]({{<ref "/dev-reference/scripting/sys-exceptions.md#sysexceptionsscriptexception">}}) or Error|yes| Optional. An associated exception, if applicable.

##### Samples

``` javascript
// logs something in the app
sys.logs.info('this is a test info log');
```
<br>

###  warn(message,exception)

This method logs a message at the **`WARN`** level.

##### Parameters

Name|Type|Required|Description
---|---|---|---
message|string|yes|The message to be logged.
exception|[sys.exceptions.ScriptException]({{<ref "/dev-reference/scripting/sys-exceptions.md#sysexceptionsscriptexception">}}) or Error|yes| Optional. An associated exception, if applicable.

##### Samples

``` javascript
// logs something in the app
sys.logs.warn('this is a test warn log');
```
<br>

###  error(message,exception)

This method logs a message at the **`ERROR`** level.

##### Parameters

Name|Type|Required|Description
---|---|---|---
message|string|yes|The message to be logged.
exception|[sys.exceptions.ScriptException]({{<ref "/dev-reference/scripting/sys-exceptions.md#sysexceptionsscriptexception">}}) or Error|yes| Optional. An associated exception, if applicable.

##### Samples

``` javascript
// logs something in the app
sys.logs.error('this is a test error log');
```
<br>

``` javascript
// catches an exception and logs a message with the exception
try {
  sys.data.find('entityThatDoesNotExist', {});
} catch (e) {
  sys.logs.error('there was an error when doing query', e);
}
```
<br>

###  debug(message,exception)

This method logs a message at the **`DEBUG`** level for development purposes. Please note that this service functions exclusively in the Development environment.

##### Parameters

Name|Type|Required|Description
---|---|---|---
message|string|yes|The message to be logged.
exception|[sys.exceptions.ScriptException]({{<ref "/dev-reference/scripting/sys-exceptions.md#sysexceptionsscriptexception">}}) or Error|yes| Optional. An associated exception, if applicable.

##### Samples

``` javascript
// logs something in the app
sys.logs.debug('this is a test debug log');
```
<br>

