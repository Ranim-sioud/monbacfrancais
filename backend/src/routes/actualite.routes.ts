import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';
import {
  getPublishedActualites,
  getActualiteById,
  getAllActualitesAdmin,
  createActualite,
  updateActualite,
  publishActualite,
  unpublishActualite,
  deleteActualite,
  bulkDeleteActualites,
} from '../controllers/actualite.controller';

const router = Router();

// Routes admin (déclarée avant /:id pour éviter que Express interprète "admin" comme un id)
router.get('/admin/all', requireAuth, requireAdmin, getAllActualitesAdmin);
router.post('/bulk-delete', requireAuth, requireAdmin, bulkDeleteActualites);

// Routes publiques (lecture, articles publiés uniquement)
router.get('/', getPublishedActualites);
router.get('/:id', getActualiteById);
router.post('/', requireAuth, requireAdmin, createActualite);
router.put('/:id', requireAuth, requireAdmin, updateActualite);
router.patch('/:id/publish', requireAuth, requireAdmin, publishActualite);
router.patch('/:id/unpublish', requireAuth, requireAdmin, unpublishActualite);
router.delete('/:id', requireAuth, requireAdmin, deleteActualite);

export default router;
