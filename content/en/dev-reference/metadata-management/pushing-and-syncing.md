---
title: "Pushing and syncing changes"
lead: "Describes the procedure for modifying your app's metadata and transitioning it from the development environment to the production environment."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 11
---

As described in the [Overview]({{<ref "/dev-reference/overview/overview.md">}}), the configuration of your data model, business rules, scripts, views, permissions, etc., is collectively referred to as the **metadata** of your app.

To make changes to the metadata, you must use the app builder, which is accessible only in the development and staging environments. The production environment does not allow direct changes; instead, you need to synchronize changes (see below). However, you can adjust environment settings from the app monitor to customize behavior (more on environment settings below).

Next, we will outline the process for implementing changes to your apps and synchronizing those changes to the production environment.

## **Making changes to your app**

You can modify your app's metadata through the app builder. Here, you can view your app's definition and implement necessary changes. Note that these changes won't take effect immediately; they need to be pushed to the app runtime, where they will be applied. For instance, if you add a new field using the app builder, you won't see it in the app immediately after saving. First, you need to push the changes, and once this is done, the new field will appear in the app runtime of the development environment.

![Push changes](/slingrDoc/images/vendor/platform-ref/push-changes.png)

You can push changes from the app builder using the **`Push changes`** action in the secondary menu (a shortcut is also available with **`Ctrl + P`**). When changes are pushed, you'll see a summary of the changes that will be pushed, and you'll have the option to create a backup and provide an explanation for the changes.

Enabling the backup flag creates a [version]({{<ref "/dev-reference/app/versions.md">}}) that can be restored later. Typically, you wouldn't create a backup with every push; rather, you'd do so when you need a restore point.

Importantly, understand the impact of pushing changes:

1. The app will be halted in the development environment (production remains unaffected).
2. Metadata changes are transferred to the app runtime.
3. If metadata changes affect data, necessary data adjustments are made. For instance, if a field is deleted, all records of that entity will be updated to remove the field.
4. Changes to legacy services are deployed, removed, or redeployed.
5. The app is restarted.

## **Synchronizing changes to production**

Once you've tested all changes in the development environment, if you have a production environment in your app, you can sync these changes from development to production.

![Sync changes](/slingrDoc/images/vendor/platform-ref/sync-changes.png)

From the app builder, use the **`Sync changes to prod`** action in the secondary menu to synchronize changes. During this process, you'll see a summary of the changes that will be moved to production. It's important to note that only changes that have been pushed will be synced. Any changes made in the app builder but not yet pushed won't be synchronized.

When syncing changes, the following steps occur:

1. App metadata is exported from the development environment.
2. The production environment is halted.
3. App metadata is imported into the production environment.
4. Data refactorings are carried out.
5. Legacy services are synchronized.
6. The production app is restarted.

Depending on the nature of changes and any required data refactorings, this process might take some time. Ensure you understand the implications of potential data refactorings (see [Automatic Refactorings]({{<ref "/dev-reference/metadata-management/automatic-refactorings.md">}})) and sync changes at a time that minimally impacts operations.

Additionally, keep in mind that if your app is linked to others, changes will also be synced across linked apps, following the same process described above.

### Automated Issue Resolution

Before initiating the sync process, the application metadata undergoes validation. If validation uncovers errors, a tool to automatically resolve these issues will be available.

## **Incorporating a staging environment**

A staging environment can be added as an intermediary between development and production. Some use cases include:

- **`Hotfixes`**: Your staging environment can mirror your production version. In the event of a production issue, you can fix it in staging and then sync the fix to production, avoiding unintended changes from development.
- **`QA`**: After completing a development iteration, instead of syncing directly to production, you can sync to staging, perform regression testing, and then sync to production once testing is complete.

When a staging environment is present, changes made in development are synced to staging first, and then you can proceed to sync them to production.

### Pulling Changes

The pull process involves two stages:

- **`Fetch Changes`**: Obtain changes from the source environment you want to merge with.
- **`Merge Changes`**: Apply changes from the source environment into your development environment. The source could be staging or a parent app.

If changes are made in the staging environment, you won't be able to directly sync changes from development to staging. Instead, you need to first pull changes from staging. This requires accessing the app builder in your development environment and executing the **`Pull changes`** action from the secondary menu.

This operation merges changes from staging into the development environment, allowing you to subsequently sync them to staging.

### Pulling changes in linked apps

For apps created from a template with the **`Linked`** flag set, updates from the master app are received automatically. However, if you've added a development environment to your linked app, changes in the master app won't be applied automatically to production. Instead, you'll need to go to your development environment and pull the changes made in the template.

This step is necessary to handle potential conflicts between changes in the master app and your linked app. After pulling changes, you can then incorporate them into your app.

## **Environment settings**

You may have noticed that there is no app builder available in the production environment. This is because making direct changes in the production environment is discouraged. Changes should be made in the development or staging environment, tested, and then synced to production.

However, your production environment might require slightly different behavior than your development or staging environments. This could involve using a different API key, an alternative alerts policy, or even a distinct theme for easy differentiation between production and development.

This is where environment settings come into play. These settings can be customized per environment and, combined with metadata, influence how your app operates.

![App Metadata and Environments](/slingrDoc/images/vendor/platform-ref/metadata-to-environments.png)

You can modify environment settings from the app builder in the development or staging environment. For the production environment, these settings can be adjusted using the app monitor.

For more information on different environment settings, refer to the following documentation:

- [Environment Variables]({{<ref "/dev-reference/environment-settings/environment-var.md">}})
- [UI Settings]({{<ref "/dev-reference/environment-settings/ui-settings.md">}})
- [Logs and Alerts]({{<ref "/dev-reference/environment-settings/logs-and-alerts.md">}})
- [Localization]({{<ref "/dev-reference/environment-settings/localization.md">}})

