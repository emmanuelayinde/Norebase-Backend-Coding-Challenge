# Like Button API System

A scalable and robust API system for handling article likes, built with Node.js, TypeScript, MongoDB, and Redis. This system is designed to handle high concurrent loads while preventing abuse and maintaining data consistency.

## 🎯 Problem Statement

Build a "Like" button feature that can:

- Display the total number of likes for an article
- Allow users to like articles (increment count by one)
- Scale to millions of concurrent users
- Handle both high-volume read and write operations
- Prevent abuse and exploitation
- Maintain data consistency under heavy load

## 🎨 Solution Architecture

Our solution implements:

1. **Caching Layer**: Redis for fast read operations and reducing database load
2. **Database Layer**: MongoDB for persistent storage with atomic operations
3. **Rate Limiting**: Prevent abuse through IP-based request limiting
4. **Anti-Abuse Measures**: Track user likes to prevent double-liking
5. **MVC Architecture**: Clean separation of concerns for maintainability
6. **Typescript**: Type safety and better developer experience

### Key Features:

- Distributed caching with Redis
- Atomic database operations
- Rate limiting
- User authentication
- Concurrent request handling
- Horizontal scalability support

## 🏗️ Project Structure

```
src/
├── config/
│   └── index.ts           # Env variables
│   └── db.ts              # MongoDB connection config
├── middlewares/
│   └── rateLimiter.ts     # Rate limiter middleware
├── models/
│   └── article.ts         # MongoDB article schema
├── controllers/
│   └── likeController.ts  # Request handling logic
├── services/
│   └── likeService.ts     # Business logic
├── utils/
│   └── cache.ts           # Redis cache implementation
├── routes/
│   └── likeRoutes.ts      # API routes
└── main.ts                # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas cluster)
- Redis (local or cloud service)
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/like-system
REDIS_HOST=localhost
REDIS_PORT=6379
# If using Upstash Redis:
UPSTASH_REDIS_REST_URL=your_rest_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/emmanuelayinde/Norebase-Backend-Coding-Challenge.git
cd Norebase-Backend-Coding-Challenge
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Start the server in development mode:

```bash
npm run dev
```

5. Start the server:

```bash
npm start
```

## 📡 API Endpoints

### Get Article Likes

```http
GET /api/v1/articles/:articleId/likes
```

Response:

```json
{
  "likes": 42
}
```

### Add Like to Article

```http
POST /api/v1/articles/:articleId/likes
```

Headers:

```
user-id: string  // Required for authentication
```

Response:

```json
{
  "likes": 43
}
```

## 🛠️ Technical Implementation Details

### Scalability Solutions

1. **Read Operations**

   - Redis caching reduces database load
   - Cache entries expire after 5 minutes to maintain data freshness
   - Distributed caching possible through Redis cluster

2. **Write Operations**

   - Atomic MongoDB operations prevent race conditions
   - Optimistic locking for concurrent updates
   - Database sharding support for horizontal scaling

3. **Anti-Abuse Measures**
   - Rate limiting: 100 requests per 15 minutes per IP
   - User tracking prevents multiple likes
   - Authentication requirement

### Performance Optimizations

1. **Database**

   - Indexed queries for faster lookups
   - Minimal document structure
   - Atomic updates to prevent race conditions

2. **Caching**
   - Frequently accessed data cached in Redis
   - Automatic cache invalidation
   - Cache-aside pattern implementation

## 🔧 Configuration Options

### MongoDB

- Default connection: `mongodb://localhost:27017/like-system`
- Configure through `MONGODB_URI` environment variable
- Supports MongoDB Atlas

### Redis

- Default connection: `localhost:6379`
- Configure through `REDIS_HOST` and `REDIS_PORT`
- Supports Upstash, Redis Labs, or other providers

### Rate Limiting

Located in `LikeController.ts`:

```typescript
{
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100                    // requests per window
}
```

<!--
## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run with coverage:

```bash
npm run test:coverage
``` -->

## 📈 Scaling Considerations

### To 1M Concurrent Users

1. **Infrastructure**

   - Deploy behind load balancer
   - Multiple API server instances
   - MongoDB cluster with sharding
   - Redis cluster for distributed caching

2. **Monitoring**
   - Implement health checks
   - Add metrics monitoring (Prometheus/Grafana)
   - Set up error tracking
   - Monitor cache hit rates

### Future Improvements

1. **Features**

   - Unlike functionality
   - Batch operations
   - Real-time updates via WebSocket
   - Analytics dashboard

2. **Technical**
   - Circuit breakers for cache failures
   - Event sourcing for likes
   - GraphQL API support
   - Kubernetes deployment configs

## 🤝 Connect with me

- [Email](mailto:emmanuelisholaayinde@gmail.com)
- [GitHub](https://github.com/emmanuelayinde)
- [X (Twitter)](https://x.com/_emmanuelayinde)
- [Linkedin](https://www.linkedin.com/in/emmanuelayinde/)

Stay tuned and happy coding 👨‍💻🚀
