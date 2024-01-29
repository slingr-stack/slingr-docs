---
title: "Packages"
description: "This section provides an overview of what packages are and how to leverage them to establish connections with external applications."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 29
---

Packages are a convenient way to import a set of metadata into your application. In simpler words, a way to import a set of prebuilt functionalities. Their primary purpose is to streamline the implementation of predefined functionalities, saving developers a significant amount of time.

The most common use cases for packages include importing utility libraries to perform common operations and connecting your application with external services by sending, receiving, and fetching data via their APIs. Packages contain all the logic necessary for utilizing an HTTP service and consuming these external APIs. For instance, there are packages available for Slack, Google Contacts, Google Calendar, and other popular cloud services, allowing your application to seamlessly leverage the features offered by these apps.

## **Package installation and management**

Available packages for your application can be found in a section called the **`"Marketplace."`** From there, you can read the package README.md to learn more and install the package. Once a package is installed, you can monitor it for updates to ensure you're using the latest version.

## **Package configuration**

While all packages share some common settings, each package may also have additional settings specific to its functionality. It's essential to refer to the package's documentation to understand the meaning of these settings.

Here, we will describe common settings:

### Label

This is the human-readable name of the package and does not impact the execution of your application.

### Name

This is the internal name of the package, used in the JavaScript API. It should not contain special characters or spaces, only letters and numbers. Be cautious when changing the package name, as it may require updates in scripts that reference the package.

### Version

This indicates the current version of the package.

### Upgrade policies

This setting defines how the package behaves when new versions are available. Versions follow the format X.Y.Z. The available options are:
  - **`Compatible version`**: Shows updates when the Y or Z values are updated.
  - **`Bug fixes`**: Shows updates when the Z value is updated.
  - **`Manual`**: Updates won't be shown for new versions.
  - **`Latest`**: Shows updates for any version change.

### Package-specific configuration

In addition to common settings, each package may have its own configuration settings. These settings often include credentials and configurations that determine the package's behavior. Packages might be environment-dependent, so consider using environment variables for configurations such as credentials to allow for different accounts in production and development environments.

### Package dependencies configuration

Packages that depend on services require selecting a service instance for the package to use. This selected service will also be the target of imported listeners.

#### Secure packages-specific configuration

For security, it's highly recommended to use environment variables to store sensitive information like passwords and keys. You can then configure a specific property to reference an environment variable. Please refer to the "Environment Variables" section for more information.

#### Data storage

Some packages may need to generate and store information during runtime securely. For instance, a GitHub package might need to store credentials securely after user authentication. In such cases, the package will encrypt and store this information in the app's storage.

## **Using packages**

When a package is added, it introduces new features to your application:

- **`Script Libraries`**: Functions within these libraries can be called from any script and belong to the script libraries imported by the package.

- **`Events`**: These events are triggered by the package and can be processed through Package Listeners. When creating a listener for packages, you will see the package and its associated events, allowing you to handle them effectively.

- **`Listeners`**: Listeners are useful for processing events, such as validating and formatting content received via webhooks through an HTTP service, and then triggering package-related events.

- **`UI Services`**: These services provide client-side functionality, such as enabling OAuth 2.0 connections to external services from the application runtime.

- **`Flow Steps`**: Flow steps introduced by packages can be used in any application flow.

All of these elements can be explored in the metadata tree of the builder within the "Packages" section.

### Script libraries

Package libraries can be invoked from any script and are located under the namespace **`pkg.<packageName>`**, where **`packageName`** corresponds to the name of the package. For instance, if a package named 'slack' provides a library called 'messages,' you can call a function like 'sendMessage()' from any script using the following syntax: **`pkg.slack.messages.sendMessage()`**.

For example, here's a call to send a message using the Slack legacy service:

```js
const msg = action.field('message').val();
pkg.slack.messages.sendMessage({channel: '#test', message: msg});
```
<br>

In case of errors during the execution of a function, an exception will be thrown. By default, this exception will halt the script's execution, and the error will be logged. However, you have the option to handle errors if necessary:

```
const msg = action.field('message').val();
try {
  pkg.slack.messages.sendMessage({channel: '#test', message: msg});
} catch (e) {
  sys.logs.warn('There was a problem sending a message through Slack: '+sys.exceptions.getMessage(e));
}
// execution will continue even if the message to Slack couldn't be sent
```
<br>

To discover the available libraries and functions within each package, it's essential to refer to the respective package's documentation. Each package may offer a unique set of libraries and functions tailored to its specific functionality.

For detailed information on what is available and how to use them, consult the documentation provided with each package.
