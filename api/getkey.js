export default function handler(req, res) {
  try {
    const unique = getUserIdentifier(req);
    const today = new Date().toISOString().split("T")[0];
    const seed = `${unique}-${today}`;
    const key = generateKey(seed);

    res.status(200).json({ key });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function getUserIdentifier(req) {
  // Ambil dari IP atau cookie fallback
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "";
  const ua = req.headers["user-agent"] || "";
  const cookie = req.headers["cookie"] || "";
  return `${ip}|${ua}|${cookie}`;
}

function generateKey(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    const rand = Math.abs(Math.sin(hash + i) * 10000) % charset.length;
    result += charset[Math.floor(rand)];
  }

  return `vonixe-${result}`;
}
