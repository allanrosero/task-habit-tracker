import { body, validationResult } from 'express-validator';

export const validateTask = [
    body('title').notEmpty().withMessage('Title is required'),
    body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date with format YYYY-MM-DD'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

export const validateHabit = [
    body('name').notEmpty().withMessage('Name is required'),
    body('frequency')
        .notEmpty().withMessage('Frequency is required')
        .isIn(['daily', 'weekly', 'monthly']).withMessage('Invalid frequency'),
    body('startDate').notEmpty().isISO8601().withMessage('Start date must be a valid date with format YYYY-MM-DD'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

export const validateUser = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];
