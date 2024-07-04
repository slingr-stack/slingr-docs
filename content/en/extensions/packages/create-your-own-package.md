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
weight: 2
---

You have the capability to create your packages and import them into your apps. This is particularly useful for reusing components across multiple apps. A common example is a package that facilitates the use of an external service's API.

The process of creating a new package involves three fundamental steps:

1. **Package development**: design and set up your new package in a Git repository.
2. **Package registration**: register your developed package within the Slingr developer portal.
3. **Package installation**: install the package in your app and test it.

## Package development

The first step is to create a Git repository that will contain the new package.
We recommend starting the package by forking the [`skeleton-package`](https://github.com/slingr-stack/skeleton-package),
which already implements the basic structure.
Check out this [document]({{<ref "/extensions/packages/package-development.md">}}) to better understand how to develop a new package.

## Package registration

Once the package has been developed, it is necessary to register it on the platform to make it available for your apps or, and if you want, make it public for others to use.

In the developer portal under the `Packages` section, developers can manage packages, enabling them to register new packages, update existing ones, or disable them.

When registering a new package, provide the following information:

- `Label`: the human-friendly name of the package.
- `Name`:  the name you will give to the package. The name cannot be modified later and must be in lowercase, matching the name used in the package descriptor file (`package.json`).
- `Repository`: this will be the Git URL of the repository. The repository needs to be public, have as main branch `master` and at least one tag with a valid format. If it is private, today we only support GitHub repositories, and you need to give read access to the repository to the user `slingr-builder`. The URL must be in `SSH` format like `git@github.com:workspace_id/repo_name.git`.
- `Folder`: in case the package is under one specific folder of the repo. In most cases will be empty.
- `Visibility`: this could be private or public. If it is public, any app will be able to use it. If it is private, you
  will be able to indicate which apps can access the package, and it will be available only for them.

When a new package is registered, it is associated with the developer who registered it. However, it is possible to transfer ownership to another account through a tool available in the package edition section.

After registration, you can update available versions in the developer portal. Versions of packages are managed through Git tags. The first tag of the repo must point to the master branch of the repo.

It is not possible to replace versions of packages; for new versions, create new tags/versions.

You can change the icon of the package in the package details. The icon must be in `png` format, size 48x48px.

It is not possible to delete packages; you can disable them, meaning they cannot be used in any app.

## Package installation

Finally, to use the package in your apps, you should install it. For more information on using packages, refer to [packages]({{<ref "/dev-reference/data-model-and-logic/packages.md">}}) in the app documentation.
