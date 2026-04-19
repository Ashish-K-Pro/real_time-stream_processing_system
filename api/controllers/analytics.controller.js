// const redis = require("../../shared/redis");

// exports.getAudienceOverview = async (req, res) => {
//   try {
//     const activeUsers = await redis.sCard("active_users");

//     const contentKeys = await redis.keys("content:*");

//     let totalViews = 0;

//     for (const key of contentKeys) {
//       const val = await redis.get(key);
//       totalViews += Number(val || 0);
//     }

//     const avgViewsPerUser = activeUsers
//       ? (totalViews / activeUsers).toFixed(2)
//       : 0;

//     res.json({
//       active_users: activeUsers,
//       total_views: totalViews,
//       avg_views_per_user: Number(avgViewsPerUser),
//     });

//   } catch (err) {
//     console.error("AUDIENCE OVERVIEW ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch audience overview" });
//   }
// };