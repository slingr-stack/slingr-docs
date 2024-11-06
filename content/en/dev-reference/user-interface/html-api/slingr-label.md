---
title: "Slingr label"
description: "Detailed explanation of the slingr label component and it's settings."
date: 2024-11-06T13:59:39+01:00
lastmod: 2024-11-06T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "html-api"
toc: true
weight: 50
---

The `<slingr-label>` custom HTML tag allows developers to easily insert a label element into their web pages.

### **Syntax**

```html
<slingr-label label-style="${labelStyle}" text="${content}"></slingr-label>
```

### **Attributes**

- **`text`**: (Required) This is the text that we will be displaying inside the label.
- **`label-style`**: (Optional) Specifies the style of the label. This attribute allows customization of the icon's appearance. Possible values include:

  - `default`
  - `primary`
  - `secondary`
  - `success`
  - `danger`
  - `warning`
  - `info`

### **Examples**

```html
<slingr-label label-style="primary" text="Slingr"></slingr-label>
<slingr-label label-style="danger" text="Stopped"></slingr-label>
<slingr-label label-style="warning" text="Errors found"></slingr-label>
```
