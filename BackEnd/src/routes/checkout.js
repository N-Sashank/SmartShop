import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../prisma.js';

const router = Router();

// POST /checkout/create-order
router.post('/create-order', requireAuth, async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: true
      }
    });

    if (cartItems.length === 0)
      return res.status(400).json({ error: 'Cart is empty' });

    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalAmount,
        paymentStatus: 'PENDING',
      }
    });

    const orderItemsData = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));

    await prisma.orderItem.createMany({ data: orderItemsData });

    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id }
    });

    return res.json({
      message: 'Order created successfully (mock payment)',
      orderId: order.id,
      totalAmount
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Checkout failed' });
  }
});

export default router;
