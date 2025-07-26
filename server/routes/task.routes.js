import express from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask

} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateTask, validateUpdateTask } from '../middleware/validation.middleware.js';



const router = express.Router();

router.use(authenticate);

router.get('/', getTasks);
router.post('/', validateTask, createTask);
router.put('/:id', validateUpdateTask, updateTask)
router.delete('/:id', deleteTask);

export default router;
