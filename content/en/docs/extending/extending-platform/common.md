---
title: "Common features"
lead: "Explains features of endpoints that are independent fo the SDK used to create the endpoint."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
---

Endpoints, no matter if they are in Java, Node.js or another technology, they will share some common things like:

- Descriptor file
  - Basic settings
  - Deployment settings
  - Stores
  - Functions
  - Events
  - Configuration
- Scripts
- Listeners
- Flow steps

## Descriptor file

The descriptor file should be located at the root of your project and has the name `endpoint.json`. It contains
the definition of your endpoint, like name, type of endpoint, resources, functions, events, configuration, etc.

### Basic settings

```
...
"label": "Sample",
"name": "sample",
"apiVersion": "v1",
"configurationType": "GLOBAL",
"configurationHelpUrl": "https://slingr-stack.github.io/platform/app_development_model_endpoints.html",
...
```

These are the basic settings of the endpoint. Here is a more detailed description of each of them:

- `label`: this is the visible name of the endpoint.
- `name`: this is the internal name of the endpoint and will be used to determine the type of endpoint. Usually in
  lower case with dashes.
- `apiVersion`: this is the version of the API to communicate to the Slingr Platform. For now only valid value is `v1`.
- `configurationType`: this indicates if the configuration would be per app or at the user-level. These are the possible
  values:
  - `GLOBAL`: in this case the endpoint will only have a configuration at the app level (in the app builder).
  - `PER_USER`: in this case, apart from the global configuration section, each user might need to have specific settings
    to connect to the endpoint. For example, this is the case for the Google Calendar endpoint, where each user needs
    to authorize the endpoint using OAuth.
- `configurationHelpUrl`: this is the URL that has the documentation about the configuration of the endpoint. Optional.

### Deployment settings

```
...
"deployment": {
    "profiles":[
        {
            "name": "default",
            "label": "Default",
            "memory": 512,
            "offHeapMinFactor": 1.5,
            "description": "Default configuration"
        }
    ],
    "type": "java",
    "allowMultipleInstances": true
},
...
```

The `deployment` section allows to adjust technical options for the component to be run.

In this section you can have different profiles for one endpoint. Basically a profile will indicate how
much memory the endpoint will use (and CPU will be adjusted automatically). These are the settings for each profile:

- `name`: internal name of the endpoint. It cannot have spaces or special characters.
- `label`: visible name of the profile. It will be displayed to the user in the app builder.
- `memory`: the amount of memory needed by the endpoint. This is the total memory used by the process.
- `offHeapMinFactor`: this is optional and only available for Java endpoints. It indicates the factor for non-heap
  memory allocation. If you endpoint needs more native memory, you will probably want to increase it. Default an
  minimum is `1`.
- `description`: this is the description of the profile that will be showed to the developer. It should give useful
  information to decide which profile will be used.

There are some other options that you can configure for the deployment of the endpoint:
- `allowMultipleInstances`, which can be `true` or `false`. If it is `true`, it will
  be possible to configure many instances of the endpoint. When there are multiple instances request will go to any
  instance indistinctly, so your endpoint shouldn't keep any status at the instance level. The safest option is to
  set this to `false` and only enable it if you need scaling and you make sure that your instances are stateless.
- `type`: indicates the technology used for the endpoint. This allows the platform to proper perform the build of the
  endpoint. Possible values are: `java`, `java8`, `java11` and `nodejs`.

### Stores

```
...
"stores": [
    {
        "name": "test_data_store",
        "indexes": [
            {"fieldA": 1},
            {"fieldB": 1, "fieldC": -1}
        ]
    }
],
...
```

If you endpoint needs to store data persistently, you will need to define "stores". In this stores you can save
JSON documents, find them by keys, update or remove them. It is like a simple database you can use in endpoints.

For each store you need to define the following settings:

- `name`: the name of the store. It cannot contain spaces or special characters.
- `indexes`: if the store is going to have many documents, it is good to add indexes to optimize how you access
  the data. You can define several indexes, where you need to specify the field(s) in the index and the direction,
  where `1` means ascending and `-1` descending.

### Functions

```
...
"functions": [
    {
        "label": "Random number generator",
        "name": "randomNumber",
        "description": "Generates a random integer"
    },
    {
        "label": "Ping",
        "name": "ping",
        "description": "The service returns the sent value for the Pong event",
        "callbacks": [
            {
                "name": "pong",
                "maxWaitingTime": 60000,
                "maxExpectedResponses": 1
            }
        ]
    },
    ...
],
...
```

Functions are the basic way to interact with the endpoint, as they can be invoked from the app in scripts. A set of
parameters will be sent to the function, that will be received by the endpoint and can return a result. You can find
more information about how functions work [here]({{site.baseurl}}/app-development-model-endpoints.html#functions).

Here you don't need to specify any kind parameters. The implementation of the function will just get a JSON and
should use the needed parameters.

Here are the settings for a function:

- `label`: the human-friendly name of the function.
- `name`: the name of the function. This will be the name used to call it and should match the name defined in your
  implementation.
- `description`: a description of what your functions does. Optional.
- `callbacks`: when the function does something that could take time, instead of blocking the caller, it is possible
  to define a callbacks that will be called once the results are ready or an event related to this call happens.
  This callbacks have to be defined as events too, as they are basically events related to a function call. Please
  check the documentation about [endpoint callbacks]({{site.baseurl}}/app-development-model-endpoints.html#callbacks)
  for more information about how they are used in apps.
  Callbacks have the following properties:
  - `name`: this is the name of the callback that should be used in the code and should also match the name of the
    event defined in the endpoint (see events below).
  - `maxWaitingTime`: this is the maximum time we could expect the callback to be called since the function is
    invoked. It is important to set a reasonable waiting time as resources will be freed only after this times out
    or the callback is called (see next property too).
  - `maxExpectedResponses`: by default, once the callback is called, resources will be freed and it won't called
    again. However there are cases where the callback might be called several times by only executing the function
    once. In these cases you should specify the maximum number of calls to this callback that are possible.

### Events

```
...
"events": [
    {
        "label": "Inbound Event",
        "name": "inboundEvent",
        "description": "Event send for the endpoint each time that a POST request to the root path of the web service."
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

Events are originated on the endpoint and sent to the app that can process them through listeners. A more detailed
description of how to process events from endpoints in found [here]({{site.baseurl}}/app-development-model-endpoints.html#events).

The definition of the events just contains a few properties. The content of the event is defined by the endpoint and
the app will receive it as a JSON, but no need to define the structure here.

These are the properties of events:

- `label`: this is the name developers will see in the app builder.
- `name`: this is the internal name of the event that will be used to identify it in the code.
- `description`: a brief description about what this event is and when it is triggered.

### Configuration

The endpoint can be configured in the app builder. Usually, developers will need to enter API keys and other settings
needed by the endpoint in order to work.

There are two types of configurations that an endpoint can have:

- *Global configuration*: this is the configuration of the endpoint when you open it in the app builder. All endpoints
  can have this configuration.
- *User configuration*: this is the configuration that users will see when they go to `My Integrations` in the secondary
  menu of the app runtime. This configuration is per user and it is only available for endpoints where the setting
  `configurationType` is set to `PER_USER`.

This is how the configurations are defined at the root of the descriptor:

```
...
"configuration":[
  ...
],
"userConfiguration":[
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
    "value": "Sample Complex endpoint"
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
                "value": "Sample Complex endpoint"
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
string. Keep in mind that all settings of endpoints are encrypted as usually there is sensitive information.

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

#### Script

Type: `script`

This field can store a script (Javascript) that can be used later in the app:

```
{
    "label": "Action Script",
    "name": "actionScript",
    "type": "script",
    "multiplicity": "one",
    "typeOptions": {
        "parameters": ["day", "amount"]
    }
}
```

Then, during runtime you can call this script like this:

```js
app.endpoints.sampleEndpoint.config.actionScript({day: '2019-02-15', amount: 5});
```

Options:

- `params`: a list of parameters that will be taken by this function. Only these params will be passed to the function
  when executed.

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
  interesting example can be found in the official endpoints. For example the Google Calendar endpoint uses buttons
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

#### Entity

Type: `entity`

Allows to select an existing entity that is defined in the app. The value will be stored as a reference to metadata,
being refactored in the same way when changes happen. For example, if the entity name changes, the configuration of
the endpoint will be updated, or if the entity gets deleted, the value will be cleared.

```
{
    "label": "Entity",
    "name": "entity",
    "type": "entity"
}
```

This field type has no options.

#### Entity field

Type: `entityField`

Allows to select an existing entity field. The value will be stored as a reference to metadata, being refactored in
the same way when changes happen. For example, if the entity field's name changes, the configuration of
the endpoint will be updated, or if the field gets deleted, the value will be cleared.

```
{
    "label": "Field",
    "name": "entityField",
    "type": "entityField",
    "visibility": "@config.entity",
    "required": "@config.entity",
    "typeOptions": {
        "entity": "@config.entity",
        "filterTypes": ["user", "choice"]
    }
}
```

Options:

- `entity`: this is the entity the field should belong to. Valid values are the entity name or id, or a direct
  reference like `@config.entity`.
- `filterTypes`: a list of valid entity field types (represented in camel case) is accepted to filter the type of the
  fields listed in the selector.

#### Entity action

Type: `entityAction`

Allows to select an existing entity action. The value will be stored as a reference to metadata, being refactored in
the same way when changes happen. For example, if the entity action's name changes, the configuration of
the endpoint will be updated, or if the action gets deleted, the value will be cleared.

```
{
    "label": "Action",
    "name": "entityAction",
    "type": "entityAction",
    "visibility": "@config.entity",
    "defaultValue": "addANote",
    "typeOptions": {
        "entity": "@config.entity"
    }
}
```

Options:

- `entity`: this is the entity the action should belong to. Valid values are the entity name or id, or a direct
  reference like `@config.entity`.

#### Entity filters

Type: `entityFilters`

Allows the developer to define an entity filter while configuring the endpoint. The value will be stored as
metadata, which means it will be refactored for example if fields involved in this filter are renamed or deleted.

```
{
    "label": "Filters",
    "name": "entityFilters",
    "type": "entityFilters",
    "typeOptions": {
        "entity": "@config.entity"
    },
    "value": {
        "_or": {
            "companyType":"Self",
            "name":"notEmpty()"
        },
        "entity":"companies"
    }
}
```

Its value is represented as complex queries, for more information check the documentation for
[expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html#query-format) to undertand how it works and
how to use it in a query.

Options:

- `entity`: this is the entity the filter is associated with. Valid values are the entity name or id, or a direct
  reference like `@config.entity`.

#### Entity events

Type: `entityEvents`

Allows the developer to define an entity event while configuring the endpoint. The value will be stored as
metadata, which means it will be refactored for example if fields involved in this filter are renamed or deleted.

```
{
    "label": "Events",
    "name": "entityEvents",
    "type": "entityEvents",
    "typeOptions": {
        "entity": "@config.entity"
    },
    "value": {
        "events": [
            {
                "id":"59b029ad57abd274c50074c6",
                "conditionType":"none",
                "type":"recordCreated",
                "sourceEvents": [
                    "userEvents",
                    "systemEvents"
                ]
            },
            {
                "id":"59b02a604b31a11b77001b78",
                "conditionType":"expression",
                "expression": {
                    "filters": [
                        {
                            "type":"byValue",
                            "operation":"notEmpty",
                            "field":"companyLinks.link",
                            "values":[]
                        }
                    ],
                    "entity":"companies"
                },
                "type":"conditionMet",
                "sourceEvents": [
                    "userEvents",
                    "systemEvents"
                ]
            },
            {
                "id":"59b02bf7bdcf466302006303",
                "conditionType":"script",
                "script": "1 == '1'",
                "type":"actionPerformed",
                "actions": [
                    "assignCompanyType",
                    "addANote"
                ],
                "sourceEvents": [
                    "scriptEvents",
                    "systemEvents"
                ]
            }
        ]
    }
}
```

This events can be used later to define [listeners]({{site.baseurl}}/extensions-common-features.html#listeners).

Options:

- `entity`: this is the entity the event is associated with. Valid values are the entity name or id, or a direct
  reference like `@config.entity`.


#### Entity mapper

Type: `entityMapper`

The entity mapper field type helps to define a mapping between the app and the endpoint. For example, let's suppose
that the endpoint integrates with a service tha has information about companies. Instead of having the user to manually
create a mapping between the companies in the external service and the entity in the app, you could you this entity
mapper to configure how the mapping should be done. Then the endpoint will use this information to perform the mapping
automatically.

```
{
    "label": "Accounts",
    "name": "accounts",
    "type": "entityMapper",
    "typeOptions": {
        "allowToCreateEntity": true,
        "allowToSelectDirection": true,
        "recordNameField": "name",
        "fields": [
            {
                "label": "Name",
                "name": "name",
                "type": "text",
                "multiplicity": "one"
            },
            {
                "label": "Type",
                "name": "type",
                "type": "choice",
                "multiplicity": "one",
                "options": {
                    "possibleValues": [
                        {"label": "Client", "name": "client"},
                        {"label": "Prospect", "name": "prospect"},
                        {"label": "Other", "name": "other"}
                    ]
                }
            },
            {
                "label": "Relationship",
                "name": "relation",
                "type": "relationship",
                "multiplicity": "one",
                "options": {
                    "entity": "@config.entity"
                }
            },
            {
                "label": "Address",
                "name": "address",
                "type": "nestedFields",
                "multiplicity": "one",
                "options": {
                    "nestedFields": [
                        {
                            "label": "Streets",
                            "name": "streets",
                            "type": "text",
                            "multiplicity": "many"
                        },
                        {
                            "label": "State",
                            "name": "state",
                            "type": "choice",
                            "multiplicity": "one",
                            "options": {
                                "possibleValues": [
                                    {"label": "Arizona", "name": "AZ"},
                                    {"label": "New York", "name": "NY"},
                                    {"label": "California", "name": "CA"}
                                ]
                            }
                        },
                        {
                            "label": "Contact",
                            "name": "contact",
                            "type": "nestedFields",
                            "multiplicity": "many",
                            "options": {
                                "nestedFields": [
                                    {
                                        "label": "Name",
                                        "name": "name",
                                        "type": "text",
                                        "multiplicity": "one"
                                    },
                                    {
                                        "label": "Phones",
                                        "name": "phones",
                                        "type": "phone",
                                        "multiplicity": "many"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ],
        "hooks": [
            {
                "label": "Syncing to app",
                "name": "syncingToApp",
                "params": ["record", "oldRecord", "data"]
            },
            {
                "label": "Syncing to Endpoint",
                "name": "syncingToEndpoint",
                "params": ["record", "data", "other"]
            },
            {
                "label": "Other script",
                "name": "otherScript"
            }
        ]
    }
}
```

Options:

- `allowToCreateEntity`: if this is set as `true`, a `Create entity` button will appear allowing developer to create
  an entity with configuration described in the mapper, displaying a popup to insert `label` and `name`. If the process
  finishes correctly, the popup will be closed and the configuration will be automatically filled with entity information.
  This is very useful to speed-up the integration process. For example a Google Calendar endpoint could have a mapper
  for events and instead of having to create the entity manually you could just click on `Create entity` which will
  automatically create the entity and configured it to sync with events in Google Calendar.
  - *WARNING*: if configuration has dependencies to other fields, like relationship fields pointing to an entity, and these
    dependencies are not set at the moment of create was triggered, the creation process will fail showing a validation error.
- `allowToSelectDirection`: if this is set as `true`, a buttons group will be displayed allowing to select one of
  three possible values:
  - `App to Endpoint`: changes on app are synchronized to endpoint
  - `Endpoint to App`: changes on endpoint side must be synced to the Slingr app
  - `Both`.
    If `allowToSelectDirection` is `false` then the `defaultDirection` field is required.
- `defaultDirection`: this is the default sync direction. Could be `appToEndpoint`, `endpointToApp` or `both`.
- `recordNameField`: indicates which of root fields will be used into the entity as record name. This value is only
  used when clicking on `Create entity` button.
- `fields`: this is the list of fields that can be mapped. Mandatory fields are `label`, `name` and `type`. The
  `multiplicity` is optional and its default value is `one`.

  For types `choice`, `relationship` and `nestedFields` the `options` object is required to specified `possibleValues`,
  `entity` and `nestedFields` respectively.

  All these configurations are necessary for entity creation, but they also act as filters when an entity is selected
  through combo-box to filter valid fields for each configuration.

  Values are stored as `references` to entity and it will come to endpoint as path of fields.
- `hooks`: hooks are mainly `script` fields that will be available for endpoints, here user can describe function headers
  and the behavior when mapping is not enough to convert fields from one side to the other.

## Scripts

You need to configure scripts in the descriptor file:

```
...
"scripts":[
    "sample.js",
    "other.js"
],
...
```

Scripts should be put in the `scripts` folder of your endpoint and the names of the files need to match the ones in
the descriptor.

This are scripts provided by the endpoint that are executed in the context of the app as any other script. For example,
like scripts in libraries. These scripts are useful to simplify the usage of the endpoint or provide some features that
need to be executed on the app side.

Here are some common usages of scripts in endpoints:

- *Wrappers for endpoints functions*: for example, sometimes the wrapper can do things to expose the function in a
  simpler way. Look at this sample:
  ```js
  endpoint.wrapperFunc = function(a, b, c) {
    endpoint.func({a: a, b: b, c: c});
  }
  ```
  In the above sample the user doesn't have to send a map when calling the function, but can pass the parameters
  directly.
- *Access to app data*: if you have to automate some process that needs access to the app data, you will need to
  execute that on the app side, because from the endpoint it isn't possible to query the app data.

A script file will look like this:

```js
var s = function(a, b){
    return a+b;
};
endpoint.sum = s;

endpoint.rnd = function(){
    return Math.random();
};

endpoint.PI_VALUE = Math.PI;

endpoint.rndSum = function(){
    return this.sum(this.rnd(), this.PI_VALUE);
};

endpoint.showConfig = function(){
    sys.logs.info("Endpoint: "+this._name);
    sys.logs.info(" - Token: "+this._configuration.token); // check that the variable 'endpoint' is isolated on the context
    sys.logs.info(" - Token (by ref): "+endpoint._configuration.token);
};
```

Here you can see an special variable called `endpoint`. You can add properties to this object that can be available
at the endpoint. For example, in the above example, you could call the function `rnd` by calling `app.endpoints.sample.rnd()`
(assuming your endpoint's name is `sample`).

It is also worth noticing the following elements:

- `endpoint._name`: this is the name of the endpoint configured in the app.
- `endpoint._configuration`: this is a map with the configuration of the endpoint.

## Listeners

You need to define listeners in the descriptor file:

```
...
"listeners":[
    "dataListener.js",
    "jobListener.js",
    "endpointListener.js"
],
...
```

These scripts should be located in the `listeners` folder of the endpoint.

In this scripts you will be able to define listeners dynamically. This way, when developers add an endpoint to their
apps, listeners will be automatically appended.

For example, you could use this feature to provide automatic syncing of data between the app and the external service.
In this case you will create a listener when a record is modified in the app, to sync changes to the external service,
and another listener when a webhook arrive from the external app, so you update the data in the app.

Listeners should be added as properties to the object `listeners`:

```js
var getEntity = function(){
    return 'companies';
};

listeners.listenerForCompaniesChanges = {
    label: 'Listener for Companies changes',
    type: 'data',
    options: {
        executeInBackground: true,
        entity: getEntity(),
        events: [
            { type: 'recordCreated' },
            {type: 'actionPerformed', action: 'assignCompanyType'}
        ]
    },
    callback: function(event, record, oldRecord) {
        sys.logs.info('Entering to listener handler');
        sys.logs.info('Event: '+JSON.stringify(event));
        sys.logs.info('Record: '+JSON.stringify(record));
        sys.logs.info('Old record: '+(oldRecord ? JSON.stringify(oldRecord) : ''));
    }
};
```

The script can contain its own functions like `getEntity`, the name of the variable will be the name of listener, in addition
the user must configure the `label` of the listener, then `type` (it can be `data`, `endpoint` and `job`). The `options`
field represents the proper configuration for every type. Finally, the `callback` is the action executed by the listener.
The header of this function is ignored, only the inner code is used, developers must consider the parameters coming based
on listener type. See [documentation](https://platform-docs.slingr.io/app-development-model-listeners.html#action)

Next we will briefly describe the different types of listeners:

### Data

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

### Endpoint

See the example:

```js

listeners.listenerForSample = { //The name will be taken from this namespace
    label: 'Listener for Sample endpoint', //label configuration
    type: 'endpoint',
    options: {
        endpoint: endpoint.name, //name of listened endpoint, it can be taken for special var called `endpoint` referring to current endpoint
        event: 'inboundEvent' //a valid event defined into `endpoint.json` dispatched by selected endpoint
    },
    callback: function(event) {// only `event` is a available parameter for this function
        sys.logs.info('Entering to listener handler'); //JS API functions are available
        sys.logs.info('Event: '+JSON.stringify(event));
    }
};
```

### Job

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

## Flow steps

You can create customized flow steps for your endpoint. To do that you need to define the endpoint flow steps in the descriptor file:

```
...
"flowSteps":  [
        "numberGenerator",
        "weatherService",
        "simpleCalculator"
    ],
...
```

Flow steps should be defined in the `flowSteps` folder of your endpoint and the names of the files need to match the ones in the descriptor.
For each flow step defined you should provide 3 files for it:

- `icon.png`: this is the icon for the step in the flow editor.
- `step.js`: this file should contain the function that will be executed as part of the step. This function must receive a unique object parameter called 'inputs' containing the function parameters.
- `step.json`: this file should contain the name of the step along with inputs and outputs for it.

Once you've created the required files you'll need to register your endpoint with a new version.
More information can be found at:
[Endpoint Registration](extensions-create-your-own-endpoints.html#register-your-endpoint)

After registering the new endpoint version and setting that new version from the developer portal
you will be able to see the new flow steps available at the flow editor.
<div style="width:800px">
<img src="/images/vendor/extending/endpoint_flow_steps.png" alt="Endpoints steps" style="max-width:880px; border:1px solid grey;"/>
<br>
<i>
Steps available in the flow editor
</i>
</div>
<br>

### Required files examples
Examples for `step.js` file:
```js

/**
 * Generates a random number.
 *
 * @param {object} inputs {number} bound, This is used to get a random number between 0 (inclusive) and the number 
 * passed in this argument, exclusive.
 */
step.numberGenerator = function (inputs) {

  var data = endpoint.randomNumber({bound: inputs.bound});
  return {
    "generatedNumber": data['number']
  };
};
```

```js
/**
* Returns some real time weather characteristics given a city
*
* @param {object} inputs {string} city, City name, if nothing found it will use a default city (NY)
  */
  step.weatherService = function (inputs) {
  var data =  endpoint.weather({city: inputs.city});

  return {
  "city": data['city'],
  "temperature": data['temperature'],
  "pressure": data['pressure'],
  "humidity": data['humidity']
  };
  };
```

From the `step.js` file you can call javascript functions defined in the script files under `scripts` folder and also functions annotated with `@EndpointFunction`.
The object you return should match the output defined in the `step.json` file.


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

For more information about flows you can go to Developer's reference: [Flows Overview](app-development-flows-overview.html)

