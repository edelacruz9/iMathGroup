/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (A) {
  const I = A.iMathDoc;
  const K = {
    xlsx: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
  };
  let C = 0;
  const q = k => k + ++C;
  function D(k, z) {
    return new Promise(O => {
      const j = new FileReader();
      j.onload = () => {
        const Y = new Image();
        Y.onload = () => {
          const H = Math.min(1, (z || 2000) / Math.max(Y.width, Y.height));
          const A0 = document.createElement("canvas");
          A0.width = Math.round(Y.width * H);
          A0.height = Math.round(Y.height * H);
          const A1 = A0.getContext("2d");
          A1.drawImage(Y, 0, 0, A0.width, A0.height);
          let A2 = false;
          try {
            const A3 = A1.getImageData(0, 0, Math.min(40, A0.width), Math.min(40, A0.height)).data;
            for (let A4 = 3; A4 < A3.length; A4 += 4) {
              if (A3[A4] < 250) {
                A2 = true;
                break;
              }
            }
          } catch (A5) {}
          O({
            src: A0.toDataURL(A2 ? "image/png" : "image/jpeg", 0.9),
            w: A0.width,
            h: A0.height,
            alpha: A2
          });
        };
        Y.onerror = () => O(null);
        Y.src = j.result;
      };
      j.onerror = () => O(null);
      j.readAsDataURL(k);
    });
  }
  function X(k) {
    return k.map(z => {
      const O = {};
      z.cells.forEach(j => (O[j.r] = O[j.r] || []).push(j.v));
      return "# " + z.name + "\n" + Object.keys(O).slice(0, 80).map(j => O[j].join(" | ")).join("\n");
    }).join("\n\n");
  }
  function G(k, z) {
    const O = String(z || "").match(/^(?:'?([^'!]+)'?!)?\$?([A-Z]{1,3})\$?(\d+)$/i);
    if (!O) {
      return;
    }
    const j = O[1] ? k.find(A0 => A0.name.toLowerCase() === O[1].toLowerCase()) : k[0];
    if (!j) {
      return;
    }
    const Y = (O[2] + O[3]).toUpperCase();
    const H = j.cells.find(A0 => A0.a === Y);
    if (H) {
      return H.v;
    } else {
      return undefined;
    }
  }
  function P(k) {
    const z = function (AK) {
      const AM = [];
      let AC = 0;
      for (AK = String(AK); AC < AK.length;) {
        const Aq = AK[AC];
        if (/\s/.test(Aq)) {
          AC++;
          continue;
        }
        const Ag = AK.slice(AC).match(/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?%?/i);
        if (Ag) {
          let Am = parseFloat(Ag[0]);
          if (Ag[0].endsWith("%")) {
            Am /= 100;
          }
          AM.push({
            k: "n",
            v: Am
          });
          AC += Ag[0].length;
          continue;
        }
        const AD = AK.slice(AC).match(/^[A-Za-z_][A-Za-z0-9_.]*/);
        if (AD) {
          AM.push({
            k: "id",
            v: AD[0]
          });
          AC += AD[0].length;
          continue;
        }
        const Ai = AK.slice(AC).match(/^(<=|>=|==|!=|<>|&&|\|\||[-+*/%^(),?:<>!=])/);
        if (!Ai) {
          throw new Error("Unexpected \"" + Aq + "\" in formula");
        }
        AM.push({
          k: "op",
          v: Ai[0] === "<>" ? "!=" : Ai[0] === "=" ? "==" : Ai[0]
        });
        AC += Ai[0].length;
      }
      return AM;
    }(k);
    let O = 0;
    const j = () => z[O];
    const Y = AK => !!z[O] && z[O].v === AK && !(O++, 0);
    const H = AK => {
      if (!Y(AK)) {
        throw new Error("Expected " + AK);
      }
    };
    const A0 = () => A1();
    const A1 = () => {
      const AK = AA();
      if (Y("?")) {
        const AM = A0();
        H(":");
        return {
          o: "?",
          c: AK,
          a: AM,
          b: A0()
        };
      }
      return AK;
    };
    const A2 = (AK, AM) => () => {
      let AC = AK();
      while (j() && j().k === "op" && AM.includes(j().v)) {
        AC = {
          o: z[O++].v,
          l: AC,
          r: AK()
        };
      }
      return AC;
    };
    const A3 = () => {
      const AK = A4();
      if (Y("^")) {
        return {
          o: "^",
          l: AK,
          r: A3()
        };
      } else {
        return AK;
      }
    };
    const A4 = () => Y("-") ? {
      o: "neg",
      a: A4()
    } : Y("+") ? A4() : Y("!") ? {
      o: "!",
      a: A4()
    } : A5();
    const A5 = () => {
      const AK = z[O++];
      if (!AK) {
        throw new Error("Formula ended early");
      }
      if (AK.k === "n") {
        return {
          o: "n",
          v: AK.v
        };
      }
      if (AK.v === "(") {
        const AM = A0();
        H(")");
        return AM;
      }
      if (AK.k === "id") {
        if (Y("(")) {
          const AC = [];
          if (!Y(")")) {
            do {
              AC.push(A0());
            } while (Y(","));
            H(")");
          }
          return {
            o: "f",
            n: AK.v.toLowerCase(),
            args: AC
          };
        }
        return {
          o: "v",
          n: AK.v
        };
      }
      throw new Error("Unexpected " + AK.v);
    };
    const A6 = A2(A3, ["*", "/", "%"]);
    const A7 = A2(A6, ["+", "-"]);
    const A8 = A2(A7, ["<", "<=", ">", ">=", "==", "!="]);
    const A9 = A2(A8, ["&&"]);
    const AA = A2(A9, ["||"]);
    const AI = A0();
    if (O < z.length) {
      throw new Error("Unexpected " + z[O].v);
    }
    return AI;
  }
  function L(k, z, O, j, Y) {
    j = j || 0;
    Y = Y || 0;
    if (!z) {
      return NaN;
    }
    if (!k) {
      return (O + j) / z;
    }
    const H = Math.pow(1 + k, z);
    return k * (O * H + j) / ((1 + k * Y) * (H - 1));
  }
  function Z(k, z, O, j) {
    if (!k) {
      return O - O / z * j;
    }
    const Y = L(k, z, O);
    return O * Math.pow(1 + k, j) - Y * (Math.pow(1 + k, j) - 1) / k;
  }
  const S = {
    pmt: L,
    fv: function (k, z, O, j, Y) {
      j = j || 0;
      Y = Y || 0;
      if (!k) {
        return -(j + O * z);
      }
      const H = Math.pow(1 + k, z);
      return -(j * H + O * (1 + k * Y) * (H - 1) / k);
    },
    pv: function (k, z, O, j, Y) {
      j = j || 0;
      Y = Y || 0;
      if (!k) {
        return -(j + O * z);
      }
      const H = Math.pow(1 + k, z);
      return -(j + O * (1 + k * Y) * (H - 1) / k) / H;
    },
    nper: function (k, z, O, j) {
      j = j || 0;
      if (k) {
        return Math.log((z - j * k) / (z + O * k)) / Math.log(1 + k);
      } else {
        return -(O + j) / z;
      }
    },
    balance: Z,
    ipmt: (k, z, O, j) => Z(k, O, j, z - 1) * k,
    ppmt: (k, z, O, j) => L(k, O, j) - Z(k, O, j, z - 1) * k,
    min: Math.min,
    max: Math.max,
    abs: Math.abs,
    sqrt: Math.sqrt,
    pow: Math.pow,
    exp: Math.exp,
    ln: Math.log,
    log: Math.log10,
    floor: Math.floor,
    ceil: Math.ceil,
    round: (k, z) => {
      const O = Math.pow(10, z || 0);
      return Math.round(k * O) / O;
    },
    roundup: (k, z) => {
      const O = Math.pow(10, z || 0);
      return Math.ceil(k * O) / O;
    },
    rounddown: (k, z) => {
      const O = Math.pow(10, z || 0);
      return Math.floor(k * O) / O;
    },
    if: (k, z, O) => k ? z : O,
    sum: (...k) => k.reduce((z, O) => z + (+O || 0), 0),
    avg: (...k) => k.length ? k.reduce((z, O) => z + (+O || 0), 0) / k.length : 0,
    clamp: (k, z, O) => Math.min(O, Math.max(z, k))
  };
  function U(k, z) {
    switch (k.o) {
      case "n":
        return k.v;
      case "v":
        {
          const O = k.n;
          if (Object.prototype.hasOwnProperty.call(z, O)) {
            return z[O];
          }
          const j = O.toLowerCase();
          if (j === "true") {
            return 1;
          } else if (j === "false") {
            return 0;
          } else if (j === "pi") {
            return Math.PI;
          } else {
            return NaN;
          }
        }
      case "neg":
        return -U(k.a, z);
      case "!":
        if (U(k.a, z)) {
          return 0;
        } else {
          return 1;
        }
      case "?":
        if (U(k.c, z)) {
          return U(k.a, z);
        } else {
          return U(k.b, z);
        }
      case "f":
        {
          if (k.n === "if") {
            if (U(k.args[0], z)) {
              return U(k.args[1], z);
            } else {
              return U(k.args[2], z);
            }
          }
          const Y = S[k.n];
          if (Y) {
            return Y(...k.args.map(H => U(H, z)));
          } else {
            return NaN;
          }
        }
      default:
        {
          const H = U(k.l, z);
          const A0 = U(k.r, z);
          switch (k.o) {
            case "+":
              return H + A0;
            case "-":
              return H - A0;
            case "*":
              return H * A0;
            case "/":
              if (A0 === 0) {
                return NaN;
              } else {
                return H / A0;
              }
            case "%":
              return H % A0;
            case "^":
              return Math.pow(H, A0);
            case "<":
              return +(H < A0);
            case "<=":
              return +(H <= A0);
            case ">":
              return +(H > A0);
            case ">=":
              return +(H >= A0);
            case "==":
              return +(Math.abs(H - A0) < 1e-9);
            case "!=":
              return +(Math.abs(H - A0) >= 1e-9);
            case "&&":
              if (H && A0) {
                return 1;
              } else {
                return 0;
              }
            case "||":
              if (H || A0) {
                return 1;
              } else {
                return 0;
              }
          }
        }
    }
    return NaN;
  }
  const B = new Map();
  const E = k => {
    if (!B.has(k)) {
      try {
        B.set(k, {
          t: P(k)
        });
      } catch (z) {
        B.set(k, {
          err: z.message
        });
      }
    }
    return B.get(k);
  };
  function F(k, z) {
    const O = E(k);
    if (O.err) {
      return NaN;
    }
    try {
      if (O.t.o === "v" && typeof z[O.t.n] == "string") {
        return z[O.t.n];
      }
      const j = U(O.t, z);
      if (typeof j == "number") {
        return j;
      } else {
        return NaN;
      }
    } catch (Y) {
      return NaN;
    }
  }
  function N(k) {
    const z = String(k || "").match(/^(\d{4})-(\d{1,2})/);
    if (z) {
      return +z[1] * 12 + (+z[2] - 1);
    }
    const O = new Date();
    return O.getFullYear() * 12 + O.getMonth() + 1;
  }
  const V = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const J = k => V[(Math.round(k) % 12 + 12) % 12] + " " + Math.floor(Math.round(k) / 12);
  function W(k) {
    k = Math.round(k);
    const z = Math.floor(k / 12);
    const O = k % 12;
    return [z ? z + (z === 1 ? " yr" : " yrs") : "", O ? O + " mo" : ""].filter(Boolean).join(" ") || "0 mo";
  }
  const Q = {};
  function T(k, z) {
    const O = {};
    (k.inputs || []).forEach(A1 => {
      let A2 = z && z[A1.id] != null ? z[A1.id] : A1.default;
      if (A1.type !== "month") {
        A2 = A1.type === "select" && isNaN(+A2) ? A2 : +A2;
        if (A1.type === "percent") {
          A2 /= 100;
        }
        if (A1.type === "amountpct") {
          const A3 = +O[A1.base] || 0;
          if ((z && z[A1.id + "__mode"] || A1.mode || "pct") === "pct") {
            O[A1.id] = A3 * A2 / 100;
            O[A1.id + "Pct"] = A2 / 100;
          } else {
            O[A1.id] = A2;
            O[A1.id + "Pct"] = A3 ? A2 / A3 : 0;
          }
          return;
        }
        O[A1.id] = A2;
      } else {
        O[A1.id] = N(A2);
      }
    });
    let j = {};
    const Y = k.model && Q[k.model];
    if (Y) {
      try {
        const A1 = Y(O) || {};
        Object.assign(O, A1.vars || {});
        j = A1.series || {};
      } catch (A2) {
        console.error(A2);
      }
    }
    const H = {};
    for (let A3 = 0; A3 < 3; A3++) {
      (k.outputs || []).forEach(A4 => {
        const A5 = F(A4.expr, O);
        O[A4.id] = A5;
        H[A4.id] = A5;
      });
    }
    const A0 = (k.tables || []).map(A4 => {
      const A5 = A4.series ? j[A4.series] || [] : null;
      const A6 = A5 ? Math.min(600, A5.length) : Math.max(0, Math.min(60, Math.round(typeof A4.rows == "number" ? A4.rows : F(String(A4.rows || "0"), O)) || 0));
      const A7 = [];
      for (let A8 = 1; A8 <= A6; A8++) {
        const A9 = Object.assign({}, O, A5 ? A5[A8 - 1] : null, {
          row: A8
        });
        const AA = (A4.columns || []).map(AI => {
          const AK = F(AI.expr, A9);
          if (AI.id) {
            A9[AI.id] = AK;
          }
          return AK;
        });
        A7.push(AA);
      }
      return {
        t: A4,
        rows: A7
      };
    });
    return {
      scope: O,
      out: H,
      tables: A0,
      series: j
    };
  }
  function R(k, z) {
    if (k == null || typeof k == "number" && !isFinite(k)) {
      return "n/a";
    }
    if (typeof k != "number") {
      return String(k);
    }
    if (z === "currency") {
      return (k < 0 ? "−$" : "$") + Math.abs(k).toLocaleString("en-US", {
        minimumFractionDigits: Math.abs(k) < 1000 && k % 1 ? 2 : 0,
        maximumFractionDigits: Math.abs(k) < 1000 && k % 1 ? 2 : 0
      });
    }
    if (z === "percent") {
      const O = Math.abs(k) <= 1.5 ? k * 100 : k;
      return O.toFixed(O % 1 ? Math.abs(O) < 10 ? 3 : 2 : 0).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "") + "%";
    }
    if (z === "months") {
      return Math.round(k) + " mo";
    } else if (z === "monthyear") {
      return J(k);
    } else if (z === "currency0") {
      return R(Math.round(k), "currency");
    } else if (z === "duration") {
      return W(k);
    } else if (z === "years") {
      return Math.round(k * 10) / 10 + " yrs";
    } else {
      return k.toLocaleString("en-US", {
        maximumFractionDigits: 2
      });
    }
  }
  Q.helocCompare = function (z) {
    const Y = +z.loan || 0;
    const H = z.start;
    const A0 = Math.max(1, Math.round((+z.fixedTerm || 30) * 12));
    const A1 = (+z.fixedRate || 0) / 12;
    const A2 = (+z.helocRate || 0) / 12;
    const A3 = Math.max(0, Math.round((+z.ioYears || 0) * 12));
    const A4 = A3 + Math.max(1, Math.round((+z.repayYears || 20) * 12));
    const A5 = +z.strategy === 1;
    const A6 = Math.max(0, +z.extra || 0);
    const A7 = Math.max(0, +z.annual || 0);
    const A8 = L(A1, A0, Y);
    const A9 = Y * (+z.fixedPts || 0);
    const AA = Y * (+z.helocPts || 0);
    const AI = AA - A9;
    const AK = Math.max(A0, A4);
    const AM = [];
    const AC = [];
    let Aq = Y;
    let Ag = Y;
    let AD = 0;
    let Ai = 0;
    let Am = 0;
    let AX = 0;
    let AG = 0;
    let AP = null;
    for (let Af = 1; Af <= AK; Af++) {
      let Ar = {
        pay: 0,
        prin: 0,
        int: 0,
        bal: 0
      };
      if (Aq > 0.005) {
        const At = Aq * A1;
        const An = Math.min(A8, Aq + At);
        Ar = {
          pay: An,
          prin: An - At,
          int: At,
          bal: Math.max(0, Aq - (An - At))
        };
        Aq = Ar.bal;
        if (Aq <= 0.005) {
          Am = Af;
        }
      }
      AD += Ar.int;
      Ar.cum = AD;
      AM.push(Ar);
      let AB = {
        pay: 0,
        prin: 0,
        int: 0,
        bal: 0,
        min: 0
      };
      if (Ag > 0.005 && Af <= A4) {
        const Ab = Ag * A2;
        const Ap = Af <= A3 ? Ab : AP == null ? AP = L(A2, A4 - Af + 1, Ag) : AP;
        let AE = (A5 ? Math.max(A8, Ap) : Ap) + A6 + (Af % 12 == 0 ? A7 : 0);
        AE = Math.min(AE, Ag + Ab);
        AB = {
          pay: AE,
          prin: AE - Ab,
          int: Ab,
          bal: Math.max(0, Ag - (AE - Ab)),
          min: Ap
        };
        Ag = AB.bal;
        if (Af === 1) {
          AG = AE;
        }
        if (Ag <= 0.005) {
          AX = Af;
        }
      }
      Ai += AB.int;
      AB.cum = Ai;
      AC.push(AB);
    }
    Am ||= A0;
    AX ||= A4;
    const AL = (AF, As) => AF[Math.min(AF.length, As) - 1].cum;
    const AZ = Math.min(120, AK);
    const Ad = AL(AM, AZ) - AL(AC, AZ);
    let Ah = "No point difference";
    if (Math.abs(AI) >= 0.5) {
      Ah = "Not within the loan term";
      for (let AF = 1; AF <= AK; AF++) {
        if ((AI > 0 ? AM[AF - 1].cum - AC[AF - 1].cum : AC[AF - 1].cum - AM[AF - 1].cum) >= Math.abs(AI)) {
          Ah = (AI > 0 ? "HELOC recoups in " : "Fixed recoups in ") + W(AF) + " (" + J(H + AF - 1) + ")";
          break;
        }
      }
    }
    const AS = AM.map((As, AN) => {
      const AV = AC[AN];
      return {
        label: J(H + AN),
        m: AN + 1,
        fPay: As.pay,
        fPrin: As.prin,
        fInt: As.int,
        fBal: As.bal,
        hPay: AV.pay,
        hPrin: AV.prin,
        hInt: AV.int,
        hBal: AV.bal
      };
    }).filter(As => As.fPay > 0 || As.hPay > 0);
    const Ae = [];
    for (let As = 0; As * 12 < AK; As++) {
      const AN = AS.filter(AW => AW.m > As * 12 && AW.m <= As * 12 + 12);
      if (!AN.length) {
        break;
      }
      const AV = AW => AN.reduce((AQ, AT) => AQ + AT[AW], 0);
      const AJ = AN[AN.length - 1];
      Ae.push({
        label: "Year " + (As + 1),
        yr: As + 1,
        fPay: AV("fPay"),
        fPrin: AV("fPrin"),
        fInt: AV("fInt"),
        fBal: AM[Math.min(AM.length, As * 12 + 12) - 1].bal,
        hPay: AV("hPay"),
        hPrin: AV("hPrin"),
        hInt: AV("hInt"),
        hBal: AC[Math.min(AC.length, As * 12 + 12) - 1].bal
      });
      if (AJ.fBal <= 0.005 && AJ.hBal <= 0.005) {
        break;
      }
    }
    const AU = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 35, 40].filter(AW => AW * 12 <= AK).map(AW => {
      const AQ = AL(AM, AW * 12);
      const AT = AL(AC, AW * 12);
      return {
        label: "Year " + AW,
        yr: AW,
        fCum: AQ,
        hCum: AT,
        diff: AQ - AT,
        net: AQ - AT - AI
      };
    });
    return {
      vars: {
        fixedPI: A8,
        fixedPtsCost: A9,
        helocPtsCost: AA,
        ptsDiff: AI,
        fixedInt: AD,
        helocInt: Ai,
        fixedPayoff: H + Am - 1,
        helocPayoff: H + AX - 1,
        fixedMonths: Am,
        helocMonths: AX,
        helocIOMin: Y * A2,
        helocFirst: AG,
        helocRepay: AP || 0,
        diff10: Ad,
        net10: Ad - AI,
        recoup: Ah,
        totalDiff: AD - Ai,
        years10: AZ / 12
      },
      series: {
        monthly: AS,
        annual: Ae,
        milestones: AU
      }
    };
  };
  A.iMathCreate = {
    shown: function (k, z, O) {
      const j = z && z[k.id] != null ? z[k.id] : k.default;
      if (k.type === "select") {
        const Y = (k.options || []).find(H => String(H.value) === String(j));
        if (Y) {
          return Y.label;
        } else {
          return String(j);
        }
      }
      if (k.type === "month") {
        return J(N(j));
      }
      if (k.type === "amountpct") {
        const H = O || T({
          inputs: []
        }, {}).scope;
        const A0 = H[k.id];
        const A1 = H[k.id + "Pct"];
        if (isFinite(A0)) {
          return R(A0, "currency") + " (" + Math.round((A1 || 0) * 10000) / 100 + "%)";
        } else {
          return String(j);
        }
      }
      if (k.type === "currency") {
        return R(+j, "currency");
      } else if (k.type === "percent") {
        return +j + "%";
      } else if (k.type === "years") {
        return j + " years";
      } else {
        return R(+j);
      }
    },
    MODELS: Q,
    monthSerial: N,
    monthName: J,
    readFile: async function (k, z) {
      const O = k.name || "file";
      const j = (O.split(".").pop() || "").toLowerCase();
      const Y = {
        id: q("f"),
        name: O,
        ext: j,
        size: k.size,
        images: []
      };
      if (/^image\//.test(k.type) || /^(png|jpe?g|gif|webp|bmp)$/.test(j)) {
        const A2 = await D(k, 2400);
        if (!A2) {
          throw new Error(O + " could not be read as an image.");
        }
        return Object.assign(Y, {
          kind: "image",
          text: "",
          images: [Object.assign({
            id: q("img"),
            from: O
          }, A2)]
        });
      }
      if (/^(heic|heif)$/.test(j)) {
        throw new Error(O + " is an iPhone HEIC photo. Export it as JPG first (Share, Save as JPEG), then add it.");
      }
      if (/^(xlsx|xlsm|xls|csv|ods|numbers)$/.test(j)) {
        if (j === "numbers") {
          throw new Error("Numbers files cannot be read here. Export it to Excel (.xlsx) first.");
        }
        if (z) {
          z("Reading " + O);
        }
        const A3 = await async function (A4) {
          await I.load(K.xlsx);
          const A5 = A.XLSX;
          const A6 = A5.read(A4, {
            type: "array",
            cellFormula: true,
            cellNF: true,
            cellDates: true
          });
          const A7 = [];
          A6.SheetNames.slice(0, 6).forEach(A8 => {
            const A9 = A6.Sheets[A8];
            if (!A9 || !A9["!ref"]) {
              return;
            }
            const AA = A5.utils.decode_range(A9["!ref"]);
            const AI = [];
            for (let AK = AA.s.r; AK <= Math.min(AA.e.r, AA.s.r + 150); AK++) {
              for (let AM = AA.s.c; AM <= Math.min(AA.e.c, AA.s.c + 30); AM++) {
                const AC = A5.utils.encode_cell({
                  r: AK,
                  c: AM
                });
                const Aq = A9[AC];
                if (Aq && (Aq.v !== "" || Aq.f)) {
                  AI.push({
                    a: AC,
                    r: AK,
                    c: AM,
                    v: Aq.v instanceof Date ? Aq.v.toISOString().slice(0, 10) : Aq.v,
                    f: Aq.f || null,
                    t: Aq.t,
                    z: Aq.z || null
                  });
                }
              }
            }
            A7.push({
              name: A8,
              cells: AI
            });
          });
          return A7;
        }(await k.arrayBuffer());
        return Object.assign(Y, {
          kind: "sheet",
          sheets: A3,
          text: X(A3)
        });
      }
      if (j === "pptx") {
        if (z) {
          z("Reading " + O);
        }
        const A4 = await async function (A5) {
          const A6 = await A.JSZip.loadAsync(A5);
          const A7 = Object.keys(A6.files).filter(AI => /^ppt\/slides\/slide\d+\.xml$/.test(AI)).sort((AI, AK) => +AI.match(/\d+/)[0] - +AK.match(/\d+/)[0]);
          const A8 = [];
          const A9 = [];
          for (const AI of A7) {
            const AK = [...(await A6.file(AI).async("string")).matchAll(/<a:p>([\s\S]*?)<\/a:p>/g)].map(Ag => [...Ag[1].matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map(AD => AD[1]).join("")).map(Ag => Ag.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'").trim()).filter(Boolean);
            const AM = +AI.match(/\d+/)[0];
            const AC = A6.file("ppt/notesSlides/notesSlide" + AM + ".xml");
            let Aq = "";
            if (AC) {
              Aq = [...(await AC.async("string")).matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map(Ag => Ag[1]).join(" ").replace(/\s+/g, " ").trim();
            }
            A8.push({
              n: AM,
              title: AK[0] || "",
              lines: AK.slice(1),
              notes: Aq
            });
          }
          const AA = Object.keys(A6.files).filter(Ag => /^ppt\/media\/.+\.(png|jpe?g|gif|webp)$/i.test(Ag)).slice(0, 12);
          for (const Ag of AA) {
            const AD = await A6.file(Ag).async("blob");
            const Ai = await D(AD, 1600);
            if (Ai && Ai.w > 120 && Ai.h > 120) {
              A9.push(Object.assign({
                id: q("img"),
                from: Ag.split("/").pop()
              }, Ai));
            }
          }
          return {
            slides: A8,
            images: A9
          };
        }(await k.arrayBuffer());
        return Object.assign(Y, {
          kind: "slides",
          pptx: A4.slides,
          images: A4.images,
          text: A4.slides.map(A5 => "## Slide " + A5.n + ": " + A5.title + "\n" + A5.lines.map(A6 => "- " + A6).join("\n") + (A5.notes ? "\nNotes: " + A5.notes : "")).join("\n\n")
        });
      }
      if (j === "ppt" || j === "key") {
        throw new Error(O + ": save it as PowerPoint (.pptx) or PDF first.");
      }
      const H = await I.parseFile(k, z);
      const A0 = H.blocks.map(A5 => A5.t === "ul" || A5.t === "ol" ? A5.items.map(A6 => "- " + I.textOf(A6)).join("\n") : A5.t === "table" ? A5.rows.map(A6 => A6.map(A7 => I.textOf(A7)).join(" | ")).join("\n") : A5.t === "img" ? "" : (/^h\d$/.test(A5.t) ? "#".repeat(+A5.t[1]) + " " : "") + I.textOf(A5.html || "")).filter(Boolean).join("\n");
      const A1 = [];
      for (const A5 of H.blocks.filter(A6 => A6.t === "img").slice(0, 8)) {
        const A6 = new Image();
        await new Promise(A7 => {
          A6.onload = A7;
          A6.onerror = A7;
          A6.src = A5.src;
        });
        A1.push({
          id: q("img"),
          src: A5.src,
          w: A6.naturalWidth,
          h: A6.naturalHeight,
          from: O
        });
      }
      return Object.assign(Y, {
        kind: "doc",
        title: H.title,
        blocks: H.blocks,
        text: A0,
        images: A1
      });
    },
    sheetMap: function (k, z) {
      const O = [];
      let j = 0;
      k.forEach(Y => {
        const H = {};
        Y.cells.forEach(A0 => H[A0.r + "," + A0.c] = A0);
        O.push("SHEET \"" + Y.name + "\"");
        Y.cells.forEach(A0 => {
          if (j > (z || 450)) {
            return;
          }
          const A1 = H[A0.r + "," + (A0.c - 1)];
          const A2 = H[A0.r - 1 + "," + A0.c];
          const A3 = typeof A0.v == "string" ? "" : [A1, A2].find(A5 => A5 && typeof A5.v == "string");
          const A4 = A0.z && /%/.test(A0.z) ? " (percent format)" : A0.z && /\$/.test(A0.z) ? " (currency format)" : "";
          O.push(A0.a + ": " + (typeof A0.v == "string" ? JSON.stringify(A0.v) : A0.v) + (A0.f ? "  formula =" + A0.f : "") + (A3 ? "  label: " + JSON.stringify(A3.v) : "") + A4);
          j++;
        });
      });
      return O.join("\n");
    },
    sheetValue: G,
    parse: P,
    evalExpr: F,
    compute: T,
    validate: function (k) {
      const z = [];
      const O = new Set();
      (k.inputs || []).forEach(j => {
        if (!/^[A-Za-z_]\w*$/.test(j.id || "")) {
          z.push("Bad input id " + j.id);
        }
        O.add(j.id);
      });
      (k.outputs || []).forEach(j => {
        if (!/^[A-Za-z_]\w*$/.test(j.id || "")) {
          z.push("Bad result id " + j.id);
        }
        const Y = E(String(j.expr || ""));
        if (Y.err) {
          z.push((j.label || j.id) + ": " + Y.err);
        }
        O.add(j.id);
      });
      (k.tables || []).forEach(j => (j.columns || []).forEach(Y => {
        const H = E(String(Y.expr || ""));
        if (H.err) {
          z.push((j.title || "Table") + " / " + Y.label + ": " + H.err);
        }
      }));
      return z;
    },
    verify: function (k, z) {
      if (!z || !z.length) {
        return null;
      }
      const O = {};
      (k.inputs || []).forEach(H => {
        if (H.cell) {
          const A0 = G(z, H.cell);
          if (typeof A0 == "number") {
            O[H.id] = H.type === "percent" && A0 <= 1 ? A0 * 100 : A0;
          }
        }
      });
      const j = T(k, O);
      const Y = [];
      (k.outputs || []).forEach(H => {
        if (!H.cell) {
          return;
        }
        const A0 = G(z, H.cell);
        if (typeof A0 != "number") {
          return;
        }
        let A1 = j.out[H.id];
        let A2 = A0;
        if (H.format === "percent" && Math.abs(A2) <= 1 && Math.abs(A1) > 1) {
          A1 /= 100;
        }
        const A3 = Math.abs(A1 - A2) <= Math.max(0.01, Math.abs(A2) * 0.002) || Math.abs(Math.abs(A1) - Math.abs(A2)) <= Math.max(0.01, Math.abs(A2) * 0.002);
        Y.push({
          id: H.id,
          label: H.label,
          cell: H.cell,
          want: A2,
          got: j.out[H.id],
          ok: A3
        });
      });
      return {
        checks: Y,
        pass: Y.filter(H => H.ok).length,
        total: Y.length
      };
    },
    fmt: R,
    pmt: L,
    CDN: K,
    esc: k => String(k == null ? "" : k).replace(/[&<>"]/g, z => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;"
    })[z]),
    nid: q
  };
})(typeof window != "undefined" ? window : globalThis);
