export default function handler(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const date = new Date();
  const day = date.toISOString().split('T')[0];
  const seed = `${userId}-${day}`;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const base36 = Math.abs(hash).toString(36).padStart(8, '0');
  const key = `vonixe-${base36}`;

  res.status(200).json({ key });
}
