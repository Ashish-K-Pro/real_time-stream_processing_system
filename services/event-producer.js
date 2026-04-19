// const { Kafka } = require("kafkajs");
// const { v4: uuidv4 } = require("uuid");

// const kafka = new Kafka({ clientId: "producer", brokers: ["localhost:9092"] });
// const producer = kafka.producer();

// const run = async () => {
//   await producer.connect();

//   setInterval(async () => {
//     const event = {
//       event_id: uuidv4(),
//       user_id: "user_" + Math.floor(Math.random() * 10),
//       device: ["mobile", "tv", "web"][Math.floor(Math.random() * 3)],
//       content_id: "content_" + Math.floor(Math.random() * 5),
//       timestamp: new Date().toISOString(),
//     };

//     await producer.send({
//       topic: "user_activity",
//       messages: [{ value: JSON.stringify(event) }],
//     });

//     console.log("Produced:", event);
//   }, 1000);
// };

// run();


const client = require("../shared/redis"); // ✅ FIX
const { v4: uuidv4 } = require("uuid");

const devices = ["mobile", "tv", "tablet"];
const genres = ["action", "drama", "comedy", "sports"];
const locations = ["Delhi", "Mumbai", "Bangalore"];
const platforms = ["android", "ios", "web"];

setInterval(async () => {
  try {
    const event = {
      event_id: uuidv4(),
      user_id: "user_" + Math.floor(Math.random() * 1000),
      session_id: "sess_" + Math.floor(Math.random() * 10000),
      content_id: "content_" + Math.floor(Math.random() * 50),
      content_type: "video",
      genre: genres[Math.floor(Math.random() * genres.length)],
      device: devices[Math.floor(Math.random() * devices.length)],
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      watch_time_sec: Math.floor(Math.random() * 300),
      completion_percent: Math.floor(Math.random() * 100),
      location: locations[Math.floor(Math.random() * locations.length)],
      network_type: Math.random() > 0.5 ? "wifi" : "4g",
      timestamp: new Date().toISOString()
    };

    await client.incr(`content:${event.content_id}`);
    await client.sAdd("active_users", event.user_id);

    console.log("Event:", event);

  } catch (err) {
    console.error("Event error:", err);
  }
}, 10);