import { BaseRepository } from './base/BaseRepository';
import { CommunityPost } from '../models/CommunityPost';
import { Between, MoreThan } from 'typeorm';

export class CommunityRepository extends BaseRepository<CommunityPost> {
  constructor() {
    super(CommunityPost);
  }

  async findByUserId(userId: number): Promise<CommunityPost[]> {
    return this.repository.find({ where: { user_id: userId } });
  }

  async findTrendingPosts(): Promise<CommunityPost[]> {
    return this.repository.find({
      where: { isTrending: true },
      order: { created_at: 'DESC' },
      take: 10
    });
  }

  async findPostsByCategory(category: string): Promise<CommunityPost[]> {
    return this.repository.find({ where: { category } });
  }

  async findPostsByDateRange(startDate: Date, endDate: Date): Promise<CommunityPost[]> {
    return this.repository.find({
      where: {
        created_at: Between(startDate, endDate)
      },
      order: { created_at: 'DESC' }
    });
  }

  async findPostsWithComments(): Promise<CommunityPost[]> {
    return this.repository.find({
      relations: ['comments'],
      where: { comments_count: MoreThan(0) }
    });
  }
} 