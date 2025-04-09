import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const notificationController = new NotificationController();

// Protected routes - require authentication
router.use(authMiddleware);

// Create a new notification
router.post('/', notificationController.createNotification);

// Get a specific notification by ID
router.get('/:id', notificationController.getNotification);

// Update a notification
router.put('/:id', notificationController.updateNotification);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

// Get notifications by user ID
router.get('/user/:userId', notificationController.getNotificationsByUserId);

// Get unread notifications by user ID
router.get('/user/:userId/unread', notificationController.getUnreadNotificationsByUserId);

// Get read notifications by user ID
router.get('/user/:userId/read', notificationController.getReadNotificationsByUserId);

// Get notifications by type
router.get('/type/:type', notificationController.getNotificationsByType);

// Get notifications by date range
router.get('/date-range', notificationController.getNotificationsByDateRange);

// Get recent notifications
router.get('/recent', notificationController.getRecentNotifications);

// Get old notifications
router.get('/old', notificationController.getOldNotifications);

// Mark a notification as read
router.put('/:id/read', notificationController.markNotificationAsRead);

// Mark all notifications as read for a user
router.put('/user/:userId/read-all', notificationController.markAllNotificationsAsRead);

// Get unread notification count for a user
router.get('/user/:userId/unread-count', notificationController.getUnreadNotificationCount);

export default router; 