+++
title = "Generic data structures in C"
date = "2010-09-30"
usekatex = false
excerpt = "A short tutorial on how to write generic code in C."
categories = ["programming"]
tags = ["c", "algorithms"]
+++

<div class="mp">
Update (2026): This was the first 'real article' I ever wrote. It actually dates back to before 2010, though I didn't publish it until later. I’ve made a few tweaks here and there, but the original 'old code' remains. Please judge it kindly!
</div>

{{<toc>}}

<hr/>

# Introduction

This tutorial assumes basic familiarity with **C macros**, **pointers**, and simple **data structures**. While the C language does not provide built-in generics or templates (like C++, C#, or Java), we can emulate them using a few specific techniques. In this post, we explore two primary approaches:

* **[Using the C preprocessor (`#define` magic)](#writing-a-generic-stack-using-macros)**
* **[Using the flexibility of the void pointer (`void*`)](#writing-a-generic-stack-using-void)**

While there are excellent generic C libraries already available, understanding the underlying mechanics of how these work is a great educational exercise. A GitHub repository containing all code from this article is available here:

```bash
git clone https://github.com/nomemory/blog-generic-data-structures-in-c
```

# Generic Data Structures Using the C Preprocessor

To truly grasp the "magic" (which is really just a clever exploitation of the build process), you should be comfortable with **object-like macros**, **function-like macros**, **stringification (`#arg`)**, and **token concatenation (`arg1##arg2`)**. If you need a deep dive, [GCC’s macro documentation](https://gcc.gnu.org/onlinedocs/cpp/Macros.html) is the gold standard.

Below is a brief refresher for context.

## What is a Macro?

A macro is essentially a fragment of code that has been given a name. Before the actual compilation starts, the **C Preprocessor** scans your source code and replaces every occurrence of the macro name with its defined body. 

There are two primary types:
1.  **Object-like macros**: These behave like constants.
2.  **Function-like macros**: These mimic functions, allowing you to pass arguments.

### Example: Object-like Macros

```c
#include <stdio.h> 
#define HELLO "Hello World Macro!"

int main() {
    printf("%s\n", HELLO);
    return 0;
}
```

The preprocessor literally swaps `HELLO` for `"Hello World Macro!"`. It’s a simple text search-and-replace (nothing more, nothing less).

### Example: Function-like Macros

```c
#include <stdio.h>
#define MAX(a, b) (((a) > (b)) ? (a) : (b))

int main() {
    printf("%d\n", MAX(1, 3));
    return 0;
}
``` 

Expanding `MAX(1, 3)` yields `(((1) > (3)) ? (1) : (3))`. The actual code that reaches the compiler looks like this:

```c
#include <stdio.h>
int main() {
    printf("%d\n", (((1) > (3)) ? (1) : (3)));
    return 0;
}
```

Always wrap macro arguments in parentheses (like `(a)` and `(b)`) to prevent operator precedence bugs when passing complex expressions (e.g., `MAX(x + 1, y)`).

## Token Concatenation (`##`)

Token concatenation is the "secret sauce." The `##` operator allows you to merge two separate tokens into a single identifier during preprocessing. This is how we "generate" new function names or struct types for different data types.

```c
#include <stdio.h> 
#define SHOW(type, msg) show_##type(msg)

void show_error(char *message) {
    fprintf(stderr, "ERROR: %s\n", message);
}

void show_info(char *message) {
    fprintf(stdout, "INFO: %s\n", message);
}

int main() {
    // This expands to show_error(...)
    SHOW(error, "An error");
    
    // This expands to show_info(...)
    SHOW(info, "Some message");
    
    return 0;
}
```

**Output:**
```text
ERROR: An error
INFO: Some message
```

By using `##`, we can create a generic template where `type` is replaced by `int`, `float`, or a custom `struct`, allowing us to simulate a specialized version of a data structure for any type.

# Writing a Generic Stack Using Macros

To build a truly generic stack, we need a way to generate unique code for every data type we intend to use. Since C doesn't have templates, we use macros to "stamp out" the boilerplate. 

We need two main macros: one for the **Declaration** (usually for `.h` files) and one for the **Definition** (usually for `.c` files). We use the `\` character to allow these macros to span multiple lines.

## The Declaration Macro

This macro defines the `struct` and the function prototypes. Notice the use of `##type##` to ensure that if we pass `int`, our struct becomes `stack_int` and our function becomes `stack_int_push`.

```c
#define STACK_DECLARE(type)                                      \
typedef struct stack_##type##_s {                                \
    type data;                                                   \
    struct stack_##type##_s *next;                               \
} stack_##type;                                                  \
                                                                 \
void stack_##type##_push(stack_##type **stack, type data);       \
type stack_##type##_pop(stack_##type **stack);
```

## The Definition Macro

The logic remains the same regardless of the type. By wrapping the implementation in a macro, we can generate a full suite of stack operations for `int`, `double`, or even custom `structs` with a single line of code.



```c
#define STACK_DEFINE(type)                                      \
void stack_##type##_push(stack_##type **stack, type data) {     \
    stack_##type *new_node = malloc(sizeof(*new_node));         \
    if (NULL == new_node) {                                     \
        fputs("Memory allocation failed\n", stderr);            \
        abort();                                                \
    }                                                           \
    new_node->data = data;                                      \
    new_node->next = *stack;                                    \
    *stack = new_node;                                          \
}                                                               \
                                                                \
type stack_##type##_pop(stack_##type **stack) {                 \
    if (NULL == stack || NULL == *stack) {                      \
        fputs("Stack underflow\n", stderr);                     \
        abort();                                                \
    }                                                           \
    stack_##type *top = *stack;                                 \
    type value = top->data;                                     \
    *stack = top->next;                                         \
    free(top);                                                  \
    return value;                                               \
}
```

### Visualizing the Expansion
When you call `STACK_DEFINE(int)`, the preprocessor emits standard C code. It effectively writes the code so you don't have to:

```c
/* Result of STACK_DEFINE(int) */
void stack_int_push(stack_int **stack, int data) {
    stack_int *new_node = malloc(sizeof(*new_node));
    // ... logic ...
    new_node->data = data;
    *stack = new_node;
}

int stack_int_pop(stack_int **stack) {
    // ... logic ...
    int value = top->data;
    return value;
}
```

## Putting It All Together

To make the API cleaner in `main()`, we can add a few helper macros to handle the naming conventions.

```c
#define STACK_TYPE(type) stack_##type
#define STACK_PUSH(type, stack, val) stack_##type##_push(stack, val)
#define STACK_POP(type, stack) stack_##type##_pop(stack)

#include <stdio.h>
#include <stdlib.h>

// Generate implementation for int and double
STACK_DECLARE(int)
STACK_DEFINE(int)

STACK_DECLARE(double)
STACK_DEFINE(double)

int main() {
    STACK_TYPE(int)    *st  = NULL;
    STACK_TYPE(double) *st2 = NULL;

    for (int i = 0; i < 5; ++i) {
        STACK_PUSH(int,    &st,  i);
        STACK_PUSH(double, &st2, i * 1.5);
    }

    while (st && st2) {
        printf("POP: %d | %.2f\n",
            STACK_POP(int, &st),
            STACK_POP(double, &st2)
        );
    }

    return 0;
}
```

## Important Constraint: Type Naming

The preprocessor is a simple text processor. It cannot handle types with spaces or special characters directly in the concatenation. 
* **Invalid:** `STACK_DECLARE(unsigned int)` (this creates identifiers like `stack_unsigned int`, which is a syntax error).
* **Solution:** Use a `typedef` first: `typedef unsigned int u32;` then call `STACK_DECLARE(u32)`.

# Writing a Generic Stack Using `void*`

Typecasting is one of C’s most potent features. It allows you to interpret raw memory in different ways, which is the secret to building generic systems. While standard pointers like `int*` or `char*` are bound to specific types, C provides a "universal" pointer: the **void pointer** (`void*`).

A `void*` stores a memory address without associating it with a data type. You can point it at an integer, a struct, or a string. When you want the data back, you simply cast it back to its original type.

## Defining the Typeless Struct

Because the `void*` doesn't care about the size or type of the data it points to, our structure only needs to store the address of the data and a link to the next node.

```c
typedef struct stack_s {
    void *data;           // Pointer to the actual value
    struct stack_s *next; // Link to the next node
} stack;
```

## Implementation: Push and Pop

Since we are passing and returning `void*`, these functions can handle any data type. The logic for managing the linked list remains identical regardless of what the stack contains.

```c
void stack_push(stack **head, void *data) {
    stack *new_node = malloc(sizeof(*new_node));
    if (NULL == new_node) {
        fputs("Memory allocation failed\n", stderr);
        abort();
    }
    new_node->data = data;
    new_node->next = *head;
    *head = new_node;
}

void *stack_pop(stack **head) {
    if (NULL == head || NULL == *head) {
        fputs("Stack underflow\n", stderr);
        abort();
    }
    stack *top = *head;
    void *value = top->data;
    *head = top->next;
    free(top);
    return value;
}
```

## Using the Generic Stack

When using this approach, the responsibility for memory management shifts to the caller. Since the stack only stores pointers, you must ensure the data being pointed to exists on the heap (via `malloc`) if it needs to outlive the current scope.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    stack *s = NULL;
    int i, *tmp;

    printf("Pushing: \n");
    for (i = 0; i < 10; ++i) {
        tmp = malloc(sizeof(*tmp));
        if (NULL == tmp) abort();
        
        *tmp = i;
        printf("%d ", *tmp);
        stack_push(&s, tmp);
    }

    printf("\nPopping: \n");
    while (s != NULL) {
        tmp = stack_pop(&s);
        printf("%d ", *tmp);
        free(tmp); // We must free the data we allocated earlier
    }

    return 0;
}
```

# Key Differences from the Macro Approach

* **Binary Size:** Unlike macros, which generate new code for every type (increasing the binary size), the `void*` approach uses a single set of functions, making it more memory-efficient in terms of code space.
* **Type Safety:** This approach is inherently "unsafe." The compiler won't stop you from pushing an `int*` and popping it as a `char*`. You lose the compile-time type checking that the Macro approach provides.
* **Performance:** There is a slight overhead because you are often dealing with extra pointer indirection and heap allocations for the data itself.
