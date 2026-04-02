+++
date = '2026-03-29'
draft = true
title = 'Preparing for the Romanian Math Olympiad - 9th grade'
categories = ['math']
tags = ['olympiad']
usekatex = true
+++

<div class="mp-filter-box">
<p>Select one or more tags to filter the problems on this page:</p>
<p class="mp-filter-tags"></p>
</div>

<div class="mp" id="poj1" data-tags="algebra inequalities">
<p><a class="mpl" href="#poj1">Problem 1</a></p>
<p class="mp-tags">
    <span class="mp-tag">#algebra</span>
    <span class="mp-tag">#inequalities</span>
</p>
<p>Consider the equation: $x^2 + (a+b+c)x + \lambda(ab+bc+ca) = 0$, where $a, b, c$ are strictly positive real numbers and $\lambda$ is a real parameter. Show that:</p>
<p>
    a) if $\lambda \leq \frac{3}{4}$, the equation has real roots;
</p>
<p>
    b) if $a, b, c$ are the side lengths of a triangle and $\lambda \geq 1$, then the equation has no real roots.
</p>
<details>
    <summary>Solution</summary>
    <p>
        <strong>a).</strong>
    </p>
    <p>To solve this, we need to analyze the discriminant ($\Delta$) of the quadratic equation.</p>
    <p>We know that for a quadratic in the form $Ax^2+Bx+C = 0$, the discriminant $\Delta = B^2 - 4AC$. The roots are real numbers if and only if $\Delta \geq 0$.</p>
    <p>For our equation:</p>
    <p>
        \[
            \Delta = (a+b+c)^2 - 4 \lambda (ab+bc+ca) \implies
        \]
        \[
            \Delta = a^2+b^2+c^2 + 2(ab+bc+ca) - 4 \lambda (ab+bc+ca) \implies
        \]
        \[
            \Delta = a^2+b^2+c^2 + (2-4\lambda)(ab+bc+ca)
        \]
    </p>
    <p>Since $a, b, c$ are strictly positive numbers, it follows that $ab+bc+ca > 0$. This also means that the expression $(2-4\lambda)(ab+bc+ca)$ is minimized when $\lambda$ reaches its maximum value, which in this case is $\lambda=\frac{3}{4}$.</p>
    <p>So, the minimum value $\Delta$ can take is:</p>
    <p> 
        \[
            \Delta = a^2+b^2+c^2 + (2-4\cdot\frac{3}{4})(ab+bc+ca) \iff
        \]
        \[
            \iff \Delta = a^2+b^2+c^2 - ab - bc - ca \iff
        \]
        \[
            \iff 2 \cdot \Delta = 2 \left(a^2 + b^2 + c^2 \right) - 2ab - 2bc - 2ca \iff
        \]
        \[
            \iff 2\cdot\Delta = (a^2 - 2ab + b^2) + (b^2 - 2bc + c^2) + (c^2 - 2ac + a^2) \iff
        \]
        \[ 
            \Delta = \frac{1}{2} \left[ (a-b)^2 + (b-c)^2 + (c-a) ^2 \right]
        \]
    </p>
    <p>Because $\Delta$ can be written as the sum of three squares, it follows that $\Delta \geq 0$. Since the discriminant cannot be negative, the roots of the equation are real numbers.</p>
    <p>
        <strong>b).</strong>
    </p>
    <p>If $\lambda \geq 1 \implies 2-4\lambda \leq -2$. Therefore:</p>
    <p>
        \[
            \Delta \leq a^2 + b^2 + c^2 - 2(ab+bc+ca) \iff 
        \]
        \[
            \Delta \leq a(a-b-c) + b(b-c-a) + c(c-a-b) \quad (1)
        \]
    </p>
    <p>Additionally, we know that if $a, b, c$ are the side lengths of a triangle, the triangle inequalities must hold:</p>
    <p>
        \[
            \begin{aligned}
            a < b + c \\
            b < c + a \\
            c < a + b
            \end{aligned} \implies
            \begin{aligned}
            a - b - c < 0 \\
            b - c - a < 0 \\
            c - a - b < 0
            \end{aligned} \quad (2)
        \]
    </p>
    <p>From $(1)$ and $(2)$, since $a, b, c > 0$ and each term in parentheses is negative, we have:</p>
    <p>
        \[
            \Delta \leq a\underbrace{(a-b-c)}_{< 0} + b\underbrace{(b-c-a)}_{< 0} + c\underbrace{(c-a-b)}_{< 0} \implies
        \]
        \[
            \Delta < 0
        \]
    </p>
    <p>Because $\Delta < 0$, the roots of the quadratic equation are not real numbers.</p>
</details>
<details>
    <summary>Source</summary>
    <p>Olimpiada Județeană de Matematică, 2001, 9th Grade</p>
</details>
</div>
</p>

<div class="mp" id="poj2" data-tags="algebra geometry">
<p><a class="mpl" href="#poj2">Problem 2</a></p>
<p class="mp-tags">
    <span class="mp-tag">#algebra</span>
    <span class="mp-tag">#geometry</span>
</p>
<p>In the coordinate system \(xOy\), consider the lines with equations:</p>
<p class="mpc">
\[
    \begin{aligned}
    &d_1: 2x - y - 2 = 0 \\
    &d_2: x + y - 4 = 0  \\
    &d_3: y = 2 \\
    &d_4: x - 4y + 3 = 0
    \end{aligned}
\]
</p>
<p>Find the vertices of the triangles that have \(d_1, d_2, d_3\) as medians and where \(d_4\) is one of the altitudes.</p>
<details>
    <summary>Solution</summary>
    <p>Let the vertices be:</p>
    <p>
        \[
            \begin{aligned}
            & A \in d_1 \\ 
            & B \in d_2 \\ 
            & C \in d_3
            \end{aligned}
        \]
    </p> 
    <p>Based on the line equations, we can express their coordinates using parameters $a, b, c \in \mathbb{R}$:</p>
    <p>
        \[
            \begin{cases}
                &d_1: 2x - y - 2 = 0 \\
                &d_2: x + y - 4 = 0  \\
                &d_3: y = 2 \\
                &d_4: x - 4y + 3 = 0
            \end{cases} \implies
            \begin{cases}
                &d_1: y = 2x-2 \\
                &d_2: y = 4-x \\
                &d_3: y = 2 \\
            \end{cases} \implies
        \]
        \[
            \implies
            \begin{cases}
                &A(a, 2a-2) \in d_1 \\
                &B(b, 4-b)  \in d_2 \\
                &C(c, 2) \in d_3
            \end{cases}
        \]
    </p>
    <p>In any triangle (including the one that we are looking for), the medians \(d_1, d_2, d_3\) are concurrent at the centroid $G$.</p> 
    <p>We find \(G\) by intersecting any two (convenient) medians, for example, \(d_2\) and \(d_3\):</p>
    <p>
        \[
            \begin{cases}
                d_2 : y = 4 - x \\
                d_3 : y = 2
            \end{cases} \implies 4 - x = 2 \implies x = 2
        \]
    </p>
    <p>\(\implies\) the coordinates of \(G\) are \(G(2, 2)\).</p>
    <p>The coordinates of the centroid \(G\) are the averages (AM) of the vertices' coordinates:</p>
    <p>
        \[
            \begin{cases}
                \frac{x_A + x_B + x_C}{3} = \frac{a+b+c}{3} = 2 \\
                \frac{y_A + y_B + y_C}{3} = \frac{(2a-2) + (4-b) + 2}{3} = 2
            \end{cases} \implies 
            \begin{cases}
                a + b + c = 6 \\
                2a - b + 4 = 6
            \end{cases}
        \]
    </p>
    <p>From the second equation, we find \(b = 2a - 2\). Substituting this into the first equation:</p>
    <p>
        \[
            a + (2a - 2) + c = 6 \implies 3a + c = 8 \implies c = 8 - 3a
        \]
    </p>
    <p>Now the vertices are all expressed in terms of $a$:</p>
    <p>
        \[
            \begin{cases}
            & A(a, 2a-2) \in d_1 \\
            & B(2a-2, 6-2a) \in d_2 \\
            & C(8-3a, 2) \in d_3
            \end{cases}
        \]
    </p>
    <p>The last, and final step is to use the condition imposed by the existence of the altitude.</p>
    <p>The line \(d_4: x - 4y + 3 = 0\) has a slope of \(m_4 = \frac{1}{4}\). For \(d_4\) to be an altitude of the triangle, it must pass through one vertex and be perpendicular to the opposite side, meaning the opposite side must have a slope of \(m_{\perp} = -4\).</p>
    <p>We test all three possibilities:</p>
    <p>
    If $A(a, 2a-2)$ lies on $d_4$, then:
    \[ 
        a - 4(2a-2) + 3 = 0 \implies -7a + 11 = 0 \implies a = \frac{11}{7} 
    \]
    However, the slope of the opposite side $BC$ is:
    \[ 
        m_{BC} = \frac{2 - (6-2a)}{(8-3a) - (2a-2)} = \frac{2a-4}{10-5a} = -\frac{2}{5} 
    \]
    </p>
    <p>This case is impossible.</p>
    <p>
    If $B(2a-2, 6-2a)$ lies on $d_4$, then:
    \[ 
        (2a-2) - 4(6-2a) + 3 = 0 \implies 10a - 23 = 0 \implies a = \frac{23}{10} 
    \]
    The slope of the opposite side $AC$ is:
    \[ 
        m_{AC} = \frac{2 - (2a-2)}{(8-3a) - a} = \frac{4-2a}{8-4a} = \frac{1}{2} 
    \]
    </p>
    <p>This case is also impossible.</p>
    <p>
    If $C(8-3a, 2)$ lies on $d_4$, then:
    \[ (8-3a) - 4(2) + 3 = 0 \implies -3a + 3 = 0 \implies a = 1 \]
    The slope of the opposite side $AB$ is:
    </p>
    <p class="mpc">
    \[ 
        m_{AB} = \frac{(6-2a) - (2a-2)}{(2a-2) - a} = \frac{8-4a}{a-2} = -4 
    \]
    </p>
    <p>So the perpendicularity condition is satisfied for any $a \neq 2$. However, for $d_4$ to be an altitude, it must not only be perpendicular to $AB$, but also pass through the vertex $C$.</p>
    <p>This gives the condition:</p>
    <p class="mpc">
        \[
            C \in d_4 \implies (8-3a) - 4\cdot 2 + 3 = 0 \implies
        \]
        \[
            \implies -3a + 3 = 0 \implies a = 1
        \]
    </p>
    <p>Thus, although the slope condition holds for a family of triangles, the condition that $d_4$ passes through $C$ uniquely determines $a = 1$.</p>
    <p>Substituting $a = 1$, we get:</p>
    <p class="mpc">
    \[
        m_{AB} = \frac{8-4(1)}{1-2} = -4
    \]
    </p>
    <p>
    This is the only valid configuration.
    </p>
    <p>Substituting \(a=1\) into our parametric coordinates, we obtain the vertices:</p>
    <p>
        \[
            \begin{aligned} 
            & A(1, 0) \\
            & B(0, 4) \\
            & C(5, 2)
            \end{aligned}
        \]
    </p>
    <p>The triangle is found, yey:</p>
    <p>
    <div style="text-align: center; margin: 20px 0;">
        <img src="/images/2026-03-29-preparing-for-the-romanian-math-olympiad-9th-grade/problem02.svg" alt="Triangle Problem Diagram" style="max-width: 600px; width: 100%; height: auto; border: 1px solid #eee; border-radius: 8px;">
    </div>
    </p>
</details>
<details>
    <summary>Source</summary>
    <p>Olimpiada Județeană de Matematică, 2001, 9th Grade, Lucian Dragomir</p>
</details>
</div>
</p>

<p>
<div class="mp" id="poj4" data-tags="algebra functional-equations number-theory">
<p><a class="mpl" href="#poj4">Problem 4</a></p>
<p class="mp-tags">
    <span class="mp-tag">#algebra</span>
    <span class="mp-tag">#functional-equations</span>
    <span class="mp-tag">#number-theory</span>
</p>
<p>Consider a function \(f: \mathbb{Z} \to \mathbb{Z}\) with the property:</p>
<p class="mpc">
    \[ f(m^2 + f(n)) = (f(m))^2 + n \]
</p>
<p>for any \(m, n \in \mathbb{Z}\). Show that:</p>

<ol type="a">
    <li>\(f(0) = 0\);</li>
    <li>\(f(1) = 1\);</li>
    <li>\(f(n) = n\), for any \(n \in \mathbb{Z}\).</li>
</ol>

<details>
    <summary>Solution</summary>
    <p>Let us denote the given relation by:</p>
    <p class="mpc">
        \[ P(m,n): \quad f(m^2 + f(n)) = (f(m))^2 + n. \]
    </p>
    <p>We don't know much about the function at this stage, but it's worth checking if it's injective, surjective, or both (bijective).</p>
    <p>For problems like this it's worth setting "special values" to \(m\) and \(n\) and see what happens.</p>
    <p>For example, by setting \(m=0\) in \(P(m,n)\), we get</p>
    <p class="mpc">
        \[ \boxed{f(f(n)) = (f(0))^2 + n} \quad \dots (1) \]
    </p>
    <p>Let's test now to see if the function is injective by supposing \(f(x)=f(y)\). Applying \(f\) to both sides and using (1), we obtain:</p>
    <p class="mpc">
        \[ 
            (f(0))^2 + x = (f(0))^2 + y \iff
        \]
        \[
            \iff x = y
        \]
    </p>
    <p>Therefore, \(f\) is injective.</p>
    <p>As \(n\) runs through all integers, the quantity \((f(0))^2+n\) also runs through all integers, so \(f\) is surjective. Thus, \(f\) is bijective.</p>
    <p><strong>a).</strong></p>
    <p>Let \(f(0)=l\). Since \(f\) is surjective, there exists some integer \(k\) such that \(f(k)=0\)</p>
    <p>Now put \(n=k\) in (1). Then</p>
    <p class="mpc">
        \[ 
            f(f(k)) = (f(0))^2 + k \implies 
        \]
        \[ 
            \implies f(0) = l^2 + k \implies
        \]
        \[ 
            \implies \boxed{l = l^2 + k} \quad \dots (2) 
        \]
    </p>
    <p>Next, substitute \(m=k\) and \(n=0\) into \(P(m,n)\):</p>
    <p class="mpc">
        \[ 
            f(k^2 + f(0)) = (f(k))^2 + 0 \implies
        \]
        \[ 
            \implies f(k^2+\ell)=0=f(k)
        \]
    </p>
    <p>Since \(f\) is injective, it follows that:</p>
    <p class="mpc">
        \[ 
            k^2+l=k \implies
        \]
        \[ 
            \implies \boxed{l = k-k^2} \quad \dots (3) 
        \]
    </p>
    <p>Substituting this into (2), we get:</p>
    <p class="mpc">
        \[ 
            k-k^2 = (k-k^2)^2 + k \iff
        \]
        \[ 
            \iff -k^2 = k^2(1-k)^2
        \]
    </p>
    <p>Hence \(k=0\), there is no other possibility as \(k^2(1-k)^2 \geq 0\) and \(-k^2 \leq 0\). Then from \(l=k-k^2\), we obtain \(l=0\) \(\implies f(0)=0\).</p>
    <p><strong>b).</strong></p>
    <p>Now that \(f(0)=0\), the relation (1) simplifies nicely to:</p>
    <p class="mpc">
        \[ \boxed{f(f(n))=n} \quad \forall n\in\mathbb{Z} \quad \dots (4) \]
    </p>
    <p>Also, setting \(n=0\) in \(P(m,n)\), we get</p>
    <p class="mpc">
        \[ f(m^2+f(0))=(f(m))^2. \]
    </p>
    <p>Since \(f(0)=0\), this simplifies to</p>
    <p class="mpc">
        \[ \boxed{f(m^2)=(f(m))^2} \quad \dots (5) \]
    </p>
    <p>Taking \(m=1\) in (5), we obtain</p>
    <p class="mpc">
        \[ f(1)=(f(1))^2. \]
    </p>
    <p>The only integers satisfying \(x=x^2\) are \(x=0\) and \(x=1\). But \(f(0)=0\) and \(f\) is injective, so \(f(1)\neq 0\). Hence \( f(1)=1 \)</p>
    <p><strong>c). </strong></p>
    <p>We use (5), so the original relation becomes:</p>
    <p class="mpc">
        \[ f(m^2+f(n))=f(m^2)+n. \]
    </p>
    <p>Now we replace \(n\) by \(f(y)\). By (4), we have \(f(f(y))=y\), so the above becomes</p>
    <p class="mpc">
        \[ \boxed{f(m^2+y)=f(m^2)+f(y)} \quad \dots (6) \]
    </p>
    <p>Take \(m=1\). Since \(f(1)=1\), relation (6) yields</p>
    <p class="mpc">
        \[ \boxed{f(y+1)=f(1)+f(y)=1+f(y)} \quad \dots (7) \]
    </p>
    <p>Thus, for every integer \(y\),</p>
    <p class="mpc">
        \[ f(y+1)=f(y)+1. \]
    </p>
    <p>Starting from \(f(0)=0\), repeated use of (7) gives \( f(1)=1, f(2)=2, f(3)=3,\ \dots \) and so on.</p>
    <p>We can conclude that for all positive numbers \(n\) \(f(n)=n\).</p>
    <p>For negative integers, rewrite (7) as:</p>
    <p class="mpc">
        \[ f(y)=f(y+1)-1. \]
    </p>
    <p>Applying this backwards from \(f(0)=0\), we obtain</p>
    <p class="mpc">
        \[ f(-1)=f(0)-1=-1,\quad f(-2)=f(-1)-1=-2,\ \dots \]
    </p>
    <p>We conclude that \(f(n)=n\) for all \( n \lt 0 \). </p>
    <p>Therefore, for every integer \(n\), \(\boxed{f(n)=n}\), it's a matter of induction.</p>
</details>
<details>
    <summary>Source</summary>
    <p>Olimpiada Județeană de Matematică, 2001, 9th Grade, Lucian Dragomir</p>
</details>
</div>
</p>

<div class="mp" id="poj1" data-tags="algebra floor-functions">
<p><a class="mpl" href="#poj5">Problem 5</a></p>
<p class="mp-tags">
    <span class="mp-tag">#algebra</span>
    <span class="mp-tag">#floor-functions</span>
</p>
<p>Prove that for any real number $x$, the following relation holds:</p>
<p class="mpc">
\[
\left\lfloor \frac{x+3}{6} \right\rfloor
-
\left\lfloor \frac{x+4}{6} \right\rfloor
+
\left\lfloor \frac{x+5}{6} \right\rfloor
=
\left\lfloor \frac{x+1}{2} \right\rfloor
-
\left\lfloor \frac{x+1}{3} \right\rfloor
\]
</p>
<p>where $\lfloor a \rfloor$ denotes the integer part (floor) of the real number $a$.</p>
<details>
    <summary>Solution</summary>
    <p>The denominators are hinting at something, afterall, \(2 \cdot 3 = 6\). With this in mind, let us bring all the fractions to a common denominator:</p>
    <p class="mpc">
        \[
            \left\lfloor \frac{x+3}{6} \right\rfloor
            -
            \left\lfloor \frac{x+4}{6} \right\rfloor
            +
            \left\lfloor \frac{x+5}{6} \right\rfloor
            =
            \left\lfloor \frac{x+1}{2} \right\rfloor
            -
            \left\lfloor \frac{x+1}{3} \right\rfloor \iff
        \]
        \[
            \left\lfloor \frac{x+1+2}{6} \right\rfloor
            -
            \left\lfloor \frac{x+1+3}{6} \right\rfloor
            +
            \left\lfloor \frac{x+1+4}{6} \right\rfloor
            =
            \left\lfloor 3 \cdot \frac{x+1}{6} \right\rfloor
            -
            \left\lfloor 2 \cdot \frac{x+1}{6} \right\rfloor
        \]
    <p>
    <p>Now that we have written the expression in this form, we can see that \(\frac{x+1}{6}\) appears everywhere. A substitution is the natural choice: \(\frac{x+1}{6} \rightarrow y\):</p>
    <p class="mpc">
        \[  \boxed{
            \left\lfloor y + \frac{1}{3} \right\rfloor
            -
            \left\lfloor y + \frac{1}{2} \right\rfloor
            +
            \left\lfloor y + \frac{2}{3} \right\rfloor
            =
            \left\lfloor 3y \right\rfloor
            -
            \left\lfloor 2y  \right\rfloor} \quad \dots (1)
        \]
    </p>
 <p>At this point, <a href="https://en.wikipedia.org/wiki/Hermite%27s_identity" target="_blank">Hermite's identity</a> becomes useful. We know that for any real number \(t\) and any positive integer \(n\):</p>
    <p class="mpc">
        \[
            \sum_{k=0}^{n-1} \left\lfloor t + \frac{k}{n} \right\rfloor = \left\lfloor nt \right\rfloor
        \]
    </p>
    <p>We now apply this relation twice.</p>
    <p>For \(n=3\) and \(t=y\), we get:</p>
    <p class="mpc">
        \[  \boxed{
            \left\lfloor y \right\rfloor
            +
            \left\lfloor y + \frac{1}{3} \right\rfloor
            +
            \left\lfloor y + \frac{2}{3} \right\rfloor
            =
            \left\lfloor 3y \right\rfloor} \quad \dots (2)
        \]
    </p>
    <p>For \(n=2\) and \(t=y\), we get:</p>
    <p class="mpc">
        \[  \boxed{
            \left\lfloor y \right\rfloor
            +
            \left\lfloor y + \frac{1}{2} \right\rfloor
            =
            \left\lfloor 2y \right\rfloor} \quad \dots (3)
        \]
    </p>
    <p>Subtracting (3) from (2), we obtain (1):</p>
    <p class="mpc">
        \[
            \left\lfloor y + \frac{1}{3} \right\rfloor
            -
            \left\lfloor y + \frac{1}{2} \right\rfloor
            +
            \left\lfloor y + \frac{2}{3} \right\rfloor
            =
            \left\lfloor 3y \right\rfloor
            -
            \left\lfloor 2y \right\rfloor
        \]
    </p>
    <p>The original equality holds for every real number \(x\).</p>
</details>
<details>
    <summary>Source</summary>
    <p>Olimpiada Județeană de Matematică, 2002, 9th Grade, Lucian Dragomir, C. Mortici</p>
</details>
</div>

<p>
<div class="mp" id="poj1" data-tags="geometry cyclic-quadrilateral orthocenter">
<p><a class="mpl" href="#poj6">Problem 6</a></p>
<p class="mp-tags">
    <span class="mp-tag">#geometry</span>
    <span class="mp-tag">#cyclic-quadrilateral</span>
    <span class="mp-tag">#orthocenter</span>
</p>
<p>Let \(ABCD\) be a cyclic quadrilateral, and let \(M\) be a point on its circumcircle, distinct from the vertices of the quadrilateral. Let \(H_1, H_2, H_3, H_4\) be the orthocenters of the triangles \(MAB\), \(MBC\), \(MCD\), and \(MDA\), respectively. Also, let \(E\) and \(F\) be the midpoints of the segments \([AB]\) and \([CD]\), respectively. Prove that:</p>
<p>
    a) \(H_1H_2H_3H_4\) is a parallelogram;
</p>
<p>
    b) \(H_1H_3 = 2 \cdot EF\).
</p>
<details>
    <summary>Source</summary>
    <p>N. Mușuroia, Baia Mare</p>
</details>
</div>
</p>

<style>
.mp-filter-box {
    margin: 0 0 1rem 0;
}

.mp-filter-tags,
.mp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.35rem 0 0.75rem 0;
}

.mp-filter-tag,
.mp-tag {
    display: inline-block;
    font: inherit;
    font-size: 0.85rem;
    line-height: 1.2;
    padding: 0.2rem 0.45rem;
    border: 1px solid #000;
    background: transparent;
}

.mp-filter-tag {
    cursor: pointer;
}

.mp-filter-tag.active {
    background: #000;
    color: #fff;
}

.mp.is-hidden {
    display: none;
}
</style>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const filterHost = document.querySelector(".mp-filter-tags");
  const problems = Array.from(document.querySelectorAll(".mp"));
  if (!filterHost || !problems.length) return;

  const selected = new Set();
  const tagSet = new Set();

  function tagsForProblem(problem) {
    const chipTags = Array.from(problem.querySelectorAll(".mp-tag"))
      .map((tag) => tag.textContent.trim().replace(/^#/, ""))
      .filter(Boolean);
    if (chipTags.length) return chipTags;

    return (problem.dataset.tags || "").split(/\s+/).filter(Boolean);
  }

  problems.forEach((problem) => {
    tagsForProblem(problem).forEach((tag) => tagSet.add(tag));
  });

  filterHost.innerHTML = '<button type="button" class="mp-filter-tag active" data-filter="all">all</button>';
  Array.from(tagSet).sort((a, b) => a.localeCompare(b)).forEach((tag) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mp-filter-tag";
    button.dataset.filter = tag;
    button.textContent = `#${tag}`;
    filterHost.appendChild(button);
  });

  const filters = Array.from(filterHost.querySelectorAll(".mp-filter-tag"));

  function syncButtons() {
    filters.forEach((button) => {
      const value = button.dataset.filter || "";
      const isAll = value === "all";
      const active = isAll ? selected.size === 0 : selected.has(value);
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function syncProblems() {
    problems.forEach((problem) => {
      const tags = tagsForProblem(problem);
      const visible = selected.size === 0 || tags.some((tag) => selected.has(tag));
      problem.classList.toggle("is-hidden", !visible);
    });
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.filter || "";
      if (value === "all") {
        selected.clear();
      } else if (selected.has(value)) {
        selected.delete(value);
      } else {
        selected.add(value);
      }

      syncButtons();
      syncProblems();
    });
  });

  syncButtons();
  syncProblems();
});
</script>
