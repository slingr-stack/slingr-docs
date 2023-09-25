---
title: "Environment settings"
description: "Learn how to modify environment settings through the App Monitor and understand their immediate impact on your running app."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 148
---

In the **`Environment settings`** section of the App Monitor, you have the capability to modify various environment settings that directly impact your app's behavior. These settings encompass:

- [Environment variables]({{<ref "/dev-reference/environment-settings/environment-var.md">}}): Configure and manage environment-specific variables that influence the app's behavior.

- [UI settings]({{<ref "/dev-reference/environment-settings/ui-settings.md">}}): Customize the user interface settings to tailor the app's appearance and behavior to your preferences.

- [Logs and alerts]({{<ref "/dev-reference/environment-settings/logs-and-alerts.md">}}): Fine-tune logging and alerting configurations to stay informed about critical events and issues within your app.

- [Localization]({{<ref "/dev-reference/environment-settings/localization.md">}}): Adjust localization settings to provide a tailored experience for users in different regions and languages.

- [API Tokens]({{<ref "/dev-reference/environment-settings/api-tokens.md">}}): Manage API tokens that enable secure access to your app's resources.

When you make changes to these settings, they take immediate effect within your app. For instance, if you modify the app's theme, simply reloading the app will reflect the updated theme.

The only exception to this rule is when you make changes to environment variables that impact legacy services, such as when a variable is utilized in an legacy service's configuration. In such cases, if you alter the variable's value, you will be prompted to restart the affected legacy services. However, you can choose to postpone this action if you don't wish to restart them immediately.
