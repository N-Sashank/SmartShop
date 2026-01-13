import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /cart
router.get('/', requireAuth, (req, res) => {
  return res.json({ cart: [] });
});

// POST /cart
router.post('/', requireAuth, (req, res) => {
  return res.json({ message: 'Added to cart' });
});

// DELETE /cart/:id
router.delete('/:id', requireAuth, (req, res) => {
  return res.json({ message: 'Removed from cart' });
});

export default router;
