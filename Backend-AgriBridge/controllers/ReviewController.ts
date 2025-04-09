import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/ReviewService';
import { AppError } from '../utils/AppError';

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  };

  getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const review = await this.reviewService.getReview(id);
      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  };

  updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const review = await this.reviewService.updateReview(id, req.body);
      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  };

  deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.reviewService.deleteReview(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getReviewsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const reviews = await this.reviewService.getReviewsByUserId(userId);
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  };

  getReviewsByProductId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = parseInt(req.params.productId);
      const reviews = await this.reviewService.getReviewsByProductId(productId);
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  };

  getReviewsByFarmerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmerId = parseInt(req.params.farmerId);
      const reviews = await this.reviewService.getReviewsByFarmerId(farmerId);
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  };

  getHighRatedReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rating } = req.query;
      const reviews = await this.reviewService.getHighRatedReviews(parseFloat(rating as string));
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  };

  getLowRatedReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rating } = req.query;
      const reviews = await this.reviewService.getLowRatedReviews(parseFloat(rating as string));
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  };

  getReviewsByDateRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;
      const reviews = await this.reviewService.getReviewsByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  };

  getAverageRatingForProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = parseInt(req.params.productId);
      const averageRating = await this.reviewService.getAverageRatingForProduct(productId);
      res.status(200).json({ productId, averageRating });
    } catch (error) {
      next(error);
    }
  };

  getAverageRatingForFarmer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmerId = parseInt(req.params.farmerId);
      const averageRating = await this.reviewService.getAverageRatingForFarmer(farmerId);
      res.status(200).json({ farmerId, averageRating });
    } catch (error) {
      next(error);
    }
  };
} 