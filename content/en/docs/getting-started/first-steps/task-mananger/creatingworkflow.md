---
title: "Creating a workflow view"
lead: "Learning new views of Slingr."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "task-mananger"
weight: 120
toc: true
---
At this point, we have an app with some great features running, but maybe you would like to have a view with another design for this specific use case. I think we can make our app look a lot fancier if we add a workflow view. To give you an idea of what I'm talking about, here is how it would look:


![Alt Text](/images/vendor/task-mananger/creating-wf/w.png)

Awesome right? Let’s create the workflow view:
1. Right-click on the node `Model > Entities > Tasks > Views`, a dropdown menu will be shown, click `New view > Workflow view`.
2. Fill in the form with:
  - `Label`: Task Board
  - `Name`: taskBoard
3. Click on `Create and edit`.

Once the workflow view is created, you will be seeing its configuration details. The first thing to do is to set up the card settings:

1. In the setting `Header` select `Script` and put the following code in the body of the function:
  ```js
  return 'Task #' + record.field('number').val();
  ```
2. In the setting `Summary` leave `Field` selected and in the `Summary field` select `Title`.
3. Save changes by clicking on `Apply`.

Now we should define the columns, but before doing that we will add a new field to the entity that will be needed to allow ranking records:

1. Right-click on the node `Model > Entities > Tasks > Fields`, a dropdown menu will be shown, click `New Field`.
2. Fill in the form with:
  - `Label`: Rank
  - `Name`: rank
  - `Type`: Rank
3. Click on `Create and edit` to save it.
4. Go to the tab `Display options`.
5. Set the option `Visible` to `Never`. This is to hide this field as we don’t want to show it to our users, we just will use it internally to keep the rank of tasks.
6. Click on `Save` to save changes.
![Alt Text](/images/vendor/task-mananger/creating-wf/ww.png)

Now we are ready to create the columns in the workflow view:
1. Click on the node `Model > Entities > Tasks > Views > Task board > Columns`.
2. Click on the `Create` button on the top-right of the page.
3. Fill in the form with:
  - `Label`: To do
  - `Filters`:  Status equals To do
4. Set the flag `Allow to rank records` and select the field `Rank` in `Rank field`
5. Click on `Create` to save the column.

Repeat the same process to create these two additional columns:

<table class="table">
    <thead>
    <tr class="header">
        <th align="left">Label</th>
        <th align="left">Filters</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td align="left">In progress</td>
<td align="left" markdown="1">
`Status` equals to `In progress`
</td>
    </tr>
    <tr>
        <td align="left">Done</td>
<td align="left" markdown="1">
`Status` equals to `Done`
</td>
    </tr>
    </tbody>
</table>

![Alt Text](/images/vendor/task-mananger/creating-wf/www.png)

1. Once you have the columns we need to define the transitions that will allow moving a card from one column to another:
2. Click on the node Model > Entities > Tasks > Views > Task board > Transitions.
3. Click on the Create button on the top-right of the page.
4. Fill in the form with:
  - Label: Start work
  - Source column: To do
  - Target column: In progress
  - Action: Start work (tasksStartWork)
5. Click on Create to save the transition.

Repeat the same process to create these other transitions:


<table class="table">
    <thead>
    <tr class="header">
        <th align="left">Label</th>
        <th align="left">Source column</th>
        <th align="left">Target column</th>
        <th align="left">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td align="left">Complete</td>
        <td align="left">In progress</td>
        <td align="left">Done</td>
        <td align="left">Complete (tasksComplete)</td>
    </tr>
    <tr>
        <td align="left">Stop work</td>
        <td align="left">In progress</td>
        <td align="left">To do</td>
        <td align="left">Stop work (tasksStopWork)</td>
    </tr>
    <tr>
        <td align="left">Reopen from done</td>
        <td align="left">Done</td>
        <td align="left">To do</td>
        <td align="left">Reopen (tasksReopen)</td>
    </tr>
    </tbody>
</table>

We are almost there! Let's do a few improvements:
1. Click on the node `Model > Entities > Tasks > Views > Task board > CRUD actions > Tasks`.
2. For `Create`, `Read` and `Update` set the flag `Open in modal` to `active` and click on `Apply`. This will allow the opening of tasks in a modal.
3. Click on the node `Model > Entities > Tasks > Views > Task board`.
4. Inside `Cards settings`, in the setting `Record menu` select `Some`.
5. Then in `Available actions` click on `Add` and select the action `Archive (tasksArchive)`. This is to be able to archive tasks because we didn’t create a column for the `Archived` status to keep this view clean.

Finally, let’s add the new view to the navigation:
1. Click on the node `User interface > Navigation > Main menu`.
2. Click on the `Add new menu entry` button on the top-right of the page and select `Add view entry`.
3. Fill in the form with:
  - `View`: Task board
  - `Label`: Task board
  - `Icon`: select the one you like the most!
4. Click on `Create` to save the menu entry.

Great! We are done. I know this section was difficult so thanks for sticking with it. Now let's just push the changes and open the runtime tab. In the next section, we are going to see the changes we have made. Next section: .

