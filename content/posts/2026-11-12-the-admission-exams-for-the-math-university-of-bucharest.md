+++
date = '2026-11-12'
draft = false
title = 'The University of Bucharest Mathematics Entrance Exam (2015)'
categories = ["math"]
tags = ['algebra', 'analysis']
usekatex = true
katexMacros = { '\vv' = '\overrightarrow{#1}' }
customCSS = ["/css/2026-10-28-bucharest-exam/explorers.css?v=3"]
customDeferJS = ["/js/2026-10-28-bucharest-exam/plot.js", "/js/2026-10-28-bucharest-exam/algebra.js", "/js/2026-10-28-bucharest-exam/analysis.js?v=15", "/js/2026-10-28-bucharest-exam/geometry.js?v=1"]
+++

Unlike the entrance exam at Politehnica, which uses multiple-choice questions, this exam requires you to write out the full solution, like a *true* mathematician who enjoys writing proofs. The exam is not very difficult, but I really enjoy the types of problems they give candidates: problems that x-ray their grasp of analysis, algebra, geometry or informatics.

## Contents

- [2015](#2015)
  - [The subject](#the-subject)
  - [Algebra](#algebra)
    - [Problem](#pub2015i)
    - [Solution (a)](#solution-a)
    - [Solution (b)](#solution-b)
    - [Solution (c)](#solution-c)
    - [Solution (d)](#solution-d)
    - [Visualizing the roots](#visualizing-the-roots)
  - [Mathematical Analysis](#analysis)
    - [Problem](#pub2015ii)
    - [Some standard limits worth knowing](#some-standard-limits-worth-knowing)
    - [Solution (a)](#analysis-solution-a)
    - [Solution (b)](#analysis-solution-b)
    - [Solution (c)](#analysis-solution-c)
    - [Solution (d)](#analysis-solution-d)
    - [Solution (e)](#analysis-solution-e)
  - [Geometry](#geometry)
    - [Problem](#pub2015iii)
    - [Solution (a)](#geometry-solution-a)
    - [Solution (b)](#geometry-solution-b)
    - [Solution (c)](#geometry-solution-c)
  - [Informatics](#informatics)
    - [Problem](#pub2015iv)
    - [Solution (a)](#informatics-solution-a)
    - [Solution (b)](#informatics-solution-b)

# 2015

## The subject

There were 4 subjects and 3 hours to solve the problems, but the "nice" part is the fact that you only had to pick 2 of them.

![University of Bucharest mathematics entrance exam, 2015](/images/2026-10-28-the-admission-exams-for-the-math-university-of-bucharest/2015.png)

## Algebra

The first problem is an algebra problem that tests your knowledge of *quadratic equations* and how the roots of the equation depend on a given parameter. It also tests your knowledge of Viète’s formulas. 

Overall, it's a nice problem (and quite easy), with the last part (**d**) being the nicest (but only a little).

### Problem {#pub2015i}

Consider the equation

$$
(m+1)x^2-(2m+1)x-2m=0,
\qquad m\in\mathbb{R}\setminus\{-1\}.
$$

#### (a) [To solution →](#solution-a) {#problem-a}

Find the real roots of the equation when $m=1$.

#### (b) [To solution →](#solution-b) {#problem-b}

Find all values of the parameter $m$ for which both roots of the equation are real.

#### (c) [To solution →](#solution-c) {#problem-c}

Find all values of the parameter $m$ such that $x_1^2+x_2^2=-8$, where $x_1,x_2$ are the complex roots of the equation.

#### (d) [To solution →](#solution-d) {#problem-d}

Find all integer values of $m$ for which both roots of the equation are integers.

### Solution (a) [← Back to problem](#problem-a) {#solution-a}

Substituting $m=1$, we obtain:

$$
2x^2-3x-2=0
\iff 2x^2-4x+x-2=0
$$

$$
\iff 2x(x-2)+(x-2)=0
\iff (2x+1)(x-2)=0.
$$

Thus, the two real roots are $x_1=-\frac12$ and $x_2=2$.

In case you don't know your *factoring by grouping*, you can always compute $\Delta$ to find the roots.

In our case:

$$
\Delta = (-3)^2-4 \cdot (2) \cdot (-2) = 9+16 = 25
$$

$$
\implies x_1 = \frac{-(-3)+\sqrt{25}}{2 \cdot 2}=2
$$

$$
\implies x_2 = \frac{-(3)-\sqrt{5}}{2 \cdot 2}=-\frac{1}{2}
$$

### Solution (b) [← Back to problem](#problem-b) {#solution-b}

Since $m\neq-1$, the equation is quadratic. Both roots are real if and only if its discriminant is nonnegative:

$$
\Delta=[-(2m+1)]^2-4(m+1)(-2m)
=(2m+1)^2+8m(m+1)
$$

$$
=12m^2+12m+1\geq0.
$$

A neat trick here is to complete the square:

$$
12m^2+12m+1=3(2m+1)^2-2.
$$

$$
\Delta\geq0
\iff (2m+1)^2\geq\frac23
\iff |2m+1|\geq\frac{\sqrt6}{3}.
$$

Solving for $m$ and excluding $-1$, we get:

$$
m\in\left(
\left(-\infty,-\frac12-\frac{\sqrt6}{6}\right]
\cup\left[-\frac12+\frac{\sqrt6}{6},\infty\right)
\right)\setminus\{-1\}.
$$

### Solution (c) [← Back to problem](#problem-c) {#solution-c}

For a quadratic equation $ax^2+bx+c=0$, with $a\neq0$, Viète’s formulas give:

$$
x_1+x_2=-\frac ba,
\qquad x_1x_2=\frac ca.
$$

These formulas also hold for complex roots, including repeated roots.

We need $x_1^2+x_2^2=-8$. Using Viète’s formulas, we have $x_1+x_2=\frac{2m+1}{m+1}$ and $x_1x_2=\frac{-2m}{m+1}$, so:

$$
x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2
=\frac{(2m+1)^2}{(m+1)^2}+\frac{4m}{m+1}.
$$

Since $m\neq-1$, we can multiply the equation $x_1^2+x_2^2=-8$ by $(m+1)^2$ and rearrange:

$$
(2m+1)^2+4m(m+1)+8(m+1)^2=0
$$

$$
\iff 16m^2+24m+9=0
\iff (4m+3)^2=0
\iff m=-\frac34.
$$

This value is allowed, so $m=-\frac34$ is the unique solution.

### Solution (d) [← Back to problem](#problem-d) {#solution-d}

This part is a little more subtle.

If both roots are integers, their sum must also be an integer. By Viète’s formulas:

$$
x_1+x_2=\frac{2m+1}{m+1}
=2-\frac{1}{m+1}\in\mathbb Z.
$$

Therefore, $\frac{1}{m+1}$ must be an integer. Since $m$ is itself an integer and $m\neq-1$, this is possible only if $m+1=\pm1$. Thus, the only candidates are $m=0$ and $m=-2$.

We still need to check that both candidates give integer roots:

- For $m=0$, the equation becomes $x^2-x=x(x-1)=0$, with roots $0$ and $1$.
- For $m=-2$, the equation becomes $-x^2+3x+4=-(x-4)(x+1)=0$, with roots $4$ and $-1$.

Hence, the required values are $m\in\{0,-2\}$.

### Visualizing the roots

I believe we can build more intuition about such problems if we manage to visualize them.

For example, let's take this function (looks familiar, right?):

$$
f_m(x)=(m+1)x^2-(2m+1)x-2m
$$

Solving the original equation means finding the values of $x$ for which $f_m(x)=0$.

On the graph, these are the $x$-coordinates of the points where the curve meets the $x$-axis.

For $m\neq-1$, the graph is a parabola:

- When $\Delta \gt 0$, our function crosses the $x$-axis twice, giving two distinct real roots.
- When $\Delta=0$, our function touches the axis at a single point, giving a repeated real root.
- When $\Delta \lt 0$, our function never meets the axis: the equation has two non-real complex roots.

As we play with the parameter $m$, the parabola’s shape and position change.

For example, at $m=-1$, the quadratic term disappears and the graph becomes a line $y=x+2$. That's why the authors of this problem excluded the value altogether.

<div id="quadratic-explorer" class="exam-explorer">
<label for="quadratic-m">Parameter m: <output id="quadratic-m-value" for="quadratic-m">1.00</output></label>
<span id="quadratic-slider-hint" class="quadratic-slider-hint"><span aria-hidden="true">↔</span> Drag Left or Right</span>
<div class="exam-slider-wrap">
<input id="quadratic-m" type="range" min="-3" max="3" step="0.01" value="1" aria-describedby="quadratic-status quadratic-legend">
<div class="quadratic-linear-track" aria-hidden="true"><span></span></div>
</div>
<p id="quadratic-legend" class="exam-legend">
    <span class="blue">Blue: two real roots</span>
    <span class="green">Green: two non-real complex roots</span>
    <span class="red">Red dot on slider: linear</span>
    <small>The color boundaries represent a repeated real root.</small>
</p>
<canvas id="quadratic-canvas" width="640" height="340" role="img" aria-label="Graph of the quadratic function"></canvas>
<p id="quadratic-status" class="exam-status" role="status"></p>
<noscript><p>Enable JavaScript to use the interactive graph.</p></noscript>
</div>

---

## Mathematical Analysis {#analysis}

The analysis problem is better than the algebra problem, in my opinion, but yet again, it's not exactly the most difficult exercise, which is fine.

The main purpose of this problem is to test whether students know about continuity and differentiability and can evaluate some basic integrals, playing with a piecewise function.

### Problem {#pub2015ii}

Let $f:\mathbb{R}\to\mathbb{R}$ be defined by

$$
f(x)=
\begin{cases}
\dfrac{1-e^{-x}}{x}, & x<0,\\[6pt]
a, & x=0,\\[6pt]
\dfrac{\ln(1+x)}{x}, & x>0,
\end{cases}
\qquad a\in\mathbb{R},
$$

and let

$$
I_n=\int_1^2\frac{f(x)}{x^n}\,dx,
\qquad n\in\mathbb{N}.
$$

#### (a) [To solution →](#analysis-solution-a) {#analysis-problem-a}

Find $a$ such that $f$ is continuous.

#### (b) [To solution →](#analysis-solution-b) {#analysis-problem-b}

Show that if $f$ is continuous, then it is also differentiable.

#### (c) [To solution →](#analysis-solution-c) {#analysis-problem-c}

Prove that $f(x)\in(0,1)$ for every $x>0$.

#### (d) [To solution →](#analysis-solution-d) {#analysis-problem-d}

Show that

$$
I_1=\frac{3}{2}\ln\frac{4}{3}.
$$

#### (e) [To solution →](#analysis-solution-e) {#analysis-problem-e}

Prove that the sequence $(I_n)_{n\in\mathbb{N}}$ is decreasing and that

$$
\lim_{n\to+\infty}I_n=0.
$$

### Some standard limits worth knowing before solving the exercise

Before starting to solve the actual problem, my recommendation is to take a look at these limits and memorise them (again). 

For the purposes of the exam, you can use them without having to prove them:

- $\displaystyle \lim_{x\to0}\frac{e^x-1}{x}=1$

- $\displaystyle \lim_{x\to0}\frac{\ln(1+x)}{x}=1$

- $\displaystyle \lim_{x\to0}\frac{1-e^{-x}}{x}=1$

- $\displaystyle \lim_{x\to0}\frac{e^x-1-x}{x^2}=\frac12$

- $\displaystyle \lim_{x\to0}\frac{\ln(1+x)-x}{x^2}=-\frac12$

- $\displaystyle \lim_{x\to0}\frac{\sin x}{x}=1$

- $\displaystyle \lim_{x\to0}\frac{\tan x}{x}=1$

- $\displaystyle \lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12$

- $\displaystyle \lim_{x\to0}\frac{(1+x)^\alpha-1}{x}=\alpha$

- $\displaystyle \lim_{x\to0}(1+x)^{1/x}=e$

- $\displaystyle \lim_{n\to\infty}\left(1+\frac1n\right)^n=e$

$\alpha$ is a fixed real number.

Normally, I would be against memorisation, but these limits should be the bare minimum you know without having to think too much.

### Solution (a) [← Back to problem](#analysis-problem-a) {#analysis-solution-a}

Both expressions defining $f(x)$ are continuous on their respective intervals, so we only need to check continuity at $x=0$.

For the left-hand limit, we use the substitution $t=-x$. As $x\to0^{-}$, we have $t\to0^{+}$, so:

$$
\lim_{x\to0^{-}}f(x)
=\lim_{x\to0^{-}}\frac{1-e^{-x}}{x}
=\lim_{t\to0^{+}}\frac{e^t-1}{t}
=1.
$$

For the right-hand limit, we can apply the standard logarithmic limit directly:

$$
\lim_{x\to0^{+}}f(x)
=\lim_{x\to0^{+}}\frac{\ln(1+x)}{x}
=1.
$$

Both one-sided limits are equal to $1$, so the limit at $0$ exists and equals $1$. But this alone is not enough for continuity: the limit must also equal the actual value $f(0)=a$.

Therefore, $f$ is continuous at $0$ if and only if:

$$
\lim_{x\to0}f(x)=f(0)
\iff 1=a.
$$

Hence, $f$ is continuous on $\mathbb{R}$ precisely when $a=1$.

We can see this below: the blue and purple branches both approach $(0,1)$, but the red point, $f(0)=a$, only joins them when $a=1$. Press **Approach zero** to bring all three points together, or change $a$ yourself.

<div id="analysis-a-explorer" class="exam-explorer">
<div class="exam-controls">
<label for="analysis-a">Value at zero, a: <output data-control="a-value" for="analysis-a" aria-live="off">0.50</output></label>
<button type="button" data-set="a" data-value="1">Set a = 1</button>
</div>
<div class="exam-slider-wrap"><input id="analysis-a" data-control="a" type="range" min="0" max="2" step="0.01" value="0.5" aria-describedby="analysis-a-status"></div>
<div class="exam-controls">
<label for="analysis-approach">Approach zero — distance: <output data-control="distance-value" for="analysis-approach" aria-live="off">1.000</output></label>
<button type="button" data-control="animate" aria-pressed="false">Approach zero</button>
<button type="button" data-set="approach" data-value="0">Reset points</button>
</div>
<div class="exam-slider-wrap"><input id="analysis-approach" data-control="approach" type="range" min="0" max="1000" step="1" value="0" aria-describedby="analysis-a-status"></div>
<p class="exam-legend"><span>Left: $(1-e^{-x})/x$</span><span class="purple">Right: $\ln(1+x)/x$</span><span class="green">Common limit y = 1</span><span class="red">Actual value f(0)</span></p>
<canvas width="640" height="300" role="img" aria-label="Blue and purple points approach the common limit 1 from opposite sides; the red point is the actual value at zero."></canvas>
<div class="exam-limit-readouts">
<div class="exam-limit-left"><strong>$x\to0^{-}$, $f(x)\to1$</strong><span data-control="left-value">x = −1.000; f(x) = 1.71828</span></div>
<div class="exam-limit-right"><strong>$x\to0^{+}$, $f(x)\to1$</strong><span data-control="right-value">x = +1.000; f(x) = 0.69315</span></div>
</div>
<p id="analysis-a-status" class="exam-status" role="status">Both branches approach 1. Continuity requires a = 1.</p>
<noscript>Enable JavaScript to explore the graph.</noscript>
</div>

### Solution (b) [← Back to problem](#analysis-problem-b) {#analysis-solution-b}

From **(a)**, we know that $a=1$. So, by the definition of the derivative, we need to evaluate:

$$
f'(0)=\lim_{x\to0}\frac{f(x)-f(0)}{x-0}
=\lim_{x\to0}\frac{f(x)-1}{x}.
$$

For $f$ to be differentiable at $0$, the limits from both sides must exist, be finite, and match. *Philosopher's question: can they match and be infinite?*

From the left:

$$
\lim_{x\to0^{-}}\frac{f(x)-1}{x}
=\lim_{x\to0^{-}}\frac{\frac{1-e^{-x}}{x}-1}{x}
=-\lim_{x\to0^{-}}\frac{e^{-x}+x-1}{x^2}.
$$

Using $t=-x$, just as in **(a)**, we have $t\to0^{+}$ and $x^2=t^2$. The standard second-order exponential limit then gives:

$$
-\lim_{x\to0^{-}}\frac{e^{-x}+x-1}{x^2}
=-\lim_{t\to0^{+}}\frac{e^t-1-t}{t^2}
=-\frac12.
$$

From the right:

$$
\lim_{x\to0^{+}}\frac{f(x)-1}{x}
=\lim_{x\to0^{+}}\frac{\frac{\ln(1+x)}{x}-1}{x}
=\lim_{x\to0^{+}}\frac{\ln(1+x)-x}{x^2}
=-\frac12,
$$

where we used the standard second-order logarithmic limit.

Both limits *agree*, so $f$ is differentiable at $0$, with:

$$
f'(0)=-\frac{1}{2}.
$$

Away from $0$, both branches are differentiable on their respective intervals, so $f$ is differentiable everywhere on $\mathbb{R}$.

> `both branches are differentiable on their respective intervals` — a rigorous professor might ask for additional justification for this claim. How would you answer?

We can see this below: as the blue and purple points approach $(0,1)$, their secants approach the same green tangent, with slope $-1/2$. 

The triangles measure each secant slope as $\Delta y/\Delta x$, with $L$ for the left branch, $\frac{1-e^{-x}}{x}$, and $R$ for the right branch, $\frac{\ln(1+x)}{x}$.

<div id="analysis-b-explorer" class="exam-explorer">
<div class="exam-controls">
<label for="analysis-h">Approach zero — distance, h: <output data-control="h-value" for="analysis-h" aria-live="off">2.0000</output></label>
<button type="button" data-control="animate" aria-pressed="false">Approach zero</button>
<button type="button" data-set="approach" data-value="0">Reset points</button>
</div>
<div class="exam-slider-wrap"><input id="analysis-h" data-control="approach" type="range" min="0" max="1000" step="1" value="0"></div>
<p class="exam-legend"><span>Left branch + dashed secant</span><span class="purple">Right branch + dashed secant</span><span class="green">Common tangent: $y=1-x/2$</span></p>
<canvas width="640" height="300" role="img" aria-label="The blue left branch and purple right branch from x = −2.2 to 2.2: their secants approach the green tangent of slope minus one half at (0, 1)."></canvas>
<div class="exam-limit-readouts">
<div class="exam-limit-left"><strong>Left</strong><span>$\dfrac{\Delta y_L}{\Delta x_L}=\dfrac{f(-h)-1}{-h}\to-\dfrac12$</span><span data-control="left-value">Slope = −1.097264</span></div>
<div class="exam-limit-right"><strong>Right</strong><span>$\dfrac{\Delta y_R}{\Delta x_R}=\dfrac{f(h)-1}{h}\to-\dfrac12$</span><span data-control="right-value">Slope = −0.225347</span></div>
</div>
<noscript>Enable JavaScript to explore the graph.</noscript>
</div>

The slopes are different for $h>0$, but their limits are equal. At $(0,1)$, the two branches have the same tangent: $y=1-\frac{x}{2}$. There is no corner where they meet.

### Solution (c) [← Back to problem](#analysis-problem-c) {#analysis-solution-c}

We need to prove that, for $x\gt0$:

$$
0\lt\frac{\ln(1+x)}{x}\lt1.
$$

This problem can be solved in two ways: the nice way or the *intended way*.

The nice way is to make use of a known result in mathematics, more specifically the [exponential form of Bernoulli's inequality](https://en.wikipedia.org/wiki/Bernoulli%27s_inequality#Related_inequalities):

$$
(1+x)^r\leq e^{rx},
\qquad x\gt-1,\quad r\gt0.
$$

Equality holds only when $x=0$, so for $x\gt0$ the inequality is strict. Setting $r=1$, taking logarithms on both sides, and then dividing by $x\gt0$, we get:

$$
1+x\lt e^x
\iff\ln(1+x)\lt x
\iff\frac{\ln(1+x)}{x}\lt1.
$$

Here, taking logarithms preserves the inequality because $\ln$ is strictly increasing.

At the same time, since $x\gt0$, we have $1+x\gt1$ and therefore $\ln(1+x)\gt\ln1=0$. So:

$$
\frac{\ln(1+x)}{x}\gt0.
$$

This proves what we need:

$$
0\lt\frac{\ln(1+x)}{x}\lt1.
$$

In case you don't know your inequalities, the problem is easily solved using the standard approach. More specifically, we define a function $g(x)=x-\ln(1+x)$ for $x\geq0$.

We observe that $g(0)=0$.

At the same time, for $x\gt0$:

$$
g'(x)=1-\frac{1}{1+x}=\frac{x}{1+x}\gt0.
$$

So $g$ is strictly increasing on $[0,+\infty)$, meaning that, for $x\gt0$, we have $g(x)\gt g(0)=0$. In other words:

$$
x-\ln(1+x)\gt0
\iff\frac{\ln(1+x)}{x}\lt1.
$$

Together with the positivity shown above, this proves the result again.

If I were taking the exam, I would probably solve the problem the *intended way* to avoid any pedantry about which named theorems and results we can (re)use.

We can see this below: for $x>0$, the graph stays strictly between $y=0$ and $y=1$, approaching $0$ as $x$ grows.

<div id="analysis-c-explorer" class="exam-explorer">
<p class="exam-legend"><span class="purple">$f(x)=\ln(1+x)/x$, for $x>0$</span><span class="green">Bounds y = 0 and y = 1</span></p>
<canvas width="640" height="300" role="img" aria-label="The positive branch lies strictly between y equals zero and y equals one."></canvas>
<noscript>Enable JavaScript to view the graph.</noscript>
</div>

### Solution (d) [← Back to problem](#analysis-problem-d) {#analysis-solution-d}

The goal is to compute the integral $I_1$ and verify that $I_1=\frac32 \ln \frac43$.

So we need to compute:

$$
I_1 = \int_{1}^{2} \frac{f(x)}{x} dx = \int_{1}^{2} \frac{\ln(1+x)}{x^2} dx
$$

Before even considering integrating by parts, let's do the following substitution:

* $x=\frac{1}{t}$
* When $x=1$, $t=1$
* When $x=2$, $t=\frac12$
* At the same time, $dx = -\frac{1}{t^2} dt$

Substituting this back into our integral:

$$
I_1 = \int_{1}^{2} \frac{\ln(1+x)}{x^2} dx = \int_{1}^{\frac12} \frac{\ln (1 + \frac{1}{t})}{\frac{1}{t^2}} * \left(-\frac{1}{t^2}\right) dt \implies
$$

$$
\implies I_1 = \int_{\frac12}^{1} \ln (\frac{t+1}{t}) dt = \int_{\frac12}^{1} [\ln (t+1) - \ln t] dt \implies
$$

$$
\implies I_1 = \Bigl[ (t+1)\ln(t+1) - t\ln t \Bigr]_{1/2}^{1} = 
2\ln 2 - \left( \frac{3}{2}\ln\frac{3}{2} + \frac{1}{2}\ln 2 \right) = \\
= 3\ln 2 - \frac{3}{2}\ln 3 = \frac{3}{2}\ln\frac{4}{3}
$$

We can see the substitution below: the curve and integration limits change, but both shaded regions have the same area, $I_1=\frac32\ln\frac43$. Isn't that *amazing*?

*Both plots use the same scale.*

<div id="analysis-d-explorer" class="exam-explorer">
<p class="exam-legend"><span>$f(x)/x=\ln(1+x)/x^2$</span><span class="red">$x=1$ to $x=2$</span></p>
<canvas width="640" height="300" role="img" aria-label="The area under ln(1+x)/x squared from x = 1 to 2 equals I₁."></canvas>
<noscript>Enable JavaScript to view the graph.</noscript>
</div>

<div id="analysis-d-t-explorer" class="exam-explorer">
<p class="exam-legend"><span>$\ln(1+1/t)$, after $t=1/x$</span><span class="red">$t=1/2$ to $t=1$</span></p>
<canvas width="640" height="300" role="img" aria-label="The equivalent area under ln(1+1/t) from t = 1/2 to 1 also equals I₁."></canvas>
<noscript>Enable JavaScript to view the graph.</noscript>
</div>

### Solution (e) [← Back to problem](#analysis-problem-e) {#analysis-solution-e}

From **(c)**, we know that $0\lt f(x)\lt1$ for every $x\gt0$. This gives us both parts of the proof.

First, let's check that the sequence is decreasing. For $x\in[1,2]$:

$$
\frac{f(x)}{x^{n+1}}\leq\frac{f(x)}{x^n}.
$$

The inequality is strict whenever $x\gt1$, since $f(x)\gt0$. Integrating over $[1,2]$, we get:

$$
\begin{aligned}
I_{n+1}
&=\int_1^2\frac{f(x)}{x^{n+1}}\,\mathrm{d}x \\
&\lt\int_1^2\frac{f(x)}{x^n}\,\mathrm{d}x
=I_n.
\end{aligned}
$$

So the sequence is strictly decreasing.

Now, the sequence is decreasing and bounded below by $0$, so it converges. To show that its limit is actually $0$, we will bound $I_n$ from above by something that tends to $0$.

From **(c)**, for every $x\in[1,2]$:

$$
0\lt f(x)\lt1.
$$

Since $x^n\gt0$ on this interval, we can divide all three parts by $x^n$ without changing the direction of the inequalities:

$$
0\lt\frac{f(x)}{x^n}\lt\frac{1}{x^n}.
$$

Now we integrate all three parts over the same interval, $[1,2]$:

$$
\int_1^2 0\,\mathrm{d}x
\lt\int_1^2\frac{f(x)}{x^n}\,\mathrm{d}x
\lt\int_1^2\frac{1}{x^n}\,\mathrm{d}x.
$$

The integral on the left is $0$, and the one in the middle is exactly $I_n$. Therefore:

$$
0\lt I_n\lt\int_1^2\frac{1}{x^n}\,\mathrm{d}x.
$$

For $n\geq2$, the integral on the right is easy to compute:

$$
\begin{aligned}
\int_1^2 x^{-n}\,\mathrm{d}x
&=\left[\frac{x^{1-n}}{1-n}\right]_1^2 \\
&=\frac{1-2^{1-n}}{n-1}.
\end{aligned}
$$

Since $0\lt1-2^{1-n}\lt1$, we obtain:

$$
0\lt I_n\lt\frac{1}{n-1}.
$$

As $n\to+\infty$, the upper bound tends to $0$. By the squeeze theorem:

$$
\boxed{\lim_{n\to+\infty}I_n=0.}
$$

Increase $n$ to watch the shaded area $I_n$ under $\frac{f(x)}{x^n}$ shrink.

<div id="analysis-e-explorer" class="exam-explorer">
<div class="exam-controls"><label for="analysis-n">n: <output data-control="n-value" for="analysis-n" aria-live="off">1</output></label></div>
<div class="exam-slider-wrap"><input id="analysis-n" data-control="n" type="range" min="1" max="100" step="1" value="1" aria-controls="analysis-e-canvas"></div>
<canvas id="analysis-e-canvas" width="640" height="300" role="img" aria-label="The shaded integral area Iₙ decreases as n increases."></canvas>
<noscript>Enable JavaScript to view the graph.</noscript>
</div>

## Geometry {#geometry}

I am not the best when it comes to geometry, but I decided to give this problem a try... 

Well, the problem is quite straightforward, nothing spectacular: it tests basic vector manipulation, dot products, the usual suspects. The last point is more interesting: it has a "twist". 

### Problem {#pub2015iii}

Consider a parallelogram $ABCD$.

#### (a) [To solution →](#geometry-solution-a) {#geometry-problem-a}

Let $E$ and $F$ be points satisfying

$$
\vv{CE}=2\vv{DE},
\qquad
\vv{AF}=-2\vv{BF}.
$$

![Parallelogram ABCD, with E beyond D on CD, F on AB, dashed diagonals, and the vector EF shown in red.](/images/2026-10-28-the-admission-exams-for-the-math-university-of-bucharest/geometry-2015.svg)

Find $x,y\in\mathbb{R}$ such that

$$
\vv{EF}
=x\vv{AB}+y\vv{AC}.
$$

#### (b) [To solution →](#geometry-solution-b) {#geometry-problem-b}

Prove that

$$
AC^2+BD^2=2(AB^2+AD^2).
$$

#### (c) [To solution →](#geometry-solution-c) {#geometry-problem-c}

Suppose that there exists a point $M$ such that

$$
MA^2+MC^2=MB^2+MD^2.
$$

Prove that $ABCD$ is a rectangle.

### Solution (a) [← Back to problem](#geometry-problem-a) {#geometry-solution-a}

![Parallelogram ABCD, with E beyond D on CD, F on AB, dashed diagonals, and the vector EF shown in red.](/images/2026-10-28-the-admission-exams-for-the-math-university-of-bucharest/geometry-2015.svg)

For this type of problem, there is a repeatable "recipe": we need to choose a reference point, express the vectors using that point of reference, and turn all the geometric conditions into equations. Then we solve them just like we do in (basic) algebra.

We are asked to find \(x, y\) from $\vv{EF}=x \cdot \vv{AB} + y \cdot \vv{AC}$. 

Notice how both of our vectors start from $A$. This suggests choosing $A$ as our *reference point* and expressing everything in terms of $\vv{AB}$ and $\vv{AC}$. Okay, but how can we connect $\vv{EF}$ with $A$?

![Full parallelogram ABCD with dashed diagonals, E beyond D, and F on AB. The blue vectors EA and AF add to the red vector EF; EA is the opposite of AE.](/images/2026-10-28-the-admission-exams-for-the-math-university-of-bucharest/geometry-vector-addition.svg)

$$
\vv{EF}=\vv{EA}+\vv{AF}=\vv{AF}-\vv{AE}
$$

So we have a concrete plan now:

1. We need to (somehow) use the condition involving $E$ ($\vv{CE}=2\cdot\vv{DE}$) to find $\vv{AE}$.
2. We need to use the condition involving $F$ ($\vv{AF}=-2\cdot\vv{BF}$) to find $\vv{AF}$.
3. Subtract $\vv{AE}$ from $\vv{AF}$ and get the coefficients of $\vv{AB}$ and $\vv{AC}$.

Let's start with $E$. Expressing both vectors through $A$, we get:

$$
\vv{CE}=\vv{AE}-\vv{AC},
\qquad
\vv{DE}=\vv{AE}-\vv{AD}.
$$

Therefore, the condition $\vv{CE}=2\vv{DE}$ becomes:

$$
\vv{AE}-\vv{AC}=2(\vv{AE}-\vv{AD})
\implies \vv{AE}=2\vv{AD}-\vv{AC}.
$$

Because $ABCD$ is a parallelogram, $\vv{AC}=\vv{AB}+\vv{AD}$. Thus, $\vv{AD}=\vv{AC}-\vv{AB}$, and:

$$
\vv{AE}=2(\vv{AC}-\vv{AB})-\vv{AC}
=\vv{AC}-2\vv{AB}.
$$

Now let's find $\vv{AF}$. Using $\vv{BF}=\vv{AF}-\vv{AB}$, the second condition gives:

$$
\vv{AF}=-2(\vv{AF}-\vv{AB})
\implies 3\vv{AF}=2\vv{AB}
\implies \vv{AF}=\frac23\vv{AB}.
$$

We have everything we need. Subtracting:

$$
\begin{aligned}
\vv{EF}
&=\vv{AF}-\vv{AE}\\
&=\frac23\vv{AB}-(\vv{AC}-2\vv{AB})\\
&=\frac83\vv{AB}-\vv{AC}.
\end{aligned}
$$

Hence:

$$
\boxed{x=\frac83,\qquad y=-1.}
$$

Since $\vv{AB}$ and $\vv{AC}$ are not parallel, these coefficients are unique.

### Solution (b) [← Back to problem](#geometry-problem-b) {#geometry-solution-b}

This identity is called the *parallelogram law*. We can prove it by expressing the diagonals in terms of the two sides starting at $A$:

$$
\vv{AC}=\vv{AB}+\vv{AD},
\qquad
\vv{BD}=\vv{AD}-\vv{AB}.
$$

The tool we need is the dot product. For any vector $\mathbf u$, we have $\mathbf u\cdot\mathbf u=\|\mathbf u\|^2$. Expanding the squared lengths of the diagonals:

$$
\begin{aligned}
AC^2
&=(\vv{AB}+\vv{AD})\cdot(\vv{AB}+\vv{AD})\\
&=AB^2+2\vv{AB}\cdot\vv{AD}+AD^2,
\end{aligned}
$$

and:

$$
\begin{aligned}
BD^2
&=(\vv{AD}-\vv{AB})\cdot(\vv{AD}-\vv{AB})\\
&=AD^2-2\vv{AB}\cdot\vv{AD}+AB^2.
\end{aligned}
$$

Adding the two equalities, the dot product terms cancel:

$$
\boxed{AC^2+BD^2=2(AB^2+AD^2).}
$$

Keep the side lengths fixed at $AB=4$ and $AD=3$, and change the angle between them. One diagonal grows as the other shrinks, but the sum of their squares stays equal to $2(4^2+3^2)=50$.

<div id="geometry-law-explorer" class="exam-explorer">
<label for="geometry-angle">Angle BAD: <output id="geometry-angle-value" for="geometry-angle">60°</output></label>
<div class="exam-slider-wrap"><input id="geometry-angle" type="range" min="20" max="160" step="1" value="60" aria-describedby="geometry-law-status"></div>
<div class="exam-controls"><button type="button" id="geometry-rectangle">Set angle to 90°</button></div>
<svg id="geometry-law-diagram" viewBox="0 0 640 310" role="img" aria-labelledby="geometry-law-title geometry-law-desc" style="display:block;width:100%;height:auto">
<title id="geometry-law-title">The parallelogram law</title>
<desc id="geometry-law-desc">A parallelogram with sides 4 and 3. Change the angle to compare the squared diagonal lengths.</desc>
<polygon data-shape="body" fill="#226b9d" fill-opacity="0.06" stroke="#777" stroke-width="2"/>
<path data-shape="ab" fill="none" stroke="#226b9d" stroke-width="4"/>
<path data-shape="ad" fill="none" stroke="#27834b" stroke-width="4"/>
<path data-shape="ac" fill="none" stroke="#8055a2" stroke-width="3"/>
<path data-shape="bd" fill="none" stroke="#aa5b16" stroke-width="3" stroke-dasharray="8 5"/>
<g fill="currentColor" font-size="16" font-family="sans-serif" text-anchor="middle">
<text data-label="A">A</text><text data-label="B">B</text><text data-label="C">C</text><text data-label="D">D</text>
<text data-label="ab" fill="#226b9d">AB = 4</text><text data-label="ad" fill="#27834b">AD = 3</text>
</g>
</svg>
<p class="exam-legend"><span class="purple">Solid purple: AC</span><span style="color:#aa5b16">Dashed orange: BD</span></p>
<svg id="geometry-law-bars" viewBox="0 0 640 150" role="img" aria-label="Two bars compare the sum of the squared diagonals with twice the sum of the squared sides." style="display:block;width:100%;height:auto;font:14px sans-serif;fill:currentColor">
<text x="16" y="22">AC² + BD²</text>
<rect data-bar="ac" x="16" y="32" height="25" fill="#8055a2"/>
<rect data-bar="bd" y="32" height="25" fill="#aa5b16"/>
<text x="624" y="50" text-anchor="end">50</text>
<text x="16" y="87">2AB² + 2AD²</text>
<rect x="16" y="97" width="358.4" height="25" fill="#226b9d"/>
<rect x="374.4" y="97" width="201.6" height="25" fill="#27834b"/>
<text x="624" y="115" text-anchor="end">50</text>
<text x="195.2" y="115" text-anchor="middle" fill="white">32</text>
<text x="475.2" y="115" text-anchor="middle" fill="white">18</text>
</svg>
<p id="geometry-law-status" class="exam-status" role="status"></p>
<noscript>Enable JavaScript to change the angle and see the squared diagonal lengths.</noscript>
</div>

### Solution (c) [← Back to problem](#geometry-problem-c) {#geometry-solution-c}

The interesting part here is that we know almost nothing about $M$. But let's follow the same recipe and see what the condition tells us.

Keep $A$ as our reference point, and write:

$$
\mathbf u=\vv{AB},\qquad
\mathbf v=\vv{AD},\qquad
\mathbf m=\vv{AM}.
$$

Since $\vv{AC}=\mathbf u+\mathbf v$, the vectors from $M$ to the four vertices are:

$$
\vv{MA}=-\mathbf m,\qquad
\vv{MB}=\mathbf u-\mathbf m,\qquad
\vv{MC}=\mathbf u+\mathbf v-\mathbf m,\qquad
\vv{MD}=\mathbf v-\mathbf m.
$$

The given equality becomes:

$$
\|\mathbf m\|^2+\|\mathbf u+\mathbf v-\mathbf m\|^2
=\|\mathbf u-\mathbf m\|^2+\|\mathbf v-\mathbf m\|^2.
$$

Expanding both sides using dot products:

$$
\begin{aligned}
&2\|\mathbf m\|^2+\|\mathbf u\|^2+\|\mathbf v\|^2
+2\mathbf u\cdot\mathbf v
-2\mathbf u\cdot\mathbf m-2\mathbf v\cdot\mathbf m\\
&\qquad=2\|\mathbf m\|^2+\|\mathbf u\|^2+\|\mathbf v\|^2
-2\mathbf u\cdot\mathbf m-2\mathbf v\cdot\mathbf m.
\end{aligned}
$$

Everything cancels except:

$$
2\mathbf u\cdot\mathbf v=0
\implies \vv{AB}\cdot\vv{AD}=0.
$$

The sides $AB$ and $AD$ are therefore perpendicular. A parallelogram with a right angle is a rectangle, so:

$$
\boxed{ABCD\text{ is a rectangle.}}
$$

That's the twist: the condition does not actually depend on where $M$ is. Our calculation shows that, for any point $M$:

$$
MA^2+MC^2-MB^2-MD^2
=2\vv{AB}\cdot\vv{AD}.
$$

If the equality holds for even one point $M$, the sides must be perpendicular, and the equality then holds for every point $M$.


## Informatics {#informatics}

### Problem {#pub2015iv}

#### (a) [To solution →](#informatics-solution-a) {#informatics-problem-a}

Show that every nonzero natural number can be written uniquely as a sum of distinct powers of $2$. For example,

$$
77=2^0+2^2+2^3+2^6.
$$

#### (b) [To solution →](#informatics-solution-b) {#informatics-problem-b}

The natural numbers from $1$ to $255$ are encoded as follows:

- The powers of $2$ are represented by letters:
$a=1$, $b=2$, $c=4$, $d=8$, $e=16$, $f=32$, $g=64$, $h=128$.
- Each number in the given range is represented by a string of these letters, arranged in alphabetical order, with each letter appearing at most once, so that the sum of the values of the letters equals the number. For example, `acdg` represents $77$.

Write a program that reads two strings representing numbers according to this encoding and outputs the string representing the sum of those numbers. For example, if the input strings are `acdg` and `ac`, the output should be `beg`. The input strings are chosen so that the sum of the numbers they represent is less than or equal to $255$.

Can the program compute the output string without converting the strings into numbers? If so, provide such a solution.

### Solution (a) [← Back to problem](#informatics-problem-a) {#informatics-solution-a}

This is binary representation, written as a sum of powers rather than a string of zeroes and ones. But let's prove both parts: that such a representation exists, and that there cannot be two different ones.

For existence, start with a positive integer $n$ and repeatedly divide by $2$, keeping the remainders:

$$
n=2q_1+r_0,\qquad
q_1=2q_2+r_1,\qquad
q_2=2q_3+r_2,\qquad\ldots
$$

Each remainder is either $0$ or $1$. The nonzero quotients get smaller, so eventually we reach a quotient of $0$. Substituting backwards gives:

$$
\begin{aligned}
n
&=r_0+2q_1\\[4pt]
&=r_0+2(r_1+2q_2)\\[4pt]
&=r_0+2r_1+2^2q_2\\[4pt]
&=r_0+2r_1+2^2(r_2+2q_3)\\[4pt]
&=r_0+2r_1+2^2r_2+2^3q_3\\[4pt]
&\;\vdots\\[4pt]
&=r_0+2r_1+2^2r_2+\cdots+2^kr_k.
\end{aligned}
$$

$$
\boxed{n=\sum_{i=0}^{k}r_i2^i},
\qquad r_i\in\{0,1\}.
$$

Keep only the terms whose remainder is $1$, and we have a sum of distinct powers of $2$.

Now for uniqueness. Suppose two different sums represent the same number. Cancel the powers appearing in both, and let $2^k$ be the largest power left in either sum.

The sum on the other side contains only smaller powers. Even if it contains *all* of them, their sum is:

$$
\sum_{j=0}^{k-1}2^j=2^k-1<2^k.
$$

For $k=0$, that sum is empty and equals $0$. Either way, the two sides cannot be equal. This contradiction proves uniqueness.

### Solution (b) [← Back to problem](#informatics-problem-b) {#informatics-solution-b}

The straightforward approach would be to decode both strings, add the numbers, and encode the result. But the problem asks whether we can skip those conversions. We can: just add the letters with carries, exactly as we would add binary digits.

The important detail is the direction. Since `a` represents the smallest power, we work from `a` towards `h`, which means reading these strings from left to right.

Two copies of a letter carry into one copy of the next letter:

$$
2^k+2^k=2^{k+1}.
$$

So `aa` becomes `b`, `bb` becomes `c`, and so on. At each letter, count its occurrences in the two inputs and add the incoming carry. The total can only be $0$, $1$, $2$ or $3$:

| Total | Write the current letter? | Carry to the next letter |
| --- | --- | --- |
| $0$ | No | $0$ |
| $1$ | Yes | $0$ |
| $2$ | No | $1$ |
| $3$ | Yes | $1$ |

In other words, write the letter if the total is odd, then divide the total by $2$ using integer division to get the next carry.

For the example `acdg` + `ac`, the two `a`s become a `b`, the two `c`s become a `d`, and that new `d` combines with the existing `d` to become an `e`. The `g` stays where it is. The result is `beg`.

Here is a C++ implementation:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string first, second;
    std::cin >> first >> second;

    std::size_t i = 0, j = 0;
    int carry = 0;
    std::string result;

    for (char letter = 'a'; letter <= 'h'; ++letter) {
        int total = carry;

        if (i < first.size() && first[i] == letter) {
            ++total;
            ++i;
        }
        if (j < second.size() && second[j] == letter) {
            ++total;
            ++j;
        }

        if (total % 2 == 1) {
            result += letter;
        }
        carry = total / 2;
    }

    std::cout << result << '\n';
    return 0;
}
```

The two indices track the next unread letter in each string. Since each input is already sorted and contains no repeated letters, we only need to check whether its next letter matches the one we are processing.

Every carry preserves the represented sum. Once a letter has been processed, later steps cannot change it, because they involve only higher powers of $2$. The result is sorted and contains each letter at most once, so part **(a)** guarantees that it is the unique encoding of the sum.

The condition that the sum is at most $255$ guarantees that no carry remains after `h`: such a carry would represent $256$.

We never decode either input into an integer. The only arithmetic is on the small totals $0$ through $3$. There are eight iterations, and the extra storage apart from the output is constant.
