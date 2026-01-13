import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /orders
router.get('/', requireAuth, (req, res) => {
  return res.json({ orders: [] });
});

export default router;
