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

The package information must be stored in a git-hub repo and the file structure must be:

- Descriptor file
  - Name
  - Dependencies
  - Events
  - Configuration
  - Configuration Builder
  - Metadata
- Scripts
- Listeners
- Flow steps
- Ui services

## Descriptor file

The descriptor file should be located at the root of your project and has the name `package.json`. It contains
the definition of your package, like name, functions, events, configuration, etc.

### Name

This is the internal name of the package and will be used to determine the type of package. Usually in lower case with dashes.

### Dependencies

```
...
"dependencies": [
      {
        "type": "service",
        "name": "http",
        "version": "v1.2.6"
      },
      {
        "type": "package",
        "name": "oauth",
        "version": "^v1.0.15"
      }
],
...
```

The `dependencies` section allows to set dependencies that the package needs to work. Dependencies can be fo type:

* Package: This type will import functionality from other packages that are required for this package to work. For example:
the git-hub package will have the package oauth as a dependency. This will avoid the developer to reimplement the oauth flow.
* Service: This type means that the in order to install a package, the app will need to have a specific service enabled. The most common case is to have the `http` service as a dependency.

These are the settings required for each dependency:

- `type`: Dependencies can be of type service or package.
- `name`: The name of the dependency.
- `version`: This have the format vX.Y.Z. i.e: v1.0.15. To set the behaviour of the update policies related to dependencies
  prefixes can be added to the version. These prefixes can be:
  * ^  : Compatible version. This will listen to updates as long as the X value doesn't change. i.e. 1.Y.Z
  * ~ : Bug fixes. This will listen to updates as long as the Y value doesn't change. i.e. 1.2.Z
  *  No prefix: Version is fixed.

### Events

```
...
"events": [
    {
        "label": "Inbound Event",
        "name": "inboundEvent",
        "description": "Event triggered by the package when a request arrive to the root path of the service."
    },
    {
        "label": "Pong",
        "name": "pong",
        "description": "Callback event for the Ping function"
    },
    ...
],
...
```

Events originate from the package and are sent to the app, which can process them through listeners.
For a more detailed description of how to process events from packages, refer to the documentation [here]({{<ref "/dev-reference/data-model-and-logic/listeners.md#package-event-listeners">}}).

The definition of the events just contains a few properties. The content of the event is defined by the package and
the app will receive it as a JSON, but no need to define the structure here.

These are the properties of events:

- `label`: this is the name developers will see in the app builder.
- `name`: this is the internal name of the event that will be used to identify it in the code.
- `description`: a brief description about what this event is and when it is triggered.

### Configuration

The package can be configured in the app builder. Usually, developers will need to enter some settings needed by the package like an API key in order to work.

This is how the configurations are defined at the root of the descriptor:

```
...
"configuration":[
  ...
]
```

Basically each configuration is described by a set of fields, which have the following structure:

```
{
    "label": "Field",
    "name": "field",
    "type": "password",
    "multiplicity": "one",
    "required": true,
    "visibility": @config.otherField,
    "showLabel": true,
    "defaultValue": "12345678",
    "typeOptions": {}
}
```

Here is a brief description of each property:

- `label`: this is the label that will be shown on the left of the field. It is required if `showLabel` is set to
  `true` (default value).
- `name`: represents the key under value will be stored in configuration. This key is also accessible through `config`
  global variable.
- `type`: the type of the field. This will determine the `typeOptions` field. More information about types below.
- `multiplicity`:  there are two possible values: `one` (default value) or `many`. The second value will allow to define
  multiple values for this field (it will be an array).
- `required`: indicates that the field is mandatory. It can be represented with a boolean `true` or `false`, a reference
  like `@config.otherField` or and expression as `config.otherField && utils.isPlaceHolder(config.anotherValue)`
- `visibility`: indicates if the field is visible in UI. It can be represented with a boolean `true` or `false`, a reference
  like `@config.otherField` or and expression as `config.otherField && utils.isPlaceHolder(config.anotherValue)`
- `showLabel`:  if `false`, the label will not be displayed and the field will use all the width available. It is
  represented with a boolean `true` or `false`.
- `defaultValue`: value set by default if a value has not be set by the user.
- `typeOptions`: only valid for some types, check next section.

Next we will describe the available types:

#### Label

Type: `label`

A label represents a read only value that will not be stored as part of configuration. It only represents information
for user or developer.

```
{
    "label": "Simple",
    "name": "simpleLabel",
    "type": "label",
    "value": "Sample Complex Package"
}
```

This field type has no options.

#### Information

Type: `info`

Allows to display an alert where HTML code can be inserted.

```
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

#### Fields group

Type: `fieldsGroup`

This is a special kind of field and allows to nest other fields inside it.

```
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

Options:

- `fields`: must respect the same structure than `configuration` or `userConfiguration`, which means it is basically an
  array of fields. Any number of levels are supported but not recommended more than two levels due to UI available space.

#### Text

Type: `text`

This is a common text input, the value will be stored as a simple string. It can have validations set through type
options

```
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

```
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
- `numberOfRows`: in the case that the selected representation is `textArea` it is possible to set the number of rows to
  be displayed.

#### Password

Type: `password`

Represented by a password input, the value will not be shown to the developer, however it will be stored as a simple
string. Keep in mind that all settings of packages are encrypted as usually there is sensitive information.

```
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

Creates a toggle widget and will store a boolean value.

```
{
    "label": "Sync Automatically",
    "name": "syncAutomatically",
    "multiplicity": "one",
    "type": "toggle"
}
```

This field type has no options.

#### Button

Type: `button`

This component allows the execution of an action when clicked. No information is stored as value of this field. This
component does not allow `multiplicity` equals to `many`.

```
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
- `action`: this is an expression that will be parsed and executed as Javascript function on client side. Some
  interesting example can be found in the official packages. For example the Google Calendar package uses buttons
  to trigger the OAuth process.

#### Buttons group

Type: `buttonsGroup`

This component creates a group of buttons. If `multiplicity` is set to `true`, many values could be selected.

```
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

- `possibleValues`: this is an array of elements with `label` (text shown as options) and `name` (string stored as
  value). These will be the options.
- `allowCustom`: indicates that a placeholder can be set as value, creating an input next right to buttons to select
  it. This is important if the value of this field might need to change between different environments of your app.

#### Drop down

Type: `dropDown`

This component creates a combo-box. In this case, if `multiplicity` is `many`, more than one value can be selected.

```
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

- `possibleValues`: this is an array of elements with `label` (text shown as options) and `name` (string stored as
  value). These will be the options.
- `allowCustom`: indicates that a placeholder can be set as value, creating an input next right to buttons to select
  it. This is important if the value of this field might need to change between different environments of your app.

### Configuration builder

You need to pass the path of a JavaScript file that contains the configuration builder script.

In cases where dependencies on other packages require configuration, you can pass the configuration from the parent package to the child package using this script. This allows app developers to configure packages in one central location. For instance, if you're developing a package for
Google Contacts that relies on the `oauth` package as a dependency, you can configure the `oauthCallback` property in the `Google Contacts package. With the configuration builder, you can then pass that value to the `oauth` package imported as a dependency.

The script in this file must contain a function called `configurationBuilder` with a parameter `config` that should be returned. Within this function's parameter, you will have access to the parent configuration, allowing you to configure the child dependency. In the following example, we demonstrate configuring the `oauth` package, which serves as a dependency for our package.

```javascript
let configurationBuilder = function (config) {
    config.oauth = {
        id: 'installationInfo-GooglContacts-User-'+sys.context.getCurrentUserRecord().id(),
        authUrl: config.authUrl,
        accessTokenUrl: config.accessTokenUrl,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        oauthCallback: config.oauthCallback
    }
    return config;
}
```


In this script, you can utilize Slingr's JavaScript methods and access the application's context. Additionally, you have the flexibility to manipulate values from parent configurations before setting the children's configurations. In the provided example, the ID of the oauth package is used to store encrypted user tokens in data stores.

### Metadata

In the descriptor file we must define the metadata we want to include in the package. The structure would be:
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

- `type`: the type can be script, listener, uiService, flowStep.
- `path`: the path to find the required files. The path can point to a folder or a file depending on the metadata.

## Package metadata

### Scripts libraries

Javascript files are imported to the app and each file represents a script library. Exposed variables should be included
in exports as it is done for app libraries.

Scripts should be put in the `scripts` folder of your package and the names of the files need to match the ones in
the descriptor.

This scripts provided by the package are executed in the context of the app as any other script library.
These libraries and methods can be called from anywhere in the app.

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

exports.sites.permissions.post = function (sitesId, httpOptions) {
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

### Ui services

Ui services are useful to put custom code client side enhancing its functionalities. A good example of this are the pop up window that is opened in the oauth authentication.

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





