const express = require('express');
const analytics = require('./event-consumer');

const app = express();

app.get('/top-content', (req, res) => {
  const sorted = Object.entries(analytics.contentViews)
    .map(([content, views]) => ({ content, views }))
    .sort((a, b) => b.views - a.views);

  res.json(sorted);
});

app.get('/active-users', (req, res) => {
  res.json({
    active_users: analytics.activeUsers.size
  });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});