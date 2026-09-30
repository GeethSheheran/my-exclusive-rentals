"""Check a running server without JavaScript: npm run check:seo -- http://127.0.0.1:3000"""

import json
from html.parser import HTMLParser
import sys
from urllib.request import Request, urlopen
from urllib.error import HTTPError
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


base_url = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000").rstrip("/")
site = "https://myexclusiverentals.com"


def fetch(path):
    request = Request(base_url + path, headers={"User-Agent": "SEO verification"})
    try:
        with urlopen(request, timeout=30) as response:
            return response.status, response.read().decode()
    except HTTPError as error:
        return error.code, error.read().decode()


status, sitemap = fetch("/sitemap.xml")
assert status == 200, f"Sitemap HTTP {status}"
urls = [node.text for node in ET.fromstring(sitemap).findall(".//{*}loc")]
articles = {url for url in urls if urlsplit(url).path.startswith("/blog/") and urlsplit(url).path != "/blog/"}
assert articles, "No articles in the sitemap; check the CMS configuration."
assert len(urls) == len(set(urls)), "Duplicate sitemap URLs."
status, listing_html = fetch("/blog/")
assert status == 200

listing = Page(listing_html)
assert listing.canonicals == [f"{site}/blog/"]
titles = set()
for url in sorted(articles):
    path = urlsplit(url).path
    assert path in listing.links, f"Article link missing from listing HTML: {url}"
    status, html = fetch(path)
    assert status == 200, f"Article HTTP {status}: {url}"
    page = Page(html)
    assert len(page.titles) == 1 and page.titles[0] != "Travel Story | My Exclusive Rentals", url
    assert page.titles[0] not in titles, f"Duplicate article title: {url}"
    titles.add(page.titles[0])
    assert len(page.headings) == 1 and page.headings[0], f"Missing article heading: {url}"
    assert page.meta.get("description"), f"Missing description: {url}"
    assert "noindex" not in page.meta.get("robots", ""), url
    assert len(page.canonicals) == 1, f"Expected one canonical: {url}"
    canonical = page.canonicals[0]
    assert urlsplit(canonical).scheme in ("http", "https"), url
    assert canonical != f"{site}/blog/", f"Article points at the blog index: {url}"
    assert page.meta.get("og:url") == canonical, url
    assert page.meta.get("og:type") == "article", url
    schemas = [schema for schema in page.schemas if schema.get("@type") == "BlogPosting"]
    assert len(schemas) == 1, f"Missing article structured data: {url}"
    assert schemas[0]["headline"] == page.headings[0], url
    assert schemas[0]["mainEntityOfPage"] == canonical, url
    # Require substantive text beyond the excerpt and shared footer.
    assert sum(len(p.split()) for p in page.paragraphs) > 100, f"Article body missing: {url}"

status, robots = fetch("/robots.txt")
assert status == 200
assert f"Sitemap: {site}/sitemap.xml" in robots
for path in ["/blog/seo-check-nonexistent-20260930/", "/blog/__article/"]:
    status, html = fetch(path)
    assert status == 404, f"Missing article returned HTTP {status}: {path}"
    assert "noindex" in Page(html).meta.get("robots", "")
print(f"PASS: {len(articles)} articles have server-rendered content, unique titles, canonicals, and structured data.")
print("PASS: listing links, live sitemap, robots.txt, and HTTP 404 responses.")
