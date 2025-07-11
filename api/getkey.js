export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  const userAgent = req.headers["user-agent"] || "unknown";

  const today = new Date().toISOString().split("T")[0]; // e.g. 2025-07-11
  const seed = `${ip}-${userAgent}-${today}`;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const base36 = Math.abs(hash).toString(36).padStart(8, "0");
  const key = `vonixe-${base36}`;

  res.status(200).json({ key });
}
