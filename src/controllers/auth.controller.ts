import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import type { ApiResponse } from '../types/response.types.js';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const authData = await AuthService.register(req.body);
            const response: ApiResponse = {
                success: true,
                message: 'User registered successfully',
                data: authData
            };
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const authData = await AuthService.login(req.body);
            const response: ApiResponse = {
                success: true,
                message: 'Login successful',
                data: authData
            };
            res.status(200).json(response);
        } catch (error: any) {
            res.status(401).json({ success: false, message: error.message });
        }
    }
}
