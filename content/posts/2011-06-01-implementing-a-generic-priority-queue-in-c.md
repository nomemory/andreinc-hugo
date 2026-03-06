+++
title = "Implementing a generic Priority Queue in C"
date = "2011-06-01"
usekatex = true
excerpt = "An article describing how to implement a Priority Queue in C."
categories = ["programming"]
tags = ["c", "algorithms"]
+++

{{<toc>}}

# Introduction

In Computer Science, a **Priority Queue** is an abstract data type similar to a standard Queue, but with a critical distinction: *every element has an associated priority*. In this structure, elements with higher priorities are dequeued and served before those with lower priorities, regardless of their insertion order.

# The Binary Heap
Our implementation utilizes a **Binary Heap**. While the name sounds complex, it is simply a binary tree that satisfies two specific properties:

1.  Shape Property: It is a `complete binary tree` (all levels are fully filled, except possibly the last level, which is filled from left to right).
2.  Heap Property: The key stored in each node is compared against its children:
    * Max-Heap: The parent key is greater than or equal to (`>=`) the keys of its children.
    * Min-Heap: The parent key is less than or equal to (`<=`) the keys of its children.

# Why use a Heap?

Using a Binary Heap allows us to perform insertions and priority updates in logarithmic time ($O(\log n)$), while always keeping the highest (or lowest) priority element at the root for constant time ($O(1)$) access.

# The code

The code is available on [github](https://github.com/nomemory/c-generic-pqueue).

```shell
git clone https://github.com/nomemory/c-generic-pqueue.git
```

Afer cloning, to compile the project simply:
```shell
gcc -Wall main.c pqueue.c
```

If you want to understand more about writing generic code in C, please reffer to my previous article: [Generic Data Structures in C](/2010/09/30/generic-data-structures-in-c).

# Defining the data

We start by defining some "helpful" macros:

```cpp
// pqueue.h

//
// Debugging macro .
//
// Checks for a NULL pointer, and prints the error message, source file and
// line via 'stderr' .
// If the check fails the program exits with error code (-1) .
//
#define NP_CHECK(ptr)                                                           \
    {                                                                           \
        if (NULL == (ptr)) {                                                    \
            fprintf(stderr, "%s:%d NULL POINTER: %s n",                         \
                __FILE__, __LINE__, #ptr);                                      \
            exit(-1);                                                           \
        }                                                                       \
    }                                                                           \

#define DEBUG(msg) fprintf(stderr, "%s:%d %s", __FILE__, __LINE__, (msg))
```

`NP_CHECK` will help us check if the memory was allocated correctly. If the returning pointer `ptr` is `NULL`, it aborts the program.

The `PQueue` struct and the API looks like this:

```c
// pqueue.h

//
// Priority Queue Structure
//
typedef struct PQueue_s {
    /* The actual size of heap at a certain time */
    size_t size;
    /* The amount of allocated memory for the heap */
    size_t capacity;
    /* An array of (void*), the actual max-heap */
    void **data;
    /* A pointer to a comparator function, used to prioritize elements */
    int (*cmp)(const void *d1, const void *d2);
} PQueue;

// Allocates memory for a new Priority Queue .
// Needs a pointer to a comparator function, thus establishing priorities .
PQueue *pqueue_new(int (*cmp)(const void *d1, const void *d2),
                   size_t capacity);

// De-allocates memory for a given Priority Queue 
void pqueue_delete(PQueue *q);

// Add an element inside the Priority Queue 
void pqueue_enqueue(PQueue *q, const void *data);

// Removes the element with the greatest priority from within the Queue 
void *pqueue_dequeue(PQueue *q);
```

You might be unfamiliar with the `int (*cmp)(const void *d1, const void *d2)`. That's actually a pointer to a function that compares two values. In more modern languages, this is a `Comparator` method.

When we are going to create the `PQueue` it will work like this:

```c
// A method that compares two ints (referenced by their pointers)
int cmp_ints(const void *int1, const void *int2) {
    return *(int*) int1 - *(int*) int2;
}

// ...

PQueue* pq = pqueue_new(cmp_ints, 200);

//...
```

Implementing the constructor-like/destructor-like methods:

```c
/**
* Allocates memory for a new Priority Queue structure .

* 'cmp' function:
*   returns 0 if d1 and d2 have the same priorities
*   returns [negative value] if d1 have a smaller priority than d2
*   returns [positive value] if d1 have a greater priority than d2
*/
PQueue *pqueue_new(int (*cmp)(const void *d1, const void *d2),
                   size_t capacity) {
    PQueue *res = NULL;
    NP_CHECK(cmp);
    res = malloc(sizeof(*res));
    NP_CHECK(res);
    res->cmp = cmp;
    /* The inner representation of data inside the queue is an array of void* */
    res->data = malloc(capacity * sizeof(*(res->data)));
    NP_CHECK(res->data);
    res->size = 0;
    res->capacity = capacity;
    return (res);
}

/**
* De-allocates memory for a given Priority Queue structure .
*/
void pqueue_delete(PQueue *q) {
    if (NULL == q) {
        DEBUG("Priority Queue is already NULL. Nothing to free.");
        return;
    }
    free(q->data);
    free(q);
}
```

# Implementation 

```c
/**
* Adds a new element to the Priority Queue .
*/
void pqueue_enqueue(PQueue *q, const void *data) {
    size_t i;
    void *tmp = NULL;
    NP_CHECK(q);
    if (q->size >= q->capacity) {
        DEBUG("Priority Queue is full. Cannot add another element .");
        return;
    }
    /* Adds element last */
    q->data[q->size] = (void*) data;
    i = q->size;
    q->size++;
    /* The new element is swapped with its parent as long as its
    precedence is higher */
    while(i > 0 && q->cmp(q->data[i], q->data[PARENT(i)]) > 0) {
        tmp = q->data[i];
        q->data[i] = q->data[PARENT(i)];
        q->data[PARENT(i)] = tmp;
        i = PARENT(i);
    }
}

/**
* Returns the element with the biggest priority from the queue .
*/
void *pqueue_dequeue(PQueue *q) {
    void *data = NULL;
    NP_CHECK(q);
    if (q->size < 1) {         
         /* Priority Queue is empty */         
         DEBUG("Priority Queue underflow . Cannot remove another element .");         
         return NULL;     
    }     
    data = q->data[0];
    q->data[0] = q->data[q->size-1];
    q->size--;
    /* Restore heap property */
    pqueue_heapify(q, 0);
    return (data);
}

/**
* Turn an "almost-heap" into a heap .
*/
void pqueue_heapify(PQueue *q, size_t idx) {
    /* left index, right index, largest */
    void *tmp = NULL;
    size_t l_idx, r_idx, lrg_idx;
    NP_CHECK(q);

    l_idx = LEFT(idx);
    r_idx = RIGHT(idx);

    /* Left child exists, compare left child with its parent */
    if (l_idx < q->size && q->cmp(q->data[l_idx], q->data[idx]) > 0) {
        lrg_idx = l_idx;
    } else {
        lrg_idx = idx;
    }

    /* Right child exists, compare right child with the largest element */
    if (r_idx < q->size && q->cmp(q->data[r_idx], q->data[lrg_idx]) > 0) {
        lrg_idx = r_idx;
    }

    /* At this point largest element was determined */
    if (lrg_idx != idx) {
        /* Swap between the index at the largest element */
        tmp = q->data[lrg_idx];
        q->data[lrg_idx] = q->data[idx];
        q->data[idx] = tmp;
        /* Heapify again */
        pqueue_heapify(q, lrg_idx);
    }
}
```

# Testing

To test the code works accordingly:

```c
#include <stdio.h>
#include <stdlib.h>

#include "pqueue.h"

int cmp_ints(const void *int1, const void *int2) {
    return *(int*) int1 - *(int*) int2;
}

int main(int argc, char** argv) {
    
    PQueue* pq = pqueue_new(cmp_ints, 200);
    
    int x = 100, y = 50, z = 300, k = 100, w = 1000;
    
    pqueue_enqueue(pq, &x);
    pqueue_enqueue(pq, &y);
    pqueue_enqueue(pq, &z);
    pqueue_enqueue(pq, &k);
    pqueue_enqueue(pq, &w);
    
    int i = 0;
    for(;i<5;++i)
        printf("%d\n", *(int*) pqueue_dequeue(pq));
    
    pqueue_delete(pq);
    
    return (EXIT_SUCCESS);
} 
```

And the output is:

```
1000
300
100
100
50
```