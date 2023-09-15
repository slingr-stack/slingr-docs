---
title: "Data events"
lead: "Describes how to define data events."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 10
---

You can define multiple rules. If at least one rule matches the event, the event will be considered matched.

All rules are applied to a single entity, indicated in the `Entity` field.

Each rule includes the following settings:

## **Event Types**

This represents the type of event the rule will match. Possible values include:

- **`On Record Created`**: Triggered when a record is created.
- **`On Record Changed`**: Triggered when a record is updated. Keep in mind that a record can be updated by various means, such as through the UI, an external app via the REST API, a background script, etc. Be cautious, as any change to the record triggers this event.
- **`On Record Deleted`**: Triggered when a record is deleted.
- **`On Action Performed`**: Triggered when an action is executed on a record.
- **`On Condition Met`**: Triggered when a record is changed in a way that satisfies the specified condition (see below), and this condition wasn't met before the record update. For instance, if the condition is that the **`type`** field must be **`a`**, when a record is updated and the **`type`** field changes from a different value to **`a`**, the event will be matched. However, if the record already had **`a`** in the **`type`** field, and it's updated without changing the value, the event won't be matched because the condition was already met in the previous version of the record.

## **Condition**

In addition to the event, you can define a set of conditions that must be met for the event to match. Options include:

- **`None`**: No conditions, so as long as the event is triggered, the rule will match.
- **`Expression`**: Define an expression that must evaluate to true for the event to match. For more information, refer to the [Expressions Documentation]({{<ref "/dev-reference/scripting/sys-data.md">}}).
- **`Script`**: Provide a script that must evaluate to true for the event to match.
Please replace the corresponding sections in your documentation with this corrected version.
  This is the context:

##### Parameters

|Name|Type|Description|
|---|---|---|
|record|[sys.data.Record]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}})|This is the current record affected by the event.|
|oldRecord|sys.data.Record|If the event is of type **`On record change`**, **`On action performed`** or **`On condition met`**, this variable will hold the version of the record before the event happened.|

##### Returns

**`boolean`** - Return **`true`** to execute the action, and **`false`** otherwise.

##### Samples

```js
// only match the event if the field 'type' was modifed
  
return record.field('type').val() != oldRecord.field('type').val();
```

## **Actions**

If the `Event` is set to `On Action Performed`, you can select a list of actions that can be matched.

Please note that only actions of type `One Record` can be chosen. Actions of type `Many Records` are not tied to any specific record and therefore cannot be used in this context.
