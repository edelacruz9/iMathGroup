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
      const payload = await runTool(m[1], args || {}, env);
      return reply({ payload }, 200, cors);
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
    const d = await spark(`/listings?${q}`, env);
    return {
      results: (d.Results || []).map(flatten),
      total_pages: d.Pagination?.TotalPages ?? null,
      total_entries: d.Pagination?.TotalRows ?? null,
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
    return (d.Results || [])[0] || null;
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

// Spark nests listing fields under StandardFields; the Studio reads them at the top level.
function flatten(r) {
  return { Id: r.Id, ResourceUri: r.ResourceUri, ...(r.StandardFields || {}) };
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
