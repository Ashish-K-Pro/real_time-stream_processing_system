const express = require("express");
const router = express.Router();
const redis = require("../../shared/redis");

router.get("/", async (req, res) => {
  try {
    const keys = await redis.keys("content:*");

const data = [];

for (const key of keys) {
  const val = await redis.hGetAll(key);

  data.push({
    content: key.replace("content:", ""),
    views: Number(val.views || 0),
    city: val.city || "unknown"
  });
}

    data.sort((a, b) => b.views - a.views);

    res.json(data);

  } catch (err) {
    console.error("CONTENT API ERROR:", err);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

module.exports = router;