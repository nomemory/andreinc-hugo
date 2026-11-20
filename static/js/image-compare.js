(() => {
  document.querySelectorAll('[data-image-compare]').forEach((figure) => {
    const image = figure.querySelector('img');
    const toggle = figure.querySelector('.image-compare-toggle');
    const edited = image.getAttribute('src');

    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const showOriginal = toggle.getAttribute('aria-pressed') !== 'true';
      image.src = showOriginal ? toggle.dataset.original : edited;
      toggle.setAttribute('aria-pressed', String(showOriginal));
      toggle.textContent = showOriginal ? 'show edited' : 'show original';
    });
  });
})();
