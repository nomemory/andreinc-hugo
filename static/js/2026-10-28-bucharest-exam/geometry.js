(() => {
  const root = document.getElementById('geometry-law-explorer');
  if (!root) return;
  const slider = root.querySelector('#geometry-angle');
  const set = (selector, attrs) => {
    const element = root.querySelector(selector);
    Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
  };
  function update() {
    const degrees = Number(slider.value);
    const angle = degrees * Math.PI / 180;
    const u = 3 * Math.cos(angle), v = 3 * Math.sin(angle);
    const points = { A: [0, 0], B: [4, 0], C: [4 + u, v], D: [u, v] };
    // A fixed, equal scale on both axes preserves angles and lengths.
    const project = ([x, y]) => [180 + 48 * x, 245 - 48 * y];
    const screen = Object.fromEntries(Object.entries(points).map(([key, p]) => [key, project(p)]));
    set('[data-shape="body"]', { points: ['A', 'B', 'C', 'D'].map(key => screen[key].join(',')).join(' ') });
    ['ab', 'ad', 'ac', 'bd'].forEach(key => {
      const [from, to] = key.toUpperCase().split('');
      set(`[data-shape="${key}"]`, { d: `M ${screen[from].join(' ')} L ${screen[to].join(' ')}` });
    });
    Object.entries(screen).forEach(([key, [x, y]]) => {
      set(`[data-label="${key}"]`, { x, y: y + (key === 'A' || key === 'B' ? 23 : -13) });
    });
    set('[data-label="ab"]', { x: (screen.A[0] + screen.B[0]) / 2, y: 292 });
    set('[data-label="ad"]', { x: (screen.A[0] + screen.D[0]) / 2 - 48, y: (screen.A[1] + screen.D[1]) / 2 });
    const ac2 = 25 + 24 * Math.cos(angle);
    const bd2 = 50 - ac2;
    set('[data-bar="ac"]', { width: ac2 * 11.2 });
    set('[data-bar="bd"]', { x: 16 + ac2 * 11.2, width: bd2 * 11.2 });
    root.querySelector('#geometry-angle-value').value = `${degrees}°`;
    root.querySelector('#geometry-law-status').textContent =
      `AC² = ${ac2.toFixed(2)}; BD² = ${bd2.toFixed(2)}. Sum = 50 = 2(16 + 9).` +
      (degrees === 90 ? ' At 90°, the parallelogram is a rectangle and the diagonals are equal.' : ' The diagonal squares change by opposite amounts.');
    root.querySelector('#geometry-law-desc').textContent =
      `Angle BAD is ${degrees} degrees. AB = 4, AD = 3. AC² = ${ac2.toFixed(2)}, BD² = ${bd2.toFixed(2)}; their sum is 50.`;
  }
  slider.addEventListener('input', update);
  root.querySelector('#geometry-rectangle').addEventListener('click', () => {
    slider.value = '90';
    update();
  });
  update();
})();
