---
title: "Groups and permissions"
lead: "Learning how to work with groups and permissions."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "task-mananger"
weight: 140
toc: true
---
In this next section, we are going to be working with permissions. We are going to create a new field for tasks to identify the user that has been assigned to that task. After that, we are going to create two groups, users in the first one will have access to all tasks, while users in the second one will only be able to see tasks assigned to them and won’t be able to reassign tasks or change the title of a task.

First, let's create the new field:
1. Right-click on the node `Model > Entities > Tasks > Fields`, a dropdown menu will be shown, click `New Field`.
2. Fill in the form with:  
  - `Label`: Assignee
  - `Name`: assignee
  - `Type`: Relationship
  - `Related entity`: System > Users
3. Click on `Create and Edit`.
4. Set the `Default value` to `Script`.
5. Complete the field `Script` with 
```js
return sys.context.getCurrentUserRecord();
```
6. Save the changes.

Now let’s add the two new groups:
1. Click the node `Security > Groups`.
2. Click on the `Create` button on the top-right of the page.
3. Fill in the form with:  
  - `Label`: Manager
  - `Name`: manager
4. Click on `Create and Edit`.
5. Now we need to add permissions to access entities and views. Click on the node `Security > Groups > Manager > Entity permissions`.
6. Select the `Task` entity and then click on `Apply permissions`:

![Alt Text](/images/vendor/task-mananger/groups/p.png)


7. There select the option `Read/write` and click on `Apply`.
8. Then click on the configuration button under the `Edit` column, and configure fields permissions so fields `Status` and `Rank` are read-only.
![Alt Text](/images/vendor/task-mananger/groups/pp.png)

    {{< callout type="warning" contend="" >}}
    This is the correct way to enforce permissions instead of just making the field read-only in the UI.
    {{< /callout >}}
9. Now, select the `System > Users` entity and then click on `Apply permissions`, and this time select `Read-Only`.
10. Finally, click the `Apply` button on the top-right of the listing to persist changes.
11. Click on the node `Security > Groups > Manager > View permissions`.

12. Set the flag in the column `Permission` for both views:
![Alt Text](/images/vendor/task-mananger/groups/ppp.png)

13. Finally, click the `Apply` button on the top-right of the listing to persist changes.

Awesome! We have our first group, now create a new group called Support. Once you have created the `Support` group, let's add some permissions to it:
1. Click on the node `Security > Groups > Support > Entity permissions`.
2. In the `Tasks` entity, click on the configuration button under the `Edit` column.
3. Entity permissions should be configured like this:
![Alt Text](/images/vendor/task-mananger/groups/pppp.png)

4. Field permissions should be configured like this:
![Alt Text](/images/vendor/task-mananger/groups/ppppp.png)

5. Action permissions should be configured like this:
![Alt Text](/images/vendor/task-mananger/groups/pppppp.png)

6. Click on `Apply`.
7. Now, select the `System > Users` entity, click on `Apply permissions`, and select `Read-Only`.
8. Save changes by clicking on `Apply`.
9. Configure view permissions in `Security > Groups > Support > View permissions` in the same way as for managers.

Now that we have created the groups and we have defined their permissions have been, let’s push the changes so we can use these groups when creating users.
It’s time to create a few users (make sure you pushed changes before):
1. Click on the node `Security > Users`.
2. Click on the `Create` button on the top-right of the page.
3. Fill in the form with:
  - `First name`: Manager1
  - `Last name`: Test
  - `Email`: manager1@test.com
  - `Generate Password`: true
  - `Groups`: add the Manager group as Primary
4. Click on `Create` to save the user.

Then repeat the same process for these users:

<table class="table">
    <thead>
    <tr class="header">
        <th align="left">First name</th>
        <th align="left">Last name</th>
        <th align="left">Email</th>
        <th align="left">Primary group</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td align="left">Support1</td>
        <td align="left">Test</td>
        <td align="left">support1@test.com</td>
        <td align="left">Support</td>
    </tr>
    <tr>
        <td align="left">Support2</td>
        <td align="left">Test</td>
        <td align="left">support2@test.com</td>
        <td align="left">Support</td>
    </tr>
    </tbody>
</table>



{{< callout type="warning" contend="" >}}
You don't need to push changes when working with users because users are modified directly in the runtime as they aren't part of the metadata of the app.
{{< /callout >}}

Awesome! We have finished this section and almost our app. In the next section, we are going to learn how to work with different users on the runtime. Next section:.
