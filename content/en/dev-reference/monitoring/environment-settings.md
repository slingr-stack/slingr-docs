---
title: "Environment settings"
lead: "Explains how to change environment settings from the app monitor and how that affects the running app."
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

In the section `Environment settings` in app monitor it is possible to change environment settings.
These are the settings that can be changed:

- [Environment variables]({{site.baseurl}}/app-development-environment-environment-variables.html)
- [UI settings]({{site.baseurl}}/app-development-environment-ui-settings.html)
- [Logs and alerts]({{site.baseurl}}/app-development-environment-logs-and-alerts.html)
- [Localization]({{site.baseurl}}/app-development-environment-localization.html)
- [API Tokens]({{site.baseurl}}/app-development-environment-api-tokens.html)

When you change these settings they will take effect in the app immediately. For example if you
change the app theme, just reloading the app should bring the new theme.

The only exception to this are changes in environment variables that affect endpoints, for example
when the variable is used in the configuration of the endpoint. If you change the value of the
variable you will be asked to restart affected endpoints, but you can do it later if you don't
want to do it right away.
