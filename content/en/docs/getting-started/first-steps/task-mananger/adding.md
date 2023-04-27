---
title: "Adding actions to an entity"
lead: "Working with actions."
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
Welcome back to the builder! In this section, we will be working with the actions of an entity. We already have the basic operations to create, edit and delete tasks, but it would be better to have a custom workflow that enforces some rules. For example, a task can only be moved to In progress if it is in the status To do. To create the workflow, we will do the following things:


- Create actions to move the issue through the different statuses.
- Do not allow modification of the status manually.

Let's create a new action:
1. Right-click on the node `Model > Entities > Tasks > Actions`. A dropdown menu will be shown. Click on `New Action`.
2. Fill in the form with:
  - `Label`: Start work 
  - `Name`: startWork.
3. In Preconditions, indicate in which cases the action can be executed. For the action startWork, the precondition is that the field Status must be To do. To set up this expression, select the option Expression for Preconditions. Then, click on Add new rule and configure it like this:

![Alt Text](/images/vendor/task-mananger/adding-actions/a.png)

4.In the Action script field, add the following script to the body of the function:


  ```js
   record.lock(function(record) {
       record.field('status').val('inProgress');
       sys.data.save(record);
   });
   ```

Now it's your turn. Add the following actions:



To enforce the workflow we just created, we need to prevent people from changing the status field in an invalid way. Instead, we want to enforce people to follow the workflow we defined. To make the Status field read-only:


1. Click on the node `Model > Entities > Tasks > Fields > Status`.
2. Select the Display options tab.
3. For the option `Read only` select `Always`.
4. Save changes by clicking on `Apply`.


![Alt Text](/images/vendor/task-mananger/adding-actions/aa.png)

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
        <td align="left">Status <b>equals</b> to In progress</td>
        <td align="left"><pre><code>record.lock(function(record) {
   record.field('status').val('toDo');
   sys.data.save(record);
});</code></pre></td>
    </tr>
    <tr>
        <td align="left">Reopen</td>
        <td align="left">reopen</td>
        <td align="left">Status equals to Done or Archived</td>
        <td align="left"><pre><code>record.lock(function(record) {
   record.field('status').val('toDo');
   sys.data.save(record);
});</code></pre></td>
    </tr>
    </tbody>
</table>


{{< callout type="warning" contend="" >}}
To properly enforce this restriction, we should remove permissions to change that field, which will be enforced at the API level, not just the UI. We will see how to do this later.
{{< /callout >}}

In the next step, we will add a column to the grid view that displays the available actions for each record. Follow these steps:
1. Click on the node `Model > Entities > Tasks > Views > All tasks`.
2. In the "List settings" section, set the "Record menu" option to "All" and activate the "Display record menu column" flag.
3. Save changes by clicking on `Apply`.


![Alt Text](/images/vendor/task-mananger/adding-actions/aaa.png)


Once you have completed these steps, you can push the changes by clicking on the icon next to your username (the hamburger icon) and selecting "Push changes" from the dropdown menu.

That's it for this session. Head over to the runtime tab to continue with the next section.