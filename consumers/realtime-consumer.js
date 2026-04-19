const { consumer } = require("../shared/kafka");
const redis = require("../shared/redis");

const start = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: "user-events",
      fromBeginning: false,
    });

    console.log("Consumer started 🚀");

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          if (!message.value) return;

          const event = JSON.parse(message.value.toString());

          const userId = String(event.user_id);
          const contentId = String(event.content_id);
          const device = String(event.device || "unknown");

          // ✅ SINGLE SOURCE OF TRUTH (HASH)
          await redis.hIncrBy(`content:${contentId}`, "views", 1);
          await redis.hSet(`content:${contentId}`, "city", event.city);

          await redis.sAdd("active_users", userId);
          await redis.sAdd(`device:${device}`, userId);

          const hour = new Date(event.timestamp || Date.now()).getHours();
          await redis.incr(`views:hour:${hour}`);
          await redis.incr(`user:${userId}:views`);

          console.log("Processed:", event);

        } catch (err) {
          console.error("Processing error:", err);
        }
      },
    });

  } catch (err) {
    console.error("Consumer startup error:", err);
  }
};

start();