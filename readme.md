# Real-Time Event Processing System (Node.js + Redis)

This project is a simple real-time analytics system built using **Node.js, EventEmitter, and Redis**.  
It simulates how user interactions (like video views) are processed in real time and aggregated for analytics APIs.

---

## What this project does

This system:

- Generates users activity events continuously  
- Processes events in real time using an internal event bus  
- Stores aggregated metrics in Redis  
- Exposes APIs for analytics  

---

## Architecture
Event Generator (setInterval)
↓
EventEmitter (in-process event bus)
↓
Consumer (event processor)
↓
Redis (real-time storage)
↓
Express APIs (analytics layer)



---

## ⚙️ Tech Stack

- Node.js (Express)
- EventEmitter (in-memory event system)
- Redis (real-time data storage)
- REST APIs

---

## Event Flow

###  Event Generation

Every 500ms, a fake event is generated:

```json
{
  "user_id": "user_12",
  "content_id": "content_5",
  "timestamp": "2026-04-19T10:00:00Z"
}

---
The event is emitted using EventEmitter:

```emitter.emit("event", event);

---


### API Endpoints

1). /top-content

[
  {
    "content": "content_5",
    "views": 120
  },
  {
    "content": "content_2",
    "views": 98
  }
]

2. Active Users

{
  "active_users": 42
}


3. Health Check

{
  "status": "ok",
  "processed_events": 15234
}



⚡ Key Features
Real-time event simulation
In-memory event bus using EventEmitter
Redis-based aggregation
Live analytics APIs
Simple streaming pipeline


1. Install dependencies

npm install

2. Start Redis server

redis-server

3. Run application

node server.js

