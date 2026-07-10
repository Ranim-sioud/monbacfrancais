import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';
import { runAgenceScraper, runActualiteScraper } from '../controllers/scraper.controller';

const router = Router();

// Toutes les routes scraper sont protégées (admin uniquement)
router.use(requireAuth, requireAdmin);

router.post('/agences', runAgenceScraper);
router.post('/actualites', runActualiteScraper);

export default router;
