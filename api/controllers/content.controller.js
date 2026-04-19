const redis = require("../../shared/redis");

exports.getTopContent = async (req, res) => {
  const keys = await redis.keys("content:*");

  const data = await Promise.all(
    keys.map(async (key) => {
      const val = await redis.get(key);
      return {
        content: key.replace("content:", ""),
        views: Number(val),
      };
    })
  );

  data.sort((a, b) => b.views - a.views);

  res.json(data);
};