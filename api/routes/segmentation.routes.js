const express = require("express");
const router = express.Router();

const redis = require("../../shared/redis");

// ✅ GET ALL SEGMENTS
router.get("/", async (req, res) => {
  try {
    const tv = await redis.sCard("device:tv");
    const mobile = await redis.sCard("device:mobile");
    const web = await redis.sCard("device:web");

    const keys = await redis.keys("user:*:views");

    const heavyUsers = [];

    for (const key of keys) {
      const views = await redis.get(key);

      if (Number(views || 0) > 10) {
        heavyUsers.push(key.split(":")[1]);
      }
    }

    res.json({
      device_segments: {
        tv_users: tv,
        mobile_users: mobile,
        web_users: web,
      },
      heavy_users_count: heavyUsers.length,
      heavy_users_sample: heavyUsers.slice(0, 5),
    });

  } catch (err) {
    console.error("SEGMENTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch segments" });
  }
});

module.exports = router;