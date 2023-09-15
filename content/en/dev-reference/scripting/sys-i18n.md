---
title: "sys.i18n"
lead: "Describes utilities in the Javascript API to manage internationalization."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 68
---

## **sys.i18n**

The **`sys.i18n`** package provides methods for working with internationalization. These objects are stored as metadata using the builder.

###  translate(key,params)

This method returns the translated value for the provided **`key`**.

##### Parameters

Name|Type|Required|Description
---|---|---|---
event|string|yes|he key corresponding to the desired translation.
data|object|no|A map of properties that will be sent as the data of the event.

##### Returns

**`string`** - The translated value for the provided key in the language of the current user, platform language, or English. If the key does not exist, it will return an empty string.

##### Samples

``` javascript
// gets a translation for a key
var resolved = sys.i18n.translate('key1');
log('key1: '+resolved);
```
<br>

``` javascript
// gets a translation for a key
//key2 could be "There are {{ numberOfItems }} in {{collName}}"
var resolved = sys.i18n.translate('key2'. {numberOfItems: 5, collName:'entities'});
log('key2: '+resolved);
```
<br>

