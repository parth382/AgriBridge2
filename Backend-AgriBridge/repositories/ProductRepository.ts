import { BaseRepository } from './base/BaseRepository';
import { Product } from '../models/Product';
import { Between } from 'typeorm';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }

  async findByFarmId(farmId: number): Promise<Product[]> {
    return this.repository.find({ where: { farm_id: farmId } });
  }

  async findOrganicProducts(): Promise<Product[]> {
    return this.repository.find({ where: { is_organic: true } });
  }

  async findProductsByCategory(category: string): Promise<Product[]> {
    return this.repository.find({ where: { category } });
  }

  async findProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    return this.repository.find({
      where: {
        price: Between(minPrice, maxPrice)
      }
    });
  }
} 