app.get("/api/getkey", (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "0.0.0.0";
  const ua = req.headers["user-agent"] || "unknown";

  const date = new Date();
  const day = date.toISOString().split("T")[0];
  const seed = ip + ua + day;

  try {
    const key = generateKey(seed);
    return res.json({ key });
  } catch (e) {
    console.error("Error generating key:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
