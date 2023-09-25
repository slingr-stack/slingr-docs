---
title: "sys.auth"
description: "Describes utilities in the Javascript API to manage authentication with the API REST."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 60
---

## **sys.auth**

This package contains some utilities to work with authentication of the API REST.

### sendOtpCode(options)

Request an OTP code for a specific email or phone with the permission of the current user.

##### Parameters

Name|Type|Required|Description
---|---|---|---
options|object|yes|These options allow you to configure the validity of the code and token to be generated and the destination to which it will be sent. Available option is:<br> - **`email`**: where the user should be notified by email.<br> - **`phone`**: where the user should be notified by SMS.<br> - **`inactivity`**: value in hours of the time in which it will be possible to exchange the code once it has been generated. (default 24 hours - Max 7 days)<br> - **`expiration`**: value in hours of the time in which the token could be used. (default and max 30 days).

##### Returns

**`boolean`**  - **`True`** if the code was sent successfully. **`False`** if something went wrong.

##### Samples

``` javascript
// request an OTP code
var operationResult = sys.auth.sendOtpCode({email: "email@slingr.io", inactivity: 1, expiration: 24});
if (operationResult) {
  sys.logs.info('OTP code was sent successfully');
} else {
  sys.logs.error('Error the OTP code was not sent');
}
```
<br>

### createToken(idOrEmailUser, code)

Create an api token for the user represented by the given record (Only available for admins). | Exchange a valid OTP code for a token (Available for any user).

##### Parameters

Name|Type|Required|Description
---|---|---|---
idOrEmailUser|string|yes|ID or email of the user with which the token will be created.
code|string|no|The OTP code received by email or phone.

##### Returns

**`object`**  - An api token object for the user requested or for the email or phone number that was used to request the otp code.

##### Samples

``` javascript
// request an api token.

// Only available for admins or devs users
var tokenForSpecificUser = sys.auth.createToken('user@email.com');
if (tokenForSpecificUser) {
  sys.logs.info('The token for the user is: ' + JSON.stringify(tokenForSpecificUser));
} else {
  sys.logs.error('Error generating token');
}

// Any user than have a valid OTP code previously generated
var tokenFromOtpExchange = sys.auth.createToken(null, 'codeSent');
if (tokenFromOtpExchange) {
  sys.logs.info('The token for the user is: ' + JSON.stringify(tokenFromOtpExchange));
} else {
  sys.logs.error('Error generating token');
}
```
<br>