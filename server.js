const express = require("express");
const EventEmitter = require("events");
const redis = require("redis");

const app = express();


const emitter = new EventEmitter();


const client = redis.createClient();

client.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
  await client.connect();
  console.log("Connected to Redis ✅");
})();


setInterval(() => {
  const event = {
    user_id: "user_" + Math.floor(Math.random() * 100),
    content_id: "content_" + Math.floor(Math.random() * 30),
    timestamp: new Date().toISOString(),
  };

  console.log("Produced:", event);

  emitter.emit("event", event);
}, 500);


let processedCount = 0;

emitter.on("event", async (event) => {
  try {
    processedCount++;

    await client.incr(`content:${event.content_id}`);
    await client.sAdd("active_users", event.user_id);

    console.log("Processed:", processedCount);
  } catch (err) {
    console.error("Consumer error:", err);
  }
});


app.get("/top-content", async (req, res) => {
  try {
    const keys = await client.keys("content:*");

    const data = await Promise.all(
      keys.map(async (key) => {
        const value = await client.get(key);
        return {
          content: key.replace("content:", ""),
          views: Number(value),
        };
      })
    );

    data.sort((a, b) => b.views - a.views);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top content" });
  }
});


app.get("/active-users", async (req, res) => {
  try {
    const count = await client.sCard("active_users");
    res.json({ active_users: count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active users" });
  }
});


app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    processed_events: processedCount,
  });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});