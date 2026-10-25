// sample.json(prompt, { tools, signal, modelTier, images }) using the agent's own Anthropic key.
// The Studio prompts already ask for a JSON reply; this returns the parsed object.
// Errors are thrown as { code } objects, the shape the Studio code checks for.
import Anthropic from "@anthropic-ai/sdk";

export const MODELS = {
  default: "claude-opus-5-5",
  quick: "claude-haiku-5-5",
};
const FALLBACK_BETA = "server-side-fallback-2026-07-01";
const MAX_TOOL_ROUNDS = 12;

export function createSample(settings) {
  async function client() {
    const apiKey = await settings.get("aiKey");
    if (!apiKey) throw { code: "no_ai", message: "Add your Anthropic API key in Connections." };
    // The key belongs to the person using this browser; it is sent only to api.anthropic.com.
    return new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  }

  async function modelFor(tier) {
    const overrides = (await settings.get("models")) || {};
    return overrides[tier] || MODELS[tier] || MODELS.default;
  }

  // One request, with the Opus refusal fallback turned on (not offered for Haiku).
  async function create(params, signal) {
    const c = await client();
    const body = params.model === MODELS.quick
      ? params
      : { ...params, betas: [FALLBACK_BETA], fallbacks: "default" };
    try {
      return await c.beta.messages.create(body, { signal });
    } catch (err) {
      throw toCode(err, signal);
    }
  }

  async function json(prompt, opts = {}) {
    const { tools = [], signal, modelTier = "default", images = [] } = opts;
    const model = await modelFor(modelTier);
    const content = [...images.map(imageBlock).filter(Boolean), { type: "text", text: String(prompt) }];
    if (images.length && content.length === 1) throw { code: "images_unavailable" };

    const messages = [{ role: "user", content }];
    const toolDefs = tools.map((t) => ({
      name: t.name,
      description: t.description,
      input_schema: t.inputSchema || { type: "object", properties: {} },
    }));

    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const res = await create(
        {
          model,
          max_tokens: 16000,
          system: "Reply with a single JSON value and nothing else: no prose, no code fences.",
          messages,
          ...(toolDefs.length ? { tools: toolDefs } : {}),
          ...(model === MODELS.default ? { output_config: { effort: "medium" } } : {}),
        },
        signal,
      );
      if (res.stop_reason === "refusal") throw { code: "declined", message: res.stop_details?.explanation || "" };
      if (res.stop_reason !== "tool_use") return parseJson(res.content);

      messages.push({ role: "assistant", content: res.content });
      const calls = res.content.filter((b) => b.type === "tool_use");
      const results = await Promise.all(
        calls.map(async (call) => {
          const tool = tools.find((t) => t.name === call.name);
          try {
            const out = tool ? await tool.execute(call.input, { signal }) : `Unknown tool ${call.name}`;
            return { type: "tool_result", tool_use_id: call.id, content: typeof out === "string" ? out : JSON.stringify(out) };
          } catch (err) {
            if (signal?.aborted) throw { code: "cancelled" };
            return { type: "tool_result", tool_use_id: call.id, content: String(err?.message || err), is_error: true };
          }
        }),
      );
      messages.push({ role: "user", content: results });
    }
    throw { code: "error", message: "Too many tool rounds." };
  }

  // limits() is how the Studio asks whether tool use is available. create/modelFor are for mcp.js.
  const limits = async () => ({ tools: true, images: true });
  return { json, limits, create, modelFor };
}

function imageBlock(img) {
  const url = img?.dataUrl || img?.src || img?.url || (typeof img === "string" ? img : "");
  const m = /^data:(image\/[\w+.-]+);base64,(.+)$/.exec(url);
  if (m) return { type: "image", source: { type: "base64", media_type: m[1], data: m[2] } };
  if (img?.data && img?.mediaType) return { type: "image", source: { type: "base64", media_type: img.mediaType, data: img.data } };
  if (/^https:\/\//.test(url)) return { type: "image", source: { type: "url", url } };
  return null;
}

function parseJson(content) {
  const text = content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  const body = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  try {
    return JSON.parse(body);
  } catch {
    const start = body.search(/[[{]/);
    const end = Math.max(body.lastIndexOf("}"), body.lastIndexOf("]"));
    if (start >= 0 && end > start) return JSON.parse(body.slice(start, end + 1));
    throw { code: "error", message: "The AI reply was not valid JSON." };
  }
}

export function toCode(err, signal) {
  if (signal?.aborted || err instanceof Anthropic.APIUserAbortError) return { code: "cancelled" };
  if (err instanceof Anthropic.AuthenticationError) return { code: "needs_reauth", message: "Your Anthropic API key was rejected." };
  if (err instanceof Anthropic.PermissionDeniedError) return { code: "not_granted", message: err.message };
  if (err instanceof Anthropic.RateLimitError) {
    const after = Number(err.headers?.get?.("retry-after")) || 2;
    return { code: "rate_limited", retryable: true, retryAfterMs: after * 1000, message: err.message };
  }
  if (err instanceof Anthropic.BadRequestError) return { code: "error", message: err.message };
  if (err instanceof Anthropic.APIError) return { code: "error", retryable: (err.status || 0) >= 500, message: err.message };
  if (err instanceof Anthropic.APIConnectionError) return { code: "unsupported", message: "Could not reach Anthropic from this browser." };
  return err && err.code ? err : { code: "error", message: String(err?.message || err) };
}
