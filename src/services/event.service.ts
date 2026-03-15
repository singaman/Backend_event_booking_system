import { Event, User, Booking } from '../models/index.js';
import type { CreateEventRequest, UpdateEventRequest } from '../types/request.types.js';
import { notificationQueue } from '../queues/index.js';

export class EventService {
    static async createEvent(organizerId: string, data: CreateEventRequest) {
        const event = await Event.create({
            ...data,
            organizerId,
            availableSeats: data.totalSeats,
        });
        return event;
    }

    static async updateEvent(id: string, organizerId: string, data: UpdateEventRequest) {
        const event = await Event.findOne({ where: { id, organizerId } });
        if (!event) {
            throw new Error('Event not found or unauthorized');
        }

        // Handle seat changes if totalSeats is updated
        if (data.totalSeats !== undefined) {
            const bookedSeats = event.totalSeats - event.availableSeats;
            if (data.totalSeats < bookedSeats) {
                throw new Error('Total seats cannot be less than already booked seats');
            }
            event.availableSeats = data.totalSeats - bookedSeats;
        }

        await event.update(data);

        // TRIGGER BACKGROUND TASK 2: Notify all booked customers
        const bookings = await Booking.findAll({ 
            where: { eventId: id },
            include: [{ model: User, as: 'customer' }] 
        });
        
        const customerEmails = (bookings as any[]).map(b => b.customer.email);
        
        if (customerEmails.length > 0) {
            await notificationQueue.add('event-update', {
                eventTitle: event.title,
                customerEmails,
            });
        }

        return event;
    }

    static async getAllEvents() {
        return await Event.findAll({
            include: [{ model: User, as: 'organizer', attributes: ['email'] }]
        });
    }

    static async getEventById(id: string) {
        return await Event.findByPk(id, {
            include: [{ model: User, as: 'organizer', attributes: ['email'] }]
        });
    }
}
