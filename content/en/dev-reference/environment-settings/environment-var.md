---
title: "Environment variables"
lead: "Describes what are environment variables and how they can be used."
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

Environment variables can be used across the app metadata as place holders that will be replaced
when the app is loaded. The main advantages of using environment variables instead of hard-coded
values are:

- **They can be changed in the production environment**: you can manage environment variables from
  the app monitor and change their value. This is the only way to change the app behavior in production
  as app builder is not available there.
- **You can change the value in one place**: if the value of an environment variable changes you
  just need to change it and everything will be updated. Otherwise you need to go through the
  app changing the value in all the places where it was used.
  
Environment variables can be managed from the app builder in section `Environment settings > Environment variables`
or from the app monitor in section `Environment settings > Environment variables`.

## Synced environment variables

By default when you create a new environment variable it will be marked as synced. This means that
if you change its value in the development environment, when syncing changes the value will be
changed in the production environment as well.

This could be desirable when you are using the environment variable to keep a unique point of
configuration, but values are the same in dev and prod.

However, when you need to have different values in dev and prod this doesn't work. In those cases
you can unset the `Keep in sync` and put a different value. That's done in the app monitor of the
production environment and once it is changed, syncing changes from dev to prod won't override the
value.
 
## Usage of environment variables

Environment variables can be used anywhere in the metadata of apps. You need to wrap them
like this: `${ENVIRONMENT_VARIABLE_NAME}`. For example if the variable is `ADMIN_EMAIL` then
you should write `${ADMIN_EMAIL}` in order to reference it. 

For example if you have an environment variable named `TOKEN` then you can use its value in a 
script like this:

```js
var token = '${TOKEN}';
sys.logs.info('token: '+token);
```

Another common case is to use the environment variable in the settings of an endpoint. For example
if you have a Slack endpoint instead of hard-coding the bot token, you could have an environment
variable for it and in the endpoint settings you will write the following (assuming the environment
variable is name `SLACK_BOT_TOKEN`):

```
${SLACK_BOT_TOKEN}
```

## System environment variables

System environment variables are variables that are automatically available to all apps and their
value is calculated.

These are the available system variables:

- `APP_NAME`: this is the name of the app.
- `APP_ENV`: this is the environment where the app is being executed. Could be `dev` or `prod`.
- `APP_URL`: the URL to access the app runtime. For example `https://app.slingrs.io/prod/runtime`.
- `APP_VERSION`: this is a number that identifies the version, which is the milliseconds since Epoch
  when changes were pushed. This means that every time changes are pushed, this version number will
  change.
