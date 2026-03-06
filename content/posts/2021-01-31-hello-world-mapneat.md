+++
title = "Hello world, mapneat!"
date = "2021-01-31"
usekatex = true
excerpt = "A gentle introduction to the Kotlin mapneat library."
categories = ["programming"]
tags = ["kotlin"]
+++

> mapneat is a library I've written a long time ago. I am biased.

# Introduction

One of the most common challenges I've encountered in Software Engineering is data manipulation: taking a raw data structure, applying business logic, restructuring it, and finally serializing it into a JSON format for external consumption.

[mapneat](https://github.com/nomemory/mapneat) is designed for exactly this purpose. It provides a declarative [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) for transforming `JSON`, `XML`, and `POJO`s into `JSON` with minimal boilerplate. While written in [Kotlin](https://kotlinlang.org/), it is fully compatible with Java projects.

# The Tech Stack

Under the hood, **mapneat** leverages several proven libraries:
* **Jackson & JsonPath**: For high-performance JSON querying and processing.
* **JSON In Java**: To handle XML-to-JSON conversions.
* **JSONAssert**: To simplify unit testing of JSON outputs.

# A Simple Example

Consider the following domain model for a travel-focused social application:

```kotlin
class User(
    val id: Long,
    val firstName: String,
    val lastName: String,
    val birthDate: String,
    val friends: MutableList<Long>,
    val visits: Set<Visit>,
    val creditCards: Set<CreditCardInfo>,
    val pwd: String,
    val email: String,
    val userName: String
)

class Visit(val id: Long, val country: String, val enter: String)
class CreditCardInfo(val number: String, val cvv: String, val expirationDate: String)
```

If we serialized a `User` object directly, the output would include sensitive data like passwords and financial info—not ideal for a public REST API.

### The Transformation Goal
Instead of the raw dump, we want a "morphed" version that:
1.  **Redacts** `pwd` and `creditCards`.
2.  **Flattens** `visits` to just a list of unique country names.
3.  **Normalizes** the `lastName` to uppercase.
4.  **Resolves** friend IDs into their actual full names.

Here is how you express that transformation using the **mapneat** DSL:

```kotlin
val users : Map<Long, User> = getUsers(100)
val aRandomUser = users[10]

val out = json(fromObject(aRandomUser)) {
    "" *= "$"             // Start by shifting everything from source to target
    - "visits"            // Delete specific nodes
    - "creditCards"
    - "pwd"
    
    "visited" *= {        // Extract and process countries
        expression = "$.visits[*].country"
        processor = {
            (it as Iterable<String>).toSet()
        }
    }
    
    // Modify existing target data
    "lastName" /= { targetCtx().read<String>("$.lastName").toUpperCase() }
    
    // Resolve IDs to Names
    "friends" /= {
        targetCtx()
            .read<List<Long>>("$.friends")
            .map { id -> "${users[id]?.firstName} ${users[id]?.lastName}" }
    }
}
println(out)
```

### The Result
The "morphed" JSON output is clean, safe, and ready for the client:

```json
{
  "id" : 490,
  "firstName" : "Rhea",
  "lastName" : "ORLICH",
  "birthDate" : "1925-07-09",
  "friends" : [ "Bunny Winstanley", "Dianna Imaizumi", "Verdell Aguillar" ],
  "email" : "crinedbotfly@msn.com",
  "userName" : "fainleif",
  "visited" : [ "Saint Lucia", "Falkland Islands (malvinas)", "Malawi", "Kenya", "Lesotho" ]
}
```

# Understanding the Operations

A **mapneat** transformation always wraps a series of operations within a `json()` block.

## 1. The Shift Operation (`*=`)
This is the core of the library. It uses [JsonPath](https://github.com/json-path/JsonPath) to move data from the source to the target. 
* `"" *= "$"` means "copy the entire source into the target root."
* `"visited" *= { ... }` extracts a nested list and applies a `processor` lambda to transform the data during the move.

## 2. The Delete Operation (`-`)
The `-` operator removes a node and all of its descendants from the target. It is used here to scrub sensitive fields.

## 3. The Assign Operation (`/=`)
Unlike the shift operation which pulls from the *source*, the assign operation is typically used to set a value in the target based on logic, often reading from the current `targetCtx()`. In our example, we used it to uppercase the name and map IDs to names.

# Moving Forward

This example only scratches the surface. **mapneat** supports complex nested mapping, XML sources, and more. 

For deep-dives into every supported operation, check out the [official documentation](https://github.com/nomemory/mapneat) or explore the [example repository](https://github.com/nomemory/mapneat-examples).