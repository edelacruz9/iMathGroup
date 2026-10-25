"""Assemble repo/public/ from the published page plus the deobfuscated modules.

Data blocks (assets, fonts, CMA runtime) are kept byte-for-byte so behavior matches the
published Studio; only the obfuscated code blocks are swapped for their readable versions.
"""
import json, pathlib, re, sys

page, deob, repo = (pathlib.Path(p) for p in sys.argv[1:4])
html = page.read_text(encoding="utf-8")
pub = repo / "public"
legacy = pub / "legacy"
legacy.mkdir(parents=True, exist_ok=True)

styles = re.findall(r"<style>(.*?)</style>", html, re.S)
(legacy / "base.css").write_text(styles[0].strip() + "\n")
(legacy / "studio.css").write_text(styles[1].strip() + "\n")

scripts = [s.strip() for s in re.findall(r"<script>(.*?)</script>", html, re.S)]
order = []

def emit(name, text):
    (legacy / name).write_text(text.rstrip() + "\n")
    order.append(name)

emit("00-assets.js", scripts[0])
emit("01-ds-fonts.js", scripts[1])
cma = scripts[2]
start = cma.index("{")
_, cut = json.JSONDecoder().raw_decode(cma, start)
emit("02-cma-runtime.js", cma[:cut] + ";")
emit("03-library.js", (deob / "b02-__CMA_RT-tail" / "deobfuscated.js").read_text())

names = {
    "m2": "theme", "m3": "kit", "m4": "captions", "m5": "print", "m6": "cards", "m7": "flyers",
    "m8": "signs", "m9": "research", "m10": "email-signature", "m11": "social-render",
    "m12": "doc-import", "m13": "create-core", "m14": "create-render", "m15": "data-sheet",
    "b17": "gifenc", "m16": "icons", "m17": "listing-video-render", "m18": "calculators",
    "m19": "cma-engine", "m20": "cma-chat", "m21": "cma-report", "m22": "studio-shell",
    "m23": "create-app", "m24": "fun-app", "m25": "listing-video-app", "m26": "access",
}
blocks = sorted(p for p in deob.iterdir() if p.is_dir() and re.match(r"b(0[3-9]|1\d|2[0-4])-", p.name))
blocks += [deob / f"b25-m{n}" for n in (23, 24, 25, 26)]
for i, d in enumerate(blocks, start=4):
    key = d.name.split("-", 1)[1]
    emit(f"{i:02d}-{names[key]}.js", (d / "deobfuscated.js").read_text())

body = re.sub(r"<script.*?</script>\s*", "", html, flags=re.S)
body = re.sub(r"<style>.*?</style>\s*", "", body, flags=re.S)
body = body.split("<body>", 1)[1].split("</body>", 1)[0]
body = re.sub(r"<title>.*?</title>\s*", "", body, flags=re.S).strip()
cdn = re.findall(r'<script src="([^"]+)"></script>', html)

tags = "\n".join(f'  <script src="{u}" crossorigin="anonymous"></script>' for u in cdn)
# src/main.js loads the legacy scripts itself, in ORDER.txt order, after the roster is in place.
tags += '\n  <script type="module" src="/src/main.js"></script>'
index = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>iMath Marketing Studio</title>
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; media-src 'self' data: blob: https:; connect-src 'self' https:; worker-src 'self' blob:; frame-src 'none'; object-src 'none'">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="stylesheet" href="legacy/base.css">
  <link rel="stylesheet" href="legacy/studio.css">
</head>
<body>
{body}
{tags}
</body>
</html>
"""
(repo / "index.html").write_text(index)
(legacy / "ORDER.txt").write_text("\n".join(order) + "\n")
print(f"{len(order)} legacy scripts, {len(cdn)} CDN libs, index.html {len(index)} bytes")
