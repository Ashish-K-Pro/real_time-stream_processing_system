const cron = require("node-cron");

cron.schedule("0 * * * *", () => {
  console.log("Running batch job...");
  // compute DAU, reports
});