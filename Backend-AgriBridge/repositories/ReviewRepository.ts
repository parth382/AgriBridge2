import { BaseRepository } from './base/BaseRepository';
import { Review } from '../../models/Review';
import { Between, MoreThan, LessThan } from 'typeorm';

export class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super(Review);
  }

  async findByUserId(userId: number): Promise<Review[]> {
    return this.repository.find({ where: { user_id: userId } });
  }

  async findByProductId(productId: number): Promise<Review[]> {
    return this.repository.find({ where: { product_id: productId } });
  }

  async findByFarmerId(farmerId: number): Promise<Review[]> {
    return this.repository.find({ where: { farmer_id: farmerId } });
  }

  async findHighRatedReviews(rating: number): Promise<Review[]> {
    return this.repository.find({ 
      where: { rating: MoreThan(rating) },
      order: { rating: 'DESC' }
    });
  }

  async findLowRatedReviews(rating: number): Promise<Review[]> {
    return this.repository.find({ 
      where: { rating: LessThan(rating) },
      order: { rating: 'ASC' }
    });
  }

  async findReviewsByDateRange(startDate: Date, endDate: Date): Promise<Review[]> {
    return this.repository.find({
      where: {
        created_at: Between(startDate, endDate)
      },
      order: { created_at: 'DESC' }
    });
  }

  async getAverageRatingForProduct(productId: number): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.product_id = :productId', { productId })
      .getRawOne();
    
    return result?.average || 0;
  }

  async getAverageRatingForFarmer(farmerId: number): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.farmer_id = :farmerId', { farmerId })
      .getRawOne();
    
    return result?.average || 0;
  }
} 