---
title: "Data steps"
lead: "Describes how to use the data steps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "steps"
toc: true
weight: 88
---

## **Create record**

##### General info

Category | Description |
--- | --- |
**`Data`** | This step generates a new record instance within the database.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Entity|entity|yes|Always|Entity to create a new record instance.
Data|dataBody|yes|Always|Data to be used to create record.

##### Outputs

Name | Type | Description
---|---|---
createRecord|record|Create record instance.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/create_record.png" alt="Create record flow step image">
  <figcaption>The flow begins, and the "create record" step generates a new record. Following this, the execution concludes with the "end" step. Should an error occur during the record creation process, the error will be logged, and the execution will terminate.</figcaption>
</figure>

## **Delete data**

##### General info

Category | Description |
--- | --- |
**`Data`** | This step deletes data from the specified entity.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Entity|entity|yes|Always|The entity to delete data.
Query|query|no|config.entity|The query used to filter records to be deleted.
Wait task to finish|boolean|no|Always|Flag to set if the deletion should wait for the job to finish.

##### Outputs

Name | Type | Description
---|---|---
taskId|text|The task ID in charge of the execution of the deletion.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/delete_data.png" alt="Delete data flow step image">
  <figcaption>The flow initiates, and the "delete data" step removes data from an entity. Subsequently, the execution concludes with the "end" step. If any errors arise during the data deletion process, they will be logged, and the execution will be terminated.</figcaption>
</figure>

## **Delete record**

##### General info

Category | Description |
--- | --- |
**`Data`** | This step deletes the specified record.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Record|record|yes|Always|The record instance to be deleted.

##### Outputs

Name | Type | Description
---|---|---
deletedRecord|record|The deleted record.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/delete_record.png" alt="Delete record flow step image">
  <figcaption>The flow initiates, and the "delete record" step deletes a specific record. Subsequently, the execution concludes with the "end" step. If any errors occur during the record deletion process, they will be logged, and the execution will be terminated.</figcaption>
</figure>


## **Execute action on data**

##### General info

Category | Description |
--- | --- |
**`Data`** |This step performs an action on the records returned by a query.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Entity|entity|yes|Always|The entity to which the actions belongs.
Action|entityAction|yes|Always|The action to be executed
Query|query|yes|config.entity|A filter used to identify the records on which to execute the action.
Data|dataBody|no|Always|Precise data to be transmitted to the action.
Wait task to finish|boolean|no|Always|A flag to indicate whether the action should wait for the task to finish.

##### Outputs

Name | Type | Description
---|---|---
taskId|text|The task ID in charge of the execution of the action.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/execute_action_on_data.png" alt="Execute action on data flow step image">
  <figcaption>The flow begins, and the "execute action on data" step executes actions on the identified records. Subsequently, the execution concludes with the "end" step. If an error occurs during the action execution, the error will be logged, and the execution will be terminated.</figcaption>
</figure>



## **Execute action on record**

##### General info

Category | Description |
--- | --- |
**`Data`** |This step performs an action on one record|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Entity|entity|yes|Always|The entity to which the actions belongs.
Action|entityAction|yes|Always|The action to be executed.
Record|record|yes|Always|The record to be modified by the action.
Data|dataBody|no|Always|Precise data to be transmitted to the action.

##### Outputs

Name | Type | Description
---|---|---
actionResult|object|A record or a custom response, depending on the action's configuration.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/execute_action_on_record.png" alt="Execute action on record flow step image">
  <figcaption>The flow initiates, and the "execute action on record" step performs actions on a record. Subsequently, the execution concludes with the "end" step. In the event of an error during the action execution, the error will be logged, and the execution will terminate.</figcaption>
</figure>

## **Execute global action**

##### General info

Category | Description |
--- | --- |
**`Data`** |This step executes an action at the entity level, which implies that the action does not require any parameters to specify affected records.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Entity|entity|yes|Always|The entity to which the actions belongs.
Action|entityAction|yes|Always|The action to be executed.
Data|dataBody|no|Always|Precise data to be transmitted to the action.
Wait task to finish|boolean|no|Always|A flag to indicate whether the action should wait for the task to finish.

##### Outputs

Name | Type | Description
---|---|---
taskId|text|The task ID in charge of the execution of the action.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/execute_global_action.png" alt="Execute global action flow step image">
  <figcaption>The flow begins, and the "execute global action" step executes an action at the entity level. Subsequently, the execution concludes with the "end" step. If an error occurs during the action execution, the error will be logged, and the execution will be terminated.</figcaption>
</figure>


## **Find data**

##### General info

Category | Description |
--- | --- |
**`Data`** |This step retrieves data using a specified query.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Entity|entity|yes|Always|The entity to which the data belongs.
Query|query|no|config.entity|The query used to filter records

##### Outputs

Name | Type | Description
---|---|---
recordsResultSet|resultSet|A collection of records that can be iterated through.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/find_data.png" alt="Find data flow step image">
  <figcaption>The flow initiates, and the "find data" step conducts a search for data using a query. Following this, the retrieved data is logged, and the execution concludes with the "end" step.</figcaption>
</figure>



## **Find record**

##### General info

Category | Description |
--- | --- |
**`Data`** |This step retrieves a record using a specified query.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Entity|entity|yes|Always|The entity to which the data belongs.
Query|query|no|config.entity|The query used to filter records

##### Outputs

Name | Type | Description
---|---|---
resultRecord|record|The record instance that matches the filtering.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/find_record.png" alt="Find record flow step image">
  <figcaption>The flow begins, and the "find record" step searches for a specific record using a query. Subsequently, the located record is logged, and the execution concludes with the "end" step.</figcaption>
</figure>

## **Find record by Id**

##### General info

Category | Description |
--- | --- |
**`Data`** |This step retrieves a record using it ID.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Entity|entity|yes|Always|The entity to which the data belongs.
Record ID|text|yes|Always|ID of the record.

##### Outputs

Name | Type | Description
---|---|---
resultRecord|record|The record instance.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/find_record.png" alt="Find record flow step image">
  <figcaption>The flow begins, and the "find record by id" step searches for a specific record by its unique identifier. Following this, the identified record is logged, and the execution is finalized with the "end" step.</figcaption>
</figure>

## **Lock record**

##### General info

Category | Description |
--- | --- |
**`Data`** |Acquires a lock for a specified record. This method is recommended when multiple threads attempt to access the same record, especially in scenarios involving concurrent execution of listeners or actions.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Record|record|yes|Always|The record instance to be locked.

##### Outputs

No configuration required.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/lock_record.png" alt="Find record by id flow step image">
  <figcaption>The flow initiates, and the "lock" step obtains a lock for a specified record to prevent any listener or action from altering the record while we perform subsequent actions. Following this, the "update record" step modifies the record's data, and these changes are saved using the "save record" step. Subsequently, a success message is logged with the "logger" step, and the execution concludes with the "end" step.<br>In the event that the lock cannot be acquired, an error message will be logged using the "logger" step.</figcaption>
</figure>

## **Update record**

##### General info

Category | Description |
--- | --- |
**`Data`** |This step manipulates a record, applying changes to it and storing these modifications in the database, effectively making the changes permanent.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Record|object|yes|Always|The record instance to be saved into the database after applying changes.
Data|dataBody|yes|Always|Data to be used to update record.

##### Outputs

Name | Type | Description
---|---|---
updatedRecord|record|The updated record instance.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/update_record_and_save.png" alt="Update record flow step image">
  <figcaption>The flow begins, and the "update record" step modifies the data of a record. Subsequently, the changes are saved by the "save record" step, and the execution concludes with the "end" step. If an error occurs, it will be logged, and the execution will be terminated.</figcaption>
</figure>

## **Save record**

##### General info

Category | Description |
--- | --- |
**`Data`** |This step saves a record in the database, rendering the changes made to it permanent.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Record|object|yes|Always|The record instance to be saved into the database after applying changes.

##### Outputs

Name | Type | Description
---|---|---
savedRecord|record|The saved record instance.

##### Sample

<figure>
  <img src="/slingrDoc/images/vendor/flows/update_record_and_save.png" alt="Update record flow step image">
  <figcaption>The flow begins, and the "find record by id" step searches for a specific record by its unique identifier. Following this, the identified record is logged, and the execution is finalized with the "end" step.</figcaption>
</figure>