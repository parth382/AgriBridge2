import { ProductRepository } from '../repositories/ProductRepository';
import { Product } from '../models/Product';
import { AppError } from '../utils/AppError';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    return this.productRepository.create(data);
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOne(id);
  
    if (!product) {
      throw new AppError('Product not found', 404);
    }
  
    await this.productRepository.update(id, data);
  
    const updatedProduct = await this.productRepository.findOne(id);
  
    if (!updatedProduct) {
      throw new AppError('Failed to fetch updated product', 500);
    }
  
    return updatedProduct;
  }
  

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    await this.productRepository.delete(id);
  }

  async getProductsByFarmId(farmId: number): Promise<Product[]> {
    return this.productRepository.findByFarmId(farmId);
  }

  async getOrganicProducts(): Promise<Product[]> {
    return this.productRepository.findOrganicProducts();
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.productRepository.findProductsByCategory(category);
  }

  async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    return this.productRepository.findProductsByPriceRange(minPrice, maxPrice);
  }
} 