+++
title = "Converting infix to RPN (shunting-yard algorithm)"
date = "2010-10-05"
usekatex = false
excerpt = "The shunting-yard algorithm implemented in Java."
categories = ["programming"]
tags = ["java", "algorithms"]
+++

---

# Introduction

If you've ever tried to write your own calculator, you've probably needed a way to convert mathematical expressions written in the usual *infix* notation into [Reverse Polish Notation (RPN)](http://en.wikipedia.org/wiki/Postfix_notation). This post walks through that conversion using the classic **shunting-yard algorithm**, and shows a (hopefully) compact Java implementation.

Before we jump into the algorithm, let's make sure we're on the same page about the terminology: *infix notation* and *rpn*.

[Infix notation](http://en.wikipedia.org/wiki/Infix_notation): this is the “normal” notation you use every day: operators are written *between* operands (e.g. `A + B`, `3 * (4 + 5)`). It's natural for humans, but surprisingly annoying to parse for computers because you need to consider parentheses and operator precedence.

[RPN (Reverse Polish Notation)](http://en.wikipedia.org/wiki/Postfix_notation): this is the computer friendly notation, as every operator comes *after* its operands. Parentheses are not needed, and evaluation is very straightforward using a stack.



### Examples:

| Infix                            | Reverse Polish Notation (RPN)         |
|----------------------------------|----------------------------------------|
| `A + B`                          | `A B +`                                |
| `A ^ 2 + 2 * A * B + B ^ 2`      | `A 2 ^ 2 A * B * + B 2 ^ +`           |
| `((1 + 2) / 3) ^ 4`              | `1 2 + 3 / 4 ^`                        |
| `(1 + 2) * (3 / 4) ^ (5 + 6)`    | `1 2 + 3 4 / 5 6 + ^ *`               |


Once an expression is in RPN, evaluating it is just a matter of pushing operands onto a stack and applying operators as you encounter them. But first we need a reliable way to **convert** from infix to RPN.

To convert infix expressions to RPN we’ll use the **[shunting-yard algorithm](http://en.wikipedia.org/wiki/Shunting-yard_algorithm)**, designed by the one and only [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra).



### The Algorithm (Simplified)

The following steps outline the core logic. Note that step labels `[SN]` match the comments in the Java code below.

* **For all input tokens [S1]:**
    * Read the next token **[S2]**.
    * **If the token is an operator (x) [S3]:**
        * While there is an operator **(y)** at the top of the stack and: **(x)** is left-associative and its precedence is less or equal to that of **(y)**, OR **(x)** is right-associative and its precedence is less than **(y) [S4]**:
            * Pop **(y)** from the stack **[S5]** and add it to the output buffer **[S6]**.
        * Push **(x)** on the stack **[S7]**.
    * **Else if the token is a left parenthesis:** Push it on the stack **[S8]**.
    * **Else if the token is a right parenthesis [S9]:**
        * Until the top token is a left parenthesis, pop from the stack to the output buffer **[S10]**.
        * Pop the left parenthesis (discard it) **[S11]**.
    * **Else:** Add token (operand) to output buffer **[S12]**.
* **While operators remain on stack:** Pop them to output **[S13]**.

# Implementation

The code lives on GitHub and can be cloned with:

```bash
git clone https://github.com/nomemory/blog-java-shunting-yard
```

> **Important:** This implementation assumes the input is already tokenized and represents a valid mathematical expression. There is no validation layer here.

### The Operators

We model associativity and precedence using two Enums. Support includes standard arithmetic and exponentiation (`^`).

```java
public enum Associativity {
    LEFT,
    RIGHT
}
```

```java
public enum Operator implements Comparable<Operator> {

    ADDITION("+", Associativity.LEFT, 0),
    SUBTRACTION("-", Associativity.LEFT, 0),
    DIVISION("/", Associativity.LEFT, 5),
    MULTIPLICATION("*", Associativity.LEFT, 5),
    MODULUS("%", Associativity.LEFT, 5),
    POWER("^", Associativity.RIGHT, 10);

    final Associativity associativity;
    final int precedence;
    final String symbol;

    Operator(String symbol, Associativity associativity, int precedence) {
        this.symbol = symbol;
        this.associativity = associativity;
        this.precedence = precedence;
    }

    public int comparePrecedence(Operator operator) {
        return this.precedence - operator.precedence;
    }
}
```

### The Shunting-Yard Logic

The following class implements the algorithm. The `S[x]` comments correspond to the steps described above.

```java
package net.andreinc.shunting.yard;

import java.util.*;

import static net.andreinc.shunting.yard.Associativity.LEFT;
import static net.andreinc.shunting.yard.Associativity.RIGHT;

class ShuntingYard {
    final static Map<String, Operator> OPS = new HashMap<>();
    static {
        for (Operator operator : Operator.values()) {
            OPS.put(operator.symbol, operator);
        }
    }

    public static List<String> shuntingYard(List<String> tokens) {
        List<String> output = new LinkedList<>();
        Stack<String> stack = new Stack<>();

        for (String token : tokens) { // [S1, S2]
            if (OPS.containsKey(token)) { // [S3]
                while (!stack.isEmpty() && OPS.containsKey(stack.peek())) {
                    Operator cOp = OPS.get(token); // Current (x)
                    Operator lOp = OPS.get(stack.peek()); // Top of stack (y)

                    // [S4] Precedence/Associativity logic
                    if ((cOp.associativity == LEFT && cOp.comparePrecedence(lOp) <= 0) ||
                        (cOp.associativity == RIGHT && cOp.comparePrecedence(lOp) < 0)) {
                        output.add(stack.pop()); // [S5, S6]
                        continue;
                    }
                    break;
                }
                stack.push(token); // [S7]
            } else if ("(".equals(token)) {
                stack.push(token); // [S8]
            } else if (")".equals(token)) { // [S9]
                while (!stack.isEmpty() && !stack.peek().equals("(")) {
                    output.add(stack.pop()); // [S10]
                }
                stack.pop(); // [S11]
            } else {
                output.add(token); // [S12]
            }
        }

        while (!stack.isEmpty()) { // [S13]
            output.add(stack.pop());
        }
        return output;
    }
}
```

---

# Testing the code

In these tests, expressions are tokenized using a simple `split(" ")`. In a real-world scenario, you would use a more robust tokenizer.

```java
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import static net.andreinc.shunting.yard.ShuntingYard.shuntingYard;
import static org.assertj.core.api.Assertions.assertThat;

public class ShuntingYardTest {

    @Test
    public void test1() {
        List<String> given = Arrays.asList("( 1 + 2 ) * ( 3 / 4 ) ^ ( 5 + 6 )".split(" "));
        List<String> expected = List.of("1", "2", "+", "3", "4", "/", "5", "6", "+", "^", "*");
        assertThat(shuntingYard(given)).isEqualTo(expected);
    }

    @Test
    public void test2() {
        List<String> given = Arrays.asList("A ^ 2 + 2 * A * B + B ^ 2".split(" "));
        List<String> expected = List.of("A", "2", "^", "2", "A", "*", "B", "*", "+", "B", "2", "^", "+");
        assertThat(shuntingYard(given)).isEqualTo(expected);
    }
}
```

### Where to go from here:
- **Validation:** Add checks for mismatched parentheses or unknown tokens.
- **Tokenizer:** Implement a parser for multidigit numbers and unary operators.
- **Evaluator:** Write a post-processor that uses a stack to calculate the numeric result from the RPN output.