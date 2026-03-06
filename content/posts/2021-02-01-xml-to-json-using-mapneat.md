+++
title = "XML to JSON using MapNeat"
date = "2021-02-01"
usekatex = true
excerpt = "A short tutorial on how to transform XML to JSON using mapneat."
categories = ["programming"]
tags = ["kotlin"]
+++

> mapneat is a library I've written a long time ago. I am biased.

# Introduction

Following my [previous article](/2021/01/31/hello-world-mapneat), I wanted to expand on the capabilities of the [mapneat](https://github.com/nomemory/mapneat) library. 

In this tutorial, I will show you how to transform an existing XML source into a specifically structured JSON format.

# The Source XML
We will start with a customer record that includes nested visit data and attributed email tags:

```xml
<customer>
    <firstname>Mike</firstname>
    <lastname>Smith</lastname>
    <visits count="3">
        <visit>
            <country>France</country>
            <date>2010-01-22</date>
        </visit>
        <visit>
            <country>Italy</country>
            <date>1983-01-22</date>
        </visit>
        <visit>
            <country>Romania</country>
            <date>2010-01-22</date>
        </visit>
        <visit>
            <country>Bulgaria</country>
            <date>2010-01-25</date>
        </visit>        
    </visits>
    <email type="business">mail@bsi.com</email>
    <email type="personal">mail@pers.com</email>
    <age>67</age>
</customer>
```

# The Transformation Goal

The objective is to morph this XML into a JSON that:
* Separates data into `person` and `visits` nodes.
* Groups emails into arrays based on the `type` attribute.
* Adds a conditional `hasVisitedRomania` flag.
* Extracts unique years and unique countries from the visit logs.

# The MapNeat Implementation

```kotlin
json(MapNeatSource.fromXml(xml)) {
    "person" /= json {
        "firstName" *= "$.customer.firstname"
        "lastName" *= "$.customer.lastname"
        "personalEmails" *= "$.customer.email[?(@.type == 'personal')].content"
        "businessEmails" *= "$.customer.email[?(@.type == 'business')].content"
        
        if (sourceCtx().read<MutableList<String>>("$.customer.visits.visit[*].country").contains("Romania")) {
            "hasVisitedRomania" /= "true"
        }
    }
    "visits" /= json {
        "yearsActive" *= {
            expression = "$.customer.visits.visit[*].date"
            processor = {
                (it as MutableList<String>)
                    .map { ds -> LocalDate.parse(ds, df).year.toString() }
                    .toSet()
            }
        }
        "countries" *= "$.customer.visits.visit[*].country"
    }
}
```

---

# How it Works

Under the hood, mapneat uses the JSON-java library to automatically convert an XML source into an intermediary JSON representation. 

This conversion happens as soon as `MapNeatSource.fromXml(xml)` is invoked. At this point, the original XML attributes and structure are translated into JSON objects.

# Debugging the Intermediary Source

If you are having trouble mapping your paths, you can peek at the intermediary JSON by copying the source directly to the target:

```kotlin
json(MapNeatSource.fromXml(xml)) {
    copySourceToTarget()
    println(this)
}
```

For our input, the intermediary structure looks like this:

```json
{
  "customer" : {
    "visits" : {
      "count" : 3,
      "visit" : [ 
        { "date" : "2010-01-22", "country" : "France" },
        { "date" : "1983-01-22", "country" : "Italy" }
        // ...
      ]
    },
    "email" : [ 
      { "type" : "business", "content" : "mail@bsi.com" },
      { "type" : "personal", "content" : "mail@pers.com" }
    ]
    // ...
  }
}
```

# Key Concepts

**1. Nested JSON Blocks**
Creating an inner `json{}` block inside an outer one is done using the assign operation (`/=`). This allows you to build complex, nested hierarchies or merge multiple sources into one output.

**2. JsonPath Filtering**
Expressions like `"$.customer.email[?(@.type == 'personal')].content"` allow you to filter source data based on attributes. In the intermediary JSON, XML attributes (like `type="personal"`) become standard JSON fields.

**3. Logic within DSL**
Since mapneat is a Kotlin DSL, you can inject standard Kotlin control flow. The `if` statement checks the source context directly to determine if the `hasVisitedRomania` field should be created in the target.

**4. Data Processors**
The `processor` block gives you full programmatic control over the data being shifted. In the `yearsActive` example, we parse the date strings to extract only the year and use a `Set` to automatically handle de-duplication.