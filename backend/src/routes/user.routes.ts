import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';
import { getAllUsers, getUserById, updateUserRole, deleteUser } from '../controllers/user.controller';

const router = Router();

// Toutes les routes users sont protégées (admin uniquement)
router.use(requireAuth, requireAdmin);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

export default router;
