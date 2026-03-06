+++
title = "Building pathological input for Java HashMaps - hash collisions generator"
date = "2022-09-01"
usekatex = true
excerpt = "Hash collision generator targeting the default java hash function"
categories = ["programming"]
tags = ["java"]
+++


I recently stumbled upon an article about the [Weierstrass Function](https://en.wikipedia.org/wiki/Weierstrass_function), which led me to another article about [Pathological Objects](https://en.wikipedia.org/wiki/Pathological_(mathematics)) in mathematics—meaning functions, numbers, etc., that have *deviant*, irregular, or counterintuitive properties. 

There was a time when even the *introduction* of $0$ broke the mathematics of the day. At first, $0$ was highly *pathological*. For example, the 7th-century mathematician [Brahmagupta](https://en.wikipedia.org/wiki/Brahmagupta) said about division by zero:

> A positive or negative number when divided by zero is a fraction with the zero as denominator. Zero divided by a negative or positive number is either zero or is expressed as a fraction with zero as numerator and the finite quantity as denominator. **Zero divided by zero is zero**.

Two hundred years later, another Indian mathematician named [Mahāvīra](https://en.wikipedia.org/wiki/Mah%C4%81v%C4%ABra_(mathematician)) made a different error while refuting the assertions of his predecessor:

> A number remains unchanged when divided by zero.

In our time, we have no problem bending both $0$ and $\infty$ to our mathematical needs; mathematicians have always found a way to incorporate the seemingly impossible into broader theories. The same story goes for irrational numbers, complex numbers, and all the other *peculiarities* discovered and accepted throughout the centuries.



----

In computer science, *pathological input* is a slightly different concept, strongly linked to the study of algorithms and data structures. In this case, the input causes atypical behavior for an algorithm, such as a severe violation of its average-case time complexity. 

In this article, we will generate *pathological input* for Java HashMaps and see how poorly they perform once hit with our *malicious* set of keys. Compared to a real-world scenario, our *pathological* set will contain only values that are highly susceptible to collisions. The way to do that is by "reverse engineering" the way the `Object::hashCode()` method works in Java.

For example, `String::hashCode()` looks like this:

```java
// This is the internal representation of a String 
// as an array of bytes.
private final byte[] value;

//... more code here

public int hashCode() {
    int h = hash;
    if (h == 0 && !hashIsZero) {
        h = isLatin1() ? StringLatin1.hashCode(value)
                        : StringUTF16.hashCode(value);
        if (h == 0) {
            hashIsZero = true;
        } else {
            hash = h;
        }
    }
    return h;
}
```    

Going further into `StringLatin1.hashCode()`, we will see just how simple the actual hashing function used in Java is. It's a *straightforward* implementation of a polynomial hash function. 

```java
public static int hashCode(byte[] value) {
    int h = 0;
    for (byte v : value) {
        h = 31 * h + (v & 0xff);
    }
    return h;
}
```    

As you can see, the `hashCode()` is computed in a series of steps, with each result (`h`) depending on the previous one. So, from a mathematical perspective, our code looks like this:

<div class="mp mpc">
\[
\begin{cases}
h_{0} = 0 \\
h_{1} = 31*h_{0} + v_{1} = v_{1} \\
h_{2} = 31*h_{1} + v_{2} = 31 * v_{1} + v_{2} \\
h_{3} = 31*h_{2} + v_{3} = 31 * (31*v_{1}+v_{2}) + v_{3} = v_{1}*31^{2} + v_{2}*31 + v_{3} \\
\\
\vdots \\
\\
h_{N} = 31*h_{N-1} + v_{N} = \ldots = v_{1}*31^{N-1}+v_{2}*31^{N-2}+\ldots+v_{N} \\
\end{cases}
\]
</div>

Where:
* $N$ represents the size of the `byte[] value` array. In coding terms, $N$ is `value.length`.
* For simplicity, we also consider $N$ to be the size of the `String`, because we are going to use the [`US_ASCII`](http://www.columbia.edu/kermit/ascii.html) charset. In this case, each character will be represented as a single byte.
* $v_{i}$ are the actual elements from the `byte[] value` array, where $1 \leq i \leq N$. Think of our `String` as equivalent to the ordered set $(v_{1}, v_{2}, ... , v_{i}, ... , v_{N})$.
* $h_{0}$ is the initial value of `h` (initially `int h=0`).
* $h_{i}$ is the intermediary `hashCode()` value computed in the loop when iterating over $v_{i}$ (at step $i$). 
* $H=h_{N}$ is the *final* `hashCode()` value, the one returned by the Java function (at step `N`, when the main loop ends).

$H$ can also be written as the sum: 
<div class="mp mpc">
\[
    H = h_{N} = \sum_{i=1}^{N} v_{i}*31^{N-i}
\]
</div>

If $N=1$, the formula becomes: 
<div class="mp mpc">
\[
    H = h_{1} = v_{1}
\]
</div>

This means that the `hashCode()` for single-character Strings is simply the actual byte value of the `Character` ($v_{1}$).

If we run the following code, we will see that our assumption is correct:

```java
String a = "a";
String b = "b";

System.out.println("The byte representation of 'a' is: " + a.getBytes(StandardCharsets.US_ASCII)[0]);
System.out.println("The hashCode representation of 'a' is:" + a.hashCode());

System.out.println("The byte representation of 'b' is: " + b.getBytes(StandardCharsets.US_ASCII)[0]);
System.out.println("The hashCode representation of 'b' is: " + b.hashCode());
```

With the output:

```
The byte representation of 'a' is: 97
The hashCode representation of 'a' is:97
The byte representation of 'b' is: 98
The hashCode representation of 'b' is: 98
```

Because of this, it's impossible to generate colliding single-character Strings (when $N=1$). All characters are different; thus, they have unique `byte[]` representations. But the situation becomes much more enjoyable when $N \geq 2$. 

So let's take the case where $N=2$. Our formula for obtaining the `hashCode()` of two-character Strings becomes:

<div class="mp mpc">
\[
    H = h_{2} = 31*v_{1} + v_{2}
\]
</div>

In this regard, $v_{1}$ is the `byte` value of the first character, and $v_{2}$ is the `byte` value of the second character of the `String`. And here comes the fun part: we can find various values for $v_{1}$ and $v_{2}$ such that $H$ remains exactly the same, thus creating a collision.

There are multiple combinations of numbers $v_{1}^{i}$ and $v_{2}^{i}$ such that $H = h_{2} = v_{1}^{i} + v_{2}^{i}$ is true, because $H$ can be written as:

<div class="mp mpc">
\[
\begin{align*}
H &= 31*(v_{1} + 0) + (v_{2} - 31*0) \\
H &= 31*(\underbrace{v_{1}+1}_{v_{1}^{1}}) + (\underbrace{v_{2}-31*1}_{v_{2}^{1}}) \\
H &= 31*(\underbrace{v_{1}+2}_{v_{1}^{2}}) + (\underbrace{v_{2}-31*2}_{v_{2}^{2}}) \\
H &= 31*(\underbrace{v_{1}+3}_{v_{1}^{3}}) + (\underbrace{v_{2}-31*3}_{v_{2}^{3}}) \\
&\vdots \\
H &= 31*(\underbrace{v_{1}+i}_{v_{1}^{i}}) + (\underbrace{v_{2}-31*i}_{v_{2}^{i}}) \\
&\vdots \\
&\text{and so on ...}
\end{align*}
\]
</div>

So theoretically, there is an infinite number of pairs $v_{1}^{i}$ and $v_{2}^{i}$ that satisfy the condition $H = 31*v_{1}^{i} + v_{2}^{i}$. To determine them, we simply apply the following formulas to the initial two characters, $v_{1}$ and $v_{2}$:

<div class="mp mpc">
\[
\begin{cases}
v_{1}^{i} = v_{1} + i \\
v_{2}^{i} = v_{2} - 31*i
\end{cases}
\]
</div>

In practice, we will use the `US_ASCII` encoding, so our characters must stay strictly within the interval `[32, 127]`.

Applying the formulas, it becomes pretty straightforward to determine all the possible colliding 2-character Strings for a given base String:

```java
public static Set<String> getCollidingStrings(String srcString) {
    if (srcString.getBytes(StandardCharsets.US_ASCII).length > 2) {
        throw new IllegalArgumentException("The string should have two characters only");
    }
    HashSet<String> result = new HashSet<>();
    result.add(srcString);
    byte[] crt = srcString.getBytes(StandardCharsets.US_ASCII);
    while (true) {
        crt[0] += 1; // we increment v_{1} by 1
        crt[1] -= 31; // we decrement v_{2} by 31
        if (crt[0] > 127 || crt[1] < 32) break; // we exit our bounds (break loop)
        result.add(new String(crt, StandardCharsets.US_ASCII)); // we add the result
    }
    return result;
}
```

Let's pick `"aa"` as the `srcString`:

```java
List<String> result = new ArrayList<>(getCollidingStrings("aa"));
result.forEach(s -> {
    System.out.printf("s='%s'\n", s);
    System.out.printf("'%s'.hashCode()=%d\n", s, s.hashCode());
});
```

Output:

```
s='aa'
'aa'.hashCode()=3104
s='bB'
'bB'.hashCode()=3104
s='c#'
'c#'.hashCode()=3104
```

So those 3 Strings are, in a way, *pathological*. But they are insufficient to prove our point. A `HashMap<String, T>` can efficiently deal with three elements colliding; we need to generate significantly more collisions by building much larger colliding Strings. 

The exciting aspect is that we can reuse `"aa"`, `"bB"`, and `"c#"` to build lengthier inputs by concatenating them into different combinations. The math behind this assumption is quite simple. 

Let's generate four-character long strings that collide ($N=4$). The formula for the `hashCode` becomes:

<div class="mp mpc">
\[
H = h_{4} = \sum_{i=1}^{4} v_{i}*31^{4-i} = v_{4}*31^3 + v_{3}*31^2 + v_{2}*31 + v_{1} = \\
31^2(\underbrace{v_{4}*31 + v_{3}}_{H_{2}}) + (\underbrace{v_{2}*31+v_{1}}_{H_{1}}) = 31^2*H_{2} + H_{1}
\]
</div>

If you look closer, what we have to do now is find pairs of values ($v_{3}^i$, $v_{4}^i$) and ($v_{1}^{i}$, $v_{2}^{i}$) for which $H_{2}$ and $H_{1}$ remain constant. It's the exact same exercise we did before when $N=2$. 

We can generate new ones, or we can simply reuse the ones we've discovered so far:

<div class="mp mpc">
\[
\begin{cases}
    (v_{1}^{i}, v_{2}^{i}) \in \{ \text{"aa", "bB", "c\#"} \} \\
    (v_{3}^{i}, v_{4}^{i}) \in \{ \text{"aa", "bB", "c\#"} \}
\end{cases}
\]
</div>

So if we rearrange the Strings obtained when $N=2$, we can create longer Strings that, when hashed with Java's algorithm, will continuously collide:

```java
System.out.println("aaaa".hashCode());
System.out.println("aabB".hashCode());
System.out.println("aac#".hashCode());
System.out.println("bBaa".hashCode());
System.out.println("bBbB".hashCode());
System.out.println("c#aa".hashCode());
System.out.println("c#bB".hashCode());
System.out.println("c#c#".hashCode());
```

Output:

```
2986048
2986048
2986048
2986048
2986048
2986048
2986048
2986048
```

We can also use other values for our $(v_{3}^{i}, v_{4}^{i})$. For example, let's find out colliding Strings for `"go"` by calling `getCollidingStrings("go")`. The results are `"go"`, `"hP"`, and `"i1"`. So let's use:

<div class="mp mpc">
    \[
    \begin{cases}
    (v_{1}^{i}, v_{2}^{i}) \in \{\text{"aa", "bB", "c\#"}\} \\
    (v_{3}^{i}, v_{4}^{i}) \in \{\text{"go", "hP", "i1"}\}
    \end{cases}
    \]
</div>

By recombining the Strings obtained with $N=2$, we will get another set of four-character Strings that collide when hashed:

```java
System.out.println("aago".hashCode());
System.out.println("aahP".hashCode());
System.out.println("aai1".hashCode());
System.out.println("bBgo".hashCode());
System.out.println("bBhP".hashCode());
System.out.println("bBi1".hashCode());
System.out.println("c#go".hashCode());
System.out.println("c#hP".hashCode());
System.out.println("c#i1".hashCode());
```

Output:

```java
2986248
2986248
2986248
2986248
2986248
2986248
2986248
2986248
2986248
```

The number of *colliding* Strings we can generate using this algorithm is *usually* $3^{N/2}$. If $N=32$ (our Strings are 32 characters long), we can generate $3^{32/2} = 3^{16} = 43,046,721$ colliding values, which is more than enough to ruin the performance of a `HashMap<K,V>`, severely degrading it to the performance of a `TreeMap<K,V>` (or worse, a linked list, depending on the Java version) for `get`/`put` operations.

So let's define the set $A = [\text{"aa", "bB", "c\\#"}]$ containing three `String`s that collide. 

* If we compute $A \times A$ (the [Cartesian Product](https://en.wikipedia.org/wiki/Cartesian_product)), we will generate all the possible four-letter colliding Strings (with their values based on the elements of A).
* If we compute $A \times A \times A$, we will generate all the possible six-letter colliding Strings (with their values based on A).
* If we compute $A \times A \times A \times A$, we will generate all the possible eight-letter colliding Strings (with their values based on A).
* ... and so on.

If we use [Guava](https://mvnrepository.com/artifact/com.google.guava/guava), there's a handy `Sets.cartesianProduct(Set...)` method we can use to implement the algorithm. If not, you can easily implement the algorithm yourself. 

So our code becomes:

```java
public static Set<String> generateCollisions(Set<String> baseSet, int nTimes) {
    Set<String>[] sets = new Set[nTimes];
    Arrays.fill(sets, baseSet); // fill up the array nTimes with baseSet
    return Sets.cartesianProduct(sets)
                .stream()
                .map(s -> String.join("", s))
                .collect(Collectors.toSet());
}
```

Where:
* `baseSet` is obtained by calling the previously defined method: `getCollidingStrings()`.
* `nTimes` is the number of times we perform the *Cartesian Product*. If, for example, `nTimes = 13`, we will generate 26-character-long Strings by doing 13 *Cartesian Products* between our `baseSet`s. The number of elements generated is $3^{\text{nTimes}} = 1,594,323$.

To test the code above, let's run the following:

```java
public static void main(String[] args) {
    Set<String> baseSet = getCollidingStrings("aa"); // "aa", "bB", "c#"
    Set<String> collidingStrings = generateCollisions(baseSet, 13); 
    System.out.println("Strings generated: " + collidingStrings.size());
    System.out.println("Size of the String: " +   collidingStrings
                                                    .iterator()
                                                    .next()
                                                    .length());
    System.out.println("Distinct hash values: " + collidingStrings
                                                    .stream()
                                                    .map(String::hashCode)
                                                    .collect(Collectors.toSet())
                                                    .size());
}
```

The output will be:

```
Strings generated: 1594323
Size of the String: 26
Distinct hash values: 1
```

The elements from `collidingStrings` look like this:

```
c#c#c#c#c#c#bBc#c#c#c#bBc#, 
c#c#c#c#c#c#bBc#c#c#c#c#aa, 
c#c#c#c#c#c#bBc#c#c#c#c#bB, 
c#c#c#c#c#c#bBc#c#c#c#c#c#, 
c#c#c#c#c#c#c#aaaaaaaaaaaa, 
c#c#c#c#c#c#c#aaaaaaaaaabB, 
c#c#c#c#c#c#c#aaaaaaaaaac#, 
c#c#c#c#c#c#c#aaaaaaaabBaa, 
c#c#c#c#c#c#c#aaaaaaaabBbB, 
c#c#c#c#c#c#c#aaaaaaaabBc#, 
c#c#c#c#c#c#c#aaaaaaaac#aa, 
c#c#c#c#c#c#c#aaaaaaaac#bB, 
c#c#c#c#c#c#c#aaaaaaaac#c#, 
c#c#c#c#c#c#c#aaaaaabBaaaa,
...
```

---

Conclusions:

* It's surprisingly easy to generate colliding Strings given the mathematical simplicity of the (default) Java hash function.
* If we were to use these elements as keys for a `HashMap<String, T>`, the performance of the `HashMap` would degrade drastically, operating no better than a `TreeSet` (or worse). 

Thanks for reading!