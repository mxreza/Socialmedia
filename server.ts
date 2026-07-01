import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

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
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For React SPA Routing support
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
