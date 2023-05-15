---
title: "Localization"
lead: "Explanation of localization settings by environment."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

These are global settings of the app found in the app builder under `Environment settings > Localization`.

- `Timezone`: the default timezone of the app. This will be used if there isn't a user associated
  to the current execution context (for example an event arrives from a global endpoint, where 
  no user triggers that event). It is also used for defaults for timezone of time listeners, however
  it can be changed.
- `Language`: the default language for the app. Take into account that if the app is not correctly
  internationalized you will see a mix of languages.
  
Keep in mind that users can configure their localization settings in their profile and those
will override the app localization settings.
