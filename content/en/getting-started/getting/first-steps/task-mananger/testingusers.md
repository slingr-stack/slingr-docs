---
title: "Testing users and permissions"
description: "Summary: test users and permissions"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "Testing permissions of our app."
weight: 150
toc: true
---

In this section, we will test the different permissions and users that we created in the previous section.

### Log in as a Developer

👉 Log in to the runtime with your developer account (the same one we have been using). We don’t need to log in and out with the different users we created just for our app.

👉 Developers can switch users with a special feature that allows them to emulate other users, which is useful for testing different users and permissions.

👉 Once you are logged in as a developer, follow these steps:

   1. Click on the sandwich button with your name on the header to show a dropdown menu.

   2. Click on **`"Switch user"`**, and a pop-up should open.
  
   3. In the **`"Switch user"`** field of the dropdown menu, select **`"Manager1 Test"`**, and then click on **`"Switch"`**.

👉 **You should now be logged in as "Manager1 Test" and able to see all tasks.**

---

### Testing Permissions

Follow these steps to test permissions:

1. Create two tasks: assign one to **`"Support1 Test"`** and the other to **`"Support2 Test"`**.

2. Switch to user **`"Support1 Test"`** using the **`"Switch user"`** option in the user menu.

3. You should only see the tasks assigned to **`"Support1 Test"`**.

4. Switch to user **`"Support2 Test"`** using the **`"Switch user"`** option in the user menu.

5. You should only see the tasks assigned to **`"Support2 Test"`**.

6. You can switch back to your developer user using the same **`"Switch user"`** option.

That’s the basics about permissions, but there are more features to allow more fine-grained permissions management. For more information, check the "Developer’s Reference" section.

---

😍

**Almost Finished!**

Awesome, we are almost finished with our app. Hopefully, everything is working as expected. But if not, don’t worry! [In the next section](/getting-started/getting/first-steps/task-mananger/monitor/), we will learn how to find out what’s going on by using the app monitor.

