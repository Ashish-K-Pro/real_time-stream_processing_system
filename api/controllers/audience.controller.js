const redis = require("../../shared/redis");

exports.getActiveUsers = async (req, res) => {
  const count = await redis.sCard("active_users");
  res.json({ active_users: count });
};