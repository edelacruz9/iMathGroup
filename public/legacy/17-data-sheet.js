/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (B) {
  const V = B.iMathCreate;
  const j = {
    navy: [0, 46, 94],
    navyD: [0, 26, 54],
    green: [107, 192, 99],
    gi: [63, 143, 57],
    gray: [98, 102, 106],
    mist: [242, 245, 249],
    line: [218, 226, 235],
    ink: [26, 43, 61],
    mut: [93, 104, 115],
    pale: [201, 214, 228],
    white: [255, 255, 255],
    acc2: [75, 79, 83]
  };
  if (B.iMathTheme) {
    B.iMathTheme.register(j);
  }
  const U = 792;
  const v = 40;
  const H = D => new Promise(T => {
    if (!D) {
      return T(null);
    }
    const A = new Image();
    A.onload = () => T(A);
    A.onerror = () => T(null);
    A.src = D;
  });
  const M = new Map();
  const m = (D, T) => V.fmt(D, T);
  function F(D, T) {
    return String(D || "").replace(/\{([^}]+)\}/g, (A, C) => {
      const [x, z] = C.split("|");
      const J = V.evalExpr(x, T);
      if (z) {
        return m(J, z.trim());
      } else if (isFinite(J)) {
        return String(Math.round(J * 1000) / 1000);
      } else {
        return "";
      }
    });
  }
  function d(D, T, A) {
    return V.shown(D, T, A);
  }
  let S = 0;
  B.iMathDataSheet = {
    build: async function (J, Z, q, Q, X) {
      const {
        jsPDF: Y
      } = B.jspdf;
      const K = new Y({
        unit: "pt",
        format: "letter",
        compress: true
      });
      const G = B.__DS_FONTS || {};
      const B0 = {};
      [["M800", "M800"], ["M900", "M900"], ["O400", "O400"], ["O600", "O600"], ["O700", "O700"]].forEach(([Bn, BT]) => {
        if (G[Bn]) {
          K.addFileToVFS(BT + ".ttf", G[Bn]);
          K.addFont(BT + ".ttf", BT, "normal");
          B0[Bn] = BT;
        }
      });
      const B1 = (Bn, BT, Bh) => {
        if (B0[Bn]) {
          K.setFont(B0[Bn], "normal");
        } else {
          K.setFont("helvetica", /M|7/.test(Bn) ? "bold" : "normal");
        }
        K.setFontSize(BT);
        if (Bh) {
          K.setTextColor(...Bh);
        }
      };
      const B2 = (Bn, BT, Bh, BA) => {
        K.setCharSpace(BA && BA.cs || 0);
        K.text(String(Bn), BT, Bh, Object.assign({
          baseline: "alphabetic"
        }, BA && BA.align ? {
          align: BA.align
        } : {}));
        K.setCharSpace(0);
      };
      const B3 = Bn => String(Bn || "").toUpperCase();
      const B4 = (Bn, BT) => {
        Bn = String(Bn);
        if (K.getTextWidth(Bn) <= BT) {
          return Bn;
        }
        while (Bn.length > 3 && K.getTextWidth(Bn + "...") > BT) {
          Bn = Bn.slice(0, -1);
        }
        return Bn.replace(/[\s|]+$/, "") + "...";
      };
      const B5 = Z.accent === "gray" ? j.acc2 : j.navy;
      const B6 = V.compute(J, q);
      const B7 = Z.people || [];
      const B8 = X || J.datasheet || null;
      const B9 = await async function (Bn) {
        const BT = Bn + "|900";
        if (M.has(BT)) {
          return M.get(BT);
        }
        const Bh = await H(Bn);
        if (!Bh) {
          return null;
        }
        const BA = Bh.naturalWidth || Bh.width || 400;
        const BC = Bh.naturalHeight || Bh.height || 100;
        const Bx = document.createElement("canvas");
        Bx.width = 900;
        Bx.height = Math.round(BC * 900 / BA);
        Bx.getContext("2d").drawImage(Bh, 0, 0, Bx.width, Bx.height);
        const Bz = {
          url: Bx.toDataURL("image/png"),
          ar: Bx.width / Bx.height
        };
        M.set(BT, Bz);
        return Bz;
      }(Z.lock.dark);
      const BB = await Promise.all(B7.map(Bn => async function (BT, Bh, BA) {
        const BC = "face|" + (BT.photo || BT.name) + "|" + Bh + BA + (B.iMathTheme ? B.iMathTheme.name : "");
        if (M.has(BC)) {
          return M.get(BC);
        }
        const Bx = 240;
        const Bz = document.createElement("canvas");
        Bz.width = Bz.height = Bx;
        const BJ = Bz.getContext("2d");
        const Bw = Bh ? 14 : 0;
        const BW = BN => {
          BJ.beginPath();
          if (BA === "square") {
            BJ.rect(120 - BN, 120 - BN, BN * 2, BN * 2);
          } else if (BA === "rounded") {
            const Bp = BN * 0.36;
            if (BJ.roundRect) {
              BJ.roundRect(120 - BN, 120 - BN, BN * 2, BN * 2, Bp);
            } else {
              BJ.rect(120 - BN, 120 - BN, BN * 2, BN * 2);
            }
          } else {
            BJ.arc(120, 120, BN, 0, Math.PI * 2);
          }
        };
        if (Bh) {
          BW(120);
          BJ.fillStyle = "#6bc063";
          BJ.fill();
          BW(115);
          BJ.fillStyle = "#ffffff";
          BJ.fill();
        }
        BW(120 - Bw);
        BJ.save();
        BJ.clip();
        BJ.fillStyle = BT.kind === "lo" ? "#62666a" : "#002e5e";
        BJ.fillRect(0, 0, Bx, Bx);
        const BI = await H(BT.photo);
        if (BI && BT.show !== false) {
          const BN = BI.naturalWidth;
          const Bp = BI.naturalHeight;
          const Bk = Math.max(Bx / BN, Bx / Bp);
          BJ.drawImage(BI, (Bx - BN * Bk) / 2, (Bx - Bp * Bk) / 2, BN * Bk, Bp * Bk);
        } else {
          BJ.fillStyle = "#fff";
          BJ.font = "900 86px Montserrat, Arial";
          BJ.textAlign = "center";
          BJ.textBaseline = "middle";
          BJ.fillText(String(BT.name || "iM").split(/\s+/).map(BR => BR[0]).slice(0, 2).join("").toUpperCase(), 120, 124);
        }
        BJ.restore();
        const BZ = Bz.toDataURL("image/png");
        M.set(BC, BZ);
        return BZ;
      }(Bn, Z.ph && Z.ph.ring !== false, Z.ph && Z.ph.shape || "circle")));
      const BV = String(Z.fineText || "").replace(/\s+/g, " ").trim();
      B1("O400", 6.6);
      const Bj = K.splitTextToSize(BV, 532);
      const Bs = 58 + Bj.length * 8.2 + 14;
      let BU = 1;
      let Bv = 0;
      function BH() {
        K.setFillColor(...B5);
        K.rect(0, 0, 612, 112, "F");
        K.setFillColor(...j.green);
        K.lines([[8, 0], [-34, 112], [-8, 0]], 570, 0, [1, 1], "F", true);
        if (B9) {
          const Bh = 30;
          K.addImage(B9.url, "PNG", v, 24, Bh * B9.ar, Bh);
        }
        B1("M800", 7.5, j.green);
        B2(B3(B8 && B8.eyebrow || J.category || "Your numbers"), v, 76, {
          cs: 1.4
        });
        B1("M900", 21, j.white);
        const Bn = K.splitTextToSize(B8 && B8.title || J.name || "Data sheet", 360);
        B2(Bn[0], v, 98);
        B1("O400", 8.5, j.pale);
        const BT = new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        B2(BT, 520, 30, {
          align: "right"
        });
        if (Q) {
          B1("O600", 9, j.white);
          B2("Prepared for " + Q, 520, 44, {
            align: "right"
          });
        }
        B1("M800", 7, j.pale);
        B2("CLIENT DATA SHEET", 520, 98, {
          align: "right",
          cs: 1.2
        });
        Bv = 132;
      }
      function BM() {
        const Bn = U - Bs;
        K.setDrawColor(...j.line);
        K.setLineWidth(0.8);
        K.line(v, Bn, 572, Bn);
        const BT = 532 / Math.max(1, B7.length);
        B7.forEach((Bh, BA) => {
          const BC = v + BA * BT;
          let Bx = BC;
          if (Bh.show !== false && BB[BA]) {
            K.addImage(BB[BA], "PNG", BC, Bn + 9, 30, 30);
            Bx = BC + 30 + 8;
          }
          const Bz = BC + BT - Bx - 12;
          B1("M800", 6.2, j.gi);
          B2(B3(Bh.label), Bx, Bn + 15, {
            cs: 0.8
          });
          B1("M800", 9.5, B5);
          B2(B4(Bh.name || "", Bz), Bx, Bn + 26);
          B1("O400", 7.2, j.mut);
          B2(B4(Bh.title || "", Bz), Bx, Bn + 35.5);
          B2(B4(Bh.lines.slice(0, 2).filter(Boolean).join("  |  "), Bz), Bx, Bn + 44);
        });
        B1("O400", 6.6, j.mut);
        Bj.forEach((Bh, BA) => B2(Bh, v, Bn + 62 + BA * 8.2));
        B1("M800", 7, j.mut);
        B2(String(BU), 572, 778, {
          align: "right"
        });
      }
      function Bm() {
        BM();
        K.addPage("letter", "portrait");
        BU++;
        BH();
      }
      const BF = Bn => {
        if (Bv + Bn > U - Bs - 10) {
          Bm();
        }
      };
      function Bd(Bn, BT) {
        BF(40);
        K.setFillColor(...j.green);
        K.rect(v, Bv - 10, 4, 14, "F");
        B1("M900", 13, B5);
        B2(Bn, 51, Bv + 1);
        if (BT) {
          B1("O400", 8.5, j.mut);
          K.getTextWidth(Bn);
          B1("M900", 13);
          const Bh = K.getTextWidth(Bn);
          B1("O400", 8.5, j.mut);
          const BA = K.splitTextToSize(BT, 532 - Bh - 26);
          B2(BA[0], 51 + Bh + 12, Bv + 0.5);
        }
        Bv += 14;
      }
      function BS(Bn, BT) {
        if (!Bn.length) {
          return;
        }
        const Bh = Math.min(4, Bn.length);
        const BA = Math.ceil(Bn.length / Bh);
        const BC = 508 / Bh;
        const Bx = 18 + BA * 30;
        BF(Bx + 10);
        K.setFillColor(...j.mist);
        K.roundedRect(v, Bv, 532, Bx, 6, 6, "F");
        B1("M800", 7, j.gi);
        B2(B3(BT || "Your numbers"), 52, Bv + 14, {
          cs: 1.2
        });
        Bn.forEach((Bz, BJ) => {
          const Bw = 52 + BJ % Bh * BC;
          const BW = Bv + 30 + Math.floor(BJ / Bh) * 30;
          B1("O400", 7.6, j.mut);
          B2(Bz[0], Bw, BW);
          B1("M800", 12, B5);
          B2(Bz[1], Bw, BW + 14);
        });
        Bv += Bx + 18;
      }
      function BD(Bn, BT, Bh) {
        const BA = (Bh = Bh || {}).small ? 12.5 : 15;
        const BC = Bn.map(Bp => Bp.w);
        const Bx = 532 / BC.reduce((Bp, Bk) => Bp + Bk, 0);
        const Bz = [];
        let BJ = v;
        BC.forEach(Bp => {
          Bz.push(BJ);
          BJ += Bp * Bx;
        });
        BF(17 + BA * Math.min(BT.length, 3) + (Bh.total ? 20 : 0));
        const Bw = Bh.small ? 7.2 : 8.6;
        B1("M800", Bh.small ? 5.8 : 6.8);
        const BW = Bn.map((Bp, Bk) => K.splitTextToSize(B3(Bp.label), BC[Bk] * Bx - 9).slice(0, 2));
        const BI = BW.some(Bp => Bp.length > 1);
        const BZ = BI ? 24 : 17;
        const BN = () => {
          K.setFillColor(...B5);
          K.rect(v, Bv, 532, BZ, "F");
          B1("M800", Bh.small ? 5.8 : 6.8, j.white);
          BW.forEach((Bp, Bk) => {
            const BR = Bk > 0;
            Bp.forEach((Bu, Bt) => B2(Bu, BR ? Bz[Bk] + BC[Bk] * Bx - 5 : Bz[Bk] + 6, Bv + (BI ? Bp.length > 1 ? 9.5 + Bt * 7.5 : 13.5 : 11.3), {
              align: BR ? "right" : undefined,
              cs: Bh.small ? 0.1 : 0.7
            }));
          });
          Bv += BZ;
        };
        BN();
        BT.forEach((Bp, Bk) => {
          if (Bv + BA > U - Bs - 10) {
            Bm();
            BN();
          }
          if (Bk % 2) {
            K.setFillColor(...j.mist);
            K.rect(v, Bv, 532, BA, "F");
          }
          Bp.forEach((BR, Bu) => {
            const Bt = Bu > 0;
            B1(Bt ? "O600" : "O400", Bw, j.ink);
            B2(BR, Bt ? Bz[Bu] + BC[Bu] * Bx - (Bh.small ? 5 : 7) : Bz[Bu] + (Bh.small ? 6 : 7), Bv + 10.6, {
              align: Bt ? "right" : undefined
            });
          });
          Bv += BA;
        });
        K.setDrawColor(...j.line);
        K.setLineWidth(0.6);
        K.line(v, Bv, 572, Bv);
        if (Bh.total) {
          BF(22);
          K.setFillColor(232, 245, 230);
          K.rect(v, Bv, 532, 20, "F");
          K.setFillColor(...j.green);
          K.rect(v, Bv, 3, 20, "F");
          B1("M800", 8.6, j.gi);
          B2(Bh.total[0], 50, Bv + 13.4);
          B1("M900", 11.5, B5);
          B2(Bh.total[1], 565, Bv + 13.8, {
            align: "right"
          });
          Bv += 20;
        }
        Bv += 16;
      }
      BH();
      if (B8 && B8.sections) {
        (function (Bn) {
          const BT = B6.scope;
          const Bh = BA => BA.input ? d((J.inputs || []).find(BC => BC.id === BA.input) || {}, q, BT) : m(V.evalExpr(BA.expr, BT), BA.format);
          Bn.forEach(BA => {
            if (BA.when == null || V.evalExpr(String(BA.when), BT)) {
              if (BA.type === "summary") {
                BS(BA.items.map(BC => [BC.label, Bh(BC)]), BA.label);
              } else if (BA.type === "lead") {
                B1("O400", 8.8, j.ink);
                const BC = K.splitTextToSize(F(BA.text, BT), 532);
                BF(BC.length * 11);
                BC.forEach((Bx, Bz) => B2(Bx, v, Bv + Bz * 11));
                Bv += BC.length * 11 + 12;
              } else if (BA.type === "tiles") {
                const Bx = BA.items;
                const Bz = Math.min(4, Bx.length);
                const BJ = (532 - (Bz - 1) * 10) / Bz;
                const Bw = Math.ceil(Bx.length / Bz);
                BF(Bw * 64);
                Bx.forEach((BW, BI) => {
                  const BZ = v + BI % Bz * (BJ + 10);
                  const BN = Bv + Math.floor(BI / Bz) * 64;
                  K.setFillColor(...j.mist);
                  K.roundedRect(BZ, BN, BJ, 54, 5, 5, "F");
                  K.setFillColor(...j.green);
                  K.rect(BZ, BN, BJ, 3.5, "F");
                  B1("M800", 6.6, j.mut);
                  K.splitTextToSize(B3(BW.label), BJ - 20).slice(0, 2).forEach((Bk, BR) => B2(Bk, BZ + 10, BN + 15 + BR * 8, {
                    cs: 0.5
                  }));
                  const Bp = Bh(BW);
                  B1("M900", String(Bp).length > 16 ? 9.5 : 15, B5);
                  K.splitTextToSize(String(Bp), BJ - 20).slice(0, 2).forEach((Bk, BR) => B2(Bk, BZ + 10, BN + (String(Bp).length > 16 ? 38 : 44) + BR * 10));
                });
                Bv += Bw * 64 + 8;
              } else if (BA.type === "cards") {
                if (BA.title) {
                  Bd(BA.title, BA.sub);
                }
                (function (BW) {
                  const BI = BW.length;
                  const BZ = (532 - (BI - 1) * 12) / BI;
                  const BN = 26 + Math.max(...BW.map(Bp => Bp.items.length)) * 15 + 8;
                  BF(BN + 12);
                  BW.forEach((Bp, Bk) => {
                    const BR = v + Bk * (BZ + 12);
                    K.setFillColor(...j.mist);
                    K.roundedRect(BR, Bv, BZ, BN, 5, 5, "F");
                    K.setFillColor(...(Bk ? j.green : B5));
                    K.rect(BR, Bv, BZ, 3.5, "F");
                    B1("M900", 10.5, B5);
                    B2(Bp.label, BR + 10, Bv + 19);
                    Bp.items.forEach((Bu, Bt) => {
                      const By = Bv + 36 + Bt * 15;
                      B1("O400", 8.2, j.mut);
                      B2(B4(Bu.label, BZ * 0.55), BR + 10, By);
                      B1("O700", 8.8, j.ink);
                      B2(B4(Bu.value, BZ * 0.45 - 16), BR + BZ - 10, By, {
                        align: "right"
                      });
                    });
                  });
                  Bv += BN + 16;
                })(BA.groups.map(BW => ({
                  label: BW.label,
                  items: BW.items.map(BI => ({
                    label: BI.label,
                    value: Bh(BI)
                  }))
                })));
              } else if (BA.type === "table") {
                const BW = (B6.tables || [])[BA.table];
                if (!BW || !BW.rows.length) {
                  return;
                }
                if (Bv > U - Bs - 120) {
                  Bm();
                }
                Bd(BA.title || BW.t.title || "Details", BA.sub);
                const BI = (BW.t.columns || []).map((BZ, BN) => ({
                  label: BZ.label,
                  w: BZ.w || (BN ? 1.1 : 1.3)
                }));
                BD(BI, BW.rows.slice(0, BA.maxRows || 600).map(BZ => BZ.map((BN, Bp) => {
                  const Bk = BW.t.columns[Bp];
                  if (Bk.labels) {
                    return Bk.labels[String(BN)] || String(BN);
                  } else {
                    return m(BN, Bk.format);
                  }
                })), {
                  small: BI.length > 6
                });
              } else if (BA.type === "page") {
                Bm();
              }
            }
          });
        })(B8.sections);
      } else if (B8 && B8.compare) {
        const Bn = B6.scope;
        const BT = (J.inputs || []).find(Bh => Bh.id === B8.compare.input);
        BS((B8.summary || []).map(Bh => [Bh.label, Bh.input ? d((J.inputs || []).find(BA => BA.id === Bh.input) || {}, q, Bn) : m(V.evalExpr(Bh.expr, Bn), Bh.format)]), B8.summaryLabel || "Your loan");
        if (B8.lead) {
          B1("O400", 8.8, j.ink);
          const Bh = K.splitTextToSize(F(B8.lead, Bn), 532);
          BF(Bh.length * 11);
          Bh.forEach((BA, BC) => B2(BA, v, Bv + BC * 11));
          Bv += Bh.length * 11 + 12;
        }
        (B8.compare.order || (BT && BT.options || []).map(BA => BA.value)).map(BA => (BT.options || []).find(BC => String(BC.value) === String(BA))).filter(Boolean).forEach(BA => {
          const BC = Object.assign({}, q || {});
          BC[BT.id] = BA.value;
          const Bx = V.compute(J, BC).scope;
          const Bz = B8.columns;
          const BJ = (B8.rows || []).filter(BW => BW.when == null || V.evalExpr(String(BW.when), Bx)).map(BW => [F(BW.label, Bx)].concat(BW.cells.map((BI, BZ) => BI.text != null ? F(BI.text, Bx) : m(V.evalExpr(BI.expr, Bx), BI.format))));
          const Bw = 57 + BJ.length * 15 + 22 + 16;
          BF(Bw);
          Bd(F(BA.title || BA.label, Bx), F(BA.desc || "", Bx));
          BD(Bz, BJ, {
            total: B8.total ? [F(B8.total.label, Bx), m(V.evalExpr(B8.total.expr, Bx), B8.total.format)] : null
          });
        });
      } else {
        const BA = B6.scope;
        BS((J.inputs || []).map(BJ => [BJ.label, d(BJ, q, BA)]), "Your numbers");
        const BC = (J.outputs || []).filter(BJ => BJ.highlight && !BJ.hidden);
        const Bx = BC.length ? BC : (J.outputs || []).filter(BJ => !BJ.hidden).slice(0, 3);
        if (Bx.length) {
          const BJ = Math.min(4, Bx.length);
          const Bw = (532 - (BJ - 1) * 10) / BJ;
          const BW = Math.ceil(Bx.length / BJ);
          BF(BW * 58);
          Bx.forEach((BI, BZ) => {
            const BN = v + BZ % BJ * (Bw + 10);
            const Bp = Bv + Math.floor(BZ / BJ) * 58;
            K.setFillColor(...j.mist);
            K.roundedRect(BN, Bp, Bw, 48, 5, 5, "F");
            K.setFillColor(...j.green);
            K.rect(BN, Bp, Bw, 3.5, "F");
            B1("M800", 6.8, j.mut);
            B2(B3(K.splitTextToSize(BI.label, Bw - 20)[0]), BN + 10, Bp + 17, {
              cs: 0.7
            });
            B1("M900", 16, B5);
            B2(m(B6.out[BI.id], BI.format), BN + 10, Bp + 38);
          });
          Bv += BW * 58 + 10;
        }
        const Bz = (J.outputs || []).filter(BI => !Bx.includes(BI) && !BI.hidden);
        if (Bz.length) {
          Bd("More results");
          BD([{
            label: "Result",
            w: 3
          }, {
            label: "Amount",
            w: 1.2
          }], Bz.map(BI => [BI.label, m(B6.out[BI.id], BI.format)]));
        }
        (B6.tables || []).slice(0, 1).forEach(BI => {
          if (BI.rows.length) {
            Bd(BI.t.title || "Details");
            BD((BI.t.columns || []).map((BZ, BN) => ({
              label: BZ.label,
              w: BN ? 1.2 : 1.5
            })), BI.rows.slice(0, 30).map(BZ => BZ.map((BN, Bp) => {
              const Bk = BI.t.columns[Bp];
              if (Bk.labels) {
                return Bk.labels[String(BN)] || String(BN);
              } else {
                return m(BN, Bk.format);
              }
            })));
          }
        });
      }
      (function () {
        const BI = (J.notes || []).filter(Boolean);
        if (BI.length) {
          BF(14 + BI.length * 11);
          B1("O400", 8.2, j.mut);
          BI.forEach(BZ => {
            const BN = K.splitTextToSize(BZ, 520);
            BF(BN.length * 10.5 + 2);
            K.setFillColor(...j.green);
            K.circle(43, Bv - 2.6, 1.8, "F");
            BN.forEach((Bp, Bk) => B2(Bp, 51, Bv + Bk * 10.5));
            Bv += BN.length * 10.5 + 3;
          });
          Bv += 6;
        }
        if (J.disclaimer) {
          B1("O400", 7.4, j.mut);
          const BZ = K.splitTextToSize(J.disclaimer, 532);
          BF(BZ.length * 9.5);
          BZ.forEach((BN, Bp) => B2(BN, v, Bv + Bp * 9.5));
          Bv += BZ.length * 9.5 + 6;
        }
      })();
      BM();
      K.setProperties({
        title: (J.name || "Data sheet") + " data sheet",
        author: B7[0] && B7[0].name || "iMath Group",
        creator: "iMath Marketing Studio"
      });
      return K;
    },
    preview: async function (D, T, A) {
      const C = ++S;
      var x;
      await (x = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", B.iMathDoc && B.iMathDoc.load ? B.iMathDoc.load(x) : new Promise((I, Z) => {
        const N = document.createElement("script");
        N.src = x;
        N.onload = I;
        N.onerror = Z;
        document.head.appendChild(N);
      }));
      const z = B.pdfjsLib;
      z.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const J = D.output("arraybuffer");
      const w = await z.getDocument({
        data: J,
        isEvalSupported: false
      }).promise;
      if (C !== S) {
        return;
      }
      const W = [];
      for (let I = 1; I <= w.numPages; I++) {
        const Z = await w.getPage(I);
        const N = Z.getViewport({
          scale: 1
        });
        const p = Math.min(2, B.devicePixelRatio || 1);
        const k = A / N.width * p;
        const R = Z.getViewport({
          scale: k
        });
        const u = document.createElement("canvas");
        u.width = Math.round(R.width);
        u.height = Math.round(R.height);
        u.style.width = A + "px";
        u.className = "cr-dspage";
        await Z.render({
          canvasContext: u.getContext("2d"),
          viewport: R
        }).promise;
        W.push(u);
      }
      if (C === S) {
        T.innerHTML = "";
        W.forEach(y => T.appendChild(y));
        return w.numPages;
      } else {
        return undefined;
      }
    }
  };
})(typeof window != "undefined" ? window : globalThis);
