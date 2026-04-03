+++
title = 'Sum of epicycles'
date = '2024-04-24'
draft = false
visualOrder = 31
sourceArticle = '/2024/04/24/from-the-circle-to-epicycles/'
sourceArticleTitle = 'From the circle to epicycles'
usep5js = true
customJS = ['/js/2024-04-24-from-the-circle-to-epicycles/commons.js']
customDeferJS = ['/js/2024-04-24-from-the-circle-to-epicycles/sumepi2.js']
visualSourceFiles = ['/js/2024-04-24-from-the-circle-to-epicycles/commons.js', '/js/2024-04-24-from-the-circle-to-epicycles/sumepi2.js']
+++

> "So, instead of stacking static circles, we can chain these spinning circles together. The center of the second circle sits on the edge of the first, the third on the edge of the second, and so on. This mechanical chain is what we call a system of epicycles."

Pick
<select id="sumEpiSins" onchange="updateSumEpi()">
    <option value="1">k=1</option>
    <option value="2">k=2</option>
    <option value="3" selected>k=3</option>
    <option value="4">k=4</option>
    <option value="7">k=7</option>
    <option value="9">k=9</option>
    <option value="15">k=15</option>
    <option value="20">k=20</option>
</select>
and $\omega$=
<select id="sumEpiFreq" onchange="updateSumEpi()">
    <option value="1" selected>1</option>
    <option value="2">2</option>
    <option value="3">3</option>
</select>
to plot the circles and the corresponding $y_k(x)$ functions:

<div id="sum-epi-sketch"></div>
