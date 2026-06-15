+++
date = '2026-06-15'
draft = false
title = 'The cube, the epicycles and the human face'
categories = ['math', "thoughts"]
tags = ['fourier']
usekatex = true
usethreejs = true
customModuleJS = ['/js/2026-06-15-3d-epicycles/visuals.js']
customCSS = ['/css/2026-06-15-3d-epicycles/visuals.css']
+++

> This article should be read with the [opening scene of Westworld](https://www.youtube.com/watch?v=ZgvXU5R-xWs) in mind.

What if Plato and Leibniz were right? Maybe some mystics were right as well. *As above, so below*. Everything would fit nicely if the oscillatory behaviour of nature were more than a mathematical construct. Maybe mathematics is ontological. What if sinusoids are not here merely to follow and approximate a shape, but to interfere and give birth to one?

In any case, I found the idea cool and decided to put it into practice. Here is a cube where three of its faces contain *epicycle* constructions that work together to describe a human face. On each face of the cube, you can also see the component sinusoids without them interfering with one another.

<div class="epicycle-viz-wrap">
    <div id="head-epicycles" class="epicycle-viz"></div>
    <div class="epicycle-controls">
        <button id="head-epicycle-pause" type="button">Pause [ ⏸ ]</button>
        <button id="head-epicycle-reset-view" type="button">Reset view</button>
    </div>
</div>

# The concept

If you are already familiar with the topic, the idea shouldn't seem too complicated.

First, we sample a series of points from the surface of a face. Each point has three coordinates: $x$, $y$, and $z$. Finding a good way to sample the surface was probably the most difficult part.

The order of the points is important. The Fourier reconstruction follows them one after another. If we randomly change their order, the result will no longer look like a face.

Epicycles work in two dimensions, but our points live in three dimensions. To solve this, we create three projections:

<div class="mp mpc epicycle-equation">
\[
(x,y),\qquad(y,z),\qquad(z,x).
\]
</div>

We calculate the Fourier coefficients separately for each projection. This gives us three groups of epicycles, one for each face of the cube. We then combine their endpoints to obtain a point in three-dimensional space.

We only use a limited number of circles, so the generated point does not always lie exactly on the face. Before drawing the final line, we move it back onto the surface.

As a bonus, each face of the cube also shows the original sinusoids without allowing them to interfere with one another.
