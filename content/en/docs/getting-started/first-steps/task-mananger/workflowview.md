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

Welcome back, in this section we are going to take a look at the new workflow view. You should be on the runtime of your app, otherwise, you can open it through the developer portal. Let's take a look at what we have done.

![Alt Text](/images/vendor/task-mananger/wf-view/wv.png)


This is how it should look in the new workflow view. With a few configurations, we have built an awesome app. Try it out, and check that the actions and transitions are working as expected.

![Alt Text](/images/vendor/task-mananger/wf-view/wvv.png)


To execute actions you can click the button on the tight-top of the card, in this case only the action `Archive` is available as we configured it. Also, you should be able to execute other actions by moving the card through the different columns.

![Alt Text](/images/vendor/task-mananger/wf-view/wvvv.png)


To create new tasks click on the button `Create` and a pop-up will open.
![Alt Text](/images/vendor/task-mananger/wf-view/wvvvv.png)


You can move the cards through the different columns. Keep in mind that only the movements that we configured are going to be allowed. So in our app moving a card from the column `To do` to the column `Done`, should not be possible.

![Alt Text](/images/vendor/task-mananger/wf-view/wvvvvv.png)


Finally, you can also rank tasks (move them up and down). Pretty awesome right? I think our app is starting to look amazing. In the next section, we are going to create different roles for the users of our app and assign them permissions. See you in the next section .
