/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function () {
  const A0 = window.iMathFun;
  let A1 = null;
  const A2 = t9 => document.querySelector(t9);
  const A3 = t9 => String(t9 == null ? "" : t9).replace(/[&<>"]/g, tA => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[tA]);
  const A4 = /(\b\d{3}[\s.)-]*\d{3}[\s.-]*\d{4}\b)|(https?:|www\.|\.com\b|\.net\b|\.org\b|@[a-z0-9_.]+)|(\$\s?\d)|(\d\s?%)|\b(call|text me|dm me|contact|apply|pre ?approv|preapprov|rate|apr|offer|discount|free|click|link in bio|book now|sign up|visit)\b/i;
  const A5 = /\b(f+u+c+k\w*|sh[i1]t\w*|bitch\w*|damn|hell|ass|asses|asshole|arse|bastard|crap|piss\w*|dick\w*|cock\w*|puss(y|ies)|slut\w*|whore\w*|porn\w*|nsfw|xxx|sexy|sexual|sex|nude\w*|naked|topless|boob\w*|tits?|butt|booty|thong|lingerie|bikini|stripper\w*|horny|twerk\w*|seductive|sensual|revealing|wtf|stfu|omfg|drunk|weed|kill\w*|gun\w*|blood\w*)\b/i;
  const A6 = t9 => A5.test(String(t9 || ""));
  const A7 = [["style", "Style", false, [["3d", "3D animated", "a polished 3D animated movie character, soft studio lighting, rich detailed materials, natural proportions"], ["photo", "Polished photo", "a polished professional photo, true to life, flattering studio lighting, sharp focus"], ["comic", "Comic book", "a bold comic book illustration with clean ink lines and halftone shading"], ["anime", "Anime", "a clean, modern anime illustration"], ["caricature", "Caricature", "a friendly, flattering caricature with a slightly larger head, never mean"], ["bighead", "Big head", "a fun bobblehead figure with an oversized head on a small body"], ["glam", "Glam Doll", "a glamorous fashion doll look, glossy and polished with sparkle accents, classy and tasteful", {
    outfit: "gown"
  }], ["hero", "Superhero", "a heroic superhero look, confident and powerful", {
    outfit: "hero"
  }], ["clay", "Clay figure", "a charming handmade clay figurine"], ["pop", "Pop art", "a bold pop art portrait with flat colors and halftone dots"], ["watercolor", "Watercolor", "a soft watercolor painting"], ["sketch", "Pencil sketch", "a detailed pencil sketch"], ["retro", "Retro 80s", "a retro 1980s synthwave illustration"], ["sticker", "Sticker", "a die cut sticker illustration with a thick white border"]]], ["outfit", "Wearing", false, [["suit", "Navy suit, green tie", "a tailored navy suit with a green tie"], ["polo", "Navy polo", "a navy polo shirt"], ["casual", "Business casual", "smart business casual clothes in navy and gray"], ["blazer", "Blazer and blouse", "a navy blazer with a white blouse"], ["dress", "Navy dress", "an elegant navy dress"], ["gown", "Sparkle gown", "an elegant sparkle gown that is fully covered and classy"], ["hoodie", "Gray hoodie", "a comfortable gray hoodie"], ["hero", "Superhero suit", "a navy superhero suit with green accents and a cape"], ["mine", "My own outfit", "the same clothes I am wearing in my selfie"]]], ["acc", "Extras (pick any)", true, [["myglasses", "My glasses", "my own glasses, exactly as in my selfie"], ["sun", "Sunglasses", "stylish sunglasses"], ["hardhat", "Hard hat", "a hard hat"], ["crown", "Crown", "a small gold crown"], ["party", "Party hat", "a party hat"], ["grad", "Graduation cap", "a graduation cap"], ["cowboy", "Cowboy hat", "a cowboy hat"], ["santa", "Santa hat", "a Santa hat"], ["badge", "Name badge", "a blank name badge on a lanyard"]]], ["doing", "Doing", false, [["stand", "Standing confident", "standing confidently with a warm, friendly smile"], ["wave", "Waving", "waving hello with a big smile"], ["celebrate", "Celebrating", "celebrating with both arms up"], ["keys", "Holding house keys", "holding up a set of shiny house keys"], ["sold", "Holding a SOLD sign", "holding a small navy real estate sign that says SOLD"], ["point", "Pointing to the side", "smiling and pointing to the side as if showing something great"], ["arms", "Arms crossed", "arms crossed with a confident smile"], ["coffee", "With coffee", "holding a coffee cup"], ["house", "Holding a little house", "holding a small model house"], ["fly", "Flying", "flying through the air like a superhero"]]], ["bg", "Background", false, [["white", "Plain white (best)", "a plain pure white background with nothing else in it"], ["navy", "iMath navy", "a smooth navy (#002e5e) studio background"], ["home", "In front of a home", "a bright, beautiful Florida home behind me"], ["skyline", "Jacksonville skyline", "the Jacksonville, Florida riverfront skyline behind me"], ["beach", "Beach", "a sunny Florida beach behind me"], ["office", "Office", "a bright modern office behind me"]]], ["frame", "Framing", false, [["full", "Full body", "full body from head to shoes, centered, with a little space around me"], ["waist", "Waist up", "from the waist up, centered"], ["head", "Head and shoulders", "head and shoulders, centered, like a profile picture"]]]];
  const A8 = Object.fromEntries(A7.map(t9 => [t9[0], t9]));
  const A9 = (t9, tA) => (A8[t9][3].find(tt => tt[0] === tA) || [])[2] || "";
  const AA = [["none", "No sign"], ["rider", "Yard sign with rider"], ["yard", "Yard sign"], ["aframe", "Open house A frame"], ["marquee", "Marquee lights"], ["neon", "Neon on brick"], ["street", "Street sign"], ["keytag", "Key tag"], ["billboard", "Billboard"], ["banner", "Waving banner"], ["doormat", "Welcome mat"], ["progress", "Loan progress bar"], ["checklist", "Road to closing checklist"]];
  const At = [["For agents", ["rider", "yard", "aframe", "keytag", "street", "doormat"]], ["Showstoppers", ["marquee", "neon", "billboard", "banner"]], ["For loan officers", ["progress", "checklist"]], ["Just words", ["none"]]];
  const AY = ["yard", "rider", "aframe", "billboard", "banner"];
  const AK = [["navy", "Navy", "#002e5e"], ["green", "Green", "#6bc063"], ["gray", "Gray", "#4b4f53"], ["white", "White", "#ffffff"]];
  const Av = [["badge", "iMath badge"], ["lockbar", "Logo bar at the bottom"], ["nametag", "My name"], ["frame", "Navy and green frame"], ["stripe", "Green stripe swipe"], ["ribbon", "TEAM iMATH corner ribbon"], ["watermark", "iMath pattern behind"], ["endcard", "iMath end card"]];
  const AF = [["Light touch", {
    brand: "light",
    brandEls: []
  }], ["Balanced", {
    brand: "balanced",
    brandEls: ["badge", "nametag"]
  }], ["Bold", {
    brand: "bold",
    brandEls: ["badge", "lockbar", "nametag", "frame", "endcard"]
  }], ["iMath everywhere", {
    brand: "bold",
    brandEls: ["badge", "lockbar", "nametag", "frame", "stripe", "ribbon", "watermark", "endcard"]
  }]];
  const Ae = [["Celebrate", [["confetti", "Confetti"], ["streamers", "Streamers"], ["balloons", "Balloons"], ["fireworks", "Fireworks"], ["flash", "Camera flash"]]], ["Real estate", [["houses", "Falling houses"], ["keys", "Falling keys"], ["pins", "Map pins dropping"], ["boxes", "Moving boxes"], ["checks", "Green checkmarks"], ["money", "Money rain"]]], ["Sparkle", [["sparkles", "Sparkles"], ["glitter", "Glitter"], ["stars", "Twinkling stars"], ["lightleak", "Golden light leak"], ["bubbles", "Bubbles"], ["hearts", "Hearts"], ["snow", "Snow"]]], ["iMath", [["logorain", "iMath logo rain"], ["rays", "Light rays"], ["glow", "Green glow"], ["spotlight", "Spotlight"]]], ["Attention", [["speedlines", "Speed lines"], ["glitch", "Glitch"], ["rainbow", "Color flash"]]]];
  const AP = Ae.flatMap(t9 => t9[1].map(tA => tA[0]));
  Object.fromEntries(Ae.flatMap(t9 => t9[1]));
  const AE = [["bounce", "Bounce"], ["pulse", "Pulse"], ["heartbeat", "Heartbeat"], ["shake", "Shake"], ["swing", "Swing"], ["spin", "Spin"], ["float", "Float"], ["zoom", "Zoom punch"], ["slide", "Slide in"], ["wiggle", "Wiggle"], ["flip", "Flip"], ["flipbook", "Flipbook of my photos"], ["boomerang", "Boomerang"], ["none", "Hold still"]];
  const Ag = [["pop", "Pop in"], ["stamp", "Stamp"], ["type", "Typewriter"], ["wave", "Wavy"], ["slide", "Slide in"], ["shake", "Shaky"], ["neon", "Neon"]];
  const AV = [["brand", "iMath navy"], ["burst", "Brand burst"], ["confetti", "Confetti"], ["skyline", "River city skyline"], ["beach", "Beach sunrise"], ["sunset", "Retro sunset"], ["glam", "Pink glam"], ["mist", "Light"], ["none", "Transparent"]];
  const AG = (t9, tA) => Object.assign({
    text: t9,
    sub: "",
    items: null,
    textFx: "pop",
    motion: "bounce"
  }, tA);
  const Ax = [["For agents", [["Just sold", AG("SOLD!", {
    sign: "rider",
    signColor: "navy",
    effects: ["confetti", "flash"],
    tags: "sold, just sold, congrats, celebrate, new home, house, real estate, closing"
  })], ["Just listed", AG("Just listed", {
    sign: "yard",
    signColor: "navy",
    effects: ["sparkles", "pins"],
    tags: "just listed, new listing, house, home, real estate, excited"
  })], ["Under contract", AG("Under contract", {
    sign: "rider",
    signColor: "green",
    effects: ["checks", "sparkles"],
    tags: "under contract, pending, excited, real estate, yes"
  })], ["Coming soon", AG("Coming soon", {
    sign: "yard",
    signColor: "green",
    effects: ["lightleak", "sparkles"],
    tags: "coming soon, sneak peek, new listing, real estate, stay tuned"
  })], ["Open house", AG("Open house", {
    sub: "Come on in",
    sign: "aframe",
    signColor: "navy",
    effects: ["balloons", "sparkles"],
    tags: "open house, come on in, house, home, real estate, weekend"
  })], ["Welcome home", AG("Welcome home", {
    sign: "keytag",
    signColor: "navy",
    effects: ["hearts", "keys"],
    tags: "welcome home, new home, home sweet home, keys, homeowner"
  })], ["Homeowner Ave", AG("Homeowner Ave", {
    sub: "iMath Group",
    sign: "street",
    effects: ["confetti", "streamers"],
    tags: "homeowner, new home, congrats, celebrate, house, moving"
  })], ["Home sweet home", AG("Home sweet home", {
    sign: "doormat",
    effects: ["hearts", "sparkles"],
    tags: "home sweet home, welcome home, new home, house, love"
  })], ["Moving day", AG("Moving day", {
    sign: "banner",
    signColor: "green",
    effects: ["boxes"],
    tags: "moving day, moving, new home, boxes, house"
  })], ["Closed!", AG("Closed!", {
    sub: "Another happy homeowner",
    sign: "marquee",
    effects: ["confetti", "fireworks"],
    tags: "closed, closing day, congrats, celebrate, new home, homeowner"
  })], ["Neon SOLD", AG("SOLD", {
    sign: "neon",
    effects: ["sparkles"],
    tags: "sold, just sold, neon, celebrate, real estate, congrats"
  })]]], ["For loan officers", [["Clear to close", AG("Clear to close", {
    sub: "Your home loan",
    sign: "progress",
    effects: ["confetti", "checks"],
    tags: "clear to close, mortgage, approved, yes, celebrate, home loan"
  })], ["Road to closing", AG("Clear to close", {
    sub: "Road to closing",
    sign: "checklist",
    items: ["Application", "Appraisal", "Underwriting", "Clear to close"],
    effects: ["checks"],
    tags: "road to closing, mortgage, home loan, progress, almost there"
  })], ["Funded!", AG("Funded!", {
    sub: "Congrats, homeowner",
    sign: "marquee",
    effects: ["confetti", "fireworks"],
    tags: "funded, mortgage, closing, congrats, celebrate, homeowner"
  })], ["Appraisal is in", AG("Appraisal is in", {
    sign: "banner",
    signColor: "navy",
    effects: ["checks", "sparkles"],
    tags: "appraisal, mortgage, good news, home loan, yes"
  })], ["Closing day", AG("Closing day", {
    sign: "billboard",
    signColor: "green",
    effects: ["balloons", "streamers"],
    tags: "closing day, closing, keys, new home, celebrate, congrats"
  })]]], ["Everyday", [["Congrats", AG("Congrats", {
    sign: "none",
    effects: ["fireworks", "confetti"],
    tags: "congrats, congratulations, celebrate, yay, proud"
  })], ["Thank you", AG("Thank you", {
    sign: "none",
    textFx: "wave",
    motion: "pulse",
    effects: ["hearts", "sparkles"],
    tags: "thank you, thanks, grateful, appreciate, love"
  })], ["Let's go", AG("Let's go!", {
    sign: "none",
    textFx: "shake",
    motion: "shake",
    effects: ["speedlines"],
    tags: "lets go, excited, hype, motivation, go time"
  })], ["Happy Friday", AG("Happy Friday", {
    sign: "none",
    textFx: "wave",
    effects: ["confetti"],
    tags: "happy friday, friday, weekend, tgif, yay"
  })], ["We got this", AG("We got this", {
    sign: "none",
    motion: "pulse",
    effects: ["rays"],
    tags: "we got this, teamwork, motivation, confident, lets do this"
  })], ["Team iMath", AG("Team iMath", {
    sub: "Humble + Hungry + Smart",
    sign: "billboard",
    signColor: "navy",
    effects: ["logorain"],
    tags: "team, teamwork, imath group, squad, real estate team"
  })], ["Good morning", AG("Good morning", {
    sign: "none",
    textFx: "type",
    motion: "float",
    effects: ["lightleak"],
    bg: "beach",
    tags: "good morning, morning, coffee, hello, rise and shine"
  })], ["Happy holidays", AG("Happy holidays", {
    sign: "none",
    textFx: "wave",
    motion: "float",
    effects: ["snow", "stars"],
    tags: "happy holidays, holidays, christmas, winter, cheer"
  })]]]];
  const Ak = {
    sq: [480, 480],
    port: [480, 600]
  };
  const Ap = {
    mode: "avatar",
    pick: {
      style: "3d",
      outfit: "suit",
      acc: [],
      doing: "stand",
      bg: "white",
      frame: "full"
    },
    A: {
      bg: "brand",
      brand: "badge",
      text: "",
      removeBg: true
    },
    av: {
      img: null,
      cut: null,
      alpha: false,
      tried: false
    },
    G: {
      text: "SOLD!",
      sub: "",
      items: null,
      textFx: "pop",
      motion: "bounce",
      effects: ["confetti", "flash"],
      bg: "brand",
      layout: "cutout",
      size: "sq",
      seconds: 3,
      brand: "balanced",
      brandEls: ["badge", "lockbar", "nametag"],
      sign: "rider",
      signColor: "navy",
      signPhoto: false,
      signSide: false,
      lock: "auto",
      safe: true,
      sticker: false,
      useAvatar: true,
      tags: "sold, just sold, congrats, celebrate, new home, house, real estate, closing"
    },
    gifImgs: [],
    gifBlob: null,
    owner: false
  };
  const Au = t9 => A1.store.get(t9);
  const AO = (t9, tA) => A1.store.set(t9, tA);
  const Ad = () => AO("imath_fun", {
    v: 2,
    pick: Ap.pick,
    A: Ap.A,
    G: Object.assign({}, Ap.G),
    prompt: A2("#av_prompt").value,
    gprompt: A2("#gif_prompt").value
  });
  const AQ = t9 => A2("#av_status").textContent = t9 || "";
  const AX = t9 => A2("#gif_status").textContent = t9 || "";
  const AW = () => String(A1.P().agentName || "").trim().split(/\s+/)[0] || "";
  const AI = () => {
    const t9 = Au("imath_me");
    return !!t9 && t9.role === "lo";
  };
  function AB(t9, tA, tt, tY) {
    t9.innerHTML = tA.map(([tK, tv], tF) => "<div class=\"fun-cg\"><b>" + A3(tK) + "</b><div>" + tv.map((tP, tE) => "<button type=\"button\" class=\"chip\" data-g=\"" + tF + "\" data-i=\"" + tE + "\" aria-pressed=\"" + (tY && tY(tP, tF) ? "true" : "false") + "\">" + (tP.sw ? "<span class=\"sw\" style=\"background:" + tP.sw + "\"></span>" : "") + A3(tP[0]) + "</button>").join("") + "</div></div>").join("");
    t9.querySelectorAll("button").forEach(tK => tK.onclick = () => tt(tA[+tK.dataset.g][1][+tK.dataset.i], tK));
  }
  function AC(t9, tA, tt, tY) {
    return "<label>" + A3(tY) + "<select id=\"" + t9 + "\">" + tA.map(([tK, tv]) => "<option value=\"" + A3(tK) + "\"" + (String(tK) === String(tt) ? " selected" : "") + ">" + A3(tv) + "</option>").join("") + "</select></label>";
  }
  function AU() {
    const t9 = A7.map(([tA, tt, tY, tK]) => [tt, tK.map(tv => Object.assign([tv[1], tv], {
      k: tA,
      multi: tY
    }))]);
    AB(A2("#av_chips"), t9, tA => {
      const [tt,,, tY] = tA[1];
      if (tA.multi) {
        const tK = Ap.pick[tA.k];
        Ap.pick[tA.k] = tK.includes(tt) ? tK.filter(tv => tv !== tt) : tK.concat(tt);
      } else {
        Ap.pick[tA.k] = tt;
        if (tY) {
          Object.assign(Ap.pick, tY);
        }
      }
      AU();
      Ay();
      Ad();
    }, tA => tA.multi ? Ap.pick[tA.k].includes(tA[1][0]) : Ap.pick[tA.k] === tA[1][0]);
  }
  function Ay() {
    const t9 = Ap.pick;
    let tA = A2("#av_prompt").value.trim().replace(/\s+/g, " ").slice(0, 300);
    let tt = "";
    if (tA && A6(tA)) {
      tA = "";
      tt = "Please keep it clean. Your extra words were left out because avatars in the iMath studio stay professional and family friendly.";
    }
    if (tA && A4.test(tA)) {
      tt = "Tip: leave phone numbers, websites and offers out. You add iMath branding here after.";
    }
    const tY = t9.acc.filter(tP => tP !== "myglasses").map(tP => A9("acc", tP));
    const tK = t9.acc.includes("myglasses");
    const tv = t9.doing === "sold";
    const tF = ["Use the selfie I attached as the reference for my face and create an image of me in this style: " + A9("style", t9.style) + ".", "It must look exactly like me: same face shape, eyes, nose, smile, skin tone, hair color and hairstyle" + (tK ? ", and my own glasses" : "") + ". Keep my real features and age.", "Framing: " + A9("frame", t9.frame) + ".", "Pose: " + A9("doing", t9.doing) + ".", "Wearing " + A9("outfit", t9.outfit) + (tY.length ? ", with " + (tY.length > 1 ? tY.slice(0, -1).join(", ") + " and " + tY[tY.length - 1] : tY[0]) : "") + ".", "Background: " + A9("bg", t9.bg) + ".", tA ? "Extra details: " + tA + "." : "", "Use iMath Group colors where they fit naturally: navy #002e5e and green #6bc063, with gray #62666a accents.", "Keep it professional, G rated, tasteful and fully clothed. No words, logos or watermarks" + (tv ? " other than SOLD on the sign" : "") + ". No other people, brands, celebrities or characters.", "Square 1:1 image, high resolution."].filter(Boolean).join("\n");
    A2("#av_out").value = tF;
    A2("#av_ai").href = "https://claude.ai/new?q=" + encodeURIComponent(tF + "\n\nPlease create this image with Canva's image generator, using my attached selfie as the reference, then give me the image to download so I can upload it to the iMath Marketing Studio.");
    if (tt) {
      AQ(tt);
    }
    return tF;
  }
  async function Ac(t9) {
    const tA = Ay();
    let tt = false;
    try {
      await navigator.clipboard.writeText(tA);
      tt = true;
    } catch (tY) {}
    if (!tt) {
      const tK = A2("#av_out");
      tK.focus();
      tK.select();
    }
    AQ(tt ? t9 ? "Copied. In Gemini, attach your selfie, paste the instructions and send. Then bring the picture back in step 3." : "Copied. Paste it into Gemini with your selfie." : "Copying is blocked in this view. The instructions are selected: copy them, then paste into Gemini with your selfie.");
  }
  function Ai(t9, tA) {
    const tt = t9.naturalWidth || t9.width;
    const tY = t9.naturalHeight || t9.height;
    const tK = Math.min(1, tA / Math.max(tt, tY));
    const tv = document.createElement("canvas");
    tv.width = Math.max(1, Math.round(tt * tK));
    tv.height = Math.max(1, Math.round(tY * tK));
    tv.getContext("2d").drawImage(t9, 0, 0, tv.width, tv.height);
    return tv;
  }
  function Az(t9, tA, tt) {
    const tY = Ai(t9, 1080);
    Ap.av.img = tY;
    Ap.av.alpha = A0.hasAlpha(tY);
    Ap.av.cut = Ap.av.alpha ? null : function (tK) {
      const tv = tK.width;
      const tF = tK.height;
      const tP = tK.getContext("2d", {
        willReadFrequently: true
      }).getImageData(0, 0, tv, tF);
      const tE = tP.data;
      const tg = [];
      const tV = Math.max(1, Math.floor((tv + tF) / 200));
      for (let tB = 0; tB < tv; tB += tV) {
        tg.push(tB, (tF - 1) * tv + tB);
      }
      for (let tC = 0; tC < tF; tC += tV) {
        tg.push(tC * tv, tC * tv + tv - 1);
      }
      let tG = 0;
      let tx = 0;
      let tk = 0;
      tg.forEach(tU => {
        tG += tE[tU * 4];
        tx += tE[tU * 4 + 1];
        tk += tE[tU * 4 + 2];
      });
      tG /= tg.length;
      tx /= tg.length;
      tk /= tg.length;
      const tp = tU => Math.abs(tE[tU * 4] - tG) + Math.abs(tE[tU * 4 + 1] - tx) + Math.abs(tE[tU * 4 + 2] - tk);
      if (tg.filter(tU => tp(tU) < 30).length / tg.length < 0.8) {
        return null;
      }
      const tu = new Uint8Array(tv * tF);
      const tO = new Int32Array(tv * tF);
      let td = 0;
      let tQ = 0;
      const tX = tU => {
        if (!tu[tU] && tp(tU) < 30) {
          tu[tU] = 1;
          tO[tQ++] = tU;
        }
      };
      for (let tU = 0; tU < tv; tU++) {
        tX(tU);
        tX((tF - 1) * tv + tU);
      }
      for (let ty = 0; ty < tF; ty++) {
        tX(ty * tv);
        tX(ty * tv + tv - 1);
      }
      while (td < tQ) {
        const tc = tO[td++];
        const ti = tc % tv;
        if (ti > 0) {
          tX(tc - 1);
        }
        if (ti < tv - 1) {
          tX(tc + 1);
        }
        if (tc >= tv) {
          tX(tc - tv);
        }
        if (tc < tv * (tF - 1)) {
          tX(tc + tv);
        }
      }
      let tW = 0;
      for (let tz = 0; tz < tv * tF; tz++) {
        if (tu[tz]) {
          tE[tz * 4 + 3] = 0;
          tW++;
        }
      }
      if (tW < tv * tF * 0.08 || tW > tv * tF * 0.94) {
        return null;
      }
      for (let ts = 0; ts < tv * tF; ts++) {
        if (tu[ts]) {
          continue;
        }
        const tS = ts % tv;
        if (tS > 0 && tu[ts - 1] || tS < tv - 1 && tu[ts + 1] || ts >= tv && tu[ts - tv] || ts < tv * (tF - 1) && tu[ts + tv]) {
          tE[ts * 4 + 3] = Math.round(Math.min(1, Math.max(0.25, tp(ts) / 90)) * 255);
        }
      }
      const tI = document.createElement("canvas");
      tI.width = tv;
      tI.height = tF;
      tI.getContext("2d").putImageData(tP, 0, 0);
      return tI;
    }(tY);
    Ap.av.tried = true;
    Ap.av.key = "a" + Date.now();
    if (!tt) {
      try {
        const tK = Ai(tY, 900);
        AO("imath_fun_photo", tK.toDataURL(Ap.av.alpha ? "image/png" : "image/jpeg", 0.9));
      } catch (tv) {}
    }
    A2("#av_photoName").textContent = tA ? tt ? tA : "Avatar: " + tA : "Avatar added";
    ["#av_dl", "#av_use", "#av_togif"].forEach(tF => A2(tF).disabled = false);
    An = null;
    AJ();
    Aw();
    if (!tt) {
      AQ(Ap.av.alpha ? "Your avatar is in, with a transparent background. Pick an iMath background and badge below." : Ap.av.cut ? "Your avatar is in. I removed the plain background and set it on iMath navy. Change it under iMath touch." : "Your avatar is in. Add an iMath badge, frame or name banner under iMath touch.");
    }
  }
  const As = () => Ap.av.alpha ? Ap.av.img : Ap.A.removeBg && Ap.av.cut ? Ap.av.cut : null;
  function AS(t9) {
    const tA = As();
    const tt = Ap.A.text === "@name" ? AW() : Ap.A.text;
    return [{
      style: "image",
      bg: tA ? Ap.A.bg : "brand",
      brand: t9 ? "none" : Ap.A.brand,
      text: t9 ? "" : tt
    }, {
      img: tA || Ap.av.img,
      cutout: !!tA,
      iconImg: t9 || Ap.A.brand !== "badge" ? null : A1.A.iconColor
    }];
  }
  let Aj = null;
  function Aw() {
    cancelAnimationFrame(Aj);
    Aj = requestAnimationFrame(() => {
      const t9 = A2("#av_canvas");
      const tA = t9.getContext("2d");
      tA.clearRect(0, 0, t9.width, t9.height);
      if (Ap.av.img) {
        try {
          const [tt, tY] = AS();
          A0.avatar(tA, t9.width, tt, tY);
        } catch (tK) {
          console.error(tK);
        }
      } else {
        (function (tv, tF) {
          tv.fillStyle = "#002e5e";
          tv.fillRect(0, 0, tF, tF);
          tv.strokeStyle = "rgba(107,192,99,.55)";
          tv.lineWidth = tF * 0.006;
          tv.setLineDash([tF * 0.02, tF * 0.016]);
          tv.strokeRect(tF * 0.08, tF * 0.08, tF * 0.84, tF * 0.84);
          tv.setLineDash([]);
          tv.fillStyle = "#ffffff";
          tv.textAlign = "center";
          tv.textBaseline = "middle";
          tv.font = "900 " + tF * 0.06 + "px Montserrat, Arial";
          tv.fillText("Your AI avatar", tF / 2, tF * 0.44);
          tv.fillText("shows here", tF / 2, tF * 0.52);
          tv.fillStyle = "#6bc063";
          tv.beginPath();
          tv.arc(tF / 2 + tF * 0.2, tF * 0.535, tF * 0.012, 0, 7);
          tv.fill();
          tv.fillStyle = "rgba(255,255,255,.75)";
          tv.font = "600 " + tF * 0.028 + "px \"Open Sans\", Arial";
          tv.fillText("Follow steps 1 to 3 on the right", tF / 2, tF * 0.62);
        })(tA, t9.width);
      }
    });
  }
  function Ao(t9, tA) {
    const tt = document.createElement("canvas");
    tt.width = tt.height = t9;
    const [tY, tK] = AS(tA);
    A0.avatar(tt.getContext("2d"), t9, tY, tK);
    return tt;
  }
  function AJ() {
    const t9 = A2("#av_fine");
    if (!Ap.av.img) {
      t9.innerHTML = "<p class=\"note fun-wide\">Upload your AI picture in step 3 to add your iMath badge, frame, background and name banner.</p>";
      return;
    }
    const tA = Ap.A;
    const tt = As();
    t9.innerHTML = AC("af_brand", [["badge", "iMath badge"], ["ring", "Green frame"], ["colors", "Green dot only"], ["none", "No branding"]], tA.brand, "iMath touch") + (tt || !Ap.av.alpha && Ap.av.cut ? AC("af_bg", AV, tt ? tA.bg : "brand", "Background") : "") + ("<label>Banner text (optional)<input type=\"text\" id=\"af_text\" maxlength=\"18\" value=\"" + A3(tA.text === "@name" ? AW() : tA.text) + "\" placeholder=\"Your name or SOLD!\"></label><div class=\"actions fun-wide\" style=\"margin:0\"><button class=\"mini\" type=\"button\" id=\"af_name\">Use my first name</button><button class=\"mini\" type=\"button\" id=\"af_noText\">No banner</button></div>") + (Ap.av.alpha ? "" : Ap.av.cut ? "<label class=\"check fun-wide\"><input type=\"checkbox\" id=\"af_rm\"" + (tA.removeBg ? " checked" : "") + "> Remove the plain background</label>" : "<p class=\"note fun-wide\">Tip: ask Gemini for a plain white background so your avatar can sit on iMath backgrounds and in GIFs.</p>");
    A2("#af_brand").onchange = tF => {
      tA.brand = tF.target.value;
      An = null;
      Aw();
      Ad();
    };
    const tY = A2("#af_bg");
    if (tY) {
      tY.onchange = tF => {
        tA.bg = tF.target.value;
        if (!tA.removeBg && Ap.av.cut) {
          tA.removeBg = true;
          AJ();
        }
        An = null;
        Aw();
        Ad();
      };
    }
    const tK = A2("#af_text");
    tK.oninput = () => {
      if (A6(tK.value)) {
        tA.text = "";
        AQ("Please keep banner words clean and family friendly.");
      } else if (A4.test(tK.value)) {
        tA.text = "";
        AQ("Keep phone numbers, websites and offers off your avatar so it works everywhere, including GIPHY.");
      } else {
        tA.text = tK.value;
      }
      Aw();
      Ad();
    };
    A2("#af_name").onclick = () => {
      if (AW()) {
        tA.text = "@name";
        AJ();
        Aw();
        Ad();
      } else {
        AQ("Add your name in My profile first.");
      }
    };
    A2("#af_noText").onclick = () => {
      tA.text = "";
      AJ();
      Aw();
      Ad();
    };
    const tv = A2("#af_rm");
    if (tv) {
      tv.onchange = tF => {
        tA.removeBg = tF.target.checked;
        An = null;
        AJ();
        Aw();
        Ad();
      };
    }
  }
  let AM = null;
  let AT = 0;
  let An = null;
  function Aq() {
    const t9 = [];
    if (Ap.G.useAvatar) {
      const tA = function () {
        if (!Ap.av.img) {
          return null;
        }
        if (!An) {
          const tt = As();
          An = tt ? {
            img: Ai(tt, 520),
            cut: true
          } : {
            img: Ao(480, true),
            cut: false
          };
        }
        return An;
      }();
      if (tA) {
        t9.push(tA);
      }
    }
    Ap.gifImgs.forEach(tt => t9.push(tt));
    return t9;
  }
  function AL() {
    if (Ap.G.lock === "auto") {
      if (AI()) {
        return "mortgage";
      } else {
        return "realtor";
      }
    } else {
      return Ap.G.lock;
    }
  }
  function AZ() {
    const t9 = AL() === "mortgage";
    const tA = A1.A;
    return {
      icon: tA.iconColor,
      lockDark: t9 ? tA.mortRev || tA.mortColor : tA.lockupHRev,
      lockLight: t9 ? tA.mortColor : tA.lockupH,
      name: String(A1.P().agentName || "").trim()
    };
  }
  function AH() {
    const t9 = Ap.G;
    const tA = Aq();
    let tt = t9.layout;
    if (tt === "cutout" && !tA.some(tF => tF.cut)) {
      tt = "circle";
    }
    if (t9.sticker && tt === "full") {
      tt = "circle";
    }
    const [tY, tK] = Ak[t9.size] || Ak.sq;
    const tv = t9.sign || "none";
    return {
      w: tY,
      h: tK,
      bg: t9.sticker ? "none" : t9.bg,
      subjects: tA.map(tF => tF.img),
      layout: tt,
      shape: tt === "circle" ? "circle" : null,
      motion: t9.motion,
      effects: t9.effects.slice(),
      text: t9.text,
      sub: t9.sub,
      items: tv === "checklist" && t9.items || null,
      textFx: t9.textFx,
      brand: t9.brand,
      brandEls: (t9.brandEls || []).slice(),
      sign: tv,
      signColor: t9.signColor,
      signPhoto: !!t9.signPhoto && AY.includes(tv),
      signSide: !!t9.signSide,
      seed: 17
    };
  }
  function Al() {
    cancelAnimationFrame(AM);
    const t9 = A2("#gif_canvas");
    const tA = AH();
    const tt = AZ();
    if (t9.width !== tA.w || t9.height !== tA.h) {
      t9.width = tA.w;
      t9.height = tA.h;
    }
    const tY = t9.getContext("2d");
    const tK = tv => {
      if (Ap.mode !== "gif" || !A1.isFun()) {
        AM = null;
        return;
      }
      const tF = (tv - AT) / 1000 % Ap.G.seconds / Ap.G.seconds;
      tY.clearRect(0, 0, t9.width, t9.height);
      try {
        A0.gifFrame(tY, tA, tF, tt);
      } catch (tP) {
        console.error(tP);
      }
      AM = requestAnimationFrame(tK);
    };
    AT = performance.now();
    AM = requestAnimationFrame(tK);
  }
  function Ah() {
    Ap.gifBlob = null;
    A2("#gif_dl").disabled = true;
    Ab();
    Ad();
    if (Ap.mode === "gif") {
      Al();
    }
  }
  function Ar() {
    const t9 = Ap.G;
    return [t9.text, t9.sub].concat(t9.sign === "checklist" && t9.items ? t9.items : []).join(" ");
  }
  function Ab(t9) {
    const tA = Ap.G;
    const tt = Ar();
    const tY = tA.tags.split(",").map(tP => tP.trim()).filter(Boolean);
    const tK = new Set(tA.brandEls || []);
    const tv = tK.has("lockbar") || tK.has("endcard") || tA.sign && tA.sign !== "none" && tA.sign !== "street" && tA.sign !== "doormat";
    const tF = [[tA.seconds <= 6, "Length " + tA.seconds + " seconds (GIPHY suggests 6 or less)"], [!A4.test(tt), A4.test(tt) ? "Remove phone numbers, websites, prices, rates and calls to action. GIPHY treats them as ads." : "No contact info or calls to action"], [!A5.test(tt), A5.test(tt) ? "Keep the words family friendly for a G rating" : "Family friendly words"], [AL() === "mortgage" || !!tv, AL() === "mortgage" ? "Mortgage lockup selected for loan officers" : tv ? "The iMath and United lockup shows, so the brokerage is named" : "Florida team rule: add the logo bar, the end card or a sign so the brokerage name shows"], [null, tA.brand === "bold" || tK.size > 4 ? "Bold branding is great for the iMath channel. Keep the moment fun and expressive, not an ad." : "Branding reads as a friendly touch"], [tY.length >= 3 && tY.length <= 20, tY.length + " of 20 tags" + (tY.length < 3 ? ", add a few more" : "")], [t9 == null ? null : t9 <= 8000000, t9 == null ? "File size checked after you make the GIF" : "File size " + (t9 / 1000000).toFixed(1) + " MB" + (t9 > 8000000 ? ", over the 8 MB GIPHY recommends. Try 2 seconds or fewer effects." : "")], [null, "Only you, or teammates and clients who said yes, appear in it"]];
    A2("#gif_check").innerHTML = tF.map(([tP, tE]) => "<li class=\"" + (tP === true ? "ok" : tP === false ? "bad" : "") + "\">" + A3(tE) + "</li>").join("");
    A2("#gif_tagN").textContent = "(" + tY.length + " of 20)";
    return !A4.test(tt) && !A5.test(tt);
  }
  function AN() {
    const t9 = Ap.G;
    const tA = A2("#gif_sign");
    const tt = tG => (AA.find(tx => tx[0] === tG) || [0, tG])[1];
    const tY = At.map(([tG, tx]) => [tG, tx.map(tk => Object.assign([tt(tk)], {
      v: tk
    }))]);
    const tK = AY.includes(t9.sign);
    const tv = t9.sign && t9.sign !== "none";
    tA.innerHTML = "<div class=\"fun-chips\" id=\"gs_kinds\"></div>" + (tv ? "<div class=\"fun-cg\" style=\"margin-top:12px\"><b>Sign color</b><div id=\"gs_cols\"></div></div>" : "") + ("<div class=\"fun-grid\">" + AC("gs_lock", [["auto", "Auto (" + (AI() ? "loan officer" : "agent") + ", from the roster)"], ["realtor", "iMath and United (agents)"], ["mortgage", "iMath mortgage (loan officers)"]], t9.lock, "Logo on signs and bars")) + (tv ? "<label>" + (t9.sign === "street" ? "Top street blade" : "Sign words") + "<input type=\"text\" id=\"gs_text\" maxlength=\"22\" value=\"" + A3(t9.text) + "\"></label><label>" + (t9.sign === "rider" ? "Words under the logo (optional, your name shows if empty)" : t9.sign === "street" ? "Bottom blade" : "Small words (optional)") + "<input type=\"text\" id=\"gs_sub\" maxlength=\"34\" value=\"" + A3(t9.sub) + "\"></label>" : "") + (t9.sign === "checklist" ? "<div class=\"fun-wide\"><b class=\"fun-mini\">Checklist steps</b><div class=\"fun-grid\" style=\"margin-top:4px\">" + [0, 1, 2, 3].map(tG => "<input type=\"text\" data-item=\"" + tG + "\" maxlength=\"22\" value=\"" + A3((t9.items || ["Application", "Appraisal", "Underwriting", t9.text || "Clear to close"])[tG] || "") + "\" aria-label=\"Step " + (tG + 1) + "\">").join("") + "</div></div>" : "") + (tv ? "<div class=\"toggles fun-wide\">" + (tK ? "<label><input type=\"checkbox\" id=\"gs_photo\"" + (t9.signPhoto ? " checked" : "") + "> Put my picture on the sign</label>" : "") + "<label><input type=\"checkbox\" id=\"gs_side\"" + (t9.signSide ? " checked" : "") + "> Show me next to the sign</label></div>" : "") + "</div><div class=\"fun-cg\" style=\"margin-top:14px\"><b>How much iMath</b><div id=\"gs_presets\"></div></div>" + ("<div class=\"toggles fun-brandels\" id=\"gs_els\">" + Av.map(([tG, tx]) => "<label><input type=\"checkbox\" data-el=\"" + tG + "\"" + ((t9.brandEls || []).includes(tG) ? " checked" : "") + "> " + A3(tx) + "</label>").join("") + "</div>");
    AB(A2("#gs_kinds"), tY, tG => {
      const tx = t9.sign;
      t9.sign = tG.v;
      if (tG.v === "street" && tx !== "street") {
        if (!t9.text || t9.text === "SOLD!") {
          t9.text = "Homeowner Ave";
        }
        t9.sub ||= "iMath Group";
      }
      if (tG.v === "progress" && !t9.text) {
        t9.text = "Clear to close";
      }
      if (tG.v === "checklist" && !t9.items) {
        t9.items = ["Application", "Appraisal", "Underwriting", "Clear to close"];
      }
      if (tG.v !== "none" && !Aq().length) {
        t9.signSide = false;
      }
      AN();
      Aa();
      Ah();
    }, tG => t9.sign === tG.v || !t9.sign && tG.v === "none");
    if (tv) {
      const tG = A2("#gs_cols");
      tG.innerHTML = AK.map(([tx, tk, tp]) => "<button type=\"button\" class=\"chip\" data-col=\"" + tx + "\" aria-pressed=\"" + (t9.signColor === tx) + "\"><span class=\"sw\" style=\"background:" + tp + ";border-color:#9aa4ae\"></span>" + tk + "</button>").join("");
      tG.querySelectorAll("[data-col]").forEach(tx => tx.onclick = () => {
        t9.signColor = tx.dataset.col;
        AN();
        Ah();
      });
    }
    A2("#gs_lock").onchange = tx => {
      t9.lock = tx.target.value;
      Ah();
      Ab();
    };
    const tF = A2("#gs_text");
    if (tF) {
      tF.oninput = () => {
        t9.text = tF.value;
        const tx = A2("#gf_text");
        if (tx) {
          tx.value = tF.value;
        }
        Ah();
      };
    }
    const tP = A2("#gs_sub");
    if (tP) {
      tP.oninput = () => {
        t9.sub = tP.value;
        const tx = A2("#gf_sub");
        if (tx) {
          tx.value = tP.value;
        }
        Ah();
      };
    }
    tA.querySelectorAll("[data-item]").forEach(tx => tx.oninput = () => {
      const tk = (t9.items || ["Application", "Appraisal", "Underwriting", "Clear to close"]).slice();
      tk[+tx.dataset.item] = tx.value;
      t9.items = tk;
      Ah();
    });
    const tE = A2("#gs_photo");
    if (tE) {
      tE.onchange = tx => {
        t9.signPhoto = tx.target.checked;
        if (t9.signPhoto) {
          t9.signSide = false;
          if (!Aq().length) {
            AX("Add a photo or use your avatar in step 1 to put it on the sign.");
          }
        }
        AN();
        Ah();
      };
    }
    const tg = A2("#gs_side");
    if (tg) {
      tg.onchange = tx => {
        t9.signSide = tx.target.checked;
        if (t9.signSide) {
          t9.signPhoto = false;
          if (!Aq().length) {
            AX("Add a photo or use your avatar in step 1 to stand next to the sign.");
          }
        }
        AN();
        Ah();
      };
    }
    const tV = A2("#gs_presets");
    tV.innerHTML = AF.map((tx, tk) => "<button type=\"button\" class=\"chip\" data-pre=\"" + tk + "\" aria-pressed=\"" + (tp => t9.brand === tp[1].brand && JSON.stringify((t9.brandEls || []).slice().sort()) === JSON.stringify(tp[1].brandEls.slice().sort()))(tx) + "\">" + A3(tx[0]) + "</button>").join("");
    tV.querySelectorAll("[data-pre]").forEach(tx => tx.onclick = () => {
      const tk = AF[+tx.dataset.pre];
      t9.brand = tk[1].brand;
      t9.brandEls = tk[1].brandEls.slice();
      AN();
      Ah();
      AX(tk[0] + " branding on. Turn single pieces on or off below.");
    });
    tA.querySelectorAll("[data-el]").forEach(tx => tx.onchange = () => {
      const tk = tx.dataset.el;
      t9.brandEls = tx.checked ? [...new Set((t9.brandEls || []).concat(tk))] : (t9.brandEls || []).filter(tp => tp !== tk);
      AN();
      Ah();
    });
  }
  function Aa() {
    const t9 = Ap.G;
    const tA = t9.sign && t9.sign !== "none";
    A2("#gif_fine").innerHTML = "<label>" + (tA ? "Big words (on the sign)" : "Big words") + "<input type=\"text\" id=\"gf_text\" maxlength=\"22\" value=\"" + A3(t9.text) + "\"></label><label>Small words (optional)<input type=\"text\" id=\"gf_sub\" maxlength=\"34\" value=\"" + A3(t9.sub) + "\"></label>" + (tA ? "" : AC("gf_textFx", Ag, t9.textFx, "Text style")) + AC("gf_motion", AE, t9.motion, !tA || t9.signSide || t9.signPhoto ? "Motion" : "Motion (for pictures)") + AC("gf_bg", AV.filter(tY => tY[0] !== "none"), t9.bg, "Background") + AC("gf_layout", [["cutout", "Cutout or avatar"], ["circle", "Circle photo"], ["full", "Full photo background"]], t9.layout, "Picture layout") + AC("gf_size", [["sq", "Square 480 x 480"], ["port", "Portrait 480 x 600"]], t9.size, "Size") + ("<label>Length <span class=\"tag\" id=\"gf_secV\">" + t9.seconds + " s</span><input type=\"range\" id=\"gf_sec\" min=\"2\" max=\"6\" step=\"0.5\" value=\"" + t9.seconds + "\"></label>") + ("<div class=\"toggles fun-wide\"><label><input type=\"checkbox\" id=\"gf_safe\"" + (t9.safe ? " checked" : "") + "> GIPHY safe mode</label><label><input type=\"checkbox\" id=\"gf_sticker\"" + (t9.sticker ? " checked" : "") + "> Transparent sticker</label></div>") + ("<div class=\"fun-wide\"><b class=\"fun-mini\">Effects <small id=\"gf_fxN\">(" + t9.effects.length + " on, up to 5)</small></b>" + Ae.map(([tY, tK]) => "<div class=\"fun-fxg\"><span>" + A3(tY) + "</span><div class=\"toggles\">" + tK.map(([tv, tF]) => "<label><input type=\"checkbox\" data-fx=\"" + tv + "\"" + (t9.effects.includes(tv) ? " checked" : "") + "> " + A3(tF) + "</label>").join("") + "</div></div>").join("") + "</div>");
    const tt = (tY, tK, tv) => {
      const tF = A2("#" + tY);
      if (tF) {
        tF[tF.tagName === "SELECT" ? "onchange" : "oninput"] = () => {
          t9[tK] = tv ? +tF.value : tF.value;
          if (tK === "seconds") {
            A2("#gf_secV").textContent = tF.value + " s";
          }
          if (tK === "text" || tK === "sub") {
            const tP = A2("#gs_" + tK);
            if (tP) {
              tP.value = tF.value;
            }
          }
          Ah();
        };
      }
    };
    tt("gf_text", "text");
    tt("gf_sub", "sub");
    tt("gf_textFx", "textFx");
    tt("gf_motion", "motion");
    tt("gf_bg", "bg");
    tt("gf_layout", "layout");
    tt("gf_size", "size");
    tt("gf_sec", "seconds", true);
    A2("#gf_safe").onchange = tY => {
      t9.safe = tY.target.checked;
      Ah();
    };
    A2("#gf_sticker").onchange = tY => {
      t9.sticker = tY.target.checked;
      Ah();
    };
    A2("#gif_fine").querySelectorAll("[data-fx]").forEach(tY => tY.onchange = () => {
      const tK = tY.dataset.fx;
      if (tY.checked && t9.effects.length >= 5) {
        tY.checked = false;
        AX("Five effects at most keeps the GIF smooth and under 8 MB. Turn one off first.");
        return;
      }
      t9.effects = tY.checked ? [...new Set(t9.effects.concat(tK))] : t9.effects.filter(tv => tv !== tK);
      A2("#gf_fxN").textContent = "(" + t9.effects.length + " on, up to 5)";
      Ah();
    });
  }
  function Af(t9) {
    const tA = Ap.G;
    Object.keys(t9).forEach(tt => {
      if (tt === "fx") {
        if (!tA.effects.includes(t9.fx)) {
          tA.effects = tA.effects.concat(t9.fx).slice(-5);
        }
      } else if (tt === "effects") {
        tA.effects = t9.effects.slice(0, 5);
      } else {
        tA[tt] = Array.isArray(t9[tt]) ? t9[tt].slice() : t9[tt];
      }
    });
    if (tA.sign && tA.sign !== "none" && !Aq().length) {
      tA.signSide = false;
      tA.signPhoto = false;
    }
    AN();
    Aa();
    A2("#gif_tags").value = tA.tags;
    Ah();
  }
  const Am = [["rider", "rider|sold sign"], ["yard", "yard sign|for sale sign|listing sign"], ["aframe", "a frame|aframe|open house sign|sandwich board"], ["marquee", "marquee|lights|broadway"], ["neon", "neon"], ["street", "street sign|street|avenue|ave\\b"], ["keytag", "key tag|keychain|key chain"], ["billboard", "billboard"], ["banner", "banner|flag"], ["doormat", "doormat|door mat|welcome mat"], ["progress", "progress|loading bar|percent"], ["checklist", "checklist|check list|road to closing|steps"], ["none", "no sign|without a sign|just words"]];
  const AR = {
    confetti: "confetti",
    streamers: "streamer",
    balloons: "balloon",
    fireworks: "firework",
    flash: "flash",
    houses: "house",
    keys: " key",
    pins: " pin",
    boxes: "box",
    checks: "check",
    money: "money",
    sparkles: "sparkle",
    glitter: "glitter",
    stars: "twinkl",
    lightleak: "light leak",
    bubbles: "bubble",
    hearts: "heart",
    snow: "snow",
    logorain: "logo rain",
    rays: "rays",
    glow: "glow",
    spotlight: "spotlight",
    speedlines: "speed line",
    glitch: "glitch",
    rainbow: "color flash"
  };
  const AD = AE.map(([t9, tA]) => [t9, tA.toLowerCase().replace("flipbook of my photos", "flipbook").replace("hold still", "still")]);
  function t0(t9) {
    const tA = " " + String(t9 || "").toLowerCase() + " ";
    const tt = {};
    const tY = [];
    Ax.forEach(([, tF]) => tF.forEach(([tP, tE]) => {
      if (tA.includes(tP.toLowerCase().replace("!", ""))) {
        Object.assign(tt, tE);
      }
    }));
    Ae.forEach(([, tF]) => tF.forEach(([tP, tE]) => {
      if (tA.includes(tE.toLowerCase()) || tA.includes(AR[tP] || tP)) {
        tY.push(tP);
      }
    }));
    if (tY.length) {
      tt.effects = [...new Set(tY)].slice(0, 5);
    }
    AD.forEach(([tF, tP]) => {
      if (tA.includes(tP)) {
        tt.motion = tF;
      }
    });
    Am.forEach(([tF, tP]) => {
      if (new RegExp(tP).test(tA)) {
        tt.sign = tF;
      }
    });
    AK.forEach(([tF]) => {
      if (new RegExp("\\b" + tF + " (sign|one)|on " + tF + "\\b|" + tF + " background").test(tA)) {
        tt.signColor = tF;
      }
    });
    if (/everywhere|all over|max(imum)? brand|lots of (imath|branding)/.test(tA)) {
      Object.assign(tt, AF[3][1]);
    } else if (/bold/.test(tA)) {
      Object.assign(tt, AF[2][1]);
    } else if (/light touch|subtle|minimal/.test(tA)) {
      Object.assign(tt, AF[0][1]);
    }
    const tK = Av.filter(([tF, tP]) => tA.includes(tP.toLowerCase()) || tA.includes(tF === "nametag" ? "name tag" : tF === "lockbar" ? "logo bar" : tF === "endcard" ? "end card" : "\0")).map(tF => tF[0]);
    if (tK.length) {
      tt.brandEls = [...new Set((tt.brandEls || Ap.G.brandEls || []).concat(tK))];
    }
    if (/next to|beside|standing by/.test(tA)) {
      tt.signSide = true;
    }
    if (/(my )?(photo|picture|face) on the sign/.test(tA)) {
      tt.signPhoto = true;
    }
    const tv = String(t9).match(/["“]([^"”]{1,22})["”]/);
    if (tv) {
      tt.text = tv[1];
    } else {
      const tF = tA.match(/\b(?:say|says|saying)\s+([a-z0-9!' ]{2,22})/i);
      if (tF) {
        tt.text = tF[1].trim().replace(/^\w/, tP => tP.toUpperCase());
      }
    }
    return tt;
  }
  async function t1() {
    const t9 = A2("#gif_prompt").value.trim();
    if (!t9) {
      AX("Pick a moment above, or describe what you want.");
      return;
    }
    if (A6(t9)) {
      AX("Please keep it clean. GIFs from the iMath studio stay family friendly, so that request was not used.");
      return;
    }
    const tA = A1.sampler;
    let tt = null;
    if (tA) {
      AX("Claude is reading your idea...");
      try {
        const tY = await tA.json("Turn this request into settings for a looping, branded GIF for a real estate and mortgage team (iMath Group). The audience is realtors and loan officers. Use only listed values. Keep it G rated, never vulgar or suggestive, and expressive, never an ad: no phone numbers, websites, prices, rates or calls to action in any words.\nsign (an animated iMath branded sign): " + AA.map(tK => tK[0] + " = " + tK[1]).join("; ") + "\nsignColor: navy, green, gray, white\neffects (up to 5): " + AP.join(", ") + "\nmotion: " + AE.map(tK => tK[0]).join(", ") + "\ntextFx: " + Ag.map(tK => tK[0]).join(", ") + "\nbg: " + AV.filter(tK => tK[0] !== "none").map(tK => tK[0]).join(", ") + "\nbrandEls (iMath branding pieces, any): " + Av.map(tK => tK[0] + " = " + tK[1]).join("; ") + "\nbrand: light, balanced, bold\nREQUEST: " + t9 + "\nReply with only JSON: {\"sign\":\"\",\"signColor\":\"\",\"text\":\"max 22 characters, the big words\",\"sub\":\"optional, max 34\",\"items\":[\"only for checklist, up to 4 short steps\"],\"effects\":[],\"motion\":\"\",\"textFx\":\"\",\"bg\":\"\",\"brand\":\"\",\"brandEls\":[],\"signSide\":false,\"tags\":\"8 to 15 comma separated search tags people would type\",\"note\":\"one short friendly sentence\"}", {
          modelTier: "quick"
        });
        if (tY && typeof tY == "object") {
          tt = {};
          const tK = (tv, tF) => {
            if (tY[tv] && tF.some(tP => tP[0] === tY[tv])) {
              tt[tv] = tY[tv];
            }
          };
          tK("sign", AA);
          tK("signColor", AK);
          tK("motion", AE);
          tK("textFx", Ag);
          tK("bg", AV);
          if (["light", "balanced", "bold"].includes(tY.brand)) {
            tt.brand = tY.brand;
          }
          if (Array.isArray(tY.effects)) {
            tt.effects = tY.effects.filter(tv => AP.includes(tv)).slice(0, 5);
          }
          if (Array.isArray(tY.brandEls)) {
            tt.brandEls = tY.brandEls.filter(tv => Av.some(tF => tF[0] === tv));
          }
          ["text", "sub"].forEach(tv => {
            if (tY[tv] != null && !A4.test(tY[tv]) && !A6(tY[tv])) {
              tt[tv] = String(tY[tv]).slice(0, tv === "text" ? 22 : 34);
            }
          });
          if (Array.isArray(tY.items) && tY.items.length && tt.sign === "checklist") {
            tt.items = tY.items.map(tv => String(tv).slice(0, 22)).filter(tv => !A4.test(tv) && !A6(tv)).slice(0, 4);
          }
          if (typeof tY.signSide == "boolean") {
            tt.signSide = tY.signSide;
          }
          if (tY.tags) {
            tt.tags = String(tY.tags).split(",").map(tv => tv.trim()).filter(Boolean).slice(0, 20).join(", ");
          }
          AX(tY.note ? String(tY.note).slice(0, 200) : "Done. Adjust anything in steps 3 and 4.");
        }
      } catch (tv) {
        tt = null;
      }
    }
    if (!tt || !Object.keys(tt).length) {
      tt = t0(t9);
      AX(Object.keys(tt).length ? "Applied. Adjust anything in steps 3 and 4." : "I could not match that. Tap a moment or a sign to build it.");
    }
    if (Object.keys(tt).length) {
      Af(tt);
    }
  }
  async function t2() {
    const t9 = Ap.G;
    t9.tags = A2("#gif_tags").value;
    if (A6([Ar(), t9.tags].join(" "))) {
      AX("Please remove the words that are not family friendly. Nothing vulgar is allowed in iMath GIFs.");
      Ab();
      return;
    }
    if (t9.safe && !Ab()) {
      AX("GIPHY safe mode found something to fix. See the GIPHY ready check.");
      return;
    }
    if (!Aq().length && t9.layout === "full" && (!t9.sign || t9.sign === "none")) {
      AX("Add a photo for a full photo background.");
      return;
    }
    const tA = A2("#gif_make");
    tA.disabled = true;
    const tt = AH();
    try {
      const tY = await A0.encodeGif(tt, {
        seconds: t9.seconds,
        fps: 15,
        transparent: t9.sticker
      }, tv => AX("Making your GIF: " + Math.round(tv * 100) + "%"), AZ());
      Ap.gifBlob = tY;
      A2("#gif_dl").disabled = false;
      const tK = tY.size <= 8000000;
      Ab(tY.size);
      AX("Ready: " + (tY.size / 1000000).toFixed(1) + " MB, " + tt.w + " x " + tt.h + ", " + t9.seconds + " seconds." + (tK ? "" : " That is large for GIPHY; try 2 seconds or fewer effects."));
    } catch (tv) {
      console.error(tv);
      AX("The GIF could not be made in this browser. Try Chrome, Safari or the Claude desktop app.");
    } finally {
      tA.disabled = false;
    }
  }
  async function t3(t9) {
    const tA = (tF, tP, tE) => {
      A0.background(tF, tP, tP, "burst", 3, tE);
      const tg = tP * 0.36;
      tF.fillStyle = "#fff";
      tF.beginPath();
      tF.arc(tP / 2, tP * 0.45, tg, 0, 7);
      tF.fill();
      tF.lineWidth = tP * 0.03;
      tF.strokeStyle = "#6bc063";
      tF.stroke();
      const tV = A1.A.iconColor;
      if (tV) {
        const tG = tg * 1.4;
        const tx = tG * tV.height / tV.width;
        tF.drawImage(tV, tP / 2 - tG / 2, tP * 0.45 - tx / 2, tG, tx);
      }
      A0.star4(tF, tP * 0.78, tP * 0.2, tP * 0.05 * (0.5 + Math.sin(tE * 6.283) * 0.5), "#ffffff", 1);
      tF.fillStyle = "#fff";
      tF.font = "900 " + tP * 0.1 + "px Montserrat, Arial";
      tF.textAlign = "center";
      tF.fillText("iMath Group", tP / 2, tP * 0.93);
    };
    if (!t9) {
      const tF = document.createElement("canvas");
      tF.width = tF.height = 250;
      tA(tF.getContext("2d"), 250, 0);
      tF.toBlob(tP => A1.save("iMath_GIPHY_channel_avatar.png", tP, AX), "image/png");
      return;
    }
    const tt = window.gifenc;
    const tY = tt.GIFEncoder();
    const tK = document.createElement("canvas");
    tK.width = tK.height = 250;
    const tv = tK.getContext("2d");
    for (let tP = 0; tP < 30; tP++) {
      tA(tv, 250, tP / 30);
      const tE = tv.getImageData(0, 0, 250, 250).data;
      const tg = tt.quantize(tE, 256);
      tY.writeFrame(tt.applyPalette(tE, tg), 250, 250, {
        palette: tg,
        delay: 67
      });
    }
    tY.finish();
    await A1.save("iMath_GIPHY_channel_avatar.gif", new Blob([tY.bytes()], {
      type: "image/gif"
    }), AX);
  }
  function t4() {
    A2("#gif_thumbs").innerHTML = Ap.gifImgs.map((tA, tt) => "<span class=\"fun-thumb\"><img src=\"" + tA.src + "\" alt=\"\"><button type=\"button\" data-rm=\"" + tt + "\" aria-label=\"Remove photo\">×</button></span>").join("");
    A2("#gif_thumbs").querySelectorAll("[data-rm]").forEach(tA => tA.onclick = () => {
      Ap.gifImgs.splice(+tA.dataset.rm, 1);
      t4();
      Ah();
    });
    A2("#gif_name").textContent = Ap.gifImgs.length ? Ap.gifImgs.length + " photo" + (Ap.gifImgs.length > 1 ? "s" : "") + " added" : "Add one or more photos (or a transparent PNG cutout)";
    A2("#gif_srcT").innerHTML = Ap.av.img ? "<label><input type=\"checkbox\" id=\"gs_av\"" + (Ap.G.useAvatar ? " checked" : "") + "> Use my avatar</label>" : "<span class=\"note\">Make your AI avatar first to use it here, or add photos.</span>";
    const t9 = A2("#gs_av");
    if (t9) {
      t9.onchange = tA => {
        Ap.G.useAvatar = tA.target.checked;
        Ah();
      };
    }
  }
  function t5(t9) {
    Ap.mode = t9;
    A2("#fun_avatar").hidden = t9 !== "avatar";
    A2("#fun_gif").hidden = t9 !== "gif";
    document.querySelectorAll("#fun_mode .chip").forEach(tA => tA.setAttribute("aria-pressed", tA.dataset.v === t9));
    if (t9 === "gif") {
      t4();
      AN();
      Al();
    } else {
      Aw();
    }
  }
  let t6 = false;
  function t7() {
    if (Ap.mode === "gif") {
      AN();
      Al();
    } else {
      Aw();
    }
  }
  function t8(t9) {
    if (t9 && t9.isOwner) {
      t9.isOwner().then(tA => {
        Ap.owner = !!tA;
        const tt = A2("#gif_owner");
        if (tt) {
          tt.hidden = !tA;
        }
      }).catch(() => {});
    }
  }
  window.iMathFunApp = {
    init: function () {
      if (t6) {
        t7();
        return;
      }
      t6 = true;
      A1 = window.__studioCtx;
      const t9 = Au("imath_fun") || {};
      if (t9.v === 2) {
        if (t9.pick) {
          Object.assign(Ap.pick, t9.pick, {
            acc: Array.isArray(t9.pick.acc) ? t9.pick.acc : []
          });
        }
        if (t9.A) {
          Object.assign(Ap.A, t9.A);
        }
      }
      if (t9.G) {
        const tt = t9.G;
        Object.assign(Ap.G, tt);
        if (t9.v !== 2) {
          Object.assign(Ap.G, {
            sign: "none",
            brandEls: Ap.G.brand === "bold" ? AF[2][1].brandEls.slice() : ["badge"]
          });
        }
        if (!Array.isArray(Ap.G.effects)) {
          Ap.G.effects = [];
        }
        Ap.G.effects = Ap.G.effects.filter(tY => AP.includes(tY)).slice(0, 5);
      }
      if (t9.v !== 2 && (t9.A || t9.G)) {
        AO("imath_fun_photo", null);
        AO("imath_fun_crop", null);
      }
      if (t9.prompt && t9.v === 2) {
        A2("#av_prompt").value = t9.prompt;
      }
      if (t9.gprompt) {
        A2("#gif_prompt").value = t9.gprompt;
      }
      const tA = Au("imath_fun_photo");
      if (tA && t9.v === 2) {
        const tY = new Image();
        tY.onload = () => {
          Az(tY, "Avatar saved in this browser", true);
          if (Ap.mode === "gif") {
            t4();
            Ah();
          }
        };
        tY.src = tA;
      }
      document.querySelectorAll("#fun_mode .chip").forEach(tK => tK.onclick = () => t5(tK.dataset.v));
      AU();
      Ay();
      A2("#av_prompt").addEventListener("input", () => {
        AQ("");
        Ay();
        Ad();
      });
      A2("#av_gemini").addEventListener("click", () => {
        Ac(true);
      });
      A2("#av_ai").addEventListener("click", () => {
        Ay();
        AQ("Claude opens with your instructions filled in. Attach your selfie there, then bring the picture back in step 3.");
      });
      A2("#av_copy").onclick = () => Ac(false);
      A2("#av_aiIn").addEventListener("change", tK => {
        const tv = tK.target.files[0];
        if (!tv) {
          return;
        }
        const tF = new FileReader();
        tF.onload = () => {
          const tP = new Image();
          tP.onload = () => Az(tP, tv.name);
          tP.onerror = () => AQ("That file could not be read. Try a PNG or JPG.");
          tP.src = tF.result;
        };
        tF.readAsDataURL(tv);
        tK.target.value = "";
      });
      A2("#av_dl").onclick = () => {
        if (Ap.av.img) {
          Ao(1080).toBlob(tK => A1.save("iMath_avatar_" + (AW() || "me") + ".png", tK, AQ), "image/png");
        }
      };
      A2("#av_use").onclick = () => {
        if (Ap.av.img) {
          (async function () {
            const tK = As();
            const tv = Ao(900).toDataURL(tK && Ap.A.bg === "none" ? "image/png" : "image/jpeg", 0.9);
            AO("imath_avatar", tv);
            await A1.setAvatar(true, tv);
            AQ("Your avatar is now your picture across the studio. Switch back any time in My profile.");
            A2("#av_use").textContent = "Update my profile picture";
          })();
        }
      };
      A2("#av_togif").onclick = () => {
        if (Ap.av.img) {
          Ap.G.useAvatar = true;
          An = null;
          Ap.G.layout = As() ? "cutout" : "circle";
          if (Ap.G.sign && Ap.G.sign !== "none") {
            Ap.G.signSide = true;
            Ap.G.signPhoto = false;
          }
          t5("gif");
          Aa();
          Ah();
          AX("Your avatar is in. Pick a moment or a sign.");
        }
      };
      AB(A2("#gif_tpl"), Ax, tK => {
        const tv = tK[1];
        Af(Object.assign({}, tv, {
          items: tv.items || null,
          bg: tv.bg || Ap.G.bg
        }));
        A2("#gif_prompt").value = tK[0];
        AX(tK[0] + " loaded. Change the sign, words, effects and branding below.");
      });
      AB(A2("#gif_chips"), [["Quick effects", Ae.flatMap(tK => tK[1]).slice(0, 14).map(([tK, tv]) => Object.assign([tv, {
        fx: tK
      }]))], ["Motion", AE.slice(0, 8).map(([tK, tv]) => [tv, {
        motion: tK
      }])]], tK => {
        Af(tK[1]);
      });
      A2("#gif_in").addEventListener("change", tK => {
        [...tK.target.files].slice(0, 8 - Ap.gifImgs.length).forEach(tv => {
          const tF = new FileReader();
          tF.onload = () => {
            const tP = new Image();
            tP.onload = () => {
              const tE = Ai(tP, 900);
              Ap.gifImgs.push({
                img: tE,
                src: tE.toDataURL("image/jpeg", 0.7),
                cut: A0.hasAlpha(tE)
              });
              if (Ap.gifImgs.length === 1 && !A0.hasAlpha(tE) && Ap.G.layout === "cutout" && !Ap.G.useAvatar) {
                Ap.G.layout = "circle";
              }
              t4();
              Aa();
              Ah();
            };
            tP.src = tF.result;
          };
          tF.readAsDataURL(tv);
        });
        tK.target.value = "";
      });
      A2("#gif_go").onclick = t1;
      A2("#gif_clear").onclick = () => {
        A2("#gif_prompt").value = "";
        Ad();
      };
      A2("#gif_make").onclick = t2;
      A2("#gif_dl").onclick = () => {
        if (Ap.gifBlob) {
          A1.save("iMath_" + String(Ap.G.text || "gif").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "") + ".gif", Ap.gifBlob, AX);
        }
      };
      A2("#gif_tags").value = Ap.G.tags;
      A2("#gif_tags").oninput = tK => {
        Ap.G.tags = tK.target.value;
        Ab();
        Ad();
      };
      A2("#gif_chanPng").onclick = () => t3(false);
      A2("#gif_chanGif").onclick = () => t3(true);
      if (Au("imath_avatar")) {
        A2("#av_use").textContent = "Update my profile picture";
      }
      AJ();
      Aa();
      AN();
      t4();
      Ab();
      t5("avatar");
      t8(A1.user);
    },
    refresh: t7,
    onUser: t8,
    get state() {
      return Ap;
    },
    parseGif: t0,
    buildPrompt: Ay
  };
})();
