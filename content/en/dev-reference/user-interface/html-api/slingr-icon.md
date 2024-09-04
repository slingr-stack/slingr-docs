---
title: "Slingr icon"
description: "Detailed explanation of the slingr icon component and it's settings."
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

The `<slingr-icon>` custom HTML tag allows developers to easily insert icon elements into their web pages.

### **Syntax**

```html
<slingr-icon name="${name}" icon-style="${iconStyle}"></slingr-icon>
```

### **Attributes**

- **`name`**: (Required) Specifies the type of icon to display. This attribute determines which icon is rendered. For a list of possible icon values, refer to the **[icon reference guide]({{<ref "/dev-reference/miscellaneous/icons">}})**.
- **`icon-style`**: (Optional) Specifies the style of the icon. This attribute allows customization of the icon's appearance. Possible values include:

  - `default`
  - `primary`
  - `secondary`
  - `success`
  - `danger`
  - `warning`
  - `info`

### **Examples**

```html
<slingr-icon name="check" icon-style="success"></slingr-icon>
<slingr-icon name="close" icon-style="error"></slingr-icon>
<slingr-icon name="warning" icon-style="warning"></slingr-icon>
```
