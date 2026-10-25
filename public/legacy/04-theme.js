/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function () {
  const z = "#0a3161";
  const Z = "#b31942";
  const L = "#8c1236";
  const Y = "#061a33";
  const U = "#ffffff";
  const W = {
    "#002e5e": z,
    "#001f40": Y,
    "#001a36": Y,
    "#07182d": Y,
    "#06152a": Y,
    "#0b2340": "#0a2348",
    "#6bc063": Z,
    "#64b35c": Z,
    "#5fb357": Z,
    "#3f8f39": L,
    "#f2f5f9": "#f4efe4"
  };
  const H = {};
  Object.keys(W).forEach(zh => {
    return H[zI = zh, [1, 3, 5].map(zs => parseInt(zI.slice(zs, zs + 2), 16)).join(",")] = W[zh].slice(1).match(/../g).map(zs => parseInt(zs, 16));
    var zI;
  });
  const q = "Not affiliated with or endorsed by the U.S. Department of Veterans Affairs.";
  const B = {
    get(zh) {
      try {
        return JSON.parse(localStorage.getItem(zh));
      } catch (zI) {
        return null;
      }
    },
    set(zh, zI) {
      try {
        localStorage.setItem(zh, JSON.stringify(zI));
      } catch (zs) {}
    }
  };
  let V = B.get("imath_theme") === "patriotic" ? "patriotic" : "standard";
  let K = B.get("imath_theme_tab") || {};
  let Q = null;
  let J = false;
  let X = "social";
  let z0 = null;
  let z1 = null;
  let z2 = null;
  let z3 = null;
  let z4 = null;
  const z5 = [];
  function z6(zh) {
    if (!J || typeof zh != "string") {
      return zh;
    }
    const zI = zh.trim().toLowerCase();
    if (zI[0] === "#") {
      const zs = zI.length === 4 ? "#" + zI[1] + zI[1] + zI[2] + zI[2] + zI[3] + zI[3] : zI.slice(0, 7);
      const zW = W[zs];
      if (zW) {
        return zW + zI.slice(7);
      } else {
        return zh;
      }
    }
    if (zI.startsWith("rgb")) {
      const zr = zI.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
      if (zr) {
        const zu = H[zr[1] + "," + zr[2] + "," + zr[3]];
        if (zu) {
          if (zr[4] != null) {
            return "rgba(" + zu[0] + "," + zu[1] + "," + zu[2] + "," + zr[4] + ")";
          } else {
            return "rgb(" + zu[0] + "," + zu[1] + "," + zu[2] + ")";
          }
        }
      }
    }
    return zh;
  }
  function z7(zh) {
    if (!J || !Array.isArray(zh)) {
      return zh;
    }
    const zI = H[zh.slice(0, 3).join(",")];
    if (zI) {
      return zI.slice();
    } else {
      return zh;
    }
  }
  const z8 = [];
  function z9() {
    z8.forEach(({
      T: zh,
      orig: zI
    }) => Object.keys(zI).forEach(zs => {
      const zW = zI[zs];
      zh[zs] = Array.isArray(zW) ? J ? z7(zW) : zW.slice() : J ? z6(zW) : zW;
    }));
  }
  const zz = zh => (zh /= 255) <= 0.03928 ? zh / 12.92 : Math.pow((zh + 0.055) / 1.055, 2.4);
  const zC = (zh, zI, zs) => zz(zh) * 0.2126 + zz(zI) * 0.7152 + zz(zs) * 0.0722;
  const zZ = (zh, zI) => (Math.max(zh, zI) + 0.05) / (Math.min(zh, zI) + 0.05);
  const zL = zh => [1, 3, 5].map(zI => parseInt(zh.slice(zI, zI + 2), 16));
  const zn = new Set([Z, L, z, Y]);
  function zF() {
    const zh = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
    if (!zh || zh.__imathTheme) {
      return;
    }
    zh.__imathTheme = true;
    ["fillStyle", "strokeStyle", "shadowColor"].forEach(zr => {
      const zu = Object.getOwnPropertyDescriptor(zh, zr);
      if (zu && zu.set) {
        Object.defineProperty(zh, zr, {
          configurable: true,
          enumerable: zu.enumerable,
          get: zu.get,
          set(zT) {
            zu.set.call(this, J ? z6(zT) : zT);
          }
        });
      }
    });
    if (window.CanvasGradient) {
      const zr = CanvasGradient.prototype.addColorStop;
      CanvasGradient.prototype.addColorStop = function (zu, zT) {
        return zr.call(this, zu, J ? z6(zT) : zT);
      };
    }
    Object.getOwnPropertyDescriptor(zh, "fillStyle");
    const zI = (zu, zT) => {
      Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "fillStyle").set.call(zu, zT);
    };
    const zs = zh.fillText;
    zh.fillText = function (zu, zT, zH, zo) {
      if (!J) {
        return zs.apply(this, arguments);
      }
      let zw = zu;
      if (typeof zw == "string" && /^\s*•/.test(zw)) {
        zw = zw.replace("•", "★");
      }
      const zq = this.fillStyle;
      let zM = null;
      if (typeof zq == "string" && zn.has(zq) && this.canvas && this.canvas.width * this.canvas.height < 40000000) {
        try {
          const zm = function (zP, zS, zb, zE, zB) {
            const zV = zP.canvas;
            if (!zV || !zV.width) {
              return null;
            }
            let zi = zP.measureText(String(zS)).width;
            if (zB != null && zi > zB) {
              zi = zB;
            }
            const zK = parseFloat((zP.font.match(/([\d.]+)px/) || [0, 16])[1]);
            const zf = zP.textAlign;
            const zk = zP.textBaseline;
            let zg = zf === "center" ? zb - zi / 2 : zf === "right" || zf === "end" ? zb - zi : zb;
            let zd = zk === "top" || zk === "hanging" ? zE + zK * 0.5 : zk === "middle" ? zE : zk === "bottom" || zk === "ideographic" ? zE - zK * 0.5 : zE - zK * 0.35;
            const zO = zP.getTransform();
            const zv = [];
            for (const C3 of [0.02, 0.5, 0.98]) {
              for (const C4 of [-0.45, 0.45]) {
                const C5 = zg + zi * C3;
                const C6 = zd + zK * C4;
                zv.push([zO.a * C5 + zO.c * C6 + zO.e, zO.b * C5 + zO.d * C6 + zO.f]);
              }
            }
            const zl = zv.map(C7 => Math.round(C7[0]));
            const zR = zv.map(C7 => Math.round(C7[1]));
            const zx = Math.max(0, Math.min(...zl));
            const zQ = Math.max(0, Math.min(...zR));
            const zN = Math.min(zV.width - 1, Math.max(...zl));
            const zJ = Math.min(zV.height - 1, Math.max(...zR));
            if (zN < zx || zJ < zQ) {
              return null;
            }
            const zX = zN - zx + 1;
            const zy = zJ - zQ + 1;
            if (zX * zy > 4000000) {
              return null;
            }
            const zt = zP.getImageData(zx, zQ, zX, zy).data;
            let zA = 0;
            let C0 = 0;
            let C1 = 0;
            let C2 = 0;
            for (let C7 = 0; C7 < zl.length; C7++) {
              const C8 = zl[C7] - zx;
              const C9 = zR[C7] - zQ;
              if (C8 < 0 || C9 < 0 || C8 >= zX || C9 >= zy) {
                continue;
              }
              const Cz = (C9 * zX + C8) * 4;
              if (!(zt[Cz + 3] < 20)) {
                zA += zt[Cz];
                C0 += zt[Cz + 1];
                C1 += zt[Cz + 2];
                C2++;
              }
            }
            if (C2) {
              return [zA / C2, C0 / C2, C1 / C2];
            } else {
              return null;
            }
          }(this, zw, zT, zH, zo);
          if (zm) {
            const zP = zC(...zL(zq));
            const zS = zC(...zm);
            if (zZ(zP, zS) < 3) {
              zM = zS < 0.3 ? U : zq === Z || zq === L ? z : U;
              if (zZ(zC(...zL(zM)), zS) < 3) {
                zM = zS < 0.18 ? U : Y;
              }
            }
          }
        } catch (zb) {}
      }
      if (zM) {
        const zE = zq;
        zI(this, zM);
        const zB = zs.call(this, zw, zT, zH, ...(zo != null ? [zo] : []));
        zI(this, zE);
        return zB;
      }
      if (zw === zu) {
        return zs.apply(this, arguments);
      } else {
        return zs.call(this, zw, zT, zH, ...(zo != null ? [zo] : []));
      }
    };
    const zW = zh.fillRect;
    zh.fillRect = function (zu, zT, zH, zo) {
      if (!J || this.fillStyle !== Z || this.__noRibbon) {
        return zW.apply(this, arguments);
      }
      let zw = null;
      try {
        zw = this.getTransform();
      } catch (zV) {}
      const zq = zw ? Math.hypot(zw.a, zw.b) : 1;
      const zM = zw ? Math.hypot(zw.c, zw.d) : 1;
      const zm = Math.abs(zH * zq);
      const zP = Math.abs(zo * zM);
      const zS = zm >= zP * 10 && zP >= 5 && zP <= 60;
      const zb = zP >= zm * 10 && zm >= 5 && zm <= 60;
      if (zm >= 6 && zP >= 6 && zm <= 64 && zP <= 64 && Math.max(zm, zP) / Math.min(zm, zP) < 1.35 && this.canvas && this.canvas.width >= 500) {
        const zi = zu + zH / 2;
        const zK = zT + zo / 2;
        const zf = Math.max(Math.abs(zH), Math.abs(zo)) * 0.72;
        const zk = zf * 0.42;
        this.save();
        this.beginPath();
        for (let zg = 0; zg < 10; zg++) {
          const zd = -Math.PI / 2 + zg * Math.PI / 5;
          const zO = zg % 2 ? zk : zf;
          this.lineTo(zi + Math.cos(zd) * zO, zK + Math.sin(zd) * zO);
        }
        this.closePath();
        this.fill();
        this.restore();
        return;
      }
      if (!zS && !zb) {
        return zW.apply(this, arguments);
      }
      const zE = this.fillStyle;
      const zB = [Z, U, z];
      for (let zv = 0; zv < 3; zv++) {
        zI(this, zB[zv]);
        if (zS) {
          zW.call(this, zu, zT + zo * zv / 3, zH, zo / 3 + (zv < 2 ? zo * 0.002 : 0));
        } else {
          zW.call(this, zu + zH * zv / 3, zT, zH / 3 + (zv < 2 ? zH * 0.002 : 0), zo);
        }
      }
      zI(this, zE);
    };
  }
  function zY(zh) {
    const zI = String(zh).match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+))?/);
    if (zI) {
      return [+zI[1], +zI[2], +zI[3], zI[4] == null ? 1 : +zI[4]];
    } else {
      return null;
    }
  }
  function zj(zh) {
    if (!J || !zh) {
      return;
    }
    const zI = new Set(["179,25,66", "140,18,54", "10,49,97", "6,26,51"]);
    zh.querySelectorAll("*").forEach(zs => {
      if (!zs.childNodes.length || ![...zs.childNodes].some(zH => zH.nodeType === 3 && zH.textContent.trim())) {
        return;
      }
      const zW = zY(getComputedStyle(zs).color);
      if (!zW || !zI.has(zW.slice(0, 3).join(","))) {
        return;
      }
      const zr = function (zH) {
        for (let zo = zH; zo && zo.nodeType === 1; zo = zo.parentElement) {
          const zw = getComputedStyle(zo);
          if (zw.backgroundImage && zw.backgroundImage !== "none" && /url\(/.test(zw.backgroundImage)) {
            return null;
          }
          const zq = zY(zw.backgroundColor);
          if (zq && zq[3] > 0.5) {
            return zq;
          }
          if (zw.backgroundImage && /gradient/.test(zw.backgroundImage)) {
            const zM = zY(zw.backgroundImage) || (zw.backgroundImage.match(/#[0-9a-f]{6}/i) ? zL(zw.backgroundImage.match(/#[0-9a-f]{6}/i)[0]) : null);
            if (zM) {
              return zM;
            }
          }
        }
        return [255, 255, 255];
      }(zs);
      if (!zr) {
        return;
      }
      const zu = zC(zW[0], zW[1], zW[2]);
      const zT = zC(zr[0], zr[1], zr[2]);
      if (zZ(zu, zT) < 3) {
        zs.style.color = zT < 0.3 ? U : Y;
        zs.dataset.thfix = "1";
      }
    });
  }
  let zD = null;
  let zp = null;
  const zc = new Set();
  const zU = {
    lockupH: "pat_lockupH",
    lockupHRev: "pat_lockupHRev",
    lockupV: "pat_lockupV",
    lockupVRev: "pat_lockupVRev",
    mortColor: "pat_logo",
    mortRev: "pat_logoRev",
    logoColor: "pat_word",
    logoReverse: "pat_wordRev",
    iconColor: "pat_icon",
    iconReverse: "pat_iconRev"
  };
  let za = null;
  function ze(zh) {
    const zI = (K[X] || V) === "patriotic";
    return (zI !== J || !!zh) && !(J = zI, z9(), function () {
      if (!z0 || !z1) {
        return;
      }
      const zs = Q;
      if (!za) {
        za = {};
        Object.keys(zU).forEach(zW => za[zW] = z0[zW]);
      }
      Object.keys(zU).forEach(zW => {
        if (zs) {
          zs[zW] = J ? z2[zW] : z1[zW];
        }
        if (J && z3 && z3[zW]) {
          z0[zW] = z3[zW];
        } else if (!J && za[zW]) {
          z0[zW] = za[zW];
        }
      });
    }(), document.documentElement.classList.toggle("theme-pat", J), J ? (!zD && window.MutationObserver && document.body && (zD = new MutationObserver(zs => {
      if (J) {
        zs.forEach(zW => {
          const zr = zW.target && zW.target.nodeType === 1 ? zW.target : null;
          if (zr && !zr.closest(".theme-bar,.theme-pick,#access")) {
            zc.add(zr);
          }
        });
        clearTimeout(zp);
        zp = setTimeout(() => {
          const zW = [...zc];
          zc.clear();
          zW.forEach(zr => {
            if (document.contains(zr) && zr.offsetParent !== null && zr.querySelectorAll("*").length < 6000) {
              zj(zr);
            }
          });
        }, 120);
      }
    }), zD.observe(document.body, {
      childList: true,
      subtree: true
    })), setTimeout(() => document.querySelectorAll("[data-panel]:not([hidden])").forEach(zj), 200)) : document.querySelectorAll("[data-thfix]").forEach(zs => {
      zs.style.color = "";
      delete zs.dataset.thfix;
    }), z5.forEach(zs => {
      try {
        zs(J);
      } catch (zW) {
        console.error(zW);
      }
    }), 0);
  }
  const zG = {
    install: zF,
    register: function (zh) {
      if (!!zh && !z8.some(zI => zI.T === zh)) {
        z8.push({
          T: zh,
          orig: JSON.parse(JSON.stringify(zh))
        });
        if (J) {
          z9();
        }
      }
      return zh;
    },
    mapColor: z6,
    mapText: function (zh) {
      if (J && zh) {
        return String(zh).replace(/#([0-9a-fA-F]{6})(?=[0-9a-fA-F]{2}\b|\b)/g, zI => W[zI.toLowerCase()] || zI).replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*[\d.]+\s*)?\)/g, (zI, zs, zW, zr, zu) => {
          const zT = H[zs + "," + zW + "," + zr];
          if (zT) {
            if (zu) {
              return "rgba(" + zT.join(",") + zu + ")";
            } else {
              return "rgb(" + zT.join(",") + ")";
            }
          } else {
            return zI;
          }
        });
      } else {
        return zh;
      }
    },
    mapRGB: z7,
    fixDom: zj,
    attach: function (zh, zI) {
      z0 = zh;
      Q = zI;
      Object.keys(zI).forEach(zs => {
        const zW = zI[zs];
        if (typeof zW == "string" && zW.startsWith("data:image/svg+xml;charset=utf-8,")) {
          try {
            zI[zs] = "data:image/svg+xml;base64," + btoa(decodeURIComponent(zW.slice(33)));
          } catch (zr) {}
        }
      });
      z1 = {};
      Object.keys(zU).forEach(zs => z1[zs] = zI[zs]);
      z2 = {};
      Object.keys(zU).forEach(zs => z2[zs] = zI[zU[zs]]);
      z4 = Promise.all(Object.keys(zU).map(zs => new Promise(zW => {
        const zr = new Image();
        zr.onload = () => zW([zs, zr]);
        zr.onerror = () => zW([zs, null]);
        zr.src = z2[zs];
      }))).then(zs => {
        z3 = {};
        zs.forEach(([zW, zr]) => {
          if (zr) {
            z3[zW] = zr;
          }
        });
      });
      return z4;
    },
    VA: q,
    get on() {
      return J;
    },
    get name() {
      if (J) {
        return "patriotic";
      } else {
        return "standard";
      }
    },
    get global() {
      return V;
    },
    tabSetting: zh => K[zh] || "",
    std: zh => z1 && z1[zh] || (Q || {})[zh],
    ready: () => z4 || Promise.resolve(),
    va: zh => J && zh !== false ? " " + q : "",
    setGlobal: zh => {
      V = zh === "patriotic" ? "patriotic" : "standard";
      B.set("imath_theme", V);
      return ze();
    },
    setTab: (zh, zI) => {
      if (zI === "standard" || zI === "patriotic") {
        K[zh] = zI;
      } else {
        delete K[zh];
      }
      B.set("imath_theme_tab", K);
      return ze();
    },
    forTab: zh => {
      X = zh;
      return ze();
    },
    refresh: () => ze(true),
    onChange: zh => z5.push(zh),
    TABS: ["social", "cards", "flyers", "signs", "email", "cma", "docs", "tools", "video", "fun"],
    palette: () => J ? [["Old Glory Blue", "#0A3161", "Dominant. Backgrounds, headlines, logo outline. About 60 percent."], ["Old Glory Red", "#B31942", "Accent only. Eyebrows, stars, bands, highlights. Replaces brand green. About 10 percent."], ["White", "#FFFFFF", "Space and stripes. About 30 percent with parchment."], ["Deep Navy", "#061A33", "Dark backgrounds and night fields."], ["Parchment", "#F4EFE4", "Warm light background with a heritage feel."], ["Honor Gold", "#C2A35A", "Rare. Medal like details on formal pieces only, under 5 percent."]] : null,
    headlines: [["You served our country. Now let us serve you.", "Usted sirvió a nuestro país. Ahora permítanos servirle a usted."], ["The home loan benefit you earned, explained clearly.", "El beneficio hipotecario que usted se ganó, explicado con claridad."], ["Thank you for your service.", "Gracias por su servicio."], ["PROUDLY SERVING THOSE WHO SERVED", "ORGULLOSOS DE SERVIR A QUIENES SIRVIERON"], ["Put the home loan benefit you earned to work, with a team that guides you from application to closing.", ""], ["Help understanding your eligibility. Guidance from application to closing. Se habla español.", ""]]
  };
  window.iMathTheme = zG;
  zF();
})();
