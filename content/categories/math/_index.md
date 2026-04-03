+++
title = "Math"
usekatex = true
usep5js = true
customJS = ["/js/2024-04-24-from-the-circle-to-epicycles/commons.js"]
customDeferJS = ["/js/2024-04-24-from-the-circle-to-epicycles/fmachinery.js"]
+++

Here is where I write about math. 

I am an `amateur` but sometimes I compose or solve problems as a weird hobby of mine. There is a hidden place on this site where I keep track of some of the problems I have or documented in the **[/olympiad](/olympiad)** section. Rarely I compose problems, so you will see my name in the `source`.

Below is the latest problem published in that section, but you can always look for more by clicking that `see more` link.

{{< recent_olympiad >}}

---

I also build standalone math visuals on this site, especially when an idea is easier to understand by watching it move. You can browse them in **[/visuals](/visuals/)**, but here is one example from the Fourier material:

`You can pick the shape of the desired signal from here:`
<select id="fm-wave" onchange="updateFmWave()">
    <option value="sawtooth" selected>sawtooth wave</option>
    <option value="triangle">triangle wave</option>
    <option value="square">square wave</option>
</select>
`and the sketch will change accordingly.`

<div id="fmachinery-sketch"></div>

---

And lastly, here is the exhaustive list of my articles related to math:

{{< blog_taxonomies >}}

{{< blog_post_list >}}
