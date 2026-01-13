import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /checkout/create-order
router.post('/create-order', requireAuth, (req, res) => {
  return res.json({ orderId: '123', message: 'Order initialized' });
});

export default router;
