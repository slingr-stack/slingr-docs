---
title: "The workflow view"
lead: "Taking a look at our workflow view."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "task-mananger"
weight: 130
toc: true
---

Hi! In this section, we will take a look at the new Workflow View. 

### See the view

Make sure you are on the runtime of your app; if not, you can access it through the developer portal. Let's see what we have accomplished. This is how the new Workflow View should look like after a few configurations.

![Screenshot of the Workflow View](images/vendor/task-mananger/wf-view/wv.png)

We have built an awesome app. Let's try it out and verify that the actions and transitions are working as expected.

---

### Review the actions

To execute actions, click the button located at the top-right corner of the card. In this case, only the **``"Archive"``** action is available as per our configuration. You should also be able to perform other actions by moving the card through different columns.

![Review actions](images/vendor/task-mananger/wf-view/wvv.png)

---

### Create tasks through modal view

To create new tasks, click on the **`"Create"`** button, and a pop-up will appear.

![Create through modal](images/vendor/task-mananger/wf-view/wvvv.png)

---

### Verify transitions

You can move the cards between different columns. Keep in mind that only the movements we have configured will be allowed. For example, in our app, moving a card from the **`"To do"`** column to the **`"Done"`** column should not be possible.

![Transitions](images/vendor/task-mananger/wf-view/wvvvv.png)

---

### Verify ranking feature

Lastly, you can rank tasks by moving them up and down.

![Ranking records](images/vendor/task-mananger/wf-view/wvvvvv.png)

---

😊

**`Pretty awesome, right? Our app is starting to look amazing! `**

In the next section, we will create different roles for app users and assign them specific permissions. See you in the next section: **"Groups and Permissions."**
