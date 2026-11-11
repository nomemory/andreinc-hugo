(() => {
    function setupEyes({ id, eyeRegions, referenceWidth, referenceHeight, monochrome = false }) {
        const figure = document.getElementById(id);
        if (!figure) return;

        const image = figure.querySelector('img');
        const canvas = figure.querySelector('canvas');
        if (!image || !canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Older copies of the post have a separate pause button and no stage.
        // Normalize that markup so it cannot prevent the animation from starting.
        const stage = figure.querySelector('.ormen-eyes-stage') || document.createElement('div');
        stage.classList.add('ormen-eyes-stage');
        if (!stage.parentElement) figure.insertBefore(stage, image);
        const watermarkControl = figure.querySelector('.ormen-eyes-watermark')
            || figure.querySelector('button') || document.createElement('button');
        watermarkControl.classList.add('ormen-eyes-watermark');
        watermarkControl.type = 'button';
        watermarkControl.textContent = '';
        watermarkControl.hidden = true;
        watermarkControl.setAttribute('aria-controls', `${id}-canvas`);
        stage.append(image, canvas, watermarkControl);

        function initialize() {
            if (!image.naturalWidth) return;

            canvas.id = `${id}-canvas`;
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            let scene = image;
            if (monochrome) {
                scene = document.createElement('canvas');
                scene.width = canvas.width;
                scene.height = canvas.height;
                const sceneContext = scene.getContext('2d');
                if (!sceneContext) return;
                sceneContext.filter = 'grayscale(1)';
                sceneContext.drawImage(image, 0, 0);
            }

            // Keep the original eye pixels, with a soft edge around each eye.
            // Coordinates are relative to each photograph's original dimensions.
            const eyes = document.createElement('canvas');
            eyes.width = canvas.width;
            eyes.height = canvas.height;
            const eyeContext = eyes.getContext('2d');
            if (!eyeContext) return;

            const eyeCenterX = eyeRegions.reduce((sum, [x]) => sum + x, 0) / eyeRegions.length;
            const eyeCenterY = eyeRegions.reduce((sum, [, y]) => sum + y, 0) / eyeRegions.length;
            const centerOffsetX = canvas.width * (0.5 - eyeCenterX / referenceWidth);
            const centerOffsetY = canvas.height * (0.5 - eyeCenterY / referenceHeight);

            eyeRegions.forEach(([x, y, rx, ry]) => {
                eyeContext.save();
                eyeContext.translate(x / referenceWidth * eyes.width, y / referenceHeight * eyes.height);
                eyeContext.scale(rx / referenceWidth * eyes.width, ry / referenceHeight * eyes.height);
                const edge = eyeContext.createRadialGradient(0, 0, 0, 0, 0, 1);
                edge.addColorStop(0, '#fff');
                edge.addColorStop(0.8, '#fff');
                edge.addColorStop(1, 'rgba(255, 255, 255, 0)');
                eyeContext.fillStyle = edge;
                eyeContext.fillRect(-1, -1, 2, 2);
                eyeContext.restore();
            });
            eyeContext.globalCompositeOperation = 'source-in';
            eyeContext.drawImage(scene, 0, 0);
            eyeContext.globalCompositeOperation = 'source-over';
            eyeRegions.forEach(([x, y, rx, ry, color]) => {
                if (!color) return;
                eyeContext.save();
                eyeContext.scale(eyes.width / referenceWidth, eyes.height / referenceHeight);
                eyeContext.beginPath();
                eyeContext.arc(x, y, Math.min(rx, ry) * 0.5, 0, Math.PI * 2);
                eyeContext.fillStyle = color;
                eyeContext.globalAlpha = 0.4;
                eyeContext.fill();
                eyeContext.globalAlpha = 1;
                eyeContext.strokeStyle = color;
                eyeContext.lineWidth = 2;
                eyeContext.shadowColor = color;
                eyeContext.shadowBlur = 4;
                eyeContext.stroke();
                eyeContext.restore();
            });

            const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
            let playing = !motionPreference.matches;
            let visible = false;
            let elapsed = 0;
            let previousTime = null;
            let frame = null;

            // Original Blackstar star and glyphs by Barnbrook, adapted as a watermark.
            // Source: https://bowieblackstar.net/ — CC BY-NC-SA 4.0.
            const blackstar = new Path2D('M300,48l-44.4,135.7H112.1l116.1,83.9l-44.3,135.8L300,319.5l116.1,83.9l-44.3-135.8l116.1-83.9H344.4L300,48z M50,484.1l14.2-43.4l22.9,70.1L50,484.1z M188.9,512L166,495.5L143.1,512l8.7-26.8l-22.9-16.5h28.3l8.8-26.8l8.7,26.8h28.4l-23,16.5L188.9,512z M245.9,512l8.8-26.8l-22.9-16.5h74.1L245.9,512z M365.9,512l-60-43.3h74.2l-22.9,16.5L365.9,512z M437.4,495.5L414.5,512l22.9-70.1l23,70.1L437.4,495.5z M535.8,512l-22.9-16.5l-14.1-10.3l5.4-16.5l8.7-26.8l8.8,26.8H550l-22.9,16.5L535.8,512z');

            const watermarkSize = Math.min(canvas.width, canvas.height) * 0.15;
            const watermarkMargin = Math.min(canvas.width, canvas.height) * 0.025;
            // Allow enough room for every corner of the artwork as it spins.
            const watermarkRadius = watermarkSize * 0.6;
            const watermarkX = canvas.width - watermarkMargin - watermarkRadius;
            const watermarkY = canvas.height - watermarkMargin - watermarkRadius;

            // Keep the transparent, keyboard-accessible control over the watermark
            // at every display size, using the same coordinates as the drawing.
            watermarkControl.style.left = `${watermarkX / canvas.width * 100}%`;
            watermarkControl.style.top = `${watermarkY / canvas.height * 100}%`;
            watermarkControl.style.width = `${watermarkRadius * 2 / canvas.width * 100}%`;
            watermarkControl.style.height = `${watermarkRadius * 2 / canvas.height * 100}%`;

            function drawWatermark(darkness) {
                context.save();
                context.translate(watermarkX, watermarkY);
                context.rotate((elapsed % 12000) / 12000 * Math.PI * 2);
                context.scale(watermarkSize / 600, watermarkSize / 600);
                context.translate(-300, -280);
                context.globalAlpha = 0.18 + darkness * 0.12;
                context.fillStyle = '#fff';
                context.fill(blackstar);
                context.restore();
            }

            function smoothstep(value) {
                return value * value * (3 - 2 * value);
            }

            function draw() {
                const time = elapsed % 12000;
                let darkness = 0;
                if (time >= 2000 && time < 5000) {
                    darkness = smoothstep((time - 2000) / 3000);
                } else if (time >= 5000 && time < 7000) {
                    darkness = 1;
                } else if (time >= 7000 && time < 10000) {
                    darkness = 1 - smoothstep((time - 7000) / 3000);
                }

                context.globalAlpha = 1;
                context.fillStyle = '#000';
                context.fillRect(0, 0, canvas.width, canvas.height);
                // Move both layers together so the eyes stay aligned with the
                // fading photograph, reaching the center when it is fully dark.
                const offsetX = centerOffsetX * darkness;
                const offsetY = centerOffsetY * darkness;
                context.globalAlpha = 1 - darkness;
                context.drawImage(scene, offsetX, offsetY);
                context.globalAlpha = 1;
                context.drawImage(eyes, offsetX, offsetY);
                drawWatermark(darkness);
            }

            function tick(time) {
                if (previousTime !== null) elapsed += time - previousTime;
                previousTime = time;
                draw();
                frame = requestAnimationFrame(tick);
            }

            function updatePlayback() {
                if (frame !== null) cancelAnimationFrame(frame);
                frame = null;
                previousTime = null;
                const action = playing ? 'Pause animation' : 'Resume animation';
                watermarkControl.setAttribute('aria-label', action);
                watermarkControl.title = action;
                if (playing && visible && !document.hidden) {
                    frame = requestAnimationFrame(tick);
                }
            }

            watermarkControl.addEventListener('click', () => {
                playing = !playing;
                updatePlayback();
            });
            motionPreference.addEventListener('change', () => {
                playing = !motionPreference.matches;
                elapsed = 0;
                draw();
                updatePlayback();
            });
            document.addEventListener('visibilitychange', updatePlayback);
            const observer = new IntersectionObserver(([entry]) => {
                visible = entry.isIntersecting;
                updatePlayback();
            });
            observer.observe(canvas);

            draw();
            image.hidden = true;
            canvas.hidden = false;
            watermarkControl.hidden = false;
            updatePlayback();
        }

        // Leave the photograph visible if JavaScript or the image fails to load.
        if (image.complete) initialize();
        else image.addEventListener('load', initialize, { once: true });
    }

    setupEyes({
        id: 'ormen-eyes',
        referenceWidth: 1500,
        referenceHeight: 1331,
        eyeRegions: [[1069, 466, 78, 44], [1235, 463, 78, 44]]
    });
    setupEyes({
        id: 'ormen-blindfold',
        referenceWidth: 1080,
        referenceHeight: 720,
        monochrome: true,
        eyeRegions: [[498, 180, 28, 24, '#79afd3'], [620, 215, 26, 24, '#83a97d']]
    });
})();
