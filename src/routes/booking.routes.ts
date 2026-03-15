import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// Customer only
router.post('/', authenticate, authorize(['customer']), BookingController.book);
router.get('/history', authenticate, authorize(['customer']), BookingController.getHistory);

export default router;
