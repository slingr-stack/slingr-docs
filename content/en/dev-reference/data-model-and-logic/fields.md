---
title: "Fields"
lead: "Explanation of the features available for fields."
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

Fields are the smallest unit of data in Slingr apps. They are mainly used to define the
structure of entities, but they are also used in other places like parameters in actions.

The most important property of a field is the type, as it will define the available options,
rules, display options, UI for editing and reading, etc. [You can find more information
about types here]({{site.baseurl}}/app-development-types-overview.html).

Settings for fields can be organized in this way:

- **Basic settings**: these are basic settings that all fields need. They indicate the
  name, label, type and multiplicity. All these settings are required.
- **Rules**: these settings affect how value is validated and how it is stored in the
  database. For example if you set a field as sensitive the value will be encrypted in
  the database and won't be logged. It could also be something specific for the type, like
  the minimum and maximum value of an integer field.
  - **General rules**: these are settings shared by all types. Some of them might not be
    available to some specific types though.
  - **Type rules**: these are specific for the type. Each type will define different
    rules. For example the text type has rules to define the minimum and maximum length
    of the string.
- **Display options**: display options, in contrast with rules, do not affect validation
  of values and how they are stored in the database. They only change how the field will
  be displayed in the UI.
  - **General display options**: these general settings affect how the field is rendered
    in the UI, but do not affect the value at all. For example you can define how the
    label should look like, if value has to be indented, etc., but won't say anything about
    how values of the field are displayed.
  - **Type display options**: these settings affect how the value is rendered. For example
    for a relationship field it is possible to indicate if the reference should be displayed
    as a link or, during edition, if you want to use a dropdown or boxes to pick a new
    value.
    
To know more about type-specific settings, please check the [Types]({{site.baseurl}}/app-development-types-overview.html) 
documentation.

## Basic settings

### Label

This is the human-readable name of the field. This is what will be displayed in the UI
when rendering the field.

It can be override using display options in case you need to show something different
in some specific places.

### Name

This is the internal name of the field and it will be used in the REST and Javascript 
APIs, as well as in the database when it is a field inside an entity.

The name cannot contain special characters or spaces. Only letters and numbers.

One thing to keep in mind is that changing the name of the field could have some side
effects:

- **Database**: if the field was used inside an entity, a data refactoring will be
  triggered when changes are pushed or synced. If the entity had a lot of records this
  renaming could take a while.
- **REST API**: if external apps were using this field through the REST API, these apps
  will need to be updated as the field name will be different.
- **Scripts**: if there were scripts in the app referencing this field in queries or
  fetching its value, those scripts need to be updated manually. In the near feature
  there will be tools to help on these cases.

### Type

The type of the field indicates what can be stored in that field as well as how the field
will be rendered. Each type has its own rules and display options.

To know which types are available and their features, please check the 
[Types]({{site.baseurl}}/app-development-types-overview.html) documentation.

If you change the type of a field, when pushing or syncing changes the app will try to
automatically convert existing values to the new type. The rule during conversions is 
that the original value will be converted to its string representation, and the new type
will try to parse that string representation. If the parsing fails, the value will be 
set to `null`.

It is important to notice that changing the type of the field might have side effects:

- **Database**: if the field was used inside an entity, it is possible that a data refactoring
  will be triggered when changes are pushed or synced. This is to convert the value to
  the new type.
- **REST API**: if external apps were using this field through the REST API, these apps
  might need to be updated because the format of the field might have changed. For example if
  the field types was changed from integer to text, the REST API will return a string instead of
  a number.
- **Scripts**: if there were scripts in the app referencing this field it might be needed to
  update the them if it was using things specific for that type, like wrapper features.

### Multiplicity

Indicates if the field can hold one or many values. For example you might have a field
called `emails` that can hold many email addresses in case the user has more than one.

You can change the multiplicity of an existing field and the app will refactor existing
records automatically. If a field is changed from single-valued to multi-valued, existing 
value will be set as the first value in the field. On the other hand, if the multiplicity
is changed from multi-valued to single-valued, only the first value will be kept, discarding 
any additional value of the field.

It is important to notice that changing the multiplicity of the field might have side effects:

- **Database**: if the field was used inside an entity, a data refactoring will be triggered 
  when changes are pushed or synced. This is to change the structure.
- **REST API**: if external apps were using this field through the REST API, these apps
  will need to be updated because the structure of the field will change.
- **Scripts**: if there were scripts in the app referencing this field it will be needed to
  update the them if it they were assuming some multiplicity.

## General rules

### Default value

It is possible to define a default value that will be set to the field. There are different rules
based on where the field stands:

- **Entity field**: the default value will be set only when creating a new record, which means it
  won't have any effect when editing an existing record.
- **Action's parameter**: the default value will be set only if the parameter is empty.

Usually changing this settings doesn't trigger any refactoring and only affects new records. However
if the field is also set as required or this is a new field field we are adding, a refactoring could 
be trigger where it will set the default value for all records where this field is empty or added.

Default value could be set in two ways:

- `Value`: a fixed value could be selected as the default value.
- `Script`: in this case you can provide a script to calculate the default value. This is the
  context of the script:

{{< js_script_context context="requiredScript">}}

### Required

This flag allows to set a field as required. When a field is required it must have a value. The value
could be set explicitly or it can use the default value. If a value is not provided for the field and
it doesn't have a default value either, then a validation error will be thrown when trying to save
the record.

Possible options for the required flag are:

- `Always`: the field will always be required.
- `Script`: the field will be required if the evaluation of the script returns `true`. This is the
  context for the script:

{{< js_script_context context="nestedFieldsLabelScript">}}


- `Expression`: the field will be required if the expression evaluates to `true`. You can find more
  information in the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).
- `Never`: the field will never be required. This is the default value.

### Unique

This flag indicates if the value should be unique for all records in the entity. If it set, then
the app will enforce this validation.

Empty values won't be taken into account when checking if it is unique. This means there could be
many records with this field empty.

Enabling this flag will create an index with this field.

Keep in mind that the flag can be enabled even when there are duplicated values in existing record.
You should take care of them manually.

### Indexable

If this flag is set, an index will be created for the field. This could be useful to improve performance in 
cases where you need to query using this field and there are a lot of records in the entity.

Remember that the creation of indexes has some overhead on creates, updates, and deletes, as well on storage
space, so you should make sure that setting the indexable flag is something that is really needed.

Except you know beforehand which entities are going to have lots of records and you know how you are going 
to query the data, we recommend to start without indexes and add them as performance issues are noticed.

### Transient

If this flag is set, values won't be stored in the database. However you can still do things with values
in these fields during the processing of the record. For example if you have a listener when records are
created, in the script of the listener you can use the value of this field to do something.

### Sensitive

If this flag is set, additional care will be taken when handling the data on these fields:

- When we log data sent by users, we will mask fields set as sensitive data.
- We will store these fields encrypted on the database.
- When syncing data from prod to a different environment, we will obfuscate the data in these fields.

This flag can be used together with the transient one. For instance, it makes no sense avoid storing 
the credit card in the database if we are logging it on plain text. In this case, when you set both flag, 
data will be masked on logs and won't be stored nor synced.

Marking a field as sensitive has some limitations though:

- Filtering only work for text fields and you have to search by exactly the same text (no partial matching).
- Sorting won't work these fields.

### Read/write access

Indicates when the field can be read and written. For example let's suppose you have the following fields:

- `type` (choice field with options `a`, `b`, and `c`)
- `subType` (only visible if `type` is `c`)

In this case you want field `subType` to only show up when `type` is `c`, which can be achieved using a
read/write access condition on the field `subType`.
 
If you need to define different access rules to read and write, you can uncheck the flag `Sync read/write`
an you will be able to define a different condition for read and write. This is not a common use case,
but might be needed.

Read/write access has the following options:

- `Always`: the field is always accessible.
- `Script`: if the script returns `true` the field will be accessible, otherwise it won't be accesible.
  This is the context of the script:

{{< js_script_context context="readWriteAccessScript">}}


- `Expression`: the field will be accessible if the expression evaluates to `true`. You can find more
  information in the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).
- `Never`: the field will never be accessible. This makes sense only when you uncheck the flag 
  `Sync read/write` and you set this option to either read or write.

It is worth highlight that controlling access here is different than doing it through permissions. In this
case rules will be applied to all users and there is no way to skip this rules, even from script. On the
other side, permissions do not apply for developers and system users, and they are ignored in scripts as
well.

### Calculated value

Some types allow to make the field calculated, which means the field will have a value calculate from
other data and the user won't be able to set it manually.

There are two ways of calculating a value:

- `Script`: in this case you can provide a script to calculate the value. This is the context of the script:


{{< js_script_context context="readWriteAccessScript">}}


- `Aggregate`: in this case you can calculate a value based on an aggregate query on other records. For
  example you have a an entity `departments` and then `employees` with a field named `salary`. If you
  want to have the average salary for each department you could add a field where the calculation is an
  aggregation over the entity `employees` for records with the field `department` pointing to the record
  of the field being calculated and doing an average over the field `salary`. This aggregation will be
  updated automatically whenever a salary changes or an employee is added or removed from the department.
  So when the calculation is `Aggregate` you are able to select the following options:
  - `Aggregate entity`: the entity that contains the records that have to be aggregate. In the example
    above it would be the `employees` entity.
  - `Expression`: this is the expression that records in the `Aggregate entity` have to match to be included
    in the aggregation. In the example above the expression was by field, where `Current record` was equals
    to the `department` field. This way only employees for the current department are going to be included
    in the aggregation.
  - `Aggregate operation`: this is the operation that will be performed. It could be:
    - `Count`: it just counts the number of records matching the expression.
    - `Sum`: it sums the values in the `Aggregate field` (see below) of the records matching the expression.
    - `Avg`: it performs an average of the values in the `Aggregate field` (see below) of the records 
      matching the expression.
  - `Aggregate field`: if the `Aggregate operation` is different than `Count` then a field needs to be selected
    to apply the operation on it. In the sample above the field is `salary`.

### Custom validations

Custom validations allow to perform more complex validations over the field and using other services that are not available in fields rules. If
the field is multi-valued, this validation will be called for each value. If you need to validate many values at the same time you should use record validations.

For example you might have an endpoint for an address validation service that you can use to validate addresses, or you just want to make sure that the value of a field needs to match some specific pattern.

This is the context of the script:

{{< js_script_context context="fieldValidationsScript">}}


## Type rules

In this section you configure rule that are type-specific. For example a text field will have rules to
restrict the length of the value while choice fields will define which option are valid.

There are three ways to set type rules:

- `Custom`: you manually set type rules for this field. You should check the documentation
  for [Types]({{site.baseurl}}/app-development-types-overview.html) to see what rules are available 
  for each type.
- `Predefined`: you can select one of the global type rules configured in the section `App > Types`
  of the app builder. See [Global type settings](app-development-app-types.html).
- `Field`: you can point to an existing field in the entity and use the same type rules. This way
  if type rules are modified in the referenced field, they will be automatically updated on this
  field.

## General display options

### Read-only

Indicates when the field can be displayed always as read-only.

Keep in mind this is just a UI setting, so the field will be still writable
using the REST API or in another view with this flag unset.
 
For example let's suppose you have the following fields:

- `type` (choice field with options `a`, `b`, and `c`)
- `subType` (only editable if `type` is `c`)

In this case you want field `subType` to only show up as editable when `type` is `c`, which can be achieved using a
read only condition on the field `subType`.
 
Read Only has the following options:

- `Always`: the field is always read only.
- `Script`: if the script returns `true` the field will be editable, otherwise it will be read only.
  This is the context of the script:

{{< js_script_context context="readWriteAccessScript">}}

- `Expression`: the field will be editable if the expression evaluates to `true`. You can find more
  information in the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).
- `Never`: the field will be editable. Default option.


### Visible

If this is set as `Never`, even when the field is in the view, the field won't be displayed. This flag is
useful so you don't need to go to managed views an remove the field manually. 

Keep in mind this is just a UI setting.
 
For example let's suppose you have the following fields:

- `type` (choice field with options `a`, `b`, and `c`)
- `subType` (only visible if `type` is `c`)

In this case you want field `subType` to only show up when `type` is `c`, which can be achieved using a
visible condition on the field `subType`.
 
Visible has the following options:

- `Always`: the field is always visible. Default option.
- `Script`: if the script returns `true` the field will be visible, otherwise it will be read only.
  This is the context of the script:

{{< js_script_context context="readWriteAccessScript">}}



- `Expression`: the field will be visible if the expression evaluates to `true`. You can find more
  information in the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).
- `Never`: the field will never be visible.

### Sorting

Indicated how sorting values should be sorted. Options are:

- `Oldest to newest`: oldest values will be at the top and new values will be inserted at the bottom of
  the list. This is the default.
- `Newest to oldest`: newest values will be at the top and new values will be inserted at the top as well.

Only visible in fields with multiplicity `Many`.

### Pagination

If this flag is enabled, values will be paginated. This way if the field has many values it won't take
a lot of space in the form, letting the user to fetch more values as needed. You can configure the page
size which is `5` by default.

Only visible in fields with multiplicity `Many`.

#### Page size

When the flag `Pagination` is enabled, here you will be able to indicate the number of values to show
on each page. The default is `5`.

### Customize add button

If this flag is set additional options will show up to customize how the `Add` button used to add 
more values to the field should look like.

Only visible in fields with multiplicity `Many`.

#### Text to append

If `Customize add button` is enabled, this option indicates the text that will be appended to the button's
label. For example if you put `Note` in this field, the button will have the label `Add Note` instead of
just `Add`.

## Label options

### Show label

Indicates if the label has to be displayed. If the label is not displayed you could choose between
indenting the value or not using the flag `Indent value`.

### Override label

If this flag is set it is possible to override the default label, which could be useful in
some views where you want the label to be different.

### Indent value

If the flag `Show label` is not set, then you can decide if the value has to be indented, which
is what this flag indicates.

## Value Options

### Text Alignment

Indicates text alignment for read only view. Its possible values are `Left`, `Center` or `Right`.
It is available for all data types excepting Nested Fields, File, Html and Color. 

### Help Message

An information message that will be shown while hovering the information icon next to the field's label,
giving the developer the opportunity to explain what the field is for. Just it is visible on edition time.

### Placeholder

The placeholder specifies a short hint that describes the expected value of an input field.

### Prepend addon type

Allow include an addon (`Text` or `Icon`) in left side of the input field. This feature is available for text and numeric
 data types. By default is disabled or equals to `None` 

### Prepend addon text

If addon type is `Text` here specify the text to be added to left side of the input field.

### Prepend addon icon

If addon type is `Icon` here specify the icon to be added to left side of the input field.

### Append addon type

Allow include an addon (`Text` or `Icon`) in right side of the input field. This feature is available for text and numeric
 data types.  By default is disabled or equals to `None` 

### Append addon text

If addon type is `Text` here specify the text to be added to right side of the input field.

### Append addon icon

If addon type is `Icon` here specify the icon to be added to right side of the input field.

## Type display options

In this section you configure display options that are type-specific. There are three ways
to set display options:

- `Custom`: you manually set display options for this field. You should check the documentation
  for [Types]({{site.baseurl}}/app-development-types-overview.html) to see what options are available 
  for each type.
- `Predefined`: you can select one of the global display options configured in the section `App > Types`
  of the app builder. See [Global type settings](app-development-app-types.html).
- `Field`: you can point to an existing field in the entity and use the same display options. This way
  if display options are modified in the referenced field, they will be automatically updated on this
  field.

## Permissions

Permissions indicate which groups have access to the field. As in other cases, permissions are enforced in 
the UI as well as in the REST API.

Here it is possible to indicate access permissions for the field. Options are:

- `Parent`: permissions of the parent field will be taken. This is only available for fields inside nested fields and 
  it is the default.
- `Read/Write`: users of this group will be able to read and write this field.
- `Read Only`: users of this group will only be able to read this field. If they try to change the value in an
  update, the value will be silently discarded.
- `None`: users of this group won't be able to either read or write this field. The UI and REST API won't show
  this field at all.
- `Advanced`: allows to configure read or write access separately and optionally based on record data
  through expressions filters or scripts (in the same way as you can do with 
  [Read/Write Access]({{site.baseurl}}/app-development-model-fields.html#readwrite-access) in field).

When a new field is added to an entity, if a group has update access to the entity (`Can Create` or `Can Edit` are 
set to `Always` or `Condition`), the field is given read-write permission for that group by default. If there is only 
read access to the entity (`Can Access` is set to `Always` or `Condition`), read-only access is given to the field in 
that group. Otherwise no permissions are set automatically.
 
For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).

