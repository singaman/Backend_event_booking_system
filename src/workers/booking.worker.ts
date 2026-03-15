import { Worker } from 'bullmq';
import type { Job } from 'bullmq';
import { redisConnection } from '../queues/index.js';

const bookingWorker = new Worker(
    'booking-confirmation',
    async (job: Job) => {
        const { email, eventTitle, seats } = job.data;
        console.log(`[BACKGROUND TASK 1] - Sending booking confirmation email to: ${email}`);
        console.log(`Confirmation: You have successfully booked ${seats} seat(s) for "${eventTitle}".`);
        // In a real app, integrate with SendGrid/Nodemailer here.
    },
    { connection: redisConnection }
);

bookingWorker.on('completed', (job) => {
    console.log(`Job ${job.id} (Booking Confirmation) has completed.`);
});

bookingWorker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} (Booking Confirmation) failed with error: ${err.message}`);
});

export default bookingWorker;
