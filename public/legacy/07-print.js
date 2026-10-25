/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (y) {
  const A = {
    navy: "#002e5e",
    navyDeep: "#001a36",
    ink: "#0b2340",
    green: "#6bc063",
    greenLogo: "#64b35c",
    gray: "#62666a",
    mist: "#f2f5f9",
    soft: "#c9d6e4",
    line: "#d7e0ea",
    white: "#ffffff",
    cyan: "#27a7df",
    night: "#07182d"
  };
  const V = "Montserrat, \"Arial Black\", Arial, sans-serif";
  const P = "\"Open Sans\", Arial, sans-serif";
  function F(E, S, M, Z) {
    E.font = S + " " + M + "px " + (Z || V);
  }
  function U(E, S, M, Z, j) {
    j = j || {};
    S = String(S == null ? "" : S);
    const v = j.size || 0.2;
    const J = 100;
    E.save();
    E.translate(M, Z);
    E.scale(1 / J, 1 / J);
    F(E, j.weight || 700, v * J, j.fam);
    E.fillStyle = j.color || A.ink;
    E.textBaseline = j.baseline || "alphabetic";
    let k = q(E, S, (j.track || 0) * v * J);
    let w = v;
    if (j.maxW && k / J > j.maxW) {
      w = v * (j.maxW / (k / J));
      if (j.minSize && w < j.minSize) {
        w = j.minSize;
      }
      F(E, j.weight || 700, w * J, j.fam);
      k = q(E, S, (j.track || 0) * w * J);
    }
    let R = j.align === "center" ? -k / 2 : j.align === "right" ? -k : 0;
    if (j.track) {
      const z = (j.track || 0) * w * J;
      for (const D of S) {
        E.fillText(D, R, 0);
        R += E.measureText(D).width + z;
      }
    } else {
      E.textAlign = "left";
      E.fillText(S, R, 0);
    }
    E.restore();
    return {
      w: k / J,
      size: w
    };
  }
  function q(E, S, M) {
    if (!M) {
      return E.measureText(S).width;
    }
    let Z = 0;
    const j = [...S];
    j.forEach(v => Z += E.measureText(v).width);
    return Z + M * (j.length - 1);
  }
  function N(E, S, M) {
    E.save();
    F(E, M.weight || 700, (M.size || 0.2) * 100, M.fam);
    const Z = q(E, String(S), (M.track || 0) * (M.size || 0.2) * 100) / 100;
    E.restore();
    return Z;
  }
  function I(E, S, M, Z) {
    const j = String(S || "").split(/\s+/).filter(Boolean);
    const v = [];
    let J = "";
    for (const k of j) {
      const w = J ? J + " " + k : k;
      if (N(E, w, M) > Z && J) {
        v.push(J);
        J = k;
      } else {
        J = w;
      }
    }
    if (J) {
      v.push(J);
    }
    return v;
  }
  function B(E, S, M, Z, j, v) {
    E.fillStyle = v;
    E.fillRect(S, M, Z, j);
  }
  function b(E, S, M, Z, j, v, J, k, w) {
    E.beginPath();
    if (E.roundRect) {
      E.roundRect(S, M, Z, j, v);
    } else {
      E.rect(S, M, Z, j);
    }
    if (J) {
      E.fillStyle = J;
      E.fill();
    }
    if (k) {
      E.strokeStyle = k;
      E.lineWidth = w || 0.01;
      E.stroke();
    }
  }
  function G(E, S, M, Z, j, v, J) {
    E.save();
    E.strokeStyle = J;
    E.lineWidth = v;
    E.lineCap = "butt";
    E.beginPath();
    E.moveTo(S, M);
    E.lineTo(Z, j);
    E.stroke();
    E.restore();
  }
  function L(E, S, M, Z, j) {
    E.beginPath();
    E.arc(S, M, Z, 0, Math.PI * 2);
    E.fillStyle = j;
    E.fill();
  }
  function Y(E, S, M, Z, j, v) {
    const J = E.createLinearGradient(S, M, Z, j);
    v.forEach(k => J.addColorStop(k[0], k[1]));
    return J;
  }
  function W(E, S, M, Z, j, v, J) {
    const k = Math.max(j / S.width, v / S.height);
    const w = S.width * k;
    const R = S.height * k;
    const z = J == null ? (v - R) / 2 : (v - R) * J;
    E.drawImage(S, M + (j - w) / 2, Z + z, w, R);
  }
  function C(E) {
    return String(E || "").split(/\s+/).filter(Boolean).slice(0, 2).map(S => S[0].toUpperCase()).join("") || "iM";
  }
  function H(E, S, M, Z, j, v) {
    E.save();
    E.strokeStyle = v;
    E.fillStyle = v;
    E.lineWidth = j * 0.11;
    E.lineJoin = "round";
    E.lineCap = "round";
    const J = w => M + w * j;
    const k = w => Z + w * j;
    E.beginPath();
    if (S === "phone") {
      E.moveTo(J(0.28), k(0.08));
      E.lineTo(J(0.42), k(0.3));
      E.lineTo(J(0.33), k(0.4));
      E.quadraticCurveTo(J(0.45), k(0.62), J(0.6), k(0.68));
      E.lineTo(J(0.7), k(0.58));
      E.lineTo(J(0.92), k(0.72));
      E.lineTo(J(0.82), k(0.9));
      E.quadraticCurveTo(J(0.2), k(0.85), J(0.1), k(0.2));
      E.closePath();
      E.fill();
    } else if (S === "mail") {
      E.rect(J(0.06), k(0.2), j * 0.88, j * 0.6);
      E.stroke();
      E.beginPath();
      E.moveTo(J(0.08), k(0.24));
      E.lineTo(J(0.5), k(0.56));
      E.lineTo(J(0.92), k(0.24));
      E.stroke();
    } else if (S === "web") {
      E.arc(J(0.5), k(0.5), j * 0.42, 0, Math.PI * 2);
      E.stroke();
      E.beginPath();
      E.ellipse(J(0.5), k(0.5), j * 0.17, j * 0.42, 0, 0, Math.PI * 2);
      E.stroke();
      E.beginPath();
      E.moveTo(J(0.08), k(0.5));
      E.lineTo(J(0.92), k(0.5));
      E.stroke();
    } else if (S === "social") {
      b(E, J(0.08), k(0.08), j * 0.84, j * 0.84, j * 0.24, null, v, j * 0.11);
      E.beginPath();
      E.arc(J(0.5), k(0.5), j * 0.2, 0, Math.PI * 2);
      E.stroke();
      L(E, J(0.73), k(0.27), j * 0.06, v);
    } else if (S === "pin") {
      E.arc(J(0.5), k(0.38), j * 0.3, Math.PI * 0.85, Math.PI * 2.15);
      E.lineTo(J(0.5), k(0.95));
      E.closePath();
      E.fill();
      L(E, J(0.5), k(0.38), j * 0.11, "#fff");
    } else if (S === "clock") {
      E.arc(J(0.5), k(0.5), j * 0.42, 0, Math.PI * 2);
      E.stroke();
      E.beginPath();
      E.moveTo(J(0.5), k(0.25));
      E.lineTo(J(0.5), k(0.5));
      E.lineTo(J(0.7), k(0.62));
      E.stroke();
    }
    E.restore();
  }
  y.iMathPrint = {
    C: A,
    HF: V,
    BF: P,
    BLEED: 0.125,
    SAFE: 0.125,
    LO: [{
      id: "none",
      name: "No loan officer",
      short: "None"
    }],
    T: {
      en: {
        licensed: "Licensed Real Estate Broker",
        eho: "Equal Housing Opportunity",
        ehl: "Equal Housing Lender",
        scan: "SCAN FOR PHOTOS AND DETAILS",
        scanShort: "SCAN ME",
        beds: "Beds",
        baths: "Baths",
        sqft: "Sq Ft",
        offered: "Offered at",
        openHouse: "OPEN HOUSE",
        financing: "FINANCING AVAILABLE THROUGH",
        listedBy: "PRESENTED BY",
        hosted: "HOSTED BY",
        addPhoto: "ADD LISTING PHOTO"
      },
      es: {
        licensed: "Corredor de bienes raíces",
        eho: "Igualdad de oportunidades en la vivienda",
        ehl: "Prestamista de igualdad de vivienda",
        scan: "ESCANEE PARA FOTOS Y DETALLES",
        scanShort: "ESCANEE",
        beds: "Hab.",
        baths: "Baños",
        sqft: "Pies²",
        offered: "Precio",
        openHouse: "CASA ABIERTA",
        financing: "FINANCIAMIENTO DISPONIBLE CON",
        listedBy: "PRESENTADO POR",
        hosted: "LE ATIENDE",
        addPhoto: "AGREGUE FOTO"
      }
    },
    reFine: function (E, S) {
      const M = E.agentName || "Agent";
      const Z = M + " is a licensed real estate sales associate with United Real Estate Gallery (Rayson Partners, LLC), Florida real estate brokerage license CQ1066513. iMath Group is a team at United Real Estate Gallery. Information deemed reliable but not guaranteed. Equal Housing Opportunity.";
      const j = M + " es asociado de ventas de bienes raíces con licencia en United Real Estate Gallery (Rayson Partners, LLC), licencia de corredor de Florida CQ1066513. iMath Group es un equipo de United Real Estate Gallery. Información confiable pero no garantizada. Igualdad de oportunidades en la vivienda.";
      if (S === "es") {
        return j;
      } else if (S === "both") {
        return Z + " " + j;
      } else {
        return Z;
      }
    },
    loFine: function (E, S) {
      if (!E || E.id === "none") {
        return "";
      }
      const M = "Mortgage services: " + E.name + ", NMLS #" + E.nmls + ". Cornerstone First Mortgage, NMLS #173855, Florida Mortgage Lender License MLD1510. iMath Group is powered by Cornerstone First Mortgage. Equal Housing Lender. This is not a commitment to lend. All loans are subject to credit approval, underwriting guidelines, and program availability; terms may change without notice. United Real Estate Gallery and Cornerstone First Mortgage are separate companies, and you are not required to use any particular lender.";
      const Z = "Servicios hipotecarios: " + E.name + ", NMLS #" + E.nmls + ". Cornerstone First Mortgage, NMLS #173855, licencia de prestamista hipotecario de Florida MLD1510. iMath Group es impulsado por Cornerstone First Mortgage. Prestamista de igualdad de vivienda. Esto no es un compromiso de préstamo. Todo préstamo está sujeto a aprobación de crédito, guías de suscripción y disponibilidad del programa; los términos pueden cambiar sin aviso. United Real Estate Gallery y Cornerstone First Mortgage son compañías separadas y usted no está obligado a usar un prestamista en particular.";
      return (S === "es" ? Z : S === "both" ? M + " " + Z : M) + (window.iMathTheme ? window.iMathTheme.va() : "");
    },
    loShort: function (E) {
      if (E && E.id !== "none") {
        return E.name + " NMLS #" + E.nmls + "  |  Cornerstone First Mortgage NMLS #173855  |  FL MLD1510  |  Equal Housing Lender" + (window.iMathTheme && window.iMathTheme.on ? "  |  " + window.iMathTheme.VA : "");
      } else {
        return "";
      }
    },
    text: U,
    textW: N,
    fitSize: function (E, S, M, Z) {
      const j = N(E, S, M);
      if (j > Z) {
        return M.size * Z / j;
      } else {
        return M.size;
      }
    },
    wrapLines: I,
    para: function (E, S, M, Z, j, v, J, k) {
      let w = I(E, S, v, j);
      if (k && w.length > k) {
        w = w.slice(0, k);
        w[k - 1] = w[k - 1].replace(/\s*\S*$/, "") + "…";
      }
      w.forEach((R, z) => U(E, R, M, Z + z * J, Object.assign({}, v, {
        align: v.align
      })));
      return w.length * J;
    },
    rect: B,
    rrect: b,
    poly: function (E, S, M) {
      E.beginPath();
      E.moveTo(S[0][0], S[0][1]);
      for (let Z = 1; Z < S.length; Z++) {
        E.lineTo(S[Z][0], S[Z][1]);
      }
      E.closePath();
      E.fillStyle = M;
      E.fill();
    },
    line: G,
    dot: L,
    grad: Y,
    cover: W,
    photo: function (E, S, M, Z, j, v, J, k) {
      E.save();
      E.beginPath();
      E.rect(M, Z, j, v);
      E.clip();
      if (S) {
        W(E, S, M, Z, j, v, k);
      } else {
        E.fillStyle = Y(E, M, Z, M + j, Z + v, [[0, "#a9bccf"], [0.55, "#6f89a5"], [1, "#3f5a78"]]);
        E.fillRect(M, Z, j, v);
        E.globalAlpha = 0.08;
        E.strokeStyle = "#fff";
        E.lineWidth = Math.min(j, v) * 0.004;
        const w = Math.min(j, v) * 0.06;
        for (let K = -v; K < j; K += w) {
          E.beginPath();
          E.moveTo(M + K, Z + v);
          E.lineTo(M + K + v, Z);
          E.stroke();
        }
        E.globalAlpha = 1;
        const R = M + j / 2;
        const z = Z + v * 0.44;
        const D = Math.min(j, v) * 0.13;
        E.strokeStyle = "rgba(255,255,255,0.9)";
        E.lineWidth = D * 0.07;
        E.lineJoin = "round";
        E.beginPath();
        E.moveTo(R - D, z);
        E.lineTo(R, z - D * 0.8);
        E.lineTo(R + D, z);
        E.moveTo(R - D * 0.75, z - D * 0.15);
        E.lineTo(R - D * 0.75, z + D * 0.75);
        E.lineTo(R + D * 0.75, z + D * 0.75);
        E.lineTo(R + D * 0.75, z - D * 0.15);
        E.stroke();
        E.strokeRect(R - D * 0.18, z + D * 0.3, D * 0.36, D * 0.45);
        if (J) {
          U(E, J, R, z + D * 1.45, {
            size: Math.max(D * 0.24, 0.05),
            weight: 700,
            color: "rgba(255,255,255,0.92)",
            align: "center",
            track: 0.12
          });
        }
      }
      E.restore();
    },
    head: function (E, S, M, Z, j, v) {
      v = v || {};
      E.save();
      if (v.ring) {
        L(E, M, Z, j + v.ring, v.ringColor || A.green);
      }
      E.beginPath();
      E.arc(M, Z, j, 0, Math.PI * 2);
      E.clip();
      if (S && S.__cut) {
        E.fillStyle = Y(E, M, Z - j, M, Z + j, [[0, "#1d5b93"], [1, A.navy]]);
        E.fillRect(M - j, Z - j, j * 2, j * 2);
        E.drawImage(S, M - j * 1.02, Z - j * 1, j * 2.04, j * 2.04);
      } else if (S) {
        W(E, S, M - j, Z - j, j * 2, j * 2, 0.25);
      } else {
        E.fillStyle = v.bg || A.navyDeep;
        E.fillRect(M - j, Z - j, j * 2, j * 2);
        U(E, C(v.name), M, Z + j * 0.27, {
          size: j * 0.78,
          weight: 800,
          color: "#fff",
          align: "center"
        });
      }
      E.restore();
    },
    portrait: function (E, S, M, Z, j, v, J) {
      J = J || {};
      E.save();
      E.beginPath();
      E.rect(M, Z, j, v);
      E.clip();
      if (S && S.__cut) {
        E.fillStyle = Y(E, M, Z, M, Z + v, [[0, "#2a6aa3"], [1, A.navy]]);
        E.fillRect(M, Z, j, v);
        const k = Math.max(j, v * 0.95);
        E.drawImage(S, M + (j - k) / 2, Z + v - k, k, k);
      } else if (S) {
        W(E, S, M, Z, j, v, 0.22);
      } else {
        E.fillStyle = Y(E, M, Z, M, Z + v, [[0, "#24598b"], [1, A.navyDeep]]);
        E.fillRect(M, Z, j, v);
        U(E, C(J.name), M + j / 2, Z + v * 0.56, {
          size: Math.min(j, v) * 0.34,
          weight: 800,
          color: "rgba(255,255,255,0.9)",
          align: "center"
        });
        if (J.hint) {
          U(E, J.hint, M + j / 2, Z + v * 0.7, {
            size: Math.min(j, v) * 0.045,
            weight: 700,
            color: "rgba(255,255,255,0.75)",
            align: "center",
            track: 0.12
          });
        }
      }
      E.restore();
    },
    logo: function (E, S, M, Z, j) {
      if (!S) {
        return {
          w: 0,
          h: 0
        };
      }
      let v = j.h;
      let J = j.w;
      if (v && !J) {
        J = S.width * v / S.height;
      } else if (J && !v) {
        v = S.height * J / S.width;
      }
      if (j.maxW && J > j.maxW) {
        J = j.maxW;
        v = S.height * J / S.width;
      }
      const k = j.align === "center" ? M - J / 2 : j.align === "right" ? M - J : M;
      E.drawImage(S, k, Z, J, v);
      return {
        w: J,
        h: v
      };
    },
    eho: function (E, S, M, Z, j) {
      E.save();
      E.strokeStyle = j;
      E.fillStyle = j;
      E.lineWidth = Z * 0.1;
      E.beginPath();
      E.moveTo(S, M + Z * 0.45);
      E.lineTo(S + Z * 0.5, M);
      E.lineTo(S + Z, M + Z * 0.45);
      E.lineTo(S + Z * 0.85, M + Z * 0.45);
      E.lineTo(S + Z * 0.85, M + Z);
      E.lineTo(S + Z * 0.15, M + Z);
      E.lineTo(S + Z * 0.15, M + Z * 0.45);
      E.closePath();
      E.stroke();
      E.fillRect(S + Z * 0.32, M + Z * 0.52, Z * 0.36, Z * 0.09);
      E.fillRect(S + Z * 0.32, M + Z * 0.72, Z * 0.36, Z * 0.09);
      E.restore();
    },
    icon: H,
    contactRows: function (E, S, M, Z, j) {
      const v = (j.items || ["phone", "email", "web", "social"]).map(R => ({
        k: R,
        v: R === "phone" ? S.phone : R === "email" ? S.email : R === "web" ? S.website : R === "address" ? S.officeAddress : S.social
      })).filter(R => R.v);
      const J = j.size;
      const k = j.gap || J * 1.75;
      let w = Z;
      v.forEach(R => {
        if (j.icons !== false) {
          H(E, R.k === "address" ? "pin" : R.k, M, w - J * 0.92, J * 1.05, j.iconColor || A.green);
        }
        U(E, R.v, M + (j.icons === false ? 0 : J * 1.6), w, {
          size: J,
          weight: j.weight || 600,
          fam: P,
          color: j.color,
          maxW: j.maxW ? j.maxW - J * 1.6 : undefined
        });
        w += k;
      });
      return w - Z;
    },
    qr: function (E, S, M, Z, j, v, J) {
      if (!y.qrcode || !S) {
        return false;
      }
      const k = y.qrcode(0, "M");
      k.addData(S);
      k.make();
      const w = k.getModuleCount();
      const R = j / (w + 4);
      B(E, M, Z, j, j, J || "#fff");
      E.fillStyle = v || A.navy;
      for (let z = 0; z < w; z++) {
        for (let D = 0; D < w; D++) {
          if (k.isDark(z, D)) {
            E.fillRect(M + (D + 2) * R, Z + (z + 2) * R, R + 0.0015, R + 0.0015);
          }
        }
      }
      return true;
    },
    stripe: function (E, S, M, Z, j, v, J) {
      G(E, S, M, Z, j, v, J);
    },
    makePage: function (E, S, M, Z, j) {
      const v = j == null ? 0.125 : j;
      E.width = Math.round((S + v * 2) * Z);
      E.height = Math.round((M + v * 2) * Z);
      const J = E.getContext("2d");
      J.setTransform(1, 0, 0, 1, 0, 0);
      J.clearRect(0, 0, E.width, E.height);
      J.scale(Z, Z);
      J.translate(v, v);
      J.imageSmoothingQuality = "high";
      return {
        ctx: J,
        W: S,
        H: M,
        B: v
      };
    },
    bleedRect: function (E, S, M, Z, j, v, J) {
      const k = S.B;
      const w = M <= 0 ? -k : M;
      const R = Z <= 0 ? -k : Z;
      B(E, w, R, (M + j >= S.W ? S.W + k : M + j) - w, (Z + v >= S.H ? S.H + k : Z + v) - R, J);
    },
    initials: C
  };
})(typeof window != "undefined" ? window : globalThis);
