app.get("/api/getkey", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"] || "unknown";

  const date = new Date().toISOString().split("T")[0];
  const seed = `${ip}-${userAgent}-${date}`;
  const rand = seededRandom(seed);

  let key = "";
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(rand() * CHARSET.length);
    key += CHARSET[index];
  }

  res.json({ key: `vonixe-${key}` });
});
