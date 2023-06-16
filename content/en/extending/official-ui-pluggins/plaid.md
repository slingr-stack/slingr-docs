---
title: "Plaid Link plugin"
lead: "Detailed description of how the Plaid Link plugin works and its configuration."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
---

## Overview

Plaid Link is a drop-in module that provides a secure, elegant authentication flow for each institution that Plaid 
supports. Link makes it secure and easy for users to connect their bank accounts to Plaid.

## Configuration

The following settings needs to be set:

- **Client name**: displayed once a user has successfully linked their Item. Property is `clientName`.
- **Product**: a list of Plaid product(s) you wish to use. Property is `product`.
- **Public key**: The public_key associated with your account. Property is `key`.
- **Environment**: the Plaid API environment on which to create user accounts. For Development and Sandbox, use development or sandbox, respectively. For Production use, use production. Property is `env`.
- **Language**: specify a Plaid-supported language to localize Link. English will be used by default. Property is `language`.
- **Country codes**: optional. Specify a comma separated list of Plaid-supported country codes using the ISO-3166-1 alpha-2 country code standard. Property is `countryCodes`.
- **User legal name**: optional. Specify a userLegalName to enable all Auth features. Note that userEmailAddress must also be set. Property is `userEmailAddress`.
- **User email address**: optional. Specify a userEmailAddress to enable all Auth features. Note that userLegalName must also be set. Property is `userLegalName`.
- **Link customization name**: optional. Specify the name of a Link customization created in the Dashboard. The default customization is used if none is provided. Property is `linkCustomizationName`.


## Inbound events

### Open Link dialog

```js
sys.ui.sendMessage({
    scope: 'plugin:plaid',
    name: 'open',
    data: {
       clientName: 'Client 1',
       key: 'public_key',
       product: ['transactions'],
       env: 'sandbox'
    },
    callbacks: {
      onSuccess: function(originalMessage, callbackData) {
        sys.logs.debug("Here is the original message for onSuccess");
        sys.logs.debug(JSON.stringify(originalMessage));
        sys.logs.debug("Here is the callback data for onSuccess");
        sys.logs.debug(JSON.stringify(callbackData));
      },
      onExit: function(originalMessage, callbackData) {
        sys.logs.debug("Here is the original message for onExit");
        sys.logs.debug(JSON.stringify(originalMessage));
        sys.logs.debug("Here is the callback data for onExit");
        sys.logs.debug(JSON.stringify(callbackData));
      },
      onEvent: function(originalMessage, callbackData) {
        sys.logs.debug("Here is the original message for onEvent");
        sys.logs.debug(JSON.stringify(originalMessage));
        sys.logs.debug("Here is the callback data for onEvent");
        sys.logs.debug(JSON.stringify(callbackData));
      }
    }
});
```
This script opens the dialog to perform bank authorization that allows end users to connect their bank accounts to Plaid.

In `data`  you can override dynamically settings defined at creation time of the plugin.

The following callbacks can be defined:

- `onSuccess`: A function that is called when a user has successfully signed up into an account. You will be receiving 
the `public_token` and a `metadata object`.
- `onExit`: A function that is called when a user has specifically exited the Link flow. You might receive the error and
the metadata associated to it.
- `onEvent`: A function that is called when a user reaches certain points in the Link flow. You will receive the event name
and the metadata associated to it.


## Outbound events

This plugin does not have outbound events.
