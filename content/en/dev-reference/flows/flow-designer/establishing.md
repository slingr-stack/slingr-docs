---
title: "Establishing connections"
lead: "Description on how connections between steps are established in the flow designer"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 80
---
Flows are essentially a set of steps and connections between them with a particular direction, that’s why it is important to know how to connect two steps with each other. Connections in the flow designer are made by dragging the connectors from a source **connection's endpoints** to a target step or a target **connection's endpoint**. Connection's endpoints are the small colored squares on the edges of the steps, and they will only be visible after they are dropped into the canvas. Different steps have different connection's endpoints, witch results in different type of connections able to achieve.

### Connection types
There are three type of possible connection to be made:

- **Regular** connections: represented by a **green** arrows. They will set the order of execution of the different instructions each step represent.
- **Error** connections: represented by **red** arrows. If the execution a certain step failed, the next step in the flow execution will be the one connected with this error connector instead.
- **Else** connections: represented by a **purple** arrow. Those are only available in the condition steps. If the condition set in this step is not met, the next step in the flow execution will be the one connected with this else connector instead.

### Connection's endpoint types
There are four types of connection's endpoints:

- **Green** connection's endpoints: located in the right or some time bottom side of all steps (except for the “end” step). Dragging a connection from one of those and dropping it in a target step will connect them as a **normal connection**.

![Alt text](/images/vendor/flows/regular_connection.gif)

- **Red** connection's endpoints: located on the bottom side of some steps. Dragging a connection from one of those and dropping it in a target step will connect them as an **error connection**.


![Alt text](/images/vendor/flows/error_connection.gif)

- **Else** connection's endpoints: located on the bottom side of `Condition` type steps. Dragging a connection from one of those and dropping it in a target step will connect them as an **else connection**.

![Alt text](/images/vendor/flows/else_connection.gif)

- **Target** connection's endpoints: located on the left side of group containers steps. **Dropping** a connection **to** one of those will connect them. Connection could be regular, error, or else  depending on the **source connection endpoint**

![Alt text](/images/vendor/flows/target_connection.gif)

{{< notes type="note">}}
Connection targets, such as regular steps or target connection's endpoints will display a dashed outline border when a connection is being dragged on top of them.
{{< /notes >}}

### Deleting a connection
in order to delete a connection, you just need to press click on the connector and a delete button will appear. By pressing click on that button, the connection will be deleted.

![Alt text](/images/vendor/flows/deleting_connection.gif)



