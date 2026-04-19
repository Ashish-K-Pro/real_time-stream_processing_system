const queue = [];

function publish(event) {
  queue.push(event);
}

function consume(handler) {
  setInterval(() => {
    if (queue.length > 0) {
      const event = queue.shift();
      handler(event);
    }
  }, 500);
}

module.exports = { publish, consume };