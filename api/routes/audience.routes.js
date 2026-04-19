const express = require("express");
const router = express.Router();
const client = require("../../shared/redis");

// GET /audience
router.get("/", async (req, res) => {
  try {
    const activeUsers = await client.sCard("active_users");

    // ✅ FIX: replace scanIterator with keys()
    const keys = await client.keys("content:*");

    let totalViews = 0;

    for (const key of keys) {
      const val = await client.get(key);
      totalViews += Number(val || 0);
    }

    res.json({
      active_users: activeUsers,
      total_views: totalViews,
      avg_views_per_user: activeUsers
        ? Number((totalViews / activeUsers).toFixed(2))
        : 0,
    });

  } catch (err) {
    console.error("AUDIENCE API ERROR:", err);
    res.status(500).json({ error: "Failed to fetch audience data" });
  }
});

module.exports = router;