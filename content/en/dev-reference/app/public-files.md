---
title: "Public files"
description: "Using Public Files in Your App"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 16
---

Certain scenarios require the upload of files that need to be accessible by anyone. A classic example is when you wish to include icons or images in emails.

Within the app builder, under **`App > Files`**, you have the capacity to upload files that can be accessed via a public URL. For instance, if you upload a file named **`logo.png`** into the **`images`** folder, you can retrieve it using the following URL:

```
https://<app>.slingrs.io/<env>/runtime/api/files/public/images/logo.png
```
<br>

Public files are a constituent of your app's metadata. This signifies that they are synchronized to the production environment. It's prudent to confine the usage of this space to relatively small files that might be required. Excessive reliance on this mechanism can potentially decelerate the process of syncing changes. For substantial files, such as videos, it's recommended to explore alternative storage services.

While every new app comes with three default folders (**`documents`**, **`images`**, and **`misc`**), you have the flexibility to organize files according to your specific requirements. This is achievable through the creation or modification of folders.