// cPanel/Passenger's default startup file. Build once before starting the app.
/* eslint-disable @typescript-eslint/no-require-imports -- Passenger loads app.js as CommonJS. */
const { createServer } = require("node:http");
const next = require("next");

process.env.NODE_ENV = process.env.NODE_ENV || "production";
const port = Number(process.env.PORT || 3000);
const hostname = process.env.APP_HOST || "127.0.0.1";
const app = next({ dev: false, dir: __dirname, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((request, response) => {
    handle(request, response).catch((error) => {
      console.error("Request failed", error);
      if (!response.headersSent) response.statusCode = 500;
      response.end("Internal server error");
    });
  });
  server.on("error", (error) => {
    console.error("Server failed", error);
    process.exit(1);
  });
  server.listen(port, hostname, () => {
    console.log(`My Exclusive Rentals is listening on ${hostname}:${port}`);
  });
}).catch((error) => {
  console.error("Unable to start Next.js", error);
  process.exit(1);
});
