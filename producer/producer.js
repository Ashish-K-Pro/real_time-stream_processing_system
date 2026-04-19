const { producer } = require("../shared/kafka");

const start = async () => {
  await producer.connect();

  setInterval(async () => {
    const event = {
      user_id: "user_" + Math.floor(Math.random() * 1000),
      content_id: "content_" + Math.floor(Math.random() * 50),
      device: ["mobile", "tv", "web"][Math.floor(Math.random() * 3)],
      city:["Gurgaon","Delhi","Chandigarh","Faridabad","Noida","Jaipur","Mumbai","Banglore","Chennai","Kolkata"][Math.floor(Math.random() * 10)],
    
      timestamp: new Date().toISOString(),
    };

    await producer.send({
      topic: "user-events",
      messages: [{ value: JSON.stringify(event) }],
    });

    console.log("Produced:", event);
  }, 300);
};

start();