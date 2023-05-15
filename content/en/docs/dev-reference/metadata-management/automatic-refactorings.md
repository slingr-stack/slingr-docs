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
---

As explained in [Development Process]({{site.baseurl}}/app-development-development-process.html),
Slingr tries to make it as easy as possible to follow agile methodologies when developing
your apps. One of the things that helps on that side are automatic refactorings, because they allow
to evolve your app a lot easier.

Basically, when you make changes in your app, we will try to propagate those changes as much as
possible so you don't need to manually go over many places changing things. Here are some samples
of automatic refactorings:

- If you add a new field to an entity, the field will be added to all managed views automatically.
- If you delete a field, it will be removed from all views and actions.
- If you rename a field, it will be renamed everywhere, even in the database.
- If you sort fields in your entity, they will be sorted in managed views.

The goal of all these automatic refactorings is to save time to developers when making changes to
apps.
 
Keep in mind that not everything will be refactored. For example scripts aren't refactored. It's
on the roadmap, but not there yet!

Refactorings can be grouped in two categories: metadata refactorings and data refactorings. They
are explained in more detail in the following sections.

- **Metadata refactorings**: these are the refactorings that affect metadata only. For example
  a field is deleted and it is removed automatically from all views as soon as you delete it.
- **Data refactorings**: these are refactorings that affect the data. For example you rename a
  field and all records in that entity get refactored to rename the field. These refactorings
  happen when pushing or syncing changes.

## Metadata refactorings

These are refactorings that, as the name suggests, propagate changes to the metadata of the app.
For example if fields are sorted in an entity, managed views will be automatically refactored to
follow the new order of fields.

These refactorings are applied as soon as changes are done in the app builder (of course, they
won't be visible until you push changes). So following the above example, as soon as fields as
sorted, the refactoring on views will be done. This means that if you go and open the views in
the app builder you will see the new order of fields there.

## Data refactorings

These refactorings, on the other side, will make changes in the data of the app. For example an
entity is deleted, so all records in that entity will be removed from the database.

As changes are only available in the runtime, these refactorings will happen when changes are 
pushed or synced.

Keep in mind that some changes could produce metadata refactorings as well as data refactorings.
For example if you delete a field, metadata referencing that field will be refactored and records
of that entity will be refactored as well to remove the deleted field.

Here is a list of changes that would cause data refactorings:

- Adding a required field that has a default value
- Adding a calculated field
- Renaming a field, which is changing the name; changing the label won't cause any refactoring
- Removing a field
- Changing copied fields in a relationship field
- Changes in type rules that affect what's stored in the database
- Changing the calculation of a field
- Deleting an entity
- Renaming an entity
- Setting a field as unique or indexable (an index will be created)
- Remove the unique or indexable flag to a field (an index will be removed)
- Adding, modifying or removing an index

If these changes are applied over entities with a lot of records be aware that it could take a
while and your app will be down during that period of time.