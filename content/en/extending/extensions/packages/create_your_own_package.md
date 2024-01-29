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

You have the ability to create your packages and  import them into your apps. Through this you can easily add prebuilt functionalities
to your apps. This is useful to replicate common business rules in many apps. The most common example is a package that helps to use the http
service and consume a specific external service.

The process of creating a new endpoint involves three fundamental steps:

1. **Package creation**: Design and set up your new package in git-hub repo.
2. **Package registration**: Register your developed package within the Slingr developer portal.
3. **Package installation**: Install the package in your app and test it.


## Package creation

The first thing you will need to do is creating a git-hub repo that will contain the new package data. We recommend you start the package creation by making a fork of the [skeleton-package](https://github.com/slingr-stack/sample-endpoint)  that contains a basic structure of a package already implemented.
and that you follow this [guide]({{<ref "/extending/extensions/packages/packages_features.md">}}).

## Package registration

Once the package has been implemented, it is required to register it on the platform so it is available to your apps or,
if you decide so, make it public so other people can also use it.

In the `Developer Portal`, in `Packages` section, developers are able to see the packages they can manage, allowing
to register new packages, update them or disable them.

When you register a new package, this is the information you need to provide:

- `Label`: the human-friendly name of the package.
- `Name`: the name you will give to the package. The name cannot be modified later and must be lower case and match with the name used in
  the package definition file (`package.json`).
- `Repository`: this will be the Git URL of the repository. The repository needs to be public, have as main branch `master` and at least one tag with a valid format. If it is private, today
  we only support GitHub repositories and you need to give read access to the repository to the user `slingr-builder`.
  The URL must be in `SSH` format like `git@github.com:workspace_id/repo_name.git`.
- `Folder`: in case the package is under one specific folder. In most cases will be empty.
- `Visibility`: this could be private or public. If it is public any app will be able to use it. If it is private, you
  will be able to indicate which apps can access the package and it will be available for them.

When you register a new package it is associated to the developer that registered it, but it is possible to transfer
the ownership to another account if needed through a tool available in the package edition section.

Once the package gets registered, you are able to update the available versions with an action in the developer portal. Every time a new tag
is pushed to the repo, the versions should be updated this way. You are not able to replace versions ofpackages. When ever new versions are desired you
need to create new versions of it.

It is possible to change the icon of the package in the details of the package. The icon requires to be: `PNG` format,
size `48x48px`.

It isn't possible to delete packages. You can disable them, which means that they cannot be used on any app any longer.

## Package installation

On new changes in the package you can update versions from the developer and then install the desired version in your application in the packages section.
For more info on how to use the pacakge you can see [packages]({{<ref "/dev-reference/data-model-and-logic/packages.md">}}) in the app documentation
