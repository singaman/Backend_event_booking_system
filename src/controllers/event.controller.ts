import type { Request, Response } from 'express';
import { EventService } from '../services/event.service.js';
import type { ApiResponse } from '../types/response.types.js';

export class EventController {
    static async create(req: any, res: Response) {
        try {
            const event = await EventService.createEvent(req.user.id, req.body);
            const response: ApiResponse = {
                success: true,
                message: 'Event created successfully',
                data: event
            };
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async update(req: any, res: Response) {
        try {
            const event = await EventService.updateEvent(req.params.id, req.user.id, req.body);
            const response: ApiResponse = {
                success: true,
                message: 'Event updated successfully',
                data: event
            };
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const events = await EventService.getAllEvents();
            res.status(200).json({ success: true, message: 'Events retrieved', data: events });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async get(req: Request, res: Response) {
        try {
            const event = await EventService.getEventById(req.params.id as string);
            if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
            res.status(200).json({ success: true, message: 'Event found', data: event });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
