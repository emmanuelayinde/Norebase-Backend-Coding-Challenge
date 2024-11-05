import Redis from "ioredis";

import config from "@config/index";

export class Cache {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: config.REDIS_HOST,
      port: parseInt(config.REDIS_PORT),
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });
  }

  public async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  public async set(
    key: string,
    value: string,
    expireSeconds?: number
  ): Promise<void> {
    if (expireSeconds) {
      await this.redis.setex(key, expireSeconds, value);
    } else {
      await this.redis.set(key, value);
    }
  }
}
