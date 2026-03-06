+++
title = "Evaluate RPN expressions using Haskell, Scala, and python"
date = "2011-01-03"
usekatex = false
categories = ["programming"]
tags = ["java", "scala", "haskell", "algorithms"]
+++

{{<toc>}}

# Introduction

One of the earlier challenges from Programming Praxis was the RPN Calculator. The goal is to create a module that evaluates Reverse Polish Notation (RPN) expressions. RPN is a mathematical notation where operators follow their operands, eliminating the need for parentheses. This makes expressions easier for computers to parse and execute.

The specific requirement for this challenge was:

> Implement an RPN calculator that takes an expression like `19 2.14 + 4.5 2 4.3 / - *` (which represents `(19 + 2.14) * (4.5 - 2 / 4.3)`) and returns 85.2974. The program should read from standard input, print the result when a newline is encountered, and maintain the state of the operand stack between expressions.

# The Algorithm

If you are unfamiliar with Stacks, this is a perfect practical introduction. You would still need to know what a Stack is.

The evaluation process follows these steps:

0. Initialize an empty stack.
1. Tokenize the input string (e.g., `"1 2 +"` becomes `["1", "2", "+"]`).
2. Iterate through the tokens:
    * If the token is a number: push it onto the stack.
    * If the token is an operator: pop the required number of operands (N), evaluate the operation, and push the result back onto the stack.
3. Once all tokens are processed, the stack should contain exactly one value: the result.

# Implementations

I have implemented the solution in Scala, Python, and Haskell to demonstrate how different paradigms handle stack-based logic.

## Scala

In Scala, we can map strings to functions directly, making the evaluation loop very concise.

```scala
import scala.collection.mutable.Stack
import scala.io.Source
import java.lang.Double.parseDouble

object RPNCalc {
    // Maps an operator to a function
    val ops = Map("+" -> ((_:Double) + (_:Double)),
                  "-" -> (-(_:Double) + (_:Double)),
                  "*" -> ((_:Double)  * (_:Double)),
                  "/" -> (1/(_:Double) * (_:Double)))

    def evalTokens(tokens: Array[String]) : Double = {
        val stack = new Stack[Double]
        tokens.foreach(tok => {
            if (ops.contains(tok)) stack.push(ops(tok)(stack.pop, stack.pop))
            else stack.push(parseDouble(tok))
        })
        stack.pop
    }

    def main(args: Array[String]) = {
        Source.fromInputStream(System.in).getLines.foreach(l =>
            printf("exp=%2.2f\n", evalTokens(l.split(" "))))
    }
}
```

**Running the Scala version:**

```text
:~/Workspace/scala$ fsc RPNCalc.scala
:~/Workspace/scala$ scala RPNCalc
5 1 2 + 4 * 3 - +
exp=14.00
19 2.14 + 4.5 2 4.3 / - *
exp=85.30
```

## Python 

The Python implementation uses a list as a stack and lambdas for the operations. Note the operand order in the subtraction and division lambdas to account for the stack's LIFO nature.

```python
#!/usr/bin/env python

import sys
import re

OPS = {
        '+' : (lambda x, y: x + y),
        '-' : (lambda x, y: y - x),
        '*' : (lambda x, y: x * y),
        '/' : (lambda x, y: y / x)
}

def evalTokens(tokens):
    stack = []
    for token in tokens:
        if token in OPS:
            stack.append(OPS[token](stack.pop(), stack.pop()))
        else:
            stack.append(float(token))
    return stack.pop()

if __name__=="__main__":
    while True:
        line = sys.stdin.readline()
        if not line:
            break
        tokens = re.split(" ", line.strip())
        sys.stdout.write("exp=%2.2f\n" % evalTokens(tokens)) 
```

## Haskell

Haskell's functional purity allows us to handle the stack through recursion and pattern matching. Also, I am terrible with Haskell, so maybe there's a nicer way to do it, like in 3 lines or something.

```haskell
import qualified Data.List as List
import qualified Data.Map as Map

-- Mapping operator symbols to their functions
ops = Map.fromList [("+", (+)),
                    ("-", flip (-)),
                    ("*", (*)),
                    ("/", flip ())]

-- Helper to evaluate an operation based on a key
opsEval :: String -> Float -> Float -> Float
opsEval key n1 n2 = case (Map.lookup key ops) of
    Just op -> op n1 n2
    Nothing -> error("Invalid operator: " ++ key)

-- Transitions the stack based on the current token
evalStack :: [Float] -> String -> [Float]
evalStack [] key = []
evalStack [x] key = [x]
evalStack (x:y:xs) key = (opsEval key x y) : xs

-- Recursive evaluation of tokens
evalRpnExprRec :: [Float] -> [String] -> Float
evalRpnExprRec stack [] = List.head stack
evalRpnExprRec stack (tok:toks)
    | Map.member tok ops = evalRpnExprRec (evalStack stack tok) toks
    | otherwise = let tokVal = read tok :: Float
                  in evalRpnExprRec (tokVal: stack) toks

-- Public interface
evalRpnExpr :: String -> Float
evalRpnExpr raw = evalRpnExprRec [] (List.words raw)
```