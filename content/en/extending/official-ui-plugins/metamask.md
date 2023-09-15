---
title: "Metamask"
lead: "Detailed description of how the MetaMask plugin works and its configuration."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
weight: 8
---
This plugin allows users to sign transactions using the MetaMask browser extension.

## **Quick start**

```
sys.ui.sendMessage({
  scope: 'plugin:metamask',
  name: 'sendTransaction',
  data: {gas: ..., data: ..., ...},  // this is the tx data
  callbacks: {
    approved: function(msg, res) {
      sys.logs.debug("tx hash: "+res.txHash);
      sys.logs.debug("original msg: "+JSON.stringify(msg));
    },
    declined: function(msg, res) {
      sys.logs.debug("declined: "+res.error);
      sys.logs.debug("original msg: "+JSON.stringify(msg));
    },
    error: function(msg, res) {
      sys.logs.debug("error code: "+res.errorCode);
      sys.logs.debug("error: "+res.error);
      sys.logs.debug("original msg: "+JSON.stringify(msg));        
    }
  }
});
```
<br>

This script sends a transaction to MetaMask (in the `data` field) that needs to be confirmed by the user. If the user confirms the transaction, the `approved` callback gets executed. Otherwise, if the user declines the transaction or there is an error, the `declined` callback is executed.

If there are other errors, the `error` callback will be called. For example, if the account is not configured in MetaMask, an `'invalidAccount'` error will be returned, or `'invalidNetwork'` if the network MetaMask is connected to is different from the network requested.

---

## **Configuration**

There is no configuration required for this plugin. However, the app must be running in a browser with the MetaMask extension, and there must be an account logged in.

---

## **Inbound events**

### Send transaction

```
sys.ui.sendMessage({
  scope: 'plugin:metamask',
  name: 'sendTransaction',
  data: {gas: ..., data: ..., ...},  // this is the tx data
  callbacks: {
    approved: function(msg, res) {
      sys.logs.debug("tx hash: "+res.txHash);
      sys.logs.debug("original msg: "+JSON.stringify(msg));
    },
    declined: function(msg, res) {
      sys.logs.debug("error: "+res.error);
      sys.logs.debug("original msg: "+JSON.stringify(msg));
    }
  }
});
```

<br>

Sends a transaction to be signed and sent to the network using the MetaMask plugin. The tx data should be in the 'data' field (see eth.sendTransaction for more information), while you can pass two callbacks:

- **`approved`**: the user approved the transaction, and it was submitted to the network. You should check the status of the transaction to see if it was confirmed. Parameter **`'msg'`** contains the original message sent to the plugin (where you can add more fields if you need them in the callback) while **`'res'`** contains the **`tx`** object and **`txHash`**.
- **`declined`**: the user didn't approve the transaction, or there was a problem, and the **`tx`** could not be submitted to the network. **`'msg'`** contains the original message sent to the plugin, and you could find the error in **`'res.error'`**.

Additionally, there is an **`'error'`** callback for handling account or network-related errors. These are the possible error codes:
- **`'invalidAccount'`**: if the account to sign the transaction is not configured in MetaMask.
- **`'invalidNetwork'`**: if the network MetaMask is connected to is different from the network requested.

### Sign data
```
sys.ui.sendMessage({
  scope: 'plugin:metamask',
  name: 'signData',
  data: '0x000......',  // this is the tx data
  callbacks: {
    approved: function(msg, res) {
      sys.logs.debug("signed: "+res.signedData);
      sys.logs.debug("original msg: "+JSON.stringify(msg));
    },
    declined: function(msg, res) {
      sys.logs.debug("error: "+res.error);
      sys.logs.debug("original msg: "+JSON.stringify(msg));
    }
  }
});
```
<br>

Signs data using the MetaMask plugin. The data to sign should be in the 'data' field while you can pass two callbacks:

- **`approved`**: the user approved the transaction, and it was signed. You can find the signed data in **`'res.signedData'`**.
- **`declined`**: the user didn't approve the transaction, or there was a problem signing the data. You can find the error in 'res.error'.

There are also errors related to the account, and the possible error code is:
- **`'invalidAccount'`**: if the account to sign the transaction is not configured in MetaMask.

### Get config
```
sys.ui.sendMessage({
  scope: 'plugin:metamask',
  name: 'getConfig',
  callbacks: {
    response: function(msg, res) {
      sys.logs.debug("config: "+JSON.stringify(res));
      sys.logs.debug("original msg: "+JSON.stringify(msg));
    }
  }
});
```
<br>

Returns the configuration of MetaMask. This is useful if you want to check configured accounts or the network MetaMask is currently configured to. It supports the following callback:

- **`response`**: the config is sent in the 'res' parameter. This parameter has the following structure:
```json
{
  "netId": 1, 
  "defaultAccount": "0x1...", 
  "accounts": ["0x1...", "0x2..."]
}
```
<br>

## **Outbound events**

This plugin does not have outbound events.

