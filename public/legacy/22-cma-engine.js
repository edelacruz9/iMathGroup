/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (Z) {
  const J = ["A", "B", "C", "D", "E", "F"];
  const V = ["Active", "Active Under Contract", "Coming Soon", "Pending", "Closed", "Expired", "Withdrawn", "Cancelled"];
  const X = ["Active", "Active Under Contract", "Coming Soon", "Pending"];
  const K = "ListingId,ListingKey,UnparsedAddress,StreetNumber,StreetName,MlsStatus,PropertyType,PropertySubType,ListPrice,OriginalListPrice,ClosePrice,CloseDate,ListingContractDate,BedsTotal,BathsTotal,BathsFull,BathsHalf,LivingArea,YearBuilt,LotSizeAcres,Latitude,Longitude,PostalCode,City,SubdivisionName,DaysOnMarket,CumulativeDaysOnMarket,PublicRemarks,GarageSpaces,PoolFeatures,Sewer,WaterSource,Roof,ConcessionsAmount,BuyerFinancing,PhotosCount,StatusChangeTimestamp";
  const G = K + ",TaxAmount,TaxYear,CountyOrParish,GarageYN,ParkingFeatures,Heating,Cooling,ConstructionMaterials,Stories,WaterFrontYN,WaterfrontFeatures,AssociationFee,AssociationFeeFrequency,ElementarySchool,MiddleOrJuniorSchool,HighSchool,ParcelNumber,Flooring,Appliances,InteriorFeatures,PriceChangeTimestamp,\"Location Tax and Legal\"";
  const W = {
    ave: "Avenue",
    av: "Avenue",
    avenue: "Avenue",
    st: "Street",
    str: "Street",
    street: "Street",
    dr: "Drive",
    drive: "Drive",
    rd: "Road",
    road: "Road",
    blvd: "Boulevard",
    boulevard: "Boulevard",
    ln: "Lane",
    lane: "Lane",
    ct: "Court",
    court: "Court",
    cir: "Circle",
    circle: "Circle",
    pl: "Place",
    place: "Place",
    pkwy: "Parkway",
    parkway: "Parkway",
    ter: "Terrace",
    terr: "Terrace",
    terrace: "Terrace",
    trl: "Trail",
    trail: "Trail",
    way: "Way",
    hwy: "Highway",
    highway: "Highway",
    loop: "Loop",
    run: "Run",
    pt: "Point",
    point: "Point",
    cv: "Cove",
    cove: "Cove",
    xing: "Crossing",
    crossing: "Crossing",
    sq: "Square",
    row: "Row",
    walk: "Walk",
    path: "Path",
    pass: "Pass",
    bnd: "Bend",
    bend: "Bend",
    holw: "Hollow",
    lndg: "Landing",
    landing: "Landing"
  };
  const Y = {
    Avenue: "Ave",
    Street: "St",
    Drive: "Dr",
    Road: "Rd",
    Boulevard: "Blvd",
    Lane: "Ln",
    Court: "Ct",
    Circle: "Cir",
    Place: "Pl",
    Parkway: "Pkwy",
    Terrace: "Ter",
    Trail: "Trl",
    Highway: "Hwy",
    Point: "Pt",
    Cove: "Cv",
    Crossing: "Xing",
    Square: "Sq",
    Landing: "Lndg",
    Bend: "Bnd"
  };
  const U = ZV => "'" + String(ZV).replace(/'/g, "''") + "'";
  function Q(ZV) {
    const ZN = String(ZV || "").trim().replace(/\s+/g, " ");
    if (/^#?\s*\d{6,9}$/.test(ZN)) {
      return {
        mls: ZN.replace(/\D/g, "")
      };
    }
    const ZX = ZN.match(/\b(\d{5})(?:-\d{4})?\s*$/) || ZN.match(/,\s*[A-Za-z .]*\b(\d{5})\b/);
    const ZA = ZX ? ZX[1] : "";
    const ZK = ZN.split(",");
    let Zw = ZK[0].trim();
    let ZT = ZK.length > 1 ? ZK[1].trim().replace(/\b(FL|Florida)\b.*$/i, "").trim() : "";
    let ZI = "";
    const Ze = Zw.match(/\s(?:#|apt\.?|unit|ste\.?|suite)\s*([\w-]+)$/i);
    if (Ze) {
      ZI = Ze[1];
      Zw = Zw.slice(0, Ze.index).trim();
    }
    if (!ZX && ZK.length === 1) {
      const ZW = Zw.match(/\s(\d{5})$/);
      if (ZW) {
        Zw = Zw.slice(0, ZW.index).trim();
      }
    }
    let Zv = Zw.split(" ");
    if (ZK.length === 1) {
      Zv = Zv.filter(ZH => !/^(FL|Florida)$/i.test(ZH));
    }
    const Zb = /^\d+[A-Za-z]?$/.test(Zv[0]) ? Zv[0] : "";
    let ZB = Zb ? Zv.slice(1) : Zv.slice();
    let Zo = "";
    let ZM = "";
    let Zh = -1;
    for (let ZH = ZB.length - 1; ZH >= 1; ZH--) {
      if (W[ZB[ZH].toLowerCase().replace(/\.$/, "")]) {
        Zh = ZH;
        break;
      }
    }
    if (Zh > 0) {
      const ZR = ZB.slice(Zh + 1);
      Zo = W[ZB[Zh].toLowerCase().replace(/\.$/, "")];
      if (ZR.length && /^(N|S|E|W|NE|NW|SE|SW|North|South|East|West)$/i.test(ZR[0])) {
        ZM = ZR[0].length <= 2 ? ZR[0].toUpperCase() : ZR[0].charAt(0).toUpperCase();
        ZR.shift();
      }
      if (ZR.length && !ZT) {
        ZT = ZR.join(" ").replace(/\s*\d{5}(-\d{4})?$/, "").trim();
      }
      ZB = ZB.slice(0, Zh);
    }
    const ZG = ZB.join(" ");
    const ZE = [Zb, ZG, Zo, ZM].filter(Boolean).join(" ");
    Zw = [Zb, ZG, Zh > 0 ? Zv[(Zb ? 1 : 0) + Zh] : "", ZM].filter(Boolean).join(" ");
    return {
      raw: ZN,
      num: Zb,
      street: ZG,
      suffix: Zo,
      unit: ZI,
      zip: ZA,
      city: ZT,
      line: Zw,
      expanded: ZE
    };
  }
  const Z0 = ZV => String(ZV || "").toLowerCase().replace(/\b(north|south|east|west|n|s|e|w)\b/g, "").replace(/(\d+)(st|nd|rd|th)\b/g, "$1").replace(/[^a-z0-9]/g, "");
  const Z1 = ZV => ZV == null || ZV === "" ? null : +ZV;
  const Z2 = ZV => ZV && typeof ZV == "object" ? Object.keys(ZV).filter(ZN => ZV[ZN]) : [];
  function Z3(ZV) {
    if (!ZV) {
      return "";
    }
    let ZN = String(ZV).split(",")[0].trim();
    ZN = ZN.replace(/\b([A-Z][A-Z'.-]+)\b/g, ZX => ZX.charAt(0) + ZX.slice(1).toLowerCase()).replace(/\b(\d+)(ST|ND|RD|TH)\b/gi, (ZX, ZA, ZK) => ZA + ZK.toLowerCase());
    return ZN.replace(/\b(Avenue|Street|Drive|Road|Boulevard|Lane|Court|Circle|Place|Parkway|Terrace|Trail|Highway|Point|Cove|Crossing|Square|Landing|Bend)\b/g, ZX => Y[ZX] || ZX).replace(/\s+(N|S|E|W|Ne|Nw|Se|Sw)$/, (ZX, ZA) => " " + ZA.toUpperCase());
  }
  function Z4(ZV) {
    return String(ZV || "").replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "").replace(/\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, "").replace(/https?:\/\/\S+|www\.\S+/gi, "").replace(/\s+/g, " ").trim();
  }
  function Z5(ZV, ZN) {
    if (ZV && typeof ZV == "object") {
      if (Array.isArray(ZV)) {
        for (const ZX of ZV) {
          const ZA = Z5(ZX, ZN);
          if (ZA !== undefined) {
            return ZA;
          }
        }
      } else {
        if (ZN in ZV && typeof ZV[ZN] != "object") {
          return ZV[ZN];
        }
        for (const ZK of Object.keys(ZV)) {
          const Zw = Z5(ZV[ZK], ZN);
          if (Zw !== undefined) {
            return Zw;
          }
        }
      }
    }
  }
  function Z6(ZV, ZN, ZX, ZA) {
    if ([ZV, ZN, ZX, ZA].some(Ze => Ze == null || isNaN(Ze))) {
      return null;
    }
    const ZK = Math.PI / 180;
    const Zw = (ZX - ZV) * ZK;
    const ZT = (ZA - ZN) * ZK;
    const ZI = Math.sin(Zw / 2) ** 2 + Math.cos(ZV * ZK) * Math.cos(ZX * ZK) * Math.sin(ZT / 2) ** 2;
    return Math.asin(Math.sqrt(ZI)) * 7917.6;
  }
  const Z7 = ZV => {
    const ZN = ZV.filter(ZA => ZA != null && !isNaN(ZA)).sort((ZA, ZK) => ZA - ZK);
    if (!ZN.length) {
      return null;
    }
    const ZX = Math.floor(ZN.length / 2);
    if (ZN.length % 2) {
      return ZN[ZX];
    } else {
      return (ZN[ZX - 1] + ZN[ZX]) / 2;
    }
  };
  function Z8(ZV, ZN) {
    const ZX = ZV.filter(Zw => Zw[1] > 0 && Zw[0] != null).sort((Zw, ZT) => Zw[0] - ZT[0]);
    const ZA = ZX.reduce((Zw, ZT) => Zw + ZT[1], 0);
    if (!ZA) {
      return null;
    }
    let ZK = 0;
    for (const [Zw, ZT] of ZX) {
      ZK += ZT;
      if (ZK / ZA >= ZN) {
        return Zw;
      }
    }
    return ZX[ZX.length - 1][0];
  }
  function Z9(ZV, ZN, ZX) {
    const ZA = ZV.StandardFields || ZV;
    const ZK = Z1(ZA.ClosePrice);
    const Zw = Z1(ZA.ConcessionsAmount) || 0;
    const ZT = Z1(ZA.LivingArea);
    const ZI = Z4(ZA.PublicRemarks);
    const Ze = {
      id: ZA.ListingId,
      key: ZA.ListingKey || ZV.Id,
      full: ZA.UnparsedAddress || "",
      addr: Z3(ZA.UnparsedAddress),
      status: ZA.MlsStatus,
      type: ZA.PropertyType,
      subtype: ZA.PropertySubType,
      list: Z1(ZA.ListPrice),
      origList: Z1(ZA.OriginalListPrice),
      close: ZK,
      closeDate: ZA.CloseDate || null,
      listDate: ZA.ListingContractDate || null,
      concessions: Zw,
      net: ZK != null ? ZK - Zw : null,
      beds: Z1(ZA.BedsTotal),
      baths: Z1(ZA.BathsTotal),
      bf: Z1(ZA.BathsFull),
      bh: Z1(ZA.BathsHalf) || 0,
      sqft: ZT,
      year: Z1(ZA.YearBuilt),
      lot: Z1(ZA.LotSizeAcres),
      lat: Z1(ZA.Latitude),
      lon: Z1(ZA.Longitude),
      zip: ZA.PostalCode,
      city: ZA.City,
      subdivision: ZA.SubdivisionName,
      dom: Z1(ZA.DaysOnMarket),
      cdom: Z1(ZA.CumulativeDaysOnMarket),
      garage: Z1(ZA.GarageSpaces) || 0,
      pool: Z2(ZA.PoolFeatures).some(Zv => !/none|community/i.test(Zv)),
      sewer: Z2(ZA.Sewer),
      water: Z2(ZA.WaterSource),
      roof: Z2(ZA.Roof),
      financing: Z2(ZA.BuyerFinancing),
      remarks: ZI,
      photos: Z1(ZA.PhotosCount) || 0,
      raw: ZA,
      custom: ZV.CustomFields
    };
    if (Ze.bf == null && Ze.baths != null) {
      Ze.bf = Math.floor(Ze.baths);
    }
    Ze.price = Ze.net ?? Ze.list;
    Ze.ppsf = Ze.price && ZT ? Ze.price / ZT : null;
    if (ZX) {
      Ze.dist = Z6(ZX.lat, ZX.lon, Ze.lat, Ze.lon);
    }
    Ze.ago = ((Zv, Zb) => Zv ? (Zb - new Date(Zv + "T12:00:00")) / 2630016000 : null)(Ze.closeDate, ZN);
    return Ze;
  }
  const ZZ = {
    asis: /\b(as[- ]is|investor special|investors? (take|welcome|opportunity)|cash only|tenant[- ]occupied|tenants? in place|long[- ]term tenant|needs (tlc|work|updat|repair|renovat)|handyman|fixer|tlc\b|wholesale|estate sale|bring your contractor|sweat equity|probate|flip opportunity|seller makes no repairs|value[- ]add)\b/i,
    updated: /\b(renovated|remodel(ed)?|fully updated|completely updated|totally updated|updated (kitchen|bath|throughout)|new (kitchen|cabinets|countertops|flooring|lvp|appliances)|quartz|granite|move[- ]in ready|turn[- ]?key|like new|brand[- ]new (roof|hvac|ac)|rehab(bed)?|lvp\b|luxury vinyl)\b/i,
    newc: /\b(new construction|brand[- ]new construction|to be built|under construction|builder (incentive|warranty)|new build)\b/i
  };
  function Zn(ZV, ZN) {
    const ZX = ZV.match(new RegExp("(" + ZN + ")[^.;]{0,28}?\\b(19[5-9]\\d|20[0-3]\\d)\\b", "i")) || ZV.match(new RegExp("\\b(19[5-9]\\d|20[0-3]\\d)\\s+(" + ZN + ")", "i"));
    if (!ZX) {
      return null;
    }
    const ZA = +(ZX[2] && /^\d{4}$/.test(ZX[2]) ? ZX[2] : ZX[1]);
    if (ZA > 1950 && ZA < 2040) {
      return ZA;
    } else {
      return null;
    }
  }
  function Zz(ZV) {
    const ZN = ZV.remarks || "";
    const ZX = [];
    const ZA = Zn(ZN, "roof");
    if (ZA) {
      ZX.push("roof " + ZA);
    } else if (/\bnew roof\b/i.test(ZN)) {
      ZX.push("new roof");
    }
    const ZK = Zn(ZN, "hvac|a\\/c|ac unit|air conditioning|\\bac\\b");
    if (ZK) {
      ZX.push("HVAC " + ZK);
    } else if (/\bnew (hvac|a\/c|ac)\b/i.test(ZN)) {
      ZX.push("new HVAC");
    }
    if (/\b(quartz|granite)\b/i.test(ZN)) {
      ZX.push(/quartz/i.test(ZN) ? "quartz counters" : "granite counters");
    }
    if (/\b(lvp|luxury vinyl)\b/i.test(ZN)) {
      ZX.push("LVP floors");
    }
    if (/\b(new|updated|replaced) (electric|electrical|wiring|panel)\b/i.test(ZN) || Zn(ZN, "electric")) {
      ZX.push("updated electric");
    }
    if (/\b(new|updated|re-?)plumb/i.test(ZN)) {
      ZX.push("updated plumbing");
    }
    if (/\bmultiple offers\b/i.test(ZN)) {
      ZX.push("multiple offers");
    }
    if (/\btenant/i.test(ZN)) {
      ZX.push("tenant occupied");
    }
    if (/\bcash only\b/i.test(ZN)) {
      ZX.push("cash only");
    }
    if (/\b(adu|mother[- ]in[- ]law|guest (house|suite)|detached (studio|apartment))\b/i.test(ZN)) {
      ZX.push("ADU or guest unit");
    }
    if (/\b(down payment assistance|dpa)\b/i.test(ZN)) {
      ZX.push("buyer assistance offered");
    }
    if (ZV.garage) {
      ZX.push(ZV.garage + "-car garage");
    }
    if (ZV.pool) {
      ZX.push("pool");
    }
    if (ZV.sewer.some(Zw => /septic/i.test(Zw))) {
      ZX.push("septic");
    }
    if (ZV.water.some(Zw => /well/i.test(Zw))) {
      ZX.push("well water");
    }
    return ZX;
  }
  function ZO(ZV, ZN, ZX) {
    const ZA = ZV.remarks || "";
    if (ZV.year && ZV.year >= ZN - 2 || ZZ.newc.test(ZA)) {
      return "new";
    }
    const ZK = ZV.financing.some(Zw => /cash/i.test(Zw));
    if (ZZ.asis.test(ZA) || ZV.ppsf && ZX && ZV.ppsf < ZX * 0.7 && ZK || ZV.ppsf && ZX && ZV.ppsf < ZX * 0.6) {
      return "asis";
    } else if (ZZ.updated.test(ZA) || /\bnew roof\b/i.test(ZA) && /\b(new|updated) (hvac|kitchen|flooring)/i.test(ZA)) {
      return "updated";
    } else {
      return "standard";
    }
  }
  function Zi(ZV, ZN) {
    const ZX = [];
    const ZA = Zz(ZV).slice(0, 4);
    const ZK = ZV.close && ZV.list ? ZV.close / ZV.list : null;
    const Zw = ZV.close && ZV.origList ? ZV.close / ZV.origList : null;
    if (ZV.cat === "asis") {
      ZX.push("Sold as-is or to an investor");
    } else if (ZV.cat === "new") {
      ZX.push("New construction");
    } else if (ZV.cat === "updated") {
      ZX.push("Updated when sold");
    }
    if (ZA.length) {
      ZX.push(ZA.join(", "));
    }
    if (Zw && Zw < 0.95) {
      ZX.push(Math.round((1 - Zw) * 100) + "% under the original ask");
    } else if (ZK && ZK > 1.005) {
      ZX.push("sold over list");
    }
    if (ZV.concessions > 0) {
      ZX.push("$" + Math.round(ZV.concessions).toLocaleString() + " in seller concessions (netted out)");
    }
    if (ZV.dom != null && ZV.dom <= 10) {
      ZX.push("went under contract in " + ZV.dom + " days");
    }
    let ZT = ZX.join(". ").replace(/\.\s*([a-z])/g, (ZI, Ze) => ". " + Ze.toUpperCase());
    ZT &&= ZT.charAt(0).toUpperCase() + ZT.slice(1) + ".";
    return ZT;
  }
  const Zj = {
    updated: {
      updated: 1,
      standard: 0.55,
      new: 0.2,
      asis: 0
    },
    average: {
      standard: 1,
      updated: 0.7,
      asis: 0.25,
      new: 0.1
    },
    needs: {
      asis: 1,
      standard: 0.35,
      updated: 0,
      new: 0
    }
  };
  function Zd(ZV, ZN) {
    const ZX = ZN.filter(ZT => ZT.price && ZT.sqft);
    const ZA = Z7(ZX.map(ZT => ZT.price)) || 0;
    const ZK = Z7(ZX.map(ZT => ZT.ppsf)) || 0;
    const Zw = {
      gla: Math.max(20, ZK * 0.45),
      fullBath: Math.max(3000, ZA * 0.025),
      halfBath: Math.max(1500, ZA * 0.0125),
      bed: ZA * 0.012,
      garage: ZA * 0.02,
      pool: ZA * 0.04,
      agePct: 0.0025,
      lotPerAcre: ZA * 0.08
    };
    ZN.forEach(ZT => {
      const ZI = [];
      if (!ZT.price) {
        ZT.adj = [];
        ZT.adjusted = null;
        return;
      }
      if (ZV.sqft && ZT.sqft) {
        ZI.push(["Size", (ZV.sqft - ZT.sqft) * Zw.gla]);
      }
      if (ZV.bf != null && ZT.bf != null) {
        ZI.push(["Full baths", (ZV.bf - ZT.bf) * Zw.fullBath]);
      }
      if (ZV.bh != null && ZT.bh != null && ZV.bh !== ZT.bh) {
        ZI.push(["Half baths", (ZV.bh - ZT.bh) * Zw.halfBath]);
      }
      if (ZV.beds != null && ZT.beds != null && ZV.beds !== ZT.beds) {
        ZI.push(["Bedrooms", (ZV.beds - ZT.beds) * Zw.bed]);
      }
      const Ze = Math.min(2, ZV.garage || 0);
      const Zv = Math.min(2, ZT.garage || 0);
      if (Ze !== Zv) {
        ZI.push(["Garage", (Ze - Zv) * Zw.garage]);
      }
      if (!!ZV.pool != !!ZT.pool) {
        ZI.push(["Pool", (ZV.pool ? 1 : -1) * Zw.pool]);
      }
      if (ZV.year && ZT.year && ZT.cat !== "new") {
        const ZB = Math.max(-40, Math.min(40, ZV.year - ZT.year));
        if (Math.abs(ZB) >= 5) {
          ZI.push(["Age", Math.max(-0.08, Math.min(0.08, ZB * Zw.agePct)) * ZT.price]);
        }
      }
      if (ZV.lot && ZT.lot) {
        const Zo = ZV.lot - ZT.lot;
        if (Math.abs(Zo) >= 0.1) {
          ZI.push(["Lot", Math.max(-0.06, Math.min(0.06, Zo * 0.08)) * ZA]);
        }
      }
      ZT.adj = ZI.map(([ZM, Zh]) => [ZM, Math.round(Zh / 50) * 50]).filter(ZM => ZM[1] !== 0);
      const Zb = ZT.adj.reduce((ZM, Zh) => ZM + Zh[1], 0);
      ZT.adjusted = ZT.price + Zb;
      ZT.gross = ZT.adj.reduce((ZM, Zh) => ZM + Math.abs(Zh[1]), 0) / ZT.price;
    });
    return {
      mPrice: ZA,
      mPpsf: ZK,
      K: Zw
    };
  }
  const Zg = (ZV, ZN) => {
    if (ZV == null) {
      return null;
    }
    const ZX = ZV >= 1000000 ? 10000 : ZV >= 400000 ? 5000 : 1000;
    return Math.round(ZV / ZX) * ZX;
  };
  function Zx(ZV, ZN, ZX) {
    (function (ZW, ZH, ZR) {
      const ZY = Zj[ZR] || Zj.average;
      ZH.forEach(Zy => {
        if (!Zy.use || Zy.adjusted == null) {
          Zy.w = 0;
          return;
        }
        const Zr = Zy.ago == null ? 0.8 : Math.max(0.35, 1 - Zy.ago / 12 * 0.55);
        const ZU = Zy.dist == null ? 0.6 : 1 / (1 + Zy.dist * 1.2);
        const ZP = ZW.sqft && Zy.sqft ? Math.max(0.2, 1 - Math.abs(ZW.sqft - Zy.sqft) / ZW.sqft * 1.4) : 0.6;
        const Zl = 1 / (1 + (Zy.gross || 0) * 3);
        Zy.w = (ZY[Zy.cat] || 0) * Zr * ZU * ZP * Zl;
      });
    })(ZV, ZN, ZX);
    const ZA = ZN.filter(ZW => ZW.w > 0).map(ZW => [ZW.adjusted, ZW.w]);
    const ZK = Z8(ZA, 0.5);
    const Zw = Z8(ZA, 0.25);
    const ZT = Z8(ZA, 0.75);
    const ZI = {
      value: Zg(ZK),
      low: null,
      high: null,
      used: ZA.length
    };
    if (ZK) {
      const ZW = Math.max(ZK * 0.03, ((ZT || ZK) - (Zw || ZK)) / 2);
      ZI.low = Zg(Math.min(Zw || ZK, ZK - ZW));
      ZI.high = Zg(Math.max(ZT || ZK, ZK + ZW));
    }
    const Ze = ZN.filter(ZH => ZH.use && ZH.cat === "updated" && ZH.adjusted);
    const Zv = Ze.map(ZH => [ZH.adjusted, Math.max(0.05, ZH.w || 0.3)]);
    ZI.arv = Ze.length >= 2 ? Zg(Z8(Zv, 0.6)) : ZK ? Zg(ZK * (ZX === "needs" ? 1.3 : 1.06)) : null;
    ZI.arvLow = Ze.length >= 2 ? Zg(Z8(Zv, 0.35)) : null;
    ZI.arvHigh = Ze.length >= 2 ? Zg(Z8(Zv, 0.85)) : null;
    ZI.arvBasis = Ze.length;
    const Zb = ZN.filter(ZH => ZH.use && ZH.cat === "asis" && ZH.price);
    ZI.investor = Zb.length >= 2 ? {
      low: Zg(Z8(Zb.map(ZH => [ZH.price, 1]), 0.2)),
      high: Zg(Z8(Zb.map(ZH => [ZH.price, 1]), 0.85)),
      n: Zb.length
    } : null;
    const ZB = ZN.filter(ZH => ZH.use && ZH.cat === "new" && ZH.price);
    ZI.newBuild = ZB.length ? {
      low: Zg(Math.min(...ZB.map(ZH => ZH.price))),
      high: Zg(Math.max(...ZB.map(ZH => ZH.price))),
      n: ZB.length
    } : null;
    const Zo = ZN.filter(ZH => ZH.w > 0);
    const ZM = ZK && ZT && Zw ? (ZT - Zw) / ZK : 1;
    const Zh = Z7(Zo.map(ZH => ZH.dist || 0)) || 0;
    const ZG = Zo.length;
    let ZE = 0;
    ZE += ZG >= 6 ? 2 : ZG >= 3 ? 1 : 0;
    ZE += ZM < 0.08 ? 2 : ZM < 0.16 ? 1 : 0;
    ZE += Zh < 0.6 ? 1 : 0;
    ZE += Z7(Zo.map(ZH => ZH.ago || 0)) < 4 ? 1 : 0;
    ZI.confidence = ZE >= 5 ? "High" : ZE >= 3 ? "Moderate" : "Limited";
    ZI.spread = ZM;
    ZI.medianDist = Zh;
    return ZI;
  }
  function ZC(ZV, ZN) {
    const ZX = ZN.filter(Zh => Zh.rent);
    if (!ZX.length) {
      return null;
    }
    const ZA = ZX.filter(Zh => ZV.beds == null || Zh.beds === ZV.beds);
    const ZK = Z7(ZX.filter(Zh => Zh.sqft).map(Zh => Zh.rent / Zh.sqft));
    const Zw = ZV.sqft && ZK ? ZV.sqft * ZK : null;
    const ZT = Z7((ZA.length >= 3 ? ZA : ZX).map(Zh => Zh.rent));
    const ZI = Zw && ZT ? (Zw + ZT) / 2 : Zw || ZT;
    const Ze = (ZA.length >= 3 ? ZA : ZX).map(Zh => Zh.rent).sort((Zh, ZG) => Zh - ZG);
    const Zv = Ze[Math.floor(Ze.length * 0.25)];
    const Zb = Ze[Math.min(Ze.length - 1, Math.floor(Ze.length * 0.75))];
    let ZB = null;
    let Zo = 1000000000;
    ZX.forEach(Zh => {
      const ZG = (Zh.sqft && ZV.sqft ? Math.abs(Zh.sqft - ZV.sqft) / ZV.sqft : 0.5) * 2 + (Zh.dist || 1) + (ZV.year && Zh.year ? Math.abs(ZV.year - Zh.year) / 40 : 0.5) + (Zh.beds === ZV.beds ? 0 : 1);
      if (ZG < Zo) {
        Zo = ZG;
        ZB = Zh;
      }
    });
    const ZM = Math.round(ZI / 25) * 25;
    return {
      estimate: ZM,
      low: Math.min(Zv, Math.round(ZM * 0.95 / 25) * 25),
      high: Math.max(Zb, Math.round(ZM * 1.05 / 25) * 25),
      perSf: ZK,
      n: ZX.length,
      twin: ZB
    };
  }
  function Zm(ZV) {
    if (!ZV) {
      return null;
    }
    const ZN = {};
    const ZX = ZA => ZA && ZA.length ? +ZA[0] : null;
    if (ZV.price) {
      ZN.medianSold = ZX(ZV.price.SoldMedianSoldPrice);
      ZN.medianSoldYoY = ZV.price.SoldMedianSoldPrice ? Z7(ZV.price.SoldMedianSoldPrice.slice(0, 3).map(Number)) / Z7(ZV.price.SoldMedianSoldPrice.slice(9, 12).map(Number)) - 1 : null;
      ZN.medianList = ZX(ZV.price.ActiveMedianListPrice);
      ZN.series = {
        dates: ZV.price.Dates,
        sold: (ZV.price.SoldMedianSoldPrice || []).map(Number)
      };
    }
    if (ZV.dom) {
      ZN.dom = ZX(ZV.dom.AverageDom);
      ZN.cdom = ZX(ZV.dom.AverageCdom);
      ZN.domSeries = (ZV.dom.AverageDom || []).map(Number);
    }
    if (ZV.ratio) {
      ZN.saleToList = ZX(ZV.ratio.SaleToListPriceRatio);
      ZN.saleToOrig = ZX(ZV.ratio.SaleToOriginalListPriceRatio);
    }
    if (ZV.abs) {
      ZN.monthsSupply = ZX(ZV.abs.AbsorptionRate);
      ZN.supplySeries = (ZV.abs.AbsorptionRate || []).map(Number);
    }
    if (ZV.inv) {
      ZN.active = ZX(ZV.inv.ActiveListings);
      ZN.sold = ZX(ZV.inv.SoldListings);
      ZN.pended = ZX(ZV.inv.PendedListings);
      ZN.newL = ZX(ZV.inv.NewListings);
      ZN.inv = ZV.inv;
    }
    if (ZN.monthsSupply != null) {
      ZN.kind = ZN.monthsSupply < 4 ? "Seller's market" : ZN.monthsSupply <= 6 ? "Balanced market" : "Buyer's market";
    }
    return ZN;
  }
  function Zf(ZV) {
    const ZN = ZV.filter(ZI => ZI.use && ZI.close && ZI.list);
    if (!ZN.length) {
      return null;
    }
    const ZX = Z7(ZN.map(ZI => ZI.close / ZI.list));
    const ZA = Z7(ZN.filter(ZI => ZI.origList).map(ZI => ZI.close / ZI.origList));
    const ZK = Z7(ZN.map(ZI => ZI.dom).filter(ZI => ZI != null));
    const Zw = ZN.filter(ZI => ZI.origList && ZI.close >= ZI.origList * 0.98);
    const ZT = ZN.filter(ZI => ZI.origList && ZI.close < ZI.origList * 0.98);
    return {
      n: ZN.length,
      ratio: ZX,
      ratioO: ZA,
      dom: ZK,
      overList: ZN.filter(ZI => ZI.close > ZI.list).length / ZN.length,
      domAtList: Z7(Zw.map(ZI => ZI.dom)),
      domCut: Z7(ZT.map(ZI => ZI.dom)),
      nAtList: Zw.length,
      nCut: ZT.length,
      conc: Z7(ZN.filter(ZI => ZI.concessions > 0).map(ZI => ZI.concessions / ZI.close)),
      concShare: ZN.filter(ZI => ZI.concessions > 0).length / ZN.length,
      financing: ZN.reduce((ZI, Ze) => {
        (Ze.financing.length ? Ze.financing : ["Unknown"]).forEach(Zv => {
          ZI[Zv] = (ZI[Zv] || 0) + 1;
        });
        return ZI;
      }, {})
    };
  }
  function Zt(ZV, ZN) {
    const ZX = [];
    const ZA = ZV.floodZone;
    if (ZV.status && /pending|under contract/i.test(ZV.status)) {
      ZX.push(["warn", "Already under contract", "This home is " + ZV.status.toLowerCase() + ". A buyer can only write a backup offer right now."]);
    }
    if (ZV.sewer.some(Zw => /septic/i.test(Zw))) {
      ZX.push(["warn", "Septic system", "Budget for a septic inspection and pump out. Ask when it was last serviced."]);
    }
    if (ZV.water.some(Zw => /well/i.test(Zw))) {
      ZX.push(["warn", "Private well", "Order a water quality test. Many lenders require one."]);
    }
    if (ZA) {
      if (/^(A|AE|AH|AO|V|VE)/i.test(ZA)) {
        ZX.push(["warn", "Flood zone " + ZA, "A lender will require flood insurance. Get a quote early."]);
      } else {
        ZX.push(["ok", "Flood zone " + ZA, "Outside the high risk FEMA zones. Flood insurance is optional but worth a quote."]);
      }
    } else {
      ZX.push(["info", "Flood zone not listed", "Confirm the FEMA flood zone before writing an offer. It drives insurance cost."]);
    }
    if (ZV.year && ZV.year < 1978) {
      ZX.push(["info", "Built before 1978", "A lead based paint disclosure is required for the sale."]);
    }
    if (ZV.year && ZN - ZV.year >= 25) {
      ZX.push(["info", ZN - ZV.year + " years old", "Florida insurers usually ask for a 4-point inspection. A wind mitigation report can lower the premium."]);
    }
    const ZK = Zn(ZV.remarks || "", "roof");
    if (ZV.roof.some(Zw => /shingle/i.test(Zw)) && !ZK) {
      ZX.push(["info", "Roof age not listed", "Shingle roof with no install year in the listing. Insurers care about roofs past about 15 years."]);
    } else if (ZK && ZN - ZK >= 15) {
      ZX.push(["warn", "Roof from " + ZK, "An older roof can make insurance harder or more expensive in Florida."]);
    }
    if (ZV.hoa) {
      ZX.push(["info", "HOA dues", "About $" + Math.round(ZV.hoaMonthly).toLocaleString() + " a month. Included in the payment below."]);
    }
    if (/manufactured|mobile/i.test(ZV.subtype || "")) {
      ZX.push(["warn", "Manufactured home", "Financing and insurance options are more limited. Confirm the foundation and title."]);
    }
    if (ZV.origList && ZV.list && ZV.list < ZV.origList) {
      ZX.push(["info", "Price reduced", "Down " + Math.round((1 - ZV.list / ZV.origList) * 100) + "% from the original $" + ZV.origList.toLocaleString() + "."]);
    }
    if (ZV.garage === 0 && !ZV.carport) {
      ZX.push(["info", "No garage", "Street or driveway parking only."]);
    }
    if (ZZ.asis.test(ZV.remarks || "")) {
      ZX.push(["warn", "Listed as-is", "Plan on inspections and a repair budget. Some loan types need repairs done before closing."]);
    }
    return ZX;
  }
  const ZL = {
    beds: [0, 20],
    baths: [0, 20],
    bathsFull: [0, 20],
    bathsHalf: [0, 10],
    sqft: [200, 30000],
    year: [1800, 2030],
    lot: [0.005, 2000],
    garage: [0, 12],
    stories: [1, 6],
    taxes: [0, 250000],
    taxYear: [2000, 2030],
    hoaMonthly: [0, 5000],
    lat: [17, 72],
    lon: [-180, -60],
    millage: [5, 40],
    assessed: [1000, 50000000],
    justValue: [1000, 50000000],
    lastSalePrice: [1000, 50000000]
  };
  const Za = (ZV, ZN) => {
    const ZX = typeof ZN == "string" ? parseFloat(ZN.replace(/[$,\s]/g, "")) : ZN;
    if (ZX == null || isNaN(ZX)) {
      return null;
    }
    const ZA = ZL[ZV];
    if (ZA && (ZX < ZA[0] || ZX > ZA[1])) {
      return null;
    } else {
      return +ZX;
    }
  };
  function Zp(ZV, ZN, ZX, ZA, ZK) {
    const Zw = ZN.facts || {};
    const ZT = ZN.factSources || {};
    const ZI = ZH => Z4(String(ZT[ZH] || ZN.primarySource || "Online record")).slice(0, 60);
    if (!ZK && ZN.matchedAddress && ZV.addr) {
      const ZH = String(ZV.addr).match(/^\d+/);
      if (ZH && !String(ZN.matchedAddress).includes(ZH[0])) {
        return "mismatch";
      }
    }
    const Ze = [];
    const Zv = (ZR, ZY, Zy) => {
      const Zr = Zy || ZR;
      if (ZY != null) {
        if (ZV[Zr] == null || ZV[Zr] === "" || Zr === "garage" && !ZX.garage) {
          ZV[Zr] = ZY;
          ZX[Zr] = ZI(ZR);
        } else if (typeof ZY == "number" && typeof ZV[Zr] == "number" && ZV[Zr] && Math.abs(ZY - ZV[Zr]) / ZV[Zr] > 0.03) {
          Ze.push([Zr, ZV[Zr], ZY, ZI(ZR)]);
        }
      }
    };
    ["beds", "sqft", "year", "lot", "garage", "stories", "taxes", "taxYear"].forEach(ZR => Zv(ZR, Za(ZR, Zw[ZR])));
    let Zb = Za("baths", Zw.baths);
    const ZB = Za("bathsFull", Zw.bathsFull);
    const Zo = Za("bathsHalf", Zw.bathsHalf);
    if (Zb == null && ZB != null) {
      Zb = ZB + (Zo ? Zo * 0.5 : 0);
    }
    if (Zb != null) {
      const ZR = ZV.baths != null;
      Zv("baths", Zb);
      if (!ZR) {
        ZV.bf = ZB ?? Math.floor(Zb);
        ZV.bh = Zo ?? (Zb % 1 >= 0.5 ? 1 : 0);
      }
    }
    if (typeof Zw.pool == "boolean" && ZV.pool == null) {
      ZV.pool = Zw.pool;
      ZX.pool = ZI("pool");
    }
    ["floodZone", "subdivision", "county", "parcel"].forEach(ZY => {
      if (Zw[ZY] && typeof Zw[ZY] == "string" && Zw[ZY].length < 80 && !ZV[ZY]) {
        ZV[ZY] = Zw[ZY].trim();
        ZX[ZY] = ZI(ZY);
      }
    });
    const ZM = Za("hoaMonthly", Zw.hoaMonthly);
    if (ZM != null && !ZV.hoaRaw) {
      ZV.hoaRaw = ZM;
      ZV.hoaFreq = "Monthly";
      ZX.hoaRaw = ZI("hoaMonthly");
    }
    const Zh = Za("lat", Zw.lat);
    const ZG = Za("lon", Zw.lon);
    if (!ZV.lat && Zh != null && ZG != null) {
      ZV.lat = Zh;
      ZV.lon = ZG;
      ZV.geoFrom = ZI("lat");
    }
    const ZE = ZN.record || {};
    const ZW = {
      assessed: Za("assessed", ZE.assessedValue),
      sourceClean: true,
      justValue: Za("justValue", ZE.justValue),
      valueYear: Za("taxYear", ZE.valueYear),
      millage: Za("millage", ZE.millage),
      homestead: typeof ZE.homestead == "boolean" ? ZE.homestead : null,
      source: ZE.source ? Z4(String(ZE.source)).slice(0, 60) : null,
      sales: (Array.isArray(ZE.sales) ? ZE.sales : []).map(ZY => ({
        date: /^\d{4}-\d{2}(-\d{2})?$/.test(String(ZY.date || "")) ? String(ZY.date) : null,
        price: Za("lastSalePrice", ZY.price)
      })).filter(ZY => ZY.date && ZY.price).slice(0, 8)
    };
    if (ZW.assessed || ZW.justValue || ZW.millage || ZW.sales.length) {
      ZV.record = ZW;
    }
    if (ZV.record && ZV.record.sales.length && !ZV.lastSale) {
      const ZY = ZV.record.sales.slice().sort((Zy, Zr) => Zr.date.localeCompare(Zy.date))[0];
      ZV.lastSale = {
        price: ZY.price,
        date: ZY.date,
        source: ZW.source || "Public record"
      };
    }
    ZA.web = {
      sources: (Array.isArray(ZN.sources) ? ZN.sources : []).filter(Zy => Zy && /^https?:\/\//.test(Zy.url || "")).slice(0, 12).map(Zy => ({
        name: Z4(String(Zy.name || "")).slice(0, 60),
        url: String(Zy.url).slice(0, 200)
      })),
      conflicts: Ze,
      notFound: Array.isArray(ZN.notFound) ? ZN.notFound.slice(0, 12) : [],
      checked: ZN.checked || []
    };
  }
  async function ZD(ZV, ZN, ZX, ZA, ZK, Zw, ZT, ZI) {
    const Ze = {
      _filter: ZN,
      property_type_codes: ZX,
      status_values: ZA,
      _select: ZK,
      _limit: Zw || 25
    };
    if (ZT && ZT > 1) {
      Ze._page = ZT;
    }
    if (ZI) {
      Ze._orderby = ZI;
    }
    const Zv = await ZV("ListingsListingSearch", Ze);
    if (Zv && Zv.results) {
      return Zv;
    } else {
      return {
        results: [],
        total_entries: 0,
        total_pages: 0
      };
    }
  }
  async function ZJ(ZV, ZN, ZX, ZA, ZK, Zw, ZT) {
    const ZI = [];
    let Ze = 1;
    let Zv = 1;
    do {
      const Zb = await ZD(ZV, ZN, ZX, ZA, ZK, 25, Ze, ZT);
      ZI.push(...Zb.results);
      Zv = Zb.total_pages || 1;
      Ze++;
    } while (Ze <= Math.min(Zv, Zw || 3));
    return ZI;
  }
  const Zc = {
    FIRST: "1ST",
    SECOND: "2ND",
    THIRD: "3RD",
    FOURTH: "4TH",
    FIFTH: "5TH",
    SIXTH: "6TH",
    SEVENTH: "7TH",
    EIGHTH: "8TH",
    NINTH: "9TH",
    TENTH: "10TH",
    ELEVENTH: "11TH",
    TWELFTH: "12TH"
  };
  function Zq(ZV) {
    const ZN = String(ZV || "").toUpperCase().replace(/[.,#]/g, " ").replace(/\s+/g, " ").replace(/^(N|S|E|W|NE|NW|SE|SW|NORTH|SOUTH|EAST|WEST)\s+/, "").trim();
    if (!ZN) {
      return [];
    }
    const ZX = ZN.split(" ");
    const ZA = {};
    Object.keys(Zc).forEach(ZT => ZA[Zc[ZT]] = ZT);
    const ZK = new Set([ZN, ZX.map(ZT => Zc[ZT] || ZT).join(" "), ZX.map(ZT => ZA[ZT] || ZT).join(" ")]);
    const Zw = ZX.map(ZT => Zc[ZT] || ZT).filter(ZT => !/^(ST|AVE|RD|DR|LN|CT|BLVD|WAY|CIR|PL|TER|TRL)$/.test(ZT)).sort((ZT, ZI) => ZI.length - ZT.length)[0];
    if (Zw && Zw.length >= 3) {
      ZK.add(Zw);
    }
    return [...ZK].filter(Boolean).slice(0, 4);
  }
  function ZF(ZV) {
    const ZN = new Map();
    ZV.forEach(ZX => {
      ZK = ZX.StandardFields || {};
      const ZA = String(ZK.UnparsedAddress || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      var ZK;
      if (!ZN.has(ZA)) {
        ZN.set(ZA, []);
      }
      ZN.get(ZA).push(ZX);
    });
    return [...ZN.values()];
  }
  async function Zs(ZV, ZN, ZX) {
    if (ZN.mls) {
      const ZT = await ZD(ZV, "ListingId Eq " + U(ZN.mls), J, V, G, 5);
      return {
        records: ZT.results,
        how: ZT.results.length ? "mls" : "mls_missing",
        groups: ZF(ZT.results)
      };
    }
    if (!ZN.num || !ZN.street) {
      return {
        records: [],
        how: "unreadable",
        groups: []
      };
    }
    const ZA = [ZN.line, ZN.expanded].filter((ZI, Ze, Zv) => ZI && Zv.indexOf(ZI) === Ze);
    for (const ZI of ZA) {
      let Ze = (await ZD(ZV, "StreetAddress Eq " + U(ZI), J, V, G, 25, 1, "-ListingContractDate")).results;
      if (ZN.zip) {
        const Zv = Ze.filter(Zb => (Zb.StandardFields || {}).PostalCode === ZN.zip);
        if (Zv.length) {
          Ze = Zv;
        }
      }
      if (Ze.length) {
        const Zb = ZF(Ze);
        return {
          records: Zb[0],
          how: "address",
          groups: Zb
        };
      }
    }
    ZX("Trying a looser address match");
    const ZK = [];
    for (const ZB of Zq(ZN.street)) {
      for (const Zo of ZN.zip ? [true, false] : [false]) {
        (await ZD(ZV, "StreetNumber Eq " + U(ZN.num) + " And StreetName Eq contains(" + U(ZB) + ")" + (Zo ? " And PostalCode Eq " + U(ZN.zip) : ZN.city ? " And City Eq " + U(ZN.city) : ""), J, V, G, 25, 1, "-ListingContractDate")).results.forEach(ZM => {
          if (!ZK.some(Zh => Zh.Id === ZM.Id)) {
            ZK.push(ZM);
          }
        });
        if (ZK.length) {
          break;
        }
      }
      if (ZK.length) {
        break;
      }
    }
    const Zw = ZF(ZK);
    return {
      records: Zw.length === 1 ? Zw[0] : [],
      how: Zw.length ? "fuzzy" : "none",
      groups: Zw
    };
  }
  async function Zk(ZV, ZN, ZX) {
    const ZA = [];
    try {
      const ZK = await ZV("ListingsListPhotos", {
        listing_key: ZN
      });
      const Zw = (ZK && ZK.photos || []).slice().sort((ZI, Ze) => (Ze.Primary ? 1 : 0) - (ZI.Primary ? 1 : 0));
      const ZT = [Zw[0]];
      ["Kitchen", "Living Room", "Family Room", "Primary Bedroom", "Bathroom", "Back of Structure"].forEach(ZI => {
        if (ZT.length < ZX) {
          const Ze = Zw.find(Zv => Zv && !ZT.includes(Zv) && Zv.Tags && (Zv.Tags.Room || []).includes(ZI));
          if (Ze) {
            ZT.push(Ze);
          }
        }
      });
      Zw.forEach(ZI => {
        if (ZT.length < ZX && ZI && !ZT.includes(ZI)) {
          ZT.push(ZI);
        }
      });
      for (const ZI of ZT.filter(Boolean).slice(0, ZX)) {
        try {
          const Ze = await ZV("ListingsShowPhoto", {
            listing_key: ZN,
            photo_id: ZI.Id
          }, {
            raw: true
          });
          const Zv = Ze && Ze.content && Ze.content.find(Zb => Zb.type === "image");
          if (Zv) {
            const Zb = ZI.Tags && ZI.Tags.Room && ZI.Tags.Room.find(Zo => !/undetermined|other/i.test(Zo)) || "";
            const ZB = /virtual/i.test(ZI.Caption || "");
            ZA.push({
              src: "data:" + (Zv.mimeType || "image/jpeg") + ";base64," + Zv.data,
              room: ZB ? Zb ? Zb + " | virtually staged" : "Virtually staged" : Zb
            });
          }
        } catch (Zo) {}
      }
    } catch (ZM) {}
    return ZA;
  }
  Z.iMathCMA = {
    run: async function (ZV, ZN, ZX) {
      const ZA = n0 => ZX && ZX(n0);
      const ZK = ZN.now ? new Date(ZN.now) : new Date();
      const Zw = ZK.getFullYear();
      let ZT = Q(ZN.address);
      if (ZN.zip && !ZT.zip) {
        ZT.zip = String(ZN.zip).trim();
      }
      const ZI = {
        input: ZN,
        parsed: ZT,
        when: ZK.toISOString(),
        warnings: [],
        errors: {},
        asked: []
      };
      const Ze = async n0 => ZN.ask ? (ZI.asked.push(n0.id), ZA(n0.title), ZN.ask(n0)) : null;
      ZA("Finding the property in realMLS");
      let Zv = await Zs(ZV, ZT, ZA);
      for (let n0 = 0; n0 < 2 && (Zv.how === "unreadable" || Zv.how === "mls_missing"); n0++) {
        const n1 = await Ze({
          id: "address",
          title: Zv.how === "mls_missing" ? "That MLS number was not found" : "We could not read that address",
          text: Zv.how === "mls_missing" ? "No listing has MLS #" + ZT.mls + ". Type the property address instead." : "Type the full address with the house number, street, city and ZIP.",
          input: {
            type: "text",
            placeholder: "1234 Main St, Jacksonville, FL 32207",
            value: ZN.address
          },
          skip: "Stop"
        });
        if (!n1 || !n1.value) {
          break;
        }
        ZT = Q(n1.value);
        if (ZN.zip && !ZT.zip) {
          ZT.zip = String(ZN.zip).trim();
        }
        ZI.parsed = ZT;
        Zv = await Zs(ZV, ZT, ZA);
      }
      if (Zv.groups && Zv.groups.length > 1 && !Zv.records.length) {
        const n2 = Zv.groups.slice(0, 6);
        const n3 = await Ze({
          id: "pick",
          title: "Which property did you mean?",
          text: "A few MLS records are close to what you typed. Pick the right one.",
          choices: n2.map((n4, n5) => {
            const n6 = n4[0].StandardFields || {};
            return {
              label: Z3(n6.UnparsedAddress) + (n6.City ? ", " + n6.City : "") + (n6.PostalCode ? " " + n6.PostalCode : ""),
              sub: "" + (n6.MlsStatus || "") + (n6.ListingId ? " | MLS " + n6.ListingId : ""),
              value: n5
            };
          }).concat([{
            label: "None of these",
            sub: "Treat it as a home that is not in the MLS",
            value: -1
          }])
        });
        Zv.records = n3 && n3.choice != null && +n3.choice >= 0 ? n2[+n3.choice] : [];
        if (!n3 && n2.length) {
          ZI.warnings.push("More than one MLS record matched the address. The closest match was used; check it is the right home.");
          Zv.records = n2[0];
        }
      }
      if (Zv.records.length) {
        const n4 = Zv.records[0].StandardFields || {};
        if (ZT.zip && n4.PostalCode && n4.PostalCode !== ZT.zip) {
          ZI.warnings.push("The MLS has this address in ZIP " + n4.PostalCode + ", not " + ZT.zip + ". The MLS ZIP was used.");
        }
      }
      let Zb = Zv.records.map(n5 => Z9(n5, ZK));
      Zb.sort((n5, n6) => String(n6.listDate || "").localeCompare(String(n5.listDate || "")));
      const ZB = Zb.filter(n5 => n5.type !== "F")[0] || Zb[0] || null;
      let Zo;
      if (ZB) {
        Zo = ZB;
        const n5 = ZB.raw;
        Zo.taxes = Z1(n5.TaxAmount);
        Zo.taxYear = Z1(n5.TaxYear);
        Zo.county = n5.CountyOrParish;
        Zo.hoaRaw = Z1(n5.AssociationFee);
        Zo.hoaFreq = n5.AssociationFeeFrequency;
        Zo.floodZone = Z5(ZB.custom, "Flood Zone") || null;
        Zo.legal = Z5(ZB.custom, "Tax Legal Description") || null;
        Zo.parcel = n5.ParcelNumber;
        Zo.schools = [n5.ElementarySchool, n5.MiddleOrJuniorSchool, n5.HighSchool];
        Zo.heating = Z2(n5.Heating);
        Zo.cooling = Z2(n5.Cooling);
        Zo.construction = Z2(n5.ConstructionMaterials);
        Zo.stories = Z1(n5.Stories);
        Zo.parking = Z2(n5.ParkingFeatures);
        Zo.flooring = Z2(n5.Flooring);
        Zo.waterfront = n5.WaterFrontYN ? Z2(n5.WaterfrontFeatures) : [];
        Zo.carport = Zo.parking.some(n6 => /carport/i.test(n6));
        Zo.inMls = true;
      } else {
        Zo = {
          inMls: false,
          addr: Z3(ZT.expanded || ZT.raw),
          full: ZT.raw,
          sewer: [],
          water: [],
          roof: [],
          financing: [],
          remarks: "",
          zip: ZT.zip,
          status: "Not in MLS"
        };
      }
      const ZM = ZI.sources = {};
      const Zh = ["beds", "baths", "sqft", "year", "lot", "garage", "pool", "stories", "taxes", "taxYear", "floodZone", "subdivision", "county", "parcel", "hoaRaw"];
      if (Zo.inMls) {
        Zh.forEach(n6 => {
          if (Zo[n6] != null && Zo[n6] !== "" && (n6 !== "garage" || Zo[n6] !== 0 || !!Zo.raw.GarageSpaces || Zo.raw.GarageSpaces === 0)) {
            ZM[n6] = "MLS";
          }
        });
      }
      const ZG = ZN.manual || {};
      ["beds", "baths", "sqft", "year", "lot", "garage"].forEach(n6 => {
        if (ZG[n6] !== undefined && ZG[n6] !== "" && ZG[n6] !== null) {
          Zo[n6] = +ZG[n6];
          ZM[n6] = "Agent";
        }
      });
      if (ZG.pool !== undefined && ZG.pool !== "") {
        Zo.pool = !!ZG.pool;
        ZM.pool = "Agent";
      }
      if (ZG.baths !== undefined && ZG.baths !== "") {
        Zo.bf = Math.floor(+ZG.baths);
        Zo.bh = +ZG.baths % 1 >= 0.5 ? 1 : 0;
      }
      if (ZN.enrich) {
        ZA("Checking public records and real estate sites");
        try {
          const n6 = await ZN.enrich({
            address: Zo.inMls && Zo.full || ZT.raw,
            line: ZT.line,
            zip: ZT.zip || Zo.zip || "",
            city: ZT.city || Zo.city || "",
            inMls: !!Zo.inMls,
            have: Zh.filter(n7 => ZM[n7])
          }, ZA);
          if (n6 && Zp(Zo, n6, ZM, ZI) === "mismatch") {
            const n7 = await Ze({
              id: "webmatch",
              title: "Is this the same home?",
              text: "The online records found were for " + n6.matchedAddress + ". You entered " + (Zo.addr || ZT.raw) + ".",
              choices: [{
                label: "Yes, same home",
                value: 1
              }, {
                label: "No, ignore those records",
                value: 0
              }]
            });
            if (n7 && +n7.choice === 1) {
              Zp(Zo, n6, ZM, ZI, true);
            } else {
              ZI.warnings.push("Online records were for a different address, so they were not used.");
            }
          }
        } catch (n8) {
          ZI.errors.web = n8;
          if (!n8 || n8.code !== "cancelled") {
            ZI.warnings.push("The online lookup did not finish, so only realMLS data was used.");
          }
        }
      }
      if (!Zo.lat) {
        ZA("Locating the property");
        const n9 = (nO, ni) => {
          Zo.lat = nO.lat;
          Zo.lon = nO.lon;
          Zo.approxFrom = ni || nO.from;
          Zo.zip = Zo.zip || nO.zip;
          return true;
        };
        const nZ = async () => {
          const nO = await async function (ni, nj) {
            if (!nj.zip && !nj.city || !nj.street) {
              return null;
            }
            let nd = {
              results: []
            };
            for (const nC of Zq(nj.street)) {
              nd = await ZD(ni, "StreetName Eq contains(" + U(nC) + ")" + (nj.zip ? " And PostalCode Eq " + U(nj.zip) : " And City Eq " + U(nj.city)), ["A"], V, "ListingId,UnparsedAddress,StreetNumber,Latitude,Longitude,PostalCode", 25);
              if (nd.results.length) {
                break;
              }
            }
            let ng = null;
            let nx = 1000000000000;
            nd.results.forEach(nm => {
              const nf = nm.StandardFields || {};
              const nt = Math.abs((+nf.StreetNumber || 0) - (+nj.num || 0));
              if (nf.Latitude && nt < nx) {
                nx = nt;
                ng = nf;
              }
            });
            if (ng) {
              return {
                lat: +ng.Latitude,
                lon: +ng.Longitude,
                from: Z3(ng.UnparsedAddress),
                gap: nx,
                zip: ng.PostalCode
              };
            } else {
              return null;
            }
          }(ZV, ZT);
          if (nO) {
            return n9(nO);
          }
          if (ZT.zip) {
            const ni = await async function (nj, nd) {
              if (!/^\d{5}$/.test(nd || "")) {
                return null;
              }
              const ng = (await ZD(nj, "PostalCode Eq " + U(nd) + " And CloseDate Ge months(-12)", ["A"], ["Closed"], "ListingId,Latitude,Longitude,City", 25)).results.map(nx => nx.StandardFields || {}).filter(nx => nx.Latitude && nx.Longitude);
              if (ng.length) {
                return {
                  lat: Z7(ng.map(nx => +nx.Latitude)),
                  lon: Z7(ng.map(nx => +nx.Longitude)),
                  city: ng[0].City,
                  n: ng.length
                };
              } else {
                return null;
              }
            }(ZV, ZT.zip);
            if (ni) {
              Zo.lat = ni.lat;
              Zo.lon = ni.lon;
              Zo.approxZip = ZT.zip;
              Zo.city = Zo.city || ni.city;
              return true;
            }
          }
          if (ZT.city) {
            const nj = await async function (nd, ng) {
              if (!ng) {
                return null;
              }
              const nx = (await ZD(nd, "City Eq " + U(ng) + " And CloseDate Ge months(-12)", ["A"], ["Closed"], "ListingId,Latitude,Longitude", 25)).results.map(nC => nC.StandardFields || {}).filter(nC => nC.Latitude);
              if (nx.length) {
                return {
                  lat: Z7(nx.map(nC => +nC.Latitude)),
                  lon: Z7(nx.map(nC => +nC.Longitude))
                };
              } else {
                return null;
              }
            }(ZV, ZT.city);
            if (nj) {
              Zo.lat = nj.lat;
              Zo.lon = nj.lon;
              Zo.approxCity = ZT.city;
              return true;
            }
          }
          return false;
        };
        let nn = await nZ();
        let nz = "";
        for (let nO = 0; !nn && nO < 3; nO++) {
          const ni = await Ze({
            id: "locate",
            title: "Help us find this home on the map",
            text: (nz ? nz + " " : "") + "Type any one of these: the 5 digit ZIP code, the city, or the MLS number or address of a home nearby.",
            input: {
              type: "text",
              placeholder: "32208, or Jacksonville, or 2159620",
              value: ""
            },
            skip: "Stop"
          });
          const nj = ni && String(ni.value || "").trim();
          if (!nj) {
            break;
          }
          if (/^\d{5}$/.test(nj)) {
            ZT.zip = nj;
            Zo.zip = Zo.zip || nj;
            nn = await nZ();
            if (!nn) {
              nz = "No homes in ZIP " + nj + " were found in realMLS.";
            }
          } else if (/^#?\d{6,9}$/.test(nj)) {
            const nd = (await ZD(ZV, "ListingId Eq " + U(nj.replace("#", "")), J, V, "ListingId,UnparsedAddress,Latitude,Longitude,PostalCode", 3)).results.map(ng => ng.StandardFields || {}).find(ng => ng.Latitude);
            if (nd) {
              nn = n9({
                lat: +nd.Latitude,
                lon: +nd.Longitude,
                from: Z3(nd.UnparsedAddress),
                zip: nd.PostalCode
              }, "near MLS #" + nj + ", " + Z3(nd.UnparsedAddress));
            } else {
              nz = "MLS #" + nj + " was not found.";
            }
          } else if (/^\d+\s+\S+/.test(nj)) {
            const ng = Q(nj);
            const nx = await Zs(ZV, ng, ZA);
            const nC = (nx.records[0] || (nx.groups[0] || [])[0] || {}).StandardFields;
            if (nC && nC.Latitude) {
              nn = n9({
                lat: +nC.Latitude,
                lon: +nC.Longitude,
                from: Z3(nC.UnparsedAddress),
                zip: nC.PostalCode
              }, "near " + Z3(nC.UnparsedAddress));
            } else {
              nz = "We could not find " + nj + " either.";
            }
          } else {
            ZT.city = nj.replace(/,?\s*(FL|Florida)\b.*$/i, "").trim();
            nn = await nZ();
            if (!nn) {
              nz = "No homes in " + ZT.city + " were found in realMLS.";
            }
          }
        }
      }
      if (Zo.approxCity) {
        ZI.warnings.push("We could only place this home in " + Zo.approxCity + ", so comps are measured from the middle of the city. Add the ZIP or a neighbor's MLS number for a tighter search.");
      }
      if (Zo.approxZip) {
        ZI.warnings.push("We could not pin the exact spot, so comps are measured from the middle of ZIP " + Zo.approxZip + ". Distances are approximate; walk the comp list before you share this.");
      }
      if (!Zo.inMls) {
        ZI.warnings.push("This address has no realMLS listing. Facts come from " + (ZI.web ? "public records and real estate sites" : "what you entered under Adjust the facts") + (Object.values(ZM).includes("Agent") && ZI.web ? " plus your entries" : "") + (Zo.approxFrom ? ", and the map location from a neighbor on the same street" : "") + ".");
      }
      Zo.hoaMonthly = Zo.hoaRaw ? /annual|year/i.test(Zo.hoaFreq || "") ? Zo.hoaRaw / 12 : /quarter/i.test(Zo.hoaFreq || "") ? Zo.hoaRaw / 3 : Zo.hoaRaw : 0;
      Zo.hoa = Zo.hoaMonthly > 0;
      Zo.history = Zb.map(nm => ({
        id: nm.id,
        status: nm.status,
        type: nm.type,
        list: nm.list,
        origList: nm.origList,
        close: nm.close,
        closeDate: nm.closeDate,
        listDate: nm.listDate,
        dom: nm.dom
      }));
      const ZE = Zb.filter(nm => nm.type !== "F" && nm.status === "Closed" && nm.close).sort((nm, nf) => String(nf.closeDate).localeCompare(String(nm.closeDate)))[0];
      Zo.lastSale = ZE ? {
        price: ZE.close,
        date: ZE.closeDate
      } : null;
      ZI.subject = Zo;
      if (!Zo.lat) {
        ZI.fatal = "We still could not place this address after checking realMLS, nearby listings and the ZIP code. Try the MLS number of the home or a neighbor, or add the ZIP under Adjust the facts.";
        return ZI;
      }
      if (!Zo.sqft) {
        const nm = await Ze({
          id: "sqft",
          title: "How big is the home?",
          text: "Neither realMLS nor the online lookup had the living area. Type the heated square feet from the tax record or your measurement. If you skip, the report compares by location and bedrooms only and says so.",
          input: {
            type: "number",
            placeholder: "Square feet",
            value: ""
          },
          skip: "Skip, I do not know"
        });
        const nf = nm && +nm.value;
        if (nf && nf > 200 && nf < 30000) {
          Zo.sqft = nf;
          ZM.sqft = "Agent";
        } else {
          Zo.sqftUnknown = true;
          ZI.warnings.push("The living area is unknown, so sales are compared by location and bedrooms, not size. The value range is wider; confirm the square feet before you rely on it.");
        }
      }
      if (Zo.inMls && Zo.photos > 0 && ZN.photos !== false) {
        ZA("Pulling listing photos");
        Zo.gallery = await Zk(ZV, Zo.key, 4);
      }
      const ZW = {
        lat: Zo.lat,
        lon: Zo.lon
      };
      const ZH = Zo.subtype || "Single Family Residence";
      const ZR = Zo.type && Zo.type !== "F" ? Zo.type : "A";
      const ZY = Zo.approxCity ? Math.max(3.5, ZN.radius || 3.5) : Zo.approxZip ? Math.max(1.5, ZN.radius || 1.5) : ZN.radius || 1;
      const Zy = [[ZY, ZN.months || 6, 0.25], [Math.max(ZY, 1.5), 6, 0.25], [Math.max(ZY, 1.5), 12, 0.3], [2.5, 12, 0.35], [3.5, 18, 0.45], [5, 24, 0.5]];
      let Zr = [];
      let ZU = Zy[0];
      let ZP = false;
      const Zl = async (nt, nL) => {
        const [na, np, nD] = nt;
        ZA("Pulling closed sales within " + na + " mile" + (na === 1 ? "" : "s") + ", last " + np + " months" + (nL ? ", any home style" : ""));
        const nJ = Zo.sqft ? " And LivingArea Bt " + Math.round(Zo.sqft * (1 - nD)) + "," + Math.round(Zo.sqft * (1 + nD)) : Zo.beds ? " And BedsTotal Bt " + Math.max(1, Zo.beds - 1) + "," + (Zo.beds + 1) : "";
        return (await ZJ(ZV, "Location Eq radius(" + U(Zo.lat + " " + Zo.lon) + "," + na + ") And CloseDate Ge months(-" + np + ")" + (nL ? "" : " And PropertySubType Eq " + U(ZH)) + nJ, [ZR], ["Closed"], K, 3, "-CloseDate")).map(nc => Z9(nc, ZK, ZW)).filter(nc => nc.id !== Zo.id && Z0(nc.full) !== Z0(Zo.full) && nc.close);
      };
      for (const nt of Zy) {
        ZU = nt;
        Zr = await Zl(nt, false);
        if (Zr.length >= 8 || ZN.radius && nt === Zy[0] && Zr.length >= 5) {
          break;
        }
      }
      if (Zr.length < 3) {
        const nL = await Zl(Zy[Zy.length - 1], true);
        if (nL.length > Zr.length) {
          Zr = nL;
          ZP = true;
        }
      }
      if (!Zr.length) {
        const na = await Ze({
          id: "wider",
          title: "No sales matched yet",
          text: "There were no closed sales like this home within 5 miles in the last 2 years. Search up to 10 miles and 3 years?",
          choices: [{
            label: "Yes, search wider",
            value: 1
          }, {
            label: "No, stop here",
            value: 0
          }]
        });
        if (na && +na.choice === 1) {
          ZU = [10, 36, 0.6];
          Zr = await Zl(ZU, true);
          ZP = true;
        }
      }
      if (!Zr.length) {
        ZI.subject = Zo;
        ZI.fatal = "No closed sales like this home turned up, even after widening the search. Check the property type and address, or try a nearby MLS number.";
        return ZI;
      }
      if (ZP) {
        ZI.warnings.push("Few sales matched this exact home style, so the search included other residential styles nearby. Review each comp before relying on the value.");
      }
      if (Zr.length > 24) {
        const np = nD => (nD.dist || 1) * 1.2 + (nD.ago || 6) / 6 + (Zo.sqft ? Math.abs((nD.sqft || Zo.sqft) - Zo.sqft) / Zo.sqft * 3 : 0) + (Zo.year && nD.year ? Math.abs(Zo.year - nD.year) / 30 : 0.5);
        ZI.pool = Zr.length;
        Zr = Zr.sort((nD, nJ) => np(nD) - np(nJ)).slice(0, 24);
      }
      ZI.search = {
        radius: ZU[0],
        months: ZU[1],
        sizePct: Zo.sqft ? ZU[2] : null,
        sub: ZP ? "residential" : ZH
      };
      const ZS = Z7(Zr.map(nD => nD.ppsf));
      Zr.forEach(nD => {
        nD.cat = ZO(nD, Zw, ZS);
        nD.use = true;
      });
      const Zu = Z7(Zr.map(nD => nD.price));
      Zr.forEach(nD => {
        if (Zu && (nD.price > Zu * 2.2 || nD.price < Zu * 0.3)) {
          nD.use = false;
          nD.why = "Outlier price for this pocket";
        }
        if (nD.raw.WaterFrontYN && !(Zo.waterfront || []).length) {
          nD.use = false;
          nD.why = "Waterfront, subject is not";
        }
      });
      Zo.catAuto = Zo.inMls ? ZO(Object.assign({}, Zo, {
        year: Zo.year
      }), Zw, ZS) : "standard";
      if (Zo.catAuto === "new") {
        Zo.catAuto = "updated";
      }
      const ZQ = ZN.cond && ZN.cond !== "auto" ? ZN.cond : {
        updated: "updated",
        standard: "average",
        asis: "needs"
      }[Zo.catAuto] || "average";
      ZI.cond = ZQ;
      ZI.market0 = Zd(Zo, Zr);
      Zr.forEach(nD => {
        nD.note = Zi(nD);
        nD.features = Zz(nD);
      });
      ZI.comps = Zr;
      ZI.value = Zx(Zo, Zr, ZQ);
      ZI.local = Zf(Zr);
      ZA("Checking active and pending competition");
      try {
        const nD = Math.round(Zo.sqft * 0.75);
        const nJ = Math.round(Zo.sqft * 1.25);
        const nc = await ZJ(ZV, "Location Eq radius(" + U(Zo.lat + " " + Zo.lon) + "," + Math.max(1, ZU[0]) + ") And PropertySubType Eq " + U(ZH) + " And LivingArea Bt " + nD + "," + nJ, [ZR], X, K, 1, "-ListingContractDate");
        ZI.active = nc.map(nq => Z9(nq, ZK, ZW)).filter(nq => nq.id !== Zo.id).map(nq => {
          nq.cat = ZO(nq, Zw, ZS);
          nq.note = Zi(nq);
          return nq;
        });
      } catch (nq) {
        ZI.errors.active = nq;
        ZI.active = [];
      }
      ZA("Pulling closed leases for rent comps");
      try {
        let nF = [];
        for (const [ns, nk] of [[1.5, Zo.beds != null ? "BedsTotal Eq " + Zo.beds : ""], [2.5, Zo.beds != null ? "BedsTotal Bt " + Math.max(1, Zo.beds - 1) + "," + (Zo.beds + 1) : ""]]) {
          nF = (await ZJ(ZV, "Location Eq radius(" + U(Zo.lat + " " + Zo.lon) + "," + ns + ") And CloseDate Ge months(-12)" + (nk ? " And " + nk : ""), ["F"], ["Closed"], "ListingId,ListingKey,UnparsedAddress,ClosePrice,CloseDate,ListPrice,BedsTotal,BathsTotal,LivingArea,YearBuilt,Latitude,Longitude,DaysOnMarket,PropertySubType", 2, "-CloseDate")).map(nV => {
            const nN = Z9(nV, ZK, ZW);
            nN.rent = nN.close || nN.list;
            return nN;
          }).filter(nV => nV.rent && nV.rent > 300 && nV.rent < 20000);
          ZI.rentRadius = ns;
          if (nF.length >= 6) {
            break;
          }
        }
        ZI.rents = nF;
        ZI.rent = ZC(Zo, nF);
      } catch (nV) {
        ZI.errors.rents = nV;
        ZI.rents = [];
        ZI.rent = null;
      }
      if (Zo.zip) {
        ZA("Reading market statistics for " + Zo.zip);
        const nN = {};
        const nX = {
          LocationField: "PostalCode",
          LocationValue: String(Zo.zip),
          PropertyTypeCode: ZR
        };
        const nA = [["price", "MarketStatisticsPrice", "SoldMedianSoldPrice,ActiveMedianListPrice"], ["abs", "MarketStatisticsAbsorption", "AbsorptionRate"], ["dom", "MarketStatisticsDaysOnMarket", "AverageDom,AverageCdom"], ["ratio", "MarketStatisticsRatio", "SaleToOriginalListPriceRatio,SaleToListPriceRatio"], ["inv", "MarketStatisticsInventory", "ActiveListings,NewListings,PendedListings,SoldListings"]];
        for (const [nK, nw, nT] of nA) {
          try {
            nN[nK] = await ZV(nw, Object.assign({
              Options: nT
            }, nX));
          } catch (nI) {
            try {
              nN[nK] = await ZV(nw, Object.assign({
                Options: nT
              }, nX));
            } catch (ne) {
              ZI.errors["stat_" + nK] = ne;
            }
          }
        }
        ZI.market = Zm(nN);
      }
      if (ZN.compPhotos !== false) {
        const nv = Zr.filter(nb => nb.use && nb.w > 0 && nb.photos > 0).sort((nb, nB) => nB.w - nb.w).slice(0, 10);
        if (nv.length) {
          ZA("Pulling photos of the best comps");
        }
        for (const nb of nv) {
          const nB = await Zk(ZV, nb.key, 1);
          if (nB[0]) {
            nb.photo = nB[0].src;
          }
        }
      }
      ZI.flags = Zt(Zo, Zw);
      ZA("Building your report");
      return ZI;
    },
    revalue: function (ZV, ZN) {
      const ZX = ZV.subject;
      ZV.cond = ZN || ZV.cond;
      ZV.market0 = Zd(ZX, ZV.comps);
      ZV.value = Zx(ZX, ZV.comps, ZV.cond);
      ZV.local = Zf(ZV.comps);
      return ZV;
    },
    parseAddress: Q,
    titleAddr: Z3,
    scrub: Z4,
    classify: ZO,
    features: Zz,
    note: Zi,
    adjust: Zd,
    valuation: Zx,
    rentEstimate: ZC,
    marketFromStats: Zm,
    localStats: Zf,
    flags: Zt,
    miles: Z6,
    median: Z7,
    streetKey: Z0,
    TYPES: J,
    ALL_STATUS: V
  };
})(typeof window != "undefined" ? window : globalThis);
