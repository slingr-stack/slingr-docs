---
title: "Fields"
description: "Explanation of the features available for fields."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 23
---

Fields serve as the fundamental units of data in Slingr apps. They primarily define the
structure of entities, but also find utility in other contexts, such as parameters within actions.

A pivotal attribute of a field is its type, which determines the available options, rules,
display preferences, and user interfaces for editing and reading. [More information about
types is available here]({{<ref "/dev-reference/field-types/overview.md">}}).

Field settings are organized as follows:

- **`Basic Settings`**: These foundational settings are essential for all fields. They encompass
  the name, label, type, and multiplicity. All of these settings are mandatory.
- **`Rules`**: These settings influence value validation and storage in the database. For instance,
  designating a field as sensitive will result in encrypted database storage and exclusion from logs.
  There might also be type-specific rules, such as defining minimum and maximum values for an integer field.
  - **`General Rules`**: These settings are universal across all types, though certain types may lack some options.
  - **`Type-Specific Rules`**: These settings are tailored to each type. For instance, text fields offer rules
    for specifying the minimum and maximum string length.
- **`Display Options`**: Unlike rules, display options don't impact value validation or database storage.
  They focus solely on the field's appearance in the user interface.
  - **`General Display Options`**: These overall settings influence how the field is visually presented,
    without affecting its value. For example, you can define label aesthetics and value indentation,
    but these settings won't dictate how field values are displayed.
  - **`Type-Specific Display Options`**: These settings determine how the field's value is shown. For instance,
    in the case of a relationship field, you can choose to display the reference as a link. During editing,
    you might opt for a dropdown or selection boxes to choose a new value.

For insights into type-specific settings, please refer to the [Types documentation]({{<ref "/dev-reference/field-types/overview.md">}}).

## **Basic settings**

### Label

This represents the human-readable field name. It's what appears in the UI when the field is displayed.

Display options can override this label, useful for showing distinct labels in specific contexts.

### Name

This is the internal field name, used in the REST and JavaScript APIs, as well as for database storage within entities.

The name must not contain special characters or spaces; only letters and numbers are allowed.

Keep in mind that altering the field name can have ramifications:

- **`Database`**: Renaming a field within an entity triggers data refactoring during pushes or syncs. For entities
  with substantial records, this renaming process might take some time.
- **`REST API`**: External apps utilizing this field through the REST API will require updates, as the field name changes.
- **`Scripts`**: If any app scripts reference this field in queries or for fetching values, manual updates to these scripts
  are necessary. Future tools are anticipated to aid in such cases.

### Type

The field's type determines the allowable content and its visual rendering. Each type is associated with specific rules and display options.

To explore available types and their features, please refer to the [Types documentation]({{<ref "/dev-reference/field-types/overview.md">}}).

When altering the field type, during pushes or syncs, the app will attempt to automatically convert existing values to the new type. The conversion rule is as follows: the original value will be transformed into its string representation, which will then be parsed by the new type. If parsing fails, the value will be set to **`null`**.

Note that changing a field's type may result in side effects:

- **`Database`**: If the field was used within an entity, modifying its type might trigger data refactoring to adapt the value to the new type.
- **`REST API`**: External apps utilizing this field via the REST API may need updates due to potential changes in the field's format. For instance, if the field type shifts from integer to text, the REST API will return a string instead of a number.
- **`Scripts`**: If there were scripts in the app referencing this field, updates might be necessary, especially if the scripts relied on type-specific features.

### Multiplicity

Multiplicity indicates whether the field can store one or multiple values. For instance, you could have an **`emails`** field capable of holding multiple email addresses for users with more than one email.

Changing the multiplicity of an existing field triggers automatic refactoring of existing records. If a field transitions from single-valued to multi-valued, the existing value becomes the first value in the field. Conversely, when shifting from multi-valued to single-valued, only the first value remains, discarding any additional values.

Note that changing field multiplicity might entail side effects:

- **`Database`**: If the field was used within an entity, alterations to multiplicity may trigger data refactoring during pushes or syncs to adjust the structure.
- **`REST API`**: External apps relying on the field through the REST API will require updates, as the field structure will change.
- **`Scripts`**: Scripts referencing this field in the app may need updating if they make assumptions about the field's multiplicity.

## **General rules**

### Default value

You can set a default value for a field. The behavior varies based on the context:

- **`Entity Field`**: The default value applies solely when creating a new record; it won't affect editing existing records.
- **`Action's Parameter`**: The default value takes effect only if the parameter is empty.

Usually, changing this setting doesn't trigger any refactoring and mainly affects new records. However, if the field is also marked as required or if it's a newly added field, a refactoring might occur to assign the default value to all records where this field is empty or added.

Default values can be defined in two ways:

- **`Value`**: You can choose a fixed value as the default.
- **`Script`**: Alternatively, you can provide a script to calculate the default value. Here's the script context:

    ---

    ##### Parameters

    |Name|Type|Description|
    |---|---|---|
    |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This record is linked to the operation at hand. If the default value is for an entity field, this record encompasses the field. It's important to recognize that, in this context, the default value is generally computed before record creation. As a result, many fields might be empty in this phase. The only scenario in which other fields are populated is when introducing a new field or when the required flag has been added. Thus, during default value calculation, other fields might already be present.<br>If the field serves as an action parameter, this record pertains to the ongoing execution of the action. In such cases, the record contains values and is notably more informative.|
    |parentField|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This variable exclusively comes into play when dealing with a field nested within another field. Its behavior aligns with the rules applicable to variables associated with records or actions (similar principles apply whether it's an action parameter or an entity field).<br>The variable takes the form of a **`sys.data.Record`** object, albeit with a distinction: the record's root is set to the encompassing nested fields. This arrangement facilitates access to fields within the nested group. For instance, you can utilize **`parentField.field('fieldA')`** instead of resorting to **`record.field('nested.fieldA')`** or **`action.field('nested.fieldA')`**. This feature proves especially invaluable when nested fields are multi-valued, as you are not required to know the index.|
    |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This variable becomes accessible exclusively when the field serves as an action parameter. It grants access to other parameters, though it's important to note that these parameters might be devoid of content, unless an initial value has been designated.|


    ##### Returns

    **`any or any[]`** - You should return the calculated value in the format used in the Javascript API for the type of the field. If the field is multi-valued, you should return an array.

    ##### Samples

    ```js
    // if current user has an email with 'slingr.io', set this field to 'true'
      
    let flag = false;
    const currentUser = sys.context.getCurrentUserRecord();
    if (currentUser.field('email').val().indexOf('@slingr.io') != -1) {
      flag = true;
    }
    return flag;
      
    ```
    <br>
    
    ---

### Required

Enabling this flag designates a field as required. A required field necessitates a value. This value can be explicitly set or drawn from the default value. If no value is furnished for the field and no default value exists, an attempt to save the record will trigger a validation error.

The available choices for the required flag are as follows:

- **`Always`**: The field is consistently obligatory.
- **`Script`**: The field's requirement hinges on the script's evaluation yielding **`true`**. Here's the script's context:

    ---

    ##### Parameters

    |Name|Type|Description|
    |---|---|---|
    |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This record is linked to the ongoing operation. If the field resides within an entity field, this record corresponds to the container of that field.<br>In the case of a field serving as an action parameter, this record pertains to the execution of the action.|
    |parentField|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This variable is exclusively accessible when the field is situated within a nested field. It operates based on the variable record or action, adhering to the same principles applicable to action parameters or entity fields.<br>The variable assumes the form of a **`sys.data.Record`** object. The key distinction is that the record's root is set to encompass the nested fields in which it resides. This configuration facilitates the retrieval of fields within the nested group. For instance, you can employ **`parentField.field('fieldA')`** as an alternative to **`record.field('nested.fieldA')`** or **`action.field('nested.fieldA')`**. This feature proves particularly valuable in cases involving multi-valued nested fields where index awareness might be absent.|
    |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This variable is accessible solely when the field functions as an action parameter. It facilitates access to other parameters.|

    ##### Returns

    **`boolean`** - You should return **`true`** if the field must be required, **`false`** otherwise.

    ##### Samples

    ```js
    // if 'numberOfExmployees' is bigger than 10, then this field is required
    return record.field('numberOfEmployees').val() > 10;

    ```
    <br>
    
    ---

- **`Expression`**: The field becomes required if the expression evaluates to `true`. For further details, consult the [Expressions documentation]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).
- **`Never`**: The field remains non-required. This is the default setting.

### Unique

This flag indicates whether the value must be unique across all records in the entity. When activated, the app enforces this validation.

Empty values will not be considered when assessing uniqueness. Consequently, numerous records may possess an empty field.

Activating this flag generates an index with respect to this field.

It's important to note that the flag can be enabled even if duplicated values exist in current records. Handling such cases of duplication will require manual intervention.

### Indexable

Upon enabling this flag, an index will be established for the field. This can prove beneficial for enhancing performance in scenarios where querying using this field is frequent and the entity contains a substantial number of records.

Bear in mind that index creation introduces some overhead during record creation, updates, and deletions, as well as impacts storage requirements. Consequently, you should only set the indexable flag when it's genuinely necessary.

Unless you possess advance knowledge of which entities will amass numerous records and understand the anticipated data querying patterns, we recommend initially forgoing indexes and only introducing them as performance concerns emerge.

### Transient

When this flag is activated, values won't be permanently stored in the database. However, you can still manipulate the values within these fields during record processing. For instance, if you have a listener that triggers when records are created, you can utilize the value of this field in the listener's script to perform specific actions.

### Sensitive

Activating this flag triggers enhanced precautions when handling data within these fields:

- For user-sent data that's logged, fields marked as sensitive will be masked.
- These fields will be encrypted in the database.
- When data is synchronized from production to another environment, the data in these fields will be obfuscated.

This flag can be used in conjunction with the transient flag. For instance, it's illogical to avoid storing credit card information in the database if it's being logged in plain text. In such cases, when both flags are set, the data will be masked in logs and won't be stored or synced.

However, designating a field as sensitive carries certain limitations:

- Filtering only functions for text fields, and searches must match the exact text (no partial matching).
- Sorting won't function for these fields.

### Read/Write access

This attribute indicates when the field can be read from and written to. Consider the following scenario with fields:

- **`type`** (a choice field with options **`a`**, **`b`**, and **`c`**)
- **`subType`** (visible only if **`type`** is **`c`**)

In this instance, you might want the **`subType`** field to only appear when **`type`** is set to **`c`**. This can be achieved using a read/write access condition on the **`subType`** field.

If you require distinct access rules for reading and writing, you can uncheck the **`Sync read/write`** flag. This allows you to define separate conditions for read and write access. Although uncommon, such a configuration might be necessary.

The available read/write access options include:

- **`Always`**: The field is perpetually accessible.
- **`Script`**: When the script returns **`true`**, the field becomes accessible; otherwise, it remains inaccessible. Here's the script's context:

    ---

    ##### Parameters

    |Name|Type|Description|
    |---|---|---|
    |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This record is linked to the ongoing operation. If the field resides within an entity field, this record corresponds to the container of that field.<br>In the case of a field serving as an action parameter, this record pertains to the execution of the action.|
    |parentField|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This variable is exclusively accessible when the field is situated within a nested field. It operates based on the variable record or action, adhering to the same principles applicable to action parameters or entity fields.<br>The variable assumes the form of a **`sys.data.Record`** object. The key distinction is that the record's root is set to encompass the nested fields in which it resides. This configuration facilitates the retrieval of fields within the nested group. For instance, you can employ **`parentField.field('fieldA')`** as an alternative to **`record.field('nested.fieldA')`** or **`action.field('nested.fieldA')`**. This feature proves particularly valuable in cases involving multi-valued nested fields where index awareness might be absent.|
    |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This variable is accessible solely when the field functions as an action parameter. It facilitates access to other parameters.|

    ##### Returns

    **`boolean`** - You should return **`true`**  if there is access to the field, **`false`** otherwise.

    ##### Samples

    ```js
    // if 'numberOfExmployees' is bigger than 10, then this field is visible
    return record.field('numberOfEmployees').val() > 10;
    ```
    <br>
    
    ---

- **`Expression`**: The field becomes accessible if the expression evaluates to `true`. More information is available in the [Expressions documentation]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).
- **`Never`**: The field will never be accessible. This option is relevant only when the `Sync read/write` flag is unchecked and you've selected either the read or write option.

It's worth highlighting that access control here differs from permission settings. In this context, rules apply universally to all users, and there's no way to bypass these rules, even via scripting. In contrast, permissions don't affect developers and system users and are similarly disregarded in scripts.

### Calculated value

Certain types permit the field to be calculated, implying that the field's value will be derived from other data, and users won't be able to manually set it.

Two approaches exist for calculating a value:

- **`Script`**: In this scenario, you can furnish a script to compute the value. Here's the script's context:

    ---

    ##### Parameters

    |Name|Type|Description|
    |---|---|---|
    |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This record is linked to the ongoing operation. If the field resides within an entity field, this record corresponds to the container of that field.<br>In the case of a field serving as an action parameter, this record pertains to the execution of the action.|
    |parentField|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This variable is exclusively accessible when the field is situated within a nested field. It operates based on the variable record or action, adhering to the same principles applicable to action parameters or entity fields.<br>The variable assumes the form of a **`sys.data.Record`** object. The key distinction is that the record's root is set to encompass the nested fields in which it resides. This configuration facilitates the retrieval of fields within the nested group. For instance, you can employ **`parentField.field('fieldA')`** as an alternative to **`record.field('nested.fieldA')`** or **`action.field('nested.fieldA')`**. This feature proves particularly valuable in cases involving multi-valued nested fields where index awareness might be absent.|
    |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This variable is accessible solely when the field functions as an action parameter. It facilitates access to other parameters.|

    ##### Returns

    **`any or any[]`** - You should return the calculated value in the format used in the Javascript API for the type of the field. If the field is multi-valued, you should return an array.

    ##### Samples

    ```js
    // calculate the total price from the unit price and quantity
    return record.field('unitPrice').val() * record.field('quantity').val();
    ```
    <br>

    **Note:** The accurate sequence of field calculations is automatically managed within the bounds of the current entity's scope. This signifies that if you invoke a script outside of the entity scope, any associated dependencies will not be monitored. For instance, when utilizing a library to compute values, ensure you make the call in the following manner:

    ```js
    var field1 = record.field('fiedl1').val();
    var field2 = record.field('field2').val();
    app.utils.foo(field1, field2);
    ```
    <br>
    instead of:

    ```js
    app.utils.foo(record);
    ```
    <br>
    
    ---

- **`Aggregate`**: In this scenario, you can compute a value based on an aggregate query involving other records. For instance, if you possess an entity named **`departments`** and another named **`employees`** with a field labeled **`salary`**, you could create a field for calculating the average salary per department. This calculation would be an aggregation over the **`employees`** entity, considering records with the **`department`** field pointing to the department being evaluated. The aggregation would involve calculating an average over the **`salary`** field. This aggregation would be dynamically updated each time a salary changes or an employee is added or removed from a department. Thus, when you select the **`Aggregate`** calculation, you have access to the following options:
  - **`Aggregate Entity`**: The entity housing the records to be aggregated. In the aforementioned example, this would be the **`employees`** entity.
  - `Expression`: This expression filters which records from the **`Aggregate Entity`** are included in the aggregation. In the earlier example, the expression filtered records by matching the **`Current Record`** with the **`department`** field, thus ensuring only employees from the current department contribute to the aggregation.
  - **`Aggregate Operation`**: This operation dictates what action to perform. Options include:
    - **`Count`**: This simply tallies the number of records matching the expression.
    - **`Sum`**: It calculates the sum of values in the **`Aggregate Field`** (see below) for records fulfilling the expression.
    - **`Avg`**: It computes the average of values in the **`Aggregate Field`** (see below) for records satisfying the expression.
  - **`Aggregate Field`**: If the **`Aggregate Operation`** isn't **`Count`**, a field must be chosen to which the operation applies. In the example above, the selected field is **`salary`**.

### Custom validations

Custom validations enable the execution of intricate validations on the field, along with the use of services not available within field rules. In cases where the field is multi-valued, this validation will be triggered for each individual value. If you need to validate multiple values simultaneously, record validations should be employed.

For instance, consider a legacy service that utilizes an address validation service or the need to ensure a field value adheres to a specific pattern.

Here's the script's context:

  ---

  ##### Parameters

  |Name|Type|Description|
  |---|---|---|
  |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record that contains the field to validate.|
  |parentField|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This variable is exclusively accessible when the field is situated within a nested field. It operates based on the variable record or action, adhering to the same principles applicable to action parameters or entity fields.<br>The variable assumes the form of a **`sys.data.Record`** object. The key distinction is that the record's root is set to encompass the nested fields in which it resides. This configuration facilitates the retrieval of fields within the nested group. For instance, you can employ **`parentField.field('fieldA')`** as an alternative to **`record.field('nested.fieldA')`** or **`action.field('nested.fieldA')`**. This feature proves particularly valuable in cases involving multi-valued nested fields where index awareness might be absent.|
  |field|[sys.data.Wrapper]({{<ref "/dev-reference/scripting/sys-data.md">}})|The field wrapper to be validated. For more details on how to manipulate it, refer to the documentation for **`sys.data.Wrapper`**.|
  |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This variable will be available only if the field is an action parameter. It will provide access to other parameters, but keep in mind that they might be empty (except that they have an initial value set).|

  ##### Returns

  **`object`** - You should return an object representing the error, something like this:
  ```js
  {code: 'invalid', message: 'This is not a valid US zip code'}
  ```
  <br>

  Where **`code`** represents the error code. You can use any value that aligns with your context. This value will be included in the response when attempting to create/update a record through the REST API or as part of the exception information when saving a record using the JavaScript API.

  The **`message`** parameter corresponds to the text that will be showcased in the user interface. It will also be included in the response along with the **`code`**.

  When the field is considered valid, no response is required.

  ##### Samples

  ```js
  // validates the zip code using an expression
  var zipValue = field.val();
  if (zipValue && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipValue)) {
      return {code: 'invalid', message: 'This is not a valid US zip code'};
  }
  ```
  <br>

  ```js
  // validates the zip code using an external service
  var zipValue = field.val();
  if (!app.endpoints.addressValidator.isValidZipCode(zipValue)) {
      return {code: 'invalid', message: 'This is not a valid US zip code'};
  }
  ```
  <br>
  
  ---

## **Type rules**

In this section, you configure rules that are specific to the field's data type. For instance, a text field will have rules that limit the length of the value, while choice fields will define valid options.

There are three methods to define type rules:

- **`Custom`**: You manually define type rules for this field. To learn which rules are available for each data type, consult the [Types documentation]({{<ref "/dev-reference/field-types/overview.md">}}).
- **`Predefined`**: You can select one of the global type rules configured in the "App > Types" section of the app builder. Refer to [Global Type Settings]({{<ref "/dev-reference/app/global-type.md">}}).
- **`Field`**: You can reference an existing field within the entity and inherit its type rules. Consequently, if the type rules for the referenced field are altered, the rules for this field will be automatically updated.

## **General display options**

### Read-Only

This indicates when the field should be perpetually displayed in read-only mode.

Remember that this setting solely influences the UI. Consequently, although the field appears read-only, it can still be modified using the REST API or in another view where this flag isn't enabled.

For instance, consider the following fields:

- **`type`** (a choice field with options **`a`**, **`b`**, and **`c`**)
- **`subType`** (only editable if **`type`** is **`c`**)

In this scenario, you desire the **`subType`** field to be editable exclusively when **`type`** is set to **`c`**. Achieving this involves employing a read-only condition on the **`subType`** field.

Read-Only has the following options:

- **`Always`**: The field is consistently read-only.
- **`Script`**: If the script returns **`true`**, the field becomes editable; otherwise, it remains read-only. Here's the script's context:

    ---

    ##### Parameters

    |Name|Type|Description|
    |---|---|---|
    |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This record is linked to the ongoing operation. If the field resides within an entity field, this record corresponds to the container of that field.<br>In the case of a field serving as an action parameter, this record pertains to the execution of the action.|
    |parentField|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This variable is exclusively accessible when the field is situated within a nested field. It operates based on the variable record or action, adhering to the same principles applicable to action parameters or entity fields.<br>The variable assumes the form of a **`sys.data.Record`** object. The key distinction is that the record's root is set to encompass the nested fields in which it resides. This configuration facilitates the retrieval of fields within the nested group. For instance, you can employ **`parentField.field('fieldA')`** as an alternative to **`record.field('nested.fieldA')`** or **`action.field('nested.fieldA')`**. This feature proves particularly valuable in cases involving multi-valued nested fields where index awareness might be absent.|
    |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This variable is accessible solely when the field functions as an action parameter. It facilitates access to other parameters.|

    ##### Returns

    **`boolean`** - You should return **`true`** if there is access to the field, **`false`** otherwise.

    ##### Samples

    ```js
    // if 'numberOfExmployees' is bigger than 10, then this field is visible
    return record.field('numberOfEmployees').val() > 10;
    ```
    <br>
    
    ---

- **`Expression`**: The field becomes editable if the expression evaluates to `true`. Additional information is available in the [Expressions documentation]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).
- **`Never`**: The field will remain uneditable. This is the default option.

### Visible

If set to **`Never`**, the field won't be displayed even when included in the view. This flag proves valuable, eliminating the need to manually remove the field from managed views.

Remember that this setting solely influences the UI.

For example, consider the following fields:

- **`type`** (a choice field with options **`a`**, **`b`**, and **`c`**)
- **`subType`** (only visible if **`type`** is **`c`**)

In this instance, you want the **`subType`** field to exclusively appear when **`type`** is set to **`c`**. This can be accomplished through a visibility condition applied to the **`subType`** field.

Visibility has the following options:

- **`Always`**: The field is consistently visible. This is the default option.
- **`Script`**: If the script returns **`true`**, the field becomes visible; otherwise, it remains hidden. Here's the script's context:

    ---

    ##### Parameters

    |Name|Type|Description|
    |---|---|---|
    |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This record is linked to the ongoing operation. If the field resides within an entity field, this record corresponds to the container of that field.<br>In the case of a field serving as an action parameter, this record pertains to the execution of the action.|
    |parentField|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This variable is exclusively accessible when the field is situated within a nested field. It operates based on the variable record or action, adhering to the same principles applicable to action parameters or entity fields.<br>The variable assumes the form of a **`sys.data.Record`** object. The key distinction is that the record's root is set to encompass the nested fields in which it resides. This configuration facilitates the retrieval of fields within the nested group. For instance, you can employ **`parentField.field('fieldA')`** as an alternative to **`record.field('nested.fieldA')`** or **`action.field('nested.fieldA')`**. This feature proves particularly valuable in cases involving multi-valued nested fields where index awareness might be absent.|
    |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This variable is accessible solely when the field functions as an action parameter. It facilitates access to other parameters.|

    ##### Returns

    **`boolean`** - You should return **`true`**  if there is access to the field, **`false`** otherwise.

    ##### Samples

    ```js
    // if 'numberOfExmployees' is bigger than 10, then this field is visible
    return record.field('numberOfEmployees').val() > 10;
    ```
    <br>
    
    ---
- `Expression`: The field becomes visible if the expression evaluates to `true`. More details can be found in the [Expressions documentation]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).
- `Never`: The field will never be visible.

### Sorting

Indicates the sorting order for values:

- **`Oldest to Newest`**: Oldest values appear at the top, and new values are inserted at the bottom of the list. This is the default.
- **`Newest to Oldest`**: Newest values appear at the top, and new values are inserted at the top as well.

This option is only visible in fields with a multiplicity of **`Many`**.

### Pagination

Enabling this flag results in paginated values. This prevents excessive space usage on the form if the field contains numerous values, allowing users to fetch additional values as needed. The default page size is **`5`**.

This option is only visible in fields with a multiplicity of **`Many`**.

#### Page Size

When **`Pagination`** is enabled, this setting lets you define the number of values to display on each page. The default is `5`.

### Customize add button

Enabling this flag introduces additional options to customize the appearance of the "Add" button, used to add more values to the field.

This option is only visible in fields with a multiplicity of **`Many`**.

#### Text to append

When **`Customize Add Button`** is enabled, this setting determines the text appended to the button's label. For instance, setting this field to **`Note`** results in a button label of **`Add Note`** instead of just **`Add`**.

## **Label options**

### Show label

Indicates whether the label should be displayed. If the label is hidden, you can choose whether to indent the value using the **`Indent Value`** flag.

### Override label

Enabling this flag permits overriding the default label. This can be useful in specific views where a distinct label is desired.

### Indent value

If **`Show Label`** is not enabled, you can determine whether to indent the value. This flag controls this behavior.

## **Value options**

### Text alignment

Specifies text alignment for the read-only view. Possible values are **`Left`**, **`Center`**, or **`Right`**. Applicable to all data types except Nested Fields, File, Html, and Color.

### Help message

An informational message displayed when hovering over the information icon next to the field's label. Developers can utilize this to explain the field's purpose. Only visible during editing.

### Placeholder

Provides a brief hint describing the expected value of an input field.

### Prepend addon type

Allows inclusion of an addon (**`Text`** or **`Icon`**) on the left side of the input field. Available for text and numeric data types. Disabled by default.

### Prepend addon text

For **`Text`** addon type, specifies the text to add to the left side of the input field.

### Prepend addon icon

For **`Icon`** addon type, specifies the icon to add to the left side of the input field.

### Append addon type

Allows inclusion of an addon (**`Text`** or **`Icon`**) on the right side of the input field. Available for text and numeric data types. Disabled by default.

### Append addon text

For **`Text`** addon type, specifies the text to add to the right side of the input field.

### Append addon icon

For **`Icon`** addon type, specifies the icon to add to the right side of the input field.

## **Type display options**

In this section, you configure display options specific to the data type. Three methods are available:

- **`Custom`**: Manually define display options for this field. Refer to the [Types documentation]({{<ref "/dev-reference/field-types/overview.md">}}) for available options for each type.
- **`Predefined`**: Select a global display option configured in the "App > Types" section of the app builder. See [Global Type Settings]({{<ref "/dev-reference/app/global-type.md">}}).
- **`Field`**: Reference an existing field in the entity to inherit its display options. Changes to display options in the referenced field will automatically update this field.

## **Permissions**

Permissions determine which groups have access to the field. Permissions are enforced in both the UI and the REST API.

Here, access permissions for the field can be specified. Options include:

- **`Parent`**: Inherits permissions from the parent field. This is only available for fields within nested fields and is the default behavior.
- **`Read/Write`**: Users in this group can read and write to this field.
- **`Read Only`**: Users in this group can only read this field. If they attempt to modify the value during an update, the change will be silently discarded.
- **`None`**: Users in this group cannot read or write to this field. The field will be entirely omitted from both the UI and REST API.
- **`Advanced`**: Enables configuring read or write access separately, optionally based on record data using expression filters or scripts. This mirrors the capability of [Read/Write Access]({{<ref "/dev-reference/data-model-and-logic/fields.md#readwrite-access">}}) in fields.

When a new field is added to an entity, permissions are automatically set based on the group's access to the entity (**`Can Create`** or **`Can Edit`** set to **`Always`** or **`Condition`**). If there's only read access to the entity (**`Can Access`** set to **`Always`** or **`Condition`**), read-only access is granted to the field for that group. No permissions are automatically set otherwise.

For more information about permissions, refer to the [Groups documentation]({{<ref "/dev-reference/security/groups.md">}}).
