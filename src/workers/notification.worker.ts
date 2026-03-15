import { Worker } from 'bullmq';
import type { Job } from 'bullmq';
import { redisConnection } from '../queues/index.js';

const notificationWorker = new Worker(
    'event-notification',
    async (job: Job) => {
        const { eventTitle, customerEmails } = job.data;
        console.log(`[BACKGROUND TASK 2] - Triggered Event Update Notification for "${eventTitle}"`);
        console.log(`Notifying ${customerEmails.length} customers who booked tickets.`);
        
        customerEmails.forEach((email: string) => {
            console.log(`Notification sent to: ${email}`);
        });
    },
    { connection: redisConnection }
);

notificationWorker.on('completed', (job) => {
    console.log(`Job ${job.id} (Event Update Notification) has completed.`);
});

notificationWorker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} (Event Update Notification) failed with error: ${err.message}`);
});

export default notificationWorker;
