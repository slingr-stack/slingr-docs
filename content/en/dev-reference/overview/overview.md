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

## **Introduction**

As described in [What's Slingr?]({{<ref "/getting-started/getting/what_is_slingr.md">}}),
Slingr is a platform designed for crafting cloud applications that seamlessly integrate with a range of SaaS solutions and internal apps. Its core purpose is to enhance developer productivity by enabling them to concentrate on solving business challenges, rather than grappling with technical intricacies.

Slingr's methodology revolves around defining your application's data model and business rules. This definition, termed as the app's metadata, serves as the foundation that powers your app's execution. You can modify this metadata using the app builder.

## **Understanding app metadata**

In the succeeding sections, we will delve into the essential components of app metadata that are crucial for creating applications in Slingr. To gain insight into metadata deployment and execution, refer to the documentation on [Pushing and Syncing Changes]({{<ref "/dev-reference/metadata-management/pushing-and-syncing.md">}}), which also explains the process of making app alterations.

## **Model**

A clear demarcation exists between the app's model and its user interface. The former encapsulates the app's data structure and behavior, while the latter dictates how this information is presented visually.

Slingr strives to follow a model-driven approach as much as possible. This means that the UI derives significant information from the model itself. Consequently, the UI is nearly auto-generated, with developers needing to specify only a few additional settings that can't be inferred from the model or that require customization.

The model essentially comprises entities, listeners, libraries, and legacy services, which are comprehensively described in the following sections.

### Entities

Entities represent the cornerstone of app metadata. Think of them as an advanced version of database tables. In entities, you define the structure of the data you intend to persist within your app. However, entities offer features that elevate them far beyond traditional database tables:

- **`Complex Data Models`**: Unlike conventional tables, entities support intricate data structures with multiple nesting levels and multi-valued fields. This approach reduces the necessity for a high number of entities, enhancing the cleanliness and comprehensibility of your app.
- **`Field Settings`**: Fields boast a multitude of settings beyond just their names and data types. These settings encompass requirements, read-only or editable statuses, calculated fields, default display preferences (thus eliminating repetitive UI definitions), permissions, validation rules, and more. While defining fields in entities, you concurrently configure numerous app settings that profoundly impact execution and rendering.
- **`Diverse Data Types`**: Each data type possesses its unique settings and display options. For instance, the text type allows you to set parameters like minimum or maximum length and choose between input methods such as text boxes or text areas. Slingr provides a broad spectrum of data types, each equipped with extensive settings, enabling you to furnish comprehensive information for each field in your entities.
- **`Actions`**: In addition to the standard actions of creating, reading, updating, and deleting records within an entity, you can define custom behaviors through actions. For instance, imagine an entity for tasks within a CRM app. This entity could include a custom action named "Reject." When executed via the UI, this action prompts users to input a reason for rejection. The task is subsequently reopened, assigned to the relevant personnel, and the reason for rejection is stored as a note within the task. Such actions empower entities with custom behaviors, facilitating the creation of intricate execution workflows within your apps.
- **`Listeners`**: While listeners can serve a broader range of events, certain listeners are specifically designed for data events, aligning with entities. These listeners allow you to trigger actions when specific events occur within records, such as the creation of a new record, deletion of a record, or execution of an action.
- **`Permissions`**: You can define access privileges for entities, specifying which operations (create, edit, delete, actions, etc.) can be performed by different roles. Furthermore, granular permissions can be established at the field level.

Entities encapsulate numerous aspects of your app. Consequently, when embarking on the creation of a new app, it's advisable to begin by defining the most pivotal entities.

[For more in-depth information about entities, refer to this section]({{<ref "/dev-reference/data-model-and-logic/entities.md">}}).

### Listeners

Listeners serve as hooks for various app events. For instance, you can trigger actions whenever a new record is created in a specific entity or respond to events originating from legacy services (e.g., creating a new record upon the creation of a contact in Google Contacts).

[To explore listeners in greater detail, consult this section]({{<ref "/dev-reference/data-model-and-logic/listeners.md">}}).

### Libraries

Libraries comprise reusable JavaScript code snippets that can be employed across different sections of your app. For example, if you possess a Base64 encoding function that's utilized by multiple app actions, you can encapsulate this function in a library, making it easily accessible for actions that require it.

[For comprehensive insights into libraries, visit this section]({{<ref "/dev-reference/data-model-and-logic/libraries.md">}}).

### Legacy services

Endpoints extend the capabilities of the platform, primarily facilitating seamless integration with various SaaS solutions like Slack, Google Calendar, SparkPost, and more. Nevertheless, legacy services aren't confined to integration purposes alone; they can also be harnessed for diverse use cases. For instance, let's assume you possess a Java library for file encryption that you intend to utilize within your app. In this scenario, you can create an legacy service integrating this Java library and subsequently leverage it within your app.

Feel free to incorporate multiple legacy services into your app, with each legacy service enhancing its functionalities. For information on existing legacy services or creating custom ones, refer to the relevant sections!

[For comprehensive insights into legacy services usage, explore this section]({{<ref "/dev-reference/data-model-and-logic/endpoints.md">}}).

## **Permissions**

Permissions empower you to define user capabilities within the app. Slingr offers highly granular permission control:

- **`Entities`**: Permissions cover actions like creation, access, editing, deletion, and history tracking. Conditions can also be defined within entity permissions. For example, you can stipulate that a record can only be edited if the "assignee" field matches the current user.
- **`Fields`**: Permissions can be configured for each field, dictating whether it's read-only, read/write, or inaccessible.
- **`Actions`**: Permissions extend to actions, defining who can execute them and the parameters that can be passed to these actions.
- **`Views`**: Permissions encompass view accessibility.

Permissions are organized within [groups]({{<ref "/dev-reference/security/groups.md">}}), and [users]({{<ref "/dev-reference/security/users.md">}}) can be assigned to one or multiple groups, resulting in permissions being dictated by the group configurations.

Although permissions are structured in groups, streamlining configuration, they can also be edited from the specific elements they govern (entities, fields, actions, and views).

Enforcement of permissions is evident both in the UI (e.g., users without permission to access an entity field won't see it) and in the REST API.

## **Workflows**

With the amalgamation of entities, actions, listeners, legacy services, and permissions, robust and intricate workflows can be constructed to meet diverse requirements. Although the platform doesn't inherently possess a distinct "workflow" concept, combining these elements offers substantial flexibility for organizing your app.

## **User interface**

Despite Slingr's capability to derive a wealth of information from the app model, the user interface (UI) is still customizable to cater to your preferences.

The UI of your app is structured as follows:

- **`Header`**: Positioned at the top, it displays the app name and logo, which you can configure.
- **`Main Menu`**: This menu functions as the primary navigational tool, providing access to various sections of your app. Clicking menu items opens corresponding views in the main content area.
- **`Secondary Menu`**: Designed for view-associated items, this menu adds further items that are rendered in the main content area.
- **`User Menu`**: This menu encompasses system operations like "My Profile" or "Logout," alongside items linked to app views, displayed within the main content area.
- **`Main Content`**: This region is dedicated to rendering the app's views.

For customization of these UI components, refer to the [User Interface]({{<ref "/dev-reference/user-interface/overview.md">}}) section in the app builder. Typically, your journey starts with creating views for your entities and subsequently integrating them into the menus for seamless navigation.

## **Views and navigation**

Views form the bedrock of your app's UI. A view essentially represents a visual rendering within the app's interface. While views can encompass diverse data representations and functionalities, most views are linked to app data, enabling diverse ways of presenting and interacting with this data.

For instance, you might establish a grid view associated with an entity representing companies. This view would list companies within your app, and its configuration would determine whether you can view details, edit records, or create new ones.

[For a deeper exploration of views, refer to this section]({{<ref "/dev-reference/user-interface/overview.md">}}).

Navigation structures the path users take through your app. For instance, the configuration of the main menu, which dictates the content within the main content area, is determined by the navigation settings.

[For more insights into navigation, refer to this section]({{<ref "/dev-reference/user-interface/overview.md">}}).

## **Field types display options**

Most views present data originating from records defined in entities. Each field within these entities corresponds to a specific type, each of which possesses unique display options. For example, a choice field could be displayed as a dropdown menu or a switch.

While these type-specific rendering instructions are primarily configured at the entity level and serve as defaults, views can override these defaults to offer enhanced flexibility.

