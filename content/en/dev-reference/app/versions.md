---
title: "Versions"
description: "Version management and backups"
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

During the process of pushing changes, a crucial flag comes into play: **`Backup version`**. Activating this flag results in the creation of a backup for the version being pushed. This backup can subsequently be restored from the **`App > Versions`** section within the app builder.

It's important to note that these backups exclusively encompass the app's metadata; data itself is not retained in these backups. Furthermore, when changes are synchronized to the production environment, an automatic backup of that version is generated.

Upon inspecting the **`App > Versions`** listing, the following information is presented:

- **`Number`**: A distinct numerical identifier for the version. This appears in blue if the version hasn't been synced to production, yellow if synced but not the current production version, and green if it is the current production version.
- **`Author`**: The developer responsible for pushing or syncing changes.
- **`Date`**: The timestamp of backup creation.
- **`Sync date`**: The timestamp of changes synchronization.
- **`Comments`**: Comments composed during the changes' push.
- **`Prod version`**: Indicates whether this version is the current one in the production environment.

Within the context of a specific version selection, the following operations can be performed:

- **`View changes`**: Offers insight into alterations made from the previous version to the chosen one. This mirrors the summary observed during changes' push.
- **`Restore version`**: Executing this action results in the app builder's metadata being reverted to the state of the selected version. It's important to recognize that backups encompass solely metadata; hence, data restoration doesn't occur. However, data refactorings could be applied based on disparities with the restored version.
  To witness the restored version in execution, pushing changes and subsequently syncing those changes are necessary for presentation in the production environment.