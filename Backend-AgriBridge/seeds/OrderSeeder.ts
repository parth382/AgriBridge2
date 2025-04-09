import { BaseSeeder } from './BaseSeeder';
import { Order } from '../models/Order';
import { generateOrderData } from './utils';
import { AppDataSource } from '../config/data-source';

export class OrderSeeder extends BaseSeeder<Order> {
  constructor() {
    super(Order);
  }

  generateData(count: number): Partial<Order>[] {
    // Get all user IDs from the database
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    return generateOrderData(userIds, count);
  }

  static async seed(count: number = 15): Promise<void> {
    const seeder = new OrderSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new OrderSeeder();
    await seeder.clear();
  }
} 