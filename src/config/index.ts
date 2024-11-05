import dotenv from "dotenv";

dotenv.config({});

export default {
  PORT: process.env.PORT || "5000",
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/like-system",
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
};
