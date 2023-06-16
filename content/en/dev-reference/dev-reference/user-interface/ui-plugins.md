---
title: "Plugins"
lead: "Description of what UI plugins are and how to use them to connect client with external apps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---


Plugins are components that run on client side and allow to extend the features of the UI of the platform.

The most common use case is to allow to interact with external apps on client side. For example a Twillio
UI plugin could show an incoming call and allowing users to answer it.

A complete [list of official plugins can be found here]({{site.baseurl}}/extensions-official-ui-plugins.html)
  
## Plugins configuration

All plugins share some settings, however each plugin will have additional settings. You should check
their documentation to know what they are.

Here we will describe common settings.

### Label

This is the human-readable name of the plugin. It doesn't have any usage during the execution of the app.

### Name

This is the internal name of the plugin and it will be used when you send messages to the plugin
from the backend using the [Javascript API]({{site.baseurl}}/app-development-js-api-ui.html#sys.ui.sendMessage_message).

The name cannot contain special characters or spaces. Only letters and numbers.

## Sending message to plugin

It is possible to send messages to UI plugin from a backend script using the [Javascript API]({{site.baseurl}}/app-development-js-api-ui.html#sys.ui.sendMessage_message)
For example, to call the plugin `sample` for event `event1` you would do something like this:

```js
sys.ui.sendMessage({
    scope: 'plugin:sample',
    name: 'event1',
    companyId: record.id(),
    callbacks: {
      callback1: function(originalMessage, callbackData) {
        sys.logs.debug("Here is the original message for callback 1");
        sys.logs.debug(JSON.stringify(originalMessage));
        sys.logs.debug("Here is the callback data for callback 1");
        sys.logs.debug(JSON.stringify(callbackData));
      },
      callback2: function(originalMessage, callbackData) {
        //do something
      }
    }
});
```

## Events

Plugins can send events to the backend. This events can be caught on listeners using the type `UI Plugin`
and selecting the corresponding event.

Take a look at [UI plugin listeners]({{site.baseurl}}/app-development-model-listeners.html#ui-plugin-listeners) 
documentation for more information.

