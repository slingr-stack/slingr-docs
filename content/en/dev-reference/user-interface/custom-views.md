---
title: "Custom views"
description: "Explanation of custom views. Settings and API available for custom views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 51
---

Custom views enable you to embed a completely customized HTML page within your app. This proves invaluable when you encounter requirements that aren't supported by the built-in view types.

These custom views will be displayed as iframes within the main content area of your app. This grants you the freedom to integrate any CSS and libraries you require, without needing to be concerned about conflicts with the app's components.

Custom views provide a Javascript API, simplifying interaction with the app. This API facilitates tasks such as fetching information, executing operations, and redirecting to other views.

Please note that to use the Javascript API, it's essential to include jQuery within the view. Achieve this by adding the following line to the HTML header block:

``` html
<html>
<head>
...
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
...
</head>
...
```
<br>

If you haven't included jQuery, you will encounter the following console warning in your browser: **`UI API won't be available because jQuery is not loaded`**.

[You can find different versions of jQuery here](https://code.jquery.com/jquery/).

## **Label**

This represents a human-readable name for the view. You can utilize spaces, special characters, and a combination of upper and lower case letters.

This label will be displayed at the top of the grid view, so make sure you choose a label that users can easily understand.

## **Name**

This serves as the internal name of the view. It should not contain special characters or spaces.

Commonly, you will employ the view's name in scripts and the REST API. Changing it could potentially impact your app, requiring manual adjustments.

## **Available REST API variables**

The following variables are accessible in your custom view's scripts and are necessary for accessing your app's REST API:

- **`sys.ws.TOKEN`**: Token required for making calls to the REST API. It needs to be included in the **`token`** header.
- **`sys.ws.API_URL`**: This is the URL used to access your app's REST API. It's typically something like **`https://<app>.slingrs.io/<env>/runtime/api`**.

Keep in mind that there might be a slight delay in setting these variables. If your JavaScript executes immediately after the view loads, these variables might initially be **`null`**.

In most scenarios, direct use of these variables won't be necessary, as you'll likely employ the provided utilities for interacting with the REST API.

## **REST API utils**

These utilities are designed to facilitate seamless access to your app's REST API from scripts within the custom view. For additional information regarding the app's REST API, refer to [this resource]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}).

### get(params)

#####  `get(urlOrParameters, done, error)`**

This function carries out a **`GET`** operation on the provided URL or parameters. It automatically handles the necessary headers and conversions.

##### Parameters

| Name   | Type                | Required |  Description |
|--------|---------------------|----------|--------------|
| urlParameters | string or object | yes | This can be either a simple string containing the URL, e.g., **`/data/companies`**, or an object with parameters: <br><br><pre><code>{&#13;url: '/data/companies',&#13;params: {state: 'active', _size: 100}&#13;}</code></pre><br> It's important to note that the URL represents the path after **`/api`**. The base of the URL and headers are calculated automatically, so there's no need to worry about them. Parameters are encoded automatically.
| done | function | yes | A callback function that is invoked if the request is successful. It will receive a parameter containing the result of the call. Although the REST API returns a JSON string, this method automatically converts it into a JavaScript object. Please refer to the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to understand the response.
| error | function | no | A callback function that is triggered if the request fails. An object containing the error code and error message will be provided as a parameter. Please consult the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to comprehend the response.

##### Samples

``` javascript
// logs the label of the app
sys.ws.get('/data/companies', function(res) {
    console.log('Total companies: ' + res.total);
    res.items.forEach(function(company) {
        console.log('Company: ' + company.name);
    });
}, function(errorInfo) {
    console.log('There was an error getting companies. Code: ' + errorInfo.code + ', message: ' + errorInfo.message);
});
```
<br>

### post(params)

#####  `post(urlOrParameters, data, done, error)`**

This function initiates a **`POST`** operation to the provided URL. It handles the necessary headers and conversions as required.

##### Parameters

| Name   | Type                | Required |  Description |
|--------|---------------------|----------|--------------|
| urlParameters | string or object | yes | This can be either a simple string containing the URL, e.g., **`/data/companies`**, or an object with parameters: <br><br><pre><code>{&#13;url: '/data/companies'&#13;}</code></pre><br> It's important to note that the URL represents the path after **`/api`**. The base of the URL and headers are calculated automatically, so there's no need to worry about them. Parameters are encoded automatically.
| data | object | no | This refers to the content of the request's body. You can provide a JavaScript object as input, and it will be automatically converted to JSON format.
| done | function | yes | A callback function that is invoked if the request is successful. It will receive a parameter containing the result of the call. Although the REST API returns a JSON string, this method automatically converts it into a JavaScript object. Please refer to the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to understand the response.
| error | function | no | A callback function that is triggered if the request fails. An object containing the error code and error message will be provided as a parameter. Please consult the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to comprehend the response.

##### Samples

``` javascript
// logs the label of the app
var company = {
    name: 'test company',
    state: 'active'
};
sys.ws.post('/data/companies', company, function(company) {
    console.log('Company created successfully: ' + JSON.stringify(company));
}, function(errorInfo) {
    console.log('Error creating company. Code: ' + errorInfo.code + ', message: ' + errorInfo.message);
});
```
<br>

### put(params)

#####  `put(urlOrParameters, data, done, error)`**

This function initiates a **`PUT`** operation on the specified URL. It manages the necessary headers and conversions as required.

##### Parameters

| Name   | Type                | Required |  Description |
|--------|---------------------|----------|--------------|
| urlParameters | string or object | yes | This can be either a simple string containing the URL, e.g., **`/data/companies`**, or an object with parameters: <br><br><pre><code>{&#13;url:'/data/companies/56e81f68e4b0001caf8837a4'&#13;}</code></pre><br> It's important to note that the URL represents the path after **`/api`**. The base of the URL and headers are calculated automatically, so there's no need to worry about them. Parameters are encoded automatically.
| data | object | no | This refers to the content of the request's body. You can provide a JavaScript object as input, and it will be automatically converted to JSON format.
| done | function | yes | A callback function that is invoked if the request is successful. It will receive a parameter containing the result of the call. Although the REST API returns a JSON string, this method automatically converts it into a JavaScript object. Please refer to the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to understand the response.
| error | function | no | A callback function that is triggered if the request fails. An object containing the error code and error message will be provided as a parameter. Please consult the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to comprehend the response.

##### Samples

``` javascript
// logs the label of the app
sys.ws.put('/data/companies/' + company.id, {name: 'new name'}, function(company) {
    console.log('Company updated successfully: ' + JSON.stringify(company));
}, function(errorInfo) {
    console.log('Error updating company. Code: ' + errorInfo.code + ', message: ' + errorInfo.message);
});
```
<br>

### delete(params)

#####  `delete(urlOrParameters, done, error)`**

Performs a **`DELETE`** operation to the given URL, sending the correct headers and doing the needed conversions.

##### Parameters

| Name   | Type                | Required |  Description |
|--------|---------------------|----------|--------------|
| urlParameters | string or object | yes | This can be either a simple string containing the URL, e.g., **`/data/companies`**, or an object with parameters: <br><br><pre><code>{&#13;url: '/data/companies/56e81f68e4b0001caf8837a4',&#13;params: {async: true}&#13;}</code></pre><br> It's important to note that the URL represents the path after **`/api`**. The base of the URL and headers are calculated automatically, so there's no need to worry about them. Parameters are encoded automatically.
| done | function | yes | A callback function that is invoked if the request is successful. It will receive a parameter containing the result of the call. Although the REST API returns a JSON string, this method automatically converts it into a JavaScript object. Please refer to the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to understand the response.
| error | function | no | A callback function that is triggered if the request fails. An object containing the error code and error message will be provided as a parameter. Please consult the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to comprehend the response.

##### Samples

``` javascript
// logs the label of the app
sys.ws.del('/data/companies/' + company.id, function(company) {
    console.log('Company deleted successfully: ' + JSON.stringify(company));
}, function(errorInfo) {
    console.log('Error delting company. Code: ' + errorInfo.code + ', message: ' + errorInfo.message);
});
```
<br>


### createRecord(params)

#####  `createRecord(entityName, data, done, error)`**

This function utilizes the previously described **`POST`** method to create a new record for a specified entity. Once the record is created, it reports back to the platform.

##### Parameters

| Name   | Type                | Required |  Description |
|--------|---------------------|----------|--------------|
| entityName | string | yes | This indicates the name of the entity in which the new record will be created. You can obtain this information from the context sent to the custom view after it has been fully rendered.
| data | object | no | This refers to the content of the request's body. You can provide a JavaScript object as input, and it will be automatically converted to JSON format.
| done | function | yes | A callback function that is invoked if the request is successful. It will receive a parameter containing the result of the call. Although the REST API returns a JSON string, this method automatically converts it into a JavaScript object. Please refer to the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to understand the response.
| error | function | no | A callback function that is triggered if the request fails. An object containing the error code and error message will be provided as a parameter. Please consult the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to comprehend the response.

##### Samples

``` javascript
// creates a new record in an entity Contacts
var newRecord = {
    company: 'test company name',
    firstName: 'test first name',
    lastName: 'test last name',
    email: 'test email',
}
sys.ui.createRecord("contacts", newRecord, function (contact) {
     console.log('Contact created successfully: ' + JSON.stringify(contact));
}, function (errorInfo) {
    console.log('Error creating contact. Code: ' + errorInfo.code + ', message: ' + errorInfo.message);
})
```
<br>


### updateRecord(params)

#####  `updateRecord(entityName, data, done, error)`**

This function employs the previously described **`PUT`** method to update a specific record within a designated entity. After the update is performed, it reports back to the platform.

##### Parameters

| Name   | Type                | Required |  Description |
|--------|---------------------|----------|--------------|
| entityName | string | yes | This indicates the name of the entity in which the new record will be created. You can obtain this information from the context sent to the custom view after it has been fully rendered.
| recordId| string | yes | This refers to the ID of the record that will undergo an update. You can obtain this ID from the context sent to the custom view after it has been fully rendered.
| data | object | no | This refers to the content of the request's body. You can provide a JavaScript object as input, and it will be automatically converted to JSON format.
| done | function | yes | A callback function that is invoked if the request is successful. It will receive a parameter containing the result of the call. Although the REST API returns a JSON string, this method automatically converts it into a JavaScript object. Please refer to the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to understand the response.
| error | function | no | A callback function that is triggered if the request fails. An object containing the error code and error message will be provided as a parameter. Please consult the [REST API documentation]({{<ref "/dev-reference/rest-apis/apps-api-doc.md">}}) to comprehend the response.

##### Samples

``` javascript
// updates a record of the entity Contacts
var newValues = {
    company: 'test company name',
    firstName: 'test first name',
    lastName: 'test last name',
    email: 'test email',
}
sys.ui.updateRecord("contacts", "5dbb1d5836e3bd27bd640ff3" ,newValues, function (contact) {
     console.log('Contact updated successfully: ' + JSON.stringify(contact));
}, function (errorInfo) {
    console.log('Error updating contact. Code: ' + errorInfo.code + ', message: ' + errorInfo.message);
})
```
<br>


### goToView(params)

#####  `goToView(viewIdOrName, params)`**

Allows to navigate to an app specific view.

##### Parameters

| Name   | Type                | Required |  Description |
|--------|---------------------|----------|--------------|
| viewIdOrName | string  | yes | The view ID or name to navigate to.
| params | object | no | Certain views may accept supplementary parameters. For instance, grid and workflow views may include a **`recordId`** parameter to navigate to the read-only view of a specific record.

##### Samples

``` javascript
// goes to a grid view
sys.ui.goToView('companies');
```
<br>

``` javascript
// goes to the read only view of a record in a grid view
sys.ui.goToView('companies', {recordId: '5506fc43c2eee3b1a7026948'});
```
<br>

### executeAction(params)

#####  `executeAction(entityNameOrId, actionNameOrId, recordIds, successCallback, errorCallback, canceledCallback)`**

Allows to execute a certain action from a custom view

##### Parameters

| Name             | Type     | Required |  Description |
|------------------|----------|----------|--------------|
| entityNameOrId   | string   | yes      | The name or ID of the entity.
| actionNameOrId   | string   | yes      | The name or ID of the action to execute.
| recordIds        | object[] | no       | These are the IDs of the records on which the action will be executed. It can be a single string containing an ID or an array of strings representing multiple IDs.
| successCallback  | function | yes      | This script runs after the action has been successfully executed. It receives the result of the action as a parameter.
| errorCallback    | function | yes      | It runs when the action fails.
| canceledCallback | function | yes      | It runs when the action is canceled.
| defaultParams    | object   | no       | If the action have parameters, you can send the default value that will be used for those parameters.

##### Samples

``` javascript
// execute an action for employees
sys.ui.executeAction('employees', 'timeTrack', "xxxxx",
    function(result) {
       console.info("> success", result);
    },
    function(result) {
       console.info("> error", result);
    },
    function(result) {
       console.info("> canceled", result);
    },
    {
      nameOfParam: "default value"
    });

```
<br>

``` javascript
// execute a global action
sys.ui.executeAction('sampleEntity', 'globalAction', null,
  function(result) {
     console.info("> success", result);
  },
  function(result) {
     console.info("> error", result);
  },
  function(result) {
     console.info("> canceled", result);
  },
  {
    nameOfParam: "default value"
  });
```
<br>

## **Context API**

Using these utilities, you gain access to the parameters sent by the service:

```
sys.ui.sendMessage({
    name: 'navigate',
    view: 'customViewId',
    parameters: {
        ...
    }
})
```
<br>
Within the custom view code, you have access to parameters through the following utilities:

- **`sys.context.PARAMS`**: This represents a key-value object map of parameters available in the custom view context.
- **`sys.context.getParam(paramName)`**: This utility method allows you to retrieve the value of a specific parameter.

## **Files**

These files collectively constitute the custom view. They encompass HTML, CSS, and JavaScript files.

However, there is a particular file that is automatically generated: **`mainFile.html`**. This file is an HTML page and serves as the central point that loads when a user accesses the custom view. It cannot be deleted or renamed. You have the freedom to integrate any necessary HTML tags, CSS, or JavaScript code into this page, as well as include other files, as elaborated below.

The content of this page is displayed within an **`iframe`** within the main content area of your application. This design ensures that there are no conflicts with the remainder of the application.

Apart from the main file, you have the option to craft additional files to segment the custom view into more manageable sections, thus maintaining organization. These files can be JavaScript, CSS, or HTML files. Subsequently, you can integrate these files into the main custom view file. For instance, assume you possess the following files:

- **`styles.css`**
- **`utils.js`**
- **`templates.html`**

You can amalgamate them within the main file in this manner:

``` html
<html>
<head>
...
${styles.css}
${utils.js}
</head>
<body>
...
${templates.html}
</body>
</html>
```
<br>

CSS files will be encapsulated within a **`<style>`** tag, while JavaScript files will be enclosed within the **`<script>`** tag. Consequently, there's no need to include these tags within the files themselves. HTML contents are inserted exactly as they appear in the file.

### Slingr files

You can include the css and js files that are used in the Slingr applications in order to have the custom view better integrated to the app. They can be injected as follows:


``` html
<html>
<head>
...
${appStyles}
${appScripts}
</head>
<body>
...
</body>
</html>
```
<br>

## **Permissions**

Permissions allow you to specify which groups have access to a particular view.

While permissions for a view can be managed directly within the view definition, it's essentially another approach to configuring permissions at the group level. This approach simplifies the process of setting permissions on the view for all existing groups.

For more comprehensive details on permissions, please consult the [Groups documentation]({{<ref "/dev-reference/security/groups.md">}}).

### In a ReadOnly View

You have the option to designate a custom view as a readOnly CRUD action view within a **`Grid View`**. If chosen, a context containing pertinent information will be conveyed as JSON through a **`message event`**. This event can be monitored by adding an event listener within the main file of the custom view. Consequently, the custom view can access the provided information for display. Additionally, selecting the **`Refresh`** action button will trigger a message event to notify the custom view about the refresh action. This empowers the custom view to react to the event and execute necessary actions. This refresh event will also be triggered after executing other custom actions.

**Sample of a listener in the custom view**

``` javascript
// Logs the context and the event type
window.addEventListener('message', function (event) {
  if(event.data.eventType){
    var eventType = event.data.eventType;
    sys.logs.info("EVENT: " + JSON.stringify(eventType));
  }else if(event.data.context){
    var context = event.data.context;
    sys.logs.info("CONTEXT: " + JSON.stringify(context));
  }
});
```
<br>

### As a create type view

You can designate a custom view as a create CRUD action view within a **`Grid View`**. If you choose a Custom View for this purpose, a context containing relevant information will be conveyed as JSON through a message event. You can monitor and respond to this event by adding an event listener in the main file of the custom view. Consequently, the custom view can access the provided information for display. Furthermore, selecting the **`Create`** action button will also trigger a message event to notify the custom view about the button press. This enables the custom view to react to the event and carry out necessary actions. This add event will also be triggered after executing other custom actions.

**Sample of a listener set in a custom view in order to obtain some context information**

```javascript
window.addEventListener('message', function (event) {
//We wait for a message from the platform to let us know the Create Button has been pressed
  if (event.data.eventType) {
    if (event.data.eventType === 'add') {
//This is a method we should implement to save the new data and then comunicate it back to the platform
        self.createRecord();
    }
// Logs the context. This happened once the custom view is fully rendered
  }else if(event.data.context){
    var context = event.data.context;
    var entity = event.data.context.entity;
    sys.logs.info("CONTEXT: " + JSON.stringify(context));
  }
});
```
<br>

Once you're listening to the **`add`** event, it's time to implement the required functionality. Custom views provide a utility method for creating new records and subsequently notifying the platform. For further details, refer to the **`Custom View`** section.

**Sample of an implementation of a createRecord() method**

```javascript
self.createRecord = function () {
  console.log('creating new record from REST API');
  //Custom view method to create a record and inform back to the platform
  sys.ui.createRecord(entity.name, newRecord, function (recordCreated) {
      console.log("ON SUCCESS RECORD: " + JSON.stringify(recordCreated));
  }, function (error) {
      console.log("ON ERROR :" + JSON.stringify(error));
  })
};
```
<br>

### As an Edit type view

You have the option to designate a custom view as an edit CRUD action view within a **`Grid View`**. If you choose a **`Custom View`** for this purpose, a context containing pertinent information will be conveyed as JSON through a **`message event`**. You can listen to and handle this event by adding an event listener within the main file of the custom view. Consequently, the custom view can access the provided information for display. Furthermore, selecting the **`Save`** action button will also trigger a message event to notify the custom view about the button press. This enables the custom view to respond to the event and execute necessary actions. This **`edit`** event will also be triggered after executing other custom actions.

**Sample of a listener set in a custom view in order to obtain some context information**

```javascript
window.addEventListener('message', function (event) {
//We wait for a message from the platform to let us know the Save Button has been pressed
  if (event.data.eventType) {
    if (event.data.eventType === 'edit') {
//This is a method we should implement to save the new data and then comunicate it back to the platform
        self.updateRecord();
    }
// Logs the context. This happened once the custom view is fully rendered
  }else if(event.data.context){
    var context = event.data.context;
    var entity = event.data.context.entity;
    var contextRecord = event.data.context.record;
    sys.logs.info("CONTEXT: " + JSON.stringify(context));
  }
});
```
<br>

Once you're listening to the **`edit`** event, it's time to implement the required functionality. Custom views offer a utility method for updating records and subsequently notifying the platform. For further details, refer to the **`Custom View`** section.

**Sample of an implementation of a updateRecord() method**

``` javascript
self.createRecord = function () {
  console.log('creating new record from REST API');
//Custom view method to create a record and inform back to the platform
  sys.ui.createRecord(entity.name, newRecord, function (recordCreated) {
      console.log("ON SUCCESS RECORD: " + JSON.stringify(recordCreated));
  }, function (error) {
      console.log("ON ERROR :" + JSON.stringify(error));
  })
};
```
<br>

## **JS API**

### **Resize container**

To ensure that the **`custom view`** container doesn't exceed the size of the containing view and display incorrectly, you can adjust its size accordingly. This can be achieved by utilizing the **`sys.ui.resizeContainer`** method as outlined below.

Firstly, you need to assign an ID to the **`<div>`** element that encompasses all the HTML code. This ID will be used to determine the height of the custom view container. Here's an example:

``` html
<body>
    <div id="allContent" class="container-fluid">
```
<br>

Finally, the subsequent code should be added to the JavaScript file of the custom view. This code snippet is responsible for extracting the content of the HTML code to determine the appropriate height and then passing it as a parameter to the **`sys.ui.resizeContainer()`** method.

``` javascript
$(document).ready(function() {
  listenToHeightChanges();
});

const listenToHeightChanges = function() {
  const content = document.getElementById('allContent');
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      sys.ui.resizeContainer(entry.contentRect.height + 'px');
    }
});
  resizeObserver.observe(content);
};
```
<br>

### **Refresh custom view**

**`sys.ui.refreshCustomView()`**: This method instructs the UI to initiate a refresh of the custom view. This functionality becomes valuable when any modification within the custom view impacts the actions that should be accessible in the header.

## **Custom view preview**

From the builder you have the option to see a preview of the custom view, if the custom view is used as a record view, you can see it with real data by sending both **`_collectionViewId`** and **`_recordId`** in the URL as parameters. For example: **`https://test1.slingrs.io/dev/builder/api/customViews/5506fc43c2eee6b1770268f9?_collectionViewId=5506fc3cc2eee3b1a7025c1a&&_recordId=5506fc3cc2eee3b1a5525c19`**

