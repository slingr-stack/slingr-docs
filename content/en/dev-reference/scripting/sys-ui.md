---
title: "sys.ui"
description: "Describes utilities to interact with the UI."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 72
---

It is possible to interact with the UI by sending messages from server-side scripts. These messages can instruct the UI to perform various actions, such as navigating to a view, reloading the UI, displaying a message, or triggering an action.

When working with UI messages, there are several important considerations:

1. **`Script Association`**: While you can call this method from any script, it is recommended to use it primarily in scripts associated with views, such as event scripts in views. This ensures clarity regarding when these scripts will be executed.

2. **`Non-View Scripts`**: If you call this method from a script that is not associated with a view (e.g., an action script), the message may not be sent to the UI and could be lost. This can occur when the action is executed in the background or as part of a non-UI-related process, such as an external REST API call.

3. **`Message Order`**: You can send multiple messages to the UI, and they will be executed in order. However, it is essential to understand that some messages might override or discard others. For instance, if you reload the page, any message after that command will be lost.

4. **`Message Timing`**: Messages may not be sent to the UI immediately. The timing of UI messages is implementation-specific and depends on the available features in the UI. UI messages might be executed only after the associated request has been completed.

All messages have at least two fields:

- **`scope`**: Indicates the message's scope and which elements in the UI should process it. Currently, there are four scopes: global, view, plugin, and action.

- **`name`**: A unique name for the message within each scope.

- **`target`**: Specifies the message's recipient. Possible values include:
  - **`caller`**: The user who initiated the UI request.
  - **`users`**: Sends the message to all users defined in **`targetUsers`** across all their tabs.
  - **`allUsers`**: Broadcasts the message to all users.
  - The default value is **`caller`**.

- **`targetUsers`**: A list of recipients when **`target`** is defined as **`users`**. It is an array of emails or IDs. The default value is the current user.

- **`views`**: A list of view names. This is only required for messages in the **`view`** scope.

- **`recordId`**: A list of view names. This is only required for messages in the **`view`** scope.

---

## **sys.ui.sendMessage(message)**

##### Parameters

Name|Type|Required|Description
---|---|---|---
message|object|yes|This is the message to send to the UI. You must indicate the **`scope`** and **`name`**. Other fields depends on the message.

##### Exceptions

**badRequest**

If the message is does not exist or there are validation errors.

---

## **Global message names**

### reload

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
goToDefaultView|boolean|no|false|If **`true`** when the app is reloaded, the user will be taken to the default view (the view displayed when the app is loaded after login). Otherwise current page will be reloaded.

##### Samples

``` javascript
// reload current page
sys.ui.sendMessage({
  scope: 'global',
  name: 'reload',
  target: 'caller'
});
```
<br>

``` javascript
// reload and go to default view
sys.ui.sendMessage({
  scope: 'global',
  name: 'reload',
  goToDefaultView: true,
  target: 'caller'
});
```
<br>

### navigate

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
view|string|yes|-|ID or name of the view to navigate to.
recordId|string|no|-|ID of the record. When this field is set the app navigates to the detail read-only view of the record.
viewType|string|no|readOnly|In case of grid or workflow views define the view type to redirect. Possible values **`edit`** or **`create`**.
filters|object|no|-|In case of grid or workflow views define some view filters to be applied. This filter example apply 2 filters for the view:<br><br><pre><code>{&#13;name: 'ACME',&#13;address.state:'new'&#13;}</code></pre>
parameters|object|no|-|In case of custom views you can define some view parameters to be applied. Those parameters are transformed into URL query parameters. For example, the following parameters<br><br><pre><code>{&#13;name: 'ACME',&#13;status:'new'&#13;}</code></pre><br>Are going to be transformed to the following URL query parameters:<br>`?name=ACME&status=New`

### goToLogin

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
pathAfterLogin|string|no|-|If you add this parameter after logging in, it will redirect to the indicated path.

##### Samples

``` javascript
// Go to login
sys.ui.sendMessage({
  scope: 'global',
  name: 'goToLogin'
});
```
<br>

### openExternalLink

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
url|string|yes|-|External URL to open
newTab|boolean|no|true|If **`true`** external URL is opened in a new tab of the browser. Otherwise the URL will be opened in same tab.

### historyBack

##### Scope

**`global`**

##### Parameters

No parameters required

### showMessage

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
title|string|yes|-|The title to be shown on message.
message|string|yes|-|The message content to be shown. It supports some basic HTML tags.
type|string|no|info|Defines the style for the message. Possible values are **`info`**, **`success`**, **`warning`** or **`error`**.
keepVisible|boolean|no|false|If true the message won’t be closed automatically and the user has to close it manually.

##### Samples

``` javascript
// send a custom message
sys.ui.sendMessage({
  scope: 'global',
  name: 'showMessage',
  target: 'users',
  targetUsers: ['id1', 'id2', 'user@test.com'],
  title: 'Heads up!',
  message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  type: 'warning',
  keepVisible: true
});
```
<br>

``` javascript
// send a notification
sys.ui.sendMessage({
  scope: 'global',
  name: 'showMessage',
  target: 'allUsers',
  title: 'title message',
  message: 'body message here...'
});
```
<br>

### downloadFile

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
fileId|string|yes|-|The ID of the file to download.

##### Samples

``` javascript
// start downloading a file
sys.ui.sendMessage({
  scope: 'global',
  name: 'downloadFile',
  target: 'caller',
  fileId: record.field('file').id()
});
```
<br>

### addBackgroundJob

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
jobId|string|yes|-|The ID of the background job in charge of executing.

### startTask

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
taskId|string|yes|-|The ID of the task to be displayed on tasks menu in the top-right.
taskTitle|string|yes|-|The message to be displayed on tasks menu in the top-right.
taskMessage|string|no|-|The compliment message to be sent as subtitle on tasks menu in the top-right.

### updateTask

##### Scope

**`global`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
taskId|string|yes|-|The ID of the task to be displayed on tasks menu in the top-right.
taskTitle|string|no|-|The message to be displayed on tasks menu in the top-right.
taskMessage|string|no|-|The compliment message to be sent as subtitle on tasks menu in the top-right.
taskStatus|string|no|-|The status of the tasks. Can be updated to running, success or error. At the beginning the status is running.

---

## **View message names**

### recordChanged

##### Scope

**`view`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
recordId|string|no|-|The ID of the record that has been changed.
views|object|yes|-|The list of view names that will be notified by the event. The view types that can process this event are: **`grid`**, **`card`**, **`calendar`** and **`read only`** views.

##### Samples

``` javascript
// Notify to all users that are currently on views `contacts` and `contactsReadOnly` that the record `57fd2d65e4b0ce322b0c8665` has been updated
sys.ui.sendMessage({
  scope: 'view',
  name: 'recordChanged',
  target: 'allUsers',
  views: ['contacts','contactsReadOnly'],
  recordId: '57fd2d65e4b0ce322b0c8665'
});
```
<br>

### recordCreated

##### Scope

**`view`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
recordId|string|no|-|The ID of the record that has been changed.
views|object|yes|-|The list of view names that will be notified by the event. The view types that can process this event are: **`grid`**, **`card`**, **`calendar`** and **`read only`** views.

##### Samples

``` javascript
// Notify to some users that are currently on view `tasksCards` that a record has been created
var record = sys.data.createRecord('tasks');// create an empty record of entity task
record.field('status').val('NEW');// filling the new necord with the corresponding field values...
record.field('description').val('Example created on script');
record.field('title').val('New task created from script');
record.field('area').val({id:"5506fc3cc2eee3b1a7025bff"});
record.field('project').val({id: "5506fc44c2eee3b1a7026959", label: "Point-to-point link"});
record = sys.data.save(record);// saving the created record
sys.ui.sendMessage({
  scope: 'view',
  views: ['tasksCards'],
  target: 'users',
  targetUsers: ['id1', 'id2', 'user@test.com'],
  name: 'recordCreated',
  recordId: record.id()
});
```
<br>

### recordDeleted

##### Scope

**`view`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
recordId|string|no|-|The ID of the record that has been changed.
views|object|yes|-|The list of view names that will be notified by the event. The view types that can process this event are: **`grid`**, **`card`**, **`calendar`** and **`read only`** views.

##### Samples

``` javascript
// Notify to all users that are currently on view `contacts` that the record `57fd2d65e4b0ce322b0c8665` has been deleted
sys.ui.sendMessage({
  scope: 'view',
  name: 'recordDeleted',
  target: 'allUsers',
  views: ['contacts'],
  recordId: '57fd2d65e4b0ce322b0c8665'
});
```
<br>

### refresh

##### Scope

**`view`**

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
views|object|yes|-|The list of view names that will be notified by the event. The view types that can process this event are: **`grid`**, **`card`**, **`calendar`** and **`read only`** views.
widgetContainers|onject|no|-|In case to dashbaord view you can send the array a list to containers to be refresh. This can be an array of string or can be specify an object with container name and query parameters. Check widgets documentation for more information.

##### Samples

``` javascript
// Refresh view `contacts` to all users that are currently on that view
sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  target: 'allUsers',
  views: ['contacts']
});
```
<br>

---

## **Ui service message names**

### anyEvent

##### Scope

**`uiService:uiServiceName`**

##### Parameters

No parmeters required

##### Samples

``` javascript
// dispatch `event1` in `sample` ui service
sys.ui.sendMessage({
  scope: 'uiService:sample',
  name: 'event1',
  companyId: record.id(),
  callbacks: {
    callback1: function(originalMessage, callbackData) {
      sys.logs.debug("Here is the original message for callback 1");
      sys.logs.debug(JSON.stringify(originalMessage));
      sys.logs.debug("Here is the callback data for callback 1");
      sys.logs.debug(JSON.stringify(callbackData));
    },
    callback2: function(originalMessage, callbackData) {
      //do something
    }
  }
});
```
<br>

---

## **Action message names**

### anyEvent

##### Scope

**`action`**

##### Parameters

Name|Type|Required|Description
---|---|---|---
entity|string|yes|ID or name of the entity the action belongs too.
recordId|string|no|The ID of the record the action will be executed over. This is optional in case it is a global action.
recordsIds|object|no|The IDs array of the record the action will be executed over. This is optional in case it is a global action.
actionView|string|no|Name or ID of the action view.
action|string|no|If actionView is not provided, you can send only action with the name or ID of the action and the default view will be used.
defaultParams|object|no|If the action has parameters, you can send the default value that will be used for those parameters.
success|function|no|Callback when the action is executed successfully.
error|function|no|Callback when there is an error executing the action.
canceled|function|no|Callback when the action execution is canceled.

##### Samples

``` javascript
// Send UI message in order to trigger an action from server side so the user can enter the parameters and execute it.
sys.ui.sendMessage({
  scope: 'action',
  entity: 'myCompany',
  target: 'allUsers',
  recordIds: ['5be99071b10c3e09893300d2', '5be99082b10c3e09893300e2'],
  action: 'setCompanyType',
  defaultParams: {
      isPresent: true,
      message: "Hi from Holly Rollers",
      nameOfParamNumeric: 14
  },
  success: function() {
    sys.logs.debug("> Success!");
  },
  error: function() {
    sys.logs.debug("> ERROR");
  },
  canceled: function() {
    sys.logs.debug("> Canceled...");
  }
});
```
<br>

---
