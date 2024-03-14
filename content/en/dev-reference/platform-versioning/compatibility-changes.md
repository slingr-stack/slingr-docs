---
title: "Compatibility changes"
description: "List of platform changes that may affect apps compatibility"
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

### **Release 446**

#### Measure Unit of time in Javascript API

- **Change notice**: All methods that have time setting options will be updated to receive the parameter in milliseconds.
For example, the `ttl` option of the method `sys.data.lock`
- **Developer actions**: it requires to refactor methods that use another unit of time such as seconds, hours or days in app scripts.
- **Date of change**: this changes are planned for **April 2024** (Release 447).

### **Release 443**

#### History logs refactored to Audit logs

- **Developer actions**: history logs controllers have been refactored and will use the path /auditLogs. Check the docs here [audit logs]({{<ref "/dev-reference/data-model-and-logic/entities.md#auditLogs">}})
- **End of the feature**: history logs controllers will be permanently removed on **February 2024** (Release 443).

### **Release 441**

#### Raw mode in data Javascript API

- **Deletion notice**: `raw` mode in data Javascript API has been removed.
- **Developer actions**: it requires to refactor usages of `raw` mode in app scripts. The new `lite` mode requires to be used.

#### SLINGR Pro plan is replaced by the Enterprise plan

Apps with the SLINGR Pro plan are migrated to a new plan called enterprise. This new plan has a simplified way of billing with the format "Pay as you go".

- **Deletion notice**: the SLINGR Pro plan has been removed.
- **Developer actions**: no actions required.

#### Changes in OAuth Redirect URI
- **Developer actions**: it requires to update the OAuth redirect URI if [Google SSO](/dev-reference/security/single-sign-on/#google) is configured. This action should be taken in [Google Console portal](https://console.cloud.google.com/apis/credentials).

### **Release 440**

#### Simplified billing for apps

- **Deprecation notice**: the SLINGR Pro plan is deprecated. New plans with a simplified billing will be available
- **Developer actions**: it requires the owner of SLINGR Pro apps to change the subscription to a new plan.
- **End of the feature**: the SLINGR Pro will be permanently removed on **December 6, 2023** (release 441).

#### Free and Dev plan migration to personal plan

- **Deprecation notice**: The SLINGR Free and SLINGR Dev plans will no longer exist. They will be migrated to a basic plan called **personal** with a free trial of 14 days.
- **Developer actions**: After the migration, free apps will be sleeping, and it requires the owners of apps to wake it up.
- **End of the feature**: The SLINGR Free and Dev plans will be permanently removed on this release.

### **Release 439**

#### Raw mode in data Javascript API

- **Deprecation notice**: `raw` mode in data Javascript API is now deprecated.
- **Developer actions**: it requires to refactor usages of `raw` mode in app scripts. The new `lite` mode requires to be used.
- **End of the feature**: the `raw` mode in the data Javascript API will be permanently removed on **November 29, 2023** (Release 441).

