/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (Q) {
  const X = Q.iMathCalc;
  const T0 = {
    NAVY: "#002e5e",
    GREEN: "#6bc063",
    GREEN_INK: "#3f8f39",
    MIST: "#f2f5f9"
  };
  if (typeof window != "undefined" && window.iMathTheme) {
    window.iMathTheme.register(T0);
  }
  const T1 = "#62666a";
  const T2 = "#c98a1b";
  const T3 = "#c2463b";
  const T4 = {
    get updated() {
      return ["Updated", T0.GREEN_INK];
    },
    standard: ["Average", "#2b5c8f"],
    asis: ["As-is / investor", T2],
    new: ["New build", T1]
  };
  const T5 = Tw => String(Tw == null ? "" : Tw).replace(/[&<>"]/g, Tk => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[Tk]);
  const T6 = (Tw, Tk) => Tw == null || isNaN(Tw) ? "n/a" : Math.round(Tw).toLocaleString("en-US");
  const T7 = Tw => Tw == null || isNaN(Tw) ? "n/a" : (Tw < 0 ? "−$" : "$") + Math.abs(Math.round(Tw)).toLocaleString("en-US");
  const T8 = Tw => Tw == null || isNaN(Tw) ? "n/a" : Math.abs(Tw) >= 1000000 ? "$" + (Tw / 1000000).toFixed(2).replace(/\.?0+$/, "") + "M" : "$" + Math.round(Tw / 1000) + "K";
  const T9 = (Tw, Tk) => Tw == null || isNaN(Tw) ? "n/a" : (Tw < 0 ? "−" : "") + Math.abs(+Tw).toFixed(Tk == null ? 1 : Tk) + "%";
  const TT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const Tx = Tw => {
    if (!Tw) {
      return "n/a";
    }
    const Tk = new Date(String(Tw).slice(0, 10) + "T12:00:00");
    return TT[Tk.getMonth()] + " " + Tk.getDate() + ", " + Tk.getFullYear();
  };
  const TO = Tw => {
    if (!Tw) {
      return "n/a";
    }
    const Tk = new Date(String(Tw).slice(0, 10) + "T12:00:00");
    return TT[Tk.getMonth()] + " " + Tk.getDate();
  };
  const Tm = (Tw, Tk) => (Tw == null ? "n/a" : Tw) + "/" + (Tk == null ? "n/a" : +(+Tk).toFixed(1));
  const TN = Tw => Tw == null ? "n/a" : Tw < 0.1 ? "under 0.1 mi" : Tw.toFixed(2) + " mi";
  function Tc(Tw, Tk) {
    const Ti = Tw.subject;
    const Tz = Tw.value || {};
    const TZ = /active|coming|pending|under contract/i.test(Ti.status || "") && Ti.list ? Ti.list : Tz.value || Ti.list || 0;
    const Tb = Ti.floodZone && /^(A|AE|AH|AO|V|VE)/i.test(Ti.floodZone) ? 900 : 0;
    const Tp = Math.max(1500, Math.round(TZ * 0.011 / 50) * 50);
    const TW = {
      needs: 28,
      average: 12,
      updated: 5
    }[Tw.cond] || 12;
    const TU = Tw.rent ? Tw.rent.estimate : Math.round(TZ * 0.008 / 25) * 25;
    return {
      price: TZ,
      rates: {
        conv: 7,
        fha: 6.75,
        va: 6.625,
        invest: 7.75
      },
      years: 30,
      millage: 18.5,
      homestead: true,
      insYr: Tp,
      floodYr: Tb,
      hoaMo: Math.round(Ti.hoaMonthly || 0),
      rent: TU,
      downInvest: 25,
      vacancyPct: 5,
      mgmtPct: 10,
      repairsPct: 5,
      capexPct: 5,
      closingPct: 2,
      flipPrice: Tz.investor ? Math.round((Tz.investor.high + Tz.investor.low) / 2 / 1000) * 1000 : TZ,
      repairs: Ti.sqft ? Math.round(Ti.sqft * TW / 500) * 500 : 0,
      arv: Tz.arv || TZ,
      holdMonths: 4,
      holdMo: Math.round(TZ * 0.006 / 50) * 50,
      sellingPct: 8,
      refiLtv: 75,
      listPct: 3,
      buyerPct: 2.5,
      payoff: 0,
      concessions: 0,
      sellerRepairs: 0,
      closeMonth: new Date(Tw.when).getMonth() + 2 > 12 ? 12 : new Date(Tw.when).getMonth() + 2,
      program: "fha",
      downPct: 3.5
    };
  }
  function TG(Tw, Tk, Ti) {
    const Tz = Tk ? Tw.lockupHRev : Tw.lockupH;
    if (Tz) {
      return "<img class=\"r-lock\" src=\"" + Tz + "\" alt=\"iMath Group | United Real Estate Gallery\" style=\"height:" + Ti + "px\">";
    } else {
      return "<b>iMath Group | United Real Estate Gallery</b>";
    }
  }
  const TH = (Tw, Tk, Ti, Tz) => {
    Tz = Tz || {};
    Tw.n++;
    if (!Tz.noToc && !Tw.toc.some(TZ => TZ[0] === Tk)) {
      Tw.toc.push([Tk, Tw.n]);
    }
    return "<section class=\"r-page" + (Tz.cls ? " " + Tz.cls : "") + "\" data-page=\"" + Tw.n + "\">" + (Tz.noHead ? "" : function (TZ, Tb) {
      return "<div class=\"r-head\">" + TG(TZ, false, 30) + "<span>" + T5(Tb) + "</span></div>";
    }(Tw.A, Tk)) + "<div class=\"r-body\">" + Ti + "</div>" + function (TZ, Tb, Tp) {
      const TW = TZ.profile;
      return "<div class=\"r-foot\"><div><b>" + T5(TW.agentName || "") + "</b>" + (TW.agentTitle ? ", " + T5(TW.agentTitle) : "") + (TW.phone ? " | " + T5(TW.phone) : "") + (TW.email ? " | " + T5(TW.email) : "") + "<br>United Real Estate Gallery (Rayson Partners, LLC) | FL Lic. CQ1066513 | Equal Housing Opportunity" + (Tp && TZ.lo ? "<br>Financing: " + T5(TZ.lo.name) + ", NMLS #" + T5(TZ.lo.nmls) + " | Cornerstone First Mortgage NMLS #173855 | FL MLD1510 | Equal Housing Lender" : "") + "</div><div class=\"r-pn\">" + Tb + "</div></div>";
    }(Tw, Tw.n, Tz.lo) + "</section>";
  };
  const To = Tw => "<div class=\"r-eye\">" + T5(Tw) + "</div>";
  const TB = (Tw, Tk) => "<h2 class=\"r-h2\">" + T5(Tw) + "<i>.</i></h2>";
  const Ty = (Tw, Tk, Ti, Tz) => "<div class=\"r-tile" + (Tz ? " t-" + Tz : "") + "\"><div class=\"r-tl\">" + T5(Tw) + "</div><div class=\"r-tv\">" + Tk + "</div>" + (Ti ? "<div class=\"r-ts\">" + Ti + "</div>" : "") + "</div>";
  const TF = (Tw, Tk) => "<span class=\"r-chip\" style=\"--c:" + Tk + "\">" + T5(Tw) + "</span>";
  function TK(Tw, Tk, Ti) {
    const Tz = Tw.subject;
    const TZ = Tw.value || {};
    const Tb = Tw.comps.filter(x5 => x5.use && x5.sqft && x5.price);
    if (!Tb.length) {
      return "";
    }
    const Tp = Tb.map(x5 => x5.sqft).concat(Tz.sqft ? [Tz.sqft] : []);
    const TW = Tb.map(x5 => x5.price).concat([TZ.value || 0, TZ.arv || 0, TZ.low || 0, TZ.high || 0]).filter(Boolean);
    const TU = Math.min(...Tp) * 0.95;
    const TS = Math.max(...Tp) * 1.05;
    const Tv = Math.min(...TW) * 0.88;
    const TE = Math.max(...TW) * 1.06;
    const x0 = x5 => 62 + (x5 - TU) / (TS - TU) * (Tk - 62 - 14);
    const x1 = x5 => 14 + (1 - (x5 - Tv) / (TE - Tv)) * (Ti - 14 - 38);
    let x2 = "";
    const x3 = TE - Tv > 400000 ? 100000 : TE - Tv > 150000 ? 50000 : TE - Tv > 60000 ? 20000 : 10000;
    for (let x5 = Math.ceil(Tv / x3) * x3; x5 <= TE; x5 += x3) {
      x2 += "<line x1=\"62\" x2=\"" + (Tk - 14) + "\" y1=\"" + x1(x5) + "\" y2=\"" + x1(x5) + "\" stroke=\"#e6ecf3\"/><text x=\"54\" y=\"" + (x1(x5) + 4) + "\" font-size=\"11\" text-anchor=\"end\" fill=\"#7d8b99\">" + T8(x5) + "</text>";
    }
    const x4 = TS - TU > 1500 ? 500 : TS - TU > 600 ? 200 : 100;
    for (let x6 = Math.ceil(TU / x4) * x4; x6 <= TS; x6 += x4) {
      x2 += "<text x=\"" + x0(x6) + "\" y=\"" + (Ti - 38 + 18) + "\" font-size=\"11\" text-anchor=\"middle\" fill=\"#7d8b99\">" + x6.toLocaleString() + "</text>";
    }
    x2 += "<text x=\"" + (62 + Tk) / 2 + "\" y=\"" + (Ti - 4) + "\" font-size=\"11\" text-anchor=\"middle\" fill=\"#62666a\">Living area (sq ft)</text>";
    if (TZ.low && TZ.high) {
      x2 += "<rect x=\"62\" y=\"" + x1(TZ.high) + "\" width=\"" + (Tk - 62 - 14) + "\" height=\"" + (x1(TZ.low) - x1(TZ.high)) + "\" fill=\"rgba(107,192,99,.14)\"/><text x=\"" + (Tk - 14 - 4) + "\" y=\"" + (x1(TZ.high) + 13) + "\" font-size=\"11\" text-anchor=\"end\" fill=\"" + T0.GREEN_INK + "\" font-weight=\"700\">Value range " + T8(TZ.low) + " to " + T8(TZ.high) + "</text>";
    }
    if (TZ.arv) {
      x2 += "<line x1=\"62\" x2=\"" + (Tk - 14) + "\" y1=\"" + x1(TZ.arv) + "\" y2=\"" + x1(TZ.arv) + "\" stroke=\"" + T0.NAVY + "\" stroke-dasharray=\"5 4\"/><text x=\"68\" y=\"" + (x1(TZ.arv) - 5) + "\" font-size=\"11\" fill=\"" + T0.NAVY + "\" font-weight=\"700\">After repair value " + T8(TZ.arv) + "</text>";
    }
    if (Tz.sqft) {
      x2 += "<line x1=\"" + x0(Tz.sqft) + "\" x2=\"" + x0(Tz.sqft) + "\" y1=\"14\" y2=\"" + (Ti - 38) + "\" stroke=\"" + T3 + "\" stroke-dasharray=\"3 3\"/>";
    }
    Tb.forEach(x7 => {
      x2 += "<circle cx=\"" + x0(x7.sqft) + "\" cy=\"" + x1(x7.price) + "\" r=\"6\" fill=\"" + (T4[x7.cat] || [0, T1])[1] + "\" stroke=\"#fff\" stroke-width=\"1.5\"/>";
    });
    if (TZ.value && Tz.sqft) {
      x2 += "<path d=\"M" + x0(Tz.sqft) + " " + (x1(TZ.value) - 9) + " l8 9 l-8 9 l-8 -9 z\" fill=\"" + T3 + "\" stroke=\"#fff\" stroke-width=\"2\"/>";
    }
    return "<svg viewBox=\"0 0 " + Tk + " " + Ti + "\" width=\"" + Tk + "\" height=\"" + Ti + "\" class=\"r-svg\" font-family=\"Arial, Helvetica, sans-serif\" role=\"img\" aria-label=\"Sale price versus size\">" + x2 + "</svg>";
  }
  function Tu(Tw, Tk, Ti, Tz, TZ, Tb) {
    const Tp = Tw.map(Number).filter(Tv => !isNaN(Tv));
    if (!Tp.length) {
      return "";
    }
    const TW = Math.max(...Tp) * 1.1;
    const TU = (Ti - 10) / Tp.length;
    let TS = "";
    Tp.forEach((Tv, TE) => {
      const x0 = (Tv - 0) / (TW - 0) * (Tz - 34);
      TS += "<rect x=\"" + (5 + TE * TU + 3) + "\" y=\"" + (Tz - 18 - x0) + "\" width=\"" + (TU - 6) + "\" height=\"" + x0 + "\" rx=\"2\" fill=\"" + (TE === Tp.length - 1 ? TZ : TZ + "99") + "\"/>";
      if (Tk && Tk[TE]) {
        TS += "<text x=\"" + (5 + TE * TU + TU / 2) + "\" y=\"" + (Tz - 5) + "\" font-size=\"9.5\" text-anchor=\"middle\" fill=\"#7d8b99\">" + Tk[TE] + "</text>";
      }
    });
    TS += "<text x=\"" + (Ti - 4) + "\" y=\"12\" font-size=\"11\" text-anchor=\"end\" font-weight=\"800\" fill=\"" + T0.NAVY + "\">" + Tb(Tp[Tp.length - 1]) + "</text>";
    return "<svg viewBox=\"0 0 " + Ti + " " + Tz + "\" width=\"" + Ti + "\" height=\"" + Tz + "\" class=\"r-svg\" font-family=\"Arial, Helvetica, sans-serif\">" + TS + "</svg>";
  }
  function TA(Tw, Tk) {
    const Ti = Tw.subject;
    const Tz = Tw.value || {};
    const TZ = Tk.d;
    const Tb = Tk.A;
    Tk.profile;
    const Tp = (Ti.gallery || [])[0];
    const TW = X.housing({
      price: TZ.price,
      program: "fha",
      downPct: 3.5,
      rate: TZ.rates.fha,
      years: 30,
      taxesYr: X.flTaxes(TZ.price, TZ.millage, true),
      insYr: TZ.insYr,
      hoaMo: TZ.hoaMo,
      floodYr: TZ.floodYr
    });
    const TU = {
      seller: "Comparative Market Analysis",
      buyer: "Buyer Market Report",
      investor: "Investment Property Report",
      full: "Market Value + Investment Report"
    }[Tk.type];
    const TS = Ti.inMls ? Ti.status || "" : "Off market";
    Tk.n++;
    return "<section class=\"r-page r-cover\" data-page=\"" + Tk.n + "\"><div class=\"r-cband\"><div class=\"r-cbrand\">" + TG(Tb, true, 44) + "</div><div class=\"r-ctitle\"><div class=\"r-eye g\">" + T5(TU) + "</div><div class=\"r-cdate\">Prepared " + Tx(Tw.when) + (Tk.client ? " for " + T5(Tk.client) : "") + "</div></div><svg class=\"r-cstripe\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\"><polygon points=\"70,0 100,0 100,100 40,100\" fill=\"#001a36\"/><line x1=\"66\" y1=\"0\" x2=\"36\" y2=\"100\" stroke=\"" + T0.GREEN + "\" stroke-width=\"1.6\"/></svg></div>\n      <div class=\"r-hero\">" + (Tp ? "<div class=\"r-himg\" role=\"img\" aria-label=\"Front of " + T5(Ti.addr) + "\" style=\"background-image:url('" + Tp.src + "')\"></div>" : "<div class=\"r-noimg\"></div>") + "<div class=\"r-hshade\"></div><div class=\"r-htext\"><h1>" + T5(Ti.addr) + "<i>.</i></h1><div>" + T5([Ti.city, "FL", Ti.zip].filter(Boolean).join(" ").replace(" FL", ", FL")) + (Ti.subdivision ? " | " + T5(Ti.subdivision) : "") + "</div>" + (TS ? "<span class=\"r-status\">" + T5(TS) + (Ti.inMls && Ti.id ? " | MLS " + T5(Ti.id) : "") + "</span>" : "") + "</div></div>\n      <div class=\"r-ckpis\">" + Ty("Estimated market value", Tz.value ? T8(Tz.low) + " to " + T8(Tz.high) : "n/a", Tz.value ? "Most likely " + T7(Tz.value) + " | " + Tz.confidence + " confidence" : "", "navy") + "\n        " + (Ti.list ? Ty(/closed/i.test(Ti.status) ? "Last sold" : "Asking price", T7(Ti.status === "Closed" ? Ti.close : Ti.list), Ti.sqft ? T7((Ti.status === "Closed" ? Ti.close : Ti.list) / Ti.sqft) + "/sq ft" + (Ti.origList && Ti.list < Ti.origList ? " | cut from " + T8(Ti.origList) : "") : "") : Ty("Value per sq ft", Tz.value && Ti.sqft ? T7(Tz.value / Ti.sqft) : "n/a", T6(Ti.sqft) + " sq ft of living area")) + "\n        " + (Tk.type === "seller" ? Ty("After repair value", Tz.arv ? T8(Tz.arv) : "n/a", "What a fully updated version could bring") : Ty("Market rent", Tw.rent ? T7(Tw.rent.estimate) + "/mo" : "n/a", Tw.rent ? T7(Tw.rent.low) + " to " + T7(Tw.rent.high) + " from " + Tw.rent.n + " leases" : "Not enough nearby leases")) + "\n        " + (Tk.type === "seller" ? Ty("Typical days to sell", Tw.local && Tw.local.dom != null ? Math.round(Tw.local.dom) + " days" : "n/a", Tw.local ? "Median of " + Tw.local.n + " nearby sales" : "") : Ty("Est. payment, FHA", T7(TW.total) + "/mo", "3.5% down, 30 years, " + TZ.rates.fha + "% " + (TZ.rateSource ? "FHA average" : "assumed") + ". Includes est. taxes and insurance. Not a quote.")) + "</div>\n      <div class=\"r-cfacts\">" + [Ti.beds != null ? [Ti.beds, "Beds"] : null, Ti.baths != null ? [+(+Ti.baths).toFixed(1), "Baths"] : null, Ti.sqft ? [T6(Ti.sqft), "Sq ft"] : null, Ti.year ? [Ti.year, "Built"] : null, Ti.lot ? [Ti.lot, "Acres"] : null, [Ti.garage ? Ti.garage : Ti.carport ? "Carport" : "None", "Garage"], [Ti.pool ? "Yes" : "No", "Pool"]].filter(Boolean).map(Tv => "<div><b>" + T5(Tv[0]) + "</b><span>" + Tv[1] + "</span></div>").join("") + "</div>\n      <div class=\"r-cfoot\">" + TM(Tk, true) + (Tk.lo ? Tl(Tk, true) : "") + "</div>\n      <div class=\"r-toc\"><div class=\"r-tl\">Inside this report</div><!--TOC--></div>\n      <div class=\"r-cfine\">Information from realMLS (Flexmls), deemed reliable but not guaranteed. This is a comparative market analysis, not an appraisal. United Real Estate Gallery (Rayson Partners, LLC), FL Lic. CQ1066513. iMath Group is a team at United Real Estate Gallery. Equal Housing Opportunity." + (Tk.lo ? " Mortgage services by " + T5(Tk.lo.name) + ", NMLS #" + T5(Tk.lo.nmls) + ", iMath Group powered by Cornerstone First Mortgage, NMLS #173855, FL MLD1510. Equal Housing Lender. Payment figures are estimates, not a loan offer." : "") + "</div></section>";
  }
  function TM(Tw, Tk) {
    const Ti = Tw.profile;
    const Tz = Tw.A;
    return "<div class=\"r-person" + (Tk ? " big" : "") + "\">" + (Tz.headshot ? "<div class=\"r-av\" style=\"background-image:url('" + Tz.headshot + "')\"></div>" : "<div class=\"r-ini\">" + T5((Ti.agentName || "iM").split(/\s+/).map(TZ => TZ[0]).slice(0, 2).join("")) + "</div>") + "<div><div class=\"r-pl\">Your agent</div><div class=\"r-pn2\">" + T5(Ti.agentName || "") + "</div><div class=\"r-pt\">" + T5(Ti.agentTitle || "") + (Ti.bilingual ? " | Se habla español" : "") + "</div>" + [Ti.phone, Ti.email, Ti.website].filter(Boolean).map(TZ => "<div class=\"r-pc\">" + T5(TZ) + "</div>").join("") + "</div></div>";
  }
  function Tl(Tw, Tk) {
    const Ti = Tw.lo;
    const Tz = Tw.A;
    return "<div class=\"r-person lo" + (Tk ? " big" : "") + "\">" + (Tz.loPhoto ? "<div class=\"r-av\" style=\"background-image:url('" + Tz.loPhoto + "')\"></div>" : "") + "<div><div class=\"r-pl\">Your loan officer</div><div class=\"r-pn2\">" + T5(Ti.name) + "</div><div class=\"r-pt\">" + T5(Ti.title) + " | NMLS #" + T5(Ti.nmls) + "</div>" + [Ti.phone, Ti.email].filter(Boolean).map(TZ => "<div class=\"r-pc\">" + T5(TZ) + "</div>").join("") + "</div><div class=\"r-mortrow\">" + (Tz.mortColor ? "<img class=\"r-mort\" src=\"" + Tz.mortColor + "\" alt=\"iMath Group powered by Cornerstone First Mortgage\">" : "") + "<span>iMath Group, powered by Cornerstone First Mortgage<br>NMLS #173855 | Equal Housing Lender</span></div></div>";
  }
  function TC(Tw, Tk) {
    const Ti = Tw.subject;
    const Tz = Tw.value || {};
    const TZ = function (TW) {
      const TU = TW.subject;
      const TS = TW.value || {};
      const Tv = TW.comps.filter(x3 => x3.w > 0).sort((x3, x4) => x4.w - x3.w);
      const TE = Tv[0];
      const x0 = TW.local || {};
      const x1 = {};
      if (TE) {
        x1.value = "The strongest match is <b>" + T5(TE.addr) + "</b>, " + TN(TE.dist) + " away. It is a " + Tm(TE.beds, TE.baths) + " with " + T6(TE.sqft) + " sq ft that closed " + Tx(TE.closeDate) + " at <b>" + T7(TE.close) + "</b>" + (TE.concessions ? " with " + T7(TE.concessions) + " in seller concessions" : "") + ". After adjusting " + Tv.length + " comparable sales for size, baths, age, garage and lot, they point to about <b>" + T7(TS.value) + "</b>, with most landing between " + T7(TS.low) + " and " + T7(TS.high) + ".";
      }
      const x2 = TU.list;
      if (x2 && TS.value) {
        const x3 = (x2 - TS.value) / TS.value * 100;
        x1.list = Math.abs(x3) < 2 ? "The " + T7(x2) + " asking price lines up with the market." : x3 > 0 ? "The " + T7(x2) + " asking price sits about " + T9(x3, 0) + " above our value, so expect room to negotiate or a longer time on market." : "The " + T7(x2) + " asking price sits about " + T9(-x3, 0) + " under our value, which should draw strong interest.";
      }
      if (TS.arv) {
        x1.arv = TS.arvBasis >= 2 ? "Updated resales set the ceiling. The top of that group puts the after repair value near <b>" + T7(TS.arv) + "</b>" + (TS.newBuild ? ", while new builds nearby sold " + (TS.newBuild.low === TS.newBuild.high ? "around " + T8(TS.newBuild.low) : "from " + T8(TS.newBuild.low) + " to " + T8(TS.newBuild.high)) + " with everything new" : "") + "." : "There were few updated resales nearby, so the after repair value of " + T7(TS.arv) + " is an estimate. Treat it with care.";
      }
      if (x0.n) {
        x1.market = "Nearby homes sold for a median " + T9(x0.ratio * 100, 1) + " of their final list price" + (x0.ratioO ? " and " + T9(x0.ratioO * 100, 1) + " of the original price" : "") + ", after a median " + Math.round(x0.dom || 0) + " days on market." + (x0.nCut >= 2 && x0.nAtList >= 2 ? " Homes that needed a price cut took " + Math.round(x0.domCut || 0) + " days versus " + Math.round(x0.domAtList || 0) + " for homes priced right from day one." : "") + (x0.concShare > 0.25 ? " " + T9(x0.concShare * 100, 0) + " of sellers paid concessions, a median " + T9((x0.conc || 0) * 100, 1) + " of price." : "");
      }
      return x1;
    }(Tw, Tk.d);
    const Tb = Tw.flags || [];
    const Tp = {
      High: 3,
      Moderate: 2,
      Limited: 1
    }[Tz.confidence] || 1;
    return TH(Tk, "The bottom line", "" + To("The bottom line") + TB("What this home is worth") + "\n      " + function (TW, TU) {
      if (!TW.value) {
        return "";
      }
      const TS = Math.min(TW.low, TU || TW.low) * 0.96;
      const Tv = Math.max(TW.high, TU || TW.high, TW.arv || 0) * 1.03;
      const TE = x0 => (x0 - TS) / (Tv - TS) * 100;
      return "<div class=\"r-gauge\"><div class=\"r-gbar\"><div class=\"r-grange\" style=\"left:" + TE(TW.low) + "%;width:" + (TE(TW.high) - TE(TW.low)) + "%\"></div><div class=\"r-gmark v\" style=\"left:" + TE(TW.value) + "%\"><b>" + T7(TW.value) + "</b><span>Our value</span></div>" + (TU ? "<div class=\"r-gmark l\" style=\"left:" + TE(TU) + "%\"><b>" + T7(TU) + "</b><span>List price</span></div>" : "") + (TW.arv && TW.arv > TW.value * 1.02 ? "<div class=\"r-gmark a\" style=\"left:" + TE(TW.arv) + "%\"><b>" + T7(TW.arv) + "</b><span>After repairs</span></div>" : "") + "</div><div class=\"r-gends\"><span>" + T7(TW.low) + "</span><span>" + T7(TW.high) + "</span></div></div>";
    }(Tz, Ti.list && !/closed/i.test(Ti.status || "") ? Ti.list : null) + "\n      <div class=\"r-grid3\">" + Ty("Most likely value", T7(Tz.value), T7(Tz.low) + " to " + T7(Tz.high), "navy") + Ty("After repair value", Tz.arv ? T7(Tz.arv) : "n/a", Tz.arvBasis >= 2 ? "From " + Tz.arvBasis + " updated resales" : "Estimated") + Ty(Tz.investor ? "Investor as-is range" : "New build ceiling", Tz.investor ? T8(Tz.investor.low) + " to " + T8(Tz.investor.high) : Tz.newBuild ? Tz.newBuild.low === Tz.newBuild.high ? T8(Tz.newBuild.low) : T8(Tz.newBuild.low) + " to " + T8(Tz.newBuild.high) : "n/a", Tz.investor ? Tz.investor.n + " as-is or cash sales" : Tz.newBuild ? Tz.newBuild.n + " new construction sales" : "None nearby") + "</div>\n      <div class=\"r-conf\"><span>Confidence</span>" + [1, 2, 3].map(TW => "<i class=\"" + (TW <= Tp ? "on" : "") + "\"></i>").join("") + "<b>" + T5(Tz.confidence || "") + "</b><em>" + (Tz.used || 0) + " weighted sales | median distance " + TN(Tz.medianDist) + " | typical spread " + T9((Tz.spread || 0) * 100, 0) + "</em></div>\n      <div class=\"r-prose\">" + (TZ.value ? "<p>" + TZ.value + "</p>" : "") + (TZ.list ? "<p>" + TZ.list + "</p>" : "") + (TZ.arv ? "<p>" + TZ.arv + "</p>" : "") + (TZ.market ? "<p>" + TZ.market + "</p>" : "") + "</div>\n      " + (Tb.length ? "<h3 class=\"r-h3\">Heads up</h3><div class=\"r-flags\">" + Tb.map(TW => "<div class=\"r-flag f-" + TW[0] + "\"><b>" + T5(TW[1]) + "</b><span>" + T5(TW[2]) + "</span></div>").join("") + "</div>" : ""));
  }
  const Td = {
    "Beds / baths": ["beds", "baths"],
    "Living area": "sqft",
    "Year built": "year",
    Lot: "lot",
    Garage: "garage",
    Pool: "pool",
    Stories: "stories",
    "Flood zone": "floodZone",
    HOA: "hoaRaw",
    Taxes: "taxes",
    County: "county",
    Subdivision: "subdivision",
    Parcel: "parcel"
  };
  const Tj = Tw => {
    if ((Tw = String(Tw || "")) === "Agent") {
      return "Agent";
    }
    if (/apprais|county|public|tax collector|clerk/i.test(Tw)) {
      return "Public record";
    }
    const Tk = Tw.match(/(realtor|redfin|zillow|homes|trulia|propertyreports)/i);
    if (Tk) {
      return {
        realtor: "Realtor.com",
        redfin: "Redfin",
        zillow: "Zillow",
        homes: "Homes.com",
        trulia: "Trulia",
        propertyreports: "PropertyReports"
      }[Tk[1].toLowerCase()];
    } else {
      return Tw.slice(0, 18);
    }
  };
  function TY(Tw, Tk) {
    const Ti = Tw.subject;
    const Tz = Tk.d;
    const TZ = Ti.gallery || [];
    const Tb = Ti.taxes;
    const Tp = X.flTaxes(Tz.price, Tz.millage, false);
    const TW = X.flTaxes(Tz.price, Tz.millage, true);
    const TU = [["Beds / baths", Tm(Ti.beds, Ti.baths)], ["Living area", Ti.sqft ? T6(Ti.sqft) + " sq ft" : "n/a"], ["Year built", Ti.year || "n/a"], ["Lot", Ti.lot ? Ti.lot + " ac" : "n/a"], ["Garage", Ti.garage ? Ti.garage + " car" : Ti.carport ? "Carport" : "None"], ["Pool", Ti.pool ? "Yes" : "No"], ["Stories", Ti.stories || "n/a"], ["Sewer", (Ti.sewer || []).join(", ") || "n/a"], ["Water", (Ti.water || []).join(", ") || "n/a"], ["Roof", (Ti.roof || []).join(", ") || "n/a"], ["Heating", (Ti.heating || []).join(", ") || "n/a"], ["Cooling", (Ti.cooling || []).join(", ") || "n/a"], ["Construction", (Ti.construction || []).join(", ") || "n/a"], ["Flooring", (Ti.flooring || []).join(", ") || "n/a"], ["Flood zone", Ti.floodZone || "Not listed"], ["HOA", Ti.hoa ? T7(Ti.hoaMonthly) + "/mo" : "None listed"], ["Taxes" + (Ti.taxYear ? " (" + Ti.taxYear + ")" : ""), Tb ? T7(Tb) : "n/a"], ["County", Ti.county || "n/a"], ["Subdivision", Ti.subdivision || "n/a"], ["Parcel", Ti.parcel || "n/a"]];
    const TS = (Ti.history || []).filter(Tv => Tv.listDate || Tv.closeDate).slice();
    (Ti.record && Ti.record.sales || []).forEach(Tv => {
      if (!TS.some(TE => TE.close && Math.abs(TE.close - Tv.price) < 1000 && TE.closeDate && Math.abs(new Date(TE.closeDate) - new Date(Tv.date)) < 5184000000)) {
        TS.push({
          closeDate: Tv.date,
          close: Tv.price,
          status: "Recorded",
          rec: true
        });
      }
    });
    TS.sort((Tv, TE) => String(TE.closeDate || TE.listDate).localeCompare(String(Tv.closeDate || Tv.listDate)));
    return TH(Tk, "The property", "" + To("The property") + TB(Ti.addr || "The home") + "\n      " + (TZ.length > 1 ? "<div class=\"r-strip\" style=\"grid-template-columns:repeat(" + Math.min(3, TZ.length - 1) + ",1fr)\">" + TZ.slice(1, 4).map(Tv => "<figure><div class=\"r-simg\" style=\"background-image:url('" + Tv.src + "')\"></div><figcaption>" + T5(Tv.room || "") + "</figcaption></figure>").join("") + "</div>" : "") + "\n      <div class=\"r-facts\">" + TU.map(Tv => {
      const TE = Td[Tv[0].replace(/ \(\d{4}\)$/, "")];
      const x0 = TE && Tw.sources ? Array.isArray(TE) ? TE.map(x1 => Tw.sources[x1]).find(x1 => x1 && x1 !== "MLS") : Tw.sources[TE] : null;
      return "<div><span>" + T5(Tv[0]) + (x0 && x0 !== "MLS" ? "<em class=\"r-src\">" + T5(Tj(x0)) + "</em>" : "") + "</span><b>" + T5(Tv[1]) + "</b></div>";
    }).join("") + "</div>\n      " + (Ti.schools && Ti.schools.some(Boolean) ? "<div class=\"r-schools\"><b>Assigned schools</b> " + Ti.schools.filter(Boolean).map(T5).join(" | ") + " <em>Verify with the school district.</em></div>" : "") + "\n      <div class=\"r-2col\"><div><h3 class=\"r-h3\">Taxes after a sale</h3><p class=\"r-small\">Florida resets the assessment when a home sells. The seller's " + (Tb ? T7(Tb) : "") + " bill is not what a buyer will pay.</p>\n        <table class=\"r-t r-tight\"><tr><td>Current bill" + (Ti.taxYear ? " (" + Ti.taxYear + ")" : "") + "</td><td class=\"n\">" + T7(Tb) + "</td></tr><tr><td>New owner, homestead</td><td class=\"n\">" + T7(TW) + "/yr</td></tr><tr><td>New owner, investor</td><td class=\"n\">" + T7(Tp) + "/yr</td></tr></table><p class=\"r-note\">" + (Tz.millageSource ? "Calculated at " + Tz.millage + " mills from the " + T5(Tz.millageSource) + " record" : "Calculated at " + Tz.millage + " mills, a typical Duval rate") + " on 85% of " + T7(Tz.price) + ", since Florida appraisers deduct about 15% for costs of sale. Check the county tax estimator before closing.</p></div>\n        <div><h3 class=\"r-h3\">Listing and sale history</h3>" + (TS.length ? "<table class=\"r-t r-tight\"><tr><th>Date</th><th>Event</th><th class=\"n\">Price</th></tr>" + TS.slice(0, 7).map(Tv => "<tr><td>" + Tx(Tv.closeDate || Tv.listDate) + "</td><td>" + (Tv.rec ? "Deed recorded" : Tv.type === "F" ? "Leased" : Tv.status === "Closed" ? "Sold" : T5(Tv.status || "Listed")) + "</td><td class=\"n\">" + T7(Tv.close || Tv.list) + "</td></tr>").join("") + "</table>" : "<p class=\"r-small\">No prior listings in realMLS or public records.</p>") + "\n        " + (Ti.lastSale && Ti.lastSale.price && Tk.d.price ? "<p class=\"r-note\">Last sold " + Tx(Ti.lastSale.date) + " for " + T7(Ti.lastSale.price) + ".</p>" : "") + "</div></div>" + function (Tv) {
      const TE = Tv.subject;
      const x0 = Tv.value || {};
      const x1 = Tv.comps.filter(x4 => x4.use);
      if (x1.length < 3) {
        return "";
      }
      const x2 = Q.iMathCMA ? Q.iMathCMA.median : x4 => x4.sort((x5, x6) => x5 - x6)[Math.floor(x4.length / 2)];
      const x3 = (x4, x5, x6, x7) => {
        const x8 = x6.filter(xm => xm != null && !isNaN(xm));
        if (!x8.length || x5 == null) {
          return "";
        }
        const x9 = Math.min(...x8);
        const xT = Math.max(...x8);
        const xx = x2(x8);
        const xO = xT > x9 ? Math.max(0, Math.min(100, (x5 - x9) / (xT - x9) * 100)) : 50;
        return "<tr><td>" + x4 + "</td><td class=\"n\"><b>" + x7(x5) + "</b></td><td class=\"n\">" + x7(xx) + "</td><td><div class=\"r-pos\"><i style=\"left:" + xO + "%\"></i></div><div class=\"r-posl\"><span>" + x7(x9) + "</span><span>" + x7(xT) + "</span></div></td></tr>";
      };
      return "<h3 class=\"r-h3\">How it stacks up against the comps</h3><table class=\"r-t r-cmpn\"><tr><th></th><th class=\"n\">This home</th><th class=\"n\">Comp median</th><th>Where it falls in the range</th></tr>" + x3("Living area", TE.sqft, x1.map(x4 => x4.sqft), x4 => T6(x4) + " sf") + x3("Bedrooms", TE.beds, x1.map(x4 => x4.beds), x4 => +(+x4).toFixed(1)) + x3("Baths", TE.baths, x1.map(x4 => x4.baths), x4 => +(+x4).toFixed(1)) + x3("Year built", TE.year, x1.map(x4 => x4.year), x4 => Math.round(x4)) + x3("Lot", TE.lot, x1.map(x4 => x4.lot), x4 => (+x4).toFixed(2) + " ac") + x3("Value per sq ft", x0.value && TE.sqft ? x0.value / TE.sqft : null, x1.map(x4 => x4.ppsf), x4 => T7(x4)) + "</table>";
    }(Tw));
  }
  const Th = Tw => Tw.comps.length <= 22 && !(Tw.active || []).length;
  function Tt(Tw, Tk) {
    const Ti = Tw.subject;
    const Tz = Tw.web;
    const TZ = Ti.record;
    const Tb = Tw.sources || {};
    const Tp = Object.keys(Tb).filter(TE => Tb[TE] !== "MLS");
    if (!Tz && !TZ && !Tp.length) {
      return "";
    }
    const TW = {
      beds: "Bedrooms",
      baths: "Bathrooms",
      sqft: "Living area",
      year: "Year built",
      lot: "Lot size",
      garage: "Garage spaces",
      pool: "Pool",
      stories: "Stories",
      taxes: "Annual taxes",
      taxYear: "Tax year",
      floodZone: "Flood zone",
      subdivision: "Subdivision",
      county: "County",
      parcel: "Parcel",
      hoaRaw: "HOA dues"
    };
    const TU = (TE, x0) => x0 == null || x0 === "" ? "n/a" : TE === "sqft" ? T6(x0) + " sq ft" : TE === "lot" ? x0 + " ac" : TE === "taxes" ? T7(x0) : TE === "hoaRaw" ? T7(x0) + (Ti.hoaFreq ? " " + String(Ti.hoaFreq).toLowerCase() : "") : TE === "pool" ? x0 ? "Yes" : "No" : String(x0);
    const TS = {};
    (Tz && Tz.conflicts || []).forEach(TE => TS[TE[0]] = TE);
    const Tv = Object.keys(TW).filter(TE => Tb[TE] || TS[TE]).map(TE => "<tr><td>" + TW[TE] + "</td><td class=\"n\"><b>" + T5(TU(TE, Ti[TE])) + "</b></td><td>" + T5(Tb[TE] === "MLS" ? "realMLS" : Tb[TE] || "realMLS") + "</td><td>" + (TS[TE] ? "<span class=\"neg\">" + T5(TU(TE, TS[TE][2])) + "</span> per " + T5(Tj(TS[TE][3])) : "") + "</td></tr>").join("");
    return TH(Tk, "Public record check", "" + To("Public record check") + TB("Where every fact comes from") + "<p class=\"r-lead\">realMLS comes first. Anything the MLS did not have was filled from the county record and real estate sites, and anything that disagrees with the MLS is flagged so you can verify it before you rely on it.</p>\n      <table class=\"r-t r-tight\"><tr><th>Fact</th><th class=\"n\">Used in this report</th><th>Source</th><th>Another source says</th></tr>" + Tv + "</table>\n      " + (TZ ? "<div class=\"r-2col\"><div><h3 class=\"r-h3\">" + (TZ.source ? T5(String(TZ.source).slice(0, 48)) : "County record") + "</h3><table class=\"r-t r-tight\">" + (TZ.justValue ? "<tr><td>Just (market) value" + (TZ.valueYear ? " " + TZ.valueYear : "") + "</td><td class=\"n\">" + T7(TZ.justValue) + "</td></tr>" : "") + (TZ.assessed ? "<tr><td>Assessed value</td><td class=\"n\">" + T7(TZ.assessed) + "</td></tr>" : "") + (TZ.millage ? "<tr><td>Total millage</td><td class=\"n\">" + TZ.millage + " mills</td></tr>" : "") + (TZ.homestead != null ? "<tr><td>Homestead exemption now</td><td class=\"n\">" + (TZ.homestead ? "Yes" : "No") + "</td></tr>" : "") + "</table><p class=\"r-note\">The just value is the appraiser's mass appraisal for taxes, not a market value opinion. It usually trails recent sales.</p></div>\n        <div><h3 class=\"r-h3\">Recorded sales</h3>" + (TZ.sales.length ? "<table class=\"r-t r-tight\"><tr><th>Date</th><th class=\"n\">Price</th></tr>" + TZ.sales.map(TE => "<tr><td>" + Tx(TE.date) + "</td><td class=\"n\">" + T7(TE.price) + "</td></tr>").join("") + "</table>" : "<p class=\"r-small\">No recorded sales found.</p>") + "</div></div>" : "") + "\n      " + (Tz && Tz.sources.length ? "<h3 class=\"r-h3\">Sources checked</h3><ul class=\"r-srcs\">" + Tz.sources.map(TE => "<li><b>" + T5(TE.name || TE.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]) + "</b><span>" + T5(TE.url.length > 90 ? TE.url.slice(0, 89) + "..." : TE.url) + "</span></li>").join("") + "</ul>" : "") + "\n      " + (Tz && Tz.notFound.length ? "<p class=\"r-note\">Not found online: " + T5(Tz.notFound.map(TE => ({
      hoaMonthly: "HOA dues",
      bathsFull: "full baths",
      bathsHalf: "half baths",
      lat: "map location",
      lon: "",
      sqft: "living area",
      year: "year built",
      lot: "lot size",
      taxes: "annual taxes",
      floodZone: "flood zone",
      justValue: "just value",
      assessedValue: "assessed value"
    })[TE] ?? String(TE).replace(/([A-Z])/g, " $1").toLowerCase()).filter(Boolean).join(", ")) + ". Nothing in this report was guessed; missing items are left blank.</p>" : ""));
  }
  function TI(Tw, Tk) {
    const Ti = Th(Tw);
    const Tz = Tw.comps.filter(Tb => Tb.use);
    const TZ = ["updated", "standard", "asis", "new"].filter(Tb => Tw.comps.some(Tp => Tp.cat === Tb));
    return TH(Tk, "Where the comps are", "" + To("Where the comps are") + TB(Tz.length + " sales within " + Tw.search.radius + " mile" + (Tw.search.radius === 1 ? "" : "s")) + "\n      <p class=\"r-lead\">Closed " + T5(Tw.search.sub.toLowerCase()) + " sales from the last " + Tw.search.months + " months, " + (Tw.search.sizePct ? "sized within " + Math.round(Tw.search.sizePct * 100) + "% of the subject." : "any size, since the living area is unknown.") + (Tw.pool ? " The " + Tw.comps.length + " closest matches out of " + Tw.pool + " are shown." : "") + " Numbers match the comp cards that follow.</p>\n      <div class=\"r-mapwrap\">" + function (Tb, Tp, TW) {
      const TU = Tb.subject;
      const TS = Tb.comps.filter(x7 => x7.lat && x7.lon);
      const Tv = (Tb.active || []).filter(x7 => x7.lat && x7.lon);
      const TE = TS.concat(Tv);
      const x0 = Math.max(0.6, ...TE.map(x7 => x7.dist || 0)) * 1.08;
      const x1 = 360;
      const x2 = TW / 2;
      const x3 = (Math.min(Tp, TW) / 2 - 18) / x0;
      const x4 = Math.cos(TU.lat * Math.PI / 180);
      const x5 = x7 => [x1 + (x7.lon - TU.lon) * 69.17 * x4 * x3, x2 - (x7.lat - TU.lat) * 69.17 * x3];
      let x6 = "<rect width=\"720\" height=\"" + TW + "\" fill=\"#f7f9fc\"/>";
      for (let x7 = 0; x7 < Tp; x7 += x3 / 4) {
        x6 += "<line x1=\"" + x7 + "\" y1=\"0\" x2=\"" + x7 + "\" y2=\"" + TW + "\" stroke=\"#e6ecf3\" stroke-width=\"1\"/>";
      }
      for (let x8 = 0; x8 < TW; x8 += x3 / 4) {
        x6 += "<line x1=\"0\" y1=\"" + x8 + "\" x2=\"720\" y2=\"" + x8 + "\" stroke=\"#e6ecf3\" stroke-width=\"1\"/>";
      }
      [0.5, 1, 1.5, 2, 2.5].filter(x9 => x9 <= x0).forEach(x9 => {
        x6 += "<circle cx=\"360\" cy=\"" + x2 + "\" r=\"" + x9 * x3 + "\" fill=\"none\" stroke=\"#b8c6d6\" stroke-dasharray=\"4 4\"/><text x=\"" + (x1 + x9 * x3 * 0.707 + 4) + "\" y=\"" + (x2 - x9 * x3 * 0.707 - 4) + "\" font-size=\"11\" fill=\"#7d8b99\">" + x9 + " mi</text>";
      });
      Tv.forEach(x9 => {
        const [xT, xx] = x5(x9);
        x6 += "<rect x=\"" + (xT - 5) + "\" y=\"" + (xx - 5) + "\" width=\"10\" height=\"10\" fill=\"#fff\" stroke=\"" + T0.NAVY + "\" stroke-width=\"2\" transform=\"rotate(45 " + xT + " " + xx + ")\"/>";
      });
      TS.forEach(x9 => {
        const [xT, xx] = x5(x9);
        const xO = (T4[x9.cat] || [0, T1])[1];
        x6 += "<circle cx=\"" + xT + "\" cy=\"" + xx + "\" r=\"" + (x9.use ? 7 : 5) + "\" fill=\"" + (x9.use ? xO : "#fff") + "\" stroke=\"" + (x9.use ? "#fff" : xO) + "\" stroke-width=\"2\"/>";
        if (x9.num) {
          x6 += "<text x=\"" + xT + "\" y=\"" + (xx + 3.6) + "\" font-size=\"9.5\" font-weight=\"800\" text-anchor=\"middle\" fill=\"#fff\">" + x9.num + "</text>";
        }
      });
      x6 += "<path d=\"M360 " + (x2 - 12) + " L370 " + x2 + " L360 " + (x2 + 12) + " L350 " + x2 + " Z\" fill=\"" + T3 + "\" stroke=\"#fff\" stroke-width=\"2\"/><text x=\"374\" y=\"" + (x2 + 4) + "\" font-size=\"12\" font-weight=\"800\" fill=\"" + T3 + "\">Subject</text>";
      x6 += "<g transform=\"translate(694,26)\"><circle r=\"14\" fill=\"#fff\" stroke=\"#b8c6d6\"/><path d=\"M0 -9 L5 4 L0 1 L-5 4 Z\" fill=\"" + T0.NAVY + "\"/><text y=\"-17\" font-size=\"10\" text-anchor=\"middle\" fill=\"" + T0.NAVY + "\" font-weight=\"700\">N</text></g>";
      return "<svg viewBox=\"0 0 720 " + TW + "\" width=\"720\" height=\"" + TW + "\" class=\"r-svg\" font-family=\"Arial, Helvetica, sans-serif\" role=\"img\" aria-label=\"Map of comparable sales around the subject\">" + x6 + "</svg>";
    }(Tw, 720, Ti ? 690 : 430) + "</div>\n      <div class=\"r-legend\">" + TZ.map(Tb => "<span><i style=\"background:" + T4[Tb][1] + "\"></i>" + T4[Tb][0] + "</span>").join("") + "<span><i class=\"sq\"></i>Active or pending</span><span><i class=\"dia\"></i>Subject</span></div>\n      " + (Ti ? "" : "<h3 class=\"r-h3\">Sale price versus size</h3><div class=\"r-chart\">" + TK(Tw, 720, 300) + "</div>"));
  }
  const Ts = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  function Tq(Tw, Tk) {
    const Ti = Tw.close && Tw.list ? Tw.close / Tw.list * 100 : null;
    const Tz = (T4[Tw.cat] || [0, T1])[1];
    const TZ = function (Tp, TW) {
      if (!Tp.lat || !TW.lat) {
        return null;
      }
      const TU = (TW.lon - Tp.lon) * Math.cos(Tp.lat * Math.PI / 180);
      const TS = TW.lat - Tp.lat;
      const Tv = (Math.atan2(TU, TS) * 180 / Math.PI + 360) % 360;
      return {
        a: Tv,
        dir: Ts[Math.round(Tv / 45) % 8]
      };
    }(Tk, Tw);
    const Tb = Tw.photo ? "<div class=\"r-cimg\" style=\"background-image:url('" + Tw.photo + "')\"><span class=\"r-num\" style=\"background:" + Tz + "\">" + (Tw.num || "") + "</span></div>" : "<div class=\"r-cloc\"><span class=\"r-num\" style=\"background:" + Tz + "\">" + (Tw.num || "") + "</span>" + (TZ ? "<svg viewBox=\"-20 -20 40 40\" width=\"40\" height=\"40\"><circle r=\"18\" fill=\"none\" stroke=\"rgba(255,255,255,.25)\"/><path d=\"M0 -14 L6 6 L0 2 L-6 6 Z\" fill=\"#6bc063\" transform=\"rotate(" + TZ.a.toFixed(0) + ")\"/></svg>" : "") + "<b>" + TN(Tw.dist) + "</b><span>" + (TZ ? TZ.dir + " of the subject" : "from the subject") + "</span></div>";
    return "<article class=\"r-comp" + (Tw.use ? "" : " off") + "\">" + Tb + "<div class=\"r-cbody\"><div class=\"r-ctop\"><b>" + T5(Tw.addr) + "</b>" + (Tp => TF(T4[Tp] ? T4[Tp][0] : Tp, T4[Tp] ? T4[Tp][1] : T1))(Tw.cat) + "</div>\n      <div class=\"r-cprice\">" + T7(Tw.close) + "<span>closed " + TO(Tw.closeDate) + (Tw.photo ? " | " + TN(Tw.dist) : "") + "</span></div>\n      <div class=\"r-cgrid\"><div><span>Bd/Ba</span>" + Tm(Tw.beds, Tw.baths) + "</div><div><span>Sq ft</span>" + T6(Tw.sqft) + "</div><div><span>$/sq ft</span>" + (Tw.ppsf ? T7(Tw.ppsf) : "n/a") + "</div><div><span>Built</span>" + (Tw.year || "n/a") + "</div><div><span>DOM</span>" + (Tw.dom ?? "n/a") + "</div><div><span>Of list</span>" + (Ti ? Math.round(Ti) + "%" : "n/a") + "</div><div><span>List</span>" + T7(Tw.list) + "</div><div><span>Adjusted</span><b>" + (Tw.use ? T7(Tw.adjusted) : "n/a") + "</b></div></div>\n      <p>" + T5(Tw.note || "") + "</p><div class=\"r-mls\">MLS " + T5(Tw.id) + (Tw.use ? "" : " | Not used: " + T5(Tw.why || "excluded")) + "</div></div></article>";
  }
  function TR(Tw, Tk) {
    const Ti = {
      updated: ["updated", "standard", "new", "asis"],
      needs: ["asis", "standard", "updated", "new"]
    }[Tw.cond] || ["standard", "updated", "asis", "new"];
    const Tz = Q.iMathCMA ? Q.iMathCMA.median : null;
    const TZ = {
      updated: ["Updated sales", "Move-in ready resales. They set what an owner occupant pays; the top of the group is the after repair ceiling."],
      standard: ["Average condition", "Livable homes that were not recently renovated. The best guide for a home in average shape."],
      asis: ["As-is and investor sales", "Dated, tenant occupied or cash sales. This is where rental and flip numbers usually start."],
      new: ["New construction", "Brand new homes nearby. An older home rarely reaches these prices, but they cap any after repair story."]
    };
    const Tb = [];
    let Tp = null;
    let TW = 0;
    const TU = Tv => {
      Tp = [];
      Tb.push(Tp);
      TW = 884 - (Tv ? 88 : 22);
    };
    TU(true);
    Ti.forEach(Tv => {
      const TE = Tw.comps.filter(x5 => x5.cat === Tv).sort((x5, x6) => (x5.num || 99) - (x6.num || 99));
      if (!TE.length) {
        return;
      }
      const x0 = TE.map(x5 => x5.price).filter(Boolean);
      const x1 = Tz ? Tz(x0) : null;
      const x2 = x5 => "<div class=\"r-catbar\" style=\"--c:" + T4[Tv][1] + "\"><div><b>" + T5(TZ[Tv][0]) + (x5 ? " (continued)" : "") + "</b><span>" + T5(TZ[Tv][1]) + "</span></div><em>" + TE.length + " sale" + (TE.length === 1 ? "" : "s") + (x1 ? " | median " + T8(x1) : "") + "</em></div>";
      let x3 = 0;
      let x4 = true;
      while (x3 < TE.length) {
        if (TW < 198) {
          TU(false);
        }
        Tp.push(x2(!x4));
        TW -= 44;
        x4 = false;
        let x5 = [];
        while (x3 < TE.length && TW >= 154) {
          x5.push(TE[x3], TE[x3 + 1]);
          x3 += 2;
          TW -= 154;
        }
        Tp.push("<div class=\"r-comps\">" + x5.filter(Boolean).map(x6 => Tq(x6, Tw.subject)).join("") + "</div>");
      }
    });
    const TS = Tw.comps.filter(Tv => Tv.use).length;
    return Tb.map((Tv, TE) => TH(Tk, "Comparable sales", "" + To("The comparable sales" + (TE ? " (continued)" : "")) + (TE ? "" : TB(Tw.comps.length + " sales, grouped by condition") + ("<p class=\"r-lead\">Numbers match the map. " + TS + " of " + Tw.comps.length + " are used in the value; the adjusted price shows what each sale would bring if it were this home.</p>")) + Tv.join(""))).join("");
  }
  function Tr(Tw, Tk) {
    const Ti = Tw.subject;
    const Tz = Tw.comps.filter(TU => TU.w > 0).sort((TU, TS) => TS.w - TU.w).slice(0, 5);
    if (!Tz.length) {
      return "";
    }
    const TZ = Tw.comps.reduce((TU, TS) => TU + (TS.w || 0), 0);
    const Tb = ["Size", "Full baths", "Half baths", "Bedrooms", "Garage", "Pool", "Age", "Lot"].filter(TU => Tz.some(TS => TS.adj.some(Tv => Tv[0] === TU)));
    const Tp = {
      Size: Ti.sqft ? T6(Ti.sqft) + " sf" : "Unknown",
      "Full baths": Ti.bf,
      "Half baths": Ti.bh || 0,
      Bedrooms: Ti.beds,
      Garage: Ti.garage || 0,
      Pool: Ti.pool ? "Yes" : "No",
      Age: Ti.year,
      Lot: Ti.lot ? Ti.lot + " ac" : "n/a"
    };
    const TW = Tw.market0 ? Tw.market0.K : {};
    return TH(Tk, "How we got the number", "" + To("How we got the number") + TB("The adjustment grid") + "<p class=\"r-lead\">Each sale is adjusted to look like the subject. If a comp is bigger, we subtract. If it is missing something the subject has, we add. Closer, newer and more similar sales count more.</p>\n      <div class=\"r-scroll\"><table class=\"r-t r-grid\"><tr><th></th><th>Subject</th>" + Tz.map(TU => "<th><span class=\"r-num sm\" style=\"background:" + (T4[TU.cat] || [0, T1])[1] + "\">" + TU.num + "</span>" + T5(TU.addr) + "</th>").join("") + "</tr>\n      <tr><td>Sale price</td><td class=\"n\">" + (Ti.list && !/closed/i.test(Ti.status || "") ? T7(Ti.list) + " list" : "n/a") + "</td>" + Tz.map(TU => "<td class=\"n\">" + T7(TU.close) + "</td>").join("") + "</tr>\n      <tr><td>Seller concessions</td><td></td>" + Tz.map(TU => "<td class=\"n " + (TU.concessions ? "neg" : "mute") + "\">" + (TU.concessions ? "−" + T7(TU.concessions) : "0") + "</td>").join("") + "</tr>\n      " + Tb.map(TU => "<tr><td>" + TU + "</td><td class=\"n sv\">" + T5(Tp[TU]) + "</td>" + Tz.map(TS => ((Tv, TE) => {
      const x0 = Tv.adj.find(x1 => x1[0] === TE);
      if (x0) {
        return "<td class=\"n " + (x0[1] > 0 ? "pos" : "neg") + "\">" + (x0[1] > 0 ? "+" : "") + T7(x0[1]) + "</td>";
      } else {
        return "<td class=\"n mute\">0</td>";
      }
    })(TS, TU)).join("") + "</tr>").join("") + "\n      <tr class=\"tot\"><td>Adjusted value</td><td></td>" + Tz.map(TU => "<td class=\"n\">" + T7(TU.adjusted) + "</td>").join("") + "</tr>\n      <tr><td>Weight</td><td></td>" + Tz.map(TU => "<td class=\"n\">" + T9(TU.w / TZ * 100, 0) + "</td>").join("") + "</tr></table></div>\n      <div class=\"r-2col\"><div class=\"r-callout\"><div class=\"r-tl\">Indicated value</div><div class=\"r-big\">" + T7(Tw.value.value) + "</div><div class=\"r-ts\">Weighted median of " + Tw.value.used + " adjusted sales. Range " + T7(Tw.value.low) + " to " + T7(Tw.value.high) + ".</div></div>\n      <div><h3 class=\"r-h3\">Adjustment rates used</h3><table class=\"r-t r-tight\"><tr><td>Living area</td><td class=\"n\">" + T7(TW.gla) + "/sq ft</td></tr><tr><td>Full bath</td><td class=\"n\">" + T7(TW.fullBath) + "</td></tr><tr><td>Garage space</td><td class=\"n\">" + T7(TW.garage) + "</td></tr><tr><td>Pool</td><td class=\"n\">" + T7(TW.pool) + "</td></tr><tr><td>Age</td><td class=\"n\">0.25%/yr, max 8%</td></tr></table><p class=\"r-note\">Rates scale with local prices (median " + T7(Tw.market0 && Tw.market0.mPrice) + ", " + T7(Tw.market0 && Tw.market0.mPpsf) + "/sq ft).</p></div></div>\n      " + function (TU) {
      const TS = TU.value || {};
      const Tv = TU.comps.filter(x8 => x8.w > 0 && x8.adjusted).sort((x8, x9) => x9.w - x8.w).slice(0, 14).sort((x8, x9) => x8.adjusted - x9.adjusted);
      if (Tv.length < 3) {
        return "";
      }
      const TE = 17;
      const x0 = 8 + Tv.length * TE + 26;
      const x1 = Math.max(...Tv.map(x8 => x8.w));
      const x2 = Tv.flatMap(x8 => [x8.price, x8.adjusted]).concat([TS.low, TS.high]).filter(Boolean);
      const x3 = Math.min(...x2) * 0.97;
      const x4 = Math.max(...x2) * 1.03;
      const x5 = x8 => 176 + (x8 - x3) / (x4 - x3) * 528;
      let x6 = "<rect x=\"" + x5(TS.low) + "\" y=\"4\" width=\"" + (x5(TS.high) - x5(TS.low)) + "\" height=\"" + (Tv.length * TE + 6) + "\" fill=\"rgba(107,192,99,.13)\"/><line x1=\"" + x5(TS.value) + "\" x2=\"" + x5(TS.value) + "\" y1=\"4\" y2=\"" + (8 + Tv.length * TE + 2) + "\" stroke=\"" + T0.NAVY + "\" stroke-width=\"1.5\"/>";
      const x7 = x4 - x3 > 400000 ? 100000 : x4 - x3 > 150000 ? 50000 : x4 - x3 > 60000 ? 20000 : 10000;
      for (let x8 = Math.ceil(x3 / x7) * x7; x8 <= x4; x8 += x7) {
        x6 += "<text x=\"" + x5(x8) + "\" y=\"" + (x0 - 6) + "\" font-size=\"10\" text-anchor=\"middle\" fill=\"#7d8b99\">" + T8(x8) + "</text><line x1=\"" + x5(x8) + "\" x2=\"" + x5(x8) + "\" y1=\"" + (8 + Tv.length * TE + 2) + "\" y2=\"" + (8 + Tv.length * TE + 6) + "\" stroke=\"#b8c6d6\"/>";
      }
      Tv.forEach((x9, xT) => {
        const xx = 8 + xT * TE + 8.5;
        const xO = (T4[x9.cat] || [0, T1])[1];
        const xm = 3 + x9.w * 4 / x1;
        x6 += "<text x=\"166\" y=\"" + (xx + 3.5) + "\" font-size=\"10\" text-anchor=\"end\" fill=\"#1a2b3d\"><tspan font-weight=\"700\" fill=\"" + xO + "\">" + x9.num + "</tspan>  " + T5(x9.addr.length > 22 ? x9.addr.slice(0, 21) + "." : x9.addr) + "</text><line x1=\"" + x5(x9.price) + "\" x2=\"" + x5(x9.adjusted) + "\" y1=\"" + xx + "\" y2=\"" + xx + "\" stroke=\"" + xO + "\" stroke-opacity=\".45\" stroke-width=\"2\"/><circle cx=\"" + x5(x9.price) + "\" cy=\"" + xx + "\" r=\"3\" fill=\"#fff\" stroke=\"" + xO + "\" stroke-width=\"1.5\"/><circle cx=\"" + x5(x9.adjusted) + "\" cy=\"" + xx + "\" r=\"" + xm.toFixed(1) + "\" fill=\"" + xO + "\"/>";
      });
      return "<h3 class=\"r-h3\">Every adjusted sale at a glance</h3><div class=\"r-chart\">" + ("<svg viewBox=\"0 0 720 " + x0 + "\" width=\"720\" height=\"" + x0 + "\" class=\"r-svg\" font-family=\"Arial, Helvetica, sans-serif\">" + x6 + "</svg>") + "</div><p class=\"r-note\">Hollow dot is the sale price net of concessions; solid dot is the adjusted price, larger when the sale counts more. The line marks our value of " + T7(TS.value) + " and the green band the likely range.</p>";
    }(Tw));
  }
  function Tg(Tw, Tk) {
    const Ti = Tw.subject;
    const Tz = Tw.comps.slice().sort((Tv, TE) => (Tv.num || 99) - (TE.num || 99));
    const TZ = "<tr class=\"subj\"><td>★</td><td>" + T5(Ti.addr) + " (subject)</td><td>" + T5(Ti.status || "") + "</td><td class=\"n\">n/a</td><td>n/a</td><td>" + Tm(Ti.beds, Ti.baths) + "</td><td class=\"n\">" + T6(Ti.sqft) + "</td><td class=\"n\">" + (Ti.year || "n/a") + "</td><td class=\"n\">" + T7(Ti.list) + "</td><td class=\"n\">n/a</td><td class=\"n\">" + (Ti.list && Ti.sqft ? T7(Ti.list / Ti.sqft) : "n/a") + "</td><td class=\"n\">" + (Ti.dom ?? "n/a") + "</td></tr>";
    const Tb = Tv => "<tr class=\"" + (Tv.use ? "" : "off") + "\"><td><span class=\"r-num sm\" style=\"background:" + (T4[Tv.cat] || [0, T1])[1] + "\">" + (Tv.num || "") + "</span></td><td>" + T5(Tv.addr) + "</td><td>" + T5(T4[Tv.cat] ? T4[Tv.cat][0] : "") + "</td><td class=\"n\">" + (Tv.dist != null ? Tv.dist.toFixed(2) : "n/a") + "</td><td>" + TO(Tv.closeDate) + "</td><td>" + Tm(Tv.beds, Tv.baths) + "</td><td class=\"n\">" + T6(Tv.sqft) + "</td><td class=\"n\">" + (Tv.year || "n/a") + "</td><td class=\"n\">" + T7(Tv.list) + "</td><td class=\"n\">" + T7(Tv.close) + "</td><td class=\"n\">" + (Tv.ppsf ? T7(Tv.ppsf) : "n/a") + "</td><td class=\"n\">" + (Tv.dom ?? "n/a") + "</td></tr>";
    const Tp = (Tw.active || []).slice(0, 18);
    const TW = Tz.length <= 22 && Tz.length + Tp.length <= 30;
    let TU = "";
    for (let Tv = 0; Tv < Tz.length; Tv += 26) {
      TU += TH(Tk, "Side by side", "" + To("Side by side" + (Tv ? " (continued)" : "")) + (Tv ? "" : TB("Every sale against the subject")) + "<table class=\"r-t r-list\"><tr><th>#</th><th>Address</th><th>Type</th><th class=\"n\">Dist</th><th>Closed</th><th>Bd/Ba</th><th class=\"n\">Sq ft</th><th class=\"n\">Built</th><th class=\"n\">List</th><th class=\"n\">Sold</th><th class=\"n\">$/sf</th><th class=\"n\">DOM</th></tr>" + (Tv ? "" : TZ) + Tz.slice(Tv, Tv + 26).map(Tb).join("") + "</table>" + (Tv + 26 >= Tz.length ? "<p class=\"r-note\">Sold prices are shown before concessions. Faded rows are shown for context but not used in the value.</p>" + (Th(Tw) ? "<h3 class=\"r-h3\">Sale price versus size</h3><div class=\"r-chart\">" + TK(Tw, 720, Math.max(240, 560 - Tz.length * 16)) + "</div>" : "") : "") + (TW && Tp.length && Tv + 26 >= Tz.length ? "<!--COMP-->" : ""));
    }
    const TS = Tp;
    if (TS.length) {
      const TE = (TW ? "<h3 class=\"r-h3\">The competition: what buyers can choose today</h3><p class=\"r-small\">" : "" + To("The competition") + TB("What buyers can choose today") + "<p class=\"r-lead\">") + "Active, coming soon and pending homes nearby in the same size range. Pending prices are list prices; the final sale price is not known yet.</p>\n      <table class=\"r-t r-list\"><tr><th>Status</th><th>Address</th><th class=\"n\">Dist</th><th>Bd/Ba</th><th class=\"n\">Sq ft</th><th class=\"n\">Built</th><th class=\"n\">List</th><th class=\"n\">$/sf</th><th class=\"n\">DOM</th></tr>" + TS.map(x0 => "<tr><td>" + TF(x0.status, /pending|contract/i.test(x0.status) ? T2 : T0.GREEN_INK) + "</td><td>" + T5(x0.addr) + "</td><td class=\"n\">" + (x0.dist != null ? x0.dist.toFixed(2) : "n/a") + "</td><td>" + Tm(x0.beds, x0.baths) + "</td><td class=\"n\">" + T6(x0.sqft) + "</td><td class=\"n\">" + (x0.year || "n/a") + "</td><td class=\"n\">" + T7(x0.list) + "</td><td class=\"n\">" + (x0.list && x0.sqft ? T7(x0.list / x0.sqft) : "n/a") + "</td><td class=\"n\">" + (x0.dom ?? "n/a") + "</td></tr>").join("") + "</table>\n      " + (() => {
        const x0 = TS.filter(x2 => /active|coming/i.test(x2.status) && x2.list);
        if (!x0.length || !Tw.value.value) {
          return "";
        }
        const x1 = x0.filter(x2 => x2.list <= Tw.value.value).length;
        return "<p class=\"r-note\">" + x0.length + " active listing" + (x0.length === 1 ? "" : "s") + " nearby, " + x1 + " priced at or under our value of " + T7(Tw.value.value) + ". Median active list price " + T7(Q.iMathCMA ? Q.iMathCMA.median(x0.map(x2 => x2.list)) : x0[0].list) + ".</p>";
      })();
      if (TW) {
        TU = TU.replace("<!--COMP-->", TE);
      } else {
        TU += TH(Tk, "The competition", TE);
      }
    }
    return TU;
  }
  function TQ(Tw, Tk) {
    const Ti = Tw.market || {};
    const Tz = Tw.local || {};
    const TZ = Tw.subject;
    const Tb = (Ti.series && Ti.series.dates || []).slice().reverse().map(TW => TT[+String(TW).slice(0, 2) - 1] || "");
    if (!Tw.market && !Tw.local) {
      return "";
    }
    const Tp = Ti.kind === "Seller's market" ? "green" : Ti.kind === "Buyer's market" ? "amber" : "navy";
    return TH(Tk, "Market conditions", "" + To("Market conditions | ZIP " + T5(TZ.zip || "")) + TB(Ti.kind || "The local market") + "\n      <div class=\"r-grid4\">" + Ty("Months of supply", Ti.monthsSupply != null ? (+Ti.monthsSupply).toFixed(1) : "n/a", Ti.kind ? Ti.kind : "Under 4 favors sellers, over 6 favors buyers", Tp) + Ty("Median sold price", Ti.medianSold ? T8(Ti.medianSold) : "n/a", Ti.medianSoldYoY != null ? (Ti.medianSoldYoY >= 0 ? "Up" : "Down") + " " + T9(Math.abs(Ti.medianSoldYoY) * 100, 1) + " vs a year ago (3 month median)" : "") + Ty("Average days on market", Ti.dom != null ? Math.round(Ti.dom) : "n/a", Ti.cdom != null ? Math.round(Ti.cdom) + " counting relists" : "") + Ty("Sale to list price", Ti.saleToList != null ? T9(Ti.saleToList, 1) : "n/a", Ti.saleToOrig != null ? T9(Ti.saleToOrig, 1) + " of original price" : "") + "</div>\n      " + (Ti.series ? "<div class=\"r-2col\"><div><h3 class=\"r-h3\">Median sold price, last 12 months</h3>" + Tu(Ti.series.sold.slice().reverse(), Tb, 350, 150, T0.NAVY, T8) + "</div><div><h3 class=\"r-h3\">Months of supply</h3>" + Tu((Ti.supplySeries || []).slice().reverse(), Tb, 350, 150, T0.GREEN_INK, TW => (+TW).toFixed(1)) + "</div></div>" : "") + "\n      " + (Ti.inv ? "<div class=\"r-2col\"><div><h3 class=\"r-h3\">Active listings</h3>" + Tu(Ti.inv.ActiveListings.slice().reverse(), Tb, 350, 120, T1, TW => Math.round(TW)) + "</div><div><h3 class=\"r-h3\">Homes sold per month</h3>" + Tu(Ti.inv.SoldListings.slice().reverse(), Tb, 350, 120, T0.NAVY, TW => Math.round(TW)) + "</div></div>" : "") + "\n      " + (Tz.n ? "<h3 class=\"r-h3\">Right around this home</h3><div class=\"r-grid4\">" + Ty("Sale to list", T9(Tz.ratio * 100, 1), T9(Tz.overList * 100, 0) + " sold over list") + Ty("Median days on market", Math.round(Tz.dom || 0), "For the comps above") + Ty("Priced right", Tz.nAtList ? Math.round(Tz.domAtList || 0) + " days" : "n/a", Tz.nAtList + " sold within 2% of original ask") + Ty("Needed a cut", Tz.nCut ? Math.round(Tz.domCut || 0) + " days" : "n/a", Tz.nCut + " sold more than 2% under original ask") + "</div>" : "") + "\n      " + (Tz.n ? (() => {
      const TW = Object.entries(Tz.financing || {}).filter(TS => !/unknown/i.test(TS[0])).sort((TS, Tv) => Tv[1] - TS[1]).slice(0, 5);
      const TU = TW.reduce((TS, Tv) => TS + Tv[1], 0);
      return "<div class=\"r-2col\"><div><h3 class=\"r-h3\">How nearby buyers paid</h3>" + (TU ? "<div class=\"r-bars\">" + TW.map(TS => "<div><span>" + T5(TS[0]) + "</span><i><em style=\"width:" + (TS[1] / TU * 100).toFixed(0) + "%\"></em></i><b>" + T9(TS[1] / TU * 100, 0) + "</b></div>").join("") + "</div><p class=\"r-note\">From the " + TU + " comps above that reported financing. A high cash share usually means investor demand.</p>" : "<p class=\"r-small\">Financing was not reported for these sales.</p>") + "</div>\n          <div><h3 class=\"r-h3\">Negotiation signals</h3><table class=\"r-t r-tight\"><tr><td>Sold over list price</td><td class=\"n\">" + T9(Tz.overList * 100, 0) + "</td></tr><tr><td>Sold 2% or more under original ask</td><td class=\"n\">" + T9(Tz.nCut / Tz.n * 100, 0) + "</td></tr><tr><td>Median sale to original ask</td><td class=\"n\">" + (Tz.ratioO ? T9(Tz.ratioO * 100, 1) : "n/a") + "</td></tr><tr><td>Sellers who paid concessions</td><td class=\"n\">" + T9((Tz.concShare || 0) * 100, 0) + "</td></tr><tr><td>Typical concession</td><td class=\"n\">" + (Tz.conc ? T9(Tz.conc * 100, 1) + " of price" : "n/a") + "</td></tr></table></div></div>";
    })() : "") + "\n      <p class=\"r-note\">ZIP level statistics from realMLS for residential property, monthly, most recent month first on the right. Local figures come from the comparable sales in this report.</p>");
  }
  function TJ(Tw, Tk) {
    const Ti = Tw.value || {};
    const Tz = Tw.local || {};
    if (!Ti.value) {
      return "";
    }
    const TZ = Tw.subject;
    if (Tk.type === "buyer") {
      const Tp = Tz.ratio || 0.97;
      const TW = TZ.list || Ti.value;
      const TU = Math.round(Math.min(TW * Tp, Ti.value) / 1000) * 1000;
      return TH(Tk, "Offer strategy", "" + To("Offer strategy") + TB("Where to start and where to stop") + "\n        <div class=\"r-ladder\">" + [["Opening offer", TU, "Local homes sold for about " + T9(Tp * 100, 0) + " of list. Start near the bottom of the value range."], ["Target price", Ti.value, "Our most likely value. A fair deal for both sides."], ["Walk away", Ti.high, "Above this you are paying past what the comps support, unless the home has something they do not."]].map((TS, Tv) => "<div class=\"r-step s" + Tv + "\"><div class=\"r-tl\">" + TS[0] + "</div><div class=\"r-big\">" + T7(TS[1]) + "</div><p>" + TS[2] + "</p></div>").join("") + "</div>\n        " + function (TS, Tv) {
        const TE = TS.d;
        const x0 = x2 => X.flTaxes(x2, TE.millage, true);
        const x1 = (x2, x3, x4, x5) => X.housing({
          price: x2,
          program: x3,
          downPct: x4,
          rate: x5,
          years: 30,
          taxesYr: x0(x2),
          insYr: TE.insYr,
          hoaMo: TE.hoaMo,
          floodYr: TE.floodYr
        });
        return "<h3 class=\"r-h3\">What each price means monthly</h3><table class=\"r-t r-tight\"><tr><th></th><th class=\"n\">Price</th><th class=\"n\">FHA 3.5% down</th><th class=\"n\">Conventional 5% down</th><th class=\"n\">Cash to close, FHA</th></tr>" + Tv.filter(x2 => x2[1]).map(x2 => {
          const x3 = x1(x2[1], "fha", 3.5, TE.rates.fha);
          const x4 = x1(x2[1], "conv", 5, TE.rates.conv);
          return "<tr><td>" + T5(x2[0]) + "</td><td class=\"n\"><b>" + T7(x2[1]) + "</b></td><td class=\"n\">" + T7(x3.total) + "/mo</td><td class=\"n\">" + T7(x4.total) + "/mo</td><td class=\"n\">" + T7(x3.down + X.buyerClosing(x2[1], x3.loan).total) + "</td></tr>";
        }).join("") + "</table><p class=\"r-note\">Estimates at " + TE.rates.fha + "% FHA and " + TE.rates.conv + "% conventional, 30 years, with estimated taxes and insurance. " + (TE.rateSource ? "Rates are " + T5(TE.rateSource) + " averages, not quotes." : "Rates are assumptions, not quotes.") + " See the mortgage page for details.</p>";
      }(Tk, [["Opening offer", TU], ["Target price", Ti.value], ["Walk away", Ti.high]]) + "\n        " + Ta(Tz, "buyer") + "\n        <h3 class=\"r-h3\">Make the offer stronger without paying more</h3><ul class=\"r-ul\"><li>Get fully pre-approved before you write. Sellers weigh certainty as much as price.</li><li>Ask for seller concessions instead of a lower price. " + (Tz.concShare ? T9(Tz.concShare * 100, 0) + " of nearby sellers paid them, a median " + T9((Tz.conc || 0) * 100, 1) + " of price." : "") + "</li><li>Keep the inspection period short and focused, and order insurance quotes early. Older Florida homes may need a 4-point and wind mitigation report.</li><li>Match the seller's timeline on closing and possession if you can.</li></ul>");
    }
    const Tb = [["Aggressive", Math.round(Ti.value * 0.98 / 1000) * 1000, "Priced just under value to create urgency and multiple offers.", Tz.domAtList], ["At market", Ti.value, "The most likely sale price. Strong showings and a clean negotiation.", Tz.dom], ["Stretch", Math.round(Ti.high / 1000) * 1000, "Tests the top of the range. Expect more days on market and a possible reduction.", Tz.domCut]];
    return TH(Tk, "Pricing strategy", "" + To("Pricing strategy") + TB("Price it to sell, not to sit") + "\n      <div class=\"r-ladder\">" + Tb.map((TS, Tv) => "<div class=\"r-step s" + Tv + "\"><div class=\"r-tl\">" + TS[0] + "</div><div class=\"r-big\">" + T7(TS[1]) + "</div><p>" + TS[2] + "</p>" + (TS[3] ? "<div class=\"r-ts\">Nearby homes like this took about " + Math.round(TS[3]) + " days</div>" : "") + "</div>").join("") + "</div>\n      " + (Tz.nCut >= 2 && Tz.nAtList >= 2 ? "<div class=\"r-callout wide\"><b>Why the first price matters.</b> Around this home, sellers who priced right sold in about " + Math.round(Tz.domAtList) + " days. Those who had to cut sold in about " + Math.round(Tz.domCut) + " days and for about " + T9((1 - (Tz.ratioO || 1)) * 100, 1) + " under their original ask.</div>" : "") + "\n      " + function (TS) {
      const Tv = TS.filter(Boolean).map(TE => {
        const x0 = (x5 => x5 < 200000 ? 10000 : x5 < 500000 ? 25000 : x5 < 1000000 ? 50000 : 100000)(TE);
        const x1 = Math.floor(TE / x0) * x0;
        const x2 = Math.ceil(TE / x0) * x0;
        let x3;
        let x4;
        if (TE % x0 === 0) {
          x3 = "Searches that stop at " + T8(TE) + " and searches that start there";
          x4 = "Sits right on a bracket line, so both groups see it";
        } else if (x2 - TE <= x0 * 0.03) {
          x3 = "Searches capped at " + T8(x2) + " and below";
          x4 = "Just under " + T8(x2) + ", a strong spot";
        } else if (TE - x1 <= x0 * 0.03) {
          x3 = "Searches from " + T8(x1) + " up";
          x4 = "Try " + T7(x1 - 100) + " to also reach buyers capped at " + T8(x1);
        } else {
          x3 = "Searches between " + T8(x1) + " and " + T8(x2);
          x4 = "Mid bracket, fine as priced";
        }
        return "<tr><td><b>" + T7(TE) + "</b></td><td>" + x3 + "</td><td>" + x4 + "</td></tr>";
      });
      return "<h3 class=\"r-h3\">Search bracket check</h3><table class=\"r-t r-tight\"><tr><th>Price</th><th>Who sees it online</th><th>Tip</th></tr>" + Tv.join("") + "</table><p class=\"r-note\">Buyers filter by round numbers. A price just under a bracket line reaches everyone whose search stops there.</p>";
    }(Tb.map(TS => TS[1])) + "\n      " + Ta(Tz, "seller") + "\n      <h3 class=\"r-h3\">Before the sign goes up</h3><ul class=\"r-ul\"><li>Pre-list inspection or at least a roof, HVAC and water heater age check. Buyers' insurers will ask.</li><li>Paint, light fixtures and a deep clean return more than they cost at this price point.</li><li>Great photos and a video walkthrough. The first week online is when most buyers see it.</li><li>Gather permits, warranties, utility bills and the survey now so the contract period goes smoothly.</li></ul>");
  }
  function Ta(Tw, Tk) {
    const Ti = Tw && Tw.dom != null ? Math.round(Tw.dom) : null;
    return "<h3 class=\"r-h3\">What to expect</h3><div class=\"r-tline\">" + (Tk === "seller" ? [["Launch", "Photos, video and the first weekend of showings. Most buyers see a new listing in week one."], ["Under contract", Ti != null ? "About " + Ti + " days on market is typical nearby." : "Depends on price and condition."], ["Inspections and appraisal", "Usually the first 10 to 15 days of the contract."], ["Closing", "30 to 45 days with financing, 2 to 3 weeks for cash."]] : [["Pre-approval", "A day or two with documents ready."], ["Offer and contract", Ti != null ? "Homes nearby sell in about " + Ti + " days, so tour soon." : "Move quickly on the right home."], ["Inspections and appraisal", "Usually the first 10 to 15 days of the contract."], ["Closing", "30 to 45 days with financing."]]).map((Tz, TZ) => "<div><i>" + (TZ + 1) + "</i><b>" + T5(Tz[0]) + "</b><span>" + T5(Tz[1]) + "</span></div>").join("") + "</div>";
  }
  const Tn = (Tw, Tk, Ti, Tz) => {
    Tz = Tz || {};
    return "<label class=\"r-in\"><span>" + T5(Ti) + "</span><input data-k=\"" + Tw + "\" type=\"number\" step=\"" + (Tz.step || "any") + "\" value=\"" + Tk + "\"" + (Tz.min != null ? " min=\"" + Tz.min + "\"" : "") + "></label>";
  };
  function TP(Tw, Tk) {
    const Ti = Tk.d;
    const Tz = Tw.rent;
    const TZ = (Tw.rents || []).slice().sort((TU, TS) => (TU.dist || 9) - (TS.dist || 9)).slice(0, 12);
    const Tb = Tw.subject;
    const Tp = TZ.length ? "<table class=\"r-t r-list\"><tr><th>Address</th><th>Leased</th><th>Bd/Ba</th><th class=\"n\">Sq ft</th><th class=\"n\">Built</th><th class=\"n\">Rent</th><th class=\"n\">$/sf</th><th class=\"n\">Dist</th><th class=\"n\">DOM</th></tr>" + TZ.map(TU => "<tr class=\"" + (Tz && Tz.twin === TU ? "subj" : "") + "\"><td>" + T5(TU.addr) + (Tz && Tz.twin === TU ? " <em>closest twin</em>" : "") + "</td><td>" + TO(TU.closeDate) + "</td><td>" + Tm(TU.beds, TU.baths) + "</td><td class=\"n\">" + T6(TU.sqft) + "</td><td class=\"n\">" + (TU.year || "n/a") + "</td><td class=\"n\">" + T7(TU.rent) + "</td><td class=\"n\">" + (TU.sqft ? "$" + (TU.rent / TU.sqft).toFixed(2) : "n/a") + "</td><td class=\"n\">" + (TU.dist != null ? TU.dist.toFixed(2) : "n/a") + "</td><td class=\"n\">" + (TU.dom ?? "n/a") + "</td></tr>").join("") + "</table>" : "<p class=\"r-small\">Not enough closed leases nearby. Enter a rent you trust in the calculator.</p>";
    let TW = TH(Tk, "Rent comps", "" + To("Rent comps") + TB(("What a " + (Tb.beds || "") + " bed rents for here").replace("  ", " ")) + "<p class=\"r-lead\">Closed leases in realMLS within " + (Tw.rentRadius || 1.5) + " miles over the last 12 months.</p>\n      <div class=\"r-grid3\">" + Ty("Market rent", Tz ? T7(Tz.estimate) + "/mo" : "n/a", Tz ? "Range " + T7(Tz.low) + " to " + T7(Tz.high) : "", "navy") + Ty("Rent per sq ft", Tz && Tz.perSf ? "$" + Tz.perSf.toFixed(2) : "n/a", Tz ? Tz.n + " leases" : "") + Ty("Gross rent multiplier", Tz && Ti.price ? (Ti.price / (Tz.estimate * 12)).toFixed(1) : "n/a", "Price divided by yearly rent") + "</div>" + Tp + (() => {
      const TU = Q.iMathCMA ? Q.iMathCMA.median : null;
      if (!TU) {
        return "";
      }
      const TS = {};
      (Tw.rents || []).forEach(TE => {
        if (TE.beds != null) {
          (TS[TE.beds] = TS[TE.beds] || []).push(TE.rent);
        }
      });
      const Tv = Object.keys(TS).sort((TE, x0) => TE - x0).filter(TE => TS[TE].length >= 2).slice(0, 4);
      if (Tv.length < 2) {
        return "";
      } else {
        return "<h3 class=\"r-h3\">Rent by bedroom count</h3><div class=\"r-grid4\">" + Tv.map(TE => Ty(TE + " bedrooms", T7(TU(TS[TE])) + "/mo", TS[TE].length + " leases | " + T7(Math.min(...TS[TE])) + " to " + T7(Math.max(...TS[TE])), +TE === Tb.beds ? "green" : "")).join("") + "</div>";
      }
    })() + function (TU, TS) {
      const Tv = TU.subject;
      const TE = TU.rent;
      const x0 = (TU.rents || []).filter(xm => xm.sqft && xm.rent);
      if (x0.length < 4 || !TE) {
        return "";
      }
      const x1 = Math.max(200, Math.min(330, 560 - TS * 20));
      const x2 = x0.map(xm => xm.sqft).concat([Tv.sqft || 0]).filter(Boolean);
      const x3 = x0.map(xm => xm.rent).concat([TE.estimate]);
      const x4 = Math.min(...x2) * 0.94;
      const x5 = Math.max(...x2) * 1.06;
      const x6 = Math.min(...x3) * 0.9;
      const x7 = Math.max(...x3) * 1.08;
      const x8 = xm => 56 + (xm - x4) / (x5 - x4) * 650;
      const x9 = xm => 12 + (1 - (xm - x6) / (x7 - x6)) * (x1 - 12 - 34);
      let xT = "";
      const xx = x7 - x6 > 2000 ? 500 : x7 - x6 > 800 ? 200 : 100;
      for (let xm = Math.ceil(x6 / xx) * xx; xm <= x7; xm += xx) {
        xT += "<line x1=\"56\" x2=\"706\" y1=\"" + x9(xm) + "\" y2=\"" + x9(xm) + "\" stroke=\"#e6ecf3\"/><text x=\"48\" y=\"" + (x9(xm) + 4) + "\" font-size=\"11\" text-anchor=\"end\" fill=\"#7d8b99\">" + T7(xm) + "</text>";
      }
      const xO = x5 - x4 > 1500 ? 500 : x5 - x4 > 600 ? 200 : 100;
      for (let xN = Math.ceil(x4 / xO) * xO; xN <= x5; xN += xO) {
        xT += "<text x=\"" + x8(xN) + "\" y=\"" + (x1 - 34 + 18) + "\" font-size=\"11\" text-anchor=\"middle\" fill=\"#7d8b99\">" + xN.toLocaleString() + "</text>";
      }
      xT += "<rect x=\"56\" y=\"" + x9(TE.high) + "\" width=\"650\" height=\"" + (x9(TE.low) - x9(TE.high)) + "\" fill=\"rgba(107,192,99,.13)\"/>";
      if (Tv.sqft) {
        xT += "<line x1=\"" + x8(Tv.sqft) + "\" x2=\"" + x8(Tv.sqft) + "\" y1=\"12\" y2=\"" + (x1 - 34) + "\" stroke=\"" + T3 + "\" stroke-dasharray=\"3 3\"/>";
      }
      x0.forEach(xc => {
        xT += "<circle cx=\"" + x8(xc.sqft) + "\" cy=\"" + x9(xc.rent) + "\" r=\"5.5\" fill=\"" + (xc.beds === Tv.beds ? T0.NAVY : "#9fb2c7") + "\" stroke=\"#fff\" stroke-width=\"1.5\"/>";
      });
      if (Tv.sqft) {
        xT += "<path d=\"M" + x8(Tv.sqft) + " " + (x9(TE.estimate) - 9) + " l8 9 l-8 9 l-8 -9 z\" fill=\"" + T3 + "\" stroke=\"#fff\" stroke-width=\"2\"/>";
      }
      xT += "<text x=\"388\" y=\"" + (x1 - 4) + "\" font-size=\"11\" text-anchor=\"middle\" fill=\"#62666a\">Living area (sq ft)</text>";
      return "<h3 class=\"r-h3\">Rent versus size</h3><div class=\"r-chart\"><svg viewBox=\"0 0 720 " + x1 + "\" width=\"720\" height=\"" + x1 + "\" class=\"r-svg\" font-family=\"Arial, Helvetica, sans-serif\">" + xT + "</svg></div><p class=\"r-note\">Navy dots have the same bedroom count as the subject. The red diamond is our rent estimate and the green band the likely range.</p>";
    }(Tw, TZ.length));
    TW += TH(Tk, "Run the numbers", "" + To("Run the numbers") + TB("Rental calculator") + "<p class=\"r-lead\">Change any number and the results update. Taxes use a Florida post sale estimate that scales with price. Insurance is a placeholder until you have a real quote" + (Tb.floodZone ? "" : " and the flood zone") + ".</p>\n      <div class=\"r-presets\" data-preset=\"rent\">" + [["Asking", Tb.list], ["Our value", Tw.value.value], ["Investor price", Tw.value.investor ? Math.round((Tw.value.investor.low + Tw.value.investor.high) / 2) : null]].filter(TU => TU[1]).map(TU => "<button type=\"button\" data-v=\"" + TU[1] + "\">" + T5(TU[0]) + " " + T8(TU[1]) + "</button>").join("") + "<button type=\"button\" data-v=\"breakeven\">Break even</button></div>\n      <div class=\"r-calc\" data-calc=\"rental\"><div class=\"r-inputs\">" + Tn("price", Ti.price, "Purchase price") + Tn("rent", Ti.rent, "Monthly rent") + Tn("downPct", Ti.downInvest, "Down payment %") + Tn("rate", Ti.rates.invest, "Interest rate % (assumed)") + Tn("millage", Ti.millage, "Tax rate (mills)") + Tn("insYr", Ti.insYr + Ti.floodYr, "Insurance / yr") + Tn("hoaMo", Ti.hoaMo, "HOA / mo") + Tn("vacancyPct", Ti.vacancyPct, "Vacancy %") + Tn("mgmtPct", Ti.mgmtPct, "Management %") + Tn("repairsPct", Ti.repairsPct, "Repairs %") + Tn("capexPct", Ti.capexPct, "Capital reserve %") + Tn("closingPct", Ti.closingPct, "Buy side closing %") + "</div>\n      <div class=\"r-out\"><table class=\"r-t r-tight\" data-o=\"rows\"></table><div class=\"r-grid2\" data-o=\"tiles\"></div></div></div>\n      <div data-o=\"sens\" class=\"r-sensw\"></div>\n      <p class=\"r-note\">Cap rate is yearly income after expenses, before the mortgage, divided by price. DSCR is rent divided by principal, interest, taxes, insurance and HOA; most DSCR investor loans look for 1.0 to 1.25 or better.</p>");
    return TW;
  }
  function TD(Tw, Tk) {
    const Ti = Tk.d;
    const Tz = Tw.value;
    return TH(Tk, "Flip and BRRRR", "" + To("Run the numbers") + TB("Flip and BRRRR calculator") + "<p class=\"r-lead\">The repair budget is a placeholder based on condition. Replace it with real contractor quotes.</p>\n      <div class=\"r-presets\" data-preset=\"flip\">" + [["Asking", Tw.subject.list], ["Investor price", Ti.flipPrice], ["70% rule", Math.round(((Tz.arv || 0) * 0.7 - Ti.repairs) / 1000) * 1000]].filter(TZ => TZ[1] > 0).map(TZ => "<button type=\"button\" data-v=\"" + TZ[1] + "\">" + T5(TZ[0]) + " " + T8(TZ[1]) + "</button>").join("") + "</div>\n      <div class=\"r-calc\" data-calc=\"flip\"><div class=\"r-inputs\">" + Tn("price", Ti.flipPrice, "Purchase price") + Tn("repairs", Ti.repairs, "Repairs (placeholder)") + Tn("arv", Ti.arv, "After repair value") + Tn("closingPct", Ti.closingPct, "Buy side closing %") + Tn("holdMonths", Ti.holdMonths, "Months to renovate and sell") + Tn("holdMo", Ti.holdMo, "Holding cost / mo") + Tn("sellingPct", Ti.sellingPct, "Selling costs %") + Tn("refiLtv", Ti.refiLtv, "Refinance LTV % (BRRRR)") + Tn("rate", Ti.rates.invest, "Refinance rate %") + Tn("rent", Ti.rent, "Rent after rehab") + "</div>\n      <div class=\"r-out\"><table class=\"r-t r-tight\" data-o=\"rows\"></table><div class=\"r-grid2\" data-o=\"tiles\"></div></div></div>\n      <div data-o=\"sens\" class=\"r-sensw\"></div>\n      <p class=\"r-note\">The 70% rule is a common flip guideline: maximum offer equals 70% of after repair value minus repairs. BRRRR means buy, rehab, rent, refinance, repeat; cash left in the deal is what stays tied up after the refinance.</p>");
  }
  function TL(Tw, Tk) {
    const Ti = Tk.d;
    Tw.subject;
    const Tz = Tk.type === "investor";
    return TH(Tk, "Mortgage calculator", "" + To("Mortgage calculator") + TB(Tz ? "Financing the purchase" : "What it costs each month") + "<p class=\"r-lead\">Compare loan types side by side. Taxes use the Florida post sale estimate" + (Ti.hoaMo ? ", HOA is included" : "") + ", and insurance is a placeholder until you have a quote.</p>\n      <div class=\"r-calc\" data-calc=\"mortgage\"><div class=\"r-inputs\">" + Tn("price", Ti.price, "Purchase price") + Tn("conv", Ti.rates.conv, "Conventional rate %") + Tn("fha", Ti.rates.fha, "FHA rate %") + Tn("va", Ti.rates.va, "VA rate %") + Tn("invest", Ti.rates.invest, "Investor rate %") + Tn("millage", Ti.millage, "Tax rate (mills)") + Tn("insYr", Ti.insYr + Ti.floodYr, "Insurance / yr") + Tn("hoaMo", Ti.hoaMo, "HOA / mo") + Tn("convDown", 5, "Conventional down %") + Tn("closeFixed", 2800, "Lender and title fees") + "</div>\n      <div class=\"r-out wide\"><div class=\"r-scroll\"><table class=\"r-t r-cmp\" data-o=\"cmp\"></table></div><div class=\"r-2col\"><div data-o=\"donut\"></div><div data-o=\"afford\"></div></div></div></div>\n      <p class=\"r-note\">Estimates only, not a loan offer or a commitment to lend. " + (Ti.rateSource ? "Rates are " + T5(Ti.rateSource) + " averages" + (Ti.investNote ? ", investor rate is " + T5(Ti.investNote) : "") + "; your rate depends on credit, points and lock date, and they are not quotes." : "Rates shown are assumptions, not quotes.") + " The APR may be higher. FHA includes the 1.75% upfront premium financed and 0.50% to 0.55% annual premium; VA includes the first use funding fee; conventional mortgage insurance is estimated from loan to value and depends on credit. Florida charges doc stamps (0.35%) and intangible tax (0.2%) on the loan. Down payment assistance may be available for qualified buyers.</p>\n      " + (Tk.lo ? "<div class=\"r-locta\">" + Tl(Tk, false) + "<div><b>Get pre-approved before you shop.</b> Real numbers for your credit and savings, plus down payment assistance options for qualified buyers.</div></div>" : ""), {
      lo: true
    });
  }
  function TV(Tw, Tk) {
    const Ti = Tk.d;
    const Tz = Tw.value;
    const TZ = Tw.subject;
    return TH(Tk, "Seller net sheet", "" + To("Seller net sheet") + TB("What you walk away with") + "<p class=\"r-lead\">Estimated proceeds at three sale prices. Add your mortgage payoff for a true net. Florida sellers usually pay deed doc stamps (0.70%) and, in Northeast Florida, the owner's title policy.</p>\n      <div class=\"r-calc\" data-calc=\"net\"><div class=\"r-inputs\">" + Tn("low", Tz.low, "Low price") + Tn("value", Tz.value, "Likely price") + Tn("high", Tz.high, "High price") + Tn("listPct", Ti.listPct, "Listing side commission %") + Tn("buyerPct", Ti.buyerPct, "Buyer agent compensation %") + Tn("payoff", Ti.payoff, "Mortgage payoff") + Tn("concessions", Ti.concessions, "Seller concessions") + Tn("sellerRepairs", Ti.sellerRepairs, "Repairs or credits") + Tn("taxesYr", Math.round(TZ.taxes || X.flTaxes(Tz.value, Ti.millage, true)), "Current yearly taxes") + Tn("closeMonth", Ti.closeMonth, "Closing month (1 to 12)") + "</div>\n      <div class=\"r-out wide\"><table class=\"r-t r-cmp\" data-o=\"net\"></table><div class=\"r-2col\"><div data-o=\"bar\"></div><div data-o=\"next\"></div></div></div></div>\n      <p class=\"r-note\">Commissions are negotiable and not set by law. Buyer agent compensation, if any, is agreed between the parties. Taxes in Florida are paid in arrears, so the seller credits the buyer for the months already passed this year. Estimates only; your title company provides the final settlement statement.</p>");
  }
  function Te(Tw, Tk) {
    const Ti = Tk.profile;
    const Tz = Tk.type;
    const TZ = Tz === "seller" ? ["Walk the home together and confirm condition and updates.", "Choose a list price and launch date from the strategy page.", "Prep, photos and video. Most buyers decide in the first week online.", "Review offers side by side on net proceeds, not just price."] : Tz === "investor" ? ["Confirm rent with a quick look at active rentals nearby.", "Get contractor quotes to replace the repair placeholder.", "Get insurance and flood quotes; older Florida homes may need a 4-point.", "Talk financing: DSCR, conventional investor or cash out refinance."] : ["Get pre-approved so your offer is taken seriously.", "Tour the home and the comps that matter most.", "Write a strong offer with a clear inspection plan.", "Order insurance quotes the day you go under contract."];
    const Tb = "Sources: realMLS (Flexmls)" + (Tw.web && Tw.web.sources.length ? ", plus the county public record and real estate sites listed on the public record page for facts the MLS did not have" : "") + ". Sales: closed " + T5(Tw.search.sub) + ", " + (Tw.search.sizePct ? Math.round(Tw.search.sizePct * 100) + "% size band around " + T6(Tw.subject.sqft) + " sq ft" : "any size (living area unknown)") + ", within " + Tw.search.radius + " miles, closed in the last " + Tw.search.months + " months. Rents: closed residential leases within " + (Tw.rentRadius || 1.5) + " miles, last 12 months. Market statistics: realMLS monthly figures for ZIP " + T5(Tw.subject.zip || "") + ". Distances are straight line. Sale prices are adjusted net of reported seller concessions. " + (Tw.subject.inMls ? "Subject details come from MLS #" + T5(Tw.subject.id) + "." : "The subject is not in realMLS; facts come from " + (Tw.web ? "public records and real estate sites" : "the agent") + (Tw.subject.approxFrom ? " and location is approximated from a neighbor on the same street" : "") + ".") + " " + (Tk.d.rateSource ? "Interest rates are " + T5(Tk.d.rateSource) + " averages." : "Interest rates are assumptions.") + " Insurance, repairs, holding and selling costs are placeholders for your own quotes. Listing photos © NEFMLS. This comparative market analysis is not an appraisal and should not be relied on as one. All information deemed reliable but not guaranteed.";
    return TH(Tk, "Next steps", "" + To("Next steps") + TB("Let us make your move") + "<ol class=\"r-next\">" + TZ.map(Tp => "<li>" + T5(Tp) + "</li>").join("") + "</ol>\n      <div class=\"r-contact\">" + TM(Tk, true) + (Tk.lo ? Tl(Tk, true) : "") + "</div>" + (Ti.officeAddress ? "<p class=\"r-small\">Office: " + T5(Ti.officeAddress) + "</p>" : "") + "\n      <div class=\"r-notes\"><div class=\"r-tl\">Notes</div>" + "<div></div>".repeat(9) + "</div>\n      <div class=\"r-legal\">" + Tb + "<br><br>United Real Estate Gallery (Rayson Partners, LLC), Florida real estate brokerage license CQ1066513. iMath Group is a team at United Real Estate Gallery. Equal Housing Opportunity." + (Tk.lo ? "<br>Mortgage services: " + T5(Tk.lo.name) + ", NMLS #" + T5(Tk.lo.nmls) + ". Cornerstone First Mortgage, NMLS #173855, Florida Mortgage Lender License MLD1510. iMath Group is powered by Cornerstone First Mortgage. Equal Housing Lender. Not a commitment to lend; all loans subject to credit approval, underwriting guidelines and program availability. United Real Estate Gallery and Cornerstone First Mortgage are separate companies, and you are not required to use any particular lender." + (Tk.va ? " " + Tk.va : "") : "") + "</div>", {
      lo: !!Tk.lo
    });
  }
  const Tf = {
    seller: ["cover", "summary", "subject", "record", "map", "comps", "adjust", "tables", "market", "strategy", "net", "next"],
    buyer: ["cover", "summary", "subject", "record", "map", "comps", "adjust", "tables", "market", "strategy", "mortgage", "next"],
    investor: ["cover", "summary", "subject", "record", "map", "comps", "tables", "market", "rental", "flip", "mortgage", "next"],
    full: ["cover", "summary", "subject", "record", "map", "comps", "adjust", "tables", "market", "strategy", "rental", "flip", "mortgage", "net", "next"]
  };
  function TX(Tw) {
    const Tk = {};
    Tw.querySelectorAll("[data-calc]").forEach(Ti => {
      Tk[Ti.dataset.calc] = {};
      Ti.querySelectorAll("input[data-k]").forEach(Tz => Tk[Ti.dataset.calc][Tz.dataset.k] = Tz.value);
    });
    return Tk;
  }
  Q.iMathReport = {
    render: function (Tw, Tk) {
      (function (TW) {
        let TU = 1;
        TW.comps.slice().sort((TS, Tv) => (Tv.w || 0) - (TS.w || 0)).forEach(TS => {
          TS.num = TU++;
        });
      })(Tw);
      const Ti = {
        A: Tk.assets || {},
        profile: Tk.profile || {},
        lo: Tk.lo || null,
        va: Tk.va || "",
        type: Tk.type || "full",
        client: Tk.client || "",
        n: 0,
        toc: []
      };
      Ti.d = Object.assign(Tc(Tw), Tk.calc || {});
      if (Tk.calc && Tk.calc.rates) {
        Ti.d.rates = Object.assign(Tc(Tw).rates, Tk.calc.rates);
      }
      const Tz = {
        cover: TA,
        summary: TC,
        subject: TY,
        record: Tt,
        map: TI,
        comps: TR,
        adjust: Tr,
        tables: Tg,
        market: TQ,
        strategy: TJ,
        rental: TP,
        flip: TD,
        mortgage: TL,
        net: TV,
        next: Te
      };
      let TZ = (Tf[Ti.type] || Tf.full).map(TW => Tz[TW](Tw, Ti)).join("");
      const Tb = Math.ceil(Ti.toc.length / 3);
      const Tp = [0, 1, 2].map(TW => Ti.toc.slice(TW * Tb, TW * Tb + Tb)).filter(TW => TW.length);
      TZ = TZ.replace("<!--TOC-->", "<div class=\"r-tocg\">" + Tp.map(TW => "<ol>" + TW.map(TU => "<li><b>" + String(TU[1]).padStart(2, "0") + "</b><span>" + T5(TU[0]) + "</span></li>").join("") + "</ol>").join("") + "</div>");
      return {
        html: TZ,
        pages: Ti.n,
        d: Ti.d
      };
    },
    bind: function (Tw, Tk, Ti, Tz) {
      const TZ = Object.assign(Tc(Tk), Ti.calc || {});
      Tk.subject;
      const Tb = TS => {
        const Tv = {};
        TS.querySelectorAll("input[data-k]").forEach(TE => Tv[TE.dataset.k] = parseFloat(TE.value) || 0);
        return Tv;
      };
      const Tp = (TS, Tv, TE) => "<div class=\"r-tile sm" + (TE ? " t-" + TE : "") + "\"><div class=\"r-tl\">" + TS + "</div><div class=\"r-tv\">" + Tv + "</div></div>";
      const TW = {
        rental(TS) {
          const Tv = Tb(TS);
          const TE = {
            price: Tv.price,
            rent: Tv.rent,
            downPct: Tv.downPct,
            rate: Tv.rate,
            years: 30,
            taxesYr: X.flTaxes(Tv.price, Tv.millage, false),
            insYr: Tv.insYr,
            hoaMo: Tv.hoaMo,
            vacancyPct: Tv.vacancyPct,
            mgmtPct: Tv.mgmtPct,
            repairsPct: Tv.repairsPct,
            capexPct: Tv.capexPct,
            closingPct: Tv.closingPct
          };
          const x0 = X.rental(TE);
          const x1 = X.breakEvenPrice(Object.assign({}, TE, {
            taxRatePct: Tv.price ? TE.taxesYr / Tv.price * 100 : 1.5
          }));
          TS._be = x1;
          TS.querySelector("[data-o=rows]").innerHTML = [["Rent", x0.rent], ["Mortgage (P&I)", -x0.pi], ["Taxes (post sale est.)", -x0.tax], ["Insurance", -x0.ins], x0.hoa ? ["HOA", -x0.hoa] : null, ["Vacancy", -x0.vac], ["Management", -x0.mgmt], ["Repairs + capital reserve", -(x0.rep + x0.capex)]].filter(Boolean).map(x3 => "<tr><td>" + x3[0] + "</td><td class=\"n\">" + T7(x3[1]) + "</td></tr>").join("") + ("<tr class=\"tot\"><td>Monthly cash flow</td><td class=\"n " + (x0.cashFlow < 0 ? "neg" : "pos") + "\">" + T7(x0.cashFlow) + "</td></tr>");
          TS.querySelector("[data-o=tiles]").innerHTML = Tp("Cap rate", T9(x0.capRate), x0.capRate >= 6 ? "green" : x0.capRate < 4.5 ? "red" : "") + Tp("Cash on cash", T9(x0.coc), x0.coc >= 8 ? "green" : x0.coc < 0 ? "red" : "") + Tp("DSCR", x0.dscr.toFixed(2), x0.dscr >= 1.2 ? "green" : x0.dscr < 1 ? "red" : "") + Tp("Cash to close", T7(x0.cashIn)) + Tp("Break even price", T7(x1)) + Tp("Rent to price", T9(x0.onePct, 2), x0.onePct >= 1 ? "green" : "");
          const x2 = TS.nextElementSibling;
          if (x2 && x2.dataset.o === "sens") {
            const x3 = [-0.1, 0, 0.1].map(x6 => x6 ? Math.round(Tv.rent * (1 + x6) / 25) * 25 : Tv.rent);
            const x4 = [-0.05, 0, 0.05].map(x6 => x6 ? Math.round(Tv.price * (1 + x6) / 1000) * 1000 : Tv.price);
            const x5 = (x6, x7) => X.rental(Object.assign({}, TE, {
              price: x6,
              rent: x7,
              taxesYr: X.flTaxes(x6, Tv.millage, false)
            })).cashFlow;
            x2.innerHTML = "<h3 class=\"r-h3\">What if: monthly cash flow at other prices and rents</h3><table class=\"r-t r-sens\"><tr><th>Purchase price</th>" + x3.map((x6, x7) => "<th class=\"n\">" + ["Rent 10% lower", "Rent as entered", "Rent 10% higher"][x7] + "<br>" + T7(x6) + "/mo</th>").join("") + "</tr>" + x4.map((x6, x7) => "<tr class=\"" + (x7 === 1 ? "mid" : "") + "\"><td>" + T7(x6) + ["  (5% less)", "", "  (5% more)"][x7] + "</td>" + x3.map(x8 => {
              const x9 = x5(x6, x8);
              return "<td class=\"n " + (x9 < 0 ? "neg" : "pos") + "\">" + T7(x9) + "</td>";
            }).join("") + "</tr>").join("") + "</table>";
          }
        },
        flip(TS) {
          const Tv = Tb(TS);
          const TE = X.flip({
            price: Tv.price,
            repairs: Tv.repairs,
            arv: Tv.arv,
            closingPct: Tv.closingPct,
            holdMonths: Tv.holdMonths,
            holdMo: Tv.holdMo,
            sellingPct: Tv.sellingPct
          });
          const x0 = X.brrrr({
            price: Tv.price,
            closingPct: Tv.closingPct,
            repairs: Tv.repairs,
            holdMonths: Tv.holdMonths,
            holdMo: Tv.holdMo,
            arv: Tv.arv,
            refiLtv: Tv.refiLtv,
            rate: Tv.rate
          });
          const x1 = X.rental({
            price: Tv.arv,
            rent: Tv.rent,
            downPct: 100 - Tv.refiLtv,
            rate: Tv.rate,
            years: 30,
            taxesYr: X.flTaxes(Tv.arv, TZ.millage, false),
            insYr: TZ.insYr,
            hoaMo: TZ.hoaMo,
            vacancyPct: 5,
            mgmtPct: 10,
            repairsPct: 5,
            capexPct: 5
          });
          TS.querySelector("[data-o=rows]").innerHTML = [["Sale price (ARV)", TE.arv], ["Selling costs", -TE.sell], ["Purchase price", -TE.price], ["Buy side closing", -TE.buyClose], ["Repairs", -TE.rep], ["Holding (" + Tv.holdMonths + " mo)", -TE.hold]].map(x3 => "<tr><td>" + x3[0] + "</td><td class=\"n\">" + T7(x3[1]) + "</td></tr>").join("") + ("<tr class=\"tot\"><td>Estimated flip profit</td><td class=\"n " + (TE.profit < 0 ? "neg" : "pos") + "\">" + T7(TE.profit) + "</td></tr>");
          TS.querySelector("[data-o=tiles]").innerHTML = Tp("Return on cash", T9(TE.roi), TE.roi >= 15 ? "green" : TE.roi < 0 ? "red" : "") + Tp("70% rule max offer", T7(TE.mao70)) + Tp("BRRRR refinance loan", T7(x0.refiLoan)) + Tp("Cash left in the deal", T7(x0.cashLeft), x0.cashLeft <= 0 ? "green" : "") + Tp("Rent cash flow after refi", T7(x1.cashFlow) + "/mo", x1.cashFlow >= 0 ? "green" : "red") + Tp("Profit margin", T9(TE.margin), TE.margin >= 10 ? "green" : "");
          const x2 = TS.nextElementSibling;
          if (x2 && x2.dataset.o === "sens") {
            const x3 = [-0.05, 0, 0.05].map(x6 => x6 ? Math.round(Tv.arv * (1 + x6) / 1000) * 1000 : Tv.arv);
            const x4 = [-0.2, 0, 0.2].map(x6 => x6 ? Math.round(Tv.repairs * (1 + x6) / 500) * 500 : Tv.repairs);
            const x5 = (x6, x7) => X.flip({
              price: Tv.price,
              repairs: x7,
              arv: x6,
              closingPct: Tv.closingPct,
              holdMonths: Tv.holdMonths,
              holdMo: Tv.holdMo,
              sellingPct: Tv.sellingPct
            }).profit;
            x2.innerHTML = "<h3 class=\"r-h3\">What if: flip profit if the resale or repairs come in different</h3><table class=\"r-t r-sens\"><tr><th>Repairs</th>" + x3.map((x6, x7) => "<th class=\"n\">" + ["Resale 5% lower", "Resale as entered", "Resale 5% higher"][x7] + "<br>" + T7(x6) + "</th>").join("") + "</tr>" + x4.map((x6, x7) => "<tr class=\"" + (x7 === 1 ? "mid" : "") + "\"><td>" + T7(x6) + ["  (20% under)", "", "  (20% over)"][x7] + "</td>" + x3.map(x8 => {
              const x9 = x5(x8, x6);
              return "<td class=\"n " + (x9 < 0 ? "neg" : "pos") + "\">" + T7(x9) + "</td>";
            }).join("") + "</tr>").join("") + "</table>";
          }
        },
        mortgage(TS) {
          const Tv = Tb(TS);
          const TE = X.flTaxes(Tv.price, Tv.millage, true);
          const x0 = X.flTaxes(Tv.price, Tv.millage, false);
          const x1 = {
            price: Tv.price,
            years: 30,
            insYr: Tv.insYr,
            hoaMo: Tv.hoaMo
          };
          const x2 = [["Conventional " + Tv.convDown + "%", X.housing(Object.assign({}, x1, {
            program: "conv",
            downPct: Tv.convDown,
            rate: Tv.conv,
            taxesYr: TE
          }))], ["FHA 3.5%", X.housing(Object.assign({}, x1, {
            program: "fha",
            downPct: 3.5,
            rate: Tv.fha,
            taxesYr: TE
          }))], ["VA 0%", X.housing(Object.assign({}, x1, {
            program: "va",
            downPct: 0,
            rate: Tv.va,
            taxesYr: TE
          }))], ["20% down", X.housing(Object.assign({}, x1, {
            program: "conv",
            downPct: 20,
            rate: Tv.conv,
            taxesYr: TE
          }))], ["Investor 25%", X.housing(Object.assign({}, x1, {
            program: "invest",
            downPct: 25,
            rate: Tv.invest,
            taxesYr: x0
          }))]];
          const x3 = x2.map(([, xx]) => X.buyerClosing(Tv.price, xx.loan, {
            fixed: Tv.closeFixed
          }));
          const x4 = (xx, xO, xm) => "<tr class=\"" + (xm || "") + "\"><td>" + xx + "</td>" + x2.map((xN, xc) => "<td class=\"n\">" + xO(xN[1], xc) + "</td>").join("") + "</tr>";
          TS.querySelector("[data-o=cmp]").innerHTML = "<tr><th></th>" + x2.map(xx => "<th class=\"n\">" + xx[0] + "</th>").join("") + "</tr>" + x4("Down payment", xx => T7(xx.down)) + x4("Loan amount", xx => T7(xx.loan)) + x4("Rate (assumed)", xx => T9(xx.rate, 3)) + x4("Principal and interest", xx => T7(xx.pi)) + x4("Mortgage insurance", xx => xx.mi ? T7(xx.mi) : "None") + x4("Taxes (est.)", xx => T7(xx.tax)) + x4("Insurance", xx => T7(xx.ins)) + (Tv.hoaMo ? x4("HOA", xx => T7(xx.hoa)) : "") + x4("Total monthly", xx => "<b>" + T7(xx.total) + "</b>", "tot") + x4("Est. closing costs", (xx, xO) => T7(x3[xO].total)) + x4("Cash to close", (xx, xO) => "<b>" + T7(xx.down + x3[xO].total) + "</b>", "tot") + x4("Income to qualify (45% DTI)", xx => T7(xx.total / 0.45 * 12) + "/yr");
          const x5 = x2[1][1];
          const x6 = [["Principal and interest", x5.pi, T0.NAVY], ["Mortgage insurance", x5.mi, T1], ["Taxes", x5.tax, T0.GREEN_INK], ["Insurance", x5.ins, T2], ["HOA", x5.hoa, "#8a9ab0"]].filter(xx => xx[1] > 0);
          const x7 = x6.reduce((xx, xO) => xx + xO[1], 0);
          let x8 = -Math.PI / 2;
          let x9 = "";
          x6.forEach(xx => {
            const xO = x8 + xx[1] / x7 * Math.PI * 2;
            const xm = xO - x8 > Math.PI ? 1 : 0;
            x9 += "<path d=\"M" + (80 + Math.cos(x8) * 64) + " " + (80 + Math.sin(x8) * 64) + " A64 64 0 " + xm + " 1 " + (80 + Math.cos(xO) * 64) + " " + (80 + Math.sin(xO) * 64) + "\" stroke=\"" + xx[2] + "\" stroke-width=\"24\" fill=\"none\"/>";
            x8 = xO;
          });
          TS.querySelector("[data-o=donut]").innerHTML = "<h3 class=\"r-h3\">FHA payment breakdown</h3><div class=\"r-donut\"><svg viewBox=\"0 0 160 160\" width=\"128\" height=\"128\" font-family=\"Arial, Helvetica, sans-serif\">" + x9 + "<text x=\"80\" y=\"78\" text-anchor=\"middle\" font-size=\"18\" font-weight=\"800\" fill=\"" + T0.NAVY + "\">" + T7(x7) + "</text><text x=\"80\" y=\"96\" text-anchor=\"middle\" font-size=\"10\" fill=\"#62666a\">per month</text></svg><ul>" + x6.map(xx => "<li><i style=\"background:" + xx[2] + "\"></i>" + xx[0] + "<b>" + T7(xx[1]) + "</b></li>").join("") + "</ul></div>";
          const xT = Math.round(x2[1][1].total / 50) * 50;
          X.maxPrice(xT, {
            program: "fha",
            downPct: 3.5,
            rate: Tv.fha,
            years: 30,
            taxRatePct: Tv.millage * 0.085,
            insRatePct: Tv.insYr / Math.max(1, Tv.price) * 100,
            insMin: 0,
            hoaMo: Tv.hoaMo
          });
          TS.querySelector("[data-o=afford]").innerHTML = "<h3 class=\"r-h3\">Quick math</h3><table class=\"r-t r-tight\"><tr><td>Every $10,000 in price</td><td class=\"n\">about " + T7(X.housing({
            price: 10000,
            program: "conv",
            downPct: Tv.convDown,
            rate: Tv.conv,
            years: 30
          }).pi) + "/mo</td></tr><tr><td>Every 0.25% in rate (FHA)</td><td class=\"n\">about " + T7(X.housing(Object.assign({}, x1, {
            program: "fha",
            downPct: 3.5,
            rate: Tv.fha + 0.25,
            taxesYr: TE
          })).pi - x2[1][1].pi) + "/mo</td></tr><tr><td>Rent vs. FHA payment</td><td class=\"n\">" + (Tk.rent ? T7(Tk.rent.estimate) + " vs " + T7(x2[1][1].total) : "n/a") + "</td></tr></table>";
        },
        net(TS) {
          const Tv = Tb(TS);
          const TE = ["low", "value", "high"].map(x3 => X.sellerNet({
            price: Tv[x3],
            commissionPct: Tv.listPct,
            buyerAgentPct: Tv.buyerPct,
            payoff: Tv.payoff,
            concessions: Tv.concessions,
            repairs: Tv.sellerRepairs,
            taxesYr: Tv.taxesYr,
            closeMonth: Tv.closeMonth
          }));
          TS.querySelector("[data-o=net]").innerHTML = "<tr><th></th><th class=\"n\">Low</th><th class=\"n\">Likely</th><th class=\"n\">High</th></tr><tr><td>Sale price</td>" + TE.map(x3 => "<td class=\"n\"><b>" + T7(x3.price) + "</b></td>").join("") + "</tr>" + TE[0].items.map((x3, x4) => TE.some(x5 => x5.items[x4][1]) ? "<tr><td>" + x3[0] + "</td>" + TE.map(x5 => "<td class=\"n\">" + (x5.items[x4][1] ? "−" + T7(x5.items[x4][1]) : "n/a") + "</td>").join("") + "</tr>" : "").join("") + ("<tr class=\"tot\"><td>Estimated net to seller</td>" + TE.map(x3 => "<td class=\"n pos\">" + T7(x3.net) + "</td>").join("") + "</tr><tr><td>Net as % of price</td>" + TE.map(x3 => "<td class=\"n\">" + T9(x3.price ? x3.net / x3.price * 100 : 0, 1) + "</td>").join("") + "</tr>");
          const x0 = TE[1];
          const x1 = [T0.NAVY, T0.GREEN_INK, T1, T2, "#8a9ab0", "#2b5c8f", T3, "#b0bccb", "#5d6873", "#c9d6e4"];
          const x2 = x0.items.map((x3, x4) => [x3[0], x3[1], x1[x4 % x1.length]]).filter(x3 => x3[1] > 0);
          TS.querySelector("[data-o=bar]").innerHTML = "<h3 class=\"r-h3\">Where the money goes at " + T7(x0.price) + "</h3><div class=\"r-stack\"><i style=\"width:" + Math.max(0, x0.net / x0.price * 100).toFixed(1) + "%;background:" + T0.GREEN + "\"></i>" + x2.map(x3 => "<i style=\"width:" + (x3[1] / x0.price * 100).toFixed(2) + "%;background:" + x3[2] + "\"></i>").join("") + "</div><ul class=\"r-leg\"><li><i style=\"background:" + T0.GREEN + "\"></i>Net to you<b>" + T7(x0.net) + "</b></li>" + x2.map(x3 => "<li><i style=\"background:" + x3[2] + "\"></i>" + x3[0] + "<b>" + T7(x3[1]) + "</b></li>").join("") + "</ul>";
          TS.querySelector("[data-o=next]").innerHTML = "<h3 class=\"r-h3\">Your next move</h3>" + (Tv.payoff > 0 && x0.net > 0 ? "<p class=\"r-small\">With about <b>" + T7(x0.net) + "</b> in hand after closing:</p><table class=\"r-t r-tight\"><tr><td>20% down</td><td class=\"n\">a home near " + T8(x0.net / 0.235) + "</td></tr><tr><td>10% down</td><td class=\"n\">a home near " + T8(x0.net / 0.135) + "</td></tr><tr><td>5% down</td><td class=\"n\">a home near " + T8(x0.net / 0.085) + "</td></tr></table><p class=\"r-note\">Allows about 3.5% of the price for buyer closing costs and prepaids. Keep a cash cushion for moving and reserves.</p>" : "<p class=\"r-small\">Enter your mortgage payoff above to see what your equity could buy next.</p>");
        }
      };
      const TU = TS => {
        try {
          if (TW[TS.dataset.calc]) {
            TW[TS.dataset.calc](TS);
          }
        } catch (Tv) {}
      };
      Tw.querySelectorAll("[data-calc]").forEach(TS => {
        TU(TS);
        TS.addEventListener("input", () => {
          TU(TS);
          if (Tz) {
            Tz(TX(Tw));
          }
        });
      });
      Tw.querySelectorAll(".r-presets").forEach(TS => {
        TS.addEventListener("click", Tv => {
          const TE = Tv.target.closest("button");
          if (!TE) {
            return;
          }
          const x0 = TS.nextElementSibling;
          const x1 = x0.querySelector("input[data-k=price]");
          let x2 = TE.dataset.v;
          if (x2 === "breakeven") {
            x2 = x0._be || x1.value;
          }
          x1.value = x2;
          TU(x0);
          TS.querySelectorAll("button").forEach(x3 => x3.classList.toggle("on", x3 === TE));
          if (Tz) {
            Tz(TX(Tw));
          }
        });
      });
    },
    snapshot: TX,
    restore: function (Tw, Tk) {
      if (Tk) {
        Tw.querySelectorAll("[data-calc]").forEach(Ti => {
          const Tz = Tk[Ti.dataset.calc];
          if (Tz) {
            Ti.querySelectorAll("input[data-k]").forEach(TZ => {
              if (Tz[TZ.dataset.k] != null) {
                TZ.value = Tz[TZ.dataset.k];
              }
            });
          }
        });
      }
    },
    defaults: Tc,
    fit: function (Tw) {
      let Tk = false;
      Tw.querySelectorAll(".r-cover").forEach(Ti => {
        const Tz = Ti.querySelector(".r-hero");
        const TZ = Ti.querySelector(".r-toc");
        const Tb = Ti.querySelector(".r-cfine");
        if (!Tz || !TZ || !Tb) {
          return;
        }
        Tz.style.height = "";
        TZ.classList.remove("tight");
        const Tp = () => TZ.getBoundingClientRect().bottom > Tb.getBoundingClientRect().top - Ti.getBoundingClientRect().height / 1056 * 8;
        let TW = Tz.getBoundingClientRect().height / (Ti.getBoundingClientRect().height / 1056);
        while (Tp() && TW > 250) {
          TW -= 12;
          Tz.style.height = TW + "px";
          Tk = true;
        }
        if (Tp()) {
          TZ.classList.add("tight");
          Tk = true;
        }
      });
      return Tk;
    },
    PAGES: Tf,
    CAT: T4
  };
})(typeof window != "undefined" ? window : globalThis);
