// Personal MLS proxy for iMath Marketing Studio.
// Each agent deploys their own copy to their own Cloudflare account. It holds their Spark API
// access token as a secret (Spark's terms forbid sending tokens to a browser), checks a passcode,
// and turns the Studio's tool calls into read-only Spark API requests. It stores and logs nothing.
//
// Secrets: SPARK_TOKEN, STUDIO_PASSCODE.  Vars: ALLOWED_ORIGIN (the Studio's URL origin).
const SPARK = "https://sparkapi.com/v1";
const KEY = /^[A-Za-z0-9]{1,40}$/;
const STATS = {
  MarketStatisticsPrice: "price",
  MarketStatisticsAbsorption: "absorption",
  MarketStatisticsDaysOnMarket: "dom",
  MarketStatisticsRatio: "ratio",
  MarketStatisticsInventory: "inventory",
};

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const url = new URL(request.url);
    const m = /^\/tool\/([A-Za-z]+)$/.exec(url.pathname);
    if (request.method !== "POST" || !m) return reply({ error: "Not found" }, 404, cors);
    if (!cors["access-control-allow-origin"]) return reply({ error: "Origin not allowed" }, 403, cors);
    if (!env.SPARK_TOKEN || !env.STUDIO_PASSCODE) return reply({ error: "Proxy is missing its secrets" }, 500, cors);
    if (!safeEqual(request.headers.get("x-studio-passcode") || "", env.STUDIO_PASSCODE)) {
      return reply({ error: "Wrong passcode" }, 401, cors);
    }

    let args;
    try {
      args = await request.json();
    } catch {
      return reply({ error: "Body must be JSON" }, 400, cors);
    }

    try {
      const out = await runTool(m[1], args || {}, env);
      // ListingsShowPhoto returns { payload, content } (an image block); everything else is a payload.
      return reply(out && Array.isArray(out.content) ? out : { payload: out }, 200, cors);
    } catch (err) {
      return reply({ error: err.message, code: err.code || "error" }, err.status || 502, cors);
    }
  },
};

async function runTool(tool, args, env) {
  if (tool === "ListingsListingSearch") {
    const q = new URLSearchParams();
    const filter = [args._filter, inList("PropertyType", args.property_type_codes), inList("MlsStatus", args.status_values)]
      .filter(Boolean)
      .map((f) => `(${f})`)
      .join(" And ");
    if (filter) q.set("_filter", filter);
    for (const k of ["_select", "_limit", "_page", "_orderby", "_expand", "_pagination"]) {
      if (args[k] != null) q.set(k, String(args[k]));
    }
    if (!q.has("_pagination")) q.set("_pagination", "1");
    const d = await spark(`/listings?${q}`, env);
    // Same shape as the Flexmls (RealMLS) connector: listings keep Id, ResourceUri and nested
    // StandardFields, which the Studio's CMA engine reads.
    const page = d.Pagination?.CurrentPage ?? 1;
    const pages = d.Pagination?.TotalPages ?? null;
    return {
      total_entries: d.Pagination?.TotalRows ?? null,
      total_pages: pages,
      previous_page: page > 1 ? page - 1 : null,
      next_page: pages != null && page < pages ? page + 1 : null,
      results: (d.Results || []).map(listing),
    };
  }
  if (tool === "ListingsListPhotos") {
    const key = need(args.listing_key);
    const d = await spark(`/listings/${key}/photos`, env);
    return { photos: d.Results || [] };
  }
  if (tool === "ListingsShowPhoto") {
    const key = need(args.listing_key);
    const id = need(args.photo_id);
    const d = await spark(`/listings/${key}/photos/${id}`, env);
    const photo = (d.Results || [])[0] || null;
    // Like the RealMLS connector, also return the image itself as an MCP image block, which
    // Listing Video, Social Posts and Open House Flyers read. Photos come from Spark's CDN.
    const src = photo && (photo.Uri1600 || photo.Uri1280 || photo.Uri1024 || photo.Uri800 || photo.UriLarge);
    if (!src || !/^https:\/\/[a-z0-9.-]+\.sparkplatform\.com\//.test(src)) return photo;
    const img = await fetch(src);
    if (!img.ok) return photo;
    const mimeType = (img.headers.get("content-type") || "image/jpeg").split(";")[0];
    return { payload: photo, content: [{ type: "image", mimeType, data: toBase64(await img.arrayBuffer()) }] };
  }
  if (STATS[tool]) {
    const q = new URLSearchParams();
    for (const k of ["LocationField", "LocationValue", "PropertyTypeCode", "Options"]) {
      if (args[k] != null) q.set(k, String(args[k]));
    }
    const d = await spark(`/marketstatistics/${STATS[tool]}?${q}`, env);
    return (d.Results || [])[0] || null;
  }
  throw Object.assign(new Error(`Unknown tool ${tool}`), { status: 404, code: "server_not_found" });
}

async function spark(path, env) {
  const res = await fetch(SPARK + path, {
    headers: {
      authorization: `Bearer ${env.SPARK_TOKEN}`,
      accept: "application/json",
      "x-sparkapi-user-agent": "iMathMarketingStudio/1.0",
    },
  });
  const body = await res.json().catch(() => ({}));
  const d = body.D || {};
  if (!res.ok || d.Success === false) {
    const status = res.status === 401 || res.status === 403 ? 401 : res.status === 429 ? 429 : 502;
    throw Object.assign(new Error(d.Message || `Spark API error ${res.status}`), { status, code: status === 401 ? "needs_reauth" : "error" });
  }
  return d;
}

function listing(r) {
  const id = r.StandardFields?.ListingId;
  return {
    Id: r.Id,
    ResourceUri: r.ResourceUri,
    StandardFields: r.StandardFields || {},
    ...(id ? { FlexmlsLink: `https://members.flexmls.com/start/listing/number/index.html?list=${encodeURIComponent(id)}` } : {}),
  };
}

function toBase64(buf) {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

function inList(field, values) {
  if (!Array.isArray(values) || !values.length) return "";
  return values.map((v) => `${field} Eq '${String(v).replace(/'/g, "")}'`).join(" Or ");
}

function need(v) {
  if (!KEY.test(String(v || ""))) throw Object.assign(new Error("Bad listing or photo id"), { status: 400 });
  return v;
}

function corsHeaders(request, env) {
  const origin = request.headers.get("origin") || "";
  const allowed = (env.ALLOWED_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
  const h = { "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "content-type, x-studio-passcode", vary: "origin" };
  if (allowed.includes(origin)) h["access-control-allow-origin"] = origin;
  return h;
}

function reply(obj, status, headers) {
  return new Response(JSON.stringify(obj), { status, headers: { ...headers, "content-type": "application/json", "cache-control": "no-store" } });
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
