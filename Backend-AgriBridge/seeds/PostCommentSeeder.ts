import { BaseSeeder } from './BaseSeeder';
import { PostComment } from '../models/PostComment';
import { generatePostCommentData } from './utils';
import { AppDataSource } from '../config/data-source';

export class PostCommentSeeder extends BaseSeeder<PostComment> {
  constructor() {
    super(PostComment);
  }

  generateData(count: number): Partial<PostComment>[] {
    // Get all post IDs and user IDs from the database
    const postIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual post IDs
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    return generatePostCommentData(postIds, userIds, count);
  }

  static async seed(count: number = 40): Promise<void> {
    const seeder = new PostCommentSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new PostCommentSeeder();
    await seeder.clear();
  }
} 