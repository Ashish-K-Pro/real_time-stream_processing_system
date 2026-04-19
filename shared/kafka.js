const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "measurements-system",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "analytics-group" });

module.exports = { kafka, producer, consumer };