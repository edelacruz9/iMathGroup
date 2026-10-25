/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function () {
  const S = "RealMLS";
  const Z = h => document.querySelector(h);
  const v = h => String(h == null ? "" : h).replace(/[&<>"]/g, O => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[O]);
  const N = {
    checked: false
  };
  let x = null;
  async function L(h, O) {
    if (!h || !h.state) {
      return "unknown";
    }
    try {
      return await h.state(O);
    } catch (z) {
      return "unavailable";
    }
  }
  // GitHub build: each agent brings their own Anthropic key and MLS proxy (see src/runtime/).
  function Fown() {
    const go = "Click Connections at the bottom right.";
    return [Object.assign({
      k: "mls",
      name: "MLS reports and photos"
    }, N.listed ? {
      s: "ok",
      t: "Ready",
      why: "CMA reports and Listing Video MLS photos use your own MLS proxy and Spark key.",
      fix: ""
    } : {
      s: "off",
      t: "Not connected",
      why: "Your MLS proxy is not set up in this browser yet.",
      fix: go + " Add your proxy address and passcode (the setup guide shows how to get them). Until then, type details and upload photos, or use Run the CMA through my Claude chat in the CMA tab."
    }), Object.assign({
      k: "ai",
      name: "AI writing and sorting"
    }, N.sample ? {
      s: "ok",
      t: "Ready",
      why: "Uses your own Anthropic API key. Anthropic bills you directly for what you use.",
      fix: ""
    } : {
      s: "off",
      t: "Not connected",
      why: "AI features (Create Anything, photo sorting, room labels, scripts, report write-ups) need your Anthropic API key.",
      fix: go + " Add your key. Everything else still works, and Create Anything has Build it myself."
    }), {
      k: "dl",
      name: "Downloads",
      s: "ok",
      t: "Ready",
      why: "Files save through your browser's normal downloads.",
      fix: ""
    }, {
      k: "design",
      name: "Cards, posts, flyers, signs, tools, video",
      s: "ok",
      t: "Ready",
      why: "These run right in the page.",
      fix: ""
    }];
  }
  function F() {
    if (N.own) {
      return Fown();
    }
    const h = [];
    let O;
    let z;
    O = N.runtime ? N.mcp ? N.listed === false ? {
      s: "warn",
      t: "Needs setup",
      why: "RealMLS is not added to your Claude account yet.",
      fix: "Open the CMA tab and follow setup steps 2 to 4 (about 5 minutes, free)."
    } : N.auth === "needs_reauth" ? {
      s: "warn",
      t: "Sign in again",
      why: "Your Flexmls sign in for RealMLS expired.",
      fix: "Open Claude Settings, Connectors, RealMLS and connect again."
    } : N.permMls === "denied" ? {
      s: "warn",
      t: "Blocked by you",
      why: "You chose not to let this page use RealMLS.",
      fix: "Reload the page and choose Allow when Claude asks."
    } : {
      s: "ok",
      t: N.permMls === "granted" ? "Ready" : "Ready, Claude asks the first time",
      why: "CMA reports and Listing Video MLS photos use your own RealMLS login.",
      fix: ""
    } : {
      s: "off",
      t: "Off in this view",
      why: N.phone ? "The Claude phone app does not let shared pages use your MLS connector." : "Claude has switched off the MLS connection for you on this page. This usually happens when the studio reaches you through a public link instead of an invitation to your own Claude email.",
      fix: N.phone ? "Open the link on a computer, or use Run the CMA through my Claude chat." : "Ask Elliot to invite the email you use for Claude. Until then, use Run the CMA through my Claude chat in the CMA tab. It builds the same report."
    } : {
      s: "off",
      t: "Off here",
      why: "This copy of the studio is open outside Claude, so it cannot reach the MLS.",
      fix: "Open the studio link Elliot sent you while signed in to claude.ai. Until then, use Run the CMA through my Claude chat in the CMA tab."
    };
    h.push(Object.assign({
      k: "mls",
      name: "MLS reports and photos"
    }, O));
    z = N.sample ? N.permAi === "denied" ? {
      s: "warn",
      t: "Blocked by you",
      why: "You chose not to let this page use Claude.",
      fix: "Reload the page and choose Allow when Claude asks."
    } : {
      s: "ok",
      t: N.permAi === "granted" ? "Ready" : "Ready, Claude asks the first time",
      why: "Uses your own Claude account and usage.",
      fix: ""
    } : {
      s: "off",
      t: "Off in this view",
      why: "Claude writing features (Create Anything, photo sorting, room labels, scripts) cannot run on this page for you.",
      fix: "Everything else still works. Create Anything has Build it myself, and the Ask Claude buttons open your own Claude chat. An invitation to your Claude email usually turns this on."
    };
    h.push(Object.assign({
      k: "ai",
      name: "Claude writing and sorting"
    }, z));
    const y = N.downloads ? {
      s: "ok",
      t: "Ready",
      why: "Each file asks you to confirm before it saves.",
      fix: ""
    } : {
      s: "warn",
      t: "Limited",
      why: "This view cannot hand files to your device directly.",
      fix: "The studio tries a normal browser download. If nothing saves, open the studio on a computer inside claude.ai."
    };
    h.push(Object.assign({
      k: "dl",
      name: "Downloads"
    }, y));
    h.push({
      k: "design",
      name: "Cards, posts, flyers, signs, tools, video",
      s: "ok",
      t: "Ready",
      why: "These run right in the page.",
      fix: ""
    });
    return h;
  }
  function q() {
    const h = ["iMath Marketing Studio access report (v26)", "Checked: " + N.when];
    const O = window.__studio && window.__studio.profile && window.__studio.profile.agentName || "";
    if (O) {
      h.push("Profile name: " + O);
    }
    h.push(N.own ? "Opened as: GitHub site, own keys" : "Opened inside Claude: " + (N.runtime ? N.top ? "yes, in its own tab" : "yes" : "no"));
    h.push("Device: " + (N.phone ? "phone or tablet" : "computer"));
    F().forEach(z => h.push(z.name + ": " + z.t));
    h.push("Detail: mcp " + (N.mcp ? "on" : "off") + ", RealMLS listed " + (N.listed == null ? "unknown" : N.listed ? "yes" : "no") + ", auth " + (N.auth || "unknown") + ", MLS permission " + N.permMls + ", Claude " + (N.sample ? "on" : "off") + " (" + N.permAi + "), downloads " + (N.downloads ? "on" : "off") + ", member " + (N.write == null ? "not told" : "yes"));
    return h.join("\n");
  }
  function H() {
    const h = Z("#access");
    if (!h) {
      return;
    }
    if (!N.checked) {
      h.querySelector(".acc-sum").textContent = "Checking what works for you...";
      return;
    }
    const O = F();
    const z = O.filter(R => R.s !== "ok");
    const y = R => R === "ok" ? "acc-ok" : R === "warn" ? "acc-warn" : "acc-off";
    h.querySelector(".acc-sum").innerHTML = O.slice(0, 3).map(R => "<span class=\"acc-chip " + y(R.s) + "\">" + v(R.name.split(" ")[0]) + ": " + v(R.t) + "</span>").join("");
    h.dataset.state = z.some(R => R.s === "off") ? "off" : z.length ? "warn" : "ok";
    let E = "<ul class=\"acc-list\">" + O.map(R => "<li class=\"" + y(R.s) + "\"><b>" + v(R.name) + "</b><span class=\"acc-t\">" + v(R.t) + "</span><p>" + v(R.why) + (R.fix ? " <strong>What to do:</strong> " + v(R.fix) : "") + "</p></li>").join("") + "</ul>";
    if (N.owner) {
      E += "<div class=\"acc-owner\"><b>Owner note for Elliot.</b> Share the studio from the Share menu by inviting each agent's Claude email at the Viewer level, and keep the public link off. A public link switches off the MLS connection for everyone who opens it. Viewers can use the studio but cannot edit it or publish versions.</div>";
    }
    E += "<div class=\"acc-acts\"><button class=\"btn green\" type=\"button\" id=\"acc_copy\">Copy report for Elliot</button>" + (N.own ? "<button class=\"btn\" type=\"button\" data-open-connections>Open Connections</button>" : "") + "<button class=\"btn ghost\" type=\"button\" id=\"acc_re\">Check again</button><span class=\"status\" id=\"acc_status\" role=\"status\"></span></div>";
    h.querySelector(".acc-body").innerHTML = E;
    Z("#acc_copy").onclick = async () => {
      const R = q();
      const T = Z("#acc_status");
      try {
        await navigator.clipboard.writeText(R);
        T.textContent = "Copied. Paste it in a text or email to Elliot.";
      } catch (j) {
        T.textContent = "Copy is blocked here. Select the report below and copy it.";
        (function (K) {
          let M = Z("#acc_raw");
          if (!M) {
            M = document.createElement("textarea");
            M.id = "acc_raw";
            M.readOnly = true;
            M.rows = 8;
            Z("#access .acc-body").appendChild(M);
          }
          M.value = K;
          M.select();
        })(R);
      }
    };
    Z("#acc_re").onclick = () => w(x, true);
    if (z.some(R => R.k === "mls" || R.k === "ai") && !h.dataset.seen) {
      h.open = true;
      h.dataset.seen = "1";
    }
  }
  async function w(h, O) {
    x = h || x || {};
    if (O) {
      N.checked = false;
      H();
    }
    await async function (z) {
      N.top = function () {
        try {
          return window.top === window.self;
        } catch (y) {
          return false;
        }
      }();
      N.phone = /iphone|ipad|android/i.test(navigator.userAgent);
      N.runtime = !!window.claude && !!window.claude.use;
      N.own = !!window.claude && !!window.claude.byok;
      N.mcp = !!z.mcp;
      N.sample = !!z.sample;
      N.downloads = !!z.downloads;
      N.user = !!z.user;
      N.owner = false;
      N.canEdit = false;
      N.write = null;
      if (z.user) {
        try {
          N.owner = !!(await z.user.isOwner());
        } catch (y) {}
        try {
          N.canEdit = !!(await z.user.canEdit());
        } catch (E) {}
        try {
          N.write = z.user.can ? await z.user.can("data.write") : null;
        } catch (R) {
          N.write = null;
        }
      }
      N.listed = null;
      N.auth = null;
      if (z.mcp) {
        try {
          const T = await z.mcp.listTools();
          const j = (T && T.servers || []).find(K => K.server === S);
          N.listed = !!j && !!(j.tools || []).length;
          N.auth = j ? j.authStatus : null;
        } catch (K) {
          N.listed = null;
        }
      }
      N.permMls = z.mcp ? await L(z.pm, "mcp:" + S) : "off";
      N.permAi = z.sample ? await L(z.pm, "sample") : "off";
      N.when = new Date().toLocaleString();
      N.checked = true;
    }(x);
    H();
  }
  window.iMathAccess = {
    run: w,
    report: q,
    data: () => Object.assign({}, N),
    rows: F
  };
})();
