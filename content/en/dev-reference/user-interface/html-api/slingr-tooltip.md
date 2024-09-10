---
title: "Slingr tooltip"
description: "Detailed explanation of the slingr tooltip component and it's settings."
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

The `<slingr-tooltip>` custom HTML element enables developers to add tooltips over the content of their web applications. This tag allows for the display of additional information when a user hovers over a specific area, enhancing the user experience by providing contextual details.

### **Syntax**
```html
<slingr-tooltip message="${message}" position="${position}">
  ${content}
</slingr-tooltip>
```

### **Attributes**
- **`message`**: (Required) Specifies the text content of the tooltip. This can include plain text or HTML for more complex content.

- **`position`**: (Optional) Specifies the position of the tooltip relative to the target element. The tooltip can be displayed in one of the following positions:
  - `top`
  - `right`
  - `bottom`
  - `left`

  If not specified, the default position is `bottom`.
  
- **`content`**: (Required) Refers to the content of the tooltip trigger, which is the hoverable area. When the user hovers over this content, the tooltip becomes visible.

### **Examples**
```html
<slingr-tooltip message="This is a tooltip" position="top">
  Hover over me
</slingr-tooltip>

<slingr-tooltip message="Another tooltip" position="right">
  Hover over me too
</slingr-tooltip>
```