---
title: "Stripe"
description: "Detailed description of how the Stripe plugin works and its configuration."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
weight: 12
---

## **Overview**

The primary integration path through Stripe.js is with Elements, which enables you to collect sensitive payment 
information using UI components. 

## **Configuration**

This plugins allows to add the Stripe elements in your app.

## **Inbound events**

### Collect payment information

Collect card information on the client with Stripe.

```js
var setupIntent = app.endpoints.stripe.coreResources.setupIntents.post();
var publicKey = app.endpoints.stripe._configuration.publishableKey;

sys.ui.sendMessage({
    scope: 'plugin:stripe',
    name: 'collectPaymentInformation',
    data: {
       publicKey: publicKey,
       title: 'Card Information',
       dataSecret: setupIntent,
       elementType: 'card',
       elementOptions: null
    },
    callbacks: {
      onSuccess: function(originalMessage, callbackData) {
        sys.logs.debug("Here is the original message for onSuccess");
        sys.logs.debug(JSON.stringify(originalMessage));
        sys.logs.debug("Here is the callback data for onSuccess");
        sys.logs.debug(JSON.stringify(callbackData));
      },
      onFail: function(originalMessage, callbackData) {
        sys.logs.debug("Here is the original message for onFail");
        sys.logs.debug(JSON.stringify(originalMessage));
        sys.logs.debug("Here is the callback data for onFail");
        sys.logs.debug(JSON.stringify(callbackData));
      }
    }
});
```
This script opens the a modal to collect the payment information.

**`publickKey`** The public key can be generated in the dashboard of your Stripe app.

**`title`** The title to be displayed in modal header.

**`dataSecret`** is an object that represents your intent to set up a customer’s card for future payments.

**`elementType`** The type of element you are creating.

**`elementOptions`** Options for updating given type element.

The following callbacks can be defined:

- **`onSuccess`**: The PaymentMethod was successfully setup.

- **`onFail`**: Error when try to setup a PaymentMethod.


### Handle card action

Handle Card Action is manual confirmation flow to handle a PaymentIntent with the requires action status. 
It will throw an error if the PaymentIntent has a different status.

```js

var clientSecret = '....';

sys.ui.sendMessage({
    scope: 'plugin:stripe',
    name: 'handleCardAction',
    data: {
       publicKey: publicKey,
       clientSecret: clientSecret
    },
    callbacks: {
      cardActionCallback: function(originalMessage, callbackData) {
        sys.logs.debug("Here is the original message for cardActionCallback");
        sys.logs.debug(JSON.stringify(originalMessage));
        sys.logs.debug("Here is the callback data for cardActionCallback");
        sys.logs.debug(JSON.stringify(callbackData));
      }
    }
});
```
<br>


**`publickKey`** The public key can be generated in the dashboard of your Stripe app.

**`clientSecret`** The client secret of the PaymentIntent to handle.

The following callbacks can be defined:

- **`onSuccess`**: The message with **`result`** object:

    - **`result.paymentIntent`**: a PaymentIntent with the requires_confirmation status to confirm server-side.
    - **`result.error`**: an error. Refer to the API reference for all possible errors.

## **Outbound events**

This plugin does not have outbound events.
