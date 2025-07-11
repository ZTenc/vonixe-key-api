export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    "127.0.0.1";

  const today = new Date().toISOString().split("T")[0]; // contoh: 2025-07-11
  const seed = ip + today;

  const key = generateKeyFromSeed(seed);
  res.status(200).json({ key });
}

function generateKeyFromSeed(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    const index = Math.abs(Math.sin(hash + i) * 10000) % charset.length;
    result += charset[Math.floor(index)];
  }

  return `vonixe-${result}`;
}
