---
title: "Creating a workflow view"
description: "Summary: let's create a cards-dashboard view with Slingr."
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

At this point, we have an app with some fantastic features up and running. However, you might desire a different design for a specific use case. Let's consider adding a workflow view to make our app look even more impressive. To provide you with a visual representation of what I mean, here's an example of how it would look:

![Tasks dashboard view](/images/vendor/task-mananger/creating-wf/w.png)

---

### Create the workflow view

Isn't it awesome? Let's create the workflow view:

1. Right-click on the node **`Model > Entities > Tasks > Views`** and select **`New view > Workflow view`** from the dropdown menu.

2. Fill in the form with:
  - `Label`: Task Board
  - `Name`: taskBoard

3. Click on **`Create and edit`**.

---

### Add some card configuration details

Once the workflow view is created, its configuration details will appear. The first thing to do is to set up the card settings:

1. In the **`Header`** setting, select **`Script`** and add the following code in the function's body:
  ```
  return 'Task #' + record.field('number').val();
  ```
<br>

2. In the **`Summary`** setting, leave **`Field`** selected, and in the **`Summary field`** select **`Title`**.

3. Click on **`Apply`** to save changes.

---

### Create a rank field

Before defining the columns, we need to add a new field to the entity that will be necessary to enable ranking of records:

1. Right-click on the node **`Model > Entities > Tasks > Fields`** and select **`New Field`**.

2. Fill in the form with:
  - `Label`: Rank
  - `Name`: rank
  - `Type`: Rank

3. Click on **`Create and edit`**.

4. Go to the **`Display options`** tab.

5. Set the option **`Visible`** to **`Never`**. This is to hide this field as we don’t want to show it to our users. We will only use it internally to keep the rank of tasks.

6. Click on **`Save`** to save changes.

![Rank Field](/images/vendor/task-mananger/creating-wf/ww.png)

---

### Create the view columns

Now we are ready to create the columns in the workflow view

1. Click on the node **`Model > Entities > Tasks > Views > Task board > Columns`**.

2. Click on the **`Create`** button on the top-right of the page.

3. Fill in the form with:
  - `Label`: `To do`
  - `Filters`: `Status` equals `To do`

4. Set the flag **`Allow to rank records`** and select the field **`Rank`** in **`Rank field`**.

5. Click on **`Create`** to save the column.

Repeat the same process to create these two additional columns:

| Label        | Filters                                        |
| ---          | ---                                            |
| In progress  | **`Status`** equals to **`In progress`**       |
| Done         | **`Status`** equals to **`Done`**              |

<br>

![workflow view columns result](/images/vendor/task-mananger/creating-wf/www.png)

### Define transitions

Once you have the columns we need to define the transitions that will allow moving a card from one column to another:

1. Click on the node **`Model > Entities > Tasks > Views > Task board > Transitions`**.

2. Click on the **`Create`** button on the top-right of the page.

3. Fill in the form with:
  - `Label`: Start work
  - `Source column`: To do
  - `Target column`: In progress
  - `Action`: Start work (tasksStartWork)

4. Click on **`Create`** to save the transition.

Repeat the same process to create these other transitions:


| Label              | Source column | Target column | Action                   |
| ---                | ---           | ---           | ---                      |
| Complete           | In progress   | Done          | Complete (tasksComplete) |
| Stop work          | In progress   | To do         | Stop work (tasksStopWork)|
| Reopen from done   | Done          | To do         | Reopen (tasksReopen)     |


---

### General improvements to the view

We are almost there! Let's do a few improvements:

1. Click on the node **`Model > Entities > Tasks > Views > Task board > CRUD actions > Tasks`**.

2. For **`Create`**, **`Read`** and **`Update`** set the flag **`Open in modal`** to **`active`** and click on **`Apply`**. This will allow the opening of tasks in a modal.

3. Click on the node **`Model > Entities > Tasks > Views > Task board`**.

4. Inside **`Menu settings`**, in the setting **`Record menu`** select **`Some`**.

5. Then in **`Record menu actions`** click on **`Add`** and select the action **`Archive (tasksArchive)`**. This is to be able to archive tasks because we didn’t create a column for the **`Archived`** status to keep this view clean.

6. Finally, click on **`Apply`** to save the new changes.

---

### Add the view on the interface navigation

1. Click on the node **`User interface > Navigation > Main menu`**.

2. Click on the **`Add new menu entry`** button on the top-right of the page and select **`Add view entry`**.

3. Fill in the form with:
  - `View`: Task board
  - `Label`: Task board
  - `Icon`: select the one you like the most!

4. Click on **`Create`** to save the menu entry.

--- 

🥳

Great! We are done. I know this section was difficult so thanks for sticking with it. 

Now let's just **`push the changes`** and open the runtime tab. 

[In the next section](/getting-started/getting/first-steps/task-mananger/workflowview/), we are going to see the changes we have made. 