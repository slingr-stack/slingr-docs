---
title: "Endpoints management"
lead: "Brief explanation of Slingr and use cases for it."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 151
---


In the app monitor in section `Endpoints` it is possible to see the status of the endpoints of the
app. There you will see the following information:

- **Status**: indicates if the endpoint is deployed, undeployed or in an intermediate status.
- **Last 24 hs activity**: shows the number of function calls and events received in the last 24
  hs.
- **Running instances**: you can see how many instances are running of your endpoint.
- **Configuration details**: if you click on one of the endpoint you will be able to see the
  configuration details.

You can perform the following operations over endpoints:

- **Deploy**: if the endpoint is undeploy, you can deploy it by selecting it and clicking on the
  `Deploy` button.
- **Undeploy**:  if the endpoint is deployed, you can undeploy it by selecting it and clicking on 
  the `Undeploy` button. Once the endpoint is deployed it will stop working (calls to this endpoint
  will fail and no more events will be received) and no resources will be used by the endpoint.
- **Redeploy**: this basically restarts the selected endpoints, which might be needed if
  configuration was changed through environment variables or something looks odd in the behavior
  of the endpoint.
  
## Endpoint configuration

- **Generate Token**: endpoint have a token that is needed to communicate to it from the outside. You
  can regenerate that token from here in case it was compromised. 

- **Profile**: some endpoints support different memory profiles. For example, the Slack endpoints has
  different memory profiles based on the number of members you have in your team. 

- **Multiple instances**: if the endpoint allow multiple instances here you can resize it. Adding more
  instance for an endpoint will allow to handle more load on your integrations.  

- **Hide logs content**: if the endpoint works with sensitive information you can hide logs setting this
  flag. For example an endpoint for credit card processing in production should have this option enabled
  to avoid logging any sensitive information.

