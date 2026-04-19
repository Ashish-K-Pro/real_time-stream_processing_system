const redis = require("../shared/redis");

exports.process = async (event) => {
  try {
    if (!event || !event.user_id || !event.content_id) return;

    const userId = String(event.user_id);
    const contentId = String(event.content_id);

    // 🏏 Sports lovers
    if (contentId.includes("sports")) {
      await redis.sAdd("segment:sports_lovers", userId);
    }

    // 🌙 Night users
    const hour = new Date(event.timestamp || Date.now()).getHours();

    if (hour >= 20) {
      await redis.sAdd("segment:night_users", userId);
    }

  } catch (err) {
    console.error("Segmentation error:", err.message);
  }
};