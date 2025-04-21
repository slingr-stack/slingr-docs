---
title: "Packages features"
description: "Here you will find more specific information to create your own package."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "packages"
toc: true
weight: 10
---

When developing a new package, we strongly suggest to look at the [`skeleton-package`](https://github.com/slingr-stack/skeleton-package) repo, that already has the basic structure of a package. Another option, is to look at an existing package that you think could be similar. For example, if you are creating a package for a Google service you might want to check the packages for other Google services we have and use them as templates.

Usually, a package will have the following file structure:

- `package.json`: this is the main descriptor of the package and contains all the settings.
- `configurationBuilder.js`: optional, needed when dependencies need to be configured
- `scripts/`: folder containing Javascript files.
- `listeners/`: folder containing listeners.
- `flowSteps/`: folder containing listeners.
- `uiServices/`: folder containing UI services.
- `LICENSE`: this is the license of the package.
- `README.md`: this is the documentation of the package.

## Descriptor file

The descriptor file should be located at the root of your project and has the name `package.json`. It contains the definition of your package, like name, functions, events, configuration, etc. It looks something like this:

```json
{
    "name": "name-of-the-package",
    "label": "Name Of The Package",
    "dependencies": [
    ],
    "configuration": [
    ],
    "configurationBuilder": "/configurationBuilder.js",
    "events": [
    ],
    "metadata": [
    ]
}
```

### Name and label

The property `name` is a unique name of the package. Usually, we use all lower case with dashes. The property `label` is human-friendly name of the package.

### Dependencies

Dependencies point to other packages or services that are needed by this package to run. For example, here is the dependency with the HTTP service to make HTTP requests:

```json
{
  "type": "service",
  "name": "http",
  "version": "^v1.5.4"
}
```

These are the settings required for each dependency:

- `type`: indicates what type of dependency it is. It could be either `service` or `package`.
- `name`: the name of the package or service it depends on.
- `version`: the version of the dependency needed. The format is vX.Y.Z. i.e: v1.0.15. To set the behavior of the update policies related to dependencies, prefixes can be added to the version:
  * ^ : compatible version. This will listen to updates as long as the X value doesn't change. i.e. 1.Y.Z
  * ~ : bug fixes. This will listen to updates as long as the Y value doesn't change. i.e. 1.2.Z
  * No prefix: version is fixed.

Most packages that help integrating with other services through the API, will include the HTTP service as a dependency.

Additionally, if the authentication is done through OAuth, they will mostly depend on the OAuth package:

```json
{
    "type": "package",
    "name": "oauth",
    "version": "^v1.0.24"
}
```

### Configuration

The configuration defines what parameters the package will take to adapt to your application and are the ones that can be configured in the app builder when installing it. Configuration parameters are usually needed when the package helps you integrate with other systems, and it requires you to enter API keys, client ID, client secrets, etc. For packages containing libraries you usually don't need parameters.

Here is a sample configuration for the Stripe package:

```json
{
    "name": "stripe",
    "label": "Stripe",
    "dependencies": [],
    "configuration": [
        {
            "label": "Publishable Key",
            "name": "publishableKey",
            "type": "text",
            "required": true
        },
        {
            "label": "Secret Key",
            "name": "secretKey",
            "type": "password",
            "required": true
        },
        {
            "label": "Webhooks URL",
            "name": "webhooksUrl",
            "type": "label",
            "value": "@config.WEBHOOK_URL"
        },
        {
            "label": "Check Webhooks Signature",
            "name": "checkWebhooksSignature",
            "type": "toggle",
            "defaultValue": false
        },
        {
            "label": "Webhooks Secret",
            "name": "webhooksSecret",
            "type": "password",
            "required": "config.checkWebhooksSignature==true"
        },
        {
            "label": "Stripe API URL",
            "name": "stripeApiBaseUrl",
            "type": "label",
            "value": "https://api.stripe.com"
        }
    ],
    "events": [ ],
    "metadata": [ ]
}
```

As you can see, you can define different parameters needed to make the package work. In this case, to make calls to the Stripe API through the package you will need to provide things like publishable key, secret key and webhooks secret.

Additionally, you can see some read-only fields (of type `label`) that have a value, which could be fixed (like the field `stripeApiBaseUrl`) or calculated (like `webhooksUrl`). These fields are usually information needed by the developer to complete the configuration of the integration. For example, in Stripe you need to enter the URL that Stripe will send webhooks and so the field `webhooksUrl` indicates what's the URL you need to set up in the Stripe settings.

Here is a brief description of each property:

- `label`: this is the label that will be shown on the left of the field. It is required if `showLabel` is set to `true` (default value).
- `name`: represents the key under the value will be stored in configuration. This key is also accessible through `config` global variable.
- `type`: the type of the field. This will determine the `typeOptions` field. More information about types below.
- `multiplicity`: there are two possible values: `one` (default value) or `many`. The second value will allow to define multiple values for this field (it will be an array).
- `required`: indicates that the field is mandatory. It can be represented with a boolean `true` or `false`, a reference like `@config.otherField` or and expression as `config.otherField && utils.isPlaceHolder(config.anotherValue)`.
- `visibility`: indicates if the field is visible in UI. It can be represented with a boolean `true` or `false`, a reference like `@config.otherField` or and expression as `config.otherField && utils.isPlaceHolder(config.anotherValue)`.
- `showLabel`:  if `false`, the label will not be displayed and the field will use all the width available. It is represented with a boolean `true` or `false`.
- `defaultValue`: value set by default if a value has not been set by the user.
- `value`: for read-only fields (like `label` or `information`), this is the fixed value or script that calculates it.
- `typeOptions`: his is an object that contains properties specific to the selected type. Look at the type settings below to understand what are the options for each type.

Next we will describe the available types:

#### Text

Type: `text`

This is a common text input, the value will be stored as a string. Here is an example:

```json
{
    "label": "Client Id",
    "name": "clientId",
    "type": "text",
    "required": true
}
```

Also, you could add some validations:

```json
{
    "label": "Email",
    "name": "email",
    "type": "text",
    "required": true,
    "typeOptions": {
        "validation": "email"
    }
}
```

Or you might show a text area if the value could be long:

```json
{
    "label": "Description",
    "name": "description",
    "type": "text",
    "typeOptions": {
        "representation": "textArea",
        "numberOfRows": 4
    }
}
```

Options:

- `validation`: validations available are: `email`, `number` and `url`. All these validations allow placeholders.
- `representation`: the component to be used to represent the field. Valid options are: `inputText` (default) and `textArea`.
- `numberOfRows`: in the case that the selected representation is `textArea` it is possible to set the number of rows to be displayed.

#### Password

Type: `password`

Represented by a password input, the value will not be shown to the developer, however it will be stored as a simple string. Keep in mind that all settings of packages are encrypted as usually there is sensitive information. Here is an example:

```json
{
    "label": "Password",
    "name": "password",
    "type": "password",
    "required": true
}
```

This field type has no options.

#### Toggle

Type: `toggle`

Creates a toggle widget and will store a boolean value. Here is an example:

```json
{
    "label": "Sync Automatically",
    "name": "syncAutomatically",
    "multiplicity": "one",
    "type": "toggle"
}
```

This field type has no options.

#### Buttons group

Type: `buttonsGroup`

This types shows a group of buttons the developer can select. If `multiplicity` is set to `true`, many values could be selected. Otherwise, only one button can be selected at any time. This type is good to let the developer select one or many options. Here is an example:

```json
{
    "label": "Multi",
    "name": "multiSwitcher",
    "type": "buttonsGroup",
    "multiplicity": "many",
    "required": true,
    "defaultValue": ["danger", "info"],
    "typeOptions": {
        "possibleValues":[
            {
                "label":"Danger",
                "name":"danger"
            },
            {
                "label":"Warning",
                "name":"warn"
            },
            {
                "label":"Information",
                "name":"info"
            }
        ],
        "allowCustom": true
    }
}
```

Options:

- `possibleValues`: this is an array of elements with `label` (text shown in the button) and `name` (string stored as value in the configuration). These will be the options for the developer to select from.
- `allowCustom`: indicates that a placeholder can be set as value, creating an input next right to buttons to select it. This is important if the value of this field might need to change between different environments of your app.

#### Drop down

Type: `dropDown`

This component creates a combo-box. In this case, if `multiplicity` is `many`, more than one value can be selected. Here is an example:

```json
{
    "label": "Multi Custom",
    "name": "multiCustomDropDown",
    "type": "dropDown",
    "multiplicity": "many",
    "defaultValue": ["${TEST2}", "CA"],
    "typeOptions": {
        "allowCustom": true,
        "possibleValues":[
            {
                "label":"New York",
                "name":"NY"
            },
            {
                "label":"Arizona",
                "name":"AZ"
            },
            {
                "label":"California",
                "name":"CA"
            }
        ]
    }
}
```

Options:

- `possibleValues`: this is an array of elements with `label` (text shown as options) and `name` (string stored as value). These will be the options.
- `allowCustom`: indicates that a placeholder can be set as value, creating an input next right to buttons to select it. This is important if the value of this field might need to change between different environments of your app.

#### Label

Type: `label`

It shows some short text with information to the developer. It won't be stored in the configuration, it is only to show the value to the developer. Here is an example:

```json
{
    "label": "Simple",
    "name": "simpleLabel",
    "type": "label",
    "value": "Sample Complex Package"
}
```

Keep in mind you need to use `value` to set its value instead of `defaultValue`.

This field type has no options.

#### Information

Type: `info`

Allows to display an alert where HTML code can be inserted. Here is an example:

```json
{
    "label": "Information",
    "name": "information",
    "type": "info",
    "typeOptions": {
        "alertType": "warning"
    },
    "value": "Follow these points to generate a new credentials:<ul><li>Access to the Dev Console</li><li>Create a new project. Copy the 'Project Name' in the configuration form.</li><li>...</li></ul>"
}
```

Options:

- `alertType`: describes the color or format to display it. Valid values are: `info`, `success`, `warning` and `danger`.

#### Button

Type: `button`

This component allows the execution of an action when clicked. No information is stored as value of this field. This
component does not allow `multiplicity` equals to `many`. Here is an example:

```json
{
    "label": "Set email",
    "name": "setEmail",
    "type": "button",
    "typeOptions": {
        "color": "info",
        "action": "if (!config.inputs.email) { config.inputs.email = 'test1@slingr.io'; }"
    }
}
```

Options:

- `color`: available values are `info`, `default`, `primary`, `success`, `warning` and `danger`.
- `action`: this is an expression that will be parsed and executed as Javascript function on client side. Some interesting example can be found in the official packages. For example the Google Calendar package uses buttons to trigger the OAuth process. Also, more about scripts can be found in the [Scripts](#scripts).
-
#### Fields group

Type: `fieldsGroup`

This is a special kind of field and allows to nest other fields inside it. Here is an example:

```json
{
    "label": "Labels",
    "name": "labels",
    "type": "fieldsGroup",
    "typeOptions": {
        "fields":[
            {
                "label": "Simple",
                "name": "simpleLabel",
                "type": "label",
                "value": "Sample Complex Package"
            },
            {
                "label": "Concatenation",
                "name": "concatenation",
                "type": "label",
                "value": "'Prefix ['+(config.entity ? config.entity : 'No entity') +'] > ['+(config.entityField ? config.entityField : 'No field')+'] > ['+(config.entityAction ? config.entityAction : 'No action')+']'"
            },
            {
                "label": "Multi",
                "name": "multiLabel",
                "type": "label",
                "multiplicity": "many",
                "value": [
                    "config.entity ? config.entity : 'No entity'",
                    "config.entityField ? config.entityField : 'No field'",
                    "config.entityAction ? config.entityAction : 'No action'"
                ]
            }
        ]
    }
}
```

Then, in the configuration you will be able to access them as a nested object:

```javascript
let simpleLabel = config.labels.simpleLabel;
```

Options:

- `fields`: must respect the same structure as `configuration`, which means it is basically an array of fields. Any number of levels are supported but not recommended more than two levels due to UI available space.

### Scripts

As can be seen in the examples above, it is possible to have a script to define things:

- Visibility expressions
- Required expressions
- Values and default values
- Buttons' actions

These scripts are written in Javascript and are executed on client side. There are some special variables you can use
in your scripts:

- `@config.field`: instead of writing a script, you could just reference another field. This is useful, for example, when a field needs to be visible based on another flag, so you could use `@config.flag` in the visibility expression.
- `config` references the configuration. For example, you could use `config.companyId` to reference the value of the parameter `companyId` in the configuration.
- `config.WEBHOOK_URL` is the URL that the package could receive HTTP webhooks.
- `config.WEBHOOK_SYNC_URL` is the URL that the package could receive HTTP webhooks that need to return a response in a synchronous way.
- `utils` provides access to some utilities.

### Configuration builder

When you have dependencies that have parameters, you need to provide a script that will set the configuration for those dependencies. For example, let's assume we have the `oauth` package as a dependency. In this case, the script would look something like this:

```javascript
let configurationBuilder = function (config) {
  config.oauth = {
    authUrl: 'https://accounts.google.com/o/oauth2/auth',
    accessTokenUrl: 'https://oauth2.googleapis.com/token',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    oauthCallback: config.oauthCallback
  };
  return config;
}
```

As you can see, in the script you need to have a function with the name `configurationBuilder` that will take one argument which is the configuration of the package (`config` in the example). Additionally, this object contains the configuration of the dependencies. In the above example you can see that `oauth` is a property inside `config` and you need to set its configuration. Finally, the script needs to return the configuration.

Usually, this file can be placed at the root of the repository with the name `configurationBuilder.js` (you could use a different name though). Then, in the descriptor you will need to reference this file:

```json
{
  "configurationBuilder": "/configurationBuilder.js"
}
```

Keep in mind this script is executed in the backend and it has access to any feature of Slingr apps. For example, you could do something like this, where we call `sys.app.getUrl()`:

```javascript
let configurationBuilder = function (config) {
  let appUrl = sys.app.getUrl();
  config.oauth = {
    authUrl: 'https://accounts.google.com/o/oauth2/auth',
    accessTokenUrl: 'https://oauth2.googleapis.com/token',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    oauthCallback: appUrl
  };
  return config;
}
```

### Events

The section `events` in the descriptor lists the possible events that can be triggered by the package. Keep in mind that only the label, name and description is provided here. This is to allow developers create listeners that catch these events.

For example, the most common case is to have an event defined for webhooks in packages that integrate with other systems:

```json
{
  "events": [
    {
      "label": "Webhooks",
      "name": "webhooks",
      "description": "Event triggered when there a webhook from the external service"
    }
  ]
}
```

Events originate from the package and are sent to the app, which can process them through listeners. For a more detailed description of how to process events from packages, refer to the documentation [here]({{<ref "/dev-reference/data-model-and-logic/listeners.md#package-event-listeners">}}).

The definition of the events just contains a few properties. The content of the event is defined by the package and the app will receive it as a JSON, but no need to define the structure here.

These are the properties of events:

- `label`: this is the name developers will see in the app builder.
- `name`: this is the internal name of the event that will be used to identify it in the code.
- `description`: a brief description about what this event is and when it is triggered.

The package can trigger events using the [events API]({{ref "/dev-reference/scripting/sys-events.md"}}) like this:

```javascript
sys.events.triggerEvent('sharepoint:webhook', {
  body: body,
  params: params
});
```

For webhooks, the most common type of events, you will probably define a listener to capture the webhook from the HTTP service and then trigger it as a package event. You can see an example in the sections about [trigger events](#trigger-package-events) and [listeners](#listeners).

### Metadata

In the descriptor file we must define the metadata we want to include in the package. The structure is the following:

```
...
  "metadata": [
      {
          "type": "script",
          "path": "/scripts/functions.js"
      },
      {
          "type": "listener",
          "path": "/listeners/listeners.js"
      }
  ]
...
```

These are the properties of metadata:

- `type`: the type of the metadata to include in the package. It can be `script`, `listener`, `uiService`, or `flowStep`.
- `path`: the path to find the metadata file/folder in the repo. The path can point to a folder or a file depending on the type of metadata. Look at the documentation of each type.

## Package metadata

These are the different metadata elements that can be included in a package.

### Scripts libraries

Javascript files are imported into the app and each one represents a script library. Exposed variables/functions should be included in `exports` as it is done in app libraries. Scripts should be put in the `scripts` folder of your package and the names of the files need to match the ones in the descriptor. For example, let's assume you have the following scripts defined:

```json
{
  "metadata": [
    {
      "type": "script",
      "namespace": "helpers",
      "path": "/scripts/helpers.js"
    },
    {
      "type": "script",
      "namespace": "api",
      "path": "/scripts/api.js"
    }
  ]
}
```

The `namespace` will tell you how to call the elements exposed by the script from the app. More about that later.

Then you will have the following file structure:

```
package.json
scripts/helpers.js
scripts/api.js
```

Here is a sample script that showcase different features. Look at the comments to understand what is being demonstrated.

```js
// simple functions
var s = function(a, b){
    return a+b;
};
exports.sum = s;

exports.rnd = function(){
    return Math.random();
};

// variable exposed
exports.PI_VALUE = Math.PI;

exports.rndSum = function(){
  // you can acess the functions in the package using "this"
  return this.sum(this.rnd(), this.PI_VALUE);
};

// you can call libraries in dependencies using the "dependencies" object
exports.getAccessToken = function() {
  return dependencies.oauth.functions.connectUser(); // using package dependency
}

// access the configuration and call a service that is a dependency
exports.getProducts = function(query) {
  sys.logs.debug('[sample] Querying products: ' + query);
  let token = config.get('token');
  return dependencies.http.get({
    path: '/products',
    params: {
      query: query
    }
  });
};
```

Then, in the app where you are installing the package, you will be able to access the exposed variables/functions in the following way (assuming the script's namespace is `helpers`):

```js
let products = pkg.pkgName.helpers.getProducts('*');
let pi = pkg.pkgName.helpers.PI_VALUE;
```

You can find more information about how to use package [here]({{ref "/dev-reference/data-model-and-logic/packages.md"}}).

Next we will explain some interesting features you can use in scripts in a package.

#### Package configuration

The values of the package configuration can be accessed within the script files like this:

```
config.get(); // returns configuration map
config.get(parameterName);// returns parameter value of the configuration
```

It is important to note that calling `config.get()` might return different configurations if there is a dynamic configuration set. Look at the [package usage documentation]({{ref "/dev-reference/data-model-and-logic/packages.md"}}) for more information about dynamic configurations.

TODO talk about the ID of the config

#### Usage of package dependencies

Package dependencies can be accessed this way:

```js
// for dependencies on packages: dependencies.<depName>.<library>.<function>
dependencies.oauth.functions.connectUser();
// for dependencies on services: dependencies.<depName>
 dependencies.http.post()
```

Keep in mind that when you are referencing a service, the name is the name of the service no matter what name has been given to it in the app. For example, you could add an HTTP service in the app with the name `secureHttp` and the package will have it as a dependency. To access it you will still use `http` which is the name of the service. You don't need to worry about packages because the name cannot be changed when installing them.

#### Store persistent data

If your package needs to store data persistently, you will need to use the [app storage](https://platform-docs.slingr.io/dev-reference/scripting/sys-storage/). In this key-value storage you can save JSON documents or simple values, find them by keys, update or remove them. Elements can be stored encrypted as well. Here are some examples:

```js
// store a user token
sys.storage.put('pkgName_access_token', response.access_token, {encrypt: true});
// get a user token
let totken = sys.storage.get('pkgName_access_token', {decrypt: true})
```

It is important to mention that to avoid collisions you should always prefix your keys with the package name.

This feature is very useful for cases where you need to obtain tokens and save them for later use. This is more effective than storing information in a variable in the script for the following reasons:

- If the app is restarted or the cache is cleared, the information will be preserved.
- If you have multiple instances, by putting information in the storage you make it available to all the instances of the app.

#### Trigger package events

The way of triggering package events is using the method `sys.events.triggerEvent('{pkgName}:{eventName}')`. For example, you could have a [listener](#listeners) that catches an HTTP webhook through the HTTP service and triggers the package event like this:

```js
sys.events.triggerEvent('stripe:webhook', event.data);
```

This will trigger an event that can be captured with a listener of type `Package`. This makes it easier to organize listeners instead of just trying to catch the event from the HTTP service directly.

Another use case could be a polling script that is executed every X minutes and trigger events for the updates:

```js
let lastUpdate = sys.storage.get('pkgName_last_update');
if (lastUpdate) {
  lastUpdate = new Date(lastUpdate);
} else {
  // look for the last hour by default
  lastUpdate = new Date();
  lastUpdate.setHours(lastUpdate.getHours() - 1);
}
let res = dependencies.http.get({
  path: '/orders',
  params: {
    updatedAfter: lastUpdate
  }
});
sys.storage.put('pkgName_last_update', new Date());
if (res && res.orders) {
  sys.events.triggerEvent('pkgName:ordersUpdated', res.orders);
}
```

This would be inside a [time listener](#listeners) that will be executed periodically.

### Listeners

You can include listeners in a package. This will allow to do things automatically by just installing a package in your app. Here are some example of when listeners in packages can be useful:

- Listen to HTTP events and re-trigger the event as a more specific package event
- Automatically sends webhooks when data changes in the app
- Perform periodic actions, like polling data from another service and trigger events in the app

You define the listeners in the descriptor like this:

```json
{
  "metadata": [
    {
      "type": "listener",
      "path": "/listeners/webhooks.js"
    },
    {
      "type": "listener",
      "path": "/scripts/polling.js"
    }
  ]
}
```

Then, in your file structure you will have the following files:

```
package.json
listeners/webhooks.js
listeners/polling.js
```

As you can see, listeners are defined in script files like this:

```js
listeners.defaultWebhookSharepoint = {
  label: 'Catch HTTP Stripe events',
  type: 'service',
  options: {
    service: 'http',
    event: 'webhook',
    matching: {
      path: '/stripe',
    }
  },
  callback: function(event) {
    sys.logs.info('Received stripe webhook');
    sys.events.triggerEvent('stripe:webhook', event.data);
  }
};
```

The key is to add an element to the object `listeners` where the key will be the name of listener. Then, inside the object you will provide more information:

- `label`: human-friendly name of the listener.
- `type`: it can be `service`,`job` and `data`.
- `queue`: in which queue you want the job to run. Optional. We recommend only to use the system queues.
- `options`: this will depend on the type of listener. In the following sections we provide more details about that.
- `callback`: this is the function that will be executed when the listener is triggered. To see more information about what's in the `event` parameter, look at the [listener's action documentation](https://platform-docs.slingr.io/dev-reference/data-model-and-logic/listeners/#action).

Next we will briefly describe the different types of listeners.

#### Service

Service listeners catch events coming from services. The most common scenario is catching events from an HTTP service, which are usually webhooks coming from another systems. You can check more information about service listeners [here]({{ref "/dev-reference/data-model-and-logic/listeners.md"}}).

Here is an example of a service listener inside a package with the most common use case, which is capturing HTTP webhooks and re-triggering them as package events and maybe performing a validation like the example above:

```js
listeners.defaultWebhookSharepoint = {
  label: 'Catch HTTP sharepoint events',
  type: 'service',
  options: {
    service: 'http',
    event: 'webhook',
    matching: {
      path: '/sharepoint',
    }
  },
  callback: function(event) {
    sys.logs.info('[sharepoint] Received webhook [${event.data.id}}]');
    if (pkg.sharepoint.validateWebhookSignature(event.data)) {
      sys.events.triggerEvent('sharepoint:webhook', event.data);
      return "ok";
    } else {
      sys.logs.warn('[sharepoint] Invalid signature for webhook [${event.data.id}]');
    }
  }
};
```

In the `options` property you need to specify the following information:

- `service`: this is the name of the service the listener will be listening to. Keep in mind that the service you are listing to must be a dependency of the package, and the name will always be the name of the service, no matter what name it was given in the app. For example, you might have a service installed with the name `secureHttp` but you still need to use `http`.
- `event`: the name of the event the listener will catch.
- `matching`: this is to filter events that contain specific elements in the data of the event. In the example above, we expect that the property `path` in the data of the event is `/sharepoint`. This is a very common case when you want to use the HTTP service to receive webhooks through HTTP, but you only want to get the ones that are interesting for the package.

Re-triggering service events as a package event has the following advantages:

- You can perform some validations like, for example, validation of a signature.
- You could make transformations to the data that you consider are convenient.
- Having listeners for specific package events is clearer on the app side, making it easier to manage them.

However, keep in mind that the package could listen for service events and do something else, it is not needed to always re-trigger them as package event. We describe this use case in more detail because it is the most common one.

#### Job

Job listeners catch events related to background jobs in the application. In this way, the package could do something based on some jobs, like when the app is started or a service is undeployed. You can check more information about job listeners [here]({{ref "/dev-reference/data-model-and-logic/listeners.md"}}).

Here is an example of a listener that will be executed when the app is started:

```js
listeners.initializeFtpIntegration = {
    label: 'Initialize FTP integration',
    type: 'job',
    options: {
        jobType: 'startApp',
        event: 'finished'
    },
    callback: function(event) {
        sys.logs.info('[ftp] Initializing FTP integration');
        pkg.ftp.initialize();
    }
};
```

In the `options` property you need to specify the following information:

- `jobType`: the type of job you want to listen events from. Available options are `startApp`, `stopApp`, `importRecords`, `exportRecords`.
- `event`: this is the event we want to listen from the job. It could be `created`, `started`, `finished`, `stopped`, `resumed` or `canceled`. Keep in mind that the job type `startApp` only has the `finished` event as you cannot execute any listener before the app has been started. Similarly, for the job type `stopApp` it only makes sense to put a listener for the event `created`.

#### Data

Data listeners catch events when data in the app is modified. For example, it could hae a listener that makes a request to another service whenever a record is created. You can check more information about data listeners [here]({{ref "/dev-reference/data-model-and-logic/listeners.md"}}).

Here is an example of a listener that sends a webhook to another service when a record in an entity is created:

```js
let config = pkg.orderProcessor.getConfiguration();
let ordersEntityName = config.ordersEntityName;

listeners.sendWebhookToProcessor = {
    label: 'Send webhook to processor',
    type: 'data',
    options: {
        executeInBackground: true,
        entity: ordersEntityName,
        events: [
            {type: 'recordCreated'}
        ]
    },
    callback: function(event, record, oldRecord) {
        sys.logs.info('[orderProcessor] Sending order to processor');
        pkg.orderProcessor.sendOrderToProcessor(record.toJson());
    }
};
```

In the `options` property you need to specify the following information:

- `entity`: the name of the entity you will be listening for data changes.
- `events`: this is the list of events you can define. Options are: `recordCreated`, `recordChanged`, `recordDeleted`, `actionPerformed`. If the event type is `actionPerformed`, you also need to provide the `action` property with the name of the action like this: `{type: 'actionPerformed', action: 'actionName'}`. You can specify several events.
- `executeInBackground`: a boolean indicating if the listener needs to be executed in the background.

### Flow steps

You can create customized flow steps for your packages. You can find more about flow steps [here]({{ref "/dev-reference/flows/steps/library-steps.md"}}). Basically, by providing new flow steps, you can extend the functionality in flows. For example, when installing a package to integrate with Stripe, the package can add steps to start payments and do payouts, so developers don't need to write code for those things when using flows.

You can define flow steps in the descriptor like this:

```json
{
  "metadata": [
    {
      "type": "flowStep",
      "namespace": "apiCallStripe",
      "path": "/flowSteps/apiCallStripe"
    }
  ]
}
```

Then, you will have a file structure like this:

```
package.json
flowSteps/apiCallStripe/icon.png
flowSteps/apiCallStripe/step.js
flowSteps/apiCallStripe/step.json
```

Keep it mind that each step will have its own folder and it has to match with the path specified in the descriptor. For each flow step defined you should provide the following files:

- `icon.png`: this is the icon for the step in the flow editor. It has to be a PNG image of 18x18 pixels.
- `step.js`: this file should contain the function that will be executed as part of the step. This function must receive an object parameter called 'inputs' containing the function parameters.
- `step.json`: this is the descriptor of the step which indicates the name, category, inputs and outputs.

Below we explain all the files in more detail.

#### step.json

Let's suppose we want to create a flow step to generate a random number. For that, the user needs to provide a minimum and maximum number to be generated. Then, the descriptor will look something like this:

```json
{
  "label": "Number Generator",
  "name": "numberGenerator",
  "category": "utils",
  "description": "Generates a new random number.",
  "inputs": [
    {
      "label": "Min",
      "name": "min",
      "type": "number",
      "description": "This is the minimum number to generate",
      "required": "true",
      "defaultValue": "0"
    },
    {
      "label": "Max",
      "name": "max",
      "type": "number",
      "description": "This is the maximum number to generate",
      "required": "true",
      "defaultValue": "1"
    }
  ],
  "outputs": [
    {
      "label": "Generated Number",
      "name":  "generatedNumber",
      "type": "number",
      "description": "The randomly generated number"
    }
  ]
}
```

#### step.js

Let's follow the same example of the random number generator and see how the file `step.js` would look like:

```js
step.numberGenerator = function(inputs) {
  let min = inputs.min ? inputs.min : 0;
  let max = inputs.max ? inputs.max : 1;
  return Math.random() * max + min;
}
```

As you can see, there is on function with the name of the flow step that goes into the object `step` and it takes only one parameter named `inputs`. This will contain the values configured in the flow for this step.

### UI services

UI services allow putting code on client side. They will be loaded when the user opens the app in the browser and can add new functionality. For example, the OAuth package has features to show the authentication screen in the UI. But here are other use cases:

- Enter payment details popup for Stripe
- A QR code scanner
- Integration with a browser plugin, like Metamask

You can find more information about UI services [here]({{ref "/dev-reference/data-model-and-logic/ui-services.md"}}).

Here is how you define UI services in the descriptor of the package:

```json
{
  "metadata": [
    {
      "type": "uiService",
      "namespace": "scanner",
      "path": "/uiServices/scanner"
    }
  ]
}
```

Then, you will have the following file structure:

```
package.json
uiServices/oauth/uiService.json
uiServices/oauth/uiService.js
```

Here are the most important things about these files:

- `uiService.js`: this is the script file that will be loaded in client side and should contain functions and event handlers.
- `uiService.json`: this is the descriptor of the UI service.

In the next sections we provide more details about these files.

#### uiService.json

This is the descriptor of the UI service. Here is an example of it:

```json
{
  "name": "scanner",
  "label": {
    "translation": {
      "en": "Scanner"
    }
  },
  "places": [
    "app"
  ],
  "dependencies": [
    {
      "file": "https://cdn.jsdelivr.net/npm/@undecaf/zbar-wasm@0.9.14/dist/index.js",
      "placement": "head",
      "places": [
        "app"
      ]
    },
    {
      "file": "https://cdn.jsdelivr.net/npm/@undecaf/barcode-detector-polyfill@0.9.17/dist/index.js",
      "placement": "head",
      "places": [
        "app"
      ]
    }
  ],
  "byGroups": false,
  "functions": [
    {
      "label": "Open scanner",
      "name": "openScanner",
      "callbacks": []
    }
  ],
  "events": [
    {
      "label": "Code Scanned",
      "name": "codeSuccessfullyScanned"
    }
  ]
}
```

Here are more details about this file:

- `name`: the name of the UI service. It must be unique and has to match the name of the folder.
- `places`: where the UI service will be loaded in the app. Options are: `app` or `login`.
- `dependencies`: these are external files (like Javascript) that need to be added as dependencies. These files will be loaded on client side.
  - `file`: the URL of the file.
  - `placement`: where this file needs to be loaded on the page. Options are: `head`,`bottom`.
  - `places`: where the file will be loaded in the app. Options are: `app`. `login`.
- `functions`: these are the functions that are exposed by the UI service and can be called by the app.
  - `label`: a human-friendly name of the function.
  - `name`: the name of the function in the code.
  - `callbacks`: callbacks available for this function.
- `events`: these are the vents that can be triggered by the UI service.
  - `label`: a human-friendly name of the event.
  - `name`: the code of the event.

#### uiService.js

This script will be loaded on client side and will contain any logic needed by the UI service and should have the definition of the functions that were declared in the descriptor file. For example, it could look like this:

```js
service.isOpen = false;
service.BarcodeDetectorInstance = {};
service.closeAfterCodeScanned = null;

// this is the function declared in the descriptor
service.openScanner = async function (message) {
    service.closeAfterCodeScanned = message.config.closeAfterCodeScanned;
    service.BarcodeDetectorInstance = service.initScanner(message.config.formats);
    let camElement = service.createModal();
    let codeScanned = await openCamera(camElement);
    codeScanned = codeScanned[0].rawValue;
    // sending an event to the app
    service.sendEvent("codeSuccessfullyScanned", {code: codeScanned});
};

service.initScanner = function (formats) {
    if (!("BarcodeDetector" in window)) {
        window.BarcodeDetector = barcodeDetectorPolyfill.BarcodeDetectorPolyfill
    }
    return new BarcodeDetector({
        formats: formats && formats.length ? formats : ['code_128', 'qr_code'],
    });
};

service.createModal = function () {
  // creates the modal and returns the camera HTMLVideoElement
  // ...
};

service.closeScan = function () {
    const videoTrack = document.getElementById('camera').srcObject.getVideoTracks()[0];
    videoTrack.stop();
    document.getElementById('camera').srcObject = null;
    document.getElementById('scanner-window').remove();
    service.isOpen = false;
};

async function openCamera(videoElement) {
  // ...
}

async function processVideoFrame(resolve) {
  // ...
}
```

You can see in this example how the function `openScanner` is defined under the `service` object. From the backend of the Slingr app, you could call this function like this:

```js
  sys.ui.sendMessage({
    scope: 'uiService:scanner.scanner',
    name: 'openScanner',
    config: {
      closeAfterCodeScanned: true
    }
  });
```

Additionally, you can see how an event is sent back to the backend using the method `service.sendEvent(eventCode, message)`. You could create a UI service listener to capture these events.

You can find more information about what is available for scripts in [here]({{<ref "/dev-reference/data-model-and-logic/ui-services.md">}}).





