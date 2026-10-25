# Rebuild public/legacy/ from a published Studio page

Use this when the Studio was changed in Claude first and you want those changes here.

1. Save the published page's HTML (Artifact read) as `studio.html` outside the repo.
2. Split it into parts:

   ```bash
   python3 -I tools/rebuild/extract.py studio.html /tmp/studio-extract
   ```

3. Deobfuscate each script with webcrack (Node 24; webcrack 2.16.0 or newer):

   ```bash
   for f in /tmp/studio-extract/scripts/*.js; do npx webcrack@2.16.0 "$f" -o "/tmp/studio-deob/$(basename "$f" .js)" -f; done
   ```

   Block 25 holds four modules (m23 to m26). Split it on the `/*! (c) 2026` header first, then deobfuscate each part, saving them as `b25-m23` to `b25-m26`.

4. Reassemble:

   ```bash
   python3 -I tools/rebuild/assemble.py studio.html /tmp/studio-deob .
   ```

5. Move contact details and headshots out of the code into your private roster file:

   ```bash
   python3 -I tools/rebuild/strip_roster.py . path/to/roster.json public/roster.json
   ```

   `public/roster.json` is gitignored. Send it to agents; they import it under Connections.

6. Re-apply the GitHub-build changes listed in `docs/ARCHITECTURE.md` (Changes made to the legacy code). Review `git diff`, then commit.
