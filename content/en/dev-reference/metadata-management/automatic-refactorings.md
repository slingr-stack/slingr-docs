---
title: "Automatic refactorings"
lead: "Details about how automatic refactorings work and how they are applied."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 12
---

As detailed in the [Development Process]({{<ref "/dev-reference/metadata-management/development-process.md">}}), Slingr simplifies the adoption of agile methodologies for app development. Automatic refactorings are an instrumental feature in this regard, greatly facilitating the evolution of your app.

When you introduce changes to your app, we strive to propagate these changes systematically, minimizing the need for manual adjustments across multiple areas. The following are examples of automatic refactorings:

- **`Field Addition`**: If you add a new field to an entity, the field will be automatically integrated into all managed views.
- **`Field Deletion`**: When a field is deleted, it will be seamlessly removed from all views and actions.
- **`Field Renaming`**: Should you rename a field, the change will be applied universally, including the database.
- **`Field Sorting`**: Sorting fields within an entity will trigger the same sorting in managed views.

The primary objective of these automatic refactorings is to expedite development by reducing the need for manual adjustments.

It's essential to note that not all aspects can be refactored automatically. For instance, scripts are not currently included in these automatic refactorings, although this is on our roadmap for future development.

Refactorings can be classified into two categories: metadata refactorings and data refactorings, which are elucidated further in the subsequent sections.

### Metadata refactorings

Metadata refactorings encompass changes that exclusively influence the metadata of the app. For instance, if fields are reordered within an entity, managed views will be automatically adjusted to match the new field order.

These refactorings take effect immediately after changes are made in the app builder (although they won't be visible until changes are pushed). Following the aforementioned example, once the fields are reordered, the views will be automatically reconfigured. Consequently, upon opening the views in the app builder, the new field arrangement will be evident.

### Data refactorings

Conversely, data refactorings result in modifications to the app's data. For example, if an entity is deleted, all records associated with that entity will be purged from the database.

Since changes are only accessible at runtime, data refactorings occur during the process of pushing or synchronizing changes.

It's crucial to be aware that certain changes can trigger both metadata and data refactorings simultaneously. Deleting a field, for instance, will prompt the refactoring of metadata references to that field, as well as the adjustment of records to remove the deleted field.

Here is a list of changes that trigger data refactorings:

- Adding a required field with a default value
- Introducing a calculated field
- Renaming a field (changing the name, not the label)
- Deleting a field
- Modifying copied fields within a relationship field
- Adjustments to type rules that impact stored data
- Altering field calculation logic
- Deleting an entity
- Renaming an entity
- Setting a field as unique or indexable (leading to index creation)
- Removing the unique or indexable flag from a field (resulting in index removal)
- Adding, modifying, or removing an index

If these changes are applied to entities with substantial record counts, be aware that the process may take some time and your app will be temporarily unavailable during this period.