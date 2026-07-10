import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';
import {
  getAllAgences,
  getAgenceById,
  createAgence,
  updateAgence,
  verifyAgence,
  deleteAgence,
  bulkDeleteAgences,
} from '../controllers/agence.controller';

const router = Router();

// Routes admin bulk
router.post('/bulk-delete', requireAuth, requireAdmin, bulkDeleteAgences);

// Routes publiques (lecture)
router.get('/', getAllAgences);
router.get('/:id', getAgenceById);

// Routes admin (écriture) — upload.single('logo') pour le fichier logo
router.post('/', requireAuth, requireAdmin, upload.single('logo'), createAgence);
router.put('/:id', requireAuth, requireAdmin, upload.single('logo'), updateAgence);
router.patch('/:id/verify', requireAuth, requireAdmin, verifyAgence);
router.delete('/:id', requireAuth, requireAdmin, deleteAgence);

export default router;
