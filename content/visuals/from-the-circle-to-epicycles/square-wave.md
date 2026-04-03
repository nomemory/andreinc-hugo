+++
title = 'Square wave'
date = '2024-04-24'
draft = false
visualOrder = 30
sourceArticle = '/2024/04/24/from-the-circle-to-epicycles/'
sourceArticleTitle = 'From the circle to epicycles'
usep5js = true
customJS = ['/js/2024-04-24-from-the-circle-to-epicycles/commons.js']
customDeferJS = ['/js/2024-04-24-from-the-circle-to-epicycles/squarewave.js']
visualSourceFiles = ['/js/2024-04-24-from-the-circle-to-epicycles/commons.js', '/js/2024-04-24-from-the-circle-to-epicycles/squarewave.js']
+++

> "The magic: when we sum these smooth, continous curves together, their peaks and valleys interfere to create a "flat top" square wave. The more sinuosiuds we have in our sum, the sharper the approximation becomes."

Please choose how many sinusoids you want to use, and let's see how the functions look like for
<select id="numSins" onchange="updateSins()">
    <option value="1">k=1</option>
    <option value="2">k=2</option>
    <option value="3">k=3</option>
    <option value="4">k=4</option>
    <option value="7" selected>k=7</option>
    <option value="9">k=9</option>
    <option value="15">k=15</option>
    <option value="20">k=20</option>
</select>
(and $\omega$=
<select id="sinsFreq" onchange="updateSins()">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
</select>):

<div id="square-wave-sketch"></div>
