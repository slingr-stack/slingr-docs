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
weight: 200
---

The Slingr team regularly updates the platform new features, bug fixes, and improvements. Some of those changes can affect the compatibility with your app.
It is important that developers pay attention to these changes.

# **Release 439**

## Raw mode in data Javacript API

### Deprecation notice
`raw` mode in data Javacript API is now deprecated.

### Developer actions
It requires to refactor usages of `raw` mode in app scripts. The new `lite` mode requires to be used.

### End of the feature
The `raw` mode in the  data Javacript API will be permanently removed on November 29, 2023 (release 441).

