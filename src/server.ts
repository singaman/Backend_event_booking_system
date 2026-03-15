import app from './app.js';
import { sequelize } from './models/index.js';
import { env } from './config/env.config.js';

// Import workers to start them
import './workers/booking.worker.js';
import './workers/notification.worker.js';

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync models (In production, use migrations)
        await sequelize.sync({ alter: true });
        console.log('Database synced.');

        app.listen(env.port, () => {
            console.log(`Server is running on port ${env.port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

start();
