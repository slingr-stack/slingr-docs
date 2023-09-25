---
title: "Database and storage"
description: "Explains the database statistics in the app monitor"
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

In the App Monitor's "Database" section, you'll find comprehensive insights into your app's data statistics and the tools to perform essential maintenance operations. This section is invaluable for managing your app's database effectively.

## **Database information**

At the top of the page, you'll find essential information about your data:

- **`Total Database Size`**: This represents the total storage space used by your database, considered for billing and plans.

- **`App Storage`**: The space allocated to your app's data, including records within your entities, associated indexes, and historical logs.

- **`System Storage`**: This portion of the database is dedicated to system-related information such as logs, jobs, indexes, and more.

### Entities

The list of entities provides detailed information on each entity:

- **`Total Data Size`**: This indicates the overall space used by records within the entity, including associated indexes.

- **`Data Size`**: The space used solely by records within the entity, excluding indexes.

- **`Entries Count`**: Displays the total number of records stored in the entity.

- **`Indexes Size`**: Represents the space used by indexes associated with the entity.

- **`Number of Indexes`**: Indicates the total number of indexes configured for the entity.

- **`Percentage Relative to Data`**: This provides insight into how much space the entity occupies compared to the total database size.

By clicking on an entity, you can access more detailed information, including index statuses and two critical operations:

- **`Refresh Relationships`**: Use this operation if your relationship fields become outdated. Running this action updates relationship fields across all records within the entity.

- **`Refresh Calculated Fields`**: When your calculated fields contain outdated values, use this operation. It updates calculated fields across all records within the entity.

### Performance

The "Performance" section is dedicated to monitoring slow queries. This is crucial if you're experiencing performance issues in your app. You can identify which operations are consuming more time and make informed decisions about creating indexes or making adjustments to enhance your app's performance.

### Tools

Under the "Tools" section, you'll find maintenance utilities for your database:

- **`Repair Database`**: Trigger this option to initiate cleanup tasks that can resolve unusual behaviors in your app. For instance, if you notice discrepancies in record counts within an entity, using this tool might rectify the issue.

## **Files information**

At the top of the page, you'll find data on your app's files:

- **`Total Files Size`**: This is the cumulative space occupied by both public and private files.

  - **`Private Files`**: These files reside in file fields within your app. Learn more about the "File" field type [here]({{<ref "/dev-reference/field-types/references/file.md">}}).

  - **`Public Files`**: These files can be managed within the app builder. To learn more about public files, refer to the [Public Files documentation]({{<ref "/dev-reference/app/public-files.md">}}).