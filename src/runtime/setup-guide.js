// Replaces the Claude-specific "Set up the CMA tool" guide with the own-keys steps.
// The data-gs ids match the steps in XqOwn() (public/legacy/25-studio-shell.js), which marks them done.
import { PROXY_GUIDE_URL, SETUP_GUIDE_URL } from "../config.js";

const step = (id, title, items, see, fix) => `
      <li><div class="gs-head"><b>${title}</b><span class="gs-state" data-gs="${id}"></span></div>
        <ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>
        <p class="gs-see"><b>You should see:</b> ${see}</p>
        <p class="gs-fix">${fix}</p></li>`;

const OPEN = '<button class="mini" type="button" data-open-connections>Connections</button>';

export function installSetupGuide() {
  const guide = document.querySelector("#setupGuide .guide");
  if (!guide) return;
  guide.querySelector(".guide-head p").innerHTML =
    "You need three things: your own <b>Anthropic API key</b>, a <b>Spark access token</b> from your Flexmls login, and a free <b>Cloudflare</b> account for your MLS proxy. Do the steps in order.";
  guide.querySelector(".guide-head .eyebrow").textContent = "One time, about 15 minutes";
  guide.querySelector(".guide-steps").innerHTML = [
    step("ai", "Add your Anthropic API key", [
      'Create an account at <a href="https://console.anthropic.com/" target="_blank" rel="noopener">console.anthropic.com</a> and add a payment method.',
      "Under <b>Limits</b>, set a monthly spend limit.",
      "Under <b>API Keys</b>, create a key and copy it.",
      `Open ${OPEN}, paste the key, click <b>Test</b>, then <b>Save</b>.`,
    ], "Connected. under the AI section.", "<b>If Test says browser access is blocked:</b> your company Anthropic account may not allow it. Use a personal account."),
    step("spark", "Get your Spark access token", [
      'Sign in to the <a href="https://sparkplatform.com/" target="_blank" rel="noopener">Spark Datamart</a> with your Flexmls login.',
      "Choose a <b>realMLS</b> plan that covers <b>all listings</b>, not only your own.",
      "Accept the terms. Spark emails you an access token when it is approved.",
    ], "an email from Spark with your access token. Keep it private, like a password.", "<b>If realMLS offers no plan, or only your own listings:</b> ask realMLS member support which plan gives agents comps. Until then, type the details yourself."),
    step("proxy", "Deploy your personal MLS proxy", [
      `Follow the <a href="${PROXY_GUIDE_URL}" target="_blank" rel="noopener">proxy guide</a>: create a free Cloudflare Worker and paste the iMath proxy code.`,
      "Add your Spark token and a passcode you make up as secrets.",
      "Copy the Worker address.",
    ], "an address like imath-mls.yourname.workers.dev.", "<b>Why a proxy?</b> Spark does not allow your token inside a web page. The proxy is yours alone; iMath never sees it."),
    step("conn", "Connect the proxy to the studio", [
      `Open ${OPEN}.`,
      "Paste the proxy address and passcode, click <b>Test</b>, then <b>Save</b>.",
    ], "Your MLS answered. The page reloads.", "<b>If it says Origin not allowed:</b> set ALLOWED_ORIGIN on your proxy to this site's address."),
    step("test", "Run the live test", ["Click <b>Test now</b> in the checklist."], "Live test with your MLS login: Done.",
      "<b>If it fails:</b> the checklist names the reason. Wrong passcode: fix it in Connections. Token rejected: update SPARK_TOKEN on your proxy."),
    step("web", "Online lookup", ["Nothing extra: it uses your Anthropic key from step 1."], "Online lookup: Done.",
      "Searches add a little to your Anthropic usage."),
  ].join("");
  const help = document.getElementById("guideHelp");
  if (help) {
    help.textContent = "Open the full setup guide";
    help.href = SETUP_GUIDE_URL;
  }
}
