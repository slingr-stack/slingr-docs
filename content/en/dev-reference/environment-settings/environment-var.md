---
title: "Environment variables"
description: "Describes what are environment variables and how they can be used."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 17
---

Environment variables serve as placeholders that can be employed throughout your app's metadata. When the app is loaded, these placeholders are dynamically replaced with their designated values. Employing environment variables instead of hard-coded values offers several distinct advantages:

- **Modifiable in the Production Environment**: Environment variables can be managed via the app monitor, allowing changes to be made in the production environment. This is essential for adjusting app behavior, as the app builder is not accessible in the production environment.
- **Centralized Value Management**: Altering the value of an environment variable requires changes in just one place. In contrast, hard-coded values necessitate manual updates across the entire app.

To manage environment variables, you can access the dedicated section within the app builder: **`Environment settings > Environment variables`**. Alternatively, these variables can also be managed via the app monitor: **`Environment settings > Environment variables`**.

## **Synchronization of environment variables**

Upon creation, environment variables are typically designated as "synced." This implies that if a variable's value is modified in the development environment, the change will be mirrored in the production environment during the synchronization of changes.

While this synchronization approach is beneficial when a uniform configuration is desired for both development and production, it might not suit scenarios where distinct values are needed. In such cases, the option to disable "Keep in sync" can be exercised. This is executed within the app monitor of the production environment. Once toggled, syncing changes from development to production will no longer overwrite the variable's value.

## **Harnessing environment variables**

The utility of environment variables spans across various sections of your app's metadata. These variables should be enclosed using the following syntax: **`${ENVIRONMENT_VARIABLE_NAME}`**. For instance, if your variable is named **`ADMIN_EMAIL`**, referencing it would involve using **`${ADMIN_EMAIL}`**.

For instance, if you possess an environment variable named **`TOKEN`**, its value can be integrated into a script in the following manner:

```js
var token = '${TOKEN}';
sys.logs.info('token: '+token);
```
<br>

Another frequent scenario involves the utilization of environment variables within the settings of an legacy service. This approach offers a dynamic and adaptable means of configuration. For instance, when configuring a Slack legacy service, rather than embedding the bot token directly, an environment variable can be employed for enhanced flexibility. In the legacy service settings, the following syntax can be utilized (assuming the environment variable is named **`SLACK_BOT_TOKEN`**):

```
${SLACK_BOT_TOKEN}
```
<br>

## **System environment variables**

System environment variables are automatically accessible across all apps. These variables possess calculated values designed to enhance app functionality. The following system variables are available:

- **`APP_NAME`**: Reflects the name of the app.
- **`APP_ENV`**: Specifies the current execution environment of the app. This can be either **`dev`** (development) or **`prod`** (production).
- **`APP_URL`**: Provides the URL required for accessing the app runtime. For example, the URL might resemble **`https://app.slingrs.io/prod/runtime`**.
- **`APP_VERSION`**: A numerical identifier indicating the version of the app. This value is represented in milliseconds since the Epoch, corresponding to the moment changes were pushed. Consequently, this version number changes each time new changes are pushed.
