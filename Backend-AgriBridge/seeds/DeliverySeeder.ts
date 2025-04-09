import { BaseSeeder } from './BaseSeeder';
import { Delivery } from '../models/Delivery';
import { generateDeliveryData } from './utils';
import { AppDataSource } from '../config/data-source';

export class DeliverySeeder extends BaseSeeder<Delivery> {
  constructor() {
    super(Delivery);
  }

  generateData(count: number): Partial<Delivery>[] {
    // Get all order IDs from the database
    const orderIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual order IDs
    return generateDeliveryData(orderIds, count);
  }

  static async seed(count: number = 15): Promise<void> {
    const seeder = new DeliverySeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new DeliverySeeder();
    await seeder.clear();
  }
} 