import { BaseSeeder } from './BaseSeeder';
import { PostLike } from '../models/PostLike';
import { generatePostLikeData } from './utils';
import { AppDataSource } from '../config/data-source';

export class PostLikeSeeder extends BaseSeeder<PostLike> {
  constructor() {
    super(PostLike);
  }

  generateData(count: number): Partial<PostLike>[] {
    // Get all post IDs and user IDs from the database
    const postIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual post IDs
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    return generatePostLikeData(postIds, userIds, count);
  }

  static async seed(count: number = 50): Promise<void> {
    const seeder = new PostLikeSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new PostLikeSeeder();
    await seeder.clear();
  }
} 