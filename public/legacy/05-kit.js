/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (M) {
  const B = {
    navy: "#002e5e",
    navyDeep: "#001f40",
    green: "#6bc063",
    gray: "#62666a",
    mist: "#f2f5f9",
    white: "#ffffff",
    ink: "#0b2340",
    soft: "#c9d6e4"
  };
  const Y = "Montserrat, \"Arial Black\", Arial, sans-serif";
  const K = "\"Open Sans\", Arial, sans-serif";
  const H = {
    feed: {
      w: 1080,
      h: 1350,
      label: "Feed 4:5",
      use: "Instagram and Facebook feed"
    },
    square: {
      w: 1080,
      h: 1080,
      label: "Square 1:1",
      use: "Instagram, Facebook, LinkedIn"
    },
    story: {
      w: 1080,
      h: 1920,
      label: "Story and Reel 9:16",
      use: "Stories, Reels covers, TikTok"
    },
    gbp: {
      w: 1200,
      h: 900,
      label: "Google Business 4:3",
      use: "Google Business Profile updates"
    },
    li_banner: {
      w: 1584,
      h: 396,
      label: "LinkedIn banner",
      use: "LinkedIn profile cover"
    },
    fb_cover: {
      w: 1640,
      h: 624,
      label: "Facebook cover",
      use: "Facebook profile or page cover"
    }
  };
  const z = ["li_banner", "fb_cover"];
  const F = {
    impact: {
      en: ["IMPACT", "MAKE IT MATTER.", "We are here to make a real difference in our clients’ lives, our teammates’ careers, and the communities we serve."],
      es: ["IMPACTO", "QUE CUENTE.", "Estamos aquí para marcar una diferencia real en la vida de nuestros clientes, en la carrera de nuestro equipo y en las comunidades que servimos."]
    },
    mindset: {
      en: ["MINDSET", "THINK BIGGER.", "We lead with positivity, resilience, and a growth mentality. Problems become possibilities. Challenges make us better."],
      es: ["MENTALIDAD", "PIENSA EN GRANDE.", "Lideramos con positivismo, resiliencia y una mentalidad de crecimiento. Los problemas se vuelven posibilidades. Los retos nos hacen mejores."]
    },
    authenticity: {
      en: ["AUTHENTICITY", "BE REAL. BE YOU.", "No egos. No pretending. We build relationships through honesty, integrity, and genuine human connection."],
      es: ["AUTENTICIDAD", "SÉ REAL. SÉ TÚ.", "Sin egos. Sin apariencias. Construimos relaciones con honestidad, integridad y una conexión humana verdadera."]
    },
    together: {
      en: ["TOGETHER", "WE WIN AS ONE.", "Clients. Partners. Community. We collaborate, support each other, and know that individual success grows bigger when it is shared."],
      es: ["JUNTOS", "GANAMOS COMO UNO.", "Clientes. Socios. Comunidad. Colaboramos, nos apoyamos y sabemos que el éxito individual crece cuando se comparte."]
    },
    hustle: {
      en: ["HUSTLE", "MAKE IT HAPPEN.", "We do not wait for opportunity. We create it. We take initiative, stay hungry, follow through, and do what it takes to deliver results."],
      es: ["EMPUJE", "HAZLO REALIDAD.", "No esperamos la oportunidad. La creamos. Tomamos la iniciativa, mantenemos el hambre, cumplimos y hacemos lo necesario para dar resultados."]
    }
  };
  const j = {
    en: {
      through: "THROUGH",
      fine: "Licensed Real Estate Broker  |  FL Lic. CQ1066513",
      eho: "Equal Housing Opportunity",
      beds: "Beds",
      baths: "Baths",
      sqft: "Sq Ft",
      offered: "OFFERED AT",
      addPhoto: "ADD YOUR PHOTO",
      source: "Source",
      tagline: "THAT’S THE MATH BEHIND iMATH.",
      hhs: "HUMBLE  +  HUNGRY  +  SMART",
      serving: "SERVING"
    },
    es: {
      through: "A TRAVÉS DE",
      fine: "Corredor de bienes raíces  |  Lic. FL CQ1066513",
      eho: "Igualdad de oportunidades en la vivienda",
      beds: "Hab.",
      baths: "Baños",
      sqft: "Pies²",
      offered: "PRECIO",
      addPhoto: "AGREGUE SU FOTO",
      source: "Fuente",
      tagline: "ESA ES LA FÓRMULA DE iMATH.",
      hhs: "HUMILDES  +  CON HAMBRE  +  INTELIGENTES",
      serving: "SIRVIENDO A"
    }
  };
  const L = [{
    id: "just_listed",
    cat: "Listings",
    name: "Just Listed",
    kind: "photo",
    head: {
      en: "JUST LISTED",
      es: "NUEVA EN EL MERCADO"
    },
    fields: ["photo", "address", "city", "price", "beds", "baths", "sqft"]
  }, {
    id: "open_house",
    cat: "Listings",
    name: "Open House",
    kind: "photo",
    head: {
      en: "OPEN HOUSE",
      es: "CASA ABIERTA"
    },
    fields: ["photo", "address", "city", "when", "beds", "baths", "sqft"]
  }, {
    id: "under_contract",
    cat: "Listings",
    name: "Under Contract",
    kind: "photo",
    head: {
      en: "UNDER CONTRACT",
      es: "BAJO CONTRATO"
    },
    fields: ["photo", "address", "city"]
  }, {
    id: "just_sold",
    cat: "Listings",
    name: "Just Sold",
    kind: "photo",
    head: {
      en: "JUST SOLD",
      es: "VENDIDA"
    },
    fields: ["photo", "address", "city", "note"]
  }, {
    id: "meet_agent",
    cat: "Agent Brand",
    name: "Meet the Agent",
    kind: "agent",
    head: {
      en: "MEET YOUR AGENT",
      es: "CONOZCA A SU AGENTE"
    },
    fields: ["bio", "specialties"]
  }, {
    id: "testimonial",
    cat: "Agent Brand",
    name: "Client Story",
    kind: "text",
    head: {
      en: "CLIENT STORIES",
      es: "HISTORIAS DE CLIENTES"
    },
    fields: ["quote", "client"]
  }, {
    id: "new_keys",
    cat: "Agent Brand",
    name: "New Keys",
    kind: "photo",
    head: {
      en: "NEW KEYS",
      es: "NUEVAS LLAVES"
    },
    fields: ["photo", "client", "note"]
  }, {
    id: "home_tip",
    cat: "Education",
    name: "Home Tip",
    kind: "text",
    head: {
      en: "HOME TIP",
      es: "CONSEJO DE HOGAR"
    },
    fields: ["tipTitle", "tipBody"]
  }, {
    id: "market_update",
    cat: "Education",
    name: "Market Update",
    kind: "text",
    head: {
      en: "MARKET UPDATE",
      es: "MERCADO AL DÍA"
    },
    fields: ["area", "month", "stats", "source"]
  }, {
    id: "community",
    cat: "Education",
    name: "Community Spotlight",
    kind: "photo",
    head: {
      en: "COMMUNITY SPOTLIGHT",
      es: "COMUNIDAD EN FOCO"
    },
    fields: ["photo", "place", "blurb"]
  }, {
    id: "values",
    cat: "Brand and Seasonal",
    name: "iMath Values",
    kind: "values",
    head: {
      en: "",
      es: ""
    },
    fields: ["value"]
  }, {
    id: "holiday",
    cat: "Brand and Seasonal",
    name: "Holiday Greeting",
    kind: "holiday",
    head: {
      en: "",
      es: ""
    },
    fields: ["greeting", "message"]
  }, {
    id: "profile_cover",
    cat: "Profile",
    name: "Profile Cover",
    kind: "cover",
    head: {
      en: "",
      es: ""
    },
    fields: ["serviceArea"],
    formats: z
  }];
  const C = {
    agentName: "Your Name",
    agentTitle: "Realtor",
    phone: "904.555.0123",
    email: "you@imathgroup.com",
    handle: "imathgroup.com",
    bilingualBadge: true,
    address: "1234 Riverside Avenue",
    city: "Jacksonville, FL 32204",
    price: "$425,000",
    beds: "3",
    baths: "2",
    sqft: "1,850",
    when_en: "Saturday, Oct 3  |  1 to 4 PM",
    when_es: "Sábado 3 de octubre  |  1 a 4 PM",
    note_en: "Proud to have represented the sellers.",
    note_es: "Orgullosos de haber representado a los vendedores.",
    bio_en: "Born and raised on the First Coast, I help buyers and sellers move with confidence, clarity, and a plan.",
    bio_es: "Criado en la Primera Costa, ayudo a compradores y vendedores a mudarse con confianza, claridad y un plan.",
    specialties_en: "First Time Buyers, Relocation, Sellers",
    specialties_es: "Primeros compradores, Reubicación, Vendedores",
    quote_en: "They answered every question before we even asked it. We felt like family from the first call to closing day.",
    quote_es: "Respondieron cada pregunta antes de que la hiciéramos. Nos sentimos en familia desde la primera llamada hasta el cierre.",
    client: "The Martinez Family",
    tipTitle_en: "Get your pre listing inspection",
    tipTitle_es: "Haga una inspección antes de listar",
    tipBody_en: "Sellers who inspect before listing can fix small issues early, price with confidence, and avoid surprises at the negotiating table.",
    tipBody_es: "Los vendedores que inspeccionan antes de listar pueden corregir detalles a tiempo, fijar el precio con confianza y evitar sorpresas en la negociación.",
    area: "Duval County",
    month_en: "September 2026",
    month_es: "Septiembre 2026",
    s1v: "$365K",
    s1l_en: "Median sale price",
    s1l_es: "Precio medio de venta",
    s2v: "38",
    s2l_en: "Average days on market",
    s2l_es: "Días promedio en el mercado",
    s3v: "3.9",
    s3l_en: "Months of inventory",
    s3l_es: "Meses de inventario",
    source: "Northeast Florida MLS, Sept 2026 (sample figures)",
    place: "Riverside Arts Market",
    blurb_en: "Every Saturday under the Fuller Warren Bridge: local artists, food, and music right on the St. Johns River.",
    blurb_es: "Cada sábado bajo el puente Fuller Warren: artistas locales, comida y música junto al río St. Johns.",
    value: "impact",
    greeting_en: "HAPPY THANKSGIVING",
    greeting_es: "FELIZ DÍA DE ACCIÓN DE GRACIAS",
    message_en: "Grateful for every family, neighbor, and partner who makes this community home.",
    message_es: "Agradecidos con cada familia, vecino y socio que hace de esta comunidad un hogar.",
    serviceArea_en: "Jacksonville and Northeast Florida",
    serviceArea_es: "Jacksonville y el noreste de Florida"
  };
  function G(M4, M5, M6, M7) {
    M4.font = M5 + " " + Math.round(M6) + "px " + M7;
  }
  function P(M4, M5, M6, M7, M8, M9) {
    const MM = [...M5];
    let ME = 0;
    const Ma = MM.map(MB => {
      const Mt = M4.measureText(MB).width;
      ME += Mt;
      return Mt;
    });
    ME += M8 * (MM.length - 1);
    let Ml = M9 === "right" ? M6 - ME : M9 === "center" ? M6 - ME / 2 : M6;
    const MR = M4.textAlign;
    M4.textAlign = "left";
    MM.forEach((MB, Mt) => {
      M4.fillText(MB, Ml, M7);
      Ml += Ma[Mt] + M8;
    });
    M4.textAlign = MR;
    return ME;
  }
  function D(M4, M5, M6) {
    const M7 = String(M5 || "").split(/\s+/).filter(Boolean);
    const M8 = [];
    let M9 = "";
    for (const MM of M7) {
      const ME = M9 ? M9 + " " + MM : MM;
      if (M4.measureText(ME).width > M6 && M9) {
        M8.push(M9);
        M9 = MM;
      } else {
        M9 = ME;
      }
    }
    if (M9) {
      M8.push(M9);
    }
    return M8;
  }
  function Z(M4, M5, M6, M7, M8, M9, MM) {
    let ME = D(M4, M5, M8);
    if (MM && ME.length > MM) {
      ME = ME.slice(0, MM);
      ME[MM - 1] = ME[MM - 1].replace(/\s*\S*$/, "") + "…";
    }
    ME.forEach((Ma, Ml) => M4.fillText(Ma, M6, M7 + Ml * M9));
    return ME.length * M9;
  }
  function I(M4, M5, M6, M7, M8, M9, MM, ME) {
    ME = ME || {};
    let Ma = M9;
    const Ml = M9 * 0.55;
    G(M4, 900, Ma, Y);
    let MR = [M5];
    while (M4.measureText(M5 + ".").width > M8 && Ma > Ml) {
      Ma -= 2;
      G(M4, 900, Ma, Y);
    }
    if (M4.measureText(M5 + ".").width > M8) {
      Ma = M9 * 0.8;
      G(M4, 900, Ma, Y);
      MR = D(M4, M5 + " ", M8 - Ma * 0.4);
      while (MR.some(Mt => M4.measureText(Mt + ".").width > M8) && Ma > Ml) {
        Ma -= 2;
        G(M4, 900, Ma, Y);
        MR = D(M4, M5, M8 - Ma * 0.4);
      }
    }
    const MB = Ma * 0.98;
    M4.textBaseline = "alphabetic";
    M4.textAlign = "left";
    MR.forEach((Mt, My) => {
      const MY = M7 + Ma * 0.78 + My * MB;
      M4.fillStyle = MM;
      M4.fillText(Mt, M6, MY);
      if (My === MR.length - 1 && !ME.noDot) {
        const MK = M4.measureText(Mt).width;
        M4.fillStyle = B.green;
        M4.beginPath();
        M4.arc(M6 + MK + Ma * 0.13, MY - Ma * 0.08, Ma * 0.09, 0, Math.PI * 2);
        M4.fill();
      }
    });
    return MR.length * MB;
  }
  function O(M4, M5, M6, M7, M8, M9) {
    const MM = Math.max(M8 / M5.width, M9 / M5.height);
    const ME = M5.width * MM;
    const Ma = M5.height * MM;
    M4.drawImage(M5, M6 + (M8 - ME) / 2, M7 + (M9 - Ma) / 2, ME, Ma);
  }
  function N(M4, M5, M6, M7, M8, M9, MM) {
    M4.save();
    M4.beginPath();
    M4.rect(M6, M7, M8, M9);
    M4.clip();
    if (M5) {
      O(M4, M5, M6, M7, M8, M9);
    } else {
      const ME = M4.createLinearGradient(M6, M7, M6 + M8, M7 + M9);
      ME.addColorStop(0, "#8fa3b8");
      ME.addColorStop(1, "#4b6582");
      M4.fillStyle = ME;
      M4.fillRect(M6, M7, M8, M9);
      M4.strokeStyle = "rgba(255,255,255,0.07)";
      M4.lineWidth = 2;
      for (let MB = -M9; MB < M8; MB += 36) {
        M4.beginPath();
        M4.moveTo(M6 + MB, M7 + M9);
        M4.lineTo(M6 + MB + M9, M7);
        M4.stroke();
      }
      const Ma = M6 + M8 / 2;
      const Ml = M7 + M9 * 0.42;
      const MR = Math.min(M8, M9) * 0.16;
      M4.strokeStyle = "rgba(255,255,255,0.85)";
      M4.lineWidth = MR * 0.07;
      M4.lineJoin = "round";
      M4.beginPath();
      M4.moveTo(Ma - MR, Ml);
      M4.lineTo(Ma, Ml - MR * 0.8);
      M4.lineTo(Ma + MR, Ml);
      M4.moveTo(Ma - MR * 0.75, Ml - MR * 0.15);
      M4.lineTo(Ma - MR * 0.75, Ml + MR * 0.75);
      M4.lineTo(Ma + MR * 0.75, Ml + MR * 0.75);
      M4.lineTo(Ma + MR * 0.75, Ml - MR * 0.15);
      M4.stroke();
      M4.strokeRect(Ma - MR * 0.18, Ml + MR * 0.3, MR * 0.36, MR * 0.45);
      M4.fillStyle = "rgba(255,255,255,0.9)";
      G(M4, 700, Math.max(18, MR * 0.26), Y);
      M4.textAlign = "center";
      P(M4, j[MM].addPhoto, Ma, Ml + MR * 1.35, MR * 0.04, "center");
      M4.textAlign = "left";
    }
    M4.restore();
  }
  function q(M4, M5, M6) {
    M4.beginPath();
    M4.moveTo(M5[0][0], M5[0][1]);
    for (let M7 = 1; M7 < M5.length; M7++) {
      M4.lineTo(M5[M7][0], M5[M7][1]);
    }
    M4.closePath();
    M4.fillStyle = M6;
    M4.fill();
  }
  function J(M4, M5, M6, M7, M8, M9, MM) {
    M4.save();
    M4.strokeStyle = MM;
    M4.lineWidth = M9;
    M4.lineCap = "butt";
    M4.beginPath();
    M4.moveTo(M5, M6);
    M4.lineTo(M7, M8);
    M4.stroke();
    M4.restore();
  }
  function X(M4, M5, M6, M7, M8, M9, MM, ME) {
    const Ma = j[M9 === "es" ? "es" : "en"];
    M4.fillStyle = ME ? B.navyDeep : B.white;
    M4.fillRect(M5, M6, M7, M8);
    M4.fillStyle = B.green;
    M4.fillRect(M5, M6, M7, Math.max(3, M8 * 0.03));
    const Ml = M7 * 0.055;
    const MR = ME ? MM.lockupReverse : MM.lockupColor;
    let MB = M8 * 0.6;
    let Mt = MR ? MR.width * (MB / MR.height) : 0;
    if (Mt > M7 * 0.55) {
      Mt = M7 * 0.55;
      MB = MR.height * (Mt / MR.width);
    }
    if (MR) {
      M4.drawImage(MR, M5 + Ml, M6 + (M8 - MB) / 2 + M8 * 0.02, Mt, MB);
    }
    const My = Math.max(12, Math.min(M8 * 0.13, M7 * 0.017));
    G(M4, 400, My, K);
    M4.fillStyle = ME ? B.soft : B.gray;
    const MY = M5 + M7 - Ml;
    const MK = My * 1.35;
    M4.textAlign = "right";
    const MH = Ma.fine.split("  |  ");
    M4.fillText(MH[0], MY, M6 + M8 * 0.4);
    M4.fillText(MH[1], MY, M6 + M8 * 0.4 + My * 1.45);
    M4.fillText(Ma.eho, MY - MK - My * 0.5, M6 + M8 * 0.4 + My * 2.9);
    M4.textAlign = "left";
    (function (MT, Mz, MF, Mj, Mh) {
      MT.save();
      MT.strokeStyle = Mh;
      MT.fillStyle = Mh;
      MT.lineWidth = Mj * 0.1;
      MT.lineJoin = "miter";
      MT.beginPath();
      MT.moveTo(Mz, MF + Mj * 0.45);
      MT.lineTo(Mz + Mj * 0.5, MF);
      MT.lineTo(Mz + Mj, MF + Mj * 0.45);
      MT.lineTo(Mz + Mj * 0.85, MF + Mj * 0.45);
      MT.lineTo(Mz + Mj * 0.85, MF + Mj);
      MT.lineTo(Mz + Mj * 0.15, MF + Mj);
      MT.lineTo(Mz + Mj * 0.15, MF + Mj * 0.45);
      MT.closePath();
      MT.stroke();
      MT.fillRect(Mz + Mj * 0.32, MF + Mj * 0.52, Mj * 0.36, Mj * 0.09);
      MT.fillRect(Mz + Mj * 0.32, MF + Mj * 0.72, Mj * 0.36, Mj * 0.09);
      MT.restore();
    })(M4, MY - MK, M6 + M8 * 0.4 + My * 2.9 - MK * 0.85, MK, ME ? B.soft : B.gray);
  }
  function W(M4, M5, M6, M7, M8, M9, MM, ME, Ma, Ml) {
    const MR = MM * 0.4;
    let MB = M7;
    if (Ma) {
      (function (Mz, MF, Mj, Mh, ML, MC, MG) {
        Mz.save();
        Mz.beginPath();
        Mz.arc(Mj, Mh, ML + MC, 0, Math.PI * 2);
        Mz.fillStyle = B.green;
        Mz.fill();
        Mz.beginPath();
        Mz.arc(Mj, Mh, ML, 0, Math.PI * 2);
        Mz.clip();
        if (MF) {
          O(Mz, MF, Mj - ML, Mh - ML, ML * 2, ML * 2);
        } else {
          Mz.fillStyle = B.navyDeep;
          Mz.fillRect(Mj - ML, Mh - ML, ML * 2, ML * 2);
          Mz.fillStyle = B.white;
          G(Mz, 800, ML * 0.72, Y);
          Mz.textAlign = "center";
          Mz.textBaseline = "middle";
          Mz.fillText(function (MS) {
            return String(MS || "").split(/\s+/).filter(Boolean).slice(0, 2).map(Mc => Mc[0].toUpperCase()).join("") || "iM";
          }(MG), Mj, Mh + ML * 0.04);
          Mz.textAlign = "left";
          Mz.textBaseline = "alphabetic";
        }
        Mz.restore();
      })(M4, M6.headshot, M7 + MR + 4, M8 + MM / 2, MR, Math.max(3, MR * 0.07), M5.agentName);
      MB = M7 + MR * 2 + MM * 0.28;
    }
    const Mt = MM * 0.33;
    G(M4, 800, Mt, Y);
    M4.fillStyle = ME ? B.white : B.navy;
    let My = Mt;
    const MY = M7 + M9 - MB;
    while (M4.measureText(String(M5.agentName || "").toUpperCase()).width > MY && My > Mt * 0.6) {
      My -= 1;
      G(M4, 800, My, Y);
    }
    M4.fillText(String(M5.agentName || "").toUpperCase(), MB, M8 + MM * 0.43);
    let MK = String(M5.agentTitle || "").toUpperCase();
    if (M5.bilingualBadge) {
      MK += (MK ? "   •   " : "") + (Ml === "en" ? "SE HABLA ESPAÑOL" : Ml === "es" ? "BILINGÜE" : "SE HABLA ESPAÑOL");
    }
    G(M4, 700, MM * 0.14, Y);
    M4.fillStyle = B.green;
    P(M4, MK, MB, M8 + MM * 0.64, MM * 0.012, "left");
    G(M4, 400, MM * 0.16, K);
    M4.fillStyle = ME ? "#dbe5ef" : B.gray;
    const MH = [M5.phone, M5.email].filter(Boolean).join("   |   ");
    let MT = MM * 0.16;
    while (M4.measureText(MH).width > MY && MT > MM * 0.1) {
      MT -= 1;
      G(M4, 400, MT, K);
    }
    M4.fillText(MH, MB, M8 + MM * 0.87);
  }
  function V(M4, M5, M6) {
    if (M4[M5 + "_" + M6] !== undefined && M4[M5 + "_" + M6] !== "") {
      return M4[M5 + "_" + M6];
    } else if (M4[M5] !== undefined) {
      return M4[M5];
    } else {
      return M4[M5 + "_en"] || "";
    }
  }
  function U(M4, M5, M6) {
    if (M4.kind === "values") {
      const M7 = F[M5.value] || F.impact;
      return {
        main: (M6 === "es" ? M7.es : M7.en)[0],
        sub: M6 === "both" ? M7.es[0] : null
      };
    }
    if (M4.kind === "holiday") {
      return {
        main: V(M5, "greeting", M6 === "es" ? "es" : "en"),
        sub: M6 === "both" ? V(M5, "greeting", "es") : null
      };
    } else {
      return {
        main: M4.head[M6 === "es" ? "es" : "en"],
        sub: M6 === "both" ? M4.head.es : null
      };
    }
  }
  function Q(M4, M5, M6, M7, M8, M9) {
    G(M4, 800, M8, Y);
    M4.fillStyle = M9;
    P(M4, M5, M6, M7 + M8 * 0.8, M8 * 0.08, "left");
    return M8 * 1.25;
  }
  function M0(M4, M5, M6) {
    if (M6 === "both") {
      return [[V(M4, M5, "en"), false], [V(M4, M5, "es"), true]];
    } else {
      return [[V(M4, M5, M6), false]];
    }
  }
  const M1 = {
    feed: {
      photoH: 580,
      head: 100,
      stripH: 150,
      agentH: 150,
      bottom: 0,
      pad: 64
    },
    square: {
      photoH: 400,
      head: 82,
      stripH: 130,
      agentH: 128,
      bottom: 0,
      pad: 56
    },
    story: {
      photoH: 790,
      head: 112,
      stripH: 160,
      agentH: 170,
      bottom: 250,
      pad: 72
    }
  };
  function M2(M4, M5, M6, M7, M8, M9, MM, ME, Ma) {
    const Ml = j[M7 === "es" ? "es" : "en"];
    let MR = M9;
    const MB = Ma ? B.white : B.navy;
    const Mt = Ma ? "#c7d5e4" : B.gray;
    if (M6.address && M5.fields.includes("address")) {
      G(M4, 700, ME * 0.36, K);
      M4.fillStyle = MB;
      M4.fillText(M6.address, M8, MR + ME * 0.34);
      MR += ME * 0.46;
    }
    if (M6.city && M5.fields.includes("city")) {
      G(M4, 400, ME * 0.28, K);
      M4.fillStyle = Mt;
      M4.fillText(M6.city, M8, MR + ME * 0.28);
      MR += ME * 0.44;
    }
    if (M5.fields.includes("when")) {
      const My = V(M6, "when", M7 === "es" ? "es" : "en");
      G(M4, 800, ME * 0.34, Y);
      M4.fillStyle = B.green;
      M4.fillText(My.toUpperCase(), M8, MR + ME * 0.34);
      MR += ME * 0.46;
      if (M7 === "both") {
        G(M4, 600, ME * 0.24, Y);
        M4.fillStyle = Mt;
        M4.fillText(V(M6, "when", "es").toUpperCase(), M8, MR + ME * 0.24);
        MR += ME * 0.36;
      }
    }
    if (M5.fields.includes("price") && M6.price) {
      G(M4, 900, ME * 0.5, Y);
      M4.fillStyle = B.green;
      M4.fillText(M6.price, M8, MR + ME * 0.46);
      const MY = M4.measureText(M6.price).width;
      G(M4, 600, ME * 0.16, Y);
      M4.fillStyle = Mt;
      P(M4, Ml.offered, M8 + MY + ME * 0.22, MR + ME * 0.44, ME * 0.02, "left");
      MR += ME * 0.66;
    }
    if (M5.fields.includes("beds")) {
      const MK = [];
      if (M6.beds) {
        MK.push([M6.beds, Ml.beds]);
      }
      if (M6.baths) {
        MK.push([M6.baths, Ml.baths]);
      }
      if (M6.sqft) {
        MK.push([M6.sqft, Ml.sqft]);
      }
      let MH = M8;
      MK.forEach((MT, Mz) => {
        G(M4, 800, ME * 0.32, Y);
        M4.fillStyle = MB;
        M4.fillText(MT[0], MH, MR + ME * 0.3);
        MH += M4.measureText(MT[0]).width + ME * 0.08;
        G(M4, 400, ME * 0.24, K);
        M4.fillStyle = Mt;
        M4.fillText(MT[1], MH, MR + ME * 0.3);
        MH += M4.measureText(MT[1]).width;
        if (Mz < MK.length - 1) {
          M4.fillStyle = B.green;
          M4.fillRect(MH + ME * 0.18, MR + ME * 0.06, ME * 0.05, ME * 0.26);
          MH += ME * 0.41;
        }
      });
      MR += ME * 0.46;
    }
    if (M5.fields.includes("note")) {
      const MT = V(M6, "note", M7 === "es" ? "es" : "en");
      if (MT) {
        G(M4, 400, ME * 0.26, K);
        M4.fillStyle = Mt;
        MR += Z(M4, MT, M8, MR + ME * 0.26, MM, ME * 0.36, 2);
      }
    }
    if (M5.fields.includes("place")) {
      G(M4, 800, ME * 0.4, Y);
      M4.fillStyle = MB;
      M4.fillText(String(M6.place || "").toUpperCase(), M8, MR + ME * 0.38);
      MR += ME * 0.54;
    }
    if (M5.fields.includes("blurb")) {
      M0(M6, "blurb", M7).forEach(([Mz, MF]) => {
        G(M4, 400, ME * (MF ? 0.22 : 0.27), K);
        M4.fillStyle = MF ? "#9fb4c9" : Mt;
        MR += Z(M4, Mz, M8, MR + ME * 0.27, MM, ME * (MF ? 0.31 : 0.37), 3) + ME * 0.08;
      });
    }
    if (M5.id === "new_keys" && M6.client) {
      G(M4, 800, ME * 0.36, Y);
      M4.fillStyle = MB;
      M4.fillText(String(M6.client).toUpperCase(), M8, MR + ME * 0.36);
      MR += ME * 0.5;
    }
    return MR - M9;
  }
  function M3(M4, M5, M6, M7, M8) {
    M4.fillStyle = M7 ? B.navy : B.mist;
    M4.fillRect(0, 0, M5, M6);
    const M9 = M5 / 1080;
    if (M7) {
      q(M4, [[M5 * 0.62, 0], [M5, 0], [M5, M5 * 0.45]], B.navyDeep);
      J(M4, M5 * 0.62 - M9 * 26, 0, M5, M5 * 0.45 + M9 * 36, M9 * 9, B.green);
      J(M4, 0, M5 * 0.4, M5 * 0.3, 0, M9 * 3, "rgba(107,192,99,0.5)");
    } else {
      q(M4, [[M5 * 0.74, 0], [M5, 0], [M5, M5 * 0.26]], M8 || B.navy);
      J(M4, M5 * 0.74 - M9 * 24, 0, M5, M5 * 0.26 + M9 * 26, M9 * 9, B.green);
      if (M3.icon) {
        const MM = M5 * 0.07;
        const ME = M3.icon;
        M4.drawImage(ME, M5 - M5 * 0.06 - ME.width * MM / ME.height, M5 * 0.045, ME.width * MM / ME.height, MM);
      }
    }
  }
  M.iMathKit = {
    C: B,
    FORMATS: H,
    POST_FORMATS: ["feed", "square", "story", "gbp"],
    COVER_FORMATS: z,
    TEMPLATES: L,
    SAMPLE: C,
    VALUES: F,
    draw: function (M4, M5) {
      const M6 = M5.format;
      const M7 = H[M6];
      const M8 = L.find(Ml => Ml.id === M5.template) || L[0];
      M4.width = M7.w;
      M4.height = M7.h;
      const M9 = M4.getContext("2d");
      const MM = Object.assign({}, C, M5.data || {});
      const ME = M5.lang || "en";
      const Ma = M5.assets || {};
      M9.save();
      M9.textBaseline = "alphabetic";
      M9.textAlign = "left";
      if (M8.kind === "cover") {
        (function (Ml, MR, MB, Mt, My, MY, MK, MH) {
          Ml.fillStyle = B.navy;
          Ml.fillRect(0, 0, MR, MB);
          q(Ml, [[MR * 0.7, 0], [MR, 0], [MR, MB], [MR * 0.58, MB]], B.gray);
          J(Ml, MR * 0.7 - 20, 0, MR * 0.58 - 20, MB, 8, B.green);
          const MT = MH === "li_banner" ? MR * 0.29 : MR * 0.06;
          const Mz = MB * (MH === "li_banner" ? 0.2 : 0.14);
          const MF = MY === "es" ? "es" : "en";
          let Mj = MB * (MH === "li_banner" ? 0.2 : 0.22);
          G(Ml, 900, Mz, Y);
          Ml.fillStyle = B.white;
          let Mh = Mz;
          const ML = String(My.agentName || "").toUpperCase();
          while (Ml.measureText(ML).width > MR * 0.56 - (MT - MR * 0.06) && Mh > Mz * 0.6) {
            Mh -= 1;
            G(Ml, 900, Mh, Y);
          }
          Ml.fillText(ML, MT, Mj + Mh * 0.8);
          const MC = Ml.measureText(ML).width;
          Ml.fillStyle = B.green;
          Ml.beginPath();
          Ml.arc(MT + MC + Mh * 0.14, Mj + Mh * 0.72, Mh * 0.09, 0, Math.PI * 2);
          Ml.fill();
          Mj += Mh * 1.1;
          let MG = String(My.agentTitle || "").toUpperCase();
          if (My.bilingualBadge) {
            MG += "   •   SE HABLA ESPAÑOL";
          }
          G(Ml, 700, Mz * 0.26, Y);
          Ml.fillStyle = B.green;
          P(Ml, MG, MT, Mj + Mz * 0.2, Mz * 0.025, "left");
          Mj += Mz * 0.5;
          const MS = V(My, "serviceArea", MY === "both" ? "en" : MF);
          G(Ml, 600, Mz * 0.3, K);
          Ml.fillStyle = "#dbe5ef";
          Ml.fillText(j[MF].serving.charAt(0) + j[MF].serving.slice(1).toLowerCase() + " " + MS, MT, Mj + Mz * 0.28);
          Mj += Mz * 0.5;
          G(Ml, 400, Mz * 0.26, K);
          Ml.fillStyle = "#c7d5e4";
          Ml.fillText([My.phone, My.email].filter(Boolean).join("   |   "), MT, Mj + Mz * 0.26);
          const Mc = MK.lockupVReverse;
          const Md = MR * 0.2;
          const MP = MR * 0.76;
          if (Mc) {
            const MD = Mc.height * Md / Mc.width;
            const Me = (MB - MD) / 2 - MB * 0.05;
            Ml.drawImage(Mc, MP, Me, Md, MD);
            G(Ml, 400, Math.max(11, MB * 0.03), K);
            Ml.fillStyle = "#fff";
            const MZ = "FL Lic. CQ1066513  |  " + j[MF].eho;
            if (Ml.measureText(MZ).width <= MR - MP - 16) {
              Ml.fillText(MZ, MP, Me + MD + MB * 0.08);
            } else {
              Ml.fillText("FL Lic. CQ1066513", MP, Me + MD + MB * 0.08);
              Ml.fillText(j[MF].eho, MP, Me + MD + MB * 0.08 + Math.max(11, MB * 0.03) * 1.35);
            }
          }
        })(M9, M7.w, M7.h, 0, MM, ME, Ma, M6);
      } else if (M6 === "gbp") {
        (function (Ml, MR, MB, Mt, My, MY, MK) {
          const MH = MB - 120;
          const MT = MR * 0.5;
          Ml.fillStyle = B.navy;
          Ml.fillRect(0, 0, MR, MB);
          if (Mt.kind === "photo" || Mt.kind === "agent") {
            N(Ml, Mt.kind === "agent" ? MK.headshot : MK.photo, 0, 0, MT + 80, MH, MY === "es" ? "es" : "en");
          } else {
            Ml.fillStyle = Mt.kind === "holiday" ? B.navyDeep : B.mist;
            Ml.fillRect(0, 0, MT + 80, MH);
            if (Mt.kind !== "holiday" && MK.iconColor) {
              const MS = MH * 0.34;
              Ml.globalAlpha = 1;
              Ml.drawImage(MK.iconColor, (MT - MK.iconColor.width * MS / MK.iconColor.height) / 2, MH * 0.33, MK.iconColor.width * MS / MK.iconColor.height, MS);
            } else if (MK.iconReverse) {
              const Mc = MH * 0.34;
              Ml.drawImage(MK.iconReverse, (MT - MK.iconReverse.width * Mc / MK.iconReverse.height) / 2, MH * 0.33, MK.iconReverse.width * Mc / MK.iconReverse.height, Mc);
            }
          }
          q(Ml, [[MT + 80, 0], [MR, 0], [MR, MH], [MT - 40, MH]], B.navy);
          J(Ml, MT + 62, 0, MT - 58, MH, 8, B.green);
          const Mz = MT + 90;
          const MF = MR - Mz - 48;
          let Mj = 54;
          const Mh = U(Mt, My, MY);
          const ML = MY === "es" ? "es" : "en";
          Mj += I(Ml, Mh.main, Mz, Mj, MF, 64, B.white) + 4;
          if (Mh.sub) {
            Mj += Q(Ml, Mh.sub, Mz, Mj, 20, B.green) + 6;
          } else {
            Mj += 10;
          }
          const MC = Mz;
          const MG = MF;
          if (Mt.kind === "photo") {
            M2(Ml, Mt, My, MY, MC, Mj, MG, 70, true);
          } else {
            let Md = {
              agent: "bio",
              holiday: "message"
            }[Mt.kind] || {
              home_tip: "tipBody",
              testimonial: "quote"
            }[Mt.id];
            if (Mt.kind === "values") {
              const MP = F[My.value] || F.impact;
              const MD = MY === "es" ? MP.es : MP.en;
              Mj += Q(Ml, MD[1], MC, Mj, 22, B.green) + 6;
              G(Ml, 400, 20, K);
              Ml.fillStyle = "#dbe5ef";
              Mj += Z(Ml, MD[2], MC, Mj + 20, MG, 28, 5);
            } else if (Mt.id === "market_update") {
              G(Ml, 800, 18, Y);
              Ml.fillStyle = B.green;
              Ml.fillText((My.area + "  |  " + V(My, "month", ML)).toUpperCase(), MC, Mj + 14);
              Mj += 34;
              [["s1v", "s1l"], ["s2v", "s2l"], ["s3v", "s3l"]].forEach(([Me, MZ]) => {
                G(Ml, 900, 40, Y);
                Ml.fillStyle = B.white;
                Ml.fillText(My[Me], MC, Mj + 38);
                const MI = Math.max(Ml.measureText(My[Me]).width, 110);
                G(Ml, 400, 18, K);
                Ml.fillStyle = "#c7d5e4";
                Ml.fillText(V(My, MZ, ML), MC + MI + 20, Mj + 32);
                Mj += 56;
              });
              G(Ml, 400, 13, K);
              Ml.fillStyle = "#9fb4c9";
              Ml.fillText(j[ML].source + ": " + My.source, MC, Mj + 10);
            } else if (Md) {
              if (Mt.id === "home_tip") {
                G(Ml, 800, 26, Y);
                Ml.fillStyle = B.white;
                Mj += Z(Ml, V(My, "tipTitle", ML), MC, Mj + 24, MG, 32, 2) + 8;
              }
              M0(My, Md, MY).forEach(([Me, MZ]) => {
                G(Ml, 400, MZ ? 16 : 20, K);
                Ml.fillStyle = MZ ? "#9fb4c9" : "#dbe5ef";
                Mj += Z(Ml, Me, MC, Mj + 20, MG, MZ ? 23 : 28, MZ ? 3 : 4) + 8;
              });
              if (Mt.id === "testimonial") {
                G(Ml, 800, 18, Y);
                Ml.fillStyle = B.green;
                Ml.fillText(String(My.client).toUpperCase(), MC, Mj + 16);
              }
            }
          }
          W(Ml, My, MK, MC, MH - 128, MG, 116, true, Mt.kind !== "agent", MY);
          X(Ml, 0, MH, MR, 120, MY, MK, false);
        })(M9, M7.w, M7.h, M8, MM, ME, Ma);
      } else if (M8.kind === "photo" || M8.kind === "agent") {
        (function (Ml, MR, MB, Mt, My, MY, MK, MH) {
          const MT = M1[MH];
          const Mz = MT.pad;
          const MF = MB - MT.bottom - MT.stripH;
          const Mj = MF - MT.agentH - 16;
          Ml.fillStyle = B.navy;
          Ml.fillRect(0, 0, MR, MB);
          const Mh = Mt.kind === "agent" ? MK.headshot || null : MK.photo;
          N(Ml, Mh, 0, 0, MR, MT.photoH + 60, MY === "es" ? "es" : "en");
          const ML = MT.photoH + 40;
          const MC = MT.photoH - 50;
          q(Ml, [[0, ML], [MR, MC], [MR, MB], [0, MB]], B.navy);
          J(Ml, 0, ML - 16, MR, MC - 16, 9, B.green);
          if (["just_listed", "just_sold", "new_keys", "community"].includes(Mt.id)) {
            J(Ml, 0, ML - 34, MR, MC - 34, 8, B.gray);
          }
          const MG = U(Mt, My, MY);
          let MS = Math.max(ML, MC) + 18;
          const Mc = I(Ml, MG.main, Mz, MS, MR - Mz * 2, MT.head, B.white);
          MS += Mc + 8;
          if (MG.sub) {
            MS += Q(Ml, MG.sub, Mz, MS, MT.head * 0.3, B.green) + 6;
          } else {
            MS += 10;
          }
          if (Mt.kind === "agent") {
            M0(My, "bio", MY).forEach(([Me, MZ]) => {
              G(Ml, 400, MT.head * (MZ ? 0.24 : 0.29), K);
              Ml.fillStyle = MZ ? "#9fb4c9" : "#dbe5ef";
              MS += Z(Ml, Me, Mz, MS + MT.head * 0.28, MR - Mz * 2, MT.head * (MZ ? 0.34 : 0.4), MH === "square" ? 2 : 3) + 8;
            });
            const Md = V(My, "specialties", MY === "es" ? "es" : "en").split(",").map(Me => Me.trim()).filter(Boolean);
            let MP = Mz;
            const MD = MT.head * 0.2;
            G(Ml, 700, MD, Y);
            MS += 10;
            Md.forEach(Me => {
              const MZ = Ml.measureText(Me.toUpperCase()).width + MD * 1.6;
              if (!(MP + MZ > MR - Mz)) {
                Ml.strokeStyle = B.green;
                Ml.lineWidth = 2.5;
                Ml.beginPath();
                if (Ml.roundRect) {
                  Ml.roundRect(MP, MS, MZ, MD * 2, MD);
                } else {
                  Ml.rect(MP, MS, MZ, MD * 2);
                }
                Ml.stroke();
                Ml.fillStyle = B.white;
                Ml.fillText(Me.toUpperCase(), MP + MD * 0.8, MS + MD * 1.36);
                MP += MZ + MD * 0.6;
              }
            });
          } else {
            M2(Ml, Mt, My, MY, Mz, MS, MR - Mz * 2, MT.head, true);
          }
          Ml.fillStyle = "rgba(255,255,255,0.12)";
          Ml.fillRect(Mz, Mj - 10, MR - Mz * 2, 2);
          W(Ml, My, MK, Mz, Mj + 6, MR - Mz * 2, MT.agentH - 12, true, Mt.kind !== "agent", MY);
          X(Ml, 0, MF, MR, MT.stripH, MY, MK, false);
          if (MT.bottom && (Ml.fillStyle = B.navy, Ml.fillRect(0, MF + MT.stripH, MR, MT.bottom), J(Ml, MR * 0.55, MB, MR, MB - MT.bottom * 0.9, 9, B.green), MK.iconReverse)) {
            const Me = MT.bottom * 0.34;
            Ml.drawImage(MK.iconReverse, Mz, MF + MT.stripH + MT.bottom * 0.3, MK.iconReverse.width * Me / MK.iconReverse.height, Me);
          }
        })(M9, M7.w, M7.h, M8, MM, ME, Ma, M6);
      } else {
        (function (Ml, MR, MB, Mt, My, MY, MK, MH) {
          const MT = M1[MH];
          const Mz = MT.pad;
          const MF = Mt.kind === "holiday";
          const Mj = MB - MT.bottom - MT.stripH;
          const Mh = Mj - MT.agentH - 16;
          M3.icon = MK.iconReverse;
          M3(Ml, MR, MB, MF, ["values", "market_update"].includes(Mt.id) ? B.gray : null);
          const ML = MF;
          const MC = ML ? B.white : B.navy;
          const MG = ML ? "#dbe5ef" : ["values", "home_tip"].includes(Mt.id) ? B.gray : "#33475e";
          const MS = ML ? "#9fb4c9" : B.gray;
          let Mc = MH === "story" ? 360 : MH === "square" ? 190 : 290;
          const Md = U(Mt, My, MY);
          const MP = MR - Mz * 2;
          const MD = MY === "es" ? "es" : "en";
          if (Mt.kind === "values") {
            const Me = F[My.value] || F.impact;
            const MZ = MY === "es" ? Me.es : Me.en;
            G(Ml, 700, MT.head * 0.22, Y);
            Ml.fillStyle = B.gray;
            P(Ml, "iMATH GROUP  |  " + (MY === "es" ? "NUESTROS VALORES" : "OUR VALUES"), Mz, Mc - MT.head * 0.35, MT.head * 0.03, "left");
            if (MH !== "square") {
              Mc += MT.head * 0.6;
            }
            Mc += I(Ml, MZ[0], Mz, Mc, MP, MT.head * 1.45, B.navy) + 10;
            Mc += Q(Ml, MZ[1], Mz, Mc, MT.head * 0.36, B.green) + 16;
            G(Ml, 400, MT.head * 0.34, K);
            Ml.fillStyle = MG;
            Mc += Z(Ml, MZ[2], Mz, Mc + MT.head * 0.34, MP * 0.92, MT.head * 0.48) + 8;
            if (MY === "both") {
              G(Ml, 800, MT.head * 0.24, Y);
              Ml.fillStyle = B.green;
              P(Ml, Me.es[0] + ". " + Me.es[1], Mz, Mc + MT.head * 0.36, MT.head * 0.02, "left");
              Mc += MT.head * 0.5;
              G(Ml, 400, MT.head * 0.24, K);
              Ml.fillStyle = MS;
              Mc += Z(Ml, Me.es[2], Mz, Mc + MT.head * 0.24, MP * 0.92, MT.head * 0.34);
            }
            Mc += MT.head * 0.3;
            Ml.fillStyle = B.soft;
            Ml.fillRect(Mz, Mc, MP, 2);
            Mc += MT.head * 0.5;
            G(Ml, 800, MT.head * 0.26, Y);
            Ml.fillStyle = B.navy;
            P(Ml, j[MD].tagline, Mz, Mc, MT.head * 0.035, "left");
            G(Ml, 700, MT.head * 0.2, Y);
            Ml.fillStyle = B.green;
            P(Ml, j[MD].hhs, Mz, Mc + MT.head * 0.5, MT.head * 0.04, "left");
          } else if (Mt.kind === "holiday") {
            if (MH !== "square") {
              Mc = MB * 0.3;
            }
            if (MK.logoReverse) {
              const MI = MT.head * 0.55;
              Ml.drawImage(MK.iconReverse || MK.logoReverse, Mz, Mc - MT.head * 1.1, (MK.iconReverse || MK.logoReverse).width * MI / (MK.iconReverse || MK.logoReverse).height, MI);
            }
            Mc += I(Ml, Md.main, Mz, Mc, MP * 0.9, MT.head * 1.05, B.white) + 10;
            if (Md.sub) {
              Mc += Q(Ml, Md.sub, Mz, Mc, MT.head * 0.3, B.green) + 16;
            } else {
              Mc += 16;
            }
            M0(My, "message", MY).forEach(([MO, Mr]) => {
              G(Ml, Mr ? 400 : 600, MT.head * (Mr ? 0.26 : 0.34), K);
              Ml.fillStyle = Mr ? MS : MG;
              Mc += Z(Ml, MO, Mz, Mc + MT.head * 0.32, MP * 0.9, MT.head * (Mr ? 0.37 : 0.47)) + 14;
            });
          } else {
            Mc += I(Ml, Md.main, Mz, Mc, MP * 0.86, MT.head, MC) + 6;
            if (Md.sub) {
              Mc += Q(Ml, Md.sub, Mz, Mc, MT.head * 0.3, B.green) + 20;
            } else {
              Mc += 24;
            }
            if (Mt.id === "home_tip") {
              M0(My, "tipTitle", MY).forEach(([MO, Mr], Mv) => {
                G(Ml, 800, MT.head * (Mr ? 0.3 : 0.46), Y);
                Ml.fillStyle = Mr ? B.green : MC;
                Mc += Z(Ml, MO, Mz, Mc + MT.head * (Mr ? 0.3 : 0.44), MP, MT.head * (Mr ? 0.4 : 0.54), 2) + 8;
              });
              Ml.fillStyle = B.green;
              Ml.fillRect(Mz, Mc + 8, MT.head * 0.9, 8);
              Mc += 40;
              M0(My, "tipBody", MY).forEach(([MO, Mr]) => {
                G(Ml, 400, MT.head * (Mr ? 0.25 : 0.31), K);
                Ml.fillStyle = Mr ? MS : MG;
                Mc += Z(Ml, MO, Mz, Mc + MT.head * 0.3, MP, MT.head * (Mr ? 0.36 : 0.44), MH === "square" ? 3 : 5) + 14;
              });
            } else if (Mt.id === "testimonial") {
              G(Ml, 900, MT.head * 2.2, Y);
              Ml.fillStyle = B.green;
              Ml.fillText("“", Mz - 6, Mc + MT.head * 1.35);
              Mc += MT.head * 0.9;
              M0(My, "quote", MY).forEach(([MO, Mr]) => {
                G(Ml, Mr ? 400 : 600, MT.head * (Mr ? 0.26 : 0.38), Mr ? K : Y);
                Ml.fillStyle = Mr ? MS : MC;
                Mc += Z(Ml, MO, Mz, Mc + MT.head * 0.36, MP, MT.head * (Mr ? 0.37 : 0.52), MH === "square" ? 4 : 6) + 16;
              });
              Ml.fillStyle = B.green;
              Ml.fillRect(Mz, Mc + 12, 44, 6);
              G(Ml, 800, MT.head * 0.26, Y);
              Ml.fillStyle = MC;
              Ml.fillText(String(My.client || "").toUpperCase(), Mz + 60, Mc + 22);
            } else if (Mt.id === "market_update") {
              G(Ml, 800, MT.head * 0.3, Y);
              Ml.fillStyle = B.green;
              P(Ml, (String(My.area || "") + "  |  " + V(My, "month", MD)).toUpperCase(), Mz, Mc + MT.head * 0.2, MT.head * 0.02, "left");
              Mc += MT.head * 0.6;
              const MO = [["s1v", "s1l"], ["s2v", "s2l"], ["s3v", "s3l"]];
              const Mr = 18;
              const Mv = Math.min(MH === "square" ? MT.head * 1.2 : MT.head * 1.75, (Mh - 34 - MT.head * 0.3 - Mc - Mr * 3 - 8) / 3);
              MO.forEach(([Ms, Mu], Mk) => {
                const Mp = Mc + Mk * (Mv + Mr);
                Ml.fillStyle = B.white;
                Ml.fillRect(Mz, Mp, MP, Mv);
                Ml.fillStyle = Mk === 1 ? B.gray : B.green;
                Ml.fillRect(Mz, Mp, 10, Mv);
                G(Ml, 900, Mv * 0.5, Y);
                Ml.fillStyle = B.navy;
                Ml.fillText(My[Ms] || "", Mz + 44, Mp + Mv * 0.68);
                const Mi = Ml.measureText(My[Ms] || "").width;
                const Mf = Mz + 44 + Math.max(Mi, Mv * 1.3) + 40;
                G(Ml, 600, Mv * 0.17, K);
                Ml.fillStyle = B.gray;
                const MN = MY === "both" ? [V(My, Mu, "en"), V(My, Mu, "es")] : [V(My, Mu, MD)];
                MN.forEach((MA, Mn) => {
                  Ml.font = (Mn ? 400 : 600) + " " + Math.round(Mv * (Mn ? 0.14 : 0.17)) + "px " + K;
                  Ml.fillStyle = Mn ? "#8a9199" : B.gray;
                  Ml.fillText(MA, Mf, Mp + Mv * (MN.length > 1 ? 0.45 + Mn * 0.24 : 0.57));
                });
              });
              Mc += (Mv + Mr) * 3 + 8;
              G(Ml, 400, MT.head * 0.17, K);
              Ml.fillStyle = B.gray;
              Ml.fillText(j[MD].source + ": " + (My.source || ""), Mz, Mc + 10);
            }
          }
          Ml.fillStyle = ML ? "rgba(255,255,255,0.14)" : B.soft;
          Ml.fillRect(Mz, Mh - 10, MP, 2);
          W(Ml, My, MK, Mz, Mh + 6, MP, MT.agentH - 12, ML, true, MY);
          X(Ml, 0, Mj, MR, MT.stripH, MY, MK, false);
          if (MT.bottom && (Ml.fillStyle = B.navy, Ml.fillRect(0, Mj + MT.stripH, MR, MT.bottom), J(Ml, MR * 0.55, MB, MR, MB - MT.bottom * 0.9, 9, B.green), MK.iconReverse)) {
            const Ms = MT.bottom * 0.34;
            Ml.drawImage(MK.iconReverse, Mz, Mj + MT.stripH + MT.bottom * 0.3, MK.iconReverse.width * Ms / MK.iconReverse.height, Ms);
          }
        })(M9, M7.w, M7.h, M8, MM, ME, Ma, M6);
      }
      M9.restore();
    },
    tf: V
  };
})(typeof window != "undefined" ? window : globalThis);
