import { BaseSeeder } from './BaseSeeder';
import { Notification } from '../models/Notification';
import { generateNotificationData } from './utils';
import { AppDataSource } from '../config/data-source';

export class NotificationSeeder extends BaseSeeder<Notification> {
  constructor() {
    super(Notification);
  }

  generateData(count: number): Partial<Notification>[] {
    // Get all user IDs from the database
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    return generateNotificationData(userIds, count);
  }

  static async seed(count: number = 30): Promise<void> {
    const seeder = new NotificationSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new NotificationSeeder();
    await seeder.clear();
  }
} 