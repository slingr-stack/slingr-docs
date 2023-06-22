---
title: "Versions"
lead: "Describes how versioning of apps work."
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


When pushing changes there is a flag called `Backup version`. When this flag is set a backup of
the version being pushed will be created. This way you can restore that version from the section
`App > Versions` in the app builder.

Keep in mind that backups only contain metadata of the app. No data is saves in these backups.
Another thing to take into account is that when changes are synced to prod, a backup of the 
version is created automatically.

In the listing in `App > Versions` you will find the following information:

- `Number`: a unique number that identifies the version. It will be blue if the version was never
  synced to prod, yellow if it was synced to prod but it isn't the current version in prod, and green
  if it is the current version in prod.
- `Author`: the developer that pushed or synced changes.
- `Date`: the timestamp when the backup was created.
- `Sync date`: the timestamp when changes were synced.
- `Comments`: these are the comments written when pushing changes.
- `Prod version`: indicates if it is the current version in the production environment.

If you select one version you can do the following operations

- `View changes`: shows the changes done from the previous version to the selected one. These is
  the same summary you see when pushing changes.
- `Restore version`: when you use this operation, all app metadata in the builder will be restored
  to what was on that specific version. Remember that backups only contain metadata so this won't 
  restore any of the data (however refactorings could be applied to data based on the differences
  with the restored version).
  In order to see the restored version in execution, you should push changes and later sync those
  changes to see them in production.