import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { OrderController } from '../controllers/OrderController';

const router = express.Router();
const orderController = new OrderController();

// Order routes
router.post('/', authMiddleware, orderController.createOrder);
router.get('/:id', authMiddleware, orderController.getOrder);
router.put('/:id', authMiddleware, orderController.updateOrder);
router.delete('/:id', authMiddleware, orderController.deleteOrder);
router.get('/user/:userId', authMiddleware, orderController.getOrdersByUserId);
router.get('/farm/:farmId', authMiddleware, orderController.getOrdersByFarmId);
router.get('/pending', authMiddleware, orderController.getPendingOrders);
router.get('/completed', authMiddleware, orderController.getCompletedOrders);
router.get('/date-range', authMiddleware, orderController.getOrdersByDateRange);

export default router; 