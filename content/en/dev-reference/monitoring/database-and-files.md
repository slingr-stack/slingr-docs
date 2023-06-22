---
title: "Database and storage"
lead: "Explains the database statistics in the app monitor"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 152
---

In app monitor in section `Database` it is possible to see some statistics about your data as
well perform some maintenance operations.

## Database information

At the top the following information about your data will be displayed:

- **Total database size**: this is the total amount of space used by your database. This is the
  space taken into account for billing and plans.
- **App storage**: the space used by you app data, which is basically records in your entities,
  indexes associated to those entities and history logs.
- **System storage**: this is the space in the database used by system information like logs,
  jobs, indexes, etc.

### Entities

The list of entities shows the following information:

- **Total data size**: the total space used by records of the entity, including indexes.
- **Data size**: the space used by records of the entity, without indexes.
- **Entries count**: the number of records in the entity.
- **Indexes size**: the space used by indexes in the entity.
- **Number of indexes**: the number of indexes in the entity.
- **Percentage respect to data**: the relative usage of space of this entities against the whole 
  size of the database.
  
Additionally if you click on an entity you will be able to see more details as well as information
of indexes, where you can check their status and see if there was a problem creating them. Also will
see two operations:

- `Refresh relationships`: this is in case some relationship fields get out dated. Running this
  action will go through all the records in the entity updating relationship fields it might have.
- `Refresh calculated fields`: if some calculated field have old values, you can run this action
  that will go through all the records in the entity and will update calculated fields.

### Performance

Here you can see information about slow queries. This is important if you notice performance issues
in your app as you can find out which operations are taking more time and help you decide which
indexes have to be created or what needs to be changed in your app.

### Tools

Here you will find some maintenance tools for the database:

- **Repair database**: triggers some clean up tasks that could help to fix some odd behaviors in
  the app. If you see weird things like the number of records is incorrect in an entity, try this
  tool to fix your problem.

## Files information

At the top of the page there is one field called `Total files size`. This is the amount of space
used in public and private files.

Private files are those that are in file fields. See field type [File]({{site.baseurl}}/app-development-type-file.html))
for more information.

Public files are the ones that can be managed in the app builder. See [Public files]({{site.baseurl}}/app-development-app-public-files.html) 
for more information.