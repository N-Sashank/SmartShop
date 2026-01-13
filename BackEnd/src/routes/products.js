import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /stores/:storeId/products
router.post('/stores/:storeId/products', requireAuth, (req, res) => {
  return res.json({ message: 'Product added' });
});

// GET /stores/:storeId/products
router.get('/stores/:storeId/products', (req, res) => {
  return res.json({ products: [] });
});

// GET /products/:productId
router.get('/:productId', (req, res) => {
  return res.json({ product: null });
});

export default router;
