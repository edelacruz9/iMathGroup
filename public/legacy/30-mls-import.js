/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. */
// "Pull from MLS" or "Enter manually" for Social Posts and Open House Flyers.
// Looks a listing up by MLS number or street address through the Studio's MLS bridge
// (window.__studioCtx.mlsCall: RealMLS in Claude, the agent's own proxy on the website),
// fills the tab's own detail fields, and hands the photos to the tab's own photo input as if
// the agent had chosen the files. The tabs' existing code does the rest, unchanged.
(function () {
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
      visible: () => true,
    },
  };
  const SELECT = "ListingId,ListingKey,UnparsedAddress,City,StateOrProvince,PostalCode,ListPrice,ClosePrice,BedsTotal,BathsTotal,LivingArea,BuildingAreaTotal,MlsStatus,ListOfficeName";
  const OWN_OFFICE = /united real estate gallery/i;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

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
      '<div class="status" role="status" data-status></div></div>';
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
    const run = () => pullListing(cfg, input.value, box.querySelector("input[type=checkbox]").checked, say, pull);
    pull.onclick = run;
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); run(); } });

    const sync = () => { box.hidden = !cfg.visible(); };
    sync();
    if (cfg.watch) new MutationObserver(sync).observe(document.querySelector(cfg.watch), { childList: true });
  }

  async function pullListing(cfg, query, withPhotos, say, button) {
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
      const done = "Filled in " + tidyStreet(f.UnparsedAddress) + " (MLS " + (f.ListingId || "") + ", " + (f.MlsStatus || "status unknown") + ").";
      const note = courtesy ? " Listed by " + courtesy + ": you need their permission to advertise it, and add a listing courtesy line." : "";
      if (!withPhotos) return say(done + " Photos were not pulled; check the box to include them." + note);
      const n = await pullPhotos(ctx, cfg, f.ListingKey || hit.Id, say);
      say(done + (n ? " " + n + " photo" + (n === 1 ? "" : "s") + " added." : " This listing has no photos in the MLS; upload one instead.") + note);
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
      const el = document.querySelector(sel);
      if (!el || !values[key]) continue;
      el.value = values[key];
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  async function pullPhotos(ctx, cfg, listingKey, say) {
    const list = await ctx.mlsCall("ListingsListPhotos", { listing_key: listingKey });
    const photos = ((list && list.photos) || []).slice().sort((a, b) => (b.Primary ? 1 : 0) - (a.Primary ? 1 : 0)).slice(0, cfg.maxPhotos);
    const files = [];
    for (const p of photos) {
      say("Downloading photo " + (files.length + 1) + " of " + photos.length + "...");
      try {
        const raw = await ctx.mlsCall("ListingsShowPhoto", { listing_key: listingKey, photo_id: p.Id }, { raw: true });
        const img = raw && raw.content && raw.content.find((c) => c.type === "image");
        if (img) files.push(toFile(img.data, img.mimeType || "image/jpeg", "MLS photo " + (files.length + 1)));
      } catch (e) {}
    }
    const input = document.querySelector(cfg.photoInput);
    if (files.length && input && window.DataTransfer) {
      const dt = new DataTransfer();
      files.forEach((file) => dt.items.add(file));
      input.files = dt.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    return files.length;
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
    ".mls-find .btn{flex:0 0 auto}";
  document.head.appendChild(style);
  for (const [name, cfg] of Object.entries(TARGETS)) build(name, cfg);
  window.iMathMlsImport = { pull: pullListing, targets: TARGETS };
})();
