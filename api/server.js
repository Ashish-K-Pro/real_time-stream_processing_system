const express = require("express");
const redis = require("../shared/redis");

const contentRoutes = require("./routes/content.routes");
const audienceRoutes = require("./routes/audience.routes");
const segmentationRoutes = require("./routes/segmentation.routes");

const app = express();

app.use("/content", contentRoutes);
app.use("/audience", audienceRoutes);
app.use("/segments", segmentationRoutes);

app.get("/", (req, res) => {
  res.send("API Running ");
});

// Health
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});