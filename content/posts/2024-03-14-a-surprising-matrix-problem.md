+++
title = "A Surprising Matrix Problem"
date = "2024-03-14"
classes = "wide"
comments = true
excerpt = "Exploring a delightful invariant sum problem from the 1988 Spanish Math Olympiad."
usekatex = true
categories = ["math"]
tags = ["combinatorics", "olympiad", "linear algebra"]
+++

In this short article, I will discuss a *cute* mathematical problem that I discovered while reading ["Polya's Footsteps: Miscellaneous Mathematical Expositions"](https://www.amazon.com/Polyas-Footsteps-Miscellaneous-Mathematical-Expositions/dp/0883853264) by the Canadian mathematician [Ross Honsberger](https://en.wikipedia.org/wiki/Ross_Honsberger). If you're not familiar with Honsberger's work, he is a well-known author in the field of [recreational mathematics](https://en.wikipedia.org/wiki/Recreational_mathematics). Even the legendary [Edsger W. Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra) referred to Honsberger's work as "delightful."

The problem was asked during the First Round of the Spanish Math Olympiad in 1988, and if you own the book, you can find it on page 9.

---

The integers $1,2,3,...,n^2$ are arranged to form an $n \times n$ matrix $A$:

<div class="mp mpc">
\[
A=\begin{pmatrix} 
1 & 2 & ... & n\\
n+1 & n+2 & ... & 2n \\
... & ... & ... & ... \\
(n-1)n+1 & ... & ... & n^2
\end{pmatrix}
\]
</div>

A sum $S_A$ is constructed as follows:

* The first term $x_1$ in $S_A$ is chosen at random from the entries of $A$;
* After selecting $x_1$, $x_1$'s row and column are deleted.
* The second term $x_2$ is chosen randomly from the remaining entries in $A$, after which $x_2$'s row and column are deleted.
* Similar selections and deletions are carried out until $A$ is exhausted.

Prove that the sum $S$ builds up to the exact same total no matter what entries ($x_1, x_2, ...$) might be taken. In other words, the sum $S$ is invariant.

---  

Excellent problem, isn't it?

The first thing I did was check to see how everything worked, so I started with a $3 \times 3$ matrix:

<div class="mp mpc">
\[
A=\begin{pmatrix} 
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 \\
\end{pmatrix}
\]
</div>

I randomly selected **3**, then removed its row and column. The matrix $A$ becomes: $\begin{pmatrix} 4 & 5 \\ 7 & 8 \end{pmatrix}$. Next, I selected **7**, removed its row and column, leaving only $A=\begin{pmatrix} 5 \end{pmatrix}$. On this run, the sum is $S_A=3+7+5=15$.

I tried a second run: $S_A=5+1+9=15$. And a third: $S_A=6+2+7=15$. 

For a $3 \times 3$ matrix, the sum is $S_A=15$, no matter what we do.

At this point, it's worth noting that from a column perspective, we select one number from each column. Similarly, from a row perspective, we select one number from each row.

The intuition suggests that there is something special about the positions of the numbers. To explore this, let's consider a matrix $B$ that's *slightly different* than $A$, where every row is identical:

<div class="mp mpc">
\[
B=\begin{pmatrix} 
1 & 2 & 3 & ... & n \\
1 & 2 & 3 & ... & n \\
... & ... & ... & ... & ... \\
1 & 2 & 3 & ... & n \\
\end{pmatrix}
\]
</div>

If we apply the same algorithm to $B$, our sum will always be:

<div class="mp mpc">
\[ S_B=1+2+3+...+n=\frac{n(n+1)}{2} \]
</div>

The reason is simple: because we delete the column of each selected element, we must eventually visit every column exactly once. Since every row in $B$ is the same, the row we pick from doesn't change the value contributed by that column.

Now we just need to find the relationship between the terms of $B$ and $A$. Notice the following:
* Each term from the first row of $A$ is identical to its corresponding term in $B$;
* Each term from the second row of $A$ is $n$ more than its corresponding term in $B$;
* Each term from the third row of $A$ is $2n$ more than its corresponding term in $B$;

We can generalize: each term on the $k^{th}$ row of $A$ is $(k-1)n$ more than its corresponding term on the $k^{th}$ row of $B$.

If we let $a_1, a_2, ..., a_n$ be the chosen elements for $S_A$ and $b_1, b_2, ..., b_n$ be the corresponding elements in $S_B$:

* $a_1 = b_1 + (r_1-1)n$
* $a_2 = b_2 + (r_2-1)n$
* ... and so on.

Since we must select exactly one element from each row, the set of row indices $\{r_1, r_2, ..., r_n\}$ is simply a permutation of $\{1, 2, ..., n\}$. When we sum them up:

<div class="mp mpc">
\[
S_A = S_B + n(0 + 1 + 2 + ... + (n-1))
\]
\[
S_A = \frac{n(n+1)}{2} + n \cdot \frac{n(n-1)}{2}
\]
\[
S_A = \frac{n^2+n + n^3-n^2}{2} = \frac{n(n^2+1)}{2}
\]
</div>

So $S_A$ is indeed a constant that depends only on $n$. This explains why the result was always 15 for our $3 \times 3$ matrix ($n=3$).

--- 

#### Personal observation: an exercise for the reader

If you give the problem some thought, you will see that this property holds not only for consecutive numbers but for any set of numbers in an arithmetic progression.

As long as the matrix $A$ is in this form: 

<div class="mp mpc">
\[
A=\begin{pmatrix} 
a_1 & a_2 & a_3 & ... & a_n \\
a_{n+1} & ... & ... & ... & a_{2n} \\
... & ... & ... & ... & ... \\
... & ... & ... & ... & a_{n^2} \\
\end{pmatrix}
\]
</div>

Where $a_k = a_{k-1} + d$, the sum $S_A$ will be constant. 

For example, take this $3 \times 3$ matrix with a common difference $d=2$:

<div class="mp mpc">
\[
A=\begin{pmatrix} 
1 & 3 & 5 \\
7 & 9 & 11 \\
13 & 15 & 17
\end{pmatrix}
\]
</div>


The sum $S_A$ is always 27 ($1+9+17=27$, $5+9+13=27$, etc.). Proving this general case is an exercise left for the reader!