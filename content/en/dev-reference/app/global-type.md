---
title: "Global settings"
description: "Describes how global settings for types work."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 14
---

In the app builder, under the **`App > Types`** section, you have the capability to employ predefined type rules and display options. This proves advantageous when you wish to maintain a consistent configuration across multiple fields in the app while managing it centrally in a single location.

By default, upon creating a new app, default display options are generated for all types. Consequently, when you create a new field, the type display options for that field are automatically configured to reference the default type display options. This approach permits subsequent modifications to the display options of all fields in one central location.

For instance, consider a scenario where your app incorporates numerous date-type fields. You decide to display the date in a distinct format. If all date fields' display options reference the global defaults, altering the format in a single location suffices, as opposed to navigating field by field for adjustments.

It's worth noting that no default rules are established for type rules by default. Generally, sharing rules across all fields in the app isn't the norm.

Refer to the configuration of [type rules]({{<ref "/dev-reference/data-model-and-logic/fields.md#type-rules">}}) and [display options]({{<ref "/dev-reference/data-model-and-logic/fields.md#general-display-options">}}) within fields to understand how you can link to the predefined configurations established here.

In the event that you delete a predefined configuration that is in use by other fields, the configuration for those fields will transition to **`Custom`**. Although the settings will persist, they will no longer be interconnected.

