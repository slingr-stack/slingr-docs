---
title: "sys.events"
lead: "Describes event utilities in the Javascript API."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 65
---

## **sys.events**

The **`sys.events`** package encompasses methods intended for the administration of custom events.

###  triggerEvent(event,data)

This method initiates a custom event within the application, which can be captured by any listener set up to monitor a **`CUSTOM_EVENT`** with a name matching the **`event`** parameter.

##### Parameters

Name|Type|Required|Description
---|---|---|---
event|string|yes|The name of dispatched custom event.
data|object|no|Map of properties that will be sent as data of event.

##### Samples

``` javascript
// trigger `newNote` event with id of record
sys.events.triggerEvent('newNote', {noteId: record.id()});
```
<br>
