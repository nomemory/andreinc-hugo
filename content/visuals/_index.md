+++
title = "Visuals"
+++

I like to create visuals in my articles, painting things on a canvas. Here's a list of some of the animations I've created using either [p5js](https://p5js.org/) or [three.js](https://threejs.org/). You can use the as standalone links, without having to share the article, source code is included.

**From the circle to epicycles**

- [Simple circle](/visuals/from-the-circle-to-epicycles/simple-circle/)

  > "A circle is a geometric figure defined by its center P(a, b) and its radius r."

- [The unit circle](/visuals/from-the-circle-to-epicycles/unit-circle-rotation/)

  > "When we set the center at the origin ($a=0, b=0$) and the radius to $r=1$, we get a special case known as The Unit Circle:"

- [Triangle in circle](/visuals/from-the-circle-to-epicycles/triangle-in-circle/)

  > "If you pick a point $A$ on the circumference and its reflection $A'$ on the opposite side, the relationship remains constant as they rotate. This rotational invariance is the \"secret sauce\" of Fourier Mathematics."

- [What π means on a circle](/visuals/from-the-circle-to-epicycles/rotating-pi/)

  > "By definition, $\pi$ is the ratio of a circle's circumference to its diameter. Regardless of the circle's size, this ratio is constant:$\pi \approx 3.14159...$."

- [Radians and π](/visuals/from-the-circle-to-epicycles/radians-and-pi/)

  > "While we are accustomed to using degrees in daily life, the radian (or rad) is the standard unit for measuring angles in mathematics and physics. There is an intimate, geometric relationship between the radian and the number $\pi$:"

- [Sine and cosine from the unit circle](/visuals/from-the-circle-to-epicycles/sine-and-cosine-on-the-circle/)

  > "We can define Sine ($\sin$) and Cosine ($\cos$) through their relationship with the Unit Circle. Effectively, these functions act as coordinate trackers for a point moving around a circle:"

- [Unrolling the sine](/visuals/from-the-circle-to-epicycles/sine-oscillator/)

  > "Because the point eventually returns to its starting position, $\sin$ and $\cos$ are periodic functions with a period of $2\pi$. If we \"unroll\" the vertical motion of the point as it rotates, it traces a perfect wave over time:"

- [Unrolling sine and cosine](/visuals/from-the-circle-to-epicycles/sine-and-cosine-oscillator/)

  > "To be fair to the horizontal component, we can plot the Cosine on the same graph. You will notice it creates the exact same wave shape, just shifted by $\frac{\pi}{2}$(or $90^\circ$)."

- [Cosine leads sine](/visuals/from-the-circle-to-epicycles/sine-and-cosine-side-by-side/)

  > "In technical terms, we say that $\cos$ leads the $\sin$ by $\frac{\pi}{2}$ (or $90^\circ$). If you think of the waves as racers, the cosine wave has already reached its peak by the time the sine wave is just starting to climb from zero."

- [Cosine is even](/visuals/from-the-circle-to-epicycles/cosine-parity/)

  > "The cosine is even, meaning $\cos(x)=\cos(-x)$:"

- [Sine is odd](/visuals/from-the-circle-to-epicycles/sine-parity/)

  > "And the sine is odd, meaning sin(-x) = -sin(x), or sin(x) = -sin(-x)."

- [A complex number on the unit circle](/visuals/from-the-circle-to-epicycles/complex-unit-circle/)

  > "The visualization below illustrates this correspondence, showing how varying $\theta$ traces the unit circle through continuous rotation:"

- [Multiplication by i](/visuals/from-the-circle-to-epicycles/complex-rotation/)

  > "For example, if we take a complex number $z_1 \in \mathbb{C}$ and multiply it successively by $i$, the resulting points are obtained by repeated quarter-turn rotations. After three such multiplications, $z_1$ will have visited all four quadrants of the complex plane:"

- [A complex sinusoid](/visuals/from-the-circle-to-epicycles/three-d-complex/)

  > "These two components are perfectly in sync because they depend on the exact same rotating angle $\theta$, expressed as $\theta = \omega t + \varphi$."

- [Destructive interference](/visuals/from-the-circle-to-epicycles/one-negative/)

  > "When the peak of one sinusoid aligns with the valley of the other, they subtract from one another. At these specific points, the waves temporarily \"nullify\" each other, pulling the sum closer to zero. Yay!"

- [Summing two sinusoids](/visuals/from-the-circle-to-epicycles/simple-sum/)

  > "The sum $y(x)=y_{1}(x) + y_{2}(x)$ shows an interesting pattern"

- [Dropping sinusoid](/visuals/from-the-circle-to-epicycles/dropping-sinusoid/)

  > "For example, we start with a simple sinusoid with ($A=1$, $\omega=1$, $\varphi=1$) and adding arbitrary sinusoids on top, leads to more and more complexity:"

- [Plotting y(x)](/visuals/from-the-circle-to-epicycles/simple-yx-plot/)

  > "If we plot $y(x)$ on the cartesian grid we obtain something like:"

- [A flower](/visuals/from-the-circle-to-epicycles/a-flower/)

  > "If we carefully pick the right sinusoids the moving circles can describe (approximate) any shape we want. Here is a flower for example:"

- [The square wave](/visuals/from-the-circle-to-epicycles/square-wave-f/)

  > "In isolation, or Square Wave Function, $f(x)$ looks like this:"

- [Square wave coefficient a0](/visuals/from-the-circle-to-epicycles/square-wave-a0/)

  > "Therefore $A_0 = 0$. Yay!"

- [Square wave coefficient an](/visuals/from-the-circle-to-epicycles/square-wave-an/)

  > "Visually speaking, regardless of how you pick $n$ or $L$, the positive and negative areas of the resulting wave will always mirror and destroy each other. Let's plot the integrals for $A_1, A_2, \dots A_4$:"

- [Square wave coefficient bn](/visuals/from-the-circle-to-epicycles/square-wave-bn/)

  > "If we plot the inner functions for $B_{1}$, $B_{2}$, $B_{3}$ and $B_{4}$ we can intuitively feel what's happening with:"

- [Approximating the square wave](/visuals/from-the-circle-to-epicycles/tight-fourier/)

  > "In the next animation, you will see that by increasing $n$, the accuracy of our approximation gets better and better, and the gaps are slowly closed:"

- [A square wave partial sum](/visuals/from-the-circle-to-epicycles/tight-fourier-average/)

  > "So, if we were to approximate a Square Wave with its fifth partial sum (the red dot), we would obtain something like this:"

- [Tight triangle](/visuals/from-the-circle-to-epicycles/tight-triangle/)

  > "Plotting the function $s(x)$, we will see that things converge smoothly and fast. By the time $n$ approaches $6$, the triangle shape is getting clear:"

- [A phase shift by pi](/visuals/from-the-circle-to-epicycles/pi-shift/)

  > "Visually speaking, the results are identical. If we plot $sin(-x)$ and $sin(x+\pi)$ side by side the two overlap:"

- [Tight sawtooth](/visuals/from-the-circle-to-epicycles/tight-sawtooth/)

  > "Plotting $s(x)$, while increasing $n$, things look like this:"

- [Sinusoids](/visuals/from-the-circle-to-epicycles/sinusoids/)

  > "You can pick the values of amplitude, angular frequency, and phase to plot the sinusoid, and if you choose a phase of π/2, a cosine is plotted instead."

- [Square wave](/visuals/from-the-circle-to-epicycles/square-wave/)

  > "The magic: when we sum these smooth, continous curves together, their peaks and valleys interfere to create a \"flat top\" square wave. The more sinuosiuds we have in our sum, the sharper the approximation becomes."

- [Sum of epicycles](/visuals/from-the-circle-to-epicycles/sum-of-epicycles/)

  > "So, instead of stacking static circles, we can chain these spinning circles together. The center of the second circle sits on the edge of the first, the third on the edge of the second, and so on. This mechanical chain is what we call a system of epicycles."

- [Fourier machinery](/visuals/from-the-circle-to-epicycles/fourier-machinery/)

  > "Instead of looking at static equations, let's watch how these mathematical terms translate into physical motion to create practical, predictable patterns."

**The Sinusoidal Tetris**

- [The sinusoidal tetris](/visuals/the-sinusoidal-tetris/)

  > "Let's play Tetris, but with a twist. No geometrical figures will fall from the sky. Instead, you control a sinusoid."

**Fresco: The lightbringer**

- [Fresco: the lightbringer](/visuals/fresco-the-lightbringer/)

  > "Because our hero the electrician wanted to preserve the surrounding frescoes, he made the executive decision to install the modern light switch directly into the devil's outstretched hand."

**The Shape of Inequalities**

- [The two circles](/visuals/the-shape-of-inequalities/the-two-circles/)

  > "We are given a large circle with center $O$ and a diameter $a$, meaning the radius is $R = \frac{a}{2}$. Then, there is another smaller circle with center $O'$ touching the first circle's circumference from the outside. This second circle has a diameter $b$, so its radius is $r = \frac{b}{2}$. If we project the center of the smaller circle $O'$ onto the vertical line passing through $O$, we name that projected point $P$."

- [The semicircle](/visuals/the-shape-of-inequalities/the-semicircle/)

  > "We start with a semicircle with center $O$ and a total diameter of $a + b$. We pick a point $P$ on the circumference and project it down onto the diameter at point $P'$. This forms a right triangle $POP'$ (the letters were conveniently chosen so the visual \"pops\")."

- [The semicircle with QM](/visuals/the-shape-of-inequalities/the-semicircle-with-qm/)

  > "Now, to complicate things further, let's add the QM (Quadratic Mean) into the picture. To do this, we will have to: - Draw a radius $OM$ that is perpendicular to our diameter $a+b$. Since $OM$ is a radius, we know $OM = \frac{a+b}{2}$. - Connect points $M$ and $P'$ with a new segment."

- [The semicircle with HM](/visuals/the-shape-of-inequalities/the-semicircle-with-hm/)

  > "And finally, let's not forget about the HM. This is the most subtle of them all. To make it \"appear,\" let's project the point $P'$ onto the segment $OP$. We will call this new projection point $N$."

- [The container](/visuals/the-shape-of-inequalities/the-container/)

  > "Look at the following visual (the blue area represents the \"liquid\" (the product of $a \cdot b$)):"

- [The 3D container](/visuals/the-shape-of-inequalities/the-3d-container/)

  > "We define a cube with a side length of $\frac{a+b+c}{3}$, giving it a volume of $V_{\text{cube}} = \left(\frac{a+b+c}{3}\right)^3$. In parallel, we have a rectangular prism with sides $a$, $b$, and $c$. No matter how we morph that rectangular prism, as long as we keep the sum $a+b+c$ constant, our theoretical blue liquid from the prism will never overflow if we try to pour it into the cube."

- [The sum of squares](/visuals/the-shape-of-inequalities/the-sum-of-squares/)

  > "The total area of the combined polygon formed by these three is exactly $a^2 + b^2 + c^2$ (the left-hand side of our inequality)."

- [Nesbitt on the equilateral triangle](/visuals/the-shape-of-inequalities/nesbitt-equilateral/)

  > "As a challenge, I wanted to see if I could create a visual representation of the Nesbitt structure using basic geometric forms. I \"failed\" a little, because this specific algebraic structure isn't exactly geometry-friendly, but with a twist of imagination and some documentation, I’ve come up with this:"

**The associations people make**

- [The associations people make](/visuals/the-associations-people-make/)

  > "This article is about \"a vision\" that I have."
