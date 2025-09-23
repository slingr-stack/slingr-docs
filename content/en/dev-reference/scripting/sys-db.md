---
title: "sys.db"
description: "Low-level JavaScript API to access the underlying MongoDB database, bypassing hooks and business logic."
date: 2025-09-09T00:00:00Z
lastmod: 2025-09-09T00:00:00Z
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 64
---

## Overview

The `sys.db` namespace provides low-level access to the application's underlying database (MongoDB). It bypasses hooks, validations, permissions, triggers, events, and higher-level abstractions from [`sys.data`]({{<ref "/dev-reference/scripting/sys-data.md">}}).

Use this API only when you explicitly need raw MongoDB behavior or performance characteristics. For most application logic you should prefer the high-level [`sys.data`]({{<ref "/dev-reference/scripting/sys-data.md">}}) API.

Important notes:
- Operations here are executed directly against MongoDB collections.
- No business logic or hooks are applied. You are responsible for data integrity, security, and consistency.
- Documents returned are plain JSON objects representing the stored MongoDB documents for that entity.


## Database record representation

When accessing records via `sys.db`, you interact with the raw MongoDB documents stored for each entity. In addition to your own fields, documents include system-managed fields. All business data must live under the `data` object.

System fields
- `_id`: Unique identifier of the document (MongoDB ObjectId or string, depending on configuration).
- `label`: Human-friendly label of the record, used in UIs and logs.
- `__label_lower_case__`: The record label in lowercase, used for case-insensitive searches and internal optimizations.
- `data`: Object that contains all the entity's fields (your app's schema). All business fields belong here.
  - Primitive and nested fields are stored under `data` (e.g., `data.name`, `data.budget`, `data.address.state`).
  - Relationship fields are objects with the following shape:
    - `_id`: The related record identifier.
    - `label`: The related record label.
    - `entityId`: Identifier of the related entity (not its name).
    - `availableFields`: A snapshot of selected fields from the related record (when configured), e.g., `{ active: true, type: "..." }`.
- `entity`: Metadata of the entity that owns this document:
  - `_id`: The entity identifier.
  - `name`: The entity name (collection name in the app context).

Full example (projects)
```json
{
  "_id": "5506fc44c2eee3b1a702695c",
  "data": {
    "company": {
      "_id": "5506fc43c2eee3b1a7026944",
      "label": "ABC",
      "entityId": "5506fc3cc2eee3b1a7025c16",
      "availableFields": {
        "active": true,
        "type": "COMPANY_TYPE1",
        "address": { "state": "CO" }
      }
    },
    "name": "Secure Connection Project",
    "description": "Create a super secure connection between planets",
    "numberOfPeople": 15,
    "budget": 4500,
    "status": "DONE",
    "closedBy": {
      "_id": "5506fc3cc2eee3b1a7025c07",
      "label": "User1 Test1",
      "entityId": "5eab2ed43db32570fd47f2a2",
      "availableFields": {}
    },
    "pendingTasks": 0
  },
  "label": "Secure Connection Project",
  "__label_lower_case__": "secure connection project",
  "entity": {
    "_id": "5506fc3cc2eee3b1a7025c18",
    "name": "projects"
  }
}
```

Notes
- Always query and update business fields under `data`, e.g., `{"data.status": "DONE"}` or `{ $set: { "data.numberOfPeople": 10 } }`.
- System fields (`label`, `__label_lower_case__`, `entity`) are needed to support the app UI and internal operations.
- Relationship fields store lightweight references plus optionally copied fields in `availableFields`. Do not assume `availableFields` is always present or complete.
- Respect this structure to avoid invalid records and unexpected behavior in the app runtime.


## Cursors returned by sys.db.query

Some methods return a wrapped cursor that supports synchronous-style iteration:
- `hasNext()` → boolean: Whether more documents are available.
- `next()` → object: Returns the next document.
- `toArray()` → object[]: Returns all remaining documents.
- `count()` → number: Count of documents that match the query.
- `close()` → void: Closes the cursor and frees resources.

Example usage:
```javascript
let cursor = sys.db.find(
  "projects",
  { $or: [{ "data.status": "DONE" }, { "data.numberOfPeople": { $gte: 10 } }] },
  { sort: { "data.name": 1 }, limit: 10 }
);

while (cursor.hasNext()) {
  let user = cursor.next();
  // process user
}

// Or fetch all at once
const usersArray = cursor.toArray();
```


## API Reference

### find(entityName, mongoQuery, options)
Performs a MongoDB `find` on the specified entity collection and returns a cursor.

Parameters
- `entityName` (string, required): The name of the entity (collection).
- `mongoQuery` (object, required): MongoDB query filter.
- `options` (object, optional): MongoDB find options, such as `limit`, `skip`, `sort`, `projection`.

Returns
- Cursor wrapper supporting: `hasNext()`, `next()`, `toArray()`, `count()`, `close()`.

Sample
```javascript
let cursor = sys.db.find("projects",
  { $or: [{ "data.status": "IN_PROGRESS" }, { "data.pendingTasks": { $gt: 0 } }] },
  { sort: { "data.name": 1 }, limit: 10 }
);

while (cursor.hasNext()) {
  const user = cursor.next();
  // ...
}

const usersArray = cursor.toArray();
```

---

### count(entityName, mongoQuery)
Returns the count of documents matching the filter.

Parameters
- `entityName` (string, required)
- `mongoQuery` (object, required)

Returns
- `number`: Count of matching documents.

Sample
```javascript
let count = sys.db.count("projects", {
  $or: [
    { "data.status": "DONE" },
    { "data.pendingTasks": { $gt: 0 } }
  ]
});
```

---

### aggregate(entityName, mongoPipeline)
Executes an aggregation pipeline on the entity collection.

Parameters
- `entityName` (string, required)
- `mongoPipeline` (object[], required): MongoDB aggregation stages.

Returns
- `object[]`: Aggregation result documents.

Sample
```javascript
let results = sys.db.aggregate("projects", [
  { $match: { "data.status": "DONE" } },
  { $group: { _id: "$data.company._id", totalBudget: { $sum: "$data.budget" } } }
]);

for (let result of results) {
  // each result has _id = company id and totalBudget for DONE projects
}
```

---

### insert(entityName, record, options)
Inserts a single document into the entity’s collection.

Parameters
- `entityName` (string, required)
- `record` (object, required): JSON representation of the document to insert.
- `options` (object, optional): MongoDB options like `ordered`, `bypassDocumentValidation`, `writeConcern`.

Returns
- `object`: `{ insertedId }`

Sample
```javascript
const projectDoc = {
  data: {
    company: {
      _id: "5506fc43c2eee3b1a7026944",
      label: "ABC",
      entityId: "5506fc3cc2eee3b1a7025c16",
      availableFields: {
        active: true,
        type: "COMPANY_TYPE1",
        address: { state: "CO" }
      }
    },
    name: "Secure Connection Project",
    description: "Create a super secure connection between planets",
    numberOfPeople: 15,
    budget: 4500,
    status: "DONE",
    closedBy: {
      _id: "5506fc3cc2eee3b1a7025c07",
      label: "User1 Test1",
      entityId: "5eab2ed43db32570fd47f2a2",
      availableFields: {}
    },
    pendingTasks: 0
  },
  label: "Secure Connection Project",
  __label_lower_case__: "secure connection project",
  entity: { name: "projects" }
};

const result = sys.db.insert("projects", projectDoc);
// result.insertedId contains the new _id
```

Notes
- If `_id` is omitted, MongoDB will create one.
- Hooks and validations are not executed. System fields are handled automatically by the platform and their calculation is optimized to avoid extra overhead.

---

### insertMany(entityName, records, options)
Inserts multiple documents.

Parameters
- `entityName` (string, required)
- `records` (object[], required)
- `options` (object, optional): MongoDB options like `ordered`, `bypassDocumentValidation`, `writeConcern`.

Returns
- `object`: `{ insertedCount, insertedIds }`

Sample
```javascript
const docs = [
  {
    data: {
      name: "Project Alpha",
      description: "Alpha project",
      numberOfPeople: 5,
      budget: 2000,
      status: "IN_PROGRESS",
      pendingTasks: 3
    },
    label: "Project Alpha",
    __label_lower_case__: "project alpha",
    entity: { name: "projects" }
  },
  {
    data: {
      name: "Project Beta",
      description: "Beta project",
      numberOfPeople: 12,
      budget: 8000,
      status: "DONE",
      pendingTasks: 0
    },
    label: "Project Beta",
    __label_lower_case__: "project beta",
    entity: { name: "projects" }
  }
];
const result = sys.db.insertMany("projects", docs, { ordered: false });
```

---

### update(entityName, record, options)
Updates a single existing document identified by its `_id`. The provided `record` must include `_id`. Fields present in `record` will be set; depending on implementation this may be a partial update or a replacement (check your platform behavior). If you need full MongoDB update operators, use `updateMany` or `bulkWrite`.

Parameters
- `entityName` (string, required)
- `record` (object, required): Must include `_id`.
- `options` (object, optional): MongoDB options like `upsert`, `writeConcern`.

Returns
- `object`: `{ matchedCount, modifiedCount, upsertedId }`

Sample
```javascript
const updatedProject = {
  _id: "5506fc44c2eee3b1a702695c",
  data: {
    name: "Secure Connection Project",
    description: "Create a super secure connection between planets",
    numberOfPeople: 16, // updated
    budget: 5000, // updated
    status: "DONE",
    pendingTasks: 0
  },
  label: "Secure Connection Project",
  __label_lower_case__: "secure connection project",
  entity: { name: "projects" }
};
const result = sys.db.update("projects", updatedProject);
```

---

### updateMany(entityName, mongoUpdateQuery, options)
Updates multiple documents using a standard MongoDB update query object of the form `{ filter, update }`.

Parameters
- `entityName` (string, required)
- `mongoUpdateQuery` (object, required): `{ filter: <MongoDB filter>, update: <update ops> }`
- `options` (object, optional): MongoDB options like `upsert`, `writeConcern`.

Returns
- `object`: `{ matchedCount, modifiedCount, upsertedCount, upsertedId }`

Sample
```javascript
const result = sys.db.updateMany(
  "projects",
  { filter: { "data.status": "IN_PROGRESS" }, update: { $set: { "data.status": "DONE" } } },
  { upsert: false }
);
```

---

### delete(entityName, id)
Deletes a single document by its `_id`.

Parameters
- `entityName` (string, required)
- `id` (string, required)

Returns
- `object`: `{ deletedCount }`

Sample
```javascript
const result = sys.db.delete("projects", "5506fc44c2eee3b1a702695c");
```

---

### deleteMany(entityName, mongoQuery, options)
Deletes multiple documents based on a MongoDB filter.

Parameters
- `entityName` (string, required)
- `mongoQuery` (object, required)
- `options` (object, optional): MongoDB options like `collation`, `writeConcern`.

Returns
- `object`: `{ deletedCount }`

Sample
```javascript
const result = sys.db.deleteMany("projects", {
  "data.status": "CANCELLED",
  "data.pendingTasks": { $eq: 0 }
});
```

---

### bulkWrite(entityName, operations, options)
Performs multiple write operations in a single bulk operation on the specified collection.

Parameters
- `entityName` (string, required)
- `operations` (object[], required): Array of operations: `insertOne`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`, `replaceOne`.
- `options` (object, optional): MongoDB options like `ordered`, `writeConcern`, `bypassDocumentValidation`.

Returns
- `object`: `{ insertedCount, matchedCount, modifiedCount, deletedCount, upsertedCount, upsertedIds, insertedIds, result }`

Sample
```javascript
const result = sys.db.bulkWrite(
  "projects",
  [
    {
      insertOne: {
        document: {
          data: { name: "Project Gamma", description: "Gamma project", numberOfPeople: 8, budget: 3000, status: "IN_PROGRESS", pendingTasks: 5 },
          label: "Project Gamma",
          __label_lower_case__: "project gamma",
          entity: { name: "projects" }
        }
      }
    },
    {
      updateOne: {
        filter: { "data.name": "Project Beta" },
        update: { $set: { "data.pendingTasks": 0 } }
      }
    },
    {
      deleteMany: {
        filter: { "data.status": "ARCHIVED" }
      }
    }
  ],
  { ordered: false }
);
```


## Best practices and cautions
- Prefer `sys.data` for business logic, hooks, validations, permissions, and consistency.
- Validate inputs carefully when using raw MongoDB filters and updates to avoid injection or unintended writes.
- Consider indexes and query performance; `sys.db` executes directly against collections.
- Always close cursors (`cursor.close()`) if you are not exhausting them with `toArray()`.
