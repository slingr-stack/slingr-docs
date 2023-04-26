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
Welcome back to the builder. In this section, we are going to be working with the actions of an entity. So let's get to work.
We already have the basic operations to create, edit and delete tasks. However, it would be better to have a custom workflow that enforces some rules. For example, a task can only be moved to `In progress` if it is in the status `To do`.
To create the workflow we will do the following things:
- Create actions to move the issue through the different statuses.
- Do not allow modification of the status manually.

Let's create a new action:
1. Right-click on the node `Model > Entities > Tasks > Actions`, a dropdown menu will be shown, click `New Action`.
2. Fill in the form with:
  - `Label`: Start work 
  - `Name`: startWork.
3. In `Preconditions` you will indicate in which cases the action can be executed. For the action `startWork`, the precondition is that the field `Status` must be `To do`. This can be indicated with an expression, so select the option `Expression` for `Preconditions`. Then you will need to set up the following expression by clicking on `Add new rule` and configure it like this:

![Alt Text](/images/vendor/task-mananger/adding-actions/a.png)

4. In the field `Action script` add the following script to the body of the function:

  ```js
   record.lock(function(record) {
       record.field('status').val('inProgress');
       sys.data.save(record);
   });
   ```

Great I hope you understood what we did. Now it's your turn. Add the following actions:

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
<td align="left" markdown="1">
`Status` equals to `In progress`
</td>
<td align="left" markdown="1">
```js
record.lock(function(record) {
   record.field('status').val('done');
   sys.data.save(record);
});
```
</td>
    </tr>
    <tr>
        <td align="left">Archive</td>
        <td align="left">archive</td>
<td align="left" markdown="1">
`Status` NOT equals to `Archived`
</td>
<td align="left" markdown="1">
```js
record.lock(function(record) {
   record.field('status').val('archived');
   sys.data.save(record);
});
```
</td>
    </tr>
    <tr>
        <td align="left">Stop work</td>
        <td align="left">stopWork</td>
<td align="left" markdown="1">
`Status` equals to `In progress`
</td>
<td align="left" markdown="1">
```js
record.lock(function(record) {
   record.field('status').val('toDo');
   sys.data.save(record);
});
```
</td>
    </tr>
    <tr>
        <td align="left">Reopen</td>
        <td align="left">reopen</td>
<td align="left" markdown="1">
`Status` equals to `Done` or `Archived`
</td>
<td align="left" markdown="1">
```js
record.lock(function(record) {
   record.field('status').val('toDo');
   sys.data.save(record);
});
```
</td>
    </tr>
    </tbody>
</table>

Good, now we have all the actions to manage the workflow! However, there is one problem: anyone can just change the `status` field by simply editing the task. This is not what we want; instead, we want to enforce people to follow the workflow we defined.

To prevent people from changing the status in an invalid way, what we will do is make it read-only:
1. Click on the node `Model > Entities > Tasks > Fields > Status`.
2. Select the tab `Display options`.
3. For the option `Read only` select `Always`.
4. Save changes by clicking on `Apply`.


![Alt Text](/images/vendor/task-mananger/adding-actions/aa.png)



{{< callout type="warning" contend="" >}}
To keep it simple, we just made the field read-only. However the correct way to do it is to remove permissions to change that field, which will be enforced at the API level and not just he UI. We will see that later.
{{< /callout >}}

Finally, we will add a column to the grid view that shows the actions available for that record. Follow these steps:
1. Click on the node `Model > Entities > Tasks > Views > All tasks`.
2. Inside `List settings`, set the option `Record menu` to `All` and set the flag `Display record menu column` to `active`.
3. Save changes by clicking on `Apply`.


![Alt Text](/images/vendor/task-mananger/adding-actions/aaa.png)


Awesome! Go ahead and push the changes. Remember, to do that, you need to click the icon next to your username (The hamburger icon). A drop-down menu will be shown and then click `Push changes`.

Let's wrap this session here. Go to the runtime tab and we will continue on to the next session .