import express from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const userController = new UserController();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.put('/change-password', authMiddleware, userController.changePassword);
router.get('/orders', authMiddleware, userController.getUserOrders);
router.get('/favorites', authMiddleware, userController.getFavorites);
router.post('/favorites/:productId', authMiddleware, userController.addToFavorites);
router.delete('/favorites/:productId', authMiddleware, userController.removeFromFavorites);

export default router; 