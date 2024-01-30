---
title: "Create your own package"
description: "Here you will find information to create your own package."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "packages"
toc: true
weight: 1
---

You have the capability to create your packages and import them into your apps. Through this, you can easily incorporate prebuilt functionalities into your apps. This is particularly useful for replicating common business rules across multiple apps. A common example is a package that facilitates the use of the HTTP service and the consumption of a specific external service.

The process of creating a new package involves three fundamental steps:

1. Package Creation: Design and set up your new package in a GitHub repository.
2. Package Registration: Register your developed package within the Slingr developer portal.
3. Package Installation: Install the package in your app and test it.

## Package creation

The first step is to create a GitHub repository that will contain the new package data. We recommend starting the package creation by forking the skeleton-package,
which already implements a basic package structure. Check out this [document]({{<ref "/extensions/packages/packages-features.md">}}) for all the features of packages you should follow.

## Package registration

Once the package has been implemented, it is necessary to register it on the platform to make it available for your apps or, if you choose, make it public for others to use.

In the Developer Portal under the Packages section, developers can manage packages, enabling them to register new packages, update existing ones, or disable them.

When registering a new package, provide the following information:

- `Label`: the human-friendly name of the package.
- `Name`:  The name you will give to the package. The name cannot be modified later and must be in lowercase, matching the name used in the package definition file (package.json).
- `Repository`: this will be the Git URL of the repository. The repository needs to be public, have as main branch `master` and at least one tag with a valid format. If it is private, today
  we only support GitHub repositories and you need to give read access to the repository to the user `slingr-builder`.
  The URL must be in `SSH` format like `git@github.com:workspace_id/repo_name.git`.
- `Folder`: in case the package is under one specific folder. In most cases will be empty.
- `Visibility`: this could be private or public. If it is public any app will be able to use it. If it is private, you
  will be able to indicate which apps can access the package and it will be available for them.

When a new package is registered, it is associated with the developer who registered it. However, it is possible to transfer ownership to another account through a tool available in the package edition section.

After registration, you can update available versions in the Developer Portal. Every time a new tag is pushed to the repo, update the versions this way.
It is not possible to replace versions of packages; for new versions, create new versions.

You can change the icon of the package in the package details. The icon must be in `png` format, size `48x48px.

It is not possible to delete packages; you can disable them, meaning they cannot be used in any app.
## Package installation

For new changes in the package, update versions from the developer and then install the desired version in your application's packages section. For more information on using the package, refer to [packages]({{<ref "/dev-reference/data-model-and-logic/packages.md">}}) in the app documentation.
