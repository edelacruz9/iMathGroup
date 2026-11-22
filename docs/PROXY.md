# Your personal MLS proxy (advanced)

Most agents do not need this any more: the Studio's **Connect my MLS** button signs you in with your own Flexmls login through the team relay (see RELAY.md), with no Spark token and no Cloudflare account. This proxy remains as a fallback for anyone who prefers their own Spark Datamart token.

A small Cloudflare Worker that you deploy to **your own** free Cloudflare account. It keeps your Spark access token as a secret, checks your passcode, and forwards the Studio's read-only MLS requests to the Spark API. It stores and logs nothing. iMath never has access to it.

## Deploy from the Cloudflare dashboard (no coding)

1. Create a free account at **dash.cloudflare.com**.
2. Go to **Workers & Pages**, then **Create**, then **Create Worker**. Name it `imath-mls` and click **Deploy**.
3. Click **Edit code**. Delete what is there, paste the contents of [`worker/src/index.js`](../worker/src/index.js), and click **Deploy**.
4. Go to the Worker's **Settings**, then **Variables and Secrets**, and add:

   | Type | Name | Value |
   |---|---|---|
   | Secret | `SPARK_TOKEN` | Your Spark access token from the Datamart email |
   | Secret | `STUDIO_PASSCODE` | A long passcode you make up (20+ characters) |
   | Text | `ALLOWED_ORIGIN` | `https://edelacruz9.github.io` |

5. Copy the Worker's address, for example `https://imath-mls.yourname.workers.dev`.

Paste the address and passcode into the Studio under **Connections**.

## Deploy from the command line (optional)

```bash
npx wrangler login
```

```bash
npx wrangler deploy --config worker/wrangler.toml
```

```bash
npx wrangler secret put SPARK_TOKEN --config worker/wrangler.toml
```

```bash
npx wrangler secret put STUDIO_PASSCODE --config worker/wrangler.toml
```

## What it allows

Only these read-only calls, matching the Studio's tools: listing search, listing photos, one photo, and market statistics (price, absorption, days on market, sale-to-list ratio, inventory). Anything else gets a 404. Calls without your passcode, or from a site other than `ALLOWED_ORIGIN`, are refused.

## Changing or revoking

- New Spark token: update the `SPARK_TOKEN` secret.
- Think your passcode leaked: change `STUDIO_PASSCODE`, then update it in the Studio.
- Stop entirely: delete the Worker in Cloudflare.
