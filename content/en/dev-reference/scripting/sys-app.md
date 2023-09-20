---
title: "sys.app"
lead: "Describes utilities in the Javascript API to get information about the app."
description: "Describes utilities in the Javascript API to get information about the app."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 60
---

## **sys.app**

This package encompasses methods for retrieving information about the app, such as its name, URL, current environment, and more.

### getLabel()

Returns the label of the app currently in execution.

##### Returns

**`string`**  - The label of the app.

##### Samples

``` javascript
// logs the label of the app
log('app: '+sys.app.getLabel());
```
<br>


### getName()

Returns the name of the app currently in execution.

##### Returns

**`string`**  - The name of the app.

##### Samples

``` javascript
// logs the name of the app
log('app: '+sys.app.getName());
```
<br>

### getEnv()

Returns the name of the environment in execution. It could be **`prod`** or **`dev`**.

##### Returns

**`string`**  - The label of environment in execution.

##### Samples

``` javascript
// logs the name of the environment
log('env: '+sys.app.getEnv());
```
<br>
     
### getUrl()

Returns the URL of the app currently in execution. This URL might resemble something like **`https://yourapp.slingrs.io/dev/runtime`** or **`https://yourapp.slingrs.io/prod/runtime`**.

##### Returns

**`string`**  - The URL of the app.

##### Samples

``` javascript
// logs the URL of the app
log('app url: '+sys.app.getUrl());
```
<br>

### getVersion()

Returns the version of app in execution. It is a timestamp.

##### Returns

**`string`**  - The version of the app.

##### Samples

``` javascript
// logs the version of the app
log('app version: '+sys.app.getVersion());
```
<br>

### getDefaultLanguage()

Return the language code of the default language used in the app.

##### Returns

**`string`**  - Language code used in the app

##### Samples

``` javascript
// logs the default language of the app
log('app language: ' + sys.app.getDefaultLanguage());
```
<br>

### getDefaultTimezone()

Return the id and label of the default timezone used in the app.

##### Returns

**`string`**  - ID and label of the default timezone used in the app.

##### Samples

``` javascript
// logs the default timezone of the app
log('app timezone: ' + JSON.stringify(sys.app.getDefaultTimezone()));
```
<br>