const redis = require("../../shared/redis");

exports.getSegmentUsers = async (req, res) => {
  const users = await redis.sMembers(`segment:${req.params.segment}`);
  res.json({ segment: req.params.segment, users });
};