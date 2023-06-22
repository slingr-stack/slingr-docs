---
title: "Understanding the Slingr Platform"
lead: "Explanation of most important concepts in Slingr and how to use them to create apps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
weight: 1
toc: true
---
As explained in [What's Slingr?](/docs/getting-started/what_is_slingr),
Slingr is a platform to create cloud apps that can easily integrate with other SaaS solutions 
out there or your internal apps as well. To increase developers' productivity Slingr lets
developers focus on solving business problems instead of having to deal with technical issues.

The approach followed by Slingr is that you describe your data model and business rules, and 
that information will be used to execute your application. We call that definition of your app the
**metadata** of the app, which is what you will be able to modify in the app builder.

Next we will explain the most important elements in the app metadata that you need to understand
in order to create apps in Slingr. To understand how metadata is deployed and executed, take
a look at [Pushing and syncing changes](/docs/dev-reference/metadata-management/pushing-and-syncing), where 
it is also explained how to make changes to apps.

## Model

There is always a clear separation between the app model and the user interface. The former indicates
the data structure and the behavior of the app, while the latter how to show that on the screen.

Slingr tries to follow as much as possible a model-driven approach, where the UI will use as much
information as possible from the model. This way the UI will be almost auto-generated, with the
developer only having to define a few additional settings that cannot be derived from the model
or you might want to override.

The model is basically composed by entities, listeners, libraries and endpoints, which are described 
in the following sections.

### Entities

Entities are the most important concept in the app metadata. You can think them as a more powerful
version of tables in database. Here you will define the structure of the data you want to persist
in your app, but there are some features that make entities much more powerful than tables in
traditional databases:

- **Complex data models**: unlike tables in traditional databases, entities allow to define complex
  data structures with multiple nesting levels or multi-valued fields. This will reduce the number
  of entities that you need, making your app more cleaner and easier to understand.
- **Field's settings**: apart from the field name and data types, fields allow to specify a lot of
  settings like when fields are required, when they should be read-only or editable, calculated
  fields, default display options (so you don't need to repeat it over and over in the UI definition),
  permissions, validation rules, etc. This means that while you define the fields in your entities,
  at the same time you will be defining a lot of settings of your app that will be taken into
  account when executing and rendering the app.
- **Rich data types**: each type has its own settings and display options. For example the text type
  has settings like minimum or maximum length and display options to indicate if you want to enter
  values in an input box or a text area. Slingr provides many data types and each of them has many
  settings so you can provide as much information as possible for every field of your entities.
- **Actions**: apart from the default actions to create, read, edit and delete records in an entity,
  you can define custom behavior through actions. For example an entity for tasks in a CRM app could
  have an action called `Reject`. When executed from the UI the user will be asked to enter a reason
  for rejection and then the task will be reopened and assigned back to the person working on it,
  with the reason of rejection stored as a note in the task.
  This way actions will allow to extend entities with custom behavior and create complex workflows
  of execution in your apps.
- **Listeners**: although listeners are more generic and can hook into many kinds of events, there
  are some listeners specific for data events and can be associated to an entity. These listeners
  allow to do something when some events in records happen, like a new record is created, a record
  is deleted, or an action is executed.
- **Permissions**: it is possible to define who can access records on the entity and which operations
  can be performed (create, edit, delete, actions, etc.). It is possible to define fine-grained
  permissions as the field level.

As you can see many of the aspects of your app can be defined in entities. For this reasons here is
where you will probably start when creating a new app, by defining the most important entities.

[You can find more information about entities here](/docs/dev-reference/data-model-and-logic/entities).

### Listeners

Listeners allow to hook into different events of the app. For example you could do something every 
time a new record is created in one specific entity, or react to events coming from endpoint (for 
example, create a new record when a contact is created in Google Contacts).

[You can find more information about listeners here](/docs/dev-reference/data-model-and-logic/listeners).

### Libraries
 
Libraries are pieces of Javascript code that you want to reuse from different places of your app.
For example you could have a function to encode a string in Base64 and you need to use it in many
actions defined in your app. In this case you can put the function to encode a string to Base64
in a library and easily call it from the actions that need it.

[You can find more information about libraries here](/docs/dev-reference/data-model-and-logic/libraries).
 
### Endpoints

Endpoints allow to [extend the capabilities of the platform]({{site.baseurl}}/extensions-overview.html).
Usually endpoints allow to easily integrate with other SaaS solutions like Slack, Google Calendar, 
SparkPost, etc. However endpoints are not limited to integrations, they can also be used for other
purposes. For example let's suppose you have a library in Java to encrypt files and you want to use
it in your app. In this case you could create an endpoint to with that library and use it from your 
app.

You can add many endpoints to your app and each endpoint will add more features to your app. You
can check [existing endpoints]({{site.baseurl}}/extensions-official-endpoints.html) or 
[create one by yourself]({{site.baseurl}}/extensions-create-your-own-endpoints.html)!

[You can find more information about how to use endpoints here](/docs/dev-reference/data-model-and-logic/endpointss).

## Permissions

Permissions allow you to indicate what can be done by users. Slingr allows very fine-grained
definition of permissions:

- **Entities**: create, access, edit, delete, history, etc. You can indicate conditions in 
  permissions as well. For example that a record can be edited only if field `assignee` is the
  current user.
- **Fields**: it is possible to define permissions for each field, which can be none, read-only or
  read/write.
- **Actions**: one every action you can define who can execute it as well as which parameters can
  be passed over to the action.
- **Views**: it is possible to define which views will be accessible.

Permissions are configured in [groups](/docs/dev-reference/security/groups). Then [users](/docs/dev-reference/security/users) can be assigned to one or more groups, 
which will grant permissions based on the configuration of those groups.

Although permissions are defined in groups, to make it easier to configure them it is possible to
edit them from the different elements they control (namely entities, fields, actions and views).

Permissions will be enforced in the UI (for example if a user doesn't have permissions to access 
an entity field, the field won't be displayed) as well as in the REST API.

## Workflows

Together with entities, actions, listeners, endpoints, and permissions it is possible to create 
powerful and complex workflows to meet any requirement.

So even there is not a specific "workflow" concept in the platform, you can combine other elements
to build them, which allows much more flexibility to decide how to organize your app.

## User interface

Even though Slingr will try to get as much information as possible from the app model it is still
possible to configure how the UI is organized and how it should behave, which gives more
flexibility.

The UI of the app is organized in the following way:

- **Header**: this is the at the top and shows the app name and logo (which is configurable).
- **Main menu**:  this is the main menu of the app, where users will find the different sections of
  your app. When they click on one of the items, a view will be displayed on the main content area.
- **Secondary menu**: allows to add items associated to views of the apps that will be rendered in the main content
  area.
- **User menu**: this menu contains some system operations like `My profile` or `Logout`, but
  also allows to add items associated to views of the apps that will be rendered in the main content
  area.
- **Main content**: this is where app views are rendered.

You are able to configure these things in the [User interface](/docs/dev-reference/user-interface/overview) 
section of the app builder, where you will usually start creating views for the entities you have
and then add them to the menus so they can be navigated in the app.

Below we describe the most important pieces of the UI.

### Views

Views are the most important piece in the UI. The most generic definition of a view would be
something that can be rendered in the UI of the app, however most views are associated to data
in the app and allow to show it in different ways and usages.

For example you could have a gird view associated to an entities for companies. This view will
list companies in your app. Depending on the configuration of that view you will be able to
see details, edit company records or create new ones.

[You can find more information about views here](/docs/dev-reference/user-interface/overview).

### Navigation

The navigation indicates how views can be accessed in your app. For example how the main menu is
organized in configured in the navigation, where items in the menu point to the views that will
be displayed in the main content area.

[You can find more information about navigation here](/docs/dev-reference/user-interface/navigation).

### Field types' display options

Most views show data coming from records, which are defined in entities. Each field inside entities
belongs to a type that has their own display options. For example a choice field could be displayed
as a dropdown or as a switcher.
 
So each type will define how it has to be rendered in the UI and in most cases they offer settings
to customize it. These settings can be defined in the entity, which will be taken as the default,
but they can be override in specific views to provide more flexibility.

