import { Queue } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { env } from '../config/env.config.js';

export const redisConnection: ConnectionOptions = {
    host: env.redis.host,
    port: env.redis.port,
};

export const bookingQueue = new Queue('booking-confirmation', {
    connection: redisConnection,
});

export const notificationQueue = new Queue('event-notification', {
    connection: redisConnection,
});
