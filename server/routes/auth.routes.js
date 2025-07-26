import express from 'express';
import { register, login, me } from '../controllers/auth.controller.js';
import { validateUser } from '../middleware/validation.middleware.js';


const router = express.Router();

router.post('/login', login);
router.post('/register', validateUser, register);
router.get('/me', me);

export default router;
