---
title: "UI Plugins"
description: "Description of what UI plugins are and how to use them to connect client with external apps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 53

---

Plugins are components that operate on the client side and enable the expansion of the platform's UI features.

A common scenario for plugins is facilitating interaction with external applications on the client side. For instance, a Twilio UI plugin could display incoming calls and provide users the ability to answer them.

A comprehensive [list of official plugins can be accessed here]({{<ref "/extensions/migrations/official-ui-plugins/overview.md">}}).

## **Configuration**

While plugins may have specific settings, they all share certain common settings. Refer to the respective plugin's documentation for its unique settings.

Here, we will outline the general settings.

### Label

This label serves as the human-readable name of the plugin. Its utilization isn't involved in app execution.

### Name

The internal name of the plugin, used when dispatching messages to the plugin from the backend through the [Javascript API]({{<ref "/dev-reference/scripting/sys-ui.md">}}).

The name must comprise only letters and numbers, excluding special characters or spaces.

## **Sending messages to plugins**

You can send messages to UI plugins from a backend script using the [Javascript API]({{<ref "/dev-reference/scripting/sys-ui.md">}}). For instance, to communicate with the **`sample`** plugin for the **`event1`** event, you would proceed as follows:
Feel free to integrate this enhanced version into your documentation.

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

## **Events**

Plugins have the capability to transmit events to the backend. These events can be captured by listeners with the type set to **`UI Plugin`**, and the corresponding event should be selected.

For more details, refer to the [UI plugin listeners documentation]({{<ref "/dev-reference/data-model-and-logic/listeners.md#ui-plugin-listeners">}}).

