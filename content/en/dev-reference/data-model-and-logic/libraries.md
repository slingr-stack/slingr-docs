---
title: "Libraries"
description: "Provides an explanation of libraries and their utilization for organizing shared code within your application."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 26
---

Libraries are essentially JavaScript files where you can store code that is intended to be shared across various sections of your application. For instance, you might create a library to handle the encoding and decoding of strings, a functionality required in multiple actions throughout your application. Instead of duplicating these algorithms within each action, you can centralize them within a library and invoke them from your actions.

The structure of a library's code is depicted as follows:

```js
var privateFunction = function(msg) {
  return '['+msg+']';
};

exports.logSomething = function(msg) {
  sys.logs.info('*** logged from library: '+privateFunction(msg));
};
```
<br>

The crucial component here is the **`exports`** variable. Any elements you wish to make available from the library should be added to this object. Otherwise, they will remain inaccessible, as demonstrated by the **`privateFunction`** in the preceding example.

To access the library, you can use the namespace **`app.<libraryName>`** from any script. For instance, if the library in the provided example is named **`utils`**, you can employ the library in this manner within any script of the application:

```js
var msg = record.field('description').val();
app.utils.logSomething(msg);
```
<br>

If an attempt is made to call **`app.utils.privateFunction(msg)`**, an error will be thrown because that method was not exposed using the **`exports`** variable.

In the **`exports`** variable, you have the flexibility to include various entities; it need not be limited to functions alone. You could expose constants, as demonstrated below:

```js
exports.MAX_ORDERS = 100;
exports.MAX_AMOUNT = 50000;
```
<br>


