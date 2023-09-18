---
title: "Adding actions to an entity"
lead: "Summary: Working with actions."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
docs:
parent: "task-mananger"
weight: 100
toc: true
---
In this section, we will be working with the **``actions``** of an entity.

**``Let's go back to the builder and get to work. ``**

We already have the basic operations to **`create`**, **`edit`**, and **`delete`** tasks. However, it would be better to have a custom workflow that enforces some rules. For example, a task can only be moved to **`"In progress"`** if it is in the status **`"To do"`**. To create the workflow, we will:

    ✅ Create actions to move the task through the different statuses.
    ✅ Do not allow modification of the status manually.
    ✅ Add a column to the grid view.

### Create the action "Start work"

👉 Right-click on the node **`Model > Entities > Tasks > Actions`**, a dropdown menu will be shown, click **`"New Action"`**.

👉 Fill in the form with:
- `Label`: Start work
- `Name`: startWork.

👉 In the Preconditions section, you will indicate under which conditions the action can be executed. For the **`"startWork"`** action, the precondition is that the field **`"Status"`** must be **`"To do"`**. This can be indicated with an expression. Select the option **`"Expression"`** for Preconditions, then set up the following expression by clicking on **`"Add new rule"`** and configure it like this:

![Preconditions](images/vendor/task-mananger/adding-actions/a.png)

👉 In the field **``"Action script"``**, add the following script to the body of the function:

```js
record.lock(function(record) {
    record.field('status').val('inProgress');
    sys.data.save(record);
});
```

---

### Create some more actions

**Now it's your turn!**

In the following table, you will find the settings for the actions required to handle different task statuses. Please repeat the instructions from the previous step to create each action.

<br>
<table class="table">
<thead>
<tr class="header">
    <th align="left">Label</th>
    <th align="left">Name</th>
    <th align="left">Precondition</th>
    <th align="left">Action script</th>
</tr>
</thead>
<tbody>
<tr>
    <td align="left">Complete</td>
    <td align="left">complete</td>
    <td align="left">Status <b>equals</b> to <code>In progress</code></td>
    <td align="left"><pre><code>record.lock(function(record) {
record.field('status').val('done');
sys.data.save(record);
});</code></pre></td>
</tr>
<tr>
    <td align="left">Archive</td>
    <td align="left">archive</td>
    <td align="left">Status <b>NOT equals</b> to<code>Archived</code></td>
    <td align="left"><pre><code>record.lock(function(record) {
record.field('status').val('archived');
sys.data.save(record);
});</code></pre></td>
</tr>
<tr>
    <td align="left">Stop work</td>
    <td align="left">stopWork</td>
    <td align="left">Status <b>equals</b> to <code>In progress</code></td>
    <td align="left"><pre><code>record.lock(function(record) {
record.field('status').val('toDo');
sys.data.save(record);
});</code></pre></td>
</tr>
<tr>
    <td align="left">Reopen</td>
    <td align="left">reopen</td>
    <td align="left">Status <b>equals</b> to <code>Done or Archived</code></td>
    <td align="left"><pre><code>record.lock(function(record) {
record.field('status').val('toDo');
sys.data.save(record);
});</code></pre></td>
</tr>
</tbody>
</table>
<br>

---

### Limit write access to status field

Good, now we have all the actions to manage the workflow! However, there is one problem: anyone can simply change the status field by editing the task. This is not what we want; instead, we want people to follow the actions workflow we have defined. To achieve this, we need to make the Status field read-only:

1. Click on the node **`Model > Entities > Tasks > Fields > Status`**.
2. Select the **`Display options`** tab.
3. For the option **`Read only`** select **`Always`**.
4. Save changes by clicking on **`Apply`**.

![status-field](images/vendor/task-mananger/adding-actions/aa.png)

<br>

{{< callout type="warning" contend="" >}}
<b>To keep it simple, we just made the field read-only</b>. However, the correct way to do it is to remove permissions to change that field, which will be enforced at the API level and not just the UI. We will see that later.
{{< /callout >}}

### Adding a column to the grid view

Finally, we will add a column to the grid view that shows the actions available for that record:

1. Click on the node **``Model > Entities > Tasks > Views > All tasks``**.
2. Inside List settings, set the option **``"Record menu"``** to **``"All"``** and set the flag **``"Display record menu column"``** to **``"active"``**.
3. Save changes by clicking on **``"Apply"``**.

**`Awesome! Go ahead and push the changes. `**

To do that, you need to click the icon next to your username (The hamburger icon). A drop-down menu will be shown, then click **``"Push changes"``**.

---

🎉

Congratulations! Now you have learned how to create actions to model the behavior of the entity fields and records.

Let's wrap up this session here. Go to the runtime tab, and we will continue on to the next session **`"Testing actions on runtime"`**.










