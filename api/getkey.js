export default function handler(req, res) {
  try {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "127.0.0.1";
    const ua = req.headers["user-agent"] || "unknown";
    const today = new Date().toISOString().split("T")[0];

    const seed = `${ip}-${ua}-${today}`;
    const key = generateKey(seed);

    res.status(200).json({ key });
  } catch (error) {
    console.error("🔥 INTERNAL ERROR:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateKey(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  let result = "";
  for (let i = 0; i < 8; i++) {
    const rand = Math.abs(Math.sin(hash + i) * 10000) % CHARSET.length;
    result += CHARSET[Math.floor(rand)];
  }

  return `vonixe-${result}`;
}
