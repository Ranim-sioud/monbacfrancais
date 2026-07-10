import { Router } from 'express';
import { register, login, adminLogin, refresh, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', adminLogin);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
