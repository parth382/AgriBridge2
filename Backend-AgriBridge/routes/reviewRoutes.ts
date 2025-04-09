import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const reviewController = new ReviewController();

// Protected routes - require authentication
router.use(authMiddleware);

// Create a new review
router.post('/', reviewController.createReview);

// Get a specific review by ID
router.get('/:id', reviewController.getReview);

// Update a review
router.put('/:id', reviewController.updateReview);

// Delete a review
router.delete('/:id', reviewController.deleteReview);

// Get reviews by user ID
router.get('/user/:userId', reviewController.getReviewsByUserId);

// Get reviews by product ID
router.get('/product/:productId', reviewController.getReviewsByProductId);

// Get reviews by farmer ID
router.get('/farmer/:farmerId', reviewController.getReviewsByFarmerId);

// Get high rated reviews
router.get('/high-rated', reviewController.getHighRatedReviews);

// Get low rated reviews
router.get('/low-rated', reviewController.getLowRatedReviews);

// Get reviews by date range
router.get('/date-range', reviewController.getReviewsByDateRange);

// Get average rating for a product
router.get('/product/:productId/average', reviewController.getAverageRatingForProduct);

// Get average rating for a farmer
router.get('/farmer/:farmerId/average', reviewController.getAverageRatingForFarmer);

export default router; 