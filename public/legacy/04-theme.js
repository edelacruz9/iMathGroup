/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
/* Brand palettes. iMath Classic (navy and green) is the default. Every other palette recolors what the
   studio draws at draw time: canvas outputs, HTML outputs (mapText), registered color tables, and the
   studio screens. Patriotic (veteran marketing) also swaps logos, turns accent rules into ribbon bands,
   bullets into stars, and adds the VA disclaimer. One global choice in My profile, plus a per tab choice. */
(function () {
  const WHITE = "#ffffff";
  // Brand source colors the templates are drawn with, grouped by role.
  const SRC = {
    primary: ["#002e5e"],
    dark: ["#001f40", "#001a36", "#07182d", "#06152a"],
    ink: ["#0b2340"],
    accent: ["#6bc063", "#64b35c", "#5fb357"],
    accentInk: ["#3f8f39"],
    light: ["#f2f5f9"]
  };
  const P = (id, name, vibe, c, swatches, extra) => Object.assign({ id, name, vibe, swatches }, c, extra || {});
  const PALETTES = [
    P("standard", "iMath Classic", "Our brand. Trusted, local and professional.", {}, [["Navy", "#002E5E"], ["iMath Green", "#6BC063"], ["Slate Gray", "#62666A"], ["Mist", "#F2F5F9"], ["Night", "#07182D"]]),
    P("coastal", "Coastal Blue", "Fresh and bright. Beach, water and First Coast lifestyle.", { primary: "#0e5e8c", dark: "#0c2d44", ink: "#0c2d44", accent: "#5cc8b0", accentInk: "#2c8f7a", light: "#f3ebdd" }, [["Ocean", "#0E5E8C"], ["Seafoam", "#5CC8B0"], ["Driftwood", "#A39383"], ["Sand", "#F3EBDD"], ["Deep Water", "#0C2D44"]]),
    P("blush", "Blush and Navy", "Soft and feminine with a strong anchor. Great on Instagram.", { primary: "#1f2f4a", dark: "#141f33", ink: "#1f2f4a", accent: "#b86b77", accentInk: "#974e5b", light: "#fbf4ee" }, [["Ink Navy", "#1F2F4A"], ["Rose", "#B86B77"], ["Blush", "#E8B4B8"], ["Cream", "#FBF4EE"], ["Soft Gold", "#C9A66B"]]),
    P("sage", "Sage and Linen", "Calm, natural and modern. Works for everyone.", { primary: "#4d6650", dark: "#33373b", ink: "#33373b", accent: "#9bb096", accentInk: "#5e7a5f", light: "#f4efe7" }, [["Deep Sage", "#4D6650"], ["Sage", "#9BB096"], ["Taupe", "#B5A592"], ["Linen", "#F4EFE7"], ["Charcoal", "#33373B"]]),
    P("copper", "Charcoal and Copper", "Masculine, modern and confident. Investors and new builds.", { primary: "#23272b", dark: "#16191c", ink: "#23272b", accent: "#c17a3a", accentInk: "#9a5e28", light: "#efeae3" }, [["Charcoal", "#23272B"], ["Copper", "#C17A3A"], ["Steel", "#7D8893"], ["Bone", "#EFEAE3"], ["Graphite", "#3D444B"]]),
    P("midnight", "Midnight and Gold", "Luxury listings and high end clients.", { primary: "#0b1a2e", dark: "#060f1c", ink: "#0b1a2e", accent: "#c9a44c", accentInk: "#8f7128", light: "#f3ead7" }, [["Midnight", "#0B1A2E"], ["Gold", "#C9A44C"], ["Pewter", "#7C8794"], ["Champagne", "#F3EAD7"], ["White", "#FFFFFF"]]),
    P("forest", "Forest and Kraft", "Rugged and warm. Land, acreage and outdoorsy agents.", { primary: "#1f3d2b", dark: "#132a1d", ink: "#1f3d2b", accent: "#c49a6c", accentInk: "#8a6538", light: "#f2ece1" }, [["Forest", "#1F3D2B"], ["Kraft", "#C49A6C"], ["Iron", "#4A5056"], ["Oat", "#F2ECE1"], ["iMath Green", "#6BC063"]]),
    P("coral", "Coral Pop", "Bold and playful. Built to stop the scroll on social.", { primary: "#13294b", dark: "#0b1a33", ink: "#13294b", accent: "#ff6f59", accentInk: "#d2442f", light: "#f7f4ef" }, [["Navy", "#13294B"], ["Coral", "#FF6F59"], ["Sunshine", "#FFC857"], ["Cloud", "#F7F4EF"], ["Teal", "#2EC4B6"]]),
    P("patriotic", "Patriotic", "Veterans, service members and military families only.", { primary: "#0a3161", dark: "#061a33", ink: "#0a2348", accent: "#b31942", accentInk: "#8c1236", light: "#f4efe4" }, [["Old Glory Blue", "#0A3161"], ["Old Glory Red", "#B31942"], ["White", "#FFFFFF"], ["Deep Navy", "#061A33"], ["Parchment", "#F4EFE4"]], { patriotic: true })
  ];
  const BY = {}; PALETTES.forEach(p => BY[p.id] = p);
  const VA = "Not affiliated with or endorsed by the U.S. Department of Veterans Affairs.";
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  const valid = v => typeof v === "string" && !!BY[v];
  let global = valid(store.get("imath_theme")) ? store.get("imath_theme") : "standard";
  let per = store.get("imath_theme_tab") || {};
  Object.keys(per).forEach(t => { if (!valid(per[t])) delete per[t]; });
  let cur = BY.standard, ACTIVE = false, PAT = false, tab = "social";
  let A = null, SRCREF = null, STD = null, PATSRC = null, patImgs = null, ready = null, stdImgs = null;
  const subs = [];

  // ---------- color helpers ----------
  const hexRGB = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const rgbKey = h => hexRGB(h).join(",");
  const lin = c => (c /= 255) <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const lumHex = h => lum(...hexRGB(h));
  const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  let HEX = {}, RGB = {}, GUARD = new Set(), GUARD_RGB = new Set();
  function buildMap(p) {
    HEX = {}; RGB = {}; GUARD = new Set(); GUARD_RGB = new Set();
    if (p.id === "standard") return;
    Object.keys(SRC).forEach(role => SRC[role].forEach(h => { HEX[h] = p[role]; RGB[rgbKey(h)] = hexRGB(p[role]); }));
    [p.accent, p.accentInk, p.primary, p.dark].forEach(h => { GUARD.add(h); GUARD_RGB.add(rgbKey(h)); });
  }
  // text color that reads on a fill
  const onFill = (fill, p) => ratio(lumHex(WHITE), lumHex(fill)) >= 3 ? WHITE : (p || cur).dark;

  function mapColor(v) {
    if (!ACTIVE || typeof v !== "string") return v;
    const s = v.trim().toLowerCase();
    if (s[0] === "#") {
      const h = s.length === 4 ? "#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3] : s.slice(0, 7);
      const m = HEX[h]; return m ? m + s.slice(7) : v;
    }
    if (s.startsWith("rgb")) {
      const m = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
      if (m) { const r = RGB[m[1] + "," + m[2] + "," + m[3]]; if (r) return m[4] != null ? "rgba(" + r.join(",") + "," + m[4] + ")" : "rgb(" + r.join(",") + ")"; }
    }
    return v;
  }
  function mapText(str) {
    if (!ACTIVE || !str) return str;
    return String(str).replace(/#([0-9a-fA-F]{6})(?=[0-9a-fA-F]{2}\b|\b)/g, h => HEX[h.toLowerCase()] || h)
      .replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*[\d.]+\s*)?\)/g, (m, r, g, b, a) => { const x = RGB[r + "," + g + "," + b]; return x ? (a ? "rgba(" + x.join(",") + a + ")" : "rgb(" + x.join(",") + ")") : m; });
  }
  function mapRGB(arr) { if (!ACTIVE || !Array.isArray(arr)) return arr; const x = RGB[arr.slice(0, 3).join(",")]; return x ? x.slice() : arr; }
  const tables = [];
  function register(T) { if (!T || tables.some(t => t.T === T)) return T; tables.push({ T, orig: JSON.parse(JSON.stringify(T)) }); if (ACTIVE) retable(); return T; }
  function retable() { tables.forEach(({ T, orig }) => Object.keys(orig).forEach(k => { const v = orig[k]; T[k] = Array.isArray(v) ? (ACTIVE ? mapRGB(v) : v.slice()) : (ACTIVE ? mapColor(v) : v); })); }

  // ---------- canvas interception ----------
  function rawFill(ctx, v) { Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "fillStyle").set.call(ctx, v); }
  function sample(ctx, text, x, y, maxW) {
    const c = ctx.canvas; if (!c || !c.width) return null;
    let w = ctx.measureText(String(text)).width; if (maxW != null && w > maxW) w = maxW;
    const size = parseFloat((ctx.font.match(/([\d.]+)px/) || [0, 16])[1]);
    const al = ctx.textAlign, bl = ctx.textBaseline;
    const x0 = al === "center" ? x - w / 2 : (al === "right" || al === "end") ? x - w : x;
    const yc = bl === "top" || bl === "hanging" ? y + size * 0.5 : bl === "middle" ? y : bl === "bottom" || bl === "ideographic" ? y - size * 0.5 : y - size * 0.35;
    const m = ctx.getTransform(); const pts = [];
    for (const fx of [0.02, 0.5, 0.98]) for (const fy of [-0.45, 0.45]) { const px = x0 + w * fx, py = yc + size * fy; pts.push([m.a * px + m.c * py + m.e, m.b * px + m.d * py + m.f]); }
    const xs = pts.map(p => Math.round(p[0])), ys = pts.map(p => Math.round(p[1]));
    const bx0 = Math.max(0, Math.min(...xs)), by0 = Math.max(0, Math.min(...ys)), bx1 = Math.min(c.width - 1, Math.max(...xs)), by1 = Math.min(c.height - 1, Math.max(...ys));
    if (bx1 < bx0 || by1 < by0) return null; const bw = bx1 - bx0 + 1, bh = by1 - by0 + 1; if (bw * bh > 4e6) return null;
    const D = ctx.getImageData(bx0, by0, bw, bh).data; let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < xs.length; i++) { const ix = xs[i] - bx0, iy = ys[i] - by0; if (ix < 0 || iy < 0 || ix >= bw || iy >= bh) continue; const o = (iy * bw + ix) * 4; if (D[o + 3] < 20) continue; r += D[o]; g += D[o + 1]; b += D[o + 2]; n++; }
    return n ? [r / n, g / n, b / n] : null;
  }
  // a readable replacement for text that would vanish into the pixels under it
  function swapFor(fill, bg) {
    const bl = lum(...bg); const p = cur;
    const isAccent = fill === p.accent || fill === p.accentInk;
    const tries = bl < 0.3 ? [WHITE, p.light] : isAccent ? [p.accentInk, p.primary, p.dark] : [WHITE, p.dark];
    for (const t of tries) if (ratio(lumHex(t), bl) >= 3) return t;
    return bl < 0.18 ? WHITE : p.dark;
  }
  function install() {
    const proto = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype; if (!proto || proto.__imathTheme) return; proto.__imathTheme = true;
    ["fillStyle", "strokeStyle", "shadowColor"].forEach(prop => { const d = Object.getOwnPropertyDescriptor(proto, prop); if (!d || !d.set) return;
      Object.defineProperty(proto, prop, { configurable: true, enumerable: d.enumerable, get: d.get, set(v) { d.set.call(this, ACTIVE ? mapColor(v) : v); } }); });
    if (window.CanvasGradient) { const acs = CanvasGradient.prototype.addColorStop; CanvasGradient.prototype.addColorStop = function (o, c) { return acs.call(this, o, ACTIVE ? mapColor(c) : c); }; }
    const ft = proto.fillText;
    proto.fillText = function (text, x, y, maxW) {
      if (!ACTIVE) return ft.apply(this, arguments);
      let t = text; if (PAT && typeof t === "string" && /^\s*•/.test(t)) t = t.replace("•", "★");
      const fs = this.fillStyle; let swap = null;
      if (typeof fs === "string" && GUARD.has(fs) && this.canvas && this.canvas.width * this.canvas.height < 40e6) {
        try { const bg = sample(this, t, x, y, maxW); if (bg && ratio(lumHex(fs), lum(...bg)) < 3) swap = swapFor(fs, bg); } catch (e) { }
      }
      const args = maxW != null ? [maxW] : [];
      if (swap) { const keep = fs; rawFill(this, swap); const r = ft.call(this, t, x, y, ...args); rawFill(this, keep); return r; }
      return t === text ? ft.apply(this, arguments) : ft.call(this, t, x, y, ...args);
    };
    // Patriotic only: thin red accent rules become red, white and blue ribbon bands, small red squares become stars.
    const fr = proto.fillRect;
    proto.fillRect = function (x, y, w, h) {
      if (!PAT || this.fillStyle !== cur.accent || this.__noRibbon) return fr.apply(this, arguments);
      let m = null; try { m = this.getTransform(); } catch (e) { }
      const sx = m ? Math.hypot(m.a, m.b) : 1, sy = m ? Math.hypot(m.c, m.d) : 1; const pw = Math.abs(w * sx), ph = Math.abs(h * sy);
      const horiz = pw >= ph * 10 && ph >= 5 && ph <= 60, vert = ph >= pw * 10 && pw >= 5 && pw <= 60;
      if (pw >= 6 && ph >= 6 && pw <= 64 && ph <= 64 && Math.max(pw, ph) / Math.min(pw, ph) < 1.35 && this.canvas && this.canvas.width >= 500) {
        const cx = x + w / 2, cy = y + h / 2, R = Math.max(Math.abs(w), Math.abs(h)) * 0.72, r = R * 0.42; this.save(); this.beginPath();
        for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; this.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
        this.closePath(); this.fill(); this.restore(); return;
      }
      if (!horiz && !vert) return fr.apply(this, arguments);
      const keep = this.fillStyle; const cols = [cur.accent, WHITE, cur.primary];
      for (let i = 0; i < 3; i++) { rawFill(this, cols[i]); if (horiz) fr.call(this, x, y + h * i / 3, w, h / 3 + (i < 2 ? h * 0.002 : 0)); else fr.call(this, x + w * i / 3, y, w / 3 + (i < 2 ? w * 0.002 : 0), h); }
      rawFill(this, keep);
    };
  }

  // ---------- DOM contrast pass for HTML previews ----------
  function parseRGB(s) { const m = String(s).match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+))?/); return m ? [+m[1], +m[2], +m[3], m[4] == null ? 1 : +m[4]] : null; }
  function bgOf(el) {
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== "none" && /url\(/.test(cs.backgroundImage)) return null;
      const c = parseRGB(cs.backgroundColor); if (c && c[3] > 0.5) return c;
      if (cs.backgroundImage && /gradient/.test(cs.backgroundImage)) { const g = parseRGB(cs.backgroundImage) || (cs.backgroundImage.match(/#[0-9a-f]{6}/i) ? hexRGB(cs.backgroundImage.match(/#[0-9a-f]{6}/i)[0]) : null); if (g) return g; }
    }
    return [255, 255, 255];
  }
  function fixDom(root) {
    if (!ACTIVE || !root) return;
    root.querySelectorAll("*").forEach(el => {
      if (!el.childNodes.length || ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return;
      const c = parseRGB(getComputedStyle(el).color); if (!c || !GUARD_RGB.has(c.slice(0, 3).join(","))) return;
      const bg = bgOf(el); if (!bg) return;
      if (ratio(lum(c[0], c[1], c[2]), lum(bg[0], bg[1], bg[2])) < 3) { const hex = "#" + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, "0")).join(""); el.style.color = swapFor(hex, bg); el.dataset.thfix = "1"; }
    });
  }
  function unfixDom() { document.querySelectorAll("[data-thfix]").forEach(el => { el.style.color = ""; delete el.dataset.thfix; }); }
  let mo = null, moT = null; const dirty = new Set();
  function watch() {
    if (mo || !window.MutationObserver || !document.body) return;
    mo = new MutationObserver(list => {
      if (!ACTIVE) return;
      list.forEach(m => { const t = m.target && m.target.nodeType === 1 ? m.target : null; if (t && !t.closest(".theme-bar,.theme-pick,#access")) dirty.add(t); });
      clearTimeout(moT); moT = setTimeout(() => { const roots = [...dirty]; dirty.clear(); roots.forEach(r => { if (document.contains(r) && r.offsetParent !== null && r.querySelectorAll("*").length < 6000) fixDom(r); }); }, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  // ---------- studio screens: palette CSS cloned from the Patriotic rules ----------
  let styleEl = null, patRules = null;
  function collectPatRules() {
    if (patRules) return patRules; patRules = [];
    const walk = (rules, wrap) => { for (const r of rules) {
      if (r.cssRules && r.media) { walk(r.cssRules, "@media " + r.media.mediaText); continue; }
      if (r.selectorText && /html\.theme-pat/.test(r.selectorText)) patRules.push({ css: r.cssText, wrap });
    } };
    for (const sh of document.styleSheets) { try { walk(sh.cssRules, null); } catch (e) { } }
    return patRules;
  }
  function paletteCSS(p) {
    const pat = BY.patriotic; const rep = {};
    ["primary", "dark", "ink", "accent", "accentInk", "light"].forEach(k => { rep[pat[k]] = p[k]; rep[rgbKey(pat[k])] = rgbKey(p[k]); });
    const fix = css => css.replace(/html\.theme-pat/g, "html.theme-pal")
      .replace(/#[0-9a-f]{6}\b/gi, h => rep[h.toLowerCase()] || h)
      .replace(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/g, (m, r, g, b) => { const k = r + "," + g + "," + b; if (!rep[k]) return m; const [R, G, B] = rep[k].split(","); return m.slice(0, m.indexOf("(") + 1) + R + ", " + G + ", " + B; });
    let out = collectPatRules().map(x => x.wrap ? x.wrap + "{" + fix(x.css) + "}" : fix(x.css)).join("\n");
    const onA = onFill(p.accent, p), onP = onFill(p.primary, p);
    out += "\nhtml.theme-pal{--chip-on-text:" + onP + "}" +
      "\nhtml.theme-pal .btn.green,html.theme-pal .btn.green:hover{color:" + onA + "!important}" +
      "\nhtml.theme-pal nav.tabs .tab[aria-current=\"page\"],html.theme-pal nav.tabs .tab[aria-current=\"page\"] svg,html.theme-pal .tb-item[aria-current=\"page\"],html.theme-pal .tb-item[aria-current=\"page\"] svg,html.theme-pal .stylecard .feat,html.theme-pal .r-status{color:" + onA + "!important}" +
      "\n@media (prefers-color-scheme:dark){html.theme-pal:not([data-theme=\"light\"]){--chip-on-text:" + onA + "}}html.theme-pal[data-theme=\"dark\"]{--chip-on-text:" + onA + "}";
    return out;
  }
  function applyCSS() {
    const root = document.documentElement;
    root.classList.toggle("theme-pat", PAT);
    root.classList.toggle("theme-pal", ACTIVE && !PAT);
    root.dataset.palette = cur.id;
    if (ACTIVE && !PAT) { if (!styleEl) { styleEl = document.createElement("style"); styleEl.id = "imathPaletteCSS"; document.head.appendChild(styleEl); } styleEl.textContent = paletteCSS(cur); }
    else if (styleEl) styleEl.textContent = "";
  }

  // ---------- logos (Patriotic only) ----------
  const PAT_KEYS = { lockupH: "pat_lockupH", lockupHRev: "pat_lockupHRev", lockupV: "pat_lockupV", lockupVRev: "pat_lockupVRev", mortColor: "pat_logo", mortRev: "pat_logoRev", logoColor: "pat_word", logoReverse: "pat_wordRev", iconColor: "pat_icon", iconReverse: "pat_iconRev" };
  function attach(assets, src) {
    A = assets; SRCREF = src;
    Object.keys(src).forEach(k => { const v = src[k]; if (typeof v === "string" && v.startsWith("data:image/svg+xml;charset=utf-8,")) { try { src[k] = "data:image/svg+xml;base64," + btoa(decodeURIComponent(v.slice(33))); } catch (e) { } } });
    STD = {}; Object.keys(PAT_KEYS).forEach(k => STD[k] = src[k]);
    PATSRC = {}; Object.keys(PAT_KEYS).forEach(k => PATSRC[k] = src[PAT_KEYS[k]]);
    ready = Promise.all(Object.keys(PAT_KEYS).map(k => new Promise(r => { if (!PATSRC[k]) return r([k, null]); const i = new Image(); i.onload = () => r([k, i]); i.onerror = () => r([k, null]); i.src = PATSRC[k]; })))
      .then(L => { patImgs = {}; L.forEach(([k, i]) => { if (i) patImgs[k] = i; }); });
    return ready;
  }
  function swapAssets() {
    if (!A || !STD) return;
    if (!stdImgs) { stdImgs = {}; Object.keys(PAT_KEYS).forEach(k => stdImgs[k] = A[k]); }
    Object.keys(PAT_KEYS).forEach(k => {
      if (SRCREF) SRCREF[k] = PAT && PATSRC[k] ? PATSRC[k] : STD[k];
      if (PAT && patImgs && patImgs[k]) A[k] = patImgs[k]; else if (!PAT && stdImgs[k]) A[k] = stdImgs[k];
    });
  }

  // ---------- state ----------
  const eff = t => per[t] || global;
  function apply(force) {
    const want = BY[eff(tab)] || BY.standard;
    if (want === cur && !force) return false;
    cur = want; ACTIVE = cur.id !== "standard"; PAT = !!cur.patriotic;
    buildMap(cur); retable(); swapAssets(); applyCSS();
    if (ACTIVE) { watch(); unfixDom(); setTimeout(() => document.querySelectorAll("[data-panel]:not([hidden])").forEach(fixDom), 200); } else unfixDom();
    subs.forEach(f => { try { f(PAT); } catch (e) { console.error(e); } });
    return true;
  }
  const api = {
    install, register, mapColor, mapText, mapRGB, fixDom, attach, VA,
    PALETTES: PALETTES.map(p => ({ id: p.id, name: p.name, vibe: p.vibe, swatches: p.swatches, patriotic: !!p.patriotic })),
    paletteName: id => (BY[id] || BY.standard).name,
    get on() { return PAT; },            // Patriotic is active (VA disclaimer, flag logos)
    get active() { return ACTIVE; },     // any palette other than iMath Classic
    get name() { return cur.id; },
    get current() { return cur; },
    get global() { return global; },
    tabSetting: t => per[t] || "",
    std: k => (STD && STD[k]) || (SRCREF || {})[k],
    ready: () => ready || Promise.resolve(),
    va: lo => PAT && lo !== false ? " " + VA : "",
    setGlobal(v) { global = valid(v) ? v : "standard"; store.set("imath_theme", global); return apply(); },
    setTab(t, v) { if (valid(v)) per[t] = v; else delete per[t]; store.set("imath_theme_tab", per); return apply(); },
    forTab(t) { tab = t; return apply(); },
    refresh: () => apply(true),
    onChange: f => subs.push(f),
    TABS: ["social", "cards", "flyers", "signs", "email", "cma", "docs", "tools", "video", "fun"],
    palette: () => ACTIVE ? cur.swatches : null,
    headlines: [["You served our country. Now let us serve you.", "Usted sirvió a nuestro país. Ahora permítanos servirle a usted."], ["The home loan benefit you earned, explained clearly.", "El beneficio hipotecario que usted se ganó, explicado con claridad."], ["Thank you for your service.", "Gracias por su servicio."], ["PROUDLY SERVING THOSE WHO SERVED", "ORGULLOSOS DE SERVIR A QUIENES SIRVIERON"], ["Put the home loan benefit you earned to work, with a team that guides you from application to closing.", ""], ["Help understanding your eligibility. Guidance from application to closing. Se habla español.", ""]]
  };
  window.iMathTheme = api;
  install();
})();
