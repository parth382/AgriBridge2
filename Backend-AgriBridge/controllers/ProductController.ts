import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/ProductService';
import { AppError } from '../utils/AppError';
import { upload } from '../services/FileService';
import { FileService } from '../services/FileService';

const fileService = new FileService();

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productService.getProduct(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productService.updateProduct(id, req.body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getProductsByFarmId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmId = parseInt(req.params.farmId);
      const products = await this.productService.getProductsByFarmId(farmId);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  getOrganicProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getOrganicProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category } = req.query;
      const products = await this.productService.getProductsByCategory(category as string);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  getProductsByPriceRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { minPrice, maxPrice } = req.query;
      const products = await this.productService.getProductsByPriceRange(
        parseFloat(minPrice as string),
        parseFloat(maxPrice as string)
      );
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  uploadProductImage = async (req: Request & { file?: any }, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const imageUrl = await fileService.uploadFile(req.file);
      
      // Save the image URL to your product in the database
      // ...
  
      return res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ message: 'Error uploading file' });
    }
  };
} 