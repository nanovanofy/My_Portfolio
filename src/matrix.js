const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\|=+*#$%&";
const FONT = 16;
const TICK_MS = 55;
const SCALE = 0.6;

const PALETTES = {
  dark: { rgb: "74,222,128", head: "229,255,239" },
  light: { rgb: "21,128,61", head: "22,101,52" },
};

export const matrix = {
  el: null,
  ctx: null,
  theme: "dark",
  columns: [],
  rows: 0,
  last: 0,
  raf: 0,
};

function randomGlyph() {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

function randomLength() {
  return 6 + Math.floor(Math.random() * 14);
}

function randomSpeed() {
  return 0.25 + Math.random() * 0.75;
}

function makeColumn(x, rows) {
  const len = randomLength();
  return {
    x,
    y: -Math.random() * rows,
    speed: randomSpeed(),
    len,
    chars: Array.from({ length: len }, randomGlyph),
  };
}

function recycle(col) {
  col.speed = randomSpeed();
  col.len = randomLength();
  col.y = -Math.random() * 20;
  col.chars = Array.from({ length: col.len }, randomGlyph);
}

export function registerMatrix(el) {
  matrix.el = el;
  matrix.ctx = el.getContext("2d");
  setMatrixTheme(document.documentElement.getAttribute("data-theme"));
  resizeMatrix();
}

export function unregisterMatrix() {
  stopMatrix();
  matrix.el = null;
  matrix.ctx = null;
  matrix.columns = [];
  matrix.rows = 0;
}

export function setMatrixTheme(theme) {
  matrix.theme = theme === "light" ? "light" : "dark";
}

export function resizeMatrix() {
  const { el, ctx } = matrix;
  if (!el || !ctx) return;

  const w = Math.max(1, Math.round(window.innerWidth * SCALE));
  const h = Math.max(1, Math.round(window.innerHeight * SCALE));
  el.width = w;
  el.height = h;
  matrix.rows = Math.floor(h / FONT) + 1;

  const count = Math.ceil(w / FONT);
  const columns = [];
  for (let i = 0; i < count; i++) columns.push(makeColumn(i * FONT, h / FONT));
  matrix.columns = columns;

  ctx.font = `${FONT}px 'JetBrains Mono', monospace`;
  ctx.textBaseline = "top";
}

export function matrixFrame() {
  const { el, ctx, columns, rows, theme } = matrix;
  if (!el || !ctx) return;

  const pal = PALETTES[theme];
  ctx.clearRect(0, 0, el.width, el.height);

  for (const col of columns) {
    col.y += col.speed;
    const head = Math.floor(col.y);

    if (head - col.len > rows) {
      recycle(col);
      continue;
    }

    col.chars.pop();
    col.chars.unshift(randomGlyph());

    for (let i = 0; i < col.len; i++) {
      const row = head - i;
      if (row < 0 || row >= rows) continue;
      ctx.fillStyle = i === 0 ? `rgba(${pal.head}, 0.95)` : `rgba(${pal.rgb}, ${(1 - i / col.len).toFixed(3)})`;
      ctx.fillText(col.chars[i], col.x, row * FONT);
    }
  }
}

export function startMatrix() {
  if (matrix.raf) return;
  matrix.last = 0;

  function loop(t) {
    matrix.raf = requestAnimationFrame(loop);
    if (document.hidden) return;
    if (t - matrix.last < TICK_MS) return;
    matrix.last = t;
    matrixFrame();
  }

  matrix.raf = requestAnimationFrame(loop);
}

export function stopMatrix() {
  cancelAnimationFrame(matrix.raf);
  matrix.raf = 0;
}