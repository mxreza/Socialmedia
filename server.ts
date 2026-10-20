import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for Fetching Dynamic Social Stats
  app.get("/api/social-stats", (_req, res) => {
    res.json({
      instagram: { followers: "485", posts: "118" },
      linkedin: { connects: "2.8k", posts: "47" },
      spotify: { playlists: "18", minutes: "45k" },
      x: { followers: "360", posts: "680" },
      coffeebede: { fans: "12", coffees: "42" },
      chess: { rating: "1.4k", wins: "860" },
      dribbble: { followers: "320", shots: "62" },
      strava: { activities: "14", distance: "54 km" },
      virgool: { followers: "85", posts: "82" },
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
    app.use(
      "/assets",
      express.static(path.join(distPath, "assets"), {
        maxAge: "1y",
        immutable: true,
      })
    );
    app.use(
      "/fonts",
      express.static(path.join(distPath, "fonts"), {
        maxAge: "1y",
        immutable: true,
      })
    );
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
