"""Check build-time SEO and routing in the static cPanel export."""

import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.meta = {}
        self.canonicals = []
        self.links = set()
        self.titles = []
        self.headings = []
        self.paragraphs = []
        self.schemas = []
        self.capture = None
        self.text = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            self.meta[attrs.get("name", attrs.get("property"))] = attrs.get("content", "")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs["href"])
        if tag == "a":
            self.links.add(attrs.get("href"))
        if tag in ("title", "h1", "p") or (
            tag == "script" and attrs.get("type") == "application/ld+json"
        ):
            self.capture = tag
            self.text = []

    def handle_data(self, data):
        if self.capture:
            self.text.append(data)

    def handle_endtag(self, tag):
        if tag != self.capture:
            return
        value = "".join(self.text).strip()
        if tag == "script":
            self.schemas.append(json.loads(value))
        else:
            {"title": self.titles, "h1": self.headings, "p": self.paragraphs}[tag].append(value)
        self.capture = None


root = Path(__file__).resolve().parents[1] / "out"
site = "https://myexclusiverentals.com"
urls = [node.text for node in ET.parse(root / "sitemap.xml").findall(".//{*}loc")]
articles = {url for url in urls if urlsplit(url).path.startswith("/blog/") and urlsplit(url).path != "/blog/"}
assert articles, "No articles in the build-time sitemap."
assert len(urls) == len(set(urls)), "Duplicate sitemap URLs."
listing = Page((root / "blog/index.html").read_text())
assert listing.canonicals == [f"{site}/blog/"]
for url in articles:
    assert urlsplit(url).path in listing.links, f"Build-time article missing from initial listing: {url}"
shell = Page((root / "blog/__article/index.html").read_text())
assert not shell.canonicals, "Shared shell must not give all articles the same canonical."
assert "noindex" not in shell.meta.get("robots", ""), "Initial noindex can prevent JavaScript rendering."
assert not any(schema.get("@type") == "BlogPosting" for schema in shell.schemas)
assert f"Sitemap: {site}/sitemap.xml" in (root / "robots.txt").read_text()
assert "noindex" in Page((root / "404.html").read_text()).meta.get("robots", "")
assert (root / ".htaccess").exists(), "Apache routing file missing from export."
assert "blog/__article/index.html [END]" in (root / ".htaccess").read_text()
print(f"PASS: initial listing and sitemap include {len(articles)} published posts.")
print("PASS: article shell has no conflicting canonical/noindex; robots and Apache routing are exported.")
print("Run npm run test:blog to verify live Firebase loading and rendered article SEO in a browser.")
