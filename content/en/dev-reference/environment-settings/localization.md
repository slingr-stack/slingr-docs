---
title: "Localization"
lead: "App Localization Settings"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 20
---

These are comprehensive app-wide settings found within the app builder under **`Environment Settings > Localization`**.

## **Timezone**

The **`Timezone`** setting designates the default timezone for the app. This default timezone is utilized in scenarios where no user is associated with the ongoing execution context. For instance, if an event originates from a global legacy service without a specific user triggering it, the default timezone is applied. Moreover, it serves as the default for time listeners, although this can be modified.

## **Language**

The **`Language`** setting establishes the default language for the app. It's important to note that if the app isn't appropriately internationalized, you might encounter a mixture of languages within the interface.

{{< notes type="tip">}}
It's worth highlighting that users possess the ability to configure their own localization preferences within their profiles. These individual settings will supersede the app-wide localization settings.
{{< /notes >}}