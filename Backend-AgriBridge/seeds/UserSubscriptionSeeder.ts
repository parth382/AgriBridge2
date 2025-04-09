import { BaseSeeder } from './BaseSeeder';
import { UserSubscription } from '../models/UserSubscription';
import { generateUserSubscriptionData } from './utils';
import { AppDataSource } from '../config/data-source';

export class UserSubscriptionSeeder extends BaseSeeder<UserSubscription> {
  constructor() {
    super(UserSubscription);
  }

  generateData(count: number): Partial<UserSubscription>[] {
    // Get all user IDs and plan IDs from the database
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    const planIds = Array.from({ length: 5 }, (_, i) => i + 1); // Placeholder until we have actual plan IDs
    return generateUserSubscriptionData(userIds, planIds, count);
  }

  static async seed(count: number = 15): Promise<void> {
    const seeder = new UserSubscriptionSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new UserSubscriptionSeeder();
    await seeder.clear();
  }
} 