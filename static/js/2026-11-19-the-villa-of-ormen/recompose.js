(() => {
    const figure = document.getElementById('ormen-recompose');
    if (!figure) return;

    const pieces = [...figure.querySelectorAll('.ormen-star-piece')];
    const control = figure.querySelector('button');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rotations = [-72, 360, 72, -144, 144, -72];
    const starts = [105, 207, 310, 384, 478, 554];
    const cycle = 14000;
    let playing = !motionPreference.matches;
    let visible = false;
    let elapsed = 0;
    let previousTime = null;
    let frame = null;

    function draw(assembled = false) {
        const time = elapsed % cycle;
        // Hold the row, assemble, hold the star, then reverse the same motion.
        const progress = assembled ? 1 : time < 1800 ? 0
            : time < 6000 ? (time - 1800) / 4200
            : time < 9000 ? 1
            : time < 13200 ? 1 - (time - 9000) / 4200 : 0;
        const eased = progress * progress * (3 - 2 * progress);
        pieces.forEach((piece, index) => {
            const x = starts[index] + (360 - starts[index]) * eased;
            const y = 185 - 95 * eased - Math.sin(progress * Math.PI) * (35 + index * 5);
            piece.setAttribute('transform', `translate(${x} ${y}) rotate(${rotations[index] * eased})`);
        });
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
        control.textContent = playing ? 'Pause animation' : 'Resume animation';
        if (playing && visible && !document.hidden) frame = requestAnimationFrame(tick);
    }

    control.addEventListener('click', () => {
        playing = !playing;
        updatePlayback();
    });
    motionPreference.addEventListener('change', () => {
        playing = !motionPreference.matches;
        draw(motionPreference.matches);
        updatePlayback();
    });
    document.addEventListener('visibilitychange', updatePlayback);
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updatePlayback();
    }).observe(figure);

    draw(motionPreference.matches);
    control.hidden = false;
    updatePlayback();
})();
