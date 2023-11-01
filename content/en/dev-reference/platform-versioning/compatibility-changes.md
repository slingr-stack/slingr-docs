---
title: "Compatibility changes"
description: "List of platform changes that may affect compatibility"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 158
---

The Slingr team regularly updates the platform new features, bug fixes, and improvements. Some of those changes can affect the compatibility with your app.
It is important that developers pay attention to these changes.

### **Release 440**

#### Simplified billing

- **Deprecation notice**: the SLINGR Pro plan is deprecated and free apps will no longer exists. Free apps will be migrated to a basic plan called personal with a free trial.
- **Developer actions**: it requires the owner of SLINGR Pro apps to change to a new plan.
- **End of the feature**: the SLINGR Pro will be permanently removed on **December 05, 2023** (release 442).

### **Release 439**

#### Raw mode in data Javacript API

- **Deprecation notice**: `raw` mode in data Javacript API is now deprecated.
- **Developer actions**: it requires to refactor usages of `raw` mode in app scripts. The new `lite` mode requires to be used.
- **End of the feature**: the `raw` mode in the  data Javacript API will be permanently removed on **November 29, 2023** (release 441).

