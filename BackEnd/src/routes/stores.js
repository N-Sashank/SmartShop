
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /stores
router.post('/', requireAuth, (req, res) => {
  return res.json({ message: 'Store created' });
});

// GET /stores
router.get('/', (req, res) => {
  return res.json({ stores: [] });
});

export default router;
