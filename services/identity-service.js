const redis = require("redis");
const client = redis.createClient();

client.connect();

// Map device to user
async function mapDevice(deviceId, userId) {
  await client.set(deviceId, userId);
}

// Get mapped user
async function getUser(deviceId) {
  return await client.get(deviceId);
}

module.exports = { mapDevice, getUser };