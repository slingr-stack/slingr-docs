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
In this next section, we'll work with permissions. We'll create a new field for tasks to identify the user assigned to that task. After that, we'll create two groups, where the users in the first group will have access to all tasks, while the users in the second group will only be able to see tasks assigned to them and won't be able to reassign tasks or change the task title.

Let's create the new field first:

1. Right-click on the node `Model > Entities > Tasks > Fields`,  and select New Field from the dropdown menu.
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

Now that we have our first group, create a new group called Support, and add some permissions to it:


1. Click on the node `Security > Groups > Support > Entity permissions`.
2. In the `Tasks` entity, click on the configuration button under the `Edit` column.
3. Configure entity permissions like this:

![Alt Text](/images/vendor/task-mananger/groups/pppp.png)

4. Configure field permissions like this:


![Alt Text](/images/vendor/task-mananger/groups/ppppp.png)

5. Configure action permissions like this:

![Alt Text](/images/vendor/task-mananger/groups/pppppp.png)

6. Click on `Apply`.
7. Now, select the `System > Users` entity, click on `Apply permissions`, and select `Read-Only`.
8. Save changes by clicking on `Apply`.
9. Configure view permissions in `Security > Groups > Support > View permissions` in the same way as for managers.

Now that we have created the groups and defined their permissions, let's push the changes so we can use these groups when creating users. 

It's time to create a few users (make sure you have pushed the changes before):

1. Click on the node `Security > Users`.
2. Click on the `Create` button at the top right of the page.
3. Fill in the form with:
- `First name`: Manager1
- `Last name`: Test
- `Email`: manager1@test.com
- `Generate Password`: true
- `Groups`: Add the Manager group as Primary
4. Click on `Create` to save the user.

Then repeat the same process for these users:

| First name | Last name | Email              | Primary group |
| ---------- | --------- | ------------------| ------------- |
| Support1   | Test      | support1@test.com | Support       |
| Support2   | Test      | support2@test.com | Support       |

{{< callout type="warning" content="" >}}
You don't need to push changes when working with users because users are modified directly in the runtime as they aren't part of the metadata of the app.
{{< /callout >}}

Awesome! We have finished this section and are almost done with our app. In the next section, we will learn how to work with different users in the runtime.