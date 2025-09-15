---
title: "Slingr interaction"
description: "Detailed explanation of the slingr interaction component and its settings."
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

The `<slingr-interaction>` custom HTML tag allows developers to render a button or link that triggers an interaction within the current view.

### **Syntax**
```html
<slingr-interaction
  interaction="${interaction}"
  label="${label}"
  icon="${icon}"
  display-type="${displayType}"
  button-style="${buttonStyle}"
  default-params="${defaultInteractionParams}"
  auto-execute>
</slingr-interaction>
```

### **Attributes**
- **`interaction`**: (Required) Defines the interaction's name or ID to be triggered.
- **`label`**: (Required) The text label displayed on the interaction button or link.
- **`icon`**: (Optional) An icon displayed alongside the label.
- **`display-type`**: (Optional) Determines whether the interaction is shown as a button or a link. The default is `button`.
- **`button-style`**: (Optional) Specifies the visual style of the button. Applies only if `display-type` is set to `button`. Available values: `default`, `primary`, `secondary`, `success`, `danger`, `warning`, `info`.
- **`default-params`**: (Optional) A set of key-value pairs defining default values for the interaction's parameters when executed.
  *IMPORTANT*: this attribute must be passed using single quotes, as shown in the example below.
- **`auto-execute`**: (Optional) A boolean attribute. If present, the interaction will be executed immediately upon clicking the element, using the values provided in `default-params`. No modal will be shown.

### **Example**
```html
<slingr-interaction
  interaction="update"
  label="Update customer"
  default-params='{"customerName": "John Doe"}'
  auto-execute>
</slingr-interaction>
```
