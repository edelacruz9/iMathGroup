// Connections dialog: where each agent saves their own Anthropic key and MLS proxy.
// Styled with the Studio's own CSS variables so it matches the rest of the page.
import { SETUP_GUIDE_URL } from "../config.js";
import { importRoster } from "./roster.js";

const CSS = `
.cx-open{position:fixed;right:16px;bottom:16px;z-index:60;border:0;border-radius:999px;padding:10px 16px;
  background:var(--navy,#002e5e);color:#fff;font:600 13px Montserrat,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer}
.cx-dlg{border:0;border-radius:14px;padding:0;max-width:520px;width:calc(100% - 32px);
  background:var(--surface,#fff);color:var(--text,#0b2340)}
.cx-dlg::backdrop{background:rgba(0,20,40,.45)}
.cx-body{padding:20px 22px;display:grid;gap:14px;font:14px "Open Sans",sans-serif}
.cx-body h2{margin:0;font:800 20px Montserrat,sans-serif;color:var(--text,#0b2340)}
.cx-body a{color:inherit}
.cx-body fieldset{border:1px solid var(--line,#d3dde8);border-radius:10px;padding:12px 14px;display:grid;gap:8px}
.cx-body legend{font-weight:700;padding:0 4px}
.cx-body label{display:grid;gap:4px;font-size:13px}
.cx-body input{font:inherit;padding:8px 10px;border:1px solid var(--line,#d3dde8);border-radius:8px;
  background:var(--surface-2,#e8eef5);color:var(--text,#0b2340)}
.cx-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.cx-row button{font:600 13px Montserrat,sans-serif;border-radius:8px;padding:8px 12px;cursor:pointer;
  border:1px solid var(--navy,#002e5e);background:#fff;color:var(--navy,#002e5e)}
.cx-row button.primary{background:var(--navy,#002e5e);color:#fff}
.cx-status{font-size:12px;color:var(--muted,#55606b)}
.cx-status.ok{color:var(--green-ink,#3f8f39)}.cx-status.bad{color:#c2463b}
.cx-note{font-size:12px;color:var(--muted,#55606b);margin:0}
`;

const FIELDS = [
  ["aiKey", "Anthropic API key", "password", "sk-ant-..."],
  ["mlsProxyUrl", "Your MLS proxy URL", "url", "https://imath-mls.yourname.workers.dev"],
  ["mlsPasscode", "Proxy passcode", "password", "The passcode you set when deploying"],
];

export function mountConnections(runtime) {
  const { settings, sample, mcp } = runtime;
  document.head.appendChild(Object.assign(document.createElement("style"), { textContent: CSS }));

  const open = Object.assign(document.createElement("button"), { className: "cx-open", type: "button", textContent: "Connections" });
  const dlg = document.createElement("dialog");
  dlg.className = "cx-dlg";
  dlg.innerHTML = `
    <form class="cx-body" method="dialog">
      <h2>Your connections</h2>
      <p class="cx-note">Saved only in this browser. Your key goes only to Anthropic, and your MLS calls go only to your own proxy. iMath never sees them. <a href="${SETUP_GUIDE_URL}" target="_blank" rel="noopener">Setup guide</a></p>
      <fieldset><legend>AI (Anthropic)</legend>
        ${field(FIELDS[0])}
        <div class="cx-row"><button type="button" data-test="ai">Test</button><span class="cx-status" data-status="ai"></span></div>
      </fieldset>
      <fieldset><legend>MLS (Flexmls / Spark)</legend>
        ${field(FIELDS[1])}${field(FIELDS[2])}
        <div class="cx-row"><button type="button" data-test="mls">Test</button><span class="cx-status" data-status="mls"></span></div>
        <p class="cx-note">No MLS access? The CMA and Listing Video tabs still work by typing details and uploading photos.</p>
      </fieldset>
      <fieldset><legend>Team roster</legend>
        <p class="cx-note">Fills in your profile and the loan officer list. Use the roster file Elliot sent you; it is not on the public site.</p>
        <div class="cx-row">
          <button type="button" data-roster-pick>Import roster file</button>
          <button type="button" data-roster-clear hidden>Remove roster</button>
          <span class="cx-status" data-status="roster"></span>
        </div>
        <input type="file" accept="application/json,.json" data-roster-file hidden>
      </fieldset>
      <div class="cx-row">
        <button class="primary" type="button" data-save>Save</button>
        <button type="button" data-clear>Remove everything from this browser</button>
        <button value="close">Close</button>
      </div>
    </form>`;
  document.body.append(open, dlg);

  const input = (k) => dlg.querySelector(`[name="${k}"]`);
  const status = (k, text, cls = "") => Object.assign(dlg.querySelector(`[data-status="${k}"]`), { textContent: text, className: `cx-status ${cls}` });

  async function load() {
    for (const [k] of FIELDS) input(k).value = (await settings.get(k)) || "";
    const roster = await settings.get("roster");
    const fromSite = !roster && Array.isArray(window.__IMATH_ROSTER?.people) && window.__IMATH_ROSTER.people.length;
    dlg.querySelector("[data-roster-clear]").hidden = !roster;
    if (roster) status("roster", `${roster.people.length} people, updated ${roster.updated || "unknown"}.`, "ok");
    else if (fromSite) status("roster", "Using the roster served with this site.", "ok");
    else status("roster", "No roster yet.");
  }
  async function save() {
    for (const [k] of FIELDS) await settings.set(k, input(k).value.trim());
  }
  async function show() {
    await load();
    dlg.showModal();
  }

  open.onclick = show;
  document.addEventListener("studio:open-connections", show);
  // Any "Open Connections" button in the Studio (access check, setup wizard, guide).
  document.addEventListener("click", (e) => {
    if (e.target.closest && e.target.closest("[data-open-connections]")) {
      e.preventDefault();
      document.getElementById("setupGuide")?.setAttribute("hidden", "");
      show();
    }
  });
  dlg.querySelector("[data-save]").onclick = async () => {
    await save();
    dlg.close();
    location.reload(); // the Studio reads capabilities once at startup
  };
  dlg.querySelector("[data-clear]").onclick = async () => {
    if (!confirm("Remove your keys and settings from this browser?")) return;
    await settings.clear();
    location.reload();
  };
  const picker = dlg.querySelector("[data-roster-file]");
  dlg.querySelector("[data-roster-pick]").onclick = () => picker.click();
  picker.onchange = async () => {
    const file = picker.files && picker.files[0];
    picker.value = "";
    if (!file) return;
    try {
      const roster = await importRoster(settings, file);
      status("roster", `Imported ${roster.people.length} people. Reloading...`, "ok");
      setTimeout(() => location.reload(), 600); // the Studio reads the roster once at startup
    } catch (err) {
      status("roster", err.message, "bad");
    }
  };
  dlg.querySelector("[data-roster-clear]").onclick = async () => {
    await settings.set("roster", null);
    location.reload();
  };
  dlg.querySelector('[data-test="ai"]').onclick = async () => {
    await save();
    status("ai", "Testing...");
    try {
      const out = await sample.json('Return {"ok": true}', { modelTier: "quick" });
      status("ai", out && out.ok ? "Connected." : "Answered, but not as expected.", out && out.ok ? "ok" : "bad");
    } catch (err) {
      status("ai", err.message || err.code || "Failed.", "bad");
    }
  };
  dlg.querySelector('[data-test="mls"]').onclick = async () => {
    await save();
    status("mls", "Testing...");
    try {
      await mcp.callTool("RealMLS", "ListingsListingSearch", { _filter: "MlsStatus Eq 'Closed'", _select: "ListingId", _limit: 1 });
      status("mls", "Your MLS answered.", "ok");
    } catch (err) {
      status("mls", err.message || err.code || "Failed.", "bad");
    }
  };

  settings.get("aiKey").then((k) => { if (!k) open.textContent = "Connect your accounts"; });
}

function field([name, label, type, placeholder]) {
  return `<label>${label}<input name="${name}" type="${type}" placeholder="${placeholder}" autocomplete="off" spellcheck="false"></label>`;
}
