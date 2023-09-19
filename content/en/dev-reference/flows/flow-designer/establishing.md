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

Flows consist of a sequence of steps interconnected in a specific direction. It's crucial to understand how to establish connections between these steps. In the flow designer, connections are created by dragging connectors from a source step's endpoints to a target step or a target connection's endpoint. The connection's endpoints are the small colored squares located at the edges of the steps. They become visible once they are dragged onto the canvas. Different steps have different connection endpoints, leading to various types of connections.

## **Connection types**

There are three types of connections that can be established:

- **`Regular connections`**: Represented by green arrows, these connections define the execution order of the different instructions represented by each step.

- **`Error connections`**: Indicated by red arrows, error connections come into play when a certain step fails. In such cases, the next step in the flow execution will be the one connected to this error connector.

- **`Else connections`**: Marked with purple arrows, else connections are only available in conditional steps. If the condition set in this step is not met, the next step in the flow execution will be the one connected to this else connector.

## **Connection endpoint types**

There are four types of connection endpoints:

- **`Green connection endpoints`**: Located on the right or sometimes the bottom side of all steps (except for the "end" step). Dragging a connection from one of these endpoints and dropping it onto a target step will establish a normal connection.

![Regular Connection](/slingrDoc/images/vendor/flows/regular_connection.gif)

- **`Red connection endpoints`**: Positioned on the bottom side of certain steps. Creating a connection from one of these endpoints and connecting it to a target step will create an error connection.

![Error Connection](/slingrDoc/images/vendor/flows/error_connection.gif)

- **`Else connection endpoints`**: Found on the bottom side of **`Condition`** type steps. Connecting a connection from one of these endpoints to a target step will establish an else connection.

![Else Connection](/slingrDoc/images/vendor/flows/else_connection.gif)

- **`Target connection endpoints`**: Situated on the left side of group container steps. To establish a connection, drop it onto one of these endpoints. The connection can be regular, error, or else, depending on the source connection endpoint.

![Target Connection](/slingrDoc/images/vendor/flows/target_connection.gif)

{{< notes type="note">}}
Connection targets, such as regular steps or target connection's endpoints, will display a dashed outline border when a connection is being dragged on top of them.
{{< /notes >}}

## **Deleting a connection**

To delete a connection, simply click on the connector, and a delete button will appear. By clicking on that button, the connection will be deleted.

![Deleting a Connection](/slingrDoc/images/vendor/flows/deleting_connection.gif)



