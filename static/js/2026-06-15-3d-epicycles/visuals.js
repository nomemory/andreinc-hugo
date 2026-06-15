import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FACE_POINTS } from './face-points.js';
import { FACE_FOURIER_COEFFICIENTS } from './face-fourier-coefficients.js';

const CUBE_HALF = 3.5;
const ANIMATION_SPEED = 0.24;
const COLORS = {
    x: 0xe63946,
    y: 0x2a9d8f,
    z: 0x4361ee,
    ink: 0x111111,
    guide: 0x888888,
    cube: 0x555555,
    sample: 0x666666,
    surface: 0x9aa5b1,
    target: 0xaaaaaa
};

function createFourierCube({
    mountId,
    controlPrefix,
    providedSamples,
    providedCoefficients,
    surfaceObject,
    projectToSurface,
    showSourcePath = true,
    initialCamera = new THREE.Vector3(9, 8, 10),
    termCount = 49
}) {
    const container = document.getElementById(mountId);
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f8fa);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.copy(initialCamera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.target.set(0, 0, 0);

    function resize() {
        const width = Math.max(280, container.clientWidth);
        const height = Math.round(width * 620 / 760);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    function makeLine(points, color, opacity = 1) {
        return new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({
                color,
                transparent: opacity < 1,
                opacity
            })
        );
    }

    function replaceLinePoints(line, points) {
        line.geometry.dispose();
        line.geometry = new THREE.BufferGeometry().setFromPoints(points);
    }

    const samples = providedSamples;

    const cube = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE_HALF * 2, CUBE_HALF * 2, CUBE_HALF * 2)),
        new THREE.LineBasicMaterial({ color: COLORS.cube, transparent: true, opacity: 0.72 })
    );
    scene.add(cube);

    [
        [COLORS.x, new THREE.Vector3(0, 0, CUBE_HALF), new THREE.Euler(0, 0, 0)],
        [COLORS.y, new THREE.Vector3(CUBE_HALF, 0, 0), new THREE.Euler(0, Math.PI / 2, 0)],
        [COLORS.z, new THREE.Vector3(0, CUBE_HALF, 0), new THREE.Euler(-Math.PI / 2, 0, 0)]
    ].forEach(([color, position, rotation]) => {
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(CUBE_HALF * 2, CUBE_HALF * 2),
            new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: 0.035,
                side: THREE.DoubleSide,
                depthWrite: false
            })
        );
        plane.position.copy(position);
        plane.rotation.copy(rotation);
        scene.add(plane);
    });

    if (surfaceObject) scene.add(surfaceObject);

    if (showSourcePath) {
        scene.add(new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(samples),
            new THREE.PointsMaterial({
                color: COLORS.sample,
                size: 0.024,
                transparent: true,
                opacity: 0.7
            })
        ));
        scene.add(makeLine([...samples, samples[0]], COLORS.target, 0.35));
    }

    const machines = [
        {
            color: COLORS.x,
            origin: new THREE.Vector3(0, 0, CUBE_HALF),
            outputAxis: new THREE.Vector3(1, 0, 0),
            helperAxis: new THREE.Vector3(0, 1, 0),
            coefficients: providedCoefficients.xy
        },
        {
            color: COLORS.y,
            origin: new THREE.Vector3(CUBE_HALF, 0, 0),
            outputAxis: new THREE.Vector3(0, 1, 0),
            helperAxis: new THREE.Vector3(0, 0, 1),
            coefficients: providedCoefficients.yz
        },
        {
            color: COLORS.z,
            origin: new THREE.Vector3(0, CUBE_HALF, 0),
            outputAxis: new THREE.Vector3(0, 0, 1),
            helperAxis: new THREE.Vector3(1, 0, 0),
            coefficients: providedCoefficients.zx
        }
    ];

    function makeFaceGraph(machine, coefficients) {
        const resolution = 1024;
        const canvas = document.createElement('canvas');
        canvas.width = resolution;
        canvas.height = resolution;
        const context = canvas.getContext('2d');
        const center = resolution / 2;
        const graphHalfSize = resolution * 0.48;
        const maxAmplitude = Math.max(...coefficients.map(({ a }) => a));
        const amplitudeScale = graphHalfSize * 0.9 / maxAmplitude;
        const color = new THREE.Color(machine.color);
        const rgb = `${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}`;

        context.strokeStyle = `rgba(${rgb}, 0.07)`;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(center, 0);
        context.lineTo(center, resolution);
        context.moveTo(0, center);
        context.lineTo(resolution, center);
        context.stroke();

        context.strokeStyle = `rgba(${rgb}, 0.055)`;
        context.lineWidth = 1.25;
        coefficients.forEach((coefficient) => {
            context.beginPath();
            for (let step = 0; step <= 512; step += 1) {
                const graphX = -1 + 2 * step / 512;
                const angle = coefficient.f * Math.PI * 2 * graphX + coefficient.p;
                const x = center + graphX * graphHalfSize;
                const y = center - coefficient.a * Math.cos(angle) * amplitudeScale;
                if (step === 0) context.moveTo(x, y);
                else context.lineTo(x, y);
            }
            context.stroke();
        });

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const normal = machine.outputAxis.clone().cross(machine.helperAxis);
        const centerPoint = machine.origin.clone().addScaledVector(normal, -0.012);
        const corners = [
            centerPoint.clone().addScaledVector(machine.outputAxis, -CUBE_HALF).addScaledVector(machine.helperAxis, -CUBE_HALF),
            centerPoint.clone().addScaledVector(machine.outputAxis, CUBE_HALF).addScaledVector(machine.helperAxis, -CUBE_HALF),
            centerPoint.clone().addScaledVector(machine.outputAxis, CUBE_HALF).addScaledVector(machine.helperAxis, CUBE_HALF),
            centerPoint.clone().addScaledVector(machine.outputAxis, -CUBE_HALF).addScaledVector(machine.helperAxis, CUBE_HALF)
        ];
        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(corners);
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute([
            0, 0, 1, 0, 1, 1, 0, 1
        ], 2));
        geometry.setIndex([0, 1, 2, 0, 2, 3]);

        return new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: false
            })
        );
    }

    machines.forEach((machine) => {
        machine.group = new THREE.Group();
        scene.add(machine.group);
        machine.group.add(makeLine([
            machine.origin.clone().addScaledVector(machine.outputAxis, -CUBE_HALF),
            machine.origin.clone().addScaledVector(machine.outputAxis, CUBE_HALF)
        ], machine.color, 0.28));

        const visibleCoefficients = machine.coefficients.slice(0, termCount);
        machine.group.add(makeFaceGraph(machine, visibleCoefficients));

        machine.circles = machine.coefficients.map((coefficient) => {
            const points = [];
            for (let index = 0; index <= 64; index += 1) {
                const angle = index * Math.PI * 2 / 64;
                points.push(
                    machine.outputAxis.clone().multiplyScalar(coefficient.a * Math.cos(angle))
                        .addScaledVector(machine.helperAxis, coefficient.a * Math.sin(angle))
                );
            }
            const circle = makeLine(points, machine.color, 0.64);
            machine.group.add(circle);
            return circle;
        });

        machine.arms = machine.coefficients.map(() => {
            const arm = makeLine([new THREE.Vector3(), new THREE.Vector3()], machine.color, 0.82);
            machine.group.add(arm);
            return arm;
        });

        machine.endpoint = new THREE.Mesh(
            new THREE.SphereGeometry(0.06, 12, 12),
            new THREE.MeshBasicMaterial({ color: machine.color })
        );
        machine.group.add(machine.endpoint);
    });

    const projectionColors = [COLORS.y, COLORS.z, COLORS.x];
    const innerBoxLines = Array.from({ length: 12 }, (_, index) => {
        const edge = makeLine(
            [new THREE.Vector3(), new THREE.Vector3()],
            index < 3 ? projectionColors[index] : COLORS.guide,
            index < 3 ? 0.9 : 0.48
        );
        scene.add(edge);
        return edge;
    });

    const movingPoint = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 18, 18),
        new THREE.MeshBasicMaterial({ color: COLORS.ink })
    );
    scene.add(movingPoint);

    const rawPoint = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 14, 14),
        new THREE.MeshBasicMaterial({ color: COLORS.guide })
    );
    rawPoint.visible = Boolean(projectToSurface);
    scene.add(rawPoint);

    const surfaceCorrection = makeLine(
        [new THREE.Vector3(), new THREE.Vector3()],
        COLORS.guide,
        0.5
    );
    surfaceCorrection.visible = Boolean(projectToSurface);
    scene.add(surfaceCorrection);

    const trace = makeLine([], COLORS.ink);
    scene.add(trace);

    const pauseButton = document.getElementById(`${controlPrefix}-pause`);
    const resetViewButton = document.getElementById(`${controlPrefix}-reset-view`);
    let running = true;
    let time = 0;
    let previousTime = performance.now();
    let tracePoints = [];

    function resetTrace() {
        tracePoints = [];
        replaceLinePoints(trace, tracePoints);
    }

    pauseButton?.addEventListener('click', () => {
        running = !running;
        pauseButton.textContent = running ? 'Pause [ ⏸ ]' : 'Resume [ ▶ ]';
    });
    resetViewButton?.addEventListener('click', () => {
        camera.position.copy(initialCamera);
        controls.target.set(0, 0, 0);
        controls.update();
    });

    function updateMachine(machine, t) {
        let center = machine.origin.clone();
        const visibleCount = Math.min(termCount, machine.coefficients.length);

        machine.coefficients.forEach((coefficient, index) => {
            const visible = index < visibleCount;
            machine.circles[index].visible = visible;
            machine.arms[index].visible = visible;
            if (!visible) return;

            machine.circles[index].position.copy(center);
            const angle = coefficient.f * t + coefficient.p;
            const next = center.clone()
                .addScaledVector(machine.outputAxis, coefficient.a * Math.cos(angle))
                .addScaledVector(machine.helperAxis, coefficient.a * Math.sin(angle));
            replaceLinePoints(machine.arms[index], [center.clone(), next.clone()]);
            center = next;
        });

        machine.endpoint.position.copy(center);
        return center;
    }

    function updateConstruction(t) {
        const outputs = machines.map((machine) => updateMachine(machine, t));
        const point = new THREE.Vector3(outputs[0].x, outputs[0].y, outputs[1].z);
        const corner = new THREE.Vector3(CUBE_HALF, CUBE_HALF, CUBE_HALF);
        const frontRight = new THREE.Vector3(CUBE_HALF, outputs[0].y, CUBE_HALF);
        const frontTop = new THREE.Vector3(outputs[0].x, CUBE_HALF, CUBE_HALF);
        const rightTop = new THREE.Vector3(CUBE_HALF, CUBE_HALF, outputs[1].z);
        const edges = [
            [point, outputs[1]], [point, outputs[2]], [point, outputs[0]],
            [outputs[0], frontRight], [outputs[0], frontTop],
            [outputs[1], frontRight], [outputs[1], rightTop],
            [outputs[2], frontTop], [outputs[2], rightTop],
            [frontRight, corner], [frontTop, corner], [rightTop, corner]
        ];

        innerBoxLines.forEach((edge, index) => {
            replaceLinePoints(edge, edges[index].map((edgePoint) => edgePoint.clone()));
        });

        const visiblePoint = projectToSurface
            ? projectToSurface(point.clone())
            : point.clone();

        rawPoint.position.copy(point);
        movingPoint.position.copy(visiblePoint);
        if (projectToSurface) {
            replaceLinePoints(surfaceCorrection, [point.clone(), visiblePoint.clone()]);
        }
        tracePoints.push(visiblePoint);
        if (tracePoints.length > 1500) tracePoints.shift();
        replaceLinePoints(trace, tracePoints);
    }

    function animate(now) {
        requestAnimationFrame(animate);
        const delta = Math.min((now - previousTime) / 1000, 0.05);
        previousTime = now;

        if (running) {
            time += delta * ANIMATION_SPEED;
            if (time >= Math.PI * 2) {
                time %= Math.PI * 2;
                resetTrace();
            }
            updateConstruction(time);
        }

        controls.update();
        renderer.render(scene, camera);
    }

    updateConstruction(time);
    requestAnimationFrame(animate);
}

async function createScannedFaceExample() {
    const gltf = await new GLTFLoader().loadAsync(
        '/models/2026-06-15-3d-epicycles/LeePerrySmith.glb'
    );
    const face = gltf.scene;
    const sourceBox = new THREE.Box3().setFromObject(face);
    const sourceSize = sourceBox.getSize(new THREE.Vector3());
    const scale = 4.7 / Math.max(sourceSize.x, sourceSize.y, sourceSize.z);

    face.scale.setScalar(scale);
    face.updateMatrixWorld(true);
    const scaledCenter = new THREE.Box3().setFromObject(face).getCenter(new THREE.Vector3());
    face.position.sub(scaledCenter);
    face.updateMatrixWorld(true);

    const meshes = [];
    face.traverse((child) => {
        if (!child.isMesh) return;
        child.material = new THREE.MeshBasicMaterial({
            color: COLORS.surface,
            transparent: true,
            opacity: 0.16,
            wireframe: true,
            side: THREE.DoubleSide
        });
        meshes.push(child);
    });

    const box = new THREE.Box3().setFromObject(face);
    const center = box.getCenter(new THREE.Vector3());
    const raycaster = new THREE.Raycaster();
    const projectToFace = (point) => {
        const radial = point.clone().sub(center);
        if (radial.lengthSq() < 0.000001) return point;

        const direction = radial.normalize();
        raycaster.set(center.clone().addScaledVector(direction, 8), direction.clone().negate());
        const hit = raycaster.intersectObjects(meshes, false)[0];
        return hit ? hit.point.clone() : point;
    };
    const samples = FACE_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z));

    createFourierCube({
        mountId: 'head-epicycles',
        controlPrefix: 'head-epicycle',
        providedSamples: samples,
        providedCoefficients: FACE_FOURIER_COEFFICIENTS,
        surfaceObject: face,
        projectToSurface: projectToFace,
        initialCamera: new THREE.Vector3(8.5, 6.5, 10),
        termCount: 97
    });
}

createScannedFaceExample().catch((error) => {
    console.error('Unable to load the scanned face model.', error);
});
