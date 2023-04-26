---
title: "First steps with the builder"
lead: "First steps building our app."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "task-mananger"
weight: 80
toc: true
---

Hi, welcome to the builder, here we are going to build the app. As you can see on the left, there is a tree with multiple items, which we are going to call nodes. Let's start building something great.

![Alt Text](/images/vendor/task-mananger/first-steps/task_manager_builder_node.png)


First, let's create a new Entity:

1. Right-click on the node `Model > Entities`, a dropdown menu will be shown, click `New Entity`.
2. Fill in the form with:  
  - `Label`: Tasks
  - `Name`: tasks
  - `Type`: Data
3. Let's add a simple field, fill the label with `Title` and the name with `title`, the type should be `text`, and the multiplicity `one`. Click on add.
4. Finally, let's set the record label. The record label is calculated for every record and it is something that will identify your record. It doesn’t need to be unique but should be human-friendly. Leave the option in `Field` and in the dropdown select `Title`.

The form should look something like this. If so click on `Create`.
![Alt Text](/images/vendor/task-mananger/first-steps/task_manager_creating_entity.png)


Great!. Now that we have finished creating the entity, let's create some more fields. Right-click on the node `Model > Entities > Tasks > Fields`, and click `New Field`.
For every field, you will need to complete the form with some basic information: label, name, type, and multiplicity. 
Create the following fields with these settings:

<table class="table">
    <thead>
    <tr class="header">
        <th align="left">Label</th>
        <th align="left">Name</th>
        <th align="left">Type</th>
        <th align="left">Required</th>
        <th align="left">Default value</th>
        <th align="left">Notes</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td align="left">Number</td>
        <td align="left">number</td>
        <td align="left">Auto increment</td>
        <td align="left">-</td>
        <td align="left">-</td>
        <td align="left">This a number that will be incremented for every new task created.</td>
    </tr>
    <tr>
        <td align="left">Title</td>
        <td align="left">title</td>
        <td align="left">Text</td>
        <td align="left">Yes</td>
        <td align="left">-</td>
        <td align="left">The title of the task.</td>
    </tr>
    <tr>
        <td align="left">Status</td>
        <td align="left">status</td>
        <td align="left">Choice</td>
        <td align="left">Yes</td>
        <td align="left">To Do</td>
<td align="left" markdown="1">
This is the status of the task. Possible values will be `To do`, `In progress`, `Done` and `Archived`
</td>
    </tr>
    <tr>
        <td align="left">Description</td>
        <td align="left">description</td>
        <td align="left">HTML</td>
        <td align="left">No</td>
        <td align="left">-</td>
        <td align="left">A longer description of the task.</td>
    </tr>
    </tbody>
</table>

Depending on the type you might see some additional options at creation time, which is the case for the `Status` field where you will need to add the four possible statuses: `To do`, `In progress`, `Done`, and `Archived`. It should look something like this:
![Alt Text](/images/vendor/task-mananger/first-steps/2.png)

Clicking on `Save and edit` will create the field and will open the details view for that field, where you will be able to change other settings, like the default value and required flag. You can also open it by clicking the field node in the tree. In our sample app we need to take care of the following things for these fields:
- `Title`: the setting `Required` should be `Always`.
- `Status`: the setting `Required` should be `Always`. Also, in the `Default value`, you should choose `Value` and then select the value `To Do` from the dropdown.

Remember to save all the changes. In the end, you should end up with a structure similar to this one:
![Alt Text](/images/vendor/task-mananger/first-steps/3.png)


ow that we have created the fields for the entity, the next step is to create a view so we can see something in our app. For that, we will create a simple grid view that will allow you to list, create, edit and delete tasks.
To create the grid view, follow these steps:

1. Right-click on the node `Model > Entities > Tasks > Views`, a dropdown menu will be shown, click `New View > Grid View`.
2. Fill in the form with:
  - `Label`: All tasks
  - `Name`: tallTasks
  - `Columns`: Number, Title, Status.
3. Click on `Create`.

 
![Alt Text](/images/vendor/task-mananger/first-steps/4.png)

Once we have the view, we need to indicate how to navigate it. Let's add it to what's going to be the sidebar of our app. Click the node `User interface > Navigation > Main menu` and follow these steps:
1. Click on `Add new menu entry` on the top-right of the page, and then click on the option `Add view entry`.
2. In the view, select the view `All Tasks` and complete the label with `All Tasks`. You can add an icon if you want. 
3. Click on `Create`.
 
![Alt Text](/images/vendor/task-mananger/first-steps/5.png)


Great! We have a basic app already configured. Let's see how it looks on the runtime, but first, we need to push the changes so the runtime has the latest version of our app.
In the header, click the icon next to your username (The hamburger icon). A drop-down menu will be shown, click `Push changes`.
When you click on it you will see a modal showing the changes that will be pushed to the runtime. If you want you can add a description of the changes you did. Click on `Push changes`. Once the process is done, the changes will be reflected in the runtime. To open the runtime, go back to the developer portal, in the Apps page, click the runtime button (The first one). That will automatically open the runtime in a new tab.
Let's wrap this section here, we have made great progress, if you want to learn more let's go to the next section 

