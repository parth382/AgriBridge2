import { BaseSeeder } from './BaseSeeder';
import { Payment } from '../models/Payment';
import { generatePaymentData } from './utils';
import { AppDataSource } from '../config/data-source';

export class PaymentSeeder extends BaseSeeder<Payment> {
  constructor() {
    super(Payment);
  }

  generateData(count: number): Partial<Payment>[] {
    // Get all order IDs from the database
    const orderIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual order IDs
    return generatePaymentData(orderIds, count);
  }

  static async seed(count: number = 15): Promise<void> {
    const seeder = new PaymentSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new PaymentSeeder();
    await seeder.clear();
  }
} 