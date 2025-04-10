import { ReviewRepository } from '../repositories/ReviewRepository';
import { Review } from '../models/Review';
import { AppError } from '../utils/AppError';
import { FarmerProfile } from '../models/FarmerProfile';

export class ReviewService {
  private reviewRepository: ReviewRepository;

  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  async createReview(data: Partial<Review> & { farmer_id?: number }): Promise<Review> {
    // Validate that either product_id or farmer_id is provided
    if (!data.product_id && !data.farmer_id) {
      throw new AppError('Review must be associated with either a product or a farmer', 400);
    }

    // Check if user has already reviewed this product or farmer
    const existingReview = await this.reviewRepository.findBy({
      user_id: data.user_id,
      ...(data.product_id ? { product_id: data.product_id } : {}),
      ...(data.farmer_id ? { farmer_id: data.farmer_id } : {})
    });

    if (existingReview.length > 0) {
      throw new AppError('User has already reviewed this item', 400);
    }

    return this.reviewRepository.create(data);
  }

  async getReview(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne(id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    return review;
  }

  async updateReview(id: number, data: Partial<Review>): Promise<Review> {
    const review = await this.reviewRepository.findOne(id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    return this.reviewRepository.update(id, data) as Promise<Review>;
  }

  async deleteReview(id: number): Promise<void> {
    const review = await this.reviewRepository.findOne(id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    await this.reviewRepository.delete(id);
  }

  async getReviewsByUserId(userId: number): Promise<Review[]> {
    return this.reviewRepository.findByUserId(userId);
  }

  async getReviewsByProductId(productId: number): Promise<Review[]> {
    return this.reviewRepository.findByProductId(productId);
  }

  async getReviewsByFarmerId(farmerId: number): Promise<Review[]> {
    return this.reviewRepository.findByFarmerId(farmerId);
  }

  async getHighRatedReviews(rating: number): Promise<Review[]> {
    return this.reviewRepository.findHighRatedReviews(rating);
  }

  async getLowRatedReviews(rating: number): Promise<Review[]> {
    return this.reviewRepository.findLowRatedReviews(rating);
  }

  async getReviewsByDateRange(startDate: Date, endDate: Date): Promise<Review[]> {
    return this.reviewRepository.findReviewsByDateRange(startDate, endDate);
  }

  async getAverageRatingForProduct(productId: number): Promise<number> {
    return this.reviewRepository.getAverageRatingForProduct(productId);
  }

  async getAverageRatingForFarmer(farmerId: number): Promise<number> {
    return this.reviewRepository.getAverageRatingForFarmer(farmerId);
  }
}