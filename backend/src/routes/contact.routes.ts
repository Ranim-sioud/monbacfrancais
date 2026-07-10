import { Router } from 'express';
import { contactController } from '../controllers/contact.controller';

const router = Router();

router.post('/', contactController.create);

export default router;
