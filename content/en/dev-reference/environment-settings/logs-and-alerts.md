---
title: "Logs and alerts settings"
lead: "Explanation of logs and alerts configuration by environment."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 19
---

These are global settings of the app found in the app builder under `Environment settings > Logs and alerts`.

`Logs size` allows to set the max sized occupied by logs collection in memory, this is inherit to DB engine and it is
generally bigger than the effective size used in DB.

`Enable cold logs` this is a flag that allows to store historical app logs in files. `Storage period` means the amount 
of time to keep files in storage. It can be expressed in months or years.

Alerts allow to send notifications to developers when a specific event happens during
the execution of the app. For example if an error is logged, then the developer in charge
of the app can get an email with information about the error. 

To enable alerts the flag `Enable alerts` must be set. Once it is enabled other options
will show up:

- `Level`: alerts are based on app logs, so you can select what type of logs will generate
  alerts. The options are:
  - `Only errors`: alerts will be sent only when logs with level `ERROR` are generated.
  - `Errors and warnings`: alerts will be sent only when logs with either level `ERROR` 
    or `WARN` are generated.
- `Report threshold`: indicates the maximum frequency of alerts the app will send. This is
  useful in cases where there are a lot of errors which are usually the same and you don't
  want to spam developers with hundreds or even thousands of alerts.
- `Users to notify`: these are the developers that will get the alerts.
- `Emails to notify`: in case notifications have to be sent to someone who is not a user
  of the app, you can set email addresses here and alerts will be sent there as well.

