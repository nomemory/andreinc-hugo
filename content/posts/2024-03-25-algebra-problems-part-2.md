+++
date = '2024-03-25'
draft = false
title = '10 algebra problems selected from the Romanian Olympiad (Part 2)'
categories = ['math']
tags = ['inequalities', 'olympiad', "algebra"]
usekatex = true
+++

# Intro

This article is a continuation of [my previous selection](/2024/02/23/20-algebra-problems-part-1) of non-trivial algebra problems from the Romanian Math Olympiad for high-school students. However, this time I have included a few harder problems from the National Phase that would definitely provide a challenge to any reader.

Personally, I found problems **5.** and **9.** to be the most difficult.

# The Problems

<p>
<div class="mp" id="palg01">
    <p><a class="mpl" href="#palg01">Problem ALG01</a></p> 
    <p>Find all integers \(m, n \in \mathbb{Z}\) such that:</p>
    <p class="mpc">
        \[
            9m^2 + 3n = n^2 + 8
        \]
    </p>
    <details>
        <summary>Hint</summary>
        <p>Try to manipulate the equation into a form where one side is a product of two integer expressions and the other is a prime constant.</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>When solving Diophantine equations (integer equations), constants like \(0\), \(1\), and small prime numbers are our best allies. If we can manipulate an expression into the form:</p>
        <p class="mpc">
            \[
               (\text{expression}_1) \cdot (\text{expression}_2) = \text{constant (ideally prime)}
            \]
        </p>
        <p>we place a powerful constraint on the possible values of \(m\) and \(n\). It's like catching the solutions in a fishnet; because the constant has finite factors, the variables can only take specific values.</p>
        <p>First, let's rearrange the expression:</p>
        <p class="mpc">
            \[
                9m^2 + 3n = n^2 + 8 \iff 9m^2 - n^2 + 3n = 8 
            \]
        </p>
        <p>To eliminate the linear \(n\) term and complete the square, we multiply by \(4\):</p>
        <p class="mpc">
            \[
                36m^2 - 4n^2 + 12n = 32 \iff 36m^2 - (4n^2 - 12n) = 32 
            \]
            \[
                \iff 36m^2 - (4n^2 - 12n + 9) = 32 - 9 \iff (6m)^2 - (2n - 3)^2 = 23
            \]
        </p>
        <p>Luckily, \(23\) is a prime number! Using the difference of squares identity \(a^2 - b^2 = (a-b)(a+b)\), we get:</p>
        <p class="mpc">
            \[
                (6m - (2n - 3))(6m + (2n - 3)) = 23 \iff (6m - 2n + 3)(6m + 2n - 3) = 23
            \]
        </p>
        <p>Since \(23\) is prime, its only integer factor pairs are \( (1, 23), (23, 1), (-1, -23), \) and \( (-23, -1) \). This leaves us with four systems of equations to check:</p>
        <p class="mpc">
            \[
            \begin{aligned}
                \begin{cases} 6m-2n+3=23 \\ 6m+2n-3=1 \end{cases} 
                \quad &\text{or} \quad
                \begin{cases} 6m-2n+3=1 \\ 6m+2n-3=23 \end{cases} \\ \\
                \text{or} \quad
                \begin{cases} 6m-2n+3=-1 \\ 6m+2n-3=-23 \end{cases}
                \quad &\text{or} \quad
                \begin{cases} 6m-2n+3=-23 \\ 6m+2n-3=-1 \end{cases}
            \end{aligned}
            \]
        </p>
        <p>Solving these systems by adding the equations together yields \(12m = \pm 24\), so \(m = \pm 2\). Substituting these back gives the full set of solutions for \((m, n)\):</p>
        <p class="mpc">
            \[ \mathbf{(2, 7), (-2, 7), (2, -4), (-2, -4)} \]
        </p>
    </details>
</div>
</p>

<p>
<div class="mp" id="palg02">
    <p><a class="mpl" href="#palg02">Problem ALG02</a></p> 
    <p>Find all \(x, y, z \in \mathbb{R_{+}^{*}}\) such that:</p>
    <p class="mpc">
        \[
        \begin{cases}
            x^3y + 3 \le 4z \\
            y^3z + 3 \le 4x \\
            z^3x + 3 \le 4y
        \end{cases}
        \]
    </p>
    <details>
        <summary>Hint</summary>
        <p>Since the variables are strictly positive, try multiplying the inequalities together and look for a way to relate \(x^4\) to \(4x-3\) using the AM-GM inequality.</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>Intuitively, we can observe the obvious solution \(x=y=z=1\). But how do we prove it is the <em>only</em> one?</p>
        <p>First, let's rewrite the system as:</p>
        <p class="mpc">
            \[
            \begin{cases}
                x^3y \le 4z - 3 \\
                y^3z \le 4x - 3 \\
                z^3x \le 4y - 3
            \end{cases}
            \]
        </p>
        <p>Because \(x, y, z \in \mathbb{R_{+}^{*}}\) we can multiply these three inequalities together to obtain:</p>
        <p class="mpc">
            \[ (x^3y)(y^3z)(z^3x) \le (4x-3)(4y-3)(4z-3) \]
            \[ x^4y^4z^4 \le (4x-3)(4y-3)(4z-3) \quad \text{--- (Eq. 1)} \]
        </p>
        <p>According to the <strong>AM-GM inequality</strong>, we know that for any positive \(x\):</p>
        <p class="mpc">
            \[ \frac{x^4 + 1 + 1 + 1}{4} \ge \sqrt[4]{x^4 \cdot 1 \cdot 1 \cdot 1} \]
            \[ \frac{x^4 + 3}{4} \ge x \iff x^4 + 3 \ge 4x \]
            \[ x^4 \ge 4x - 3 \]
        </p>
        <p>The equality holds if and only if \(x = 1\). By applying the same logic to \(y\) and \(z\), we obtain a new system of inequalities:</p>
        <p class="mpc">
            \[
            \begin{cases}
                x^4 \ge 4x - 3 \\
                y^4 \ge 4y - 3 \\
                z^4 \ge 4z - 3
            \end{cases}
            \]
        </p>
        <p>Multiplying these together, we get:</p>
        <p class="mpc">
            \[ x^4y^4z^4 \ge (4x-3)(4y-3)(4z-3) \quad \text{--- (Eq. 2)} \]
        </p>
        <p>Isn't it ironic? We have two inequalities pointing in opposite directions:</p>
        <p class="mpc">
            \[
            \begin{cases}
                x^4y^4z^4 \le (4x-3)(4y-3)(4z-3) \\
                x^4y^4z^4 \ge (4x-3)(4y-3)(4z-3)
            \end{cases}
            \]
        </p>
        <p>For both to be true in the same time, the two expressions must be equal. Since the equality \(x^4 = 4x - 3\) only occurs when the variable is \(1\), we conclude that:</p>
        <p class="mpc">
            \[ x = y = z = 1 \]
        </p>
    </details>
</div>
</p>

<p>
<div class="mp" id="palg03">
    <p><a class="mpl" href="#palg03">Problem ALG03</a></p> 
    <p>Find all \(x \notin \mathbb{Q}\) such that both of the following conditions are met:</p>
    <p class="mpc">
        \[
        \begin{cases}
            x^2 + 2x \in \mathbb{Q} \\
            x^3 - 6x \in \mathbb{Q}
        \end{cases}
        \]
    </p>
    <details>
        <summary>Hint</summary>
        <p>Assign rational variables to the expressions (e.g., \(a\) and \(b\)). Express the cubic term in terms of the quadratic term and \(x\), then use the fact that \(x\) is irrational to isolate the coefficients.</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>Let's introduce two rational numbers \(a\) and \(b\) such that:</p>
        <p class="mpc">
            \[ a = x^2 + 2x \quad \text{and} \quad b = x^3 - 6x \quad (a, b \in \mathbb{Q}) \]
        </p>
        <p>Our goal is to express \(b\) in terms of \(a\) and \(x\) to see how the irrationality of \(x\) behaves. We can perform a polynomial-style reduction:</p>
        <p class="mpc">
            \[
            \begin{aligned}
                b &= x^3 + 2x^2 - 2x^2 - 4x - 2x \\
                b &= x(x^2 + 2x) - 2(x^2 + 2x) - 2x \\
                b &= x(a) - 2(a) - 2x \\
                b &= x(a - 2) - 2a
            \end{aligned}
            \]
        </p>
        <p>Now, let's look at the structure of this equation: \(b + 2a = x(a - 2)\). Since \(a\) and \(b\) are rational, the left side is rational. However, \(x\) is known to be irrational.</p>
        <p>The only way an irrational number multiplied by a rational number can result in a rational number is if the multiplier is zero. Therefore, we must have:</p>
        <p class="mpc">
            \[ a - 2 = 0 \implies a = 2 \]
        </p>
        <p>If \(a = 2\), then the equation \(b = x(a - 2) - 2a\) simplifies to \(b = -2(2) = -4\), which is indeed rational. Now we solve for \(x\) using our value for \(a\):</p>
        <p class="mpc">
            \[ x^2 + 2x = 2 \iff x^2 + 2x - 2 = 0 \implies \]
            \[ \implies x = \frac{-2 \pm \sqrt{12}}{2} = \frac{-2 \pm 2\sqrt{3}}{2} \]
        </p>
        <p>The final solutions for \(x\) are:</p>
        <p class="mpc">
            \[ x = -1 + \sqrt{3} \quad \text{and} \quad x = -1 - \sqrt{3} \]
        </p>
        <p>Both values are irrational, satisfying the initial condition \(x \notin \mathbb{Q}\).</p>
    </details>
</div>
</p>

<p>
<div class="mp" id="palg04">
    <p><a class="mpl" href="#palg04">Problem ALG04</a></p> 
    <p>Let \(a, b \in \mathbb{C}\). Prove the following inequality:</p>
    <p class="mpc">
        \[
        |1 + ab| + |a + b| \ge \sqrt{|a^2 - 1| \cdot |b^2 - 1|}
        \]
    </p>
    <details>
        <summary>Hint</summary>
        <p>Recall the Triangle Inequality for complex numbers: \(|z_1| + |z_2| \ge |z_1 + z_2|\) and \(|z_1| + |z_2| \ge |z_1 - z_2|\). Try applying these to the left side of the equation and then multiply the resulting inequalities.</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>To prove this, we apply the <strong>Triangle Inequality</strong> in two different ways to the terms on the left side:</p>
        <p class="mpc">
            \[
            \begin{aligned}
                |1 + ab| + |a + b| &\ge |(1 + ab) + (a + b)| \\
                |1 + ab| + |a + b| &\ge |(1 + ab) - (a + b)|
            \end{aligned}
            \]
        </p>
        <p>We can factor the expressions inside the absolute value bars on the right-hand sides:</p>
        <p class="mpc">
            \[
            \begin{aligned}
                1 + ab + a + b &= (1 + a)(1 + b) \\
                1 + ab - a - b &= (1 - a)(1 - b)
            \end{aligned}
            \]
        </p>
        <p>Now, let \( L = |1 + ab| + |a + b| \). Our inequalities become:</p>
        <p class="mpc">
            \[
            \begin{cases}
                L \ge |1 + a| \cdot |1 + b| \\
                L \ge |1 - a| \cdot |1 - b|
            \end{cases}
            \]
        </p>
        <p>Since both sides are non-negative, we can multiply these two inequalities together:</p>
        <p class="mpc">
            \[ L^2 \ge |1 + a| \cdot |1 + b| \cdot |1 - a| \cdot |1 - b| \]
        </p>
        <p>By grouping the terms as \((1+a)(1-a) = 1-a^2\) and \((1+b)(1-b) = 1-b^2\), we obtain:</p>
        <p class="mpc">
            \[ L^2 \ge |1 - a^2| \cdot |1 - b^2| \]
        </p>
        <p>Taking the square root of both sides (and noting that \(|1 - a^2| = |a^2 - 1|\)):</p>
        <p class="mpc">
            \[ L \ge \sqrt{|a^2 - 1| \cdot |b^2 - 1|} \]
        </p>
        <p>Substituting back the value of \(L\), the proof is complete:</p>
        <p class="mpc">
            \[ \mathbf{|1 + ab| + |a + b| \ge \sqrt{|a^2 - 1| \cdot |b^2 - 1|}} \]
        </p>
    </details>
</div>
</p>

<p>
<div class="mp" id="palg05">
    <p><a class="mpl" href="#palg05">Problem ALG05</a></p> 
    <p>Find all pairs \(a, b \in \mathbb{R}\) such that \(a + b \in \mathbb{Z}\) and \(a^2 + b^2 = 2\).</p>
    <details>
        <summary>Hint</summary>
        <p>Use the inequality relating the Arithmetic Mean (AM) and the Quadratic Mean (QM) to find a range for \(a+b\). Once you have the possible integer values for the sum, treat the system as a quadratic equation in terms of \(a\).</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>We need a way to link \(a+b\) and \(a^2+b^2\).</p>
        <p>Looking at the <strong>QM-AM inequality</strong> (also known as the Root Mean Square inequality), we know that for \(n=2\):</p>
        <p class="mpc">
            \[ \frac{a+b}{2} \le \sqrt{\frac{a^2+b^2}{2}} \]
        </p>
        <p>Squaring both sides and substituting \(a^2+b^2=2\):</p>
        <p class="mpc">
            \[ \frac{(a+b)^2}{4} \le \frac{a^2+b^2}{2} \iff (a+b)^2 \le 2(2) \]
            \[ (a+b)^2 \le 4 \iff |a + b| \le 2 \]
        </p>
        <p>Since we are told \(a+b \in \mathbb{Z}\), the only possible values for the sum are \(\{-2, -1, 0, 1, 2\}\).</p>
        <p>Now, let's create a second-degree equation for \(a\). If we let \(m = a + b\), then \(b = m - a\). Substituting this into our original equation \(a^2 + b^2 = 2\):</p>
        <p class="mpc">
            \[ a^2 + (m - a)^2 = 2 \iff a^2 + m^2 - 2am + a^2 = 2 \]
            \[ 2a^2 - 2am + (m^2 - 2) = 0 \]
        </p>
        <p>This "trick" is often the hardest part to visualize; this type of intuition usually comes after solving many similar exercises, so don't be discouraged if you didn't spot it immediately!</p>
        <p>Now we simply test our possible values of \(m\):</p>
        <ul>
            <li>If \(m = 2\): \(2a^2 - 4a + 2 = 0 \implies 2(a-1)^2 = 0 \implies a=1, b=1\)</li>
            <li>If \(m = -2\): \(2a^2 + 4a + 2 = 0 \implies 2(a+1)^2 = 0 \implies a=-1, b=-1\)</li>
            <li>If \(m = 1\): \(2a^2 - 2a - 1 = 0 \implies a = \frac{1 \pm \sqrt{3}}{2}\). (If \(a = \frac{1+\sqrt{3}}{2}\), then \(b = \frac{1-\sqrt{3}}{2}\))</li>
            <li>If \(m = -1\): \(2a^2 + 2a - 1 = 0 \implies a = \frac{-1 \pm \sqrt{3}}{2}\)</li>
            <li>If \(m = 0\): \(2a^2 - 2 = 0 \implies a^2 = 1 \implies a = \pm 1, b = \mp 1\)</li>
        </ul>
        <p>The complete set of solutions \((a, b)\) is:</p>
        <p class="mpc">
            \[ 
            (1,1), (-1,-1), (1,-1), (-1,1), 
            \left(\frac{1 \pm \sqrt{3}}{2}, \frac{1 \mp \sqrt{3}}{2}\right), 
            \left(\frac{-1 \pm \sqrt{3}}{2}, \frac{-1 \mp \sqrt{3}}{2}\right) 
            \]
        </p>
    </details>
</div>
</p>

<div class="mp" id="palg06">
    <p><a class="mpl" href="#palg06">Problem ALG06</a></p> 
    <p>Find all numbers \(n \in \mathbb{N}\) that satisfy the following property: there exist integers \((a, b) \in \mathbb{Z}\) such that \(n^2 = a + b\) and \(n^3 = a^2 + b^2\).</p>
    <details>
        <summary>Hint</summary>
        <p>Use the relationship between the sum and the sum of squares, specifically the inequality \(2(a^2+b^2) \ge (a+b)^2\), to bound the possible values of \(n\).</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>By applying the <strong>QM-AM inequality</strong>, we know that for any real numbers \(a\) and \(b\):</p>
        <p class="mpc">
            \[ 2(a^2 + b^2) \ge (a + b)^2 \]
        </p>
        <p>Substituting the given properties \(n^2 = a + b\) and \(n^3 = a^2 + b^2\) into this inequality, we get a simple constraint on \(n\):</p>
        <p class="mpc">
            \[ 2n^3 \ge (n^2)^2 \iff 2n^3 \ge n^4 \]
        </p>
        <p>Since \(n \in \mathbb{N}\), we can analyze this inequality:</p>
        <ul>
            <li>If \(n=0\), the inequality \(0 \ge 0\) holds. (Example: \(a=0, b=0\))</li>
            <li>If \(n > 0\), we can divide by \(n^3\), yielding \(2 \ge n\).</li>
        </ul>
        <p>This limits our possible values to \(n \in \{0, 1, 2\}\). Let's verify each:</p>
        <ul>
            <li>For \(n=0\): \(a+b=0\) and \(a^2+b^2=0 \implies (a,b) = (0,0)\).</li>
            <li>For \(n=1\): \(a+b=1\) and \(a^2+b^2=1 \implies (a,b) = (1,0)\) or \((0,1)\).</li>
            <li>For \(n=2\): \(a+b=4\) and \(a^2+b^2=8 \implies (a,b) = (2,2)\).</li>
        </ul>
        <p>The possible values for \(n\) are:</p>
        <p class="mpc">
            \[ \mathbf{n \in \{0, 1, 2\}} \]
        </p>
    </details>
</div>

<p>
<div class="mp" id="palg07">
    <p><a class="mpl" href="#palg07">Problem ALG07</a></p> 
    <p>Prove the following inequality for all \(a, b, x, y > 0\):</p>
    <p class="mpc">
        \[
        \frac{a}{x} + \frac{b}{y} \ge \frac{4(ay + bx)}{(x + y)^2}
        \]
    </p>
    <details>
        <summary>Hint</summary>
        <p>Start by finding a common denominator for the left side of the inequality. You'll notice a common term on both sides that can be simplified, eventually leading you to a very famous fundamental inequality.</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>This proof is quite elegant. We begin by simplifying the left side of the inequality with a common denominator:</p>
        <p class="mpc">
            \[
            \frac{ay + bx}{xy} \ge \frac{4(ay + bx)}{(x + y)^2}
            \]
        </p>
        <p>Since we are given that \(a, b, x, y > 0\), the term \((ay + bx)\) is strictly positive. This allows us to divide both sides by \((ay + bx)\) without changing the inequality sign:</p>
        <p class="mpc">
            \[
            \frac{1}{xy} \ge \frac{4}{(x + y)^2}
            \]
        </p>
        <p>Now, we rearrange the terms by multiplying across the denominators:</p>
        <p class="mpc">
            \[
            (x + y)^2 \ge 4xy
            \]
        </p>
        <p>Taking the square root of both sides, we arrive at the final result:</p>
        <p class="mpc">
            \[
            x + y \ge 2\sqrt{xy} \iff \frac{x + y}{2} \ge \sqrt{xy}
            \]
        </p>  
        <p>The expression \(\frac{x + y}{2} \ge \sqrt{xy}\) is the <strong>Arithmetic Mean-Geometric Mean (AM-GM) inequality</strong>, which is a known truth for all positive real numbers. Since our steps are reversible, the original inequality is proven.</p>
    </details>
</div>
</p>

<p>
<div class="mp" id="palg08">
    <p><a class="mpl" href="#palg08">Problem ALG08</a></p> 
    <p>Prove the following inequality for all \(a, b, c, d > 0\):</p>
    <p class="mpc">
        \[
        \frac{a}{b+2c+d} + \frac{b}{c+2d+a} + \frac{c}{d+2a+b} + \frac{d}{a+2b+c} \ge 1
        \]
    </p>
    <details>
        <summary>Hint</summary>
        <p>This exercise is much easier if you apply the result from <strong>Problem ALG07</strong>. Try grouping the first and third terms, and the second and fourth terms, using the inequality \(\frac{a}{x} + \frac{c}{y} \ge \frac{4(ay + cx)}{(x + y)^2}\).</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>Solving this directly would be quite laborious. However, we can leverage our result from Problem ALG07, which states that for positive values:</p>
        <p class="mpc">
            \[ \frac{a}{x} + \frac{c}{y} \ge \frac{4(ay + cx)}{(x + y)^2} \]
        </p>
        <p>Let's re-group our terms wisely. We will pair the first with the third, and the second with the fourth:</p>
        <p class="mpc">
            \[
            \left( \frac{a}{b+2c+d} + \frac{c}{d+2a+b} \right) + \left( \frac{b}{c+2d+a} + \frac{d}{a+2b+c} \right)
            \]
        </p>
        <p>Applying the lemma to the first pair (where \(x = b+2c+d\) and \(y = d+2a+b\)):</p>
        <p class="mpc">
            \[
            \frac{a}{b+2c+d} + \frac{c}{d+2a+b} \ge \frac{4[a(d+2a+b) + c(b+2c+d)]}{(2a+2b+2c+2d)^2}
            \]
            \[
            = \frac{2a^2 + 2c^2 + ab + ad + bc + cd}{(a+b+c+d)^2} \quad \text{(*)}
            \]
        </p>
        <p>Similarly, applying it to the second pair:</p>
        <p class="mpc">
            \[
            \frac{b}{c+2d+a} + \frac{d}{a+2b+c} \ge \frac{2b^2 + 2d^2 + ab + bc + cd + ad}{(a+b+c+d)^2} \quad \text{(**)}
            \]
        </p>
        <p>Now, we sum the results of \(\text{(*)}\) and \(\text{(**)}\):</p>
        <p class="mpc">
            \[
            \frac{2(a^2+b^2+c^2+d^2) + 2(ab+bc+cd+da)}{(a+b+c+d)^2}
            \]
        </p>
        <p>Recall the expansion: \((a+b+c+d)^2 = a^2+b^2+c^2+d^2 + 2(ab+ac+ad+bc+bd+cd)\). With some algebraic rearranging, we can express the numerator in terms of this expansion:</p>
        <p class="mpc">
            \[
            \frac{(a+b+c+d)^2 + (a-c)^2 + (b-d)^2}{(a+b+c+d)^2}
            \]
        </p>
        <p>This simplifies to:</p>
        <p class="mpc">
            \[
            1 + \frac{(a-c)^2 + (b-d)^2}{(a+b+c+d)^2} \ge 1
            \]
        </p>  
        <p>The inequality holds because squares of real numbers are always non-negative. Equality occurs when \(a=c\) and \(b=d\).</p>
    </details>
</div>
</p>

<p>
<div class="mp" id="palg09">
    <p><a class="mpl" href="#palg09">Problem ALG09</a></p> 
    <p>If \(x_1, x_2, \dots, x_n\) are strictly positive numbers, prove the following inequality:</p>
    <p class="mpc">
        \[
        \frac{1}{1+x_1} + \frac{1}{1+x_1+x_2} + \dots + \frac{1}{1+x_1+x_2+\dots+x_n} < \sqrt{\frac{1}{x_1} + \frac{1}{x_2} + \dots + \frac{1}{x_n}}
        \]
    </p>
    <details>
        <summary>Hint</summary>
        <p>Let \(s_k\) be the partial sums of the \(x\) sequence. Use the Cauchy-Schwarz inequality by splitting each term \(\frac{1}{1+s_k}\) into a product of two square roots. Then, try to bound the resulting sum using a telescoping series.</p> 
    </details>
    <details>
        <summary>Solution</summary>
        <p>This is a challenging problem. While the solution is clear once laid out, the initial leap in notation and the application of CBS is quite advanced.</p>
        <p>Let's define the partial sums \(s_k\) as follows:</p>
        <p class="mpc">
            \[
            \begin{cases}
            s_1 = x_1 \\
            s_2 = x_1 + x_2 \\
            \vdots \\
            s_n = x_1 + x_2 + \dots + x_n
            \end{cases}
            \]
        </p>
        <p>Because each \(x_i\) is strictly positive, we have a strictly increasing sequence: \(s_1 < s_2 < \dots < s_n\). We also note that \(x_k = s_k - s_{k-1}\) (with \(s_0 = 0\)). Our goal is to prove:</p>
        <p class="mpc">
            \[ \sum_{k=1}^n \frac{1}{1+s_k} < \sqrt{\sum_{k=1}^n \frac{1}{s_k - s_{k-1}}} \]
        </p>
        <p>We rewrite each term of the left side as a product to prepare for the <strong>Cauchy-Schwarz (CBS) Inequality</strong>:</p>
        <p class="mpc">
            \[ \frac{1}{1+s_k} = \frac{1}{\sqrt{s_k - s_{k-1}}} \cdot \frac{\sqrt{s_k - s_{k-1}}}{1+s_k} \]
        </p>
        <p>Applying CBS to the sum of these products, we get:</p>
        <p class="mpc">
            \[ \left( \sum_{k=1}^n \frac{1}{1+s_k} \right)^2 \le \left( \sum_{k=1}^n \frac{1}{s_k - s_{k-1}} \right) \left( \sum_{k=1}^n \frac{s_k - s_{k-1}}{(1+s_k)^2} \right) \]
        </p>
        <p>Taking the square root of both sides:</p>
        <p class="mpc">
            \[ \sum_{k=1}^n \frac{1}{1+s_k} \le \sqrt{\sum_{k=1}^n \frac{1}{x_k}} \cdot \sqrt{\sum_{k=1}^n \frac{s_k - s_{k-1}}{(1+s_k)^2}} \]
        </p>
        <p>The proof is complete if we can show that \(\sum_{k=1}^n \frac{s_k - s_{k-1}}{(1+s_k)^2} < 1\). Using the fact that \(s_k > s_{k-1}\), we can bound each term:</p>
        <p class="mpc">
            \[ \frac{s_k - s_{k-1}}{(1+s_k)^2} < \frac{s_k - s_{k-1}}{(1+s_k)(1+s_{k-1})} \]
        </p>
        <p>This allows us to create a <strong>telescoping sum</strong>:</p>
        <p class="mpc">
            \[ \frac{s_k - s_{k-1}}{(1+s_k)(1+s_{k-1})} = \frac{(1+s_k) - (1+s_{k-1})}{(1+s_k)(1+s_{k-1})} = \frac{1}{1+s_{k-1}} - \frac{1}{1+s_k} \]
        </p>
        <p>Summing these terms from \(k=1\) to \(n\):</p>
        <p class="mpc">
            \[ \left( \frac{1}{1+s_0} - \frac{1}{1+s_1} \right) + \left( \frac{1}{1+s_1} - \frac{1}{1+s_2} \right) + \dots + \left( \frac{1}{1+s_{n-1}} - \frac{1}{1+s_n} \right) \]
            \[ = 1 - \frac{1}{1+s_n} < 1 \]
        </p>
        <p>Since the second square root term is strictly less than 1, the original inequality is proven.</p>
    </details>
</div>
</p>

<p>
<div class="mp" id="palg10">
    <p><a class="mpl" href="#palg10">Problem ALG10</a></p> 
    <p>Let \(x, y \in \mathbb{N}^{*}\) with \(x \neq y\). Prove that:</p>
    <p class="mpc">
        \[
        \frac{(x+y)^2}{x^3 + xy^2 - x^2y - y^3} \notin \mathbb{Z}
        \]
    </p>
    <details>
        <summary>Solution</summary>
        <p>We start by factoring the denominator of the expression. Notice that we can group the terms to find a common factor:</p>
        <p class="mpc">
            \[
            x^3 - x^2y + xy^2 - y^3 = x^2(x - y) + y^2(x - y) = (x - y)(x^2 + y^2)
            \]
        </p>
        <p>Our expression becomes:</p>
        <p class="mpc">
            \[ m = \frac{(x+y)^2}{(x - y)(x^2 + y^2)} \]
        </p>
        <p>To prove that \(m \notin \mathbb{Z}\), let's assume the opposite: suppose that \(m\) is an integer. If \(m \in \mathbb{Z}\), then the product \(m(x - y)\) must also be an integer. This implies that:</p>
        <p class="mpc">
            \[ \frac{(x+y)^2}{x^2 + y^2} \in \mathbb{Z} \]
        </p>
        <p>We can rewrite this fraction by expanding the numerator:</p>
        <p class="mpc">
            \[ \frac{x^2 + 2xy + y^2}{x^2 + y^2} = \frac{(x^2 + y^2) + 2xy}{x^2 + y^2} = 1 + \frac{2xy}{x^2 + y^2} \]
        </p>
        <p>For this to be an integer, the term \(\frac{2xy}{x^2 + y^2}\) must itself be an integer. However, we know from the <strong>AM-GM inequality</strong> (or the expansion of \((x-y)^2 > 0\)) that for any \(x \neq y\):</p>
        <p class="mpc">
            \[ x^2 + y^2 > 2xy \]
        </p>
        <p>Since \(x\) and \(y\) are positive integers, this gives us a strict bound:</p>
        <p class="mpc">
            \[ 0 < \frac{2xy}{x^2 + y^2} < 1 \]
        </p>
        <p>There are no integers between 0 and 1. This is a contradiction, which means our original assumption that \(m \in \mathbb{Z}\) must be false. Thus, the expression is never an integer.</p>
    </details>
</div>
</p>