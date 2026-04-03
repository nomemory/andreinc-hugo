+++
title = 'The sinusoidal tetris'
date = '2024-04-24'
draft = false
visualOrder = 33
sourceArticle = '/2024/04/24/the-sinusoidal-tetris/'
sourceArticleTitle = 'The Sinusoidal Tetris'
usep5js = true
customDeferJS = ['/js/2024-02-06-the-sinusoidal-tetris/tetris.js']
customCSS = ['/css/2024-02-06-the-sinusoidal-tetris/tetris.css']
visualSourceFiles = ['/js/2024-02-06-the-sinusoidal-tetris/tetris.js', '/css/2024-02-06-the-sinusoidal-tetris/tetris.css']
+++

> "Let's play Tetris, but with a twist. No geometrical figures will fall from the sky. Instead, you control a sinusoid."

<div style="font-family: 'Courier New', Courier, monospace; background-color: #F6F8FA; border: 2px solid #111; padding: 20px; color: #111; line-height: 1.6; max-width: 100%; box-sizing: border-box;">
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
</div>
