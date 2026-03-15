import type { Request, Response } from 'express';
import { BookingService } from '../services/booking.service.js';
import type { ApiResponse } from '../types/response.types.js';

export class BookingController {
    static async book(req: any, res: Response) {
        try {
            const booking = await BookingService.bookTickets(req.user.id, req.body);
            const response: ApiResponse = {
                success: true,
                message: 'Booking successful',
                data: booking
            };
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async getHistory(req: any, res: Response) {
        try {
            const bookings = await BookingService.getCustomerBookings(req.user.id);
            res.status(200).json({ success: true, message: 'Booking history retrieved', data: bookings });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
