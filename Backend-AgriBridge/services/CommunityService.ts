import { CommunityRepository } from '../repositories/CommunityRepository';
import { CommunityPost } from '../models/CommunityPost';
import { AppError } from '../utils/AppError';

export class CommunityService {
  private communityRepository: CommunityRepository;

  constructor() {
    this.communityRepository = new CommunityRepository();
  }

  async createPost(data: Partial<CommunityPost>): Promise<CommunityPost> {
    return this.communityRepository.create(data);
  }

  async getPost(id: number): Promise<CommunityPost> {
    const post = await this.communityRepository.findOne(id);
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    return post;
  }

  async updatePost(id: number, data: Partial<CommunityPost>): Promise<CommunityPost> {
    const post = await this.communityRepository.findOne(id);
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    return post;
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.communityRepository.findOne(id);
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    await this.communityRepository.delete(id);
  }

  async getPostsByUserId(userId: number): Promise<CommunityPost[]> {
    return this.communityRepository.findByUserId(userId);
  }

  async getTrendingPosts(): Promise<CommunityPost[]> {
    return this.communityRepository.findTrendingPosts();
  }

  async getPostsByCategory(category: string): Promise<CommunityPost[]> {
    return this.communityRepository.findPostsByCategory(category);
  }

  async getPostsByDateRange(startDate: Date, endDate: Date): Promise<CommunityPost[]> {
    return this.communityRepository.findPostsByDateRange(startDate, endDate);
  }

  async getPostsWithComments(): Promise<CommunityPost[]> {
    return this.communityRepository.findPostsWithComments();
  }

  async addComment(postId: number, commentData: any): Promise<CommunityPost> {
    const post = await this.getPost(postId);
    // Logic to add comment would go here
    // This is a placeholder for the actual implementation
    return post;
  }

  async likePost(postId: number, userId: number): Promise<CommunityPost> {
    const post = await this.getPost(postId);
    // Logic to like post would go here
    // This is a placeholder for the actual implementation
    return post;
  }
} 