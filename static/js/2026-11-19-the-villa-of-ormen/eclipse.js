(() => {
    function setupEclipse({ id, referenceWidth, referenceHeight, starX, starY, starRadius, filter = 'grayscale(1)' }) {
        const figure = document.getElementById(id);
        if (!figure) return;
        const image = figure.querySelector('img');
        const canvas = figure.querySelector('canvas');
        const control = figure.querySelector('button');
        const context = canvas.getContext('2d');
        if (!context) return;

        function initialize() {
            if (!image.naturalWidth) return;
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            // Prepare the monochrome scene once, leaving the supplied image intact.
            const scene = document.createElement('canvas');
            scene.width = canvas.width;
            scene.height = canvas.height;
            const sceneContext = scene.getContext('2d');
            if (!sceneContext) return;
            sceneContext.filter = filter;
            sceneContext.drawImage(image, 0, 0);

            // Barnbrook's original large star, without the smaller glyph fragments.
            // Source: https://bowieblackstar.net/ — CC BY-NC-SA 4.0, adapted.
            const star = new Path2D('M300,48l-44.4,135.7H112.1l116.1,83.9l-44.3,135.8L300,319.5l116.1,83.9l-44.3-135.8l116.1-83.9H344.4L300,48z');
            // Keep the logo centered on the eclipse at every display size.
            const centerX = canvas.width * starX / referenceWidth;
            const centerY = canvas.height * starY / referenceHeight;
            const radius = canvas.width * starRadius / referenceWidth;
            control.style.left = `${centerX / canvas.width * 100}%`;
            control.style.top = `${centerY / canvas.height * 100}%`;
            control.style.width = `${radius * 2 / canvas.width * 100}%`;
            control.style.height = `${radius * 2 / canvas.height * 100}%`;

            const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
            let playing = !motionPreference.matches;
            let visible = false;
            let elapsed = 0;
            let previousTime = null;
            let frame = null;

            function draw() {
                context.drawImage(scene, 0, 0);
                context.save();
                context.translate(centerX, centerY);
                context.rotate(elapsed % 12000 / 12000 * Math.PI * 2);
                context.scale(radius / 196.4, radius / 196.4);
                context.translate(-300, -244.4);
                context.globalAlpha = 0.3;
                context.fillStyle = '#fff';
                context.fill(star);
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
                const action = playing ? 'Pause star rotation' : 'Resume star rotation';
                control.setAttribute('aria-label', action);
                control.title = action;
                if (playing && visible && !document.hidden) {
                    frame = requestAnimationFrame(tick);
                }
            }

            control.addEventListener('click', () => {
                playing = !playing;
                updatePlayback();
            });
            motionPreference.addEventListener('change', () => {
                playing = !motionPreference.matches;
                updatePlayback();
            });
            document.addEventListener('visibilitychange', updatePlayback);
            const observer = new IntersectionObserver(([entry]) => {
                visible = entry.isIntersecting;
                updatePlayback();
            });

            draw();
            image.hidden = true;
            canvas.hidden = false;
            control.hidden = false;
            observer.observe(canvas);
            updatePlayback();
        }

        if (image.complete) initialize();
        else image.addEventListener('load', initialize, { once: true });
    }

    setupEclipse({
        id: 'ormen-eclipse',
        referenceWidth: 1336,
        referenceHeight: 552,
        starX: 666,
        starY: 170,
        starRadius: 72,
        filter: 'grayscale(1) contrast(1.15) brightness(0.9)'
    });
    setupEclipse({
        id: 'ormen-astronaut',
        referenceWidth: 975,
        referenceHeight: 549,
        starX: 644,
        starY: 195,
        starRadius: 35
    });
})();
