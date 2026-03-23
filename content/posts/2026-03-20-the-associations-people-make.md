+++
date = '2026-03-19'
draft = false
title = 'The associations people make'
categories = ['math', 'persona']
tags = ['psychology']
usekatex = true
usethreejs = true
+++

<sub>A silly story is easier to remember</sub>

<style>
.octo-canvas-wrap {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    margin: 2rem 0;
}

.octopus-graph {
    width: 600px;
    height: 460px;
    position: relative;
    margin: 0 auto;
    border: 2px solid #000;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
}

.octopus-graph canvas {
    display: block;
}
</style>

This article is about "a vision" that I have.

<div class="octo-canvas-wrap">
    <div class="octopus-graph"></div>
</div>

<script type="module">
import * as THREE from 'three';

function initOctopusGraph(container) {
  if (!container) return;

  const FIXED_WIDTH = 600;
  const FIXED_HEIGHT = 460;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(FIXED_WIDTH, FIXED_HEIGHT, false);
  renderer.domElement.style.width = `${FIXED_WIDTH}px`;
  renderer.domElement.style.height = `${FIXED_HEIGHT}px`;
  renderer.domElement.style.display = 'block';
  container.appendChild(renderer.domElement);

  container.style.width = `${FIXED_WIDTH}px`;
  container.style.height = `${FIXED_HEIGHT}px`;
  container.style.position = 'relative';
  container.style.overflow = 'hidden';

  const camera = new THREE.OrthographicCamera(-7, 7, 5.2, -5.2, 0.1, 100);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  const COLORS = {
    ink: 0x111111
  };

  let animationId = null;
  let destroyed = false;

  let nodes = [];
  let permanentEdges = [];
  let dynamicLines = [];
  let armEndpoints = [];
  let captureAnchors = [];

  let isolatedNode = null;
  let isolatedTarget = null;

  let phase = 0;
  // 0 waiting
  // 1 extend
  // 2 pull
  // 3 settle between captures
  // 4 reset pause

  let phaseClock = 0;
  let lastTime = 0;

  let capturedCount = 0;
  const MAX_CAPTURES = 5;

  let currentGrabbers = [];

  function createNode(x, y, r = 0.14, color = COLORS.ink) {
    const geometry = new THREE.CircleGeometry(r, 40);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    scene.add(mesh);

    const node = {
      mesh,
      baseX: x,
      baseY: y,
      radius: r,
      phase: Math.random() * Math.PI * 2,
      pulse: 0.01 + Math.random() * 0.015,
      attached: false,
      parentAnchor: null
    };

    nodes.push(node);
    return node;
  }

  function removeEdge(edge) {
    if (!edge) return;
    scene.remove(edge.line);
    edge.line.geometry.dispose();
    edge.line.material.dispose();
  }

  function createEdge(a, b, opacity = 0.9) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(6), 3)
    );

    const material = new THREE.LineBasicMaterial({
      color: COLORS.ink,
      transparent: true,
      opacity
    });

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    const edge = { line, a, b, permanent: true };
    permanentEdges.push(edge);
    updateEdge(edge);
    return edge;
  }

  function updateEdge(edge) {
    const arr = edge.line.geometry.attributes.position.array;
    arr[0] = edge.a.mesh.position.x;
    arr[1] = edge.a.mesh.position.y;
    arr[2] = 0;
    arr[3] = edge.b.mesh.position.x;
    arr[4] = edge.b.mesh.position.y;
    arr[5] = 0;
    edge.line.geometry.attributes.position.needsUpdate = true;
  }

  function createDynamicLine(opacity = 1) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(6), 3)
    );

    const material = new THREE.LineBasicMaterial({
      color: COLORS.ink,
      transparent: true,
      opacity
    });

    const line = new THREE.Line(geometry, material);
    scene.add(line);
    dynamicLines.push(line);
    return line;
  }

  function clearDynamicLines() {
    for (const line of dynamicLines) {
      scene.remove(line);
      line.geometry.dispose();
      line.material.dispose();
    }
    dynamicLines = [];
    currentGrabbers = [];
  }

  function setDynamicLine(line, p1, p2) {
    const arr = line.geometry.attributes.position.array;
    arr[0] = p1.x;
    arr[1] = p1.y;
    arr[2] = 0;
    arr[3] = p2.x;
    arr[4] = p2.y;
    arr[5] = 0;
    line.geometry.attributes.position.needsUpdate = true;
  }

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  function clearSceneData() {
    clearDynamicLines();

    for (const edge of permanentEdges) {
      removeEdge(edge);
    }
    permanentEdges = [];

    for (const node of nodes) {
      scene.remove(node.mesh);
      node.mesh.geometry.dispose();
      node.mesh.material.dispose();
    }
    nodes = [];

    armEndpoints = [];
    captureAnchors = [];
    isolatedNode = null;
    isolatedTarget = null;
    capturedCount = 0;
    phase = 0;
    phaseClock = 0;
    lastTime = 0;
  }

  function buildDenseOctopusGraph() {
    const center = createNode(0, 1.8, 0.22);

    const armAngles = [-2.85, -2.5, -2.15, -1.8, -1.45, -1.1, -0.75, -0.4];
    const armLengths = [5, 6, 7, 7, 7, 7, 6, 5];
    const arms = [];

    for (let i = 0; i < armAngles.length; i++) {
      const angle = armAngles[i];
      const len = armLengths[i];
      let prev = center;
      const arm = [center];

      for (let j = 1; j <= len; j++) {
        const dist = 0.55 + j * 0.62;
        const bend = 0.16 * Math.sin(j * 0.95 + i * 0.7);
        const drift = 0.05 * j * Math.sin(i * 0.6);

        const x =
          Math.cos(angle) * dist +
          Math.cos(angle + Math.PI / 2) * bend +
          drift;

        const y =
          center.baseY +
          Math.sin(angle) * dist +
          Math.sin(angle + Math.PI / 2) * bend -
          0.015 * j * j;

        const r = Math.max(0.08, 0.15 - j * 0.006);
        const node = createNode(x, y, r);
        arm.push(node);
        createEdge(prev, node, 0.92);
        prev = node;
      }

      armEndpoints.push(prev);
      arms.push(arm);
    }

    for (let i = 0; i < arms.length - 1; i++) {
      const a1 = arms[i];
      const a2 = arms[i + 1];
      const common = Math.min(a1.length, a2.length);

      for (let j = 2; j < common; j++) {
        if (j % 2 === 0) {
          createEdge(a1[j], a2[j], 0.32);
        }
        if (j >= 3 && j % 3 === 0) {
          createEdge(a1[j], a2[j - 1], 0.22);
        }
      }
    }

    createEdge(arms[1][3], arms[3][3], 0.18);
    createEdge(arms[2][4], arms[5][4], 0.14);
    createEdge(arms[3][5], arms[6][4], 0.14);
    createEdge(arms[0][2], arms[2][2], 0.16);
    createEdge(arms[5][2], arms[7][2], 0.16);

    const headLeft = createNode(-0.45, 1.45, 0.11);
    const headRight = createNode(0.45, 1.45, 0.11);
    const midLeft = createNode(-0.2, 1.25, 0.09);
    const midRight = createNode(0.2, 1.25, 0.09);

    createEdge(center, headLeft, 0.65);
    createEdge(center, headRight, 0.65);
    createEdge(headLeft, midLeft, 0.45);
    createEdge(headRight, midRight, 0.45);
    createEdge(midLeft, midRight, 0.25);

    captureAnchors = [
      armEndpoints[1],
      armEndpoints[2],
      armEndpoints[3],
      armEndpoints[4],
      armEndpoints[5],
      armEndpoints[6]
    ];
  }

  function spawnIsolatedNode(index) {
    const yOffsets = [0.9, 0.2, -0.55, 0.65, -0.15];
    const targetOffsets = [
      { x: 1.2, y: 0.9 },
      { x: 0.95, y: 0.35 },
      { x: 1.45, y: 0.1 },
      { x: 0.7, y: 0.7 },
      { x: 1.15, y: -0.15 }
    ];

    const y = yOffsets[index % yOffsets.length];
    const t = targetOffsets[index % targetOffsets.length];

    isolatedNode = createNode(5.9, y, 0.18);
    isolatedTarget = new THREE.Vector3(t.x, t.y, 0);
  }

  function buildGrabbersForCurrentNode() {
    const anchorSets = [
      [captureAnchors[0], captureAnchors[2], captureAnchors[4]],
      [captureAnchors[1], captureAnchors[3], captureAnchors[5]],
      [captureAnchors[0], captureAnchors[3], captureAnchors[5]],
      [captureAnchors[1], captureAnchors[2], captureAnchors[4]],
      [captureAnchors[0], captureAnchors[2], captureAnchors[5]]
    ];

    const chosen = anchorSets[capturedCount % anchorSets.length];

    currentGrabbers = chosen.map((source) => ({
      source,
      line: createDynamicLine(1),
      progress: 0
    }));
  }

  function attachCapturedNode() {
    isolatedNode.attached = true;
    isolatedNode.parentAnchor = captureAnchors[3];

    const attachSets = [
      [captureAnchors[1], captureAnchors[2], captureAnchors[4]],
      [captureAnchors[0], captureAnchors[3], captureAnchors[5]],
      [captureAnchors[1], captureAnchors[3], captureAnchors[4]],
      [captureAnchors[0], captureAnchors[2], captureAnchors[5]],
      [captureAnchors[2], captureAnchors[4], captureAnchors[5]]
    ];

    const chosen = attachSets[capturedCount % attachSets.length];
    for (const anchor of chosen) {
      createEdge(anchor, isolatedNode, 0.68);
    }

    const attachedNodes = nodes.filter(n => n.attached && n !== isolatedNode);
    if (attachedNodes.length > 0) {
      const prev = attachedNodes[attachedNodes.length - 1];
      createEdge(prev, isolatedNode, 0.3);
    }

    clearDynamicLines();
    isolatedNode = null;
    isolatedTarget = null;
    capturedCount += 1;

    if (capturedCount >= MAX_CAPTURES) {
      phase = 4;
      phaseClock = 0;
    } else {
      phase = 3;
      phaseClock = 0;
    }
  }

  function updateIdleMotion(t) {
    for (const node of nodes) {
      if (node === isolatedNode) continue;

      let xAmp = 0.02;
      let yAmp = 0.028;

      if (node.baseY < 1.0) {
        xAmp = 0.03;
        yAmp = 0.04;
      }

      if (node.baseY < 0.0) {
        xAmp = 0.04;
        yAmp = 0.05;
      }

      node.mesh.position.x = node.baseX + xAmp * Math.cos(t * 1.1 + node.phase);
      node.mesh.position.y = node.baseY + yAmp * Math.sin(t * 0.95 + node.phase * 1.17);

      const s = 1 + node.pulse * Math.sin(t * 1.8 + node.phase);
      node.mesh.scale.set(s, s, 1);
    }

    if (isolatedNode && phase < 2) {
      const s = 1 + 0.03 * Math.sin(t * 2.2);
      isolatedNode.mesh.scale.set(s, s, 1);
    }
  }

  function updatePermanentEdges() {
    for (const edge of permanentEdges) {
      updateEdge(edge);
    }
  }

  function updateCurrentGrabbers() {
    if (!isolatedNode) return;

    if (phase === 1) {
      let done = true;

      for (const g of currentGrabbers) {
        g.progress = Math.min(1, g.progress + 0.016);
        if (g.progress < 1) done = false;

        const p1 = g.source.mesh.position.clone();
        const p2 = isolatedNode.mesh.position.clone();
        const tip = p1.clone().lerp(p2, smoothstep(g.progress));
        setDynamicLine(g.line, p1, tip);
      }

      if (done) {
        phase = 2;
        phaseClock = 0;
      }
    } else if (phase === 2) {
      const pullT = 0.03;
      isolatedNode.mesh.position.lerp(isolatedTarget, pullT);

      for (const g of currentGrabbers) {
        setDynamicLine(g.line, g.source.mesh.position, isolatedNode.mesh.position);
      }

      const dx = isolatedNode.mesh.position.x - isolatedTarget.x;
      const dy = isolatedNode.mesh.position.y - isolatedTarget.y;
      if (dx * dx + dy * dy < 0.0012) {
        isolatedNode.baseX = isolatedTarget.x;
        isolatedNode.baseY = isolatedTarget.y;
        attachCapturedNode();
      }
    }
  }

  function startCycle() {
    clearSceneData();
    buildDenseOctopusGraph();
    spawnIsolatedNode(0);
    phase = 0;
    phaseClock = 0;
  }

  function animate(now) {
    if (destroyed) return;

    animationId = requestAnimationFrame(animate);

    const t = now * 0.001;
    const dt = lastTime ? Math.min(0.05, (now - lastTime) * 0.001) : 0;
    lastTime = now;
    phaseClock += dt;

    updateIdleMotion(t);
    updatePermanentEdges();
    updateCurrentGrabbers();

    if (phase === 0 && phaseClock > 1.0) {
      buildGrabbersForCurrentNode();
      phase = 1;
      phaseClock = 0;
    } else if (phase === 3 && phaseClock > 0.75) {
      spawnIsolatedNode(capturedCount);
      buildGrabbersForCurrentNode();
      phase = 1;
      phaseClock = 0;
    } else if (phase === 4 && phaseClock > 1.2) {
      startCycle();
    }

    renderer.render(scene, camera);
  }

  startCycle();
  animationId = requestAnimationFrame(animate);

  return () => {
    destroyed = true;
    if (animationId) cancelAnimationFrame(animationId);
    clearSceneData();
    renderer.dispose();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  };
}

document.querySelectorAll('.octopus-graph').forEach((el) => {
  initOctopusGraph(el);
});
</script>

I like to "visualise" stuff, and some of my favourite articles that I wrote have some form of visualisations:
- [The Sinusoidal Tetris](/2024/04/24/the-sinusoidal-tetris/);
- [The Fourier Machine](http://localhost:1313/2024/04/24/from-the-circle-to-epicycles/#the-fourier-series-machinery);
- or the latest, [The shapes of inequalities](/2026/03/16/the-shape-of-inequalities/);

But first, let me explain what I mean by that "Octopus Graph"...

---

Contrary to my GitHub username, [**nomemory**](https://github.com/nomemory/), my ability to remember things is (still) quite good. It has always been that way, and for this reason, I had a relatively easy time in school, at least up to a certain point. At the same time, I was lazier than average. *["You win some, lose some, it’s all the same"](https://www.youtube.com/watch?v=3mbvWn1EY6g&t=15s)*.

In spite of that, I struggled with memorizing isolated terms, such as lists of words, specific years and dates, the [Mendeleev table](https://en.wikipedia.org/wiki/Mendeleev%27s_predicted_elements), or the nervous and muscular systems in anatomy. 

> The method of loci is a mnemonic technique that uses visual imagination and spatial memory to organize and recall information. It involves mentally associating pieces of information with specific locations in a familiar environment, such as rooms in a house or landmarks along a well-known route. The user visualizes these locations in sequence and imagines placing the items to be remembered at each point. Recall is achieved by mentally retracing the path and using the imagined scenes to retrieve the associated information.

> This method is also referred as the memory palace, memory journey, journey method or mind palace technique.

Like most people, sometimes without even realizing it, we apply the [Loci method](https://en.wikipedia.org/wiki/Method_of_loci) to remember things. We consciously or subconsciously associate a story, an image, a taste, or a scent with the information we want to retain. 

This association works both like a key in a hash table (when we want to access data) and like a trigger in a database when an *[À la recherche du temps perdu](https://en.wikipedia.org/wiki/In_Search_of_Lost_Time)* madeleine moment happens to us. Some people are naturally better at this than others, to the point where they describe their experiences through synesthesia. The Loci method and [synesthesia](https://en.wikipedia.org/wiki/Synesthesia) are actually related, as both rely on multisensory encoding. For reasons not fully understood, our brains prefer this. While synesthesia is a natural trait and the Loci technique is a deliberate act, the underlying mechanisms work in similar ways.

Before I even read about these concepts, my father saw me "glitching" when I had to memorise some things, so he taught me to associate the silliest possible story with the thing I would otherwise forget. "A silly story is easier to remember," he said.

The first memory I have of this involves two mathematical terms that are not very common in English, but which we use in our language ([Romanian](https://en.wikipedia.org/wiki/Romanian_language)): **Abscisă** ([Abscissa](https://en.wikipedia.org/wiki/Abscissa_and_ordinate), the x-axis) and **Ordonată** ([Ordinate](https://en.wikipedia.org/wiki/Abscissa_and_ordinate), the y-axis). For reasons beyond my understanding, my brain simply could not remember which was which. I could remind myself for a day or two, but after a week, I would confuse them all over again.

So my father made a joke. He told me to imagine the **Ordonată** as a soldier sitting vertically, waiting to receive orders (*"ordine"*). And **Abscisă** as the same soldier suffering from a [dental abscess](https://en.wikipedia.org/wiki/Dental_abscess) (in our language *"absces la măsea / dinte"*), lying horizontally because of the pain inflicted by the body's response to bacteria. 

{{< img src="/images/2026-03-20-the-associations-people-make/soldier.png" width="600">}}

This silly association stuck with me, and whenever I had trouble memorizing something, I found myself desperately searching for a silly association. 

The next one I still remember involves "calling the cops." After understanding what `sine` and `cosine` meant, I kept confusing which was which. My brain decided that `sine` is the first one and `cosine` is the second one, which I could remember, but I would forget which cathete to use. In spoken Romanian, the formulas for `sine` and `cosine` are:

<div class="mp mpc">
    \[
        \text{sinus} = \frac{\text{catetă opusă}}{\text{ipotenuză}} = \frac{\text{opposite side}}{\text{hypotenuse}}
    \]
    \[
        \text{cosinus} = \frac{\text{catetă alăturată}}{\text{ipotenuză}} = \frac{\text{adjacent side}}{\text{hypotenuse}}
    \]
</div>

So I found a letter combination: **c**atetă **op**usă $\implies$ **cop** and **c**atetă **al**ăturată $\implies$ **call**.

{{< img src="/images/2026-03-20-the-associations-people-make/copcall_1.png" width="600">}}

Looking back, I wonder why I never thought of an [Op-al](https://en.wikipedia.org/wiki/Opal) stone, but I guess young kids are more easily impressed by being a cop than being a geologist.

Then there is this visual association I remember for computing the [determinants](https://en.wikipedia.org/wiki/Determinant) of a $3 \text{x} 3$ matrix. I know there are multiple ways to visualize it, but for me, it was always the [מָגֵן דָּוִד](https://en.wikipedia.org/wiki/Star_of_David), the Star of David:

{{< img src="/images/2026-03-20-the-associations-people-make/star.png" width="600">}}

Later in life, while studying [the convexity of functions](https://en.wikipedia.org/wiki/Convex_function), I once again found myself confusing the terms `convex` and `concave.` In this case, the etymology of the words helped me. The `concave` function had a `cave`:

{{< img src="/images/2026-03-20-the-associations-people-make/concave.png" width="600">}}

But what about "Convex"? It was simply the other one. Although, "vexat" is a neologism in Romanian and means the same thing ["vexed"](https://www.merriam-webster.com/dictionary/vexed) means in English, so thinking about it now, I suppose you can imagine a vexed cat with its tail raised to the sky:

{{< img src="/images/2026-03-20-the-associations-people-make/cat.png" width="600">}}

The more I learned and the more mature my mind became, the associations became more minimalistic. They no longer told a silly story. For example, this is the association I made to remember the difference between an `injective` and `surjective` function:

{{< img src="/images/2026-03-20-the-associations-people-make/injsur.png" width="600" >}}

And these associations can go even further. Some I have internalized completely, while others I still recognize and giggle about because of their silly backstories.

---

<div class="octo-canvas-wrap">
    <div class="octopus-graph"></div>
</div>

Returning to our initial canvas, I find it fascinating to think of our memory as an "Octopus" graph, reaching out with its multiple tentacles to accumulate new nodes. In my opinion, it was never about the vertices themselves, but the "edges", the connections we make. 

It is not about the chambers in the [Memory Palace](https://en.wikipedia.org/wiki/Method_of_loci), but about the corridors connecting them. 

Bonus: you will also see, that once the "absorbtion" is made, new associations are created, and probably some of the old ones dissapear.

---

### Bonus thought (1)

{{< img src="/images/2026-03-20-the-associations-people-make/meme.png" width="400">}}

I think humor is a reaction to the number of associations we trigger in order to understand something, and how "far away" the vertices are situated in the "octopus graph" of the human brain.

For example, take the previous meme. It is only funny if:
1. You know what a matrix is.
2. You know what a linear system of equations is.
3. You know what an eigenvector and eigenvalue are.
4. You have watched Mad Men.
5. You are able to interpret "human" faces.

--- 

### Bonus thought (2)

I wonder how people with [Aphantasia](https://en.wikipedia.org/wiki/Aphantasia) structure information and how their memory works.

---

### Question

In the end, what are some funny "associations" you've made ?