import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for Fetching Dynamic Social Stats
  app.get("/api/social-stats", async (req, res) => {
    // Graceful default/fallback values (the mock numbers currently in App.tsx)
    const stats = {
      instagram: { followers: "4.2k", posts: "118" },
      linkedin: { connects: "2.8k", posts: "47" },
      spotify: { playlists: "18", minutes: "45k" },
      x: { followers: "3.2k", posts: "680" },
      coffeebede: { fans: "12", coffees: "42" },
      chess: { rating: "1.4k", wins: "860" },
      dribbble: { followers: "1.4k", shots: "62" },
      medium: { followers: "1.2k", stories: "14" },
      virgool: { followers: "3.4k", posts: "82" }
    };

    // Helper to format values cleanly to "k" forms (e.g. 1432 -> 1.4k)
    const formatStatValue = (val: string | number): string => {
      const cleaned = String(val).replace(/,/g, '').trim();
      const num = parseFloat(cleaned);
      if (isNaN(num)) return cleaned.toLowerCase();
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
      }
      return String(num);
    };

    const convertPersianDigits = (str: string): string => {
      const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
      const arabicDigits = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
      let resStr = str;
      for (let i = 0; i < 10; i++) {
        resStr = resStr.replace(persianDigits[i], i.toString()).replace(arabicDigits[i], i.toString());
      }
      return resStr;
    };

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7',
      'Cache-Control': 'no-cache'
    };

    const fetchTasks = [
      // 1. Chess.com: Fetch actual stats dynamically
      (async () => {
        try {
          const chessRes = await fetch("https://api.chess.com/pub/player/mxreza/stats", { headers, signal: AbortSignal.timeout(3000) });
          if (chessRes.ok) {
            const data = await chessRes.json();
            let rating = 1400;
            let wins = 860;

            if (data.chess_rapid) {
              if (data.chess_rapid.last && data.chess_rapid.last.rating) {
                rating = data.chess_rapid.last.rating;
              }
              if (data.chess_rapid.record && typeof data.chess_rapid.record.win === 'number') {
                wins = data.chess_rapid.record.win;
              }
            } else if (data.chess_blitz) {
              if (data.chess_blitz.last && data.chess_blitz.last.rating) {
                rating = data.chess_blitz.last.rating;
              }
              if (data.chess_blitz.record && typeof data.chess_blitz.record.win === 'number') {
                wins = data.chess_blitz.record.win;
              }
            }

            stats.chess.rating = formatStatValue(rating);
            stats.chess.wins = String(wins);
          }
        } catch (e) {
          console.warn("Chess.com API failed, fallback to default:", e);
        }
      })(),

      // 2. Virgool: Scrape real-time counts from public profile
      (async () => {
        try {
          const virgoolRes = await fetch("https://virgool.io/@mxreza", { headers, signal: AbortSignal.timeout(3000) });
          if (virgoolRes.ok) {
            let html = await virgoolRes.text();
            html = convertPersianDigits(html);

            const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) || 
                                   html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
            
            let descText = metaDescMatch ? metaDescMatch[1] : "";
            
            const folMatch = descText.match(/(\d+(?:\.\d+)?\s*[kK]?)\s*(?:دنبال‌کننده|دنبال کننده|فالوور)/) || 
                              html.match(/(\d+(?:\.\d+)?\s*[kK]?)\s*(?:دنبال‌کننده|دنبال کننده|follower)/);
            
            const postMatch = descText.match(/(\d+)\s*(?:نوشته|پست|مطلب)/) || 
                               html.match(/(\d+)\s*(?:نوشته|پست|post)/);

            if (folMatch) {
              stats.virgool.followers = formatStatValue(folMatch[1]);
            }
            if (postMatch) {
              stats.virgool.posts = formatStatValue(postMatch[1]);
            }
          }
        } catch (e) {
          console.warn("Virgool scrape failed, fallback to default:", e);
        }
      })(),

      // 3. CoffeeBede: Scrape real-time support from profile
      (async () => {
        try {
          const coffeeRes = await fetch("https://www.coffeebede.com/mreza", { headers, signal: AbortSignal.timeout(3000) });
          if (coffeeRes.ok) {
            let html = await coffeeRes.text();
            html = convertPersianDigits(html);

            const cupsMatch = html.match(/(\d+)\s*(?:قهوه|فنجان|فنجون|cup|coffee)/i);
            const fansMatch = html.match(/(\d+)\s*(?:حامی|طرفدار|طرفدارها|طرفداران|fan)/i);

            if (cupsMatch) {
              stats.coffeebede.coffees = formatStatValue(cupsMatch[1]);
            }
            if (fansMatch) {
              stats.coffeebede.fans = formatStatValue(fansMatch[1]);
            }
          }
        } catch (e) {
          console.warn("CoffeeBede scrape failed, fallback to default:", e);
        }
      })(),

      // 4. Medium: Fetch followers and stories
      (async () => {
        try {
          const mediumRes = await fetch("https://medium.com/@mxreza", { headers, signal: AbortSignal.timeout(3000) });
          if (mediumRes.ok) {
            const html = await mediumRes.text();
            const folMatch = html.match(/(\d+(?:\.\d+)?\s*[kK]?)\s*Followers/i);
            if (folMatch) {
              stats.medium.followers = formatStatValue(folMatch[1]);
            }
          }

          const rssRes = await fetch("https://medium.com/feed/@mxreza", { headers, signal: AbortSignal.timeout(3000) });
          if (rssRes.ok) {
            const xml = await rssRes.text();
            const itemCount = (xml.match(/<item>/g) || []).length;
            if (itemCount > 0) {
              stats.medium.stories = String(itemCount);
            }
          }
        } catch (e) {
          console.warn("Medium stats fetch failed, fallback to default:", e);
        }
      })(),

      // 5. Dribbble: Scrape shots & followers count
      (async () => {
        try {
          const dribbbleRes = await fetch("https://dribbble.com/mxreza", { headers, signal: AbortSignal.timeout(3000) });
          if (dribbbleRes.ok) {
            const html = await dribbbleRes.text();
            const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
            if (metaMatch) {
              const descVal = metaMatch[1];
              const dfol = descVal.match(/(\d+(?:,\d+)?(?:\.\d+)?\s*[kK]?)\s*Followers/i);
              const dshots = descVal.match(/(\d+(?:,\d+)?(?:\.\d+)?\s*[kK]?)\s*Shots/i) || descVal.match(/(\d+(?:,\d+)?(?:\.\d+)?\s*[kK]?)\s*designs/i);
              
              if (dfol) stats.dribbble.followers = formatStatValue(dfol[1]);
              if (dshots) stats.dribbble.shots = formatStatValue(dshots[1]);
            }
          }
        } catch (e) {
          console.warn("Dribbble stats scrape failed, fallback to default:", e);
        }
      })(),

      // 6. Spotify: Scrape public playlists count
      (async () => {
        try {
          const spotifyRes = await fetch("https://open.spotify.com/user/8tzab99p5plcegezsx2wrz6vg", { headers, signal: AbortSignal.timeout(3000) });
          if (spotifyRes.ok) {
            const html = await spotifyRes.text();
            const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) || 
                                html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
            if (descMatch) {
              const descText = descMatch[1];
              const playlistsMatch = descText.match(/(\d+)\s*(?:public\s*)?playlists/i);
              if (playlistsMatch) {
                stats.spotify.playlists = playlistsMatch[1];
              }
            }
          }
        } catch (e) {
          console.warn("Spotify stats scrape failed, fallback to default:", e);
        }
      })()
    ];

    await Promise.allSettled(fetchTasks);

    res.json(stats);
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
