(() => {
    function initialize() {
        document.querySelectorAll('.ormen-poem-popup').forEach(popup => {
            popup.addEventListener('click', () => popup.hidePopover());
        });

        const popup = document.getElementById('ormen-anaphora');
        if (!popup) return;
        const canvas = popup.querySelector('canvas');
        const context = canvas.getContext('2d');
        if (!context) return;

        // Barnbrook's Blackstar glyphs, adapted under CC BY-NC-SA 4.0.
        // Source: https://bowieblackstar.net/
        const symbols = new Path2D('M50,484.1l14.2-43.4l22.9,70.1L50,484.1z M188.9,512L166,495.5L143.1,512l8.7-26.8l-22.9-16.5h28.3l8.8-26.8l8.7,26.8h28.4l-23,16.5L188.9,512z M245.9,512l8.8-26.8l-22.9-16.5h74.1L245.9,512z M365.9,512l-60-43.3h74.2l-22.9,16.5L365.9,512z M437.4,495.5L414.5,512l22.9-70.1l23,70.1L437.4,495.5z M535.8,512l-22.9-16.5l-14.1-10.3l5.4-16.5l8.7-26.8l8.8,26.8H550l-22.9,16.5L535.8,512z');
        const star = new Path2D('M300,48l-44.4,135.7H112.1l116.1,83.9l-44.3,135.8L300,319.5l116.1,83.9l-44.3-135.8l116.1-83.9H344.4L300,48z');
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const rowHeights = [146, 92, 38];
        const glyphScale = 0.38;
        const repeatWidth = 540 * glyphScale;
        const route = [0, 1, 2, 1, 0];
        let elapsed = 0;
        let previousTime = null;
        let frame = null;
        let color = getComputedStyle(canvas).color;

        function rowPosition(row) {
            const offset = motionPreference.matches ? 0
                : Math.sin(elapsed / 1200 + row * Math.PI * 0.65) * 22;
            return { x: 138 + offset, y: rowHeights[row] };
        }

        function landingPosition(row) {
            const position = rowPosition(row);
            // Land on the top point of the complete star glyph in each row.
            return { x: position.x + (166 - 300) * glyphScale, y: position.y - 24 };
        }

        function drawSymbols() {
            context.setTransform(2, 0, 0, 2, 0, 0);
            context.clearRect(0, 0, 276, 176);
            context.fillStyle = color;
            for (let row = 0; row < 3; row++) {
                const position = rowPosition(row);
                // Repeat beyond both edges so movement never exposes an empty end.
                for (let copy = -1; copy <= 1; copy++) {
                    context.save();
                    context.translate(position.x + copy * repeatWidth, position.y);
                    context.scale(glyphScale, glyphScale);
                    context.translate(-300, -476.35);
                    context.fill(symbols);
                    context.restore();
                }
            }

            // Show the repeating rows first, then start the automatic jumper.
            if (elapsed < 1500 && !motionPreference.matches) return;
            const gameTime = Math.max(0, elapsed - 1500);
            const step = Math.floor(gameTime / 1400) % (route.length - 1);
            const progress = motionPreference.matches ? 0
                : Math.max(0, Math.min(1, (gameTime % 1400 - 250) / 1000));
            const from = landingPosition(motionPreference.matches ? 0 : route[step]);
            const to = landingPosition(motionPreference.matches ? 0 : route[step + 1]);
            const x = from.x + (to.x - from.x) * progress;
            const y = from.y + (to.y - from.y) * progress - 80 * progress * (1 - progress);
            context.save();
            context.globalAlpha = motionPreference.matches ? 1 : Math.min(1, gameTime / 250);
            context.translate(x, y);
            context.scale(0.045, 0.045);
            context.translate(-300, -244.4);
            context.fill(star);
            context.restore();
        }

        function tick(time) {
            if (previousTime !== null) elapsed += time - previousTime;
            previousTime = time;
            drawSymbols();
            frame = requestAnimationFrame(tick);
        }

        function updatePlayback() {
            if (frame !== null) cancelAnimationFrame(frame);
            frame = null;
            previousTime = null;
            color = getComputedStyle(canvas).color;
            drawSymbols();
            if (popup.matches(':popover-open') && !document.hidden && !motionPreference.matches) {
                frame = requestAnimationFrame(tick);
            }
        }

        popup.addEventListener('toggle', updatePlayback);
        document.addEventListener('visibilitychange', updatePlayback);
        motionPreference.addEventListener('change', updatePlayback);
        updatePlayback();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
})();
