const redis = require("../shared/redis");

exports.process = async (event) => {
  await redis.sAdd(`user_devices:${event.user_id}`, event.device);
};