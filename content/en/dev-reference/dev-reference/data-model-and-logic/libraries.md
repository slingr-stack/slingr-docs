---
title: "Libraries"
lead: "Explains what libraries are and how they can be used to organized the shared code of your app."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Libraries are basically Javascript files where you can put code that is shared by different parts of your
app. For example you have a library to encode and decode strings that you use in different actions of your
app. Instead of repeating those algorithms in each action you can put them in a library and call it from
the actions.

A library's code looks like this:

```js
var privateFunction = function(msg) {
  return '['+msg+']';
};

exports.logSomething = function(msg) {
  sys.logs.info('*** logged from library: '+privateFunction(msg));
};
```

The key is the `exports` variable. Everything that you want to expose from the library should be put in
this object. Otherwise it won't be accessible, like the function `privateFunction` in the above example.

The library will be accessible on any script using the namespace `app.<libraryName>`. For example if the
library of the example above is called `utils` then you should be able to use the library like this on
any script of the app:

```js
var msg = record.field('description').val();
app.utils.logSomething(msg);
```

If you try to call `app.utils.privateFunction(msg)` an error will be thrown because that method was not
exposed using the `exports` variable.

In the `exports` variable you can put whatever you want, it doesn't have to be a function. You could expose
constants like this:

```js
exports.MAX_ORDERS = 100;
exports.MAX_AMOUNT = 50000;
```

