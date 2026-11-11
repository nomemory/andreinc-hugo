(() => {
    const figure = document.getElementById('ormen-villa');
    if (!figure) return;
    const image = figure.querySelector('img');
    const canvas = figure.querySelector('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;
    const nameButtons = document.querySelectorAll('[data-ormen-toggle]');
    const villaControl = figure.querySelector('[data-ormen-toggle]');
    const canvasDescription = canvas.getAttribute('aria-label');
    let villaName = 'Ormen';

    nameButtons.forEach(button => button.addEventListener('click', () => {
        villaName = villaName === 'Ormen' ? 'Allmen' : 'Ormen';
        const nextName = villaName === 'Ormen' ? 'Allmen' : 'Ormen';
        nameButtons.forEach(control => {
            if (control !== villaControl) control.textContent = villaName;
            control.setAttribute('aria-pressed', String(villaName === 'Allmen'));
            control.setAttribute('aria-label', `Change ${villaName} to ${nextName}`);
        });
        canvas.setAttribute('aria-label', canvasDescription.replace('The Villa of Ormen', `The Villa of ${villaName}`));
        draw();
    }));

    // The same six fragments and final rotations as the recomposition below.
    // Source: https://bowieblackstar.net/ — CC BY-NC-SA 4.0, adapted.
    const fragments = [
        ['M50 484.1l14.2-43.4 22.9 70.1Z', 64.2, 479.45, -72],
        ['M188.9 512L166 495.5 143.1 512l8.7-26.8-22.9-16.5h28.3l8.8-26.8 8.7 26.8h28.4l-23 16.5Z', 166, 480.65, 360],
        ['M245.9 512l8.8-26.8-22.9-16.5h74.1Z', 268.9, 480.65, 72],
        ['M365.9 512l-60-43.3h74.2l-22.9 16.5Z', 343, 480.65, -144],
        ['M437.4 495.5L414.5 512l22.9-70.1 23 70.1Z', 437.4, 480.65, 144],
        ['M535.8 512l-22.9-16.5-14.1-10.3 5.4-16.5 8.7-26.8 8.8 26.8H550l-22.9 16.5Z', 512.9, 480.65, -72]
    ].map(([path, x, y, rotation]) => ({ path: new Path2D(path), x, y, rotation: rotation * Math.PI / 180 }));
    const villaTarget = [860, 247];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scene = null;
    let elapsed = 0;
    let previousTime = null;
    let frame = null;
    let visible = false;

    function drawArrow(points, headSize) {
        context.beginPath();
        context.moveTo(...points[0]);
        points.slice(1).forEach(point => context.lineTo(...point));
        context.stroke();

        const [x, y] = points.at(-1);
        const [previousX, previousY] = points.at(-2);
        const angle = Math.atan2(y - previousY, x - previousX);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - headSize * Math.cos(angle - Math.PI / 6),
            y - headSize * Math.sin(angle - Math.PI / 6));
        context.lineTo(x - headSize * Math.cos(angle + Math.PI / 6),
            y - headSize * Math.sin(angle + Math.PI / 6));
        context.closePath();
        context.fill();
    }

    function drawSymbols(start, end, fontSize) {
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        const length = Math.hypot(dx, dy);
        const width = Math.min(fontSize * 18, length * 0.85);
        const scale = width / 500;
        const angle = Math.atan2(dy, dx);
        // Start above the lower arrow, leaving its line continuous.
        const offset = fontSize * 0.9 + width * 0.075;
        const centerX = (start[0] + end[0]) / 2 + dy / length * offset;
        const centerY = (start[1] + end[1]) / 2 - dx / length * offset;
        const time = elapsed % 14000;
        const clamp = value => Math.max(0, Math.min(1, value));
        context.save();
        context.shadowBlur = 0;
        context.shadowOffsetY = 0;
        fragments.forEach((fragment, index) => {
            // Arrive one by one, hold the assembled star, then return to the row.
            const progress = motionPreference.matches ? 1 : time < 9000
                ? clamp((time - 1800 - index * 140) / 3500)
                : 1 - clamp((time - 9000 - (5 - index) * 140) / 3500);
            const eased = progress * progress * (3 - 2 * progress);
            const along = (fragment.x - 300) * scale;
            const across = (fragment.y - 476.35) * scale;
            const startX = centerX + Math.cos(angle) * along - Math.sin(angle) * across;
            const startY = centerY + Math.sin(angle) * along + Math.cos(angle) * across;
            const x = startX + (villaTarget[0] - startX) * eased;
            const y = startY + (villaTarget[1] - startY) * eased
                - Math.sin(progress * Math.PI) * (32 + index * 8);
            context.save();
            context.translate(x, y);
            context.rotate(angle + (fragment.rotation - angle) * eased);
            // Each fragment keeps its size throughout the entire cycle.
            context.scale(scale, scale);
            context.translate(-fragment.x, -fragment.y);
            context.fill(fragment.path);
            context.restore();
        });
        context.restore();
    }

    function draw() {
        if (!scene) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(scene, 0, 0);

        // Draw in the original image's coordinates, keeping labels legible
        // when the responsive canvas is displayed on a smaller screen.
        const displayWidth = canvas.getBoundingClientRect().width || figure.clientWidth || 720;
        const fontSize = Math.min(54, Math.max(26, 1338 / displayWidth * 14));
        const labelY = fontSize + 22;
        const labelGap = 24;
        const firstLegLength = 70;
        context.save();
        context.scale(canvas.width / 1338, canvas.height / 543);
        context.font = `500 ${fontSize}px Verdana, sans-serif`;
        context.fillStyle = '#fff';
        context.strokeStyle = '#fff';
        context.lineWidth = Math.max(2.5, 1338 / displayWidth * 1.5);
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.shadowColor = 'rgba(0, 0, 0, 0.9)';
        context.shadowBlur = 8;
        context.shadowOffsetY = 1;

        const candleLabel = 'The solitary candle';
        const candleLabelY = 507;
        const candleArrowX = 36 + context.measureText(candleLabel).width + labelGap;
        const villaLabelRight = candleArrowX - labelGap;
        context.textAlign = 'right';
        context.fillText(`The Villa of ${villaName}`, villaLabelRight, candleLabelY);
        villaControl.style.right = `${(1338 - villaLabelRight) / 1338 * 100}%`;
        villaControl.style.top = `${(candleLabelY - fontSize * 0.4) / 543 * 100}%`;
        villaControl.style.width = `${context.measureText(villaName).width / 1338 * 100}%`;
        villaControl.style.height = `${fontSize * 1.3 / 543 * 100}%`;
        const candleArrowY = candleLabelY - fontSize * 0.35;
        const candleElbowX = candleArrowX + firstLegLength;
        drawArrow([[candleArrowX, candleArrowY], [candleElbowX, candleArrowY], [850, 110]], fontSize * 0.45);

        // Give both labels the same gap, vertical alignment, and right-facing
        // first leg, while keeping the diagonals parallel and both tips fixed.
        const villaArrowY = labelY - fontSize * 0.35;
        const villaElbowX = villaTarget[0] + (villaTarget[1] - villaArrowY) * (850 - candleElbowX) / (candleArrowY - 110);
        const villaArrowX = villaElbowX - firstLegLength;
        context.textAlign = 'right';
        const labelRight = villaArrowX - labelGap;
        context.fillText(candleLabel, labelRight, labelY);
        drawArrow([[villaArrowX, villaArrowY], [villaElbowX, villaArrowY], villaTarget], fontSize * 0.45);
        drawSymbols([candleElbowX, candleArrowY], [850, 110], fontSize);
        context.restore();
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
        if (visible && !document.hidden && !motionPreference.matches) {
            frame = requestAnimationFrame(tick);
        }
    }

    function initialize() {
        if (!image.naturalWidth) return;
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const monochrome = document.createElement('canvas');
        monochrome.width = canvas.width;
        monochrome.height = canvas.height;
        const sceneContext = monochrome.getContext('2d');
        if (!sceneContext) return;
        sceneContext.filter = 'grayscale(1)';
        sceneContext.drawImage(image, 0, 0);
        scene = monochrome;

        draw();
        image.hidden = true;
        canvas.hidden = false;
        villaControl.hidden = false;
        new ResizeObserver(draw).observe(figure);
        new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            updatePlayback();
        }).observe(canvas);
        document.addEventListener('visibilitychange', updatePlayback);
        motionPreference.addEventListener('change', () => {
            draw();
            updatePlayback();
        });
    }

    if (image.complete) initialize();
    else image.addEventListener('load', initialize, { once: true });
})();
