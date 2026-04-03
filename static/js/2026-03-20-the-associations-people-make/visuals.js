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
