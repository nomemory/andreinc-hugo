+++
date = '2024-07-25'
draft = false
title = 'How to compose math problems'
categories = ['math']
tags = ['logarithms', 'olympiad']
usekatex = true
+++

When I was a young student (around 12), my math teacher had a unique requirement: students had to not only solve math problems but also compose them.

This unconventional approach encouraged us to think creatively and critically... or not. While the task was not mandatory, some classmates and I embraced the challenge of developing geometry and algebra exercises from scratch. 

I am not sure how original we actually were, but our efforts paid off when our *little creations* were published in an obscure math magazine that I can no longer find online. Maybe it was never online in the first place.

Over time, I've developed a taste for what a *beautiful* problem looks like. Of course, *beauty is in the eye of the beholder*. For me, a beautiful math problem is concise, shows symmetry, and is easy to read and understand even if you haven't mastered that particular domain.

Let's try to create a problem for fun. By the end of this article, I might convince you to try this as a hobby. 

## Step 1

Start with a simple problem that caught your attention. It should be something straightforward, using numbers instead of letters.

For example, here is a sample problem from the admission exam for the [*Academia De Studii Economice, București*](https://en.wikipedia.org/wiki/Bucharest_Academy_of_Economic_Studies):

<div class="mp"> 
<p>Let \(a=\ln5\), \(b=a+\ln2\) and \(T=\log_{20}8\). Prove:</p>
<p class="mpc">
    \[ T=\frac{3(b-a)}{2b-a} \]
</p>
</div>

I won't ask you to pause for a moment because this isn't YouTube, so here is the direct solution. We just change the base for $T$:

<div class="mp"> 
<p class="mpc">
    \[ T=\log_{20}8=\frac{\ln8}{\ln20}=\frac{3\ln2}{\ln5+2\ln2} = \frac{3(b-a)}{2(b-a)+a}=\frac{3(b-a)}{2b-a} \]
</p>
</div>

It's a cute problem that checks if a student can apply basic formulas.

## Step 2

Take a step back and look for hidden information. Try to understand the *core* of why the problem works.

One observation is that the numbers 2, 5, 8, and 20 were not chosen randomly. 2 and 5 are prime numbers, while $T=\log_{20}8$ combines them as:

<div class="mp"> 
    <p class="mpc">
        \[
            T = \log_{20} 8 = \log_{\left(2^2 \cdot 5\right)} \left(2^3\right)
        \]
    </p>
</div>


This is why we can express $T$ using $a$ and $b$.

We can already generalize a little. If we replace 2 and 5 with two arbitrary prime numbers, we have a new problem:

<div class="mp"> 
    <p>Let \(m\) and \(n\) be prime numbers. If \(a=\ln m\), \(b=a + \ln n\) and \(T = \log_{\left(m \cdot n^2\right)} \left(n^3\right)\), prove that:</p>
    <p class="mpc">
        \[
            T = \frac{3(b-a)}{2b - a}
        \]
    </p>
</div>

After this first iteration, the new problem is as concise as before, but it isn't very original. The expression $\frac{3(b-a)}{2b-a}$ doesn't look symmetrical enough for my taste, and $\log_{(m \cdot n^2)}(n^3)$ is a bit clunky.

What if $m$ and $n$ are not prime numbers? Would it still work? That is another route we could take.

## Step 3

Let's change $T$ into something more beautiful and concise. 

Why not try to prove $T=\frac{b-a}{b+a}$?

At this point, we have to "backtrack" the new value of $T$ into its logarithmic form. If we pick $T=\frac{b-a}{b+a}$, then:

<div class="mp"> 
    <p class="mpc">
        \[
          T=\frac{\ln n}{\ln n + \ln m + \ln m}=\frac{\ln n}{\ln (n \cdot m^2)}=\log_{(n \cdot m^2)}n
        \]
    </p>
</div>

So the problem becomes:

<div class="mp"> 
    <p>Let \(m\) and \(n\) be prime numbers. If \(a=\ln m\), \(b=a + \ln n\) and \(T = \log_{\left(m^2 \cdot n\right)} n\), prove that:</p>
    <p class="mpc">
        \[
            T = \frac{b - a}{b + a}
        \]
    </p>
</div>

These results are still a bit underwhelming. $\log_{(m^2 \cdot n)}n$ still looks a little messy, and the problem remains quite elementary.

## Step 4

To make the problem more challenging, let's introduce more prime numbers and see how things change. Instead of just $a$ and $b$, let's use $a, b, c, d$:

<div class="mp"> 
    <p class="mpc">
        \[
            \begin{cases}
                a=\ln2 \\
                b=\ln3 + a \\
                c=\ln5 + b \\
                d=\ln7 + c
            \end{cases}           
        \]
    </p>
</div>

There is a pattern here. Look at it from a different angle:

<div class="mp"> 
    <p class="mpc">
        \[
        \begin{cases}
            \ln2=a \\
            \ln3=b-a \\
            \ln5=c-b \\
            \ln7=d-c
        \end{cases}   
        \]
    </p>
</div>

If we sum them up: $\ln2+\ln3+\ln5+\ln7=\ln(2 \cdot 3 \cdot 5 \cdot 7)=a+(b-a)+(c-b)+(d-c)=d$. The terms cancel each other out nicely. We are getting closer to something beautiful.

How about obtaining something like $T=\frac{d-a}{d+a}$?

We know $d=\ln(2 \cdot 3 \cdot 5 \cdot 7)$, so $d-a=\ln(3 \cdot 5 \cdot 7)$, while $d+a=\ln2+\ln(2 \cdot 3 \cdot 5 \cdot 7)$.

Our new problem becomes:

<div class="mp"> 
    <p>Let \(a = \ln 2, b = \ln 3 + a, c = \ln 5 + b, d = \ln 7 + c\). If \(T = \log_{\left(2^2 \cdot 3 \cdot 5 \cdot 7 \right)} \left(3 \cdot 5 \cdot 7\right)\), prove that: </p>
    <p class="mpc">
        \[
            T = \frac{d-a}{d+a}
        \]
    </p>
</div>

Can you see the pattern in $T = \log_{(2 \cdot 2 \cdot 3 \cdot 5 \cdot 7)}(3 \cdot 5 \cdot 7)$? 

The base is the product of the first four primes (with 2 appearing twice), while the argument is the product of those same primes excluding the first one.

Notice that primality isn't strictly essential. What matters is the additive structure created by factorization. Primes simply make that structure transparent.

## Step 5

Now it's time for the final touch: a full generalization.

Let's take $n$ prime numbers $p_n$ and their corresponding $a_n$:

<div class="mp"> 
    <p class="mpc">
        \[
            \begin{cases}
                a_1 = \ln p_1 \\
                a_2 = a_1 + \ln p_2 \\
                ... \\
                a_n = a_{n-1} + \ln p_n
            \end{cases}
        \]
    </p>
</div>

Or, from the other perspective:

<div class="mp"> 
    <p class="mpc">
        \[
            \begin{cases}
            \ln p_1 = a_1 \\
            \ln p_2 = a_2 - a_1 \\
            ... \\
            \ln p_n = a_n - a_{n-1}
            \end{cases}
        \]
    </p>
</div>



Summing them up, we observe:

<div class="mp"> 
    <p class="mpc">
        \[
            \sum_{i=1}^n \ln p_i = \ln \left(\prod_{i=1}^n p_i\right) = a_n
        \]
    </p>
</div>

Additionally:

<div class="mp"> 
    <p class="mpc">
        \[
            \begin{cases}
            a_n - a_1 = \ln \left(\prod_{i=2}^n p_i\right) \\
            a_n + a_1 = \ln \left(p_1 \cdot \prod_{i=1}^n p_i\right) 
            \end{cases}
        \]
    </p>
</div>

We can now formulate the final problem:

<div class="mp"> 
    <p>Let \(P_n = \{p_1, p_2, \dots, p_n \}\) denote the set of the first \(n\) prime numbers in increasing order. Define a sequence \(\left\{a_i\right\}_{i=1}^{n}\) such that:</p>
    <p class="mpc">
        \[
            a_1 = \ln p_1 \\
            a_i = a_{i-1} + \ln p_i
        \]
    </p>
    <p>Prove that for any \(n \geq 2\), there exists at least one pair of natural numbers \((x,y) \in \mathbb{N}^2\) satisfying the equation:</p>
    <p class="mpc">
        \[
            \log_x y = \frac{a_n - a_1}{a_n + a_1}
        \]
    </p>
    <p>such that the set of prime factors of \(x\) and \(y\) consist of consecutive primes from the sequence \(p_1, \dots, p_n\).</p>
</div>

Based on our discussion, the answer is:

<div class="mp"> 
    <p class="mpc">
        \[
            \begin{cases}
                x = p_1 \prod_{i=1}^n p_i \\
                y = \prod_{i=2}^n p_i
            \end{cases}
        \]
    </p>
</div>

Here, $x$ is the product of the first $n$ primes, with $p_1$ (which is 2) appearing twice. $y$ is the product of the first $n$ primes, excluding $p_1$.

If we plug these back into the formula:

<div class="mp"> 
    <p class="mpc">
        \[
            \log_x y = \frac{\ln y}{\ln x} = \frac{\ln(\prod_{i=2}^n p_i)}{\ln(p_1 \prod_{i=1}^n p_i)} = \frac{\ln(p_2 \cdot \dots \cdot p_n)}{\ln(p_1 \cdot p_1 \cdot p_2 \cdot \dots \cdot p_n)}
        \]
        \[
            = \frac{\ln p_2 + \dots + \ln p_n}{\ln p_1 + \ln p_1 + \dots + \ln p_n} = \frac{a_n - a_1}{a_n + a_1}
        \]
    </p>
</div>

## Conclusion 1

It is satisfying to see how, with some pattern spotting and a clear plan, you can transform the initial problem:

<div class="mp"> 
    <p>Let \(a=\ln5\), \(b=a+\ln2\) and \(T=\log_{20}8\). Prove:</p>
    <p class="mpc">
        \[ T=\frac{3(b-a)}{2b-a} \]
    </p>
</div>

Into this:

<div class="mp"> 
    <p>Let \(P_n = \{p_1, p_2, \dots, p_n \}\) denote the set of the first \(n\) prime numbers in increasing order. Define a sequence \(\{a_i\}_{i=1}^{n}\) such that:</p>
    <p class="mpc">
        \[
            a_1 = \ln p_1 \\
            a_i = a_{i-1} + \ln p_i
        \]
    </p>
    <p>Prove that for any \(n \geq 2\), there exists at least one pair of natural numbers \((x,y) \in \mathbb{N}^2\) satisfying the equation:</p>
    <p class="mpc">
        \[
            \log_x y = \frac{a_n - a_1}{a_n + a_1}
        \]
    </p>
    <p>such that the set of prime factors of \(x\) and \(y\) consist of consecutive primes from the sequence \(p_1, \dots, p_n\).</p>
</div>

They are effectively the same problem once you take a step back and look closer. So, where is the creative touch? I'm still asking myself that same question.

## Conclusion 2

Ultimately, composing a math problem is less about calculation and more about finding the underlying structure. You start with a sturdy foundation, for example a basic identity, you build upwards, adding layers of abstraction until the original structure is hidden.

The goal is/isn't to confuse the solver !? So, the next time you finish a difficult exercise, don't just close the book. Take a step back,  and ask "what if?" and see what you can build.

PS: I know this is not the most eloquent example, but it was something that came on the spot. You get the idea.