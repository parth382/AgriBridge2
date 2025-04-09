import { BaseSeeder } from './BaseSeeder';
import { Logistics } from '../models/Logistics';
import { generateLogisticsData } from './utils';
import { AppDataSource } from '../config/data-source';

export class LogisticsSeeder extends BaseSeeder<Logistics> {
  constructor() {
    super(Logistics);
  }

  generateData(count: number): Partial<Logistics>[] {
    // Get all order IDs from the database
    const orderIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual order IDs
    return generateLogisticsData(orderIds, count);
  }

  static async seed(count: number = 15): Promise<void> {
    const seeder = new LogisticsSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new LogisticsSeeder();
    await seeder.clear();
  }
} 