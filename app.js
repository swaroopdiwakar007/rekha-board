/* Rekha Board — a hand-drawn whiteboard for Indian languages. */
(() => {
  'use strict';

  // ---------------------------------------------------------------- icons
  const P = (d) => `<svg viewBox="0 0 24 24">${d}</svg>`;
  // Duotone: a soft tinted fill under a crisp outline.
  const D = (fill, line) => `<svg viewBox="0 0 24 24"><g class="tint">${fill}</g>${line}</svg>`;
  const ICON = {
    lock: D('<rect x="5" y="10.5" width="14" height="10" rx="3"/>', '<rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/><circle cx="12" cy="15.5" r="1.1"/>'),
    unlock: D('<rect x="5" y="10.5" width="14" height="10" rx="3"/>', '<rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 6.7-1.4"/><circle cx="12" cy="15.5" r="1.1"/>'),
    hand: D('<circle cx="12" cy="12" r="3.2"/>', '<path d="M12 3v18M3 12h18"/><path d="M9.5 5.5L12 3l2.5 2.5M9.5 18.5L12 21l2.5-2.5M5.5 9.5L3 12l2.5 2.5M18.5 9.5L21 12l-2.5 2.5"/>'),
    select: D('<path d="M6 4.5l12.5 6.2-5.3 1.8-1.9 5.4z"/>', '<path d="M6 4.5l12.5 6.2-5.3 1.8-1.9 5.4z"/><path d="M13.4 12.6l4.4 4.4"/>'),
    rect: D('<rect x="4" y="5.5" width="16" height="13" rx="4"/>', '<rect x="4" y="5.5" width="16" height="13" rx="4"/>'),
    diamond: D('<path d="M12 3.5l7 7.5-7 9.5-7-9.5z"/>', '<path d="M12 3.5l7 7.5-7 9.5-7-9.5z"/><path d="M5 11h14" opacity=".45"/>'),
    ellipse: D('<ellipse cx="12" cy="12" rx="8.5" ry="6.8"/>', '<ellipse cx="12" cy="12" rx="8.5" ry="6.8"/>'),
    arrow: D('', '<path d="M4 18.5c2.5-7.5 7.5-11.5 15-11.5"/><path d="M15 3.5L19 7l-3.6 4"/>'),
    line: D('<circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="5.5" r="2"/>', '<path d="M7 17L17 7"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="5.5" r="2"/>'),
    draw: D('<path d="M12 21l-5.5-8.5L12 3l5.5 9.5z"/>', '<path d="M12 21l-5.5-8.5L12 3l5.5 9.5z"/><path d="M12 21v-6.6"/><circle cx="12" cy="12.6" r="1.4"/>'),
    text: P('<path d="M5 7V5h14v2M12 5v14M9 19h6"/>'),
    eraser: D('<path d="M4.5 15.5L9 11l6 6-2.5 2.5H8.5z"/>', '<path d="M4.5 15.5l9-9a2 2 0 0 1 2.8 0l3.2 3.2a2 2 0 0 1 0 2.8l-7 7H8.5z"/><path d="M15 19.5h5"/>'),
    menu: D('', '<path d="M4 7h16M4 12h10M4 17h13"/>'),
    undo: D('', '<path d="M5.5 13a7 7 0 1 0 2-5.5"/><path d="M4.5 4v4.5H9"/>'),
    redo: D('', '<path d="M18.5 13a7 7 0 1 1-2-5.5"/><path d="M19.5 4v4.5H15"/>'),
    plus: P('<path d="M12 5v14M5 12h14"/>'),
    minus: P('<path d="M5 12h14"/>'),
    globe: P('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    open: D('<path d="M3 8h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
    save: D('<rect x="4" y="15" width="16" height="5" rx="2"/>', '<path d="M12 4v10M7.5 9.5L12 14l4.5-4.5"/><rect x="4" y="15" width="16" height="5" rx="2"/>'),
    image: D('<path d="M3 17l5-5 4 4 3-3 6 6H3z"/>', '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="16" cy="9" r="1.8"/><path d="M3 17l5-5 4 4 3-3 6 6"/>'),
    svg: P('<path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/>'),
    trash: D('<path d="M6.5 8h11l-1 12h-9z"/>', '<path d="M4 8h16M10 12v5M14 12v5M6.5 8l1 12h9l1-12M9.5 8V5h5v3"/>'),
    moon: D('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>', '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),
    copy: D('<rect x="8" y="8" width="12" height="12" rx="3"/>', '<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
    front: P('<rect x="8" y="8" width="12" height="12" rx="2" fill="currentColor" fill-opacity=".25"/><path d="M4 16V5a1 1 0 0 1 1-1h11"/>'),
    back: P('<rect x="4" y="4" width="12" height="12" rx="2" fill="currentColor" fill-opacity=".25"/><path d="M20 8v11a1 1 0 0 1-1 1H8"/>'),
    sw1: P('<path d="M4 12h16" stroke-width="1.5"/>'),
    sw2: P('<path d="M4 12h16" stroke-width="3"/>'),
    sw4: P('<path d="M4 12h16" stroke-width="5"/>'),
    r0: P('<path d="M3 17C8 17 9 7 14 7s5 6 7 6"/>'),
    r1: P('<path d="M3 17c3-1 4-9 9-10s4 7 9 6"/><path d="M4 16c4-2 5-8 9-9" opacity=".6"/>'),
    r2: P('<path d="M3 17c2 0 3-5 5-8s4-3 5 0 2 6 8 4"/><path d="M4 14c2-2 4-7 7-6s3 5 6 6" opacity=".6"/>'),
    hachure: P('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12l8-8M4 20L20 4M12 20l8-8"/>'),
    cross: P('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12l8-8M4 20L20 4M12 20l8-8M12 4l8 8M4 4l16 16M4 12l8 8"/>'),
    solid: P('<rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor"/>'),
  };

  // ---------------------------------------------------------------- state
  const STORAGE_KEY = 'rekha-board-v1';
  const PAPER = '#faf6ee', SEL = '#c8341c';
  // ink, sindoor, peacock, henna, haldi, jamun
  const STROKES = ['#1f1d4d', '#c8341c', '#0b7285', '#4d7c0f', '#d98a00', '#6b2a7a'];
  const BGS = ['transparent', '#f9d4c8', '#cfe6c4', '#c6e3ec', '#fbe1a0', '#e4d0ee'];
  const FONT_SIZES = { small: 20, medium: 28, large: 40, huge: 64 };
  const SHAPES = ['rect', 'diamond', 'ellipse'];
  const LINEAR = ['line', 'arrow'];

  const state = {
    elements: [],
    selected: new Set(),
    tool: 'select',
    locked: false,
    view: { x: 0, y: 0, zoom: 1 },
    style: { stroke: '#1f1d4d', bg: 'transparent', fillStyle: 'hachure', strokeWidth: 2, roughness: 1, opacity: 100, fontSize: 28 },
    lang: 'hi',
    script: 'deva',
    phonetic: true,
    theme: 'light',
  };

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const editor = document.getElementById('editor');
  let rc = window.rough ? rough.canvas(canvas) : null;
  let dpr = window.devicePixelRatio || 1;

  const t = (k) => (STRINGS[state.lang] && STRINGS[state.lang][k]) || STRINGS.en[k] || k;
  const uid = () => Math.random().toString(36).slice(2, 10);
  const seed = () => Math.floor(Math.random() * 2 ** 31);
  const fontFor = (script) => (SCRIPTS[script] || SCRIPTS.latn).font;
  const fontStack = (script) => `"${fontFor(script)}", "Kalam", "Noto Sans", sans-serif`;

  // ---------------------------------------------------------------- geometry
  function bounds(el) {
    if (el.points) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const [px, py] of el.points) {
        minX = Math.min(minX, px); minY = Math.min(minY, py);
        maxX = Math.max(maxX, px); maxY = Math.max(maxY, py);
      }
      return { x: el.x + minX, y: el.y + minY, w: maxX - minX, h: maxY - minY };
    }
    return { x: el.x, y: el.y, w: el.w, h: el.h };
  }
  function groupBounds(els) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const el of els) {
      const b = bounds(el);
      minX = Math.min(minX, b.x); minY = Math.min(minY, b.y);
      maxX = Math.max(maxX, b.x + b.w); maxY = Math.max(maxY, b.y + b.h);
    }
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }
  function distToSeg(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const len = dx * dx + dy * dy;
    let u = len ? ((px - ax) * dx + (py - ay) * dy) / len : 0;
    u = Math.max(0, Math.min(1, u));
    return Math.hypot(px - (ax + u * dx), py - (ay + u * dy));
  }
  function distToPolyline(px, py, pts) {
    if (pts.length === 1) return Math.hypot(px - pts[0][0], py - pts[0][1]);
    let d = Infinity;
    for (let i = 1; i < pts.length; i++) d = Math.min(d, distToSeg(px, py, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]));
    return d;
  }
  function pointInPoly(px, py, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function hitTest(el, x, y) {
    const tol = 8 / state.view.zoom + el.strokeWidth / 2;
    const lx = x - el.x, ly = y - el.y;
    const filled = el.bg && el.bg !== 'transparent';
    switch (el.type) {
      case 'rect': {
        const inside = lx >= -tol && ly >= -tol && lx <= el.w + tol && ly <= el.h + tol;
        if (!inside) return false;
        if (filled) return true;
        return lx <= tol || ly <= tol || lx >= el.w - tol || ly >= el.h - tol;
      }
      case 'ellipse': {
        const rx = el.w / 2, ry = el.h / 2;
        if (rx < 1 || ry < 1) return false;
        const d = Math.sqrt(((lx - rx) / rx) ** 2 + ((ly - ry) / ry) ** 2);
        return filled ? d <= 1 + tol / Math.min(rx, ry) : Math.abs(d - 1) * Math.min(rx, ry) <= tol;
      }
      case 'diamond': {
        const pts = [[el.w / 2, 0], [el.w, el.h / 2], [el.w / 2, el.h], [0, el.h / 2]];
        if (filled && pointInPoly(lx, ly, pts)) return true;
        return distToPolyline(lx, ly, [...pts, pts[0]]) <= tol;
      }
      case 'line': case 'arrow': case 'draw':
        return distToPolyline(lx, ly, el.points) <= tol;
      case 'text':
        return lx >= -tol && ly >= -tol && lx <= el.w + tol && ly <= el.h + tol;
    }
    return false;
  }
  function topHit(x, y) {
    for (let i = state.elements.length - 1; i >= 0; i--) {
      if (hitTest(state.elements[i], x, y)) return state.elements[i];
    }
    return null;
  }

  // ---------------------------------------------------------------- text
  const measureCtx = document.createElement('canvas').getContext('2d');
  function measureText(el) {
    const lh = SCRIPTS[el.script].lh;
    measureCtx.font = `${el.fontSize}px ${fontStack(el.script)}`;
    const lines = el.text.split('\n');
    let w = 0;
    for (const l of lines) w = Math.max(w, measureCtx.measureText(l).width);
    el.w = Math.max(w, 1);
    el.h = lines.length * el.fontSize * lh;
  }
  const requested = new Set();
  function ensureFont(script) {
    const f = fontFor(script);
    if (requested.has(script) || !document.fonts) return;
    requested.add(script);
    document.fonts.load(`20px "${f}"`, SCRIPTS[script].glyph).then(() => {
      state.elements.forEach((el) => el.type === 'text' && measureText(el));
      scheduleRender();
    }).catch(() => {});
  }

  // ---------------------------------------------------------------- drawing
  function roughOpts(el) {
    const o = {
      stroke: el.stroke, strokeWidth: el.strokeWidth, roughness: el.roughness, seed: el.seed,
      bowing: 1, preserveVertices: true,
    };
    if (el.bg && el.bg !== 'transparent' && !LINEAR.includes(el.type)) {
      o.fill = el.bg;
      o.fillStyle = el.fillStyle;
      o.hachureGap = 4 + el.strokeWidth * 2.5;
      o.fillWeight = el.strokeWidth / 2;
    }
    return o;
  }
  function arrowHead(el) {
    const pts = el.points;
    const [x2, y2] = pts[pts.length - 1], [x1, y1] = pts[pts.length - 2];
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const len = Math.min(30, Math.hypot(x2 - x1, y2 - y1) * 0.4) + el.strokeWidth;
    const a1 = ang + Math.PI - 0.45, a2 = ang + Math.PI + 0.45;
    return [[x2 + Math.cos(a1) * len, y2 + Math.sin(a1) * len], [x2, y2], [x2 + Math.cos(a2) * len, y2 + Math.sin(a2) * len]];
  }
  // Rough drawables, positioned at the element's local origin.
  function drawables(el, gen) {
    const o = roughOpts(el);
    switch (el.type) {
      case 'rect': return [gen.rectangle(0, 0, el.w, el.h, o)];
      case 'ellipse': return [gen.ellipse(el.w / 2, el.h / 2, el.w, el.h, o)];
      case 'diamond': return [gen.polygon([[el.w / 2, 0], [el.w, el.h / 2], [el.w / 2, el.h], [0, el.h / 2]], o)];
      case 'line': return [gen.linearPath(el.points, o)];
      case 'arrow': {
        const d = [gen.linearPath(el.points, o)];
        if (el.points.length > 1) d.push(gen.linearPath(arrowHead(el), { ...o, seed: el.seed + 1 }));
        return d;
      }
    }
    return [];
  }
  function cachedDrawables(el) {
    const key = JSON.stringify([el.type, el.w, el.h, el.points, el.stroke, el.bg, el.fillStyle, el.strokeWidth, el.roughness, el.seed]);
    if (el._key !== key) { el._key = key; el._d = drawables(el, rc.generator); }
    return el._d;
  }
  // Smooth freehand path through midpoints.
  function freehandPath(pts) {
    if (pts.length < 2) {
      const [x, y] = pts[0];
      return `M${x} ${y} L${x + 0.1} ${y + 0.1}`;
    }
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += ` Q${pts[i][0]} ${pts[i][1]} ${mx} ${my}`;
    }
    const last = pts[pts.length - 1];
    return d + ` L${last[0]} ${last[1]}`;
  }

  function drawElement(c, r, el, opts = {}) {
    c.save();
    c.globalAlpha = (el.opacity / 100) * (opts.fade ? 0.25 : 1);
    c.translate(el.x, el.y);
    if (el.type === 'draw') {
      c.strokeStyle = el.stroke;
      c.lineWidth = el.strokeWidth * 1.4;
      c.lineCap = 'round'; c.lineJoin = 'round';
      c.stroke(new Path2D(freehandPath(el.points)));
    } else if (el.type === 'text') {
      const sc = SCRIPTS[el.script];
      c.font = `${el.fontSize}px ${fontStack(el.script)}`;
      c.fillStyle = el.stroke;
      c.textBaseline = 'middle';
      c.direction = sc.rtl ? 'rtl' : 'ltr';
      c.textAlign = sc.rtl ? 'right' : 'left';
      const lineH = el.fontSize * sc.lh;
      el.text.split('\n').forEach((line, i) => c.fillText(line, sc.rtl ? el.w : 0, i * lineH + lineH / 2));
    } else {
      const list = r === rc ? cachedDrawables(el) : drawables(el, r.generator);
      list.forEach((d) => r.draw(d));
    }
    c.restore();
  }

  let editingId = null;
  let erasing = new Set();
  let marquee = null;

  function render() {
    renderQueued = false;
    const { x, y, zoom } = state.view;
    const w = canvas.width, h = canvas.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, w, h);
    drawDots(x, y, zoom);
    ctx.setTransform(dpr * zoom, 0, 0, dpr * zoom, dpr * zoom * x, dpr * zoom * y);

    const vw = w / dpr / zoom, vh = h / dpr / zoom;
    for (const el of state.elements) {
      if (el.id === editingId) continue;
      const b = bounds(el);
      if (b.x > -x + vw + 50 || b.y > -y + vh + 50 || b.x + b.w < -x - 50 || b.y + b.h < -y - 50) continue;
      drawElement(ctx, rc, el, { fade: erasing.has(el.id) });
    }

    // selection chrome
    const sel = selectedEls();
    if (sel.length && !editingId) {
      const pad = 6 / zoom;
      ctx.lineWidth = 1 / zoom;
      ctx.strokeStyle = SEL;
      ctx.setLineDash([5 / zoom, 4 / zoom]);
      if (sel.length > 1) {
        for (const el of sel) {
          const b = bounds(el);
          ctx.strokeRect(b.x - pad, b.y - pad, b.w + pad * 2, b.h + pad * 2);
        }
      }
      ctx.setLineDash([]);
      const g = groupBounds(sel);
      ctx.strokeRect(g.x - pad, g.y - pad, g.w + pad * 2, g.h + pad * 2);
      const hs = 9 / zoom;
      ctx.fillStyle = PAPER;
      ctx.lineWidth = 1.5 / zoom;
      for (const hd of handles(g)) {
        ctx.beginPath();
        ctx.arc(hd.x, hd.y, hs / 2, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
      }
    }
    if (marquee) {
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(200,52,28,0.06)';
      ctx.strokeStyle = SEL;
      ctx.lineWidth = 1 / zoom;
      const r = normRect(marquee);
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    }
    if (editingId) positionEditor();
    document.getElementById('welcome').classList.toggle('hidden', state.elements.length > 0 || !!editingId);
  }
  // Faint dot grid in screen space, spaced on a 24-unit world grid.
  function drawDots(x, y, zoom) {
    let step = 24 * zoom;
    while (step < 14) step *= 2;
    const r = Math.max(0.7, Math.min(1.3, zoom)) * dpr;
    ctx.fillStyle = 'rgba(120, 100, 60, 0.22)';
    const ox = ((x * zoom) % step + step) % step, oy = ((y * zoom) % step + step) % step;
    for (let sx = ox; sx < innerWidth; sx += step) {
      for (let sy = oy; sy < innerHeight; sy += step) ctx.fillRect(sx * dpr - r / 2, sy * dpr - r / 2, r, r);
    }
  }
  let renderQueued = false;
  function scheduleRender() {
    if (!renderQueued) { renderQueued = true; requestAnimationFrame(render); }
  }

  function handles(g) {
    const pad = 6 / state.view.zoom;
    return [
      { id: 'nw', x: g.x - pad, y: g.y - pad }, { id: 'ne', x: g.x + g.w + pad, y: g.y - pad },
      { id: 'sw', x: g.x - pad, y: g.y + g.h + pad }, { id: 'se', x: g.x + g.w + pad, y: g.y + g.h + pad },
    ];
  }
  const normRect = (m) => ({ x: Math.min(m.x1, m.x2), y: Math.min(m.y1, m.y2), w: Math.abs(m.x2 - m.x1), h: Math.abs(m.y2 - m.y1) });
  const selectedEls = () => state.elements.filter((e) => state.selected.has(e.id));

  // ---------------------------------------------------------------- history & persistence
  const strip = (els) => JSON.parse(JSON.stringify(els, (k, v) => (k.startsWith('_') ? undefined : v)));
  let history = [], hIndex = -1;
  function commit() {
    history = history.slice(0, hIndex + 1);
    history.push(JSON.stringify(strip(state.elements)));
    if (history.length > 150) history.shift();
    hIndex = history.length - 1;
    persist();
    updateChrome();
  }
  function restore(i) {
    hIndex = i;
    state.elements = JSON.parse(history[i]);
    state.selected = new Set([...state.selected].filter((id) => state.elements.some((e) => e.id === id)));
    persist();
    updateChrome();
    scheduleRender();
  }
  const undo = () => hIndex > 0 && restore(hIndex - 1);
  const redo = () => hIndex < history.length - 1 && restore(hIndex + 1);

  let persistTimer;
  function persist() {
    clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          elements: strip(state.elements), view: state.view, style: state.style, lang: state.lang,
          script: state.script, phonetic: state.phonetic, theme: state.theme,
        }));
      } catch (_) { /* storage unavailable */ }
    }, 250);
  }
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        Object.assign(state, {
          elements: d.elements || [], view: d.view || state.view, style: { ...state.style, ...d.style },
          lang: LANGS[d.lang] ? d.lang : 'hi', script: SCRIPTS[d.script] ? d.script : 'deva',
          phonetic: d.phonetic !== false, theme: d.theme || 'light',
        });
        return;
      }
    } catch (_) { /* ignore */ }
    const nav = (navigator.language || '').slice(0, 2);
    if (LANGS[nav]) { state.lang = nav; state.script = LANGS[nav].script; }
  }

  // ---------------------------------------------------------------- element creation
  function newElement(type, x, y) {
    const s = state.style;
    const el = {
      id: uid(), type, x, y, w: 0, h: 0, seed: seed(),
      stroke: s.stroke, bg: s.bg, fillStyle: s.fillStyle, strokeWidth: s.strokeWidth,
      roughness: s.roughness, opacity: s.opacity,
    };
    if (LINEAR.includes(type) || type === 'draw') el.points = [[0, 0]];
    if (LINEAR.includes(type)) el.points.push([0, 0]);
    if (type === 'text') Object.assign(el, { text: '', script: state.script, fontSize: s.fontSize });
    state.elements.push(el);
    return el;
  }

  // ---------------------------------------------------------------- coordinates
  const toWorld = (sx, sy) => ({ x: sx / state.view.zoom - state.view.x, y: sy / state.view.zoom - state.view.y });
  function zoomAt(newZoom, sx, sy) {
    newZoom = Math.min(30, Math.max(0.1, newZoom));
    const w = toWorld(sx, sy);
    state.view.zoom = newZoom;
    state.view.x = sx / newZoom - w.x;
    state.view.y = sy / newZoom - w.y;
    updateChrome();
    persist();
    scheduleRender();
  }

  // ---------------------------------------------------------------- pointer
  let drag = null;
  let spaceDown = false;

  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault(); // keep focus where we put it (text editor)
    if (editingId) { finishEditing(); return; }
    closeMenu();
    canvas.setPointerCapture(e.pointerId);
    const p = toWorld(e.offsetX, e.offsetY);

    if (e.button === 1 || spaceDown || state.tool === 'hand') {
      drag = { mode: 'pan', sx: e.clientX, sy: e.clientY, vx: state.view.x, vy: state.view.y };
      canvas.style.cursor = 'grabbing';
      return;
    }
    if (e.button !== 0) return;

    const tool = state.tool;
    if (tool === 'select') {
      const sel = selectedEls();
      if (sel.length) {
        const g = groupBounds(sel);
        const hd = handles(g).find((h) => Math.abs(h.x - p.x) < 10 / state.view.zoom && Math.abs(h.y - p.y) < 10 / state.view.zoom);
        if (hd) {
          const anchor = { nw: [g.x + g.w, g.y + g.h], ne: [g.x, g.y + g.h], sw: [g.x + g.w, g.y], se: [g.x, g.y] }[hd.id];
          drag = { mode: 'resize', handle: hd, anchor, g, orig: strip(sel), moved: false };
          return;
        }
      }
      const hit = topHit(p.x, p.y);
      if (hit) {
        if (e.shiftKey) {
          state.selected.has(hit.id) ? state.selected.delete(hit.id) : state.selected.add(hit.id);
        } else if (!state.selected.has(hit.id)) {
          state.selected = new Set([hit.id]);
        }
        if (e.altKey) duplicateSelection(0); // alt-drag duplicates
        drag = { mode: 'move', start: p, orig: strip(selectedEls()), moved: false };
      } else {
        if (!e.shiftKey) state.selected.clear();
        drag = { mode: 'marquee' };
        marquee = { x1: p.x, y1: p.y, x2: p.x, y2: p.y };
      }
      updateChrome();
      scheduleRender();
      return;
    }
    if (tool === 'eraser') {
      drag = { mode: 'erase' };
      eraseAt(p);
      return;
    }
    if (tool === 'text') {
      const hit = topHit(p.x, p.y);
      if (hit && hit.type === 'text') return startEditing(hit);
      createTextAt(p);
      return;
    }
    // shapes, lines, freehand
    state.selected.clear();
    const el = newElement(tool, p.x, p.y);
    drag = { mode: tool === 'draw' ? 'draw' : 'create', el, start: p };
    scheduleRender();
  });

  canvas.addEventListener('pointermove', (e) => {
    const p = toWorld(e.offsetX, e.offsetY);
    if (!drag) { updateHoverCursor(p); return; }
    switch (drag.mode) {
      case 'pan':
        state.view.x = drag.vx + (e.clientX - drag.sx) / state.view.zoom;
        state.view.y = drag.vy + (e.clientY - drag.sy) / state.view.zoom;
        break;
      case 'create': {
        const el = drag.el;
        let dx = p.x - drag.start.x, dy = p.y - drag.start.y;
        if (LINEAR.includes(el.type)) {
          if (e.shiftKey) { // snap to 15°
            const a = Math.round(Math.atan2(dy, dx) / (Math.PI / 12)) * (Math.PI / 12);
            const len = Math.hypot(dx, dy);
            dx = Math.cos(a) * len; dy = Math.sin(a) * len;
          }
          el.points[1] = [dx, dy];
        } else {
          if (e.shiftKey) { const m = Math.max(Math.abs(dx), Math.abs(dy)); dx = Math.sign(dx || 1) * m; dy = Math.sign(dy || 1) * m; }
          el.x = Math.min(drag.start.x, drag.start.x + dx);
          el.y = Math.min(drag.start.y, drag.start.y + dy);
          el.w = Math.abs(dx); el.h = Math.abs(dy);
        }
        break;
      }
      case 'draw': {
        const el = drag.el;
        const last = el.points[el.points.length - 1];
        const lx = p.x - el.x, ly = p.y - el.y;
        if (Math.hypot(lx - last[0], ly - last[1]) > 1.5 / state.view.zoom) el.points.push([lx, ly]);
        break;
      }
      case 'move': {
        const dx = p.x - drag.start.x, dy = p.y - drag.start.y;
        if (Math.abs(dx) + Math.abs(dy) > 0) drag.moved = true;
        const byId = Object.fromEntries(drag.orig.map((o) => [o.id, o]));
        for (const el of selectedEls()) {
          const o = byId[el.id];
          if (o) { el.x = o.x + dx; el.y = o.y + dy; }
        }
        break;
      }
      case 'resize': resizeSelection(p, e.shiftKey); break;
      case 'marquee': {
        marquee.x2 = p.x; marquee.y2 = p.y;
        const r = normRect(marquee);
        state.selected = new Set(state.elements.filter((el) => {
          const b = bounds(el);
          return b.x >= r.x && b.y >= r.y && b.x + b.w <= r.x + r.w && b.y + b.h <= r.y + r.h;
        }).map((el) => el.id));
        break;
      }
      case 'erase': eraseAt(p); break;
    }
    scheduleRender();
  });

  function endDrag() {
    if (!drag) return;
    const d = drag;
    drag = null;
    switch (d.mode) {
      case 'pan': canvas.style.cursor = cursorFor(); persist(); break;
      case 'create': {
        const el = d.el;
        const tiny = LINEAR.includes(el.type) ? Math.hypot(...el.points[1]) < 4 : el.w < 4 && el.h < 4;
        if (tiny) {
          state.elements = state.elements.filter((x) => x !== el);
        } else {
          state.selected = new Set([el.id]);
          commit();
          if (!state.locked) setTool('select');
        }
        break;
      }
      case 'draw': commit(); break;
      case 'move': if (d.moved) commit(); break;
      case 'resize': if (d.moved) commit(); break;
      case 'marquee': marquee = null; updateChrome(); break;
      case 'erase':
        if (erasing.size) {
          state.elements = state.elements.filter((el) => !erasing.has(el.id));
          erasing.clear();
          state.selected.clear();
          commit();
        }
        break;
    }
    scheduleRender();
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  canvas.addEventListener('dblclick', (e) => {
    if (state.tool !== 'select' && state.tool !== 'text') return;
    const p = toWorld(e.offsetX, e.offsetY);
    const hit = topHit(p.x, p.y);
    if (hit && hit.type === 'text') startEditing(hit);
    else if (!hit) createTextAt(p);
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (editingId) finishEditing();
    if (e.ctrlKey || e.metaKey) {
      zoomAt(state.view.zoom * Math.exp(-e.deltaY * 0.01), e.offsetX, e.offsetY);
    } else {
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
      const dy = e.shiftKey && !e.deltaX ? 0 : e.deltaY;
      state.view.x -= dx / state.view.zoom;
      state.view.y -= dy / state.view.zoom;
      persist();
      scheduleRender();
    }
  }, { passive: false });

  function eraseAt(p) {
    const hit = topHit(p.x, p.y);
    if (hit) { erasing.add(hit.id); scheduleRender(); }
  }

  function resizeSelection(p, keepRatio) {
    const { anchor: [ax, ay], handle, g, orig } = drag;
    const hx = handle.id.includes('e') ? g.x + g.w : g.x;
    const hy = handle.id.includes('s') ? g.y + g.h : g.y;
    let sx = (hx - ax) ? (p.x - ax) / (hx - ax) : 1;
    let sy = (hy - ay) ? (p.y - ay) / (hy - ay) : 1;
    const hasText = orig.some((o) => o.type === 'text');
    if (keepRatio || hasText) { const s = Math.max(Math.abs(sx), Math.abs(sy)); sx = Math.sign(sx || 1) * s; sy = Math.sign(sy || 1) * s; }
    const clamp = (v) => (Math.abs(v) < 0.02 ? Math.sign(v || 1) * 0.02 : v);
    sx = clamp(sx); sy = clamp(sy);
    drag.moved = true;
    const map = (x, y) => [ax + (x - ax) * sx, ay + (y - ay) * sy];
    for (const o of orig) {
      const el = state.elements.find((e) => e.id === o.id);
      if (!el) continue;
      if (o.points) {
        [el.x, el.y] = map(o.x, o.y);
        el.points = o.points.map(([px, py]) => [px * sx, py * sy]);
      } else if (o.type === 'text') {
        const [x1, y1] = map(o.x, o.y), [x2, y2] = map(o.x + o.w, o.y + o.h);
        el.fontSize = Math.max(6, o.fontSize * Math.abs(sy));
        measureText(el);
        el.x = Math.min(x1, x2); el.y = Math.min(y1, y2);
      } else {
        const [x1, y1] = map(o.x, o.y), [x2, y2] = map(o.x + o.w, o.y + o.h);
        el.x = Math.min(x1, x2); el.y = Math.min(y1, y2);
        el.w = Math.abs(x2 - x1); el.h = Math.abs(y2 - y1);
      }
    }
  }

  function cursorFor() {
    if (spaceDown || state.tool === 'hand') return 'grab';
    if (state.tool === 'select') return 'default';
    if (state.tool === 'text') return 'text';
    if (state.tool === 'eraser') return 'cell';
    return 'crosshair';
  }
  function updateHoverCursor(p) {
    if (state.tool !== 'select' || spaceDown) { canvas.style.cursor = cursorFor(); return; }
    const sel = selectedEls();
    if (sel.length) {
      const hd = handles(groupBounds(sel)).find((h) => Math.abs(h.x - p.x) < 10 / state.view.zoom && Math.abs(h.y - p.y) < 10 / state.view.zoom);
      if (hd) { canvas.style.cursor = hd.id === 'nw' || hd.id === 'se' ? 'nwse-resize' : 'nesw-resize'; return; }
    }
    canvas.style.cursor = topHit(p.x, p.y) ? 'move' : 'default';
  }

  // ---------------------------------------------------------------- text editing
  let phonBuf = '', phonEnd = -1;

  function createTextAt(p) {
    const el = newElement('text', p.x, p.y);
    el.y = p.y - (el.fontSize * SCRIPTS[el.script].lh) / 2;
    measureText(el);
    startEditing(el, true);
  }
  function startEditing(el, isNew = false) {
    ensureFont(el.script);
    editingId = el.id;
    state.selected = new Set([el.id]);
    editor.hidden = false;
    editor.value = el.text;
    editor.dataset.isNew = isNew ? '1' : '';
    phonBuf = '';
    styleEditor(el);
    updateChrome();
    scheduleRender();
    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
  }
  function styleEditor(el) {
    const sc = SCRIPTS[el.script];
    editor.dir = sc.rtl ? 'rtl' : 'ltr';
    editor.style.fontFamily = fontStack(el.script);
    editor.style.color = el.stroke;
    editor.style.opacity = el.opacity / 100;
    positionEditor();
  }
  function positionEditor() {
    const el = state.elements.find((e) => e.id === editingId);
    if (!el) return;
    const { x, y, zoom } = state.view;
    const sc = SCRIPTS[el.script];
    editor.style.fontSize = el.fontSize + 'px';
    editor.style.lineHeight = sc.lh;
    editor.style.width = el.w + el.fontSize + 'px';
    editor.style.height = el.h + 'px';
    editor.style.left = (el.x + x) * zoom + (sc.rtl ? -el.fontSize * zoom : 0) + 'px';
    editor.style.top = (el.y + y) * zoom + 'px';
    editor.style.transform = `scale(${zoom})`;
    editor.style.textAlign = sc.rtl ? 'right' : 'left';
  }
  function onEditorInput() {
    const el = state.elements.find((e) => e.id === editingId);
    if (!el) return;
    el.text = editor.value;
    measureText(el);
    positionEditor();
  }
  function finishEditing() {
    const el = state.elements.find((e) => e.id === editingId);
    editingId = null;
    editor.hidden = true;
    editor.blur();
    if (!el) return;
    el.text = editor.value.replace(/\s+$/, '');
    if (!el.text.trim()) {
      state.elements = state.elements.filter((e) => e !== el);
      state.selected.delete(el.id);
      if (!editor.dataset.isNew) commit();
    } else {
      measureText(el);
      commit();
    }
    if (!state.locked && state.tool === 'text') setTool('select');
    updateChrome();
    scheduleRender();
  }

  editor.addEventListener('input', onEditorInput);
  editor.addEventListener('blur', () => editingId && finishEditing());
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || (e.key === 'Enter' && (e.ctrlKey || e.metaKey))) { e.preventDefault(); finishEditing(); }
    e.stopPropagation();
  });
  // Phonetic typing: keep a Roman buffer for the word in progress and
  // re-transliterate it on every keystroke.
  editor.addEventListener('beforeinput', (e) => {
    const el = state.elements.find((x) => x.id === editingId);
    const script = el ? el.script : 'latn';
    if (!state.phonetic || script === 'latn' || e.isComposing) { phonBuf = ''; return; }
    const s = editor.selectionStart;
    const oldOut = phonBuf ? transliterate(phonBuf, script) : '';
    if (phonBuf && (s !== editor.selectionEnd || s !== phonEnd || editor.value.slice(s - oldOut.length, s) !== oldOut)) phonBuf = '';
    const cur = phonBuf ? oldOut : '';
    let data;
    if (e.inputType === 'insertText' && e.data && /[A-Za-z~|^]/.test(e.data)) data = e.data;
    else if (e.inputType === 'deleteContentBackward' && phonBuf) data = null;
    else { phonBuf = ''; return; }
    e.preventDefault();
    if (data === null) {
      phonBuf = phonBuf.slice(0, -1);
      editor.setRangeText(transliterate(phonBuf, script), s - cur.length, s, 'end');
    } else {
      let start = s - cur.length, end = s;
      for (const ch of data) {
        if (PHONETIC_KEY.test(ch)) {
          const prev = phonBuf ? transliterate(phonBuf, script) : '';
          phonBuf += ch;
          editor.setRangeText(transliterate(phonBuf, script), start, end, 'end');
          end = editor.selectionStart;
          if (!prev) start = end - transliterate(phonBuf, script).length;
        } else {
          editor.setRangeText(ch, end, end, 'end');
          phonBuf = '';
          start = end = editor.selectionStart;
        }
      }
    }
    phonEnd = editor.selectionStart;
    onEditorInput();
  });

  // ---------------------------------------------------------------- commands
  function setTool(tool) {
    if (editingId) finishEditing();
    state.tool = tool;
    if (tool !== 'select') state.selected.clear();
    canvas.style.cursor = cursorFor();
    updateChrome();
    scheduleRender();
  }
  function deleteSelection() {
    if (!state.selected.size) return;
    state.elements = state.elements.filter((e) => !state.selected.has(e.id));
    state.selected.clear();
    commit();
    scheduleRender();
  }
  function duplicateSelection(offset = 16) {
    const copies = strip(selectedEls()).map((o) => ({ ...o, id: uid(), seed: seed(), x: o.x + offset, y: o.y + offset }));
    if (!copies.length) return;
    state.elements.push(...copies);
    state.selected = new Set(copies.map((c) => c.id));
    if (offset) commit();
    scheduleRender();
  }
  function reorder(toFront) {
    const sel = state.elements.filter((e) => state.selected.has(e.id));
    const rest = state.elements.filter((e) => !state.selected.has(e.id));
    state.elements = toFront ? [...rest, ...sel] : [...sel, ...rest];
    commit();
    scheduleRender();
  }
  function applyStyle(key, value) {
    state.style[key] = value;
    let changed = false;
    for (const el of selectedEls()) {
      if (key === 'fontSize' || key === 'script') {
        if (el.type !== 'text') continue;
        el[key] = value;
        if (key === 'script') ensureFont(value);
        measureText(el);
      } else el[key] = value;
      changed = true;
    }
    if (key === 'script') { state.script = value; ensureFont(value); }
    if (changed) commit(); else { persist(); updateChrome(); }
    const ed = state.elements.find((e) => e.id === editingId);
    if (ed) { ed[key] = value; if (key === 'script' || key === 'fontSize') measureText(ed); styleEditor(ed); phonBuf = ''; }
    scheduleRender();
  }
  let clipboard = null;
  function copy() { clipboard = strip(selectedEls()); }
  function paste() {
    if (!clipboard || !clipboard.length) return;
    const copies = clipboard.map((o) => ({ ...o, id: uid(), seed: seed(), x: o.x + 24, y: o.y + 24 }));
    clipboard = copies.map((c) => ({ ...c }));
    state.elements.push(...copies);
    state.selected = new Set(copies.map((c) => c.id));
    commit();
    scheduleRender();
  }
  function clearCanvas() {
    if (!state.elements.length || !confirm(t('clearConfirm'))) return;
    state.elements = [];
    state.selected.clear();
    commit();
    scheduleRender();
  }

  // ---------------------------------------------------------------- export
  function download(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  const exportEls = () => (state.selected.size ? selectedEls() : state.elements);

  async function exportPNG() {
    const els = exportEls();
    if (!els.length) return;
    if (document.fonts) await document.fonts.ready;
    const pad = 24, scale = 2;
    const g = groupBounds(els);
    const c = document.createElement('canvas');
    c.width = Math.ceil((g.w + pad * 2) * scale);
    c.height = Math.ceil((g.h + pad * 2) * scale);
    const cx = c.getContext('2d');
    cx.fillStyle = PAPER;
    cx.fillRect(0, 0, c.width, c.height);
    cx.setTransform(scale, 0, 0, scale, (pad - g.x) * scale, (pad - g.y) * scale);
    const r = rough.canvas(c);
    els.forEach((el) => drawElement(cx, r, el));
    c.toBlob((b) => download(b, 'rekha-board.png'), 'image/png');
  }

  function exportSVG() {
    const els = exportEls();
    if (!els.length) return;
    const NS = 'http://www.w3.org/2000/svg';
    const pad = 24, g = groupBounds(els);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('width', g.w + pad * 2);
    svg.setAttribute('height', g.h + pad * 2);
    svg.setAttribute('viewBox', `${g.x - pad} ${g.y - pad} ${g.w + pad * 2} ${g.h + pad * 2}`);
    const fonts = [...new Set(els.filter((e) => e.type === 'text').map((e) => fontFor(e.script)))];
    if (fonts.length) {
      const style = document.createElementNS(NS, 'style');
      style.textContent = `@import url('https://fonts.googleapis.com/css2?${fonts.map((f) => 'family=' + f.replace(/ /g, '+')).join('&')}&display=swap');`;
      svg.appendChild(style);
    }
    const bg = document.createElementNS(NS, 'rect');
    Object.entries({ x: g.x - pad, y: g.y - pad, width: g.w + pad * 2, height: g.h + pad * 2, fill: PAPER }).forEach(([k, v]) => bg.setAttribute(k, v));
    svg.appendChild(bg);
    const rs = rough.svg(svg);
    for (const el of els) {
      const grp = document.createElementNS(NS, 'g');
      grp.setAttribute('transform', `translate(${el.x} ${el.y})`);
      grp.setAttribute('opacity', el.opacity / 100);
      if (el.type === 'draw') {
        const path = document.createElementNS(NS, 'path');
        Object.entries({ d: freehandPath(el.points), stroke: el.stroke, 'stroke-width': el.strokeWidth * 1.4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }).forEach(([k, v]) => path.setAttribute(k, v));
        grp.appendChild(path);
      } else if (el.type === 'text') {
        const sc = SCRIPTS[el.script];
        const lineH = el.fontSize * sc.lh;
        el.text.split('\n').forEach((line, i) => {
          const tx = document.createElementNS(NS, 'text');
          Object.entries({
            x: sc.rtl ? el.w : 0, y: i * lineH + lineH / 2, 'font-family': fontStack(el.script),
            'font-size': el.fontSize, fill: el.stroke, 'dominant-baseline': 'middle',
            'text-anchor': sc.rtl ? 'end' : 'start', direction: sc.rtl ? 'rtl' : 'ltr',
          }).forEach(([k, v]) => tx.setAttribute(k, v));
          tx.setAttribute('xml:space', 'preserve');
          tx.textContent = line;
          grp.appendChild(tx);
        });
      } else {
        drawables(el, rs.generator).forEach((d) => grp.appendChild(rs.draw(d)));
      }
      svg.appendChild(grp);
    }
    download(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }), 'rekha-board.svg');
  }

  function saveFile() {
    const data = { type: 'rekha-board', version: 1, elements: strip(state.elements) };
    download(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), 'drawing.rekha.json');
  }
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', async () => {
    const f = fileInput.files[0];
    fileInput.value = '';
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!Array.isArray(data.elements)) throw new Error('bad file');
      state.elements = data.elements;
      state.selected.clear();
      state.elements.forEach((el) => el.type === 'text' && ensureFont(el.script));
      commit();
      scheduleRender();
    } catch (err) {
      alert('Could not open file: ' + err.message);
    }
  });

  // ---------------------------------------------------------------- keyboard
  const TOOL_KEYS = { v: 'select', 1: 'select', h: 'hand', r: 'rect', 2: 'rect', d: 'diamond', 3: 'diamond', o: 'ellipse', 4: 'ellipse', a: 'arrow', 5: 'arrow', l: 'line', 6: 'line', p: 'draw', 7: 'draw', t: 'text', 8: 'text', e: 'eraser', 0: 'eraser' };
  window.addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('input, select, textarea')) return;
    const mod = e.ctrlKey || e.metaKey;
    const k = e.key.toLowerCase();
    if (e.key === ' ' && !spaceDown) { spaceDown = true; canvas.style.cursor = 'grab'; e.preventDefault(); return; }
    if (mod && k === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if (mod && k === 'y') { e.preventDefault(); redo(); return; }
    if (mod && k === 'd') { e.preventDefault(); duplicateSelection(); return; }
    if (mod && k === 'a') { e.preventDefault(); setTool('select'); state.selected = new Set(state.elements.map((x) => x.id)); updateChrome(); scheduleRender(); return; }
    if (mod && k === 'c') { copy(); return; }
    if (mod && k === 'x') { copy(); deleteSelection(); return; }
    if (mod && k === 'v') { paste(); return; }
    if (mod && k === 's') { e.preventDefault(); saveFile(); return; }
    if (mod && k === 'o') { e.preventDefault(); fileInput.click(); return; }
    if (mod && (k === '=' || k === '+')) { e.preventDefault(); zoomAt(state.view.zoom * 1.2, innerWidth / 2, innerHeight / 2); return; }
    if (mod && k === '-') { e.preventDefault(); zoomAt(state.view.zoom / 1.2, innerWidth / 2, innerHeight / 2); return; }
    if (mod && k === '0') { e.preventDefault(); zoomAt(1, innerWidth / 2, innerHeight / 2); return; }
    if (mod) return;
    if (e.key === 'Delete' || e.key === 'Backspace') { deleteSelection(); return; }
    if (e.key === 'Escape') { state.selected.clear(); closeMenu(); setTool('select'); return; }
    if (e.key === 'Enter') {
      const sel = selectedEls();
      if (sel.length === 1 && sel[0].type === 'text') { e.preventDefault(); startEditing(sel[0]); }
      return;
    }
    if (e.key.startsWith('Arrow') && state.selected.size) {
      e.preventDefault();
      const step = e.shiftKey ? 10 : 1;
      const [dx, dy] = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      selectedEls().forEach((el) => { el.x += dx; el.y += dy; });
      commit();
      scheduleRender();
      return;
    }
    if (k === 'q') { state.locked = !state.locked; updateChrome(); return; }
    if (TOOL_KEYS[k] !== undefined) setTool(TOOL_KEYS[k]);
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === ' ') { spaceDown = false; canvas.style.cursor = cursorFor(); }
  });

  // ---------------------------------------------------------------- UI chrome
  const TOOLS = [
    ['hand', 'H'], ['select', '1'], null, ['rect', '2'], ['diamond', '3'], ['ellipse', '4'], ['arrow', '5'],
    ['line', '6'], ['draw', '7'], ['text', '8'], ['eraser', '0'],
  ];
  const toolbar = document.getElementById('toolbar');
  const props = document.getElementById('props');
  const menu = document.getElementById('menu');
  const menuBtn = document.getElementById('menuBtn');
  const ribbon = document.getElementById('ribbon');

  function buildToolbar() {
    toolbar.innerHTML = '';
    const lock = document.createElement('button');
    lock.className = 'icon-btn' + (state.locked ? ' locked' : '');
    lock.innerHTML = state.locked ? ICON.lock : ICON.unlock;
    lock.title = t('lock') + ' — Q';
    lock.onclick = () => { state.locked = !state.locked; updateChrome(); };
    toolbar.appendChild(lock);
    toolbar.appendChild(Object.assign(document.createElement('span'), { className: 'sep' }));
    for (const item of TOOLS) {
      if (!item) { toolbar.appendChild(Object.assign(document.createElement('span'), { className: 'sep' })); continue; }
      const [tool, key] = item;
      const b = document.createElement('button');
      b.className = 'icon-btn' + (state.tool === tool ? ' active' : '');
      const glyph = SCRIPTS[state.script] || SCRIPTS.latn;
      const icon = tool === 'text' ? `<span class="glyph-icon" style='font-family:${fontStack(state.script)}'>${glyph.glyph}</span>` : ICON[tool];
      b.innerHTML = icon + (key && key !== 'H' ? `<span class="kbd">${key}</span>` : '');
      b.title = `${t(tool)} — ${key}`;
      b.setAttribute('aria-label', t(tool));
      b.onclick = () => setTool(tool);
      toolbar.appendChild(b);
    }
  }

  function el(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === undefined || v === null) continue;
      if (k === 'on') Object.entries(v).forEach(([ev, fn]) => n.addEventListener(ev, fn));
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v);
    }
    children.forEach((c) => c && n.appendChild(c));
    return n;
  }
  const heading = (k) => el('h3', { text: t(k) });
  function optRow(key, options, current) {
    return el('div', { class: 'row' }, options.map(([value, icon, label, glyph]) => el('button', {
      class: 'opt' + (current === value ? ' active' : '') + (glyph ? ' glyph' : ''),
      title: label, 'aria-label': label, html: icon || undefined, text: glyph || undefined,
      on: { click: () => applyStyle(key, value) },
    })));
  }
  function swatchRow(key, colors, current) {
    const row = el('div', { class: 'row' }, colors.map((c) => el('button', {
      class: 'swatch' + (c === 'transparent' ? ' transparent' : '') + (current === c ? ' active' : ''),
      style: c === 'transparent' ? '' : `background:${c}`, title: c, 'aria-label': c,
      on: { click: () => applyStyle(key, c) },
    })));
    const custom = el('input', { type: 'color', class: 'color-input', value: current === 'transparent' ? '#ffffff' : current, title: '#' });
    custom.addEventListener('change', () => applyStyle(key, custom.value));
    row.appendChild(custom);
    return row;
  }

  function buildProps() {
    const sel = selectedEls();
    const types = new Set(sel.length ? sel.map((e) => e.type) : [state.tool]);
    const show = sel.length > 0 || !['select', 'hand', 'eraser'].includes(state.tool) || !!editingId;
    props.hidden = !show;
    if (!show) return;
    const base = sel[0] || state.style;
    const cur = (k) => (base[k] !== undefined ? base[k] : state.style[k]);
    const hasShape = [...types].some((x) => SHAPES.includes(x));
    const hasStrokeLines = [...types].some((x) => x !== 'text');
    const hasText = types.has('text') || !!editingId;

    props.innerHTML = '';
    props.append(heading('stroke'), swatchRow('stroke', STROKES, cur('stroke')));
    if (hasShape) {
      props.append(heading('background'), swatchRow('bg', BGS, cur('bg')));
      if (cur('bg') !== 'transparent') {
        props.append(heading('fill'), optRow('fillStyle', [['hachure', ICON.hachure, t('hachure')], ['cross-hatch', ICON.cross, t('cross')], ['solid', ICON.solid, t('solid')]], cur('fillStyle')));
      }
    }
    if (hasStrokeLines) {
      props.append(heading('strokeWidth'), optRow('strokeWidth', [[1, ICON.sw1, t('thin')], [2, ICON.sw2, t('bold')], [4, ICON.sw4, t('extraBold')]], cur('strokeWidth')));
      if (!(types.size === 1 && types.has('draw'))) {
        props.append(heading('sloppiness'), optRow('roughness', [[0, ICON.r0, t('architect')], [1, ICON.r1, t('artist')], [2, ICON.r2, t('cartoonist')]], cur('roughness')));
      }
    }
    if (hasText) {
      const editingEl = state.elements.find((e) => e.id === editingId);
      const tb = editingEl || sel.find((e) => e.type === 'text') || state.style;
      const fs = tb.fontSize || state.style.fontSize;
      const sc = (editingEl || sel.find((e) => e.type === 'text') || {}).script || state.script;
      props.append(heading('fontSize'), optRow('fontSize', Object.entries(FONT_SIZES).map(([k, v]) => [v, null, t(k), k[0].toUpperCase()]), fs));
      props.append(heading('script'), optRow('script', Object.entries(SCRIPTS).map(([k, s]) => [k, null, s.name, s.glyph]), sc));
      if (sc !== 'latn') {
        const cb = el('input', { type: 'checkbox' });
        cb.checked = state.phonetic;
        cb.addEventListener('change', () => { state.phonetic = cb.checked; phonBuf = ''; persist(); buildProps(); if (editingId) editor.focus(); });
        props.append(el('label', { class: 'toggle' }, [cb, el('span', { text: t('phonetic') })]));
        if (state.phonetic && PHONETIC_EXAMPLES[sc]) {
          const ex = PHONETIC_EXAMPLES[sc];
          props.append(el('div', { class: 'hint', html: `<code>${ex}</code> → <b>${transliterate(ex, sc)}</b><br><code>aa ee oo</code> · <code>T D N Sh</code>${sc !== 'arab' ? ` · <code>^</code> = ${transliterate('k^', sc)}` : ''}${['taml', 'telu', 'knda'].includes(sc) ? ' · <code>e/E o/O</code>' : ''}${sc === 'taml' ? ' · <code>zh R</code>' : ''}` }));
        }
      }
    }
    props.append(heading('opacity'));
    const range = el('input', { type: 'range', min: 10, max: 100, step: 10, value: cur('opacity') });
    range.addEventListener('input', () => {
      state.style.opacity = +range.value;
      selectedEls().forEach((x) => { x.opacity = +range.value; });
      scheduleRender();
    });
    range.addEventListener('change', () => { if (sel.length) commit(); else persist(); });
    props.append(range);

    if (sel.length) {
      props.append(heading('layers'), el('div', { class: 'row' }, [
        el('button', { class: 'opt', title: t('back'), html: ICON.back, on: { click: () => reorder(false) } }),
        el('button', { class: 'opt', title: t('front'), html: ICON.front, on: { click: () => reorder(true) } }),
      ]));
      props.append(heading('actions'), el('div', { class: 'row' }, [
        el('button', { class: 'opt', title: t('duplicate') + ' — Ctrl+D', html: ICON.copy, on: { click: () => duplicateSelection() } }),
        el('button', { class: 'opt', title: t('delete') + ' — Del', html: ICON.trash, on: { click: deleteSelection } }),
      ]));
    }
  }

  function buildMenu() {
    const item = (icon, key, fn, cls = '') => el('button', { class: cls, html: ICON[icon] + `<span>${t(key)}</span>`, on: { click: () => { closeMenu(); fn(); } } });
    menu.innerHTML = '';
    menu.append(
      item('open', 'open', () => fileInput.click()),
      item('save', 'save', saveFile),
      item('image', 'exportPng', exportPNG),
      item('svg', 'exportSvg', exportSVG),
      el('hr'),
      item('moon', 'theme', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(); persist(); }),
      el('hr'),
      item('trash', 'clear', clearCanvas, 'danger'),
    );
  }
  function closeMenu() { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.innerHTML = ICON.menu;
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
    menuBtn.setAttribute('aria-expanded', String(!menu.hidden));
  });
  document.addEventListener('click', (e) => { if (!menu.contains(e.target) && e.target !== menuBtn) closeMenu(); });

  function buildRibbon() {
    ribbon.innerHTML = '';
    ribbon.setAttribute('aria-label', t('lang'));
    for (const [code, info] of Object.entries(LANGS)) {
      const chip = el('button', {
        class: 'chip' + (code === 'en' ? ' latin' : ''), role: 'radio', lang: code,
        'aria-checked': String(code === state.lang), text: code === 'en' ? 'EN' : info.native,
        title: info.native, style: code === 'en' ? undefined : `font-family:${fontStack(info.script)}`,
        on: { click: () => setLang(code) },
      });
      ribbon.appendChild(chip);
    }
  }
  // Keep the text editor focused while clicking style options.
  props.addEventListener('mousedown', (e) => { if (editingId && e.target.tagName !== 'INPUT') e.preventDefault(); });

  function setLang(code) {
    state.lang = code;
    state.script = LANGS[code].script;
    ensureFont(state.script);
    applyLang();
    persist();
  }
  function applyLang() {
    const info = LANGS[state.lang];
    document.documentElement.lang = state.lang;
    document.documentElement.dir = info.rtl ? 'rtl' : 'ltr';
    document.body.style.setProperty('--ui-font', `"${info.ui}", "Baloo 2", system-ui, sans-serif`);
    document.title = `${t('appName')} · Rekha Board`;
    const logo = document.getElementById('welcomeLogo');
    logo.textContent = t('appName');
    logo.style.fontFamily = fontStack(info.script);
    document.getElementById('welcomeTitle').textContent = t('welcome');
    document.getElementById('welcomeSub').textContent = t('welcomeSub');
    const samples = document.getElementById('welcomeSamples');
    samples.innerHTML = '';
    for (const [code, l] of Object.entries(LANGS)) {
      if (code === 'en') continue;
      samples.appendChild(el('span', { text: STRINGS[code].sample, style: `font-family:${fontStack(l.script)}` }));
    }
    const mark = document.getElementById('brandMark');
    mark.textContent = t('appName');
    mark.lang = state.lang;
    mark.style.fontFamily = fontStack(info.script);
    buildRibbon();
    buildMenu();
    updateChrome();
  }
  function applyTheme() { document.body.classList.toggle('dark', state.theme === 'dark'); }

  function updateChrome() {
    buildToolbar();
    buildProps();
    document.getElementById('zoomReset').textContent = Math.round(state.view.zoom * 100) + '%';
    document.getElementById('zoomReset').title = t('resetZoom');
    document.getElementById('zoomIn').title = t('zoomIn');
    document.getElementById('zoomOut').title = t('zoomOut');
    const ub = document.getElementById('undoBtn'), rb = document.getElementById('redoBtn');
    ub.title = t('undo') + ' — Ctrl+Z'; rb.title = t('redo') + ' — Ctrl+Shift+Z';
    ub.disabled = hIndex <= 0; rb.disabled = hIndex >= history.length - 1;
  }

  document.getElementById('zoomIn').innerHTML = ICON.plus;
  document.getElementById('zoomOut').innerHTML = ICON.minus;
  document.getElementById('undoBtn').innerHTML = ICON.undo;
  document.getElementById('redoBtn').innerHTML = ICON.redo;
  document.getElementById('zoomIn').onclick = () => zoomAt(state.view.zoom * 1.2, innerWidth / 2, innerHeight / 2);
  document.getElementById('zoomOut').onclick = () => zoomAt(state.view.zoom / 1.2, innerWidth / 2, innerHeight / 2);
  document.getElementById('zoomReset').onclick = () => zoomAt(1, innerWidth / 2, innerHeight / 2);
  document.getElementById('undoBtn').onclick = undo;
  document.getElementById('redoBtn').onclick = redo;

  // ---------------------------------------------------------------- boot
  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    scheduleRender();
  }
  window.addEventListener('resize', resize);

  load();
  if (!rc) {
    document.body.innerHTML = '<p style="padding:24px;font-family:sans-serif">Could not load rough.js — check your internet connection.</p>';
    return;
  }
  history = [JSON.stringify(strip(state.elements))];
  hIndex = 0;
  applyTheme();
  applyLang();
  Object.keys(SCRIPTS).forEach(ensureFont);
  if (document.fonts) document.fonts.ready.then(() => { state.elements.forEach((x) => x.type === 'text' && measureText(x)); scheduleRender(); });
  resize();

  // Debug/test hook.
  window.rekha = { state, render, transliterate: window.transliterate };
})();
