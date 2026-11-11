(() => {
  const colors = Object.freeze({
    background: '#fafaf7', grid: '#deded8', axis: '#777', text: '#444',
    blue: '#226b9d', green: '#27834b', red: '#c0392b',
    orange: '#aa5b16', purple: '#8055a2', gray: '#777',
  });

  // Shared coordinates, typography and drawing primitives for every exam graph.
  class Plot {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }

    frame({ x, y, xTicks, yTicks, xLabel = 'x' }) {
      const width = this.canvas.getBoundingClientRect().width;
      if (!width || !this.ctx) return false;
      const height = 300;
      const ratio = window.devicePixelRatio || 1;
      this.canvas.width = Math.round(width * ratio);
      this.canvas.height = Math.round(height * ratio);
      this.width = width;
      this.left = 38;
      this.right = width - 18;
      this.top = 22;
      this.bottom = height - 30;
      this.x = x;
      this.y = y;
      const ctx = this.ctx;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, width, height);
      ctx.font = '11px Verdana, sans-serif';
      ctx.textBaseline = 'alphabetic';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      for (const value of xTicks) {
        this.pixelLine(this.px(value), this.top, this.px(value), this.bottom, colors.grid);
        ctx.fillStyle = colors.text;
        ctx.textAlign = 'center';
        ctx.fillText(value, this.px(value), this.bottom + 18);
      }
      for (const value of yTicks) {
        this.pixelLine(this.left, this.py(value), this.right, this.py(value), colors.grid);
        ctx.fillStyle = colors.text;
        ctx.textAlign = 'right';
        ctx.fillText(value, this.left - 7, this.py(value) + 4);
      }
      const xAxis = this.py(Math.max(y[0], Math.min(0, y[1])));
      const yAxis = this.px(Math.max(x[0], Math.min(0, x[1])));
      this.pixelLine(this.left, xAxis, this.right, xAxis, colors.axis);
      this.pixelLine(yAxis, this.top, yAxis, this.bottom, colors.axis);
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'right';
      ctx.fillText(xLabel, this.right, xAxis - 7);
      ctx.fillText('y', yAxis - 7, this.top - 7);
      return true;
    }

    px(value) { return this.left + (value - this.x[0]) / (this.x[1] - this.x[0]) * (this.right - this.left); }
    py(value) { return this.bottom - (value - this.y[0]) / (this.y[1] - this.y[0]) * (this.bottom - this.top); }

    pixelLine(x1, y1, x2, y2, color, width = 1, dash = []) {
      const ctx = this.ctx;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }

    clip(draw) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.rect(this.left, this.top, this.right - this.left, this.bottom - this.top);
      this.ctx.clip();
      draw();
      this.ctx.restore();
    }

    curve(fn, { from = this.x[0], to = this.x[1], color = colors.blue, dash = [], width = 2.5 } = {}) {
      this.clip(() => {
        const ctx = this.ctx;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.setLineDash(dash);
        ctx.beginPath();
        const samples = Math.max(200, Math.ceil((this.right - this.left) * 2));
        let started = false;
        for (let i = 0; i <= samples; i++) {
          const x = from + (to - from) * i / samples;
          const y = fn(x);
          if (!Number.isFinite(y)) { started = false; continue; }
          if (started) ctx.lineTo(this.px(x), this.py(y));
          else ctx.moveTo(this.px(x), this.py(y));
          started = true;
        }
        ctx.stroke();
      });
    }

    area(fn, from, to, color = 'rgba(34, 107, 157, 0.18)') {
      this.clip(() => {
        const ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(this.px(from), this.py(0));
        for (let i = 0; i <= 400; i++) {
          const x = from + (to - from) * i / 400;
          ctx.lineTo(this.px(x), this.py(fn(x)));
        }
        ctx.lineTo(this.px(to), this.py(0));
        ctx.closePath();
        ctx.fill();
      });
    }

    vertical(x, y, color = colors.red) {
      this.clip(() => this.pixelLine(this.px(x), this.py(0), this.px(x), this.py(y), color, 1.5, [4, 4]));
    }

    point(x, y, { color = colors.red, open = false, radius = 4.5 } = {}) {
      this.clip(() => {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.px(x), this.py(y), radius, 0, 2 * Math.PI);
        ctx.fillStyle = open ? colors.background : color;
        ctx.fill();
        ctx.strokeStyle = open ? color : '#fff';
        ctx.lineWidth = open ? 2 : 1.5;
        ctx.stroke();
      });
    }

    note(text, color = colors.text) {
      this.ctx.fillStyle = color;
      this.ctx.textAlign = 'right';
      this.ctx.fillText(text, this.right, 13);
    }
  }

  window.ExamPlot = { Plot, colors };
})();
