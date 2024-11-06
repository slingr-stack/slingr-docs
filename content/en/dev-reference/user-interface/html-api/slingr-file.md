---
title: "Slingr file"
description: "Detailed explanation of the slingr file component and it's settings."
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

The `<slingr-file>` custom HTML tag is used to download or open a file. The content within this tag will be rendered as a hyperlink and styled similarly to the file fields.

### **Syntax**
```html
<slingr-file 
  entity="${entity}" 
  record-id="${recordId}" 
  file-id="${fileId}" 
  file-action="${fileAction}">
  ${content}
</slingr-file>
```

### **Attributes**
- **`entity`**: (Required) Specifies the name of the entity that the `record-id` belongs to.

- **`record-id`**: (Required) The unique identifier for the record associated with the file.

- **`file-id`**: (Required) The unique identifier for the file.

- **`file-action`**: (Optional) Specifies the interaction type for the file link. Possible values are:
  - `download`: Triggers a download of the file.
  - `open`: Opens the file in a new tab.
  
  If not specified, the default action is `download`.

- **`content`**: (Required) Refers to the content that will be displayed as the link. This can include text, icons, or any other HTML elements.

### **Examples**
```html
<!-- Download a file -->
<slingr-file 
  entity="companies" 
  record-id="636baa33a7a9e61b214a03e2" 
  file-id="60f5d0a2f1d7c91d5b63d14f" 
  file-action="download">
  <slingr-icon name="download"></slingr-icon> Download
</slingr-file>

<!-- Open a file -->
<slingr-file 
  entity="companies" 
  record-id="636baa33a7a9e61b214a03e2" 
  file-id="60f5d0a2f1d7c91d5b63d14f" 
  file-action="open">
  Open
</slingr-file>
```