---
title: "Metadata history"
lead: "Describes how to revise changes in metadata."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 8
---
## General description
You can see all the changes that has been made to a particular metadata resource. In order to see them, you should first navigate to that particular resource from the [navigation tree]({{site.baseurl}}/app-development-metadata-management-metadata-editor-app-resources.html#navigation-tree) or using the [navigate metadata]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-navigate-metadata.html) feature. Once the view of that resource is open in the central panel, you should see a `tools` button in the header. Clicking on this button will show two possible actions: `show history` and `find usages`. Clicking on the first one will open in the central panel the history of changes of that particular resource.

### History View
The history view has two main section. On the top, you will see a table listing all the different changes made to that resource grouped by timestamp. The table also display some additional information such as the **user**, the **change type** and the **path** of that metadata. Clicking on one of those items will render another table in the **bottom section** where you can see a detailed list of every property that changed in that timestamp. Additionally, on a second tab of the bottom section you can see a detailed list of every property that has **automtically** changed in that timestamp. Those changes are result of some refactoring rules that the platform applies for each metadata. For instance, if you create a new field in an entity that already has [record views]({{site.baseurl}}/app-development-ui-record-views.html) , you will see that in the automatic changes the new field has been automatically created in those record views. 
