import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../prisma.js';

const router = Router();

// POST /checkout/create-order
router.post('/create-order', requireAuth, async (req, res) => {
  try {
    // 1. Fetch user cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: true
      }
    });

    if (cartItems.length === 0)
      return res.status(400).json({ error: 'Cart is empty' });

    // 2. Calculate total
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    // 3. Create the order
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalAmount,
        paymentStatus: 'PENDING', // mock
      }
    });

    // 4. Create order items
    const orderItemsData = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));

    await prisma.orderItem.createMany({ data: orderItemsData });

    // 5. Empty the cart
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id }
    });

    // 6. Return success
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
