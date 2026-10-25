# Architecture

## How it fits together

```
Browser (GitHub Pages)
  index.html
  ├─ public/legacy/*.js      the Studio, unchanged; asks window.claude.use(name) for capabilities
  └─ src/main.js             installs the stand-in below, puts the roster in place, then loads legacy/ in ORDER.txt order
       └─ src/runtime/
            sample.js        "sample"      -> Anthropic Messages API with the agent's own key
            mcp.js           "mcp"         -> RealMLS: agent's own Worker; Parallel Search: Claude web tools
            downloads.js     "downloads"   -> browser file save
            index.js         "permissions" and "user"
            roster.js        team roster: imported file (this browser) or a privately served roster.json
            store.js         keys and settings in this browser's IndexedDB
            connections-ui.js  the Connections dialog

Agent's own Cloudflare account
  worker/src/index.js        holds SPARK_TOKEN, checks passcode, calls sparkapi.com (read-only)
```

Inside Claude the same legacy code runs with Claude's real `window.claude`, so `src/` is skipped.

## The seam

`public/legacy/25-studio-shell.js` requests five capabilities at startup and passes them to every tab:

| Capability | Methods the Studio calls | Stand-in |
|---|---|---|
| `downloads` | `save({ filename, data })` | `downloads.js` |
| `mcp` | `callTool(server, tool, args, { signal })` returns `{ payload }`; `listTools()` returns `{ servers: [{ server, tools, authStatus }] }` | `mcp.js` |
| `permissions` | `state(name)`, `request([names])` | `index.js` |
| `sample` | `json(prompt, { tools, signal, modelTier, images })`, `limits()` | `sample.js` |
| `user` | object with `name`, `email` | `index.js` |

Errors are thrown as `{ code }` objects using the codes the Studio already handles: `cancelled`, `rate_limited`, `not_granted`, `no_ai`, `needs_reauth`, `images_unavailable`, `declined`, `unsupported`, `server_not_connected`, `server_not_found`.

Models: `default` tier is `claude-opus-5-5` with server-side refusal fallback on; `quick` tier is `claude-haiku-5-5`. Agents can override per tier by saving a `models` setting.

## Module map (`public/legacy/`)

| File | Original | What it is |
|---|---|---|
| 00-assets.js | inline data | Logos, lockups, loan officer headshots, patterns (data URIs) |
| 01-ds-fonts.js | inline data | Fonts embedded into PDFs |
| 02-cma-runtime.js | inline data | CSS and script embedded into exported interactive CMA files (that script is still obfuscated) |
| 03-library.js | m1 | Tool Library entries and the built-in roster |
| 04-theme.js | m2 | `iMathTheme` brand colors and theming |
| 05-kit.js | m3 | `iMathKit` shared drawing helpers |
| 06-captions.js | m4 | `iMathCaptions` social captions, English and Spanish |
| 07-print.js | m5 | `iMathPrint` print and PDF helpers |
| 08-cards.js | m6 | `iMathCards` business cards |
| 09-flyers.js | m7 | `iMathFlyers` open house flyers and sign-in sheet |
| 10-signs.js | m8 | `iMathSigns` yard signs and sets |
| 11-research.js | m9 | `iMathResearch` online lookup helpers |
| 12-email-signature.js | m10 | `iMathSig` email signatures |
| 13-social-render.js | m11 | `iMathSocialX` social post rendering |
| 14-doc-import.js | m12 | `iMathDoc` importing Word, PDF and text |
| 15-create-core.js | m13 | `iMathCreate` Create Anything core |
| 16-create-render.js | m14 | `iMathCreateR` Create Anything rendering |
| 17-data-sheet.js | m15 | `iMathDataSheet` PDF data sheets |
| 18-gifenc.js | (lib) | GIF encoder |
| 19-icons.js | m16 | Icon set |
| 20-listing-video-render.js | m17 | `iMathLV` listing video rendering |
| 21-calculators.js | m18 | `iMathCalc` buydown, payment and HELOC tools |
| 22-cma-engine.js | m19 | `iMathCMA` comps, adjustments, market stats |
| 23-cma-chat.js | m20 | `iMathCMAChat` copy-paste CMA through Claude |
| 24-cma-report.js | m21 | `iMathReport` CMA and investor report |
| 25-studio-shell.js | m22 | App shell: tabs, profile, capabilities, CMA setup wizard |
| 26-create-app.js | m23 | `iMathCreateApp` Create Anything tab |
| 27-fun-app.js | m24 | `iMathFunApp` Avatars and GIFs |
| 28-listing-video-app.js | m25 | `iMathLVApp` Listing Video tab |
| 29-access.js | m26 | `iMathAccess` access and onboarding checks |

Names like `X4` and `Ug` inside these files come from the deobfuscator. Rename them gradually as each tab gets touched.

## Changes made to the legacy code for the GitHub build

All are small branches on `window.claude.byok`, so the same files still behave as before inside Claude:

- `03-library.js`: built-in roster is empty and only a fallback (`window.__IMATH_ROSTER || {...}`).
- `07-print.js`: loan officer list holds only "No loan officer"; the rest comes from the roster.
- `00-assets.js`: loan officer headshots removed (they live in the private roster).
- `25-studio-shell.js`: `XqOwn()` setup steps (own key, Spark token, proxy, connect, test, lookup); `Xy` help link and `XL` message point to the setup guide and Connections; the wizard finds the online-lookup step by id instead of position.
- `29-access.js`: `Fown()` rows for the Access Check, an Open Connections button, and the report line.

`tools/rebuild/` regenerates these files from a published artifact, which drops these changes. Review `git diff public/legacy/` after a rebuild and re-apply them.

## Open items

1. **Photo room tags through the Worker.** The RealMLS connector returns each photo with `Tags.Room` (for example "Kitchen"), which the CMA and Listing Video use to pick and sort photos. Confirm a real Spark photo response through the Worker includes it; without it the Studio falls back to Claude labels and file names.
2. **Exported CMA runtime.** The script inside `02-cma-runtime.js` is still obfuscated. Run it through `tools/rebuild/` separately.
3. **Page weight.** Assets and fonts are embedded as data URIs (about 2 MB). Move them to files in `public/assets/` once each use is checked (some go straight into jsPDF).

## Matching the RealMLS connector

Checked against real RealMLS calls (Oct 25, 2026). The Worker returns the same shapes:

- `ListingsListingSearch`: `{ total_entries, total_pages, previous_page, next_page, results: [{ Id, ResourceUri, StandardFields: {...}, FlexmlsLink }] }`. The CMA engine reads `result.StandardFields`.
- `ListingsListPhotos`: `{ photos: [{ Id, Name, Caption, Uri800, Primary, Tags }] }`.
- `MarketStatistics*`: `{ Dates: [...], <Option>: [...] }`, one array per requested option.

## Running inside Claude

`npm run build:claude` (or `python3 -I tools/build-claude.py`) writes `dist-claude/studio.html`: one page with the styles, markup and legacy scripts inline, without `src/`, and with the private roster embedded. Inside Claude the Studio uses Claude's runtime, so `window.claude.byok` is unset and every legacy file behaves as originally written. Publish it to the Studio artifact with these capabilities, pinned to runtime contract 0.2.74:

- `downloads`, `sample`
- `mcp`: `RealMLS` (ListingsListingSearch, ListingsListPhotos, ListingsShowPhoto, MarketStatisticsPrice, MarketStatisticsAbsorption, MarketStatisticsDaysOnMarket, MarketStatisticsRatio, MarketStatisticsInventory) and `Parallel Search` (web_search, web_fetch)

The artifact must stay invite-only, because the embedded roster holds contact details.
