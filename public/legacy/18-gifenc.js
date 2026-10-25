/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function () {
  var t = {};
  var e = Object.defineProperty;
  e(t, "__esModule", {
    value: true
  });
  ((t, r) => {
    for (var n in r) {
      e(t, n, {
        get: r[n],
        enumerable: true
      });
    }
  })(t, {
    GIFEncoder: () => U,
    applyPalette: () => B,
    default: () => E,
    nearestColor: () => C,
    nearestColorIndex: () => v,
    nearestColorIndexWithDistance: () => k,
    prequantize: () => p,
    quantize: () => y,
    snapColorsToPalette: () => m
  });
  var r = {
    signature: "GIF",
    version: "89a",
    trailer: 59,
    extensionIntroducer: 33,
    applicationExtensionLabel: 255,
    graphicControlExtensionLabel: 249,
    imageSeparator: 44,
    signatureSize: 3,
    versionSize: 3,
    globalColorTableFlagMask: 128,
    colorResolutionMask: 112,
    sortFlagMask: 8,
    globalColorTableSizeMask: 7,
    applicationIdentifierSize: 8,
    applicationAuthCodeSize: 3,
    disposalMethodMask: 28,
    userInputFlagMask: 2,
    transparentColorFlagMask: 1,
    localColorTableFlagMask: 128,
    interlaceFlagMask: 64,
    idSortFlagMask: 32,
    localColorTableSizeMask: 7
  };
  function n(t = 256) {
    let e = 0;
    let r = new Uint8Array(t);
    return {
      get buffer() {
        return r.buffer;
      },
      reset() {
        e = 0;
      },
      bytesView: () => r.subarray(0, e),
      bytes: () => r.slice(0, e),
      writeByte(t) {
        n(e + 1);
        r[e] = t;
        e++;
      },
      writeBytes(t, o = 0, a = t.length) {
        n(e + a);
        for (let n = 0; n < a; n++) {
          r[e++] = t[n + o];
        }
      },
      writeBytesView(t, o = 0, a = t.byteLength) {
        n(e + a);
        r.set(t.subarray(o, o + a), e);
        e += a;
      }
    };
    function n(t) {
      var n = r.length;
      if (n >= t) {
        return;
      }
      t = Math.max(t, n * (n < 1048576 ? 2 : 1.125) >>> 0);
      if (n != 0) {
        t = Math.max(t, 256);
      }
      const o = r;
      r = new Uint8Array(t);
      if (e > 0) {
        r.set(o.subarray(0, e), 0);
      }
    }
  }
  var o = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
  function a(t, e, r, a, i = n(512), l = new Uint8Array(256), c = new Int32Array(5003), f = new Int32Array(5003)) {
    const s = c.length;
    const u = Math.max(2, a);
    l.fill(0);
    f.fill(0);
    c.fill(-1);
    let w = 0;
    let y = 0;
    const h = u + 1;
    const g = h;
    let b = false;
    let p = g;
    let B = (1 << p) - 1;
    const d = 1 << h - 1;
    const A = d + 1;
    let m = d + 2;
    let M = 0;
    let v = r[0];
    let k = 0;
    for (let t = s; t < 65536; t *= 2) {
      ++k;
    }
    k = 8 - k;
    i.writeByte(u);
    U(d);
    const C = r.length;
    for (let t = 1; t < C; t++) {
      t: {
        const e = r[t];
        const n = (e << 12) + v;
        let o = e << k ^ v;
        if (c[o] === n) {
          v = f[o];
          break t;
        }
        const a = o === 0 ? 1 : s - o;
        while (c[o] >= 0) {
          o -= a;
          if (o < 0) {
            o += s;
          }
          if (c[o] === n) {
            v = f[o];
            break t;
          }
        }
        U(v);
        v = e;
        if (m < 4096) {
          f[o] = m++;
          c[o] = n;
        } else {
          c.fill(-1);
          m = d + 2;
          b = true;
          U(d);
        }
      }
    }
    U(v);
    U(A);
    i.writeByte(0);
    return i.bytesView();
    function U(t) {
      w &= o[y];
      if (y > 0) {
        w |= t << y;
      } else {
        w = t;
      }
      y += p;
      while (y >= 8) {
        l[M++] = w & 255;
        if (M >= 254) {
          i.writeByte(M);
          i.writeBytesView(l, 0, M);
          M = 0;
        }
        w >>= 8;
        y -= 8;
      }
      if (m > B || b) {
        if (b) {
          p = g;
          B = (1 << p) - 1;
          b = false;
        } else {
          ++p;
          B = p === 12 ? 1 << p : (1 << p) - 1;
        }
      }
      if (t == A) {
        while (y > 0) {
          l[M++] = w & 255;
          if (M >= 254) {
            i.writeByte(M);
            i.writeBytesView(l, 0, M);
            M = 0;
          }
          w >>= 8;
          y -= 8;
        }
        if (M > 0) {
          i.writeByte(M);
          i.writeBytesView(l, 0, M);
          M = 0;
        }
      }
    }
  }
  function i(t, e, r) {
    return t << 8 & 63488 | e << 2 & 992 | r >> 3;
  }
  function l(t, e, r, n) {
    return t >> 4 | e & 240 | (r & 240) << 4 | (n & 240) << 8;
  }
  function c(t, e, r) {
    return t >> 4 << 8 | e & 240 | r >> 4;
  }
  function f(t, e, r) {
    if (t < e) {
      return e;
    } else if (t > r) {
      return r;
    } else {
      return t;
    }
  }
  function s(t) {
    return t * t;
  }
  function u(t, e, r) {
    var n = 0;
    var o = 1e+100;
    const a = t[e];
    const i = a.cnt;
    const l = a.ac;
    const c = a.rc;
    const f = a.gc;
    const u = a.bc;
    for (var w = a.fw; w != 0; w = t[w].fw) {
      const e = t[w];
      const a = e.cnt;
      const h = i * a / (i + a);
      if (!(h >= o)) {
        var y = 0;
        if ((!r || !((y += h * s(e.ac - l)) >= o)) && !((y += h * s(e.rc - c)) >= o) && !((y += h * s(e.gc - f)) >= o) && !((y += h * s(e.bc - u)) >= o)) {
          o = y;
          n = w;
        }
      }
    }
    a.err = o;
    a.nn = n;
  }
  function w() {
    return {
      ac: 0,
      rc: 0,
      gc: 0,
      bc: 0,
      cnt: 0,
      nn: 0,
      fw: 0,
      bk: 0,
      tm: 0,
      mtm: 0,
      err: 0
    };
  }
  function y(t, e, r = {}) {
    const {
      format: n = "rgb565",
      clearAlpha: o = true,
      clearAlphaColor: a = 0,
      clearAlphaThreshold: y = 0,
      oneBitAlpha: g = false
    } = r;
    if (!t || !t.buffer) {
      throw new Error("quantize() expected RGBA Uint8Array data");
    }
    if (!(t instanceof Uint8Array) && !(t instanceof Uint8ClampedArray)) {
      throw new Error("quantize() expected RGBA Uint8Array data");
    }
    const b = new Uint32Array(t.buffer);
    let p = r.useSqrt !== false;
    const B = n === "rgba4444";
    const d = function (t, e) {
      const r = new Array(e === "rgb444" ? 4096 : 65536);
      const n = t.length;
      if (e === "rgba4444") {
        for (let e = 0; e < n; ++e) {
          const n = t[e];
          const o = n >> 24 & 255;
          const a = n >> 16 & 255;
          const i = n >> 8 & 255;
          const c = n & 255;
          const f = l(c, i, a, o);
          let s = f in r ? r[f] : r[f] = w();
          s.rc += c;
          s.gc += i;
          s.bc += a;
          s.ac += o;
          s.cnt++;
        }
      } else if (e === "rgb444") {
        for (let e = 0; e < n; ++e) {
          const n = t[e];
          const o = n >> 16 & 255;
          const a = n >> 8 & 255;
          const i = n & 255;
          const l = c(i, a, o);
          let f = l in r ? r[l] : r[l] = w();
          f.rc += i;
          f.gc += a;
          f.bc += o;
          f.cnt++;
        }
      } else {
        for (let e = 0; e < n; ++e) {
          const n = t[e];
          const o = n >> 16 & 255;
          const a = n >> 8 & 255;
          const l = n & 255;
          const c = i(l, a, o);
          let f = c in r ? r[c] : r[c] = w();
          f.rc += l;
          f.gc += a;
          f.bc += o;
          f.cnt++;
        }
      }
      return r;
    }(b, n);
    const A = d.length;
    const m = A - 1;
    const M = new Uint32Array(A + 1);
    var v = 0;
    for (var k = 0; k < A; ++k) {
      const t = d[k];
      if (t != null) {
        var C = 1 / t.cnt;
        if (B) {
          t.ac *= C;
        }
        t.rc *= C;
        t.gc *= C;
        t.bc *= C;
        d[v++] = t;
      }
    }
    var U;
    var x;
    var I;
    if (s(e) / v < 0.022) {
      p = false;
    }
    k = 0;
    for (; k < v - 1; ++k) {
      d[k].fw = k + 1;
      d[k + 1].bk = k;
      if (p) {
        d[k].cnt = Math.sqrt(d[k].cnt);
      }
    }
    if (p) {
      d[k].cnt = Math.sqrt(d[k].cnt);
    }
    k = 0;
    for (; k < v; ++k) {
      u(d, k, false);
      var z = d[k].err;
      for (x = ++M[0]; x > 1 && !(d[U = M[I = x >> 1]].err <= z); x = I) {
        M[x] = U;
      }
      M[x] = k;
    }
    var F = v - e;
    for (k = 0; k < F;) {
      var E;
      while (true) {
        var S = M[1];
        if ((E = d[S]).tm >= E.mtm && d[E.nn].mtm <= E.tm) {
          break;
        }
        if (E.mtm == m) {
          S = M[1] = M[M[0]--];
        } else {
          u(d, S, false);
          E.tm = k;
        }
        z = d[S].err;
        x = 1;
        for (; (I = x + x) <= M[0] && (I < M[0] && d[M[I]].err > d[M[I + 1]].err && I++, !(z <= d[U = M[I]].err)); x = I) {
          M[x] = U;
        }
        M[x] = S;
      }
      var q = d[E.nn];
      var G = E.cnt;
      var V = q.cnt;
      C = 1 / (G + V);
      if (B) {
        E.ac = C * (G * E.ac + V * q.ac);
      }
      E.rc = C * (G * E.rc + V * q.rc);
      E.gc = C * (G * E.gc + V * q.gc);
      E.bc = C * (G * E.bc + V * q.bc);
      E.cnt += q.cnt;
      E.mtm = ++k;
      d[q.bk].fw = q.fw;
      d[q.fw].bk = q.bk;
      q.mtm = m;
    }
    let T = [];
    var R = 0;
    for (k = 0;; ++R) {
      let t = f(Math.round(d[k].rc), 0, 255);
      let e = f(Math.round(d[k].gc), 0, 255);
      let r = f(Math.round(d[k].bc), 0, 255);
      let n = 255;
      if (B) {
        n = f(Math.round(d[k].ac), 0, 255);
        if (g) {
          n = n <= (typeof g == "number" ? g : 127) ? 0 : 255;
        }
        if (o && n <= y) {
          t = e = r = a;
          n = 0;
        }
      }
      const i = B ? [t, e, r, n] : [t, e, r];
      if (!h(T, i)) {
        T.push(i);
      }
      if ((k = d[k].fw) == 0) {
        break;
      }
    }
    return T;
  }
  function h(t, e) {
    for (let r = 0; r < t.length; r++) {
      const n = t[r];
      let o = n[0] === e[0] && n[1] === e[1] && n[2] === e[2];
      let a = !(n.length >= 4) || !(e.length >= 4) || n[3] === e[3];
      if (o && a) {
        return true;
      }
    }
    return false;
  }
  function g(t, e) {
    var r;
    var n = 0;
    for (r = 0; r < t.length; r++) {
      const o = t[r] - e[r];
      n += o * o;
    }
    return n;
  }
  function b(t, e) {
    if (e > 1) {
      return Math.round(t / e) * e;
    } else {
      return t;
    }
  }
  function p(t, {
    roundRGB: e = 5,
    roundAlpha: r = 10,
    oneBitAlpha: n = null
  } = {}) {
    const o = new Uint32Array(t.buffer);
    for (let t = 0; t < o.length; t++) {
      const a = o[t];
      let i = a >> 24 & 255;
      let l = a >> 16 & 255;
      let c = a >> 8 & 255;
      let f = a & 255;
      i = b(i, r);
      if (n) {
        i = i <= (typeof n == "number" ? n : 127) ? 0 : 255;
      }
      f = b(f, e);
      c = b(c, e);
      l = b(l, e);
      o[t] = i << 24 | l << 16 | c << 8 | f;
    }
  }
  function B(t, e, r = "rgb565") {
    if (!t || !t.buffer) {
      throw new Error("quantize() expected RGBA Uint8Array data");
    }
    if (!(t instanceof Uint8Array) && !(t instanceof Uint8ClampedArray)) {
      throw new Error("quantize() expected RGBA Uint8Array data");
    }
    if (e.length > 256) {
      throw new Error("applyPalette() only works with 256 colors or less");
    }
    const n = new Uint32Array(t.buffer);
    const o = n.length;
    const a = r === "rgb444" ? 4096 : 65536;
    const f = new Uint8Array(o);
    const s = new Array(a);
    if (r === "rgba4444") {
      for (let t = 0; t < o; t++) {
        const r = n[t];
        const o = r >> 24 & 255;
        const a = r >> 16 & 255;
        const i = r >> 8 & 255;
        const c = r & 255;
        const u = l(c, i, a, o);
        const w = u in s ? s[u] : s[u] = d(c, i, a, o, e);
        f[t] = w;
      }
    } else {
      const t = r === "rgb444" ? c : i;
      for (let r = 0; r < o; r++) {
        const o = n[r];
        const a = o >> 16 & 255;
        const i = o >> 8 & 255;
        const l = o & 255;
        const c = t(l, i, a);
        const u = c in s ? s[c] : s[c] = A(l, i, a, e);
        f[r] = u;
      }
    }
    return f;
  }
  function d(t, e, r, n, o) {
    let a = 0;
    let i = 1e+100;
    for (let l = 0; l < o.length; l++) {
      const c = o[l];
      let f = M(c[3] - n);
      if (!(f > i)) {
        f += M(c[0] - t);
        if (!(f > i)) {
          f += M(c[1] - e);
          if (!(f > i)) {
            f += M(c[2] - r);
            if (!(f > i)) {
              i = f;
              a = l;
            }
          }
        }
      }
    }
    return a;
  }
  function A(t, e, r, n) {
    let o = 0;
    let a = 1e+100;
    for (let i = 0; i < n.length; i++) {
      const l = n[i];
      let c = M(l[0] - t);
      if (!(c > a)) {
        c += M(l[1] - e);
        if (!(c > a)) {
          c += M(l[2] - r);
          if (!(c > a)) {
            a = c;
            o = i;
          }
        }
      }
    }
    return o;
  }
  function m(t, e, r = 5) {
    if (!t.length || !e.length) {
      return;
    }
    const n = t.map(t => t.slice(0, 3));
    const o = r * r;
    const a = t[0].length;
    for (let r = 0; r < e.length; r++) {
      let i = e[r];
      i = i.length < a ? [i[0], i[1], i[2], 255] : i.length > a ? i.slice(0, 3) : i.slice();
      const l = k(n, i.slice(0, 3), g);
      const c = l[0];
      const f = l[1];
      if (f > 0 && f <= o) {
        t[c] = i;
      }
    }
  }
  function M(t) {
    return t * t;
  }
  function v(t, e, r = g) {
    let n = Infinity;
    let o = -1;
    for (let a = 0; a < t.length; a++) {
      const i = r(e, t[a]);
      if (i < n) {
        n = i;
        o = a;
      }
    }
    return o;
  }
  function k(t, e, r = g) {
    let n = Infinity;
    let o = -1;
    for (let a = 0; a < t.length; a++) {
      const i = r(e, t[a]);
      if (i < n) {
        n = i;
        o = a;
      }
    }
    return [o, n];
  }
  function C(t, e, r = g) {
    return t[v(t, e, r)];
  }
  function U(t = {}) {
    const {
      initialCapacity: e = 4096,
      auto: o = true
    } = t;
    const i = n(e);
    const l = new Uint8Array(256);
    const c = new Int32Array(5003);
    const f = new Int32Array(5003);
    let s = false;
    return {
      reset() {
        i.reset();
        s = false;
      },
      finish() {
        i.writeByte(r.trailer);
      },
      bytes: () => i.bytes(),
      bytesView: () => i.bytesView(),
      get buffer() {
        return i.buffer;
      },
      get stream() {
        return i;
      },
      writeHeader: u,
      writeFrame(t, e, r, n = {}) {
        const {
          transparent: w = false,
          transparentIndex: y = 0,
          delay: h = 0,
          palette: g = null,
          repeat: b = 0,
          colorDepth: p = 8,
          dispose: B = -1
        } = n;
        let d = false;
        if (o) {
          if (!s) {
            d = true;
            u();
            s = true;
          }
        } else {
          d = Boolean(n.first);
        }
        e = Math.max(0, Math.floor(e));
        r = Math.max(0, Math.floor(r));
        if (d) {
          if (!g) {
            throw new Error("First frame must include a { palette } option");
          }
          (function (t, e, r, n, o = 8) {
            const a = o - 1 << 4 | 128 | F(n.length) - 1;
            I(t, e);
            I(t, r);
            t.writeBytes([a, 0, 0]);
          })(i, e, r, g, p);
          x(i, g);
          if (b >= 0) {
            (function (t, e) {
              t.writeByte(33);
              t.writeByte(255);
              t.writeByte(11);
              z(t, "NETSCAPE2.0");
              t.writeByte(3);
              t.writeByte(1);
              I(t, e);
              t.writeByte(0);
            })(i, b);
          }
        }
        const A = Math.round(h / 10);
        (function (t, e, r, n, o) {
          var a;
          var i;
          t.writeByte(33);
          t.writeByte(249);
          t.writeByte(4);
          if (o < 0) {
            o = 0;
            n = false;
          }
          if (n) {
            a = 1;
            i = 2;
          } else {
            a = 0;
            i = 0;
          }
          if (e >= 0) {
            i = e & 7;
          }
          i <<= 2;
          t.writeByte(i | 0 | a);
          I(t, r);
          t.writeByte(o || 0);
          t.writeByte(0);
        })(i, B, A, w, y);
        const m = Boolean(g) && !d;
        (function (t, e, r, n) {
          t.writeByte(44);
          I(t, 0);
          I(t, 0);
          I(t, e);
          I(t, r);
          if (n) {
            const e = 0;
            const r = 0;
            const o = F(n.length) - 1;
            t.writeByte(e | 128 | r | o);
          } else {
            t.writeByte(0);
          }
        })(i, e, r, m ? g : null);
        if (m) {
          x(i, g);
        }
        (function (t, e, r, n, o = 8, i, l, c) {
          a(r, n, e, o, t, i, l, c);
        })(i, t, e, r, p, l, c, f);
      }
    };
    function u() {
      z(i, "GIF89a");
    }
  }
  function x(t, e) {
    const r = 1 << F(e.length);
    for (let n = 0; n < r; n++) {
      let r = [0, 0, 0];
      if (n < e.length) {
        r = e[n];
      }
      t.writeByte(r[0]);
      t.writeByte(r[1]);
      t.writeByte(r[2]);
    }
  }
  function I(t, e) {
    t.writeByte(e & 255);
    t.writeByte(e >> 8 & 255);
  }
  function z(t, e) {
    for (var r = 0; r < e.length; r++) {
      t.writeByte(e.charCodeAt(r));
    }
  }
  function F(t) {
    return Math.max(Math.ceil(Math.log2(t)), 1);
  }
  var E = U;
  window.gifenc = t;
})();
