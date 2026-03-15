import { body } from 'express-validator';

export const createEventValidation = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .trim()
        .isLength({ max: 100 })
        .withMessage('Title must be less than 100 characters'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .trim(),
    body('date')
        .isISO8601()
        .withMessage('Please provide a valid ISO8601 date')
        .custom((value) => {
            if (new Date(value) <= new Date()) {
                throw new Error('Event date must be in the future');
            }
            return true;
        }),
    body('totalSeats')
        .isInt({ min: 1 })
        .withMessage('Total seats must be a positive integer'),
];
