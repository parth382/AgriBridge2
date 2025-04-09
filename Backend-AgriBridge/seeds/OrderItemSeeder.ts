import { BaseSeeder } from './BaseSeeder';
import { OrderItem } from '../models/OrderItem';
import { generateOrderItemData } from './utils';
import { AppDataSource } from '../config/data-source';

export class OrderItemSeeder extends BaseSeeder<OrderItem> {
  constructor() {
    super(OrderItem);
  }

  generateData(count: number): Partial<OrderItem>[] {
    // Get all order IDs and product IDs from the database
    const orderIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual order IDs
    const productIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual product IDs
    return generateOrderItemData(orderIds, productIds, count);
  }

  static async seed(count: number = 30): Promise<void> {
    const seeder = new OrderItemSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new OrderItemSeeder();
    await seeder.clear();
  }
} 