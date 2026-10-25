/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (v) {
  const K = v.iMathPrint;
  const B = K.C;
  K.HF;
  const k = K.BF;
  const W = K.text;
  const U = Y => String(Y || "").toUpperCase();
  const z = {
    for_sale: {
      en: "FOR SALE",
      es: "SE VENDE"
    },
    coming_soon: {
      en: "COMING SOON",
      es: "PRÓXIMAMENTE"
    },
    open_house: {
      en: "OPEN HOUSE",
      es: "CASA ABIERTA"
    },
    under_contract: {
      en: "UNDER CONTRACT",
      es: "BAJO CONTRATO"
    },
    sold: {
      en: "SOLD",
      es: "VENDIDA"
    },
    for_lease: {
      en: "FOR LEASE",
      es: "SE RENTA"
    },
    renovate: {
      en: "RENOVATE ME!",
      es: "¡RENÚVAME!",
      lo: true,
      sub: {
        en: "This home may qualify for FHA 203(k) and Conventional renovation loans",
        es: "Esta casa podría calificar para préstamos de renovación FHA 203(k) y convencionales"
      }
    },
    less_down: {
      en: "BUY WITH LESS DOWN!",
      es: "¡AYUDA CON SU PAGO INICIAL!",
      lo: true,
      sub: {
        en: "Ask about down payment assistance. For qualified buyers.",
        es: "Pregunte por asistencia para el pago inicial. Para compradores que califiquen."
      }
    }
  };
  const M = {
    open_house: {
      en: "OPEN HOUSE",
      es: "CASA ABIERTA"
    },
    coming_soon: {
      en: "COMING SOON",
      es: "PRÓXIMAMENTE"
    },
    under_contract: {
      en: "UNDER CONTRACT",
      es: "BAJO CONTRATO"
    },
    sold: {
      en: "SOLD",
      es: "VENDIDA"
    },
    new_price: {
      en: "NEW PRICE",
      es: "NUEVO PRECIO"
    },
    pool: {
      en: "POOL",
      es: "PISCINA"
    },
    waterfront: {
      en: "WATERFRONT",
      es: "FRENTE AL AGUA"
    },
    se_habla: {
      en: "SE HABLA ESPAÑOL",
      es: "SE HABLA ESPAÑOL",
      fixed: true
    },
    agent: {
      en: "",
      es: "",
      agent: true
    },
    scan: {
      en: "SCAN FOR PHOTOS",
      es: "ESCANEE PARA FOTOS",
      qr: true
    },
    renovate: {
      en: "RENOVATE ME!",
      es: "¡RENÚVAME!",
      lo: true,
      sub: {
        en: "Ask about FHA 203(k) and renovation loans",
        es: "Pregunte por préstamos de renovación FHA 203(k)"
      }
    },
    less_down: {
      en: "BUY WITH LESS DOWN!",
      es: "¡AYUDA CON SU PAGO INICIAL!",
      lo: true,
      sub: {
        en: "Ask about down payment assistance programs",
        es: "Pregunte por programas de asistencia"
      }
    },
    dpa: {
      en: "DOWN PAYMENT ASSISTANCE AVAILABLE",
      es: "ASISTENCIA PARA EL PAGO INICIAL",
      lo: true,
      sub: {
        en: "For qualified buyers. Ask for details.",
        es: "Para compradores que califiquen. Pregunte."
      }
    },
    low_down: {
      en: "ASK ABOUT LOW DOWN PAYMENT PROGRAMS",
      es: "PREGUNTE POR PROGRAMAS DE PAGO INICIAL BAJO",
      lo: true
    }
  };
  function G(Y, Z) {
    if (Z === "es") {
      return [Y.es, null];
    } else if (Z === "both") {
      return [Y.en, Y.fixed ? null : Y.es];
    } else {
      return [Y.en, null];
    }
  }
  const R = Y => Y.lo && Y.lo.id !== "none";
  const j = {
    panel: [24, 18],
    large: [36, 24],
    rider: [24, 6],
    directional: [24, 18]
  };
  function q(Y, Z, V, I, E, T, P, O) {
    const J = O * 0.3;
    const y = ["United Real Estate Gallery  |  FL Lic. CQ1066513  |  " + (Z.lang === "es" ? "Igualdad de oportunidades en la vivienda" : "Equal Housing Opportunity")];
    if (R(Z)) {
      y.push(K.loShort(Z.lo));
    }
    y.forEach((C, Q) => W(Y, C, V, I + Q * J * 1.35, {
      size: J,
      weight: 400,
      fam: k,
      color: T,
      align: P,
      maxW: E
    }));
    return y.length * J * 1.35;
  }
  const N = Y => Math.max(0.5, Math.min(1.8, +Y.photoScale || 1));
  function H(Y, Z, V, I, E, T, P, O, J) {
    const y = T * N(Z);
    let C = E + (+Z.photoDY || 0) * P;
    if (J != null) {
      C = Math.min(C, J - y);
    }
    K.head(Y, V.headshot, I + (+Z.photoDX || 0) * P, C, y, {
      ring: P * 0.12,
      ringColor: O || B.green,
      name: Z.agentName
    });
    return y;
  }
  function D(Y, Z, V, I, E, T, P, O) {
    const J = O.u;
    const C = O.dark;
    const Q = C ? "#fff" : B.navy;
    if (C) {
      B.soft;
    } else {
      B.gray;
    }
    const x = R(Z) ? Z.lo : null;
    const L = x ? T * 0.62 : T;
    let v0 = I;
    if (O.photo || Z.signPhoto) {
      const v2 = Math.min(P * 0.46, J * 1.9);
      const v3 = x ? Math.min(P * 0.36, J * 1.3) * 1.05 : 0;
      const v4 = Math.max(Math.min(v2 * N(Z), P * 0.56), v3);
      H(Y, Object.assign({}, Z, {
        photoScale: v4 / v2
      }), V, I + v4, E + P / 2, v2, J, C ? "#fff" : B.green, E + P - J * 0.45);
      v0 = I + v4 * 2 + J * 0.4 + Math.max(0, (+Z.photoDX || 0) * J);
    }
    const v1 = L - (v0 - I) - J * 0.3;
    W(Y, U(Z.agentName), v0, E + P * 0.36, {
      size: Math.min(P * 0.3, J * 1.25),
      weight: 900,
      color: Q,
      maxW: v1
    });
    W(Y, Z.phone, v0, E + P * 0.78, {
      size: Math.min(P * 0.36, J * 1.6),
      weight: 800,
      color: O.phoneColor || B.green,
      maxW: v1
    });
    if (x) {
      const v5 = I + L;
      K.rect(Y, v5, E + P * 0.1, J * 0.06, P * 0.8, C ? "rgba(255,255,255,0.3)" : B.line);
      const v6 = V.lo && V.lo[x.id];
      const v7 = Math.min(P * 0.36, J * 1.3);
      const v8 = v5 + J * 0.4 + v7;
      K.head(Y, v6, v8, E + P / 2, v7, {
        ring: J * 0.08,
        ringColor: C ? "#fff" : B.navy,
        name: x.name
      });
      const v9 = v8 + v7 + J * 0.3;
      const vv = I + T - v9;
      W(Y, Z.lang === "es" ? "FINANCIAMIENTO" : "FINANCING", v9, E + P * 0.3, {
        size: J * 0.36,
        weight: 800,
        color: B.green,
        track: 0.1,
        maxW: vv
      });
      W(Y, x.name, v9, E + P * 0.55, {
        size: Math.min(P * 0.2, J * 0.75),
        weight: 800,
        color: Q,
        maxW: vv
      });
      W(Y, x.phone, v9, E + P * 0.8, {
        size: Math.min(P * 0.2, J * 0.8),
        weight: 800,
        color: Q,
        maxW: vv
      });
    }
  }
  function S(Y, Z, V, I, T, P, O, J, C) {
    const [Q, x] = G(Z, V);
    const L = Z.sub ? V === "es" ? Z.sub.es : Z.sub.en : "";
    let v0 = J;
    const v1 = {
      weight: C.weight || 900,
      track: C.track
    };
    const v2 = K.textW(Y, Q, Object.assign({
      size: v0
    }, v1));
    if (v2 > O) {
      v0 = v0 * O / v2;
    }
    const v3 = v7 => {
      const v8 = Math.max(v7 * 0.26, J * 0.15, 0.3);
      const v9 = L ? K.wrapLines(Y, L, {
        size: v8,
        weight: 700,
        fam: k
      }, O).slice(0, 3) : [];
      return {
        subS: v8,
        subLines: v9,
        total: v7 * 0.74 + (x ? v7 * 0.46 : 0) + (v9.length ? v9.length * v8 * 1.3 + v7 * 0.12 : 0)
      };
    };
    let v4 = v3(v0);
    while (v4.total > P - T && v0 > J * 0.3) {
      v0 *= 0.94;
      v4 = v3(v0);
    }
    let v5 = T + (P - T - v4.total) / 2 + v0 * 0.74;
    const v6 = W(Y, Q, I, v5, {
      size: v0,
      weight: v1.weight,
      color: C.color,
      align: C.align,
      maxW: O,
      track: C.track
    });
    if (x) {
      v5 += v0 * 0.46;
      W(Y, x, I, v5 - v0 * 0.06, {
        size: v0 * 0.36,
        weight: 800,
        color: C.subColor || B.green,
        align: C.align,
        maxW: O,
        track: 0.06
      });
    }
    if (v4.subLines.length) {
      v5 += v0 * 0.12;
      v4.subLines.forEach(v7 => {
        v5 += v4.subS * 1.3;
        W(Y, v7, I, v5 - v4.subS * 0.25, {
          size: v4.subS,
          weight: 700,
          fam: k,
          color: C.subText || C.color,
          align: C.align
        });
      });
    }
    return {
      size: v0,
      bottomY: v5,
      w: v6.w
    };
  }
  function F(Y, Z, V, I, E, T, P) {
    return !!Z.qrOn && !!Z.qrUrl && !(K.qr(Y, Z.qrUrl, V, I, E, T || B.navy, P || "#fff"), 0);
  }
  const A = [{
    id: "signature",
    name: "Signature Navy",
    note: "Navy field, poster diagonal, white contact band.",
    feature: false,
    pal: {
      bg: B.navy,
      fg: "#fff",
      accent: B.green,
      band: "#fff",
      bandFg: B.navy,
      dark: true
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, B.navy);
      K.poly(Y, [[P * 0.78, -1], [P + 1, -1], [P + 1, O * 0.62]], B.navyDeep);
      K.stripe(Y, P * 0.74, -1, P + 1, O * 0.7, T * 0.35, B.green);
      K.logo(Y, I.lockupHRev, T * 1.1, T * 0.95, {
        h: T * 2.2
      });
      S(Y, E, V.lang, T * 1.1, T * 3.5, O - O * 0.3 - T * 0.5, P - T * 2.2 - (V.qrOn && V.qrUrl ? T * 4.4 : 0), T * 4.2, {
        color: "#fff"
      });
      F(Y, V, P - T * 4.6, O * 0.26, T * 3.6);
      const J = O * 0.3;
      K.bleedRect(Y, Z, 0, O - J, P, J, "#fff");
      K.rect(Y, -0.2, O - J, P + 0.4, T * 0.2, B.green);
      D(Y, V, I, T * 1.1, O - J + T * 0.25, P - T * 2.2, J - T * 1.05, {
        u: T,
        photo: false
      });
      q(Y, V, P / 2, O - T * 0.45 - (R(V) ? T * 0.4 : 0), P - T * 2, B.gray, "center", T);
    }
  }, {
    id: "clean",
    name: "Clean White",
    note: "Bright white, navy type, green underline. Most readable from the street.",
    feature: false,
    pal: {
      bg: "#fff",
      fg: B.navy,
      accent: B.green,
      band: B.navy,
      bandFg: "#fff",
      dark: false
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, "#fff");
      const J = V.qrOn && V.qrUrl;
      const y = O * 0.34;
      const C = S(Y, E, V.lang, P / 2 - (J ? T * 2 : 0), T * 0.7, O - y - T * 3.1, P - T * 2.4 - (J ? T * 4.4 : 0), T * 4.4, {
        color: B.navy,
        align: "center",
        subColor: B.gray,
        subText: B.gray
      });
      K.rect(Y, P / 2 - (J ? T * 2 : 0) - T * 2, C.bottomY + T * 0.35, T * 4, T * 0.25, B.green);
      F(Y, V, P - T * 4.4, T * 0.9, T * 3.5);
      K.logo(Y, I.lockupH, P / 2, O - y - T * 2.35, {
        h: T * 1.75,
        align: "center"
      });
      const Q = O * 0.34;
      K.bleedRect(Y, Z, 0, O - Q, P, Q, B.navy);
      D(Y, V, I, T * 1.1, O - Q + T * 0.3, P - T * 2.2, Q - T * 1.1, {
        u: T,
        dark: true
      });
      q(Y, V, P / 2, O - T * 0.45 - (R(V) ? T * 0.4 : 0), P - T * 2, B.soft, "center", T);
    }
  }, {
    id: "bold",
    name: "Bold Status",
    note: "Status on a full green bar. Built for fast traffic.",
    feature: false,
    pal: {
      bg: B.green,
      fg: B.navyDeep,
      accent: B.navy,
      band: B.navy,
      bandFg: "#fff",
      dark: false
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, "#fff");
      const J = O * 0.47;
      K.bleedRect(Y, Z, 0, 0, P, J, B.green);
      K.rect(Y, -0.2, J, P + 0.4, T * 0.22, B.gray);
      S(Y, E, V.lang, P / 2, T * 0.4, J - T * 0.4, P - T * 1.8, T * 5, {
        color: B.navyDeep,
        align: "center",
        subColor: "#fff",
        subText: B.navyDeep
      });
      K.logo(Y, I.lockupH, P - T * 1.1, J + T * 0.6, {
        h: T * 1.7,
        align: "right"
      });
      const y = F(Y, V, T * 1.1, J + T * 0.5, T * 2.6);
      D(Y, V, I, T * 1.1 + (y ? T * 3.1 : 0), J + T * 2.6, P - T * 2.2 - (y ? T * 3.1 : 0), O - J - T * 3.6, {
        u: T
      });
      q(Y, V, P / 2, O - T * 0.45 - (R(V) ? T * 0.4 : 0), P - T * 2, B.gray, "center", T);
    }
  }, {
    id: "headshot",
    name: "Agent Headshot",
    note: "Feature yourself. Portrait panel with status and contact.",
    feature: true,
    pal: {
      bg: B.navy,
      fg: "#fff",
      accent: B.green,
      band: "#fff",
      bandFg: B.navy,
      dark: true
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, "#fff");
      const J = P * 0.36;
      K.portrait(Y, I.headshot, -0.2, -0.2, J + 0.2, O + 0.4, {
        name: V.agentName,
        hint: "YOUR PHOTO"
      });
      K.rect(Y, J, -0.2, T * 0.3, O + 0.4, B.green);
      const C = J + T * 1.1;
      const Q = P - C - T * 0.9;
      const x = O * 0.34;
      K.bleedRect(Y, Z, J + T * 0.3, 0, P - J, x, B.navy);
      S(Y, E, V.lang, C, T * 0.35, x - T * 0.35, Q, T * 3, {
        color: "#fff"
      });
      W(Y, U(V.agentName), C, x + T * 2.2, {
        size: T * 1.5,
        weight: 900,
        color: B.navy,
        maxW: Q
      });
      W(Y, U(V.agentTitle), C, x + T * 3, {
        size: T * 0.5,
        weight: 700,
        color: B.gray,
        track: 0.12,
        maxW: Q
      });
      K.rect(Y, C, x + T * 3.45, T * 3, T * 0.14, B.gray);
      W(Y, V.phone, C, x + T * 5.2, {
        size: T * 1.8,
        weight: 800,
        color: B.green,
        maxW: Q - (V.qrOn && V.qrUrl ? T * 3 : 0)
      });
      F(Y, V, P - T * 3.4, x + T * 3.4, T * 2.6);
      K.logo(Y, I.lockupH, C, O - T * 3.1, {
        h: T * 1.6,
        maxW: Q * 0.55
      });
      if (R(V)) {
        const L = V.lo;
        const v0 = I.lo && I.lo[L.id];
        K.head(Y, v0, C + Q * 0.62 + T * 0.8, O - T * 2.25, T * 0.8, {
          ring: T * 0.06,
          ringColor: B.navy,
          name: L.name
        });
        W(Y, L.name, C + Q * 0.62 + T * 1.8, O - T * 2.4, {
          size: T * 0.55,
          weight: 800,
          color: B.navy,
          maxW: Q * 0.38 - T * 1.8
        });
        W(Y, L.phone, C + Q * 0.62 + T * 1.8, O - T * 1.7, {
          size: T * 0.55,
          weight: 800,
          color: B.navy,
          maxW: Q * 0.38 - T * 1.8
        });
      }
      q(Y, V, C, O - T * 0.55 - (R(V) ? T * 0.4 : 0), Q, B.gray, "left", T);
    }
  }, {
    id: "brandxl",
    name: "Personal Brand XL",
    note: "Feature yourself. Your name and number are the sign.",
    feature: true,
    pal: {
      bg: B.navyDeep,
      fg: "#fff",
      accent: B.green,
      band: B.green,
      bandFg: B.navyDeep,
      dark: true
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, B.navyDeep);
      const J = O * (E.sub ? 0.34 : 0.24);
      K.bleedRect(Y, Z, 0, 0, P, J, B.green);
      S(Y, E, V.lang, P / 2, T * 0.25, J - T * 0.25, P - T * 2, T * 2.6, {
        color: B.navyDeep,
        align: "center",
        subColor: "#fff",
        subText: B.navyDeep
      });
      const C = V.signPhoto;
      const Q = C ? P / 2 + T * 2.6 : P / 2;
      const x = C ? P - T * 7.8 : P - T * 2.4;
      if (C) {
        H(Y, V, I, T * 3.6, J + T * 4.3, T * 2.4, T, B.green, O - T * 3.6);
      }
      W(Y, U(V.agentName), Q, J + T * 3.3, {
        size: T * 2.6,
        weight: 900,
        color: "#fff",
        align: "center",
        maxW: x
      });
      W(Y, V.phone, Q, J + T * 6.3, {
        size: T * 2.4,
        weight: 800,
        color: B.green,
        align: "center",
        maxW: x
      });
      K.logo(Y, I.lockupHRev, T * 1.1, O - T * 3.2, {
        h: T * 1.7
      });
      F(Y, V, P - T * 3.6, O - T * 3.6, T * 2.6);
      if (R(V)) {
        const L = V.lo;
        W(Y, (V.lang === "es" ? "Financiamiento: " : "Financing: ") + L.name + "  " + L.phone, P / 2 + T * 0.6, O - T * 2.1, {
          size: T * 0.5,
          weight: 700,
          color: B.soft,
          align: "center",
          maxW: T * 9
        });
      }
      q(Y, V, P / 2, O - T * 0.5 - (R(V) ? T * 0.4 : 0), P - T * 2, B.soft, "center", T);
    }
  }, {
    id: "diagonal",
    name: "Diagonal Brand",
    note: "The iMath poster angle. Matches the social templates.",
    feature: false,
    pal: {
      bg: "#fff",
      fg: B.navy,
      accent: B.green,
      band: B.navy,
      bandFg: "#fff",
      dark: false
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, "#fff");
      K.poly(Y, [[-1, -1], [P * 0.82, -1], [P * 0.62, O * 0.56], [-1, O * 0.56]], B.navy);
      K.stripe(Y, P * 0.86, -1, P * 0.655, O * 0.6, T * 0.35, B.green);
      K.stripe(Y, P * 0.79, -1, P * 0.59, O * 0.56, T * 0.18, B.gray);
      S(Y, E, V.lang, T * 1.1, T * 0.6, O * 0.52, P * 0.52, T * 3.8, {
        color: "#fff"
      });
      K.logo(Y, I.lockupH, P - T * 0.9, O * 0.4, {
        h: T * 1.5,
        align: "right",
        maxW: P * 0.28
      });
      F(Y, V, P - T * 3.7, T * 1, T * 2.7);
      D(Y, V, I, T * 1.1, O * 0.6, P - T * 2.2, O * 0.28, {
        u: T,
        photo: false
      });
      q(Y, V, P / 2, O - T * 0.45 - (R(V) ? T * 0.4 : 0), P - T * 2, B.gray, "center", T);
    }
  }, {
    id: "split",
    name: "Split Slate",
    note: "Slate gray status panel left, contact right. Balanced and simple.",
    feature: false,
    pal: {
      bg: B.gray,
      fg: "#fff",
      accent: B.green,
      band: "#fff",
      bandFg: B.navy,
      dark: true,
      hi: "#e3f2e1",
      arrow: "#fff"
    },
    panel(Y, Z, V, I, T, P) {
      const {
        W: J,
        H: C
      } = Z;
      const Q = J * 0.5;
      K.bleedRect(Y, Z, 0, 0, J, C, "#fff");
      K.bleedRect(Y, Z, 0, 0, Q, C, B.gray);
      K.rect(Y, Q, -0.2, P * 0.3, C + 0.4, B.green);
      const [x, L] = G(T, V.lang);
      const v0 = x.split(" ");
      const v1 = T.sub ? P * 3.2 : 0;
      const v2 = Math.min(P * 3.6, (C - P * 3 - v1) / (v0.length * 0.95 + (L ? 0.5 : 0)));
      let v3 = (C - v1 - (v0.length * v2 * 0.95 + (L ? v2 * 0.5 : 0))) / 2 + v2 * 0.75;
      v0.forEach(v6 => {
        W(Y, v6, Q / 2, v3, {
          size: v2,
          weight: 900,
          color: "#fff",
          align: "center",
          maxW: Q - P * 1.6
        });
        v3 += v2 * 0.95;
      });
      if (L) {
        W(Y, L, Q / 2, v3 - v2 * 0.35, {
          size: v2 * 0.32,
          weight: 800,
          color: "#e3f2e1",
          align: "center",
          maxW: Q - P * 1.6
        });
      }
      if (T.sub) {
        K.para(Y, V.lang === "es" ? T.sub.es : T.sub.en, Q / 2, C - v1 + P * 0.2, Q - P * 1.4, {
          size: P * 0.62,
          weight: 700,
          fam: k,
          color: "#fff",
          align: "center"
        }, P * 0.8, 3);
      }
      const v4 = Q + P * 1;
      const v5 = J - v4 - P * 0.9;
      K.logo(Y, I.lockupH, v4 + v5 / 2, P * 1, {
        w: Math.min(v5, P * 9),
        align: "center"
      });
      if (V.signPhoto) {
        H(Y, V, I, v4 + v5 / 2, P * 5.85, P * 2.1, P, B.green, C * 0.52 - P * 1.3);
      }
      W(Y, U(V.agentName), v4 + v5 / 2, C * 0.52, {
        size: P * 1.3,
        weight: 900,
        color: B.navy,
        align: "center",
        maxW: v5
      });
      W(Y, V.phone, v4 + v5 / 2, C * 0.52 + P * 2, {
        size: P * 1.6,
        weight: 800,
        color: B.green,
        align: "center",
        maxW: v5
      });
      if (R(V)) {
        const v6 = V.lo;
        W(Y, (V.lang === "es" ? "FINANCIAMIENTO: " : "FINANCING: ") + v6.name, v4 + v5 / 2, C * 0.52 + P * 3.2, {
          size: P * 0.55,
          weight: 800,
          color: B.navy,
          align: "center",
          maxW: v5
        });
        W(Y, v6.phone, v4 + v5 / 2, C * 0.52 + P * 3.95, {
          size: P * 0.55,
          weight: 700,
          color: B.navy,
          align: "center",
          maxW: v5
        });
      } else {
        F(Y, V, v4 + v5 / 2 - P * 1.3, C * 0.52 + P * 2.6, P * 2.6);
      }
      q(Y, V, v4 + v5 / 2, C - P * 0.5 - (R(V) ? P * 0.4 : 0), v5, B.gray, "center", P);
    }
  }, {
    id: "luxe",
    name: "Dark Luxe",
    note: "Night navy, light tracked type. For upscale listings.",
    feature: false,
    pal: {
      bg: B.night,
      fg: "#fff",
      accent: B.green,
      band: B.night,
      bandFg: "#fff",
      dark: true,
      light: true
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, B.night);
      K.rect(Y, T * 0.8, T * 0.8, P - T * 1.6, O - T * 1.6, "rgba(0,0,0,0)");
      K.rrect(Y, T * 0.7, T * 0.7, P - T * 1.4, O - T * 1.4, 0, null, "rgba(107,192,99,0.8)", T * 0.08);
      K.logo(Y, I.lockupHRev, P / 2, T * 1.5, {
        h: T * 1.7,
        align: "center"
      });
      const J = S(Y, E, V.lang, P / 2, T * 3.6, O * 0.58, P - T * 3, T * 2.9, {
        color: "#fff",
        align: "center",
        weight: 400,
        track: 0.2
      });
      K.rect(Y, P / 2 - T * 1.5, Math.max(J.bottomY + T * 0.35, O * 0.585), T * 3, T * 0.12, B.green);
      W(Y, U(V.agentName), P / 2, O * 0.7, {
        size: T * 1,
        weight: 400,
        color: "#fff",
        align: "center",
        track: 0.24,
        maxW: P - T * 3
      });
      W(Y, V.phone, P / 2, O * 0.7 + T * 1.6, {
        size: T * 1.2,
        weight: 600,
        color: B.green,
        align: "center",
        track: 0.1
      });
      F(Y, V, P - T * 3.9, O - T * 3.9, T * 2.4);
      if (V.signPhoto) {
        H(Y, V, I, T * 3.2, O - T * 3.4, T * 1.6, T, B.green, O - T * 1.6);
      }
      if (R(V)) {
        W(Y, (V.lang === "es" ? "Financiamiento: " : "Financing: ") + V.lo.name + "  " + V.lo.phone, P / 2, O * 0.7 + T * 2.5, {
          size: T * 0.5,
          weight: 600,
          color: B.soft,
          align: "center",
          maxW: P - T * 8
        });
      }
      q(Y, V, P / 2, O - T * 1.1 - (R(V) ? T * 0.4 : 0), P - T * 8.5, B.soft, "center", T);
    }
  }, {
    id: "qr",
    name: "QR Forward",
    note: "A big scan target for photos, price, and showings.",
    feature: false,
    pal: {
      bg: "#fff",
      fg: B.navy,
      accent: B.green,
      band: B.navy,
      bandFg: "#fff",
      dark: false
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, "#fff");
      const J = O * (E.sub || G(E, V.lang)[1] ? 0.36 : 0.3);
      K.bleedRect(Y, Z, 0, 0, P, J, B.navy);
      K.rect(Y, -0.2, J, P + 0.4, T * 0.22, B.gray);
      S(Y, E, V.lang, T * 1.1, T * 0.3, J - T * 0.3, P - T * 2.2, T * 3.4, {
        color: "#fff"
      });
      const C = O - J - T * 2.5;
      const Q = P - T * 1 - C;
      K.rrect(Y, Q - T * 0.25, J + T * 0.55, C + T * 0.5, C + T * 0.5, T * 0.4, B.green);
      if (!F(Y, V, Q, J + T * 0.8, C)) {
        K.rect(Y, Q, J + T * 0.8, C, C, "#fff");
        W(Y, "ADD QR LINK", Q + C / 2, J + T * 0.8 + C / 2, {
          size: T * 0.6,
          weight: 800,
          color: B.gray,
          align: "center"
        });
      }
      W(Y, V.lang === "es" ? "ESCANEE PARA FOTOS Y PRECIO" : "SCAN FOR PHOTOS AND PRICE", T * 1.1, J + T * 1.9, {
        size: T * 0.9,
        weight: 900,
        color: B.green,
        maxW: Q - T * 2
      });
      W(Y, U(V.agentName), T * 1.1, J + T * 3.9, {
        size: T * 1.3,
        weight: 900,
        color: B.navy,
        maxW: Q - T * 2
      });
      W(Y, V.phone, T * 1.1, J + T * 5.8, {
        size: T * 1.6,
        weight: 800,
        color: B.navy,
        maxW: Q - T * 2
      });
      K.logo(Y, I.lockupH, T * 1.1, O - T * 3.2, {
        h: T * 1.6,
        maxW: Q - T * 2
      });
      if (V.signPhoto) {
        H(Y, V, I, Q - T * 2.4, O - T * 2.5, T * 1.5, T, B.green, O - T * 1);
      }
      if (R(V)) {
        W(Y, (V.lang === "es" ? "Financiamiento: " : "Financing: ") + V.lo.name + "  " + V.lo.phone, T * 1.1, J + T * 7, {
          size: T * 0.5,
          weight: 700,
          color: B.gray,
          maxW: Q - T * 2
        });
      }
      q(Y, V, T * 1.1, O - T * 0.5 - (R(V) ? T * 0.4 : 0), P - T * 2.2, B.gray, "left", T);
    }
  }, {
    id: "coastal",
    name: "Coastal Clean",
    note: "Soft mist field with river lines. Friendly and local.",
    feature: false,
    pal: {
      bg: B.mist,
      fg: B.navy,
      accent: B.green,
      band: "#fff",
      bandFg: B.navy,
      dark: false,
      waves: true
    },
    panel(Y, Z, V, I, E, T) {
      const {
        W: P,
        H: O
      } = Z;
      K.bleedRect(Y, Z, 0, 0, P, O, B.mist);
      X(Y, P, 0, T);
      K.logo(Y, I.lockupH, T * 1.1, T * 1, {
        h: T * 1.8
      });
      S(Y, E, V.lang, T * 1.1, T * 3.2, O - O * 0.33 - T * 0.4, P - T * 2.2 - (V.qrOn && V.qrUrl ? T * 3.8 : 0), T * 4, {
        color: B.navy
      });
      F(Y, V, P - T * 4, T * 0.9, T * 3);
      const J = O * 0.33;
      K.bleedRect(Y, Z, 0, O - J, P, J, "#fff");
      K.rect(Y, -0.2, O - J, P + 0.4, T * 0.15, B.green);
      D(Y, V, I, T * 1.1, O - J + T * 0.3, P - T * 2.2, J - T * 1.1, {
        u: T,
        photo: false
      });
      q(Y, V, P / 2, O - T * 0.45 - (R(V) ? T * 0.4 : 0), P - T * 2, B.gray, "center", T);
    }
  }];
  function X(Y, Z, V, I) {
    Y.save();
    Y.strokeStyle = "rgba(98,102,106,0.14)";
    Y.lineWidth = I * 0.08;
    for (let E = 0; E < 10; E++) {
      Y.beginPath();
      for (let T = -1; T <= Z + 1; T += 0.3) {
        const P = 1 + E * 1.6 * I + Math.sin(T / (I * 3.5) + E * 0.6) * 0.9 * I;
        if (T === -1) {
          Y.moveTo(T, P);
        } else {
          Y.lineTo(T, P);
        }
      }
      Y.stroke();
    }
    Y.restore();
  }
  v.iMathSigns = {
    PHOTO_ALWAYS: ["headshot"],
    FAM: A,
    STATUS: z,
    RIDERS: M,
    PANEL_ORDER: ["for_sale", "coming_soon", "open_house", "under_contract", "sold", "for_lease", "renovate", "less_down"],
    RIDER_ORDER: ["open_house", "coming_soon", "under_contract", "sold", "new_price", "pool", "waterfront", "se_habla", "agent", "scan", "renovate", "less_down", "dpa", "low_down"],
    PIECES: j,
    draw: function (Y, Z, V, I, T, P, J) {
      const C = A.find(v1 => v1.id === Z) || A[0];
      const [Q, x] = j[V] || j.panel;
      const L = K.makePage(Y, Q, x, J || 100);
      const v0 = L.ctx;
      if (V === "rider") {
        (function (v1, v2, v3, v4, v5, v6) {
          const {
            W: v7,
            H: v8
          } = v2;
          const v9 = M[v6];
          const vv = v5.pal;
          K.bleedRect(v1, v2, 0, 0, v7, v8, vv.bg);
          if (vv.waves) {
            X(v1, v7, 0, 0.6);
          }
          K.rect(v1, -0.2, v8 - 0.35, v7 + 0.4, 0.55, vv.accent === B.navy ? B.navy : B.green);
          const vK = vv.fg;
          const vr = vv.dark ? B.soft : B.gray;
          const vl = vv.light;
          const vB = vv.hi || B.green;
          if (v9.agent) {
            let vn = 0.8;
            if (v3.signPhoto) {
              const vM = Math.min(N(v3) * 2.3, 2.7);
              K.head(v1, v4.headshot, 0.7 + vM, v8 * 0.47, vM, {
                ring: 0.1,
                ringColor: B.green,
                name: v3.agentName
              });
              vn = 0.7 + vM * 2 + 0.5;
            }
            const vz = W(v1, v3.phone, v7 - 0.8, v8 * 0.55, {
              size: 1.9,
              weight: 800,
              color: vv.dark ? vB : B.navy,
              align: "right",
              maxW: v7 * 0.36
            });
            W(v1, U(v3.agentName), vn, v8 * 0.55, {
              size: 1.9,
              weight: vl ? 400 : 900,
              color: vK,
              maxW: v7 - vn - 0.8 - vz.w - 1,
              track: vl ? 0.12 : 0
            });
            return;
          }
          if (v9.qr) {
            const vG = v3.qrOn && v3.qrUrl;
            if (vG) {
              K.qr(v1, v3.qrUrl, v7 - 0.6 - 4.6, 0.35, 4.6, B.navy, "#fff");
            }
            const [vR, vj] = G(v9, v3.lang);
            W(v1, vR, 0.8, vj ? v8 * 0.46 : v8 * 0.6, {
              size: 1.8,
              weight: 900,
              color: vK,
              maxW: v7 - (vG ? 6.4 : 1.6)
            });
            if (vj) {
              W(v1, vj, 0.8, v8 * 0.78, {
                size: 0.8,
                weight: 800,
                color: vB,
                maxW: v7 - 6.4
              });
            }
            return;
          }
          const [vk, vg] = G(v9, v3.lang);
          const vd = v9.lo && R(v3) ? v3.lo : null;
          if (v9.lo && !vd) {
            W(v1, vk, v7 / 2, v8 * 0.5, {
              size: 1.4,
              weight: 900,
              color: vK,
              align: "center",
              maxW: v7 - 1.6
            });
            W(v1, v3.lang === "es" ? "Seleccione un oficial de préstamos para usar esta pieza" : "Select a loan officer to use this rider", v7 / 2, v8 * 0.78, {
              size: 0.55,
              weight: 700,
              color: "#c2463b",
              align: "center"
            });
            return;
          }
          const vW = vd ? v7 * 0.64 : v7 - 1.6;
          const vi = vd ? 0.8 + vW / 2 : v7 / 2;
          const vU = vg || v9.sub ? 1.6 : 2.4;
          W(v1, vk, vi, vg || v9.sub ? v8 * 0.42 : v8 * 0.62, {
            size: vU,
            weight: vl ? 400 : 900,
            color: vK,
            align: "center",
            maxW: vW,
            track: vl ? 0.14 : 0
          });
          if (vg) {
            W(v1, vg, vi, v8 * 0.73, {
              size: 0.75,
              weight: 800,
              color: vB,
              align: "center",
              maxW: vW
            });
          } else if (v9.sub) {
            W(v1, v3.lang === "es" ? v9.sub.es : v9.sub.en, vi, v8 * 0.72, {
              size: 0.62,
              weight: 700,
              fam: k,
              color: vr,
              align: "center",
              maxW: vW
            });
          }
          if (vd) {
            const vc = v7 * 0.68;
            K.rect(v1, vc, 0.5, 0.06, v8 - 1.3, vv.dark ? "rgba(255,255,255,0.3)" : B.line);
            W(v1, vd.name, vc + 0.4, 1.35, {
              size: 0.62,
              weight: 800,
              color: vK,
              maxW: v7 - vc - 0.8
            });
            W(v1, vd.phone, vc + 0.4, 2.3, {
              size: 0.75,
              weight: 800,
              color: vv.dark ? vB : B.navy,
              maxW: v7 - vc - 0.8
            });
            W(v1, "NMLS #" + vd.nmls + "  |  Cornerstone First Mortgage", vc + 0.4, 3.05, {
              size: 0.3,
              weight: 600,
              fam: k,
              color: vr,
              maxW: v7 - vc - 0.8
            });
            W(v1, "NMLS #173855  |  FL MLD1510  |  Equal Housing Lender", vc + 0.4, 3.5, {
              size: 0.3,
              weight: 600,
              fam: k,
              color: vr,
              maxW: v7 - vc - 0.8
            });
            W(v1, "iMath Group powered by Cornerstone First Mortgage", vc + 0.4, 3.95, {
              size: 0.3,
              weight: 600,
              fam: k,
              color: vr,
              maxW: v7 - vc - 0.8
            });
            if (window.iMathTheme && window.iMathTheme.on) {
              W(v1, window.iMathTheme.VA, vc + 0.4, 4.4, {
                size: 0.26,
                weight: 600,
                fam: k,
                color: vr,
                maxW: v7 - vc - 0.8
              });
            }
          }
        })(v0, L, T, P, C, I);
      } else if (V === "directional") {
        (function (v1, v2, v3, v4, v5, v6, v7) {
          const {
            W: v8,
            H: v9
          } = v2;
          const vv = v5.pal;
          K.bleedRect(v1, v2, 0, 0, v8, v9, vv.bg);
          if (vv.waves) {
            X(v1, v8, 0, 1);
          }
          const vK = z[v7] || z.open_house;
          const vr = vv.fg;
          const vl = vv.hi || B.green;
          const [vB, vk] = G(vK, v3.lang);
          W(v1, vB, v8 / 2, 4.2, {
            size: 3.4,
            weight: vv.light ? 400 : 900,
            color: vr,
            align: "center",
            maxW: v8 - 2,
            track: vv.light ? 0.16 : 0
          });
          if (vk) {
            W(v1, vk, v8 / 2, 5.5, {
              size: 1.1,
              weight: 800,
              color: vl,
              align: "center"
            });
          }
          if (v3.dirNote) {
            W(v1, U(v3.dirNote), v8 / 2, vk ? 6.9 : 5.9, {
              size: 1.1,
              weight: 800,
              color: vv.dark ? vl : B.navy,
              align: "center",
              maxW: v8 - 2
            });
          }
          const vg = 10.9;
          const vd = 16;
          const vW = (v8 - vd) / 2;
          const vi = vv.dark ? vv.arrow || vl : B.navy;
          v1.save();
          v1.fillStyle = vi;
          v1.beginPath();
          if (v6 === "left") {
            v1.moveTo(vW, vg);
            v1.lineTo(vW + 3.74, 7.5);
            v1.lineTo(vW + 3.74, vg - 1.53);
            v1.lineTo(vW + vd, vg - 1.53);
            v1.lineTo(vW + vd, 12.43);
            v1.lineTo(vW + 3.74, 12.43);
            v1.lineTo(vW + 3.74, 14.3);
          } else {
            v1.moveTo(vW + vd, vg);
            v1.lineTo(vW + vd - 3.74, 7.5);
            v1.lineTo(vW + vd - 3.74, vg - 1.53);
            v1.lineTo(vW, vg - 1.53);
            v1.lineTo(vW, 12.43);
            v1.lineTo(vW + vd - 3.74, 12.43);
            v1.lineTo(vW + vd - 3.74, 14.3);
          }
          v1.closePath();
          v1.fill();
          v1.restore();
          const vU = 3.4;
          K.bleedRect(v1, v2, 0, v9 - vU, v8, vU, vv.dark ? "#fff" : B.navy);
          K.rect(v1, -0.2, v9 - vU, v8 + 0.4, 0.2, B.green);
          K.logo(v1, vv.dark ? v4.lockupH : v4.lockupHRev, 1, v9 - vU + 0.55, {
            h: 1.6
          });
          W(v1, v3.phone, v8 - 1, v9 - vU + 1.85, {
            size: 1.2,
            weight: 800,
            color: vv.dark ? B.navy : "#fff",
            align: "right",
            maxW: 9
          });
          q(v1, v3, v8 / 2, v9 - 0.4 - (R(v3) ? 0.4 : 0), v8 - 2, vv.dark ? B.gray : B.soft, "center", 1);
        })(v0, L, T, P, C, I === "left" ? "left" : "right", T.dirStatus || "open_house");
      } else {
        const v1 = x / 18;
        let v2 = z[I] || z.for_sale;
        if (v2.lo && !R(T)) {
          v2 = Object.assign({}, v2, {
            sub: {
              en: "Select a loan officer to use this sign",
              es: "Seleccione un oficial de préstamos"
            }
          });
        }
        C.panel(v0, L, T, P, v2, v1);
      }
      return {
        w: Q,
        h: x
      };
    }
  };
})(typeof window != "undefined" ? window : globalThis);
