(() => {
  const canvas = document.getElementById('quadratic-canvas');
  if (!canvas) return;
  const { Plot, colors } = window.ExamPlot;
  const plot = new Plot(canvas);
  const slider = document.getElementById('quadratic-m');
  const output = document.getElementById('quadratic-m-value');
  const status = document.getElementById('quadratic-status');
  const format = value => Number(value.toFixed(3)).toString();
  const lower = (-0.5 - Math.sqrt(6) / 6 + 3) / 6 * 100;
  const upper = (-0.5 + Math.sqrt(6) / 6 + 3) / 6 * 100;
  slider.style.setProperty('--root-zones', `linear-gradient(to right, #226b9d 0% ${lower}%, #27834b ${lower}% ${upper}%, #226b9d ${upper}% 100%)`);

  function draw() {
    const m = Number(slider.value);
    const a = m + 1, b = -(2 * m + 1), c = -2 * m;
    const discriminant = b * b - 4 * a * c;
    const roots = [];
    let description;
    if (Math.abs(a) < 1e-12) {
      roots.push(-c / b);
      description = 'Linear: f(x) = x + 2. Excluded from the exam problem.';
    } else {
      description = `Opens ${a > 0 ? 'upward' : 'downward'}. Δ = ${format(discriminant)}.`;
      if (Math.abs(discriminant) < 1e-12) {
        roots.push(-b / (2 * a));
        description += ' One repeated real root.';
      } else if (discriminant > 0) {
        // This form avoids cancellation when one root is much smaller.
        const q = -0.5 * (b + (b >= 0 ? 1 : -1) * Math.sqrt(discriminant));
        roots.push(q / a, c / q);
        roots.sort((x, y) => x - y);
      } else {
        description += ' No real roots.';
      }
    }
    if (roots.length) description += ` ${roots.length === 1 ? 'Root' : 'Roots'}: ${roots.map(format).join(', ')}.`;
    output.value = m.toFixed(2);
    status.textContent = description;
    canvas.setAttribute('aria-label', `Graph for m = ${m.toFixed(2)}. ${description}`);

    if (!plot.frame({
      x: [-6, 6], y: [-10, 10],
      xTicks: [-6, -4, -2, 0, 2, 4, 6], yTicks: [-10, -5, 0, 5, 10],
    })) return;
    plot.curve(x => (a * x + b) * x + c, {
      color: discriminant < 0 ? colors.green : colors.blue,
    });
    for (const root of roots) plot.point(root, 0);

  }
  slider.addEventListener('input', draw);
  const hint = document.getElementById('quadratic-slider-hint');
  if (hint) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        hint.classList.add('is-visible');
        observer.disconnect();
      }
    });
    observer.observe(hint);
    slider.addEventListener('input', () => {
      hint.classList.add('is-dismissed');
      observer.disconnect();
    }, { once: true });
  }
  new ResizeObserver(draw).observe(canvas);
  draw();
})();
