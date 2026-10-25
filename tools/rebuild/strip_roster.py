"""Move people's contact details and headshots out of public/legacy/ into a private roster file.

Usage: python3 -I tools/rebuild/strip_roster.py <repo> <source-roster.json> <out-roster.json>

- <source-roster.json> is the iMath Group Roster (the artifact's roster.json).
- Loan officer headshots are taken out of 00-assets.js and stored on each LO's "headshot".
- 03-library.js gets an empty built-in roster; 07-print.js keeps only the "No loan officer" choice.
The Studio refills both at runtime from roster.json (see src/roster-loader.js). Never commit <out>.
"""
import json, pathlib, re, sys

repo, src, out = (pathlib.Path(p) for p in sys.argv[1:4])
legacy = repo / "public" / "legacy"
roster = json.loads(src.read_text())

# 00-assets.js: pull lo_* headshots out.
assets_js = legacy / "00-assets.js"
text = assets_js.read_text()
prefix = "const ASSETS_SRC = "
assert text.startswith(prefix), "00-assets.js layout changed"
body, end = json.JSONDecoder().raw_decode(text, len(prefix))
heads = {k[3:]: body.pop(k) for k in [k for k in body if k.startswith("lo_")]}
assets_js.write_text(prefix + json.dumps(body, ensure_ascii=False, separators=(", ", ": ")) + text[end:])

for person in roster.get("people", []):
    if person.get("role") == "lo" and not person.get("headshot") and person.get("id") in heads:
        person["headshot"] = heads[person["id"]]
missing = sorted(set(heads) - {p["id"] for p in roster.get("people", [])})
if missing:
    sys.exit(f"Headshots with no roster entry, not removed safely: {missing}")
out.write_text(json.dumps(roster, indent=1, ensure_ascii=False) + "\n")

# 03-library.js: empty built-in roster (it is the last statement in the file).
lib = legacy / "03-library.js"
t = lib.read_text()
i = t.index("window.__IMATH_ROSTER = {")
lib.write_text(t[:i] + 'window.__IMATH_ROSTER = window.__IMATH_ROSTER || {\n  name: "iMath Group Roster",\n  updated: "",\n  defaults: {\n    title: "REALTOR®"\n  },\n  people: []\n};\n')

# 07-print.js: loan officers come from the roster at runtime.
pr = legacy / "07-print.js"
t = pr.read_text()
t, n = re.subn(r'LO: \[\{\n\s+id: "none",\n\s+name: "No loan officer",\n\s+short: "None"\n\s+\}, \{.*?\}\],\n(\s+)T: \{',
               lambda m: 'LO: [{\n      id: "none",\n      name: "No loan officer",\n      short: "None"\n    }],\n' + m.group(1) + "T: {",
               t, count=1, flags=re.S)
if n != 1:
    sys.exit("07-print.js loan officer list not found")
pr.write_text(t)

print(f"moved {len(heads)} headshots and {len(roster.get('people', []))} people to {out}")
