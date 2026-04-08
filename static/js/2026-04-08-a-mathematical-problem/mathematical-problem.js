import * as THREE from "three";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

const COLORS = {
    background: 0xf6f8fa,
    grid: 0xe7eaee,
    ink: 0x111111,
    circleA: 0x2b6cb0,
    circleB: 0xc06a2b,
    triangle: 0x1f513f,
    fill: 0x628e7f
};

const ACTIONS = {
    MARK_AB: 1,
    DRAW_AB: 2,
    DRAW_CIRCLE_FROM_A: 3,
    DRAW_CIRCLE_FROM_B: 4,
    MARK_C: 5,
    DRAW_CA: 6,
    DRAW_CB: 7,
    COMPLETE_TRIANGLE: 8
};

const LABEL_OFFSET_Y = 0.28;

async function initMathematicalProblem() {
    const mount = document.getElementById("cmp-three");
    const poemEl = document.getElementById("cmp-poem");
    const stageEl = document.querySelector(".cmp-stage");
    const sideEl = document.querySelector(".cmp-side");
    const headEl = sideEl.querySelector(".cmp-head");
    const prevBtn = document.getElementById("cmp-prev");
    const nextBtn = document.getElementById("cmp-next");
    const playBtn = document.getElementById("cmp-play");
    const resetBtn = document.getElementById("cmp-reset");

    if (!mount || !poemEl || !stageEl || !sideEl || !headEl || !prevBtn || !nextBtn || !playBtn || !resetBtn) {
        return;
    }

    const poem = [
        { type: "section", text: "I" },
        { text: "On a given finite Line" },
        { text: "Which must no way incline;" },
        { text: "To describe an equi--" },
        { text: "--lateral Tri--" },
        { text: "--A, N, G, L, E." },
        { text: "Now let A. B.", action: ACTIONS.MARK_AB },
        { text: "Be the given line", action: ACTIONS.DRAW_AB },
        { text: "Which must no way incline;" },
        { text: "The great Mathematician" },
        { text: "Makes this Requisition," },
        { text: "That we describe an Equi--" },
        { text: "--lateral Tri--" },
        { text: "--angle on it:" },
        { text: "Aid us, Reason--aid us, Wit!" },

        { type: "section", text: "II" },
        { text: "From the centre A. at the distance A. B." },
        { text: "Describe the circle B. C. D.", action: ACTIONS.DRAW_CIRCLE_FROM_A },
        { text: "At the distance B. A. from B. the centre" },
        { text: "The round A. C. E. to describe boldly venture.", action: ACTIONS.DRAW_CIRCLE_FROM_B },
        { text: "(Third Postulate see.)" },
        { text: "And from the point C.", action: ACTIONS.MARK_C },
        { text: "In which the circles make a pother" },
        { text: "Cutting and slashing one another," },
        { text: "Bid the straight lines a journeying go,", action: ACTIONS.DRAW_CA },
        { text: "C. A., C. B. those lines will show.", action: ACTIONS.DRAW_CB },
        { text: "To the points, which by A. B. are reckon'd," },
        { text: "And postulate the second" },
        { text: "For Authority ye know." },
        { text: "A. B. C.", action: ACTIONS.COMPLETE_TRIANGLE },
        { text: "Triumphant shall be" },
        { text: "An Equilateral Triangle," },
        { text: "Not Peter Pindar carp, not Zoilus can wrangle." },

        { type: "section", text: "III" },
        { text: "Because the point A. is the centre" },
        { text: "Of the circular B. C. D." },
        { text: "And because the point B. is the centre" },
        { text: "Of the circular A. C. E." },
        { text: "A. C. to A. B. and B. C. to B. A." },
        { text: "Harmoniously equal for ever must stay;" },
        { text: "Then C. A. and B. C." },
        { text: "Both extend the kind hand" },
        { text: "To the basis, A. B." },
        { text: "Unambitiously join'd in Equality's Band." },
        { text: "But to the same powers, when two powers are equal," },
        { text: "My mind forbodes the sequel;" },
        { text: "My mind does some celestial impulse teach," },
        { text: "And equalises each to each." },
        { text: "Thus C. A. with B. C. strikes the same sure alliance," },
        { text: "That C. A. and B. C. had with A. B. before;" },
        { text: "And in mutual affiance," },
        { text: "None attempting to soar" },
        { text: "Above another," },
        { text: "The unanimous three" },
        { text: "C. A. and B. C. and A. B." },
        { text: "All are equal, each to his brother," },
        { text: "Preserving the balance of power so true:" },
        { text: "Ah! the like would the proud Autocratorix do!" },
        { text: "At taxes impending not Britain would tremble," },
        { text: "Nor Prussia struggle her fear to dissemble;" },
        { text: "Nor the Mah'met-sprung Wight," },
        { text: "The great Mussulman" },
        { text: "Would stain his Divan" },
        { text: "With Urine the soft-flowing daughter of Fright." },

        { type: "section", text: "IV" },
        { text: "But rein your stallion in, too daring Nine!" },
        { text: "Should Empires bloat the scientific line?" },
        { text: "Or with dishevell'd hair all madly do ye run" },
        { text: "For transport that your task is done?" },
        { text: "For done it is--the cause is tried!" },
        { text: "And Proposition, gentle Maid," },
        { text: "Who soothly ask'd stern Demonstration's aid," },
        { text: "Has prov'd her right, and A. B. C." },
        { text: "Of Angles three" },
        { text: "Is shown to be of equal side;" },
        { text: "And now our weary steed to rest in fine," },
        { text: "'Tis rais'd upon A. B. the straight, the given line." }
    ];

    const entryEls = [];
    poem.forEach((entry) => {
        const el = document.createElement("p");
        el.className = entry.type === "section" ? "cmp-poem-section" : "cmp-poem-line";
        el.textContent = entry.text;
        if (entry.action) {
            el.classList.add("is-jumpable");
            el.title = "Jump to this geometric step";
            el.addEventListener("click", () => {
                stopPlaying();
                setIndex(poem.indexOf(entry));
            });
        }
        poemEl.appendChild(el);
        entryEls.push(el);
    });

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.background);

    const camera = new THREE.OrthographicCamera(-6, 6, 5.5, -5.5, 0.1, 20);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.className = "cmp-label-layer";
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0";
    labelRenderer.domElement.style.left = "0";
    labelRenderer.domElement.style.width = "100%";
    labelRenderer.domElement.style.height = "100%";
    labelRenderer.domElement.style.pointerEvents = "none";
    mount.appendChild(labelRenderer.domElement);

    const A = new THREE.Vector3(-3.25, -1.35, 0);
    const B = new THREE.Vector3(3.25, -1.35, 0);
    const side = A.distanceTo(B);
    const mid = A.clone().add(B).multiplyScalar(0.5);
    const height = Math.sqrt(3) * side / 2;
    const C = new THREE.Vector3(mid.x, mid.y + height, 0);
    const D = new THREE.Vector3(A.x + Math.cos(-0.22) * side, A.y + Math.sin(-0.22) * side, 0);
    const E = new THREE.Vector3(B.x + Math.cos(Math.PI + 0.22) * side, B.y + Math.sin(Math.PI + 0.22) * side, 0);

    const positions = { A, B, C, D, E };

    function makeLabel(name) {
        const el = document.createElement("span");
        el.className = "cmp-label";
        el.textContent = name;

        const label = new CSS2DObject(el);
        label.position.copy(positions[name]);
        label.position.y += LABEL_OFFSET_Y;
        label.visible = false;
        scene.add(label);
        return label;
    }

    function makeLine(points, color, opacity = 1) {
        return new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity })
        );
    }

    function makeLoop(points, color, opacity = 1) {
        return new THREE.LineLoop(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity })
        );
    }

    function makeCircle(center, radius, color, opacity = 1) {
        const curve = new THREE.EllipseCurve(center.x, center.y, radius, radius, 0, Math.PI * 2);
        return makeLoop(curve.getPoints(180), color, opacity);
    }

    function makePoint(pos, color, radius = 0.1) {
        const mesh = new THREE.Mesh(
            new THREE.CircleGeometry(radius, 28),
            new THREE.MeshBasicMaterial({ color })
        );
        mesh.position.copy(pos);
        return mesh;
    }

    function makeTriangleFill() {
        const shape = new THREE.Shape();
        shape.moveTo(A.x, A.y);
        shape.lineTo(B.x, B.y);
        shape.lineTo(C.x, C.y);
        shape.closePath();
        return new THREE.Mesh(
            new THREE.ShapeGeometry(shape),
            new THREE.MeshBasicMaterial({
                color: COLORS.fill,
                transparent: true,
                opacity: 0.1,
                side: THREE.DoubleSide,
                depthWrite: false
            })
        );
    }

    function makeGrid() {
        const helper = new THREE.GridHelper(16, 16, COLORS.grid, COLORS.grid);
        helper.rotation.x = Math.PI / 2;
        helper.position.z = -0.02;

        const materials = Array.isArray(helper.material) ? helper.material : [helper.material];
        materials.forEach((material) => {
            material.transparent = true;
            material.opacity = 0.9;
        });

        return helper;
    }

    const grid = makeGrid();
    const base = makeLine([A, B], COLORS.ink);
    const circleA = makeCircle(A, side, COLORS.circleA, 0.9);
    const circleB = makeCircle(B, side, COLORS.circleB, 0.85);
    const edgeCA = makeLine([C, A], COLORS.triangle);
    const edgeCB = makeLine([C, B], COLORS.triangle);
    const fill = makeTriangleFill();
    const pointA = makePoint(A, COLORS.ink, 0.08);
    const pointB = makePoint(B, COLORS.ink, 0.08);
    const pointC = makePoint(C, COLORS.triangle, 0.095);
    const labels = {
        A: makeLabel("A"),
        B: makeLabel("B"),
        C: makeLabel("C"),
        D: makeLabel("D"),
        E: makeLabel("E")
    };

    scene.add(grid, fill, circleA, circleB, base, edgeCA, edgeCB, pointA, pointB, pointC);

    let currentIndex = 0;
    let playing = false;
    let timer = null;

    function sceneLevelAt(index) {
        let level = 0;
        for (let i = 0; i <= index; i += 1) {
            if (poem[i].action) {
                level = poem[i].action;
            }
        }
        return level;
    }

    function activeLabels(level) {
        if (level >= ACTIONS.COMPLETE_TRIANGLE) return ["A", "B", "C", "D", "E"];
        if (level >= ACTIONS.MARK_C) return ["A", "B", "C", "D", "E"];
        if (level >= ACTIONS.DRAW_CIRCLE_FROM_B) return ["A", "B", "D", "E"];
        if (level >= ACTIONS.DRAW_CIRCLE_FROM_A) return ["A", "B", "D"];
        if (level >= ACTIONS.MARK_AB) return ["A", "B"];
        return [];
    }

    function syncSideHeight() {
        const stageHeight = Math.round(stageEl.getBoundingClientRect().height);
        if (!stageHeight) return;

        sideEl.style.setProperty("--cmp-side-height", `${stageHeight}px`);
        sideEl.style.height = `${stageHeight}px`;

        const sideStyle = window.getComputedStyle(sideEl);
        const verticalPadding =
            parseFloat(sideStyle.paddingTop || "0") +
            parseFloat(sideStyle.paddingBottom || "0");
        const available =
            stageHeight -
            verticalPadding -
            headEl.getBoundingClientRect().height;

        poemEl.style.height = `${Math.max(120, Math.floor(available))}px`;
    }

    function resize() {
        const width = mount.clientWidth || 640;
        const heightPx = mount.clientHeight || Math.round(width * 1.08);
        const aspect = width / heightPx;
        const viewHeight = 11;

        renderer.setSize(width, heightPx, false);
        labelRenderer.setSize(width, heightPx);
        camera.top = viewHeight / 2;
        camera.bottom = -viewHeight / 2;
        camera.left = -(viewHeight * aspect) / 2;
        camera.right = (viewHeight * aspect) / 2;
        camera.updateProjectionMatrix();

        syncSideHeight();
        renderer.render(scene, camera);
        updateLabels(sceneLevelAt(currentIndex));
        labelRenderer.render(scene, camera);
    }

    function updateLabels(level) {
        const visible = new Set(activeLabels(level));
        Object.entries(labels).forEach(([name, label]) => {
            label.visible = visible.has(name);
        });
    }

    function updateScene(level) {
        pointA.visible = level >= ACTIONS.MARK_AB;
        pointB.visible = level >= ACTIONS.MARK_AB;
        base.visible = level >= ACTIONS.DRAW_AB;
        circleA.visible = level >= ACTIONS.DRAW_CIRCLE_FROM_A;
        circleB.visible = level >= ACTIONS.DRAW_CIRCLE_FROM_B;
        pointC.visible = level >= ACTIONS.MARK_C;
        edgeCA.visible = level >= ACTIONS.DRAW_CA;
        edgeCB.visible = level >= ACTIONS.DRAW_CB;
        fill.visible = level >= ACTIONS.COMPLETE_TRIANGLE;
    }

    function updateUi() {
        const level = sceneLevelAt(currentIndex);

        updateScene(level);
        renderer.render(scene, camera);
        
        updateLabels(level);
        labelRenderer.render(scene, camera);

        entryEls.forEach((el, index) => {
            el.classList.toggle("is-current", index === currentIndex);
            el.classList.toggle("is-active", index === currentIndex && Boolean(poem[index].action));
        });

        const currentEl = entryEls[currentIndex];
        if (currentEl) {
            currentEl.scrollIntoView({ block: "nearest" });
        }

        syncSideHeight();
    }

    function setIndex(next) {
        currentIndex = (next + poem.length) % poem.length;
        updateUi();
    }

    function clearTimer() {
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
    }

    function stopPlaying() {
        playing = false;
        playBtn.textContent = "auto";
        clearTimer();
    }

    function togglePlay() {
        if (playing) {
            stopPlaying();
            return;
        }
        playing = true;
        playBtn.textContent = "stop";
        clearTimer();
        timer = window.setInterval(() => setIndex(currentIndex + 1), 1400);
    }

    prevBtn.addEventListener("click", () => {
        stopPlaying();
        setIndex(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        stopPlaying();
        setIndex(currentIndex + 1);
    });

    playBtn.addEventListener("click", togglePlay);
    resetBtn.addEventListener("click", () => {
        stopPlaying();
        setIndex(0);
    });
    window.addEventListener("resize", resize);

    if (window.ResizeObserver) {
        const observer = new ResizeObserver(resize);
        observer.observe(mount);
        observer.observe(stageEl);
    }

    function boot() {
        resize();
        setIndex(0);
        syncSideHeight();
    }

    requestAnimationFrame(() => {
        boot();
        requestAnimationFrame(syncSideHeight);
    });
}

function bootMathematicalProblem() {
    initMathematicalProblem().catch((error) => {
        console.error("Failed to initialize A mathematical problem.", error);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootMathematicalProblem, { once: true });
} else {
    bootMathematicalProblem();
}
