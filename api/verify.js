// /api/verify.js
import crypto from "crypto";

export default function handler(req, res) {
  const { key } = req.query;

  const now = new Date();

  const userAgent = req.headers['user-agent'] || "unknown";

  const seed = `${userAgent}-${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
  const hash = crypto.createHash('sha256').update(seed).digest('hex').slice(0, 8);
  const expectedKey = `vonixe-${hash}`;

  if (key === expectedKey) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
}
