---
title: "Slingr action"
description: "Detailed explanation of the slingr action component and it's settings."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "html-api"
toc: true
weight: 50
---

The `<slingr-action>` custom HTML tag allows developers to render a button or link that triggers an action within the application. This tag is highly versatile, supporting actions on single records, multiple records, or even global entity actions.

## **One Record**

Render the action associated with a single record.

### **Syntax**
```html
<slingr-action
  entity="${entity}"
  action="${entityAction}"
  record-id="${recordId}"
  label="${label}"
  icon="${icon}"
  display-type="${displayType}"
  button-style="${buttonStyle}"
  defaultParams="${defaultActionParams}">
</slingr-action>
```

### **Attributes**
- **`entity`**: (Required) Specifies the entity name or ID.
- **`action`**: (Required) Specifies the action name or ID.
- **`record-id`**: (Required) Provides the unique ID of the record to which the action will be applied.
- **`label`**: (Required) The label for the action button or link.
- **`icon`**: (Optional) The icon for the action button or link.
- **`display-type`**: (Optional) Specifies whether the action should be displayed as a button or a link. Default is a button.
- **`button-style`**: (Optional) Specifies the style of the button. Only applicable if `display-type` is set to "button". Possible values include `default`, `primary`, `secondary`, `success`, `danger`, `warning`, `info`.
- **`defaultParams`**: (Optional) A set of key-value pair to specify default values for action parameters.


### **Example**
```html
<slingr-action
  entity="customer"
  action="update"
  record-id="60f5d0a2f1d7c91d5b63d14f"
  label="Customers"
  defaultParams="'customerName': 'John'}">
</slingr-action>
```

## **Many Records**

Render the action that applies to multiple records.

### **Syntax**
```html
<slingr-action
  entity="${entity}"
  action="${entityAction}"
  record-ids="${recordIds}"
  label="${label}"
  icon="${icon}"
  display-type="${displayType}"
  button-style="${buttonStyle}"
  defaultParams="${defaultActionParams}">
</slingr-action>
```

### **Attributes**
- **`entity`**: (Required) Specifies the entity name or ID.
- **`action`**: (Required) Specifies the action name or ID.
- **`record-ids`**: (Required) Comma-separated list of record IDs that the action will be executed on.
- **`label`**: (Required) The label for the action button or link.
- **`icon`**: (Optional) The icon for the action button or link.
- **`display-type`**: (Optional) Specifies whether the action should be displayed as a button or a link. Default is a button.
- **`button-style`**: (Optional) Specifies the style of the button. Only applicable if `display-type` is set to "button". Possible values include `default`, `primary`, `secondary`, `success`, `danger`, `warning`, `info`.
- **`defaultParams`**: (Optional) A set of key-value pair to specify default values for action parameters.


### **Example**
```html
<slingr-action
  entity="customer"
  action="bulkUpdate"
  record-ids="60f5d0a2f1d7c91d5b63d14f,60f5d0a2f1d7c91d5b63d150"
  label="Customers"
  defaultParams="'customerName': 'John'}">
</slingr-action>
```

---

## **Global Entity**

Render an action without specifying the affected data (global action).

### **Syntax**
```html
<slingr-action
  entity="${entity}"
  action="${entityAction}"
  label="${label}"
  icon="${icon}"
  display-type="${displayType}"
  button-style="${buttonStyle}"
  defaultParams="${defaultActionParams}">
</slingr-action>
```

### **Attributes**
- **`entity`**: (Required) Specifies the entity name or ID.
- **`action`**: (Required) Specifies the action name or ID.
- **`label`**: (Required) The label for the action button or link. Overrides the default label of the entity action.
- **`icon`**: (Optional) The icon for the action button or link. Overrides the default icon of the entity action.
- **`display-type`**: (Optional) Specifies whether the action should be displayed as a button or a link. Default is a button.
- **`button-style`**: (Optional) Specifies the style of the button. Only applicable if `display-type` is set to "button". Possible values include `default`, `primary`, `success`, `danger`, `warning`, etc.
- **`defaultParams`**: (Optional) A set of key-value pair to specify default values for action parameters.


### **Example**
```html
<slingr-action
  entity="payments"
  action="checkStatus"
  label="Payments"
  defaultParams="'amount': '500'}">
</slingr-action>
```