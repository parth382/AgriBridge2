import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { CommunityController } from '../controllers/CommunityController';

const router = express.Router();
const communityController = new CommunityController();

// Community post routes
router.post('/', authMiddleware, communityController.createPost);
router.get('/:id', authMiddleware, communityController.getPost);
router.put('/:id', authMiddleware, communityController.updatePost);
router.delete('/:id', authMiddleware, communityController.deletePost);
router.get('/user/:userId', authMiddleware, communityController.getPostsByUserId);
router.get('/trending', communityController.getTrendingPosts);
router.get('/category', communityController.getPostsByCategory);
router.get('/date-range', communityController.getPostsByDateRange);
router.get('/with-comments', communityController.getPostsWithComments);
router.post('/:postId/comments', authMiddleware, communityController.addComment);
router.post('/:postId/like/:userId', authMiddleware, communityController.likePost);

export default router; 