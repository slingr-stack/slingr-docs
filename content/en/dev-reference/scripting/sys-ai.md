---
title: "sys.ai"
description: "Describes ai utilities in the Javascript API."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 59
---

## **sys.ai**

This package encompasses methods for making us of ai features in your application.

###  embeddingsBatchProcessing(inputs,callback)

This will trigger a background job to embed a list of inputs. It will trigger a batch embedding generation on Vertex AI API and then it will execute a callback on the outputs. 

[See Google’s batch embeddings inputs and outputs](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/batch-prediction-genai-embeddings). Context can be passed in inputs and used when executing the callback.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
inputs|objects|yes|An array of JSON objects that will be used to generate embeddings. If **`id`** is passed the result of the callback will be mapped to this id.
callback|function|yes|The function to evaluate if an element needs to be removed. It will receive the element wrapper as parameter and should return **`true`** if the element has to be removed or **`false`** otherwise.


##### Returns

**`string`** - The ID of the triggered job.

##### Samples

``` javascript
let record = sys.data.findOne('library',{});

// List of inputs.
let array = [{"content":"horror book","recordId":record.id(), "id":0}]

// trigger background job to process embeddings in a batch. 
let jobId = sys.jobs.embeddingsBatchProcessing(array, function(prediction) {
  // get library from context
  let library = sys.data.findOne('library',{id: prediction.instance.recordId})

  // find related books with the output embedding
  let records = sys.data.find('books', {
    _indexedFilter: 'semantic',
    _indexedFilterEmbedding: prediction.predictions[0].embeddings.values,
    _vectorSearchLimit: 3,
    _numCandidates: 200,
    _queryScoring:0.72
  });
  let ids = [];
  while (records.hasNext()) {
    let r = records.next();
    ids.push(r.id());
  
  }
  record.field('books').val(ids)
  sys.data.save(record)
  return "ok"
})
```
<br>