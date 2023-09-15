---
title: "File type"
lead: "File type documentation.
"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "field-types"
toc: true
---

## **Overview**

This type enables the storage of references to files. The UI and APIs also facilitate file uploads using this field.

## **Available features**

Name|Supported
---|---
Many multiplicity|yes
Default values|no
Unique flag|no
Required flag|yes
Indexable flag|no
Sensitive flag|yes
Calculated value|no
Automatic initialization|no
Calculated initial value|no
Aggregation|no
Default type rules|no
Default display options|yes

## **Display options**

### Enable preview

If this flag is enabled, a button to preview the file will be displayed in the UI. Otherwise, the only available option will be to download the file.

## **REST API**

### Read format

It's a JSON with the following fields:

- **`id`**: This is the ID of the referenced file.
- **`name`**: This is the name of the referenced file. It might include the size as well.

Sample user field in JSON format:

```js
"file": {
    "id": "58866b5d3b063a0007604eab",
    "name": "logo.png (41.5kB)"
}
```
<br>

### Write format

You can provide only the ID and avoid the **`name`** field:

```js
"file": {"id": "57fe52ade4b0ce322b0cea32"}
```
<br>

You can also provide the ID directly as a string:

```js
"file": "57fe52ade4b0ce322b0cea32"
```
<br>

Finally you can provide the file encoded in Base 64 and it will be uploaded:

```js
"file": {
  "name": "test1.txt",
  "contentType": "text/plain",
  "content": "dGVzdCBmaWxlIQ=="
}
```
<br>

Where:

- **`name`**: This is the name of the file.
- **`contentType`**: This is the content type of the file.
- **`content`**: This is the content of the file encoded in Base 64.

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return an object:

```js
{
  "id": "58866b5d3b063a0007604eab",
  "name": "logo.png (41.5kB)"
}
```
<br>

Where:

- **`id`**: This is the ID of the referenced file.
- **`name`**: This is the name of the referenced file. It might include the size of the file.

However, in most cases, instead of obtaining the raw value of the relationship, you will use the methods available in the wrapper to directly access the ID or the full name.

### Write format

There are several ways to pass the value of a user in the JavaScript API.

You can pass only the ID:

```js
record.field("file").val({id: "58866b5d3b063a0007604eab"});
```
<br>

You can also pass the ID directly as a string:

```js
record.field("file").val("58866b5d3b063a0007604eab");
```
<br>

The Javascript API also allows to set a user wrapper like this:

```js
file1.field('file').val(file2.field('file'));
```
<br>

Or you can pass a new file that will be created:

```js
var file = sys.data.createRecord('files');
file.field('code').val('test-b');
file.field('file').val({
  name: 'test1.txt',
  contentType: 'text/plain',
  content: 'dGVzdCBmaWxlIQ=='
});
sys.data.save(file);
```
<br>

### Wrapper method: <br> **id()**

  The **`id()`** method returns the ID of the referenced file or **`null`** if the field is empty.

  ##### Returns

  **`string`** - The ID of the referenced file.
  
  ##### Samples

  ```js
  // prints the ID of attachements of a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments').each(function(attachment) {
    log('file id: '+attachment.id());
  });
  ```
  <br>

  ---

### Wrapper method: <br> **name()**

  The **`name()`** method returns the name of the referenced file or **`null`** if the field is empty.

  ##### Returns

  **`string`** - The name of the referenced file.
  
  ##### Samples

  ```js
  // prints the name of attachments of a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments').each(function(attachment) {
    log('file name: '+attachment.name());
  });
  ```
  <br>

  ---

### Wrapper method: <br> **name(name)**

  Sets the name of the file. This only works if you are uploading a new file, otherwise an exception will be thrown.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  name|string|yes|The name of the file.

  ##### Exceptions

  **badRequests**
  If the file already exists
  
  ##### Samples

  ```js
  // adds a new attachment to a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments[1]').name('test1.txt');
  record.field('attachments[1]').contentType('text/plain');
  record.field('attachments[1]').content('dGVzdCBmaWxlIQ==');
  record = sys.data.save(record);
  log('file id: '+record.field('attachments').last().id());
  ```
  <br>

  ---
 
### Wrapper method: <br> **hash()**

  Returns the hash code of the referenced file.

  ##### Returns

  **`string`** - The hash code of the referenced file.
  
  ##### Samples

  ```js
  // prints the hash of attachements of a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments').each(function(attachment) {
    log('file hash: '+attachment.hash());
  });
  ```
  <br>

  ---

### Wrapper method: <br> **contentType()**

  Returns the content type of the referenced file or null if the field is empty.

  ##### Returns

  **`string`** - The content type of the referenced file.
  
  ##### Samples

  ```js
  // prints the content type of attachments of a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments').each(function(attachment) {
    log('content type: '+attachment.contentType());
  });
  ```
  <br>

  ---
 
### Wrapper method: <br> **contentType(contentType)**

  Sets the content type of the file. This only works if you are uploading a new file, otherwise an exception will be thrown.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  contentType|string|yes|The content type of the file.

  ##### Exceptions

  **badRequest** 
  If the file already exists.
  
  ##### Samples

  ```js
  // adds a new attachment to a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments[1]').name('test1.txt');
  record.field('attachments[1]').contentType('text/plain');
  record.field('attachments[1]').content('dGVzdCBmaWxlIQ==');
  record = sys.data.save(record);
  log('file id: '+record.field('attachments').last().id());
  ```
  <br>

  ---

### Wrapper method: <br> **content()**

  Returns the content of the file encoded in Base 64. If the file is bigger than 10MB this method will throw an exception.

  ##### Returns

  **`string`** - The content of the referenced file encoded in Base 64.

  ##### Exceptions

  **badRequest** 
  If the content of the file is bigger than 10MB.
  
  ##### Samples

  ```js
  // prints the content of attachments of a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments').each(function(attachment) {
    log('content in base 64: '+attachment.content());
  });
  ```
  <br>

  ---


### Wrapper method: <br> **content(content)**

  Sets the content type of the file (it should be encoded in Base 64). This only works if you are uploading a new file, otherwise an exception will be thrown.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  content|string|yes|The content of the file in Base 64.

  ##### Exceptions

  **badRequest** 
  If the file already exists.
  
  ##### Samples

  ```js
  // adds a new attachment to a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments[1]').name('test1.txt');
  record.field('attachments[1]').contentType('text/plain');
  record.field('attachments[1]').content('dGVzdCBmaWxlIQ==');
  record = sys.data.save(record);
  log('file id: '+record.field('attachments').last().id());
  ```
  <br>

  ---
 
### Wrapper method: <br> **size()**

  Returns the size of the file in bytes.

  ##### Returns

  **`number`** - The size of the referenced file.

  ##### Samples

  ```js
  // prints the size of attachments of a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments').each(function(attachment) {
    log('file size: '+attachment.size());
  });
  ```
  <br>

  ---

### Wrapper method: <br> **link()**

  Returns an absolute URL of the file.

  ##### Returns

  **`string`** - The URL of the referenced file.

  ##### Samples

  ```js
  // prints the url of attachments of a task
  var record = sys.data.findOne('tasks', {number: 1});
  record.field('attachments').each(function(attachment) {
    log('file url: ' + attachment.link());
  });
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is the name of the file:

```js
"fileField1","fileField2"
"logo.png (4kB)","data.zip (41.5kB)"
```
<br>

### Import format

It is not possible to import file fields.

## **Queries**

For more information, please refer to the [Query Language Documentation]({{<ref "/dev-reference/queries/query-language.md">}}).

### Available operators

Operator|Supported
---|---
equals|yes
notEquals|yes
empty|yes
notEmpty|yes
like|yes
greater|no
greaterOrEquals|no
less|no
lessOrEquals|no
between|no
currentUserField|no

### Query formats

By default, the file name will be used for the various query operators.

For example, to query tasks with an attachment where the name is similar to **`'logo.png'`**. We use **`'like'`** because the name can include the file size, so using **`'equals'`** might not yield the expected results:

{{< query_sample
        id="sample"
        description="finds a task with attachment 'logo.png'"
        entity="tasks"
        jsQueryMap="{attachments: 'like(logo.png)'}"
        jsQueryBuilder=".field('attachments').like('logo.png')"
        restApi="attachments=like(logo.png)"
>}}
<br>

You could also query by the ID:

{{< query_sample
        id="sample2"
        description="finds a task by attachment's ID"
        entity="tasks"
        jsQueryMap="{'attachments.id': '58866b5d3b063a0007604eab'}"
        jsQueryBuilder=".field('attachments').equals('58866b5d3b063a0007604eab')"
        restApi="attachments.id=58866b5d3b063a0007604eab"
>}}
<br>

Notice again that the query builder will automatically detect the ID, so you don't need to use the **`'id'`** suffix there.

Remember that when using the query builder, you can utilize any of the formats available in the [JavaScript API]({{<ref "/dev-reference/field-types/references/file.md#write-format-1">}}).

## **Aggregate queries**
Please refer to the [Aggregate Queries Documentation]({{<ref "/dev-reference/queries/aggregate-queries.md">}}) for more detailed information.

### Available operators

Operator|Supported
---|---
sum|no
avg|no
first|yes
last|yes
min|no
max|no

## **UI queries**

Please refer to the [UI Queries Documentation]({{<ref "/dev-reference/queries/ui-queries.md">}}) for more detailed information.

### Matching of values

Property|Description
---|---
Matching operator|**`like`**<br>The name of the referenced file will be used for matching.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|no
Less or equals|no
Between|no