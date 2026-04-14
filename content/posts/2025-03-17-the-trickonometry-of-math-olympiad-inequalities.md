+++
date = '2025-03-17'
draft = false
title = 'The Trickonometry of Math Olympiad Inequalities'
categories = ['math']
tags = ['inequalities', 'olympiad']
usekatex = true
+++

{{< toc >}}

# Disclaimer

If you'd like to help out with reviewing, feel free to drop me a message (see the [*About Page*](/about)).

Special thanks to:
* `meithecatte` - for pointing out that one of statements was incorrect.
* `cryslith` - for pointing out some mistakes in my comments and helping me correct a few solutions.
* `Gheorghe Craciun` - for inspiring and allowing me to borrow some of his problems.
* `Thomas Klausner` - for his kindness in reporting errors in some of the proofs.
* All the other problem creators!
  
If I forgot to include a source or mistakenly credited an exercise to the wrong author, please know it was unintentional. Some of the problems are original (created by me), but not all are signed, as the results are too elementary to require attribution. Similarly, some solutions are original, while others are based on official ones (just presented in slightly more detail).

<div class="mpt">
    <p>Writing this short article made me nostalgic and brought back fond memories of my high school math teacher, Carmen Georgescu, who had a positive influence on me, as well as Gabriel Tica, who also inspired me when I was a young student.</p>
</div>

# Introduction

Inequalities are among the most "fascinating" and versatile topics in [competitive mathematics](https://en.wikipedia.org/wiki/List_of_mathematics_competitions) because they challenge solvers to think creatively and intuitively. If you look at the [IMO problem sets](https://artofproblemsolving.com/wiki/index.php/IMO_Problems_and_Solutions), you will find that inequality problems are almost always present, year after year. 

Approaching an "inequality" problem requires more than just sheer "mathematical force" (although using techniques from Real Analysis can help); you need to take a step back and come up with clever manipulations, substitutions, and (sometimes) novel ideas. In essence, inequality problems blend "beauty" with "intellectual challenge", and they embody so well the spirit of "competitive mathematics". 

I am a bad salesperson when it comes to selling mathematics, but the main idea is inequality problems are cool.

* For soccer lovers, solving a hard inequality problem feels like scoring a goal after a [long dribbling](https://en.wikipedia.org/wiki/Dribbling). 
* For video-games lovers, solving a hard inequality problem feels like figuring out a hard puzzle in: [Machinarium](https://en.wikipedia.org/wiki/Machinarium) or [The Longest Journey](https://en.wikipedia.org/wiki/The_Longest_Journey). <sup>In the lack of contemporary examples.</sup>
* For chess-lovers, solving a hard inequality problem feels like solving a mate-in-six puzzle.
* For competitive programmers, solving a hard inequality feels like solving a hard problem on [codeforces](https://codeforces.com/).

In case you haven't seen one, this is what hard inequality problems look like:

{{< olympiad_problem id="p00065" anchor="pint01" >}}

{{< olympiad_problem id="p00066" anchor="pint02" >}}

> It is generally unwise to label something as "hard" or "difficult," especially in mathematics. However, considering that these problems are actual IMO challenges, it is reasonable to label them in this way.

The purpose of this article is to highlight some techniques and methods that can assist math hobbyists, novice problem solvers, and curious undergraduates in approaching seemingly difficult inequality problems. This writing will only touch upon a small portion of this expansive (debatable epithet) class of problems.

> An edgy teacher, names excluded, once said: "In an ideal world people would solve inequality problems instead of Sudoku!". We haven't spoken since, I like Sudoku.

# Inequations vs. Inequalities

There is a subtle distinction between an *inequality* and an *inequation*, although the terms are often used interchangeably in everyday mathematical language. 

An inequation, a less common term, behaves just like a mathematical equation involving an inequality symbol. Inequations emphasize the algebraic problem-solving aspect of an inequality. 

Those are inequations:
{{< olympiad_problem id="p00067" anchor="pivi01" >}}

{{< olympiad_problem id="p00068" anchor="pivi02" >}}

An *inequation* is all about finding solutions, while inequalities focus on the actual relationship between numbers, a statement of truth that applies for all numbers in a given domain. 

The following are inequalities:
{{< olympiad_problem id="p00069" anchor="pivi03" >}}

Now, let's try to use the previous result (the modulus inequality) in a creative way:

{{< olympiad_problem id="p00070" anchor="pivi04" >}}

{{< olympiad_problem id="p00071" anchor="pivi05" >}}

{{< olympiad_problem id="p00072" anchor="pivi06" >}}

{{< olympiad_problem id="p00073" anchor="pivi07" >}}

{{< olympiad_problem id="p00074" anchor="pivi071" >}}

In rare (but "intentional") cases we can use inequalities to solve system of equations:

{{< olympiad_problem id="p00075" anchor="pivi072" >}}

Keep in mind the following two inequalities, as they will be helpful when solving more complex problems:

{{< olympiad_problem id="p00076" anchor="pivi08" >}}

{{< olympiad_problem id="p00077" anchor="pivi09" >}}

For the next problem, consider applying an inequality we have already established.

{{< olympiad_problem id="p00078" anchor="pivi10" >}}

In a similar fashion:

{{< olympiad_problem id="p00079" anchor="pivi101" >}}

Do you know how to factor your [symmetric polynomials](https://en.wikipedia.org/wiki/Symmetric_polynomial) ?

{{< olympiad_problem id="p00080" anchor="pivi11" >}}

I wouldn't call the next problem a "fundamental" result, but it's definitely a useful trick that I've seen applied to solve at least two or three problems in various math competitions:

{{< olympiad_problem id="p00081" anchor="pivi12" >}}

The following two problems have similar solutions. The key idea is to bound each term between two fixed values.

{{< olympiad_problem id="p00082" anchor="pivi13" >}}

{{< olympiad_problem id="p00083" anchor="pivi14" >}}

There is something elegant about the next problem:

{{< olympiad_problem id="p00084" anchor="pivi141" >}}

The following are the first *non-trivial* challenges in this article that can be solved without using *advanced* techniques or inequalities. Try using the provided hints before checking the full solution.

{{< olympiad_problem id="p00085" anchor="pivi15" >}}

{{< olympiad_problem id="p00086" anchor="pivi16" >}}

{{< olympiad_problem id="p00087" anchor="pivi17" >}}

{{< olympiad_problem id="p00088" anchor="pivi18" >}}

{{< olympiad_problem id="p00089" anchor="pivi19" >}}

{{< olympiad_problem id="p00090" anchor="pivi20" >}}

The following inequality may seem counterintuitive at first glance. How can a function $f(x,y,z)$, which clearly depends on the variables $x$, $y$, and $z$, attain its maximum value independently of $x$? Upon deeper reflection, however, there's no contradiction. This kind of behavior is entirely possible under the right structure:

{{< olympiad_problem id="p00091" anchor="pivi201" >}}

Just a general observation: if we explore the mindset of problem creators, we find that inequalities like <a href="#pivi201">Problem IVI20.1</a> are especially appealing. They often serve as the building blocks for crafting more intricate and elegant problems. For instance, we can use that very inequality as the basis for generating new, seemingly more challenging problems. Let’s step into the mindset of a problem composer.

<p>
    <div class="mp">
        <p>Recall that we have just proven the following inequality:</p>
        <p class="mpc"> 
            \[
                \sqrt{\frac{x+y}{x+z}}+\sqrt{\frac{x+z}{x+y}} \leq \frac{y+z}{\sqrt{yz}} \tag{1}
            \]
        </p>
        <p>Now, as a creative twist, we apply cyclic substitutions to obtain two additional inequalities:</p>
        <p class="mpc">
            \[
                \sqrt{\frac{y+z}{y+x}}+\sqrt{\frac{y+x}{y+z}} \leq \frac{z+x}{\sqrt{zx}} \tag{2}
            \]
            \[
                \sqrt{\frac{z+x}{z+y}}+\sqrt{\frac{z+y}{z+x}} \leq \frac{x+y}{\sqrt{xy}} \tag{3}
            \]
        </p>
        <p>Adding inequalities \((1)\), \((2)\), and \((3)\), we obtain:</p>
        <p class="mpc">
            \[
                \sqrt{\frac{x+y}{x+z}}+\sqrt{\frac{x+z}{x+y}} + \sqrt{\frac{y+z}{y+x}}+\sqrt{\frac{y+x}{y+z}} + \sqrt{\frac{z+x}{z+y}}+\sqrt{\frac{z+y}{z+x}} \leq
            \]
            \[
                \frac{y+z}{\sqrt{yz}} + \frac{z+x}{\sqrt{zx}} + \frac{x+y}{\sqrt{xy}} \Leftrightarrow
            \]
            \[
                \frac{\sqrt{x+y}+\sqrt{z+y}}{\sqrt{x+z}} + \frac{\sqrt{x+z}+\sqrt{y+z}}{\sqrt{x+y}} + \frac{\sqrt{z+x}+\sqrt{y+x}}{\sqrt{z+y}} \leq
            \]
            \[
                \frac{\sqrt{x}+\sqrt{y}}{\sqrt{z}} + \frac{\sqrt{y}+\sqrt{z}}{\sqrt{x}} + \frac{\sqrt{z}+\sqrt{x}}{\sqrt{y}} \tag{4}
            \]
        </p>
        <p>To add a final layer of challenge, we can impose the condition \(x + y + z = 1\). This leads to the following "new" problem, which appears more complicated but is structurally equivalent to the original:
        </p>
        <p>
        <div class="mp">
            <p>Let \(x,y,z\) positive real numbers such that \(x+y+z=1\). Prove that:</p>
            <p class="mpc">
                \[
                    \frac{\sqrt{1-z}+\sqrt{1-x}}{\sqrt{1-y}} + \frac{\sqrt{1-y}+\sqrt{1-x}}{\sqrt{1-z}} + \frac{\sqrt{1-y}+\sqrt{1-z}}{\sqrt{1-x}} \leq
                \]
                \[
                    \leq \frac{\sqrt{z}+\sqrt{x}}{\sqrt{y}} + \frac{\sqrt{y}+\sqrt{x}}{\sqrt{z}} + \frac{\sqrt{y}+\sqrt{z}}{\sqrt{x}}
                \]
            </p>
        </div>
        </p>
        <p>And there you have it, your first composed inequality problem, born from a simple yet powerful foundational result.</p>
        <p>If the problem you've just created is too elementary or too similar to an existing one (as in our case), you might choose not to attach your name to it. However, if you do choose to sign it, be sure to acknowledge the original source and clarify your own contribution. Noblesse oblige.</p>
    </div>
</p>

---

# Weak Inequalities vs. Strict inequalities

Weak inequalities are inequalities that allow for the possibility of equality. . They are typically denoted by the symbols $\ge$ or $\le$. In contrast, *strict inequalities*, use $\gt$ and $\lt$ and they don't permit equality.

A renaissance way to grasp the concept of a weak inequality is to think of the "finger of God" touching Adam's hand. In this metaphor, a strict inequality is represented by the following painting, as it depicts a situation that never occurs, at least not in olam ha-ze (this world).

{{< img src="/images/2025-12-09-15-A-short-introduction-to-math-olympiad-inequalities/adam.jpg">}}

From a mathematical standpoint, we know, for example, that $x^2+y^2\ge2xy$. This inequality is always true because $(x-y)^2\ge0$. If we plot $x^2+y^2$, and $2xy$, we will a see thin line where the graphical representation "touch". This red line is key to solving many problems in physics and engineering. It is specific to weak inequalities.

{{< img src="/images/2025-12-09-15-A-short-introduction-to-math-olympiad-inequalities/p02.png">}}

All in all, the main idea is that *weak inequalities* are more *interesting* than strict inequalities. 

---

# Being playful with algebraic identities

Before delving into specific inequalities, it's important to highlight a few key identities that problem creators frequently use when designing challenges. These identities are not only essential for understanding inequalities but also serve as powerful tools for solving a variety of other problems.

Some of my favorite identities are:

<p>
<div class="mp">
<ol type="1">
    <li>\(\hspace{1cm} 2(x^2+y^2)=(x+y)^2+(x-y)^2 \)</li>
    <li>\(\hspace{1cm}  x^3+y^3=(x+y)(x^2-xy+y^2) \)</li>
    <li>\(\hspace{1cm}  x^3-y^3=(x-y)(x^2+xy+y^2) \)</li>
    <li>\(\hspace{1cm}  x^n-y^n=(x-y)(x^{n-1}+x^{n-2}y+\dots+xy^{n-1}+y^n) \)</li>
    <li>\(\hspace{1cm} 2(xy+yz+zx)=(x+y+z)^2-(x^2+y^2+z^2) \)</li>
    <li>\(\hspace{1cm} 3(x+y)(y+z)(z+x)=(x+y+z)^3-(x^3+y^3+z^3) \)</li>
    <li>\(\hspace{1cm} (x+y)(y+z)(z+x)=(x+y+z)(xy+yz+zx)-xyz \)</li>
    <li>\(\hspace{1cm} x^3+y^3+z^3-3xyz=(x+y+z)(x^2+y^2+z^2-xy-yz-zx) \)</li>
    <li>\(\hspace{1cm} (\sqrt{\frac{a}{b}}+\sqrt{\frac{b}{a}})^2 = (a+b)(\frac{1}{a}+\frac{1}{b})\)</li>
    <li>\(\hspace{1cm} \frac{x}{(x-y)(x-z)}+\frac{y}{(y-x)(y-z)}+\frac{z}{(z-x)(z-y)}=0 \)</li>
    <li>\(\hspace{1cm} \frac{x^2}{(x-y)(x-z)}+\frac{y^2}{(y-x)(y-z)}+\frac{z^2}{(z-x)(z-y)}=1 \)</li>
    <li>\(\hspace{1cm} \frac{x^3}{(x-y)(x-z)}+\frac{y^3}{(y-x)(y-z)}+\frac{z^3}{(z-x)(z-y)}=x+y+z \)</li>
</ol>
</div>
</p>

Should you memorize all of these identities? It depends. If you're actively participating in contests, I believe it's worth memorizing them. Otherwise, simply being aware of their existence is sufficient. When you come across similar structures, check if these identities can help you. In a contest, you can present them as lemmas, and for clarity, it's advisable to offer brief proofs. Fortunately, the proofs are typically straightforward, relying on simple algebraic manipulations.

For example, consider the following problems:

{{< olympiad_problem id="p00012" anchor="paid01" >}}

{{< olympiad_problem id="p00013" anchor="paid02" >}}

This wasn't an inequality problem, but similar structures can arise in various contexts. Knowing your identities can significantly reduce the effort required to solve a problem.

If you enjoyed the previous problem, give the next one a try:

{{< olympiad_problem id="p00014" anchor="paid03" >}}

---

# The AM-GM Inequality

The AM (*Arithmetic Mean*) - GM (*Geometric Mean*) is a **fundamental** result in algebra that states:

<p>
<div class="mp">
<p>For any set of non-negative real numbers \(a_1, a_2, \dots , a_n\) the arithmetic mean is always greater than or equal to the geometric mean:</p>
<p class="mpc">
\[
    \frac{a_1+a_2+\dots+a_n}{n} \ge \sqrt[n]{a_1*a_2*\dots*a_n}
\]
</p>
<p>Or:</p>
<p class="mpc">
\[ 
    \sum_{i=1}^n a_i \ge n \sqrt[n]{\prod_{i=1}^n a_i}
\]
</p>
<p>The equality holds, if, and only if \(a_1=a_2=\dots=a_n\).</p>
</div>
</p>

For $n=2$ the inequality can be written as: $\frac{a+b}{2} \ge \sqrt{ab}$.

For $n=3$ the inequality can be written as: $\frac{a+b+c}{3} \ge \sqrt[3]{abc}$.

An interesting case arises when $\prod_{i=1}^na_i=1$. In this situation, the inequality gives us: $\sum_{i=1}a_i \ge n$, which means the sum of the numbers is always greater than or equal to $n$ (the *number of numbers*).

With that in mind, let's move on to the following problems:

{{< olympiad_problem id="p00001" anchor="pag01" >}}

Now, let's extend this concept by solving the following problem:

{{< olympiad_problem id="p00002" anchor="pag02" >}}

With a bit of creativity, you can solve the next problem in a manner similar to the previous one.

{{< olympiad_problem id="p00003" anchor="pag03" >}}

Do you know your *Partial fraction decomposition* ?

{{< olympiad_problem id="p00004" anchor="pag04" >}}

What if you apply the AM-GM inequality twice?

{{< olympiad_problem id="p00005" anchor="pag05" >}}

The AM-GM inequality reveals a profound connection between the sum (∑) and the product (∏) of positive real numbers. With this insight in mind, let's explore and solve the following problems:

{{< olympiad_problem id="p00006" anchor="pag06" >}}

{{< olympiad_problem id="p00007" anchor="pag07" >}}

Now, for a bit of fun, let's tackle a problem that may appear more challenging at first glance. You just need to apply the AM-GM twice.

{{< olympiad_problem id="p00008" anchor="pag08" >}}

The following problem was shortlisted for the 1971 International Mathematical Olympiad. While not particularly difficult, it requires discovering a *clever trick*.

{{< olympiad_problem id="p00009" anchor="pag09" >}}

For the next exercise the key idea is to leverage the additional conditions provided and incorporate them into your proof of the main inequality.

{{< olympiad_problem id="p00010" anchor="pag10" >}}

Sometimes you can solve "inequations" using "inequalities":

{{< olympiad_problem id="p00011" anchor="pag11" >}}

---

# Cyclic and Symmetrical Inequalities

Before proceeding further, let's familiarize ourselves with two important notions: *cyclic inequalities* and *symmetrical inequalities*.

A cyclic inequality involves a set of variables arranged in a cyclic order, where each term follows a repeating pattern by “rotating” the variables. For instance, for three variables we perform the transformation:

<p>
    <div class="mp">
        <p class="mpc">
            \[
                a \rightarrow b, \quad b \rightarrow c, \quad c \rightarrow a
            \]
        </p>
    </div>
</p>

The cyclic behavior can be expressed using the notation:

<p>
    <div class="mp">
        <p class="mpc">
            \[
                \sum_{\text{cyc}} f(a,b,c) = f(a,b,c) + f(b,c,a) + f(c,a,b)
            \]
        </p>
    </div>
</p>

Here are some examples that illustrate cyclic sums and their corresponding inequalities:

<p>
    <div class="mp">    
        <p class="mpc">
            \[
                \sum_{\text{cyc}} a^2 = a^2+b^2+c^2 \overbrace{\geq}^{AM-GM} 3\sqrt[3]{(abc)^2}
            \]
            \[
                \sum_{\text{cyc}} \frac{a}{b} = \frac{a}{b} + \frac{b}{c} + \frac{c}{a} \overbrace{\geq}^{AM-GM} 3
            \]
            \[
                \sum_{\text{cyc}} a^3b^2c = a^3b^2c + b^3c^2a + c^3a^2b \overbrace{\geq}^{AM-GM} 3(abc)^2
            \]
            \[
                \sum_{\text{cyc}} \frac{c+ab+1}{1+a+a^2} = \frac{c+ab+1}{1+a+a^2}+\frac{a+bc+1}{1+b+b^2}+\frac{b+ca+1}{1+c+c^2} \ge 3
            \]
        </p>
    </div>
</p>

In contrast, a symmetrical inequality is one that remains unchanged under any permutation of its variables. A function $f(a,b,c)$ is said to be symmetric if it satisfies:

<p>
    <div class="mp">
        <p class="mpc">
            \[
                \underbrace{f(a,b,c)=f(a,c,b)=f(b,a,c)=f(b,c,a)=f(c,a,b)=f(c,b,a)}_{3! \quad \text{permutations}}
            \]
        </p>
    </div>
</p>

In other words, any swap or rearrangement of $a, b, c$ leaves the function invariant. This complete symmetry is denoted by the notation: $\sum_{\text{sym}}$, which indicates summing over all distinct permutations of the variables.

Consider the following examples:

<p>
    <div class="mp">
        <p class="mpc">
            \[
                \sum_{\text{sym}} a = a + a + b + b + c + c \overbrace{\geq}^{AM-GM} 6\cdot\sqrt[3]{abc}
            \]
            \[
                \sum_{\text{sym}} a^2b = a^2b + a^2c + b^2c + b^2a  + c^2a + c^2b \overbrace{\geq}^{AM-GM} 6 \cdot abc
            \]
        </p>
    </div>
</p>

To highlight the difference, compare the following two sums:

<p>
    <div class="mp">
        \[
            \sum_{\text{sym}} a^2b = \underbrace{a^2b + a^2c + b^2c + b^2a  + c^2a + c^2b}_{3! \quad \text{permutations}} \overbrace{\geq}^{AM-GM} 6\cdot abc
        \]
        \[
            \sum_{\text{cyc}} a^2b = \underbrace{a^2b + b^2c + c^2a}_{3 \quad \text{"swaps"}} \overbrace{\geq}^{AM-GM} 3 \cdot \sqrt[3]{(abc)^2}
        \]
    </div>
</p>

Another comparison:

<p>
    <div class="mp">
        \[
            \sum_{\text{sym}} \frac{a}{b} = \frac{a}{b} + \frac{a}{c} + \frac{b}{a} + \frac{b}{c} + \frac{c}{a} + \frac{c}{b} \overbrace{\geq}^{AM-GM} 6
        \]
        \[
            \sum_{\text{cyc}} \frac{a}{b} = \frac{a}{b} + \frac{b}{c} + \frac{c}{a} \overbrace{\geq}^{AM-GM} 3
        \]
    </div>
</p>

These examples illustrate how the cyclic and symmetrical sum notations capture different patterns of symmetry within inequalities. While cyclic sums rotate the variables in a fixed order, symmetrical sums account for every possible permutation, reflecting complete invariance under any swap of the variables.

---

# Grouping and Splitting Terms

Solving more complex inequality problems requires more than just applying the general formula. A common approach involves strategically grouping terms to our advantage, then applying the Arithmetic Mean-Geometric Mean (AM-GM) inequality (or another relevant inequality) to each group. 

Finally, we combine the resulting inequalities to form a larger, more powerful inequality.

With practice, this technique will become second nature. However, at first glance, it may seem unintuitive.

Can you solve the following problems without relying on any hints?

{{< olympiad_problem id="p00032" anchor="pgtm01" >}}

{{< olympiad_problem id="p00033" anchor="pgtm02" >}}

{{< olympiad_problem id="p00034" anchor="pgtm03" >}}

{{< olympiad_problem id="p00035" anchor="pgtm04" >}}

{{< olympiad_problem id="p00036" anchor="pgtm05" >}}

{{< olympiad_problem id="p00037" anchor="pgtm06" >}}

The next problem is more difficult to solve but a previous exercise might help:

{{< olympiad_problem id="p00038" anchor="pgtm07" >}}

Remember, the key to solving the next problem is to leverage the additional condition to your advantage. While the terms may already be "grouped" for you, this alone won't be sufficient.

{{< olympiad_problem id="p00039" anchor="pgtm08" >}}

The next problem, proposed by Dorin Marghidanu, is a generalisation of the previous one, but can you "spot" the similarity?

{{< olympiad_problem id="p00040" anchor="pgtm09" >}}

The next problem is another generalisation of an exercise proposed to the *Romanian (Olympiad) Team Selection Test* from 2002:

{{< olympiad_problem id="p00041" anchor="pgtm10" >}}

{{< olympiad_problem id="p00042" anchor="pgtm11" >}}

We have already solved the following inequality using a different technique, but can you now prove it again by applying 'grouping' and the AM-GM inequality?

{{< olympiad_problem id="p00043" anchor="pgtm12" >}}

{{< olympiad_problem id="p00044" anchor="pgtm13" >}}

{{< olympiad_problem id="p00045" anchor="pgtm14" >}}

<!-- 
Can we make a short generalisation? -->

<!-- {{< olympiad_problem id="p00046" anchor="pgtm16" >}} -->


In a somewhat similar fashion:

{{< olympiad_problem id="p00047" anchor="pgtm17" >}}

{{< olympiad_problem id="p00048" anchor="pgtm18" >}}

{{< olympiad_problem id="p00049" anchor="pgtm19" >}}

The next two problems can be easily solved using an inequality that we will discuss shortly. However, let's first attempt to solve them using the AM-GM inequality, employing a strategy similar to the one we used earlier:

{{< olympiad_problem id="p00050" anchor="pgtm20" >}}


{{< olympiad_problem id="p00051" anchor="pgtm21" >}}

The next problem is a classic exercise from [APMO 1998](https://www.apmo-official.org/). Its solution closely resembles the previous examples (once you spot a simple but effective trick):

{{< olympiad_problem id="p00052" anchor="pgtm211" >}}

An important thing to take in consideration is that when we sum/multiply [weak inequalities](https://proofwiki.org/wiki/Definition:Inequality/Weak) involving *interdependent* terms, we need to verify conditions across the inequalities to check if they remain consistent:

{{< olympiad_problem id="p00053" anchor="pgtm22" >}}

The next problem is a textbook example of a clever application of the AM-GM inequality:

{{< olympiad_problem id="p00054" anchor="pgtm221" >}}

Sometimes, we need to find creative ways to group terms. If you're unable to find the solution right away, don't worry, this inequality is quite challenging to solve using only the AM-GM inequality.

{{< olympiad_problem id="p00055" anchor="pgtm23" >}}

Problems can become even more elegant when we apply strategic grouping to well-known identities. In this context, try solving the following exercise without relying on any hints:

{{< olympiad_problem id="p00056" anchor="pgtm24" >}}

At the end of this section, let's refocus on some elegant weak inequalities:

{{< olympiad_problem id="p00057" anchor="pgtm25" >}}

{{< olympiad_problem id="p00058" anchor="pgtm26" >}}

The following problems are not primarily about grouping terms but rather about identifying "structures" where the AM-GM inequality can be applied to help move toward the solution:

{{< olympiad_problem id="p00059" anchor="pgtm27" >}}

The next problem is more about "splitting" than grouping:

{{< olympiad_problem id="p00060" anchor="pgtm271" >}}

In a similar fashion:

{{< olympiad_problem id="p00061" anchor="pgtm272" >}}

{{< olympiad_problem id="p00062" anchor="pgtm28" >}}

{{< olympiad_problem id="p00063" anchor="pgtm29" >}}

{{< olympiad_problem id="p00064" anchor="pgtm30" >}}

--- 

# Muirhead's Theorem

Now that we've learned how to group and pair terms to our advantage, it's time to introduce a powerful theorem used for symmetric inequalities, Muirhead's theorem (named after [Robert Muirhead](https://en.wikipedia.org/wiki/Robert_Franklin_Muirhead)).

Before delving into Muirhead's theorem, we first need to understand the concept of [*majorisation*](https://en.wikipedia.org/wiki/Majorization).

<p>
    <div class="mp">
        <p>Consider two sequences of numbers \(p=(p_1, p_2, \dots, p_n)\) and \(q=(q_1, q_2, \dots, q_n)\) aranged in decreasing order.</p> 
        <p>We say \(p\) majorises \(q\) (written as \(p \succ q\)), if the following two conditions hold:</p>
        <ul>
            <li>For each \(k\) from \(1\) to \(n-1\), the sum of the first \(k\) elements components of \(p\) is at least as large as that of \(q\): \[\sum_{i=1}^k p_i \geq \sum_{i=1}^k q_i\]</li>
            <li>The total of the sequences are equal:\[\sum_{i=1}^n p_i = \sum_{i=1}^n q_i\]</li>
        </ul>
    </div>
</p>

An example:

<p>
    <div class="mp">
        <p>Consider the sequences:</p>
        <p class="mpc">
            \[p=(3,2,1), \quad q=(2,2,2)\]
        </p>
        <p> We wish to determine if \(p \succ q\).</p>
        <details>
            <summary>Solution</summary>
            <p>We check the partial sums:</p>
            <p class="mpc">
                \[
                    k = 1 \Rightarrow p_1 \geq q_1 \Leftrightarrow 3 \geq 2 \quad \textbf{\text{True}}
                \]
                \[
                    k = 2 \Rightarrow p_1 + p_2 \geq q_1 + q_2 \Leftrightarrow 5 \geq 4 \quad \textbf{\text{True}}
                \]
            </p>
            <p>Since the partial sum conditions test holds, we test if the total sums are equal:</p>
            <p class="mpc">
                \[
                    p_1 + p_2 + p_3 \overbrace{=}^{?} q_1 + q_2 + q_3 \Leftrightarrow 6 = 6 \quad \textbf{\text{True}} 
                \]
            </p>
            <p>So yes, \(p \succ q\).</p>
        </details>
    </div>
</p>

Now that we understand what majorisation is, let's discuss Muirhead's theorem:

<p>
    <div class="mp">
        <p>If \(a_1, a_2, \dots, a_n\) are positive reals, and \(x_n\) majorises \(y_n\) then the following inequality is true:</p>
        <p class="mpc">
            \[
                \sum_{\text{sym}} a_1^{x_1} * a_2^{x_2} * \dots *a_n^{x_n} \geq \sum_{\text{sym}}a_1^{y_1}*a_2^{y_2}*\dots*a_n^{y_n}
            \]
        </p>
    </div>
</p>

Note that Muirhead's Inequality is "symmetrical" in nature, so it doesn't work for "cyclic" inequalities. 

For example let's take the coefficients $(4,2,0)$ and $(3,2,1)$. We observe that the first sequences majorises the second, $(4,2,0) \succ (3,2,1)$. 

In this regard, the following is **true**:

<p>
    <div class="mp">
        <p class="mpc">
            \[
                \sum_{\text{sym}}a^4b^2 \geq \sum_{\text{sym}} a^3b^2c \Leftrightarrow
            \]
            \[
                a^4b^2 + a^4c^2 + b^4a^2 + b^4c^2 + c^4a^2 + c^4b^2 \overbrace{\geq}^{Muir.}
            \]
            \[
                \geq a^3b^2c + a^3c^2b + b^3a^2c + b^3c^2a + c^3b^2a + c^3a^2b 
            \]
        </p>
    </div>
</p>

But the following is **not true** (by Muirhead's inequality):

<p>
    <div class="mp">
        <p class="mpc">
            \[
                \sum_{\text{cyc}}a^4b^2 \not\geq \sum_{\text{cyc}} a^3b^2c \Leftrightarrow
            \]
            \[
                a^4b^2 + b^4c^2 + c^4a^2 \not\geq a^3b^2c + b^3c^2a + c^3a^2b
            \]
        </p>
    </div>
</p>

Now let's solve two elementary inequalities, but this time without using "elementary" techniques or the AM-GM inequality. Use Muirhead's Theorem instead:

{{< olympiad_problem id="p00104" anchor="pmrt01" >}}

{{< olympiad_problem id="p00105" anchor="pmrt02" >}}

I don't want to overemphasize Muirhead's Inequality because, although it's a recognized theorem, its use is generally discouraged in math competitions. Moreover, any result you might prove using Muirhead can also be demonstrated with the more established AM-GM inequality. Think of Muirhead's Inequality as a powerful, albeit somewhat brute-force, method to be used when other approaches fail... and only then.

---

# The mean inequality chain

> Also known as the QM-AM-GM-HM Inequalities, or how things are getting more serious.

Before presenting the actual inequality, let us first define two new types of means: the harmonic mean and the quadratic mean.

<p>
<div class="mp">
<p>Let \(x_{i=1\dots n} \in \mathbb{R}_{+}\). Then, the following definitions hold::</p>
<p class="mpc">
\[
\text{Harmonic Mean}=\frac{n}{\frac{1}{x_1}+\dots+\frac{1}{x_n}}=\frac{n}{\sum_{i=1}^n \frac{1}{x_i}} \\ \\ \\
\]
</p>
<p class="mpc">
\[
\text{Quadratic Mean}=\sqrt{\frac{x_1^2+\dots+x_n^2}{n}}=\sqrt{\frac{\sum_{i=1}^n x_i^2}{n}}
\]
</p>
</div>
</p>

This HM-GM-AM-QM inequality is a fundamental result in mathematic involving the *harmonic mean*, *geometric mean*, *arithmetic mean*, and the *quadratic mean*:

<p>
<div class="mp">
<p>Consider \(x_1, x_2, \dots, x_n\) as positive real numbers. The following inequality, known as the HM-GM-AM-QM inequality, holds:</p>
<p class="mpc">
\[
    0 \lt \frac{n}{\sum_{i=1}^n \frac{1}{x_i}} \le \underbrace{\sqrt[n]{\prod_{i=1}^n x_i} \le \frac{\sum_{i=1}^n x_i}{n}}_{\text{AM-GM Inequality}} \le \sqrt{\frac{\sum_{i=1}^n x_i^2}{n}}
\]
</p>
<p>Equality holds if \( x_1 = x_2 = \dots = x_n \).</p>
<p>If \(n=2\), the inequality becomes:</p>
<p class="mpc">
\[
    0 \lt \frac{2x_1x_2}{x_1+x_2} \le \sqrt{x_1x_2} \le \frac{x_1+x_2}{2} \le \sqrt{\frac{x_1^2+x_2^2}{2}}
\]
</p>
<p>If \(n=3\), the inequality becomes:</p>
<p class="mpc">
\[
    0 \lt \frac{3x_1x_2x_3}{x_1x_2+x_2x_3+x_3x_1} \le \sqrt[3]{x_1x_2x_3} \le \frac{x_1+x_2+x_3}{3} \le \sqrt{\frac{x_1^2+x_2^2+x_3^2}{3}}
\]
</p>
</div>
</p>

We can now solve several new problems using the relationships we've just established. The identities we've encountered remain useful, and the 'grouping' technique continues to be applicable.

{{< olympiad_problem id="p00097" anchor="pmic01" >}}

{{< olympiad_problem id="p00098" anchor="pmic02" >}}

In a similar fashion with the previous problem let's try to solve the next inequality:

{{< olympiad_problem id="p00099" anchor="pmic03" >}}

{{< olympiad_problem id="p00100" anchor="pmic04" >}}

{{< olympiad_problem id="p00101" anchor="pmic05" >}}

{{< olympiad_problem id="p00102" anchor="pmic06" >}}

{{< olympiad_problem id="p00103" anchor="pmic07" >}}

# The weighted AM-GM inequality

The Weighted AM-GM inequality is a generalization of the standard AM-GM inequality that includes weights for each term.

<p>
    <div class="mp">
        <p>Let \(a_1, a_2, \dots, a_n\) positive real numbers, and their associated (positive real) weights \(w_1, w_2, \dots, w_n\), such that:</p>
        <p class="mpc">
            \[
                w_1 + w_2 + \dots + w_n = W
            \]
        </p>
        <p>The Weighted AM-GM inequality states:</p>
        <p class="mpc">
            \[
                \frac{a_1w_1+a_2w_2+\dots+a_nw_n}{W} \ge (a_1^{w_1}a_2^{w_2}\dots a_n^{w_n})^{\frac{1}{W}}
            \]
        </p>
        <p>If \(W=1\), the inequality has the following form:</p>
        <p class="mpc">
            \[
                a_1w_1+a_2w_2+\dots+a_nw_n \ge a_1^{w_1}a_2^{w_2}\dots a_n^{w_n}
            \]
        </p>
        <p>If \(w_1=w_2=\dots=w_n=1\) then \(W=n\), so we obtain the "classical" AM-GM inequality:</p>
        <p class="mpc">
            \[
                \frac{a_1+a_2+\dots+a_n}{n} \ge (a_1a_2\dots a_n)^{\frac{1}{n}}
            \]
        </p>
    </div>
</p>

Let's try a classical exercise:

{{< olympiad_problem id="p00149" anchor="pwag01" >}}

Now, let's try to solve a classical problem proposed by Nguyen Manh Dung (I've found it in multiple sources) using the Weighted AM-GM inequality:

{{< olympiad_problem id="p00150" anchor="pwag02" >}}

The last problem in this section is authored by Dan Sitaru, the editor of the [Romanian Mathematical Magazine](https://www.ssmrmh.ro/):

{{< olympiad_problem id="p00151" anchor="pwag03" >}}

# The power of substitutions

> Actually, there's no real power in substitutions; it’s simply that our brains are inept at handling "*complications*".

Substitutions are powerful mechanisms in mathematics because they simplify complex problems, reveal hidden structures, and transform seemingly impossible problems into more familiar or solvable forms. By changing variables, substitutions allow viewing the same problem from different perspectives, often leading to new insights - or new problems. I assure you, problem creators love substitutions.

In this regard, let's solve the following inequality:

{{< olympiad_problem id="p00119" anchor="pps01" >}}

Or inequation:

{{< olympiad_problem id="p00120" anchor="pps02" >}}

Or this equation:

{{< olympiad_problem id="p00121" anchor="pps03" >}}

Radicals can be *nasty* to handle. If you can isolate them and make a clever substitution, go for it, don't hesitate!

{{< olympiad_problem id="p00122" anchor="pps04" >}}

As a general piece of advice, whenever you encounter logarithms in an inequality, you can try two approaches: either make a clever substitution or rewrite everything in a common base. Let's apply this idea to the next problem:

{{< olympiad_problem id="p00123" anchor="pps05" >}}

# Ravi Substitutions

A special type of substitution, known as *Ravi Substitution*, is a powerful technique used in geometric inequalities involving the sides of a triangle. The key idea is to express the sides of the triangle in terms of sums of positive variables, which often simplifies the given inequality and makes algebraic manipulations more natural. This transformation is particularly useful when dealing with symmetric inequalities in triangle geometry.

> This technique gets its name from [Ravi Vakil](https://en.wikipedia.org/wiki/Ravi_Vakil) a mathematician known for his contributions to algebraic geometry. The technique appears in mathematical problem-solving, particularly in inequalities involving the sides of a triangle. He wasn't the first one to introduce it (it appears in books of problems prior to 1940), but he was the one to popularise it.

In its most basic form, Ravi substitution works as follows:

<p>
    <div class="mp">
        <p>Let \(a,b,c\) be the sides of a triangle. The triangle inequality states that:</p>
        <p class="mpc">
            \[
                a+b \gt c, \quad b+c \gt a, \quad c+a\gt b
            \]
        </p>
        <p>To handle this structure more easily, we introduce new "variables":</p>
        <p class="mpc">
            \[
                a = x + y, \quad b = y+z, \quad c = z+x
            \]
        </p>
        <p>Where \(x,y,z\) are positive real numbers.</p>
    </div>
</p>

*Why is Ravi substition useful ?*

First of all, it eliminates the triangle constraints. In a triangle with sides $a,b,c$ the triangle inequality states that $a+b \gt c$, $b+c \gt a$, and $c+a \gt b$. By setting $a=x+y$, $b=y+z$, and $c=z+x$, these inequalities automatically hold, and its no longer needed to explicitly verify them. For example:

<p>
    <div class="mp">
        <p class="mpc">
            \[
                a+b \gt c \Leftrightarrow \underbrace{(x+y)}_{a} + \underbrace{(y+z)}_{b} \gt \underbrace{z+x}_{c}
                \Leftrightarrow (z+x)+2y \gt z+x \Leftrightarrow 2y \gt 0
            \]
        </p>
    </div>
</p>

With this new technique in mind, let's try solving the following IMO problems:

{{< olympiad_problem id="p00128" anchor="prs01" >}}

{{< olympiad_problem id="p00129" anchor="prs02" >}}

# Nesbitt's Inequality

Nesbitt's Inequality is a classic and elegant result in inequalities, commonly taught in competitive mathematics. Using it can help you bypass tedious steps where you would otherwise need to apply AM-GM or other inequalities.

> I was curious to learn more about Nesbitt, but there is little information about him online. Eventually, I came across this [link](https://hsm.stackexchange.com/questions/14733/who-was-a-m-nesbitt-the-eponym-of-nesbitts-inequality).

In a generalized form:

<p>
<div class="mp">
<p>If \(x_1, x_2, \dots, x_n\) are positive real numbers, and \(S=\sum_{i=1}^n x_i\), then:</p> 
<p class="mpc">
    \[\sum_{i=1}^n \frac{x_i}{S-x_i}\ge\frac{n}{n-1}
\]</p>
<p>Equality holds if \(x_1=x_2=\dots=x_n\).</p>
</div>
</p>

Most of the times you will apply it in this form:

<p>
<div class="mp">
<p> If \(a,b,c\) are positive positive real numbers, then:</p>
<p class="mpc">
\[
    \frac{a}{b+c}+\frac{b}{a+c}+\frac{c}{a+b} \ge \frac{3}{2}
\]
</p>
</div>
</p>

Can you prove Nesbitt's inequality using known inequalities (*AM-HM*, I am looking at you!)?

{{< olympiad_problem id="p00106" anchor="pnbt01" >}}

Can you solve the next problems using substitutions and Nesbitt's Inequality ?

{{< olympiad_problem id="p00107" anchor="pnbt02" >}}

{{< olympiad_problem id="p00108" anchor="pnbt03" >}}

For the next one, there's an easy solution using the AM-GM inequality, but can you prove it using Nesbitt's inequality instead?

{{< olympiad_problem id="p00109" anchor="pnbt04" >}}

Can you solve the next problems using Nesbitt's Inequality:

{{< olympiad_problem id="p00110" anchor="pnbt05" >}}

{{< olympiad_problem id="p00111" anchor="pnbt06" >}}


{{< olympiad_problem id="p00112" anchor="pnbt07" >}}

The next one looks rather peculiar, but can you solve it using Nesbitt's Inequality and *something else* ?

{{< olympiad_problem id="p00113" anchor="pnbt08" >}}

For the next problems, the *Nesbitt structure* is harder to spot:

{{< olympiad_problem id="p00114" anchor="pnbt09" >}}

{{< olympiad_problem id="p00115" anchor="pnbt10" >}}

{{< olympiad_problem id="p00116" anchor="pnbt11" >}}

{{< olympiad_problem id="p00117" anchor="pnbt111" >}}

The final problem presents a fascinating inequality that resembles Nesbitt's Inequality structure, though not exactly. Nevertheless, it's an interesting and noteworthy result:

{{< olympiad_problem id="p00118" anchor="pnbt12" >}}
 
# The Cauchy-Bunyakovsky-Schwartz Inequality

Together with the AM-GM inequality, the CBS Inequality forms the cornerstone of inequality problems in intermediate and advanced math competitions. In its simplest algebraic form, it appears as follows:

<p>
<div class="mp">
<p>For the real numbers \(a_{i=1 \dots n}, b_{i=1 \dots n}\) the inequality states:</p>
<p class="mpc">
    \[
        \Bigl(\sum_{i=1}^n a_i b_i\Bigl)^2 \le \Bigl(\sum_{i=1}^n a_i^2\Bigl)\Bigl(\sum_{i=1}^n b_i^2\Bigl)
    \]
</p>
<p>Equality holds if \(a_i = k*b_i\), \(\forall i\).</p>
</div>
</p>

Alternatively, in expanded form:

<p>
<div class="mp">
\[
    (a_1b_1+a_2b_2+\dots+a_nb_n)^2 \le (a_1^2+a_2^2+\dots+a_n^2)(b_1^2+b_2^2+\dots+b_n^2)
\]
</div>
</p>

You would be surprised in *how many ways* the CBS Inequality can be applied. 

Can you solve the next problems using the CBS Inequality ?

{{< olympiad_problem id="p00015" anchor="pcbs01" >}}

{{< olympiad_problem id="p00016" anchor="pcbs02" >}}

{{< olympiad_problem id="p00017" anchor="pcbs03" >}}

{{< olympiad_problem id="p00018" anchor="pcbs04" >}}

{{< olympiad_problem id="p00019" anchor="pcbs05" >}}

We have already proven the following inequality (as part of a previous problem) using the AM-GM inequality. However, can you find a solution that uses the Cauchy-Schwarz inequality instead?

{{< olympiad_problem id="p00020" anchor="pcbs06" >}}

{{< olympiad_problem id="p00021" anchor="pcbs07" >}}

{{< olympiad_problem id="p00022" anchor="pcbs08" >}}

{{< olympiad_problem id="p00023" anchor="pcbs09" >}}

{{< olympiad_problem id="p00024" anchor="pcbs10" >}}

{{< olympiad_problem id="p00025" anchor="pcbs11" >}}

We've already proven Nesbitt's Inequality using the AM-GM inequality, but can you prove it using the CBS Inequality? In case you need help, please follow the generous hints.

{{< olympiad_problem id="p00026" anchor="pcbs12" >}}


The following problem uses an interesting pattern/trick, can you solve it ?

{{< olympiad_problem id="p00027" anchor="pcbs13" >}}

{{< olympiad_problem id="p00028" anchor="pcbs14" >}}

{{< olympiad_problem id="p00029" anchor="pcbs15" >}}


Can you think of an identity and some algebraic manipulations to solve the next problem:

{{< olympiad_problem id="p00030" anchor="pcbs16" >}}
 
 The next problem looks more difficult than it is in reality:

 {{< olympiad_problem id="p00031" anchor="pcbs17" >}}

# An interesting refinement for Nesbitt's inequality

> Refinement of an inequality refers to the process of strengthening or improving an existing inequality by making it sharper or more precise. This typically involves replacing a given inequality with a stronger one that still holds under the same conditions but provides a tighter bound.

I was reading an article about how Nesbitt's inequality can be useful for solving certain geometric inequalities, particularly those involving the sides of a triangle (though we won’t be discussing that topic in this article). During my reading, I came across an interesting refinement: [*A new generalisation of Nesbitt's Inequality*](https://josa.ro/docs/josa_2013_3/a_05_Batinetu.pdf), by D. M. Batinetu-Giurgiu and Neculai Stanciu.

Let's try to prove it:

{{< olympiad_problem id="p00124" anchor="prns01" >}}

With this in mind, let's try to solve the following problems:

{{< olympiad_problem id="p00125" anchor="prns02" >}}

{{< olympiad_problem id="p00126" anchor="prns03" >}}

And finally, the next problem is not exactly a *refinement*, but an interesting "generalisation":

{{< olympiad_problem id="p00127" anchor="prns04" >}}

---

# Titu's Lemma (Bergstrom)

In 2001, [Titu Alexandrescu](https://en.wikipedia.org/wiki/Titu_Andreescu), who was at that time an USA IMO trainer, gave a lecture on a special case of the Cauchy-Bunyakovsky-Schwartz. Shortly after, one of his results (which was already known in the mathematical world) proved to be extremely effective for solving and "simplifying" difficult inequality questions. The technique was so efficient, that it got the popular name of "Titu's Lemma". Titu's Lemma states:

<p>
<div class="mp">
    <p>For any real numbers \(a_1,\dots,a_n\) and any positive real numbers \(b_1,\dots,b_n\) we have:</p>
    <p class="mpc">
    \[
        \frac{a_1^2}{b_1}+\dots+\frac{a_2^2}{b_n}\ge\frac{(a_1+\dots+a_n)^2}{b_1+\dots+b_n}
    \]
    </p>
</div>
</p>

The proof for two terms doesn't need to involve the CBS inequality and it's quite straightforward. Why don't you try it:

{{< olympiad_problem id="p00130" anchor="ptt01" >}}

Now, let's try to prove it for 3 terms:

{{< olympiad_problem id="p00131" anchor="ptt02" >}}

Any problem that can be solved using the CBS inequality can be solved just as effectively, if not more easily, using Titu's Lemma.

{{< olympiad_problem id="p00132" anchor="ptt03" >}}

As a cool exercise, try proving Nesbitt's inequality using Titu's Lemma:

{{< olympiad_problem id="p00133" anchor="ptt04" >}}

Two of the problems we've solved so far become "one-liners" just by applying Titu's Lemma directly:

<p>
<div class="mp">
<p>Let \(a, b, c\) be positive real numbers, and \(a+b+c=3\). Prove that:</p>
<p class="mpc">
    \(
        \frac{1}{a+b}+\frac{1}{b+c}+\frac{1}{c+a} \ge \frac{3}{2}
    \)
</p>
<p><em>Solution:</em></p>
<p>Applying Titu's Lemma:</p>
<p class="mpc">
    \[
        \frac{1}{a+b}+\frac{1}{b+c}+\frac{1}{c+a} \ge \frac{(1+1+1)^2}{2(\underbrace{a+b+c}_{=3})} = \frac{3}{2}
    \]
</p>
<p>The equality holds if \(a=b=c=1\).</p>
</div>
</p>

<p>
<div class="mp">
<p>Let \(a,b,c,x,y,z\) be positive real numbers, and \(x+y+z=a+b+c=1\). Prove that:</p>
<p class="mpc">
\[
    \frac{1}{ax+by+cz}+\frac{1}{cx+ay+bz}+\frac{1}{bx+cy+az} \ge 9
\]
</p>
<p><em>Solution:</em></p>
<p>Applying Titu's Lemma:</p>
<p class="mpc">
    \[
        \frac{1}{ax+by+cz}+\frac{1}{cx+ay+bz}+\frac{1}{bx+cy+az} \ge \frac{(1+1+1)^2}{(\underbrace{a+b+c}_{=1})(\underbrace{x+y+z}_{=1})} = 9
    \]
</p>
<p>The equality holds when \(a=b=c=x=y=z=\frac{1}{3}\).</p>
</div>
</p>

To emphasize the power of Titu's Lemma, let's first solve some "harder" inequality problems using traditional methods, relying on tricks and clever manipulations, before demonstrating the much simpler approach with Titu's Lemma.

{{< olympiad_problem id="p00134" anchor="ptt05" >}}

{{< olympiad_problem id="p00135" anchor="ptt06" >}}

For the next problems, Titu's Lemma plays a special role in simplifying them:

{{< olympiad_problem id="p00136" anchor="ptt07" >}}

{{< olympiad_problem id="p00137" anchor="ptt08" >}}

{{< olympiad_problem id="p00138" anchor="ptt081" >}}

{{< olympiad_problem id="p00139" anchor="ptt09" >}}

{{< olympiad_problem id="p00140" anchor="ptt10" >}}

{{< olympiad_problem id="p00141" anchor="ptt11" >}}

{{< olympiad_problem id="p00142" anchor="ptt12" >}}

{{< olympiad_problem id="p00143" anchor="ptt13" >}}

{{< olympiad_problem id="p00144" anchor="ptt14" >}}

{{< olympiad_problem id="p00145" anchor="ptt15" >}}

{{< olympiad_problem id="p00146" anchor="ptt16" >}}

{{< olympiad_problem id="p00147" anchor="ptt17" >}}

{{< olympiad_problem id="p00148" anchor="ptt18" >}}

# More challenges

The problems from this chapter a little more challenging, so don't get discouraged if won't be able to solve them after the first try.

{{< olympiad_problem id="p00092" anchor="pmch01" >}}

The next problem is an inequality problem "spiced-up" with just a little *number theory*:

{{< olympiad_problem id="p00093" anchor="pmch02" >}}

In a similar fashion:

{{< olympiad_problem id="p00094" anchor="pmch03" >}}

{{< olympiad_problem id="p00095" anchor="pmch04" >}}

{{< olympiad_problem id="p00096" anchor="pmch05" >}}

# In Part 2

This article was just an introduction. In the upcoming articles in this series, I plan to discuss the following topics: Jensen's Inequality, Hölder's Inequality, Radon's Inequality, Chebyshev's Inequality, Bernoulli's Inequality, the PQR Technique, Calculus Techniques, and Lagrange Multipliers.

# Where to go next ?

If you have started to develop a taste for solving inequality problems, there are several excellent resources that can help you advance further.

First of all, if you want to read a more "serious" material, I recommend you to go through Vasile Cartoaje's books: 
* [Mathematical Inequalities, Volume 1, Symmetrical Polynomial Inequalities](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_1.pdf)
* [Mathematical Inequalities, Volume 2, Symmetric Rational and Nonrational Inequalities](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_2.pdf)
* [Mathematical Inequalities, Volume 3, Cyclic and Noncyclic Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_3.pdf)
* [Mathematical Inequalities, Volume 4, Extensions and Refinements of Jensen's Inequality, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_4.pdf)
* [Mathematical Inequalities, Volume 5, Other Recent Methods For Creating and Solving Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_5.pdf), they are amazing.

Secondly there are multiple articles online with similar content (most of them are accesible as a PDF files). For example:
* [Basics Of Olympiad Inequalities, Samin Riasat](https://web.williams.edu/Mathematics/sjmiller/public_html/161/articles/Riasat_BasicsOlympiadInequalities.pdf)
* [Eeshan Banerjee, Titu's Lemma](file:///home/andrei/down/titus_lemma.pdf)
* [Introduction to Olympiad Inequalities, Sanja Simonovikj](https://esp.mit.edu/download/8a5f8efe-59f5-407d-9252-607ace7aa190/M11250_Intro%20to%20ol%20ineq%20hssp.pdf)
* [Titu's Lemma, Pankaj Agarwal](https://aamonline.org.in/ganit-bikash/gb/volume-67/10-titu-s-lemma-Pankaj-Agarwal.pdf)

I recommend you also the following Facebook groups where people gather to actually solve "difficult inequalities" (and not only):
* [Romanian Mathematical Magazine (RMM)](https://www.facebook.com/groups/355300697927549/)
* [Mathematical Inequalities](https://www.facebook.com/groups/1486244404996949/)

[CutTheKnot](https://www.cut-the-knot.org/algebra.shtml) has a quite a few gems with full solutions available.

[Leo Giugiuc's Blog](https://leogiugiuc.wordpress.com/my-solutions/) (who's one of our "local experts" in inequalities) blog contains some advanced inequalities that are not easily solvable using conventional techniques.
