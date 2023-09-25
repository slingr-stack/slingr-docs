---
title: "UI steps"
description: "Describes how to use the UI steps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "steps"
toc: true
weight: 89
---

## **Download file**

##### General info

Category | Description |
--- | --- |
**`UI`** | Performs a download of the specified file.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
File ID|text|yes|Always|The ID of the file to download.

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/downloadfile_sample.png" alt="Download file step image">
  <figcaption>The flow begins, and the "download file" step downloads the specified file. If an error occurs during the file download, the error will be logged, and the execution will be terminated.</figcaption>
</figure>

## **Go back**


##### General info

Category | Description |
--- | --- |
**`UI`** | Goes back in the browser navigation history.|

##### Inputs

No configuration required. 

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/goback_sample.png" alt="Go back step image">
  <figcaption>The flow initiates, and the "go back" step navigates back in the browser's navigation history. Subsequently, the execution concludes with the "end" step.</figcaption>
</figure>
 
## **Go to view**

##### General info

Category | Description |
--- | --- |
**`UI`** | Navigates to the specified view in the UI.|

##### Inputs

Label | Type | Required | Default | Visibility | Description
--- | --- | --- | --- | --- | ---
View|view|yes| - | Always | The view to navidate to.
View type | choice | **`config.view.type`** is **`ENTITY_VIEW`** | Read Only | 	**`config.view.type`** is **`ENTITY_VIEW`** | In case of grid or workflow views define the view type to redirect. <br> Possible values are: <br>**`Read Only`**<br>**`Create`**<br>**`Edit`**
Record ID|text|**`config.view.type`** is **`ENTITY_VIEW`**| - | **`config.view.type`** is **`ENTITY_VIEW`**  | ID of the record. When this field is set the app navigates to the detail read-only view of the record.
Filters|query|no|-|**`config.view.type`** is **`COLLECTION_VIEW`** **`config.view.type`** is **`CARDS_VIEW`** | In case of grid or workflow views define some view filters to be applied.
Parameters|query|no|-| **`config.view.type`** is **`CUSTOM_VIEW`** | In case of custom views you can define some view parameters to be applied. Those parameters are transformed into URL query parameters.

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/gotoview_sample.png" alt="Go to view step image">
  <figcaption>The flow begins, and the "go to view" step navigates to the specified view. Subsequently, the execution concludes with the "end" step.</figcaption>
</figure>

## **Open action**

##### General info

Category | Description |
--- | --- |
**`UI`** | Open the specified action modal in the UI.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | --- 
Entity|entity|yes|always|The entity that the action belongs to.
Action|entityAction|yes|Always|The action to be executed.
Action view|view|no|Always|The action view to be used. If it is not specified the default one is going to be used.
Record IDs|text|**`config.action.type`** is not **`GLOBAL_ENTITY`**|**`config.action.type`** is not **`GLOBAL_ENTITY`**|The condition to be evaluated as true.

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/openaction_sample.png" alt="Open action step image">
  <figcaption>The flow initiates, and the "open action" step opens the specified action modal in the UI. Following this, the execution concludes with the "end" step.</figcaption>
</figure>

## **Open external link**

##### General info

Category | Description |
--- | --- |
**`UI`** | Opens the specified link in the browser.|

##### Inputs

Label | Type | Required | Default | Visibility | Description
--- | --- | --- | --- | --- | ---
URL|text|yes| - |Always|External URL to open.
Open link in a new tab| boolean | yes | true | Always | If true external URL is opened in a new tab of the browser. Otherwise the URL will be opened in same tab.

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/openexternallink_sample.png" alt="Open external link step image">
  <figcaption>The flow begins, and the "open external link" step opens the specified external URL. Subsequently, the execution concludes with the "end" step.</figcaption>
</figure>

## **Reload**

##### General info

Category | Description |
--- | --- |
**`UI`** |Reloads the app.|

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | --- 
Go to default view| boolean | yes | Always| If set to "true," when the app is reloaded, the user will be directed to the default view, which is the view displayed when the app is loaded after login. If set to "false," the current page will be reloaded.

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/reload_sample.png" alt="Relod step image">
  <figcaption>The flow begins, and the "reload" step refreshes the app. Subsequently, the execution concludes with the "end" step.</figcaption>
</figure>

## **Show message**

##### General info

Category | Description |
--- | --- |
**`UI`** |Displays a message in the UI.|

##### Inputs

Label | Type | Required | Default | Visibility | Description
--- | --- | --- | --- | --- | ---
Target|choice|yes|caller|Always|Type of users to send the message.<br>Possible values are: <br> **`Caller`** <br> **`Users`** <br> **`All users`**
Users|text|**`config.target`** is **`users`**| - | **`config.target`** is **`users`**|Specific users to send the message.
Title|text|yes|-|Always|The title to be shown on message.
Message|text|yes|-|Always| The message content to be shown on message. It supports some basic HTML tags.
Type|choice|yes|Information|Always|Define the style for the message. <br> Possible values are: <br> **`Information`** <br> **`Success`** <br> **`Warning`** <br> **`Error`** <br>
Keep visible|boolean|yes|-|Always|If true the message won’t be closed automatically and the user has to close it manually.

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/showmessage_sample.png" alt="Show message step image">
  <figcaption>The flow initiates, and the "show message" step displays the specified message. Following this, the execution concludes with the "end" step.</figcaption>
</figure>

## **Start task**

##### General info

Category | Description |
--- | --- |
**`UI`** |Displays the specified task in the top right.|

##### Inputs

| Label    | Type | Required | Visibility | Description                                                     |
|----------|------|----------|------------|-----------------------------------------------------------------|
| Task ID  | text | yes      | Always     | The ID of the task to be displayed on the tasks menu.          |
| Title    | text | yes      | Always     | The message to be displayed on the tasks menu as the title.    |
| Message  | text | no       | Always     | The complimentary message to be displayed as a subtitle.       |

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/starttask_sample.png" alt="Start task step image">
  <figcaption>The flow begins, and the "start task" step displays the specified task in the top right corner. If an error occurs during the task display, the error will be logged, and the execution will be terminated.</figcaption>
</figure>

## **Update task**

##### General info

Category | Description |
--- | --- |
**`UI`** |Updates the status of a task displayed in the top right.|

##### Inputs

| Label    | Type | Required | Visibility | Description                                                     |
|----------|------|----------|------------|-----------------------------------------------------------------|
| Task ID  | text | yes      | Always     | The ID of the task to be displayed on the tasks menu.          |
| Title    | text | yes      | Always     | The message to be displayed on the tasks menu as the title.    |
| Message  | text | no       | Always     | The complimentary message to be displayed as a subtitle.       |
| Status   | text | no       | Always     | The status of the task, which can be updated to running, success, or error. The initial status is running. |

##### Outputs

No configuration required. 

##### Sample

<figure>
  <img src="/images/vendor/flows/updatetask_sample.png" alt="Update task step image">
  <figcaption>The flow initiates, and the "update task" step updates the status of the specified task. If an error occurs during the task update, the error will be logged, and the execution will be terminated.</figcaption>
</figure>







