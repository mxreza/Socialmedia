import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const DEFAULT_ORIGIN = "https://ais-pre-6td3f3l7kyfhba45zlqpug-816336575119.europe-west2.run.app";

function getBaseUrl(req: express.Request) {
  const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol || "https";
  const host = (req.headers["x-forwarded-host"] as string) || req.get("host");
  if (!host) return DEFAULT_ORIGIN;
  return `${proto}://${host}`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for Fetching Dynamic Social Stats
  app.get("/api/social-stats", (req, res) => {
    // Return static values immediately without any web scraper requests to avoid lag, hangs, or timeouts
    res.json({
      instagram: { followers: "4.2k", posts: "118" },
      linkedin: { connects: "2.8k", posts: "47" },
      spotify: { playlists: "18", minutes: "45k" },
      x: { followers: "3.2k", posts: "680" },
      coffeebede: { fans: "12", coffees: "42" },
      chess: { rating: "1.4k", wins: "860" },
      dribbble: { followers: "1.4k", shots: "62" },
      medium: { followers: "1.2k", stories: "14" },
      virgool: { followers: "3.4k", posts: "82" }
    });
  });

  // Handle Vite in dev or serve index.html in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Intercept HTML requests to ensure absolute Open Graph URLs match requesting domain
    app.use(async (req, res, next) => {
      const isHtml =
        req.method === "GET" &&
        !req.path.startsWith("/api") &&
        (req.path === "/" || req.headers.accept?.includes("text/html") || !req.path.includes("."));

      if (isHtml) {
        try {
          const baseUrl = getBaseUrl(req);
          const indexHtmlPath = path.join(process.cwd(), "index.html");
          let template = fs.readFileSync(indexHtmlPath, "utf-8");
          template = template.replaceAll(DEFAULT_ORIGIN, baseUrl);
          const html = await vite.transformIndexHtml(req.originalUrl, template);
          res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).end(html);
          return;
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
          return;
        }
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For React SPA Routing support
    app.get("*", (req, res) => {
      try {
        const baseUrl = getBaseUrl(req);
        const indexPath = path.join(distPath, "index.html");
        let html = fs.readFileSync(indexPath, "utf-8");
        html = html.replaceAll(DEFAULT_ORIGIN, baseUrl);
        res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).send(html);
      } catch (err) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
