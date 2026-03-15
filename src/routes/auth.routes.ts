import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validate } from '../validations/validate.js';
import { registerValidation, loginValidation } from '../validations/auth.validation.js';

const router = Router();

router.post('/register', registerValidation, validate, AuthController.register);
router.post('/login', loginValidation, validate, AuthController.login);

export default router;
