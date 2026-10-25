/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (L) {
  const B = "#002e5e";
  const C = "#6bc063";
  const Z = "Montserrat, Arial, sans-serif";
  const G = "\"Open Sans\", Arial, sans-serif";
  const D = (w4, w5, w6) => Math.max(w5, Math.min(w6, w4));
  const E = (w4, w5, w6) => w4 + (w5 - w4) * w6;
  const P = w4 => (w4 = D(w4, 0, 1)) < 0.5 ? w4 * 2 * w4 : 1 - Math.pow(w4 * -2 + 2, 2) / 2;
  const W = w4 => 1 - Math.pow(1 - D(w4, 0, 1), 3);
  const z = {
    en: {
      beds: "beds",
      baths: "baths",
      sqft: "sq ft",
      courtesy: "Listing courtesy of",
      thanks: "Thank you for touring",
      staged: "Virtually staged",
      ai: "Animated with AI from listing photos",
      three: "3D tour created from video of the home",
      presented: "Presented by",
      tour: "Home tour",
      heads: {
        listed: "Just listed",
        sale: "For sale",
        open: "Open house",
        contract: "Under contract",
        sold: "Just sold",
        coming: "Coming soon",
        price: "New price",
        tour: "Home tour"
      }
    },
    es: {
      beds: "hab.",
      baths: "baños",
      sqft: "pies²",
      courtesy: "Listado cortesía de",
      thanks: "Gracias por su visita",
      staged: "Ambientación virtual",
      ai: "Animado con IA a partir de fotos del listado",
      three: "Recorrido 3D creado con video de la casa",
      presented: "Presentado por",
      tour: "Recorrido",
      heads: {
        listed: "Recién listada",
        sale: "En venta",
        open: "Casa abierta",
        contract: "Bajo contrato",
        sold: "Vendida",
        coming: "Muy pronto",
        price: "Nuevo precio",
        tour: "Recorrido"
      }
    }
  };
  const Y = [["front", "Front of home", "Fachada"], ["entry", "Entry", "Entrada"], ["living", "Living room", "Sala"], ["family", "Family room", "Sala familiar"], ["dining", "Dining room", "Comedor"], ["kitchen", "Kitchen", "Cocina"], ["breakfast", "Breakfast nook", "Desayunador"], ["office", "Office", "Oficina"], ["primary", "Primary suite", "Habitación principal"], ["primarybath", "Primary bath", "Baño principal"], ["bedroom", "Bedroom", "Habitación"], ["bath", "Bathroom", "Baño"], ["laundry", "Laundry", "Lavandería"], ["bonus", "Bonus room", "Cuarto adicional"], ["garage", "Garage", "Garaje"], ["patio", "Patio", "Terraza"], ["backyard", "Backyard", "Patio trasero"], ["pool", "Pool", "Piscina"], ["view", "View", "Vista"], ["aerial", "Aerial view", "Vista aérea"], ["community", "Community", "Comunidad"], ["hallway", "Hallway", "Pasillo"], ["other", "", ""]];
  const X = Y.map(w4 => w4[0]);
  const V = (w4, w5) => {
    const w6 = Y.find(w7 => w7[0] === w4);
    if (w6) {
      if (w5 === "es") {
        return w6[2];
      } else {
        return w6[1];
      }
    } else {
      return "";
    }
  };
  function F(w4, w5, w6, w7, w8, w9, ww) {
    const wL = w5.videoWidth || w5.naturalWidth || w5.width;
    const wi = w5.videoHeight || w5.naturalHeight || w5.height;
    if (!wL || !wi) {
      return;
    }
    const wB = Math.max(w6 / wL, w7 / wi) * w8;
    const wg = wL * wB;
    const wv = wi * wB;
    const wn = (wg - w6) / 2;
    const wC = (wv - w7) / 2;
    w4.drawImage(w5, (w6 - wg) / 2 - D(w9, -1, 1) * wn, (w7 - wv) / 2 - D(ww, -1, 1) * wC, wg, wv);
  }
  const Q = [{
    s: [1, 1.13],
    x: [0, 0],
    y: [0.1, -0.1]
  }, {
    s: [1.04, 1.04],
    x: [-0.85, 0.85],
    y: [0, 0]
  }, {
    s: [1.15, 1.02],
    x: [0.2, -0.1],
    y: [0, 0]
  }, {
    s: [1.04, 1.04],
    x: [0.85, -0.85],
    y: [0, 0]
  }, {
    s: [1.02, 1.12],
    x: [-0.3, 0.25],
    y: [-0.2, 0.15]
  }];
  function q(w4, w5, w6, w7, w8, w9) {
    w4.beginPath();
    w4.moveTo(w5 + w9, w6);
    w4.arcTo(w5 + w7, w6, w5 + w7, w6 + w8, w9);
    w4.arcTo(w5 + w7, w6 + w8, w5, w6 + w8, w9);
    w4.arcTo(w5, w6 + w8, w5, w6, w9);
    w4.arcTo(w5, w6, w5 + w7, w6, w9);
    w4.closePath();
  }
  function I(w4, w5, w6, w7, w8, w9) {
    let ww = w7;
    do {
      w4.font = w8 + " " + ww + "px " + (w9 || Z);
      if (w4.measureText(w5).width <= w6) {
        break;
      }
      ww -= 2;
    } while (ww > 12);
    return ww;
  }
  function J(w4, w5, w6, w7, w8, w9) {
    if (!w5) {
      return;
    }
    const ww = w5.naturalWidth || w5.width;
    const wL = w5.naturalHeight || w5.height;
    if (!ww) {
      return;
    }
    const wi = ww / wL;
    let wB = w8;
    let wg = wB / wi;
    if (wg > w9) {
      wg = w9;
      wB = wg * wi;
    }
    w4.drawImage(w5, w6 - wB / 2, w7 - wg / 2, wB, wg);
  }
  const K = w4 => {
    const w5 = +String(w4 || "").replace(/[^0-9.]/g, "");
    if (w5) {
      return "$" + Math.round(w5).toLocaleString("en-US");
    } else {
      return String(w4 || "");
    }
  };
  function N(w4, w5, w6, w7, w8, w9) {
    const ww = w6.it || w6.ref;
    const wL = D(w7 / w6.dur, 0, 1);
    const wi = ww.type === "clip" ? ww.video : ww.img;
    if (!wi) {
      w4.fillStyle = B;
      w4.fillRect(0, 0, w8, w9);
      return;
    }
    const wB = (wi.videoWidth || wi.naturalWidth || wi.width) > (wi.videoHeight || wi.naturalHeight || wi.height) * 1.05;
    if (ww.type === "clip") {
      F(w4, wi, w8, w9, 1.02, 0, 0);
      return;
    }
    const wg = function (wn, wC, wZ, wt) {
      const wG = wZ === "gentle" ? 0.55 : wZ === "energetic" ? 1.35 : 1;
      const wD = wC === "9x16" && wt;
      const wk = wD && wn % 2 == 0 ? Q[wn % 4 == 0 ? 1 : 3] : Q[wn % Q.length];
      return {
        s: [1 + (wk.s[0] - 1) * wG, 1 + (wk.s[1] - 1) * wG],
        x: [wk.x[0] * (wD ? 1 : wG), wk.x[1] * (wD ? 1 : wG)],
        y: [wk.y[0] * wG, wk.y[1] * wG]
      };
    }(w6.kind === "intro" ? 0 : w6.idx + 1, w5.fmt, w5.style, wB);
    const wv = P(wL);
    F(w4, wi, w8, w9, E(wg.s[0], wg.s[1], wv), E(wg.x[0], wg.x[1], wv), E(wg.y[0], wg.y[1], wv));
  }
  function U(w4, w5, w6, w7, w8, w9) {
    const ww = Math.min(w8, w9) / 1080;
    const wL = w5.lang === "es" ? z.es : z.en;
    N(w4, w5, w6, w7, w8, w9);
    const wi = w4.createLinearGradient(0, w9 * 0.35, 0, w9);
    wi.addColorStop(0, "rgba(0,26,54,0)");
    wi.addColorStop(1, "rgba(0,26,54,.88)");
    w4.fillStyle = wi;
    w4.fillRect(0, 0, w8, w9);
    const wB = wt => W((w7 - wt) / 0.5);
    const wg = w5.info || {};
    const wv = ww * 70;
    let wn = w9 - (w5.fmt === "9x16" ? 430 : 250) * ww;
    w4.save();
    w4.globalAlpha = wB(0.15);
    w4.fillStyle = C;
    w4.fillRect(wv, wn - ww * 34, ww * 70 * wB(0.15), ww * 8);
    w4.font = "800 " + ww * 30 + "px " + Z;
    w4.fillStyle = "#fff";
    w4.textBaseline = "alphabetic";
    w4.textAlign = "left";
    w4.fillText(String(wg.head || wL.heads.tour).toUpperCase(), wv, wn + ww * 6);
    w4.restore();
    wn += ww * 78;
    w4.save();
    w4.globalAlpha = wB(0.35);
    w4.translate(0, (1 - wB(0.35)) * 30 * ww);
    w4.fillStyle = "#fff";
    I(w4, wg.address || wL.tour, w8 - wv * 2, Math.round(ww * 72), 900);
    w4.fillText(wg.address || wL.tour, wv, wn);
    w4.restore();
    wn += ww * 52;
    w4.save();
    w4.globalAlpha = wB(0.55);
    w4.fillStyle = "rgba(255,255,255,.85)";
    w4.font = "600 " + ww * 32 + "px " + G;
    w4.fillText(wg.city || "", wv, wn);
    w4.restore();
    const wC = [wg.price ? K(wg.price) : "", wg.beds ? wg.beds + " " + wL.beds : "", wg.baths ? wg.baths + " " + wL.baths : "", wg.sqft ? (+wg.sqft).toLocaleString("en-US") + " " + wL.sqft : ""].filter(Boolean);
    wn += ww * 40;
    let wZ = wv;
    wC.forEach((wt, wG) => {
      const wD = wB(0.75 + wG * 0.12);
      if (wD <= 0) {
        return;
      }
      w4.save();
      w4.globalAlpha = wD;
      w4.font = "800 " + (wG ? 28 : 34) * ww + "px " + Z;
      const wk = w4.measureText(wt).width + ww * 36;
      const wd = ww * 58;
      if (wZ + wk > w8 - wv) {
        w4.restore();
      } else {
        w4.fillStyle = wG ? "rgba(255,255,255,.16)" : C;
        q(w4, wZ, wn, wk, wd, wd / 2);
        w4.fill();
        w4.fillStyle = wG ? "#fff" : B;
        w4.textBaseline = "middle";
        w4.fillText(wt, wZ + ww * 18, wn + wd / 2 + 1);
        w4.restore();
        wZ += wk + ww * 12;
      }
    });
    if (!w5.unbranded && w5.lock) {
      w4.save();
      w4.globalAlpha = wB(0.1);
      const wt = j(w5, ww);
      w4.fillStyle = "rgba(0,26,54,.55)";
      q(w4, w8 - wv - ww * 370, wt + ww * 60, ww * 370, ww * 100, ww * 14);
      w4.fill();
      J(w4, w5.lock.dark, w8 - wv - ww * 185, wt + ww * 110, ww * 320, ww * 64);
      w4.restore();
    }
  }
  function O(w4, w5, w6, w7, w8, w9) {
    const ww = Math.min(w8, w9) / 1080;
    const wL = w5.lang === "es" ? z.es : z.en;
    const wi = wG => W((w7 - wG) / 0.5);
    const wB = w5.agent || {};
    const wg = w5.info || {};
    const wv = w4.createLinearGradient(0, 0, w8, w9);
    wv.addColorStop(0, B);
    wv.addColorStop(1, "#001a36");
    w4.fillStyle = wv;
    w4.fillRect(0, 0, w8, w9);
    w4.save();
    w4.globalAlpha = 0.9;
    w4.fillStyle = C;
    const wn = w8 * 0.82;
    w4.beginPath();
    w4.moveTo(wn, 0);
    w4.lineTo(wn + ww * 26, 0);
    w4.lineTo(wn - ww * 160, w9);
    w4.lineTo(wn - ww * 186, w9);
    w4.fill();
    w4.restore();
    const wC = w8 / 2;
    w4.textAlign = "center";
    w4.textBaseline = "alphabetic";
    if (w5.unbranded) {
      w4.globalAlpha = wi(0.1);
      w4.fillStyle = "#fff";
      I(w4, wL.thanks, w8 * 0.8, Math.round(ww * 70), 900);
      w4.fillText(wL.thanks, wC, w9 * 0.45);
      w4.font = "600 " + ww * 36 + "px " + G;
      w4.fillStyle = "rgba(255,255,255,.85)";
      w4.fillText([wg.address, wg.city].filter(Boolean).join(", "), wC, w9 * 0.45 + ww * 70);
      w4.globalAlpha = 1;
      return;
    }
    let wZ = w9 * (w5.fmt === "16x9" ? 0.16 : 0.2);
    w4.save();
    w4.globalAlpha = wi(0.05);
    J(w4, w5.lock && w5.lock.dark, wC, wZ, w8 * 0.62, ww * 120);
    w4.restore();
    wZ += ww * 150;
    const wt = ww * 120;
    if (wB.photo) {
      w4.save();
      w4.globalAlpha = wi(0.25);
      w4.beginPath();
      w4.arc(wC, wZ + wt, wt + ww * 8, 0, 7);
      w4.fillStyle = C;
      w4.fill();
      w4.beginPath();
      w4.arc(wC, wZ + wt, wt, 0, 7);
      w4.clip();
      const wG = wB.photo;
      const wD = wG.naturalWidth || wG.width;
      const wk = wG.naturalHeight || wG.height;
      const wd = Math.max(wt * 2 / wD, wt * 2 / wk);
      w4.drawImage(wG, wC - wD * wd / 2, wZ + wt - wk * wd / 2, wD * wd, wk * wd);
      w4.restore();
      wZ += wt * 2 + ww * 60;
    } else {
      wZ += ww * 40;
    }
    w4.save();
    w4.globalAlpha = wi(0.4);
    w4.font = "700 " + ww * 26 + "px " + Z;
    w4.fillStyle = C;
    w4.fillText(wL.presented.toUpperCase(), wC, wZ);
    wZ += ww * 64;
    w4.fillStyle = "#fff";
    I(w4, wB.name || "iMath Group", w8 * 0.8, Math.round(ww * 64), 900);
    w4.fillText(wB.name || "iMath Group", wC, wZ);
    wZ += ww * 48;
    w4.font = "600 " + ww * 30 + "px " + G;
    w4.fillStyle = "rgba(255,255,255,.85)";
    if (wB.title) {
      w4.fillText(wB.title, wC, wZ);
      wZ += ww * 46;
    }
    w4.restore();
    w4.save();
    w4.globalAlpha = wi(0.6);
    w4.font = "800 " + ww * 40 + "px " + Z;
    w4.fillStyle = "#fff";
    if (wB.phone) {
      w4.fillText(wB.phone, wC, wZ + ww * 16);
      wZ += ww * 60;
    }
    w4.font = "600 " + ww * 28 + "px " + G;
    w4.fillStyle = "rgba(255,255,255,.8)";
    if (wB.email) {
      w4.fillText(wB.email, wC, wZ + ww * 10);
      wZ += ww * 50;
    }
    w4.restore();
    if (w5.courtesy) {
      w4.save();
      w4.globalAlpha = wi(0.8);
      w4.font = "600 " + ww * 24 + "px " + G;
      w4.fillStyle = "rgba(255,255,255,.75)";
      I(w4, wL.courtesy + " " + w5.courtesy, w8 * 0.86, Math.round(ww * 24), 600, G);
      w4.fillText(wL.courtesy + " " + w5.courtesy, wC, w9 - (w5.fmt === "16x9" ? 120 : 190) * ww);
      w4.restore();
    }
    w4.textAlign = "left";
  }
  const j = (w4, w5) => (w4.fmt === "9x16" ? 150 : 34) * w5;
  function H(w4, w5, w6, w7, w8) {
    const w9 = Math.min(w6, w7) / 1080;
    const ww = j(w5, w9);
    if (!w5.unbranded && !w8 && w5.lock && w5.lock.dark) {
      const wL = w5.lock.dark;
      const wi = wL.naturalWidth || wL.width || 4;
      const wB = wL.naturalHeight || wL.height || 1;
      const wg = w9 * 44;
      const wv = Math.min(w9 * 250, wg * wi / wB);
      w4.save();
      w4.fillStyle = "rgba(0,26,54,.55)";
      q(w4, w6 - w9 * 40 - wv - w9 * 28, ww, wv + w9 * 28, wg + w9 * 22, w9 * 12);
      w4.fill();
      J(w4, wL, w6 - w9 * 40 - w9 * 14 - wv / 2, ww + w9 * 11 + wg / 2, wv, wg);
      w4.restore();
    }
    if (w5.disclosure) {
      w4.save();
      w4.font = "600 " + w9 * 22 + "px " + G;
      const wn = w5.disclosure;
      const wC = w4.measureText(wn).width + w9 * 28;
      const wZ = w9 * 40;
      const wt = w9 * 40;
      const wG = ww + w9 * 12;
      w4.fillStyle = "rgba(0,0,0,.5)";
      q(w4, wt, wG, wC, wZ, wZ / 2);
      w4.fill();
      w4.fillStyle = "rgba(255,255,255,.95)";
      w4.textBaseline = "middle";
      w4.fillText(wn, wt + w9 * 14, wG + wZ / 2 + 1);
      w4.restore();
    }
  }
  function w0(w4, w5, w6, w7, w8, w9) {
    if (w6.kind === "intro") {
      U(w4, w5, w6, w7, w8, w9);
    } else if (w6.kind === "outro") {
      O(w4, w5, 0, w7, w8, w9);
    } else {
      N(w4, w5, w6, w7, w8, w9);
      (function (ww, wL, wi, wB, wg, wv) {
        const wn = Math.min(wg, wv) / 1080;
        const wC = wL.lang === "es" ? z.es : z.en;
        const wZ = wi.it;
        if (!wZ) {
          return;
        }
        const wt = wL.captions !== false ? wZ.label ?? V(wZ.room, wL.lang) : "";
        const wG = D(Math.min((wB - 0.35) / 0.45, (wi.dur - 0.45 - wB) / 0.35), 0, 1);
        if (wt && wG > 0) {
          const wD = wn * 56;
          const wk = wv - (wL.fmt === "9x16" ? 330 : 120) * wn;
          ww.save();
          ww.globalAlpha = wG;
          ww.font = "800 " + wn * 44 + "px " + Z;
          const wd = ww.measureText(wt).width + wn * 60;
          const wc = wn * 82;
          const wr = wD - (1 - W(wG)) * 40 * wn;
          ww.fillStyle = "rgba(0,26,54,.78)";
          q(ww, wr, wk - wc, wd, wc, wn * 12);
          ww.fill();
          ww.fillStyle = C;
          ww.fillRect(wr, wk - wc, wn * 9, wc);
          ww.fillStyle = "#fff";
          ww.textBaseline = "middle";
          ww.fillText(wt, wr + wn * 32, wk - wc / 2 + 2);
          ww.restore();
        }
        if (wZ.staged) {
          ww.save();
          ww.font = "800 " + wn * 26 + "px " + Z;
          const wE = wC.staged.toUpperCase();
          const wh = ww.measureText(wE).width + wn * 34;
          ww.fillStyle = "rgba(255,255,255,.92)";
          const wP = j(wL, wn) + wn * 66;
          q(ww, wn * 40, wP, wh, wn * 50, wn * 25);
          ww.fill();
          ww.fillStyle = B;
          ww.textBaseline = "middle";
          ww.fillText(wE, wn * 57, wP + wn * 26);
          ww.restore();
        }
      })(w4, w5, w6, w7, w8, w9);
    }
  }
  const w1 = w4 => Math.pow(2, (w4 - 69) / 12) * 440;
  const w2 = {
    bright: {
      bpm: 100,
      ch: [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]
    },
    calm: {
      bpm: 72,
      ch: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
    },
    modern: {
      bpm: 112,
      ch: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
    }
  };
  const w3 = [[/\b(perfect|ideal|great) for (a )?(family|families|kids|children|couples|singles|retirees|seniors|young professionals|newlyweds|students)\b/i, "Describes who the buyer should be", "Describe the home instead, for example \"room to grow\" or \"flexible layout\""], [/\bfamily[ -]?friendly\b/i, "Implies a preferred family status", "Try \"inviting floor plan\" or \"near parks\""], [/\b(no|not suitable for) (kids|children|pets? and kids)\b/i, "Excludes families with children", "Remove it"], [/\badults? only\b|\bmature (adults|persons)\b/i, "Excludes by age or family status", "Only allowed for qualified 55 and over communities; otherwise remove"], [/\b(bachelor|bachelorette) pad\b|\bman cave\b|\bmother[- ]in[- ]law\b/i, "Gendered or family status wording", "Try \"bonus room\", \"flex space\" or \"guest suite\""], [/\bmaster (bedroom|suite|bath)\b/i, "Industry now avoids \"master\"", "Use \"primary bedroom\" or \"primary suite\""], [/\b(safe|crime[- ]free|exclusive|prestigious|integrated|diverse|ethnic|traditional) (neighborhood|area|community)\b/i, "Can signal who belongs in the neighborhood", "Describe features like \"quiet street\" or \"near shopping\""], [/\b(walking distance|close|near) to (the )?(church|synagogue|mosque|temple)\b/i, "Religious preference", "Name the landmark neutrally, for example \"near Main Street\""], [/\b(christian|jewish|catholic|muslim|hispanic|latino|black|white|asian|african)\b/i, "Mentions religion, race or national origin", "Remove it"], [/\b(handicap|crippled|wheelchair bound|able[- ]bodied|no wheelchairs|mentally)\b/i, "Disability wording", "Describe accessibility features, for example \"step free entry\""], [/\b(english only|speaks english|no section 8)\b/i, "National origin or source of income", "Remove it"], [/\b(perfect|ideal) for (him|her|a man|a woman|ladies|gentlemen)\b/i, "Sex based preference", "Remove it"], [/\b(perfect|ideal|great) para (familias|niños|parejas|jubilados)\b|\bsolo adultos\b|\bbarrio seguro\b/i, "Describe la casa, no al comprador", "Describa las características de la casa"]];
  L.iMathLV = {
    FORMATS: {
      "9x16": [1080, 1920, "Vertical 9:16 for Reels, TikTok and Stories"],
      "1x1": [1080, 1080, "Square 1:1 for the feed"],
      "16x9": [1920, 1080, "Wide 16:9 for YouTube, Facebook and the MLS"]
    },
    TXT: z,
    ROOMS: Y,
    ROOM_KEYS: X,
    roomLabel: V,
    roomOrder: w4 => {
      const w5 = X.indexOf(w4);
      if (w5 < 0) {
        return 99;
      } else {
        return w5;
      }
    },
    mlsRoom: function (w4, w5) {
      const w6 = ((Array.isArray(w4) ? w4.join(" ") : String(w4 || "")) + " " + String(w5 || "")).toLowerCase();
      const w7 = [[/aerial|drone/, "aerial"], [/front|exterior front|front of structure|curb/, "front"], [/entry|foyer/, "entry"], [/primary bath|master bath|en ?suite/, "primarybath"], [/primary|master/, "primary"], [/kitchen/, "kitchen"], [/breakfast/, "breakfast"], [/dining/, "dining"], [/family/, "family"], [/living|great room/, "living"], [/office|den|study/, "office"], [/laundry|utility/, "laundry"], [/bonus|loft|game|media/, "bonus"], [/bath|powder/, "bath"], [/bed/, "bedroom"], [/garage/, "garage"], [/pool/, "pool"], [/patio|porch|lanai|deck|balcony/, "patio"], [/back|yard|rear|garden/, "backyard"], [/view|water/, "view"], [/community|amenit|clubhouse/, "community"], [/exterior|structure/, "front"]];
      for (const [w8, w9] of w7) {
        if (w8.test(w6)) {
          return w9;
        }
      }
      return "other";
    },
    timeline: function (w4) {
      const w5 = w4.trans === "cut" ? 0.001 : 0.6;
      const w6 = [];
      let w7 = 0;
      const w8 = ww => {
        ww.start = w7;
        w6.push(ww);
        w7 += ww.dur - w5;
      };
      if (w4.intro !== false && w4.items.length) {
        w8({
          kind: "intro",
          dur: 3.4,
          ref: w4.items[0]
        });
      }
      w4.items.forEach((ww, wL) => w8(Object.assign({
        kind: ww.type,
        idx: wL,
        dur: ww.type === "clip" ? D(ww.dur || 5, 2, 8) : w4.photoDur || 3.2
      }, {
        it: ww
      })));
      if (w4.outro !== false) {
        w8({
          kind: "outro",
          dur: 4.6
        });
      }
      const w9 = w6.length ? w6[w6.length - 1].start + w6[w6.length - 1].dur : 0;
      return {
        segs: w6,
        total: w9,
        TR: w5
      };
    },
    frame: function (w4, w5, w6, w7) {
      const w8 = w4.canvas.width;
      const w9 = w4.canvas.height;
      w4.save();
      w4.fillStyle = "#000";
      w4.fillRect(0, 0, w8, w9);
      const ww = w6.segs.filter(wi => w7 >= wi.start && w7 < wi.start + wi.dur);
      if (!ww.length && w6.segs.length) {
        ww.push(w6.segs[w6.segs.length - 1]);
      }
      if (ww.length === 1) {
        w0(w4, w5, ww[0], w7 - ww[0].start, w8, w9);
      } else {
        const wi = ww[0];
        const wB = ww[1];
        const wg = P((w7 - wB.start) / w6.TR);
        const wv = function (wn, wC) {
          const wZ = wn.trans || "mix";
          if (wZ === "mix") {
            return ["fade", "slide", "zoom", "fade", "slideup"][wC % 5];
          } else {
            return wZ;
          }
        }(w5, w6.segs.indexOf(wB));
        if (wv === "slide" || wv === "slideup") {
          const wn = wv === "slideup";
          w4.save();
          w4.translate(wn ? 0 : -wg * w8, wn ? -wg * w9 : 0);
          w0(w4, w5, wi, w7 - wi.start, w8, w9);
          w4.restore();
          w4.save();
          w4.translate(wn ? 0 : (1 - wg) * w8, wn ? (1 - wg) * w9 : 0);
          w0(w4, w5, wB, w7 - wB.start, w8, w9);
          w4.restore();
        } else if (wv === "zoom") {
          w4.save();
          w4.translate(w8 / 2, w9 / 2);
          w4.scale(1 + wg * 0.18, 1 + wg * 0.18);
          w4.translate(-w8 / 2, -w9 / 2);
          w0(w4, w5, wi, w7 - wi.start, w8, w9);
          w4.restore();
          w4.save();
          w4.globalAlpha = wg;
          w4.translate(w8 / 2, w9 / 2);
          w4.scale(0.94 + wg * 0.06, 0.94 + wg * 0.06);
          w4.translate(-w8 / 2, -w9 / 2);
          w0(w4, w5, wB, w7 - wB.start, w8, w9);
          w4.restore();
        } else {
          w0(w4, w5, wi, w7 - wi.start, w8, w9);
          w4.save();
          w4.globalAlpha = wg;
          w0(w4, w5, wB, w7 - wB.start, w8, w9);
          w4.restore();
        }
      }
      const wL = ww[ww.length - 1];
      H(w4, w5, w8, w9, wL && (wL.kind === "intro" || wL.kind === "outro"));
      w4.restore();
    },
    drawIntro: U,
    drawOutro: O,
    bugAndLabel: H,
    cover: F,
    makeMusic: async function (w4, w5) {
      const w6 = w2[w4] || w2.bright;
      const w7 = 44100;
      const w8 = Math.ceil((w5 + 0.5) * w7);
      const w9 = new (L.OfflineAudioContext || L.webkitOfflineAudioContext)(2, w8, w7);
      const ww = w9.createGain();
      ww.gain.setValueAtTime(0, 0);
      ww.gain.linearRampToValueAtTime(0.9, 1.2);
      ww.gain.setValueAtTime(0.9, Math.max(1.3, w5 - 2.5));
      ww.gain.linearRampToValueAtTime(0, w5);
      const wL = w9.createDynamicsCompressor();
      ww.connect(wL);
      wL.connect(w9.destination);
      const wi = 60 / w6.bpm;
      const wB = wi * 4;
      const wg = w9.createBiquadFilter();
      wg.type = "lowpass";
      wg.frequency.value = w4 === "calm" ? 1400 : 2200;
      wg.connect(ww);
      const wv = (wZ, wt, wG, wD, wk, wd, wc, wr) => {
        const wE = w9.createOscillator();
        const wh = w9.createGain();
        wE.type = wD;
        wE.frequency.value = wZ;
        wh.gain.setValueAtTime(0, wt);
        wh.gain.linearRampToValueAtTime(wk, wt + (wc || 0.01));
        wh.gain.setTargetAtTime(0, wt + wG - (wr || 0.1), (wr || 0.1) / 3);
        wE.connect(wh);
        wh.connect(wd || wg);
        wE.start(wt);
        wE.stop(wt + wG + 0.6);
      };
      const wn = w9.createBuffer(1, 8820, w7);
      const wC = wn.getChannelData(0);
      for (let wZ = 0; wZ < wC.length; wZ++) {
        wC[wZ] = Math.random() * 2 - 1;
      }
      for (let wt = 0, wG = 0; wG < w5; wt++, wG += wB) {
        const wD = w6.ch[wt % 4];
        wD.forEach((wc, wr) => {
          wv(w1(wc), wG, wB, "triangle", 0.035, wg, 0.35, 0.5);
          wv(w1(wc) * 1.003, wG, wB, "sine", 0.03, wg, 0.35, 0.5);
        });
        wv(w1(wD[0] - 12), wG, w4 === "modern" ? wi / 2 : wB / 2, "sine", 0.16, ww, 0.02, 0.2);
        if (w4 !== "modern") {
          wv(w1(wD[0] - 12), wG + wB / 2, wB / 2, "sine", 0.13, ww, 0.02, 0.2);
        }
        if (w4 === "modern") {
          for (let wc = 1; wc < 8; wc++) {
            wv(w1(wD[0] - 12), wG + wc * wi / 2, wi / 2.2, "sine", 0.12, ww, 0.01, 0.08);
          }
        }
        const wk = [wD[0] + 12, wD[1] + 12, wD[2] + 12, wD[1] + 12];
        const wd = w4 === "calm" ? wi : wi / 2;
        for (let wr = 0; wr * wd < wB - 0.001; wr++) {
          wv(w1(wk[wr % 4]), wG + wr * wd, wd * (w4 === "calm" ? 1.6 : 0.9), w4 === "calm" ? "sine" : "square", w4 === "calm" ? 0.05 : 0.018, wg, 0.005, wd * 0.6);
        }
        if (w4 !== "calm") {
          for (let wE = 0; wE < 4; wE++) {
            const wh = wG + wE * wi;
            if (wE % 2 == 0 || w4 === "modern") {
              const wT = w9.createOscillator();
              const wm = w9.createGain();
              wT.frequency.setValueAtTime(130, wh);
              wT.frequency.exponentialRampToValueAtTime(42, wh + 0.22);
              wm.gain.setValueAtTime(0.42, wh);
              wm.gain.exponentialRampToValueAtTime(0.001, wh + 0.28);
              wT.connect(wm);
              wm.connect(ww);
              wT.start(wh);
              wT.stop(wh + 0.3);
            }
            const wP = w9.createBufferSource();
            const wy = w9.createBiquadFilter();
            const wR = w9.createGain();
            wP.buffer = wn;
            wy.type = "highpass";
            wy.frequency.value = 7000;
            wR.gain.setValueAtTime(w4 === "modern" ? 0.07 : 0.045, wh + wi / 2);
            wR.gain.exponentialRampToValueAtTime(0.001, wh + wi / 2 + 0.06);
            wP.connect(wy);
            wy.connect(wR);
            wR.connect(ww);
            wP.start(wh + wi / 2);
            wP.stop(wh + wi / 2 + 0.08);
          }
        }
      }
      return w9.startRendering();
    },
    TRACKS: [["bright", "Bright and upbeat"], ["calm", "Calm and warm"], ["modern", "Modern pulse"]],
    fhCheck: function (w4) {
      const w5 = String(w4 || "");
      const w6 = [];
      w3.forEach(([w7, w8, w9]) => {
        const ww = w5.match(w7);
        if (ww) {
          w6.push({
            term: ww[0],
            why: w8,
            fix: w9
          });
        }
      });
      return w6;
    },
    analyzeVideo: async function (w4, w5) {
      w5 = w5 || {};
      const w6 = w4.duration || 0;
      if (!w6) {
        throw new Error("no video");
      }
      const w7 = 160;
      const w8 = Math.max(48, Math.round((w4.videoHeight || 9) * 160 / (w4.videoWidth || 16)));
      const w9 = document.createElement("canvas");
      w9.width = w7;
      w9.height = w8;
      const ww = w9.getContext("2d", {
        willReadFrequently: true
      });
      const wL = document.createElement("canvas");
      wL.width = 360;
      wL.height = Math.round(w8 * 360 / w7);
      const wi = wL.getContext("2d");
      const wB = [];
      const wg = [];
      let wv = null;
      let wn = -9;
      const wC = w5.thumbEvery || Math.max(1.2, w6 / 40);
      w4.muted = true;
      w4.pause();
      w4.currentTime = 0;
      await new Promise(wd => {
        const wc = () => {
          w4.removeEventListener("seeked", wc);
          wd();
        };
        w4.addEventListener("seeked", wc);
        setTimeout(wd, 1500);
      });
      w4.playbackRate = w5.rate || 2;
      const wZ = new Promise(wd => {
        const wc = () => {
          w4.removeEventListener("ended", wc);
          wd();
        };
        w4.addEventListener("ended", wc);
      });
      let wt = false;
      const wG = "requestVideoFrameCallback" in w4;
      const wD = (wd, wc) => {
        if (wt) {
          return;
        }
        const wr = wc && wc.mediaTime != null ? wc.mediaTime : w4.currentTime;
        if (!wB.length || wr - wB[wB.length - 1].t > 0.04) {
          (wE => {
            ww.drawImage(w4, 0, 0, w7, w8);
            const wh = function (wR, wT, wm) {
              const wW = wR.getImageData(0, 0, 160, wm).data;
              const wz = new Float32Array(wm * 160);
              for (let wu = 0, wY = 0; wu < wW.length; wu += 4, wY++) {
                wz[wY] = wW[wu] * 0.299 + wW[wu + 1] * 0.587 + wW[wu + 2] * 0.114;
              }
              return wz;
            }(ww, 0, w8);
            const wP = function (wR, wT, wm) {
              let wW = 0;
              let wz = 0;
              let wu = 0;
              for (let wY = 1; wY < wm - 1; wY += 2) {
                for (let wX = 1; wX < 159; wX += 2) {
                  const wV = wY * wT + wX;
                  wW += wR[wV];
                  wz += Math.abs(wR[wV] * 4 - wR[wV - 1] - wR[wV + 1] - wR[wV - wT] - wR[wV + wT]);
                  wu++;
                }
              }
              return {
                b: wW / wu / 255,
                sh: wz / wu
              };
            }(wh, w7, w8);
            let wy = [0, 0];
            if (wv) {
              wy = function (wR, wT, wm, wW) {
                const wz = Math.round(32);
                const wu = Math.round(wW * 0.2);
                let wY = 1000000000000000000;
                let wX = 0;
                let wV = 0;
                for (let we = -7; we <= 7; we++) {
                  for (let wb = -7; wb <= 7; wb++) {
                    let wa = 0;
                    for (let wA = wu; wA < wW - wu; wA += 3) {
                      const wF = wA * wm;
                      const wo = (wA + we) * wm;
                      for (let wQ = wz; wQ < wm - wz; wQ += 3) {
                        wa += Math.abs(wR[wF + wQ] - wT[wo + wQ + wb]);
                      }
                    }
                    if (wa < wY) {
                      wY = wa;
                      wX = wb;
                      wV = we;
                    }
                  }
                }
                return [wX, wV];
              }(wv, wh, w7, w8);
            }
            wv = wh;
            wB.push({
              t: wE,
              b: wP.b,
              sh: wP.sh,
              dx: wy[0],
              dy: wy[1]
            });
            if (wE - wn >= wC) {
              wn = wE;
              wi.drawImage(w4, 0, 0, wL.width, wL.height);
              wg.push({
                t: wE,
                url: wL.toDataURL("image/jpeg", 0.72)
              });
            }
            if (w5.onProgress) {
              w5.onProgress(Math.min(1, wE / w6));
            }
          })(wr);
        }
        if (wG) {
          w4.requestVideoFrameCallback(wD);
        } else {
          requestAnimationFrame(wD);
        }
      };
      if (wG) {
        w4.requestVideoFrameCallback(wD);
      } else {
        requestAnimationFrame(wD);
      }
      await w4.play();
      const wk = new Promise(wd => setTimeout(wd, w6 / (w5.rate || 2) * 1000 + 8000));
      await Promise.race([wZ, wk]);
      wt = true;
      w4.pause();
      w4.playbackRate = 1;
      w4.currentTime = 0;
      return {
        samples: wB,
        thumbs: wg,
        dur: w6,
        w: w7,
        h: w8
      };
    },
    stabilizer: function (w4, w5) {
      const w6 = w4.samples;
      if (w6.length < 4) {
        return () => [0, 0];
      }
      let w7 = 0;
      let w8 = 0;
      const w9 = w6.map(wi => {
        w7 += wi.dx;
        w8 += wi.dy;
        return [wi.t, w7, w8];
      });
      const ww = w9.map(([wi]) => {
        let wB = 0;
        let wg = 0;
        let wv = 0;
        for (const wn of w9) {
          if (Math.abs(wn[0] - wi) <= 0.7) {
            wB += wn[1];
            wg += wn[2];
            wv++;
          }
        }
        return [wi, wB / wv, wg / wv];
      });
      const wL = w5 / w4.w;
      return wi => {
        let wB = 0;
        while (wB < w9.length - 1 && w9[wB + 1][0] < wi) {
          wB++;
        }
        const wg = w9[wB];
        const wv = w9[Math.min(w9.length - 1, wB + 1)];
        const wn = ww[wB];
        const wC = ww[Math.min(ww.length - 1, wB + 1)];
        const wZ = wv[0] > wg[0] ? D((wi - wg[0]) / (wv[0] - wg[0]), 0, 1) : 0;
        const wt = E(wn[1] - wg[1], wC[1] - wv[1], wZ);
        const wG = E(wn[2] - wg[2], wC[2] - wv[2], wZ);
        return [D(wt * wL, -w5 * 0.05, w5 * 0.05), D(wG * wL, -w5 * 0.05, w5 * 0.05)];
      };
    },
    scenes: function (w4, w5) {
      const w6 = w4.samples;
      const w7 = w4.dur;
      const w8 = w6.map(wi => wi.sh).sort((wi, wB) => wi - wB)[Math.floor(w6.length / 2)] || 1;
      let w9 = (w5 && w5.length ? w5 : w4.thumbs.map(wi => ({
        t: wi.t,
        room: "other",
        bad: false
      }))).slice().sort((wi, wB) => wi.t - wB.t);
      if (!w9.length) {
        w9 = [{
          t: 0,
          room: "other"
        }];
      }
      const ww = [];
      w9.forEach((wi, wB) => {
        const wg = wB ? wi.t : 0;
        const wv = wB < w9.length - 1 ? w9[wB + 1].t : w7;
        const wn = ww[ww.length - 1];
        if (wn && wn.room === wi.room && !!wn.flag == !!wi.bad) {
          wn.out = wv;
        } else {
          ww.push({
            in: wg,
            out: wv,
            room: wi.room || "other",
            flag: !!wi.bad,
            why: wi.why || ""
          });
        }
      });
      const wL = [];
      ww.forEach(wi => {
        const wB = wL[wL.length - 1];
        if (wB && wi.out - wi.in < 1.2) {
          wB.out = wi.out;
        } else {
          wL.push(wi);
        }
      });
      wL.forEach(wi => {
        const wB = ((wg, wv) => {
          const wn = w6.filter(wC => wC.t >= wg && wC.t < wv);
          return !!wn.length && wn.filter(wC => wC.b < 0.12 || wC.sh < w8 * 0.35 || Math.hypot(wC.dx, wC.dy) > 6).length / wn.length > 0.6;
        })(wi.in, wi.out);
        wi.keep = !wi.flag && !wB;
        if (wB && !wi.why) {
          wi.why = "Too dark, blurry or shaky";
        }
        wi.speed = wi.room === "hallway" ? 2 : 1;
      });
      return wL;
    },
    fmtPrice: K,
    ease: P
  };
})(typeof window != "undefined" ? window : globalThis);
