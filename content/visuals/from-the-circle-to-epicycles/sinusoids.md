+++
title = 'Sinusoids'
date = '2024-04-24'
draft = false
visualOrder = 29
sourceArticle = '/2024/04/24/from-the-circle-to-epicycles/'
sourceArticleTitle = 'From the circle to epicycles'
usep5js = true
customJS = ['/js/2024-04-24-from-the-circle-to-epicycles/commons.js']
customDeferJS = ['/js/2024-04-24-from-the-circle-to-epicycles/sinusoids.js']
visualSourceFiles = ['/js/2024-04-24-from-the-circle-to-epicycles/commons.js', '/js/2024-04-24-from-the-circle-to-epicycles/sinusoids.js']
+++

> "You can pick the values of amplitude, angular frequency, and phase to plot the sinusoid, and if you choose a phase of π/2, a cosine is plotted instead."

Please choose the values of $A=$
<select id="sinusoid_A" onchange="updateSinusoids()">
    <option value="0.5">0.5</option>
    <option value="1">1</option>
    <option value="1.5" selected>1.5</option>
    <option value="2">2</option>
</select>
, $\omega=$
<select id="sinusoid_omega" onchange="updateSinusoids()">
    <option value="-2">-2</option>
    <option value="-1">-1</option>
    <option value="1">1</option>
    <option value="2" selected>2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
</select>
and $\varphi=$
<select id="sinusoid_phi" onchange="updateSinusoids()">
    <option value="0" selected>0</option>
    <option value="0.5">π/2</option>
    <option value="1">π</option>
    <option value="1.5">3π/2</option>
</select>
to plot the sinusoid.

<div id="sinusoids-sketch"></div>
