import { Router } from 'express';
import { EventController } from '../controllers/event.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../validations/validate.js';
import { createEventValidation } from '../validations/event.validation.js';

const router = Router();

router.get('/', EventController.list);
router.get('/:id', EventController.get);

// Organizer only
router.post('/', authenticate, authorize(['organizer']), createEventValidation, validate, EventController.create);
router.put('/:id', authenticate, authorize(['organizer']), createEventValidation, validate, EventController.update);

export default router;
