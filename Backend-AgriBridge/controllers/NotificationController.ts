import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/NotificationService';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  createNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await this.notificationService.createNotification(req.body);
      res.status(201).json(notification);
    } catch (error) {
      next(error);
    }
  };

  getNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const notification = await this.notificationService.getNotification(id);
      res.status(200).json(notification);
    } catch (error) {
      next(error);
    }
  };

  updateNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const notification = await this.notificationService.updateNotification(id, req.body);
      res.status(200).json(notification);
    } catch (error) {
      next(error);
    }
  };

  deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.notificationService.deleteNotification(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getNotificationsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await this.notificationService.getNotificationsByUserId(userId);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  };

  getUnreadNotificationsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await this.notificationService.getUnreadNotificationsByUserId(userId);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  };

  getReadNotificationsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await this.notificationService.getReadNotificationsByUserId(userId);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  };

  getNotificationsByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;
      const notifications = await this.notificationService.getNotificationsByType(type);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  };

  getNotificationsByDateRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;
      const notifications = await this.notificationService.getNotificationsByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  };

  getRecentNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { days } = req.query;
      const notifications = await this.notificationService.getRecentNotifications(parseInt(days as string));
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  };

  getOldNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { days } = req.query;
      const notifications = await this.notificationService.getOldNotifications(parseInt(days as string));
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  };

  markNotificationAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const notification = await this.notificationService.markNotificationAsRead(id);
      res.status(200).json(notification);
    } catch (error) {
      next(error);
    }
  };

  markAllNotificationsAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      await this.notificationService.markAllNotificationsAsRead(userId);
      res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
      next(error);
    }
  };

  getUnreadNotificationCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const count = await this.notificationService.getUnreadNotificationCount(userId);
      res.status(200).json({ count });
    } catch (error) {
      next(error);
    }
  };
} 