(() => {
  const { Plot, colors } = window.ExamPlot;
  const fixed = (value, digits = 4) => value.toFixed(digits);

  // expm1/log1p avoid subtracting almost equal numbers near the origin.
  function f(x) {
    if (x === 0) return 1;
    return x < 0 ? -Math.expm1(-x) / x : Math.log1p(x) / x;
  }

  function explorer(id, draw) {
    const container = document.getElementById(id);
    if (!container) return;
    const canvas = container.querySelector('canvas');
    const plot = new Plot(canvas);
    const status = container.querySelector('.exam-status');
    const get = name => container.querySelector(`[data-control="${name}"]`);
    const describe = text => {
      if (status) status.textContent = text;
      canvas.setAttribute('aria-label', text);
    };
    const update = () => draw({ plot, get, describe });
    container.addEventListener('input', update);
    container.querySelectorAll('[data-set]').forEach(button => {
      button.addEventListener('click', () => {
        get(button.dataset.set).value = button.dataset.value;
        update();
      });
    });
    new ResizeObserver(update).observe(canvas);
    update();
    return { container, get, update };
  }

  const continuity = explorer('analysis-a-explorer', ({ plot, get, describe }) => {
    const a = Number(get('a').value);
    // Logarithmic motion makes it possible to explore very small distances.
    const distance = 10 ** (-3 * Number(get('approach').value) / 1000);
    const left = f(-distance);
    const right = f(distance);
    get('a-value').value = fixed(a, 2);
    get('distance-value').value = fixed(distance, 3);
    get('approach').setAttribute('aria-valuetext', `Distance from zero: ${fixed(distance, 3)}`);
    get('left-value').textContent = `x = −${fixed(distance, 3)}; f(x) = ${fixed(left, 5)}`;
    get('right-value').textContent = `x = +${fixed(distance, 3)}; f(x) = ${fixed(right, 5)}`;
    describe(`From the left, f(−${fixed(distance, 3)}) = ${fixed(left, 5)} approaches 1 from above. From the right, f(${fixed(distance, 3)}) = ${fixed(right, 5)} approaches 1 from below. f(0) = ${fixed(a, 2)}. ${a === 1 ? 'The point closes the gap: f is continuous at 0.' : 'The red point misses the common limit: f is not continuous at 0.'}`);
    if (!plot.frame({ x: [-1.5, 1.5], y: [-0.15, 2.5], xTicks: [-1, 0, 1], yTicks: [0, 0.5, 1, 1.5, 2] })) return;
    plot.curve(() => 1, { color: colors.green, width: 1.5, dash: [6, 4] });
    plot.curve(f, { to: -0.000001, color: colors.blue });
    plot.curve(f, { from: 0.000001, color: colors.purple });
    for (const [x, y, color] of [[-distance, left, colors.blue], [distance, right, colors.purple]]) {
      plot.vertical(x, y, color);
      plot.pixelLine(plot.px(x), plot.py(y), plot.px(0), plot.py(y), color, 1, [3, 4]);
      plot.point(x, y, { color, radius: 5.5 });
    }
    // Arrows follow the curve toward zero; labels also distinguish the sides
    // without relying on color alone.
    const arrow = (from, to, color) => {
      const x1 = plot.px(from), y1 = plot.py(f(from));
      const x2 = plot.px(to), y2 = plot.py(f(to));
      const angle = Math.atan2(y2 - y1, x2 - x1);
      plot.pixelLine(x1, y1, x2, y2, color, 2);
      for (const offset of [-0.5, 0.5]) {
        plot.pixelLine(x2, y2, x2 - 8 * Math.cos(angle + offset), y2 - 8 * Math.sin(angle + offset), color, 2);
      }
    };
    arrow(-0.8, -0.55, colors.blue);
    arrow(0.8, 0.55, colors.purple);
    const label = (x, y, text, color, align) => {
      plot.ctx.fillStyle = color;
      plot.ctx.textAlign = align;
      plot.ctx.fillText(text, plot.px(x), plot.py(y));
    };
    label(-1.3, 2.34, 'x → 0⁻', colors.blue, 'left');
    label(-1.3, 2.14, 'f(x) → 1', colors.blue, 'left');
    label(1.4, 2.34, 'x → 0⁺', colors.purple, 'right');
    label(1.4, 2.14, 'f(x) → 1', colors.purple, 'right');
    label(1.4, 1.09, 'y = 1', colors.green, 'right');
    plot.point(0, 1, { color: colors.green, open: true, radius: 6 });
    plot.point(0, a);
  });

  function animateApproach(exploration, { moveValueAtZero = false } = {}) {
    if (!exploration) return;
    const { container, get, update } = exploration;
    const slider = get('approach');
    const button = get('animate');
    const status = container.querySelector('.exam-status');
    const valueAtZero = moveValueAtZero ? get('a') : null;
    let replayValue = valueAtZero ? Number(valueAtZero.value) : null;
    let frame = null;
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      button.textContent = Number(slider.value) === 1000 ? 'Replay approach' : 'Approach zero';
      button.setAttribute('aria-pressed', 'false');
      if (status) status.setAttribute('aria-live', 'polite');
    };
    button.addEventListener('click', () => {
      if (frame !== null) { stop(); return; }
      if (Number(slider.value) === 1000) {
        slider.value = 0;
        if (valueAtZero) valueAtZero.value = replayValue;
      }
      const startingValue = valueAtZero ? Number(valueAtZero.value) : null;
      if (Number(slider.value) === 0) replayValue = startingValue;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        slider.value = 1000;
        if (valueAtZero) valueAtZero.value = 1;
        update();
        stop();
        return;
      }
      const start = Number(slider.value);
      const started = performance.now();
      button.textContent = 'Pause approach';
      button.setAttribute('aria-pressed', 'true');
      if (status) status.setAttribute('aria-live', 'off');
      const tick = now => {
        const progress = Math.min(1, (now - started) / 4000);
        slider.value = Math.round(start + (1000 - start) * progress);
        if (valueAtZero) valueAtZero.value = startingValue + (1 - startingValue) * progress;
        update();
        if (progress < 1) frame = requestAnimationFrame(tick);
        else stop();
      };
      frame = requestAnimationFrame(tick);
    });
    slider.addEventListener('input', stop);
    if (valueAtZero) {
      const changeValue = () => {
        stop();
        replayValue = Number(valueAtZero.value);
      };
      valueAtZero.addEventListener('input', changeValue);
      container.querySelector('[data-set="a"]').addEventListener('click', changeValue);
    }
    container.querySelector('[data-set="approach"]').addEventListener('click', stop);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  }

  animateApproach(continuity, { moveValueAtZero: true });

  const derivative = explorer('analysis-b-explorer', ({ plot, get, describe }) => {
    const h = 2 * 10 ** (-4 * Number(get('approach').value) / 1000);
    const leftSlope = (f(-h) - 1) / -h;
    const rightSlope = (f(h) - 1) / h;
    get('h-value').value = fixed(h, 4);
    get('approach').setAttribute('aria-valuetext', `Distance from zero: ${fixed(h, 4)}`);
    get('left-value').textContent = `Slope = ${fixed(leftSlope, 6)}`;
    get('right-value').textContent = `Slope = ${fixed(rightSlope, 6)}`;
    describe(`h = ${fixed(h, 4)}. Difference between slopes: ${fixed(rightSlope - leftSlope, 6)}. The blue slope approaches −0.5 from below; the purple slope approaches −0.5 from above. In the limit, both secants become the same tangent at (0, 1).`);
    if (!plot.frame({ x: [-2.2, 2.2], y: [-0.25, 3.75], xTicks: [-2, -1, 0, 1, 2], yTicks: [0, 1, 2, 3] })) return;
    plot.curve(f, { to: 0, color: colors.blue, width: 3 });
    plot.curve(f, { from: 0, color: colors.purple, width: 3 });
    plot.curve(x => 1 + leftSlope * x, { color: colors.blue, width: 2, dash: [8, 5] });
    plot.curve(x => 1 + rightSlope * x, { color: colors.purple, width: 2, dash: [8, 5] });

    // Fixed-size triangles keep the rise/run comparison visible as h shrinks.
    // They lie on the extended secants, not necessarily at the moving points.
    const deltaLabel = (axis, side, x, y, align) => {
      const ctx = plot.ctx;
      ctx.save();
      const label = `Δ${axis}`;
      const width = ctx.measureText(label).width;
      const left = align === 'center' ? x - (width + 7) / 2 : align === 'right' ? x - width - 7 : x;
      ctx.textAlign = 'left';
      ctx.fillText(label, left, y);
      ctx.font = '8px Verdana, sans-serif';
      ctx.fillText(side, left + width, y + 3);
      ctx.restore();
    };
    for (const [run, slope, color] of [[-1, leftSlope, colors.blue], [1, rightSlope, colors.purple]]) {
      const end = 1 + run * slope;
      plot.pixelLine(plot.px(0), plot.py(1), plot.px(run), plot.py(1), color, 1.5);
      plot.pixelLine(plot.px(run), plot.py(1), plot.px(run), plot.py(end), color, 1.5);
      plot.ctx.fillStyle = color;
      const side = run < 0 ? 'L' : 'R';
      deltaLabel('x', side, plot.px(run / 2), plot.py(1) + (run < 0 ? 17 : -9), 'center');
      deltaLabel('y', side, plot.px(run) + (run < 0 ? -7 : 7), plot.py((1 + end) / 2) + 4, run < 0 ? 'right' : 'left');
    }
    plot.curve(x => 1 - x / 2, { color: colors.green, width: 2.5, dash: [3, 5] });
    plot.point(-h, f(-h), { color: colors.blue, radius: 5.5 });
    plot.point(h, f(h), { color: colors.purple, radius: 5.5 });
    plot.point(0, 1, { color: colors.green, radius: 5 });
    plot.note('Common tangent: slope −½', colors.green);
  });

  animateApproach(derivative);

  explorer('analysis-c-explorer', ({ plot, describe }) => {
    describe('For x > 0, f(x) = ln(1+x)/x lies strictly between y = 0 and y = 1 and approaches 0 as x grows. The graph extends to x = 100, where f(x) is approximately 0.046. The open point at (0, 1) is excluded.');
    if (!plot.frame({ x: [-2, 100], y: [-0.08, 1.2], xTicks: [0, 20, 40, 60, 80, 100], yTicks: [0, 0.5, 1] })) return;
    plot.area(() => 1, 0, 100, 'rgba(39, 131, 75, 0.06)');
    plot.curve(() => 1, { from: 0, color: colors.green, dash: [6, 4], width: 1.5 });
    plot.curve(() => 0, { from: 0, color: colors.green, dash: [6, 4], width: 1.5 });
    plot.curve(f, { from: 0.000001, color: colors.purple });
    plot.point(0, 1, { open: true, color: colors.purple, radius: 5 });
  });

  for (const [id, transformed] of [['analysis-d-explorer', false], ['analysis-d-t-explorer', true]]) {
    explorer(id, ({ plot, describe }) => {
      const exact = 1.5 * Math.log(4 / 3);
      const from = transformed ? 0.5 : 1;
      const to = transformed ? 1 : 2;
      const integrand = transformed ? t => Math.log1p(1 / t) : x => f(x) / x;
      describe(`${transformed ? 'After t = 1/x, the area under ln(1 + 1/t) from t = 1/2 to 1' : 'The area under f(x)/x = ln(1+x)/x² from x = 1 to 2'} equals I₁ = (3/2) ln(4/3) ≈ ${fixed(exact, 6)}. Both plots use the same scale.`);
      if (!plot.frame({ x: [0.35, 2.2], y: [0, 1.4], xTicks: [0.5, 1, 1.5, 2], yTicks: [0, 0.5, 1], xLabel: transformed ? 't' : 'x' })) return;
      plot.area(integrand, from, to);
      plot.curve(integrand);
      plot.vertical(from, integrand(from));
      plot.vertical(to, integrand(to));
      plot.point(from, integrand(from));
      plot.point(to, integrand(to));
      plot.note(`Shaded area ≈ ${fixed(exact, 6)}`);
    });
  }
  explorer('analysis-e-explorer', ({ plot, get, describe }) => {
    const n = Number(get('n').value);
    const integrand = x => f(x) / x ** n;
    // Simpson's rule on [1, 2], also resolving the narrow area for large n.
    const steps = 1024;
    let sum = integrand(1) + integrand(2);
    for (let i = 1; i < steps; i++) {
      sum += (i % 2 ? 4 : 2) * integrand(1 + i / steps);
    }
    const area = sum / (3 * steps);
    get('n-value').value = n;
    describe(`n = ${n}: the shaded area Iₙ under f(x)/xⁿ from 1 to 2 is approximately ${fixed(area)}. Increase n to see the area shrink toward zero.`);
    if (!plot.frame({ x: [0.95, 2.05], y: [0, 0.8], xTicks: [1, 1.5, 2], yTicks: [0, 0.4, 0.8] })) return;
    plot.area(integrand, 1, 2);
    plot.curve(integrand, { from: 1, to: 2 });
    plot.note(`Iₙ ≈ ${fixed(area)}`);
  });
})();
