+++
date = '2026-03-16'
draft = false
title = 'The Shape of Inequalities'
categories = ['math']
tags = ['inequalities']
usekatex = true
usethreejs = true
+++

<sub>...symmetry isn't just a preference for "pretty" shapes.</sub>

{{< toc >}}

# Introduction

While I was randomly browsing the web, I came across this nice picture:

{{< img src="/images/2026-03-16-the-shape-of-inequalities/amgmcapsule.png" width="450" caption="Roland H. Eddy, Memorial University of Newfoundland, Canada, 1985" grayscale="true">}}

And it tickled my imagination a little, just enough to write this short post. 

After writing [my previous handout article](/2025/03/17/the-trickonometry-of-math-olympiad-inequalities/) regarding inequalities, I wanted to see if I could find ways to represent inequalities in a geometrical way (you know, classic circles, triangles, squares, cubes, rectangular prisms and the like). So I've been digging and improvising, and I've come up with some animations to help people get a geometrical intuition of things that are mostly studied in algebra and analysis. 

Some of the animations are standard and are taught in the right kind of schools, but others have some originality. For those, I actually developed the ideas using pen, paper, and my own imagination. If somebody else already did that, it's fine; I am not a fool to claim "real" originality when it comes to basic mathematics. The roads were already very circulated in the last 2000 years.

<style>
.math-canvas-wrap {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    margin: 2rem 0;
}

.math-canvas {
    width: 600px;
    height: 400px;
    position: relative;
    margin: 0 auto;
    border: 2px solid #222;
    background: #f6f8fa;
    border-radius: 4px;
    overflow: hidden;
}

.math-canvas.tall {
    height: 600px;
}
</style>

# The HM-AM-GM-QM Inequality

This is the most popular inequality chain we encounter during our school years. To remind you of it, in case you've forgotten, the simple version for three numbers $a, b, c > 0$ is:

<div class="mp mpc">
    \[
        \underbrace{\frac{3}{\frac{1}{a} + \frac{1}{b} + \frac{1}{c}}}_{\text{HM}} \leq \underbrace{\sqrt[3]{abc}}_{\text{GM}} \leq \underbrace{\frac{a+b+c}{3}}_{\text{AM}} \leq \underbrace{\sqrt{\frac{a^2+b^2+c^2}{3}}}_{\text{QM}}
    \]
</div>

Or, in the even simpler two-variable case:

<div class="mp mpc">
    \[
        \frac{2}{\frac{1}{a} + \frac{1}{b}} \leq \sqrt{ab} \leq \frac{a+b}{2} \leq \sqrt{\frac{a^2+b^2}{2}}
    \]
</div>

To decode the "alphabet soup," here is what those letters actually stand for:

* `HM = Harmonic Mean`: Even if it sounds counterintuitive to an untrained eye, this mean appears in the very laws encoded in our universe. For example, if you go from point $A$ to point $B$ with a speed of $v_1$ and come back with a speed of $v_2$, what is your average speed? A bad student would say $v_{\text{avg}}=\frac{v_1+v_2}{2}$, but a good student would know it is actually the harmonic mean: $v_{\text{avg}} = \frac{2}{\frac{1}{v_1} + \frac{1}{v_2}}$.

* `GM = Geometric Mean`: The "growth" mean, useful for scaling and compounding. Much like the HM, this one appears in nature and in... simple finance. For example, if you are a stock investor and in the first year your portfolio grows by `100%`, but the next year the market crashes by `50%`, what was your *average growth*? 
    - An investor bad at math would say: $\frac{100 + (-50)}{2} = 25\%\$.
    - A good investor would look at the growth factors: in the first year, the factor is $2.0$; in the second, it is $0.5$. Then it would average everything down like this: $ \text{Average Growth Factor} = \sqrt{2.0 \times 0.5} = 1.0$
    - This means your average growth is actually $0\%$. You ended up exactly where you started, which, let's be honest, is already better than most traders.
* `AM = Arithmetic Mean`: The classic average everyone knows and loves. Okay, maybe *love* is a strong word for an *average* math formula.
* `QM = Quadratic Mean:` Also known as the *Root Mean Square (RMS)* appears in electrical engineering for example. 
    - In Europe, the voltage is labeled as 230V. But this is not the actual *average* voltage people think. The actual value is determined with the *RMS*.

Now that things are clearer, let's look at this inequality chain with a geometric eye. It's amazing to see how things come to life.

## The two circles

The first animation is actually the one I found in the picture. 

We are given a large circle with center $O$ and a diameter $a$, meaning the radius is $R = \frac{a}{2}$. Then, there is another smaller circle with center $O'$ touching the first circle's circumference from the outside. This second circle has a diameter $b$, so its radius is $r = \frac{b}{2}$. If we project the center of the smaller circle $O'$ onto the vertical line passing through $O$, we name that projected point $P$. 

<div class="math-canvas-wrap">
    <div id="am-gm-viz" class="math-canvas"></div>
</div>

A right triangle $OPO'$ is formed with the following lengths: 
- The hypotenuse $OO'$ is the sum of the radii: $\frac{a}{2} + \frac{b}{2} = \frac{a+b}{2}$.
- The horizontal leg $OP$ is the difference of the radii: $\frac{a}{2} - \frac{b}{2} = \frac{a-b}{2}$.
- The vertical leg $O'P$.

To compute $O'P$, we just apply Pythagoras's theorem:

<div class="mp mpc">
\[
    (O'P)^2 = \left(\frac{a+b}{2}\right)^2 - \left(\frac{a-b}{2}\right)^2 = ab \implies
\]
\[
    \implies O'P = \sqrt{ab}
\]
</div>

$OO'$ is the `AM` for $a$ and $b$, while $O'P$ is the `GM` for $a$ and $b$. Notice how the `GM` (a leg) is always smaller than the `AM` (the hypotenuse). In the one particular case where the circles are the same size ($a=b$), the leg $OP$ becomes zero, and the `GM` coincides with the `AM`. Lovely!

## The Semicircle

This is the "classroom" strategy, the visual I was taught in school. 

We start with a semicircle with center $O$ and a total diameter of $a + b$. We pick a point $P$ on the circumference and project it down onto the diameter at point $P'$. This forms a right triangle $POP'$ (the letters were conveniently chosen so the visual "pops").

<div class="math-canvas-wrap">
    <div id="am-gm-semicircle" class="math-canvas"></div>
</div>

In this triangle:
- The horizontal leg is $OP' = \frac{|a - b|}{2}$.
- The hypotenuse $OP$ is the radius, which is half the diameter: $OP = \frac{a+b}{2}$.

We need to compute the vertical segment $PP'$, and for this, we are going to use Pythagoras's theorem:

<div class="mp mpc">
    \[
        PP' = \sqrt{\left(\frac{a+b}{2}\right)^2 - \left(\frac{a-b}{2}\right)^2} = \sqrt{ab}
    \]
</div>

In essence, we’re looking at the same idea as before, just through a different "mechanic." We take a diameter of length $a + b$ and split it into two segments, $a$ and $b$. 

As you move the separator in the animation, it’s easy to see *the machinery* at work: the blue line (`GM`=$PP'$) is always trapped inside the circle, so it can never be taller than the red radius (`AM`=$OP$). They only hit the same height at the very top, when $a = b$.

Now, to complicate things further, let's add the `QM` (Quadratic Mean) into the picture. To do this, we will have to:
- Draw a radius $OM$ that is perpendicular to our diameter $a+b$. Since $OM$ is a radius, we know $OM = \frac{a+b}{2}$.
- Connect points $M$ and $P'$ with a new segment.

<div class="math-canvas-wrap">
    <div id="am-gm-qm-semicircle" class="math-canvas"></div>
</div>

By looking at the visual, we can see a new right triangle ($MOP'$) is formed, with its two legs being:
- $OM = \frac{a+b}{2}$
- $OP' = \frac{|a-b|}{2}$

To compute the hypotenuse $MP'$, we simply apply Pythagoras again:

<div class="mp mpc">
    \[
        MP' = \sqrt{\left(\frac{a+b}{2}\right)^2 + \left(\frac{a-b}{2}\right)^2} = \sqrt{\frac{a^2+2ab+b^2 + a^2-2ab+b^2}{4}} =
    \]
    \[
        = \sqrt{\frac{2a^2+2b^2}{4}} = \sqrt{\frac{a^2+b^2}{2}}
    \]
</div>

We observe now that $MP'$ plays the role of the `QM` of $a$ and $b$. Because $MP'$ is the hypotenuse and $OM$ (the radius/AM) is just a leg, the `QM` will always be bigger than the radius, unless $a=b$. In that specific case, $P'$ moves to the center $O$, the leg $OP'$ vanishes, and we get `QM = AM`.

And finally, let's not forget about the `HM`. This is the most subtle of them all. To make it "appear," let's project the point $P'$ onto the segment $OP$. We will call this new projection point $N$.

<div class="math-canvas-wrap">
    <div id="hm-am-gm-qm-semicircle" class="math-canvas"></div>
</div>

To compute $PN$, which is the actual `HM`, we use the properties of the right triangle $OPP'$. Since $PN$ is a segment on the hypotenuse formed by the altitude from the right angle (wait, actually, we use the area or similarity here!), the math works out beautifully:

<div class="mp mpc">
    \[
        PN = \frac{PP'^2}{OP} = \frac{(\sqrt{ab})^2}{\frac{a+b}{2}} = \frac{2ab}{a+b} = \frac{2}{\frac{1}{a} + \frac{1}{b}}
    \]
</div>

We’ve done it! We have the whole "alphabet soup" chain packed into one single semicircle: 
- $PN$ is the `HM` (the small segment)
- $PP'$ is the `GM` (the vertical altitude)
- $OP$ is the `AM` (the radius)
- $MP'$ is the `QM` (the big hypotenuse)

It’s easy to see the hierarchy now. Unless $a=b$, the segments will always stay in their lane: $PN < PP' < OP < MP'$. Everything is connected. Again, lovely!

## The Container

This is not a proof of the AM-GM inequality, but rather a beautiful consequence of it.

The idea for this visual came to me because I recently solved the problem ["Container With Most Water"](https://leetcode.com/problems/container-with-most-water/description/). That coding problem isn't strictly related to the inequality, but the concept of a container holding water rang a bell...

Think of a container $ABCD$ which is a square. The side of the square is $AB = \frac{a+b}{2}$. This means the area of our square is $\text{Area}_{ABCD} = \left(\frac{a+b}{2}\right)^2$. 

Now, let's introduce a second container: a rectangle $A'B'C'D'$ where the width $A'B' = a$ and the height $A'D' = b$. We consider the sum $a+b$ to be **fixed**, but we start morphing the rectangular container, meaning when we take something from $b$, we put it back into $a$, and vice-versa. The area of this rectangular container is $\text{Area}_{A'B'C'D'} = ab$. 

If we want to imagine filling this container with water (I know it's a 2D shape, get over it), the exact quantity of water that $A'B'C'D'$ can hold is almost always less than what $ABCD$ can hold. No matter how we morph the rectangle, the square will always be the superior vessel.

Look at the following visual (the blue area represents the "liquid" (the product of $a \cdot b$)):

<div class="math-canvas-wrap">
    <div id="am-gm-squares" class="math-canvas"></div>
</div>

You’ll notice the water level fluctuates as the rectangle morphs (conditioned by $a+b=\text{constant}$), but it’s physically impossible for it to overflow the bounds of the square. The liquid only hits the brim at the "top of the stroke," right when $a=b$ and the rectangle becomes a perfect square. Any other time, there’s always some empty space left at the top.

We can summarize this "container" experiment with a simple observation: 

<div class="mp mpc">
    \[
        \text{Area}_{ABCD} \geq \text{Area}_{A'B'C'D'} \implies \left(\frac{a+b}{2}\right)^2 \geq ab \implies
    \]
    \[
        \implies \frac{a+b}{2} \geq \sqrt{ab}
    \]
</div>

Which is exactly the `AM-GM` inequality. It’s a physical law of geometry: for a fixed perimeter, the square is the ultimate "water holder," and the more we stretch the rectangle into a thin line, the more capacity we lose.

## The 3D container

For the people not comfortable using a 2D shape as a container, here is the 3D version. The logic still holds, but now, instead of comparing areas, we are going to look at volumes. 

We define a cube with a side length of $\frac{a+b+c}{3}$, giving it a volume of $V_{\text{cube}} = \left(\frac{a+b+c}{3}\right)^3$. In parallel, we have a rectangular prism with sides $a$, $b$, and $c$. No matter how we morph that rectangular prism, as long as we keep the sum $a+b+c$ constant, our theoretical blue liquid from the prism will never overflow if we try to pour it into the cube.

<div class="math-canvas-wrap">
    <div id="am-gm-cubes" class="math-canvas"></div>
</div>

Just like before, the "prism" container only reaches the brim of the "cube" container when $a=b=c$. Any deviation from perfect symmetry results in a loss of volume. In mathematical terms:

<div class="mp mpc">
    \[
        \left(\frac{a+b+c}{3}\right)^3 \geq abc \implies \frac{a+b+c}{3} \geq \sqrt[3]{abc}
    \]
</div>

What we are seeing here isn’t just a weirdness of algebra, but a fundamental "law of laziness" intrinsic to both the animals and the universe itself. Nature is obsessed with efficiency, and as it turns out, symmetry is the ultimate form of laziness.

# The Sum of Squares Inequality

There is a "cute" inequality you might know it simply as the "Sum of Squares":

<div class="mp mpc">
    \[
        a^2 + b^2 + c^2 \geq ab + bc + ca
    \]
</div>

There are multiple ways to prove this, and I’ve already spoken about it in previous posts: [here](/2025/03/17/the-trickonometry-of-math-olympiad-inequalities/#pivi08), [here](/2025/03/17/the-trickonometry-of-math-olympiad-inequalities/#pgtm12), [here](/2025/03/17/the-trickonometry-of-math-olympiad-inequalities/#pmrt01)... and [here](/2025/03/17/the-trickonometry-of-math-olympiad-inequalities/#pcbs04). 

But instead of algebra, we can visualize this as a configuration of squares:
- Imagine a square $ABCD$ with side length $a$;
- Another square $BEFG$ with side length $b$;
- And a third square $EHIJ$ with side length $c$.

The total area of the combined polygon formed by these three is exactly $a^2 + b^2 + c^2$ (the left-hand side of our inequality).

<div class="math-canvas-wrap">
    <div id="abc-squares-overlap" class="math-canvas"></div>
</div>

If we draw some new lines, as shown in the animation, new rectangles appear:
- $ABKL$ with area $ca$;
- $ABGM$ with area $ab$;
- $BEJK$ with area $bc$.

As you can see, the sum of these areas is $ab + bc + ca$ and it matches the RHS of our inequality.

As we adjust the sliders to increase $b$ and $c$ to match the size of $a$, the gap between the two sides disappears. The inequality finally becomes an equality when $a = b = c$, and the three squares perfectly align... which is nice I suppose.

# Nesbitt's Inequality

Nesbitt's inequality is a classical result in the world of mathematics, and it states:

<div class="mp mpc">
    \[
        \frac{a}{b+c} + \frac{b}{c+a} + \frac{c}{a+b} \geq \frac{3}{2}
    \]
</div>

If you are curious about its various proofs, I recommend reading about them [here](/2025/03/17/the-trickonometry-of-math-olympiad-inequalities/#nesbitts-inequality), [here](/2025/03/17/the-trickonometry-of-math-olympiad-inequalities/#pcbs12), and [here](/2025/03/17/the-trickonometry-of-math-olympiad-inequalities/#an-interesting-refinement-for-nesbitts-inequality).

As a challenge, I wanted to see if I could create a visual representation of the Nesbitt structure using basic geometric forms. I "failed" a little, because this specific algebraic structure isn't exactly geometry-friendly, but with a twist of imagination and some documentation, I’ve come up with this:

<div class="math-canvas-wrap">
    <div id="nesbitt-equilateral" class="math-canvas tall"></div>
</div>

The main idea was to play with [Viviani's Theorem](https://en.wikipedia.org/wiki/Viviani%27s_theorem). I started by drawing an equilateral triangle, knowing that the sum of the distances from an interior point $Q$ to the sides is always constant.

So, let's define our segments:
* If we project $Q$ onto $BC$, the length is $x$.
* If we project $Q$ onto $AC$, the length is $y$.
* If we project $Q$ onto $AB$, the length is $z$.

We know that $x + y + z = h$, where $h$ is the altitude of the triangle. To link this to Nesbitt, we perform a variable swap. We let the original Nesbitt variables $a, b, c$ be defined as the sum of these distances: $a = y + z$, $b = x + z$, and $c = x + y$.

When we plug these into the original inequality, something beautiful happens. 

Since $y+z$ is just the "total height minus $x$," and the denominator $b+c$ becomes $(x+z) + (x+y) = (x+y+z) + x = h+x$, our fractions transform into a function of the distance from the sides:

<div class="mp mpc">
    \[
        \frac{h-x}{h+x} + \frac{h-y}{h+y} + \frac{h-z}{h+z} \geq \frac{3}{2}
    \]
</div>

In the animation, as you drag point $Q$ around the triangle, you are essentially changing the "balance" of $x, y,$ and $z$. When $Q$ sits perfectly at the center, $x = y = z = h/3$. Each term becomes:

<div class="mp mpc">
\[
    \frac{h - \frac{h}{3}}{h + \frac{h}{3}} = \frac{\frac{2}{3}h}{\frac{4}{3}h} = \frac{1}{2}
\]
</div>

If $Q$ moves, the symmetry breaks and the sum starts to grow. It’s the perfect visual proof that in the world of Nesbitt, the center is the only place to find the minimum. Lovely!

Even though I said I "failed" to make it perfectly geometry-friendly, this visualization actually reveals something deeper, I cannot put a finger on.

# Conclusion

As I tried to force these algebraic structures into circles, triangles, and prisms, I realized something: most algebraic inequalities are not inherently "geometry-friendly." 

Once you move past the basics, the clean lines of basic geometry start to blur. Without the machinery of calculus, derivatives, or multi-dimensional curves, representing a complex algebraic "truth" with just a compass and a ruler feels impossible.

But that is exactly where the beauty lies. By forcing these abstract formulas into a "container" or a "semicircle," we catch a glimpse of the physical skeleton of mathematics. We see that symmetry isn't just a preference for "pretty" shapes.

<script type="module">
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const COLORS = {
    bg: 0xf6f8fa,

    black: 0x111111,
    dark: 0x222222,
    border: 0x333333,
    right: 0x444444,

    gray: 0x666666,
    aux: 0x777777,
    lightAux: 0x999999,
    guide: 0xaaaaaa,
    guideLight: 0xcccccc,
    grid: 0xeeeeee,

    red: 0xff0000,
    blue: 0x0000ff,
    green: 0x00aa00,
    cyan: 0x00aaaa,
    purple: 0xaa00aa,
    orange: 0xffa500,

    violet: 0x9370db,
    sky: 0x66b5ff,
    coral: 0xff6b6b,
    mint: 0x66c2a5,
    azure: 0x4dabf7
};

const TEXT = {
    black: '#111111',
    gray: '#777777',
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#aa00aa',
    orange: '#cc7a00',
    cyan: '#00aaaa'
};

const vec = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

function setLinePoints(line, points) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    if (line.geometry) {
        line.geometry.dispose();
    }

    line.geometry = geometry;

    if (typeof line.computeLineDistances === 'function') {
        line.computeLineDistances();
    }

    return line;
}

function createLine({
    color = COLORS.black,
    opacity = 1,
    dashed = false,
    dashSize = 0.14,
    gapSize = 0.08,
    points = []
} = {}) {
    const material = dashed
        ? new THREE.LineDashedMaterial({
            color,
            transparent: opacity < 1,
            opacity,
            dashSize,
            gapSize
        })
        : new THREE.LineBasicMaterial({
            color,
            transparent: opacity < 1,
            opacity
        });

    const line = new THREE.Line(new THREE.BufferGeometry(), material);
    if (points.length) setLinePoints(line, points);
    return line;
}

function createLineSegments(points = [], color = COLORS.black, opacity = 1) {
    const line = new THREE.LineSegments(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({
            color,
            transparent: opacity < 1,
            opacity
        })
    );
    if (points.length) setLinePoints(line, points);
    return line;
}

function createPoint(radius = 0.08, color = COLORS.black) {
    return new THREE.Mesh(
        new THREE.CircleGeometry(radius, 24),
        new THREE.MeshBasicMaterial({ color })
    );
}

function createPlaneRect(width = 1, height = 0.22, color = COLORS.black, opacity = 0.9) {
    return new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
            color,
            transparent: opacity < 1,
            opacity
        })
    );
}

function createCircleLoop(radius, color = COLORS.border, points = 128) {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius);
    return new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(points)),
        new THREE.LineBasicMaterial({ color })
    );
}

function createSemicircle(radius, yOffset = 0, color = COLORS.right, points = 128) {
    const curve = new THREE.EllipseCurve(0, yOffset, radius, radius, 0, Math.PI);
    return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(points)),
        new THREE.LineBasicMaterial({ color })
    );
}

function createAnchoredRect(fillMaterial, lineMaterial) {
    const group = new THREE.Group();

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1, 0);
    shape.lineTo(1, 1);
    shape.lineTo(0, 1);
    shape.lineTo(0, 0);

    const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), fillMaterial);

    const border = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
            vec(0, 0, 0),
            vec(1, 0, 0),
            vec(1, 1, 0),
            vec(0, 1, 0),
            vec(0, 0, 0)
        ]),
        lineMaterial
    );

    group.add(mesh, border);
    return group;
}

function createAnchoredBox(meshMaterial, edgeMaterial) {
    const group = new THREE.Group();
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0.5, 0.5, -0.5);

    const mesh = new THREE.Mesh(geo, meshMaterial);
    const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        edgeMaterial
    );

    group.add(mesh, edges);
    return group;
}

function createLabels(createLabel, names, color = TEXT.black) {
    const out = {};
    names.forEach((name) => {
        out[name] = createLabel(name, color);
    });
    return out;
}

function projectToLine(P, U, V) {
    const UV = new THREE.Vector3().subVectors(V, U);
    const t = new THREE.Vector3().subVectors(P, U).dot(UV) / UV.lengthSq();
    return U.clone().add(UV.multiplyScalar(t));
}

function sideUnit(U, V) {
    return new THREE.Vector3().subVectors(V, U).normalize();
}

function perpUnit(u) {
    return new THREE.Vector3(-u.y, u.x, 0).normalize();
}

function setRightAngleMarker(line, F, sideU, towardP, size = 0.24) {
    const n = perpUnit(sideU);
    if (n.dot(towardP) < 0) n.multiplyScalar(-1);

    const p1 = F.clone().add(sideU.clone().multiplyScalar(size));
    const p2 = p1.clone().add(n.clone().multiplyScalar(size));
    const p3 = F.clone().add(n.clone().multiplyScalar(size));

    setLinePoints(line, [F, p1, p2, p3]);
}

function makeFillMaterial(color, opacity = 0.45) {
    return new THREE.MeshBasicMaterial({
        color,
        transparent: opacity < 1,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false
    });
}

function makeLineMaterial(color, opacity = 1) {
    return new THREE.LineBasicMaterial({
        color,
        transparent: opacity < 1,
        opacity
    });
}

function createDoubleArrow({
    color = COLORS.gray,
    headLength = 0.28,
    headWidth = 0.14
} = {}) {
    const group = new THREE.Group();

    const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([vec(0, 0, 0), vec(0, 1, 0)]),
        new THREE.LineBasicMaterial({ color })
    );

    const headStart = new THREE.ArrowHelper(
        vec(0, -1, 0),
        vec(0, 0, 0),
        headLength,
        color,
        headLength,
        headWidth
    );

    const headEnd = new THREE.ArrowHelper(
        vec(0, 1, 0),
        vec(0, 1, 0),
        headLength,
        color,
        headLength,
        headWidth
    );

    group.add(line, headStart, headEnd);

    group.userData = {
        line,
        headStart,
        headEnd,
        headLength,
        headWidth
    };

    return group;
}

function setDoubleArrow(arrow, start, end) {
    const v = new THREE.Vector3().subVectors(end, start);
    const len = v.length();

    if (len < 1e-6) {
        arrow.visible = false;
        return;
    }

    arrow.visible = true;

    const dir = v.clone().normalize();
    const negDir = dir.clone().negate();

    const { line, headStart, headEnd, headLength, headWidth } = arrow.userData;

    setLinePoints(line, [start, end]);

    headStart.position.copy(start);
    headStart.setDirection(negDir);
    headStart.setLength(headLength, headLength, headWidth);

    headEnd.position.copy(end);
    headEnd.setDirection(dir);
    headEnd.setLength(headLength, headLength, headWidth);
}

function createMathGrid(scene, {
    size = 100,
    divisions = 100,
    centerColor = COLORS.guideLight,
    gridColor = COLORS.grid,
    z = -0.1
} = {}) {
    const grid = new THREE.GridHelper(size, divisions, centerColor, gridColor);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = z;
    scene.add(grid);
    return grid;
}

function createMathEngine(id, setupFn, updateFn, showGrid = true) {
    const container = document.getElementById(id);
    if (!container) return;

    const FIXED_WIDTH = 600;
    const FIXED_HEIGHT = container.classList.contains('tall') ? 600 : 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.bg);

    const camera = new THREE.PerspectiveCamera(
        45,
        FIXED_WIDTH / FIXED_HEIGHT,
        0.1,
        1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(FIXED_WIDTH, FIXED_HEIGHT, false);
    renderer.domElement.style.width = `${FIXED_WIDTH}px`;
    renderer.domElement.style.height = `${FIXED_HEIGHT}px`;
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(FIXED_WIDTH, FIXED_HEIGHT);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.left = '0px';
    labelRenderer.domElement.style.width = `${FIXED_WIDTH}px`;
    labelRenderer.domElement.style.height = `${FIXED_HEIGHT}px`;
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);

    container.style.width = `${FIXED_WIDTH}px`;
    container.style.height = `${FIXED_HEIGHT}px`;
    container.style.position = 'relative';
    container.style.overflow = 'hidden';

    const createLabel = (tex, color = TEXT.black) => {
        const div = document.createElement('div');
        div.style.background = 'transparent';
        div.style.color = color;
        div.style.position = 'absolute';
        div.style.userSelect = 'none';
        if (window.katex) {
            window.katex.render(tex, div);
        } else {
            div.textContent = tex;
        }
        return new CSS2DObject(div);
    };

    if (showGrid) {
        createMathGrid(scene);
    }

    const objects = setupFn(scene, createLabel);

    function animate() {
        requestAnimationFrame(animate);
        updateFn(performance.now() * 0.001, objects);
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }

    animate();
}

/* ===========================
   SCENES
   =========================== */

createMathEngine(
    'am-gm-viz',
    (scene, createLabel) => {
        const radiusA = 4.0;
        const radiusB0 = 1.5;

        // SHIFT EVERYTHING LEFT (main fix)
        const centerX_A = -4.0;

        const circleA = createCircleLoop(radiusA, COLORS.dark);
        circleA.position.x = centerX_A;

        const circleB = createCircleLoop(radiusB0, COLORS.dark);

        const diameterA = createLine({
            color: COLORS.gray,
            opacity: 0.25,
            points: [vec(centerX_A, -radiusA, 0), vec(centerX_A, radiusA, 0)]
        });

        const diameterB = createLine({ color: COLORS.gray, opacity: 0.25 });

        const axisO = createLine({
            color: COLORS.gray,
            points: [vec(centerX_A, -radiusA, 0), vec(centerX_A, radiusA, 0)]
        });

        const gmLine = createLine({ color: COLORS.blue });
        const amLine = createLine({ color: COLORS.red });
        const diffLine = createLine({ color: COLORS.green });

        const raSize = 0.4;
        const rightAngleIcon = createLineSegments([
            vec(0, raSize, 0), vec(raSize, raSize, 0),
            vec(raSize, raSize, 0), vec(raSize, 0, 0)
        ], COLORS.right);

        const leftArrowX = centerX_A - radiusA - 1.0;

        const aDimLine = createLine({
            color: COLORS.gray,
            points: [vec(leftArrowX, -radiusA, 0), vec(leftArrowX, radiusA, 0)]
        });

        const arrowA_up = new THREE.ArrowHelper(
            vec(0, 1, 0),
            vec(leftArrowX, radiusA, 0),
            0.35,
            COLORS.gray,
            0.35,
            0.18
        );

        const arrowA_down = new THREE.ArrowHelper(
            vec(0, -1, 0),
            vec(leftArrowX, -radiusA, 0),
            0.35,
            COLORS.gray,
            0.35,
            0.18
        );

        const rightArrowOffset = 0.9;
        const bHeadLen = 0.28;
        const bHeadWid = 0.14;

        const bDimLine = createLine({ color: COLORS.gray });

        const arrowB_up = new THREE.ArrowHelper(
            vec(0, 1, 0),
            vec(0, radiusB0, 0),
            bHeadLen,
            COLORS.gray,
            bHeadLen,
            bHeadWid
        );

        const arrowB_down = new THREE.ArrowHelper(
            vec(0, -1, 0),
            vec(0, -radiusB0, 0),
            bHeadLen,
            COLORS.gray,
            bHeadLen,
            bHeadWid
        );

        const tangentTop = createLine({
            color: COLORS.lightAux,
            opacity: 0.7,
            dashed: true,
            dashSize: 0.14,
            gapSize: 0.08,
            points: [vec(leftArrowX, radiusA, 0), vec(centerX_A, radiusA, 0)]
        });

        const tangentBottom = createLine({
            color: COLORS.lightAux,
            opacity: 0.7,
            dashed: true,
            dashSize: 0.14,
            gapSize: 0.08,
            points: [vec(leftArrowX, -radiusA, 0), vec(centerX_A, -radiusA, 0)]
        });

        const tangentSmallTop = createLine({
            color: COLORS.lightAux,
            opacity: 0.7,
            dashed: true,
            dashSize: 0.14,
            gapSize: 0.08
        });

        const tangentSmallBottom = createLine({
            color: COLORS.lightAux,
            opacity: 0.7,
            dashed: true,
            dashSize: 0.14,
            gapSize: 0.08
        });

        const centerA = createPoint(0.09, COLORS.black);
        const centerB = createPoint(0.09, COLORS.black);
        const projP = createPoint(0.09, COLORS.black);

        centerA.position.set(centerX_A, 0, 0.01);
        centerB.position.set(0, 0, 0.01);
        projP.position.set(centerX_A, 0, 0.01);

        const labelO = createLabel('O', TEXT.black);
        const labelOp = createLabel("O'", TEXT.black);
        const labelP = createLabel('P', TEXT.black);
        const labelA = createLabel('a', TEXT.black);
        const labelB = createLabel('b', TEXT.black);

        const amLabel = createLabel('\\frac{a+b}{2}', TEXT.red);
        const gmLabel = createLabel('\\sqrt{ab}', TEXT.blue);
        const diffLabel = createLabel('\\frac{a-b}{2}', TEXT.green);

        scene.add(
            circleA, circleB, diameterA, diameterB, axisO,
            gmLine, amLine, diffLine, rightAngleIcon,
            aDimLine, arrowA_up, arrowA_down, bDimLine, arrowB_up, arrowB_down,
            tangentTop, tangentBottom, tangentSmallTop, tangentSmallBottom,
            centerA, centerB, projP,
            labelO, labelOp, labelP, labelA, labelB,
            amLabel, gmLabel, diffLabel
        );

        return {
            circleB,
            diameterB,
            axisO,
            gmLine,
            amLine,
            diffLine,
            rightAngleIcon,
            bDimLine,
            arrowB_up,
            arrowB_down,
            tangentTop,
            tangentBottom,
            tangentSmallTop,
            tangentSmallBottom,
            centerB,
            projP,
            labelO,
            labelOp,
            labelP,
            labelA,
            labelB,
            amLabel,
            gmLabel,
            diffLabel,
            radiusA,
            radiusB0,
            centerX_A,
            leftArrowX,
            rightArrowOffset,
            bHeadLen,
            bHeadWid
        };
    },
    (time, obj) => {
        const R = obj.radiusA;
        const r0 = obj.radiusB0;

        const growT = 0.5 * (1 + Math.sin(time * 0.9));
        const r = r0 + (R - r0) * growT;

        const scale = r / r0;
        obj.circleB.scale.set(scale, scale, 1);

        const dist = R + r;

        const maxY = Math.max(0, R - r);
        const ratio = Math.min(1, maxY / dist);
        const maxAngle = Math.asin(ratio);
        const angle = Math.sin(time * 1.2) * maxAngle;

        const posX = obj.centerX_A + Math.cos(angle) * dist;
        const posY = Math.sin(angle) * dist;
        const rightArrowX = posX + r + obj.rightArrowOffset;

        obj.circleB.position.set(posX, posY, 0);

        setLinePoints(obj.diameterB, [
            vec(posX, posY - r, 0),
            vec(posX, posY + r, 0)
        ]);

        setLinePoints(obj.bDimLine, [
            vec(rightArrowX, posY - r, 0),
            vec(rightArrowX, posY + r, 0)
        ]);

        obj.arrowB_up.position.set(rightArrowX, posY + r, 0);
        obj.arrowB_down.position.set(rightArrowX, posY - r, 0);
        obj.arrowB_up.setLength(obj.bHeadLen, obj.bHeadLen, obj.bHeadWid);
        obj.arrowB_down.setLength(obj.bHeadLen, obj.bHeadLen, obj.bHeadWid);

        setLinePoints(obj.tangentSmallTop, [
            vec(posX, posY + r, 0),
            vec(rightArrowX, posY + r, 0)
        ]);

        setLinePoints(obj.tangentSmallBottom, [
            vec(posX, posY - r, 0),
            vec(rightArrowX, posY - r, 0)
        ]);

        obj.centerB.position.set(posX, posY, 0.01);
        obj.projP.position.set(obj.centerX_A, posY, 0.01);

        setLinePoints(obj.gmLine, [
            vec(obj.centerX_A, posY, 0),
            vec(posX, posY, 0)
        ]);

        const amPts = [vec(obj.centerX_A, 0, 0), vec(posX, posY, 0)];
        setLinePoints(obj.amLine, amPts);

        const greenOff = -0.15;
        setLinePoints(obj.diffLine, [
            vec(obj.centerX_A + greenOff, 0, 0),
            vec(obj.centerX_A + greenOff, posY, 0)
        ]);

        obj.rightAngleIcon.position.set(obj.centerX_A, posY, 0);
        obj.rightAngleIcon.scale.y = posY >= 0 ? 1 : -1;

        setLinePoints(obj.tangentTop, [
            vec(obj.leftArrowX, obj.radiusA, 0),
            vec(obj.centerX_A, obj.radiusA, 0)
        ]);

        setLinePoints(obj.tangentBottom, [
            vec(obj.leftArrowX, -obj.radiusA, 0),
            vec(obj.centerX_A, -obj.radiusA, 0)
        ]);

        obj.labelO.position.set(obj.centerX_A - 0.42, -0.45, 0);
        obj.labelOp.position.set(posX + 0.35, posY - 0.45, 0);
        obj.labelP.position.set(
            obj.centerX_A - 0.45,
            posY + (posY >= 0 ? 0.45 : -0.55),
            0
        );

        obj.labelA.position.set(obj.leftArrowX - 0.55, 0, 0);
        obj.labelB.position.set(rightArrowX + 0.45, posY, 0);

        obj.amLabel.position.lerpVectors(amPts[0], amPts[1], 0.5);
        obj.amLabel.position.x += 0.5;

        obj.gmLabel.position.set(
            obj.centerX_A + (posX - obj.centerX_A) / 2,
            posY - 0.7,
            0
        );

        obj.diffLabel.position.set(obj.centerX_A - 1.5, posY / 2, 0);
    },
    false
);
createMathEngine(
    'am-gm-semicircle',
    (scene, createLabel) => {
        const radius = 5.0;

        const semiLine = createSemicircle(radius, 0, COLORS.right);

        const diameterLine = createLine({
            color: COLORS.dark,
            points: [vec(-radius, 0, 0), vec(radius, 0, 0)]
        });

        const gmLine = createLine({ color: COLORS.blue });
        const amLine = createLine({ color: COLORS.red });

        const highA = createLine({ color: COLORS.violet, opacity: 0.6 });
        const highB = createLine({ color: COLORS.orange, opacity: 0.6 });
        const highDiff = createLine({ color: COLORS.green, opacity: 0.6 });

        const separator = createLine({
            color: 0x000000,
            opacity: 0.1,
            points: [vec(0, 0.1, 0), vec(0, -1.8, 0)]
        });

        const centerMarker = createLine({
            color: COLORS.red,
            opacity: 0.2,
            points: [vec(0, 0, 0), vec(0, -1.8, 0)]
        });

        const pointO = createPoint(0.08, COLORS.black);
        const pointA = createPoint(0.08, COLORS.black);
        const pointB = createPoint(0.08, COLORS.black);
        const pointP = createPoint(0.08, COLORS.black);
        const pointPp = createPoint(0.08, COLORS.black);

        pointO.position.set(0, 0, 0.01);
        pointA.position.set(-radius, 0, 0.01);
        pointB.position.set(radius, 0, 0.01);
        pointP.position.set(0, 0, 0.01);
        pointPp.position.set(radius, 0, 0.01);

        const amLab = createLabel('\\frac{a+b}{2}', TEXT.red);
        const gmLab = createLabel('\\sqrt{ab}', TEXT.blue);
        const labA = createLabel('a', '#7a59af');
        const labB = createLabel('b', TEXT.orange);
        const diffLab = createLabel('\\frac{|a-b|}{2}', TEXT.green);

        const labelO = createLabel('O', TEXT.black);
        const labelApt = createLabel('A', TEXT.black);
        const labelBpt = createLabel('B', TEXT.black);
        const labelP = createLabel('P', TEXT.black);
        const labelPp = createLabel("P'", TEXT.black);

        scene.add(
            semiLine,
            diameterLine,
            gmLine,
            amLine,
            highA,
            highB,
            highDiff,
            separator,
            centerMarker,
            pointO,
            pointA,
            pointB,
            pointP,
            pointPp,
            amLab,
            gmLab,
            labA,
            labB,
            diffLab,
            labelO,
            labelApt,
            labelBpt,
            labelP,
            labelPp
        );

        return {
            gmLine,
            amLine,
            highA,
            highB,
            highDiff,
            separator,
            amLab,
            gmLab,
            labA,
            labB,
            diffLab,
            pointP,
            pointPp,
            labelO,
            labelApt,
            labelBpt,
            labelP,
            labelPp,
            radius
        };
    },
    (time, obj) => {
        const x = Math.sin(time * 0.8) * (obj.radius - 1.0);
        const y = Math.sqrt(obj.radius * obj.radius - x * x);
        const trayY = -0.3;
        const diffY = -1.4;

        setLinePoints(obj.gmLine, [vec(x, 0, 0), vec(x, y, 0)]);
        setLinePoints(obj.amLine, [vec(0, 0, 0), vec(x, y, 0)]);

        setLinePoints(obj.highA, [vec(-obj.radius, trayY, 0), vec(x, trayY, 0)]);
        setLinePoints(obj.highB, [vec(x, trayY, 0), vec(obj.radius, trayY, 0)]);
        setLinePoints(obj.highDiff, [vec(0, diffY, 0), vec(x, diffY, 0)]);

        obj.separator.position.set(x, 0, 0);

        obj.pointP.position.set(x, y, 0.01);
        obj.pointPp.position.set(x, 0, 0.01);

        obj.labA.position.set((-obj.radius + x) / 2, trayY - 0.4, 0);
        obj.labB.position.set((obj.radius + x) / 2, trayY - 0.4, 0);

        obj.diffLab.visible = Math.abs(x) > 1.0;
        obj.diffLab.position.set(x / 2, diffY - 0.7, 0);

        obj.gmLab.position.set(x + 0.7, y / 2, 0);
        obj.amLab.position.lerpVectors(vec(0, 0, 0), vec(x, y, 0), 0.5);
        obj.amLab.position.y += 0.5;

        obj.labelO.position.set(-0.35, -0.45, 0);
        obj.labelApt.position.set(-obj.radius - 0.35, -0.45, 0);
        obj.labelBpt.position.set(obj.radius + 0.35, -0.45, 0);
        obj.labelP.position.set(x + 0.35, y + 0.35, 0);
        obj.labelPp.position.set(x + 0.35, -0.45, 0);
    },
    false
);

createMathEngine(
    'am-gm-qm-semicircle',
    (scene, createLabel) => {
        const radius = 7.0;
        const yOffset = -0.45 * radius;

        const semiLine = createSemicircle(radius, yOffset, COLORS.right);

        const diameterLine = createLine({
            color: COLORS.dark,
            points: [vec(-radius, yOffset, 0), vec(radius, yOffset, 0)]
        });

        const gmLine = createLine({ color: COLORS.blue });
        const amLine = createLine({ color: COLORS.red });
        const qmLine = createLine({ color: COLORS.cyan });

        const highA = createLine({ color: COLORS.violet, opacity: 0.6 });
        const highB = createLine({ color: COLORS.orange, opacity: 0.6 });
        const highDiff = createLine({ color: COLORS.green, opacity: 0.6 });

        const separator = createLine({
            color: 0x000000,
            opacity: 0.1,
            points: [vec(0, yOffset + 0.1, 0), vec(0, yOffset - 2.0, 0)]
        });

        const centerMarker = createLine({
            color: COLORS.red,
            opacity: 0.2,
            points: [vec(0, yOffset, 0), vec(0, yOffset - 2.0, 0)]
        });

        const omLine = createLine({
            color: COLORS.red,
            points: [vec(0, yOffset, 0), vec(0, yOffset + radius, 0)]
        });

        const pointO = createPoint(0.08, COLORS.black);
        const pointA = createPoint(0.08, COLORS.black);
        const pointB = createPoint(0.08, COLORS.black);
        const pointP = createPoint(0.08, COLORS.black);
        const pointPp = createPoint(0.08, COLORS.black);
        const pointM = createPoint(0.08, COLORS.black);

        pointO.position.set(0, yOffset, 0.01);
        pointA.position.set(-radius, yOffset, 0.01);
        pointB.position.set(radius, yOffset, 0.01);
        pointP.position.set(0, yOffset, 0.01);
        pointPp.position.set(radius, yOffset, 0.01);
        pointM.position.set(0, yOffset + radius, 0.01);

        const amLab = createLabel('\\frac{a+b}{2}', TEXT.red);
        const omLab = createLabel('\\frac{a+b}{2}', TEXT.red);
        const gmLab = createLabel('\\sqrt{ab}', TEXT.blue);
        const qmLab = createLabel('\\sqrt{\\frac{a^2+b^2}{2}}', TEXT.cyan);

        const labA = createLabel('a', '#7a59af');
        const labB = createLabel('b', TEXT.orange);
        const diffLab = createLabel('\\frac{|a-b|}{2}', TEXT.green);

        const labelO = createLabel('O', TEXT.black);
        const labelApt = createLabel('A', TEXT.black);
        const labelBpt = createLabel('B', TEXT.black);
        const labelP = createLabel('P', TEXT.black);
        const labelPp = createLabel("P'", TEXT.black);
        const labelM = createLabel('M', TEXT.black);

        scene.add(
            semiLine,
            diameterLine,
            omLine,
            gmLine,
            amLine,
            qmLine,
            highA,
            highB,
            highDiff,
            separator,
            centerMarker,
            pointO,
            pointA,
            pointB,
            pointP,
            pointPp,
            pointM,
            amLab,
            omLab,
            gmLab,
            qmLab,
            labA,
            labB,
            diffLab,
            labelO,
            labelApt,
            labelBpt,
            labelP,
            labelPp,
            labelM
        );

        return {
            gmLine,
            amLine,
            omLine,
            qmLine,
            highA,
            highB,
            highDiff,
            separator,
            amLab,
            omLab,
            gmLab,
            qmLab,
            labA,
            labB,
            diffLab,
            pointP,
            pointPp,
            labelO,
            labelApt,
            labelBpt,
            labelP,
            labelPp,
            labelM,
            radius,
            yOffset
        };
    },
    (time, obj) => {
        const x = Math.sin(time * 0.8) * (obj.radius - 1.0);
        const y = obj.yOffset + Math.sqrt(obj.radius * obj.radius - x * x);
        const trayY = obj.yOffset - 0.3;
        const diffY = obj.yOffset - 1.6;

        const O = vec(0, obj.yOffset, 0);
        const P = vec(x, y, 0);
        const Pp = vec(x, obj.yOffset, 0);
        const M = vec(0, obj.yOffset + obj.radius, 0);

        setLinePoints(obj.gmLine, [Pp, P]);
        setLinePoints(obj.amLine, [O, P]);
        setLinePoints(obj.omLine, [O, M]);
        setLinePoints(obj.qmLine, [Pp, M]);

        setLinePoints(obj.highA, [vec(-obj.radius, trayY, 0), vec(x, trayY, 0)]);
        setLinePoints(obj.highB, [vec(x, trayY, 0), vec(obj.radius, trayY, 0)]);
        setLinePoints(obj.highDiff, [vec(0, diffY, 0), vec(x, diffY, 0)]);

        obj.separator.position.set(x, obj.yOffset, 0);

        obj.pointP.position.set(x, y, 0.01);
        obj.pointPp.position.set(x, obj.yOffset, 0.01);

        obj.labA.position.set((-obj.radius + x) / 2, trayY - 0.45, 0);
        obj.labB.position.set((obj.radius + x) / 2, trayY - 0.45, 0);

        obj.diffLab.visible = Math.abs(x) > 1.0;
        obj.diffLab.position.set(x / 2, diffY - 0.75, 0);

        obj.gmLab.position.set(x + 0.7, (obj.yOffset + y) / 2, 0);

        obj.amLab.position.lerpVectors(O, P, 0.5);
        obj.amLab.position.y += 0.6;
        obj.amLab.position.x += (x >= 0 ? 0.7 : -0.7);

        obj.omLab.position.set(
            (x >= 0 ? -0.9 : 0.9),
            obj.yOffset + obj.radius / 2,
            0
        );

        obj.qmLab.position.lerpVectors(Pp, M, 0.5);
        obj.qmLab.position.x += (x >= 0 ? 1.0 : -1.0);

        obj.labelO.position.set(-0.35, obj.yOffset - 0.5, 0);
        obj.labelApt.position.set(-obj.radius - 0.4, obj.yOffset - 0.5, 0);
        obj.labelBpt.position.set(obj.radius + 0.4, obj.yOffset - 0.5, 0);
        obj.labelP.position.set(x + 0.35, y + 0.4, 0);
        obj.labelPp.position.set(x + 0.35, obj.yOffset - 0.5, 0);
        obj.labelM.position.set(0.35, obj.yOffset + obj.radius + 0.4, 0);
    },
    false
);

createMathEngine(
    'hm-am-gm-qm-semicircle',
    (scene, createLabel) => {
        const radius = 7.0;
        const yOffset = -0.45 * radius;

        const semiLine = createSemicircle(radius, yOffset, COLORS.right);

        const diameterLine = createLine({
            color: COLORS.dark,
            points: [vec(-radius, yOffset, 0), vec(radius, yOffset, 0)]
        });

        const gmLine = createLine({ color: COLORS.blue });
        const amLine = createLine({ color: COLORS.red });
        const qmLine = createLine({ color: COLORS.cyan });

        const pPrimeNLine = createLine({ color: COLORS.black, opacity: 0.6 });
        const pnLine = createLine({ color: COLORS.purple });

        const highA = createLine({ color: COLORS.violet, opacity: 0.6 });
        const highB = createLine({ color: COLORS.orange, opacity: 0.6 });
        const highDiff = createLine({ color: COLORS.green, opacity: 0.6 });

        const separator = createLine({
            color: 0x000000,
            opacity: 0.1,
            points: [vec(0, yOffset + 0.1, 0), vec(0, yOffset - 2.0, 0)]
        });

        const centerMarker = createLine({
            color: COLORS.red,
            opacity: 0.2,
            points: [vec(0, yOffset, 0), vec(0, yOffset - 2.0, 0)]
        });

        const omLine = createLine({
            color: COLORS.red,
            points: [vec(0, yOffset, 0), vec(0, yOffset + radius, 0)]
        });

        const pointO = createPoint(0.08, COLORS.black);
        const pointA = createPoint(0.08, COLORS.black);
        const pointB = createPoint(0.08, COLORS.black);
        const pointP = createPoint(0.08, COLORS.black);
        const pointPp = createPoint(0.08, COLORS.black);
        const pointM = createPoint(0.08, COLORS.black);
        const pointN = createPoint(0.08, COLORS.black);

        pointO.position.set(0, yOffset, 0.01);
        pointA.position.set(-radius, yOffset, 0.01);
        pointB.position.set(radius, yOffset, 0.01);
        pointP.position.set(0, yOffset, 0.01);
        pointPp.position.set(radius, yOffset, 0.01);
        pointM.position.set(0, yOffset + radius, 0.01);
        pointN.position.set(0, yOffset, 0.01);

        const omLab = createLabel('\\frac{a+b}{2}', TEXT.red);
        const gmLab = createLabel('\\sqrt{ab}', TEXT.blue);
        const qmLab = createLabel('\\sqrt{\\frac{a^2+b^2}{2}}', TEXT.cyan);
        const hmLab = createLabel('\\frac{2ab}{a+b}', TEXT.purple);

        const labA = createLabel('a', '#7a59af');
        const labB = createLabel('b', TEXT.orange);
        const diffLab = createLabel('\\frac{|a-b|}{2}', TEXT.green);

        const labelO = createLabel('O', TEXT.black);
        const labelApt = createLabel('A', TEXT.black);
        const labelBpt = createLabel('B', TEXT.black);
        const labelP = createLabel('P', TEXT.black);
        const labelPp = createLabel("P'", TEXT.black);
        const labelM = createLabel('M', TEXT.black);
        const labelN = createLabel('N', TEXT.black);

        const rightAngleMarker = createLineSegments([], COLORS.border);

        scene.add(
            semiLine,
            diameterLine,
            omLine,
            gmLine,
            amLine,
            qmLine,
            pPrimeNLine,
            pnLine,
            highA,
            highB,
            highDiff,
            separator,
            centerMarker,
            pointO,
            pointA,
            pointB,
            pointP,
            pointPp,
            pointM,
            pointN,
            omLab,
            gmLab,
            qmLab,
            hmLab,
            labA,
            labB,
            diffLab,
            labelO,
            labelApt,
            labelBpt,
            labelP,
            labelPp,
            labelM,
            labelN,
            rightAngleMarker
        );

        return {
            gmLine,
            amLine,
            omLine,
            qmLine,
            pPrimeNLine,
            pnLine,
            highA,
            highB,
            highDiff,
            separator,
            omLab,
            gmLab,
            qmLab,
            hmLab,
            labA,
            labB,
            diffLab,
            pointP,
            pointPp,
            pointN,
            labelO,
            labelApt,
            labelBpt,
            labelP,
            labelPp,
            labelM,
            labelN,
            rightAngleMarker,
            radius,
            yOffset,
            raSize: 0.28
        };
    },
    (time, obj) => {
        const x = Math.sin(time * 0.8) * (obj.radius - 1.0);
        const y = obj.yOffset + Math.sqrt(obj.radius * obj.radius - x * x);
        const trayY = obj.yOffset - 0.3;
        const diffY = obj.yOffset - 1.6;

        const O = vec(0, obj.yOffset, 0);
        const P = vec(x, y, 0);
        const Pp = vec(x, obj.yOffset, 0);
        const M = vec(0, obj.yOffset + obj.radius, 0);

        const OP = new THREE.Vector3().subVectors(P, O);
        const OP_len2 = OP.lengthSq();
        const t = OP_len2 > 1e-9
            ? new THREE.Vector3().subVectors(Pp, O).dot(OP) / OP_len2
            : 0;
        const N = O.clone().add(OP.clone().multiplyScalar(t));

        setLinePoints(obj.gmLine, [Pp, P]);
        setLinePoints(obj.amLine, [O, P]);
        setLinePoints(obj.omLine, [O, M]);
        setLinePoints(obj.qmLine, [Pp, M]);
        setLinePoints(obj.pPrimeNLine, [Pp, N]);
        setLinePoints(obj.pnLine, [P, N]);

        setLinePoints(obj.highA, [vec(-obj.radius, trayY, 0), vec(x, trayY, 0)]);
        setLinePoints(obj.highB, [vec(x, trayY, 0), vec(obj.radius, trayY, 0)]);
        setLinePoints(obj.highDiff, [vec(0, diffY, 0), vec(x, diffY, 0)]);

        obj.separator.position.set(x, obj.yOffset, 0);

        obj.pointP.position.set(x, y, 0.01);
        obj.pointPp.position.set(x, obj.yOffset, 0.01);
        obj.pointN.position.copy(N).setZ(0.01);

        obj.labA.position.set((-obj.radius + x) / 2, trayY - 0.45, 0);
        obj.labB.position.set((obj.radius + x) / 2, trayY - 0.45, 0);

        obj.diffLab.visible = Math.abs(x) > 1.0;
        obj.diffLab.position.set(x / 2, diffY - 0.75, 0);

        obj.gmLab.position.set(x + 0.7, (obj.yOffset + y) / 2, 0);

        obj.qmLab.position.lerpVectors(Pp, M, 0.5);
        obj.qmLab.position.x += (x >= 0 ? 1.0 : -1.0);

        obj.omLab.position.set(
            (x >= 0 ? 0.9 : -0.9),
            obj.yOffset + obj.radius / 2,
            0
        );

        obj.hmLab.position.lerpVectors(P, N, 0.5);
        obj.hmLab.position.x += (x >= 0 ? 0.8 : -0.8);

        obj.labelO.position.set(-0.35, obj.yOffset - 0.5, 0);
        obj.labelApt.position.set(-obj.radius - 0.4, obj.yOffset - 0.5, 0);
        obj.labelBpt.position.set(obj.radius + 0.4, obj.yOffset - 0.5, 0);
        obj.labelP.position.set(x + 0.35, y + 0.4, 0);
        obj.labelPp.position.set(x + 0.35, obj.yOffset - 0.5, 0);
        obj.labelM.position.set(0.35, obj.yOffset + obj.radius + 0.4, 0);
        obj.labelN.position.set(N.x + 0.35, N.y + (x >= 0 ? -0.45 : 0.35), 0);

        const npDir = new THREE.Vector3().subVectors(P, N).normalize();
        const npPrimeDir = new THREE.Vector3().subVectors(Pp, N).normalize();
        const s = obj.raSize;

        const p1 = N.clone().add(npDir.clone().multiplyScalar(s));
        const p2 = p1.clone().add(npPrimeDir.clone().multiplyScalar(s));
        const p3 = N.clone().add(npPrimeDir.clone().multiplyScalar(s));

        setLinePoints(obj.rightAngleMarker, [p1, p2, p2, p3]);
    },
    false
);

createMathEngine(
    'am-gm-squares',
    (scene, createLabel) => {
        const sideAM = 4.5;
        const spacing = 5.5;

        const leftX = -(sideAM + spacing / 2);
        const rightX = spacing / 2;
        const groundY = -sideAM / 2;
        const z = 0;

        const squareMat = makeFillMaterial(COLORS.sky, 0.12);
        const fillMat = makeFillMaterial(COLORS.sky, 0.45);

        const squareBorderMat = makeLineMaterial(COLORS.border, 0.5);
        const rectBorderMat = makeLineMaterial(COLORS.sky);

        const square = createAnchoredRect(squareMat, squareBorderMat);
        square.scale.set(sideAM, sideAM, 1);
        square.position.set(leftX, groundY, z);

        const squareFill = createAnchoredRect(fillMat, rectBorderMat);
        squareFill.scale.set(sideAM, 1, 1);
        squareFill.position.set(leftX, groundY, z);

        const rectangle = createAnchoredRect(fillMat, rectBorderMat);
        rectangle.position.set(rightX, groundY, z);

        const collinearGuide = createLine({
            color: COLORS.guide,
            opacity: 0.6,
            dashed: true,
            dashSize: 0.12,
            gapSize: 0.10,
            points: [vec(leftX, groundY, z + 0.01), vec(rightX + sideAM, groundY, z + 0.01)]
        });

        const arrowSideAM = createDoubleArrow({ color: COLORS.gray });
        const arrowA = createDoubleArrow({ color: COLORS.gray });
        const arrowB = createDoubleArrow({ color: COLORS.gray });

        const squarePts = createLabels(createLabel, ['A', 'B', 'C', 'D'], TEXT.gray);
        const rectPts = createLabels(createLabel, ["A'", "B'", "C'", "D'"], TEXT.gray);

        const labelSideAM = createLabel('\\frac{a+b}{2}', TEXT.black);
        const labelA = createLabel('a', TEXT.black);
        const labelB = createLabel('b', TEXT.black);

        const labelSquareArea = createLabel(
            'A_{\\text{square}}=\\left(\\frac{a+b}{2}\\right)^2',
            TEXT.black
        );

        const labelRectArea = createLabel(
            '\\mathbf{A}_{\\textbf{rect}}=\\mathbf{ab}',
            TEXT.black
        );

        scene.add(
            square,
            squareFill,
            rectangle,
            collinearGuide,
            arrowSideAM,
            arrowA,
            arrowB,
            labelSideAM,
            labelA,
            labelB,
            labelSquareArea,
            labelRectArea,
            ...Object.values(squarePts),
            ...Object.values(rectPts)
        );

        return {
            sideAM,
            leftX,
            rightX,
            groundY,
            z,
            squareFill,
            rectangle,
            collinearGuide,
            arrowSideAM,
            arrowA,
            arrowB,
            labelSideAM,
            labelA,
            labelB,
            labelSquareArea,
            labelRectArea,
            squarePts,
            rectPts
        };
    },
    (time, obj) => {
        const t = Math.sin(time * 0.9) * 1.25;

        const a = obj.sideAM + t;
        const b = 2 * obj.sideAM - a;

        const area = a * b;
        const fillHeight = area / obj.sideAM;

        obj.rectangle.scale.set(a, b, 1);
        obj.squareFill.scale.set(obj.sideAM, fillHeight, 1);

        const eps = 0.18;

        const placeQuadLabels = (labels, x, y, w, h) => {
            if (labels.A) labels.A.position.set(x - eps, y - eps, 0.05);
            if (labels.B) labels.B.position.set(x + w + eps, y - eps, 0.05);
            if (labels.C) labels.C.position.set(x + w + eps, y + h + eps, 0.05);
            if (labels.D) labels.D.position.set(x - eps, y + h + eps, 0.05);

            if (labels["A'"]) labels["A'"].position.set(x - eps, y - eps, 0.05);
            if (labels["B'"]) labels["B'"].position.set(x + w + eps, y - eps, 0.05);
            if (labels["C'"]) labels["C'"].position.set(x + w + eps, y + h + eps, 0.05);
            if (labels["D'"]) labels["D'"].position.set(x - eps, y + h + eps, 0.05);
        };

        placeQuadLabels(obj.squarePts, obj.leftX, obj.groundY, obj.sideAM, obj.sideAM);
        placeQuadLabels(obj.rectPts, obj.rightX, obj.groundY, a, b);

        setLinePoints(obj.collinearGuide, [
            vec(obj.leftX, obj.groundY, obj.z + 0.01),
            vec(obj.rightX + a, obj.groundY, obj.z + 0.01)
        ]);

        setDoubleArrow(
            obj.arrowSideAM,
            vec(obj.leftX - 0.85, obj.groundY, obj.z + 0.01),
            vec(obj.leftX - 0.85, obj.groundY + obj.sideAM, obj.z + 0.01)
        );

        setDoubleArrow(
            obj.arrowA,
            vec(obj.rightX, obj.groundY - 0.55, obj.z + 0.01),
            vec(obj.rightX + a, obj.groundY - 0.55, obj.z + 0.01)
        );

        setDoubleArrow(
            obj.arrowB,
            vec(obj.rightX - 0.65, obj.groundY, obj.z + 0.01),
            vec(obj.rightX - 0.65, obj.groundY + b, obj.z + 0.01)
        );

        obj.labelSideAM.position.set(
            obj.leftX - 1.7,
            obj.groundY + obj.sideAM / 2,
            obj.z + 0.05
        );

        obj.labelA.position.set(
            obj.rightX + a / 2,
            obj.groundY - 0.9,
            obj.z + 0.05
        );

        obj.labelB.position.set(
            obj.rightX - 0.95,
            obj.groundY + b / 2,
            obj.z + 0.05
        );

        obj.labelSquareArea.position.set(
            obj.leftX + obj.sideAM / 2,
            obj.groundY + obj.sideAM + 1.25,
            obj.z + 0.05
        );

        obj.labelRectArea.position.set(
            obj.leftX + obj.sideAM / 2,
            obj.groundY + fillHeight / 2,
            obj.z + 0.05
        );
    },
    false
);

createMathEngine(
    'am-gm-cubes',
    (scene, createLabel) => {
        const sideAM = 4.5;
        const spacing = 6;

        const leftX = -(sideAM + spacing / 2);
        const rightX = spacing / 2;
        const groundY = -sideAM / 2;
        const frontZ = 0;

        const liquidMat = makeFillMaterial(COLORS.sky, 0.45);
        const prismEdgeMat = new THREE.LineBasicMaterial({ color: COLORS.sky });

        const cube = createAnchoredBox(
            new THREE.MeshBasicMaterial({
                color: COLORS.border,
                transparent: true,
                opacity: 0.10,
                depthWrite: false
            }),
            new THREE.LineBasicMaterial({
                color: COLORS.border,
                transparent: true,
                opacity: 0.35
            })
        );
        cube.scale.set(sideAM, sideAM, sideAM);
        cube.position.set(leftX, groundY, frontZ);

        const cubeFill = createAnchoredBox(liquidMat, prismEdgeMat);
        cubeFill.scale.set(sideAM, 1, sideAM);
        cubeFill.position.set(leftX, groundY, frontZ);

        const prism = createAnchoredBox(liquidMat, prismEdgeMat);
        prism.position.set(rightX, groundY, frontZ);

        const collinearGuide = createLine({
            color: COLORS.guide,
            opacity: 0.6,
            dashed: true,
            dashSize: 0.12,
            gapSize: 0.10,
            points: [vec(leftX, groundY, frontZ + 0.015), vec(rightX + sideAM, groundY, frontZ + 0.015)]
        });

        const arrowSideAM = createDoubleArrow({ color: COLORS.gray });
        const arrowA = createDoubleArrow({ color: COLORS.gray });
        const arrowB = createDoubleArrow({ color: COLORS.gray });
        const arrowC = createDoubleArrow({ color: COLORS.gray });

        const cubeCorners = createLabels(
            createLabel,
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            TEXT.gray
        );

        const prismCorners = createLabels(
            createLabel,
            ["A'", "B'", "C'", "D'", "E'", "F'", "G'", "H'"],
            TEXT.gray
        );

        const labelSideAM = createLabel('\\frac{a+b+c}{3}', TEXT.black);
        const labelA = createLabel('a', TEXT.black);
        const labelB = createLabel('b', TEXT.black);
        const labelC = createLabel('c', TEXT.black);

        const labelVSquare = createLabel(
            '\\mathrm{V}_{\\text{cube}}=\\left(\\frac{a+b+c}{3}\\right)^3',
            TEXT.black
        );

        const labelVPrism = createLabel(
            '\\mathbf{V}_{\\mathbf{prism}}=\\mathbf{abc}',
            TEXT.black
        );

        scene.add(
            cube,
            cubeFill,
            prism,
            collinearGuide,
            arrowSideAM,
            arrowA,
            arrowB,
            arrowC,
            labelSideAM,
            labelA,
            labelB,
            labelC,
            labelVSquare,
            labelVPrism,
            ...Object.values(cubeCorners),
            ...Object.values(prismCorners)
        );

        return {
            sideAM,
            leftX,
            rightX,
            groundY,
            frontZ,
            cubeFill,
            prism,
            collinearGuide,
            arrowSideAM,
            arrowA,
            arrowB,
            arrowC,
            labelSideAM,
            labelA,
            labelB,
            labelC,
            labelVSquare,
            labelVPrism,
            cubeCorners,
            prismCorners
        };
    },
    (time, obj) => {
        const t1 = Math.sin(time * 0.7) * 1.5;
        const t2 = Math.cos(time * 0.9) * 1.5;

        const a = obj.sideAM + t1;
        const b = obj.sideAM + t2;
        const c = 3 * obj.sideAM - a - b;

        const volume = a * b * c;
        const fillHeight = volume / (obj.sideAM * obj.sideAM);

        obj.prism.scale.set(a, b, c);
        obj.cubeFill.scale.set(obj.sideAM, fillHeight, obj.sideAM);

        const eps = 0.22;

        const placeBoxCorners = (labels, x, y, z, w, h, d) => {
            if (labels.A) labels.A.position.set(x - eps, y - eps, z + eps);
            if (labels.B) labels.B.position.set(x + w + eps, y - eps, z + eps);
            if (labels.C) labels.C.position.set(x + w + eps, y + h + eps, z + eps);
            if (labels.D) labels.D.position.set(x - eps, y + h + eps, z + eps);

            if (labels.E) labels.E.position.set(x - eps, y - eps, z - d - eps);
            if (labels.F) labels.F.position.set(x + w + eps, y - eps, z - d - eps);
            if (labels.G) labels.G.position.set(x + w + eps, y + h + eps, z - d - eps);
            if (labels.H) labels.H.position.set(x - eps, y + h + eps, z - d - eps);

            if (labels["A'"]) labels["A'"].position.set(x - eps, y - eps, z + eps);
            if (labels["B'"]) labels["B'"].position.set(x + w + eps, y - eps, z + eps);
            if (labels["C'"]) labels["C'"].position.set(x + w + eps, y + h + eps, z + eps);
            if (labels["D'"]) labels["D'"].position.set(x - eps, y + h + eps, z + eps);

            if (labels["E'"]) labels["E'"].position.set(x - eps, y - eps, z - d - eps);
            if (labels["F'"]) labels["F'"].position.set(x + w + eps, y - eps, z - d - eps);
            if (labels["G'"]) labels["G'"].position.set(x + w + eps, y + h + eps, z - d - eps);
            if (labels["H'"]) labels["H'"].position.set(x - eps, y + h + eps, z - d - eps);
        };

        placeBoxCorners(
            obj.cubeCorners,
            obj.leftX,
            obj.groundY,
            obj.frontZ,
            obj.sideAM,
            obj.sideAM,
            obj.sideAM
        );

        placeBoxCorners(
            obj.prismCorners,
            obj.rightX,
            obj.groundY,
            obj.frontZ,
            a,
            b,
            c
        );

        const guideZ = obj.frontZ + 0.015;
        setLinePoints(obj.collinearGuide, [
            vec(obj.leftX, obj.groundY, guideZ),
            vec(obj.rightX + a, obj.groundY, guideZ)
        ]);

        setDoubleArrow(
            obj.arrowSideAM,
            vec(obj.leftX - 0.9, obj.groundY, obj.frontZ + 0.01),
            vec(obj.leftX - 0.9, obj.groundY + obj.sideAM, obj.frontZ + 0.01)
        );

        setDoubleArrow(
            obj.arrowA,
            vec(obj.rightX, obj.groundY - 0.65, obj.frontZ + 0.02),
            vec(obj.rightX + a, obj.groundY - 0.65, obj.frontZ + 0.02)
        );

        setDoubleArrow(
            obj.arrowB,
            vec(obj.rightX - 0.7, obj.groundY, obj.frontZ + 0.02),
            vec(obj.rightX - 0.7, obj.groundY + b, obj.frontZ + 0.02)
        );

        setDoubleArrow(
            obj.arrowC,
            vec(obj.rightX + a + 0.7, obj.groundY, obj.frontZ),
            vec(obj.rightX + a + 0.7, obj.groundY, obj.frontZ - c)
        );

        obj.labelSideAM.position.set(
            obj.leftX - 2.0,
            obj.groundY + obj.sideAM / 2,
            obj.frontZ + 0.1
        );

        obj.labelA.position.set(
            obj.rightX + a / 2,
            obj.groundY - 1.0,
            obj.frontZ + 0.1
        );

        obj.labelB.position.set(
            obj.rightX - 1.0,
            obj.groundY + b / 2,
            obj.frontZ + 0.1
        );

        obj.labelC.position.set(
            obj.rightX + a + 1.0,
            obj.groundY - 0.05,
            obj.frontZ - c / 2
        );

        obj.labelVSquare.position.set(
            obj.leftX + obj.sideAM / 2,
            obj.groundY + obj.sideAM + 1.45,
            obj.frontZ + 0.1
        );

        obj.labelVPrism.position.set(
            obj.leftX + obj.sideAM / 2,
            obj.groundY + fillHeight / 2,
            obj.frontZ + 0.1
        );
    },
    false
);

createMathEngine(
    'abc-squares-overlap',
    (scene, createLabel) => {
        const a = 5.0;
        const b0 = 3.2;
        const c0 = 1.8;

        const originX = -7.5;
        const originY = -3.0;
        const z = 0;

        const createRect = (fillColor, fillOpacity, lineColor, lineOpacity = 1) => {
            const group = new THREE.Group();

            const shape = new THREE.Shape();
            shape.moveTo(0, 0);
            shape.lineTo(1, 0);
            shape.lineTo(1, 1);
            shape.lineTo(0, 1);
            shape.lineTo(0, 0);

            const fill = new THREE.Mesh(
                new THREE.ShapeGeometry(shape),
                new THREE.MeshBasicMaterial({
                    color: fillColor,
                    transparent: true,
                    opacity: fillOpacity,
                    side: THREE.DoubleSide,
                    depthWrite: false
                })
            );

            const border = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                    vec(0, 0, 0),
                    vec(1, 0, 0),
                    vec(1, 1, 0),
                    vec(0, 1, 0),
                    vec(0, 0, 0)
                ]),
                new THREE.LineBasicMaterial({
                    color: lineColor,
                    transparent: true,
                    opacity: lineOpacity
                })
            );

            group.add(fill, border);
            return group;
        };

        const squareA = createRect(COLORS.bg, 0.12, 0x223344, 0.9);
        const squareB = createRect(COLORS.bg, 0.12, 0x223344, 0.9);
        const squareC = createRect(COLORS.bg, 0.12, 0x223344, 0.9);

        const rectAB = createRect(COLORS.coral, 0.40, COLORS.coral, 0.9);
        const rectAC = createRect(COLORS.mint, 0.40, COLORS.mint, 0.9);
        const rectBC = createRect(COLORS.azure, 0.40, COLORS.azure, 0.9);

        const guideB = createLine({
            color: 0x888888,
            opacity: 0.55,
            dashed: true,
            dashSize: 0.18,
            gapSize: 0.10
        });

        const guideC = createLine({
            color: 0x888888,
            opacity: 0.55,
            dashed: true,
            dashSize: 0.18,
            gapSize: 0.10
        });

        const pointNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
        const pointLabels = {};
        const pointMarkers = {};

        pointNames.forEach((name) => {
            pointLabels[name] = createLabel(name, TEXT.black);
            pointMarkers[name] = createPoint(0.07, COLORS.black);
            scene.add(pointLabels[name], pointMarkers[name]);
        });

        const labelTotalArea = createLabel('A_{\\text{AHIJFGCD}}=a^2+b^2+c^2', TEXT.black);
        const labelRects1 = createLabel('A_{\\text{ABGM}}+A_{\\text{BEFG}}+A_{\\text{ABKL}}=', TEXT.black);
        const labelRects2 = createLabel('=ab+bc+ca', TEXT.black);

        const labelSegA = createLabel('a', TEXT.black);
        const labelSegB = createLabel('b', TEXT.black);
        const labelSegC = createLabel('c', TEXT.black);

        squareA.position.set(originX, originY, z);
        rectAB.position.set(originX, originY, z + 0.01);
        rectAC.position.set(originX, originY, z + 0.02);

        scene.add(
            squareA, squareB, squareC,
            rectAB, rectAC, rectBC,
            guideB, guideC,
            labelTotalArea, labelRects1, labelRects2,
            labelSegA, labelSegB, labelSegC
        );

        return {
            a,
            b0,
            c0,
            originX,
            originY,
            squareA,
            squareB,
            squareC,
            rectAB,
            rectAC,
            rectBC,
            guideB,
            guideC,
            pointLabels,
            pointMarkers,
            labelTotalArea,
            labelRects1,
            labelRects2,
            labelSegA,
            labelSegB,
            labelSegC
        };
    },
    (time, obj) => {
        const a = obj.a;
        const u = (Math.sin(time * 0.55) + 1) / 2;
        const b = obj.b0 + (a - obj.b0) * u;
        const c = obj.c0 + (a - obj.c0) * u;

        const x0 = obj.originX;
        const y0 = obj.originY;

        const A = vec(x0, y0, 0);
        const B = vec(x0 + a, y0, 0);
        const E = vec(x0 + a + b, y0, 0);
        const H = vec(x0 + a + b + c, y0, 0);

        const D = vec(x0, y0 + a, 0);
        const C = vec(x0 + a, y0 + a, 0);

        const M = vec(x0, y0 + b, 0);
        const G = vec(x0 + a, y0 + b, 0);
        const F = vec(x0 + a + b, y0 + b, 0);

        const L = vec(x0, y0 + c, 0);
        const K = vec(x0 + a, y0 + c, 0);
        const J = vec(x0 + a + b, y0 + c, 0);
        const I = vec(x0 + a + b + c, y0 + c, 0);

        obj.squareA.scale.set(a, a, 1);
        obj.squareA.position.set(x0, y0, 0);

        obj.squareB.scale.set(b, b, 1);
        obj.squareB.position.set(x0 + a, y0, 0);

        obj.squareC.scale.set(c, c, 1);
        obj.squareC.position.set(x0 + a + b, y0, 0);

        obj.rectAB.scale.set(a, b, 1);
        obj.rectAB.position.set(x0, y0, 0.01);

        obj.rectAC.scale.set(a, c, 1);
        obj.rectAC.position.set(x0, y0, 0.02);

        obj.rectBC.scale.set(b, c, 1);
        obj.rectBC.position.set(x0 + a, y0, 0.03);

        setLinePoints(obj.guideB, [vec(x0, y0 + b, 0), vec(x0 + a + b, y0 + b, 0)]);
        setLinePoints(obj.guideC, [vec(x0, y0 + c, 0), vec(x0 + a + b + c, y0 + c, 0)]);

        const pts = { A, B, C, D, E, F, G, H, I, J, K, L, M };
        Object.entries(pts).forEach(([name, p]) => {
            obj.pointMarkers[name].position.set(p.x, p.y, 0.05);
        });

        obj.pointLabels.A.position.set(A.x - 0.28, A.y - 0.35, 0);
        obj.pointLabels.B.position.set(B.x - 0.08, B.y - 0.35, 0);
        obj.pointLabels.C.position.set(C.x - 0.08, C.y + 0.32, 0);
        obj.pointLabels.D.position.set(D.x - 0.28, D.y + 0.25, 0);

        obj.pointLabels.E.position.set(E.x - 0.08, E.y - 0.35, 0);
        obj.pointLabels.F.position.set(F.x - 0.02, F.y + 0.22, 0);
        obj.pointLabels.G.position.set(G.x + 0.12, G.y + 0.06, 0);

        obj.pointLabels.H.position.set(H.x - 0.02, H.y - 0.35, 0);
        obj.pointLabels.I.position.set(I.x + 0.12, I.y + 0.06, 0);
        obj.pointLabels.J.position.set(J.x + 0.10, J.y - 0.18, 0);

        obj.pointLabels.K.position.set(K.x + 0.10, K.y - 0.18, 0);
        obj.pointLabels.L.position.set(L.x - 0.28, L.y - 0.18, 0);
        obj.pointLabels.M.position.set(M.x - 0.28, M.y + 0.06, 0);

        obj.labelTotalArea.position.set(2.2, 4.1, 0);
        obj.labelRects1.position.set(1.8, -4.8, 0);
        obj.labelRects2.position.set(3.4, -5.4, 0);

        obj.labelSegA.position.set((A.x + B.x) / 2, y0 - 0.7, 0);
        obj.labelSegB.position.set((B.x + E.x) / 2, y0 - 0.7, 0);
        obj.labelSegC.position.set((E.x + H.x) / 2, y0 - 0.7, 0);
    },
    false
);

createMathEngine(
    'nesbitt-equilateral',
    (scene, createLabel) => {
        const s = 10.0;
        const h = Math.sqrt(3) * s / 2;
        const yCenter = -h / 3;

        const A = vec(-s / 2, yCenter, 0);
        const B = vec(s / 2, yCenter, 0);
        const C = vec(0, yCenter + h, 0);

        const triangle = createLine({ color: COLORS.border });
        setLinePoints(triangle, [A, B, C, A]);

        const px = createLine({ color: 0xef4444, opacity: 0.95 });
        const py = createLine({ color: 0x3b82f6, opacity: 0.95 });
        const pz = createLine({ color: 0x10b981, opacity: 0.95 });

        const BM = createLine({ color: COLORS.lightAux, opacity: 0.75, dashed: true, dashSize: 0.16, gapSize: 0.10 });
        const AN = createLine({ color: COLORS.lightAux, opacity: 0.75, dashed: true, dashSize: 0.16, gapSize: 0.10 });
        const CP = createLine({ color: COLORS.lightAux, opacity: 0.75, dashed: true, dashSize: 0.16, gapSize: 0.10 });

        const segNNp = createLine({ color: 0xef4444 });
        const segMMp = createLine({ color: 0x3b82f6 });
        const segPPp = createLine({ color: 0x10b981 });

        const segANp = createLine({ color: 0xef4444, opacity: 0.55 });
        const segBMp = createLine({ color: 0x3b82f6, opacity: 0.55 });
        const segCPp = createLine({ color: 0x10b981, opacity: 0.55 });

        const qM = createLine({ color: COLORS.aux, opacity: 0.9, dashed: true, dashSize: 0.16, gapSize: 0.10 });
        const fyMp = createLine({ color: COLORS.aux, opacity: 0.9, dashed: true, dashSize: 0.16, gapSize: 0.10 });

        const qN = createLine({ color: COLORS.aux, opacity: 0.9, dashed: true, dashSize: 0.16, gapSize: 0.10 });
        const fxNp = createLine({ color: COLORS.aux, opacity: 0.9, dashed: true, dashSize: 0.16, gapSize: 0.10 });

        const qP = createLine({ color: COLORS.aux, opacity: 0.9, dashed: true, dashSize: 0.16, gapSize: 0.10 });
        const fzPp = createLine({ color: COLORS.aux, opacity: 0.9, dashed: true, dashSize: 0.16, gapSize: 0.10 });

        const rightX = createLine({ color: 0x555555 });
        const rightY = createLine({ color: 0x555555 });
        const rightZ = createLine({ color: 0x555555 });

        const pointA = createPoint(0.09, COLORS.black);
        const pointB = createPoint(0.09, COLORS.black);
        const pointC = createPoint(0.09, COLORS.black);
        const pointQ = createPoint(0.11, COLORS.purple);

        const footX = createPoint(0.07, 0xef4444);
        const footY = createPoint(0.07, 0x3b82f6);
        const footZ = createPoint(0.07, 0x10b981);

        const pointM = createPoint(0.07, 0x555555);
        const pointN = createPoint(0.07, 0x555555);
        const pointP = createPoint(0.07, 0x555555);

        const pointMp = createPoint(0.07, 0x3b82f6);
        const pointNp = createPoint(0.07, 0xef4444);
        const pointPp = createPoint(0.07, 0x10b981);

        pointA.position.copy(A).setZ(0.02);
        pointB.position.copy(B).setZ(0.02);
        pointC.position.copy(C).setZ(0.02);

        const M = projectToLine(B, A, C);
        const N = projectToLine(A, B, C);
        const Palt = projectToLine(C, A, B);

        pointM.position.copy(M).setZ(0.02);
        pointN.position.copy(N).setZ(0.02);
        pointP.position.copy(Palt).setZ(0.02);

        setLinePoints(BM, [B, M]);
        setLinePoints(AN, [A, N]);
        setLinePoints(CP, [C, Palt]);

        const labelA = createLabel('A', TEXT.black);
        const labelB = createLabel('B', TEXT.black);
        const labelC = createLabel('C', TEXT.black);
        const labelQ = createLabel('Q', TEXT.purple);

        const labelM = createLabel('M', TEXT.black);
        const labelN = createLabel('N', TEXT.black);
        const labelPalt = createLabel('P', TEXT.black);

        const labelMp = createLabel("M'", TEXT.blue);
        const labelNp = createLabel("N'", TEXT.red);
        const labelPp = createLabel("P'", TEXT.green);

        const labelX = createLabel('x', TEXT.red);
        const labelY = createLabel('y', TEXT.blue);
        const labelZ = createLabel('z', TEXT.green);

        const axisLine = createLine({ color: COLORS.gray });
        const tick0 = createLine({ color: COLORS.gray });
        const tick1 = createLine({ color: COLORS.gray, opacity: 0.65 });
        const tick32 = createLine({ color: COLORS.black });
        const tick2 = createLine({ color: COLORS.gray, opacity: 0.65 });

        const segX = createPlaneRect(1, 0.24, 0xef4444, 0.90);
        const segY = createPlaneRect(1, 0.24, 0x3b82f6, 0.90);
        const segZ = createPlaneRect(1, 0.24, 0x10b981, 0.90);

        const sumMarker = createLine({ color: COLORS.black });

        const label0 = createLabel('0', TEXT.black);
        const label1 = createLabel('1', '#666666');
        const label32 = createLabel('\\frac{3}{2}', TEXT.black);
        const label2 = createLabel('2', '#666666');

        const labelTX = createLabel('\\frac{h-x}{h+x}', TEXT.red);
        const labelTY = createLabel('\\frac{h-y}{h+y}', TEXT.blue);
        const labelTZ = createLabel('\\frac{h-z}{h+z}', TEXT.green);

        scene.add(
            triangle,
            px, py, pz,
            BM, AN, CP,
            segNNp, segMMp, segPPp,
            segANp, segBMp, segCPp,
            qM, fyMp, qN, fxNp, qP, fzPp,
            rightX, rightY, rightZ,
            pointA, pointB, pointC, pointQ,
            footX, footY, footZ,
            pointM, pointN, pointP,
            pointMp, pointNp, pointPp,
            labelA, labelB, labelC, labelQ,
            labelM, labelN, labelPalt,
            labelMp, labelNp, labelPp,
            labelX, labelY, labelZ,
            axisLine, tick0, tick1, tick32, tick2,
            segX, segY, segZ,
            sumMarker,
            label0, label1, label32, label2,
            labelTX, labelTY, labelTZ
        );

        return {
            A, B, C, M, N, Palt, h, yCenter,
            px, py, pz,
            segNNp, segMMp, segPPp,
            segANp, segBMp, segCPp,
            qM, fyMp, qN, fxNp, qP, fzPp,
            rightX, rightY, rightZ,
            pointQ, footX, footY, footZ,
            pointMp, pointNp, pointPp,
            labelA, labelB, labelC, labelQ,
            labelM, labelN, labelPalt,
            labelMp, labelNp, labelPp,
            labelX, labelY, labelZ,
            axisLine, tick0, tick1, tick32, tick2,
            segX, segY, segZ,
            sumMarker,
            label0, label1, label32, label2,
            labelTX, labelTY, labelTZ
        };
    },
    (time, obj) => {
        const { A, B, C, M, N, Palt, h, yCenter } = obj;

        const u0 = 0.28 + 0.18 * Math.sin(time * 0.63);
        const v0 = 0.26 + 0.16 * Math.cos(time * 0.91);
        const w0 = 0.22 + 0.14 * Math.sin(time * 0.47 + 1.2);
        const sum = u0 + v0 + w0;

        const u = u0 / sum;
        const v = v0 / sum;
        const w = w0 / sum;

        const Q = new THREE.Vector3()
            .add(A.clone().multiplyScalar(u))
            .add(B.clone().multiplyScalar(v))
            .add(C.clone().multiplyScalar(w));

        const FX = projectToLine(Q, B, C);
        const FY = projectToLine(Q, C, A);
        const FZ = projectToLine(Q, A, B);

        obj.pointQ.position.copy(Q).setZ(0.02);
        obj.footX.position.copy(FX).setZ(0.02);
        obj.footY.position.copy(FY).setZ(0.02);
        obj.footZ.position.copy(FZ).setZ(0.02);

        setLinePoints(obj.px, [Q, FX]);
        setLinePoints(obj.py, [Q, FY]);
        setLinePoints(obj.pz, [Q, FZ]);

        const x = Q.distanceTo(FX);
        const y = Q.distanceTo(FY);
        const z = Q.distanceTo(FZ);

        const t1 = (h - x) / (h + x);
        const t2 = (h - y) / (h + y);
        const t3 = (h - z) / (h + z);
        const S = t1 + t2 + t3;

        const dirAN = new THREE.Vector3().subVectors(N, A).normalize();
        const dirBM = new THREE.Vector3().subVectors(M, B).normalize();
        const dirCP = new THREE.Vector3().subVectors(Palt, C).normalize();

        const Np = A.clone().add(dirAN.clone().multiplyScalar(h + x));
        const Mp = B.clone().add(dirBM.clone().multiplyScalar(h + y));
        const Pp = C.clone().add(dirCP.clone().multiplyScalar(h + z));

        obj.pointNp.position.copy(Np).setZ(0.02);
        obj.pointMp.position.copy(Mp).setZ(0.02);
        obj.pointPp.position.copy(Pp).setZ(0.02);

        setLinePoints(obj.segANp, [A, Np]);
        setLinePoints(obj.segBMp, [B, Mp]);
        setLinePoints(obj.segCPp, [C, Pp]);

        setLinePoints(obj.segNNp, [N, Np]);
        setLinePoints(obj.segMMp, [M, Mp]);
        setLinePoints(obj.segPPp, [Palt, Pp]);

        setLinePoints(obj.qM, [Q, M]);
        setLinePoints(obj.fyMp, [FY, Mp]);

        setLinePoints(obj.qN, [Q, N]);
        setLinePoints(obj.fxNp, [FX, Np]);

        setLinePoints(obj.qP, [Q, Palt]);
        setLinePoints(obj.fzPp, [FZ, Pp]);

        const uBC = sideUnit(B, C);
        const uCA = sideUnit(C, A);
        const uAB = sideUnit(A, B);

        setRightAngleMarker(
            obj.rightX,
            FX,
            uBC,
            new THREE.Vector3().subVectors(Q, FX),
            0.22
        );

        setRightAngleMarker(
            obj.rightY,
            FY,
            uCA,
            new THREE.Vector3().subVectors(Q, FY),
            0.22
        );

        setRightAngleMarker(
            obj.rightZ,
            FZ,
            uAB,
            new THREE.Vector3().subVectors(Q, FZ),
            0.22
        );

        obj.labelA.position.set(A.x - 0.35, A.y - 0.45, 0);
        obj.labelB.position.set(B.x + 0.18, B.y - 0.45, 0);
        obj.labelC.position.set(C.x, C.y + 0.45, 0);
        obj.labelQ.position.set(Q.x + 0.18, Q.y + 0.25, 0);

        obj.labelM.position.set(M.x - 0.35, M.y - 0.15, 0);
        obj.labelN.position.set(N.x + 0.18, N.y - 0.20, 0);
        obj.labelPalt.position.set(Palt.x + 0.18, Palt.y + 0.18, 0);

        obj.labelNp.position.set(Np.x + 0.18, Np.y + 0.08, 0);
        obj.labelMp.position.set(Mp.x - 0.55, Mp.y + 0.10, 0);
        obj.labelPp.position.set(Pp.x + 0.18, Pp.y + 0.10, 0);

        obj.labelX.position.lerpVectors(Q, FX, 0.5);
        obj.labelX.position.x += 0.16;
        obj.labelX.position.y += 0.12;

        obj.labelY.position.lerpVectors(Q, FY, 0.5);
        obj.labelY.position.x -= 0.24;
        obj.labelY.position.y += 0.10;

        obj.labelZ.position.lerpVectors(Q, FZ, 0.5);
        obj.labelZ.position.y -= 0.26;

        const axisCenter = 0.0;
        const axisY = yCenter - 3.05;
        const axisLen = 9.6 * 1.3;
        const axisLeft = axisCenter - axisLen / 2;
        const axisMax = 2.1;
        const scale = axisLen / axisMax;

        const X = (val) => axisLeft + val * scale;

        setLinePoints(obj.axisLine, [
            vec(axisLeft, axisY, 0),
            vec(axisLeft + axisLen, axisY, 0)
        ]);

        const makeTick = (line, value, size = 0.22) => {
            const xx = X(value);
            setLinePoints(line, [
                vec(xx, axisY - size, 0),
                vec(xx, axisY + size, 0)
            ]);
        };

        makeTick(obj.tick0, 0, 0.22);
        makeTick(obj.tick1, 1, 0.16);
        makeTick(obj.tick32, 1.5, 0.28);
        makeTick(obj.tick2, 2, 0.16);

        const placeSegment = (mesh, a0, b0, yy) => {
            const w0 = Math.max(0.0001, b0 - a0);
            mesh.scale.x = w0 * scale;
            mesh.position.set(X((a0 + b0) / 2), yy, 0.01);
        };

        const barY = axisY + 0.42;
        placeSegment(obj.segX, 0, t1, barY);
        placeSegment(obj.segY, t1, t1 + t2, barY);
        placeSegment(obj.segZ, t1 + t2, S, barY);

        setLinePoints(obj.sumMarker, [
            vec(X(S), axisY - 0.10, 0.02),
            vec(X(S), axisY + 0.62, 0.02)
        ]);

        obj.label0.position.set(X(0), axisY - 0.48, 0);
        obj.label1.position.set(X(1), axisY - 0.42, 0);
        obj.label32.position.set(X(1.5), axisY - 0.52, 0);
        obj.label2.position.set(X(2), axisY - 0.42, 0);

        const labelYTop = barY + 0.68;

        const centerOrFallback = (a0, b0, fallbackX) => {
            if (b0 - a0 > 0.16) return X((a0 + b0) / 2);
            return fallbackX;
        };

        obj.labelTX.position.set(
            centerOrFallback(0, t1, X(0.16)),
            labelYTop,
            0
        );

        obj.labelTY.position.set(
            centerOrFallback(t1, t1 + t2, X(Math.max(0.45, t1 + 0.12))),
            labelYTop,
            0
        );

        obj.labelTZ.position.set(
            centerOrFallback(t1 + t2, S, X(Math.max(0.8, S - 0.18))),
            labelYTop,
            0
        );
    },
    false
);
</script>