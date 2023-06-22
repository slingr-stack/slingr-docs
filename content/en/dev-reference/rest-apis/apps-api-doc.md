---
title: "Apps REST API documentation"
lead: "Explain how to auto-generate the documentation for the REST API of the app."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 142
---


Although developers could go an read the general [REST API documentation]({{site.baseurl}}/app-development-apps-rest-api.html), 
they still need to know entity names, fields, actions, permissions, etc., in order to make use of it. 
That information is defined in the app builder, but external developer that need to interact with your 
app do not have access to it.

For this reason Slingr provides a way to auto-generate documentation for the REST API of an app,
providing information about the entities, fields, actions, etc., which is needed to interact with
the API.

## Understanding REST APIs

In the app builder, under the section `Model > REST API`, you will see the list of APIs for your app.
This might sound a bit confusing, because your app has only one API based on your model, but depending on
the user accessing the API some features might not be available. For example you don't have any permissions
for one specific field. This section allows you to define which are the permissions for the different 
types of API users you expect to have.

There is going to be always one API called `Full API`. This one cannot be deleted and it is the API
for a developer user, or someone who has permissions for everything. Then it is possible to define other
APIs indicating the groups that the API users will belong to. These groups will be used to determine
the permissions the users will have.

When you configure a REST API, when you push changes you will be able to see the documentation of the
API at this URL:

```
https://{{site.slingr_domain}}/<env>/runtime/api/docs/<api-name>
```

Keep in mind that these REST APIs you define here are useful to auto-generate the documentation only.
Any user who does not belong to any of the groups used in the REST API can still use the API, but
there won't be any documentation.

## REST API settings

When you create a new REST API you will need to provide the following settings:
 
### Label

This is a human-readable name for the REST API. 

### Name

This is the internal name of the REST API and it will be used in the URL of the API documentation.

The name cannot contain special characters or spaces. Only letters and numbers.

### Groups

This is a list of groups that define the permissions for this REST API. Only things that are accessible
to these groups will be documented.