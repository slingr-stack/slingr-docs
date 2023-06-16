---
title: "Testing users and permissions"
lead: "Learning about the event planner app."
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

In this section, we will test the permissions and users that we created in the previous section. Log in to the runtime using your developer account, as we do not need to log in and out with the different users we created for our app. Developers can switch users with a special feature that allows them to emulate other users. This is useful for testing different users and permissions.

Once you are logged in as a developer, click on the button with your name on the header. A dropdown menu will be displayed. Click on the `Switch user` option, and a pop-up should open. In the `Switch user` field in the dropdown menu, select `Manager1 Test`, and then click on `Switch`.

You should now be able to see all tasks. Follow these steps to test permissions:

1. Create two tasks: assign one to `Support1 Test` and the other to `Support2 Test`.
2. Switch to the user `Support1 Test` using the `Switch user` option in the user menu.
3. You should only see the tasks assigned to `Support1 Test`.
4. Switch to the user `Support2 Test` using the `Switch user` option in the user menu.
5. You should only see the tasks assigned to `Support2 Test`.
6. You can go back to your developer user with the same `Switch user` option.

That’s the basics of permissions, but there are more features available for more fine-grained permission management. Refer to the documentation for more information.

Great! We are almost finished with our app. Hopefully, everything is working as expected. But if not, don’t worry, in the next section, we will see how you can find out what’s going on by using the app monitor. 
