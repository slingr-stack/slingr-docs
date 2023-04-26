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
In this section, we are going to test the different permissions and users that we created in the previous section. Log in to the runtime with your developer account (The same one we have been using). We don't need to be logging in and logging out with the different users we created just for our app. Developers can switch users with a special feature that allows them to emulate other users, this is useful to test the different users and permissions.
Once you are logged as a developer, click on the button with your name on the header, and a dropdown menu will be shown, click on `Switch user`, and a pop-up should open, in the field `Switch user`, in the dropdown menu, select `Manager1 Test`, and then click on `Switch`.

You should be able to see all tasks. Follow these steps to test permissions:
- Create two tasks: assign one to `Support1 Test` and the other to `Support2 Test`.
- Switch to user `Support1 Test` using the `Switch user` option in the user menu.
- You should only see the tasks assigned to `Support1 Test`.
- Switch to user `Support2 Test` using the `Switch user` option in the user menu.
- You should only see the tasks assigned to `Support2 Test`.
- You can go back to your developer user with the same `Switch user` option.

That’s the basics about permissions, but there are more features to allow more fine-grained permissions management, just check the ll for more information.

Awesome we are almost finished with our app. Hopefully, everything is working as expected. But if not, don’t worry, in the next section, we will see how you can find out what’s going on by using the app monitor. Next section:.
