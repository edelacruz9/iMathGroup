"""Split the published Studio page into styles, markup, data blobs and script modules."""
import base64, json, pathlib, re, sys

src, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
html = src.read_text(encoding="utf-8")
for d in ("styles", "scripts", "data", "assets/img", "assets/fonts"):
    (out / d).mkdir(parents=True, exist_ok=True)

styles = re.findall(r"<style>(.*?)</style>", html, re.S)
for i, css in enumerate(styles):
    (out / "styles" / f"style{i:02d}.css").write_text(css)

ext = re.findall(r'<script src="([^"]+)"', html)
(out / "scripts" / "external.txt").write_text("\n".join(ext) + "\n")

body = re.sub(r"<script.*?</script>", "", html, flags=re.S)
body = re.sub(r"<style>.*?</style>", "", body, flags=re.S)
(out / "markup.html").write_text(body)

def save_data_uri(name, uri, folder):
    m = re.match(r"data:([\w/+.-]+);base64,(.*)", uri, re.S)
    if not m:
        return None
    ext = {"image/png": "png", "image/jpeg": "jpg", "image/svg+xml": "svg", "image/webp": "webp",
           "image/gif": "gif", "font/woff2": "woff2"}.get(m.group(1), "bin")
    p = out / folder / f"{name}.{ext}"
    p.write_bytes(base64.b64decode(m.group(2)))
    return p.name

scripts = re.findall(r"<script>(.*?)</script>", html, re.S)
report = []
for i, js in enumerate(scripts):
    js = js.strip()
    m = re.match(r"(?:window\.(\w+)|const (\w+))\s*=\s*", js)
    if m and js[m.end()] == "{":
        name = m.group(1) or m.group(2)
        obj, end = json.JSONDecoder().raw_decode(js, m.end())
        rest = js[end:].lstrip(";").strip()
        if name == "ASSETS_SRC":
            index = {k: save_data_uri(k, v, "assets/img") for k, v in obj.items() if isinstance(v, str)}
            (out / "data" / "assets-index.json").write_text(json.dumps(index, indent=1))
        elif name == "__DS_FONTS":
            for k, v in obj.items():
                (out / "assets" / "fonts" / f"{k}.ttf").write_bytes(base64.b64decode(v))
        else:
            (out / "data" / f"{name}.json").write_text(json.dumps(obj, indent=1))
        report.append(f"block {i}: data {name} ({len(obj)} keys){' + code' if rest else ''}")
        if rest:
            (out / "scripts" / f"b{i:02d}-{name}-tail.js").write_text(rest)
        continue
    mod = re.search(r"function (m\d+)_", js)
    tag = mod.group(1) if mod else f"b{i:02d}"
    (out / "scripts" / f"b{i:02d}-{tag}.js").write_text(js)
    report.append(f"block {i}: script {tag} ({len(js)} chars)")

fonts = re.findall(r'font-family:"([^"]+)";font-weight:(\d+);font-style:(\w+);font-display:swap;src:url\((data:[^)]+)\)', html)
for fam, w, st, uri in fonts:
    save_data_uri(f"{fam}-{w}-{st}", uri, "assets/fonts")
report.append(f"{len(styles)} style blocks, {len(fonts)} @font-face, external: {ext}")
print("\n".join(report))
