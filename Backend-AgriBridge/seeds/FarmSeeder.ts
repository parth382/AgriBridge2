import { BaseSeeder } from './BaseSeeder';
import { Farm } from '../models/Farm';
import { generateFarmData } from './utils';

export class FarmSeeder extends BaseSeeder<Farm> {
  constructor() {
    super(Farm);
  }

  generateData(count: number): Partial<Farm>[] {
    // Generate farm data with random farmer IDs
    const farmerIds = Array.from({ length: 10 }, (_, i) => i + 1);
    return generateFarmData(farmerIds, count);
  }

  static async seed(count: number = 15): Promise<void> {
    const seeder = new FarmSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new FarmSeeder();
    await seeder.clear();
  }
} 