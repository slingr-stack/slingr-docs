---
title: "Slingr link"
description: "Detailed explanation of the slingr link component and it's settings."
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

The `<slingr-link>` custom HTML tag enables users to navigate to different views within the application, open views in new tabs, or display views in modal dialogs.

### **Syntax**
```html
<slingr-link
  view="${view}"
  record-id="${recordId}"
  target="${target}"
  params='${params}'>
  ${content}
</slingr-link>
```

### **Attributes**
- **`view`**: (Required) The ID or name of the view to navigate to. You can also provide the ID of the collection and then configure the view-type to determine which view to render.

- **`view-type`**: (Optional) Specifies the type of view to redirect to. It is only required when a link with an `href` is needed. Possible values include:
  - `create`
  - `edit`
  - `readOnly`

- **`record-id`**: (Optional) Provides the unique ID of the record to be opened in the specified view. This attribute is necessary only when the view type requires a record, such as in read-only or edit views.

- **`target`**: (Optional) Determines how the view is opened. Possible values include:
  - `self`: Opens the view in the same tab. (Default)
  - `new`: Opens the view in a new tab.
  - `modal`: Opens the view in a modal dialog. (Only applicable for Record views)

- **`params`**: (Optional) A JSON string representing the parameters to be sent to the view. These parameters are transformed into URL query parameters and can be used to:
  - Apply filters in grid or workflow views.
  - Send specific parameters to custom views.

- **`content`**: (Required) The content that will be displayed as the link. This can include text, icons, or other HTML elements.

### **Examples**
```html
<!-- Open view in a new tab -->
<slingr-link view="reports" target="new">
  Open Reports <slingr-icon name="report"></slingr-icon>
</slingr-link>

<!-- Render a link with the posibility of open it in a new tab -->
<slingr-link 
  view="settings"
  view="66d205700e3a1a0ef9ebfcf0" Collection view ID
  view-type="readOnly"
  record-id="636baa33a7a9e61b214a03e2" 
>
  Open Report details <slingr-icon name="eye"></slingr-icon>
</slingr-link>

<!-- Navigate to view with parameters within the same tab -->
<slingr-link 
  view="dashboard" 
  target="self" 
  params='{"name":"ACME","address.state":"new"}'>
  Go to Dashboard <slingr-icon name="dashboard"></slingr-icon>
</slingr-link>
```