---
title: "Code editor"
description: "Learn how to utilize the features of the code editor component."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 156
---

The code editor component is a specialized text editor designed for editing code. It provides several features, including:

- Syntax highlighting
- Autocompletion
- Find
- Variable refactoring
- Displaying documentation
- Jumping to definitions

## **Features**

### Autocompletion
To enable the autocompletion feature, press **`Ctrl-Space`** (or **`Ctrl + Shift + Space`** for Mac users). Once enabled, you can autocomplete:

- Namespaces and methods belonging to the JavaScript API. Please refer to the [JavaScript API documentation]({{<ref "/dev-reference/scripting/namespaces.md">}}) for available services.
- Namespaces, methods, and constants exposed in [Libraries]({{<ref "/dev-reference/data-model-and-logic/libraries.md">}}).
- Namespaces and methods exposed in legacy service components.

### Navigation
To navigate through app library symbols, move the cursor over the desired method or constant and press **`Ctrl-J`**. This action will take you to the definition of the method or constant in the app library. To open a symbol in a new tab, press **`Ctrl-L`**. If you press **`Ctrl-J`** or **`Ctrl-L`** while positioned over a JavaScript API symbol, it will open a new tab with related documentation.

### Displaying docs
To display summary documentation for a specific symbol, move the cursor over it and press **`Ctrl-I`**. To access detailed documentation for a symbol belonging to the JavaScript API, press **`Ctrl-J`** or **`Ctrl-L`**. This action will open a new tab in your browser.

### Shortcuts summary

- **`Ctrl-Space`**: Enable the autocompletion feature.
- **`Ctrl-J`**: Jump to a specific library or go to JavaScript API documentation.
- **`Ctrl-L`**: Jump to a specific library in a new browser tab or go to JavaScript API documentation.
- **`Ctrl-I`**: Display summary documentation for a specific symbol.
- **`Ctrl-Q`**: Rename a specific symbol.
- **`Ctrl-.`**: Select a specific symbol.
- **`Ctrl-/`**: Attempt to uncomment the current selection, and if that fails, line-comment it.
- **`Ctrl-Alt-F`**: Toggle full-screen mode.
- **`Esc`**: Clear the selection. Disable full-screen mode.
- **`Ctrl-Z`**: Undo the last change.
