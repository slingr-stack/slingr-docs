---
title: "Public files"
lead: "Description of public files and how they can be used."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

There are cases where you need to upload files that need to be accessible by anyone.
For example you have an icon or images you want to send in emails.

In the app builder under `App > Files` you can upload files that can be accessed through
a public URL. For example if you upload a file `logo.png` at the `images` folder, you will
be able to get it with this URL:

```
https://<app>.slingrs.io/<env>/runtime/api/files/public/images/logo.png
```

Public files are part of the metadata of the app. This means that they will be synced to
production. It is recommended to only put there small files you might need, otherwise
this will slowdown syncing changes. If you need to upload big files like videos, please
use other storage services.

Although new apps will have three folders by default (`documents`, `images` and `misc`) you
can organize files as you need by creating or changing folders.