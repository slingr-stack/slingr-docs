---
title: "Scandit plugin"
lead: "Detailed description of how the Scandit plugin works and its configuration."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
weight: 10
---
## Overview

Scandit is mobile computer vision software enables barcode scanning. 

## Configuration

The following settings needs to be set:

Check [SDK documentation](https://docs.scandit.com/1.1/web/classes/scansettings.html) for more information.

### License key

Before starting with adding a capture mode, make sure that you have a valid Scandit Data Capture SDK license key and 
that you added the necessary dependencies. If you have not done that yet, 
[check out this guide](https://docs.scandit.com/data-capture-sdk/android/add-sdk.html). The web license is required.

### Scan settings

| Key  | Type  |  Default value | 
|----------|-------------|------|
| codeDuplicateFilter | number | 0 |

The duplicate filter specifying how often a code can be scanned. When the filter is set to -1, each unique code is only 
scanned once. When set to 0, duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in 
milliseconds. When the same code (data/symbology) is scanned within the specified interval it is filtered out as a duplicate..

| Key  | Type  |  Default value | 
|----------|-------------|------|
| enabledSymbologies | array | ["ean13", "upca", "upce", "code128", "code39", "data-matrix", "qr"] |

The single symbology or list/set of symbologies that should be initialized as enabled for recognition.

| Key  | Type  |  Default value | 
|----------|-------------|------|
| maxNumberOfCodesPerFrame | number | 1 |
  
The maximum number of barcodes to be recognized every frame.

| Key  | Type  |  Default value | 
|----------|-------------|------|
| searchArea | object | - |

The area of the image in which barcodes are searched.

| Key  | Type  |  Default value | 
|----------|-------------|------|
| colorInvertedEnabled | boolean | false |

Whether color-inverted decoding for all symbologies is enabled.

### Modal settings - **modalSettings**

| Name | Key | Type | Possible values | Default value |
|------|-----|------|-----------------|---------------|
| Close after scan | closeAfterScan | boolean | - | false |
| Size | size | number | - | 80 |
| Position | position | string | top \| bottom | top |
| Margin top | marginTop | number | - | 50 |
| Margin bottom | marginBottom | number | - | 50 |
| Alignment | alignment | string | left \| center \| right | center |
| Margin left | marginLeft | number | - | 50 |
| Margin right | marginRight | number | - | 50 |
| Play sound on scan | playSoundOnScan | boolean | - | true |
| Vibrate on scan | vibrateOnScan | boolean | - | true |



## Inbound events


### Open Scan

Sending messages from custom views using send plugin message

```js
sys.ui.sendPluginMessage({
  plugin: 'scandit',
  name: 'openScan',
  data: {
    field: 'firstName',
    scanSettings: {
      codeDuplicateFilter: 0,
      enabledSymbologies: ["ean13", "upca", "upce", "code128", "code39", "data-matrix", "qr"],
      maxNumberOfCodesPerFrame: 1,
      searchArea: {height: 1, width: 1, x: 0, y: 0}
    },
    modalSettings: {
      size: 50,
      marginTop: 30,
      position: 'top',
      alignment: 'right',
      marginRight: 30,
      closeAfterScan: true,
      playSoundOnScan: true,
      vibrateOnScan: true
    }
  },
  callbacks: {
    onScan: function(originalMessage, callbackData) {
      console.info(">> code: ", callbackData.code);
      console.info(">> callbackData: ", callbackData);
    },
    onFail: function(originalMessage, callbackData) {
      console.info(">>", callbackData);
    }
  }
});
```

Also yo can send from UI messages

```js
sys.ui.sendMessage({
  scope: 'plugin:scandit',
  name: 'openScan',
  data: {
    field: 'firstName',
    scanSettings: {
      codeDuplicateFilter: 0,
      enabledSymbologies: ["ean13", "upca", "upce", "code128", "code39", "data-matrix", "qr"],
      maxNumberOfCodesPerFrame: 1,
      searchArea: {height: 1, width: 1, x: 0, y: 0}
    },
    modalSettings: {
      size: 50,
      marginTop: 30,
      position: 'top',
      alignment: 'right',
      marginRight: 30,
      closeAfterScan: true,
      playSoundOnScan: true,
      vibrateOnScan: true
    }
  },
  callbacks: {
    onScan: function(originalMessage, callbackData) {
      sys.logs.info(">> code: ", callbackData.code);
      sys.logs.info(">> callbackData: ", callbackData);
    },
    onFail: function(originalMessage, callbackData) {
      sys.logs.info(">>", callbackData);
    }
  }
});
```

This script opens the modal scan.

In `data` you can override dynamically settings defined at creation time of the plugin.

The following callbacks can be defined:

- `callback`: A function that is called scan successfully.

## Outbound events

Outbound events send context as `ui` if it's called from UI messages otherwise is `plugin`.

- `onScanSuccess`: Event when scan success.  

- `onScanFail`: Event when scan fails.

