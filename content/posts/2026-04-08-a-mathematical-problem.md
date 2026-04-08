+++
date = '2026-04-08'
draft = false
title = 'A mathematical problem'
categories = ['thoughts', 'math']
tags = ['geometry', 'poetry']
usekatex = false
usethreejs = true
customCSS = ["/css/2026-04-08-a-mathematical-problem/mathematical-problem.css"]
customModuleJS = ["/js/2026-04-08-a-mathematical-problem/mathematical-problem.js"]
+++

While reading some classic poetry, I accidentally found Samuel Taylor Coleridge’s [*A Mathematical Problem*](https://en.wikisource.org/wiki/A_Mathematical_Problem):

> On a given finite line  
> Which must no way incline;  
> To describe an equi--  
> --lateral Tri--  
> --A, N, G, L, E.

I have to admit, the poem is not the easiest to read (because of its deliberately *old-fashioned* phrasing) especially for a non-native English speaker like me. Still, I enjoyed it as a witty literary joke built around classical geometry.

So, for readers who are not especially drawn to either mathematics or poetry, here is a way to follow the poem alongside the geometric construction it *playfully* evokes. It is not exactly [Oulipo](https://en.wikipedia.org/wiki/Oulipo), but it feels close in spirit.

Click `Auto` to start the poem and watch the construction unfold step by step.

<div class="cmp-wrap">
  <div class="cmp-shell" id="cmp-shell">
    <div class="cmp-figure">
      <div class="cmp-stage">
        <div class="cmp-three" id="cmp-three" aria-label="A geometric construction for an equilateral triangle"></div>
      </div>
      <div class="cmp-controls">
        <button type="button" id="cmp-prev">previous</button>
        <button type="button" id="cmp-next">next</button>
        <button type="button" id="cmp-play">auto</button>
        <button type="button" id="cmp-reset">reset</button>
      </div>
    </div>
    <div class="cmp-side">
      <div class="cmp-head">
        <p class="cmp-title">A Mathematical Problem</p>
        <p class="cmp-kicker">by Samuel Taylor Coleridge</p>
      </div>
      <div class="cmp-poem" id="cmp-poem"></div>
    </div>
  </div>
</div>
