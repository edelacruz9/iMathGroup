# iMath Marketing Studio

Branded marketing tools for iMath Group agents and loan officers: social posts, business cards, open house flyers and sign-in sheets, yard signs, email signatures, CMA and investor reports, listing videos, and more.

**Bring your own keys.** The Studio only provides the functions. Each person connects their own Anthropic API key and their own MLS access, and pays for their own usage. iMath runs no server and never sees your keys or data.

## Two ways to run it

| | GitHub-hosted site | Inside Claude |
|---|---|---|
| Where | `https://edelacruz9.github.io/iMathGroup/` | The Studio artifact on claude.ai |
| AI | Your Anthropic API key | Your Claude plan |
| MLS | Your own Cloudflare Worker proxy with your Spark key | Your own Flexmls connector in Claude |
| Setup | [docs/SETUP.md](docs/SETUP.md) | Connect Flexmls under Claude, Customize, Connectors |

Tabs that need no MLS or AI (cards, signs, signatures, flyers, social posts, avatars) work right away in either mode.

## Repo layout

```
index.html              Studio markup; loads the scripts below in order
public/legacy/          The Studio's original code, recovered from the published page (classic scripts, order matters)
src/runtime/            Bring-your-own-keys stand-in for the Claude runtime (AI, MLS, downloads)
worker/                 Personal MLS proxy each agent deploys to their own Cloudflare account
docs/                   Setup, proxy, admin and architecture guides
tools/rebuild/          Scripts that regenerate public/legacy/ from a published Studio page
```

## Develop

```bash
npm install
npm run dev
```

See [docs/ADMIN.md](docs/ADMIN.md) for deploying and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how it fits together.

Copyright (c) 2026 Elliot De la Cruz and iMath Group. Source is visible for reference; see [LICENSE](LICENSE). Use is subject to [TERMS.md](TERMS.md).
