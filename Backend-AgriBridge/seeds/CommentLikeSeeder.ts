import { BaseSeeder } from './BaseSeeder';
import { CommentLike } from '../models/CommentLike';
import { generateCommentLikeData } from './utils';
import { AppDataSource } from '../config/data-source';

export class CommentLikeSeeder extends BaseSeeder<CommentLike> {
  constructor() {
    super(CommentLike);
  }

  generateData(count: number): Partial<CommentLike>[] {
    // Get all comment IDs and user IDs from the database
    const commentIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual comment IDs
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    return generateCommentLikeData(commentIds, userIds, count);
  }

  static async seed(count: number = 40): Promise<void> {
    const seeder = new CommentLikeSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new CommentLikeSeeder();
    await seeder.clear();
  }
} 