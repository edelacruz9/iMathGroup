// Stand-in for the two MCP servers the Studio was built against:
//   "RealMLS"         -> the agent's own Cloudflare Worker proxy (worker/), which holds their Spark key
//   "Parallel Search" -> Anthropic's server-side web_search / web_fetch tools, on the agent's own key
// callTool resolves to { payload } like the Claude runtime does.
const MLS = "RealMLS";
const WEB = "Parallel Search";
export const MLS_TOOLS = [
  "ListingsListingSearch",
  "ListingsListPhotos",
  "ListingsShowPhoto",
  "MarketStatisticsPrice",
  "MarketStatisticsAbsorption",
  "MarketStatisticsDaysOnMarket",
  "MarketStatisticsRatio",
  "MarketStatisticsInventory",
];
const WEB_TOOLS = {
  web_search: { type: "web_search_20260209", name: "web_search", max_uses: 5 },
  web_fetch: { type: "web_fetch_20260209", name: "web_fetch", max_uses: 5 },
};

export function createMcp(settings, sample) {
  async function callMls(tool, args, signal) {
    const base = await settings.get("mlsProxyUrl");
    const passcode = await settings.get("mlsPasscode");
    if (!base) throw { code: "server_not_connected", message: "Add your MLS proxy in Connections." };
    let res;
    try {
      res = await fetch(`${base.replace(/\/$/, "")}/tool/${encodeURIComponent(tool)}`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-studio-passcode": passcode || "" },
        body: JSON.stringify(args || {}),
        signal,
      });
    } catch (err) {
      if (signal?.aborted) throw { code: "cancelled" };
      throw { code: "unsupported", message: "Could not reach your MLS proxy.", retryable: true };
    }
    const body = await res.json().catch(() => ({}));
    if (res.status === 401) throw { code: "needs_reauth", message: body.error || "Proxy passcode or Spark key rejected." };
    if (res.status === 429) throw { code: "rate_limited", retryable: true, retryAfterMs: 2000 };
    if (!res.ok) throw { code: body.code || "error", message: body.error || `Proxy error ${res.status}`, retryable: res.status >= 500 };
    return { payload: body.payload };
  }

  // Runs one Claude request with the matching server tool and returns its text.
  async function callWeb(tool, args, signal) {
    const queries = [].concat(args.search_queries || args.queries || args.query || []);
    const urls = [].concat(args.urls || args.url || []);
    const ask = tool === "web_fetch"
      ? `Fetch these pages and return their main text, each under its URL:\n${urls.join("\n")}`
      : `Search the web for each query and list every useful result as title, URL and a short excerpt:\n${queries.join("\n")}`;
    const model = await sample.modelFor("default");
    const messages = [{ role: "user", content: ask }];
    for (let turn = 0; turn < 4; turn++) {
      const res = await sample.create(
        { model, max_tokens: 8000, tools: [WEB_TOOLS[tool]], messages, output_config: { effort: "low" } },
        signal,
      );
      if (res.stop_reason === "pause_turn") {
        messages.push({ role: "assistant", content: res.content });
        continue;
      }
      return { payload: res.content.filter((b) => b.type === "text").map((b) => b.text).join("\n") };
    }
    throw { code: "error", message: "Web lookup did not finish." };
  }

  return {
    async callTool(server, tool, args, opts = {}) {
      if (server === MLS && MLS_TOOLS.includes(tool)) return callMls(tool, args, opts.signal);
      if (server === WEB && WEB_TOOLS[tool]) return callWeb(tool, args || {}, opts.signal);
      throw { code: "server_not_found", message: `${server} / ${tool} is not available in this build.` };
    },
    async listTools() {
      const hasMls = !!(await settings.get("mlsProxyUrl"));
      const hasAi = !!(await settings.get("aiKey"));
      return {
        servers: [
          // "connected" is the status the Studio's setup wizard checks for.
          { server: MLS, authStatus: hasMls ? "connected" : null, tools: hasMls ? MLS_TOOLS.map((name) => ({ name, inputSchema: null })) : [] },
          { server: WEB, authStatus: hasAi ? "connected" : null, tools: hasAi ? Object.keys(WEB_TOOLS).map((name) => ({ name, inputSchema: null })) : [] },
        ],
      };
    },
  };
}
