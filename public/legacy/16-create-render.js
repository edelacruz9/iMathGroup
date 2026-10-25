/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (Z) {
  const v = Z.iMathCreate;
  const V = X => String(X == null ? "" : X).replace(/[&<>"]/g, G => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[G]);
  const S = (X, G) => G && G.labels ? V(G.labels[String(X)] ?? X) : v.fmt(X, G && G.format);
  const W = X => String(X || "iM").split(/\s+/).filter(Boolean).map(G => G[0]).slice(0, 2).join("").toUpperCase();
  const Y = (X, G) => (X.images || []).find(k => k.id === G) || null;
  function q(X, G, k, E) {
    const Q = X.ph || {};
    const w = Math.round(k * (Q.size || 100) / 100);
    return "<div class=\"c-ph " + (Q.shape || "circle") + (Q.ring !== false ? " ring" : "") + (G.kind === "lo" ? " lo" : "") + (E ? " " + E : "") + "\" style=\"width:calc(" + w + "px * var(--phk,1));height:calc(" + w + "px * var(--phk,1));" + (G.photo ? "background-image:url('" + G.photo + "')" : "") + ";font-size:calc(" + Math.round(w * 0.36) + "px * var(--phk,1))\">" + (G.photo ? "" : V(W(G.name))) + "</div>";
  }
  function H(X, G, k, E) {
    return "<div class=\"c-person\">" + (G.show !== false ? q(X, G, k) : "") + "<div><small>" + V(E || G.label) + "</small><b>" + V(G.name) + "</b><span>" + V(G.title) + "</span>" + G.lines.slice(0, 3).map(Q => "<span>" + V(Q) + "</span>").join("") + "</div></div>";
  }
  function T(X, G) {
    if (!X || !Z.qrcode) {
      return "";
    }
    try {
      const k = Z.qrcode(0, "M");
      k.addData(X);
      k.make();
      return "<img class=\"c-qr\" src=\"" + k.createDataURL(8, 2) + "\" alt=\"QR code\" style=\"width:" + G + "px;height:" + G + "px\">";
    } catch (E) {
      return "";
    }
  }
  const U = {
    date: "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M3 10h18M8 3v4M16 3v4\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>",
    time: "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\"><circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M12 7v5l3 2\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/></svg>",
    place: "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\"><path d=\"M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\" fill=\"currentColor\"/></svg>",
    price: "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\"><path d=\"M12 3v18M16 7.5c0-1.9-1.8-3-4-3s-4 1.1-4 3 2 2.6 4 3 4 1.2 4 3.2-1.8 3-4 3-4-1.2-4-3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
  };
  function N(X) {
    return [["date", X.date], ["time", X.time], ["place", [X.venue, X.address].filter(Boolean).join(", ")], ["price", X.price]].filter(G => G[1]);
  }
  const J = {
    feed: [1080, 1350],
    story: [1080, 1920],
    square: [1080, 1080]
  };
  const u = (X, G) => {
    const k = G[X.id];
    const E = G[X.id + "Pct"];
    if (!isFinite(k)) {
      return "";
    }
    const Q = X.baseLabel || "the price";
    return v.fmt(k, "currency") + ", which is " + Math.round((E || 0) * 10000) / 100 + "% of " + Q;
  };
  const P = X => "<tr>" + (X.t.columns || []).map(G => "<th>" + V(G.label) + "</th>").join("") + "</tr>" + X.rows.map(G => "<tr>" + G.map((k, E) => "<td class=\"" + (E ? "n" : "") + "\">" + S(k, X.t.columns[E]) + "</td>").join("") + "</tr>").join("");
  Z.iMathCreateR = {
    flyerHTML: function (X, G) {
      const k = X.layout || (X.image ? "hero" : "type");
      const E = Y(G, X.image);
      const Q = N(k === "type" && X.date ? Object.assign({}, X, {
        date: ""
      }) : X);
      const w = X.featuring !== false ? G.people.filter(z => z.show !== false) : [];
      const M = "<div class=\"c-eye\">" + V(X.eyebrow || "") + "</div><h1 class=\"c-h1\">" + V(X.headline || "Your headline") + "</h1>" + (X.subhead ? "<p class=\"c-sub\">" + V(X.subhead) + "</p>" : "");
      const O = Q.length ? "<div class=\"c-det\">" + Q.map(z => "<div><i>" + U[z[0]] + "</i><span>" + V(z[1]) + "</span></div>").join("") + "</div>" : "";
      const K = "" + (X.body ? "<p class=\"c-body\">" + V(X.body) + "</p>" : "") + ((X.bullets || []).filter(Boolean).length ? "<ul class=\"c-ul\">" + X.bullets.filter(Boolean).slice(0, 6).map(z => "<li>" + V(z) + "</li>").join("") + "</ul>" : "");
      const x = w.length && X.featuring ? "<div class=\"c-feat\"><small>" + V(X.featuringLabel || "Featuring") + "</small><div class=\"c-feat-row\">" + w.map(z => "<div class=\"c-fp\">" + q(G, z, 64) + "<div><b>" + V(z.name) + "</b><span>" + V(z.title.split("|")[0]) + "</span></div></div>").join("") + "</div></div>" : "";
      const j = X.cta || X.ctaUrl ? "<div class=\"c-cta\"><div><small>" + V(X.ctaLabel || "Save your spot") + "</small><b>" + V(X.cta || X.ctaUrl) + "</b></div>" + T(X.ctaUrl, 92) + "</div>" : "";
      const B = "<div class=\"c-foot\">" + (z => (z.partners || []).length ? "<div class=\"c-partners\"><small>In partnership with</small>" + z.partners.map(R => "<img src=\"" + R + "\" alt=\"Partner logo\">").join("") + "</div>" : "")(G) + "<div class=\"c-foot-row\">" + G.people.map(z => H(G, x ? Object.assign({}, z, {
        show: false
      }) : z, 44)).join("") + "</div><div class=\"c-fine\">" + G.disclosure + "</div></div>";
      const I = z => "<img class=\"c-lock\" src=\"" + (z ? G.lock.dark : G.lock.light) + "\" alt=\"\">";
      if (k === "split") {
        return "<section class=\"c-page c-flyer lay-split " + G.accent + "\"><div class=\"c-sp-left\"><div class=\"c-stripe\"></div>" + I(true) + M + O + j + "</div><div class=\"c-sp-right\">" + (E ? "<div class=\"c-img\" style=\"background-image:url('" + E.src + "')\"></div>" : "") + "<div class=\"c-sp-body\">" + K + x + "</div>" + B + "</div></section>";
      } else if (k === "type") {
        return "<section class=\"c-page c-flyer lay-type " + G.accent + "\"><div class=\"c-type-top\">" + I(false) + "<div class=\"c-corner\"></div></div><div class=\"c-type-main\">" + (X.date ? "<div class=\"c-bigdate\">" + V(X.date) + "</div>" : "") + M + O + K + x + j + "</div>" + B + "</section>";
      } else {
        return "<section class=\"c-page c-flyer lay-hero " + G.accent + "\"><div class=\"c-hero\">" + (E ? "<div class=\"c-img\" style=\"background-image:url('" + E.src + "')\"></div>" : "<div class=\"c-img none\"></div>") + "<div class=\"c-shade\"></div>" + I(true) + "<div class=\"c-hero-txt\">" + M + "</div></div><div class=\"c-main\">" + O + "<div class=\"c-cols\"><div>" + K + "</div><div>" + x + j + "</div></div></div>" + B + "</section>";
      }
    },
    socialHTML: function (X, G, k) {
      const [E, Q] = J[k];
      const w = Y(G, X.image);
      const m = N(X);
      const M = G.people[0];
      return "<section class=\"c-soc s-" + k + " " + G.accent + "\" style=\"width:" + E + "px;height:" + Q + "px\">" + (w ? "<div class=\"c-img\" style=\"background-image:url('" + w.src + "')\"></div>" : "<div class=\"c-img none\"></div>") + "<div class=\"c-shade\"></div><img class=\"c-lock\" src=\"" + G.lock.dark + "\" alt=\"\"><div class=\"c-soc-txt\"><div class=\"c-eye\">" + V(X.eyebrow || "") + "</div><h1>" + V(X.headline || "") + "</h1>" + (X.subhead && k !== "square" ? "<p>" + V(X.subhead) + "</p>" : "") + (m.length ? "<div class=\"c-sdet\">" + m.slice(0, 3).map(O => "<div><i>" + U[O[0]] + "</i>" + V(O[1]) + "</div>").join("") + "</div>" : "") + (X.cta ? "<div class=\"c-spill\">" + V(X.cta) + "</div>" : "") + "</div>\n      <div class=\"c-soc-foot\">" + (M ? (M.show !== false ? q(G, M, 76) : "") + "<div><b>" + V(M.name) + "</b><span>" + V([M.lines[0], G.people[1] ? "with " + G.people[1].name : ""].filter(Boolean).join("  |  ")) + "</span></div>" : "") + "</div><div class=\"c-soc-fine\">" + G.fineShort + "</div></section>";
    },
    slideHTML: function (X, G, k, E, Q) {
      const w = Y(E, X.image);
      const m = X.layout || "bullets";
      const M = "<div class=\"c-snum\">" + String(G + 1).padStart(2, "0") + "</div>";
      const O = "<div class=\"c-sfoot\"><img src=\"" + E.lock.light + "\" alt=\"\"><span>" + V(Q.title || "") + "</span>" + M + "</div>";
      const K = x => (x || []).filter(Boolean).length ? "<ul class=\"c-sul\">" + x.filter(Boolean).slice(0, 7).map(j => "<li>" + V(j) + "</li>").join("") + "</ul>" : "";
      if (m === "title") {
        return "<section class=\"c-slide sl-title " + E.accent + "\">" + (w ? "<div class=\"c-img\" style=\"background-image:url('" + w.src + "')\"></div><div class=\"c-shade\"></div>" : "") + "<div class=\"c-stripe\"></div><img class=\"c-lock\" src=\"" + E.lock.dark + "\" alt=\"\"><div class=\"c-st-txt\"><div class=\"c-eye\">" + V(X.eyebrow || Q.eyebrow || "") + "</div><h1>" + V(X.title || Q.title || "") + "</h1>" + (X.subtitle ? "<p>" + V(X.subtitle) + "</p>" : "") + "</div><div class=\"c-st-people\">" + E.people.map(x => "<div class=\"c-fp\">" + q(E, x, 72) + "<div><b>" + V(x.name) + "</b><span>" + V(x.title.split("|")[0]) + "</span></div></div>").join("") + "</div><div class=\"c-sfine\">" + E.fineShort + "</div></section>";
      } else if (m === "section") {
        return "<section class=\"c-slide sl-section " + E.accent + "\"><div class=\"c-sec-band\"><span>" + String(X.n || G).padStart(2, "0") + "</span></div><div class=\"c-sec-txt\"><div class=\"c-eye\">" + V(X.eyebrow || "Section") + "</div><h1>" + V(X.title || "") + "</h1>" + (X.subtitle ? "<p>" + V(X.subtitle) + "</p>" : "") + "</div>" + O + "</section>";
      } else if (m === "image") {
        return "<section class=\"c-slide sl-image " + E.accent + "\">" + (w ? "<div class=\"c-img\" style=\"background-image:url('" + w.src + "')\"></div>" : "<div class=\"c-img none\"></div>") + "<div class=\"c-cap\"><h2>" + V(X.title || "") + "</h2>" + (X.subtitle ? "<p>" + V(X.subtitle) + "</p>" : "") + "</div>" + O + "</section>";
      } else if (m === "stats") {
        return "<section class=\"c-slide sl-stats " + E.accent + "\"><h2 class=\"c-sh\">" + V(X.title || "") + "</h2><div class=\"c-stats\">" + (X.stats || []).slice(0, 4).map(x => "<div><b>" + V(x.value) + "</b><span>" + V(x.label) + "</span></div>").join("") + "</div>" + (X.subtitle ? "<p class=\"c-snote\">" + V(X.subtitle) + "</p>" : "") + O + "</section>";
      } else if (m === "quote") {
        return "<section class=\"c-slide sl-quote " + E.accent + "\"><div class=\"c-qmark\">“</div><blockquote>" + V(X.quote || X.title || "") + "</blockquote>" + (X.by ? "<cite>" + V(X.by) + "</cite>" : "") + O + "</section>";
      } else if (m === "two") {
        return "<section class=\"c-slide sl-two " + E.accent + "\"><h2 class=\"c-sh\">" + V(X.title || "") + "</h2><div class=\"c-two\"><div><h3>" + V((X.left || {}).title || "") + "</h3>" + K((X.left || {}).bullets) + "</div><div><h3>" + V((X.right || {}).title || "") + "</h3>" + K((X.right || {}).bullets) + "</div></div>" + O + "</section>";
      } else if (m === "agenda") {
        return "<section class=\"c-slide sl-agenda " + E.accent + "\"><h2 class=\"c-sh\">" + V(X.title || "Agenda") + "</h2><ol class=\"c-agenda\">" + (X.bullets || []).slice(0, 7).map(x => "<li>" + V(x) + "</li>").join("") + "</ol>" + O + "</section>";
      } else if (m === "closing") {
        return "<section class=\"c-slide sl-closing " + E.accent + "\"><div class=\"c-stripe\"></div><img class=\"c-lock\" src=\"" + E.lock.dark + "\" alt=\"\"><h1>" + V(X.title || "Thank you") + "</h1>" + (X.subtitle ? "<p class=\"c-cl-sub\">" + V(X.subtitle) + "</p>" : "") + "<div class=\"c-cl-people\">" + E.people.map(x => "<div class=\"c-fp\">" + q(E, x, 92) + "<div><b>" + V(x.name) + "</b><span>" + V(x.title) + "</span>" + x.lines.slice(0, 2).map(j => "<span>" + V(j) + "</span>").join("") + "</div></div>").join("") + (X.url ? "<div class=\"c-cl-qr\">" + T(X.url, 120) + "<span>" + V(X.url) + "</span></div>" : "") + "</div><div class=\"c-sfine\">" + E.fineShort + "</div></section>";
      } else {
        return "<section class=\"c-slide sl-bullets " + E.accent + (w ? " has-img" : "") + "\"><div class=\"c-sb-txt\"><div class=\"c-eye\">" + V(X.eyebrow || "") + "</div><h2 class=\"c-sh\">" + V(X.title || "") + "</h2>" + (X.subtitle ? "<p class=\"c-snote\">" + V(X.subtitle) + "</p>" : "") + K(X.bullets) + "</div>" + (w ? "<div class=\"c-sb-img\" style=\"background-image:url('" + w.src + "')\"></div>" : "") + O + "</section>";
      }
    },
    pptx: async function (X, G, k) {
      const E = A => Z.iMathTheme && Z.iMathTheme.on ? Z.iMathTheme.mapColor("#" + A.toLowerCase()).slice(1).toUpperCase() : A;
      await k();
      const Q = new Z.PptxGenJS();
      Q.layout = "LAYOUT_WIDE";
      Q.author = G.people[0] ? G.people[0].name : "iMath Group";
      Q.company = "iMath Group";
      Q.title = X.title || "Presentation";
      const w = G.accent === "gray" ? E("62666A") : E("002E5E");
      const M = "Montserrat";
      const O = "Open Sans";
      const K = 13.333;
      const x = 7.5;
      const j = A => new Promise(C => {
        const D = new Image();
        D.onload = () => C([D.naturalWidth, D.naturalHeight]);
        D.onerror = () => C([4, 1]);
        D.src = A;
      });
      const B = await j(G.lock.dark);
      const I = await j(G.lock.light);
      const z = (A, C, D, L, Z0) => {
        const Z1 = C ? B : I;
        A.addImage({
          data: C ? G.lock.dark : G.lock.light,
          x: D,
          y: L,
          h: Z0,
          w: Z0 * Z1[0] / Z1[1]
        });
      };
      const R = (A, C) => {
        z(A, false, 0.45, 6.98, 0.32);
        A.addText(X.title || "", {
          x: 3.3,
          y: 7,
          w: 7,
          h: 0.3,
          fontFace: M,
          fontSize: 9,
          color: E("62666A"),
          bold: true,
          charSpacing: 2
        });
        A.addShape(Q.ShapeType.ellipse, {
          x: 12.483,
          y: 6.95,
          w: 0.38,
          h: 0.38,
          fill: {
            color: w
          }
        });
        A.addText(String(C + 1).padStart(2, "0"), {
          x: 12.483,
          y: 6.95,
          w: 0.38,
          h: 0.38,
          fontFace: M,
          fontSize: 9,
          bold: true,
          color: E("FFFFFF"),
          align: "center",
          valign: "middle"
        });
      };
      const F = A => (A || []).filter(Boolean).slice(0, 7).map(C => ({
        text: C,
        options: {
          bullet: {
            code: "25CF"
          },
          paraSpaceAfter: 8
        }
      }));
      const y = (A, C, D, L, Z0) => {
        if (C.photo) {
          A.addImage({
            data: C.photo,
            x: D,
            y: L,
            w: Z0,
            h: Z0,
            rounding: true
          });
        } else {
          A.addShape(Q.ShapeType.ellipse, {
            x: D,
            y: L,
            w: Z0,
            h: Z0,
            fill: {
              color: w
            }
          });
          A.addText(W(C.name), {
            x: D,
            y: L,
            w: Z0,
            h: Z0,
            fontFace: M,
            bold: true,
            color: E("FFFFFF"),
            align: "center",
            valign: "middle",
            fontSize: Math.round(Z0 * 20)
          });
        }
      };
      for (let A = 0; A < X.slides.length; A++) {
        const C = X.slides[A];
        const D = C.layout || "bullets";
        const L = Q.addSlide();
        const Z0 = Y(G, C.image);
        if (C.notes) {
          L.addNotes(C.notes);
        }
        if (D === "title" || D === "closing") {
          L.background = {
            color: w
          };
          if (Z0 && D === "title") {
            L.addImage({
              data: Z0.src,
              x: 0,
              y: 0,
              w: K,
              h: x,
              sizing: {
                type: "cover",
                w: K,
                h: x
              }
            });
            L.addShape(Q.ShapeType.rect, {
              x: 0,
              y: 0,
              w: K,
              h: x,
              fill: {
                color: E("001A36"),
                transparency: 30
              }
            });
          }
          L.addShape(Q.ShapeType.line, {
            x: K - 3.2,
            y: 0,
            w: 2.2,
            h: x,
            line: {
              color: E("6BC063"),
              width: 3
            }
          });
          z(L, true, 0.7, 0.55, 0.6);
          if (D === "title") {
            L.addText((C.eyebrow || X.eyebrow || "").toUpperCase(), {
              x: 0.7,
              y: 2.3,
              w: 9,
              h: 0.4,
              fontFace: M,
              fontSize: 12,
              bold: true,
              color: E("6BC063"),
              charSpacing: 4
            });
            L.addText(C.title || X.title || "", {
              x: 0.7,
              y: 2.7,
              w: 9.5,
              h: 1.8,
              fontFace: M,
              fontSize: 40,
              bold: true,
              color: E("FFFFFF"),
              valign: "top"
            });
            if (C.subtitle) {
              L.addText(C.subtitle, {
                x: 0.7,
                y: 4.4,
                w: 9,
                h: 0.8,
                fontFace: O,
                fontSize: 16,
                color: E("DBE5EF"),
                valign: "top"
              });
            }
            G.people.forEach((Z2, Z3) => {
              const Z4 = 0.7 + Z3 * 3.6;
              y(L, Z2, Z4, 5.55, 0.8);
              L.addText([{
                text: Z2.name,
                options: {
                  bold: true,
                  fontFace: M,
                  fontSize: 13,
                  color: E("FFFFFF"),
                  breakLine: true
                }
              }, {
                text: Z2.title.split("|")[0].trim(),
                options: {
                  fontFace: O,
                  fontSize: 10,
                  color: E("C9D6E4")
                }
              }], {
                x: Z4 + 0.95,
                y: 5.55,
                w: 2.6,
                h: 0.8,
                valign: "middle"
              });
            });
          } else {
            L.addText(C.title || "Thank you", {
              x: 0.7,
              y: 1.6,
              w: 10,
              h: 1.1,
              fontFace: M,
              fontSize: 40,
              bold: true,
              color: E("FFFFFF")
            });
            if (C.subtitle) {
              L.addText(C.subtitle, {
                x: 0.7,
                y: 2.7,
                w: 9,
                h: 0.6,
                fontFace: O,
                fontSize: 16,
                color: E("DBE5EF")
              });
            }
            G.people.forEach((Z2, Z3) => {
              const Z4 = 0.7 + Z3 * 4.2;
              y(L, Z2, Z4, 3.7, 1.2);
              L.addText([{
                text: Z2.name,
                options: {
                  bold: true,
                  fontFace: M,
                  fontSize: 15,
                  color: E("FFFFFF"),
                  breakLine: true
                }
              }, {
                text: Z2.title,
                options: {
                  fontFace: O,
                  fontSize: 10.5,
                  color: E("C9D6E4"),
                  breakLine: true
                }
              }].concat(Z2.lines.slice(0, 2).map(Z5 => ({
                text: Z5,
                options: {
                  fontFace: O,
                  fontSize: 10.5,
                  color: E("FFFFFF"),
                  breakLine: true
                }
              }))), {
                x: Z4 + 1.4,
                y: 3.6,
                w: 2.8,
                h: 1.5,
                valign: "middle"
              });
            });
          }
          L.addText(G.fineText, {
            x: 0.7,
            y: 6.95,
            w: K - 1.4,
            h: 0.4,
            fontFace: O,
            fontSize: 7.5,
            color: E("C9D6E4")
          });
          continue;
        }
        L.background = {
          color: E("FFFFFF")
        };
        R(L, A);
        if (D === "section") {
          L.addShape(Q.ShapeType.rect, {
            x: 0,
            y: 0,
            w: 4.2,
            h: x,
            fill: {
              color: w
            }
          });
          L.addText(String(C.n || A).padStart(2, "0"), {
            x: 0.6,
            y: 2.6,
            w: 3,
            h: 1.6,
            fontFace: M,
            fontSize: 80,
            bold: true,
            color: E("6BC063")
          });
          L.addText((C.eyebrow || "Section").toUpperCase(), {
            x: 4.8,
            y: 2.6,
            w: 7,
            h: 0.4,
            fontFace: M,
            fontSize: 12,
            bold: true,
            color: E("3F8F39"),
            charSpacing: 4
          });
          L.addText(C.title || "", {
            x: 4.8,
            y: 3,
            w: 7.8,
            h: 1.4,
            fontFace: M,
            fontSize: 36,
            bold: true,
            color: w,
            valign: "top"
          });
          continue;
        }
        if (D === "image") {
          if (Z0) {
            L.addImage({
              data: Z0.src,
              x: 0,
              y: 0,
              w: K,
              h: 6.7,
              sizing: {
                type: "cover",
                w: K,
                h: 6.7
              }
            });
          }
          L.addShape(Q.ShapeType.rect, {
            x: 0.6,
            y: 5.1,
            w: 8,
            h: 1.3,
            fill: {
              color: w,
              transparency: 8
            }
          });
          L.addText([{
            text: C.title || "",
            options: {
              fontFace: M,
              fontSize: 24,
              bold: true,
              color: E("FFFFFF"),
              breakLine: true
            }
          }, {
            text: C.subtitle || "",
            options: {
              fontFace: O,
              fontSize: 13,
              color: E("DBE5EF")
            }
          }], {
            x: 0.85,
            y: 5.15,
            w: 7.6,
            h: 1.2,
            valign: "middle"
          });
          continue;
        }
        L.addText(C.title || "", {
          x: 0.7,
          y: 0.55,
          w: 11.5,
          h: 0.9,
          fontFace: M,
          fontSize: 28,
          bold: true,
          color: w
        });
        L.addShape(Q.ShapeType.rect, {
          x: 0.7,
          y: 1.45,
          w: 0.9,
          h: 0.07,
          fill: {
            color: E("6BC063")
          }
        });
        if (D === "stats") {
          const Z2 = (C.stats || []).slice(0, 4);
          const Z3 = (K - 1.4 - (Z2.length - 1) * 0.3) / Math.max(1, Z2.length);
          Z2.forEach((Z4, Z5) => {
            const Z6 = 0.7 + Z5 * (Z3 + 0.3);
            L.addShape(Q.ShapeType.roundRect, {
              x: Z6,
              y: 2.2,
              w: Z3,
              h: 2.6,
              fill: {
                color: E("F2F5F9")
              },
              rectRadius: 0.1
            });
            L.addText(String(Z4.value), {
              x: Z6 + 0.2,
              y: 2.5,
              w: Z3 - 0.4,
              h: 1.2,
              fontFace: M,
              fontSize: 40,
              bold: true,
              color: w
            });
            L.addText(Z4.label || "", {
              x: Z6 + 0.2,
              y: 3.7,
              w: Z3 - 0.4,
              h: 0.9,
              fontFace: O,
              fontSize: 13,
              color: E("5D6873"),
              valign: "top"
            });
          });
          if (C.subtitle) {
            L.addText(C.subtitle, {
              x: 0.7,
              y: 5.3,
              w: 11.5,
              h: 0.8,
              fontFace: O,
              fontSize: 13,
              color: E("5D6873")
            });
          }
          continue;
        }
        if (D === "quote") {
          L.addText("“" + (C.quote || "") + "”", {
            x: 1.2,
            y: 1.9,
            w: 10.8,
            h: 3,
            fontFace: M,
            fontSize: 28,
            bold: true,
            color: w,
            valign: "middle"
          });
          if (C.by) {
            L.addText(C.by, {
              x: 1.2,
              y: 5,
              w: 10,
              h: 0.5,
              fontFace: O,
              fontSize: 14,
              color: E("3F8F39"),
              bold: true
            });
          }
          continue;
        }
        if (D === "two") {
          [[C.left, 0.7], [C.right, 6.9]].forEach(([Z4, Z5]) => {
            Z4 = Z4 || {};
            L.addText(Z4.title || "", {
              x: Z5,
              y: 1.8,
              w: 5.6,
              h: 0.5,
              fontFace: M,
              fontSize: 16,
              bold: true,
              color: E("3F8F39")
            });
            L.addText(F(Z4.bullets), {
              x: Z5,
              y: 2.4,
              w: 5.6,
              h: 3.8,
              fontFace: O,
              fontSize: 15,
              color: E("1A2B3D"),
              valign: "top"
            });
          });
          continue;
        }
        if (D === "agenda") {
          L.addText((C.bullets || []).slice(0, 7).map((Z4, Z5) => ({
            text: String(Z5 + 1).padStart(2, "0") + "   " + Z4,
            options: {
              breakLine: true,
              paraSpaceAfter: 10
            }
          })), {
            x: 0.9,
            y: 1.9,
            w: 11,
            h: 4.6,
            fontFace: M,
            fontSize: 18,
            color: w,
            valign: "top"
          });
          continue;
        }
        const Z1 = Z0 ? 6.8 : 11.5;
        if (C.subtitle) {
          L.addText(C.subtitle, {
            x: 0.7,
            y: 1.7,
            w: Z1,
            h: 0.7,
            fontFace: O,
            fontSize: 14,
            color: E("5D6873")
          });
        }
        L.addText(F(C.bullets), {
          x: 0.7,
          y: C.subtitle ? 2.4 : 1.9,
          w: Z1,
          h: 4.2,
          fontFace: O,
          fontSize: 17,
          color: E("1A2B3D"),
          valign: "top"
        });
        if (Z0) {
          L.addImage({
            data: Z0.src,
            x: 7.9,
            y: 1.1,
            w: 4.8,
            h: 5.4,
            sizing: {
              type: "cover",
              w: 4.8,
              h: 5.4
            },
            rounding: false
          });
        }
      }
      return Q.write({
        outputType: "blob"
      });
    },
    toolHTML: function (X, G, k, E) {
      E = E || {};
      const Q = v.compute(X, k);
      const w = v.fmt;
      const m = (X.outputs || []).filter(O => O.highlight);
      const M = (X.outputs || []).filter(O => !O.highlight && !O.hidden);
      return "<div class=\"c-tool " + G.accent + "\"><div class=\"c-thead\"><img src=\"" + G.lock.dark + "\" alt=\"\"><div><h2>" + V(X.name || "Calculator") + "</h2>" + (X.subtitle ? "<p>" + V(X.subtitle) + "</p>" : "") + "</div></div>\n      <div class=\"c-tbody\"><div class=\"c-tinputs\">" + (X.inputs || []).map(O => {
        const K = k && k[O.id] != null ? k[O.id] : O.default;
        if (O.type === "select") {
          return "<label class=\"c-tin\"><span>" + V(O.label) + "</span><select data-id=\"" + O.id + "\">" + (O.options || []).map(j => "<option value=\"" + V(j.value) + "\"" + (String(j.value) === String(K) ? " selected" : "") + ">" + V(j.label) + "</option>").join("") + "</select>" + (O.help ? "<em>" + V(O.help) + "</em>" : "") + "</label>";
        }
        if (O.type === "month") {
          const j = /^\d{4}-\d{2}$/.test(String(K)) ? K : (() => {
            const B = v.monthSerial("");
            return Math.floor(B / 12) + "-" + String(B % 12 + 1).padStart(2, "0");
          })();
          return "<label class=\"c-tin\"><span>" + V(O.label) + "</span><div class=\"c-tbox\"><input type=\"month\" data-id=\"" + O.id + "\" data-str=\"1\" value=\"" + V(j) + "\"></div>" + (O.help ? "<em>" + V(O.help) + "</em>" : "") + "</label>";
        }
        if (O.type === "amountpct") {
          const B = k && k[O.id + "__mode"] || O.mode || "pct";
          return "<label class=\"c-tin\"><span>" + V(O.label) + "</span><div class=\"c-tbox c-tsw-box " + B + "\"><b class=\"c-pre\">$</b><input type=\"number\" inputmode=\"decimal\" data-id=\"" + O.id + "\" value=\"" + V(K) + "\" step=\"any\" min=\"0\"><b class=\"c-post\">%</b><span class=\"c-tsw\" role=\"group\" aria-label=\"Enter as dollars or percent\"><button type=\"button\" data-sw=\"" + O.id + "\" data-m=\"amt\" aria-pressed=\"" + (B === "amt") + "\" title=\"Enter a dollar amount\">$</button><button type=\"button\" data-sw=\"" + O.id + "\" data-m=\"pct\" aria-pressed=\"" + (B === "pct") + "\" title=\"Enter a percent of the " + V(((X.inputs || []).find(I => I.id === O.base) || {}).label || "price").toLowerCase() + "\">%</button></span></div><input type=\"hidden\" data-id=\"" + O.id + "__mode\" data-str=\"1\" value=\"" + B + "\"><em data-hint=\"" + O.id + "\">" + V(u(O, Q.scope)) + "</em></label>";
        }
        const x = O.type === "currency" ? "$" : O.type === "percent" ? "%" : O.type === "years" ? "yrs" : "";
        return "<label class=\"c-tin\"><span>" + V(O.label) + "</span><div class=\"c-tbox" + (O.type === "currency" ? " pre" : x ? " post" : "") + "\">" + (O.type === "currency" ? "<b>$</b>" : "") + "<input type=\"number\" inputmode=\"decimal\" data-id=\"" + O.id + "\" value=\"" + V(K) + "\"" + (O.min != null ? " min=\"" + O.min + "\"" : "") + (O.max != null ? " max=\"" + O.max + "\"" : "") + " step=\"" + (O.step || "any") + "\">" + (x && O.type !== "currency" ? "<b>" + x + "</b>" : "") + "</div>" + (O.help ? "<em>" + V(O.help) + "</em>" : "") + "</label>";
      }).join("") + "</div><div class=\"c-touts\"><div class=\"c-thi\">" + (m.length ? m : M.slice(0, 2)).map(O => "<div class=\"c-tile\"><small>" + V(O.label) + "</small><b data-out=\"" + O.id + "\">" + w(Q.out[O.id], O.format) + "</b>" + (O.help ? "<span>" + V(O.help) + "</span>" : "") + "</div>").join("") + "</div>\n      " + function (O, K, x) {
        const j = v.fmt;
        const B = K.length ? O : O.slice(2);
        if (!B.length) {
          return "";
        }
        const I = [];
        B.forEach(g => {
          const z = g.group || "";
          let f = I.find(R => R.g === z);
          if (!f) {
            I.push(f = {
              g: z,
              items: []
            });
          }
          f.items.push(g);
        });
        return "<div class=\"c-tgroups" + (I.length > 1 ? " two" : "") + "\">" + I.map(g => "<div>" + (g.g ? "<h4 class=\"c-tgh\">" + V(g.g) + "</h4>" : "") + "<table class=\"c-tt\">" + g.items.map(z => "<tr><td>" + V(z.label) + "</td><td class=\"n\" data-out=\"" + z.id + "\">" + j(x.out[z.id], z.format) + "</td></tr>").join("") + "</table></div>").join("") + "</div>";
      }(M, m, Q) + "</div></div>\n      " + function (O) {
        let K = "";
        let x = 0;
        while (x < O.tables.length) {
          const j = O.tables[x];
          if (j.t.tab) {
            const B = [];
            let I = x;
            while (I < O.tables.length && O.tables[I].t.tab && (O.tables[I].t.group || "") === (j.t.group || "")) {
              B.push(I);
              I++;
            }
            K += "<div class=\"c-ttable\"><h3>" + V(j.t.group || j.t.title || "") + "</h3><div class=\"c-ttabs\" role=\"tablist\">" + B.map((g, z) => "<button type=\"button\" role=\"tab\" data-ttab=\"" + g + "\" aria-selected=\"" + (z === 0) + "\">" + V(O.tables[g].t.tab) + "</button>").join("") + "</div>" + B.map((g, z) => "<div class=\"c-tscroll" + (O.tables[g].rows.length > 16 ? " tall" : "") + "\" data-tpanel=\"" + g + "\"" + (z ? " hidden" : "") + ">" + (O.tables[g].t.note ? "<p class=\"c-tnote\">" + V(O.tables[g].t.note) + "</p>" : "") + "<table class=\"c-tt wide\" data-table=\"" + g + "\">" + P(O.tables[g]) + "</table></div>").join("") + "</div>";
            x = I;
            continue;
          }
          K += "<div class=\"c-ttable\"><h3>" + V(j.t.title || "") + "</h3><div class=\"c-tscroll" + (j.rows.length > 16 ? " tall" : "") + "\"><table class=\"c-tt wide\" data-table=\"" + x + "\">" + P(j) + "</table></div></div>";
          x++;
        }
        return K;
      }(Q) + "\n      " + ((X.notes || []).length ? "<ul class=\"c-tnotes\">" + X.notes.map(O => "<li>" + V(O) + "</li>").join("") + "</ul>" : "") + "<p class=\"c-tdisc\">" + V(X.disclaimer || "") + "</p>" + (E.people !== false ? "<div class=\"c-tpeople\">" + G.people.map(O => H(G, O, 48)).join("") + "</div><p class=\"c-tfine\">" + G.disclosure + "</p>" : "") + "</div>";
    },
    toolBind: function (X, G, k, E) {
      const Q = {};
      (G.inputs || []).forEach(m => {
        Q[m.id] = m.default;
        if (m.type === "amountpct") {
          Q[m.id + "__mode"] = m.mode || "pct";
        }
      });
      const w = () => {
        const m = v.compute(G, Q);
        X.querySelectorAll("[data-out]").forEach(M => {
          const O = G.outputs.find(K => K.id === M.dataset.out);
          M.textContent = v.fmt(m.out[M.dataset.out], O && O.format);
          M.classList.toggle("long", M.textContent.length > 14);
        });
        X.querySelectorAll("[data-table]").forEach(M => {
          const O = m.tables[+M.dataset.table];
          if (O) {
            M.innerHTML = P(O);
          }
        });
        X.querySelectorAll("[data-hint]").forEach(M => {
          const O = G.inputs.find(K => K.id === M.dataset.hint);
          if (O) {
            M.textContent = u(O, m.scope);
          }
        });
        if (E) {
          E(Q, m);
        }
      };
      X.querySelectorAll("[data-id]").forEach(m => m.addEventListener("input", () => {
        Q[m.dataset.id] = m.tagName === "SELECT" || m.dataset.str ? m.value : parseFloat(m.value);
        if (/__mode$/.test(m.dataset.id)) {
          m.dataset.id.replace(/__mode$/, "");
          const M = m.parentElement.querySelector(".c-tsw-box");
          if (M) {
            M.classList.toggle("amt", m.value === "amt");
            M.classList.toggle("pct", m.value !== "amt");
            M.querySelectorAll("[data-sw]").forEach(O => O.setAttribute("aria-pressed", String(O.dataset.m === m.value)));
          }
        }
        w();
      }));
      X.querySelectorAll("[data-sw]").forEach(m => m.addEventListener("click", M => {
        M.preventDefault();
        const O = m.dataset.sw;
        const K = m.dataset.m;
        const x = G.inputs.find(z => z.id === O);
        if (!x) {
          return;
        }
        if ((Q[O + "__mode"] || x.mode || "pct") === K) {
          return;
        }
        const j = v.compute(G, Q).scope;
        const B = X.querySelector("[data-id=\"" + O + "\"]");
        const I = X.querySelector("[data-id=\"" + O + "__mode\"]");
        const g = K === "amt" ? Math.round(j[O] || 0) : Math.round((j[O + "Pct"] || 0) * 10000) / 100;
        B.value = g;
        Q[O] = g;
        I.value = K;
        I.dispatchEvent(new Event("input"));
      }));
      X.querySelectorAll("[data-ttab]").forEach(m => m.addEventListener("click", () => {
        const M = m.closest(".c-ttable");
        M.querySelectorAll("[data-ttab]").forEach(O => O.setAttribute("aria-selected", String(O === m)));
        M.querySelectorAll("[data-tpanel]").forEach(O => O.hidden = O.dataset.tpanel !== m.dataset.ttab);
      }));
      w();
      return Q;
    },
    onePagerHTML: function (X, G, k, E) {
      const Q = v.compute(X, k);
      const w = v.fmt;
      const m = (X.outputs || []).filter(K => K.highlight);
      const M = m.length ? m : (X.outputs || []).slice(0, 3);
      const O = (X.outputs || []).filter(K => !M.includes(K) && !K.hidden);
      return "<section class=\"c-page c-one " + G.accent + "\"><div class=\"c-one-head\"><img src=\"" + G.lock.dark + "\" alt=\"\"><div class=\"c-stripe\"></div><div class=\"c-one-t\"><div class=\"c-eye\">" + V(X.category || "Your numbers") + "</div><h1>" + V(X.name || "") + "</h1><p>" + (E ? "Prepared for " + V(E) + " | " : "") + new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }) + "</p></div></div>\n      <div class=\"c-one-body\"><div class=\"c-one-hi\">" + M.map(K => "<div class=\"c-tile\"><small>" + V(K.label) + "</small><b>" + w(Q.out[K.id], K.format) + "</b>" + (K.help ? "<span>" + V(K.help) + "</span>" : "") + "</div>").join("") + "</div>\n      <div class=\"c-one-cols\"><div><h3>Your numbers</h3><table class=\"c-tt\">" + (X.inputs || []).map(K => "<tr><td>" + V(K.label) + "</td><td class=\"n\">" + V((x => v.shown(x, k, Q.scope))(K)) + "</td></tr>").join("") + "</table></div>" + (O.length ? "<div><h3>More results</h3><table class=\"c-tt\">" + O.map(K => "<tr><td>" + V(K.label) + "</td><td class=\"n\">" + w(Q.out[K.id], K.format) + "</td></tr>").join("") + "</table></div>" : "") + "</div>\n      " + Q.tables.slice(0, 1).map(K => "<h3>" + V(K.t.title || "") + "</h3><table class=\"c-tt wide\"><tr>" + (K.t.columns || []).map(x => "<th>" + V(x.label) + "</th>").join("") + "</tr>" + K.rows.slice(0, 12).map(x => "<tr>" + x.map((j, B) => "<td class=\"" + (B ? "n" : "") + "\">" + S(j, K.t.columns[B]) + "</td>").join("") + "</tr>").join("") + "</table>").join("") + "\n      " + ((X.notes || []).length ? "<ul class=\"c-tnotes\">" + X.notes.slice(0, 5).map(K => "<li>" + V(K) + "</li>").join("") + "</ul>" : "") + "</div>\n      <div class=\"c-foot\"><div class=\"c-foot-row\">" + G.people.map(K => H(G, K, 50)).join("") + "</div><p class=\"c-tdisc\">" + V(X.disclaimer || "") + "</p><div class=\"c-fine\">" + G.disclosure + "</div></div></section>";
    },
    drawScene: function X(G, k, E, Q, w, m, M, O, K, x) {
      const j = Q.imgEl;
      const B = 1 + Math.min(1, w / Math.max(0.1, m)) * 0.08;
      const I = X._c ||= document.createElement("canvas");
      I.width = k;
      I.height = E;
      const g = I.getContext("2d");
      if (j) {
        const z = j.naturalWidth || j.width;
        const f = j.naturalHeight || j.height;
        const R = Math.max(k / z, E / f) * B;
        g.drawImage(j, (k - z * R) / 2, (E - f * R) / 2, z * R, f * R);
      } else {
        const F = g.createLinearGradient(0, 0, k, E);
        F.addColorStop(0, M.accent === "gray" ? "#4b4f53" : "#002e5e");
        F.addColorStop(1, "#001a36");
        g.fillStyle = F;
        g.fillRect(0, 0, k, E);
        g.strokeStyle = "#6bc063";
        g.lineWidth = 10;
        g.beginPath();
        g.moveTo(k * 0.72, 0);
        g.lineTo(k * 0.2, E);
        g.stroke();
      }
      Z.iMathSocialX.drawVideoFrame(G, I, {
        W: k,
        H: E,
        t: x + w,
        dur: K,
        profile: M.profileForVideo,
        assets: O,
        opt: {
          header: true,
          footer: true,
          banner: true,
          headshot: true,
          bug: false,
          intro: false,
          outro: Q.outro,
          softness: 0.9,
          style: "navy",
          pos: j ? "lower" : "upper",
          bannerWhen: "all",
          headline: Q.headline,
          subline: Q.subline,
          fine: M.fineShort
        }
      });
    },
    SOC: J,
    esc: V
  };
})(typeof window != "undefined" ? window : globalThis);
