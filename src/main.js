// Entry point for the GitHub-hosted build.
// The Studio code in public/legacy/ was written for the Claude artifact runtime and asks for
// capabilities through window.claude.use(name). This installs a stand-in backed by the agent's
// own keys, puts the team roster in place, then loads the Studio scripts in their original order.
// The roster is never part of the public site: it comes from a file each agent imports.
import { createRuntime } from "./runtime/index.js";
import { mountConnections } from "./runtime/connections-ui.js";
import { loadRoster } from "./runtime/roster.js";
import { installSetupGuide } from "./runtime/setup-guide.js";
import { PROXY_GUIDE_URL, SETUP_GUIDE_URL } from "./config.js";

const runtime = createRuntime();
// Capabilities are handed out only after every legacy script has loaded, so the studio shell
// (which asks for them at startup) finds all tab modules (Access Check, Create, Avatars) in place.
let scriptsLoaded;
const loaded = new Promise((resolve) => (scriptsLoaded = resolve));
window.claude = { use: async (name) => (await loaded, runtime.use(name)), byok: true };
// Read by the legacy setup wizard (25-studio-shell.js) in place of its Claude help links.
window.__STUDIO_LINKS = { setup: SETUP_GUIDE_URL, proxy: PROXY_GUIDE_URL };
mountConnections(runtime);
installSetupGuide();

const roster = await loadRoster(runtime.settings);
if (roster) window.__IMATH_ROSTER = roster;

// Fetch in parallel, run in order (async = false), like the original inline scripts.
const order = (await (await fetch("legacy/ORDER.txt")).text()).split("\n").filter(Boolean);
try {
  await Promise.all(
    order.map(
      (name) =>
        new Promise((resolve, reject) => {
          const s = Object.assign(document.createElement("script"), { src: `legacy/${name}`, async: false });
          s.onload = resolve;
          s.onerror = () => reject(new Error(`Could not load legacy/${name}`));
          document.body.appendChild(s);
        }),
    ),
  );
} finally {
  scriptsLoaded();
}
