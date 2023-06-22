---
title: "Development process"
lead: "Describes the recommended steps and processes to create apps in Slingr."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 2
---

Here you will find some guidelines to create a new app in Slingr. They are just recommendations
and you are free to follow them or take your own path. However we suggest to go through this document
to understand the basic path and then you can make adjustments as you need.

## Process

We strongly believe in agile methodologies for software development and Slingr is built in
a way to facilitate its implementation when creating apps. This means that getting something up
and running is just a matter of minutes, and evolving your app over time is made as simple as
possible.

As agile methodologies suggest, we encourage developers to go through small iterations during the
development of their apps, to start with something very simple that can provide some value and 
people can start using. From there you can keep adding more features and change things as you need.

The cycle would look like this:

![App metadata and environments](/images/vendor/platform-ref/development-process1.png)

1. **Model your entities**: capture the most important things from your domain and model them into
  entities. At this point it is probably good to just define the structure of fields and a few
  settings. Over time you will be adjusting settings as needed.
1. **Add business logic**: this means to add things like actions, listeners, integrations through
  endpoints, scripts to define calculated values, aggregations, etc. This will make your app to be
  more than just a storage of records.
1. **Create views on top of your entities**: if you added new entities you probably want to create
  at least a grid view to being able to do basic CRUD operations. If you already had views probably
  you want to adjust them to the changes in your model.
1. **Configure permissions**: make sure that features you are adding or changing can be accessed
  by the right groups.
1. **Define navigation**: add views to menus so users can access app features.
1. **Test your app**: once you have the basics, go ahead and push changes so you can see your app
  working. Seeing it work will give you a better idea of what you have do next.
1. **Iterate until you get what you want!**: go through the same process until you get to state
  where you are satisfied with the results. Slingr is ready to help you as much as possible
  with features like [Automatic Refactorings](/docs/dev-reference/metadata-management/automatic-refactorings), 
  generated [UI]({{site.baseurl}}/app-development-ui-overview.html) and 
  [REST API]({{site.baseurl}}/app-development-apps-rest-api-docs.html).

Keep in mind that you don't need to perform all these steps on each iteration. In some cases your
changes will only affect an action script and things like views and permissions won't be modified
at all. This is just a guideline.

These iterations could be very short, maybe just a few hours or even minutes, when you are in your
development environment. However when you need to sync to prod we suggest that you make cycles a
longer and include things that have been tested good enough.

## Best practices

### Start light

Don't try to create everything in your first iteration! Think what are the most important use cases
and try to get the basic things done. Show it to your users and make changes from there.

This will help you to move forward with less uncertainty, creating an app that really matches the
expectations of users.

### First class development environment

Make sure that your development environment has all the features available and they work well. For
example if you have an integration with Slack, you should have a Slack team for your development
environment so you can test you Slack integrations there. Otherwise you will end up testing things
in your production environment, which is never a good thing.

So basically make sure that you can test everything in your development environment. Create account
in services you are integrating that are dedicated to your development environment, where developers
can have access if they need to look at something or just play a bit with it. Make sure you have
enough data to go through the different use cases easily. This will greatly improve development times.

### Be aware of versioning

When pushing changes it is possible to create a backup of your app metadata. This will allow you
to go back to a previous version in case that you break something by mistake.

Probably you don't want to create a version backup every time you push changes, but you should do
it when you complete working on something. It is also important to add notes to describe what was
done so it will be easier to see what changed on each version.

### Sync to prod carefully

When syncing to your production environment keep in mind that your app will be stopped, changes
will be applied and then the app will be started. During that time the app won't be accessible
by your users.

In many cases downtime could be just a couple of seconds and won't affect users, however if there
are refactorings affecting a lot of records (for example a field was renamed or removed), this
could take a while.

