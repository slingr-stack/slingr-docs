---
title: "Flow designer overview"
lead: "This is an introduction to the flow designer tool"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 79
---
The flow designer is a visual drag and drop editor that helps you create or edit flows in a Slingr app. To open it, from the **Builder** of your app, look for a property that supports flows as an alternative and after selecting this option, an “Open editor” button should appear.

It consists in 3 main panels: the step's palette, the canvas and the properties panel.

## The step's palette

The step's palette is located on the left side of the flow designer and contains all the available steps to build a flow grouped by categories. In order to build any flow, the first thing you should do is drag a step from the palette and drop it into the canvas.  On the top side of the panel, there is a search box that allows you to search steps by name.


{{< notes type="tip">}}
You can collapse this panel with the **<<** icon on its top side to increase the size of the canvas.
{{< /notes >}}


{{< notes type="tip">}}
Hovering over a step will give you a short description of what it does
{{< /notes >}}

![Alt text](/images/vendor/flows/dropping_from_palette.gif)

## The canvas

The canvas is the center and main panel of the flow designer. It consists on a grid area in where the flow, formed by the steps and connections, will be. To make a step appear on the canvas, you should drag it from the palette and drop it in the canvas. Once you do that, the step will be initialized, and its source or target [connection's endpoints]({{site.baseurl}}/app-development-the-flow-designer-establishing-connections.html#connections-endpoint-types)  will appear on its sides. In addition, when double-clicking on top of the step, the right panel will expand showing its properties.

Steps inside the canvas can be dragged and dropped to move them around within the canvas limits. Connections established with the steps won’t be lost when moving them around. The flow designer also supports a multi-selection of steps, witch is useful for moving several steps at same time. To select several steps at the same time hold the `shift` key and keep the left click of the mouse while moving it to draw a selection area. Selected steps will be highlighted and you will be able to moving them around as a group. To remove the selection, just press `Escape` in the keyboard, or click an empty space in the canvas.

In order to delete a step from the canvas, just click it once and a delete button will appear on its right corner. By pressing on this button the step will be deleted from the canvas and all the connections attached to that step will also be deleted.

{{< notes type="tip">}}
Pressing **Escape** key on you keyboard will collapse the properties' panel if it is expanded.
{{< /notes >}}

### The context stack
In the top right corner of the canvas, you will also find the **context stack.** This is a special step that cannot be deleted and can neither be a source nor a target of any connection, but it can be moved around. The context stack will show the values and variables available to be used the different steps of the flow. [You can find more information about this here]({{site.baseurl}}/app-development-flows-context.html).

## The properties panel

The properties' panel is located on the right side of the flow designer and contains the information related to the flow and every step in it. This information is displayed with editable forms witch means that you can modify it.

By pressing the `Settings` button in the header,  the properties' panel will display general information related to the flow, such as its name, label or description.

By pressing click on any step within the canvas, the properties' panel will display all the settings related to that particular step. On the upper section, you will find some basic properties: name, label and description. On the lower section is where you can configure the inputs and outputs related to that particular step. There is related section in the documentation to learn more about inputs and outputs for every step.

{{< notes type="important">}}
You need to press the **tab** key on your keyboard after editing any text input field inside the properties' panel in order to persist those changes when navigating between tabs or steps. This does not mean though that the changes will be saved after closing the designer. If you want to achieve that, you need to press the **Save** or **Apply** button in the header.
{{< /notes >}}

{{< notes type="tip">}}
You can collapse this panel with the **>>** icon on its top side to increase the size of the canvas. Pressing the **Escape** key will also collapse the panel.
{{< /notes >}}

{{< notes type="tip">}}
If the properties' panel is collapsed, you can **double click** on any step within the canvas to expand the properties panel and show the step properties.
{{< /notes >}}


![Alt text](/images/vendor/flows/properties_panel.gif)

## The Header

On top of the flow designer you can find the header of the view in within you are opening it. This is the same header of that particular view, but something you might notice is that some buttons have changed when the flow designer in opened.
Those are the buttons displayed in the header when the flow designer is opened:

- `Close` : closes the flow designer. If changes where made without saving, a warning sign will pop out before closing it.
- `Reset` : reverts the flow and context stack to the last state before saving it.
- `Settings` :  opens the properties panel and display the general settings for the flow (name, label, description).

{{< notes type="note">}}
Activating the **Debug** switcher will show information of the flow and how it is transformed into a javascript function on the monitor component.
{{< /notes >}}
- `Full Screen`: toggles the fullscreen mode on and off.
- `Apply`: save all the changes made to the flow while keeping the flow designer opened.
- `Save`: save all the changes made to the flow and closes the flow designer.




