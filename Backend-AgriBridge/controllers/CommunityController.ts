import { Request, Response, NextFunction } from 'express';
import { CommunityService } from '../services/CommunityService';
import { AppError } from '../utils/AppError';

export class CommunityController {
  private communityService: CommunityService;

  constructor() {
    this.communityService = new CommunityService();
  }

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.communityService.createPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  };

  getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const post = await this.communityService.getPost(id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const post = await this.communityService.updatePost(id, req.body);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.communityService.deletePost(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getPostsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const posts = await this.communityService.getPostsByUserId(userId);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  getTrendingPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.communityService.getTrendingPosts();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  getPostsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category } = req.query;
      const posts = await this.communityService.getPostsByCategory(category as string);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  getPostsByDateRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;
      const posts = await this.communityService.getPostsByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  getPostsWithComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.communityService.getPostsWithComments();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = parseInt(req.params.postId);
      const post = await this.communityService.addComment(postId, req.body);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  };

  likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = parseInt(req.params.postId);
      const userId = parseInt(req.params.userId);
      const post = await this.communityService.likePost(postId, userId);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };
} 