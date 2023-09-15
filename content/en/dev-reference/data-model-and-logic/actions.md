---
title: "Actions"
lead: "Explains what action are and how they can be used to define behavior in entities."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 24
---

Actions allow you to define behaviors for records within an entity beyond basic operations like creation or deletion. For example, in an entity that manages tasks, you could implement an action to mark a task as complete. This action might involve checking preconditions, updating the task's status, and notifying relevant parties.

Once an action is defined for an entity, it becomes accessible through the UI, the [REST API]({{<ref "/dev-reference/scripting/overview.md">}}), and the [JavaScript API]({{<ref "/dev-reference/rest-apis/apps-api.md">}}).

## **Action settings**

### Label

This is the human-readable name of the action, which will be displayed in the UI.

### Name

The name serves as the internal identifier for the action and is used in both the REST and JavaScript APIs.

The name must consist only of letters and numbers, without special characters or spaces. It's important to note that changing the action's name might have consequences:

- **`REST API`**: External applications using this action through the REST API will need updates, as the action's URL will change.
- **`Scripts`**: Any scripts in the app referencing this action will require manual updates. Future tools are planned to aid in such cases.

### Type

The action's type indicates whether it is executed for each individual record or as a batch operation for a group of records:

- **`One Record`**: These actions are applied to one record at a time, even if you can select multiple records through the UI or provide multiple IDs in the REST API. The action processes each record individually, unaware of the total number of records involved.
- **`Many Records`**: These actions accept a query parameter that defines the record selection. This allows the action to operate on all selected records simultaneously. For example, you could create an action to send a summary of multiple tasks in a single email—a task not feasible with actions targeted at individual records. Actions for many records lack options like restricting to a single record and setting preconditions.
- **`Global Entity`**: These actions do not receive any parameter to determine affected records. They appear in all grid views and workflow views under a special section called **`Global Actions`**. An example might be an action named "Check Payment Status" in the **`Payments`** entity. When executed, it would script to check the status of all pending payments.

### Visible

This option controls the visibility of the action. If set to **`Never`**, even if the action is present in the view, it will remain hidden. This feature spares you the need to manually remove the action from each view.

Keep in mind that this is solely a UI setting.

The **`Visible`** options are:
- **`Always`**: The action is always visible (default option).
- **`Expression`**: The action becomes visible if the specified expression evaluates to **`true`**. Refer to the documentation for [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) for more information.
- **`Script`**: The action's visibility depends on the return value of a script. If the script returns **`true`**, the action is visible; otherwise, it's hidden. Here's the script context:

  ---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the action will be executed.<br>This variable is only available if the type of the action is **`One record`**.|

  ##### Returns

  **`boolean`** - **`true`** if conditions are met, **`false`** otherwise.

  ##### Samples

  ```js
  // make the action visible if the type is 'a'
  return record.field('type').val() == 'a';
  ```
  <br>
  
  ---

- **`Never`**: the action will be hidden. 

### Preconditions

For actions of type **`One record`**, you can define preconditions that determine the records on which the action can be applied. For instance, consider an entity named **`tasks`** with an action named **`complete`**. You might only want to allow this action when the **`status`** field is set to **`inProgress`**.

Preconditions can be established in two ways:

- **`Expression`**: The action is executable on the record if the provided expression evaluates to **`true`**. Otherwise, the action won't be accessible in the UI, or it will result in an error when attempted through the REST or JavaScript API. For further details, consult the documentation on [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).
- **`Script`**: The action is executable on the record if the script returns **`true`**. If not, the action won't appear in the UI or will result in an error when invoked via the REST or JavaScript API.

  ---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the action will be executed.|

  ##### Returns

  **`boolean`** - **`true`** if preconditions are met, **`false`** otherwise.

  ##### Samples

  ```js
  // preconditions of the action are met if type is 'a' and current user is in group 'test'
  return record.field('type').val() == 'a' && sys.context.getCurrentUser().containsGroup('test');
  ```
  <br>
  
  ---

### Result as response

For actions of type **`One record`** or **`Global entity`**, you can specify whether the action should return a custom response. If enabled, the result returned by the action script will be used as the response.

For actions of type **`Many records`**, the return value of the action script is always utilized as the response for the action.

Any value returned by the script and intended as a response is transformed into valid JSON (if needed). The **`Content-Type`** of the response is consistently set to **`application/json`**. If JSON conversion is not feasible, an error will be triggered.

This setting solely affects the behavior of the [REST API]({{<ref "/dev-reference/scripting/overview.md">}}) and is irrelevant to the UI. The returned value will be included in the response body of the request.

### Save linked parameters

For actions of type **`One record`**, it's possible to include linked parameters. Enabling this flag ensures that the record is automatically updated with the values from linked parameters. If this flag is not set, you will be responsible for saving the record within the action script to make the changes permanent.

It's important to note that if this option is set, a record changed event will be triggered before executing the action script (when the record is saved). If you save the record again within the action script, another record changed event will be triggered, in addition to the event triggered by the action itself.

### Execute in background

If this flag is enabled, executing the action will immediately return with a reference to a job responsible for performing the action in the background.

For instance, when using the REST API to execute the action, instead of receiving the action's result, you will receive a job reference that indicates the action will be carried out in the background. To determine completion, you should monitor the status of the job.

This flag can be overridden for a specific call through the REST API or JavaScript API. Additionally, the UI might choose to override this flag. For instance, when multiple records are selected, the UI will always send the action to the background, even if this flag is not set.

When this flag is not enabled, calls to the action will wait for its completion and return the action's result.

For more information on actions in the REST API and JavaScript API, refer to the documentation.

### Avoid triggering UI events

Enabling this flag for executing the action in the background will prevent UI notifications from being triggered. This is valuable for efficiency during execution, particularly in batch processing scenarios where notifying end-users about data changes is unnecessary.

### Restrict to only one record

For actions of type **`One record`**, enabling this flag signifies that only a single record can be selected and the action can be executed. This is particularly applicable when there are parameters that are not meaningful to apply to multiple records simultaneously.

For instance, if the action's purpose is to update the title of a task, executing it on more than one record is illogical since the same title would be set for numerous tasks.

### Action script

The action's core script is executed when the action is invoked. It runs when the action is executed in the UI (when the action's execution is confirmed), and it is the place where the action's intended operations should be carried out.

  ---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the action will be executed. <br>This variable is only available if the type of the action is **`One record`**.|
  |oldRecord|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record before linked parameters are merged. <br>This variable is only available if the type of the action is **`One record`**.|
  |query|[sys.data.Query]({{<ref "/dev-reference/scripting/sys-data.md">}})|A query object with filters to find all records afected by this action. <br>This variable is only available if the type of the action is **`Many Records`**.|
  |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This allows access to the parameters of the action.|

  ##### Samples

  ```js
  // updates some values in the record and save it
  var newValue = action.field('param1') * 10;
  record.field('field').val(newValue);
  sys.data.save(newValue);
  ```
  <br>

  ```js
  // many records actions that sums up the number of employees on selected companies
  var total = 0;
  var records = sys.data.find(query);
  while (records.hasNext()) {
    total += records.next().field('numberOfEmployees').val();
  }
  return total;
  ```
  <br>
  
  ---

### Custom validations

Custom validations for actions enable more intricate validations that span across all fields within the action. These validations can utilize external services or functionalities that aren't accessible through field rules.

For **`ONE_RECORD`** action types, the record is accessible within the script context. In the case of **`MANY_RECORDS`**, a Query object can be used to ascertain which records will be impacted.

For instance, consider an external endpoint for address validation that you can integrate to validate addresses. Alternatively, you might want to enforce a requirement that when a specific option is chosen in one field of the record or the action, another field's value must adhere to a specific pattern.

Here is the script context for these custom validations:

  ---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the action is executed. You can use this information on your validation rules. This parameter is only available when action type is **`ONE_RECORD`**|
  |query|[sys.data.Query]({{<ref "/dev-reference/scripting/sys-data.md">}})|A query object with filters to find all records afected by this action. This parameter is only available when action type is **`MANY_RECORDS`**|
  |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|The action to validate.|

  ##### Returns

  **`object`** - You should return an array of errors, something like this:

  ```js
  [
    {
      path: 'addressLine', 
      code: 'invalid', 
      message: 'Not a valid address when running this action'
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

  The **`code`** is an error code that you can define according to your needs. This code will be included in the response when attempting to execute the action using the REST API or the JavaScript API.

  Finally, the **`message`** is what will be displayed in the UI and will also be included in the response along with the code.

  ##### Samples

  ```js
  // validates the zip code using an external service
  var errors = [];
  var zipCode = action.field('address.zipCode').val();
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

Parameters are fields that will be prompted for when the action is executed. For instance, when executing the action from the UI, a popup will appear asking the user to input values for the parameters configured in the action (refer to [action views](#views) for more details on configuring the UI of an action).

Parameters can fall into three types:

- **Parameter**: These fields are associated with the action itself, not the entity. They have their own configuration, and you're not required to store their values in the record (though you can copy the value to a record field within the action script if needed).
- **Linked parameter**: These fields are part of the entity's structure and settings, which means their structure and settings cannot be altered (except for display options in views). If the **`Saved linked parameters`** flag is enabled, these fields will be automatically updated in the record before executing the action script, which then triggers a record changed event.
- **Entity field parameter**: These parameters are also part of the entity but are not directly linked to the action. Instead, they are used within the context of the action and can be accessed through the **`record`** variable.

For more information on configuring parameters, please refer to the [Fields documentation]({{<ref "/dev-reference/data-model-and-logic/fields.md">}}).

## **Permissions**

Permissions dictate which groups are granted the authority to execute the action. As with other aspects of the application, these permissions are enforced both in the UI and the REST API.

Upon adding a new action to an entity, if a group has permissions for all the actions in that entity, the action is automatically granted the Allowed permission.

Permissions for parameters can be configured within each parameter or at the group level.

Upon adding a new parameter to an action, if a group has permissions for the action, read-write permission is automatically assigned to that parameter within the group.

For more details on permissions, please consult the [Groups documentation]({{<ref "/dev-reference/security/groups.md">}}).

## **Views**

To enable the execution of an action from the UI, a view must be defined. To simplify this process, a default view is automatically generated alongside the action. This default view is fully managed, meaning that new fields will be added or removed as you modify your actions. In most scenarios, you can simply rely on the default action views.

However, it's possible to define multiple views for a single action based on different settings required for various parts of the UI. For example, in a grid view, you might want to prompt users for confirmation before executing an action, since they can select multiple records. On the other hand, in a read-only view, skipping action confirmation can enhance efficiency.

Each view comes with the following settings:

- **`Label`**: A user-friendly name for the action view, which users will see as the action's name. This label doesn't need to be unique.
- **`Name`**: A unique name for the action view, which cannot contain spaces or special characters.
- **`Is default view`**: Indicates whether this is the default view for the action. Default views are used, for instance, when you opt to display all actions in a grid view. In this case, only the default view of each action is listed, as it wouldn't make sense to display all views of each action in the same place.
- **`Managed`**: If this option is enabled, new parameters will be automatically incorporated into the view, and the order will be maintained between action parameters and the view.
- **`Ask for confirmation`**: Enabling this flag prompts users for confirmation before executing the action. This is useful when no parameters are defined in the view.
- **`Style`**: Specifies the style of the action button in the UI.
- **`Icon`**: Defines the icon displayed for the action in the UI.

### Events

#### Before show

The before show script is evaluated before the action is executed. In the UI, it runs before displaying the popup to the user, allowing you to make changes to parameters based on special conditions.

If multiple records are selected, the script is executed only once. You can determine which records will be affected by using the **`query`** parameter within the script.

---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the action will be executed.<br>This variable is only available if the type of the action is **`One record`** or if you are appliying the action to many records.|
  |query|[sys.data.Query]({{<ref "/dev-reference/scripting/sys-data.md">}})|A query object with filters to find all records afected by this action. Only for type **`Many records.`**|
  |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This allows access to the parameters of the action. When the action is executed from the UI, changes made here will be reflected in the UI.|

  ##### Samples

  ```js
  // sets the default value as the email of the current user
  action.field('sendTo').val(sys.context.getCurrentUser().email());
  ```
  <br>
  
---

#### On action change

The on action change script is evaluated each time a view parameter's value changes. Therefore, it is possible to modify parameters based on specific conditions.

You can identify the parameter that triggered the event by utilizing the **`modifiedParameter`** parameter within the script.

---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the action will be executed.<br>This variable is only available if the type of the action is **`One record`** or if you are appliying the action to **`many records`**. In case of on change event the record is read only.|
  |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This allows access to the parameters of the action. When the action is executed from the UI, changes made here will be reflected in the UI.|
  |modifiedParameter|**`string`**|A string with the name of the field that fires the event.|

  ##### Samples

  ```js
  // sets the value as the email of the current user only if the field 'sendTo' has changed and is empty
  if (modifiedParameter == 'sendTo' && action.field('sendTo').isEmpty()) {
    action.field('sendTo').val(sys.context.getCurrentUser().email());
  }
  ```
  <br>
  
---

#### After action executed

The after action executed script is evaluated immediately after the user confirms the execution of the action (or when they initiate the action if the **`Ask for confirmation`** flag is not set). It's important to note that this evaluation occurs exclusively when the action is executed through the UI using this specific view.

If multiple records are selected, the script is executed only once. You can ascertain which records will be affected by employing the **`query`** parameter within the script.

Furthermore, if the action is dispatched to the background for execution, a **`job`** object becomes accessible. This **`job`** object refers to the job responsible for carrying out the action over the record(s).

---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the action will be executed.<br>This variable is only available if the type of the action is **`One record`** or if you are appliying the action to many records.|
  |query|[sys.data.Query]({{<ref "/dev-reference/scripting/sys-data.md">}})|A query object with filters to find all records afected by this action. Only for type **`Many records.`**|
  |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|Action object to access parameters of the action.|
  |job|[sys.jobs.job]({{<ref "/dev-reference/scripting/sys-jobs.md">}})|This is the job object, which is only available when the action is executed in background.<br>Keep in mind that the after action executed script is executed right after you triggered the action from the UI and the job might be still pending or running.|

  ##### Samples

  ```js
  // after action is executed redirect to read only view of given record
  var record = sys.data.findOne(query);
  sys.ui.sendMessage({
      scope: 'global',
      name: 'navigate',
      view: '590ce2e38a2....',
      recordId: record.id()
  });
  ```
  <br>
  
---

