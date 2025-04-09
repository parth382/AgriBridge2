import { BaseSeeder } from './BaseSeeder';
import { FarmingActivityLog } from '../models/FarmingActivityLog';
import { generateFarmingActivityLogData } from './utils';
import { AppDataSource } from '../config/data-source';

export class FarmingActivityLogSeeder extends BaseSeeder<FarmingActivityLog> {
  constructor() {
    super(FarmingActivityLog);
  }

  generateData(count: number): Partial<FarmingActivityLog>[] {
    // Get all farm IDs from the database
    const farmIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual farm IDs
    return generateFarmingActivityLogData(farmIds, count);
  }

  static async seed(count: number = 30): Promise<void> {
    const seeder = new FarmingActivityLogSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new FarmingActivityLogSeeder();
    await seeder.clear();
  }
} 