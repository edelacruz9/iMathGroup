/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (J) {
  const V = J.iMathPrint;
  const A = V.C;
  V.HF;
  const I = V.BF;
  const O = V.text;
  const P = Je => String(Je || "").toUpperCase();
  function X(Je) {
    const Jl = String(Je || "Your Name").trim().split(/\s+/);
    if (Jl.length < 2) {
      return [Jl[0], ""];
    } else {
      return [Jl.slice(0, -1).join(" "), Jl[Jl.length - 1]];
    }
  }
  function T(Je, Jl, JV, JS, JA, Jc, JI) {
    const JO = 0.064;
    const JP = "FL Lic. CQ1066513  |  " + (JI === "es" ? "Igualdad de oportunidades en la vivienda" : "Equal Housing Opportunity");
    const JX = V.textW(Je, JP, {
      size: JO,
      weight: 400,
      fam: I
    });
    const Jo = Jc === "right" ? JV - JX - JO * 1.7 : Jc === "center" ? JV - (JX + JO * 1.7) / 2 : JV;
    O(Je, JP, Jo, JS, {
      size: JO,
      weight: 400,
      fam: I,
      color: JA
    });
    V.eho(Je, Jo + JX + 0.032, JS - JO * 1.05, JO * 1.2, JA);
  }
  const U = (Je, Jl, JV) => Math.max(Jl, Math.min(JV, Je));
  function F(Je, Jl, JV) {
    if (!Je.cardPhoto) {
      return null;
    }
    const JS = V.SAFE + 0.02;
    const JA = Math.min(Jl.H - JS, JV.maxBottom ?? 99);
    const Jc = Math.min(Jl.W - JS, JV.maxX ?? 99);
    const JI = Math.min(JV.r * (JP => Math.max(0.6, Math.min(1.4, +JP.cardPhotoScale || 1)))(Je), (JA - JS) / 2.16 - 0.01, JV.minX == null ? (Jc - JS) / 2.16 - 0.01 : 99);
    const JO = JI * 1.08;
    return {
      cx: U(JV.cx + (+Je.cardPhotoDX || 0), Math.max(JS + JO, JV.minX ?? -9), Math.min(Jl.W - JS - JO, JV.maxX != null ? JV.maxX - JO : 99)),
      cy: U(JV.cy + (+Je.cardPhotoDY || 0), JS + JO, Math.min(Jl.H - JS - JO, JV.maxBottom != null ? JV.maxBottom - JO : 99)),
      r: JI
    };
  }
  function Z(Je, Jl, JV, JS, JA) {
    if (Jl) {
      V.head(Je, JV.headshot, Jl.cx, Jl.cy, Jl.r, {
        ring: Math.max(0.018, Jl.r * 0.07),
        ringColor: JA || A.green,
        name: JS.agentName
      });
    }
  }
  const G = Je => Je.mode === "lo";
  const Q = Je => Je.loColor === "navy";
  const j = Je => Q(Je) ? A.navy : A.gray;
  const q = Je => Q(Je) ? A.gray : A.navy;
  const K = 587 / 1289;
  function D(Je, Jl) {
    if (G(Je)) {
      return P(Je.agentTitle || "Loan Officer") + "  |  NMLS #" + (Je.nmls || "");
    } else {
      return P(Je.agentTitle) + (Jl && Je.bilingual ? Jl : "");
    }
  }
  function B(Je) {
    if (Je.qrLabel) {
      return P(Je.qrLabel);
    } else if (G(Je)) {
      if (Je.lang === "es") {
        return "ESCANEE PARA EMPEZAR";
      } else {
        return "SCAN TO GET STARTED";
      }
    } else if (Je.lang === "es") {
      return "ESCANEE Y CONECTE";
    } else {
      return "SCAN TO CONNECT";
    }
  }
  function Y(Je) {
    const Jl = Je.lang === "es";
    return [(Je.agentName || "Loan Officer") + " NMLS #" + (Je.nmls || ""), "Cornerstone First Mortgage NMLS #173855", ...(Je.branchNmls ? ["Branch NMLS #" + Je.branchNmls] : []), "FL MLD1510", "nmlsconsumeraccess.org", Jl ? "Prestamista de igualdad de vivienda" : "Equal Housing Lender", ...(window.iMathTheme && window.iMathTheme.on ? [window.iMathTheme.VA] : [])];
  }
  function J0(Je, Jl, JV, JS) {
    const JA = Y(Jl);
    const Jc = [];
    let JI = "";
    JA.forEach(JO => {
      const JP = JI ? JI + "  |  " + JO : JO;
      if (JI && V.textW(Je, JP, {
        size: JV,
        weight: 400,
        fam: I
      }) + JV * 1.8 > JS) {
        Jc.push(JI);
        JI = JO;
      } else {
        JI = JP;
      }
    });
    if (JI) {
      Jc.push(JI);
    }
    return Jc;
  }
  function J1(Je, Jl, JV) {
    return J0(Je, Jl, 0.058, JV).length * 0.058 * 1.32;
  }
  function J2(Je, Jl, JV, JS, JA, Jc, JI) {
    const JO = 0.058;
    const JP = JO * 1.32;
    const JX = J0(Je, Jl, JO, JI);
    JX.forEach((Jo, JW) => {
      const Jz = JW === JX.length - 1;
      const Ji = V.textW(Je, Jo, {
        size: JO,
        weight: 400,
        fam: I
      }) + (Jz ? JO * 1.7 : 0);
      const JC = Jc === "right" ? JV - Ji : Jc === "center" ? JV - Ji / 2 : JV;
      const JT = JS - (JX.length - 1 - JW) * JP;
      O(Je, Jo, JC, JT, {
        size: JO,
        weight: 400,
        fam: I,
        color: JA
      });
      if (Jz) {
        V.eho(Je, JC + Ji - JO * 1.2, JT - 0.0609, JO * 1.2, JA);
      }
    });
    return JX.length * JP;
  }
  const J3 = 0.072;
  function J4(Je, Jl, JV) {
    if (Jl.officeAddress) {
      return V.wrapLines(Je, String(Jl.officeAddress), {
        size: J3,
        weight: 600,
        fam: I
      }, JV - 0.1152).slice(0, 2);
    } else {
      return [];
    }
  }
  function J5(Je, Jl, JV, JS, JA, Jc, JI) {
    const JO = J4(Je, Jl, JA);
    if (!JO.length) {
      return 0;
    }
    const JP = 0.0972;
    JO.forEach((JX, Jo) => {
      const JW = V.textW(Je, JX, {
        size: J3,
        weight: 600,
        fam: I
      });
      const Jz = Jo === 0 ? J3 * 1.5 : 0;
      const Ji = JV - (JW + Jz) / 2;
      if (Jo === 0) {
        V.icon(Je, "pin", Ji, JS + Jo * JP - J3 * 0.95, 0.0792, JI || Jc);
      }
      O(Je, JX, Ji + Jz, JS + Jo * JP, {
        size: J3,
        weight: 600,
        fam: I,
        color: Jc
      });
    });
    return JO.length * JP;
  }
  function J6(Je, Jl) {
    if (Je.bilingual) {
      if (Jl === "es") {
        return "Hablamos su idioma";
      } else {
        return "Se habla español";
      }
    } else {
      return "";
    }
  }
  function J7(Je, Jl, JV, JS, JA) {
    const {
      W: Jc,
      H: JI
    } = Jl;
    V.bleedRect(Je, Jl, 0, 0, Jc, JI, JA.bg);
    if (JA.stripe) {
      V.poly(Je, [[Jc * 0.78, -0.2], [Jc + 0.2, -0.2], [Jc + 0.2, JI * 0.62]], JA.band || A.navyDeep);
      V.stripe(Je, Jc * 0.72, -0.2, Jc + 0.2, JI * 0.72, 0.035, A.green);
    }
    const JO = JV.qrOn && JV.qrUrl;
    const JP = G(JV);
    const JX = JP ? ((JZ, JG) => JG ? JZ.mortRev : JZ.mortColor)(JS, JA.dark) : JA.dark ? JS.lockupVRev : JS.lockupV;
    const Jo = B(JV);
    if (JI > Jc) {
      const JZ = JP ? J1(Je, JV, Jc - 0.3) : 0.1;
      let JG = 0.3;
      if (JO) {
        V.qr(Je, JV.qrUrl, Jc / 2 - 0.58, JG, 1.16, A.navy, "#fff");
        JG += 1.34;
        O(Je, Jo, Jc / 2, JG, {
          size: 0.075,
          weight: 800,
          color: JA.accent,
          align: "center",
          track: 0.12,
          maxW: Jc - 0.3
        });
        JG += 0.2;
      } else {
        JG = 0.7;
      }
      const JL = JV.officeAddress ? J4(Je, JV, Jc - 0.3).length * J3 * 1.35 + 0.06 : 0;
      const Jm = JP ? Math.min(1.5, (JI - 0.3 - JZ - 0.45 - JL - JG) / K) : Math.max(0.8, Math.min(1.3, (JI - 0.3 - JZ - 0.45 - JL - JG) / 0.755));
      if (JP && !JO) {
        const JH = Jm * K + 0.2 + (JV.bilingual ? 0.15 : 0) + (JV.social ? 0.1 : 0) + J4(Je, JV, Jc - 0.3).length * J3 * 1.35;
        JG = Math.max(0.4, 0.3 + (JI - 0.3 - JZ - 0.3 - JH) / 2);
      }
      JG += V.logo(Je, JX, Jc / 2, JG, {
        w: Jm,
        align: "center"
      }).h + 0.2;
      const Jr = J6(JV, JV.lang);
      if (Jr) {
        O(Je, Jr, Jc / 2, JG, {
          size: 0.088,
          weight: 800,
          color: JA.accent,
          align: "center"
        });
        JG += 0.15;
      }
      if (JV.social) {
        O(Je, JV.social, Jc / 2, JG, {
          size: 0.084,
          weight: 600,
          fam: I,
          color: JA.fg,
          align: "center",
          maxW: Jc - 0.3
        });
        JG += 0.16;
      }
      if (JV.officeAddress) {
        J5(Je, JV, Jc / 2, Math.min(JG + 0.04, JI - 0.3 - JZ - 0.2), Jc - 0.3, JA.fg, JA.accent);
      }
      if (JP) {
        J2(Je, JV, Jc / 2, JI - 0.16, JA.muted, "center", Jc - 0.3);
      } else {
        T(Je, 0, Jc / 2, JI - 0.16, JA.muted, "center", JV.lang);
      }
      return;
    }
    const JW = JO ? 2.33 : Jc / 2;
    const Jz = JO ? 1.95 : 3;
    if (JO) {
      V.qr(Je, JV.qrUrl, 0.2, 0.26, 1.1, A.navy, "#fff");
      O(Je, Jo, 0.75, 1.52, {
        size: 0.07,
        weight: 800,
        color: JA.accent,
        align: "center",
        track: 0.12,
        maxW: 1.25
      });
    }
    const Ji = JP ? K : 0.755;
    const JC = JP ? 0.2 : 0.24;
    const JT = J4(Je, JV, Jz).length;
    const Jk = JI - 0.13 - (JP ? J1(Je, JV, Jc - 0.36) : 0.066) - 0.02;
    const JU = 0.2 + (JV.tagline ? Math.min(2, V.wrapLines(Je, JV.tagline, {
      size: 0.084,
      weight: 600,
      fam: I
    }, Jz).length) * 0.12 + 0.03 : 0) + (JV.bilingual ? 0.14 : 0) + (JV.social ? 0.13 : 0) + (JT ? JT * J3 * 1.35 + 0.02 : 0);
    let JF = Math.max(0.75, Math.min(JP ? JO ? 1.5 : 1.7 : JO ? 1.2 : 1.45, (Jk - JC - JU - 0.06) / Ji));
    if (JP && JA.stripe) {
      JF = Math.min(JF, JO ? 1.2 : 1.45);
    }
    let Jw = JC + V.logo(Je, JX, JW, JC, {
      w: JF,
      align: "center"
    }).h + 0.2;
    if (JV.tagline) {
      Jw += V.para(Je, JV.tagline, JW, Jw, Jz, {
        size: 0.084,
        weight: 600,
        fam: I,
        color: JA.fg,
        align: "center"
      }, 0.12, 2) + 0.03;
    }
    const JR = J6(JV, JV.lang);
    if (JR) {
      O(Je, JR, JW, Jw, {
        size: 0.088,
        weight: 800,
        color: JA.accent,
        align: "center"
      });
      Jw += 0.14;
    }
    if (JV.social) {
      O(Je, JV.social, JW, Jw, {
        size: 0.084,
        weight: 600,
        fam: I,
        color: JA.fg,
        align: "center",
        maxW: Jz
      });
      Jw += 0.13;
    }
    if (JT) {
      J5(Je, JV, JW, Jw, Jz, JA.fg, JA.accent);
    }
    if (JP) {
      J2(Je, JV, Jc / 2, JI - 0.13, JA.muted, "center", Jc - 0.36);
    } else {
      T(Je, 0, Jc / 2, JI - 0.13, JA.muted, "center", JV.lang);
    }
  }
  const J8 = {
    bg: "#fff",
    fg: A.ink,
    accent: A.navy,
    muted: A.gray,
    dark: false
  };
  const J9 = {
    bg: A.navy,
    fg: "#fff",
    accent: A.green,
    muted: A.soft,
    dark: true
  };
  const JJ = {
    bg: A.gray,
    fg: "#fff",
    accent: "#fff",
    muted: "#e6e8ea",
    dark: true
  };
  const Jt = {
    bg: A.night,
    fg: "#fff",
    accent: A.green,
    muted: "#9fb4c9",
    dark: true
  };
  const Jg = [{
    id: "signature",
    name: "Signature Diagonal",
    note: "The brand classic. Poster diagonal and green stripe.",
    orient: "h",
    feature: false,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, "#fff");
      const JI = G(JV);
      V.poly(Je, [[-0.2, -0.2], [0.95, -0.2], [0.35, Jc + 0.2], [-0.2, Jc + 0.2]], JI ? j(JV) : A.navy);
      V.stripe(Je, 1.08, -0.2, 0.48, Jc + 0.2, 0.03, A.green);
      const JO = F(JV, Jl, {
        cx: 0.58,
        cy: 1,
        r: 0.4,
        maxX: 1.6
      });
      Z(Je, JO, JS, JV, "#fff");
      const JP = JO ? Math.max(1.12, JO.cx + JO.r + 0.14) : 1.12;
      const JX = P(JV.agentName);
      const Jo = O(Je, JX, JP, 0.52, {
        size: 0.19,
        weight: 900,
        color: A.navy,
        maxW: JA - JP - 0.25
      });
      V.dot(Je, JP + Jo.w + 0.045, 0.505, 0.022, A.green);
      O(Je, D(JV, "   •   SE HABLA ESPAÑOL"), JP, 0.68, {
        size: 0.07,
        weight: 700,
        color: JI ? A.gray : A.green,
        track: 0.12,
        maxW: JA - JP - 0.2
      });
      V.contactRows(Je, JV, JP, 0.93, {
        size: 0.092,
        color: A.ink,
        iconColor: JI ? A.gray : A.navy,
        gap: 0.14,
        maxW: JA - JP - 0.18,
        items: ["phone", "email", "web"]
      });
      if (JI) {
        V.logo(Je, JS.mortColor, JA - 0.2, Jc - 0.68, {
          h: 0.52,
          align: "right"
        });
      } else {
        V.logo(Je, JS.lockupH, JA - 0.2, Jc - 0.42, {
          h: 0.26,
          align: "right"
        });
      }
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, G(JV) ? Object.assign({
        stripe: true,
        band: q(JV)
      }, Q(JV) ? J9 : JJ) : Object.assign({
        stripe: true,
        band: A.gray
      }, J9));
    }
  }, {
    id: "hero",
    name: "Hero Headshot",
    note: "Feature yourself. Full height portrait panel.",
    orient: "h",
    feature: true,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, "#fff");
      V.portrait(Je, JS.headshot, -0.125, -0.125, 1.45, Jc + 0.25, {
        name: JV.agentName,
        hint: "YOUR PHOTO"
      });
      V.rect(Je, 1.32, -0.125, 0.035, Jc + 0.25, A.green);
      const JI = 1.55;
      const [JO, JP] = X(JV.agentName);
      O(Je, P(JO), JI, 0.42, {
        size: 0.16,
        weight: 800,
        color: A.navy,
        maxW: JA - JI - 0.18
      });
      const JX = O(Je, P(JP), JI, 0.62, {
        size: 0.16,
        weight: 900,
        color: A.navy,
        maxW: JA - JI - 0.25
      });
      V.dot(Je, JI + JX.w + 0.04, 0.6, 0.02, A.green);
      const Jo = G(JV);
      O(Je, D(JV), JI, 0.77, {
        size: 0.07,
        weight: 700,
        color: Jo ? A.gray : A.green,
        track: 0.12,
        maxW: JA - JI - 0.2
      });
      V.contactRows(Je, JV, JI, 1, {
        size: 0.088,
        color: A.ink,
        iconColor: A.gray,
        gap: 0.13,
        maxW: JA - JI - 0.15,
        items: ["phone", "email", "web"]
      });
      if (Jo) {
        V.logo(Je, JS.mortColor, JI, Jc - 0.6, {
          h: 0.46,
          maxW: JA - JI - 0.18
        });
      } else {
        V.logo(Je, JS.lockupH, JI, Jc - 0.4, {
          h: 0.24,
          maxW: JA - JI - 0.18
        });
      }
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, G(JV) && !Q(JV) ? JJ : J9);
    }
  }, {
    id: "portrait",
    name: "Vertical Portrait",
    note: "Feature yourself. Vertical card with a large circle portrait.",
    orient: "v",
    feature: true,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, "#fff");
      const JI = G(JV);
      V.bleedRect(Je, Jl, 0, 0, JA, 1.2, JI ? j(JV) : A.navy);
      V.stripe(Je, -0.2, 1.3, JA + 0.2, 0.95, 0.03, A.green);
      V.poly(Je, [[-0.2, 1.2], [JA + 0.2, 0.9], [JA + 0.2, 1.2]], "#fff");
      V.head(Je, JS.headshot, JA / 2, 1.25, 0.52, {
        ring: 0.035,
        ringColor: "#fff",
        name: JV.agentName
      });
      O(Je, P(JV.agentName), JA / 2, 2.05, {
        size: 0.15,
        weight: 900,
        color: A.navy,
        align: "center",
        maxW: JA - 0.3
      });
      O(Je, D(JV), JA / 2, 2.2, {
        size: 0.07,
        weight: 700,
        color: JI ? A.gray : A.green,
        align: "center",
        track: 0.12,
        maxW: JA - 0.3
      });
      V.rect(Je, JA / 2 - 0.3, 2.27, 0.6, 0.008, A.gray);
      let JO = 2.42;
      [JV.phone, JV.email, JV.website].filter(Boolean).forEach((JP, JX) => {
        O(Je, JP, JA / 2, JO, {
          size: 0.088,
          weight: 600,
          fam: I,
          color: JX ? A.gray : A.ink,
          align: "center",
          maxW: JA - 0.3
        });
        JO += 0.13;
      });
      if (JI) {
        V.logo(Je, JS.mortColor, JA / 2, Jc - 0.7, {
          w: 1.15,
          align: "center"
        });
      } else {
        V.logo(Je, JS.lockupH, JA / 2, Jc - 0.42, {
          w: JA - 0.4,
          align: "center"
        });
      }
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, G(JV) && !Q(JV) ? JJ : J9);
    }
  }, {
    id: "minimal",
    name: "Minimal Mono",
    note: "Quiet, lots of space, fine gray rules, slate gray back.",
    orient: "h",
    feature: false,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, "#fff");
      const JI = G(JV);
      const JO = JI ? -0.1 : 0;
      const JP = F(JV, Jl, {
        cx: 0.62,
        cy: 0.92 + JO,
        r: 0.38,
        maxX: 1.3,
        maxBottom: JI ? Jc - 0.64 : Jc - 0.5
      });
      Z(Je, JP, JS, JV, A.green);
      const JX = JP ? JP.cx + JP.r + 0.14 : 0.25;
      const Jo = JA - 0.25;
      const JW = (JX + Jo) / 2;
      const Jz = Jo - JX;
      O(Je, P(JV.agentName), JW, 0.72 + JO, {
        size: 0.155,
        weight: 700,
        color: A.navy,
        align: "center",
        track: 0.18,
        maxW: Jz
      });
      V.rect(Je, JW - 0.22, 0.83 + JO, 0.44, 0.012, A.green);
      O(Je, D(JV), JW, 0.99 + JO, {
        size: 0.07,
        weight: 600,
        color: A.gray,
        align: "center",
        track: 0.2,
        maxW: Jz
      });
      O(Je, [JV.phone, JV.email].filter(Boolean).join(JP ? "   " : "     "), JW, 1.26 + JO, {
        size: 0.088,
        weight: 600,
        fam: I,
        color: A.ink,
        align: "center",
        maxW: Jz
      });
      if (JV.website) {
        O(Je, JV.website, JW, 1.41 + JO, {
          size: 0.084,
          weight: 400,
          fam: I,
          color: A.gray,
          align: "center",
          maxW: Jz
        });
      }
      if (JI) {
        V.logo(Je, JS.mortColor, JA / 2, Jc - 0.6, {
          h: 0.45,
          align: "center"
        });
      } else {
        V.logo(Je, JS.lockupH, JA / 2, Jc - 0.42, {
          h: 0.26,
          align: "center"
        });
      }
      const Ji = Math.min(V.textW(Je, D(JV), {
        size: 0.07,
        weight: 600,
        track: 0.2
      }), Jz) / 2 + 0.1;
      const JC = Math.min(0.35, Jz / 2 - Ji - 0.02);
      if (JC > 0.08) {
        V.rect(Je, JW - Ji - JC, 0.965 + JO, JC, 0.008, A.gray);
        V.rect(Je, JW + Ji, 0.965 + JO, JC, 0.008, A.gray);
      }
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, G(JV) && Q(JV) ? J9 : JJ);
    }
  }, {
    id: "quiet",
    name: "Quiet Luxury",
    note: "Deep navy, light wide tracked type, thin green hairline.",
    orient: "h",
    feature: false,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, A.navyDeep);
      const JI = F(JV, Jl, {
        cx: JA - 0.8,
        cy: 0.54,
        r: 0.32,
        minX: JA - 1.1,
        maxBottom: 0.94
      });
      Z(Je, JI, JS, JV, A.green);
      const JO = JI ? JI.cx - JI.r - 0.42 : JA - 0.6;
      O(Je, P(JV.agentName), 0.3, 0.72, {
        size: 0.15,
        weight: 400,
        color: "#fff",
        track: 0.24,
        maxW: JO
      });
      V.rect(Je, 0.3, 0.84, 0.9, 0.008, A.green);
      O(Je, D(JV, "  •  BILINGÜE"), 0.3, 0.99, {
        size: 0.066,
        weight: 600,
        color: A.soft,
        track: 0.26,
        maxW: JI ? JO : JA - 1.4
      });
      let JP = 1.28;
      const JX = (G(JV) ? JA - 1.55 : JA - 1.25) - 0.4;
      [JV.phone, JV.email, JV.website].filter(Boolean).forEach(Jo => {
        O(Je, Jo, 0.3, JP, {
          size: 0.084,
          weight: 400,
          fam: I,
          color: "#e8eef5",
          maxW: JX
        });
        JP += 0.125;
      });
      if (G(JV)) {
        V.rect(Je, JA - 1.55, 1.1, 1.25, 0.008, A.gray);
        V.logo(Je, JS.mortRev, JA - 0.3, 1.2, {
          w: 1.25,
          align: "right"
        });
      } else {
        V.logo(Je, JS.lockupVRev, JA - 0.3, 1.08, {
          w: 0.95,
          align: "right"
        });
      }
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, Object.assign({}, J8, {
        accent: A.gray
      }));
    }
  }, {
    id: "statement",
    name: "Bold Statement",
    note: "Big stacked name with the brand dot. Contact on the back.",
    orient: "h",
    feature: true,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      const JI = G(JV);
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, JI ? j(JV) : A.navy);
      const [JO, JP] = X(JV.agentName);
      const JX = F(JV, Jl, {
        cx: JA - 0.64,
        cy: 0.64,
        r: 0.44,
        minX: JA - 1,
        maxBottom: 1.14
      });
      Z(Je, JX, JS, JV, "#fff");
      const Jo = JX ? JX.cx - JX.r - 0.34 : JA - 0.44;
      O(Je, P(JO), 0.22, 0.72, {
        size: 0.36,
        weight: 900,
        color: "#fff",
        maxW: Jo
      });
      const JW = O(Je, P(JP), 0.22, 1.1, {
        size: 0.36,
        weight: 900,
        color: "#fff",
        maxW: Jo - 0.18
      });
      V.dot(Je, 0.22 + JW.w + 0.07, 1.07, 0.04, A.green);
      O(Je, D(JV, "   •   SE HABLA ESPAÑOL"), 0.24, 1.32, {
        size: 0.078,
        weight: 700,
        color: JI && !Q(JV) ? "#e3f2e1" : A.green,
        track: 0.14,
        maxW: JA - 0.4
      });
      if (JI) {
        V.logo(Je, JS.mortRev, 0.22, Jc - 0.57, {
          h: 0.43
        });
      } else {
        V.logo(Je, JS.lockupHRev, 0.22, Jc - 0.42, {
          h: 0.24
        });
      }
      O(Je, JV.phone, JA - 0.22, Jc - 0.23, {
        size: 0.095,
        weight: 800,
        color: "#fff",
        align: "right"
      });
    },
    back(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, "#fff");
      const JI = G(JV);
      V.bleedRect(Je, Jl, 0, 0, JI ? 0.16 : 0.09, Jc, JI ? j(JV) : A.gray);
      const JO = JV.qrOn && JV.qrUrl;
      const JP = JO ? 1.45 : JI ? 0.36 : 0.3;
      if (JO) {
        V.qr(Je, JV.qrUrl, JI ? 0.28 : 0.22, JI ? 0.3 : 0.42, 1.05, A.navy, "#fff");
        if (JI) {
          O(Je, B(JV), 0.805, 1.52, {
            size: 0.066,
            weight: 800,
            color: A.gray,
            align: "center",
            track: 0.1,
            maxW: 1.2
          });
        }
      }
      if (JI) {
        V.logo(Je, JS.mortColor, JA - 0.2, 0.2, {
          h: 0.44,
          align: "right"
        });
        V.contactRows(Je, JV, JP, 0.8, {
          size: 0.094,
          color: A.ink,
          iconColor: A.gray,
          gap: JV.officeAddress && JV.social ? 0.16 : 0.17,
          maxW: JA - JP - 0.2,
          items: ["phone", "email", "web", "social", "address"]
        });
        J2(Je, JV, JA - 0.18, Jc - 0.13, A.gray, "right", JA - 0.4);
        return;
      }
      V.contactRows(Je, JV, JP, 0.62, {
        size: 0.094,
        color: A.ink,
        iconColor: A.green,
        gap: JV.officeAddress && JV.social ? 0.16 : 0.17,
        maxW: JA - JP - 0.2,
        items: ["phone", "email", "web", "social", "address"]
      });
      V.logo(Je, JS.lockupH, JP, Jc - 0.46, {
        h: 0.2,
        maxW: JA - JP - 0.2
      });
      T(Je, 0, JA - 0.18, Jc - 0.1, A.gray, "right", JV.lang);
    }
  }, {
    id: "split",
    name: "Split Slate",
    note: "Slate gray brand panel left, contact right. Clean for teams.",
    orient: "h",
    feature: false,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, "#fff");
      V.bleedRect(Je, Jl, 0, 0, 1.25, Jc, G(JV) ? j(JV) : A.gray);
      V.rect(Je, 1.25, -0.125, 0.03, Jc + 0.25, A.green);
      const JI = F(JV, Jl, {
        cx: 0.625,
        cy: 0.56,
        r: 0.34,
        maxX: 1.17,
        maxBottom: 1.2
      });
      Z(Je, JI, JS, JV, "#fff");
      const JO = G(JV);
      const JP = JO ? JS.mortRev : JS.lockupVRev;
      const JX = JO ? K : 0.755;
      const Jo = JO ? 1.02 : 0.9;
      if (JI) {
        const Ji = JI.cy + JI.r * 1.08 + 0.08;
        V.logo(Je, JP, 0.625, Ji, {
          w: Math.min(JO ? 1 : 0.72, (Jc - 0.17 - Ji) / JX),
          align: "center"
        });
      } else {
        V.logo(Je, JP, 0.625, Jc / 2 - Jo * JX / 2, {
          w: Jo,
          align: "center"
        });
      }
      const JW = 1.5;
      const Jz = O(Je, JV.agentName, JW, 0.52, {
        size: 0.16,
        weight: 800,
        color: A.navy,
        maxW: JA - JW - 0.25
      });
      V.dot(Je, JW + Jz.w + 0.04, 0.5, 0.019, A.green);
      O(Je, D(JV), JW, 0.68, {
        size: 0.07,
        weight: 700,
        color: JO ? A.gray : A.green,
        track: 0.12,
        maxW: JA - JW - 0.2
      });
      V.contactRows(Je, JV, JW, 0.95, {
        size: 0.1,
        color: A.ink,
        iconColor: A.gray,
        gap: 0.14,
        maxW: JA - JW - 0.15
      });
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, J9);
    }
  }, {
    id: "night",
    name: "Dark Mode",
    note: "Night navy with green icon accents. Popular with social first agents.",
    orient: "h",
    feature: false,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, A.night);
      V.dot(Je, JA - 0.1, 0.1, 0.9, "rgba(107,192,99,0.07)");
      const JI = G(JV);
      const JO = F(JV, Jl, {
        cx: JA - 0.66,
        cy: 0.6,
        r: 0.4,
        minX: JA - 1.05,
        maxBottom: JI ? Jc - 0.78 : Jc - 0.84
      });
      Z(Je, JO, JS, JV, A.green);
      const JP = JO ? JO.cx - JO.r - 0.4 : JA - 1.1;
      const JX = O(Je, JV.agentName, 0.25, 0.55, {
        size: 0.165,
        weight: 800,
        color: "#fff",
        maxW: JP
      });
      V.dot(Je, 0.25 + JX.w + 0.04, 0.53, 0.02, A.green);
      O(Je, D(JV), 0.25, 0.71, {
        size: 0.07,
        weight: 700,
        color: A.green,
        track: 0.14,
        maxW: JO ? JO.cx - JO.r - 0.35 : JA - 0.5
      });
      V.contactRows(Je, JV, 0.25, 0.98, {
        size: 0.1,
        color: "#e8eef5",
        iconColor: A.green,
        gap: 0.14,
        maxW: JO ? Math.min(JA - 1.3, JO.cx - JO.r - 0.35) : JA - 1.3,
        items: JI ? ["phone", "email", "web"] : ["phone", "email", "web", "social"]
      });
      if (JI) {
        V.logo(Je, JS.mortRev, JA - 0.22, Jc - 0.7, {
          w: 1.2,
          align: "right"
        });
      } else {
        V.logo(Je, JS.lockupVRev, JA - 0.22, Jc - 0.72, {
          w: 0.9,
          align: "right"
        });
      }
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, Jt);
    }
  }, {
    id: "neighbor",
    name: "Neighborhood Pro",
    note: "Local expert. River line pattern inspired by the St. Johns.",
    orient: "h",
    feature: false,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, A.mist);
      Je.save();
      Je.strokeStyle = "rgba(98,102,106,0.16)";
      Je.lineWidth = 0.012;
      for (let JX = 0; JX < 9; JX++) {
        Je.beginPath();
        for (let Jo = -0.2; Jo <= JA + 0.2; Jo += 0.05) {
          const JW = 0.25 + JX * 0.22 + Math.sin(Jo * 1.6 + JX * 0.5) * 0.12;
          if (Jo === -0.2) {
            Je.moveTo(Jo, JW);
          } else {
            Je.lineTo(Jo, JW);
          }
        }
        Je.stroke();
      }
      Je.restore();
      const JI = F(JV, Jl, {
        cx: JA - 0.56,
        cy: 0.6,
        r: 0.34,
        minX: JA - 0.95,
        maxBottom: 0.98
      });
      Z(Je, JI, JS, JV, A.green);
      const JO = JI ? JI.cx - JI.r - 0.12 : JA - 0.25;
      V.icon(Je, "pin", 0.24, 0.3, 0.14, A.green);
      O(Je, JV.lang === "es" ? "SU VECINO EN JACKSONVILLE" : "YOUR JACKSONVILLE NEIGHBOR", 0.42, 0.41, {
        size: 0.07,
        weight: 800,
        color: A.green,
        track: 0.12,
        maxW: JO - 0.42
      });
      const JP = O(Je, JV.agentName, 0.25, 0.72, {
        size: 0.17,
        weight: 800,
        color: A.navy,
        maxW: JO - 0.4
      });
      V.dot(Je, 0.25 + JP.w + 0.04, 0.7, 0.02, A.green);
      O(Je, D(JV), 0.25, 0.87, {
        size: 0.07,
        weight: 700,
        color: A.gray,
        track: 0.14,
        maxW: JO - 0.25
      });
      O(Je, [JV.phone, JV.email].filter(Boolean).join("   |   "), 0.25, 1.12, {
        size: 0.1,
        weight: 600,
        fam: I,
        color: A.ink,
        maxW: JA - 0.5
      });
      if (JV.website) {
        O(Je, JV.website, 0.25, 1.27, {
          size: 0.084,
          weight: 400,
          fam: I,
          color: A.gray
        });
      }
      if (G(JV)) {
        V.bleedRect(Je, Jl, 0, Jc - 0.56, JA, 0.56, j(JV));
        V.rect(Je, -0.125, Jc - 0.56, JA + 0.25, 0.02, A.green);
        V.logo(Je, JS.mortRev, 0.25, Jc - 0.5, {
          h: 0.4
        });
      } else {
        V.bleedRect(Je, Jl, 0, Jc - 0.44, JA, 0.44, "#fff");
        V.rect(Je, -0.125, Jc - 0.44, JA + 0.25, 0.012, A.green);
        V.logo(Je, JS.lockupH, 0.25, Jc - 0.35, {
          h: 0.24
        });
      }
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, G(JV) && !Q(JV) ? JJ : J9);
    }
  }, {
    id: "band",
    name: "Photo Band",
    note: "Feature yourself. Headshot breaks out of a navy band.",
    orient: "h",
    feature: true,
    front(Je, Jl, JV, JS) {
      const {
        W: JA,
        H: Jc
      } = Jl;
      const JI = G(JV);
      V.bleedRect(Je, Jl, 0, 0, JA, Jc, "#fff");
      V.bleedRect(Je, Jl, 0, 0, JA, 0.72, JI ? j(JV) : A.navy);
      V.stripe(Je, -0.2, 0.76, JA + 0.2, 0.76, 0.018, A.green);
      V.bleedRect(Je, Jl, 0, Jc - 0.06, JA, 0.06, JI ? q(JV) : A.gray);
      if (JI) {
        V.logo(Je, JS.mortRev, JA - 0.2, 0.1, {
          h: 0.52,
          align: "right"
        });
      } else {
        V.logo(Je, JS.lockupHRev, JA - 0.2, 0.2, {
          h: 0.22,
          align: "right"
        });
      }
      V.head(Je, JS.headshot, 0.72, 0.8, 0.5, {
        ring: 0.04,
        ringColor: "#fff",
        name: JV.agentName
      });
      const JO = 1.36;
      const JP = O(Je, JV.agentName, JO, 1.03, {
        size: 0.15,
        weight: 800,
        color: A.navy,
        maxW: JA - JO - 0.25
      });
      V.dot(Je, JO + JP.w + 0.04, 1.01, 0.018, A.green);
      O(Je, D(JV, "  •  SE HABLA ESPAÑOL"), JO, 1.18, {
        size: 0.066,
        weight: 700,
        color: JI ? A.gray : A.green,
        track: 0.1,
        maxW: JA - JO - 0.18
      });
      O(Je, JV.phone, JO, 1.43, {
        size: 0.095,
        weight: 800,
        color: A.ink
      });
      O(Je, JV.email, JO, 1.58, {
        size: 0.084,
        weight: 600,
        fam: I,
        color: A.ink,
        maxW: JA - JO - 0.18
      });
      if (JV.website) {
        O(Je, JV.website, JO, 1.72, {
          size: 0.078,
          weight: 400,
          fam: I,
          color: A.gray
        });
      }
    },
    back(Je, Jl, JV, JS) {
      J7(Je, Jl, JV, JS, J9);
    }
  }];
  function Jy(Je) {
    if (Je.orient === "v") {
      return [2, 3.5];
    } else {
      return [3.5, 2];
    }
  }
  J.iMathCards = {
    STYLES: Jg,
    draw: function (Je, Jl, JV, JS, JA, Jc) {
      const JI = Jg.find(JW => JW.id === Jl) || Jg[0];
      const [JO, JP] = Jy(JI);
      if (JV === "back") {
        JI.orient;
      }
      const JX = [JO, JP];
      const Jo = V.makePage(Je, JX[0], JX[1], Jc || 300);
      JI[JV === "back" ? "back" : "front"](Jo.ctx, Jo, JS, JA);
      return {
        w: JX[0],
        h: JX[1]
      };
    },
    size: Jy,
    PHOTO_ALWAYS: ["hero", "portrait", "band"],
    loSegments: Y
  };
})(typeof window != "undefined" ? window : globalThis);
