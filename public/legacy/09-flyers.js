/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (J) {
  const B = J.iMathPrint;
  const S = B.C;
  B.HF;
  const D = B.BF;
  const R = B.text;
  const Y = 8.5;
  const L = 11;
  const Z = 0.45;
  const v = q => String(q || "").toUpperCase();
  function A(q) {
    return B.T[q.lang === "es" ? "es" : "en"];
  }
  function K(q) {
    if (q.lang === "es") {
      return ["CASA ABIERTA", null];
    } else if (q.lang === "both") {
      return ["OPEN HOUSE", "CASA ABIERTA"];
    } else {
      return ["OPEN HOUSE", null];
    }
  }
  function V(q) {
    const T = A(q);
    const x = [];
    if (q.beds) {
      x.push([q.beds, T.beds]);
    }
    if (q.baths) {
      x.push([q.baths, T.baths]);
    }
    if (q.sqft) {
      x.push([q.sqft, T.sqft]);
    }
    return x;
  }
  function P(q, T, x, N, G) {
    let X = x;
    const H = G.size;
    const C = V(T);
    C.forEach((I, M) => {
      const J0 = R(q, I[0], X, N, {
        size: H,
        weight: 800,
        color: G.color
      });
      X += J0.w + H * 0.25;
      const J1 = R(q, I[1], X, N, {
        size: H * 0.72,
        weight: 400,
        fam: D,
        color: G.labelColor
      });
      X += J1.w;
      if (M < C.length - 1) {
        B.rect(q, X + H * 0.45, N - H * 0.72, H * 0.09, H * 0.8, G.sep || S.green);
        X += H * 1;
      }
    });
    return X - x;
  }
  // Description paragraph drawn where the highlight bullets go. X.room is the style's free space
  // (inches from the first baseline to the last one allowed). The type shrinks to fit but not below
  // DESC_MIN (about 6.8 pt, still readable in print); text that still does not fit ends with an
  // ellipsis, and B.descFit tells the form so it can warn the agent.
  const DESC_MIN = 0.095;
  function Fdesc(q, text, x, N, G, X) {
    const room = X.room != null ? X.room : (Math.ceil((X.max || 4) / (X.cols || 1)) - 1) * X.size * (X.lh || 1.7);
    const gap = 1.3;
    let size = Math.max(DESC_MIN, Math.min(X.size * 0.9, 0.13));
    let lines = B.wrapLines(q, text, { size, weight: 400, fam: D }, G);
    while ((lines.length - 1) * size * gap > room && size > DESC_MIN) {
      size = Math.max(DESC_MIN, size * 0.95);
      lines = B.wrapLines(q, text, { size, weight: 400, fam: D }, G);
    }
    const fit = Math.max(1, Math.floor(room / (size * gap) + 1e-6) + 1);
    const all = String(text).split(/\s+/).filter(Boolean).length;
    let shown = all;
    if (lines.length > fit) {
      lines = lines.slice(0, fit);
      lines[fit - 1] = lines[fit - 1].replace(/[\s,.;:]+\S*$/, "") + "…";
      shown = lines.join(" ").split(/\s+/).filter(Boolean).length;
    }
    if (q.canvas && q.canvas.width >= 500) {
      B.descFit = { cut: shown < all, shown, all };
    }
    lines.forEach((line, i) => R(q, line, x, N + i * size * gap, { size, weight: 400, fam: D, color: X.color }));
    return (lines.length - 1) * size * gap + X.size * (X.lh || 1.7);
  }
  function F(q, T, x, N, G, X) {
    if (T.description) {
      return Fdesc(q, T.description, x, N, G, X);
    }
    const H = (T.highlights || []).filter(Boolean).slice(0, X.max || 4);
    const C = X.size;
    let I = N;
    const M = X.cols || 1;
    const J0 = (G - (M - 1) * 0.3) / M;
    H.forEach((J1, J2) => {
      const J3 = J2 % M;
      const J4 = Math.floor(J2 / M);
      const J5 = x + J3 * (J0 + 0.3);
      const J6 = N + J4 * C * (X.lh || 1.7);
      B.rect(q, J5, J6 - C * 0.62, C * 0.42, C * 0.42, X.bullet || S.green);
      R(q, J1, J5 + C * 0.8, J6, {
        size: C,
        weight: 600,
        fam: D,
        color: X.color,
        maxW: J0 - C * 0.9
      });
      I = Math.max(I, J6);
    });
    if (H.length) {
      return I - N + C * (X.lh || 1.7);
    } else {
      return 0;
    }
  }
  function Q(q, T, N, G, X, H, C, I) {
    I = I || {};
    const M = T.lo && T.lo.id !== "none" ? T.lo : null;
    const J0 = !!I.dark;
    const J1 = J0 ? "#fff" : S.navy;
    const J2 = J0 ? "#dbe5ef" : S.ink;
    const J3 = S.green;
    const J4 = !!M;
    const J5 = T.loSize === "equal";
    const J6 = J4 ? J5 ? H * 0.5 : H * 0.58 : H;
    const J7 = Math.min(C * 0.44, 0.62);
    B.head(q, N.headshot, G + J7, X + C / 2, J7, {
      ring: 0.035,
      ringColor: S.green,
      name: T.agentName
    });
    let J8 = G + J7 * 2 + 0.2;
    const J9 = J6 - (J8 - G) - 0.15;
    R(q, I.agentLabel || A(T).hosted, J8, X + C / 2 - J7 * 0.62, {
      size: 0.085,
      weight: 700,
      color: J3,
      track: 0.12,
      maxW: J9
    });
    R(q, T.agentName, J8, X + C / 2 - J7 * 0.2, {
      size: 0.24,
      weight: 800,
      color: J1,
      maxW: J9
    });
    R(q, v(T.agentTitle) + (T.bilingual ? "  •  SE HABLA ESPAÑOL" : ""), J8, X + C / 2 + J7 * 0.12, {
      size: 0.085,
      weight: 700,
      color: J0 ? S.soft : S.gray,
      track: 0.1,
      maxW: J9
    });
    R(q, T.phone, J8, X + C / 2 + J7 * 0.5, {
      size: 0.15,
      weight: 800,
      color: J1,
      maxW: J9
    });
    R(q, T.email, J8, X + C / 2 + J7 * 0.78, {
      size: 0.11,
      weight: 600,
      fam: D,
      color: J2,
      maxW: J9
    });
    if (J4) {
      const JJ = G + J6 + 0.1;
      B.rect(q, JJ - 0.05, X + C * 0.12, 0.012, C * 0.76, J0 ? "rgba(255,255,255,0.25)" : S.line);
      const JB = J5 ? J7 : J7 * 0.78;
      const JS = JJ + 0.18 + JB;
      const JD = N.lo && N.lo[M.id];
      B.head(q, JD, JS, X + C / 2, JB, {
        ring: 0.025,
        ringColor: J0 ? "#fff" : S.navy,
        name: M.name
      });
      const Jh = JS + JB + 0.18;
      const JR = G + H - Jh;
      R(q, A(T).financing, Jh, X + C / 2 - JB * 0.72, {
        size: 0.072,
        weight: 700,
        color: J3,
        track: 0.1,
        maxW: JR
      });
      R(q, M.name, Jh, X + C / 2 - JB * 0.28, {
        size: J5 ? 0.2 : 0.17,
        weight: 800,
        color: J1,
        maxW: JR
      });
      R(q, M.title + "  |  NMLS #" + M.nmls, Jh, X + C / 2 + JB * 0.08, {
        size: 0.08,
        weight: 600,
        fam: D,
        color: J0 ? S.soft : S.gray,
        maxW: JR
      });
      R(q, M.phone, Jh, X + C / 2 + JB * 0.45, {
        size: J5 ? 0.14 : 0.12,
        weight: 800,
        color: J1,
        maxW: JR
      });
      B.logo(q, J0 ? N.mortRev : N.mortColor, Jh, X + C / 2 + JB * 0.6, {
        h: Math.min(0.46, JB * 0.8),
        maxW: JR
      });
    }
  }
  function j(q, T, x, N, G, X, H) {
    let C = H || 0.068;
    const I = B.reFine(T, T.lang) + (T.lo && T.lo.id !== "none" ? " " + B.loFine(T.lo, T.lang) : "");
    const M = 10.8 - (N - C);
    let J0;
    let J1;
    while (J1 = C * 1.6, J0 = B.wrapLines(q, I, {
      size: C,
      weight: 400,
      fam: D
    }, G - J1 - 0.1), !(J0.length * C * 1.3 <= M) && !(C <= 0.045)) {
      C *= 0.95;
    }
    B.eho(q, x, N - C * 0.9, J1, X);
    J0.forEach((J2, J3) => R(q, J2, x + J1 + 0.1, N + J3 * C * 1.3, {
      size: C,
      weight: 400,
      fam: D,
      color: X
    }));
    return J0.length * C * 1.3;
  }
  function O(q, T, x, N, G, X) {
    R(q, T.address, x, N, {
      size: X.size || 0.34,
      weight: 800,
      color: X.color,
      maxW: G,
      align: X.align
    });
    R(q, T.city, x, N + (X.size || 0.34) * 0.75, {
      size: (X.size || 0.34) * 0.5,
      weight: 400,
      fam: D,
      color: X.sub,
      maxW: G,
      align: X.align
    });
  }
  function W(q) {
    return [q.ohDate, q.ohTime].filter(Boolean);
  }
  const k = q => q.lo && q.lo.id !== "none";
  const E = [{
    id: "magazine",
    name: "Magazine Cover",
    note: "Full bleed hero photo with a cover headline. Most requested style.",
    feature: false,
    draw(T, N, G, X) {
      B.bleedRect(T, N, 0, 0, Y, L, "#fff");
      const H = 6.4;
      B.photo(T, G.photos[0], -0.125, -0.125, 8.75, 6.525, A(G).addPhoto);
      T.fillStyle = B.grad(T, 0, H - 2.6, 0, H, [[0, "rgba(0,26,54,0)"], [1, "rgba(0,26,54,0.88)"]]);
      T.fillRect(-0.125, H - 2.6, 8.75, 2.6);
      T.fillStyle = B.grad(T, 0, -0.125, 0, 1.3, [[0, "rgba(0,26,54,0.55)"], [1, "rgba(0,26,54,0)"]]);
      T.fillRect(-0.125, -0.125, 8.75, 1.43);
      B.logo(T, X.lockupHRev, Z, 0.35, {
        h: 0.5
      });
      const [C, I] = K(G);
      const M = R(T, C, Z, H - 0.85, {
        size: 0.95,
        weight: 900,
        color: "#fff",
        maxW: 7.3
      });
      B.dot(T, Z + M.w + 0.12, 5.48, 0.09, S.green);
      if (I) {
        R(T, I, 0.48, 5.98, {
          size: 0.26,
          weight: 800,
          color: S.green,
          track: 0.12
        });
      }
      const J0 = W(G);
      if (J0.length) {
        const J3 = Math.max(B.textW(T, J0[0], {
          size: 0.22,
          weight: 800
        }), B.textW(T, J0[1] || "", {
          size: 0.2,
          weight: 700
        })) + 0.5;
        B.rrect(T, Y - Z - J3, 0.3, J3, 0.92, 0.08, S.green);
        R(T, J0[0], Y - Z - J3 / 2, 0.69, {
          size: 0.22,
          weight: 800,
          color: S.navyDeep,
          align: "center",
          maxW: J3 - 0.3
        });
        if (J0[1]) {
          R(T, J0[1], Y - Z - J3 / 2, 1, {
            size: 0.2,
            weight: 700,
            color: S.navyDeep,
            align: "center",
            maxW: J3 - 0.3
          });
        }
      }
      let J1 = H + 0.62;
      O(T, G, Z, J1, 5.2, {
        color: S.navy,
        sub: S.gray
      });
      if (G.price) {
        R(T, G.price, Y - Z, J1, {
          size: 0.44,
          weight: 900,
          color: S.green,
          align: "right",
          maxW: 2.6
        });
        R(T, v(A(G).offered), Y - Z, J1 + 0.26, {
          size: 0.085,
          weight: 700,
          color: S.gray,
          align: "right",
          track: 0.14
        });
      }
      J1 += 0.62;
      P(T, G, Z, J1, {
        size: 0.24,
        color: S.navy,
        labelColor: S.gray
      });
      const J2 = G.qrOn && G.qrUrl;
      J1 += 0.44;
      F(T, G, Z, J1, J2 ? 5.9 : 7.6, {
        size: 0.15,
        room: 0.64,
        color: S.ink,
        cols: 2
      });
      if (J2) {
        (function (J4, J5, J6, J7, J8, J9) {
          if (!J5.qrOn || !J5.qrUrl) {
            return false;
          }
          J9 = J9 || {};
          B.qr(J4, J5.qrUrl, J6, J7, J8, S.navy, "#fff");
          if (J9.border) {
            B.rrect(J4, J6, J7, J8, J8, 0.03, null, J9.border, 0.015);
          }
          const JJ = A(J5).scan;
          B.para(J4, JJ, 7.575, J7 + J8 + 0.2, 1.15, {
            size: Math.max(0.085, 0.07125),
            weight: 800,
            color: J9.label || S.navy,
            align: "center",
            track: 0.08
          }, 0.125, 2);
        })(T, G, Y - Z - 0.95, 7.42, 0.95);
      }
      B.rect(T, Z, 8.85, 7.6, 0.014, S.gray);
      Q(T, G, X, Z, 9, 7.6, 1.12);
      B.bleedRect(T, N, 0, 10.3, Y, 0.7, S.mist);
      j(T, G, Z, 10.47, 7.6, S.gray);
    }
  }, {
    id: "grid",
    name: "Classic Grid",
    note: "Hero plus three detail photos. Shows the whole home.",
    feature: false,
    draw(q, T, N, G) {
      B.bleedRect(q, T, 0, 0, Y, L, "#fff");
      B.bleedRect(q, T, 0, 0, Y, 1.45, S.navy);
      B.rect(q, -0.125, 1.45, 8.75, 0.06, S.green);
      const [X, H] = K(N);
      const C = R(q, X, Z, 0.92, {
        size: 0.62,
        weight: 900,
        color: "#fff",
        maxW: 4.6
      });
      B.dot(q, Z + C.w + 0.08, 0.87, 0.06, S.green);
      if (H) {
        R(q, H, Z + 0.02, 1.24, {
          size: 0.17,
          weight: 800,
          color: S.green,
          track: 0.12
        });
      }
      const I = W(N);
      if (I[0]) {
        R(q, I[0], Y - Z, 0.72, {
          size: 0.24,
          weight: 800,
          color: "#fff",
          align: "right",
          maxW: 3
        });
      }
      if (I[1]) {
        R(q, I[1], Y - Z, 1.05, {
          size: 0.22,
          weight: 700,
          color: S.green,
          align: "right",
          maxW: 3
        });
      }
      B.photo(q, N.photos[0], -0.125, 1.51, 8.75, 4.3, A(N).addPhoto);
      const M = 7.3 / 3;
      [1, 2, 3].forEach((J1, J2) => B.photo(q, N.photos[J1], Z + J2 * (M + 0.15), 5.95, M, 1.55, ""));
      B.rect(q, Z, 7.6, 7.6, 0.012, S.gray);
      O(q, N, Z, 7.92, 4.6, {
        size: 0.3,
        color: S.navy,
        sub: S.gray
      });
      if (N.price) {
        R(q, N.price, Z + 5, 7.92, {
          size: 0.36,
          weight: 900,
          color: S.green,
          maxW: N.qrOn && N.qrUrl ? 1.5 : 2.5
        });
      }
      P(q, N, Z, 8.4, {
        size: 0.15,
        color: S.navy,
        labelColor: S.gray
      });
      const J0 = N.qrOn && N.qrUrl;
      F(q, N, Z, 8.68, J0 ? 6.2 : 7.4, {
        size: 0.13,
        room: 0.2,
        color: S.ink,
        cols: 2,
        max: 4
      });
      if (J0) {
        B.qr(q, N.qrUrl, Y - Z - 0.95, 7.68, 0.95, S.navy, "#fff");
      }
      Q(q, N, G, Z, 9.02, 7.6, 1.1);
      B.bleedRect(q, T, 0, 10.25, Y, 0.75, S.gray);
      j(q, N, Z, 10.42, 5.3, "#fff", 0.062);
      B.logo(q, G.lockupHRev, Y - Z, 10.38, {
        h: 0.44,
        align: "right"
      });
    }
  }, {
    id: "split",
    name: "Split Panel",
    note: "Photos left, details panel right. Clean and easy to scan.",
    feature: false,
    draw(q, T, N, G) {
      B.bleedRect(q, T, 0, 0, Y, L, S.navy);
      B.photo(q, N.photos[0], -0.125, -0.125, 5.125, 6.3, A(N).addPhoto);
      B.photo(q, N.photos[1], -0.125, 6.25, 2.595, 2.5, "");
      B.photo(q, N.photos[2], 2.53, 6.25, 2.47, 2.5, "");
      B.rect(q, 5, -0.125, 0.06, 8.875, S.green);
      const X = 5.35;
      const H = 2.7;
      const [C, I] = K(N);
      B.logo(q, G.lockupVRev, X + H / 2, 0.4, {
        w: Math.min(1.6, H),
        align: "center"
      });
      let M = 2.55;
      const J0 = C.split(" ");
      J0.forEach((J1, J2) => {
        const J3 = R(q, J1, X, M + J2 * 0.62, {
          size: 0.62,
          weight: 900,
          color: "#fff",
          maxW: H
        });
        if (J2 === J0.length - 1) {
          B.dot(q, X + J3.w + 0.08, M + J2 * 0.62 - 0.05, 0.06, S.green);
        }
      });
      M += J0.length * 0.62;
      if (I) {
        R(q, I, X, M, {
          size: 0.17,
          weight: 800,
          color: S.green,
          track: 0.1,
          maxW: H
        });
        M += 0.2;
      }
      M += 0.25;
      W(N).forEach((J1, J2) => {
        R(q, J1, X, M, {
          size: J2 ? 0.2 : 0.22,
          weight: J2 ? 700 : 800,
          color: J2 ? S.green : "#fff",
          maxW: H
        });
        M += 0.32;
      });
      M += 0.2;
      B.rect(q, X, M - 0.1, H, 0.012, "rgba(255,255,255,0.25)");
      M += 0.3;
      R(q, N.address, X, M, {
        size: 0.21,
        weight: 800,
        color: "#fff",
        maxW: H
      });
      R(q, N.city, X, M + 0.26, {
        size: 0.13,
        weight: 400,
        fam: D,
        color: S.soft,
        maxW: H
      });
      M += 0.75;
      if (N.price) {
        R(q, N.price, X, M, {
          size: 0.36,
          weight: 900,
          color: S.green,
          maxW: H
        });
        M += 0.42;
      }
      V(N).forEach(J1 => {
        R(q, J1[0] + " " + J1[1], X, M, {
          size: 0.15,
          weight: 700,
          color: "#fff"
        });
        M += 0.24;
      });
      if (N.qrOn && N.qrUrl) {
        B.qr(q, N.qrUrl, X, M + 0.05, 0.95, S.navy, "#fff");
        R(q, A(N).scanShort, 6.47, M + 0.55, {
          size: 0.1,
          weight: 800,
          color: S.green,
          track: 0.1
        });
      }
      B.bleedRect(q, T, 0, 8.75, Y, 2.25, "#fff");
      B.rect(q, -0.125, 8.75, 8.75, 0.05, S.gray);
      Q(q, N, G, Z, 9.2, 7.6, 1);
      j(q, N, Z, 10.42, 7.6, S.gray, 0.064);
    }
  }, {
    id: "minimal",
    name: "Minimal Gallery",
    note: "White space and one strong image. The quiet high end look.",
    feature: false,
    draw(q, T, x, N) {
      B.bleedRect(q, T, 0, 0, Y, L, "#fff");
      B.photo(q, x.photos[0], 0.6, 0.6, 7.3, 5, A(x).addPhoto);
      B.rrect(q, 0.5, 0.5, 7.5, 5.2, 0, null, S.gray, 0.012);
      const [G, X] = K(x);
      R(q, G, Y / 2, 6.35, {
        size: 0.42,
        weight: 600,
        color: S.navy,
        align: "center",
        track: 0.3,
        maxW: 7.1
      });
      if (X) {
        R(q, X, Y / 2, 6.62, {
          size: 0.13,
          weight: 700,
          color: S.green,
          align: "center",
          track: 0.3
        });
      }
      B.rect(q, 3.9, 6.8, 0.7, 0.02, S.green);
      R(q, W(x).join("   |   "), Y / 2, 7.14, {
        size: 0.19,
        weight: 700,
        color: S.ink,
        align: "center",
        maxW: 7.1
      });
      R(q, x.address + (x.city ? ", " + x.city : ""), Y / 2, 7.55, {
        size: 0.16,
        weight: 600,
        fam: D,
        color: S.gray,
        align: "center",
        maxW: 7.1
      });
      B.textW(q, V(x).map(H => H.join(" ")).join("     "), {
        size: 0.14,
        weight: 700
      });
      R(q, V(x).map(H => H.join(" ")).join("     ") + (x.price ? "     " + x.price : ""), Y / 2, 7.9, {
        size: 0.14,
        weight: 700,
        color: S.navy,
        align: "center",
        track: 0.06,
        maxW: 7.1
      });
      if (x.qrOn && x.qrUrl) {
        B.qr(q, x.qrUrl, 7.1000000000000005, 8.15, 0.8, S.navy, "#fff");
      }
      Q(q, x, N, 0.6, 8.85, 7.3 - (x.qrOn && x.qrUrl ? 0.95 : 0), 1.05, {});
      B.logo(q, N.lockupH, 0.6, 8.2, {
        h: 0.42
      });
      j(q, x, 0.6, 10.25, 7.3, S.gray, 0.064);
    }
  }, {
    id: "editorial",
    name: "Editorial Luxury",
    note: "Photo first, light tracked type, deep navy base.",
    feature: false,
    draw(q, T, N, G) {
      B.bleedRect(q, T, 0, 0, Y, L, S.navyDeep);
      B.photo(q, N.photos[0], -0.125, -0.125, 8.75, 7.125, A(N).addPhoto);
      q.fillStyle = B.grad(q, 0, -0.125, 0, 2.4, [[0, "rgba(0,26,54,0.75)"], [1, "rgba(0,26,54,0)"]]);
      q.fillRect(-0.125, -0.125, 8.75, 2.5);
      q.fillStyle = B.grad(q, 0, 5.4, 0, 7, [[0, "rgba(0,26,54,0)"], [1, "rgba(0,26,54,1)"]]);
      q.fillRect(-0.125, 5.4, 8.75, 1.62);
      const [X, H] = K(N);
      R(q, X, Y / 2, 1.5, {
        size: 0.5,
        weight: 400,
        color: "#fff",
        align: "center",
        track: 0.42,
        maxW: 7.5
      });
      R(q, H || W(N).join("   •   "), Y / 2, 1.92, {
        size: 0.15,
        weight: 600,
        color: H ? S.green : "#fff",
        align: "center",
        track: 0.2,
        maxW: 7.5
      });
      if (H) {
        R(q, W(N).join("   •   "), Y / 2, 2.25, {
          size: 0.15,
          weight: 600,
          color: "#fff",
          align: "center",
          track: 0.16,
          maxW: 7.5
        });
      }
      let C = 7.35;
      R(q, v(N.address), Y / 2, C, {
        size: 0.26,
        weight: 600,
        color: "#fff",
        align: "center",
        track: 0.16,
        maxW: 7.5
      });
      R(q, N.city, Y / 2, C + 0.3, {
        size: 0.14,
        weight: 400,
        fam: D,
        color: S.soft,
        align: "center"
      });
      C += 0.72;
      const I = [...V(N).map(J0 => [J0[0], v(J0[1])]), ...(N.price ? [[N.price, v(A(N).offered)]] : [])];
      const M = 7.6 / Math.max(1, I.length);
      I.forEach((J0, J1) => {
        const J2 = Z + M * J1 + M / 2;
        R(q, J0[0], J2, C + 0.2, {
          size: 0.3,
          weight: 400,
          color: J1 === I.length - 1 && N.price ? S.green : "#fff",
          align: "center",
          maxW: M - 0.2
        });
        R(q, J0[1], J2, C + 0.45, {
          size: 0.08,
          weight: 700,
          color: S.soft,
          align: "center",
          track: 0.2
        });
        if (J1) {
          B.rect(q, Z + M * J1, C - 0.1, 0.01, 0.6, "rgba(255,255,255,0.25)");
        }
      });
      if (N.qrOn && N.qrUrl) {
        B.qr(q, N.qrUrl, Y - Z - 0.85, 5.95, 0.85, S.navy, "#fff");
      }
      B.logo(q, G.lockupHRev, Y / 2, 0.35, {
        h: 0.46,
        align: "center"
      });
      Q(q, N, G, Z, 9.05, 7.6, 1.05, {
        dark: true
      });
      j(q, N, Z, 10.35, 7.6, "#8ea3b8", 0.064);
    }
  }, {
    id: "bold",
    name: "Bold Headline",
    note: "Readable from across the room. Huge date and time.",
    feature: false,
    draw(q, T, N, G) {
      B.bleedRect(q, T, 0, 0, Y, L, "#fff");
      const [X, H] = K(N);
      const C = X.split(" ");
      R(q, C[0], 0.4, 1.45, {
        size: 1.35,
        weight: 900,
        color: S.navy,
        maxW: 7.6
      });
      const I = R(q, C.slice(1).join(" "), 0.4, 2.6, {
        size: 1.35,
        weight: 900,
        color: S.navy,
        maxW: 7.199999999999999
      });
      B.dot(q, Z + I.w + 0.12, 2.48, 0.13, S.green);
      let M = 3.1;
      if (H) {
        R(q, H, Z, M, {
          size: 0.22,
          weight: 800,
          color: S.green,
          track: 0.12
        });
        M += 0.3;
      }
      B.bleedRect(q, T, 0, M, Y, 0.95, S.green);
      const J0 = W(N);
      R(q, J0.join("   |   "), Y / 2, M + 0.62, {
        size: 0.36,
        weight: 900,
        color: S.navyDeep,
        align: "center",
        maxW: 7.5
      });
      M += 0.95;
      B.photo(q, N.photos[0], -0.125, M, 8.75, 3.7, A(N).addPhoto);
      M += 4.15;
      O(q, N, Z, M, 4.8, {
        size: 0.3,
        color: S.navy,
        sub: S.gray
      });
      if (N.price) {
        R(q, N.price, Y - Z, M, {
          size: 0.4,
          weight: 900,
          color: S.green,
          align: "right",
          maxW: 2.5
        });
      }
      P(q, N, Z, M + 0.52, {
        size: 0.18,
        color: S.navy,
        labelColor: S.gray
      });
      if (N.qrOn && N.qrUrl) {
        B.qr(q, N.qrUrl, Y - Z - 0.8, M + 0.2, 0.8, S.navy, "#fff");
      }
      Q(q, N, G, Z, 9.1, 7.6, 1);
      B.bleedRect(q, T, 0, 10.2, Y, 0.8, S.gray);
      j(q, N, Z, 10.4, 5.3, "#fff", 0.062);
      B.logo(q, G.lockupHRev, Y - Z, 10.37, {
        h: 0.42,
        align: "right"
      });
    }
  }, {
    id: "diagonal",
    name: "Diagonal Brand",
    note: "The iMath poster angle and green stripe. Matches your social posts.",
    feature: false,
    draw(q, T, N, G) {
      B.bleedRect(q, T, 0, 0, Y, L, S.navy);
      B.photo(q, N.photos[0], -0.125, -0.125, 8.75, 6.6, A(N).addPhoto);
      B.poly(q, [[-0.2, 6.2], [8.7, 5.1], [8.7, 11.2], [-0.2, 11.2]], S.navy);
      B.stripe(q, -0.2, 6.05, 8.7, 4.95, 0.07, S.green);
      const [X, H] = K(N);
      const C = R(q, X, Z, 6.95, {
        size: 0.72,
        weight: 900,
        color: "#fff",
        maxW: 7.3
      });
      B.dot(q, Z + C.w + 0.09, 6.89, 0.07, S.green);
      let I = 7.3;
      if (H) {
        R(q, H, Z, I, {
          size: 0.18,
          weight: 800,
          color: S.green,
          track: 0.12
        });
        I += 0.1;
      }
      R(q, W(N).join("   |   "), Z, I + 0.3, {
        size: 0.24,
        weight: 800,
        color: S.green,
        maxW: 7.6
      });
      R(q, N.address + (N.city ? ", " + N.city : ""), Z, I + 0.7, {
        size: 0.19,
        weight: 700,
        fam: D,
        color: "#fff",
        maxW: 5.6
      });
      const M = P(q, N, Z, I + 1.08, {
        size: 0.17,
        color: "#fff",
        labelColor: S.soft
      });
      if (N.price) {
        R(q, N.price, Z + M + 0.45, I + 1.08, {
          size: 0.26,
          weight: 900,
          color: S.green
        });
      }
      if (N.qrOn && N.qrUrl) {
        B.qr(q, N.qrUrl, Y - Z - 0.95, 7.05, 0.95, S.navy, "#fff");
      }
      B.bleedRect(q, T, 0, 8.95, Y, 2.05, "#fff");
      B.rect(q, -0.125, 8.95, 8.75, 0.05, S.green);
      Q(q, N, G, Z, 9.1, 7.6, 1);
      j(q, N, Z, 10.38, 5.3999999999999995, S.gray, 0.062);
      B.logo(q, G.lockupH, Y - Z, 10.26, {
        h: 0.44,
        align: "right"
      });
    }
  }, {
    id: "night",
    name: "Dark Elegance",
    note: "Night navy with a framed photo. Stands out on a counter full of white flyers.",
    feature: false,
    draw(q, T, x, N) {
      B.bleedRect(q, T, 0, 0, Y, L, S.night);
      B.logo(q, N.lockupHRev, Y / 2, 0.4, {
        h: 0.5,
        align: "center"
      });
      B.rect(q, 0.39, 1.24, 7.72, 4.72, "#fff");
      B.photo(q, x.photos[0], Z, 1.3, 7.6, 4.6, A(x).addPhoto);
      const [G, X] = K(x);
      const H = R(q, G, Z, 6.75, {
        size: 0.62,
        weight: 800,
        color: "#fff",
        maxW: 5.2
      });
      B.dot(q, Z + H.w + 0.08, 6.69, 0.06, S.green);
      if (X) {
        R(q, X, Z, 7.05, {
          size: 0.16,
          weight: 800,
          color: S.green,
          track: 0.12
        });
      }
      let C = 7.5;
      W(x).forEach((I, M) => {
        B.icon(q, M ? "clock" : "pin", Z, C - 0.2, 0.22, S.green);
        R(q, I, 0.79, C, {
          size: 0.2,
          weight: 700,
          color: "#fff",
          maxW: 4.6
        });
        C += 0.34;
      });
      R(q, x.address + (x.city ? ", " + x.city : ""), Z, C + 0.06, {
        size: 0.15,
        weight: 600,
        fam: D,
        color: S.soft,
        maxW: 5.2
      });
      P(q, x, Z, C + 0.44, {
        size: 0.16,
        color: "#fff",
        labelColor: S.soft
      });
      if (x.price) {
        R(q, x.price, Y - Z, 6.75, {
          size: 0.42,
          weight: 900,
          color: S.green,
          align: "right",
          maxW: 2.3
        });
      }
      if (x.qrOn && x.qrUrl) {
        B.qr(q, x.qrUrl, Y - Z - 1.05, 7.15, 1.05, S.navy, "#fff");
        R(q, A(x).scanShort, 7.525, 8.42, {
          size: 0.09,
          weight: 800,
          color: S.green,
          align: "center",
          track: 0.12
        });
      }
      B.rect(q, Z, 8.85, 7.6, 0.012, "rgba(255,255,255,0.2)");
      Q(q, x, N, Z, 9, 7.6, 1.05, {
        dark: true
      });
      j(q, x, Z, 10.35, 7.6, "#8ea3b8", 0.064);
    }
  }, {
    id: "spotlight",
    name: "Agent Spotlight",
    note: "Feature yourself. A tall portrait column next to the listing.",
    feature: true,
    draw(T, N, G, X) {
      B.bleedRect(T, N, 0, 0, Y, L, "#fff");
      const H = 2.95;
      const C = 5.55;
      B.bleedRect(T, N, C, 0, H, L, S.navy);
      B.portrait(T, X.headshot, C, -0.125, 3.075, 4.4, {
        name: G.agentName,
        hint: "YOUR PHOTO"
      });
      B.rect(T, C, 4.275, 3.075, 0.06, S.green);
      let I = 4.8;
      const M = 5.85;
      const J0 = H - 0.55;
      R(T, A(G).hosted, M, I, {
        size: 0.09,
        weight: 700,
        color: S.green,
        track: 0.14
      });
      I += 0.36;
      String(G.agentName || "").split(" ").forEach((J6, J7) => {
        R(T, v(J6), M, I, {
          size: 0.34,
          weight: 900,
          color: "#fff",
          maxW: J0
        });
        I += 0.38;
      });
      R(T, v(G.agentTitle), M, I, {
        size: 0.09,
        weight: 700,
        color: S.soft,
        track: 0.12,
        maxW: J0
      });
      I += 0.3;
      if (G.bilingual) {
        R(T, "SE HABLA ESPAÑOL", M, I, {
          size: 0.09,
          weight: 800,
          color: S.green,
          track: 0.12
        });
        I += 0.3;
      }
      R(T, G.phone, M, I + 0.1, {
        size: 0.24,
        weight: 800,
        color: "#fff",
        maxW: J0
      });
      R(T, G.email, M, I + 0.38, {
        size: 0.11,
        weight: 600,
        fam: D,
        color: S.soft,
        maxW: J0
      });
      I += 0.7;
      if (G.bio) {
        I += B.para(T, G.bio, M, I, J0, {
          size: 0.11,
          weight: 400,
          fam: D,
          color: "#dbe5ef"
        }, 0.16, 5) + 0.1;
      }
      B.bleedRect(T, N, C, 8.6, H, L - 8.6, S.gray);
      B.rect(T, C, 8.6, 3.075, 0.04, S.green);
      B.logo(T, X.lockupVRev, 7.025, 9, {
        w: 1.9,
        align: "center"
      });
      const J1 = 4.8;
      const [J2, J3] = K(G);
      const J4 = R(T, J2, Z, 1, {
        size: 0.6,
        weight: 900,
        color: S.navy,
        maxW: J1
      });
      B.dot(T, Z + J4.w + 0.08, 0.95, 0.06, S.green);
      let J5 = 1.32;
      if (J3) {
        R(T, J3, Z, J5, {
          size: 0.16,
          weight: 800,
          color: S.green,
          track: 0.12
        });
        J5 += 0.28;
      }
      R(T, W(G).join("   |   "), Z, J5 + 0.12, {
        size: 0.2,
        weight: 800,
        color: S.green,
        maxW: J1
      });
      B.photo(T, G.photos[0], Z, 1.9, J1, 3.4, A(G).addPhoto);
      B.photo(T, G.photos[1], Z, 5.4, 2.35, 1.6, "");
      B.photo(T, G.photos[2], 2.9, 5.4, 2.35, 1.6, "");
      O(T, G, Z, 7.55, J1, {
        size: 0.26,
        color: S.navy,
        sub: S.gray
      });
      if (G.price) {
        R(T, G.price, Z, 8.3, {
          size: 0.36,
          weight: 900,
          color: S.green,
          maxW: J1
        });
      }
      P(T, G, Z, 8.66, {
        size: 0.15,
        color: S.navy,
        labelColor: S.gray
      });
      F(T, G, Z, 9.05, J1 - (G.qrOn && G.qrUrl ? 1 : 0), {
        size: 0.11,
        // With a loan officer, the headshot block starts near 9.49 in; without one, the footer is at 10.3 in.
        room: k(G) ? 0.35 : 0.9,
        color: S.ink,
        cols: 1,
        max: 3,
        lh: 1.6,
        bullet: S.gray
      });
      if (G.qrOn && G.qrUrl) {
        B.qr(T, G.qrUrl, 4.4, 8.95, 0.85, S.navy, "#fff");
      }
      if (k(G)) {
        const J6 = G.lo;
        const J7 = X.lo && X.lo[J6.id];
        const J8 = 9.72;
        B.head(T, J7, 0.73, J8 + 0.05, 0.28, {
          ring: 0.02,
          ringColor: S.navy,
          name: J6.name
        });
        R(T, A(G).financing, Z + 0.68, J8 - 0.1, {
          size: 0.065,
          weight: 700,
          color: S.green,
          track: 0.1,
          maxW: 4.1
        });
        R(T, J6.name + "  |  NMLS #" + J6.nmls + "  |  " + J6.phone, Z + 0.68, J8 + 0.08, {
          size: 0.1,
          weight: 700,
          color: S.navy,
          maxW: 4.1
        });
        B.logo(T, X.mortColor, Z + 0.68, J8 + 0.15, {
          h: 0.2
        });
      }
      j(T, G, Z, 10.3, J1, S.gray, 0.058);
    }
  }, {
    id: "brand",
    name: "Personal Brand",
    note: "Feature yourself. Big realtor header band, then the home.",
    feature: true,
    draw(T, N, G, X) {
      B.bleedRect(T, N, 0, 0, Y, L, "#fff");
      B.bleedRect(T, N, 0, 0, Y, 2.75, S.navy);
      B.stripe(T, -0.2, 2.8, 8.7, 2.8, 0.06, S.green);
      B.bleedRect(T, N, 0, 2.83, Y, 0.07, S.gray);
      B.head(T, X.headshot, 1.5, 1.42, 1.05, {
        ring: 0.05,
        ringColor: S.green,
        name: G.agentName
      });
      const H = 2.85;
      R(T, A(G).hosted, H, 0.78, {
        size: 0.1,
        weight: 700,
        color: S.green,
        track: 0.14
      });
      const C = R(T, v(G.agentName), H, 1.3, {
        size: 0.5,
        weight: 900,
        color: "#fff",
        maxW: 5
      });
      B.dot(T, H + C.w + 0.07, 1.25, 0.05, S.green);
      R(T, v(G.agentTitle) + (G.bilingual ? "   •   SE HABLA ESPAÑOL" : ""), H, 1.58, {
        size: 0.1,
        weight: 700,
        color: S.soft,
        track: 0.12,
        maxW: 5.2
      });
      R(T, G.phone, H, 2, {
        size: 0.3,
        weight: 800,
        color: "#fff"
      });
      R(T, G.email, H, 2.32, {
        size: 0.13,
        weight: 600,
        fam: D,
        color: S.soft,
        maxW: 5.2
      });
      const [I, M] = K(G);
      let J0 = 3.55;
      const J1 = R(T, I, Z, J0, {
        size: 0.55,
        weight: 900,
        color: S.navy,
        maxW: 5
      });
      B.dot(T, Z + J1.w + 0.07, J0 - 0.05, 0.055, S.green);
      R(T, W(G).join("   |   "), Y - Z, J0 - 0.05, {
        size: 0.2,
        weight: 800,
        color: S.green,
        align: "right",
        maxW: 7.6 - J1.w - 0.4
      });
      if (M) {
        R(T, M, Z, J0 + 0.28, {
          size: 0.15,
          weight: 800,
          color: S.green,
          track: 0.12
        });
      }
      B.photo(T, G.photos[0], Z, 3.95, 7.6, 3.5, A(G).addPhoto);
      J0 = 7.95;
      O(T, G, Z, J0, 4.9, {
        size: 0.28,
        color: S.navy,
        sub: S.gray
      });
      if (G.price) {
        R(T, G.price, Y - Z, J0, {
          size: 0.38,
          weight: 900,
          color: S.green,
          align: "right",
          maxW: 2.4
        });
      }
      P(T, G, Z, J0 + 0.5, {
        size: 0.16,
        color: S.navy,
        labelColor: S.gray,
        sep: S.gray
      });
      F(T, G, Z, J0 + 0.9, 7.6 - (G.qrOn && G.qrUrl ? 1.1 : 0), {
        size: 0.12,
        room: 0.77,
        color: S.ink,
        cols: 2,
        max: 4,
        bullet: S.gray
      });
      if (G.qrOn && G.qrUrl) {
        B.qr(T, G.qrUrl, 7.15, J0 + 0.55, 0.9, S.navy, "#fff");
      }
      B.bleedRect(T, N, 0, 9.75, Y, 1.25, S.mist);
      if (k(G)) {
        const J2 = G.lo;
        const J3 = X.lo && X.lo[J2.id];
        B.head(T, J3, 0.75, 10.1, 0.28, {
          ring: 0.02,
          ringColor: S.navy,
          name: J2.name
        });
        R(T, A(G).financing, 1.17, 9.98, {
          size: 0.065,
          weight: 700,
          color: S.green,
          track: 0.1
        });
        R(T, J2.name + "  |  NMLS #" + J2.nmls + "  |  " + J2.phone, 1.17, 10.17, {
          size: 0.1,
          weight: 700,
          color: S.navy,
          maxW: 4.2
        });
        B.logo(T, X.mortColor, 1.17, 10.23, {
          h: 0.18
        });
      }
      B.logo(T, X.lockupH, Y - Z, 9.88, {
        h: 0.42,
        align: "right"
      });
      j(T, G, Z, 10.6, 7.6, S.gray, 0.056);
    }
  }];
  const U = {
    en: {
      title: "WELCOME",
      sub: "OPEN HOUSE SIGN IN",
      name: "Name",
      phone: "Phone",
      email: "Email",
      agent: "Have an agent?",
      lender: "Pre approved?",
      yn: "Y / N",
      scanTop: "SKIP THE PEN",
      scanBottom: "Scan to sign in",
      consent: q => "By signing in, you agree that " + q + " may contact you about real estate services.",
      consentLO: (q, T) => " " + T + " of Cornerstone First Mortgage may also contact you about financing options if you check \"Pre approved? N\".",
      thanks: "Thank you for visiting!"
    },
    es: {
      title: "BIENVENIDOS",
      sub: "REGISTRO DE CASA ABIERTA",
      name: "Nombre",
      phone: "Teléfono",
      email: "Correo",
      agent: "¿Tiene agente?",
      lender: "¿Preaprobado?",
      yn: "S / N",
      scanTop: "SIN PAPEL",
      scanBottom: "Escanee para registrarse",
      consent: q => "Al registrarse, acepta que " + q + " le contacte sobre servicios de bienes raíces.",
      consentLO: (q, T) => " " + T + " de Cornerstone First Mortgage también podría contactarle sobre opciones de financiamiento si marca \"¿Preaprobado? N\".",
      thanks: "¡Gracias por su visita!"
    }
  };
  J.iMathFlyers = {
    STYLES: E,
    draw: function (q, T, x, N, G) {
      const X = E.find(C => C.id === T) || E[0];
      const H = B.makePage(q, Y, L, G || 300);
      (x = Object.assign({
        photos: [],
        highlights: []
      }, x)).photos = [0, 1, 2, 3].map(C => (x.photos || [])[C] || null);
      X.draw(H.ctx, H, x, N);
      return {
        w: Y,
        h: L
      };
    },
    W: Y,
    H: L,
    SIGNIN: [{
      id: "si_classic",
      name: "Classic Navy",
      note: "Navy header, green stripe, slate gray table header."
    }, {
      id: "si_photo",
      name: "Photo Header",
      note: "Your listing photo across the top."
    }, {
      id: "si_minimal",
      name: "Minimal",
      note: "Clean white. Saves printer ink."
    }],
    signIn: function (T, G, X, H, I) {
      const M = B.makePage(T, Y, L, I || 300);
      const J0 = M.ctx;
      const J1 = (X = Object.assign({
        photos: []
      }, X)).lang || "en";
      const J2 = U[J1 === "es" ? "es" : "en"];
      const J3 = J1 === "both" ? U.es : null;
      B.bleedRect(J0, M, 0, 0, Y, L, "#fff");
      const J4 = 2.45;
      const J5 = G !== "si_minimal";
      if (G === "si_photo") {
        B.photo(J0, (X.photos || [])[0], -0.125, -0.125, 8.75, 2.575, "");
        J0.fillStyle = "rgba(0,26,54,0.72)";
        J0.fillRect(-0.125, -0.125, 8.75, 2.575);
      } else if (J5) {
        B.bleedRect(J0, M, 0, 0, Y, J4, S.navy);
        B.poly(J0, [[6.12, -0.2], [8.7, -0.2], [8.7, J4]], S.navyDeep);
      }
      B.rect(J0, -0.125, J4, 8.75, 0.06, S.green);
      const J6 = J5 ? "#fff" : S.navy;
      const J7 = R(J0, J2.title, Z, 1.02, {
        size: 0.62,
        weight: 900,
        color: J6,
        maxW: 4.6
      });
      B.dot(J0, Z + J7.w + 0.08, 0.97, 0.06, S.green);
      R(J0, J2.sub + (J3 ? "  |  " + J3.sub : ""), Z, 1.35, {
        size: 0.15,
        weight: 800,
        color: S.green,
        track: 0.12,
        maxW: 5.2
      });
      R(J0, [X.address, X.city].filter(Boolean).join(", "), Z, 1.75, {
        size: 0.19,
        weight: 700,
        fam: D,
        color: J6,
        maxW: 5.2
      });
      R(J0, [X.ohDate, X.ohTime].filter(Boolean).join("   |   "), Z, 2.07, {
        size: 0.16,
        weight: 600,
        fam: D,
        color: J5 ? S.soft : S.gray,
        maxW: 5.2
      });
      const J8 = Y - Z - 1.45;
      if (X.siQrOn && X.siQrUrl) {
        B.rrect(J0, J8 - 0.1, 0.24999999999999997, 1.65, 1.65, 0.08, "#fff");
        B.qr(J0, X.siQrUrl, J8, 0.35, 1.45, X.siQrColor || S.navy, "#fff");
        const Ja = X.siQrLabel || J2.scanBottom;
        R(J0, J2.scanTop, 7.325, 2.07, {
          size: 0.1,
          weight: 800,
          color: S.green,
          align: "center",
          track: 0.12
        });
        R(J0, Ja, 7.325, 2.25, {
          size: 0.1,
          weight: 700,
          color: J6,
          align: "center",
          maxW: 2.1
        });
      } else {
        B.logo(J0, J5 ? H.lockupVRev : H.lockupV, Y - Z, 0.45, {
          w: 1.9,
          align: "right"
        });
      }
      const J9 = X.lo && X.lo.id !== "none";
      const JJ = [[J2.name, 1.9], [J2.phone, 1.35], [J2.email, 2.1], [J2.agent, 1.1], [J2.lender, 1.1]];
      const JB = 7.6 / JJ.reduce((JA, Jd) => JA + Jd[1], 0);
      JJ.forEach(JA => JA[1] *= JB);
      const JS = J2.consent(X.agentName || "the listing agent") + (J9 ? J2.consentLO(X.agentName, X.lo.name) : "") + (J3 ? " " + J3.consent(X.agentName || "el agente") + (J9 ? J3.consentLO(X.agentName, X.lo.name) : "") : "");
      const JD = 9.8;
      const Jh = B.wrapLines(J0, JS, {
        size: 0.085,
        weight: 600,
        fam: D
      }, 7.6);
      const JR = 9.66 - Jh.length * 0.12;
      const JY = J4 + 0.35;
      const JL = 0.43;
      const Jr = Math.max(6, Math.floor((JR - 0.1 - JY - 0.52) / JL));
      let JZ = Z;
      const Jt = G === "si_classic" ? S.gray : J5 ? S.navy : S.mist;
      B.rect(J0, Z, JY, 7.6, 0.52, Jt);
      JJ.forEach((JA, Jd) => {
        R(J0, JA[0], JZ + 0.08, JY + (J3 ? 0.22 : 0.32), {
          size: 0.105,
          weight: 800,
          color: J5 ? "#fff" : S.navy,
          maxW: JA[1] - 0.14
        });
        if (J3) {
          R(J0, [J3.name, J3.phone, J3.email, J3.agent, J3.lender][Jd], JZ + 0.08, 3.2, {
            size: 0.085,
            weight: 600,
            color: Jt === S.gray ? "#e3f2e1" : S.green,
            maxW: JA[1] - 0.14
          });
        }
        JZ += JA[1];
      });
      for (let JA = 0; JA < Jr; JA++) {
        const Jd = JY + 0.52 + JA * JL;
        if (JA % 2) {
          B.rect(J0, Z, Jd, 7.6, JL, "#f6f8fb");
        }
        B.rect(J0, Z, Jd + JL - 0.008, 7.6, 0.008, S.line);
        let Jl = Z;
        JJ.forEach((JK, Ju) => {
          if (Ju >= 3) {
            R(J0, J2.yn, Jl + JK[1] / 2, Jd + 0.2838, {
              size: 0.1,
              weight: 600,
              fam: D,
              color: "#9aa6b2",
              align: "center"
            });
          }
          Jl += JK[1];
          if (Ju < JJ.length - 1) {
            B.rect(J0, Jl, Jd, 0.008, JL, S.line);
          }
        });
      }
      Jh.forEach((JK, Ju) => R(J0, JK, Z, JR + 0.1 + Ju * 0.12, {
        size: 0.085,
        weight: 600,
        fam: D,
        color: S.gray
      }));
      B.rect(J0, Z, JD, 7.6, 0.012, S.line);
      B.head(J0, H.headshot, 0.79, 10.32, 0.34, {
        ring: 0.025,
        ringColor: S.green,
        name: X.agentName
      });
      R(J0, X.agentName, 1.28, JD + 0.46, {
        size: 0.17,
        weight: 800,
        color: S.navy,
        maxW: 2.6
      });
      R(J0, [X.phone, X.email].filter(Boolean).join("  |  "), 1.28, 10.48, {
        size: 0.1,
        weight: 600,
        fam: D,
        color: S.ink,
        maxW: 2.8
      });
      if (J9) {
        const JK = 4;
        const Ju = H.lo && H.lo[X.lo.id];
        B.head(J0, Ju, JK + 0.26, 10.32, 0.26, {
          ring: 0.02,
          ringColor: S.navy,
          name: X.lo.name
        });
        R(J0, X.lo.name, JK + 0.62, JD + 0.46, {
          size: 0.12,
          weight: 800,
          color: S.navy,
          maxW: 1.8
        });
        R(J0, "NMLS #" + X.lo.nmls + "  |  " + X.lo.phone, JK + 0.62, JD + 0.64, {
          size: 0.085,
          weight: 600,
          fam: D,
          color: S.gray,
          maxW: 1.9
        });
      }
      B.logo(J0, H.lockupH, Y - Z, 10.05, {
        h: 0.5,
        align: "right",
        maxW: J9 ? 1.9 : 3
      });
      const Jv = "United Real Estate Gallery (Rayson Partners, LLC), FL Lic. CQ1066513. Equal Housing Opportunity." + (J9 ? " " + B.loShort(X.lo) + ". Not a commitment to lend." : "");
      R(J0, Jv, Y / 2, 10.75, {
        size: 0.062,
        weight: 400,
        fam: D,
        color: S.gray,
        align: "center",
        maxW: 7.6
      });
      return {
        w: Y,
        h: L
      };
    }
  };
})(typeof window != "undefined" ? window : globalThis);
