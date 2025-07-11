export default function handler(req, res) {
  const { key } = req.query;

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  const userAgent = req.headers["user-agent"] || "unknown";
  const today = new Date().toISOString().split("T")[0];
  const seed = `${ip}-${userAgent}-${today}`;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const expectedKey = `vonixe-${Math.abs(hash).toString(36).padStart(8, "0")}`;

  if (key === expectedKey) {
    res.status(200).json({ valid: true });
  } else {
    res.status(200).json({ valid: false });
  }
}
