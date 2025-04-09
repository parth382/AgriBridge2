import { BaseSeeder } from './BaseSeeder';
import { Product } from '../models/Product';
import { generateProductData } from './utils';
import { AppDataSource } from '../config/data-source';

export class ProductSeeder extends BaseSeeder<Product> {
  constructor() {
    super(Product);
  }

  generateData(count: number): Partial<Product>[] {
    // Get all farm IDs from the database
    const farmIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual farm IDs
    return generateProductData(farmIds, count);
  }

  static async seed(count: number = 20): Promise<void> {
    const seeder = new ProductSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new ProductSeeder();
    await seeder.clear();
  }
} 