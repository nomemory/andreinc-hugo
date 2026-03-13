+++
date = '2024-04-24'
draft = false
title = 'The Sinusoidal Tetris'
categories = ['math']
tags = ['fourier']
usekatex = true
usep5js = true
customDeferJS = ["/js/2024-02-06-the-sinusoidal-tetris/tetris.js"]
customCSS = ["/css/2024-02-06-the-sinusoidal-tetris/tetris.css"]
+++

<div style="font-family: 'Courier New', Courier, monospace; background-color: #F6F8FA; border: 2px solid #111; padding: 20px; color: #111; line-height: 1.6; max-width: 100%; box-sizing: border-box;">
<h2 style="text-transform: uppercase; border-bottom: 2px solid #111; padding-bottom: 10px; margin-top: 0;">System Log: Sinusoidal Tetris</h2>
<p>Let's play Tetris, but with a twist. No geometrical figures will <i>fall from the sky</i>. Instead, you control a <a href="https://en.wikipedia.org/wiki/Sine_wave" style="color: #000; text-decoration: underline;">sinusoid</a>, defined by:</p>
<p style="text-align: center; font-size: 1.2rem; padding: 10px 0;">
\[ f(x) = A \cdot \sin(\omega x + \varphi) \]
</p>
<hr style="border: 0; border-top: 1px dashed #111; margin: 20px 0;">
<div style="background: #FFF; border: 1px solid #111; padding: 15px; margin-bottom: 20px;">
<label style="display: block; margin-bottom: 10px; cursor: pointer;">
<input type="checkbox" id="suggestions" name="suggestions" checked> [ENABLE_SUGGESTIONS]
<span style="font-size: 0.85rem; display: block; margin-left: 25px; opacity: 0.7;">Free guidance in the beginning. If you follow all of them, you win.</span>
</label>
<label style="display: block; cursor: pointer;">
<input type="checkbox" id="turnBased" name="turnBased"> [TURN_BASED_MODE]
<span style="font-size: 0.85rem; display: block; margin-left: 25px; opacity: 0.7;">The sinusoid doesn't drop automatically.</span>
</label>
</div>
<div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
<div id="tetris-sketch" style="max-width: 100%; overflow: hidden; border: 4px solid #111; background: #000; line-height: 0;">
<style>
#tetris-sketch canvas { max-width: 100% !important; height: auto !important; display: block; }
</style>
</div>
</div>
<hr style="border: 0; border-top: 1px dashed #111; margin: 20px 0;">
<h3 style="text-transform: uppercase; font-size: 1rem;">Control Map</h3>
<ul style="list-style-type: none; padding-left: 0; font-size: 0.9rem;">
<li><span style="font-weight: bold;">[S]</span> Increase angular frequency (\(\omega\))</li>
<li><span style="font-weight: bold;">[X]</span> Decrease angular frequency (\(\omega\))</li>
<li><span style="font-weight: bold;">[A]</span> Increase amplitude (\(A\))</li>
<li><span style="font-weight: bold;">[Z]</span> Decrease amplitude (\(A\))</li>
<li><span style="font-weight: bold;">[Q]</span> Increase phase (\(\varphi\))</li>
<li><span style="font-weight: bold;">[W]</span> Decrease phase (\(\varphi\))</li>
<li><span style="font-weight: bold;">[P]</span> Drop the sinusoid</li>
</ul>
<hr style="border: 0; border-top: 1px dashed #111; margin: 20px 0;">
<p>To win the game, you need to reduce the signal as close to zero as possible. It is hard but not impossible. There is a current threshold of <code>unit * 0.3</code>. Surviving is not winning. The <i>Path of the Alternating Phases</i> is boredom.</p>
<p style="background: #111; color: #FFF; padding: 10px; font-size: 0.85rem;">
PRO_TIP: A professional player turns off the suggestions. If you are a savant, you can compute the <a href="https://en.wikipedia.org/wiki/Fourier_series" style="color: #EEE;">Fourier Series Coefficients</a> in your head. Cancel that noise!
</p>
<div style="font-size: 0.8rem; margin-top: 40px; border-top: 1px solid #111; padding-top: 10px; opacity: 0.8;">
<p>Built with <a href="https://p5js.org/" style="color: #000;">p5js</a>. Source code: <a href="https://github.com/nomemory/andreinc-hugo/blob/main/static/js/2024-02-06-the-sinusoidal-tetris/tetris.js" style="color: #000;">[REPOSITORY]</a>.</p>
</div>
<p style="font-size: 0.7rem; text-align: right; margin-top: 20px; opacity: 0.5;">
<sup>* This game is a joke I put together during a weekend.</sup>
</p>
</div>