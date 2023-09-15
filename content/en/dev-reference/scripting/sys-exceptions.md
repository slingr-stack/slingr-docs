---
title: "sys.exceptions"
lead: "Describes utilities in the Javascript API to work with exceptions."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 66
---

## **sys.exceptions**

The **`sys.exceptions`** package comprises methods tailored for handling exceptions.

###  getCode(exception)

This method retrieves the error code when the provided parameter is of the type **`sys.exceptions.ScriptException`**. If the parameter is of a different type, it returns **`null`**.

The benefit of utilizing this method over directly invoking **`sys.exceptions.ScriptException.code()`** is that you are relieved from the concern of whether the exception is a platform-specific one or belongs to another category. In scenarios where the exception type is not certain, it's advisable to first verify if it's a platform exception prior to retrieving the code.

##### Parameters

Name|Type|Required|Description
---|---|---|---
exception|[sys.exceptions.ScriptException](#sysexceptionsscriptexception) or Error|yes|The platform exception to get the code from or any other kind of throwable object.

##### Returns

**`string`**  - The code of the exception or **`null`**.

##### Samples

``` javascript
// logs the code of a platform exception
try {
  var query = sys.data.createQuery('entityThatDoesNotExist');
} catch (e) {
  log('error code: '+sys.exceptions.getCode(e));
}
```
<br>

``` javascript
// when it is a Javascript exception it will return 'null'
try {
  // this var doesn't exist an will throw a Javascript error
  var a = doesNotExist * 5;
} catch (e) {
  log('error code: '+sys.exceptions.getCode(e));
}
```
<br>


###  getMessage(exception)

This method retrieves the error message from the given exception. If the parameter is a string, the method returns that string. If the parameter is of type **`sys.exceptions.ScriptException`**, it returns the contained message. In the case of an object, the method provides its JSON representation. If none of these cases apply, the parameter is attempted to be cast to a string.

The key advantage of utilizing this method, as opposed to directly invoking **`sys.exceptions.ScriptException.message()`**, is that you need not be concerned about whether the exception is a platform-specific one or belongs to another category. When the exception type is uncertain, it's advisable to first confirm whether it's a platform exception before retrieving the message.

##### Parameters

Name|Type|Required|Description
---|---|---|---
exception|[sys.exceptions.ScriptException](#sysexceptionsscriptexception) or Error|yes|The platform exception to get the message from or any other kind of throwable object.

##### Returns

**`string|object`**  - The message of the exception, a JSON object or just the string representation.

##### Samples

``` javascript
// logs the message of a platform exception
try {
  var query = sys.data.createQuery('entityThatDoesNotExist');
} catch (e) {
  log('error message: '+sys.exceptions.getMessage(e));
}
```
<br>

``` javascript
// logs the message of a Javascript exception
try {
  // this var doesn't exist an will throw a Javascript error
  var a = doesNotExist * 5;
} catch (e) {
  log('error message: '+sys.exceptions.getMessage(e));
}
```
<br>

###  getAdditionalInfo(exception)

This method returns an object containing supplementary information about the error, if such information is available. It's important to note that this feature is not accessible across all exceptions, but rather applies to a select few. For instance, certain endpoint exceptions might include details about the specific request that encountered failure.

##### Parameters

Name|Type|Required|Description
---|---|---|---
exception|[sys.exceptions.ScriptException](#sysexceptionsscriptexception) or Error|yes|The platform exception from which to extract additional information. While you can pass other throwable objects, please note that in such cases, there will be no additional information available, and the method will simply return an empty object.


##### Returns

**`string|object`**  - An object containing the additional information. This object will be empty if there is no additional information available.

##### Samples

``` javascript
// logs the message of a platform exception
try {
  app.endpoints.http.post(params);
} catch (e) {
  log('error additional info: '+sys.exceptions.getAdditionalInfo(e));
}
```
<br>


###  throwException(code,message)

Throws an exception with the specified code and message. The primary advantage of using this method, as opposed to the standard JavaScript **`throw`** keyword, is that if the thrown exception is caught and logged, the stack trace will be accessible. Unlike the typical **`throw`** keyword, which does not offer the stack trace in cases where logging the exception is necessary.

It is recommended to consistently use this method over the **`throw`** keyword.

##### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| code     | string | yes | A code that identifies the exception. Any appropriate code can be used.|
| message  | string | yes | The error message. If displayed to users, consider internationalizing this message.|

##### Samples

``` javascript
// throws an exception if the state is not 'new'
if (record.field('state').val() != 'new') {
  sys.exceptions.throwException('invalidState', 'Task must be in state new');
}
```
<br>

## **sys.exceptions.ScriptException**

This type of object is thrown when errors occur within the platform or when dealing with known errors in scripts (such as validation scripts). Instances of this type contain an error code and a message.

###  code()

This method retrieves the error code associated with the exception. The valid error codes include:

- **`validationErrors`**
- **`badRequest`**
- **`forbidden`**
- **`optimisticLocking`**
- **`timeout`**
- **`systemException`**
- **`unknownError`**

##### Returns

**`string`** - The error code

##### Samples

``` javascript
// logs the code of a platform exception
try {
  var query = sys.data.createQuery('entityThatDoesNotExist');
} catch (e) {
  log('error code: '+e.code());
}
```
<br>

###  message()

Returns the error message.

##### Returns

**`string`** - The error message

##### Samples

``` javascript
// logs the message of a platform exception
try {
  var query = sys.data.createQuery('entityThatDoesNotExist');
} catch (e) {
  log('error message: '+e.message());
}
```
<br>

###  throw()

This method throws an exception using the [`throwException()`](#👉-throwexceptioncodemessage) method, with the **`code`** and **`message`** values from this object.

##### Samples

``` javascript
// creates an exception and throw it
if (record.field('state').val() != 'new') {
  var exception = new sys.exceptions.ScriptException('invalidState', 'Task must be in state new');
  exception.throw();
}
```
<br>