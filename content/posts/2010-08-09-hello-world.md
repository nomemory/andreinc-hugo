+++
title = "Hello world!"
date = "2010-08-09"
usekatex = true
excerpt = "Hello world!"
gitLink = "https://github.com/nomemory/andreinc-hugo"
categories = ["programming"]
tags = ["c"]
+++

My first blog post, in which I am writing `Hello World!`.

```c
#include <stdio.h>

int main() {
    long long h = 0x0A646C726F57206FLL; 
    long long e = 0x6C6C6548;
    printf("%.4s%s", (char*)&e, (char*)&h);
    return 0;
}
```
