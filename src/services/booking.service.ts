import { Booking, Event, User, sequelize } from '../models/index.js';
import type { BookTicketRequest } from '../types/request.types.js';
import { bookingQueue } from '../queues/index.js';

export class BookingService {
    static async bookTickets(customerId: string, data: BookTicketRequest) {
        const result = await sequelize.transaction(async (t) => {
            const event = await Event.findByPk(data.eventId, { transaction: t, lock: true });
            if (!event) {
                throw new Error('Event not found');
            }

            if (event.availableSeats < data.seatsBooked) {
                throw new Error('Not enough seats available');
            }

            const booking = await Booking.create({
                eventId: data.eventId,
                customerId,
                seatsBooked: data.seatsBooked,
            }, { transaction: t });

            await event.update({
                availableSeats: event.availableSeats - data.seatsBooked,
            }, { transaction: t });

            const customer = await User.findByPk(customerId, { transaction: t });

            // TRIGGER BACKGROUND TASK 1: Booking Confirmation
            await bookingQueue.add('send-confirmation', {
                email: customer?.email,
                eventTitle: event.title,
                seats: data.seatsBooked,
            });

            return booking;
        });

        return result;
    }

    static async getCustomerBookings(customerId: string) {
        return await Booking.findAll({
            where: { customerId },
            include: [{ model: Event, as: 'event' }]
        });
    }
}
