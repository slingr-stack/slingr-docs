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

Hello, welcome to the builder! Here, we will be creating an app. On the left-hand side, you can see a tree with several nodes. Let's begin building something amazing!

![Alt Text](/images/vendor/task-mananger/first-steps/task_manager_builder_node.png)


To create a new entity, follow these steps:

1. Right-click on the "Model" node and select "Entities" from the dropdown menu. Then, click on "New Entity".
2. Fill out the form with the following details:
   - Label: Tasks
   - Name: tasks
   - Type: Data
3. Add a new field by filling out the following details:
   - Label: Title
   - Name: title
   - Type: Text
   - Multiplicity: One
   - Click on "Add".
4. Finally, set the record label. This label will be used to identify each record, so make sure it is easy to understand. Leave the option as "Field" and select "Title" from the dropdown menu.

If everything is correct, the form should look similar to the image provided. Click on "Create" to finish the process.

![Alt Text](/images/vendor/task-mananger/first-steps/task_manager_creating_entity.png)


Great! Now, let's create some additional fields for the entity. To do this, please right-click on the node Model > Entities > Tasks > Fields, and select New Field.

For each field, you will need to fill out the form with some basic information, including a label, name, type, and multiplicity.

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
This is the status of the task. Possible values will be <code >To do</code>, <code>In progress</code>, <code >Done</code> and <code>Archived</code>
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

Depending on the type of field, you may see additional options during creation. For example, when creating the Status field, you will need to add the four possible statuses: To do, In progress, Done, and Archived. The field creation should look similar to this:

![Alt Text](/images/vendor/task-mananger/first-steps/2.png)

Clicking on `Save and edit` will create the field and will open the details view for that field, where you will be able to change other settings, like the default value and required flag. You can also open it by clicking the field node in the tree. In our sample app we need to take care of the following things for these fields:
- `Title`: the setting `Required` should be `Always`.
- `Status`: the setting `Required` should be `Always`. Also, in the `Default value`, you should choose `Value` and then select the value `To Do` from the dropdown.

Make sure to save all changes. Your final structure should look similar to this:

![Alt Text](/images/vendor/task-mananger/first-steps/3.png)



Now that we have created the fields for the entity, the next step is to create a view so that we can see something in our app. Let's create a simple grid view that will allow you to list, create, edit, and delete tasks. Follow these steps:


1. Right-click on the node `Model > Entities > Tasks > Views`, a dropdown menu will be shown, click `New View > Grid View`.
2. Fill in the form with:
  - `Label`: All tasks
  - `Name`: tallTasks
  - `Columns`: Number, Title, Status.
3. Click on `Create`.

 
![Alt Text](/images/vendor/task-mananger/first-steps/4.png)

Once we have the view, we need to add it to the sidebar of our app so that users can navigate to it easily.
 Click the node `User interface > Navigation > Main menu` and follow these steps:
1. Click on Add new menu entry on the top-right of the page, and select  `Add view entry`.
2. Select the view All Tasks and enter the label All Tasks. You can also add an icon if you want.
3. Click on `Create`.
 
![Alt Text](/images/vendor/task-mananger/first-steps/5.png)


Great! We now have a basic app configured. Let's see how it looks in the runtime. But first, we need to push the changes so that the runtime has the latest version of our app.

In the header, click on the icon next to your username (the hamburger icon), and select Push changes from the dropdown menu. You will see a modal displaying the changes that will be pushed to the runtime. You can add a description of the changes if you want. Click on Push changes. Once the process is done, the changes will be reflected in the runtime. To open the runtime, go back to the developer portal, navigate to the Apps page, and click on the runtime button (the first one). This will automatically open the runtime in a new tab.

That's it for this section. We've made great progress! If you want to learn more, let's move on to the next section.


