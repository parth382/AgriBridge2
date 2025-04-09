import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const paymentController = new PaymentController();

// Protected routes - require authentication
router.use(authMiddleware);

// Create a new payment
router.post('/', paymentController.createPayment);

// Get a specific payment by ID
router.get('/:id', paymentController.getPayment);

// Update a payment
router.put('/:id', paymentController.updatePayment);

// Delete a payment
router.delete('/:id', paymentController.deletePayment);

// Get payments by user ID
router.get('/user/:userId', paymentController.getPaymentsByUserId);

// Get payments by order ID
router.get('/order/:orderId', paymentController.getPaymentsByOrderId);

// Get payments by status
router.get('/status/:status', paymentController.getPaymentsByStatus);

// Get payments by date range
router.get('/date-range', paymentController.getPaymentsByDateRange);

// Get recent payments
router.get('/recent', paymentController.getRecentPayments);

// Get old payments
router.get('/old', paymentController.getOldPayments);

// Get successful payments
router.get('/successful', paymentController.getSuccessfulPayments);

// Get failed payments
router.get('/failed', paymentController.getFailedPayments);

// Get pending payments
router.get('/pending', paymentController.getPendingPayments);

// Get total amount by user ID
router.get('/user/:userId/total', paymentController.getTotalAmountByUserId);

// Get total amount by order ID
router.get('/order/:orderId/total', paymentController.getTotalAmountByOrderId);

// Stripe integration routes
router.post('/:paymentId/create-intent', paymentController.createPaymentIntent);
router.post('/:paymentId/confirm', paymentController.confirmPayment);
router.post('/:paymentId/cancel', paymentController.cancelPayment);
router.post('/:paymentId/refund', paymentController.refundPayment);

// Stripe webhook - this route should not be protected by auth middleware
// as Stripe needs to access it directly
router.post('/webhook', paymentController.handleWebhook);

export default router; 