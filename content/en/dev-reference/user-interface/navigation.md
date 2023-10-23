---
title: "Navigation"
description: "Explanation of navigation options in Slingr apps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 45
---

Navigation within your app refers to how users can access different views.

Slingr offers three primary navigation methods:

- **`Main Menu`**: This menu is positioned on the left side of the app. Its visibility depends on the device's screen size; it may be hidden on smaller screens. You can add menu items at the root level or use menu groups to introduce one level of nesting.
- **`Header menu`**: Found in the top-right area of the app, this menu allows you to add menu items and also menu groups, actions, links to views and system actions like `Logout` or `My profile`.

Certain components provide supplementary navigation features (e.g., relationship fields enabling the jump to other records). These features are explained within each respective component's documentation.

## **Menu item**

Menu items direct users to specific views within the app. When clicked, the associated view will be displayed in the main content area.

Menu items possess the following configurable settings:

- **`View`**: This indicates the target view for the menu item.
- **`Label`**: The text to display in the menu. The default value is the same as the view's label.
- **`Icon`**: An optional icon for the menu item. Leave this field blank if no icon is desired.
- **`Expression`**: This permits the addition of filtering expressions to the chosen view. This feature is valuable when different collection views for the same entity only differ in the filtering expression. Refer to the [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) documentation for guidance on filter configuration.

For record views, you will be prompted to provide a script to select the record to be displayed in the view:

##### Returns

**`string`** - The ID of the record to be showcased in the record view.

##### Samples

``` javascript
// finds one record based on current user 
var settings;
if (sys.context.getCurrentUser().isPrimaryGroup('Testing')) {
  settings = sys.data.findOne('settings', {type: 'test'});
} else {
  settings = sys.data.findOne('settings', {type: 'prod'});
}
return settings.id();
```
<br>

---

## **Dynamic menu item**

Dynamic menu items are equipped with a script that generates a list of menu entries. Each entry will be incorporated into the menu at the position of the dynamic menu entry.

Dynamic menu items entail the subsequent settings:

- **`Label`**: This label serves as an identifier for the menu item.
- **`Script`**: This script must yield an array of menu items. It can leverage app data to ascertain which entries will be accessible and their attributes. This includes information like the associated views, labels, icons, and additional options such as filters.

  ##### Returns

  **`object []`** - An array of menu items. Each item should encompass the following details:

  - **`label`**: This label will be displayed in the menu.
  - **`icon`**: The icon's name ([you can reference icon names here]({{<ref "/dev-reference/miscellaneous/icons.md">}})).
  - **`view`**: The ID or name of the view to be loaded upon selecting the menu entry.
  - **`filters`**: If the view supports filters, this is where you can define them. 

  ##### Samples

  ``` javascript
  // returns a list of menu items that point to Companies view 
  var menuEntries = [];
  
  //this entry shows only active companies
  menuEntries.push({
    label: 'Active Companies',
    icon: 'account-circle',
    view: 'companies',
    filters: {
      active: 'true'
    }
  });
  
  // this entry shows only inactive companies
  menuEntries.push({
    label: 'Inactive Companies',
    icon: 'flower',
    view: 'companies',
    filters: {
      active: 'false'
    }
  });
  
  // this entry shows all the companies (no filter applyed)
  menuEntries.push({
    label: 'All the Companies',
    icon: 'case',
    view: 'companies'
  });
  
  return menuEntries;
  
  ```
  <br>

  ---

## **Menu group**

Menu groups offer the ability to contain multiple menu items, allowing you to logically group related items under a single label in the menu.

Menu groups come with the following configuration options:

- **`Label`**: The label to be displayed in the menu.
- **`Icon`**: An optional icon. If you prefer not to have an icon, you can leave this field blank.

It's important to note that this functionality is applicable solely to the main menu.


