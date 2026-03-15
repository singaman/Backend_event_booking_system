import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import type { ApiResponse } from '../types/response.types.js';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response: ApiResponse = {
            success: false,
            message: 'Validation failed',
            data: errors.array()
        };
        return res.status(400).json(response);
    }
    next();
};
