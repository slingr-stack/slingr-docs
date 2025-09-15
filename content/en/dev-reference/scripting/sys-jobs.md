---
title: "sys.jobs"
description: "Describes utilities in the Javascript API to handle background jobs."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 69
---

## **sys.jobs**

The **`sys.jobs`** package contains a set of methods to manage and handle background jobs within the system.

###  findById(id)

Finds a background job by its unique identifier (ID).

##### Parameters

Name|Type|Required|Description
---|---|---|---
id|string|yes|ID of the job.

##### Returns

[sys.jobs.Job](#sysjobsjob) - The job object or **`null`** if not found.

##### Exceptions

**badRequest**

This exception is raised if **`id`** provided is invalid.

##### Samples

``` javascript
// executes an action in the background and finds the job for it
var jobId = sys.data.executeAction('companies', {type: 'a'}, 'logSomething', {param1: 'a', param2: 'b'});
var job = sys.jobs.findById(jobId);
log('job: '+job.name());
```
<br>

###  find(query)

Finds jobs using a query. A query looks like this:

```js
var query = {};
query['status'] = 'FINISHED';
query['_size'] = 50;
```

##### Parameters

Name|Type|Required|Description
---|---|---|---
query|object|yes|The query to filter jobs.

<br>

When working with job handling methods, you can use the following parameters for filtering and retrieving specific jobs:

- **`type`** (string, multiple values allowed): Specifies the type of job. You can specify multiple types separated by commas. The valid job types you can use in your code are:
  - **`IMPORT_RECORDS`**
  - **`EXPORT_RECORDS`**
  - **`EXECUTE_ACTION`**
  - **`DELETE_RECORDS`**
  - **`EXECUTE_LISTENER`**
  - **`IMPORT_USERS`**
  - **`EXPORT_USERS`**
  - **`STOP_APP`**
  - **`START_APP`**
  - **`DEPLOY_ENDPOINT`**
  - **`UNDEPLOY_ENDPOINT`**

- **`status`** (string, multiple values allowed): Indicates the status of the job. You can specify multiple statuses separated by commas. Valid status values include:
  - **`PENDING`**
  - **`RUNNING`**
  - **`FINISHED`**
  - **`STOPPING`**
  - **`STOPPED`**
  - **`CANCELED`**

- **`startFrom`** (timestamp in milliseconds): Filters jobs based on the date they started. You can use it in combination with **`startTo`** to specify a date range or use it alone to filter jobs started on or after the specified date.

- **`startTo`** (timestamp in milliseconds): Filters jobs based on the date they started. You can use it in combination with **`startFrom`** to specify a date range or use it alone to filter jobs started on or before the specified date.

- **`endFrom`** (timestamp in milliseconds): Filters jobs based on the date they ended. You can use it in combination with **`endTo`** to specify a date range or use it alone to filter jobs ended on or after the specified date.

- **`endTo`** (timestamp in milliseconds): Filters jobs based on the date they ended. You can use it in combination with **`endFrom`** to specify a date range or use it alone to filter jobs ended on or before the specified date.

- **`createFrom`** (timestamp in milliseconds): Filters jobs based on the date they were created. You can use it in combination with **`createTo`** to specify a date range or use it alone to filter jobs created on or after the specified date.

- **`createTo`** (timestamp in milliseconds): Filters jobs based on the date they were created. You can use it in combination with **`createFrom`** to specify a date range or use it alone to filter jobs created on or before the specified date.

- **`hasErrors`** (boolean): Specifies whether the job has errors. You can pass **`true`** or **`false`** to filter jobs based on their error status.

- **`_size`** (integer): Sets the maximum number of jobs to retrieve in a single request.

You can combine these parameters as needed to narrow down your job search and retrieve the desired job information.

##### Returns

[sys.commons.ResultSet]({{<ref "/dev-reference/scripting/sys-commons.md">}}) - The jobs matching the query ordered by creation time in descendent order.

##### Exceptions

**badRequest**

This exception is raised if **`query`** provided is invalid.

##### Samples

``` javascript
// finds jobs finished with errors
var jobs = sys.jobs.find({status: 'FINISHED', hasErrors: 'true', _size: 10});
while (jobs.hasNext()) {
  var job = jobs.next();
  log('job with errors: '+job.name());
}
```
<br>

###  logs(jobId, query)

The **`logs`** function allows you to retrieve logs for a background job. You have the option to apply filters and paginate the results for better control and analysis.

##### Parameters

Name|Type|Required|Description
---|---|---|---
jobId|string|yes|ID of the job to retrieve its logs.
query|object|yes|When using the **`query`** parameter to filter logs, you can include various options to refine your log retrieval. Here are the valid filter options: <br> - **`level`** : Filter logs by the level of the job. Allowed values are "INFO" and "ERROR". <br> - **`message`** : Filter logs by a partial match with the log message.<br> - **`from`**: Define the minimum timestamp in milliseconds since the Epoch. If you specify this parameter, the **`period`** option will be ignored.<br> - **`to`** : Set the maximum timestamp in milliseconds since the Epoch. If you specify this parameter, the **`period`** option will be ignored.<br> - **`period`**: Specify a period of time for log retrieval. Valid values include "today", "yesterday", or a time duration like "2h 30m" or "10m". This option allows you to fetch logs from the last X amount of time.<br> - **`_size`**: Specify the maximum number of logs to retrieve. <br> You can combine these filter options as needed to precisely target the logs you want to retrieve.

##### Returns

[sys.commons.ResultSet]({{<ref "/dev-reference/scripting/sys-commons.md">}}) - A result set with the logs matching the query.

##### Exceptions

**badRequest**

This exception is raised if either the **`jobId`** or **`query`** provided are invalid.

**notFound**

This exception occurs when no job is found with the given ID.


##### Samples

``` javascript
// prints up to 10 logs for the last 3 jobs
var jobs = sys.jobs.find({status: 'FINISHED', _size: 3});
while (jobs.hasNext()) {
  var job = jobs.next();
  var logs = sys.jobs.logs(job.id(), {_size: 10});
  log('logs for job ['+job.name()+']');
  while (logs.hasNext()) {
    var logEntry = logs.next();
    log('   '+logEntry.level()+': '+logEntry.message());
  }
}
```
<br>

###  logInfo(jobId, message)

The **`logInfo`** function is used to add a log entry with the **`INFO`** level to a job.

- If you provide the **`jobId`** parameter, the log entry will be associated with the specified job.

- If you don't specify the **`jobId`** parameter, the log entry will be added to the current job if one exists. If there is no current job, the log entry will be discarded without any notification.

##### Parameters

Name|Type|Required|Description
---|---|---|---
jobId|string|no|The unique identifier of the job to which you want to add the log entry. If this parameter is not provided, the current job (if available) will be used. If there is no current job, the log entry will be discarded without any notification.
message|string|yes|The message to be logged

##### Exceptions

**badRequest**

This exception is raised if either the **`jobId`** or **`message`** provided are invalid.

**notFound**

This exception occurs when no job is found with the given ID.

##### Samples

``` javascript
// adds a log to the last 3 jobs
var jobs = sys.jobs.find({_size: 3});
while (jobs.hasNext()) {
  var job = jobs.next();
  sys.jobs.logInfo(job.id(), "this is a test log!");
}
```
<br>


###  logError(jobId, message)

The **`logInfo`** function is used to add a log entry with the **`ERROR`** level to a job.

- If you provide the **`jobId`** parameter, the log entry will be associated with the specified job.

- If you don't specify the **`jobId`** parameter, the log entry will be added to the current job if one exists. If there is no current job, the log entry will be discarded without any notification.

##### Parameters

Name|Type|Required|Description
---|---|---|---
jobId|string|no|The unique identifier of the job to which you want to add the log entry. If this parameter is not provided, the current job (if available) will be used. If there is no current job, the log entry will be discarded without any notification.
message|string|yes|The message to be logged.

##### Exceptions

**badRequest**

This exception is raised if either the **`jobId`** or **`message`** provided are invalid.

**notFound**

This exception occurs when no job is found with the given ID.

##### Samples

``` javascript
// adds a log to the last 3 jobs
var jobs = sys.jobs.find({_size: 3});
while (jobs.hasNext()) {
  var job = jobs.next();
  sys.jobs.logError(job.id(), "adds an error log!");
}
```
<br>

###  waitForJob(jobId, desiredStatus, maxTimeToWait)

The **`waitForJob`** function is used to pause execution and wait for a specific job to reach a desired status. It will return when the job reaches one of the specified statuses, or it will throw a timeout exception if the maximum wait time is exceeded.

##### Parameters

Name|Type|Required|Description
---|---|---|---
jobId|string|yes|The unique identifier of the job for which you want to wait.
desiredStaus|string or string[]|yes|An array of one or more valid statuses that you want the job to reach before continuing execution.<br> Valid statuses include: **`PENDING`**, **`RUNNING`**, **`FINISHED`**, **`STOPPING`**, **`STOPPED`**, **`CANCELING`**, and **`CANCELED`**. The function will return as soon as the job reaches any of the specified statuses in the array.
maxTimeToWait|number|yes|The maximum amount of time, in some suitable time unit, that you are willing to wait for the job to reach one of the statuses specified in **`desiredStatus`**. If the job takes longer than this specified time, a timeout exception will be thrown.

##### Exceptions

**badRequest**

This exception is raised if either the **`jobId`** or **`desiredStatus`** provided are invalid.

**notFound**

This exception occurs when no job is found with the given ID.

**timeOut**

This exception is raised if the job takes longer than the **`maxTimeToWait`** parameter specifies to reach one of the desired statuses specified in **`desiredStatus`**.

##### Samples

``` javascript
// executes an action in the background and waits for its completion
var jobId = sys.data.executeAction('companies', {}, 'logSomething', {param1: 'a', param2: 'b'});
try {
  sys.jobs.waitForJob(jobId, 'FINISHED', 60000);
  log('job finished!!!');
} catch (e) {
  if (sys.exceptions.getCode(e) == 'timeout') {
    log('timeout execution the job');
  }
}
```
<br>

###  waitForJobs(jobId, desiredStatus, maxTimeToWait)

The **`waitForJobs`** function is used to pause execution and wait for some specific job to reach a desired status. It will return when the job reaches one of the specified statuses, or it will throw a timeout exception if the maximum wait time is exceeded.

##### Parameters

Name|Type|Required|Description
---|---|---|---
jobId|array|yes|The unique identifier of the job for which you want to wait.
desiredStaus|string or string[]|yes|An array of one or more valid statuses that you want the job to reach before continuing execution.<br> Valid statuses include: **`PENDING`**, **`RUNNING`**, **`FINISHED`**, **`STOPPING`**, **`STOPPED`**, **`CANCELING`**, and **`CANCELED`**. The function will return as soon as the job reaches any of the specified statuses in the array.
maxTimeToWait|number|yes|The maximum amount of time, in some suitable time unit, that you are willing to wait for the job to reach one of the statuses specified in **`desiredStatus`**. If the job takes longer than this specified time, a timeout exception will be thrown.

##### Exceptions

**badRequest**

This exception is raised if either the **`jobId`** or **`desiredStatus`** provided are invalid.

**notFound**

This exception occurs when no job is found with the given ID.

**timeOut**

This exception is raised if the job takes longer than the **`maxTimeToWait`** parameter specifies to reach one of the desired statuses specified in **`desiredStatus`**.

##### Samples

``` javascript
// executes an action in the background and waits for its completion
var job1 = sys.data.executeAction('companies', {}, 'logSomething', {param1: 'a', param2: 'b'});
var job2 = sys.data.executeAction('companies', {}, 'logSomething', {param1: 'a', param2: 'b'});

try {
  sys.jobs.waitForJobs([job1,job2], 'FINISHED', 60000);
  log('job finished!!!');
} catch (e) {
  if (sys.exceptions.getCode(e) == 'timeout') {
    log('timeout execution the job');
  }
}
```
<br>

### executeInJob(items, queue, callback, step)

The **`executeInJob`** function allows you to process large arrays of items in a background job. The job is placed into the specified job queue. 
If step is provided items are divided in chunks according to the step and items size. If not provided chunks will be calculated according to the amount of items and available threads for the job queue. This allows for asynchronous and parallel processing of tasks.

##### Parameters

Name|Type|Required|Description
---|---|---|---
items|array|yes|An array of items to be processed in chunks.
queue|string|yes|The name of the job queue in which the background jobs will be placed. Default value will be "mix"
callback|function|yes|A function to be executed for each item. This function will receive the current item as a parameter.
step|number|no|The number of items to include in each chunk.

##### Exceptions

**badRequest**

This exception is raised if any of the required parameters are missing or invalid (e.g., `step` is not a positive number, `queue` is not defined, or `callback` is not a function).

##### Samples

```javascript
var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

sys.jobs.executeInJob(items, 'default', function(item) {
    sys.logs.info('Processing item: ' + item);
});

```

```javascript
var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// predefined chunk size
sys.jobs.executeInJob(items, 'default', function(item) {
    sys.logs.info('Processing item: ' + item);
}, 2);
```
<br>

###  setLowPriority(jobId)

The **`setLowPriority`** function is used to set a low priority flag for a specific job. When this flag is set, other jobs that are running may be given higher priority over this job.

##### Parameters

Name|Type|Required|Description
---|---|---|---
jobId|string|yes|The unique identifier of the job to which you want to set the low priority flag.

##### Exceptions

**badRequest**

This exception is raised if **`jobId`** is invalid.

**notFound**

This exception occurs when no job is found with the given ID.

##### Samples

``` javascript
// executes an action in the background and sets the low priority flag
var jobId = sys.data.executeAction('companies', {}, 'logSomething', {param1: 'a', param2: 'b'});
sys.jobs.setLowPriority(jobId);
log('job flagged as low priority');
```
<br>

###  removeLowPriority(jobId)

The **`setLowPriority`** function is used to remove a low priority flag for a specific job. 

##### Parameters

Name|Type|Required|Description
---|---|---|---
jobId|string|yes|The unique identifier of the job to which you want to remove the low priority flag.

##### Exceptions

**badRequest**

This exception is raised if **`jobId`** is invalid.

**notFound**

This exception occurs when no job is found with the given ID.

##### Samples

``` javascript
// executes an action in the background and sets the low priority flag and the removes it
var jobId = sys.data.executeAction('companies', {}, 'logSomething', {param1: 'a', param2: 'b'});
sys.jobs.setLowPriority(jobId);
log('job flagged as low priority');
sys.jobs.removeLowPriority(jobId);
log('job unflagged as low priority');

```
<br>

###  getCurrentJobId()

The **`getCurrentJobId`** function returns the ID of the job that the script is currently running within. If the script is not running within the context of a job, this method will return **`null`**.

##### Returns

**`string`** - The ID of the current job if the script is running inside a job, or **`null`** if the script is not running within a job.

##### Samples

``` javascript
// logs the ID of the job executing the script
var jobId = sys.jobs.getCurrentJobId();
log('job id: ' + jobId);
```
<br>

###  getCurrentJob()

The **`getCurrentJob`** function returns the job object that the script is currently running within. If the script is not running within the context of a job, this method will return **`null`**.

##### Returns

[sys.jobs.Job](#sysjobsjob) - The job object representing the current job if the script is running inside a job, or **`null`** if the script is not running within a job.

##### Samples

``` javascript
// logs the name of the job executing the script
var job = sys.jobs.getCurrentJob();
log('job id: ' + job.label());
```
<br>


###  embeddingsBatchProcessing(inputs,callback)

This will trigger a background job to embedd a list of intpus. It will trigger a batch embedding generation on Vertex AI API and then it will execute a callback on the outputs. 

[See Google’s batch embeddings inputs and outputs](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/batch-prediction-genai-embeddings). Context can be passed in inputs and used when executing the callback.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
inputs|objects|yes|An array of JSON objects that will be used to generate embeddings. If **`id`** is passed the result of the callback will be mapped to this id.
callback|function|yes|The function to evaluate if an element needs to be removed. It will receive the element wrapper as parameter and should return **`true`** if the element has to be removed or **`false`** otherwise.


##### Returns

**`string`** - The ID of the triggered job.

##### Samples

``` javascript
let record = sys.data.findOne('library',{});

// List of inputs.
let array = [{"content":"horror book","recordId":record.id(), "id":0}]

// trigger backgroudn job to process embeddings in a batch. 
let jobId = sys.jobs.embeddingsBatchProcessing(array, function(prediction) {
  // get library from context
  let library = sys.data.findOne('library',{id: prediction.instance.recordId})

  // find related books with the output embedding
  let records = sys.data.find('books', {
    _indexedFilter: 'semantic',
    _indexedFilterEmbedding: prediction.predictions[0].embeddings.values,
    _vectorSearchLimit: 3,
    _numCandidates: 200,
    _queryScoring:0.72
  });
  let ids = [];
  while (records.hasNext()) {
    let r = records.next();
    ids.push(r.id());
  
  }
  record.field('books').val(ids)
  sys.data.save(record)
  return "ok"
})
```
<br>

## **sys.jobs.Job**

The **`sys.jobs.Job`** object contains information about a job.

###  id()

The **`id()`** method returns the unique ID of the job.

##### Returns

**`string`** - The ID of the job.

###  label()

The **`label()`** method returns the human-readable label of the job.

##### Returns

**`string`** -The label of the job.

###  type()

The **`type()`** method returns the type of the job. The only types of jobs that you can use in your code are as follows:

- **`IMPORT_RECORDS`**
- **`EXPORT_RECORDS`**
- **`EXECUTE_ACTION`**
- **`DELETE_RECORDS`**
- **`EXECUTE_LISTENER`**
- **`IMPORT_USERS`**
- **`EXPORT_USERS`**
- **`STOP_APP`**
- **`START_APP`**
- **`DEPLOY_ENDPOINT`**
- **`UNDEPLOY_ENDPOINT`**

Please note that there are other types of jobs, but they are system-specific and may change or be removed without prior notice.

##### Returns

**`string`** - The type of the job.

###  status()

The **`status()`** method returns the current status of the job. Possible status values are:

- **`PENDING`**: The job is pending execution.
- **`RUNNING`**: The job is currently being executed.
- **`FINISHED`**: The job has been successfully completed.
- **`STOPPING`**: The job is in the process of stopping, which may take some time until it can be gracefully halted.
- **`STOPPED`**: The job has been stopped but is eligible for resuming.
- **`CANCELED`**: The job has been canceled and cannot be resumed.

##### Returns

**`string`** - The current status of the job.

###  progress()

The **`progress()`** method returns the percentage of progress of the job. Please note that in some jobs, the progress value might not be very precise.

##### Returns

**`number`** - The progress of the job.

###  waiting()

The **`waiting()`** method returns the amount of time in milliseconds since the job was created until execution started. If the job is still in the "PENDING" state, this value will continue to grow.

##### Returns

**`number`** - The number of milliseconds that the job has been waiting.

###  duration()

The **`duration()`** method returns the amount of time in milliseconds that the job took to complete its execution since the start date. If the job is still in progress, this value will continue to grow.

##### Returns

**`number`** - The number of milliseconds that the job has been executing.

###  hasErrors()

The **`hasErrors()`** method indicates whether there have been errors during the execution of the job.

##### Returns

**`boolean`** - **`true`** if there have been errors, **`false`** otherwise.

###  startDate()

The **`startDate()`** method returns the date when the job started its execution. Keep in mind that a job could be in the "PENDING" state for a long time if there is heavy load on the app. In that case, the start date might be **`null`** and will be set when the job is actually executed.

##### Returns

**`Date`** - The date when the execution of the job started.

###  endDate()

The **`endDate()`** method returns the date when the job finished its execution. This can be either because the job finished correctly or because it was stopped.

##### Returns

**`Date`** - The date when the execution of the job finished.

###  runBy()

The **`runBy()`** method returns an object containing the ID and name of the user who triggered the job.

##### Returns

**`object`** - An object with the **`ID`** and **`name`** properties of the user.

###  data()

The **`data()`** method returns an object that contains the parameters of the job. The structure of this object depends on the type of job and should only be used for public jobs:

- **`Start App`**: 

  Path|Description
  ---|---
  pushChanges|**`true`** if changes will be pushed during the starting of the app. **`false`** or empty otherwise.
  wakingUp|	**`true`** if the app was sleeping and is waking ap. **`false`** otherwise.

  <br>

- **`Import records`**: 

  Path|Description
  ---|---
  fileName|This is the name of the file that will be imported.
  entityName| The name of the entity where records will be imported.

  <br>

- **`Export records`**: 

  Path|Description
  ---|---
  entityName| The name of the entity where records will be exported from.

  <br>

- **`Delete records`**: 

  Path|Description
  ---|---
  entityName|The name of the entity where records will be deleted from.

  <br>

- **`Execute action`**: 

  Path|Description
  ---|---
  entityName|The name of the entity the action belongs to.
  actionName|The name of the action to be executed.

  <br>

- **`Execute listener`**: 

  Path|Description
  ---|---
  listenerName|The name of the listener to execute.

  <br>

- **`Import users`**: 

  Path|Description
  ---|---
  fileName|This is the name of the file that will be imported.
  notifyUsers|**`true`** if people will be notified by email when users are created; **`false`** otherwise.

  <br>

- **`Deploy endpoint`**: 

  Path|Description
  ---|---
  endpointName|The name of the endpoint to deploy.

  <br>

- **`Undeploy endpoint`**: 

  Path|Description
  ---|---
  endpointName|The name of the endpoint to undeploy.

  <br>

##### Returns

**`object`** -  An object containing the parameters of the job. The structure may vary depending on the job type.

###  results()

The **`results()`** method returns an object containing the results of executing the job. The structure of this object depends on the type of job and should only be used for public jobs.

- **`Import records`**: 

  Path|Description
  ---|---
  rowsImported|The number of rows that were imported successfully.
  rowsWithErrors|The number of rows that couldn’t be imported due to errors.

  <br>

- **`Export records`**: 

  Path|Description
  ---|---
  fileLink|URL to download the CSV file with the exported records. You will need to send the token in the headers in order to be able to download it.
  fileId|The ID of the file that was generated.
  recordsExported|The number of records that were exported.

  <br>

- **`Delete records`**:

  The result will be a map like this one:

  ```js
  {
    "results": {
      "id1": {
        "status": "ok"
      },
      "id2": {
        "status": "error",
        "errorMessage": "error message"
      }
    }
  }
  ```
  <br>

  **`status`**: This field indicates whether the delete process was executed successfully over each record. It can have two possible values: **`"ok"`** if the deletion was successful or **`"error"`** if there were errors during the process.

  **`response`** (Optional): This field will be available only if the action is configured to return the response in the results; otherwise, it won't be present.

  Please note an important limitation: The maximum number of responses in this map will be 1,000. If you execute the delete process over more than 1,000 records, you might not be able to collect the response for each one.

  This method is useful for retrieving the outcomes and responses from a completed job, particularly when performing actions like record deletion. However, the structure of the returned object varies depending on the job type and the configuration of the action. Make sure to account for the potential absence of the **`response`** field and the 1,000-record limit when processing large batches.

- **`Execute action`**:

  The results of this job depend on the type of action being executed. Here's how the results are structured:

  ```js
  {
    "results": {
      "id1": {
        "status": "ok",
        "response": "response from action"
      },
      "id2": {
        "status": "error",
        "errorMessage": "error message"
      }
    }
  }
  ```
  <br>

  - **Type: One Record**
    - **`recordId`**: The ID of the record on which the action was executed.
    - **`status`**: Indicates if the action was executed successfully over that record. It can have two possible values: "ok" for success or "error" for failure.
    - **`response`** (Optional): The response data from the action, if configured to return a response in the results.
    - **`errorMessage`** (Optional): Present when there is an error, providing insight into the problem.

  - **Type: Many Records**
    - **`status`**: Indicates if the action was executed successfully over the records. It can have two possible values: "ok" for success or "error" for failure.
    - **`response`** (Optional): The response data from the action, if configured to return a response in the results.

    ```js
    {
      "results": {
        "status": "ok",
        "response": "response from action"
      }
    ```
    <br>

  Please note that the **`response`** field will be available only if the action is configured to return the response in the results; otherwise, it won't be present.

  Also, keep in mind an important limitation: The maximum number of responses in this map will be 1,000. If you execute the action over more than 1,000 records, you might not be able to collect the response for each one.

  The structure of the result may vary depending on the type of action being performed and its configuration. Make sure to handle the result accordingly based on the specific requirements of the action.

- **`Import users`**: 

  Path|Description
  ---|---

  <br>

- **`Export users`**: 

  Path|Description
  ---|---
  fileLink|URL to download the CSV file with the exported users. You will need to send the token in the headers in order to be able to download it.
  fileId|The ID of the file that was generated.
  usersExported|The number of users that were exported.

  <br>

##### Returns

**`object`** - The results of the job

###  logs()

The **`logs()`** method returns the logs of the job. It accepts a query as a parameter. This method works exactly the same as [sys.jobs.logs()](#sysjobslogsjobidquery), so you can refer to its documentation to understand how it functions.

##### Returns

 [sys.commons.ResultSet]({{<ref "/dev-reference/scripting/sys-commons.md">}}) -  A result set containing the logs of the job.

##### Exceptions

**notFound**

This exception is raised if the job is not found in the database.

###  logInfo(message)

The **`logInfo()`** method adds a log entry with the **`INFO`** level to the job.

##### Parameters

Name|Type|Required|Description
---|---|---|---
message|string|yes|The message to be logged

##### Exceptions

**badRequest**

This exception is raised if the job is no longer valid or if the provided **`message`** is invalid.

**notFound**

This exception is raised if the job is not found in the database.

###  logError(message)

The **`logInfo()`** method adds a log entry with the **`ERROR`** level to the job.

##### Parameters

Name|Type|Required|Description
---|---|---|---
message|string|yes|The message to be logged

##### Exceptions

**badRequest**

This exception is raised if the job is no longer valid or if the provided **`message`** is invalid.

**notFound**

This exception is raised if the job is not found in the database.

## **sys.jobs.JobLog**

The **`sys.jobs.JobLog`** object contains information about a line of log.

###  timeStamp()

The **`timestamp()`** method returns the date on which the log entry was recorded.

##### Returns

**`Date`** -  The date on which the log entry was recorded.

###  level()

The **`level()`** method returns the level of the log, which can be "INFO" or "ERROR".

##### Returns

**`string`** - The level of the log.

###  message()

The **`message()`** method returns the message associated with the log entry.

##### Returns

**`string`** - The message of the log.

###  aditionalInfo()

The **`additionalInfo()`** method returns additional information specific to the log entry. The content of this field can vary and should be used for diagnosing problems or gaining more insight into the log entry. However, it's recommended not to base your code logic solely on information from this field.

##### Returns

**`object`** - An object containing additional log-specific information. This field could be **`null`** in some cases.

This object and its methods allow you to access and retrieve detailed information about individual log entries for diagnostic and troubleshooting purposes.
