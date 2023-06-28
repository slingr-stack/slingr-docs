---
title: "Global type settings"
lead: "Describes how global settings for types work."
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


In the app builder, in the section `App > Types`, it is possible to have predefined type rules
and display options. This is useful when you want to share the same configuration across several
fields in the app but manage it centrally in one place.

By default, when a new app is created, default display options are created for all types. This way
when you create a new field, by default type display options for that field will be configured to
reference the type default display options. This allows to later change all fields' display options
in one place.

For example let's suppose that you have many fields of type date in your app. Now you want to show
the date in a different format. If all your date fields' display options are referencing the global
defaults, you just need to change the format in one place instead of having to go field by field
changing it.

Notice that for type rules there aren't default rules created by default as usually it isn't 
desirable to share rules across all fields in the app.

See configuration of [type rules]({{<ref "/dev-reference/data-model-and-logic/fields.md#type-rules">}}) and 
[display options]({{<ref "/dev-reference/data-model-and-logic/fields.md#general-display-options">}}) inside fields to see how 
you can reference predefined configurations created here.

If you delete a predefined configuration that was in used by other fields, the configuration for
those fields will be changed to `Custom` and the settings will remain as they were for those fields,
but they won't be linked any longer.

