---
title: "Metadata history"
lead: "Describes how to review the changes made to a specific metadata resource"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 8
---

## **Metadata changes**

### Review changes

To review the changes made to a specific metadata resource, follow these steps:

👉 Navigate to the particular resource through the [navigation tree]({{<ref "/dev-reference/metadata-management/metadata-editor/app-resources.md">}}) or employ the [navigate metadata]({{<ref "/dev-reference/metadata-management/metadata-common/navigate-metadata.md">}}) feature.

👉 Once the view of the resource is open in the central panel, you will spot a **`tools`** button in the header. Click on this button to reveal two potential actions: **`show history`** and **`find usages`**.

👉 Select the **`show history`** option. This will open a history view in the central panel displaying the chronological record of changes associated with that specific resource.

### History view
The history view comprises two primary sections:

- **Top Section**: A table at the top that lists all the various changes made to the resource, organized by timestamp. Additional information such as the **`user`**, **`change type`**, and **`path`** of the metadata are also displayed. Clicking on any of these entries will unveil another table in the **`bottom section`**.
- **Bottom Section (1st Tab)**: In this section, you can peruse a comprehensive list of every property altered during the selected timestamp.
- **Bottom Section (2nd Tab)**: Switching to this tab, you can inspect an in-depth list of properties that have undergone **`automatic`** changes during the timestamp. These alterations are the outcome of platform-applied refactoring rules. For instance, creating a new field in an entity with existing [record views]({{<ref "/dev-reference/user-interface/record-views.md">}}) will result in an automatic creation of the new field in those record views.
