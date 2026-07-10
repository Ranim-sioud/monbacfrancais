import { Router } from 'express';
import { inscriptionController } from '../controllers/inscription.controller';
import { validateInscription } from '../middlewares/inscription.middleware';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', validateInscription, inscriptionController.create);
router.get('/', requireAuth, requireAdmin, inscriptionController.getAll);
router.get('/:id', requireAuth, requireAdmin, inscriptionController.getById);
router.patch('/:id/status', requireAuth, requireAdmin, inscriptionController.updateStatus);

export default router;
