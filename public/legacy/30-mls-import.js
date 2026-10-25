/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. */
// "Pull from MLS" or "Enter manually" for Social Posts and Open House Flyers.
// Looks a listing up by MLS number or street address through the Studio's MLS bridge
// (window.__studioCtx.mlsCall: RealMLS in Claude, the agent's own proxy on the website),
// fills the tab's own detail fields, and hands photos to the tab's own photo input as if the
// agent had chosen the files. The tabs' existing code does the rest, unchanged.
// Flyers also get: a picker with every MLS photo (the agent chooses up to 4, in order) and a
// description of 70 words or less from the MLS remarks, or from Zillow when there are none.
(function () {
  const MAX_WORDS = 70;
  const TARGETS = {
    social: {
      anchor: "#photoRow",
      fields: { address: "#f_address", city: "#f_city", price: "#f_price", beds: "#f_beds", baths: "#f_baths", sqft: "#f_sqft" },
      photoInput: "#photoIn",
      maxPhotos: 1,
      // Only listing templates have an address field; hide the choice on the others.
      visible: () => !!document.querySelector("#f_address"),
      watch: "#fields",
    },
    flyers: {
      anchor: "#flyerPhotos",
      fields: { address: "#fl_address", city: "#fl_city", price: "#fl_price", beds: "#fl_beds", baths: "#fl_baths", sqft: "#fl_sqft" },
      photoInput: "#flyerPhotos",
      maxPhotos: 4,
      picker: true,
      description: "#fl_description",
      visible: () => true,
    },
  };
  const SELECT = "ListingId,ListingKey,UnparsedAddress,City,StateOrProvince,PostalCode,ListPrice,ClosePrice,BedsTotal,BathsTotal,LivingArea,BuildingAreaTotal,MlsStatus,ListOfficeName,PublicRemarks";
  const OWN_OFFICE = /united real estate gallery/i;
  const FAIR_HOUSING = "Fair Housing: describe the home, its features and its location only, never the buyer, the neighbors or who the home suits. No words about family status, age, religion, race, disability, gender or national origin.";
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  function build(name, cfg) {
    const anchor = document.querySelector(cfg.anchor);
    if (!anchor) return;
    const before = name === "flyers" ? anchor.closest(".file") : anchor;
    const box = document.createElement("div");
    box.className = "mls-import";
    box.innerHTML =
      '<div class="seg" role="group" aria-label="Listing details">' +
      '<button type="button" class="chip" data-src="mls" aria-pressed="false">Pull from MLS</button>' +
      '<button type="button" class="chip" data-src="manual" aria-pressed="true">Enter manually</button></div>' +
      '<div class="mls-row" hidden>' +
      '<div class="mls-find"><label for="mls_q_' + name + '">MLS number or street address' +
      '<input type="text" id="mls_q_' + name + '" placeholder="MLS # or 123 Main St" autocomplete="off" spellcheck="false"></label>' +
      '<button class="btn green" type="button" data-pull>Pull listing</button></div>' +
      '<label class="check"><input type="checkbox" id="mls_ok_' + name + '"> Also use the listing photos. I have the right to use them for marketing: it is my listing, or the listing broker and photographer gave permission.</label>' +
      '<div class="status" role="status" data-status></div>' +
      (cfg.picker ? '<div class="mls-pick-wrap" hidden><p class="note" data-pick-note></p><div class="mls-pick" role="group" aria-label="Listing photos"></div></div>' : "") +
      "</div>";
    before.parentNode.insertBefore(box, before);

    const row = box.querySelector(".mls-row");
    const status = box.querySelector("[data-status]");
    const say = (text, bad) => { status.textContent = text; status.style.color = bad ? "var(--danger, #c2463b)" : ""; };
    const setMode = (mode) => {
      box.querySelectorAll("[data-src]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.src === mode)));
      row.hidden = mode !== "mls";
      store.set("imath_mls_src_" + name, mode);
    };
    box.querySelectorAll("[data-src]").forEach((b) => (b.onclick = () => setMode(b.dataset.src)));
    setMode(store.get("imath_mls_src_" + name) === "mls" ? "mls" : "manual");

    const input = box.querySelector("input[type=text]");
    const pull = box.querySelector("[data-pull]");
    const picker = cfg.picker ? makePicker(box, cfg) : null;
    const run = () => pullListing(cfg, input.value, box.querySelector("input[type=checkbox]").checked, say, pull, picker);
    pull.onclick = run;
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); run(); } });

    const sync = () => { box.hidden = !cfg.visible(); };
    sync();
    if (cfg.watch) new MutationObserver(sync).observe(document.querySelector(cfg.watch), { childList: true });
    if (cfg.description) descriptionTools(cfg.description);
  }

  async function pullListing(cfg, query, withPhotos, say, button, picker) {
    const ctx = window.__studioCtx;
    const q = String(query || "").trim();
    if (!q) return say("Type an MLS number or a street address first.", true);
    if (!ctx || !ctx.mlsCall) return say("The MLS connection is not ready yet. Try again in a moment.", true);
    const cma = window.iMathCMA || {};
    button.disabled = true;
    try {
      say("Finding the listing...");
      const isNumber = /^[0-9A-Za-z-]{4,12}$/.test(q) && /\d/.test(q) && !/\s/.test(q);
      const street = q.split(",")[0].trim().replace(/'/g, "");
      const res = await ctx.mlsCall("ListingsListingSearch", {
        _filter: isNumber ? "ListingId Eq '" + q.replace(/[^0-9A-Za-z-]/g, "") + "'" : "StreetAddress Eq '" + street + "'",
        _select: SELECT,
        _limit: 5,
        property_type_codes: cma.TYPES || ["A", "B", "C", "D", "E", "F"],
        status_values: cma.ALL_STATUS || ["Active", "Pending", "Closed"],
      });
      const hit = res && res.results && res.results[0];
      if (!hit) return say(isNumber ? "No listing with that MLS number. Check the number, or enter the details manually." : "No listing at that address. Try the MLS number, or enter the details manually.", true);
      const f = hit.StandardFields || {};
      fill(cfg, f);
      const courtesy = f.ListOfficeName && !OWN_OFFICE.test(f.ListOfficeName) ? f.ListOfficeName : "";
      const parts = ["Filled in " + tidyStreet(f.UnparsedAddress) + " (MLS " + (f.ListingId || "") + ", " + (f.MlsStatus || "status unknown") + ")."];
      const note = courtesy ? " Listed by " + courtesy + ": you need their permission to advertise it, and add a listing courtesy line." : "";
      say(parts[0] + note);
      const key = f.ListingKey || hit.Id;
      // Description and photos run side by side; each reports into the same status line.
      const jobs = [];
      if (cfg.description) {
        jobs.push(writeDescription(cfg, f).then((msg) => parts.push(msg)));
      }
      if (withPhotos) {
        jobs.push(
          (picker ? picker.load(ctx, key, (m) => say(parts.join(" ") + " " + m + note)) : pullPhotos(ctx, cfg, key, (m) => say(parts.join(" ") + " " + m + note))).then((msg) => parts.push(msg)),
        );
      } else {
        parts.push("Photos were not pulled; check the box to include them.");
      }
      await Promise.all(jobs);
      say(parts.join(" ") + note);
    } catch (err) {
      const code = err && err.code;
      if (code === "not_granted" || code === "server_not_connected" || code === "not_connected" || code === "missing")
        say("The MLS is not connected here. Open the CMA tab and follow the setup guide, or enter the details manually.", true);
      else if (code === "rate_limited") say("The MLS is busy. Wait a moment and try again.", true);
      else say("The MLS lookup failed" + (err && err.message ? ": " + err.message : ".") + " You can enter the details manually.", true);
    } finally {
      button.disabled = false;
    }
  }

  function fill(cfg, f) {
    const closed = /closed|sold/i.test(f.MlsStatus || "");
    const price = closed && f.ClosePrice ? f.ClosePrice : f.ListPrice;
    const area = f.LivingArea || f.BuildingAreaTotal;
    const values = {
      address: tidyStreet(f.UnparsedAddress),
      city: [titleCase(f.City), [f.StateOrProvince, f.PostalCode].filter(Boolean).join(" ")].filter(Boolean).join(", "),
      price: price ? "$" + Math.round(+price).toLocaleString("en-US") : "",
      beds: f.BedsTotal != null ? String(f.BedsTotal) : "",
      baths: f.BathsTotal != null ? String(+f.BathsTotal) : "",
      sqft: area ? Math.round(+area).toLocaleString("en-US") : "",
    };
    for (const [key, sel] of Object.entries(cfg.fields)) {
      if (values[key]) setField(sel, values[key]);
    }
  }

  function setField(sel, value) {
    const el = document.querySelector(sel);
    if (!el) return;
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // ---- Description: MLS remarks first, Zillow's description when the MLS has none ----

  async function writeDescription(cfg, f) {
    const remarks = clean(f.PublicRemarks);
    if (remarks) {
      const text = await condense(remarks);
      setField(cfg.description, text.value);
      return "Description from the MLS remarks" + (text.how ? ", " + text.how : "") + ".";
    }
    const zillow = await fromZillow(f);
    if (zillow && zillow.text) {
      setField(cfg.description, zillow.text);
      return "The MLS has no remarks, so the description is from Zillow. Check it before printing.";
    }
    if (zillow && zillow.unavailable) return "The MLS has no remarks, and the Zillow lookup needs Claude and web search, which are not connected here. Type a description.";
    return "No remarks were found in the MLS or on Zillow; type a description.";
  }

  async function condense(text) {
    if (words(text) <= MAX_WORDS) return { value: text, how: "" };
    const sample = window.__studioCtx && window.__studioCtx.sampler;
    if (sample && sample.json) {
      try {
        const out = await sample.json(
          "Rewrite this real estate listing description for a printed open house flyer in " + MAX_WORDS + " words or fewer. " +
            "Keep the most appealing, specific features and the location. Use only facts from the text; never add details. " +
            "Plain sentences, no headings, no emoji, no all caps, no price. " + FAIR_HOUSING +
            '\nReturn JSON: {"description": "..."}\n\nListing description:\n' + text,
          { modelTier: "quick" },
        );
        const value = clean(out && out.description);
        if (value) return { value: trimWords(value, MAX_WORDS), how: "shortened by Claude to " + Math.min(words(value), MAX_WORDS) + " words" };
      } catch (e) {}
    }
    return { value: trimWords(text, MAX_WORDS), how: "cut to " + MAX_WORDS + " words (connect Claude to shorten it smoothly)" };
  }

  // Finds the home's Zillow page with the web search connector and has Claude pull out the
  // listing description ("What's special"). Returns { text }, { unavailable } when web search or
  // Claude is not connected, or null when nothing was found.
  async function fromZillow(f) {
    const sample = window.__studioCtx && window.__studioCtx.sampler;
    let mcp = null;
    try { mcp = window.claude && window.claude.use ? await window.claude.use("mcp") : null; } catch (e) {}
    if (!mcp || !sample || !sample.json) return { unavailable: true };
    const address = String(f.UnparsedAddress || "").trim();
    if (!address) return null;
    try {
      const found = asText(await mcp.callTool("Parallel Search", "web_search", {
        objective: "Find the Zillow home details page for " + address,
        search_queries: [address + " zillow", "zillow.com homedetails " + address],
      }));
      const url = (found.match(/https:\/\/www\.zillow\.com\/homedetails\/[^\s"'<>)\]]+/) || [])[0];
      if (!url) return null;
      const page = asText(await mcp.callTool("Parallel Search", "web_fetch", {
        urls: [url],
        objective: "The listing description (What's special) for " + address,
      }));
      if (!page.trim()) return null;
      const out = await sample.json(
        "Below is text from a Zillow page for " + address + ". Find the listing's own description (the \"What's special\" text and the agent's description of the home). " +
          "Rewrite it for a printed open house flyer in " + MAX_WORDS + " words or fewer, using only facts stated there. Plain sentences, no price. " + FAIR_HOUSING +
          ' If the page has no description for this home, return {"description": ""}.\nReturn JSON: {"description": "..."}\n\nPage text:\n' + page.slice(0, 12000),
        { modelTier: "quick" },
      );
      const value = clean(out && out.description);
      return value ? { text: trimWords(value, MAX_WORDS) } : null;
    } catch (e) {
      return null;
    }
  }

  // Word counter and "Shorten with Claude" under the flyer description.
  function descriptionTools(sel) {
    const area = document.querySelector(sel);
    const count = document.getElementById("fl_descCount");
    const btn = document.getElementById("fl_descShorten");
    const status = document.getElementById("fl_descStatus");
    if (!area || !count) return;
    const update = () => {
      const n = words(area.value);
      count.textContent = n + " / " + MAX_WORDS;
      count.style.color = n > MAX_WORDS ? "var(--danger, #c2463b)" : "";
      if (btn) btn.hidden = n <= MAX_WORDS;
    };
    area.addEventListener("input", update);
    update();
    // After each preview render, say whether this style shows the description and whether it fits.
    const fitNote = document.getElementById("fl_descFit");
    const preview = document.getElementById("flyerPrev");
    const SHOWS = { magazine: "Magazine Cover", grid: "Classic Grid", spotlight: "Agent Spotlight", brand: "Personal Brand" };
    const checkFit = () => {
      if (!fitNote) return;
      const card = document.querySelector("#flyerStyles .stylecard[aria-pressed=true]");
      const id = card && card.dataset.id;
      const fit = window.iMathPrint && window.iMathPrint.descFit;
      if (!id || !clean(area.value)) fitNote.textContent = "";
      else if (!SHOWS[id]) fitNote.textContent = "This style has no description. It prints on " + Object.values(SHOWS).join(", ") + ".";
      else if (fit && fit.cut) fitNote.textContent = SHOWS[id] + " fits about " + fit.shown + " words here, so the flyer cuts the description short. Shorten it, or choose Magazine Cover or Personal Brand, which have more room.";
      else fitNote.textContent = "";
      fitNote.style.color = fit && fit.cut && SHOWS[id] ? "var(--danger, #c2463b)" : "";
    };
    if (preview) new MutationObserver(checkFit).observe(preview, { attributes: true, attributeFilter: ["src"] });
    if (btn) {
      btn.onclick = async () => {
        btn.disabled = true;
        status.textContent = "Shortening...";
        const out = await condense(clean(area.value));
        setField(sel, out.value);
        status.textContent = out.how ? out.how.charAt(0).toUpperCase() + out.how.slice(1) + "." : "";
        btn.disabled = false;
      };
    }
  }

  // ---- Photos ----

  // Social posts: the primary photo only.
  async function pullPhotos(ctx, cfg, listingKey, progress) {
    const list = await ctx.mlsCall("ListingsListPhotos", { listing_key: listingKey });
    const photos = sortPhotos((list && list.photos) || []).slice(0, cfg.maxPhotos);
    const files = [];
    for (const p of photos) {
      progress("Downloading photo " + (files.length + 1) + " of " + photos.length + "...");
      const file = await fetchPhoto(ctx, listingKey, p, files.length + 1);
      if (file) files.push(file);
    }
    setPhotos(cfg.photoInput, files);
    return files.length ? files.length + " photo" + (files.length === 1 ? "" : "s") + " added." : "This listing has no photos in the MLS; upload one instead.";
  }

  // Flyers: every MLS photo as a thumbnail; the agent picks up to 4, in order (1 is the hero).
  function makePicker(box, cfg) {
    const wrap = box.querySelector(".mls-pick-wrap");
    const grid = box.querySelector(".mls-pick");
    const note = box.querySelector("[data-pick-note]");
    let photos = [];
    let chosen = [];
    let touched = false;
    let run = 0;

    const describe = () => {
      const loading = photos.filter((p) => !p.file && !p.failed).length;
      note.textContent =
        "Tap photos to use them on the flyer, up to " + cfg.maxPhotos + ". The number shows the order; 1 is the large hero photo. " +
        chosen.length + " of " + cfg.maxPhotos + " chosen" + (loading ? ", " + loading + " still loading." : ".");
    };
    const render = () => {
      grid.querySelectorAll(".mls-thumb").forEach((b) => {
        const i = chosen.indexOf(b.dataset.id);
        b.setAttribute("aria-pressed", String(i >= 0));
        b.querySelector(".mls-n").textContent = i >= 0 ? String(i + 1) : "";
      });
      describe();
    };
    const apply = () => setPhotos(cfg.photoInput, chosen.map((id) => photos.find((p) => p.id === id).file).filter(Boolean));
    const toggle = (id) => {
      const p = photos.find((x) => x.id === id);
      if (!p || !p.file) return;
      touched = true;
      const i = chosen.indexOf(id);
      if (i >= 0) chosen.splice(i, 1);
      else if (chosen.length < cfg.maxPhotos) chosen.push(id);
      else {
        note.textContent = "You already chose " + cfg.maxPhotos + ". Tap a chosen photo to remove it first.";
        return;
      }
      render();
      apply();
    };

    async function load(ctx, listingKey, progress) {
      const mine = ++run;
      const list = await ctx.mlsCall("ListingsListPhotos", { listing_key: listingKey });
      photos = sortPhotos((list && list.photos) || []).map((p, i) => ({ id: String(p.Id), raw: p, n: i + 1 }));
      chosen = [];
      touched = false;
      grid.innerHTML = photos
        .map((p) => '<button type="button" class="mls-thumb" data-id="' + p.id + '" aria-pressed="false" disabled aria-label="Listing photo ' + p.n + (p.raw.Primary ? ", primary" : "") + '"><span class="mls-n"></span></button>')
        .join("");
      grid.querySelectorAll(".mls-thumb").forEach((b) => (b.onclick = () => toggle(b.dataset.id)));
      wrap.hidden = !photos.length;
      if (!photos.length) return "This listing has no photos in the MLS; upload photos instead.";
      describe();
      let next = 0;
      let done = 0;
      const worker = async () => {
        while (next < photos.length && mine === run) {
          const p = photos[next++];
          p.file = await fetchPhoto(ctx, listingKey, p.raw, p.n);
          if (mine !== run) return;
          p.failed = !p.file;
          done++;
          progress("Loading photos " + done + " of " + photos.length + "...");
          const b = grid.querySelector('.mls-thumb[data-id="' + p.id + '"]');
          if (b && p.file) {
            const img = new Image();
            img.alt = "";
            img.src = URL.createObjectURL(p.file);
            b.prepend(img);
            b.disabled = false;
          } else if (b) {
            b.classList.add("mls-failed");
          }
          // Until the agent picks, keep the first photos in MLS order (primary first) on the flyer.
          if (!touched && p.file && chosen.length < cfg.maxPhotos && photos.slice(0, photos.indexOf(p)).every((x) => x.file || x.failed)) {
            for (const x of photos) {
              if (chosen.length >= cfg.maxPhotos) break;
              if (x.file && !chosen.includes(x.id)) chosen.push(x.id);
              if (!x.file && !x.failed) break;
            }
            apply();
          }
          render();
        }
      };
      await Promise.all([worker(), worker(), worker()]);
      if (mine !== run) return "";
      const ok = photos.filter((p) => p.file).length;
      return ok + " of " + photos.length + " photos loaded. Choose which to use below.";
    }
    return { load };
  }

  async function fetchPhoto(ctx, listingKey, p, n) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const raw = await ctx.mlsCall("ListingsShowPhoto", { listing_key: listingKey, photo_id: p.Id }, { raw: true });
        const img = raw && raw.content && raw.content.find((c) => c.type === "image");
        return img ? toFile(img.data, img.mimeType || "image/jpeg", "MLS photo " + n) : null;
      } catch (e) {
        if (!(e && e.code === "rate_limited")) return null;
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
    return null;
  }

  function sortPhotos(list) {
    return list.slice().sort((a, b) => (b.Primary ? 1 : 0) - (a.Primary ? 1 : 0));
  }

  function setPhotos(sel, files) {
    const input = document.querySelector(sel);
    if (!files.length || !input || !window.DataTransfer) return;
    const dt = new DataTransfer();
    files.forEach((file) => dt.items.add(file));
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // ---- Text helpers ----

  function asText(result) {
    if (!result) return "";
    if (result.payload != null) return typeof result.payload === "string" ? result.payload : JSON.stringify(result.payload);
    return (result.content || []).filter((c) => c.type === "text").map((c) => c.text).join("\n");
  }
  function clean(s) {
    return String(s || "").replace(/\s+/g, " ").trim();
  }
  function words(s) {
    return clean(s) ? clean(s).split(" ").length : 0;
  }
  // Keeps whole sentences when they fit, otherwise cuts at a word and adds an ellipsis.
  function trimWords(text, max) {
    const all = clean(text);
    if (words(all) <= max) return all;
    const sentences = all.match(/[^.!?]+[.!?]+(\s|$)/g) || [];
    let out = "";
    for (const s of sentences) {
      if (words(out + s) > max) break;
      out += s;
    }
    if (words(out) >= max * 0.6) return clean(out);
    return all.split(" ").slice(0, max).join(" ").replace(/[,;:]$/, "") + "…";
  }
  function toFile(b64, type, name) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const ext = type.split("/")[1] === "png" ? "png" : "jpg";
    return new File([bytes], name + "." + ext, { type });
  }
  function titleCase(s) {
    return String(s || "").toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\b(Ne|Nw|Se|Sw)\b/g, (m) => m.toUpperCase());
  }
  function tidyStreet(unparsed) {
    return titleCase(String(unparsed || "").split(",")[0]);
  }

  const style = document.createElement("style");
  style.textContent =
    ".mls-import{display:grid;gap:10px;margin-bottom:12px}" +
    ".mls-import .seg{margin:0}" +
    ".mls-row{display:grid;gap:8px}" +
    ".mls-find{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap}" +
    ".mls-find label{flex:1 1 220px;min-width:0}" +
    ".mls-find .btn{flex:0 0 auto}" +
    ".mls-pick-wrap{display:grid;gap:6px}" +
    ".mls-pick{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:6px;max-height:320px;overflow:auto;padding:2px}" +
    ".mls-thumb{position:relative;aspect-ratio:3/2;padding:0;border:2px solid var(--line);border-radius:4px;overflow:hidden;background:var(--surface-2);cursor:pointer}" +
    ".mls-thumb:disabled{cursor:progress;opacity:.55}" +
    ".mls-thumb.mls-failed{opacity:.25}" +
    ".mls-thumb img{width:100%;height:100%;object-fit:cover;display:block}" +
    ".mls-thumb[aria-pressed=true]{border-color:var(--green);box-shadow:0 0 0 2px var(--green)}" +
    ".mls-thumb:focus-visible{outline:2px solid var(--green);outline-offset:2px}" +
    ".mls-n{position:absolute;top:4px;left:4px;min-width:20px;height:20px;border-radius:10px;background:var(--green);color:#06152a;font:700 12px/20px var(--bf,sans-serif);text-align:center}" +
    ".mls-n:empty{display:none}" +
    ".fl-desc-tools{display:flex;gap:10px;align-items:center;flex-wrap:wrap}" +
    ".fl-desc-tools .status{min-height:0}";
  document.head.appendChild(style);
  for (const [name, cfg] of Object.entries(TARGETS)) build(name, cfg);
  window.iMathMlsImport = { pull: pullListing, targets: TARGETS, condense, trimWords };
})();
