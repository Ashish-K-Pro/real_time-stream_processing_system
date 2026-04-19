const redis = require("../shared/redis");

exports.process = async (event) => {
  await redis.incr(`content:${event.content_id}`);
  redis.sAdd("active_users", String(event.user_id))
};