import sequelize from '../config/database.js';
import { User } from './User.js';
import { Event } from './Event.js';
import { Booking } from './Booking.js';

// Relationships
User.hasMany(Event, { foreignKey: 'organizerId', as: 'organizedEvents' });
Event.belongsTo(User, { foreignKey: 'organizerId', as: 'organizer' });

Event.hasMany(Booking, { foreignKey: 'eventId', as: 'bookings' });
Booking.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

User.hasMany(Booking, { foreignKey: 'customerId', as: 'userBookings' });
Booking.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

export { sequelize, User, Event, Booking };
