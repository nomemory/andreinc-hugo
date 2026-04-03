+++
title = 'Fourier machinery'
date = '2024-04-24'
draft = false
visualOrder = 32
sourceArticle = '/2024/04/24/from-the-circle-to-epicycles/'
sourceArticleTitle = 'From the circle to epicycles'
usep5js = true
customJS = ['/js/2024-04-24-from-the-circle-to-epicycles/commons.js']
customDeferJS = ['/js/2024-04-24-from-the-circle-to-epicycles/fmachinery.js']
visualSourceFiles = ['/js/2024-04-24-from-the-circle-to-epicycles/commons.js', '/js/2024-04-24-from-the-circle-to-epicycles/fmachinery.js']
+++

> "Instead of looking at static equations, let's watch how these mathematical terms translate into physical motion to create practical, predictable patterns."

You can pick the shape of the desired signal from here:
<select id="fm-wave" onchange="updateFmWave()">
    <option value="sawtooth" selected>sawtooth wave</option>
    <option value="triangle">triangle wave</option>
    <option value="square">square wave</option>
</select>
and the sketch will change accordingly.

<div id="fmachinery-sketch"></div>
