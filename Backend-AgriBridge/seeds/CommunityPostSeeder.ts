import { BaseSeeder } from './BaseSeeder';
import { CommunityPost } from '../models/CommunityPost';
import { generateCommunityPostData } from './utils';
import { AppDataSource } from '../config/data-source';

export class CommunityPostSeeder extends BaseSeeder<CommunityPost> {
  constructor() {
    super(CommunityPost);
  }

  generateData(count: number): Partial<CommunityPost>[] {
    // Get all user IDs from the database
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    return generateCommunityPostData(userIds, count);
  }

  static async seed(count: number = 20): Promise<void> {
    const seeder = new CommunityPostSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new CommunityPostSeeder();
    await seeder.clear();
  }
} 