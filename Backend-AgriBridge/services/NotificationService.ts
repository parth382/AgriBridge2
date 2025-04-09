import { NotificationRepository } from '../repositories/NotificationRepository';
import { Notification } from '../models/Notification';
import { AppError } from '../utils/AppError';

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
  }

  async createNotification(data: Partial<Notification>): Promise<Notification> {
    // Validate required fields
    if (!data.user_id) {
      throw new AppError('User ID is required for creating a notification', 400);
    }
    
    if (!data.type) {
      throw new AppError('Notification type is required', 400);
    }
    
    if (!data.message) {
      throw new AppError('Notification message is required', 400);
    }

    // Set default values
    const notificationData = {
      ...data,
      is_read: false,
      created_at: new Date()
    };

    return this.notificationRepository.create(notificationData);
  }

  async getNotification(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne(id);
    if (!notification) {
      throw new AppError('Notification not found', 404);
    }
    return notification;
  }

  async updateNotification(id: number, data: Partial<Notification>): Promise<Notification> {
    const notification = await this.notificationRepository.findOne(id);
    if (!notification) {
      throw new AppError('Notification not found', 404);
    }
    return notification;
  }

  async deleteNotification(id: number): Promise<void> {
    const notification = await this.notificationRepository.findOne(id);
    if (!notification) {
      throw new AppError('Notification not found', 404);
    }
    await this.notificationRepository.delete(id);
  }

  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    return this.notificationRepository.findByUserId(userId);
  }

  async getUnreadNotificationsByUserId(userId: number): Promise<Notification[]> {
    return this.notificationRepository.findUnreadByUserId(userId);
  }

  async getReadNotificationsByUserId(userId: number): Promise<Notification[]> {
    return this.notificationRepository.findReadByUserId(userId);
  }

  async getNotificationsByType(type: string): Promise<Notification[]> {
    return this.notificationRepository.findByType(type);
  }

  async getNotificationsByDateRange(startDate: Date, endDate: Date): Promise<Notification[]> {
    return this.notificationRepository.findByDateRange(startDate, endDate);
  }

  async getRecentNotifications(days: number): Promise<Notification[]> {
    return this.notificationRepository.findRecentNotifications(days);
  }

  async getOldNotifications(days: number): Promise<Notification[]> {
    return this.notificationRepository.findOldNotifications(days);
  }

  async markNotificationAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.markAsRead(id);
    if (!notification) {
      throw new AppError('Notification not found', 404);
    }
    return notification;
  }

  async markAllNotificationsAsRead(userId: number): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
  }

  async getUnreadNotificationCount(userId: number): Promise<number> {
    return this.notificationRepository.getUnreadCount(userId);
  }

  // Helper method to create system notifications
  async createSystemNotification(userId: number, message: string, type: string = 'system', data?: any): Promise<Notification> {
    return this.createNotification({
      user_id: userId,
      message,
      type,
      data: data ? JSON.stringify(data) : undefined
    });
  }

  // Helper method to create order notifications
  async createOrderNotification(userId: number, orderId: number, message: string, data?: any): Promise<Notification> {
    return this.createNotification({
      user_id: userId,
      message,
      type: 'order',
      data: data ? JSON.stringify({ orderId, ...data }) : JSON.stringify({ orderId })
    });
  }

  // Helper method to create product notifications
  async createProductNotification(userId: number, productId: number, message: string, data?: any): Promise<Notification> {
    return this.createNotification({
      user_id: userId,
      message,
      type: 'product',
      data: data ? JSON.stringify({ productId, ...data }) : JSON.stringify({ productId })
    });
  }
} 