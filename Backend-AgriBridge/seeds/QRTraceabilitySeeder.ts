import { BaseSeeder } from './BaseSeeder';
import { QRTraceability } from '../models/QRTraceability';
import { generateQRTraceabilityData } from './utils';
import { AppDataSource } from '../config/data-source';

export class QRTraceabilitySeeder extends BaseSeeder<QRTraceability> {
  constructor() {
    super(QRTraceability);
  }

  generateData(count: number): Partial<QRTraceability>[] {
    // Get all product IDs from the database
    const productIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual product IDs
    return generateQRTraceabilityData(productIds, count);
  }

  static async seed(count: number = 20): Promise<void> {
    const seeder = new QRTraceabilitySeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new QRTraceabilitySeeder();
    await seeder.clear();
  }
} 