"""Build the Studio as one self-contained page for publishing as a Claude artifact.

Usage: python3 -I tools/build-claude.py            (writes dist-claude/studio.html)

Inside Claude the page uses Claude's own runtime: the viewer's Claude plan for AI and their
RealMLS / Parallel Search connectors for data, so no API key or proxy is needed. src/ (the
bring-your-own-keys layer) is left out. The private public/roster.json, if present, is embedded
so the team list and loan officer headshots are there at startup. The artifact must stay private
or invite-only, since that roster holds contact details. dist-claude/ is gitignored.
"""
import json, pathlib, re

repo = pathlib.Path(__file__).resolve().parent.parent
pub = repo / "public"
legacy = pub / "legacy"
html = (repo / "index.html").read_text()

body = html.split("<body>", 1)[1].split("</body>", 1)[0]
cdn = re.findall(r'<script src="(https://cdnjs\.cloudflare\.com/[^"]+)"[^>]*></script>', body)
body = re.sub(r"\s*<script[^>]*>.*?</script>", "", body, flags=re.S).strip()

def inline_script(code):
    # A literal "</script" inside the code would end the tag early.
    return "<script>\n" + code.replace("</script", "<\\/script").rstrip() + "\n</script>"

parts = [
    "<title>iMath Marketing Studio</title>",
    "<!-- (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Built from github.com/edelacruz9/iMathGroup (tools/build-claude.py). -->",
    "<style>\n" + (legacy / "base.css").read_text() + (legacy / "studio.css").read_text() + "</style>",
    body,
]
parts += [f'<script src="{u}"></script>' for u in cdn]

roster = pub / "roster.json"
if roster.exists():
    data = json.loads(roster.read_text())
    parts.append(inline_script("window.__IMATH_ROSTER = " + json.dumps(data, ensure_ascii=False) + ";"))
    note = f"roster embedded ({len(data.get('people', []))} people)"
else:
    note = "no public/roster.json: built with an empty roster"

for name in (legacy / "ORDER.txt").read_text().split():
    parts.append(inline_script((legacy / name).read_text()))

out = repo / "dist-claude" / "studio.html"
out.parent.mkdir(exist_ok=True)
out.write_text("\n".join(parts) + "\n")
print(f"{out.relative_to(repo)}: {out.stat().st_size / 1e6:.1f} MB, {note}")
