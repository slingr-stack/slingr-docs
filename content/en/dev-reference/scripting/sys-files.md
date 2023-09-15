---
title: "sys.files"
lead: "Describes utilities in the Javascript API to work with text files."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 67
---

## **sys.files**

This package contains methods for reading and writing text files.

###  open(fileId, fileType, options)

Opens a file as a stream. If the file to be read is of type text/csv, a CSV handler will be returned to handle it appropriately.

##### Parameters

Name|Type|Required|Description
---|---|---|---
fileId|string|yes|ID of the file to be read.
fileType|string|no|Text based content type of the file. Some valid types are: <br> - text/plain <br> - text/csv <br> - text/richtext<br> - text/html
options|object|no|Configuration options to open the file. For **`text/csv`** the following options are available: <br> - **`separator`**: the delimiter to use for separating entries. <br> - **`quoteChar`**: the character to use for quoted elements. <br> - **`hasHeaders`**: if the file to be opened contains headers.

##### Returns

[sys.files.FileReader](#sysfilesfilereader)|[sys.files.CsvFileReader](#sysfilescsvfilereader) - The reader to read the file.

##### Exceptions

**badRequest**

If any of the parameter is invalid.

**notFound**

If no file found with the given ID.

**unknown**

If there are problems opening the file.

##### Samples

``` javascript
// reads a text file and prints the content
var record = sys.data.findOne('files', {code: 'test'});
var fileId = record.field('file').id();
var fileReader = sys.files.open(fileId, 'text/plain');
try {
    var line;
    while (line = fileReader.readLine()) {
        log(line);
    }
} finally {
    fileReader.close();
}
```
<br>




###  create(fileId, fileType)

Opens a new file stream for writing. If the file to be written is of type text/csv, a proper CSV handler will be returned to handle it appropriately.

##### Parameters

Name|Type|Required|Description
---|---|---|---
fileId|string|yes|ID of the file to be created.
fileType|string|no|Text based content type of the file. Some valid types are: <br> - text/plain <br> - text/csv <br> - text/richtext<br> - text/html

##### Returns

[sys.files.FileReader](#sysfilesfilereader)|[sys.files.CsvFileReader](#sysfilescsvfilereader)  - The reader to read the file.

##### Exceptions

**badRequest**

If **`fileName`** or **`fileType`** are invalid.

**unknown**

If there are problems creating the file.

##### Samples

``` javascript
// write a text file
var fileWriter = sys.files.create('test1.txt', 'text/plain');
try {
    fileWriter.writeLine('test file!');
} finally {
    fileWriter.close();
}
// now assocaite the file to a record
var record = sys.data.findOne('files', {code: 'temporary-file'});
if (!record) {
  record = sys.data.createRecord('files');
  record.field('code').val('temporary-file');
}
record.field('file').val({
  id: fileWriter.descriptor().id(),
  name: fileWriter.descriptor().name()
});
sys.data.save(record);
log('file record saved!');
```
<br>

``` javascript
// write a CSV file
var fileWriter = sys.files.create('test2.csv', 'text/csv');
try {
    fileWriter.writeHeaders(['name', 'email']);
    fileWriter.writeRow(['john', 'john@test.com']);
    fileWriter.writeRow(['adam', 'adam@test.com']);
} finally {
    fileWriter.close();
}
// now assocaite the file to a record
var record = sys.data.findOne('files', {code: 'temporary-csv-file'});
if (!record) {
  record = sys.data.createRecord('files');
  record.field('code').val('temporary-csv-file');
}
record.field('file').val({
  id: fileWriter.descriptor().id(),
  name: fileWriter.descriptor().name()
});
sys.data.save(record);
log('file record saved!');
```
<br>

###  share(fileId, ttl)

Shares a file by returning a public URL for it. This link is valid for an hour.

##### Parameters

Name|Type|Required|Default|Description
---|---|---|---|---
fileId|string|yes|-|ID of the file to be read.|ID of the file to share.
ttl|number|no|3600000 (1 hour)|Time in milliseconds to expire.

##### Exceptions

**badRequest**

If **`fileId`** is invalid or **`ttl`** is not a number.

**notFound**

If no file found with the given ID.

##### Samples

``` javascript
// prints a public URL for a file
var record = sys.data.findOne('files', {code: 'test'});
var publicUrl = sys.files.share(record.field('file').id());
log(publicUrl);
```
<br>

``` javascript
// prints a public URL for a file with expiration equals to a minute
var record = sys.data.findOne('files', {code: 'test'});
var publicUrl = sys.files.share(record.field('file').id(), 60000);
log(publicUrl);
```
<br>


###  unshare(fileId)

Stops sharing a file that was shared before.

##### Parameters

Name|Type|Required|Description
---|---|---|---
fileId|string|yes|ID of the file to unshare.

##### Returns

**`string`** - The public URL for the file which is valid for the ttl set or an hour.

##### Exceptions

**badRequest**

If **`fileId`** is invalid.

**notFound**

If no file found with the given ID.

##### Samples

``` javascript
// prints a public URL for a file
sys.files.unshare(record.field('file').id());
```
<br>

## **sys.files.FileReader**

This class allows you to read a text file line by line. The file must be stored in the app.

###  descriptor()

Returns the metadata information of the opened file.

##### Returns

[sys.files.FileDescriptor](#sysfilesfiledescriptor) - The file descriptor of the opened file.

##### Samples

``` javascript
// opens a file and logs the name of the file from the descriptor
var record = sys.data.findOne('files', {code: 'test'});
var fileId = record.field('file').id();
var fileReader = sys.files.open(record.field('file').id(), 'text/plain');
try {
  var descriptor = fileReader.descriptor();
  log('file name: '+descriptor.name());
} finally {
  fileReader.close();
}
```
<br>

###  readLine()

Reads the next line of the the opened file. If there isn’t any more data, it returns null.

##### Returns

**`string`** - Line of text or null if no more data.

##### Exceptions

**unknown**

If there are problems reading the file.

##### Samples

``` javascript
// reads a text file and prints the content
var record = sys.data.findOne('files', {code: 'test'});
var fileId = record.field('file').id();
var fileReader = sys.files.open(fileId, 'text/plain');
try {
    var line;
    while (line = fileReader.readLine()) {
        log(line);
    }
} finally {
    fileReader.close();
}
```
<br>

###  close()

Closes this file stream and releases any system resources associated with the stream.

##### Exceptions

**unknown**

If there are errors closing the file.

##### Samples

``` javascript
// close the file after reading it
var record = sys.data.findOne('files', {code: 'test'});
var fileId = record.field('file').id();
var fileReader = sys.files.open(fileId, 'text/plain');
try {
    var line;
    while (line = fileReader.readLine()) {
        log(line);
    }
} finally {
    fileReader.close();
}
```
<br>

## **sys.files.FileWriter**

This class allows you to write a text file line by line. The file will be stored in the app.

###  descriptor()

Returns the metadata information of the opened file.

##### Returns

[sys.files.FileDescriptor](#sysfilesfiledescriptor) - The file descriptor of the opened file.

##### Samples

``` javascript
// creates a new file and logs the id, name, type and size
var fileWriter = sys.files.create('test1.txt', 'text/plain');
try {
    fileWriter.writeLine('test file!');
} finally {
    fileWriter.close();
}
var descriptor = fileWriter.descriptor();
log('id: '+descriptor.id());
log('name: '+descriptor.name());
log('type: '+descriptor.type());
log('size: '+descriptor.size());
```
<br>

###  writeLine(line)

Appends a new line to the file.

##### Parameters

Name|Type|Required|Description
---|---|---|---
line|string|yes|The text to write to the file.

##### Exceptions

**unknown**

If there are problems writing to the file.

##### Samples

``` javascript
// writes a few lines in a file
var fileWriter = sys.files.create('test1.txt', 'text/plain');
try {
    fileWriter.writeLine('line 1');
    fileWriter.writeLine('line 2');
    fileWriter.writeLine('line 3');
} finally {
    fileWriter.close();
}
log('id: '+fileWriter.descriptor().id());
```
<br>

###  close()

Closes this file stream and releases any system resources associated with the stream.

##### Exceptions

**unknown**

If there are errors closing the file.

##### Samples

``` javascript
// close the file after writing it
var fileWriter = sys.files.create('test1.txt', 'text/plain');
try {
    fileWriter.writeLine('test file!');
} finally {
    fileWriter.close();
}
```
<br>

## **sys.files.CsvFileReader**

This class allows you to read a CSV file row by row. An object of this type will be returned by the [sys.files.open()](#👉-openfileid-filetype-options) method when the type is text/csv.

This class inherits all methods from [sys.files.FileReader](#sysfilesfilereader).

###  readHeaders()

Returns the headers of the CSV file.

You don’t need to call this method before reading rows; it will be done automatically when the CSV file is opened. This method simply returns the headers that were read at that time.

##### Returns

**`string[]`** -  An array containing the headers of the CSV file.

##### Samples

``` javascript
// reads a text file and prints the content
var record = sys.data.findOne('files', {code: 'test-companies'});
var fileReader = sys.files.open(record.field('file').id(), 'text/csv');
try {
  var headers = fileReader.readHeaders();
  log('headers: '+JSON.stringify(headers));
} finally {
  fileReader.close();
}
```
<br>

###  readRow()

Returns the values of the next row in an array.

##### Returns

**`string[]`** -  An array with the values of the row.

##### Samples

``` javascript
// reads a text file and prints the content
var record = sys.data.findOne('files', {code: 'test-companies'});
var fileReader = sys.files.open(record.field('file').id(), 'text/csv');
var count = 1, row;
try {
  var headers = fileReader.readHeaders();
  log('headers: '+JSON.stringify(headers));
  while (row = fileReader.readRow()) {
    log('row '+count+': '+JSON.stringify(row));
  }
} finally {
  fileReader.close();
}
```
<br>

###  readRowMap()

Returns the values of the next row in a map using the headers as the key.

##### Returns

**`object`** -  A map with the values of the row using the headers as keys

##### Samples

``` javascript
// reads a text file and prints the content
var record = sys.data.findOne('files', {code: 'test-companies'});
var fileReader = sys.files.open(record.field('file').id(), 'text/csv');
var count = 1, row;
try {
  while (row = fileReader.readRowMap()) {
    log('row '+count+': '+JSON.stringify(row));
  }
} finally {
  fileReader.close();
}
```
<br>

###  readRowStr()

Returns the values of the next row as a string.

##### Returns

**`string`** -  A string with the row values.

##### Samples

``` javascript
// reads a text file and prints the content
var record = sys.data.findOne('files', {code: 'test-companies'});
var fileReader = sys.files.open(record.field('file').id(), 'text/csv');
var count = 1, row;
try {
  var headers = fileReader.readHeaders();
  log('headers: '+JSON.stringify(headers));
  while (row = fileReader.readRowStr()) {
    log('row '+count+': '+row);
  }
} finally {
  fileReader.close();
}
```
<br>

## **sys.files.CsvFileWriter**

This class allows you to write a CSV file row by row. An object of this type will be returned by the [sys.files.create](#👉-createfileid-filetype) method when the type is **`text/csv`**.

This class inherits all methods from [sys.files.FileWriter](#sysfilesfilewriter).

###  writeHeaders(headers)

Writes the headers of the CSV file.

You should call this method before writing rows. If you start writing rows without explicitly setting the headers, the first row will be considered as the headers.

##### Parameters

Name|Type|Required|Description
---|---|---|---
headers|string[]|yes|An array of strings with the headers.

##### Samples

``` javascript
// writes headers and rows for a CSV file
var fileWriter = sys.files.create('test2.csv', 'text/csv');
try {
  fileWriter.writeHeaders(['name', 'email']);
  fileWriter.writeRow(['john', 'john@test.com']);
  fileWriter.writeRow(['adam', 'adam@test.com']);
} finally {
  fileWriter.close();
}
log('id: '+fileWriter.descriptor().id());
```
<br>

###  writeRow(row)

Appends a row the the CSV file.

##### Parameters

Name|Type|Required|Description
---|---|---|---
row|string[]|yes|An array with the values of the row. You should use the same order as headers.

##### Samples

``` javascript
// writes headers and rows for a CSV file
var fileWriter = sys.files.create('test2.csv', 'text/csv');
try {
  fileWriter.writeHeaders(['name', 'email']);
  fileWriter.writeRow(['john', 'john@test.com']);
  fileWriter.writeRow(['adam', 'adam@test.com']);
} finally {
  fileWriter.close();
}
log('id: '+fileWriter.descriptor().id());
```
<br>

###  writeRowMap(row)

Appends a row to the CSV file from a map. It will take care of the positioning of values in the row automatically based on the headers.

##### Parameters

Name|Type|Required|Description
---|---|---|---
row|object|yes|A map with the row values. Keys should be the headers.

##### Samples

``` javascript
// writes headers and rows for a CSV file
var fileWriter = sys.files.create('test2.csv', 'text/csv');
try {
  fileWriter.writeHeaders(['name', 'email']);
  fileWriter.writeRowMap({name: 'john', email: 'john@test.com'});
  fileWriter.writeRowMap({name: 'adam', email: 'adam@test.com'});
} finally {
  fileWriter.close();
}
log('id: '+fileWriter.descriptor().id());
```
<br>

###  writeRowStr(row)

Appends a row to the CSV file from a plain string. The string will be appended as it is, without any processing.

##### Parameters

Name|Type|Required|Description
---|---|---|---
row|string|yes|The row to append to the CSV file.

##### Samples

``` javascript
// writes headers and rows for a CSV file
var fileWriter = sys.files.create('test2.csv', 'text/csv');
try {
  fileWriter.writeHeaders(['name', 'email']);
  fileWriter.writeRowStr('john,john@test.com');
  fileWriter.writeRowStr('adam,adam@test.com');
} finally {
  fileWriter.close();
}
log('id: '+fileWriter.descriptor().id());
```
<br>

## **sys.files.FileDescriptor**

Handles metadata of the file.

###  id()

##### Returns

**`string`** - The ID of the file within the app.

###  name()

##### Returns

**`string`** - The name of the file.

###  hash()

##### Returns

**`string`** - The hash code of the file.

###  type()

##### Returns

**`string`** - The content type of the file. Some valid types include:

- `text/plain`
- `text/csv`
- `text/richtext`
- `text/html`

###  size()

##### Returns

**`string`** - The size of the file in bytes.
