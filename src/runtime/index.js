// Answers window.claude.use(name) with capabilities built from the agent's own connections.
// Shapes match what public/legacy/25-studio-shell.js expects from the Claude runtime:
//   downloads.save({ filename, data })
//   mcp.callTool(server, tool, args, { signal }) -> { payload } ; mcp.listTools()
//   permissions.request([names])
//   sample.json(prompt, { tools, signal, modelTier, images }) -> parsed JSON
//   user -> { name, email } or null
import { settings } from "./store.js";
import { createDownloads } from "./downloads.js";
import { createSample } from "./sample.js";
import { createMcp } from "./mcp.js";

export function createRuntime() {
  const downloads = createDownloads();
  const sample = createSample(settings);
  const mcp = createMcp(settings, sample);

  // Nothing to grant in this build: a capability is "granted" once its key is saved.
  const permissions = {
    async state(name) {
      if (name === "sample") return (await settings.get("aiKey")) ? "granted" : "prompt";
      if (name === "mcp:RealMLS") return (await settings.get("mlsProxyUrl")) ? "granted" : "prompt";
      if (name === "mcp:Parallel Search") return (await settings.get("aiKey")) ? "granted" : "prompt";
      return "granted";
    },
    async request() {
      document.dispatchEvent(new CustomEvent("studio:open-connections"));
      return true;
    },
  };

  async function use(name) {
    switch (name) {
      case "downloads":
        return downloads;
      case "mcp":
        return (await settings.get("mlsProxyUrl")) || (await settings.get("aiKey")) ? mcp : null;
      case "permissions":
        return permissions;
      case "sample":
        return (await settings.get("aiKey")) ? sample : null;
      case "user": {
        const profile = (await settings.get("profile")) || {};
        return profile.email ? { name: profile.name || "", email: profile.email } : null;
      }
      default:
        return null;
    }
  }

  return { use, settings, sample, mcp };
}
