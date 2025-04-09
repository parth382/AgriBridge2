import { BaseRepository } from './base/BaseRepository';
import { Notification } from '../models/Notification';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super(Notification);
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    return this.repository.find({ 
      where: { user_id: userId },
      order: { created_at: 'DESC' }
    });
  }

  async findUnreadByUserId(userId: number): Promise<Notification[]> {
    return this.repository.find({ 
      where: { user_id: userId, is_read: false },
      order: { created_at: 'DESC' }
    });
  }

  async findReadByUserId(userId: number): Promise<Notification[]> {
    return this.repository.find({ 
      where: { user_id: userId, is_read: true },
      order: { created_at: 'DESC' }
    });
  }

  async findByType(type: string): Promise<Notification[]> {
    return this.repository.find({ 
      where: { type },
      order: { created_at: 'DESC' }
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Notification[]> {
    return this.repository.find({
      where: {
        created_at: Between(startDate, endDate)
      },
      order: { created_at: 'DESC' }
    });
  }

  async findRecentNotifications(days: number): Promise<Notification[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    return this.repository.find({
      where: {
        created_at: MoreThanOrEqual(date)
      },
      order: { created_at: 'DESC' }
    });
  }

  async findOldNotifications(days: number): Promise<Notification[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    return this.repository.find({
      where: {
        created_at: LessThanOrEqual(date)
      },
      order: { created_at: 'DESC' }
    });
  }

  async markAsRead(id: number): Promise<Notification | null> {
    const notification = await this.repository.findOne({ where: { id } });
    if (!notification) return null;
    
    notification.is_read = true;
    notification.read_at = new Date();
    
    return this.repository.save(notification);
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.repository.update(
      { user_id: userId, is_read: false },
      { is_read: true, read_at: new Date() }
    );
  }

  async getUnreadCount(userId: number): Promise<number> {
    return this.repository.count({ 
      where: { user_id: userId, is_read: false } 
    });
  }
} 