---
title: "Code editor"
lead: "Describes how to use the code editor component"
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


The code editor component is a text editor specialized for editing code It provides some features like: 

- Syntax highlighting
- Autocompletion
- Find
- Refactor of variables
- Display docs
- Jump to definition
 

## Features

### Autocompletion
To enable autocompletion feature you need to press `Ctrl-Space`. For Mac users  hotkey is: `Ctrl + Shift + Space` for Mac users. Then you will able to autocomplete:

- Namespaces and methods that belongs to Javascript API. Please refer to [Javascript API](https://platform-docs.slingr.io/app-development-js-api.html) to see available services.
- Namespaces, methods and constants exposed in [Libraries](https://platform-docs.slingr.io/app-development-model-libraries.html).
- Namespaces and methods exposed in endpoints components.

### Navigation
To navigate app libraries symbols you need to move cursor over desired method or constant and press `Ctrl-J`. It will 
jump to the definition of the method or constant in the app library. To open symbol in a new tab you need to press `Ctrl-L`.
If you press `Ctrl-J` or `Ctrl-L` staying over a Javascript API symbol it will open a new tab with related documentation.

### Display docs
To display summary docs for one specific symbol you need to move cursor it and press `Ctrl-I`. To access detailed 
documentation of a symbol that belongs to Javascript API you can press `Ctrl-J` or `Ctrl-L`. It will open a new tab 
in the browser

### Shortcuts summary

- `Ctrl-Space`: enable autocompletion feature.
- `Ctrl-J`: jumps to specific library or go to Javascipt API docs.
- `Ctrl-L`: jumps to specific library in a new browser tab or go to Javascipt API docs.
- `Ctrl-I`: displays summary docs for one specific symbol.
- `Ctrl-Q`: renames a specific symbol.
- `Ctrl-.`: selects a specific symbol.
- `Ctrl-/`: tries to uncomment the current selection, and if that fails, line-comments it.
- `Ctrl-Alt-F`: enables/disables full screen mode.
- `Esc`: cleans up selection. Disables full screen mode.
- `Ctrl-Z`: undo the last change.