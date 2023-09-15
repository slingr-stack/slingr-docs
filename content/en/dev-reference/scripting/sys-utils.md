---
title: "sys.utils"
lead: "Describes misc utilities in the Javascript API."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 74
---

## **sys.utils.text**

This package contains methods to manipulate text.

###  findTokens(text)

The **`findTokens`** function is used to locate and extract all tokens from a given string. Tokens in the string are identified as sequences that start with "#" and adhere to the following format:

```
#name:value
#name:value1,value2,value3
#name
```
<br>

This way you could have a text like this:

```
#project:test
#assignee:user1
#important

There is a bug with user profile popup!
```
<br>

This method enables you to effortlessly extract the tokens **`project`**, **`assignee`**, and **`important`**.

This method proves highly valuable for parsing commands within plain text messages, such as emails or instant messages.

##### Parameters

Name|Type|Required|Description
---|---|---|---
text|string|yes|Text to parse to find tokens.

##### Returns

**`object`** - A key-value structure where the key represents the token name. The value could be an array if there is more than one value. For example, given the following text:

```
#project:test1
#assignee:admin
#watchers:user1,user2
#important

This is an important issue! Please fix.

Also related to #project:test2
```
<br>

Tokens will be:

```
{
  project: ['test1', 'test2'],
  assignee: 'admin',
  watchers: ['user1', 'user2'],
  important: true
}
```
<br>

Notice that when you don’t specify a value for the token, it will be set to **`true`**.

##### Samples

``` javascript
// finds tokens in a string
var str = "this is a ticker #project:test1 #type:bug #hotfix";
var tokens = sys.utils.text.findTokens(str);
log('tokens: '+JSON.stringify(tokens));
```
<br>

###  processTemplate(template, options)

This function enables you to process a Freemarker template. [You can find more information about Freemarker here](http://freemarker.org/)

##### Parameters

Name|Type|Required|Description
---|---|---|---
template|string|yes|The Freemarker template
options|object|no|**`Options`** to process the template. The available options are: <br> - **`unescapeHtml`**: Use this option if you want to unescape the resulting string after processing the template. <br> - **`model`**: These are the objects you want to merge into your template.

##### Returns

**`string`** - The processed template

##### Samples

``` javascript
// process a template for an email for a contact
var record = sys.data.findOne('contacts', {email: 'gowensb1@google.ca'});
var recordStr = record.toJson({relationshipsToFetch: 'company', user: 'gowensb1@google.ca '});
var template = "Hi ${contact.firstName} ${contact.lastName}:\n\n We want to say hi!\n\nThanks!";
var emailContent = sys.utils.text.processTemplate(template, {
  model: {
    contact: recordStr
  }
});
log('email content: '+emailContent);
```
<br>

###  htmlToText(html)

This function allows you to convert an HTML text into plain text by removing HTML tags.

#### Parameters

| Name  | Type    | Required | Description                    |
| ----- | ------- | -------- | ------------------------------ |
|  html | string  | yes      | The HTML text to be parsed.    |

#### Returns

**`string`** - A plain text with HTML tags removed.

##### Samples

``` javascript
// convert an html text into a plain text
var html = "<strong>This is sparta</strong>";
var text = sys.utils.text.htmlToText(html);
log('Text: ' + text);
```
<br>

###  textToHtml(text)

This function allows you to convert a plain text into HTML text.

#### Parameters

| Name  | Type    | Required | Description                    |
| ----- | ------- | -------- | ------------------------------ |
| text  | string  | yes      | The plain text to be parsed.   |

#### Returns

**`string`** - An HTML with plain text tokens removed.

##### Samples

``` javascript
// convert a plain text into an html text
var text = "This is sparta\n";
var html = sys.utils.text.textToHtml(text);
log('HTML: ' + html);
```
<br>

###  markdownToHtml(markdownText)

This function allows you to convert an markdown text into HTML by transforming markdown tokens into html tags.

#### Parameters

| Name  | Type    | Required | Description                    |
| ----- | ------- | -------- | ------------------------------ |
| markdownText |string | yes | The markdown text to be parsed.|

#### Returns

**`string`** - An HTML text with markdown tokens transformed into html tags

##### Samples

``` javascript
// convert a markdown text into an html text
var markdown = "**This is sparta**";
var html = sys.utils.text.markdownToHtml(markdown);
log('HTML: ' + html);
```
<br>

###  htmlToMarkdown(html)

This function allows you to convert an HTML text into markdown text by transforming html tags into html markdown tokens.

#### Parameters

| Name  | Type    | Required | Description                    |
| ----- | ------- | -------- | ------------------------------ |
| hrml |string | yes | The html text to be parsed.|

#### Returns

**`string`** - A markdown text with html tags transformed into markdown tokens

##### Samples

``` javascript
// convert an html text into a markdown text
var html = "<strong>This is sparta</strong><br/>";
var markdown = sys.utils.text.htmlToMarkdown(html);
log('Markdown text: ' + markdown);
```
<br>

## **sys.utils.xml**

This package contains methods for manipulating XML format.

###  xmlToJson(xml)

This function allows you to convert an XML text into a JSON object.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
xml|string|yes|The xml text to be converted

#### Returns

**`object`** -  the JSON representation of the given XML

##### Samples

``` javascript
// convert an XML text into a JSON object
var xml = '<note><to>Tove</to><from>Jani</from></note>';
var json = sys.utils.xml.xmlToJson(xml);
log('Json: ' + JSON.stringify(json));
// this will print {"note":{"to":"Tove","from":"Jani"}}
```
<br>


###  jsonToXml(json)

This function allows you to convert a JSON object into an XML text.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
json|object|yes|The JSON object to be parsed

#### Returns

**`string`** - A XML text

##### Samples

``` javascript
// convert a JSON object into a XML text
var json = {"note":{"to":"Tove","from":"Jani"}};
var xml = sys.utils.xml.jsonToXml(json);
log('XML: ' + xml);
```
<br>

## **sys.utils.base64**

This package contains utilities for Base64 encoding. Base64 encoding is used to represent binary data in an ASCII format.

###  encode(string)

This function encodes binary data using the Base64 algorithm. It does not chunk the output.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
string|string|yes|Data to be encoded.

#### Returns

**`string`** - A string containing Base64 characters in their UTF-8 representation.

##### Samples

``` javascript
// encode a string
var pass = 'This_is_a_pass';
var encodedPass = sys.utils.base64.encode(pass);
log('Encoded pass: ' + encodedPass);
```
<br>

###  decode(base64String)

Decodes a Base64 string into octets.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
base64String|string|yes|String containing base 64 data

#### Returns

**`string`** - Decoded data

##### Samples

``` javascript
// decode an encoded string
var pass = 'VGhpc19pc19hX3Bhc3M=';
var rawPass = sys.utils.base64.decode(pass);
log('Pass: ' + rawPass);
```
<br>


## **sys.utils.numbers**

This package contains methods to assist in managing numbers.

###  BigNumber()

This is a library for arbitrary-precision decimal and non-decimal arithmetic. For more information, please visit: [BigNumber.js](http://mikemcl.github.io/bignumber.js/)

##### Samples

``` javascript
// Returns a BigNumber whose value is the value of this BigNumber plus n
var n = 0.2;
var bigNumber = sys.utils.numbers.BigNumber(0.1);
return bigNumber.plus(n);
```
<br>

###  format(value, options)

Returns a string of formatted number of the value or string without format.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|number|yes|The value to be formtted.
options|object|no|These parameters are used to format a value. If left empty, the default display options are used for formatting.<br> - **`thousandsSeparator`**: Specifies whether to show a thousands separator. Accepts **`true`** or **`false`**.<br> - **`limitNumberOfDecimals`**: Indicates whether to limit the number of decimals. Accepts **`true`** or **`false`**.<br> - **`numberOfDecimals`**: Specifies the number of decimals to be displayed. Default is 2.<br> - **`limitRuleType`**: Specifies the rule to use when limiting decimals. Options include **`TRUNCATE`** or **`ROUND`**. Default is **`TRUNCATE`**.

#### Returns

**`string`** - string of formatted value of number.

##### Samples

``` javascript
// prints the formatted value of a decimal value
var options = {thousandsSeparator: true, limitNumberOfDecimals:true, numberOfDecimals: 3};
var formattedNumber = sys.utils.numbers.format(12345.12345, options);
log('Result: ' + formattedNumber);
```
<br>

###  getRandomValue()

Using a random number algorithm generates a strong cryptographic decimal number between 0.0 and 1.0.

##### Samples

``` javascript
// prints a random number.
var randomNumber = sys.utils.numbers.getRandomValue();
log('Result: ' + randomNumber);
```
<br>

## **sys.utils.crypto**

This package contains methods for performing basic cryptographic operations.

###  sha1(message)

This function calculates the SHA-1 digest of a message and returns the result as a hexadecimal string.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
message|string|yes|The string to be converted

#### Returns

**`string`** - The result hash as String.

##### Samples

``` javascript
// converts a company to the string representation
var convertedMessage = sys.utils.crypto.sha1('my custom message');
log('SHA-1 string: '+convertedMessage);
```
<br>

###  sha3(message, bits)

This function calculates the SHA-3 digest of a message and returns the result as a hexadecimal string.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
message|string|yes|The string to be converted
bits|number|no|Valid number of bits for conversion (default 256)

#### Returns

**`string`** - The result hash as String.

##### Samples

``` javascript
// converts a company to the string representation
var convertedMessage = sys.utils.crypto.sha3('my custom message');
log('SHA-3 string: '+convertedMessage);

```
<br>

###  keccak(message, bits)

This function calculates the KECCAK digest of a message and returns the result as a hexadecimal string.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
message|string|yes|The string to be converted
bits|number|no|Valid number of bits for conversion (default 256)

#### Returns

**`string`** - The result hash as String.

##### Samples

``` javascript
// converts a company to the string representation
var convertedMessage = sys.utils.crypto.keccak('my custom message');
log('Keccak string: '+convertedMessage);

```
<br>

###  jwt.generate(payload, privateKey, algorithm)

Uses a secret key and a algorithm to generate a JWT token of a JSON object.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
payload|object|yes|The payload in JSON format to be encoded.
privateKey|string|yes|The private key to sign the token.
algorithm|string|yes|The algorithm to use for the signature.

#### Returns

**`string`** - The JWT token as String.

##### Samples

``` javascript
// generates a JWT token
var convertedJWT = sys.utils.crypto.jwt.generate({iss: "123", sub: "456"}, "secret", "HS256");
log('JWT token: '+convertedJWT);
```
<br>

###  jwt.verify(token, privateKey)

Uses a public key and a JWT token to verify if it is a valid JWT.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
token|string|yes|The JWT token to be verified in String format.
privateKey|string|yes|The private key to decode the token.

#### Returns

**`boolean`** - **`True`** if the token is valid, **`false`** otherwise.

##### Samples

``` javascript
// verifies a JWT token
var validJWT = sys.utils.crypto.jwt.verify("ey.js.wt", "public");
log('JWT token is valid? : ' + validJWT);
```
<br>

###  jwt.decodeToken(token)

Uses a JWT token to decode the payload.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
token|string|yes|The JWT token to be decoded in String format.

#### Returns

**`string`** -  The payload as String.

##### Samples

``` javascript
// decodes a JWT token
var tokenJWT = sys.utils.crypto.jwt.decodeToken("ey.js.wt");
log('JWT token: ' + tokenJWT);
```
<br>

## **sys.utils.time**

This package contains methods for working with time.

###  getTimeZoneOffset(timeZoneId, timestamp)

This function retrieves the offset in milliseconds between the specified time zone and the standard time zone (GMT). If daylight saving time is in effect in the specified time zone at the given timestamp, the offset value is adjusted to account for daylight saving time.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
timeZoneId|string|yes|The time zone identifier (ID) options include:<br> - **`US/Hawaii`** <br> - **`US/Alaska`** <br> - **`US/Pacific`** <br> - **`US/Mountain`** <br> - **`US/Central`** <br> - **`US/Eastern`** <br> - **`Canada/Atlantic`** <br> - **`America/Buenos_Aires`**<br> - For additional available time zones, please refer to the [list of time zones](https://joda-time.sourceforge.net/timezones.html) for more options.
timestamp|object|no|The point in time the time zone offset should be calculated. If it is not specified then the current date time is going to be used.

#### Returns

**`number`** - The timezone offset in milliseconds.

##### Samples

``` javascript
// Logs the specific time zone in hours
var offset = sys.utils.time.getTimeZoneOffset('America/Buenos_Aires');
log('offset in hours: '+offset/1000/60/60);
```
<br>


###  setTimeZone(date, timeZoneId)

Apply the offset between given time zone and standard time zone (GMT) to the passed date.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
date|object|yes|The date to apply the given offset
timeZoneId|string|yes|The time zone identifier (ID) options include:<br> - **`US/Hawaii`** <br> - **`US/Alaska`** <br> - **`US/Pacific`** <br> - **`US/Mountain`** <br> - **`US/Central`** <br> - **`US/Eastern`** <br> - **`Canada/Atlantic`** <br> - **`America/Buenos_Aires`**<br> - For additional available time zones, please refer to the [list of time zones](https://joda-time.sourceforge.net/timezones.html) for more options.

#### Returns

**`object`** - The date with the time zone applied.

##### Samples

``` javascript
// Apply the specified time zone to the given date
var dateWithOffset = sys.utils.time.setTimeZone(new Date(), 'America/Buenos_Aires');
log('date modified: ' + dateWithOffset);
```
<br>

###  format(date, pattern, timezone)

Apply the pattern and the time zone to a date and return it as string.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
date|object|yes|The date to apply the given pattern and offset
pattern|string|yes|The pattern to format the date
timezone|object|no| Timezone configuration object or the string code for a time zone. If it is not specified the default app timezone is going to be used.<br> Valid time zone codes are:<br> - **`US/Hawaii`** <br> - **`US/Alaska`** <br> - **`US/Pacific`** <br> - **`US/Mountain`** <br> - **`US/Central`** <br> - **`US/Eastern`** <br> - **`Canada/Atlantic`** <br> - **`America/Buenos_Aires`**<br> - For additional available time zones, please refer to the [list of time zones](https://joda-time.sourceforge.net/timezones.html) for more options.

#### Returns

**`string`** - The date with the time zone applied.

##### Samples

``` javascript
// Apply the specified format and time zone to the given date
var formattedDate = sys.utils.time.format(new Date(), 'yyyy-MM-dd HH:mm Z', 'America/Buenos_Aires');
log('date formatted is: ' + formattedDate);
```
<br>

###  parse(date, pattern, timezone)

Parse a date string using pattern and time zone and return it as date object.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
date|string|yes|The date string to parse using the given pattern and timezone
pattern|string|yes|The pattern to parse the date string
timezone|string|no| Timezone configuration object or the string code for a time zone. If it is not specified the default app timezone is going to be used.<br> Valid time zone codes are:<br> - **`US/Hawaii`** <br> - **`US/Alaska`** <br> - **`US/Pacific`** <br> - **`US/Mountain`** <br> - **`US/Central`** <br> - **`US/Eastern`** <br> - **`Canada/Atlantic`** <br> - **`America/Buenos_Aires`**<br> - For additional available time zones, please refer to the [list of time zones](https://joda-time.sourceforge.net/timezones.html) for more options.

#### Returns

**`object`** - The final parsed date object with the time zone applied.

##### Samples

``` javascript
// Parse given date using a specific pattern and timezone
var parsedDate = sys.utils.time.parse('2020-07-17 13:30', 'yyyy-MM-dd HH:mm', 'America/Buenos_Aires');
log('date is: ' + parsedDate);
```
<br>

## **sys.utils.concurrency**

This package contains methods to assist in managing concurrency issues.

###  tryLock(key, timeout)

This function attempts to acquire a lock for a specified key. It is typically used when multiple threads require synchronization.

**Important**: Developers must ensure that locks are released. We recommend using try/finally clauses to handle this. While the platform will automatically release locks after the script is fully executed, it is a best practice to do so explicitly.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
key|string|yes|Key to be locked
timeout|number|yes|Maximum time in seconds to wait for the lock.

#### Returns

**`boolean`** - **`true`** if the lock was acquired, **`false`** otherwise.

##### Samples

``` javascript
// locks the key 'lock1'
if (sys.utils.concurrency.tryLock('lock1')) {
  try {
    sys.logs.info('lock acquired!');
  } finally {
    sys.utils.concurrency.unlock('lock1');
  }
}
```
<br>

###  lock(key, timeoutOrSuccessCallback, successCallback)

This function acquires a lock for a specified key. It is typically used when multiple threads require synchronization.

**Important**: Developers must ensure that locks are released. We recommend using try/finally clauses to handle this. While the platform will automatically release locks after the script is fully executed, it is a best practice to do so explicitly.
#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
key|string|yes|Key to be locked
timeoutOrSuccessCallback|object|no|The maximum time in seconds to wait for the lock or the callback executed after the lock is successfully acquired. If this parameter is a function, the lock is released automatically.
successCallback|function|no|A callback function that is executed after the lock is successfully acquired and any optional timeout delay has elapsed.

#### Exceptions

**tiemout**

If lock could not have been acquired.

##### Samples

``` javascript
// locks the key 'lock1'
try {
  sys.utils.concurrency.lock('lock1');
  sys.logs.info('lock acquired!');
  //do something
  sys.utils.concurrency.unlock('lock1');
} catch (e) {
  sys.logs.error('lock NOT acquired!')
}
```
<br>

``` javascript
// locks the key 'lock1' using a callback
sys.utils.concurrency.lock('lock1', function () {
    sys.logs.info('lock acquired!');
});
// lock will be released automatically
```
<br>

###  unlock(key)

Releases a lock for a specified key.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
key|string|yes|Key to be released

##### Samples

``` javascript
// acquires and release the lock over key 'lock1'
if (sys.utils.concurrency.lock('lock1')) {
  try {
    log('lock acquired!');
  } finally {
    sys.utils.concurrency.unlock('lock1');
  }
}
```
<br>

###  forceUnlock(key)

Releases a lock for a specified key. This is useful for mantenaince purposes.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
key|string|yes|Key to be released

##### Samples

``` javascript
// acquires and force to release the lock over key 'lock1'
if (sys.utils.concurrency.lock('lock1')) {
  try {
    log('lock acquired!');
  } finally {
    sys.utils.concurrency.forceUnlock('lock1');
  }
}
```
<br>

## **sys.utils.script**

This package contains misc methods useful when scripting.

###  wait(timeToWait)

Waits blocking the execution of the script.

#### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
timeToWait|number|yes|The number of milliseconds to wait.

##### Samples

``` javascript
// waits for 2 seconds
sys.utils.script.wait(2000);
// continue execution
```
<br>

###  eval(scriptToEval, context)

Evaluates JavaScript code represented as a string as classic eval but storing code to be displayed in case of errors.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
scriptToEval|string|yes|Script to be evaluated.
context|object|no| An object that will serve as the reference during evaluation. It is required when making indirect calls.

##### Returns

**`object`** - result of **`eval`**

##### Samples

``` javascript
// waits for 2 seconds
sys.utils.script.wait(2000);
// continue execution
```
<br>