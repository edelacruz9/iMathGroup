/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (F0) {
  const F1 = "#002e5e";
  const F2 = "#6bc063";
  const F3 = "#62666a";
  const F4 = "#f2f5f9";
  const F5 = "#06152a";
  const F6 = "#f2c14e";
  const F7 = "Montserrat, \"Arial Black\", Arial, sans-serif";
  const F8 = {
    navy: F1,
    green: F2,
    gray: F3,
    black: "#1b1f24",
    white: "#f4f6f8",
    red: "#c8323c",
    pink: "#e8609a",
    gold: F6,
    blue: "#2f6fd6",
    purple: "#6b4bb8",
    brown: "#8a5a36"
  };
  const F9 = FZ => {
    let FD = FZ >>> 0 || 1;
    return () => (FD = FD * 1664525 + 1013904223 >>> 0) / 4294967296;
  };
  const FF = (FZ, FD) => {
    const Fu = document.createElement("canvas");
    Fu.width = FZ;
    Fu.height = FD;
    return Fu;
  };
  const Fb = (FZ, FD, Fu) => FZ < FD ? FD : FZ > Fu ? Fu : FZ;
  function Fw(FZ, FD, Fu, Ft, Ff, b0) {
    FZ.beginPath();
    FZ.moveTo(FD + b0, Fu);
    FZ.arcTo(FD + Ft, Fu, FD + Ft, Fu + Ff, b0);
    FZ.arcTo(FD + Ft, Fu + Ff, FD, Fu + Ff, b0);
    FZ.arcTo(FD, Fu + Ff, FD, Fu, b0);
    FZ.arcTo(FD, Fu, FD + Ft, Fu, b0);
    FZ.closePath();
  }
  function FY(FZ, FD, Fu, Ft, Ff) {
    let b0 = Ft;
    do {
      FZ.font = (Ff || 900) + " " + b0 + "px " + F7;
      if (FZ.measureText(FD).width <= Fu) {
        break;
      }
      b0 -= 2;
    } while (b0 > 10);
    return b0;
  }
  function Fk(FZ, FD, Fu, Ft) {
    if (Ft < 1) {
      return;
    }
    const Ff = new Float32Array(FD * Fu * 4);
    const b0 = FZ;
    ((b1, b2, b3, b4) => {
      for (let b5 = 0; b5 < b4; b5++) {
        let b6 = 0;
        let b7 = 0;
        let b8 = 0;
        let b9 = 0;
        const bF = Ft * 2 + 1;
        const bb = bw => (b5 * b3 + Fb(bw, 0, b3 - 1)) * 4;
        for (let bw = -Ft; bw <= Ft; bw++) {
          const bY = bb(bw);
          b6 += b1[bY];
          b7 += b1[bY + 1];
          b8 += b1[bY + 2];
          b9 += b1[bY + 3];
        }
        for (let bk = 0; bk < b3; bk++) {
          const bj = (b5 * b3 + bk) * 4;
          b2[bj] = b6 / bF;
          b2[bj + 1] = b7 / bF;
          b2[bj + 2] = b8 / bF;
          b2[bj + 3] = b9 / bF;
          const bp = bb(bk - Ft);
          const bn = bb(bk + Ft + 1);
          b6 += b1[bn] - b1[bp];
          b7 += b1[bn + 1] - b1[bp + 1];
          b8 += b1[bn + 2] - b1[bp + 2];
          b9 += b1[bn + 3] - b1[bp + 3];
        }
      }
    })(b0, Ff, FD, Fu);
    for (let b1 = 0; b1 < FD; b1++) {
      let b2 = 0;
      let b3 = 0;
      let b4 = 0;
      let b5 = 0;
      const b6 = Ft * 2 + 1;
      const b7 = b8 => (Fb(b8, 0, Fu - 1) * FD + b1) * 4;
      for (let b8 = -Ft; b8 <= Ft; b8++) {
        const b9 = b7(b8);
        b2 += Ff[b9];
        b3 += Ff[b9 + 1];
        b4 += Ff[b9 + 2];
        b5 += Ff[b9 + 3];
      }
      for (let bF = 0; bF < Fu; bF++) {
        const bb = (bF * FD + b1) * 4;
        b0[bb] = b2 / b6;
        b0[bb + 1] = b3 / b6;
        b0[bb + 2] = b4 / b6;
        b0[bb + 3] = b5 / b6;
        const bw = b7(bF - Ft);
        const bY = b7(bF + Ft + 1);
        b2 += Ff[bY] - Ff[bw];
        b3 += Ff[bY + 1] - Ff[bw + 1];
        b4 += Ff[bY + 2] - Ff[bw + 2];
        b5 += Ff[bY + 3] - Ff[bw + 3];
      }
    }
  }
  function Fj(FZ, FD, Fu, Ft) {
    for (let Ff = 0; Ff < FZ.length; Ff += 4) {
      let b0 = FZ[Ff];
      let b1 = FZ[Ff + 1];
      let b2 = FZ[Ff + 2];
      const b3 = b0 * 0.299 + b1 * 0.587 + b2 * 0.114;
      b0 = b3 + (b0 - b3) * FD;
      b1 = b3 + (b1 - b3) * FD;
      b2 = b3 + (b2 - b3) * FD;
      b0 = (b0 - 128) * Ft + 128 + Fu;
      b1 = (b1 - 128) * Ft + 128 + Fu;
      b2 = (b2 - 128) * Ft + 128 + Fu;
      FZ[Ff] = Fb(b0, 0, 255);
      FZ[Ff + 1] = Fb(b1, 0, 255);
      FZ[Ff + 2] = Fb(b2, 0, 255);
    }
  }
  function Fp(FZ, FD) {
    const Fu = 255 / (FD - 1);
    for (let Ft = 0; Ft < FZ.length; Ft += 4) {
      FZ[Ft] = Math.round(FZ[Ft] / Fu) * Fu;
      FZ[Ft + 1] = Math.round(FZ[Ft + 1] / Fu) * Fu;
      FZ[Ft + 2] = Math.round(FZ[Ft + 2] / Fu) * Fu;
    }
  }
  function Fn(FZ, FD, Fu, Ft) {
    const Ff = new Float32Array(FD * Fu);
    for (let b1 = 0; b1 < FD * Fu; b1++) {
      Ff[b1] = FZ[b1 * 4] * 0.299 + FZ[b1 * 4 + 1] * 0.587 + FZ[b1 * 4 + 2] * 0.114;
    }
    const b0 = new Uint8Array(FD * Fu);
    for (let b2 = 1; b2 < Fu - 1; b2++) {
      for (let b3 = 1; b3 < FD - 1; b3++) {
        const b4 = b2 * FD + b3;
        const b5 = -Ff[b4 - FD - 1] - Ff[b4 - 1] * 2 - Ff[b4 + FD - 1] + Ff[b4 - FD + 1] + Ff[b4 + 1] * 2 + Ff[b4 + FD + 1];
        const b6 = -Ff[b4 - FD - 1] - Ff[b4 - FD] * 2 - Ff[b4 - FD + 1] + Ff[b4 + FD - 1] + Ff[b4 + FD] * 2 + Ff[b4 + FD + 1];
        if (Math.hypot(b5, b6) > Ft) {
          b0[b4] = 1;
        }
      }
    }
    return b0;
  }
  function Fv(FZ, FD, Fu, Ft, Ff, b0) {
    const [b1, b2, b3] = Ff;
    for (let b4 = 0; b4 < Ft; b4++) {
      for (let b5 = 0; b5 < Fu; b5++) {
        let b6 = FD[b4 * Fu + b5];
        if (!b6 && b0) {
          b6 = b5 > 0 && FD[b4 * Fu + b5 - 1] || b4 > 0 && FD[(b4 - 1) * Fu + b5];
        }
        if (b6) {
          const b7 = (b4 * Fu + b5) * 4;
          FZ[b7] = b1;
          FZ[b7 + 1] = b2;
          FZ[b7 + 2] = b3;
        }
      }
    }
  }
  const Fc = FZ => {
    const FD = parseInt(FZ.slice(1), 16);
    return [FD >> 16 & 255, FD >> 8 & 255, FD & 255];
  };
  function FX(FZ, FD, Fu) {
    const Ft = FF(Fu, Fu);
    const Ff = Ft.getContext("2d");
    if (FZ) {
      Ff.drawImage(FZ, FD.cx - FD.r, FD.cy - FD.r, FD.r * 2, FD.r * 2, 0, 0, Fu, Fu);
      return Ft;
    } else {
      return null;
    }
  }
  const FN = new Map();
  function FL(FZ, FD) {
    if (FD && FN.has(FD)) {
      return FN.get(FD);
    }
    const Fu = FZ.width;
    const Ft = FF(Fu, Fu);
    const Ff = Ft.getContext("2d");
    Ff.drawImage(FZ, 0, 0);
    const b0 = Ff.getImageData(0, 0, Fu, Fu);
    const b1 = b0.data;
    const b2 = new Map();
    const b3 = (b9, bF) => {
      const bb = (bF * Fu + b9) * 4;
      const bw = (b1[bb] >> 4) + "|" + (b1[bb + 1] >> 4) + "|" + (b1[bb + 2] >> 4);
      const bY = b2.get(bw) || [0, 0, 0, 0];
      bY[0] += b1[bb];
      bY[1] += b1[bb + 1];
      bY[2] += b1[bb + 2];
      bY[3]++;
      b2.set(bw, bY);
    };
    for (let b9 = 0; b9 < Fu; b9 += 3) {
      for (const bF of [0, 4, 9]) {
        b3(b9, bF);
        if (b9 < Fu * 0.72) {
          b3(bF, b9);
          b3(Fu - 1 - bF, b9);
        }
      }
    }
    const b4 = [...b2.values()].sort((bb, bw) => bw[3] - bb[3]).slice(0, 8).filter(bb => bb[3] > 6).map(bb => [bb[0] / bb[3], bb[1] / bb[3], bb[2] / bb[3]]);
    const b5 = new Float32Array(Fu * Fu);
    const b6 = Fu / 2;
    const b7 = Fu * 0.46;
    for (let bb = 0; bb < Fu; bb++) {
      for (let bw = 0; bw < Fu; bw++) {
        const bY = bb * Fu + bw;
        const bk = bY * 4;
        let bj = 1000000000;
        for (const bc of b4) {
          const bX = b1[bk] - bc[0];
          const bN = b1[bk + 1] - bc[1];
          const bL = b1[bk + 2] - bc[2];
          const bE = bX * bX * 0.3 + bN * bN * 0.59 + bL * bL * 0.11;
          if (bE < bj) {
            bj = bE;
          }
        }
        const bp = Math.sqrt(bj);
        const bn = Math.pow((bw - b6) / (Fu * 0.27), 2) + Math.pow((bb - b7) / (Fu * 0.36), 2);
        let bv = Fb((bp - 18) / 34, 0, 1);
        if (bn < 1) {
          bv = Math.max(bv, Fb((1 - bn) * 4, 0, 1));
        }
        if (bb > Fu * 0.8) {
          bv *= Fb((Fu * 0.97 - bb) / (Fu * 0.17), 0, 1);
        }
        b5[bY] = bv * (b1[bk + 3] / 255);
      }
    }
    const b8 = new Float32Array(Fu * Fu);
    for (let bh = 0; bh < 2; bh++) {
      for (let bx = 1; bx < Fu - 1; bx++) {
        for (let bH = 1; bH < Fu - 1; bH++) {
          const bd = bx * Fu + bH;
          b8[bd] = (b5[bd] * 4 + b5[bd - 1] + b5[bd + 1] + b5[bd - Fu] + b5[bd + Fu]) / 8;
        }
      }
      b5.set(b8);
    }
    for (let bS = 0; bS < Fu * Fu; bS++) {
      b1[bS * 4 + 3] = Math.round(b5[bS] * 255);
    }
    Ff.putImageData(b0, 0, 0);
    if (FD) {
      FN.set(FD, Ft);
      if (FN.size > 12) {
        FN.delete(FN.keys().next().value);
      }
    }
    return Ft;
  }
  function FE(FZ) {
    try {
      const FD = FZ.width;
      const Fu = FZ.getContext("2d").getImageData(Math.round(FD * 0.36), Math.round(FD * 0.5), Math.round(FD * 0.28), Math.round(FD * 0.22)).data;
      let Ft = 0;
      let Ff = 0;
      let b0 = 0;
      let b1 = 0;
      for (let b2 = 0; b2 < Fu.length; b2 += 4) {
        if (Fu[b2 + 3] > 200) {
          Ft += Fu[b2];
          Ff += Fu[b2 + 1];
          b0 += Fu[b2 + 2];
          b1++;
        }
      }
      if (b1) {
        return "rgb(" + Math.round(Ft / b1) + "," + Math.round(Ff / b1) + "," + Math.round(b0 / b1) + ")";
      } else {
        return "#d9a47e";
      }
    } catch (b3) {
      return "#d9a47e";
    }
  }
  const Fh = new Map();
  function Fx(FZ, FD, Fu) {
    const Ft = Fu + "|" + FD;
    if (Fh.has(Ft)) {
      return Fh.get(Ft);
    }
    const Ff = FZ.width;
    const b0 = FF(Ff, Ff);
    const b1 = b0.getContext("2d");
    b1.drawImage(FZ, 0, 0);
    const b2 = b1.getImageData(0, 0, Ff, Ff);
    const b3 = b2.data;
    const b4 = new Uint8ClampedArray(Ff * Ff);
    for (let b5 = 0; b5 < Ff * Ff; b5++) {
      b4[b5] = b3[b5 * 4 + 3];
    }
    if (FD === "comic" || FD === "bighead" || FD === "superhero") {
      Fk(b3, Ff, Ff, 2);
      Fj(b3, 1.35, 6, 1.12);
      const b6 = Fn(b3, Ff, Ff, 150);
      Fp(b3, 5);
      Fv(b3, b6, Ff, Ff, [10, 18, 34], true);
      for (let b7 = 0; b7 < Ff; b7 += 7) {
        for (let b8 = b7 / 7 % 2 * 3; b8 < Ff; b8 += 7) {
          const b9 = (b7 * Ff + b8) * 4;
          if (b3[b9] * 0.299 + b3[b9 + 1] * 0.587 + b3[b9 + 2] * 0.114 < 95) {
            b3[b9] *= 0.55;
            b3[b9 + 1] *= 0.55;
            b3[b9 + 2] *= 0.6;
          }
        }
      }
    } else if (FD === "anime") {
      const bF = new Uint8ClampedArray(b3);
      Fk(bF, Ff, Ff, 2);
      const bb = Fn(bF, Ff, Ff, 190);
      Fk(b3, Ff, Ff, 5);
      Fk(b3, Ff, Ff, 4);
      Fj(b3, 1.55, 24, 1.08);
      Fp(b3, 5);
      Fv(b3, bb, Ff, Ff, [52, 36, 70], false);
    } else if (FD === "caricature") {
      const bw = new Uint8ClampedArray(b3);
      const bY = Ff / 2;
      const bk = Ff * 0.46;
      const bj = Ff * 0.52;
      for (let bn = 0; bn < Ff; bn++) {
        for (let bv = 0; bv < Ff; bv++) {
          const bc = bv - bY;
          const bX = bn - bk;
          const bN = Math.hypot(bc, bX);
          let bL = bv;
          let bE = bn;
          if (bN < bj) {
            const bH = Math.pow(bN / bj, 1.45) * bj / (bN || 1);
            bL = bY + bc * bH;
            bE = bk + bX * bH;
          }
          const bh = (Fb(Math.round(bE), 0, Ff - 1) * Ff + Fb(Math.round(bL), 0, Ff - 1)) * 4;
          const bx = (bn * Ff + bv) * 4;
          b3[bx] = bw[bh];
          b3[bx + 1] = bw[bh + 1];
          b3[bx + 2] = bw[bh + 2];
          b3[bx + 3] = bw[bh + 3];
        }
      }
      for (let bd = 0; bd < Ff * Ff; bd++) {
        b4[bd] = b3[bd * 4 + 3];
      }
      Fk(b3, Ff, Ff, 1);
      Fj(b3, 1.3, 8, 1.1);
      const bp = Fn(b3, Ff, Ff, 170);
      Fp(b3, 6);
      Fv(b3, bp, Ff, Ff, [20, 24, 40], true);
    } else if (FD === "sketch") {
      const bS = new Uint8ClampedArray(b3);
      Fj(bS, 0, 0, 1);
      const bA = new Float32Array(bS.length);
      for (let br = 0; br < bS.length; br += 4) {
        bA[br] = bA[br + 1] = bA[br + 2] = 255 - bS[br];
        bA[br + 3] = 255;
      }
      Fk(bA, Ff, Ff, 6);
      for (let bR = 0; bR < b3.length; bR += 4) {
        const bU = bS[bR];
        const bB = bA[bR];
        const bO = bB >= 255 ? 255 : Math.min(255, bU * 255 / (255 - bB));
        b3[bR] = Fb(bO * 0.98 + 4, 0, 255);
        b3[bR + 1] = Fb(bO * 0.98 + 2, 0, 255);
        b3[bR + 2] = Fb(bO * 0.95, 0, 255);
      }
    } else if (FD === "neon") {
      Fk(b3, Ff, Ff, 1);
      const bC = Fn(b3, Ff, Ff, 90);
      for (let bi = 0; bi < Ff * Ff; bi++) {
        const bW = bi * 4;
        if (bC[bi]) {
          b3[bW] = 140;
          b3[bW + 1] = 255;
          b3[bW + 2] = 150;
        } else {
          const bV = (b3[bW] * 0.299 + b3[bW + 1] * 0.587 + b3[bW + 2] * 0.114) * 0.22;
          b3[bW] = bV * 0.2;
          b3[bW + 1] = bV * 0.5 + 10;
          b3[bW + 2] = bV + 30;
        }
      }
    } else {
      if (FD === "pixel") {
        const bI = 44;
        const bG = FF(bI, bI);
        const bs = bG.getContext("2d");
        b1.putImageData(b2, 0, 0);
        bs.drawImage(b0, 0, 0, bI, bI);
        const by = bs.getImageData(0, 0, bI, bI);
        Fj(by.data, 1.3, 6, 1.1);
        Fp(by.data, 5);
        bs.putImageData(by, 0, 0);
        b1.clearRect(0, 0, Ff, Ff);
        b1.imageSmoothingEnabled = false;
        b1.drawImage(bG, 0, 0, Ff, Ff);
        b1.imageSmoothingEnabled = true;
        const bT = b1.getImageData(0, 0, Ff, Ff);
        for (let bP = 0; bP < Ff * Ff; bP++) {
          bT.data[bP * 4 + 3] = b4[bP] > 128 ? 255 : 0;
        }
        b1.putImageData(bT, 0, 0);
        Fh.set(Ft, b0);
        return b0;
      }
      if (FD === "watercolor") {
        Fk(b3, Ff, Ff, 3);
        Fj(b3, 1.2, 14, 0.95);
        Fp(b3, 7);
        const bK = Fn(b3, Ff, Ff, 200);
        const bg = F9(7);
        for (let bM = 0; bM < Ff * Ff; bM++) {
          const ba = bM * 4;
          const bm = (bg() - 0.5) * 18;
          b3[ba] = Fb(b3[ba] + bm, 0, 255);
          b3[ba + 1] = Fb(b3[ba + 1] + bm, 0, 255);
          b3[ba + 2] = Fb(b3[ba + 2] + bm, 0, 255);
          if (bK[bM]) {
            b3[ba] *= 0.82;
            b3[ba + 1] *= 0.84;
            b3[ba + 2] *= 0.88;
          }
        }
      } else if (FD === "glam") {
        const bQ = new Float32Array(b3);
        Fk(bQ, Ff, Ff, 6);
        for (let be = 0; be < b3.length; be += 4) {
          for (let bz = 0; bz < 3; bz++) {
            const bJ = 255 - (255 - b3[be + bz]) * (255 - bQ[be + bz]) / 255;
            b3[be + bz] = b3[be + bz] * 0.45 + bJ * 0.55;
          }
          b3[be] = Fb(b3[be] + 10, 0, 255);
          b3[be + 2] = Fb(b3[be + 2] + 6, 0, 255);
        }
        Fj(b3, 1.1, 0, 1.05);
      } else if (FD === "retro") {
        Fj(b3, 1.2, 4, 1.15);
        const bo = Fc("#ff5fa2");
        const bl = Fc("#3a1c71");
        for (let bq = 0; bq < Ff * Ff; bq++) {
          const bZ = bq * 4;
          const bD = (b3[bZ] * 0.299 + b3[bZ + 1] * 0.587 + b3[bZ + 2] * 0.114) / 255;
          b3[bZ] = bl[0] + (bo[0] - bl[0]) * bD;
          b3[bZ + 1] = bl[1] + (bo[1] - bl[1]) * bD + bD * 20;
          b3[bZ + 2] = bl[2] + (bo[2] - bl[2]) * bD;
        }
        Fp(b3, 6);
      } else if (FD === "soft") {
        Fk(b3, Ff, Ff, 1);
        Fj(b3, 1.1, 6, 1.08);
      } else {
        Fj(b3, 1.08, 4, 1.06);
      }
    }
    for (let bu = 0; bu < Ff * Ff; bu++) {
      b3[bu * 4 + 3] = b4[bu];
    }
    b1.putImageData(b2, 0, 0);
    Fh.set(Ft, b0);
    if (Fh.size > 40) {
      Fh.delete(Fh.keys().next().value);
    }
    return b0;
  }
  function FH(FZ, FD, Fu, Ft, Ff, b0) {
    b0 = b0 || 0;
    const b1 = F9(Ff || 3);
    if (Ft === "none") {
      FZ.clearRect(0, 0, FD, Fu);
      return;
    }
    if (Ft === "mist") {
      FZ.fillStyle = F4;
      FZ.fillRect(0, 0, FD, Fu);
      FZ.fillStyle = "rgba(107,192,99,.18)";
      FZ.beginPath();
      FZ.arc(FD * 0.82, Fu * 0.18, FD * 0.3, 0, 7);
      FZ.fill();
      FZ.fillStyle = "rgba(0,46,94,.07)";
      FZ.beginPath();
      FZ.arc(FD * 0.1, Fu * 0.92, FD * 0.35, 0, 7);
      FZ.fill();
      return;
    }
    if (Ft === "burst") {
      FZ.fillStyle = F1;
      FZ.fillRect(0, 0, FD, Fu);
      FZ.save();
      FZ.translate(FD / 2, Fu * 0.45);
      FZ.rotate(b0 * Math.PI / 6);
      for (let b3 = 0; b3 < 18; b3++) {
        FZ.fillStyle = b3 % 2 ? "#0b3d73" : F1;
        FZ.beginPath();
        FZ.moveTo(0, 0);
        FZ.arc(0, 0, FD * 1.2, b3 * Math.PI / 9, (b3 + 1) * Math.PI / 9);
        FZ.closePath();
        FZ.fill();
      }
      FZ.restore();
      FZ.strokeStyle = F2;
      FZ.lineWidth = FD * 0.012;
      FZ.beginPath();
      FZ.arc(FD / 2, Fu * 0.45, FD * 0.43, 0, 7);
      FZ.stroke();
      return;
    }
    if (Ft === "confetti") {
      FZ.fillStyle = F4;
      FZ.fillRect(0, 0, FD, Fu);
      const b4 = [F1, F2, F3, F6, "#9fd49a"];
      for (let b5 = 0; b5 < 70; b5++) {
        FZ.save();
        FZ.translate(b1() * FD, b1() * Fu);
        FZ.rotate(b1() * 6);
        FZ.fillStyle = b4[b5 % b4.length];
        FZ.globalAlpha = 0.55;
        FZ.fillRect(-FD * 0.012, -FD * 0.005, FD * 0.024, FD * 0.01);
        FZ.restore();
      }
      return;
    }
    if (Ft === "skyline") {
      const b6 = FZ.createLinearGradient(0, 0, 0, Fu);
      b6.addColorStop(0, "#0b2a52");
      b6.addColorStop(0.62, "#2c6aa6");
      b6.addColorStop(1, "#8cc6e8");
      FZ.fillStyle = b6;
      FZ.fillRect(0, 0, FD, Fu);
      FZ.fillStyle = "rgba(255,255,255,.7)";
      for (let b8 = 0; b8 < 30; b8++) {
        FZ.fillRect(b1() * FD, b1() * Fu * 0.45, 2, 2);
      }
      FZ.fillStyle = "#0a2342";
      let b7 = 0;
      while (b7 < FD) {
        const b9 = FD * (0.05 + b1() * 0.07);
        const bF = Fu * (0.12 + b1() * 0.3);
        FZ.fillRect(b7, Fu * 0.78 - bF, b9, bF + Fu);
        FZ.fillStyle = "rgba(242,193,78,.55)";
        for (let bb = Fu * 0.78 - bF + 8; bb < Fu * 0.76; bb += 12) {
          for (let bw = b7 + 5; bw < b7 + b9 - 5; bw += 9) {
            if (b1() > 0.55) {
              FZ.fillRect(bw, bb, 3, 4);
            }
          }
        }
        FZ.fillStyle = "#0a2342";
        b7 += b9 + 2;
      }
      FZ.fillStyle = "#0d3b66";
      FZ.fillRect(0, Fu * 0.8, FD, Fu * 0.2);
      FZ.strokeStyle = F2;
      FZ.lineWidth = FD * 0.01;
      FZ.beginPath();
      FZ.moveTo(0, Fu * 0.79);
      FZ.quadraticCurveTo(FD / 2, Fu * 0.62, FD, Fu * 0.79);
      FZ.stroke();
      FZ.strokeStyle = "rgba(107,192,99,.6)";
      FZ.lineWidth = 2;
      for (let bY = 1; bY < 12; bY++) {
        const bk = FD * bY / 12;
        const bj = Fu * 0.79 - Math.sin(Math.PI * bY / 12) * Fu * 0.085;
        FZ.beginPath();
        FZ.moveTo(bk, bj);
        FZ.lineTo(bk, Fu * 0.8);
        FZ.stroke();
      }
      return;
    }
    if (Ft === "beach") {
      const bp = FZ.createLinearGradient(0, 0, 0, Fu);
      bp.addColorStop(0, "#ffd6a5");
      bp.addColorStop(0.5, "#ffe9c7");
      bp.addColorStop(0.62, "#7fc8e8");
      bp.addColorStop(0.82, "#2f8fc4");
      bp.addColorStop(0.83, "#f3dfb2");
      bp.addColorStop(1, "#e9cf98");
      FZ.fillStyle = bp;
      FZ.fillRect(0, 0, FD, Fu);
      FZ.fillStyle = "rgba(255,190,90,.85)";
      FZ.beginPath();
      FZ.arc(FD * 0.72, Fu * 0.52, FD * 0.13, Math.PI, 0);
      FZ.fill();
      FZ.strokeStyle = "rgba(255,255,255,.7)";
      FZ.lineWidth = 3;
      for (let bn = 0; bn < 5; bn++) {
        FZ.beginPath();
        for (let bv = 0; bv <= FD; bv += 10) {
          FZ.lineTo(bv, Fu * (0.66 + bn * 0.035) + Math.sin(bv / 30 + bn + b0 * 6.28) * 3);
        }
        FZ.stroke();
      }
      return;
    }
    if (Ft === "sunset") {
      const bc = FZ.createLinearGradient(0, 0, 0, Fu);
      bc.addColorStop(0, "#120a3a");
      bc.addColorStop(0.5, "#6b2a8c");
      bc.addColorStop(0.62, "#ff6aa2");
      bc.addColorStop(0.63, "#140a2e");
      bc.addColorStop(1, "#140a2e");
      FZ.fillStyle = bc;
      FZ.fillRect(0, 0, FD, Fu);
      const bX = FZ.createLinearGradient(0, Fu * 0.25, 0, Fu * 0.62);
      bX.addColorStop(0, "#ffd36e");
      bX.addColorStop(1, "#ff4f9a");
      FZ.fillStyle = bX;
      FZ.beginPath();
      FZ.arc(FD / 2, Fu * 0.62, FD * 0.26, Math.PI, 0);
      FZ.fill();
      FZ.fillStyle = "#6b2a8c";
      for (let bN = 0; bN < 6; bN++) {
        FZ.fillRect(0, Fu * (0.5 + bN * 0.022), FD, 2 + bN);
      }
      FZ.strokeStyle = F2;
      FZ.lineWidth = 2;
      for (let bL = 0; bL < 9; bL++) {
        const bE = Fu * 0.63 + Math.pow((bL + b0 % 1) / 9, 2) * Fu * 0.37;
        FZ.beginPath();
        FZ.moveTo(0, bE);
        FZ.lineTo(FD, bE);
        FZ.stroke();
      }
      for (let bh = -8; bh <= 8; bh++) {
        FZ.beginPath();
        FZ.moveTo(FD / 2 + bh * FD * 0.03, Fu * 0.63);
        FZ.lineTo(FD / 2 + bh * FD * 0.2, Fu);
        FZ.stroke();
      }
      return;
    }
    if (Ft === "glam") {
      const bx = FZ.createLinearGradient(0, 0, FD, Fu);
      bx.addColorStop(0, "#ffd1e3");
      bx.addColorStop(0.55, "#f48fb8");
      bx.addColorStop(1, "#c2457d");
      FZ.fillStyle = bx;
      FZ.fillRect(0, 0, FD, Fu);
      for (let bH = 0; bH < 26; bH++) {
        Fd(FZ, b1() * FD, b1() * Fu, FD * (0.008 + b1() * 0.018) * (0.6 + Math.sin(b0 * 6.28 + bH) * 0.4), bH % 5 ? "#fff" : F2, 0.8);
      }
      return;
    }
    const b2 = FZ.createRadialGradient(FD * 0.5, Fu * 0.4, FD * 0.1, FD * 0.5, Fu * 0.5, FD * 0.8);
    b2.addColorStop(0, "#0c4a8a");
    b2.addColorStop(1, "#001a36");
    FZ.fillStyle = b2;
    FZ.fillRect(0, 0, FD, Fu);
    FZ.save();
    FZ.globalAlpha = 0.9;
    FZ.fillStyle = F2;
    FZ.beginPath();
    FZ.moveTo(FD * 0.78, 0);
    FZ.lineTo(FD * 0.81, 0);
    FZ.lineTo(FD * 0.58, Fu);
    FZ.lineTo(FD * 0.55, Fu);
    FZ.fill();
    FZ.globalAlpha = 0.35;
    FZ.fillStyle = F3;
    FZ.beginPath();
    FZ.moveTo(FD * 0.84, 0);
    FZ.lineTo(FD * 0.855, 0);
    FZ.lineTo(FD * 0.635, Fu);
    FZ.lineTo(FD * 0.62, Fu);
    FZ.fill();
    FZ.restore();
    FZ.fillStyle = "rgba(255,255,255,.06)";
    for (let bd = FD * 0.04; bd < Fu; bd += FD * 0.05) {
      for (let bS = FD * 0.04; bS < FD * 0.3; bS += FD * 0.05) {
        FZ.beginPath();
        FZ.arc(bS, bd, FD * 0.005, 0, 7);
        FZ.fill();
      }
    }
  }
  function Fd(FZ, FD, Fu, Ft, Ff, b0) {
    FZ.save();
    FZ.globalAlpha = b0 == null ? 1 : b0;
    FZ.fillStyle = Ff;
    FZ.beginPath();
    FZ.moveTo(FD, Fu - Ft);
    FZ.quadraticCurveTo(FD, Fu, FD + Ft, Fu);
    FZ.quadraticCurveTo(FD, Fu, FD, Fu + Ft);
    FZ.quadraticCurveTo(FD, Fu, FD - Ft, Fu);
    FZ.quadraticCurveTo(FD, Fu, FD, Fu - Ft);
    FZ.fill();
    FZ.restore();
  }
  function FS(FZ, FD, Fu, Ft, Ff) {
    FZ.fillStyle = Ff;
    FZ.beginPath();
    FZ.moveTo(FD, Fu + Ft * 0.9);
    FZ.bezierCurveTo(FD - Ft * 1.6, Fu - Ft * 0.2, FD - Ft * 0.7, Fu - Ft * 1.3, FD, Fu - Ft * 0.45);
    FZ.bezierCurveTo(FD + Ft * 0.7, Fu - Ft * 1.3, FD + Ft * 1.6, Fu - Ft * 0.2, FD, Fu + Ft * 0.9);
    FZ.fill();
  }
  function FA(FZ, FD, Fu, Ft, Ff, b0) {
    FZ.fillStyle = b0 || "#ffffff";
    FZ.fillRect(FD - Ft * 0.7, Fu - Ft * 0.1, Ft * 1.4, Ft * 0.95);
    FZ.fillStyle = Ff || F2;
    FZ.beginPath();
    FZ.moveTo(FD - Ft * 0.95, Fu - Ft * 0.05);
    FZ.lineTo(FD, Fu - Ft * 0.85);
    FZ.lineTo(FD + Ft * 0.95, Fu - Ft * 0.05);
    FZ.closePath();
    FZ.fill();
    FZ.fillStyle = F1;
    FZ.fillRect(FD - Ft * 0.18, Fu + Ft * 0.3, Ft * 0.36, Ft * 0.55);
    FZ.fillStyle = "rgba(0,46,94,.35)";
    FZ.fillRect(FD + Ft * 0.3, Fu + Ft * 0.12, Ft * 0.24, Ft * 0.24);
    FZ.fillRect(FD - Ft * 0.54, Fu + Ft * 0.12, Ft * 0.24, Ft * 0.24);
  }
  function Fr(FZ, FD, Fu, Ft, Ff) {
    FZ.save();
    FZ.translate(FD, Fu);
    FZ.rotate(Ff || -0.6);
    FZ.strokeStyle = F6;
    FZ.fillStyle = F6;
    FZ.lineWidth = Ft * 0.16;
    FZ.beginPath();
    FZ.arc(-Ft * 0.45, 0, Ft * 0.32, 0, 7);
    FZ.stroke();
    FZ.fillRect(-Ft * 0.15, -Ft * 0.08, Ft * 0.95, Ft * 0.16);
    FZ.fillRect(Ft * 0.55, 0, Ft * 0.12, Ft * 0.28);
    FZ.fillRect(Ft * 0.72, 0, Ft * 0.1, Ft * 0.2);
    FZ.fillStyle = F2;
    FZ.beginPath();
    FZ.arc(-Ft * 0.45, 0, Ft * 0.1, 0, 7);
    FZ.fill();
    FZ.restore();
  }
  function FR(FZ, FD, Fu, Ft, Ff) {
    FZ.save();
    FZ.translate(FD, Fu);
    FZ.rotate(Ff || 0);
    FZ.fillStyle = "#4c9a45";
    Fw(FZ, -Ft, -Ft * 0.55, Ft * 2, Ft * 1.1, Ft * 0.12);
    FZ.fill();
    FZ.strokeStyle = "#d9f2d5";
    FZ.lineWidth = Ft * 0.08;
    Fw(FZ, -Ft * 0.85, -Ft * 0.42, Ft * 1.7, Ft * 0.84, Ft * 0.08);
    FZ.stroke();
    FZ.fillStyle = "#eaf7e8";
    FZ.font = "900 " + Ft * 0.8 + "px " + F7;
    FZ.textAlign = "center";
    FZ.textBaseline = "middle";
    FZ.fillText("$", 0, Ft * 0.04);
    FZ.restore();
  }
  function FU(FZ, FD, Fu, Ft, Ff) {
    FZ.strokeStyle = "rgba(255,255,255,.7)";
    FZ.lineWidth = 1.5;
    FZ.beginPath();
    FZ.moveTo(FD, Fu + Ft * 1.2);
    FZ.quadraticCurveTo(FD + Ft * 0.3, Fu + Ft * 2, FD, Fu + Ft * 2.8);
    FZ.stroke();
    FZ.fillStyle = Ff;
    FZ.beginPath();
    FZ.ellipse(FD, Fu, Ft * 0.85, Ft * 1.1, 0, 0, 7);
    FZ.fill();
    FZ.fillStyle = "rgba(255,255,255,.35)";
    FZ.beginPath();
    FZ.ellipse(FD - Ft * 0.3, Fu - Ft * 0.4, Ft * 0.18, Ft * 0.3, -0.5, 0, 7);
    FZ.fill();
  }
  function FB(FZ, FD, Fu, Ft, Ff) {
    const b0 = Ft * 0.42;
    FZ.fillStyle = "#ffffff";
    Fw(FZ, FD - Ft / 2, Fu - b0 / 2, Ft, b0, Ft * 0.04);
    FZ.fill();
    FZ.lineWidth = Ft * 0.025;
    FZ.strokeStyle = F1;
    FZ.stroke();
    FZ.fillStyle = "#c8323c";
    FY(FZ, Ff || "SOLD!", Ft * 0.82, Math.round(b0 * 0.62), 900);
    FZ.textAlign = "center";
    FZ.textBaseline = "middle";
    FZ.fillText(Ff || "SOLD!", FD, Fu + b0 * 0.04);
    FZ.fillStyle = F2;
    FZ.fillRect(FD - Ft / 2 + Ft * 0.06, Fu + b0 / 2 - b0 * 0.14, Ft * 0.88, b0 * 0.06);
  }
  const FO = {
    house: (FZ, FD, Fu, Ft) => FA(FZ, FD, Fu, Ft * 0.55, F2, "#fff"),
    keys: (FZ, FD, Fu, Ft) => Fr(FZ, FD, Fu, Ft * 0.5),
    coffee: (FZ, FD, Fu, Ft) => function (Ff, b0, b1, b2) {
      Ff.fillStyle = "#ffffff";
      Ff.beginPath();
      Ff.moveTo(b0 - b2 * 0.5, b1 - b2 * 0.6);
      Ff.lineTo(b0 + b2 * 0.5, b1 - b2 * 0.6);
      Ff.lineTo(b0 + b2 * 0.4, b1 + b2 * 0.7);
      Ff.lineTo(b0 - b2 * 0.4, b1 + b2 * 0.7);
      Ff.fill();
      Ff.fillStyle = F1;
      Ff.fillRect(b0 - b2 * 0.56, b1 - b2 * 0.78, b2 * 1.12, b2 * 0.2);
      Ff.fillStyle = F2;
      Ff.beginPath();
      Ff.arc(b0, b1 + b2 * 0.05, b2 * 0.22, 0, 7);
      Ff.fill();
      Ff.fillStyle = "#fff";
      Ff.font = "900 " + b2 * 0.18 + "px " + F7;
      Ff.textAlign = "center";
      Ff.textBaseline = "middle";
      Ff.fillText("iM", b0, b1 + b2 * 0.06);
    }(FZ, FD, Fu, Ft * 0.5),
    megaphone: (FZ, FD, Fu, Ft) => function (Ff, b0, b1, b2) {
      Ff.fillStyle = "#e8ecf1";
      Ff.beginPath();
      Ff.moveTo(b0 - b2 * 0.7, b1 - b2 * 0.2);
      Ff.lineTo(b0 + b2 * 0.6, b1 - b2 * 0.65);
      Ff.lineTo(b0 + b2 * 0.6, b1 + b2 * 0.65);
      Ff.lineTo(b0 - b2 * 0.7, b1 + b2 * 0.2);
      Ff.fill();
      Ff.fillStyle = F2;
      Ff.fillRect(b0 - b2 * 0.85, b1 - b2 * 0.25, b2 * 0.2, b2 * 0.5);
      Ff.fillStyle = F1;
      Ff.beginPath();
      Ff.ellipse(b0 + b2 * 0.6, b1, b2 * 0.12, b2 * 0.65, 0, 0, 7);
      Ff.fill();
    }(FZ, FD, Fu, Ft * 0.55),
    trophy: (FZ, FD, Fu, Ft) => function (Ff, b0, b1, b2) {
      Ff.fillStyle = F6;
      Ff.beginPath();
      Ff.moveTo(b0 - b2 * 0.6, b1 - b2 * 0.8);
      Ff.lineTo(b0 + b2 * 0.6, b1 - b2 * 0.8);
      Ff.quadraticCurveTo(b0 + b2 * 0.6, b1 + b2 * 0.2, b0, b1 + b2 * 0.25);
      Ff.quadraticCurveTo(b0 - b2 * 0.6, b1 + b2 * 0.2, b0 - b2 * 0.6, b1 - b2 * 0.8);
      Ff.fill();
      Ff.lineWidth = b2 * 0.12;
      Ff.strokeStyle = F6;
      Ff.beginPath();
      Ff.arc(b0 - b2 * 0.62, b1 - b2 * 0.45, b2 * 0.25, Math.PI / 2, Math.PI * 1.5);
      Ff.stroke();
      Ff.beginPath();
      Ff.arc(b0 + b2 * 0.62, b1 - b2 * 0.45, b2 * 0.25, -Math.PI / 2, Math.PI / 2);
      Ff.stroke();
      Ff.fillRect(b0 - b2 * 0.1, b1 + b2 * 0.2, b2 * 0.2, b2 * 0.35);
      Ff.fillStyle = F1;
      Ff.fillRect(b0 - b2 * 0.45, b1 + b2 * 0.55, b2 * 0.9, b2 * 0.25);
      Ff.fillStyle = F2;
      Ff.fillRect(b0 - b2 * 0.45, b1 + b2 * 0.55, b2 * 0.9, b2 * 0.06);
    }(FZ, FD, Fu, Ft * 0.55),
    money: (FZ, FD, Fu, Ft) => {
      FR(FZ, FD - Ft * 0.1, Fu + Ft * 0.08, Ft * 0.38, -0.2);
      FR(FZ, FD + Ft * 0.08, Fu - Ft * 0.05, Ft * 0.38, 0.15);
    },
    balloons: (FZ, FD, Fu, Ft) => {
      FU(FZ, FD - Ft * 0.32, Fu - Ft * 0.3, Ft * 0.22, F1);
      FU(FZ, FD + Ft * 0.05, Fu - Ft * 0.5, Ft * 0.24, F2);
      FU(FZ, FD + Ft * 0.38, Fu - Ft * 0.25, Ft * 0.2, F3);
    }
  };
  function FC(FZ, FD, Fu, Ft, Ff, b0) {
    if (!FD || FD === "none") {
      return;
    }
    const b1 = Ff * (b0 && b0.s || 1);
    const b2 = Ft - Ff * 0.78 + (b0 && b0.dy || 0) * Ff;
    FZ.save();
    FZ.translate(Fu, b2);
    FZ.lineJoin = "round";
    const b3 = () => {
      FZ.lineWidth = Ff * 0.035;
      FZ.strokeStyle = F5;
      FZ.stroke();
    };
    if (FD === "hardhat") {
      FZ.fillStyle = "#f5c518";
      FZ.beginPath();
      FZ.ellipse(0, b1 * 0.05, b1 * 1, b1 * 0.2, 0, 0, 7);
      FZ.fill();
      b3();
      FZ.beginPath();
      FZ.arc(0, b1 * 0.02, b1 * 0.72, Math.PI, 0);
      FZ.closePath();
      FZ.fill();
      b3();
      FZ.fillStyle = F2;
      FZ.fillRect(-b1 * 0.08, -b1 * 0.66, b1 * 0.16, b1 * 0.66);
    } else if (FD === "crown") {
      FZ.fillStyle = F6;
      FZ.beginPath();
      FZ.moveTo(-b1 * 0.75, b1 * 0.15);
      FZ.lineTo(-b1 * 0.8, -b1 * 0.5);
      FZ.lineTo(-b1 * 0.4, -b1 * 0.15);
      FZ.lineTo(0, -b1 * 0.65);
      FZ.lineTo(b1 * 0.4, -b1 * 0.15);
      FZ.lineTo(b1 * 0.8, -b1 * 0.5);
      FZ.lineTo(b1 * 0.75, b1 * 0.15);
      FZ.closePath();
      FZ.fill();
      b3();
      [[-0.5, -0.02], [0, -0.1], [0.5, -0.02]].forEach(([b4, b5], b6) => {
        FZ.fillStyle = b6 === 1 ? F2 : F1;
        FZ.beginPath();
        FZ.arc(b4 * b1, b5 * b1, b1 * 0.09, 0, 7);
        FZ.fill();
      });
    } else if (FD === "party") {
      FZ.fillStyle = F1;
      FZ.beginPath();
      FZ.moveTo(-b1 * 0.45, b1 * 0.15);
      FZ.lineTo(b1 * 0.05, -b1 * 1.05);
      FZ.lineTo(b1 * 0.5, b1 * 0.15);
      FZ.closePath();
      FZ.fill();
      FZ.save();
      FZ.clip();
      FZ.strokeStyle = F2;
      FZ.lineWidth = b1 * 0.14;
      for (let b4 = -3; b4 < 4; b4++) {
        FZ.beginPath();
        FZ.moveTo(-b1, b4 * b1 * 0.32);
        FZ.lineTo(b1, b4 * b1 * 0.32 - b1 * 0.5);
        FZ.stroke();
      }
      FZ.restore();
      FZ.beginPath();
      FZ.moveTo(-b1 * 0.45, b1 * 0.15);
      FZ.lineTo(b1 * 0.05, -b1 * 1.05);
      FZ.lineTo(b1 * 0.5, b1 * 0.15);
      FZ.closePath();
      b3();
      FZ.fillStyle = "#fff";
      FZ.beginPath();
      FZ.arc(b1 * 0.05, -b1 * 1.08, b1 * 0.14, 0, 7);
      FZ.fill();
    } else if (FD === "grad") {
      FZ.fillStyle = "#16191d";
      FZ.fillRect(-b1 * 0.55, -b1 * 0.1, b1 * 1.1, b1 * 0.3);
      FZ.beginPath();
      FZ.moveTo(0, -b1 * 0.55);
      FZ.lineTo(b1 * 1, -b1 * 0.2);
      FZ.lineTo(0, b1 * 0.12);
      FZ.lineTo(-b1 * 1, -b1 * 0.2);
      FZ.closePath();
      FZ.fill();
      b3();
      FZ.strokeStyle = F2;
      FZ.lineWidth = b1 * 0.05;
      FZ.beginPath();
      FZ.moveTo(0, -b1 * 0.22);
      FZ.lineTo(b1 * 0.75, -b1 * 0.05);
      FZ.lineTo(b1 * 0.78, b1 * 0.45);
      FZ.stroke();
      FZ.fillStyle = F2;
      FZ.fillRect(b1 * 0.72, b1 * 0.42, b1 * 0.12, b1 * 0.22);
    } else if (FD === "cowboy") {
      FZ.fillStyle = "#8a5a36";
      FZ.beginPath();
      FZ.ellipse(0, b1 * 0.08, b1 * 1.15, b1 * 0.22, 0, 0, 7);
      FZ.fill();
      b3();
      FZ.beginPath();
      FZ.moveTo(-b1 * 0.55, b1 * 0.05);
      FZ.quadraticCurveTo(-b1 * 0.6, -b1 * 0.75, -b1 * 0.15, -b1 * 0.6);
      FZ.quadraticCurveTo(0, -b1 * 0.45, b1 * 0.15, -b1 * 0.6);
      FZ.quadraticCurveTo(b1 * 0.6, -b1 * 0.75, b1 * 0.55, b1 * 0.05);
      FZ.closePath();
      FZ.fill();
      b3();
      FZ.fillStyle = F1;
      FZ.fillRect(-b1 * 0.55, -b1 * 0.1, b1 * 1.1, b1 * 0.12);
    } else if (FD === "santa") {
      FZ.fillStyle = "#c8323c";
      FZ.beginPath();
      FZ.moveTo(-b1 * 0.75, b1 * 0.05);
      FZ.quadraticCurveTo(-b1 * 0.3, -b1 * 1, b1 * 0.45, -b1 * 0.75);
      FZ.quadraticCurveTo(b1 * 0.95, -b1 * 0.55, b1 * 1.05, -b1 * 0.05);
      FZ.lineTo(b1 * 0.75, b1 * 0.05);
      FZ.closePath();
      FZ.fill();
      b3();
      FZ.fillStyle = "#fff";
      Fw(FZ, -b1 * 0.85, -b1 * 0.05, b1 * 1.7, b1 * 0.28, b1 * 0.14);
      FZ.fill();
      FZ.beginPath();
      FZ.arc(b1 * 1.05, -b1 * 0.05, b1 * 0.17, 0, 7);
      FZ.fill();
    } else if (FD === "beanie") {
      FZ.fillStyle = F1;
      FZ.beginPath();
      FZ.arc(0, b1 * 0.05, b1 * 0.78, Math.PI, 0);
      FZ.closePath();
      FZ.fill();
      b3();
      FZ.fillStyle = F2;
      FZ.fillRect(-b1 * 0.8, -b1 * 0.05, b1 * 1.6, b1 * 0.24);
      FZ.fillStyle = "#fff";
      FZ.beginPath();
      FZ.arc(0, -b1 * 0.8, b1 * 0.16, 0, 7);
      FZ.fill();
    } else if (FD === "chef") {
      FZ.fillStyle = "#ffffff";
      [[-0.4, -0.45, 0.38], [0, -0.62, 0.42], [0.4, -0.45, 0.38]].forEach(([b5, b6, b7]) => {
        FZ.beginPath();
        FZ.arc(b5 * b1, b6 * b1, b7 * b1, 0, 7);
        FZ.fill();
      });
      FZ.fillRect(-b1 * 0.6, -b1 * 0.4, b1 * 1.2, b1 * 0.55);
      FZ.strokeStyle = "rgba(0,0,0,.15)";
      FZ.lineWidth = 2;
      FZ.strokeRect(-b1 * 0.6, -b1 * 0.05, b1 * 1.2, b1 * 0.2);
    }
    FZ.restore();
  }
  function Fi(FZ, FD, Fu, Ft, Ff, b0) {
    if (!FD || FD === "none") {
      return;
    }
    const b1 = Ff * (b0 && b0.s || 1);
    const b2 = Ft - Ff * 0.1 + (b0 && b0.dy || 0) * Ff;
    FZ.save();
    FZ.translate(Fu, b2);
    const b3 = Ff * 0.05;
    const b4 = (b5, b6) => {
      if (FD !== "heart") {
        if (FD === "star") {
          FZ.fillStyle = b6;
          FZ.beginPath();
          for (let b7 = 0; b7 < 10; b7++) {
            const b8 = -Math.PI / 2 + b7 * Math.PI / 5;
            const b9 = b7 % 2 ? b1 * 0.12 : b1 * 0.27;
            FZ.lineTo(b5 + Math.cos(b8) * b9, Math.sin(b8) * b9);
          }
          FZ.closePath();
          FZ.fill();
          return;
        }
        FZ.fillStyle = b6;
        Fw(FZ, b5 - b1 * 0.27, -b1 * 0.16, b1 * 0.54, b1 * 0.34, b1 * (FD === "nerd" ? 0.16 : 0.1));
        FZ.fill();
      } else {
        FS(FZ, b5, b1 * 0.02, b1 * 0.22, b6);
      }
    };
    if (FD === "sun") {
      b4(-b1 * 0.33, "#111820");
      b4(b1 * 0.33, "#111820");
      FZ.fillStyle = "rgba(255,255,255,.4)";
      FZ.fillRect(-b1 * 0.5, -b1 * 0.12, b1 * 0.1, b1 * 0.05);
      FZ.fillRect(b1 * 0.16, -b1 * 0.12, b1 * 0.1, b1 * 0.05);
    } else if (FD === "heart") {
      b4(-b1 * 0.33, "#e8609a");
      b4(b1 * 0.33, "#e8609a");
    } else if (FD === "star") {
      b4(-b1 * 0.33, F6);
      b4(b1 * 0.33, F6);
    } else if (FD === "nerd") {
      FZ.strokeStyle = "#16191d";
      FZ.lineWidth = b3 * 1.4;
      [-0.33, 0.33].forEach(b5 => {
        Fw(FZ, b5 * b1 - b1 * 0.25, -b1 * 0.15, b1 * 0.5, b1 * 0.32, b1 * 0.14);
        FZ.stroke();
      });
    }
    FZ.strokeStyle = FD === "nerd" ? "#16191d" : "#111820";
    FZ.lineWidth = b3;
    FZ.beginPath();
    FZ.moveTo(-b1 * 0.08, -b1 * 0.03);
    FZ.quadraticCurveTo(0, -b1 * 0.09, b1 * 0.08, -b1 * 0.03);
    FZ.stroke();
    FZ.beginPath();
    FZ.moveTo(-b1 * 0.6, -b1 * 0.06);
    FZ.lineTo(-b1 * 0.72, -b1 * 0.1);
    FZ.moveTo(b1 * 0.6, -b1 * 0.06);
    FZ.lineTo(b1 * 0.72, -b1 * 0.1);
    FZ.stroke();
    FZ.restore();
  }
  const FW = {
    relaxed: {
      L: [[250, 820], [250, 1020]],
      R: [[750, 820], [750, 1020]]
    },
    celebrate: {
      L: [[210, 560], [190, 400]],
      R: [[790, 560], [810, 400]],
      hand: "fist"
    },
    wave: {
      L: [[250, 820], [250, 1020]],
      R: [[790, 600], [820, 450]],
      hand: "open"
    },
    point: {
      L: [[250, 820], [250, 1020]],
      R: [[780, 600], [880, 470]],
      hand: "point"
    },
    keys: {
      L: [[250, 820], [250, 1020]],
      R: [[690, 820], [610, 780]],
      hand: "keys"
    },
    sign: {
      L: [[260, 820], [370, 790]],
      R: [[740, 820], [630, 790]],
      hand: "sign"
    },
    fly: {
      L: [[220, 700], [160, 640]],
      R: [[790, 520], [860, 370]],
      hand: "fist"
    }
  };
  function FV(FZ, FD, Fu, Ft) {
    FZ.fillStyle = F2;
    FZ.beginPath();
    FZ.arc(FD, Fu, Ft, 0, 7);
    FZ.fill();
    FZ.fillStyle = "#fff";
    FZ.font = "900 " + Ft * 0.9 + "px " + F7;
    FZ.textAlign = "center";
    FZ.textBaseline = "middle";
    FZ.fillText("iM", FD, Fu + Ft * 0.05);
  }
  const FI = {
    relaxed: {
      L: [[338, 425], [330, 540]],
      R: [[662, 425], [670, 540]]
    },
    celebrate: {
      L: [[295, 215], [285, 105]],
      R: [[705, 215], [715, 105]],
      h: "fist",
      l: "fist",
      spread: 1
    },
    wave: {
      L: [[338, 425], [330, 540]],
      R: [[735, 300], [745, 175]],
      h: "open"
    },
    point: {
      L: [[338, 425], [330, 540]],
      R: [[730, 280], [800, 175]],
      h: "point"
    },
    keys: {
      L: [[338, 425], [330, 540]],
      R: [[700, 420], [610, 465]],
      h: "keys"
    },
    sign: {
      L: [[355, 430], [405, 470]],
      R: [[645, 430], [595, 470]],
      h: "sign",
      l: "sign"
    },
    fly: {
      L: [[320, 400], [305, 500]],
      R: [[705, 205], [720, 85]],
      h: "fist",
      spread: 1
    }
  };
  function FG(FZ, FD) {
    let Fu;
    let Ft;
    let Ff;
    const b0 = /^#?([0-9a-f]{6})$/i.exec(FZ);
    const b1 = /rgba?\((\d+),\s*(\d+),\s*(\d+)/i.exec(FZ);
    if (b0) {
      const b3 = parseInt(b0[1], 16);
      Fu = b3 >> 16 & 255;
      Ft = b3 >> 8 & 255;
      Ff = b3 & 255;
    } else {
      if (!b1) {
        return FZ;
      }
      Fu = +b1[1];
      Ft = +b1[2];
      Ff = +b1[3];
    }
    const b2 = b4 => Fb(Math.round(FD < 0 ? b4 * (1 + FD) : b4 + (255 - b4) * FD), 0, 255);
    return "rgb(" + b2(Fu) + "," + b2(Ft) + "," + b2(Ff) + ")";
  }
  function Fs(FZ, FD, Fu, Ft, Ff, b0) {
    FZ.save();
    FZ.lineCap = "round";
    FZ.lineJoin = "round";
    if (b0) {
      FZ.beginPath();
      FD.forEach((b1, b2) => b2 ? FZ.lineTo(b1[0], b1[1]) : FZ.moveTo(b1[0], b1[1]));
      FZ.lineWidth = (Array.isArray(Fu) ? Fu[0] : Fu) + b0 * 2;
      FZ.strokeStyle = Ff;
      FZ.stroke();
    }
    for (let b1 = 0; b1 < FD.length - 1; b1++) {
      const [b2, b3] = FD[b1];
      const [b4, b5] = FD[b1 + 1];
      const b6 = b4 - b2;
      const b7 = b5 - b3;
      const b8 = Math.hypot(b6, b7) || 1;
      let b9 = -b7 / b8;
      let bF = b6 / b8;
      if (b9 > 0 || b9 === 0 && bF > 0) {
        b9 = -b9;
        bF = -bF;
      }
      const bb = (b2 + b4) / 2;
      const bw = (b3 + b5) / 2;
      const bY = Array.isArray(Fu) ? Fu[b1] : Fu;
      const bk = FZ.createLinearGradient(bb + b9 * bY / 2, bw + bF * bY / 2, bb - b9 * bY / 2, bw - bF * bY / 2);
      bk.addColorStop(0, FG(Ft, -0.2));
      bk.addColorStop(0.22, FG(Ft, 0.2));
      bk.addColorStop(0.4, FG(Ft, 0.08));
      bk.addColorStop(0.72, Ft);
      bk.addColorStop(1, FG(Ft, -0.42));
      const bj = Array.isArray(Fu) ? Fu[b1] : Fu;
      FZ.beginPath();
      FZ.moveTo(b2, b3);
      FZ.lineTo(b4, b5);
      FZ.lineWidth = bj;
      FZ.strokeStyle = bk;
      FZ.stroke();
    }
    FZ.restore();
  }
  function Fy(FZ, FD, Fu, Ft) {
    FZ.save();
    FD();
    FZ.clip();
    const [Ff, b0, b1, b2] = Fu;
    const b3 = FZ.createRadialGradient(Ff + b1 * 0.3, b0 + b2 * 0.22, 4, Ff + b1 * 0.45, b0 + b2 * 0.45, Math.max(b1, b2) * 0.75);
    b3.addColorStop(0, "rgba(255,255,255," + (Ft ? 0.16 : 0.24) + ")");
    b3.addColorStop(0.45, "rgba(255,255,255,0)");
    b3.addColorStop(1, "rgba(0,0,0," + (Ft ? 0.12 : 0.2) + ")");
    FZ.fillStyle = b3;
    FZ.fillRect(Ff - 10, b0 - 10, b1 + 20, b2 + 20);
    [[48, 0.05], [32, 0.06], [18, 0.08], [8, 0.1]].forEach(([b4, b5]) => {
      FZ.lineWidth = b4 * (Ft ? 0.7 : 1);
      FZ.strokeStyle = "rgba(0,10,30," + b5 * (Ft ? 0.8 : 1) + ")";
      FD();
      FZ.stroke();
    });
    FZ.restore();
  }
  function FT(FZ, FD) {
    const Fu = FF(FZ.width, FZ.height);
    const Ft = Fu.getContext("2d");
    Ft.drawImage(FZ, 0, 0);
    Ft.globalCompositeOperation = "source-in";
    Ft.fillStyle = FD;
    Ft.fillRect(0, 0, Fu.width, Fu.height);
    return Fu;
  }
  function FP(FZ, FD, Fu, Ft) {
    if (Fu.brand !== "colors" && Fu.brand !== "ring" && Ft.iconImg) {
      const Ff = FD * 0.06;
      FZ.save();
      FZ.fillStyle = "#fff";
      FZ.shadowColor = "rgba(0,0,0,.25)";
      FZ.shadowBlur = FD * 0.01;
      FZ.beginPath();
      FZ.arc(FD - Ff * 1.5, Ff * 1.5, Ff, 0, 7);
      FZ.fill();
      FZ.restore();
      const b0 = Ff * 1.3;
      FZ.drawImage(Ft.iconImg, FD - Ff * 1.5 - b0 / 2, Ff * 1.5 - b0 / 2 * (Ft.iconImg.height / Ft.iconImg.width), b0, b0 * Ft.iconImg.height / Ft.iconImg.width);
    }
    if (Fu.brand === "ring") {
      FZ.save();
      FZ.strokeStyle = F2;
      FZ.lineWidth = FD * 0.014;
      FZ.strokeRect(FD * 0.02, FD * 0.02, FD * 0.96, FD * 0.96);
      FZ.restore();
    }
    if (Fu.brand === "colors" || Fu.brand === "ring") {
      FZ.fillStyle = F2;
      FZ.beginPath();
      FZ.arc(FD * 0.94, FD * 0.94, FD * 0.012, 0, 7);
      FZ.fill();
    }
  }
  function FK(FZ) {
    const FD = FF(480, 480);
    const Fu = FD.getContext("2d");
    const Ft = Fu.createLinearGradient(0, 0, 480, 480);
    Ft.addColorStop(0, F1);
    Ft.addColorStop(1, "#0c4a8a");
    Fu.fillStyle = Ft;
    Fu.fillRect(0, 0, 480, 480);
    Fu.fillStyle = "#fff";
    Fu.font = "900 190px " + F7;
    Fu.textAlign = "center";
    Fu.textBaseline = "middle";
    Fu.fillText(FZ || "iM", 240, 250);
    Fu.fillStyle = F2;
    Fu.beginPath();
    Fu.arc(240 + Fu.measureText(FZ || "iM").width / 2 + 26, 300, 18, 0, 7);
    Fu.fill();
    return FD;
  }
  function Fg(FZ, FD, Fu) {
    const Ft = FD * 0.8;
    const Ff = FD * 0.11;
    const b0 = (FD - Ft) / 2;
    const b1 = FD * 0.86;
    FZ.save();
    FZ.fillStyle = F1;
    FZ.shadowColor = "rgba(0,0,0,.3)";
    FZ.shadowBlur = FD * 0.015;
    Fw(FZ, b0, b1, Ft, Ff, Ff * 0.22);
    FZ.fill();
    FZ.restore();
    FZ.fillStyle = F2;
    FZ.fillRect(b0, b1, FD * 0.014, Ff);
    FY(FZ, Fu, Ft * 0.86, Math.round(Ff * 0.58), 900);
    FZ.fillStyle = "#fff";
    FZ.textAlign = "center";
    FZ.textBaseline = "middle";
    FZ.fillText(Fu, FD / 2, b1 + Ff * 0.53);
  }
  const FM = FZ => 1 - Math.pow(1 - Fb(FZ, 0, 1), 3);
  function Fa(FZ, FD, Fu, Ft) {
    const Ff = FD.w;
    const b0 = FD.h;
    const b1 = Math.min(Ff, b0) / 480;
    const b2 = new Set(FD.effects || []);
    Ft = Ft || {};
    const b3 = new Set(FD.brandEls || []);
    if (FD.layout === "full" && FD.subjects.length) {
      (function (bF, bb, bw, bY, bk, bj) {
        const bp = bb.naturalWidth || bb.width;
        const bn = bb.naturalHeight || bb.height;
        const bv = Math.max(bw / bp, bY / bn) * bk;
        bF.drawImage(bb, (bw - bp * bv) / 2 + bj * bw, (bY - bn * bv) / 2, bp * bv, bn * bv);
      })(FZ, FD.subjects[Math.floor(Fu * FD.subjects.length) % FD.subjects.length], Ff, b0, 1.06 + Math.sin(Fu * 6.283) * 0.06, Math.sin(Fu * 6.283) * 0.03);
      FZ.fillStyle = "rgba(0,26,54,.18)";
      FZ.fillRect(0, 0, Ff, b0);
    } else {
      FH(FZ, Ff, b0, FD.bg || "brand", FD.seed, Fu);
    }
    if (b3.has("watermark") && Ft.icon) {
      FZ.save();
      FZ.globalAlpha = 0.07;
      const bF = b1 * 46;
      for (let bb = 0, bw = 0; bb < b0 + bF; bb += bF * 1.4, bw++) {
        for (let bY = bw % 2 * bF * 0.7; bY < Ff + bF; bY += bF * 1.4) {
          FZ.drawImage(Ft.icon, bY - bF / 2, bb - bF / 2, bF, bF * Ft.icon.height / Ft.icon.width);
        }
      }
      FZ.restore();
    }
    if (b2.has("rays")) {
      FZ.save();
      FZ.translate(Ff / 2, b0 * 0.46);
      FZ.rotate(Fu * Math.PI * 2 / 6);
      for (let bk = 0; bk < 12; bk++) {
        FZ.fillStyle = bk % 2 ? "rgba(107,192,99,.22)" : "rgba(255,255,255,.08)";
        FZ.beginPath();
        FZ.moveTo(0, 0);
        FZ.arc(0, 0, Math.max(Ff, b0), bk * Math.PI / 6, (bk + 1) * Math.PI / 6);
        FZ.fill();
      }
      FZ.restore();
    }
    if (b2.has("spotlight")) {
      const bj = FZ.createRadialGradient(Ff / 2, b0 * 0.45, 10, Ff / 2, b0 * 0.45, Ff * 0.6);
      bj.addColorStop(0, "rgba(255,255,255,.28)");
      bj.addColorStop(1, "rgba(0,0,0,.35)");
      FZ.fillStyle = bj;
      FZ.fillRect(0, 0, Ff, b0);
    }
    if (b2.has("rainbow")) {
      FZ.save();
      FZ.globalAlpha = 0.22;
      FZ.fillStyle = "hsl(" + (Fu * 360 + 120) % 360 + ",70%,50%)";
      FZ.fillRect(0, 0, Ff, b0);
      FZ.restore();
    }
    const b4 = FD.sign && FD.sign !== "none";
    const b5 = b4 && FD.signSide && FD.subjects.length && FD.layout !== "full";
    const b6 = b3.has("lockbar") ? b0 * 0.12 : 0;
    const b7 = {
      X: 0,
      Y: 0,
      W: Ff,
      H: b0 - b6
    };
    const b8 = b5 ? {
      X: 0,
      Y: b0 * 0.08,
      W: Ff * 0.46,
      H: b0 - b6 - b0 * 0.08
    } : b7;
    const b9 = b5 ? {
      X: Ff * 0.38,
      Y: 0,
      W: Ff * 0.62,
      H: b0 - b6
    } : b7;
    if (FD.layout !== "full" && FD.subjects.length && (!b4 || b5)) {
      const bp = FD.subjects.length;
      const bn = FD.motion === "flipbook" || FD.motion === "boomerang" ? FD.motion === "boomerang" ? function (bR, bU) {
        if (bU < 2) {
          return 0;
        }
        const bB = [];
        for (let bO = 0; bO < bU; bO++) {
          bB.push(bO);
        }
        for (let bC = bU - 2; bC > 0; bC--) {
          bB.push(bC);
        }
        return bB[Math.floor(bR * bB.length) % bB.length];
      }(Fu, bp) : Math.floor(Fu * bp) % bp : 0;
      const bv = FD.subjects[bn];
      const bc = b8.X;
      const bX = b8.Y;
      const bN = b8.W;
      const bL = b8.H;
      const bE = !!FD.text && !b4;
      const bh = Math.min(bN, bL) * (b5 ? 0.92 : bE ? 0.62 : 0.74);
      let bx = bc + bN / 2;
      let bH = bX + bL * (b5 ? 0.55 : bE ? 0.42 : 0.5);
      let bd = 1;
      let bS = 0;
      let bA = 1;
      const br = Fu * Math.PI * 2;
      switch (FD.motion) {
        case "bounce":
          bH -= Math.abs(Math.sin(br * 2)) * bL * 0.06;
          bd = 1 + (Math.abs(Math.sin(br * 2)) < 0.12 ? -0.04 : 0);
          break;
        case "pulse":
          bd = 1 + Math.sin(br * 2) * 0.07;
          break;
        case "heartbeat":
          {
            const bR = Fu % 0.5 / 0.5;
            bd = 1 + (bR < 0.1 ? bR / 0.1 : bR < 0.2 ? 1 - (bR - 0.1) / 0.1 : bR < 0.3 ? (bR - 0.2) / 0.1 : bR < 0.42 ? 1 - (bR - 0.3) / 0.12 : 0) * 0.09;
            break;
          }
        case "shake":
          bx += Math.sin(br * 12) * bN * 0.02;
          bS = Math.sin(br * 10) * 0.04;
          break;
        case "spin":
          bS = br;
          break;
        case "float":
          bH += Math.sin(br) * bL * 0.03;
          bS = Math.sin(br) * 0.05;
          break;
        case "zoom":
          bd = Fu < 0.2 ? 0.4 + FM(Fu / 0.2) * 0.75 : Fu < 0.3 ? 1.15 - (Fu - 0.2) * 1.5 : 1;
          break;
        case "slide":
          bx += Fu < 0.2 ? (1 - FM(Fu / 0.2)) * -Ff : Fu > 0.85 ? FM((Fu - 0.85) / 0.15) * Ff : 0;
          break;
        case "wiggle":
        case "swing":
          bS = Math.sin(br * (FD.motion === "swing" ? 1 : 3)) * (FD.motion === "swing" ? 0.08 : 0.14);
          break;
        case "flip":
          bA = Math.cos(br);
      }
      if (b2.has("glow")) {
        FZ.save();
        FZ.shadowColor = F2;
        FZ.shadowBlur = (18 + Math.sin(br * 2) * 14) * b1;
        FJ(FZ, bv, bx, bH, bh * bd, bS, bA, FD.shape);
        FZ.restore();
      }
      if (b2.has("glitch") && Math.sin(br * 7) > 0.85) {
        FZ.save();
        FZ.globalAlpha = 0.6;
        FZ.globalCompositeOperation = "lighter";
        FJ(FZ, Fl(bv, "#ff2a6d"), bx - b1 * 6, bH, bh * bd, bS, bA, FD.shape);
        FJ(FZ, Fl(bv, "#05d9e8"), bx + b1 * 6, bH, bh * bd, bS, bA, FD.shape);
        FZ.restore();
      }
      FJ(FZ, bv, bx, bH, bh * bd, bS, bA, FD.shape);
    }
    if (b4) {
      (function (bU, bB, bO, bC, bi, bW) {
        const bV = Math.min(bO.W, bO.H) / 480;
        const bI = bC * 6.283;
        const bG = Fm[bB.signColor] || Fm.navy;
        const bs = bB.sign;
        const by = bO.X + bO.W / 2;
        bU.save();
        bU.textAlign = "center";
        bU.textBaseline = "middle";
        if (bs === "yard" || bs === "rider") {
          const bT = bO.X + bO.W * 0.16;
          const bP = bO.Y + bO.H * 0.18;
          bU.fillStyle = "rgba(0,0,0,.25)";
          bU.beginPath();
          bU.ellipse(bT + bV * 8, bO.Y + bO.H * 0.97, bV * 40, bV * 8, 0, 0, 7);
          bU.fill();
          bU.fillStyle = "#f4f6f8";
          bU.fillRect(bT - bV * 9, bP - bV * 10, bV * 18, bO.H * 0.8);
          bU.fillRect(bT - bV * 9, bP - bV * 10, bO.W * 0.76, bV * 16);
          bU.fillStyle = bG.acc;
          bU.fillRect(bT - bV * 9, bP - bV * 10, bV * 18, bV * 8);
          const bK = bO.W * 0.66;
          const bg = bO.H * 0.44;
          const bM = bT + bO.W * 0.06;
          const ba = Math.sin(bI) * 0.045;
          bU.save();
          bU.translate(bM + bK / 2, bP + bV * 6);
          bU.rotate(ba);
          bU.strokeStyle = "#9aa4ae";
          bU.lineWidth = bV * 2.5;
          [-bK * 0.38, bK * 0.38].forEach(bm => {
            bU.beginPath();
            bU.moveTo(bm, 0);
            bU.lineTo(bm, bV * 20);
            bU.stroke();
          });
          Fz(bU, -bK / 2, bV * 20, bK, bg, bs === "rider" ? Object.assign({}, bB, {
            text: bB.sub ? bB.sub : bi.name || "iMath Group",
            sub: ""
          }) : bB, bG, bi, bW);
          bU.restore();
          if (bs === "rider") {
            const bm = bK * 0.86;
            const bQ = bg * 0.26;
            const be = bP - bQ - bV * 12;
            const bz = bC < 0.22 ? be - (1 - FM(bC / 0.22)) * bO.H * 0.5 : be + (bC < 0.3 ? Math.sin((bC - 0.22) / 0.08 * Math.PI) * 6 * bV : 0);
            bU.fillStyle = bG.acc === F1 ? F1 : "#c8323c";
            bU.shadowColor = "rgba(0,0,0,.3)";
            bU.shadowBlur = bV * 8;
            Fw(bU, bM + (bK - bm) / 2, bz, bm, bQ, bV * 6);
            bU.fill();
            bU.shadowBlur = 0;
            bU.fillStyle = "#ffffff";
            FY(bU, String(bB.text || "SOLD!"), bm * 0.86, Math.round(bQ * 0.7), 900);
            bU.fillText(String(bB.text || "SOLD!"), bM + bK / 2, bz + bQ * 0.54);
          }
          bU.fillStyle = "#3f8f39";
          bU.fillRect(bO.X, bO.Y + bO.H * 0.96, bO.W, bO.H * 0.04);
        } else if (bs === "aframe") {
          const bJ = bO.W * 0.62;
          const bo = bO.H * 0.72;
          const bl = bO.Y + bO.H * 0.16;
          const bq = Math.sin(bI * 2) * 0.03;
          bU.save();
          bU.translate(by, bl + bo);
          bU.rotate(bq);
          bU.fillStyle = "rgba(0,0,0,.25)";
          bU.beginPath();
          bU.ellipse(0, bV * 4, bJ * 0.6, bV * 10, 0, 0, 7);
          bU.fill();
          bU.fillStyle = "#c9b48a";
          bU.fillRect(-bJ * 0.47, -bo, bV * 10, bo);
          bU.fillRect(bJ * 0.47 - bV * 10, -bo, bV * 10, bo);
          Fz(bU, -bJ * 0.44, -bo * 0.98, bJ * 0.88, bo * 0.78, bB, bG, bi, bW);
          bU.fillStyle = bG.acc;
          const bZ = -bo * 0.12;
          bU.beginPath();
          bU.moveTo(-bJ * 0.22, bZ - bV * 8);
          bU.lineTo(bJ * 0.12, bZ - bV * 8);
          bU.lineTo(bJ * 0.12, bZ - bV * 22);
          bU.lineTo(bJ * 0.32, bZ);
          bU.lineTo(bJ * 0.12, bZ + bV * 22);
          bU.lineTo(bJ * 0.12, bZ + bV * 8);
          bU.lineTo(-bJ * 0.22, bZ + bV * 8);
          bU.closePath();
          bU.translate(Math.sin(bI * 2) * 8 * bV, 0);
          bU.fill();
          bU.restore();
        } else if (bs === "marquee") {
          const bD = bO.W * 0.86;
          const bu = bO.H * 0.6;
          const bt = by - bD / 2;
          const bf = bO.Y + bO.H * 0.18;
          bU.fillStyle = bG.bg;
          bU.shadowColor = "rgba(0,0,0,.35)";
          bU.shadowBlur = bV * 16;
          Fw(bU, bt, bf, bD, bu, bV * 18);
          bU.fill();
          bU.shadowBlur = 0;
          bU.lineWidth = bV * 6;
          bU.strokeStyle = F6;
          Fw(bU, bt + bV * 10, bf + bV * 10, bD - bV * 20, bu - bV * 20, bV * 12);
          bU.stroke();
          const w0 = (bD + bu) * 2 - bV * 60;
          const w1 = Math.floor(w0 / (bV * 22));
          const w2 = Math.floor(bC * 18);
          for (let w4 = 0; w4 < w1; w4++) {
            const w5 = w4 / w1 * w0;
            let w6;
            let w7;
            const w8 = bD - bV * 30;
            const w9 = bu - bV * 30;
            if (w5 < w8) {
              w6 = bt + bV * 15 + w5;
              w7 = bf + bV * 15;
            } else if (w5 < w8 + w9) {
              w6 = bt + bD - bV * 15;
              w7 = bf + bV * 15 + w5 - w8;
            } else if (w5 < w8 * 2 + w9) {
              w6 = bt + bD - bV * 15 - (w5 - w8 - w9);
              w7 = bf + bu - bV * 15;
            } else {
              w6 = bt + bV * 15;
              w7 = bf + bu - bV * 15 - (w5 - w8 * 2 - w9);
            }
            const wF = (w4 + w2) % 3 == 0;
            bU.fillStyle = wF ? "#fff6c9" : "rgba(255,214,110,.35)";
            if (wF) {
              bU.shadowColor = F6;
              bU.shadowBlur = bV * 10;
            }
            bU.beginPath();
            bU.arc(w6, w7, bV * 5, 0, 7);
            bU.fill();
            bU.shadowBlur = 0;
          }
          const w3 = String(bB.text || "SOLD!");
          FY(bU, w3, bD * 0.78, Math.round(bu * 0.4), 900);
          bU.fillStyle = F6;
          bU.shadowColor = "rgba(242,193,78,.8)";
          bU.shadowBlur = (10 + Math.sin(bI * 4) * 6) * bV;
          bU.fillText(w3, by, bf + bu * (bB.sub ? 0.42 : 0.5));
          bU.shadowBlur = 0;
          if (bB.sub) {
            FY(bU, bB.sub, bD * 0.7, Math.round(bu * 0.12), 700);
            bU.fillStyle = "#ffffff";
            bU.fillText(bB.sub, by, bf + bu * 0.72);
          }
          Fe(bU, bi.lockDark, by, bf + bu + bV * 34, bD * 0.5, bV * 40);
        } else if (bs === "neon") {
          bU.fillStyle = "#1a1416";
          bU.fillRect(bO.X, bO.Y, bO.W, bO.H);
          bU.fillStyle = "#2a1f22";
          const wb = bV * 22;
          const ww = bV * 56;
          for (let wj = 0, wp = bO.Y; wp < bO.Y + bO.H; wp += wb, wj++) {
            for (let wn = bO.X - wj % 2 * ww / 2; wn < bO.X + bO.W; wn += ww) {
              bU.fillRect(wn + bV * 2, wp + bV * 2, ww - bV * 4, wb - bV * 4);
            }
          }
          const wY = bC > 0.12 && bC < 0.15 || bC > 0.18 && bC < 0.2 ? 0.35 : 1;
          const wk = String(bB.text || "SOLD!");
          bU.globalAlpha = wY;
          FY(bU, wk, bO.W * 0.8, Math.round(bO.H * 0.24), 900);
          bU.shadowColor = F2;
          bU.shadowBlur = bV * 26;
          bU.strokeStyle = F2;
          bU.lineWidth = bV * 7;
          bU.strokeText(wk, by, bO.Y + bO.H * 0.42);
          bU.shadowBlur = bV * 8;
          bU.fillStyle = "#eaffe6";
          bU.fillText(wk, by, bO.Y + bO.H * 0.42);
          bU.shadowBlur = 0;
          bU.globalAlpha = 1;
          bU.strokeStyle = "#ffffff";
          bU.shadowColor = "#ffffff";
          bU.shadowBlur = bV * 14;
          bU.lineWidth = bV * 3;
          Fw(bU, bO.X + bO.W * 0.08, bO.Y + bO.H * 0.22, bO.W * 0.84, bO.H * 0.42, bV * 22);
          bU.stroke();
          bU.shadowBlur = 0;
          if (bB.sub) {
            FY(bU, bB.sub, bO.W * 0.7, Math.round(bO.H * 0.07), 700);
            bU.fillStyle = "#ffffff";
            bU.fillText(bB.sub, by, bO.Y + bO.H * 0.72);
          }
          Fe(bU, bi.lockDark, by, bO.Y + bO.H * 0.86, bO.W * 0.5, bO.H * 0.09);
        } else if (bs === "street") {
          const wv = Math.sin(bI) * 0.03;
          bU.fillStyle = "#7d868f";
          bU.fillRect(by - bV * 7, bO.Y + bO.H * 0.22, bV * 14, bO.H * 0.78);
          bU.save();
          bU.translate(by, bO.Y + bO.H * 0.24);
          bU.rotate(wv);
          const wc = bO.W * 0.84;
          const wX = bV * 74;
          bU.fillStyle = "#1f7a3a";
          Fw(bU, -wc / 2, -wX - bV * 6, wc, wX, bV * 8);
          bU.fill();
          bU.strokeStyle = "#ffffff";
          bU.lineWidth = bV * 3;
          Fw(bU, -wc / 2 + bV * 6, -wX, wc - bV * 12, wX - bV * 12, bV * 6);
          bU.stroke();
          bU.fillStyle = "#ffffff";
          FY(bU, String(bB.text || "Homeowner Ave"), wc * 0.84, Math.round(wX * 0.5), 800);
          bU.fillText(String(bB.text || "Homeowner Ave"), 0, -wX / 2 - bV * 6);
          bU.fillStyle = F1;
          const wN = wc * 0.62;
          Fw(bU, -wN / 2, bV * 10, wN, wX * 0.8, bV * 8);
          bU.fill();
          bU.strokeStyle = F2;
          Fw(bU, -wN / 2 + bV * 5, bV * 15, wN - bV * 10, wX * 0.8 - bV * 10, bV * 6);
          bU.stroke();
          bU.fillStyle = "#ffffff";
          FY(bU, String(bB.sub || "iMath Group"), wN * 0.84, Math.round(wX * 0.4), 800);
          bU.fillText(String(bB.sub || "iMath Group"), 0, bV * 10 + wX * 0.42);
          bU.restore();
          bU.fillStyle = "#3f8f39";
          bU.fillRect(bO.X, bO.Y + bO.H * 0.96, bO.W, bO.H * 0.04);
        } else if (bs === "keytag") {
          const wL = Math.sin(bI) * 0.18;
          bU.save();
          bU.translate(by - bO.W * 0.2, bO.Y + bO.H * 0.16);
          bU.rotate(wL);
          bU.strokeStyle = "#c9ced4";
          bU.lineWidth = bV * 7;
          bU.beginPath();
          bU.arc(0, 0, bV * 26, 0, 7);
          bU.stroke();
          Fr(bU, bV * -70, bV * 60, bV * 70, 2.2);
          const wE = bO.W * 0.5;
          const wh = bO.H * 0.5;
          bU.translate(bV * 40, bV * 24);
          bU.rotate(-0.12);
          bU.fillStyle = bG.bg;
          bU.shadowColor = "rgba(0,0,0,.3)";
          bU.shadowBlur = bV * 12;
          Fw(bU, -wE * 0.1, 0, wE, wh, bV * 18);
          bU.fill();
          bU.shadowBlur = 0;
          bU.fillStyle = "rgba(255,255,255,.85)";
          bU.beginPath();
          bU.arc(wE * 0.4, bV * 22, bV * 9, 0, 7);
          bU.fill();
          bU.fillStyle = bG.fg;
          const wx = String(bB.text || "Welcome home");
          FY(bU, wx, wE * 0.82, Math.round(wh * 0.22), 900);
          bU.fillText(wx, wE * 0.4, wh * 0.48);
          if (bB.sub) {
            FY(bU, bB.sub, wE * 0.8, Math.round(wh * 0.08), 700);
            bU.fillText(bB.sub, wE * 0.4, wh * 0.66);
          }
          Fe(bU, FQ(bi, bG.dark), wE * 0.4, wh * 0.84, wE * 0.6, wh * 0.1);
          bU.restore();
        } else if (bs === "billboard") {
          const wH = bO.W * 0.92;
          const wd = bO.H * 0.5;
          const wS = by - wH / 2;
          const wA = bO.Y + bO.H * 0.16;
          bU.fillStyle = "#5d646b";
          bU.fillRect(wS + wH * 0.2, wA + wd, bV * 12, bO.H * 0.4);
          bU.fillRect(wS + wH * 0.78, wA + wd, bV * 12, bO.H * 0.4);
          bU.fillRect(wS, wA + wd + bV * 6, wH, bV * 6);
          const wr = bU.createLinearGradient(0, wA - bV * 30, 0, wA + wd);
          wr.addColorStop(0, "rgba(255,240,180,.0)");
          wr.addColorStop(1, "rgba(255,240,180," + (0.18 + Math.sin(bI * 3) * 0.08) + ")");
          bU.fillStyle = wr;
          bU.beginPath();
          bU.moveTo(wS + wH * 0.2, wA - bV * 18);
          bU.lineTo(wS - bV * 10, wA + wd);
          bU.lineTo(wS + wH * 0.5, wA + wd);
          bU.closePath();
          bU.fill();
          bU.beginPath();
          bU.moveTo(wS + wH * 0.8, wA - bV * 18);
          bU.lineTo(wS + wH * 0.5, wA + wd);
          bU.lineTo(wS + wH + bV * 10, wA + wd);
          bU.closePath();
          bU.fill();
          bU.fillStyle = "#ffffff";
          bU.fillRect(wS - bV * 6, wA - bV * 6, wH + bV * 12, wd + bV * 12);
          Fz(bU, wS, wA, wH, wd, bB, bG, bi, bW);
          bU.fillStyle = "#2b3036";
          [0.2, 0.8].forEach(wR => bU.fillRect(wS + wH * wR - bV * 10, wA - bV * 22, bV * 20, bV * 10));
          bU.fillStyle = "#3f8f39";
          bU.fillRect(bO.X, bO.Y + bO.H * 0.96, bO.W, bO.H * 0.04);
        } else if (bs === "banner") {
          const wR = bO.W * 0.86;
          const wU = bO.H * 0.34;
          const wB = bO.Y + bO.H * 0.3;
          const wO = FF(Math.round(wR), Math.round(wU));
          Fz(wO.getContext("2d"), 0, 0, wR, wU, bB, bG, bi, bW);
          bU.fillStyle = "#9aa4ae";
          bU.fillRect(by - wR / 2 - bV * 10, wB - bV * 20, bV * 8, bO.H * 0.7);
          const wC = 40;
          for (let wi = 0; wi < wC; wi++) {
            const wW = wi / wC * wR;
            const wV = Math.sin(bI + wi / wC * 5) * 10 * bV * (wi / wC);
            bU.drawImage(wO, wW, 0, wR / wC + 1, wU, by - wR / 2 + wW, wB + wV, wR / wC + 1, wU);
          }
        } else if (bs === "progress" || bs === "checklist") {
          const wI = bO.W * 0.84;
          const wG = bO.H * 0.66;
          const ws = by - wI / 2;
          const wy = bO.Y + bO.H * 0.14;
          bU.fillStyle = "#ffffff";
          bU.shadowColor = "rgba(0,0,0,.3)";
          bU.shadowBlur = bV * 18;
          Fw(bU, ws, wy, wI, wG, bV * 20);
          bU.fill();
          bU.shadowBlur = 0;
          bU.fillStyle = F1;
          Fw(bU, ws, wy, wI, wG * 0.2, bV * 20);
          bU.fill();
          bU.fillRect(ws, wy + wG * 0.1, wI, wG * 0.1);
          Fe(bU, bi.lockDark, by, wy + wG * 0.1, wI * 0.6, wG * 0.12);
          if (bs === "progress") {
            const wT = FM(Fb(bC / 0.62, 0, 1));
            bU.fillStyle = F1;
            FY(bU, String(bB.sub || "Your home loan"), wI * 0.8, Math.round(wG * 0.07), 800);
            bU.fillText(String(bB.sub || "Your home loan"), by, wy + wG * 0.32);
            const wP = wI * 0.8;
            const wK = by - wP / 2;
            const wg = wy + wG * 0.42;
            const wM = wG * 0.08;
            bU.fillStyle = "#e1e8f0";
            Fw(bU, wK, wg, wP, wM, wM / 2);
            bU.fill();
            bU.fillStyle = F2;
            Fw(bU, wK, wg, Math.max(wM, wP * wT), wM, wM / 2);
            bU.fill();
            bU.fillStyle = F1;
            bU.font = "900 " + Math.round(wG * 0.08) + "px " + F7;
            bU.fillText(Math.round(wT * 100) + "%", by, wg + wM + wG * 0.08);
            if (bC > 0.62) {
              const wa = FM(Fb((bC - 0.62) / 0.12, 0, 1));
              const wm = wG * 0.1 * (wa < 1 ? wa * 1.2 : 1);
              bU.fillStyle = F2;
              bU.beginPath();
              bU.arc(by - wI * 0.3, wy + wG * 0.82, wm, 0, 7);
              bU.fill();
              bU.strokeStyle = "#fff";
              bU.lineWidth = bV * 6;
              bU.beginPath();
              bU.moveTo(by - wI * 0.3 - wm * 0.45, wy + wG * 0.82);
              bU.lineTo(by - wI * 0.3 - wm * 0.1, wy + wG * 0.82 + wm * 0.35);
              bU.lineTo(by - wI * 0.3 + wm * 0.5, wy + wG * 0.82 - wm * 0.35);
              bU.stroke();
              bU.globalAlpha = wa;
              bU.fillStyle = F1;
              bU.textAlign = "left";
              FY(bU, String(bB.text || "Clear to close"), wI * 0.52, Math.round(wG * 0.11), 900);
              bU.fillText(String(bB.text || "Clear to close"), by - wI * 0.18, wy + wG * 0.83);
              bU.globalAlpha = 1;
            }
          } else {
            const wQ = (bB.items && bB.items.length ? bB.items : ["Application", "Appraisal", "Underwriting", String(bB.text || "Clear to close")]).slice(0, 5);
            bU.fillStyle = F1;
            FY(bU, String(bB.sub || "Road to closing"), wI * 0.8, Math.round(wG * 0.07), 800);
            bU.fillText(String(bB.sub || "Road to closing"), by, wy + wG * 0.29);
            wQ.forEach((we, wz) => {
              const wJ = wy + wG * (0.42 + wz * 0.13);
              const wo = bC > 0.1 + wz * 0.15;
              const wl = wo ? FM(Fb((bC - 0.1 - wz * 0.15) / 0.08, 0, 1)) : 0;
              bU.strokeStyle = F2;
              bU.lineWidth = bV * 3;
              bU.beginPath();
              bU.arc(ws + wI * 0.14, wJ, bV * 13, 0, 7);
              bU.stroke();
              if (wl) {
                bU.fillStyle = F2;
                bU.beginPath();
                bU.arc(ws + wI * 0.14, wJ, bV * 13 * wl, 0, 7);
                bU.fill();
                bU.strokeStyle = "#fff";
                bU.beginPath();
                bU.moveTo(ws + wI * 0.14 - bV * 6, wJ);
                bU.lineTo(ws + wI * 0.14 - bV * 1, wJ + bV * 5);
                bU.lineTo(ws + wI * 0.14 + bV * 7, wJ - bV * 6);
                bU.stroke();
              }
              bU.textAlign = "left";
              bU.fillStyle = wo ? F1 : "#8a96a3";
              bU.font = (wz === wQ.length - 1 ? 900 : 700) + " " + Math.round(wG * 0.075) + "px " + F7;
              bU.fillText(we, ws + wI * 0.24, wJ + 1);
              bU.textAlign = "center";
            });
          }
        } else if (bs === "doormat") {
          const we = bO.Y + bO.H * 0.5 + Math.abs(Math.sin(bI * 2)) * -6 * bV;
          bU.fillStyle = "rgba(0,0,0,.25)";
          bU.beginPath();
          bU.ellipse(by, we + bO.H * 0.28, bO.W * 0.42, bV * 14, 0, 0, 7);
          bU.fill();
          bU.fillStyle = "#b07a3e";
          bU.beginPath();
          bU.moveTo(by - bO.W * 0.32, we - bO.H * 0.06);
          bU.lineTo(by + bO.W * 0.32, we - bO.H * 0.06);
          bU.lineTo(by + bO.W * 0.42, we + bO.H * 0.26);
          bU.lineTo(by - bO.W * 0.42, we + bO.H * 0.26);
          bU.closePath();
          bU.fill();
          bU.strokeStyle = F1;
          bU.lineWidth = bV * 6;
          bU.stroke();
          bU.fillStyle = F1;
          const wz = String(bB.text || "Welcome home");
          FY(bU, wz, bO.W * 0.6, Math.round(bO.H * 0.1), 900);
          bU.fillText(wz, by, we + bO.H * 0.1);
          bU.fillStyle = F2;
          bU.fillRect(by - bO.W * 0.2, we + bO.H * 0.17, bO.W * 0.4, bV * 5);
          FA(bU, by, bO.Y + bO.H * 0.24, bV * 70, F2, "#ffffff");
        }
        bU.restore();
      })(FZ, FD, b9, Fu, Ft, !b5 && FD.signPhoto && FD.subjects.length ? FD.subjects[0] : null);
    }
    if (b2.has("speedlines")) {
      FZ.save();
      FZ.strokeStyle = "rgba(255,255,255,.55)";
      FZ.lineWidth = b1 * 3;
      const bU = F9(4);
      for (let bB = 0; bB < 26; bB++) {
        const bO = bU() * 6.283;
        const bC = (0.15 + bU() * 0.2) * Ff;
        const bi = Ff * (0.35 + (Fu * 3 + bU()) % 1 * 0.3);
        FZ.beginPath();
        FZ.moveTo(Ff / 2 + Math.cos(bO) * bi, b0 / 2 + Math.sin(bO) * bi);
        FZ.lineTo(Ff / 2 + Math.cos(bO) * (bi + bC), b0 / 2 + Math.sin(bO) * (bi + bC));
        FZ.stroke();
      }
      FZ.restore();
    }
    (function (bW, bV, bI, bG, bs, by, bT) {
      const bP = [F1, F2, "#ffffff", F6, F3, "#9fd49a"];
      const bK = (bg, bM, ba, bm, bQ) => {
        const be = F9(bM);
        for (let bz = 0; bz < bg; bz++) {
          const bJ = be() * bV;
          const bo = be();
          const bl = 1 + Math.floor(be() * (bm || 2));
          const bq = (bo + bG * bl) % 1 * (bI + by * 80) - by * 40;
          ba(bJ + Math.sin((bG * bl + bo) * 6.283 * 2) * 14 * by, bq, be, bz, (bG * bl + bo) * 6.283 * (bQ || 1));
        }
      };
      if (bs.has("confetti")) {
        bK(60, 21, (bg, bM, ba, bm, bQ) => {
          bW.save();
          bW.translate(bg, bM);
          bW.rotate(bQ);
          bW.scale(1, Math.cos(bQ * 1.7));
          bW.fillStyle = bP[bm % bP.length];
          bW.fillRect(by * -6, by * -3, by * 12, by * 6);
          bW.restore();
        }, 2);
      }
      if (bs.has("money")) {
        bK(16, 33, (bg, bM, ba, bm, bQ) => FR(bW, bg, bM, by * 16, Math.sin(bQ) * 0.6), 1);
      }
      if (bs.has("houses")) {
        bK(12, 44, (bg, bM, ba, bm, bQ) => {
          bW.save();
          bW.translate(bg, bM);
          bW.rotate(Math.sin(bQ) * 0.3);
          FA(bW, 0, 0, by * 16, bm % 2 ? F2 : F3, "#fff");
          bW.restore();
        }, 1);
      }
      if (bs.has("keys")) {
        bK(14, 55, (bg, bM, ba, bm, bQ) => Fr(bW, bg, bM, by * 20, bQ), 1);
      }
      if (bs.has("hearts")) {
        const bg = F9(66);
        for (let bM = 0; bM < 16; bM++) {
          const ba = bg() * bV;
          const bm = bg();
          const bQ = bI + by * 30 - (bm + bG) % 1 * (bI + by * 60);
          FS(bW, ba + Math.sin((bG + bm) * 12.6) * 10 * by, bQ, (8 + bg() * 10) * by, bM % 3 ? "#e8609a" : F2);
        }
      }
      if (bs.has("balloons")) {
        const be = F9(77);
        const bz = [F1, F2, F3, F6];
        for (let bJ = 0; bJ < 9; bJ++) {
          const bo = be() * bV;
          const bl = be();
          FU(bW, bo, bI + by * 80 - (bl + bG) % 1 * (bI + by * 200), (14 + be() * 8) * by, bz[bJ % 4]);
        }
      }
      if (bs.has("sparkles") || bs.has("glitter")) {
        const bq = F9(88);
        const bZ = bs.has("glitter") ? 60 : 22;
        for (let bD = 0; bD < bZ; bD++) {
          const bu = bq() * bV;
          const bt = bq() * bI;
          const bf = bq();
          const w0 = Math.max(0, Math.sin((bG + bf) * 6.283 * 2));
          Fd(bW, bu, bt, (bs.has("glitter") ? 4 : 9) * by * (0.4 + w0), bD % 4 ? "#ffffff" : F2, w0);
        }
      }
      if (bs.has("stars")) {
        const w1 = F9(99);
        for (let w2 = 0; w2 < 14; w2++) {
          const w3 = w1() * bV;
          const w4 = w1() * bI;
          const w5 = w1();
          const w6 = 0.5 + Math.sin((bG + w5) * 6.283) * 0.5;
          bW.save();
          bW.globalAlpha = w6;
          bW.fillStyle = F6;
          bW.beginPath();
          for (let w7 = 0; w7 < 10; w7++) {
            const w8 = -Math.PI / 2 + w7 * Math.PI / 5;
            const w9 = (w7 % 2 ? 4 : 10) * by;
            bW.lineTo(w3 + Math.cos(w8) * w9, w4 + Math.sin(w8) * w9);
          }
          bW.fill();
          bW.restore();
        }
      }
      if (bs.has("snow")) {
        bK(70, 111, (wF, wb, ww) => {
          bW.fillStyle = "rgba(255,255,255,.9)";
          bW.beginPath();
          bW.arc(wF, wb, (1.5 + ww() * 3) * by, 0, 7);
          bW.fill();
        }, 1);
      }
      if (bs.has("pins")) {
        const wF = F9(121);
        for (let wb = 0; wb < 7; wb++) {
          const ww = bV * (0.1 + wF() * 0.8);
          const wY = bI * (0.2 + wF() * 0.6);
          const wk = (bG + wF()) % 1;
          const wj = wk < 0.2 ? (1 - FM(wk / 0.2)) * bI * 0.3 : 0;
          const wp = by * 16;
          bW.save();
          bW.translate(ww, wY - wj);
          bW.fillStyle = "rgba(0,0,0,.2)";
          bW.beginPath();
          bW.ellipse(0, wj + by * 4, wp * 0.6, wp * 0.2, 0, 0, 7);
          bW.fill();
          bW.fillStyle = wb % 2 ? F2 : F1;
          bW.beginPath();
          bW.arc(0, -wp * 1.4, wp, Math.PI * 0.85, Math.PI * 2.15);
          bW.lineTo(0, 0);
          bW.closePath();
          bW.fill();
          bW.fillStyle = "#fff";
          bW.beginPath();
          bW.arc(0, -wp * 1.4, wp * 0.4, 0, 7);
          bW.fill();
          bW.restore();
        }
      }
      if (bs.has("boxes")) {
        bK(10, 131, (wn, wv, wc, wX, wN) => {
          bW.save();
          bW.translate(wn, wv);
          bW.rotate(Math.sin(wN) * 0.5);
          const wL = by * 22;
          bW.fillStyle = "#c69a5f";
          bW.fillRect(-wL, -wL * 0.8, wL * 2, wL * 1.6);
          bW.fillStyle = "#e3c48f";
          bW.fillRect(-wL * 0.15, -wL * 0.8, wL * 0.3, wL * 1.6);
          bW.fillStyle = F2;
          bW.fillRect(-wL * 0.75, wL * 0.25, wL * 0.5, wL * 0.25);
          bW.restore();
        }, 1);
      }
      if (bs.has("streamers")) {
        bK(14, 141, (wn, wv, wc, wX, wN) => {
          bW.save();
          bW.strokeStyle = bP[wX % 4];
          bW.lineWidth = by * 4;
          bW.beginPath();
          for (let wL = 0; wL < 6; wL++) {
            bW.lineTo(wn + Math.sin(wN + wL) * 8 * by, wv + wL * 7 * by);
          }
          bW.stroke();
          bW.restore();
        }, 2);
      }
      if (bs.has("bubbles")) {
        const wn = F9(151);
        for (let wv = 0; wv < 18; wv++) {
          const wc = wn() * bV;
          const wX = wn();
          const wN = bI + by * 20 - (wX + bG) % 1 * (bI + by * 40);
          const wL = (6 + wn() * 14) * by;
          bW.save();
          bW.strokeStyle = "rgba(255,255,255,.75)";
          bW.fillStyle = "rgba(107,192,99,.12)";
          bW.lineWidth = by * 2;
          bW.beginPath();
          bW.arc(wc + Math.sin((bG + wX) * 12) * 6 * by, wN, wL, 0, 7);
          bW.fill();
          bW.stroke();
          bW.restore();
        }
      }
      if (bs.has("checks")) {
        const wE = F9(161);
        for (let wh = 0; wh < 8; wh++) {
          const wx = bV * (0.08 + wE() * 0.84);
          const wH = bI * (0.08 + wE() * 0.8);
          const wd = (bG * 2 + wE()) % 1;
          const wS = wd < 0.3 ? FM(wd / 0.3) : wd > 0.8 ? 1 - (wd - 0.8) / 0.2 : 1;
          const wA = by * 14 * wS;
          bW.save();
          bW.globalAlpha = wS;
          bW.fillStyle = F2;
          bW.beginPath();
          bW.arc(wx, wH, wA, 0, 7);
          bW.fill();
          bW.strokeStyle = "#fff";
          bW.lineWidth = by * 3;
          bW.beginPath();
          bW.moveTo(wx - wA * 0.45, wH);
          bW.lineTo(wx - wA * 0.1, wH + wA * 0.35);
          bW.lineTo(wx + wA * 0.5, wH - wA * 0.35);
          bW.stroke();
          bW.restore();
        }
      }
      if (bs.has("logorain") && bT && bT.icon) {
        bK(12, 171, (wr, wR, wU, wB, wO) => {
          const wC = by * 26;
          bW.save();
          bW.translate(wr, wR);
          bW.rotate(Math.sin(wO) * 0.4);
          bW.fillStyle = "#fff";
          bW.beginPath();
          bW.arc(0, 0, wC * 0.75, 0, 7);
          bW.fill();
          bW.drawImage(bT.icon, -wC / 2, -wC / 2 * bT.icon.height / bT.icon.width, wC, wC * bT.icon.height / bT.icon.width);
          bW.restore();
        }, 1);
      }
      if (bs.has("flash") && bG < 0.08) {
        bW.save();
        bW.globalAlpha = 1 - bG / 0.08;
        bW.fillStyle = "#ffffff";
        bW.fillRect(0, 0, bV, bI);
        bW.restore();
      }
      if (bs.has("lightleak")) {
        const wr = bW.createRadialGradient(bV * (bG * 1.4 - 0.2), bI * 0.3, 10, bV * (bG * 1.4 - 0.2), bI * 0.3, bV * 0.6);
        wr.addColorStop(0, "rgba(255,200,120,.35)");
        wr.addColorStop(1, "rgba(255,200,120,0)");
        bW.fillStyle = wr;
        bW.fillRect(0, 0, bV, bI);
      }
      if (bs.has("fireworks")) {
        [[0.25, 0.25, 0], [0.75, 0.3, 0.33], [0.5, 0.18, 0.66]].forEach(([wR, wU, wB], wO) => {
          const wC = (bG + wB) % 1;
          if (wC > 0.6) {
            return;
          }
          const wi = FM(wC / 0.6);
          const wW = [F2, F6, "#ffffff"][wO];
          for (let wV = 0; wV < 18; wV++) {
            const wI = wV / 18 * 6.283;
            const wG = wi * 70 * by;
            bW.save();
            bW.globalAlpha = 1 - wC / 0.6;
            bW.fillStyle = wW;
            bW.beginPath();
            bW.arc(wR * bV + Math.cos(wI) * wG, wU * bI + Math.sin(wI) * wG + wi * wi * 12 * by, by * 3, 0, 7);
            bW.fill();
            bW.restore();
          }
        });
      }
    })(FZ, Ff, b0, Fu, b2, b1, Ft);
    if (!b4) {
      (function (bW, bV, bI, bG, bs, by) {
        const bT = String(bV.text || "").trim();
        const bP = String(bV.sub || "").trim();
        if (!bT && !bP) {
          return;
        }
        const bK = bV.textFx || "pop";
        const bg = bG * (bV.layout === "full" ? 0.78 : bP ? 0.8 : 0.84);
        const bM = bs * 6.283;
        if (bT) {
          const ba = /[a-z0-9]$/i.test(bT);
          let bm = bT;
          let bQ = 1;
          let be = 0;
          let bz = 1;
          let bJ = 0;
          if (bK === "pop") {
            bQ = bs < 0.15 ? FM(bs / 0.15) * 1.15 : bs < 0.22 ? 1.15 - (bs - 0.15) * 2.1 : 1 + Math.sin(bM * 2) * 0.03;
          } else if (bK === "type") {
            bm = bT.slice(0, Math.max(1, Math.floor(Fb(bs / 0.6, 0, 1) * bT.length)));
          } else if (bK === "stamp") {
            bQ = bs < 0.12 ? 2.4 - FM(bs / 0.12) * 1.4 : 1;
            be = -0.12;
            bz = bs < 0.12 ? FM(bs / 0.12) : 1;
          } else if (bK === "slide") {
            bJ = bs < 0.18 ? (1 - FM(bs / 0.18)) * -bI : 0;
          } else if (bK === "shake") {
            bJ = Math.sin(bM * 14) * 4 * by;
            be = Math.sin(bM * 9) * 0.03;
          }
          bW.save();
          bW.globalAlpha = bz;
          bW.translate(bI / 2 + bJ, bg);
          bW.rotate(be);
          bW.scale(bQ, bQ);
          const bo = FY(bW, bT + (ba ? "." : ""), bI * 0.84, Math.round(by * 64), 900);
          bW.textBaseline = "middle";
          const bl = bW.measureText(bT).width;
          const bq = -(bl + (ba ? bW.measureText(".").width : 0)) / 2;
          if (bK === "stamp") {
            bW.textAlign = "center";
            bW.lineWidth = by * 6;
            bW.strokeStyle = "#c8323c";
            bW.strokeRect(-bl / 2 - by * 16, -bo * 0.66, bl + by * 32, bo * 1.3);
            bW.fillStyle = "#c8323c";
            bW.fillText(bT, 0, 0);
          } else if (bK === "neon") {
            bW.textAlign = "left";
            bW.shadowColor = F2;
            bW.shadowBlur = (16 + Math.sin(bM * 3) * 10) * by;
            bW.fillStyle = "#e9ffe6";
            bW.fillText(bT, bq, 0);
            bW.shadowBlur = 0;
            if (ba) {
              bW.fillStyle = F2;
              bW.fillText(".", bq + bl, 0);
            }
          } else if (bK === "wave") {
            bW.textAlign = "left";
            let bZ = bq;
            for (let bD = 0; bD < bT.length; bD++) {
              const bu = bT[bD];
              const bt = bW.measureText(bu).width;
              Fq(bW, bu, bZ, Math.sin(bM * 2 + bD * 0.6) * 7 * by, by, bV);
              bZ += bt;
            }
            if (ba) {
              bW.fillStyle = F2;
              bW.fillText(".", bZ, 0);
            }
          } else {
            bW.textAlign = "left";
            Fq(bW, bm, bq, 0, by, bV);
            if (ba && bm === bT) {
              bW.fillStyle = F2;
              bW.fillText(".", bq + bl, 0);
            }
          }
          bW.restore();
        }
        if (bP) {
          bW.save();
          FY(bW, bP, bI * 0.8, Math.round(by * 24), 700);
          bW.textAlign = "center";
          bW.textBaseline = "middle";
          bW.lineWidth = by * 4;
          bW.strokeStyle = "rgba(0,26,54,.85)";
          bW.strokeText(bP, bI / 2, bg + by * 46);
          bW.fillStyle = "#ffffff";
          bW.fillText(bP, bI / 2, bg + by * 46);
          bW.restore();
        }
      })(FZ, FD, Ff, b0 - b6, Fu, b1);
    }
    (function (bW, bV, bI, bG, bs, by, bT) {
      const bP = bV.brand || "balanced";
      const bK = new Set(bV.brandEls || []);
      const bg = Array.isArray(bV.brandEls);
      if (bK.has("stripe") && bs > 0.5 && bs < 0.78) {
        const bM = -bI * 0.4 + (bs - 0.5) / 0.28 * bI * 1.8;
        bW.save();
        bW.globalAlpha = 0.85;
        bW.fillStyle = F2;
        bW.beginPath();
        bW.moveTo(bM, 0);
        bW.lineTo(bM + by * 40, 0);
        bW.lineTo(bM - by * 140, bG);
        bW.lineTo(bM - by * 180, bG);
        bW.fill();
        bW.fillStyle = F3;
        bW.globalAlpha = 0.5;
        bW.beginPath();
        bW.moveTo(bM + by * 60, 0);
        bW.lineTo(bM + by * 72, 0);
        bW.lineTo(bM - by * 108, bG);
        bW.lineTo(bM - by * 120, bG);
        bW.fill();
        bW.restore();
      }
      if (bg ? bK.has("frame") : bP === "bold") {
        bW.save();
        bW.lineWidth = by * 10;
        bW.strokeStyle = F1;
        bW.strokeRect(by * 5, by * 5, bI - by * 10, bG - by * 10);
        bW.fillStyle = F2;
        bW.fillRect(0, 0, by * 70, by * 10);
        bW.fillRect(0, 0, by * 10, by * 70);
        bW.fillRect(bI - by * 70, bG - by * 10, by * 70, by * 10);
        bW.fillRect(bI - by * 10, bG - by * 70, by * 10, by * 70);
        bW.restore();
      }
      if (bK.has("ribbon")) {
        bW.save();
        bW.translate(0, 0);
        bW.beginPath();
        bW.moveTo(0, by * 54);
        bW.lineTo(by * 54, 0);
        bW.lineTo(by * 104, 0);
        bW.lineTo(0, by * 104);
        bW.closePath();
        bW.fillStyle = F2;
        bW.fill();
        bW.translate(by * 39, by * 39);
        bW.rotate(-Math.PI / 4);
        bW.fillStyle = F1;
        bW.font = "900 " + by * 13 + "px " + F7;
        bW.textAlign = "center";
        bW.textBaseline = "middle";
        bW.fillText("TEAM iMATH", 0, 0);
        bW.restore();
      }
      if (bK.has("lockbar")) {
        const ba = bG * 0.12;
        bW.fillStyle = F1;
        bW.fillRect(0, bG - ba, bI, ba);
        bW.fillStyle = F2;
        bW.fillRect(0, bG - ba, bI, by * 4);
        Fe(bW, bT.lockDark, bK.has("nametag") && bT.name ? bI * 0.3 : bI / 2, bG - ba / 2 + by * 2, bI * (bK.has("nametag") && bT.name ? 0.44 : 0.62), ba * 0.62);
        if (bK.has("nametag") && bT.name) {
          bW.fillStyle = "#fff";
          bW.textAlign = "center";
          bW.textBaseline = "middle";
          FY(bW, bT.name, bI * 0.4, Math.round(ba * 0.32), 800);
          bW.fillText(bT.name, bI * 0.76, bG - ba / 2 + by * 2);
        }
      } else if (bK.has("nametag") && bT.name) {
        bW.save();
        bW.font = "800 " + by * 16 + "px " + F7;
        const bm = bW.measureText(bT.name).width;
        bW.fillStyle = F1;
        Fw(bW, by * 14, bG - by * 44, bm + by * 34, by * 30, by * 15);
        bW.fill();
        bW.fillStyle = F2;
        bW.beginPath();
        bW.arc(by * 29, bG - by * 29, by * 5, 0, 7);
        bW.fill();
        bW.fillStyle = "#fff";
        bW.textBaseline = "middle";
        bW.fillText(bT.name, by * 40, bG - by * 28);
        bW.restore();
      }
      if ((bg ? bK.has("badge") : bP === "bold" || bP === "balanced") && bT && bT.icon) {
        const bQ = (bP === "bold" ? 22 : 17) * by;
        const be = bI - bQ - by * 14;
        const bz = bQ + by * 14;
        bW.save();
        bW.fillStyle = "#fff";
        bW.beginPath();
        bW.arc(be, bz, bQ, 0, 7);
        bW.fill();
        const bJ = bQ * 1.35;
        const bo = bJ * bT.icon.height / bT.icon.width;
        bW.drawImage(bT.icon, be - bJ / 2, bz - bo / 2, bJ, bo);
        bW.restore();
      }
      if (bK.has("endcard") && bs > 0.86) {
        const bl = FM((bs - 0.86) / 0.06);
        bW.save();
        bW.globalAlpha = Math.min(1, bl);
        bW.fillStyle = F1;
        bW.fillRect(0, 0, bI, bG);
        bW.fillStyle = F2;
        bW.fillRect(bI * 0.62, 0, by * 10, bG);
        Fe(bW, bT.lockDark, bI / 2, bG * 0.46, bI * 0.7, bG * 0.2);
        bW.fillStyle = F2;
        bW.beginPath();
        bW.arc(bI / 2, bG * 0.64, by * 6, 0, 7);
        bW.fill();
        bW.restore();
      }
      if (!bK.size && bP !== "bold") {
        bW.fillStyle = F2;
        bW.beginPath();
        bW.arc(bI - by * 14, bG - by * 14, by * 4, 0, 7);
        bW.fill();
      }
    })(FZ, FD, Ff, b0, Fu, b1, Ft);
  }
  const Fm = {
    navy: {
      bg: F1,
      fg: "#ffffff",
      acc: F2,
      dark: true
    },
    green: {
      bg: F2,
      fg: F1,
      acc: F1,
      dark: false
    },
    gray: {
      bg: "#4b4f53",
      fg: "#ffffff",
      acc: F2,
      dark: true
    },
    white: {
      bg: "#ffffff",
      fg: F1,
      acc: F2,
      dark: false
    }
  };
  function FQ(FZ, FD) {
    if (FD) {
      return FZ.lockDark;
    } else {
      return FZ.lockLight;
    }
  }
  function Fe(FZ, FD, Fu, Ft, Ff, b0) {
    if (!FD) {
      return;
    }
    const b1 = FD.width / FD.height;
    let b2 = Ff;
    let b3 = b2 / b1;
    if (b3 > b0) {
      b3 = b0;
      b2 = b3 * b1;
    }
    FZ.drawImage(FD, Fu - b2 / 2, Ft - b3 / 2, b2, b3);
  }
  function Fz(FZ, FD, Fu, Ft, Ff, b0, b1, b2, b3, b4) {
    b4 = b4 || {};
    FZ.save();
    FZ.fillStyle = b1.bg;
    FZ.shadowColor = "rgba(0,0,0,.3)";
    FZ.shadowBlur = Ff * 0.06;
    FZ.shadowOffsetY = Ff * 0.03;
    Fw(FZ, FD, Fu, Ft, Ff, Ff * 0.05);
    FZ.fill();
    FZ.restore();
    FZ.fillStyle = b1.acc;
    FZ.fillRect(FD, Fu + Ff - Ff * 0.07, Ft, Ff * 0.07);
    FZ.save();
    FZ.beginPath();
    Fw(FZ, FD, Fu, Ft, Ff, Ff * 0.05);
    FZ.clip();
    FZ.fillStyle = b1.acc;
    FZ.globalAlpha = 0.9;
    FZ.beginPath();
    FZ.moveTo(FD + Ft * 0.86, Fu);
    FZ.lineTo(FD + Ft * 0.9, Fu);
    FZ.lineTo(FD + Ft * 0.8, Fu + Ff);
    FZ.lineTo(FD + Ft * 0.76, Fu + Ff);
    FZ.fill();
    FZ.restore();
    let b5 = FD;
    let b6 = Ft;
    if (b3) {
      const bw = Ff * 0.62;
      const bY = FD + Ff * 0.1 + bw / 2;
      const bk = Fu + Ff * 0.46;
      FZ.save();
      FZ.beginPath();
      FZ.arc(bY, bk, bw / 2, 0, 7);
      FZ.clip();
      const bj = b3.naturalWidth || b3.width;
      const bp = b3.naturalHeight || b3.height;
      const bn = Math.max(bw / bj, bw / bp);
      FZ.fillStyle = "#fff";
      FZ.fillRect(bY - bw / 2, bk - bw / 2, bw, bw);
      FZ.drawImage(b3, bY - bj * bn / 2, bk - bp * bn / 2, bj * bn, bp * bn);
      FZ.restore();
      FZ.lineWidth = Ff * 0.025;
      FZ.strokeStyle = b1.acc;
      FZ.beginPath();
      FZ.arc(bY, bk, bw / 2, 0, 7);
      FZ.stroke();
      b5 = FD + bw + Ff * 0.18;
      b6 = Ft - bw - Ff * 0.22;
    }
    const b7 = FQ(b2, b1.dark);
    if (b7 && !b4.noLock) {
      Fe(FZ, b7, b5 + b6 / 2, Fu + Ff * 0.17, b6 * 0.62, Ff * 0.18);
    }
    const b8 = String(b0.text || "SOLD!");
    const b9 = String(b0.sub || "");
    const bF = Fu + Ff * (b9 ? 0.52 : 0.58);
    const bb = FY(FZ, b8, b6 * 0.86, Math.round(Ff * (b9 ? 0.26 : 0.32)), 900);
    FZ.fillStyle = b1.fg;
    FZ.textAlign = "center";
    FZ.textBaseline = "middle";
    FZ.fillText(b8, b5 + b6 / 2, bF);
    if (/[a-z0-9]$/i.test(b8)) {
      const bv = FZ.measureText(b8).width;
      FZ.fillStyle = b1.acc === F1 ? "#ffffff" : F2;
      FZ.beginPath();
      FZ.arc(b5 + b6 / 2 + bv / 2 + bb * 0.14, bF + bb * 0.28, bb * 0.09, 0, 7);
      FZ.fill();
    }
    if (b9) {
      FY(FZ, b9, b6 * 0.84, Math.round(Ff * 0.1), 700);
      FZ.fillStyle = b1.fg;
      FZ.globalAlpha = 0.9;
      FZ.fillText(b9, b5 + b6 / 2, Fu + Ff * 0.78);
      FZ.globalAlpha = 1;
    }
  }
  function FJ(FZ, FD, Fu, Ft, Ff, b0, b1, b2) {
    const b3 = FD.naturalWidth || FD.width;
    const b4 = FD.naturalHeight || FD.height;
    const b5 = Ff / Math.max(b3, b4);
    FZ.save();
    FZ.translate(Fu, Ft);
    FZ.rotate(b0 || 0);
    FZ.scale(b1 == null ? 1 : b1, 1);
    if (b2 === "circle") {
      const b6 = Ff / 2;
      FZ.beginPath();
      FZ.arc(0, 0, b6, 0, 7);
      FZ.save();
      FZ.clip();
      const b7 = Math.max(Ff / b3, Ff / b4);
      FZ.drawImage(FD, -b3 * b7 / 2, -b4 * b7 / 2, b3 * b7, b4 * b7);
      FZ.restore();
      FZ.lineWidth = Ff * 0.03;
      FZ.strokeStyle = "#fff";
      FZ.stroke();
    } else {
      FZ.drawImage(FD, -b3 * b5 / 2, -b4 * b5 / 2, b3 * b5, b4 * b5);
    }
    FZ.restore();
  }
  const Fo = new WeakMap();
  function Fl(FZ, FD) {
    let Fu = Fo.get(FZ);
    if (!Fu) {
      Fu = {};
      Fo.set(FZ, Fu);
    }
    if (Fu[FD]) {
      return Fu[FD];
    }
    const Ft = FF(FZ.naturalWidth || FZ.width, FZ.naturalHeight || FZ.height);
    const Ff = Ft.getContext("2d");
    Ff.drawImage(FZ, 0, 0);
    Ff.globalCompositeOperation = "source-in";
    Ff.fillStyle = FD;
    Ff.fillRect(0, 0, Ft.width, Ft.height);
    Fu[FD] = Ft;
    return Ft;
  }
  function Fq(FZ, FD, Fu, Ft, Ff, b0) {
    FZ.lineJoin = "round";
    FZ.lineWidth = Ff * 10;
    FZ.strokeStyle = b0.brand === "light" ? "rgba(0,26,54,.85)" : F1;
    FZ.strokeText(FD, Fu, Ft);
    FZ.fillStyle = "#ffffff";
    FZ.fillText(FD, Fu, Ft);
  }
  F0.iMathFun = {
    autoCut: FL,
    avatar: function (FZ, FD, Fu, Ft) {
      const Ff = Fu.style || "comic";
      if (Ff === "bighead") {
        return function (bc, bX, bN, bL) {
          FH(bc, bX, bX, bN.bg || "brand", 11);
          const bE = bL.crop && !bL.cutout ? {
            cx: bL.crop.cx,
            cy: bL.crop.cy,
            r: bL.crop.r * 1.15
          } : bL.crop;
          const bh = bL.img ? FX(bL.img, bE, 480) : null;
          const bx = bh ? FE(bh) : "#d9a47e";
          const bH = bh ? Fx(bh, "comic", bL.key + "b") : FK(bL.initials);
          const bd = bX / 2;
          const bS = bX * 0.33;
          const bA = bX * 0.25;
          (function (br, bR, bU) {
            const bB = bR / 1000;
            const bO = F8[bU.color] || bU.color || F1;
            const bC = bU.outfit || "suit";
            const bi = FW[bU.pose] || FW.relaxed;
            const bW = bU.ink ? F5 : "rgba(0,0,0,.28)";
            const bV = bU.ink ? bB * 9 : bB * 4;
            br.save();
            br.lineJoin = "round";
            br.lineCap = "round";
            if (bC === "hero") {
              br.fillStyle = F8[bU.cape] || F2;
              br.beginPath();
              br.moveTo(bB * 330, bB * 640);
              const bs = bU.pose === "fly" ? 1.4 : 1;
              br.quadraticCurveTo(bB * 160 * bs, bB * 900, bB * 110, bB * 1000);
              br.lineTo(bB * 890, bB * 1000);
              br.quadraticCurveTo(bB * 840, bB * 900, bB * 670, bB * 640);
              br.closePath();
              br.fill();
              br.lineWidth = bV;
              br.strokeStyle = bW;
              br.stroke();
            }
            br.fillStyle = bO;
            br.beginPath();
            br.moveTo(bB * 300, bB * 680);
            br.quadraticCurveTo(bB * 310, bB * 610, bB * 400, bB * 600);
            br.lineTo(bB * 600, bB * 600);
            br.quadraticCurveTo(bB * 690, bB * 610, bB * 700, bB * 680);
            br.lineTo(bB * 735, bB * 1010);
            br.lineTo(bB * 265, bB * 1010);
            br.closePath();
            br.fill();
            br.lineWidth = bV;
            br.strokeStyle = bW;
            br.stroke();
            br.fillStyle = bU.skin;
            br.beginPath();
            br.moveTo(bB * 445, bB * 560);
            br.lineTo(bB * 555, bB * 560);
            br.lineTo(bB * 545, bB * 625);
            br.quadraticCurveTo(bB * 500, bB * 650, bB * 455, bB * 625);
            br.closePath();
            br.fill();
            if (bC === "suit") {
              br.fillStyle = "#ffffff";
              br.beginPath();
              br.moveTo(bB * 445, bB * 605);
              br.lineTo(bB * 555, bB * 605);
              br.lineTo(bB * 500, bB * 760);
              br.closePath();
              br.fill();
              br.fillStyle = F2;
              br.beginPath();
              br.moveTo(bB * 485, bB * 620);
              br.lineTo(bB * 515, bB * 620);
              br.lineTo(bB * 522, bB * 740);
              br.lineTo(bB * 500, bB * 770);
              br.lineTo(bB * 478, bB * 740);
              br.closePath();
              br.fill();
              br.strokeStyle = "rgba(0,0,0,.25)";
              br.lineWidth = bB * 3;
              br.beginPath();
              br.moveTo(bB * 430, bB * 605);
              br.lineTo(bB * 500, bB * 800);
              br.lineTo(bB * 570, bB * 605);
              br.stroke();
              br.fillStyle = "rgba(0,0,0,.3)";
              [850, 920].forEach(by => {
                br.beginPath();
                br.arc(bB * 500, by * bB, bB * 8, 0, 7);
                br.fill();
              });
            } else if (bC === "polo") {
              br.fillStyle = "rgba(255,255,255,.92)";
              br.beginPath();
              br.moveTo(bB * 430, bB * 600);
              br.lineTo(bB * 500, bB * 640);
              br.lineTo(bB * 470, bB * 680);
              br.closePath();
              br.fill();
              br.beginPath();
              br.moveTo(bB * 570, bB * 600);
              br.lineTo(bB * 500, bB * 640);
              br.lineTo(bB * 530, bB * 680);
              br.closePath();
              br.fill();
              FV(br, bB * 600, bB * 730, bB * 30);
            } else if (bC === "tee") {
              br.strokeStyle = "rgba(255,255,255,.6)";
              br.lineWidth = bB * 8;
              br.beginPath();
              br.arc(bB * 500, bB * 600, bB * 60, 0.2, Math.PI - 0.2);
              br.stroke();
              br.fillStyle = "#fff";
              br.font = "900 " + bB * 46 + "px " + F7;
              br.textAlign = "center";
              br.fillText("iMath", bB * 500, bB * 800);
              br.fillStyle = F2;
              br.beginPath();
              br.arc(bB * 568, bB * 798, bB * 7, 0, 7);
              br.fill();
            } else if (bC === "hoodie") {
              br.fillStyle = "rgba(0,0,0,.18)";
              br.beginPath();
              br.ellipse(bB * 500, bB * 615, bB * 140, bB * 40, 0, 0, 7);
              br.fill();
              br.strokeStyle = "#fff";
              br.lineWidth = bB * 5;
              [470, 530].forEach(by => {
                br.beginPath();
                br.moveTo(by * bB, bB * 640);
                br.lineTo(by * bB, bB * 740);
                br.stroke();
              });
              br.fillStyle = "rgba(0,0,0,.14)";
              Fw(br, bB * 400, bB * 850, bB * 200, bB * 110, bB * 30);
              br.fill();
              FV(br, bB * 500, bB * 790, bB * 26);
            } else if (bC === "dress" || bC === "glam") {
              br.fillStyle = bO;
              br.beginPath();
              br.moveTo(bB * 380, bB * 640);
              br.lineTo(bB * 620, bB * 640);
              br.lineTo(bB * 760, bB * 1010);
              br.lineTo(bB * 240, bB * 1010);
              br.closePath();
              br.fill();
              br.fillStyle = bU.skin;
              br.beginPath();
              br.moveTo(bB * 400, bB * 600);
              br.lineTo(bB * 600, bB * 600);
              br.lineTo(bB * 590, bB * 650);
              br.quadraticCurveTo(bB * 500, bB * 690, bB * 410, bB * 650);
              br.closePath();
              br.fill();
              br.fillStyle = bC === "glam" ? "#ffffff" : F2;
              br.fillRect(bB * 360, bB * 780, bB * 280, bB * 22);
              if (bC === "glam") {
                const by = F9(9);
                for (let bT = 0; bT < 26; bT++) {
                  Fd(br, (300 + by() * 400) * bB, (680 + by() * 320) * bB, (5 + by() * 8) * bB, "#fff", 0.85);
                }
                br.fillStyle = "#fff";
                for (let bP = 0; bP < 9; bP++) {
                  const bK = Math.PI * (0.15 + bP * 0.0875);
                  br.beginPath();
                  br.arc(bB * 500 + Math.cos(bK) * 85 * bB, bB * 600 + Math.sin(bK) * 55 * bB, bB * 8, 0, 7);
                  br.fill();
                }
              }
            } else if (bC === "hero") {
              br.fillStyle = F6;
              br.fillRect(bB * 300, bB * 900, bB * 400, bB * 34);
              br.fillStyle = "#fff";
              br.beginPath();
              br.moveTo(bB * 500, bB * 660);
              br.lineTo(bB * 590, bB * 720);
              br.lineTo(bB * 500, bB * 840);
              br.lineTo(bB * 410, bB * 720);
              br.closePath();
              br.fill();
              br.lineWidth = bB * 6;
              br.strokeStyle = F2;
              br.stroke();
              br.fillStyle = F1;
              br.font = "900 " + bB * 62 + "px " + F7;
              br.textAlign = "center";
              br.textBaseline = "middle";
              br.fillText("iM", bB * 500, bB * 742);
            }
            const bI = {
              L: [330, 650],
              R: [670, 650]
            };
            const bG = bC === "tee" || bC === "dress" || bC === "glam" ? bU.skin : bO;
            ["L", "R"].forEach(bg => {
              const [bM, ba] = bi[bg];
              const bm = bI[bg];
              br.beginPath();
              br.moveTo(bm[0] * bB, bm[1] * bB);
              br.quadraticCurveTo(bM[0] * bB, bM[1] * bB, ba[0] * bB, ba[1] * bB);
              br.lineWidth = bB * 86 + bV * 2;
              br.strokeStyle = bW;
              br.stroke();
              br.lineWidth = bB * 86;
              br.strokeStyle = bG;
              br.stroke();
              if (ba[1] < 1000) {
                (function (bQ, be, bz, bJ, bo, bl, bq, bZ) {
                  bQ.fillStyle = bo;
                  bQ.strokeStyle = bq;
                  bQ.lineWidth = bZ;
                  bQ.beginPath();
                  bQ.arc(be, bz, bJ * 46, 0, 7);
                  bQ.fill();
                  bQ.stroke();
                  if (bl === "point") {
                    bQ.save();
                    bQ.translate(be, bz);
                    bQ.rotate(-0.85);
                    Fw(bQ, bJ * -12, bJ * -100, bJ * 26, bJ * 70, bJ * 13);
                    bQ.fill();
                    bQ.stroke();
                    bQ.restore();
                  }
                  if (bl === "open") {
                    for (let bD = 0; bD < 4; bD++) {
                      bQ.save();
                      bQ.translate(be, bz);
                      bQ.rotate(bD * 0.4 - 0.6);
                      Fw(bQ, bJ * -10, bJ * -88, bJ * 22, bJ * 52, bJ * 11);
                      bQ.fill();
                      bQ.stroke();
                      bQ.restore();
                    }
                  }
                })(br, ba[0] * bB, ba[1] * bB, bB, bU.skin, bg === "R" || bi.hand === "fist" || bi.hand === "sign" ? bi.hand : "fist", bW, bV);
              }
            });
            if (bi.hand === "sign") {
              FB(br, bB * 500, bB * 820, bB * 360, bU.sign || "SOLD!");
            }
            if (bi.hand === "keys") {
              Fr(br, bB * 640, bB * 740, bB * 90, -0.9);
            }
            br.restore();
          })(bc, bX, {
            outfit: bN.outfit && bN.outfit !== "none" ? bN.outfit : "suit",
            color: bN.color || "navy",
            pose: bN.pose && bN.pose !== "thumbs" ? bN.pose : "wave",
            skin: bx,
            ink: true,
            cape: bN.cape,
            sign: bN.sign
          });
          bc.beginPath();
          bc.arc(bd, bS, bA, 0, 7);
          bc.save();
          bc.clip();
          bc.drawImage(bH, bd - bA, bS - bA, bA * 2, bA * 2);
          bc.restore();
          bc.lineWidth = bX * 0.012;
          bc.strokeStyle = F5;
          bc.stroke();
          FC(bc, bN.hat, bd, bS, bA, bN.hatAdj);
          Fi(bc, bN.glasses, bd, bS, bA, bN.glassAdj);
          if (bN.prop && bN.prop !== "none" && FO[bN.prop] && bN.pose !== "keys" && bN.pose !== "sign") {
            FO[bN.prop](bc, bX * 0.2, bX * 0.84, bX * 0.3);
          }
          if (bN.text) {
            Fg(bc, bX, bN.text);
          }
          FP(bc, bX, bN, bL);
        }(FZ, FD, Fu, Ft);
      }
      if (Ff === "image") {
        FH(FZ, FD, FD, Fu.bg || "brand", 11);
        if (Ft.img) {
          const bc = Ft.img.naturalWidth || Ft.img.width;
          const bX = Ft.img.naturalHeight || Ft.img.height;
          const bN = Ft.cutout ? Math.min(FD * 0.92 / bc, FD * 0.92 / bX) : Math.max(FD / bc, FD / bX);
          FZ.save();
          if (Ft.cutout) {
            FZ.shadowColor = "rgba(0,12,30,.45)";
            FZ.shadowBlur = FD * 0.035;
            FZ.shadowOffsetY = FD * 0.015;
          }
          FZ.drawImage(Ft.img, (FD - bc * bN) / 2, Ft.cutout ? FD - bX * bN - FD * 0.03 : (FD - bX * bN) / 2, bc * bN, bX * bN);
          FZ.restore();
        }
        if (Fu.text) {
          Fg(FZ, FD, Fu.text);
        }
        FP(FZ, FD, Fu, Ft);
        return;
      }
      const b0 = {
        superhero: "skyline",
        glam: "glam",
        retro: "sunset",
        pop: "pop",
        sketch: "mist",
        neon: "neon",
        sticker: "none"
      }[Ff] || "brand";
      const b1 = Fu.bg || b0;
      if (b1 === "pop") {
        (function (bL, bE) {
          bL.fillStyle = F2;
          bL.fillRect(0, 0, bE, bE);
          bL.fillStyle = "rgba(0,46,94,.35)";
          const bh = bE / 36;
          for (let bx = 0; bx < bE + bh; bx += bh) {
            for (let bH = bx / bh % 2 * bh / 2; bH < bE + bh; bH += bh) {
              const bd = Math.hypot(bH - bE / 2, bx - bE * 0.45) / bE;
              bL.beginPath();
              bL.arc(bH, bx, bh * 0.42 * Fb(bd * 1.3, 0.15, 1), 0, 7);
              bL.fill();
            }
          }
        })(FZ, FD);
      } else if (b1 === "neon") {
        FZ.fillStyle = "#04101f";
        FZ.fillRect(0, 0, FD, FD);
      } else {
        FH(FZ, FD, FD, b1, 11);
      }
      const b2 = Ft.img ? FX(Ft.img, Ft.crop, 480) : null;
      const b3 = b2 ? FE(b2) : "#d9a47e";
      const b4 = {
        comic: "comic",
        caricature: "caricature",
        anime: "anime",
        glam: "glam",
        pop: "pop"
      }[Ff] || "soft";
      const b5 = !!b2 && (Ft.cutout || Fu.cut !== false);
      const b6 = b2 && b5 && !Ft.cutout ? FL(b2, Ft.key) : b2;
      let b7 = b6 ? b4 === "pop" ? function (bL, bE) {
        const bh = bL.width;
        const bx = FF(bh, bh);
        const bH = bx.getContext("2d");
        bH.drawImage(bL, 0, 0);
        const bd = bH.getImageData(0, 0, bh, bh);
        const bS = bd.data;
        Fj(bS, 1, 0, 1.25);
        const bA = bE.map(Fc);
        for (let br = 0; br < bS.length; br += 4) {
          const bR = (bS[br] * 0.299 + bS[br + 1] * 0.587 + bS[br + 2] * 0.114) / 255;
          const bU = bR < 0.36 ? bA[0] : bR < 0.66 ? bA[1] : bA[2];
          bS[br] = bU[0];
          bS[br + 1] = bU[1];
          bS[br + 2] = bU[2];
        }
        bH.putImageData(bd, 0, 0);
        return bx;
      }(b6, [F1, F2, "#ffffff"]) : Fx(b6, b4, Ft.key + (b5 ? "c" : "")) : FK(Ft.initials);
      if (b7 && b5 && b4 === "pop") {
        const bL = FF(b7.width, b7.height);
        const bE = bL.getContext("2d");
        bE.drawImage(b6, 0, 0);
        bE.globalCompositeOperation = "source-in";
        bE.drawImage(b7, 0, 0);
        b7 = bL;
      }
      const b8 = /comic|caricature|pop|anime/.test(Ff);
      const b9 = /comic|caricature|pop/.test(Ff) ? F5 : Ff === "anime" ? "#3a2850" : "rgba(0,10,30,.0)";
      const bF = /comic|caricature|pop/.test(Ff) ? 7 : Ff === "anime" ? 4 : 0;
      const bb = Object.assign({}, Fu);
      if (Ff === "superhero") {
        bb.outfit = "hero";
        if (!Fu.pose || Fu.pose === "relaxed") {
          bb.pose = "fly";
        }
      }
      if (Ff === "glam" && (!Fu.outfit || Fu.outfit === "none" || Fu.outfit === "hero")) {
        bb.outfit = "glam";
        if (!Fu.color || Fu.color === "navy") {
          bb.color = "pink";
        }
      }
      const bw = FD * (Fu.text ? 0.8 : 0.9) / 1000;
      const bY = (FD - bw * 1000) / 2;
      const bk = FD * 0.035;
      const bj = FF(FD, FD);
      const bp = bj.getContext("2d");
      bp.translate(bY, bk);
      bp.scale(bw, bw);
      const bn = function (bh, bx, bH, bd, bS, bA, br) {
        br = br || {};
        const bR = F8[bx.color] || bx.color || F1;
        const bU = bx.outfit && bx.outfit !== "none" ? bx.outfit : "polo";
        const bB = FI[bx.pose] || FI.relaxed;
        const bO = FG(bR, -0.22);
        const bC = bU === "suit" || bU === "hero" ? FG(bR, -0.12) : bU === "polo" ? "#c9b48a" : bU === "tee" ? "#3b5b8c" : bU === "hoodie" ? "#3a3f46" : bR;
        bh.save();
        bh.lineJoin = "round";
        bh.lineCap = "round";
        const bi = () => {
          if (bA) {
            bh.lineWidth = bA;
            bh.strokeStyle = bS;
            bh.stroke();
          }
        };
        const bW = 500;
        const bV = 150 - (br.big ? 18 : 0);
        const bI = (br.big || 1) * 80;
        const bG = (br.big || 1) * 98;
        bh.fillStyle = "rgba(0,0,0,.18)";
        bh.beginPath();
        bh.ellipse(500, 958, 190, 22, 0, 0, 7);
        bh.fill();
        if (bU === "hero") {
          bh.fillStyle = F8[bx.cape] || F2;
          bh.beginPath();
          bh.moveTo(380, 300);
          bh.quadraticCurveTo(300, 620, 250, 900);
          bh.quadraticCurveTo(480, 950, 780, 880);
          bh.quadraticCurveTo(700, 600, 620, 300);
          bh.closePath();
          bh.fill();
          bi();
        }
        const bs = bB.spread ? 40 : 0;
        const by = [[452, 575, 446 - bs, 905], [548, 575, 554 + bs, 905]];
        if (bU !== "glam") {
          by.forEach(([bm, bQ, be, bz]) => {
            if (br.shade) {
              Fs(bh, [[bm, bQ], [(bm + be) / 2 + (be < 500 ? -4 : 4), (bQ + bz) / 2], [be, bz]], bU === "dress" ? [60, 52] : [92, 74], bU === "dress" ? bd : bC, bS, bA);
            } else {
              bh.beginPath();
              bh.moveTo(bm, bQ);
              bh.lineTo(be, bz);
              bh.lineWidth = 78 + (bA ? bA * 2 : 0);
              bh.strokeStyle = bA ? bS : "transparent";
              bh.stroke();
              bh.lineWidth = 78;
              bh.strokeStyle = bU === "dress" ? bd : bC;
              bh.stroke();
            }
          });
        }
        const bT = bU === "hero" ? FG(bR, -0.35) : bU === "tee" || bU === "hoodie" ? "#f4f6f8" : bU === "polo" ? "#6b4a2e" : "#15181c";
        by.forEach(([bm, bQ, be, bz], bJ) => {
          const bo = be + (bJ ? 14 : -14);
          const bl = bz + 30;
          if (br.shade) {
            const bq = bh.createRadialGradient(bo - 18, bl - 12, 2, bo, bl, 56);
            bq.addColorStop(0, FG(bT, 0.45));
            bq.addColorStop(0.35, bT);
            bq.addColorStop(1, FG(bT, -0.45));
            bh.fillStyle = bq;
          } else {
            bh.fillStyle = bT;
          }
          bh.beginPath();
          bh.ellipse(bo, bl, 52, 24, 0, 0, 7);
          bh.fill();
          bi();
          if (bT === "#f4f6f8") {
            bh.fillStyle = F2;
            bh.fillRect(be + (bJ ? -10 : -38), bz + 30, 48, 6);
          }
        });
        const bP = () => {
          bh.beginPath();
          bh.moveTo(470, 270);
          bh.lineTo(530, 270);
          bh.bezierCurveTo(600, 272, 640, 282, 646, 330);
          bh.bezierCurveTo(640, 420, 622, 470, 616, 520);
          bh.quadraticCurveTo(622, 560, 612, 590);
          bh.quadraticCurveTo(500, 604, 388, 590);
          bh.quadraticCurveTo(378, 560, 384, 520);
          bh.bezierCurveTo(378, 470, 360, 420, 354, 330);
          bh.bezierCurveTo(360, 282, 400, 272, 470, 270);
          bh.closePath();
        };
        if (bU === "dress" || bU === "glam") {
          const bm = () => {
            bh.beginPath();
            bh.moveTo(405, 520);
            bh.lineTo(595, 520);
            bh.quadraticCurveTo(bU === "glam" ? 650 : 630, 700, bU === "glam" ? 700 : 655, bU === "glam" ? 940 : 760);
            bh.quadraticCurveTo(500, bU === "glam" ? 965 : 780, bU === "glam" ? 300 : 345, bU === "glam" ? 940 : 760);
            bh.quadraticCurveTo(bU === "glam" ? 350 : 370, 700, 405, 520);
            bh.closePath();
          };
          bh.fillStyle = bR;
          bm();
          bh.fill();
          bi();
          if (br.shade) {
            Fy(bh, bm, [300, 520, 400, 440]);
            bh.save();
            bm();
            bh.clip();
            bh.strokeStyle = "rgba(0,0,0,.08)";
            bh.lineWidth = 6;
            [-60, 0, 60].forEach(bQ => {
              bh.beginPath();
              bh.moveTo(500 + bQ * 0.5, 560);
              bh.quadraticCurveTo(500 + bQ, 760, 500 + bQ * 1.6, 960);
              bh.stroke();
            });
            bh.restore();
          }
        }
        bh.fillStyle = bR;
        bP();
        bh.fill();
        bi();
        if (br.shade) {
          Fy(bh, bP, [365, 272, 270, 310]);
        } else {
          const bQ = bh.createLinearGradient(365, 0, 635, 0);
          bQ.addColorStop(0, "rgba(255,255,255,.10)");
          bQ.addColorStop(0.55, "rgba(0,0,0,0)");
          bQ.addColorStop(1, "rgba(0,0,0,.18)");
          bh.fillStyle = bQ;
          bP();
          bh.fill();
        }
        const bK = () => {
          bh.beginPath();
          bh.moveTo(470, 222);
          bh.lineTo(530, 222);
          bh.lineTo(527, 292);
          bh.quadraticCurveTo(500, 306, 473, 292);
          bh.closePath();
        };
        bh.fillStyle = bd;
        bK();
        bh.fill();
        if (br.shade) {
          const be = bh.createLinearGradient(0, 222, 0, 292);
          be.addColorStop(0, "rgba(0,0,0,.38)");
          be.addColorStop(0.6, "rgba(0,0,0,.12)");
          be.addColorStop(1, "rgba(0,0,0,.05)");
          bh.fillStyle = be;
          bK();
          bh.fill();
        }
        if (bU === "suit") {
          bh.fillStyle = "#ffffff";
          bh.beginPath();
          bh.moveTo(462, 292);
          bh.lineTo(538, 292);
          bh.lineTo(500, 420);
          bh.closePath();
          bh.fill();
          bh.fillStyle = F2;
          bh.beginPath();
          bh.moveTo(490, 300);
          bh.lineTo(510, 300);
          bh.lineTo(516, 395);
          bh.lineTo(500, 420);
          bh.lineTo(484, 395);
          bh.closePath();
          bh.fill();
          bh.strokeStyle = "rgba(0,0,0,.3)";
          bh.lineWidth = 3;
          bh.beginPath();
          bh.moveTo(450, 292);
          bh.lineTo(500, 470);
          bh.lineTo(550, 292);
          bh.stroke();
          bh.fillStyle = F2;
          bh.fillRect(560, 350, 34, 10);
          bh.fillStyle = "rgba(0,0,0,.35)";
          [490, 535].forEach(bz => {
            bh.beginPath();
            bh.arc(500, bz, 6, 0, 7);
            bh.fill();
          });
        } else if (bU === "polo") {
          bh.fillStyle = "#ffffff";
          bh.beginPath();
          bh.moveTo(455, 288);
          bh.lineTo(500, 320);
          bh.lineTo(478, 352);
          bh.closePath();
          bh.fill();
          bh.beginPath();
          bh.moveTo(545, 288);
          bh.lineTo(500, 320);
          bh.lineTo(522, 352);
          bh.closePath();
          bh.fill();
          bh.fillStyle = "rgba(255,255,255,.7)";
          [345, 375].forEach(bz => {
            bh.beginPath();
            bh.arc(500, bz, 4, 0, 7);
            bh.fill();
          });
          FV(bh, 570, 360, 20);
          bh.fillStyle = "rgba(0,0,0,.18)";
          bh.fillRect(395, 560, 210, 18);
        } else if (bU === "tee") {
          bh.strokeStyle = "rgba(255,255,255,.55)";
          bh.lineWidth = 6;
          bh.beginPath();
          bh.arc(500, 292, 34, 0.25, Math.PI - 0.25);
          bh.stroke();
          bh.fillStyle = "#fff";
          bh.font = "900 34px " + F7;
          bh.textAlign = "center";
          bh.textBaseline = "middle";
          bh.fillText("iMath", 494, 420);
          bh.fillStyle = bR === F2 ? F1 : F2;
          bh.beginPath();
          bh.arc(546, 428, 6, 0, 7);
          bh.fill();
        } else if (bU === "hoodie") {
          bh.fillStyle = bO;
          bh.beginPath();
          bh.ellipse(500, 296, 92, 26, 0, 0, 7);
          bh.fill();
          bh.strokeStyle = "#fff";
          bh.lineWidth = 4;
          [482, 518].forEach(bz => {
            bh.beginPath();
            bh.moveTo(bz, 305);
            bh.lineTo(bz, 380);
            bh.stroke();
          });
          bh.fillStyle = "rgba(0,0,0,.16)";
          Fw(bh, 430, 470, 140, 70, 22);
          bh.fill();
          FV(bh, 500, 400, 22);
        } else if (bU === "dress") {
          bh.fillStyle = F2;
          bh.fillRect(398, 512, 204, 16);
          bh.strokeStyle = "rgba(255,255,255,.6)";
          bh.lineWidth = 5;
          bh.beginPath();
          bh.arc(500, 292, 38, 0.2, Math.PI - 0.2);
          bh.stroke();
        } else if (bU === "glam") {
          const bz = F9(9);
          for (let bJ = 0; bJ < 34; bJ++) {
            Fd(bh, 330 + bz() * 340, 320 + bz() * 600, 4 + bz() * 7, "#fff", 0.85);
          }
          bh.fillStyle = "#ffffff";
          for (let bo = 0; bo < 9; bo++) {
            const bl = Math.PI * (0.12 + bo * 0.095);
            bh.beginPath();
            bh.arc(500 + Math.cos(bl) * 40, 300 + Math.sin(bl) * 26, 5, 0, 7);
            bh.fill();
          }
          bh.fillStyle = "rgba(255,255,255,.9)";
          bh.fillRect(400, 512, 200, 12);
        } else if (bU === "hero") {
          bh.fillStyle = F6;
          bh.fillRect(388, 515, 224, 26);
          bh.fillStyle = "#fff";
          bh.beginPath();
          bh.moveTo(500, 330);
          bh.lineTo(560, 372);
          bh.lineTo(500, 452);
          bh.lineTo(440, 372);
          bh.closePath();
          bh.fill();
          bh.lineWidth = 5;
          bh.strokeStyle = F2;
          bh.stroke();
          bh.fillStyle = F1;
          bh.font = "900 40px " + F7;
          bh.textAlign = "center";
          bh.textBaseline = "middle";
          bh.fillText("iM", 500, 386);
        }
        const bg = bU !== "tee" && bU !== "dress" && bU !== "glam";
        const bM = {
          L: [384, 326],
          R: [616, 326]
        };
        ["L", "R"].forEach(bq => {
          const [bZ, bD] = bB[bq];
          const bu = bM[bq];
          const bt = () => {
            bh.beginPath();
            bh.moveTo(bu[0], bu[1]);
            bh.lineTo(bZ[0], bZ[1]);
            bh.lineTo(bD[0], bD[1]);
          };
          if (br.shade) {
            Fs(bh, [bu, bZ, bD], [60, 50], bg ? bR : bd, bS, bA);
            if (!bg && bU !== "glam") {
              Fs(bh, [bu, [bu[0] + (bZ[0] - bu[0]) * 0.5, bu[1] + (bZ[1] - bu[1]) * 0.5]], 62, bR, bS, bA);
            }
          } else {
            bt();
            bh.lineWidth = 56 + (bA ? bA * 2 : 0);
            bh.strokeStyle = bA ? bS : "rgba(0,0,0,0)";
            bh.stroke();
            bt();
            bh.lineWidth = 56;
            bh.strokeStyle = bg ? bR : bd;
            bh.stroke();
            if (!bg && bU !== "glam") {
              bh.beginPath();
              bh.moveTo(bu[0], bu[1]);
              bh.lineTo(bu[0] + (bZ[0] - bu[0]) * 0.45, bu[1] + (bZ[1] - bu[1]) * 0.45);
              bh.lineWidth = 60;
              bh.strokeStyle = bR;
              bh.stroke();
            }
          }
          (function (bf, w0, w1, w2, w3, w4, w5, w6, w7) {
            bf.save();
            if (w7) {
              const wb = bf.createRadialGradient(w0 - 9, w1 - 10, 2, w0, w1, 32);
              wb.addColorStop(0, FG(w2, 0.25));
              wb.addColorStop(0.6, w2);
              wb.addColorStop(1, FG(w2, -0.3));
              bf.fillStyle = wb;
            } else {
              bf.fillStyle = w2;
            }
            bf.strokeStyle = w5;
            bf.lineWidth = w6 || 0;
            const w8 = () => {
              if (w6) {
                bf.stroke();
              }
            };
            const w9 = w4 === "L" ? Math.PI / 2 + 0.08 : Math.PI / 2 - 0.08;
            const wF = w3 !== "fist" && w3 !== "sign" && w3 !== "keys" ? 1 : 0;
            bf.beginPath();
            bf.ellipse(w0, w1 + (wF ? 0 : 6), 24, 30, w3 === "open" || w3 === "point" ? 0 : w9 - Math.PI / 2, 0, 7);
            bf.fill();
            w8();
            if (w3 === "fist" || w3 === "sign" || w3 === "keys") {
              bf.fillStyle = "rgba(0,0,0,.12)";
              [-8, 2, 12].forEach(ww => {
                bf.beginPath();
                bf.arc(w0 + ww - 2, w1 + 12, 4, 0, 7);
                bf.fill();
              });
            }
            if (w3 === "point") {
              bf.translate(w0, w1);
              bf.rotate(-0.85);
              Fw(bf, -8, -62, 16, 44, 8);
              bf.fill();
              w8();
            }
            if (w3 === "open") {
              for (let ww = 0; ww < 4; ww++) {
                bf.save();
                bf.translate(w0, w1);
                bf.rotate(ww * 0.37 - 0.55);
                Fw(bf, -6, -56, 13, 32, 6);
                bf.fill();
                w8();
                bf.restore();
              }
            }
            bf.restore();
          })(bh, bD[0], bD[1], bd, bq === "R" ? bB.h || "fist" : bB.l || "fist", bq, bS, bA, br.shade);
        });
        if (bB.h === "sign") {
          FB(bh, 500, 470, 250, bx.sign || "SOLD!");
        }
        if (bB.h === "keys") {
          Fr(bh, 585, 438, 46, -0.9);
        }
        if (br.shade) {
          bh.fillStyle = "rgba(0,10,30,.28)";
          bh.beginPath();
          bh.ellipse(506, bV + bG * 0.9, bI * 0.72, bG * 0.2, 0, 0, 7);
          bh.fill();
        }
        const ba = () => {
          bh.beginPath();
          bh.ellipse(bW, bV, bI, bG, 0, 0, 7);
          bh.closePath();
        };
        if (br.cut && bH) {
          const bq = bG * 2.5;
          const bZ = bV + bG * 0.16;
          bh.save();
          bh.beginPath();
          bh.ellipse(bW, bV - bG * 0.02, bI * 1.55, bG * 1.12, 0, 0, 7);
          bh.clip();
          if (bA) {
            const bD = FT(bH, bS);
            for (let bu = 0; bu < 12; bu++) {
              bh.drawImage(bD, bW - bq / 2 + Math.cos(bu / 12 * 6.283) * bA * 0.7, bZ - bq / 2 + Math.sin(bu / 12 * 6.283) * bA * 0.7, bq, bq);
            }
          }
          bh.drawImage(bH, bW - bq / 2, bZ - bq / 2, bq, bq);
          bh.restore();
        } else {
          bh.save();
          ba();
          bh.save();
          bh.clip();
          if (bH) {
            bh.drawImage(bH, bW - bG, bV - bG, bG * 2, bG * 2);
          } else {
            bh.fillStyle = bd;
            bh.fillRect(bW - bI, bV - bG, bI * 2, bG * 2);
          }
          bh.restore();
          if (br.shade) {
            Fy(bh, ba, [bW - bI, bV - bG, bI * 2, bG * 2], true);
          }
          if (bA) {
            ba();
            bh.lineWidth = bA;
            bh.strokeStyle = bS;
            bh.stroke();
          }
          bh.restore();
        }
        bh.restore();
        return {
          hx: bW,
          hy: bV,
          R: bG
        };
      }(bp, bb, b7, b3, b9, bF, {
        big: Ff === "caricature" ? 1.18 : 0,
        shade: !b8,
        cut: b5
      });
      FC(bp, Fu.hat, bn.hx, bn.hy + 6, bn.R, Fu.hatAdj);
      Fi(bp, Fu.glasses, bn.hx, bn.hy - 4, bn.R * 0.92, Fu.glassAdj);
      if (Fu.prop && Fu.prop !== "none" && FO[Fu.prop] && bb.pose !== "keys" && bb.pose !== "sign") {
        const bh = ["coffee", "megaphone", "keys", "money", "balloons"].includes(Fu.prop);
        const bx = (FI[bb.pose] || FI.relaxed).L[1];
        if (bh) {
          FO[Fu.prop](bp, bx[0] - 18, bx[1] - (Fu.prop === "balloons" ? 170 : 20), Fu.prop === "balloons" ? 360 : 200);
        } else {
          FO[Fu.prop](bp, 175, 850, 260);
        }
      }
      if (Ff === "glam" || Ff === "anime") {
        const bH = F9(5);
        for (let bd = 0; bd < 9; bd++) {
          Fd(bp, 500 + (bH() - 0.5) * 520, 120 + bH() * 700, 8 + bH() * 14, bd % 3 ? "#ffffff" : F2, 0.9);
        }
      }
      let bv = function (bS, bA) {
        const br = bS.width;
        if (bA === "pixel") {
          const bR = Math.round(br / 11);
          const bU = FF(bR, bR);
          const bB = bU.getContext("2d");
          bB.drawImage(bS, 0, 0, bR, bR);
          const bO = bB.getImageData(0, 0, bR, bR);
          Fp(bO.data, 6);
          for (let bW = 3; bW < bO.data.length; bW += 4) {
            bO.data[bW] = bO.data[bW] > 110 ? 255 : 0;
          }
          bB.putImageData(bO, 0, 0);
          const bC = FF(br, br);
          const bi = bC.getContext("2d");
          bi.imageSmoothingEnabled = false;
          bi.drawImage(bU, 0, 0, br, br);
          return bC;
        }
        if (bA === "sketch" || bA === "neon" || bA === "watercolor" || bA === "retro") {
          const bV = Math.round(br / 2);
          const bI = FF(bV, bV);
          bI.getContext("2d").drawImage(bS, 0, 0, bV, bV);
          const bG = Fx(bI, bA, "fig" + Math.random());
          Fh.clear();
          const bs = FF(br, br);
          bs.getContext("2d").drawImage(bG, 0, 0, br, br);
          return bs;
        }
        return bS;
      }(bj, Ff);
      if (Ff === "neon") {
        FZ.save();
        FZ.shadowColor = F2;
        FZ.shadowBlur = FD * 0.02;
        FZ.drawImage(bv, 0, 0);
        FZ.restore();
      } else if (Ff === "sticker" || b1 === "none") {
        const bS = FT(bv, "#ffffff");
        const bA = FD * 0.013;
        FZ.save();
        FZ.shadowColor = "rgba(0,20,45,.35)";
        FZ.shadowBlur = FD * 0.02;
        FZ.shadowOffsetY = FD * 0.01;
        for (let br = 0; br < 16; br++) {
          FZ.drawImage(bS, Math.cos(br / 16 * 6.283) * bA, Math.sin(br / 16 * 6.283) * bA);
        }
        FZ.restore();
        FZ.drawImage(bv, 0, 0);
      } else {
        FZ.save();
        if (!b8) {
          FZ.shadowColor = "rgba(0,12,30,.45)";
          FZ.shadowBlur = FD * 0.035;
          FZ.shadowOffsetX = FD * 0.012;
          FZ.shadowOffsetY = FD * 0.016;
        }
        FZ.drawImage(bv, 0, 0);
        FZ.restore();
      }
      if (Fu.text) {
        Fg(FZ, FD, Fu.text);
      }
      FP(FZ, FD, Fu, Ft);
    },
    gifFrame: Fa,
    encodeGif: async function (FZ, FD, Fu, Ft) {
      const Ff = F0.gifenc;
      if (!Ff) {
        throw new Error("GIF encoder missing");
      }
      const b0 = FZ.w;
      const b1 = FZ.h;
      const b2 = FD.fps || 15;
      const b3 = Math.max(2, Math.round((FD.seconds || 3) * b2));
      const b4 = Math.round(1000 / b2);
      const b5 = FF(b0, b1).getContext("2d", {
        willReadFrequently: true
      });
      const b6 = Ff.GIFEncoder();
      const b7 = !!FD.transparent;
      for (let b8 = 0; b8 < b3; b8++) {
        b5.clearRect(0, 0, b0, b1);
        Fa(b5, FZ, b8 / b3, Ft);
        const b9 = b5.getImageData(0, 0, b0, b1).data;
        let bF;
        let bb;
        if (b7) {
          bF = Ff.quantize(b9, 255, {
            format: "rgba4444",
            oneBitAlpha: true,
            clearAlpha: true,
            clearAlphaThreshold: 100
          });
          bb = Ff.applyPalette(b9, bF, "rgba4444");
          const bw = bF.findIndex(bY => bY[3] === 0);
          b6.writeFrame(bb, b0, b1, {
            palette: bF,
            delay: b4,
            transparent: bw >= 0,
            transparentIndex: Math.max(0, bw),
            dispose: 2
          });
        } else {
          bF = Ff.quantize(b9, 256, {
            format: "rgb565"
          });
          bb = Ff.applyPalette(b9, bF, "rgb565");
          b6.writeFrame(bb, b0, b1, {
            palette: bF,
            delay: b4
          });
        }
        if (Fu) {
          Fu((b8 + 1) / b3);
        }
        if (b8 % 3 == 2) {
          await new Promise(bY => setTimeout(bY, 0));
        }
      }
      b6.finish();
      return new Blob([b6.bytes()], {
        type: "image/gif"
      });
    },
    background: FH,
    faceCanvas: FX,
    hasAlpha: function (FZ) {
      try {
        const FD = FF(64, 64).getContext("2d");
        FD.drawImage(FZ, 0, 0, 64, 64);
        const Fu = FD.getImageData(0, 0, 64, 64).data;
        let Ft = 0;
        for (let Ff = 3; Ff < Fu.length; Ff += 4) {
          if (Fu[Ff] < 200) {
            Ft++;
          }
        }
        return Ft > 245.76;
      } catch (b0) {
        return false;
      }
    },
    mk: FF,
    COLORS: F8,
    POSES: FW,
    PROPS: FO,
    star4: Fd,
    heart: FS,
    house: FA,
    key: Fr
  };
})(typeof window != "undefined" ? window : globalThis);
