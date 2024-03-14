---
title: "UI settings"
description: "UI Settings and Their Impact"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 18
---

These settings hold a global influence on the app's user interface (UI), impacting its appearance and behavior.

## **General**

### Theme

You can select from a range of themes that will alter the styling of the app, including color schemes. Enabling a different theme results in a comprehensive visual update across all app components.

### Show icons

By disabling this option, buttons and menu choices within the app will not display icons. This option is enabled by default.

## **Header**

### Show app logo

When enabled, the app's logo will be presented within the header.

### Show app label

Upon activation, the app's label will be showcased within the header. An additional setting named **`Show App Label in Uppercase`**  becomes accessible, allowing you to determine whether the label should be presented in uppercase or its original format.

## **Login**

### Show default identity provider

If you have multiple identity providers configured and wish to exclude the default provider from view, you can deactivate this flag. This is particularly useful when, for instance, you've established an identity provider for Slack and want to prevent users from encountering the **`Login with <App Label>`** button.

However, if no additional identity providers are configured, this flag has no effect.

### Show app logo

Upon activation, the app's logo will be displayed on the login page.

### Show background image

Enabling this option will exhibit the background image that was previously set within the developer portal on the login page.

### Change login panel color

When this option is enabled, you have the liberty to define the background color for the login page.

### Login panel opacity

This setting allows you to adjust the opacity of the login panel, with values ranging from zero to one hundred.
