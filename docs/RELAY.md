# The team MLS relay

One small Cloudflare Worker on Elliot's free account serves every agent on the website. It exists because the Flexmls MCP server (`mcp.fbsdata.com`) only answers approved apps like Claude, never a web page.

What it does:

- **Sign in.** `Connect my MLS` opens `relay/auth/start`, which sends the agent to the real Flexmls sign in page (standard OAuth with PKCE). The password is typed only on Flexmls. The resulting tokens go back to that agent's own browser and nowhere else.
- **Forward.** The Studio's read-only MLS calls go to `relay/tool/<name>` with the agent's token, and the relay makes the matching MCP call to `mcp.fbsdata.com`. Results come back in the same shape the Claude runtime returns, so the Studio code does not care which runtime it is on.

It stores and logs nothing, has no secrets, and only answers the origins in `ALLOWED_ORIGINS`. Only the eight read-only tools the Studio uses are forwarded.

## Deploy from the Cloudflare dashboard (no coding)

1. Create a free account at **dash.cloudflare.com** (or sign in).
2. **Workers & Pages**, **Create**, **Create Worker**. Name it `imath-mls-relay`, click **Deploy**.
3. Click **Edit code**, delete what is there, paste the contents of [`worker/relay/index.js`](../worker/relay/index.js), click **Deploy**.
4. In the Worker's **Settings**, **Variables and Secrets**, add a **Text** variable:

   | Name | Value |
   |---|---|
   | `ALLOWED_ORIGINS` | `https://edelacruz9.github.io` |

5. Copy the Worker's address, for example `https://imath-mls-relay.yourname.workers.dev`.
6. Put that address in `src/config.js` as `MLS_RELAY_URL` and push. The site rebuilds and **Connect my MLS** appears in Connections on both the Studio and the CMA page.

## Deploy from the command line (optional)

```bash
npx wrangler deploy --config worker/relay/wrangler.toml
```

## Moving the site to a custom domain later

Add the new origin to `ALLOWED_ORIGINS` (comma separated) in the Worker's settings. Nothing else changes.
