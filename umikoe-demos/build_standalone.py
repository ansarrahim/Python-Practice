"""Bundle each demo into a single HTML file that can be emailed or sent on chat.

The demos share assets/base.css and assets/umikoe.js. This script inlines both
into every demo page and writes the results to standalone/.

    python3 build_standalone.py
"""
from pathlib import Path

ROOT = Path(__file__).parent
OUT = ROOT / "standalone"
DEMOS = ["demo-1-harbor", "demo-2-washi", "demo-3-tradedesk", "demo-4-voyage"]


def main():
    css = (ROOT / "assets" / "base.css").read_text(encoding="utf-8")
    js = (ROOT / "assets" / "umikoe.js").read_text(encoding="utf-8")
    OUT.mkdir(exist_ok=True)

    for name in DEMOS:
        html = (ROOT / f"{name}.html").read_text(encoding="utf-8")
        css_tag = '<link rel="stylesheet" href="assets/base.css">'
        js_tag = '<script src="assets/umikoe.js"></script>'
        if css_tag not in html or js_tag not in html:
            raise SystemExit(f"{name}: shared asset tags not found")
        html = html.replace(css_tag, f"<style>\n{css}</style>")
        html = html.replace(js_tag, f"<script>\n{js}</script>")
        target = OUT / f"Umikoe-{name.split('-', 2)[2].capitalize()}.html"
        target.write_text(html, encoding="utf-8")
        print(f"wrote {target.relative_to(ROOT)} ({target.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
