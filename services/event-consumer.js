// const { Kafka } = require("kafkajs");
// const redis = require("redis");

// const kafka = new Kafka({ clientId: "consumer", brokers: ["localhost:9092"] });
// const consumer = kafka.consumer({ groupId: "analytics-group" });

// const redisClient = redis.createClient();
// redisClient.connect();

// const run = async () => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: "user_activity", fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ message }) => {
//       const event = JSON.parse(message.value.toString());

//       const key = `content:${event.content_id}`;
//       await redisClient.incr(key);

//       console.log("Consumed:", event);
//     },
//   });
// };

// run();

const express = require("express");
const EventEmitter = require("events");
const redis = require("redis");

const app = express();

/**
 * 1. Shared Event Bus (in-process only)
 */
const emitter = new EventEmitter();

/**
 * 2. Redis setup
 */
const client = redis.createClient();

client.on("error", (err) => console.error("Redis error:", err));

(async () => {
  await client.connect();
  console.log("Connected to Redis ✅");
})();

/**
 * 3. PRODUCER (event generator)
 */
setInterval(() => {
  const event = {
    user_id: "user_" + Math.floor(Math.random() * 100),
    content_id: "content_" + Math.floor(Math.random() * 30),
  };

  console.log("Produced:", event);

  emitter.emit("event", event);
}, 500);

/**
 * 4. CONSUMER (event processor)
 */
emitter.on("event", async (event) => {
  try {
    await client.incr(`content:${event.content_id}`);
    await client.sAdd("active_users", event.user_id);

    console.log("Consumed:", event);
  } catch (err) {
    console.error("Consumer error:", err);
  }
});

/**
 * 5. API: Top content
 */
app.get("/top-content", async (req, res) => {
  const keys = await client.keys("content:*");

  let data = [];

  for (let key of keys) {
    const count = await client.get(key);
    data.push({
      content: key.replace("content:", ""),
      views: Number(count),
    });
  }

  res.json(data.sort((a, b) => b.views - a.views));
});

/**
 * 6. API: Active users
 */
app.get("/active-users", async (req, res) => {
  const count = await client.sCard("active_users");
  res.json({ active_users: count });
});

/**
 * 7. Start server
 */
app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});