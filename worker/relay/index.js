// iMath MLS relay. One copy, deployed to Elliot's free Cloudflare account, serves the whole team.
//
// Why it exists: the Flexmls MCP server (mcp.fbsdata.com) only answers approved apps like Claude,
// never a web page, so the GitHub Pages Studio cannot reach it directly. This relay does two jobs:
//   1. /auth/*  Signs an agent in with their OWN Flexmls login (standard OAuth with PKCE against
//      mcp.fbsdata.com). The tokens go back to that agent's browser and nowhere else.
//   2. /tool/*  Turns the Studio's simple tool calls into MCP calls to mcp.fbsdata.com, sending
//      the agent's own token. Results come back in the same shape the Claude runtime returns.
//
// The relay stores and logs NOTHING: no tokens, no passwords, no searches. Passwords are typed
// only on the Flexmls sign in page. Vars: ALLOWED_ORIGINS (comma separated page origins).
// Optional var UPSTREAM overrides the MCP server address (used only by the local tests).

const DEFAULT_UPSTREAM = "https://mcp.fbsdata.com";
const SCOPE = "openid RESO FBS";
const PROTOCOL = "2025-06-18";

// The read-only tools the Studio uses. Nothing else is forwarded.
const TOOLS = new Set([
  "ListingsListingSearch",
  "ListingsListPhotos",
  "ListingsShowPhoto",
  "MarketStatisticsPrice",
  "MarketStatisticsAbsorption",
  "MarketStatisticsDaysOnMarket",
  "MarketStatisticsRatio",
  "MarketStatisticsInventory",
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    try {
      if (url.pathname === "/auth/start" && request.method === "GET") return await authStart(url, env);
      if (url.pathname === "/auth/callback" && request.method === "GET") return await authCallback(request, url, env);
      if (url.pathname === "/auth/refresh" && request.method === "POST") return await authRefresh(request, env, cors);
      const m = /^\/tool\/([A-Za-z]+)$/.exec(url.pathname);
      if (m && request.method === "POST") return await toolCall(request, m[1], env, cors);
      if (url.pathname === "/") {
        return new Response("iMath MLS relay. It signs agents in with their own Flexmls login and forwards the iMath Marketing Studio's read-only MLS requests. It stores nothing.", { headers: { "content-type": "text/plain" } });
      }
      return reply({ error: "Not found" }, 404, cors);
    } catch (err) {
      return reply({ error: err.message || "Relay error", code: err.code || "error" }, err.status || 502, cors);
    }
  },
};

// ---------- OAuth: sign in with the agent's own Flexmls login ----------

async function authStart(url, env) {
  const origin = url.searchParams.get("origin") || "";
  if (!allowedOrigins(env).includes(origin)) {
    return new Response("This page is not allowed to use the relay.", { status: 403, headers: { "content-type": "text/plain" } });
  }
  const relayOrigin = `${url.protocol}//${url.host}`;
  const redirectUri = relayOrigin + "/auth/callback";

  // Register a public OAuth client for this sign in (the server offers open registration,
  // token_endpoint_auth_method "none", like the Claude connector uses).
  const reg = await fetch(upstream(env) + "/oauth2/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_name: "iMath Marketing Studio",
      redirect_uris: [redirectUri],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
      scope: SCOPE,
    }),
  });
  const regBody = await reg.json().catch(() => ({}));
  if (!reg.ok || !regBody.client_id) {
    throw Object.assign(new Error("The MLS sign in service refused the relay's registration."), { status: 502 });
  }

  const verifier = randomToken(48);
  const state = randomToken(24);
  const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
  const q = new URLSearchParams({
    response_type: "code",
    client_id: regBody.client_id,
    redirect_uri: redirectUri,
    scope: SCOPE,
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
    resource: upstream(env),
  });
  const cookie = b64url(new TextEncoder().encode(JSON.stringify({ v: verifier, c: regBody.client_id, o: origin, s: state })));
  return new Response(null, {
    status: 302,
    headers: {
      location: upstream(env) + "/oauth2/authorize?" + q,
      "set-cookie": `imath_oauth=${cookie}; Max-Age=600; Path=/auth; Secure; HttpOnly; SameSite=Lax`,
      "cache-control": "no-store",
    },
  });
}

async function authCallback(request, url, env) {
  const saved = parseCookie(request);
  const page = (script) => new Response(
    `<!doctype html><meta charset="utf-8"><title>iMath MLS</title><body style="font:15px system-ui;padding:40px;text-align:center"><p id="msg">Finishing your MLS sign in...</p><script>${script}</script>`,
    { headers: { "content-type": "text/html", "cache-control": "no-store", "set-cookie": "imath_oauth=; Max-Age=0; Path=/auth; Secure; HttpOnly; SameSite=Lax" } },
  );
  const fail = (message) => page(`document.getElementById("msg").textContent=${JSON.stringify("Sign in did not finish: " + message + " Close this window and try Connect my MLS again.")};` + post(saved && saved.o, { type: "imath-mls-auth", ok: false, error: message }, env));

  if (!saved || url.searchParams.get("state") !== saved.s) return fail("the sign in window expired.");
  const err = url.searchParams.get("error");
  if (err) return fail(url.searchParams.get("error_description") || err + ".");
  const code = url.searchParams.get("code");
  if (!code) return fail("Flexmls sent no sign in code.");

  const res = await fetch(upstream(env) + "/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${url.protocol}//${url.host}/auth/callback`,
      client_id: saved.c,
      code_verifier: saved.v,
      resource: upstream(env),
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.access_token) return fail(body.error_description || body.error || "Flexmls refused the sign in code.");

  const auth = {
    access_token: body.access_token,
    refresh_token: body.refresh_token || null,
    client_id: saved.c,
    expires_at: Date.now() + (Number(body.expires_in) || 3600) * 1000,
  };
  return page(
    `document.getElementById("msg").textContent="You are connected. This window closes itself.";` +
    post(saved.o, { type: "imath-mls-auth", ok: true, auth }, env) +
    `setTimeout(function(){window.close()},800);`,
  );
}

// postMessage back to the Studio window that opened the popup, and only to it.
function post(origin, data, env) {
  if (!origin || !allowedOrigins(env).includes(origin)) return "";
  return `try{if(window.opener)window.opener.postMessage(${JSON.stringify(data)},${JSON.stringify(origin)})}catch(e){}`;
}

async function authRefresh(request, env, cors) {
  const { refresh_token, client_id } = await request.json().catch(() => ({}));
  if (!refresh_token || !client_id) return reply({ error: "Missing refresh token.", code: "needs_reauth" }, 401, cors);
  const res = await fetch(upstream(env) + "/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token, client_id, resource: upstream(env) }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.access_token) return reply({ error: "Sign in again.", code: "needs_reauth" }, 401, cors);
  return reply({ access_token: body.access_token, refresh_token: body.refresh_token || null, expires_in: Number(body.expires_in) || 3600 }, 200, cors);
}

// ---------- MCP: forward one tool call with the agent's token ----------

async function toolCall(request, tool, env, cors) {
  if (!cors["access-control-allow-origin"]) return reply({ error: "Origin not allowed" }, 403, cors);
  if (!TOOLS.has(tool)) return reply({ error: `Unknown tool ${tool}`, code: "server_not_found" }, 404, cors);
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return reply({ error: "Sign in with Connect my MLS first.", code: "needs_reauth" }, 401, cors);
  const args = await request.json().catch(() => ({}));

  const mcpUrl = upstream(env) + "/mcp";
  const headers = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
    authorization: `Bearer ${token}`,
    "mcp-protocol-version": PROTOCOL,
  };

  const init = await rpc(mcpUrl, headers, {
    jsonrpc: "2.0", id: 1, method: "initialize",
    params: { protocolVersion: PROTOCOL, capabilities: {}, clientInfo: { name: "iMath Marketing Studio", version: "1.0" } },
  });
  if (init.sessionId) headers["mcp-session-id"] = init.sessionId;
  if (init.result && init.result.protocolVersion) headers["mcp-protocol-version"] = init.result.protocolVersion;
  // Some servers require the initialized notice before tool calls; a refusal here is not fatal.
  await fetch(mcpUrl, { method: "POST", headers, body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) }).catch(() => {});

  const call = await rpc(mcpUrl, headers, { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: tool, arguments: args || {} } });
  const r = call.result;
  if (r && r.isError) {
    const text = firstText(r.content) || "The MLS reported an error.";
    const status = /unauthoriz|sign in|token|expired|forbidden/i.test(text) ? 401 : 502;
    return reply({ error: text.slice(0, 500), code: status === 401 ? "needs_reauth" : "error" }, status, cors);
  }
  let payload = r ? r.structuredContent : undefined;
  if (payload === undefined) {
    const text = firstText(r && r.content);
    if (text != null) { try { payload = JSON.parse(text); } catch { payload = text; } }
  }
  const content = (r && r.content) || [];
  const hasBlocks = content.some((b) => b && b.type !== "text");
  return reply(hasBlocks ? { payload, content } : { payload }, 200, cors);
}

// One JSON-RPC request; understands both plain JSON and SSE answers.
async function rpc(url, headers, body) {
  let res;
  try {
    res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  } catch {
    throw Object.assign(new Error("Could not reach the MLS."), { status: 502, code: "error" });
  }
  if (res.status === 401 || res.status === 403) throw Object.assign(new Error("Your MLS sign in expired."), { status: 401, code: "needs_reauth" });
  if (res.status === 429) throw Object.assign(new Error("The MLS asks for a short pause."), { status: 429, code: "rate_limited" });
  const sessionId = res.headers.get("mcp-session-id") || undefined;
  const type = (res.headers.get("content-type") || "").toLowerCase();
  const raw = await res.text();
  let msg = null;
  if (type.includes("text/event-stream")) {
    for (const block of raw.split(/\n\n/)) {
      const data = block.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("");
      if (!data) continue;
      try {
        const parsed = JSON.parse(data);
        if (parsed.id === body.id) { msg = parsed; break; }
      } catch {}
    }
  } else {
    try { msg = JSON.parse(raw); } catch {}
  }
  if (!res.ok && !msg) throw Object.assign(new Error(`The MLS answered ${res.status}.`), { status: 502, code: "error" });
  if (!msg) throw Object.assign(new Error("The MLS sent an answer the relay could not read."), { status: 502, code: "error" });
  if (msg.error) throw Object.assign(new Error(msg.error.message || "MLS error"), { status: 502, code: "error" });
  return { result: msg.result, sessionId };
}

// ---------- small helpers ----------

const upstream = (env) => (env.UPSTREAM || DEFAULT_UPSTREAM).replace(/\/$/, "");
const allowedOrigins = (env) => (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);

function corsHeaders(request, env) {
  const origin = request.headers.get("origin") || "";
  const h = { "access-control-allow-methods": "GET, POST, OPTIONS", "access-control-allow-headers": "content-type, authorization", vary: "origin" };
  if (allowedOrigins(env).includes(origin)) h["access-control-allow-origin"] = origin;
  return h;
}

function reply(obj, status, headers) {
  return new Response(JSON.stringify(obj), { status, headers: { ...headers, "content-type": "application/json", "cache-control": "no-store" } });
}

function firstText(content) {
  const b = (content || []).find((x) => x && x.type === "text" && typeof x.text === "string");
  return b ? b.text : null;
}

function randomToken(bytes) {
  return b64url(crypto.getRandomValues(new Uint8Array(bytes)));
}

function b64url(buf) {
  const bytes = new Uint8Array(buf.buffer || buf);
  let bin = "";
  for (const x of bytes) bin += String.fromCharCode(x);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function parseCookie(request) {
  const m = /(?:^|;\s*)imath_oauth=([A-Za-z0-9_-]+)/.exec(request.headers.get("cookie") || "");
  if (!m) return null;
  try {
    const pad = m[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(pad), (c) => c.charCodeAt(0))));
  } catch {
    return null;
  }
}
