# Admin guide (Elliot)

## First-time setup

1. The repo is `edelacruz9/iMathGroup` (public). The site is at `https://edelacruz9.github.io/iMathGroup/`.
2. Push to `main`.
3. In the repo, **Settings**, **Pages**, set **Source** to **GitHub Actions**. The `Deploy to GitHub Pages` workflow builds and publishes on every push to `main`.
4. Optional: add a custom domain such as `studio.imathgroup.com` under **Settings**, **Pages**, then tell agents to use it as their proxy's `ALLOWED_ORIGIN`.
5. If the repo moves (for example to an iMath Group organization), update `src/config.js`, `ALLOWED_ORIGIN` in `worker/wrangler.toml`, and the addresses in README.md and docs/PROXY.md.

## Updating the Studio inside Claude

The same code runs inside Claude, where agents use their Claude plan and the RealMLS connector instead of their own keys.

1. With `public/roster.json` in place, run `npm run build:claude`. It writes `dist-claude/studio.html` (gitignored; it contains the roster).
2. Ask Claude to publish `dist-claude/studio.html` to the Studio artifact (`https://claude.ai/artifact/UvVmYPtpsbkPNppfLnxzED`), keeping its capabilities. The exact list is in ARCHITECTURE.md under "Running inside Claude".
3. Keep the artifact invite-only. Invite each agent's Claude email from its **Share** menu, at Viewer level, and leave the public link off.

## The standalone CMA and Investor Report

The CMA is no longer a Studio tab. It is its own private artifact, built from the same code:

1. Run `npm run build:cma`. It writes `dist-claude/cma.html` (embeds `public/roster.json` like the Studio build).
2. Publish it to the CMA artifact (`https://claude.ai/artifact/CtN9R77xwnGYFznxz9p95x`) with the same capabilities as the Studio (RealMLS, Parallel Search, sample, downloads).
3. Share it only with agents who have Claude and the RealMLS connector, at Viewer level. It keeps the Claude chat backup for anyone whose page cannot reach the MLS.

It is also on the GitHub Pages site as `cma.html` (https://edelacruz9.github.io/iMathGroup/cma.html), next to the Studio at the site root. That copy uses each agent's own keys and MLS proxy, like the hosted Studio, and its Claude chat backup works without them. `npm run build` regenerates `cma.html` before building, so edit `index.html` or `cma/`, never `cma.html` itself.

`cma/section.html` holds the CMA markup and `cma/ORDER.txt` the scripts it loads. The Studio keeps the MLS connection wizard under Tips and Limits for Pull from MLS and Listing Video.

## The team roster (kept private)

Names, phone numbers, emails, NMLS numbers and loan officer headshots are **not** in the repo or on the public site. They live in one private file, `public/roster.json`, which git ignores.

- **Local development:** keep the file at `public/roster.json`; the dev server serves it automatically.
- **Agents:** send them the file privately (email or a shared drive). They open the Studio, click **Connections**, then **Import roster file**. It is saved only in their browser.
- **Updating:** edit the file (same format as `roster.example.json`; loan officers' `headshot` is a `data:image/...` URL), raise `updated` to today's date, and send the new file. Agents import it again.
- Never commit it or put it in `public/` of a deployed build. The deploy workflow builds from git, so the ignored file is never published.

Before every push, this should print nothing:

```bash
git grep -n -E "@gmail\.com|cfmtg\.com/|904[.-][0-9]{3}[.-][0-9]{4}" -- . ":!*.md" | grep -v "904.555.0123"
```

If you regenerate `public/legacy/` from the artifact, run `tools/rebuild/strip_roster.py` again (see `tools/rebuild/README.md`).

## Approving team tools (Tool Library)

The owner approval flow still works the same way: agents email a submission, you test it in the Tool Library owner panel, and approved tools are added to `window.__IMATH_LIB` in `03-library.js`. Commit the change to publish it.

## Regenerating from a newer artifact

If you change the Studio in Claude first, rebuild `public/legacy/` from the published page with the scripts in `tools/rebuild/` (see its README). Review the diff before committing.
