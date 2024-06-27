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

The package can trigger events using the [events API]({{ref "/dev-references/scripting/sys-events.md}}) like this:

```javascript
sys.events.triggerEvent('sharepoint:webhook', {
  body: body,
  params: params
});
```

For webhooks, the most common type of events, you will probably define a listener to capture the webhook from the HTTP service and then trigger it as a package event. You can see an example in the [Listeners](#listeners) section.

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

Javascript files are imported into the app and each one represents a script library. Exposed variables/functions should be included in `exports` as it is done in app libraries. Scripts should be put in the `scripts` folder of your package and the names of the files need to match the ones in
the descriptor.

This scripts provided by the package are executed in the context of the app as any other script library. These libraries can be called from anywhere inside the app.

A script file will look like this:

```js
var s = function(a, b){
    return a+b;
};
exports.sum = s;

exports.rnd = function(){
    return Math.random();
};

exports.PI_VALUE = Math.PI;

exports.rndSum = function(){
    return this.sum(this.rnd(), this.PI_VALUE);
};

exports.getAccessToken = function () {
  return dependencies.oauth.functions.connectUser(); // using package dependency
}

exports.makeApiCall = function (sitesId, httpOptions) {
  if (!sitesId) {
    sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [sitesId].');
    return;
  }
  var url = parse('/v1.0/sites/:sitesId/permissions', [sitesId]);
  sys.logs.debug('[pkgName] POST to: ' + url);

  let pkgConfig = config.get(); // getting package configuration
  sys.logs.debug('[pkgName] config: '+JSON.stringify(pkgConfig));
  var options = checkHttpOptions(url, httpOptions);
  options.authorization = mergeJSON(authorization, {
    type: "oauth2",
    accessToken: pkgConfig.token,
    headerPrefix: "Bearer"
  });
  return dependencies.http.post(options); // using service dependency
};
```

#### Package config

The values of the package configuration can be accessed within the js files like it is shown next:

```
config.get(); // returns configuration map
config.get(parameterName);// returns parameter value of the configuration
```

#### Usage of package dependencies

Package dependencies can be accessed this way:

```
// for dependencies on packages: dependencies.<depName>.<library>.<function>
dependencies.oauth.functions.connectUser();
// for dependencies on services: dependencies.<depName>
 dependencies.http.post()
```
#### Stores

If your package needs to store data persistently, you will need to use the [app storage](https://platform-docs.slingr.io/app-development-js-api-storage.html). In this key value storage you can save
JSON documents, find them by keys, update or remove them. Elements can be stored encrypted:

```
// store a user token
sys.storage.put(config.id + ' - access_token', response.access_token, {encrypt: true});
// get a user token
sys.storage.get(config.id + ' - access_token', {decrypt: true})
```
#### Trigger package events

The way of triggering package events is using the method `sys.events.triggerEvent({pkgName}:{eventName})`. You will see more useful examples ahed but here there is a simple case:

You received a webhook from github in the http service and you want to do some refactoring on the received data and then send the event to the app.
```
      sys.events.triggerEvent('github:webhook', {
        eventName: "reopened",
        type: "pullRequest",
        data: data
      });
```

### Listeners

You need to define listeners in a js file.

In this scripts you will be able to define listeners dynamically. This way, when developers add the package to their
apps, listeners will be automatically appended.

For example, you could use this feature to process a webhook sent to a service related to the package.

Listeners should be added as properties to the object `listeners`:

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
    sys.logs.info('Received Sharepoint webhook. Processing and triggering a package event.');
    var body = JSON.stringify(event.data.body);
    var params = event.data.parameters;
    if(true) {
      sys.logs.info('Valid webhook received. Triggering event.');
      sys.events.triggerEvent('sharepoint:webhook', {
        body: body,
        params: params
      });
      return "ok";
    }
    else throw new Error("Invalid webhook");
  }
};
```

The name of the variable will be the name of listener, in addition the user must configure the `label` of the listener, then `type` (it can be `data`, `service` and `job`). The `options`
field represents the proper configuration for the type. Finally, the `callback` is the action executed by the listener.
The header of this function is ignored, only the inner code is used, developers must consider the parameters coming based
on listener type. See [documentation](https://platform-docs.slingr.io/app-development-model-listeners.html#action)

Next we will briefly describe the different types of listeners:

#### Data

See the example:

```js

listeners.listenerForCompaniesChanges = { //The name will be taken from this namespace
    label: 'Listener for Companies changes', //label configuration
    type: 'data',
    options: {
        executeInBackground: true, //Indicates if the listener must be executed in background
        entity: 'companies', //The name or id of the entity listened
        events: [ //entity events configuration
            {type: 'recordCreated'}, //the type of entity event, it can be 'recordCreated', 'recordChanged', 'recordDeleted', 'actionPerformed'
            {type: 'actionPerformed', action: 'assignCompanyType'} //not all event types are available, in addition, for 'actionPerformed' the name or id can be specify
        ]
    },
    callback: function(event, record, oldRecord) {// available parameters are 'event', 'record' and 'oldRecord'
        sys.logs.info('Entering to listener handler'); //JS API functions are available
        sys.logs.info('Event: '+JSON.stringify(event));
        sys.logs.info('Record: '+JSON.stringify(record));
        sys.logs.info('Old record: '+(oldRecord ? JSON.stringify(oldRecord) : ''));
    }
};
```

#### Services

See the example:

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
    sys.logs.info('Received Sharepoint webhook. Processing and triggering a package event.');
    var body = JSON.stringify(event.data.body);
    var params = event.data.parameters;
    if(true) {
      sys.logs.info('Valid webhook received. Triggering event.');
      sys.events.triggerEvent('sharepoint:webhook', {
        body: body,
        params: params
      });
      return "ok";
    }
    else throw new Error("Invalid webhook");
  }
};
```

#### Job

See the example:

```js

listeners.listenerForExportRecords = { //The name will be taken from this namespace
    label: 'Listener for Export records', //label configuration
    type: 'job',
    options: {
        jobType: 'exportRecords',//job type, available are: `startApp`, `stopApp`, `importRecords`, `exportRecords`, `importUsers`, `exportUsers`
        event: 'finished'// status listened, available are: `created`, `started`, `finished`, `stopped`, `resumed`, and `canceled`
    },
    callback: function(event) {// only `event` is a available parameter for this function
        sys.logs.info('Entering to listener handler'); //JS API functions are available
        sys.logs.info('Event: '+JSON.stringify(event));
    }
};
```

### Flow steps

You can create customized flow steps for your package.

Flow steps should be defined in folders that match the ones in the descriptor. There must be one folder per flow step.
For each flow step defined you should provide 3 files for it:

- `icon.png`: this is the icon for the step in the flow editor. The icon requires to have the PNG format and, be of size 18x18px.
- `step.js`: this file should contain the function that will be executed as part of the step. This function must receive a unique object parameter called 'inputs' containing the function parameters.
- `step.json`: this file should contain the name of the step along with inputs and outputs for it.

After registering the new package version and setting that new version from the developer portal
you will be able to see the new flow steps available at the flow editor.

#### Required files examples

Examples for `step.js` file:
```js

/**
 * Generates a random number.
 *
 * @param {object} inputs {number} bound, This is used to get a random number between 0 (inclusive) and the number
 * passed in this argument, exclusive.
 */
step.numberGenerator = function (inputs) {

  var data = pkg.utils.functions.randomNumber({bound: inputs.bound});
  return {
    "generatedNumber": data['number']
  };
};
```
Examples for `step.json` file:
```
{
  "label": "Random numb",
  "name": "numberGenerator",
  "category": "integrations",
  "description": "Generates a new random number.",
  "inputs": [
    {
      "label": "Bound",
      "name": "bound",
      "type": "text",
      "description": "This is used to get a random number between 0 (inclusive) and the number passed in this argument, exclusive",
      "required": "true",
      "defaultValue": 2000
    }
  ],
  "outputs": [
    {
      "label": "Generated number",
      "name":  "generatedNumber",
      "type": "number",
      "description": "The generated random number"
    }
  ]
}
```

Inputs examples:
```
  "inputs": [
    {
      "label": "Operation",
      "name": "operation",
      "type": "choice",
      "defaultValue": "SUM",
      "required": "true",
      "options": {
        "possibleValues": [
          {
            "label": "Sum",
            "name": "SUM"
          },
          {
            "label": "Rest",
            "name": "REST"
          },
          {
            "label": "Division",
            "name": "DIV"
          },
          {
            "label": "Multiplication",
            "name": "MULT"
          }
        ],
        "allowContextSelector": "false"
      }

    },
    {
      "label": "First operand",
      "name": "firstOperand",
      "type": "text",
      "description": "First operand",
      "required": "true"
    },
    {
      "label": "Second operand",
      "name": "secondOperand",
      "type": "text",
      "description": "Second operand",
      "required": "true"
    }
  ]
```

Output examples:
```
  "outputs": [
    {
      "label": "result",
      "name":  "result",
      "type": "object",
      "description": "Result object containing temperature, pressure and humidity for the given city"
    }
  ]
```

```
  "outputs": [
    {
      "label": "city",
      "name":  "city",
      "type": "text",
      "description": "name of the city"
    },
    {
      "label": "temperature",
      "name":  "temperature",
      "type": "number",
      "description": "temperature for the given city"
    },
    {
      "label": "pressure",
      "name":  "pressure",
      "type": "number",
      "description": "pressure for the given city"
    },
    {
      "label": "humidity",
      "name":  "humidity",
      "type": "number",
      "description": "humidity for the given city"
    }
  ]
```
For more information about flows you can go to Developer's reference: [flows overview]({{<ref "/dev-reference/flows/overview.md">}}).

### UI services

UI services are useful to put custom code client side enhancing its functionalities. A good example of this are the pop up window that is opened in the oauth authentication.

Ui services should be defined in folders that match the ones in the descriptor. There must be one folder per ui service.
For each flow step defined you should provide 3 files for it:

- `uiService.js`: this file should contain the scripts  that will be loaded in the client side.
- `uiService.json`: this file should will describe the characteristics of the ui service.

#### uiService.json

This file will describe the ui service and set it's configuration. The structure of the json is:
 - name: string.
 - places: list of strings. Where the ui service will be loadead. Options are: `APP`, `LOGIN`.
 - dependencies: list of jsons. Where you can add dependencies to external sources. Each dependency should contain:
   - file: string. Pointing to external source
   - placement: string. Options: `HEAD`,`BOTTOM`
   - places: list of strings. Options: `APP`. `LOGIN`
 - functions: the methods that are exposed to be called from the app.
   - label: string
   - name: string
   - callbacks: list of strings.
 - events: list of jsons. Events that can be triggered by the ui service and be sent to the app
   - label
   - name

#### uiService.js

This file will contain the scripts to be run in the client side. Methods that want to be called from the app should be added to an object called `services`.
For example:

```
service.testFunction = function (message) {
    var config = message.config;
    console.log('test function arrived ',message);
    service.callback(message, 'callbackEvent', config);
}
```
The method testFunction from the slingr application with this script:

```javascript

    sys.ui.sendMessage({
        scope: 'uiService:{descriptiorPkgName}.{uiServiceName}',
        name: 'testFunction',
        config: {
            data: "event data"
        },
        callbacks: {
          callbackEvent: function (originalMessage, callbackData) {
                //do something
            }
        }
    });
```

For more information on how ui services work you can see [ui services]({{<ref "/dev-reference/data-model-and-logic/ui-services.md">}}).





