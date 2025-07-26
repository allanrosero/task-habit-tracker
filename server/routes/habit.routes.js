import express from 'express';
import {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit
} from '../controllers/habit.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateHabit } from '../middleware/validation.middleware.js';



const router = express.Router();

router.use(authenticate);

router.get('/', getHabits);
router.post('/', validateHabit, createHabit);
router.put('/:id', validateHabit, updateHabit);
router.delete('/:id', deleteHabit);

export default router;
