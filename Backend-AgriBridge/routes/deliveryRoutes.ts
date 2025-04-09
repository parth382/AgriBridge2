import { Router } from 'express';
import { DeliveryController } from '../controllers/DeliveryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const deliveryController = new DeliveryController();

// Protected routes (require authentication)
router.use(authMiddleware);

// Basic CRUD operations
router.post('/', deliveryController.createDelivery);
router.get('/:id', deliveryController.getDelivery);
router.put('/:id', deliveryController.updateDelivery);
router.delete('/:id', deliveryController.deleteDelivery);

// Query routes
router.get('/order/:orderId', deliveryController.getDeliveriesByOrderId);
router.get('/delivery-person/:deliveryPersonId', deliveryController.getDeliveriesByDeliveryPerson);
router.get('/status/:status', deliveryController.getDeliveriesByStatus);
router.get('/tracking/:trackingNumber', deliveryController.getDeliveryByTrackingNumber);
router.get('/date-range', deliveryController.getDeliveriesByDateRange);
router.get('/pending', deliveryController.getPendingDeliveries);
router.get('/in-transit', deliveryController.getInTransitDeliveries);
router.get('/completed', deliveryController.getCompletedDeliveries);
router.get('/failed', deliveryController.getFailedDeliveries);
router.get('/area', deliveryController.getDeliveriesByArea);

// Delivery management routes
router.post('/:id/assign', deliveryController.assignDeliveryPerson);
router.post('/:id/start', deliveryController.startDelivery);
router.post('/:id/complete', deliveryController.completeDelivery);
router.post('/:id/fail', deliveryController.failDelivery);
router.post('/:id/location', deliveryController.updateDeliveryLocation);
router.post('/:id/reschedule', deliveryController.rescheduleDelivery);

export default router; 