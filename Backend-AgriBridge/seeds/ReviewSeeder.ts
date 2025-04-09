import { BaseSeeder } from './BaseSeeder';
import { Review } from '../models/Review';
import { generateReviewData } from './utils';
import { AppDataSource } from '../config/data-source';

export class ReviewSeeder extends BaseSeeder<Review> {
  constructor() {
    super(Review);
  }

  generateData(count: number): Partial<Review>[] {
    // Get all user IDs and product IDs from the database
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    const productIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual product IDs
    return generateReviewData(userIds, productIds, count);
  }

  static async seed(count: number = 25): Promise<void> {
    const seeder = new ReviewSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new ReviewSeeder();
    await seeder.clear();
  }
} 