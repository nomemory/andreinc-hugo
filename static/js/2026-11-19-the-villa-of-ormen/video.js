(() => {
    const wrapper = document.getElementById('ormen-video');
    const video = wrapper?.querySelector('iframe');
    if (!video) return;

    function revealColors() {
        wrapper.classList.add('ormen-video-color');
        window.removeEventListener('blur', checkVideoFocus);
        wrapper.removeEventListener('focusin', revealColors);
        video.removeEventListener('focus', revealColors);
    }

    function checkVideoFocus() {
        // Clicks inside YouTube's cross-origin iframe do not bubble to the
        // article. Wait for focus to settle, then keep the player in color.
        requestAnimationFrame(() => {
            if (document.activeElement === video) revealColors();
        });
    }

    window.addEventListener('blur', checkVideoFocus);
    wrapper.addEventListener('focusin', revealColors);
    video.addEventListener('focus', revealColors);
})();
