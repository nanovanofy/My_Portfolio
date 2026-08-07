export const glitchCanvas = { el: null, ctx: null };

export function registerCanvas(el) {
  glitchCanvas.el = el;
  glitchCanvas.ctx = el.getContext("2d");
}

export function unregisterCanvas() {
  glitchCanvas.el = null;
  glitchCanvas.ctx = null;
}

export function glitchFrame() {
  const { el, ctx } = glitchCanvas;
  if (!el || !ctx) return;
  const w = (el.width = window.innerWidth);
  const h = (el.height = window.innerHeight);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#09090b";
  ctx.fillRect(0, 0, w, h);

  const bands = 8;
  for (let i = 0; i < bands; i++) {
    const y = Math.random() * h;
    const bh = 6 + Math.random() * 30;
    const xoff = Math.random() * 22 - 11;
    ctx.fillStyle = "rgba(74,222,128,0.18)";
    ctx.fillRect(xoff, y, w, bh);
    ctx.fillStyle = "rgba(167,139,250,0.16)";
    ctx.fillRect(-xoff, y + bh * 0.3, w, 4);
  }

  for (let i = 0; i < 6; i++) {
    const y = Math.random() * h;
    ctx.fillStyle = i % 2 ? "rgba(34,211,238,0.16)" : "rgba(74,222,128,0.16)";
    ctx.fillRect(0, y, w, 2 + Math.random() * 16);
  }

  for (let i = 0; i < 60; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const c = ["#4ade80", "#22d3ee", "#a78bfa", "#f87171"][Math.floor(Math.random() * 4)];
    ctx.globalAlpha = 0.5 + Math.random() * 0.5;
    ctx.fillStyle = c;
    ctx.fillRect(x, y, 2, 6 + Math.random() * 24);
  }
  ctx.globalAlpha = 1;
}

export function flashGlitch(frames = 5, interval = 110) {
  return new Promise((resolve) => {
    const { el } = glitchCanvas;
    if (!el) return resolve();
    let count = 0;
    el.classList.add("active");
    const timer = setInterval(() => {
      glitchFrame();
      count++;
      if (count >= frames) {
        clearInterval(timer);
        el.classList.remove("active");
        setTimeout(resolve, 150);
      }
    }, interval);
  });
}

export function typeLine(el, text, speed = 14) {
  return new Promise((resolve) => {
    let i = 0;
    el.textContent = "";
    const timer = setInterval(() => {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}
