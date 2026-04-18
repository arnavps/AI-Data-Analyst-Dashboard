const Redis = require('ioredis');
const NodeCache = require('node-cache');
const logger = require('../utils/logger');

class CacheService {
  constructor() {
    this.useRedis = process.env.USE_REDIS === 'true';
    this.redisClient = null;
    this.memoryCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 }); // default 1h TTL

    if (this.useRedis) {
      try {
        this.redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
        this.redisClient.on('error', (err) => {
          logger.error('Redis connection error, falling back to memory cache', { error: err.message });
          this.useRedis = false; // Fallback immediately on connection error
        });
        this.redisClient.on('connect', () => {
          logger.info('Connected to Redis');
        });
      } catch (err) {
        logger.error('Failed to initialize Redis, falling back to memory cache', { error: err.message });
        this.useRedis = false;
      }
    } else {
      logger.info('Redis disabled, using in-memory cache');
    }
  }

  /**
   * Get value from cache
   * @param {string} key 
   * @returns {Promise<any>}
   */
  async get(key) {
    try {
      if (this.useRedis && this.redisClient) {
        const data = await this.redisClient.get(key);
        return data ? JSON.parse(data) : null;
      } else {
        return this.memoryCache.get(key) || null;
      }
    } catch (error) {
      logger.error('Cache get error', { key, error: error.message });
      return null; // Fail open
    }
  }

  /**
   * Set value in cache
   * @param {string} key 
   * @param {any} value 
   * @param {number} ttlSeconds 
   * @returns {Promise<void>}
   */
  async set(key, value, ttlSeconds = 3600) {
    try {
      if (this.useRedis && this.redisClient) {
        await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
      } else {
        this.memoryCache.set(key, value, ttlSeconds);
      }
    } catch (error) {
      logger.error('Cache set error', { key, error: error.message });
    }
  }

  /**
   * Delete value from cache
   * @param {string} key 
   */
  async del(key) {
    try {
      if (this.useRedis && this.redisClient) {
        await this.redisClient.del(key);
      } else {
        this.memoryCache.del(key);
      }
    } catch (error) {
      logger.error('Cache del error', { key, error: error.message });
    }
  }
}

module.exports = new CacheService();
