// The GitHub repo this site is published from.
export const REPO_URL = "https://github.com/edelacruz9/iMathGroup";
export const SETUP_GUIDE_URL = `${REPO_URL}/blob/main/docs/SETUP.md`;
export const PROXY_GUIDE_URL = `${REPO_URL}/blob/main/docs/PROXY.md`;
// The Studio inside Claude: no API key or proxy, uses the viewer's Claude plan and RealMLS
// connector. Agents need an invitation to it (Share menu on the artifact).
export const CLAUDE_STUDIO_URL = "https://claude.ai/artifact/UvVmYPtpsbkPNppfLnxzED";
// One MLS relay for the whole team (worker/relay/, deployed to Elliot's Cloudflare account).
// It signs each agent in with their own Flexmls login and forwards the Studio's read-only MLS
// calls, because the Flexmls MCP server does not answer web pages directly. Empty means not
// deployed yet: the Studio then falls back to the old personal-proxy flow.
export const MLS_RELAY_URL = "https://imath-mls-relay.imathgroup.workers.dev";
