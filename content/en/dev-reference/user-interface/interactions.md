---
title: "Interactions"
description: "Documentation for view interactions"
date: 2023-11-16T13:59:39+01:00
lastmod: 2023-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "user-interface"
toc: true
weight: 52
---

Interactions provide a straightforward way to interact with UI fields and control their behavior within views through scripts. They enable dynamic user interface responses based on user interactions and field changes.

## Overview

An interaction belongs to a specific view and allows you to define scripts that modify the UI fields. Multiple interactions can be configured for a single view, enabling complex dynamic behaviors.

{{< notes type="note" >}}
 Interactions are momentaneously only supported in [**Flex record views**]({{<ref "/dev-reference/user-interface/flex-views/flex-record-views">}}) and [**Flex action views**]({{<ref "/dev-reference/user-interface/flex-views/flex-action-views">}}). Next platform versions will support regular views as well.
{{< /notes >}}

## **Interaction settings**

### Label

This is the human-readable name of the interaction, which will be displayed in the UI.

### Name

The name serves as the internal identifier for the interaction. The name must consist only of letters and numbers, without special characters or spaces.

### Visible

This option controls the visibility of the interaction. If set to **`Never`**, even if the interaction is present in the view, it will remain hidden. This feature eliminates the the need to manually remove the interaction from each view.

Keep in mind that this is solely a UI setting.

The **`Visible`** options are:
- **`Always`**: The interaction is always visible (default option).
- **`Expression`**: The interaction becomes visible if the specified expression evaluates to **`true`**. Refer to the documentation for [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) for more information.
- **`Script`**: The action's visibility depends on the return value of a script. If the script returns **`true`**, the interaction is visible; otherwise, it's hidden. Here's the script context:

  ---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the interaction will be executed.|
  |interaction|[sys.data.Interaction]({{<ref "/dev-reference/scripting/sys-data.md#sysdatainteraction">}})| The interaction object itself.|
  
  ##### Returns

  **`boolean`** - **`true`** if conditions are met, **`false`** otherwise.

  ##### Samples

  ```js
  // make the interaction visible if the type is 'a'
  return record.field('type').val() == 'a';
  ```
  <br>
  
  ---

- **`Never`**: the interaction will be hidden. 

### Ask for confirmation

This boolean flag allows you to prompt user before executing the interaction.

### Style

This pertains to the visual style of the interaction when presented as a button in the UI.

### Icon

This specifies the icon to represent the interaction when displayed in the UI.

### Modal size

Since interactions always open in a modal, this switcher allows you to choose the size of the modal to be rendered. 

The options are:
- **`Automatic`** (default option).
- **`Small`**
- **`Medium`**
- **`Large`**
- **`Extra large`**


### Interaction script

The script runs when the interaction is executed in the UI (when the interaction's execution is confirmed), and it is the place where the interaction's intended operations should be carried out.

  ---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the action will be executed.|
  |interaction|[sys.data.Interaction]({{<ref "/dev-reference/scripting/sys-data.md#sysdatainteraction">}})|This allows access to the parameters of the interaction.|

  ##### Samples

  ```js
  // updates some values in the record
  var newValue = interaction.field('param1') * 10;
  record.field('field').val(newValue);
  ```
  
  ---

  ### Custom validations

Custom validations for interactions enable more intricate validations that span across all fields within the interaction. These validations can utilize external services or functionalities that aren't accessible through field rules.

For instance, consider an external endpoint for address validation that you can integrate to validate addresses. Alternatively, you might want to enforce a requirement that when a specific option is chosen in one field of the record or the interaction, another field's value must adhere to a specific pattern.

Here is the script context for these custom validations:

  ---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the interaction is executed.|
  |interaction|[sys.data.Interaction]({{<ref "/dev-reference/scripting/sys-data.md#sysdatainteraction">}})|The interaction to validate.|

  ##### Returns

  **`object`** - You should return an array of errors, something like this:

  ```js
  [
    {
      path: 'addressLine', 
      code: 'invalid', 
      message: 'Not a valid address when running this interaction'
    },
    {
      path: 'zipCode', 
      code: 'invalid', 
      message: 'Wrong zip code'
    }
  ]
  ```
  <br>

  Where **`path`** is the path to the field experiencing issues. For nested fields, the full path should be provided, such as **`address.zipCode`**. For multi-valued fields, the index should be indicated, like **`addresses[1].zipCode`**.

  The **`code`** is an error code that you can define according to your needs.

  Finally, the **`message`** is what will be displayed in the UI and will also be included in the response along with the code.

  ##### Samples

  ```js
  // validates the zip code using an external service
  var errors = [];
  var zipCode = interaction.field('address.zipCode').val();
  if (!app.endpoints.addressValidator.isValidZipCode(zipCode)) {
    errors.push({
      path: 'address.zipCode',
      code: 'invalid',
      message: 'Wrong zip code'
    });
  }
  return errors;
  ```
  <br>
  
  ---

## **Parameters**

Parameters are fields that will be prompted for when the interaction is executed. For instance, when executing the interaction from the UI, a popup will appear asking the user to input values for the parameters configured in the interaction.

For more information on configuring parameters, please refer to the [Fields documentation]({{<ref "/dev-reference/data-model-and-logic/fields.md">}}).

## **Permissions**

Permissions dictate which groups are granted the authority to execute the interaction.

Upon adding a new interaction to a view, if a group has permissions for all the interactions in that view, the interaction is automatically granted the Allowed permission.

Permissions for parameters can be configured within each parameter or at the group level.

Upon adding a new parameter to an interaction, if a group has permissions for the interaction, read-write permission is automatically assigned to that parameter within the group.

For more details on permissions, please consult the [Groups documentation]({{<ref "/dev-reference/security/groups.md">}}).

## **Events**

### Before show

The before show script is evaluated prior to interaction execution. In the UI, it is triggered before presenting the user with the interaction popup. This enables adjustments to parameters based on specific conditions.


  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| The record on which the interaction will be executed.|
  | interaction |  [sys.data.Interaction]({{<ref "/dev-reference/scripting/sys-data.md#sysdatainteraction">}}) | This provides access to the parameters of the interaction. Changes made here will be reflected in the UI when the interaction is executed from the user interface.|

  ##### Samples

  ``` javascript
  // sets the default value as the email of the current user
  interaction.field('sendTo').val(sys.context.getCurrentUser().email());
  ```
  <br>

### On interaction change

The **On Interaction Change** script is executed whenever a view parameter changes its value. This enables making adjustments to the parameters based on specific conditions.

You can identify the parameter that triggered the event by utilizing the **`modifiedParameter`** parameter within the script.

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| The record on which the interaction will be executed.|
  | interaction |  [sys.data.Interaction]({{<ref "/dev-reference/scripting/sys-data.md#sysdatainteraction">}}) | This provides access to the parameters of the interaction. Changes made here will be reflected in the UI when the interaction is executed from the user interface.|
  | modifiedParameter | string | A string with the name of the field that fires the event. |

  ##### Samples

  ``` javascript
  // sets the value as the email of the current user only if the field 'sendTo' has changed and is empty
  if (modifiedParameter == 'sendTo' && interaction.field('sendTo').isEmpty()) {
    interaction.field('sendTo').val(sys.context.getCurrentUser().email());
  }
  ```
  <br>

### After interaction executed


The **After Interaction Executed** script is executed immediately after the user confirms the execution of the interaction.


  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| The record on which the interaction will be executed.|
  | interaction |  [sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md#sysdatainteraction">}}) | This provides access to the parameters of the interaction.|

  ##### Samples

  ``` javascript
  // after interaction is executed log something
  sys.logs.info("Interaction: [" + interaction.name() + "] executed")
  ```
  <br>

## **Nested Interactions**

Nested interactions allow you to add one level of interaction nesting depth within another interaction. This feature enables more complex UI workflows where a child interaction can access and process data from its parent interaction and return results back.

### Adding nested interactions

Nested interactions can be added to a parent interaction in two ways:

- **From a menu widget**: When the parent interaction uses a flex layout, you can add a nested interaction directly from a menu widget within the interaction's layout.
- **From the menu property**: When using a regular layout, you can configure the menu property to include a nested interaction.

### Behavior and configuration

Nested interactions work similarly to regular interactions with all the same configuration options available:

- **Parameters**: Define fields that will be prompted when the nested interaction is executed
- **Permissions**: Control which groups can execute the nested interaction
- **Events**: Configure scripts for before show, on interaction change, and after interaction executed
- **Custom validations**: Implement complex validation logic
- **Interaction script**: Define the operations to be performed when executed

### Key characteristics

The main difference between nested interactions and regular interactions is that nested interactions have access to their parent interaction's context:

- **Access to parent data**: Nested interactions can read and process data from the parent interaction
- **Data flow**: Changes made in the nested interaction can be returned back to the parent interaction
- **Scope**: Nested interactions are limited to one level of nesting depth - you cannot nest interactions within nested interactions

### Use cases

Nested interactions are particularly useful for:

- **Multi-step workflows**: Breaking down complex operations into logical sub-steps
- **Conditional operations**: Providing additional interaction options based on parent interaction state
- **Data validation and processing**: Performing specialized operations on parent interaction data before final submission
