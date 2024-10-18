import { Request, Response, NextFunction } from "express";
const Redis = require('ioredis');
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from "@shared/errors/AppError";



export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void>{
    try {
        const redisClient = Redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASS || undefined

        })

        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: 'rateLimit',
            points: 5,
            duration: 1
        })

         const requestIp = request.ip as string | number
         await limiter.consume(requestIp)
         return next();
    } catch (error) {
         throw new AppError('Too Many requests', 429)
    }
};
