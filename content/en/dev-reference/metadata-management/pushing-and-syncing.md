---
title: "Pushing and syncing changes"
lead: "Explains the process to make changes to your app metadata and move them from the development environment to the production environment."
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

As explained in the [Overview]({{<ref "/dev-reference/overview/overview.md">}}) the definition of
your data model, business rules, scripts, views, permissions, etc., is what we call the **metadata**
of your app.

In order to make changes to the metadata you will need to do them in the app builder, which is only
available in the development and staging environmensts. Production environment doesn't allow changes 
(you need to sync changes, see below), however you can modify environment settings from the app monitor 
to adjust the behavior there (more about environment settings below).

Next we will describe the process to make changes to your apps and sync those changes to production.

## Making changes to your app

You can modify your app metadata through the app builder. There you will be able to see the definition
of your app and make the changes you need. This changes won't be applied immediately, but you need
to push them to the app runtime, where they will be applied. For example if you add a new field in the app
builder you won't see it in the app right after saving it. First you need to push changes and once
that's done, the new field will show up in the app runtime of the development environment.

![Push changes](/images/vendor/platform-ref/push-changes.png)

You can push changes from the app builder, using the action `Push changes` in the secondary menu
(there is also a shortcut with `Ctrl + P`). When you push changes you will see a summary of changes
that have been done and will be pushed and will be able to do a backup and enter a message explaining
the changes done.

If you set the flag to create a backup, a [version]({{<ref "/dev-reference/app/versions.md">}})
will be created that you can later restore. You probably don't want to create a backup on every
single push, but only when you need a point-in-time where you can go back if needed.
Finally it is important to know what happens when you push changes:

1. The app will be stopped in the development environment (production is not affected).
1. Metadata changes are moved to the app runtime.
1. If metadata changes produce modifications in data, refactorings will be done to adjust the data
  to the new structure. For example if you deleted a field, all records of that entity will be
  modified to remove that field.
1. If there were changes in endpoints they will be deployed, removed or redeployed.
1. The app is finally started.

## Moving changes to production

If you have a production environment in your app, once all your changes have been tested on the
development environment, you can sync those changes from dev to prod.

![Sync changes](/images/vendor/platform-ref/sync-changes.png)

You can sync changes from the app builder, using the action `Sync changes to prod` in the secondary 
menu. When you sync changes you will see a summary of changes that have been done and will be moved
to production. One important thing is that these are the changes that have been already pushed,
which means that if you made changes in the app builder but they were not pushed, they won't be
synced either.

When syncing changes this is what happens:

1. App metadata is exported from the dev environment.
1. The production environment will be stopped.
1. The app metadata will be imported in the production environment.
1. Refactorings of data will be done.
1. Endpoints will be synced.
1. The production app will be finally started.

Depending on the changes made and the amount of data that needs to be refactored (if any) this might
take a while, so make sure you understand what changes could cause data refactorings (see 
[Automatic refactorings]({{<ref "/dev-reference/metadata-management/automatic-refactorings.md">}})) and sync 
changes when it won't affect your operations.

Finally, another thing to bear in mind is that if there are apps linked to your app, changes will be
synced to all of them. The same process described above will be applied to every linked app.

### Fixing issues automatically

Before triggering the sync process the application metadata is being validated. If errors are found
during validation process then a tool to try to fix those issues will be available.  

## Staging environment

It is also possible to add a staging environment. This environment is a buffer between development and
production. Some use cases are:

- **Hotfixes**: what you have in staging could be the version you have running in prod. If there is an
  issue in prod, instead of fixing it on development (where you could have other changes that you don't
  want in production), you can fix in staging and sync only that fix to prod.
- **QA**: once you complete an iteration in your development process, instead of syncing directly to
  prod, you can sync to staging, perform some regression testing there, and once everything is looking
  good there, sync from staging to production.
  
When you have a staging environment, changes done in development will be synced to staging, and from
there you will need to sync to production.

### Pull changes

The pull process has two stages: 

- **Fetch Changes**: retrieve changes from the source environment that developer wants to merge changes.
- **Merge Changes**: applies source environment changes into dev environment. The origin of those changes can be staging or a parent app.

If you made changes in the staging environment, you won't be able to sync changes from development to
staging. Before doing that you will be requested changes first. So you will need to go to the app
builder in your development environment and execute the action `Pull changes` in the secondary menu.

This operation will merge the changes done in staging into the development environment. After you 
pull changes you will be able to sync to staging from development.


### Pull changes in linked apps

If you created your app from a template and you set the `Linked` flag, your app will receive updates
from the master app automatically. However if you added a development environment to your linked app,
changes in the master app won't be applied automatically into production. Instead you will need to
go to your development and pull the changes that have been done in the template.

This step is needed because there could be conflicts between the changes in the master app and your
linked app and you need to fix them. Once changes are pulled you will be able to ship them into
your app.

## Environment settings

As you can notice, there is no app builder in the production environment. The reason is that you
shouldn't be making changes on prod. Instead you should do them on the development or staging environment,
test them there and sync to prod once everything looks good.

However in almost all cases your production environment needs a slightly different behavior. It
could be a different API key, another alerts policy, or just a different theme so you can easily
realize when you are working on prod or dev.

Here is where environment settings come into play. These settings can be changed per environment
and, together with the metadata, will dictate how you app will be executed. 

![App metadata and environments](/images/vendor/platform-ref/metadata-to-environments.png)

In the production environment you are able to change environment settings in the app monitor, while
in the development or staging environment those settings can be changed from the app builder.

In the documentation you will find more information for the different environment settings:

- [Environment variables]({{<ref "/dev-reference/environment-settings/environment-var.md">}})

- [UI settings]({{<ref "/dev-reference/environment-settings/ui-settings.md">}})

- [Logs and alerts]({{<ref "/dev-reference/environment-settings/logs-and-alerts.md">}})

- [Localization]({{<ref "/dev-reference/environment-settings/localization.md">}})
