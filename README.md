# Real-Time Streaming Analytics System 

A real-time event streaming and analytics pipeline that simulates large-scale user engagement tracking (Netflix/Hotstar-style architecture).  
It processes user events via Kafka, aggregates metrics in Node.js consumer services, and stores analytics in Redis for fast API access.

---

##  System Overview

```text
Producer → [local events ] || real time - TV watching, mobile app usage, OTT streaming
Kafka → in project || Kafka or Apache Kinesis
Consumer → local consumer processing events, aggregate by content || consumer or Spark Streaming
Redis → in project || Amazon Redshift for aggregation views & Historical data
Express APIs → in project rest apis || can be microservices at production
Analytics Response → data shown via api routes || Dashboards & data visualization tools

##  Features

###  Real-Time Event Processing
- Simulates user activity events (views, device, city, timestamp)
- Processes events in real-time using Kafka consumer

---

###  Analytics Engine
- Content view tracking (trending content)
- Active user tracking
- Device segmentation (mobile / TV / web)
- Hourly traffic analytics
- User-level engagement stats

---

### High Performance Storage (Redis)
- `INCR` → counters (views, hourly metrics)
- `HASH` → structured content analytics
- `SET` → unique users and segmentation




 ### 1.  Audience Aalytics
http://localhost:3000/audience

### 2. top-content (Covers Content Metadata)
http://localhost:3000/content


### 3. segments (Covers Media Planning Portion) 
http://localhost:3000/segments

### 4. Can be derived: (Marketing Optimization i.e. market optimization, sports & game metadata to target customers)

### 5. An aggregation of content to with deep insights for customers, and a recommendation system can be derived



##  How to Run the Project

### 1. Start Kafka (Docker) & redis
```bash
docker-compose up -d

redis-server

'''
docker stop kafka zookeeper
docker rm kafka zookeeper


docker-compose down -v

docker-compose up -d

docker ps

'''

### 2. start server

node api/server.js

### 3. start consumer 
node consumers/realtime-consumer.js

### .4 start producer 

node producer/producer.js


