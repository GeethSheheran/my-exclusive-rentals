// Local preview/testing only. Production serves out/ through Apache, not Node.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 4173);
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon" };
createServer(async (request, response) => {
  response.setHeader("Cache-Control", "no-store");
  try {
    let path = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let status = 200;
    if (/^\/blog\/__article(?:\/|$)/.test(path)) {
      path = "/404.html";
      status = 404;
    } else if (/^\/blog\/[a-z0-9][a-z0-9-]*(?:\/index\.html)?$/.test(path)) {
      response.writeHead(301, { Location: path.replace(/\/index\.html$/, "") + "/" });
      response.end();
      return;
    } else if (/^\/blog\/[a-z0-9][a-z0-9-]*\/$/.test(path)) {
      path = "/blog/__article/index.html";
    }
    let file = resolve(root, "." + path);
    if (!file.startsWith(root + sep) && file !== root) throw new Error("Invalid path");
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
      const body = await readFile(file);
      response.writeHead(status, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      response.end(await readFile(resolve(root, "404.html")));
    }
  } catch {
    response.writeHead(400);
    response.end("Bad request");
  }
}).listen(port, "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${port}`));
