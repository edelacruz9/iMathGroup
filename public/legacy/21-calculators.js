/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (v) {
  const R = (y, G, M) => Math.max(G, Math.min(M, y));
  function F(y, G, M) {
    const h = Math.round(M * 12);
    const L = G / 100 / 12;
    if (y <= 0) {
      return 0;
    } else if (L === 0) {
      return y / h;
    } else {
      return y * L / (1 - Math.pow(1 + L, -h));
    }
  }
  function O(y) {
    if (y <= 80) {
      return 0;
    } else if (y <= 85) {
      return 0.2;
    } else if (y <= 90) {
      return 0.33;
    } else if (y <= 95) {
      return 0.46;
    } else {
      return 0.62;
    }
  }
  function u(y, G, M) {
    if (M <= 15) {
      if (y <= 726200) {
        if (G <= 90) {
          return 0.15;
        } else {
          return 0.4;
        }
      } else if (G <= 78) {
        return 0.15;
      } else if (G <= 90) {
        return 0.4;
      } else {
        return 0.65;
      }
    } else if (y <= 726200) {
      if (G > 95) {
        return 0.55;
      } else {
        return 0.5;
      }
    } else if (G > 95) {
      return 0.75;
    } else {
      return 0.7;
    }
  }
  function D(y, G) {
    if (G === false) {
      if (y >= 10) {
        return 1.25;
      } else if (y >= 5) {
        return 1.5;
      } else {
        return 3.3;
      }
    } else if (y >= 10) {
      return 1.25;
    } else if (y >= 5) {
      return 1.5;
    } else {
      return 2.15;
    }
  }
  function d(y) {
    const G = +y.price || 0;
    const L = +y.years || 30;
    const T = +y.rate || 0;
    let B = +y.downPct || 0;
    if (y.program === "fha") {
      B = Math.max(3.5, B);
    }
    if (y.program === "conv") {
      B = Math.max(3, B);
    }
    if (y.program === "invest") {
      B = Math.max(15, B);
    }
    const Q = G * B / 100;
    const X = Math.max(0, G - Q);
    let E = X;
    let W = 0;
    let j = 0;
    let q = 0;
    const z = G ? X / G * 100 : 0;
    if (y.program === "fha") {
      W = X * 0.0175;
      E = X + W;
      j = X * u(X, z, L) / 100 / 12;
    } else if (y.program === "va") {
      q = X * D(B, y.vaFirstUse) / 100;
      E = X + q;
    } else if (y.program === "conv") {
      j = X * O(z) / 100 / 12;
    }
    if (y.program === "cash") {
      E = 0;
    }
    const C = y.program === "cash" ? 0 : F(E, T, L);
    const b = (+y.taxesYr || 0) / 12;
    const N = (+y.insYr || 0) / 12;
    const U = +y.hoaMo || 0;
    const Z = (+y.floodYr || 0) / 12;
    return {
      program: y.program,
      downPct: B,
      down: Q,
      baseLoan: X,
      loan: E,
      ltv: z,
      upfront: W,
      vaFee: q,
      pi: C,
      mi: j,
      tax: b,
      ins: N,
      hoa: U,
      flood: Z,
      total: C + j + b + N + U + Z,
      rate: T,
      years: L
    };
  }
  function w(y) {
    let G = 0;
    let M = y;
    const h = [[100000, 5.75], [1000000, 5], [5000000, 2.5], [10000000, 2.25], [Infinity, 2]];
    let L = 0;
    for (const [m, T] of h) {
      if (M <= L) {
        break;
      }
      G += (Math.min(M, m) - L) / 1000 * T;
      L = m;
    }
    return Math.round(G);
  }
  function P(y) {
    const G = +y.price || 0;
    const L = +y.rent || 0;
    const T = G * (+y.downPct || 0) / 100;
    const B = G - T;
    const Q = F(B, +y.rate || 0, +y.years || 30);
    const X = (+y.taxesYr || 0) / 12;
    const E = (+y.insYr || 0) / 12;
    const W = +y.hoaMo || 0;
    const j = L * (+y.vacancyPct || 0) / 100;
    const q = L * (+y.mgmtPct || 0) / 100;
    const z = L * (+y.repairsPct || 0) / 100;
    const C = L * (+y.capexPct || 0) / 100;
    const b = X + E + W + j + q + z + C;
    const N = L - b;
    const U = N - Q;
    const Z = G * (+y.closingPct || 0) / 100;
    const V = T + Z + (+y.rehab || 0);
    const Y = Q + X + E + W;
    return {
      price: G,
      rent: L,
      loan: B,
      down: T,
      pi: Q,
      tax: X,
      ins: E,
      hoa: W,
      vac: j,
      mgmt: q,
      rep: z,
      capex: C,
      opex: b,
      noiMo: N,
      noiYr: N * 12,
      cashFlow: U,
      capRate: G ? N * 12 / G * 100 : 0,
      coc: V ? U * 12 / V * 100 : 0,
      cashIn: V,
      closing: Z,
      dscr: Y ? L / Y : 0,
      grm: L ? G / (L * 12) : 0,
      onePct: G ? L / G * 100 : 0
    };
  }
  v.iMathCalc = {
    pmt: F,
    balanceAfter: function (y, G, M, h) {
      const L = G / 100 / 12;
      const m = F(y, G, M);
      if (L === 0) {
        return y - m * h;
      } else {
        return y * Math.pow(1 + L, h) - m * (Math.pow(1 + L, h) - 1) / L;
      }
    },
    flTaxes: function (y, G, M) {
      const h = y * 0.85;
      const L = M ? Math.min(25000, h) + Math.min(25000, Math.max(0, h - 50000)) : 0;
      return Math.round(Math.max(0, h - L) * G / 1000);
    },
    pmiRate: O,
    fhaMipRate: u,
    vaFeePct: D,
    housing: d,
    buyerClosing: function (y, G, M) {
      M = M || {};
      const h = G * 0.0035;
      const L = G * 0.002;
      const m = G ? Math.max(575, G * 0.0025) : 0;
      const T = M.fixed ?? 2800;
      const B = M.prepaids || 0;
      return {
        docNote: h,
        intangible: L,
        lenderTitle: m,
        fixed: T,
        prepaids: B,
        total: h + L + m + T + B
      };
    },
    flOwnerTitle: w,
    sellerNet: function (y) {
      const G = +y.price || 0;
      const M = G * ((+y.commissionPct || 0) + (+y.buyerAgentPct || 0)) / 100;
      const h = G * (y.county === "Miami-Dade" ? 0.006 : 0.007);
      const L = y.sellerPaysTitle === false ? 0 : w(G);
      const m = +y.settlement || 595;
      const T = R((+y.closeMonth || 1) - 1 + 0.5, 0, 12);
      const B = [["Commission", M], ["Deed doc stamps", h], ["Owner's title policy", L], ["Settlement and closing fees", m], ["Property tax proration", (+y.taxesYr || 0) * T / 12], ["Mortgage payoff", +y.payoff || 0], ["Seller concessions", +y.concessions || 0], ["Repairs and credits", +y.repairs || 0], ["HOA estoppel and fees", +y.hoaFees || 0], ["Other", +y.otherCosts || 0]];
      const g = B.reduce((Q, X) => Q + X[1], 0);
      return {
        price: G,
        items: B,
        costs: g,
        net: G - g
      };
    },
    rental: P,
    breakEvenPrice: function (y) {
      let G = 0;
      let M = Math.max(1000, (+y.price || 0) * 3);
      for (let h = 0; h < 60; h++) {
        const L = (G + M) / 2;
        const m = y.taxRatePct != null ? L * y.taxRatePct / 100 : y.taxesYr;
        if (P(Object.assign({}, y, {
          price: L,
          taxesYr: m
        })).cashFlow > 0) {
          G = L;
        } else {
          M = L;
        }
      }
      return Math.round(G / 100) * 100;
    },
    flip: function (y) {
      const G = +y.price || 0;
      const M = +y.arv || 0;
      const h = +y.repairs || 0;
      const L = G * (+y.closingPct || 0) / 100;
      const m = (+y.holdMonths || 0) * (+y.holdMo || 0);
      const T = M * (+y.sellingPct || 0) / 100;
      const B = M - T - G - L - h - m;
      const g = G + L + h + m;
      return {
        arv: M,
        sell: T,
        price: G,
        buyClose: L,
        rep: h,
        hold: m,
        profit: B,
        roi: g ? B / g * 100 : 0,
        mao70: M * 0.7 - h,
        margin: M ? B / M * 100 : 0
      };
    },
    brrrr: function (y) {
      const G = (+y.price || 0) * (1 + (+y.closingPct || 0) / 100) + (+y.repairs || 0) + (+y.holdMonths || 0) * (+y.holdMo || 0);
      const M = (+y.arv || 0) * (+y.refiLtv || 75) / 100;
      const h = M * 0.02;
      return {
        allIn: G,
        refiLoan: M,
        refiCost: h,
        cashLeft: G - (M - h),
        pi: F(M, +y.rate || 0, 30)
      };
    },
    maxPrice: function (y, G) {
      let M = 0;
      let h = 5000000;
      for (let L = 0; L < 60; L++) {
        const m = (M + h) / 2;
        const T = G.taxRatePct != null ? m * G.taxRatePct / 100 : G.taxesYr;
        const B = G.insRatePct != null ? Math.max(G.insMin || 0, m * G.insRatePct / 100) : G.insYr;
        if (d(Object.assign({}, G, {
          price: m,
          taxesYr: T,
          insYr: B
        })).total > y) {
          h = m;
        } else {
          M = m;
        }
      }
      return Math.round(M / 1000) * 1000;
    },
    r2: y => Math.round(y * 100) / 100,
    clamp: R
  };
})(typeof window != "undefined" ? window : globalThis);
