---
title: "Custom views"
lead: "Explanation of custom views. Settings and API available for custom views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Custom views allow to put a completely custom HTML page in your app. This is useful when
you need to do something that isn't supported for built-in view types.

These custom views will be displayed as an iframe in the main content area of your app. This
means you are free to include any CSS and libraries you want without having to worry about
conflicts with the app.

Custom views provides a Javascript API to make it easy to interact with the app to fetch
information, perform operations and redirect to other views.

Keep in mind that in order to use the Javascript API it's necessary to include jQuery on
the view. This can be done by adding the following line on html header block:

```
<html>
<head>
...
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
...
</head>
...
```

In case you haven't included jQuery you will see the following console warning on
your browser: `UI API won't be available because jQuery is not loaded`

[You can find different versions of jQuery here](https://code.jquery.com/jquery/).

## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the grid view, so make sure you use something
users will understand.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

### Available REST API variables

The following variables are available in your custom view's scripts and are needed to 
access the REST API of your app: 

- `sys.ws.TOKEN`: token needed to make calls to the REST API. It has to be sent in the `token`
  header.
- `sys.ws.API_URL`: this is the URL to access the REST API of the app. Something like 
  `https://<app>.slingrs.io/<env>/runtime/api`.

Keep in mind that it might take a few milliseconds for these variables to be set, so if your 
Javascript executes right after the view is loaded, these variables might be `null`.

In most cases you won't need to use this variables directly as you probably use the utils
provided for the REST API.

### REST API utils

{{< js_api context="ws" format="small" >}}

{{< js_api context="client_ui" format="small" >}}

### Context API
Through these utilities you are able to access to the parameters sent by the service:

```
sys.ui.sendMessage({
    name: 'navigate',
    view: 'customViewId',
    parameters: {
        ...
    }
})
```

In the custom view code you can access to parameters by using the following utilities: 

- `sys.context.PARAMS`: parameters key-value object map available in the custom view context.
- `sys.context.getParam(paramName)`: this method is an utility to access to one specific parameter value.

## Files

These are the files that compose the custom view. They are basically HTML, CSS and Javascript 
files.

However there is one special file that is created automatically: `mainFile.html``. This is
an HTML page and it is the main file that will be loaded when a user opens the custom view.
It can not be removed or renamed and you are free to use any HTML tag, CSS or Javascript code 
you need in your view, or include other files as explained below.

This page will be displayed inside an `iframe` in the main content area of your application. This
way there is no risk of conflicts with the rest of the app.

Besides the main file, you can also create more files to split the custom view in several pieces
in order to keep things clean. They can be Javascript, CSS, or HTML files. Then it is possible to 
merge them in the main file of the custom view. For example let's suppose you have the following files:

- `styles.css`
- `utils.js`
- `templates.html`

You can merge them in the main file like this:

```
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

CSS files will be inserted inside a `<style>`, while Javascript files will be wrapped with the
`<script>` tag. This means you shouldn't put those tags in the files. HTML fields are inserted 
exactly as they are in the file.

## Permissions

Permissions allow to define which groups can access this view.
  
Permissions for a view can be handled right in the view definition, but it is just
a different view of what you can configure in groups. It is oriented so you can easily
configure permissions on the view for all existing groups.

For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).


### Used as a CRUD Action 

#### As a ReadOnly type view

 You can select a custom view as a readOnly CRUD action view in a `Grid View`. If you select it, a context with some information will be passed as json through a `message event`. This event can be listened to by adding an event listener in the main file of the custom view. This way you are going to have the information set to be displayed in the custom view. Additionally, `Refresh` action button will also trigger a message event to inform the custom view about the refresh pressed. This way, the custom view could listen to this event and perform an action. This refresh event will also be trigger after executing other custom actions.

**Sample of a listener in the custom view**

```
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

#### As a Create type view

You can select a custom view as a create CRUD action view in a `Grid View`. if you select a Custom View, a context with some information will be passed as json through a message event. This event can be listened to by adding an event listener in the main file of the custom view. This way you are going to have the information set to be displayed in the custom view. Additionally Create action button will also trigger a message event to inform the custom view about the create button pressed. This way, the custom view could listen to this event and perform an action. This add event will also be trigger after executing other custom actions.

**Sample of a listener set in a custom view in order to obtain some context information**

```
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

Once you listen to the `add` event. We should implement some functionality. Custom views have an util method to create new records and then inform back to the platform. There is more information about it in the `Custom View` section.

**Sample of an implementation of a createRecord() method**

```
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

#### As an Edit type view

You can select a custom view as a create CRUD action view in a `Grid View`. If you select a `Custom View`, a context with some information will be passed as json through a `message event`. This event can be listened to by adding an event listener in the main file of the custom view. This way you are going to have the information set to be displayed in the custom view. Additionally `Save` action button will also trigger a message event to inform the custom view about the save button pressed. This way, the custom view could listen to this event and perform an action. This `edit` event will also be trigger after executing other custom actions.

**Sample of a listener set in a custom view in order to obtain some context information**

```
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

Once you listen to the `edit` event. We should implement some functionality. Custom views have an util method to update records and then inform back to the platform. There is more information about it in the `Custom View` section.

**Sample of an implementation of a updateRecord() method**

```
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