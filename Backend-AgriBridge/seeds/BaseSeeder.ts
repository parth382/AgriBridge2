import { AppDataSource } from '../config/data-source';
import { Repository, ObjectLiteral } from 'typeorm';

export abstract class BaseSeeder<T extends ObjectLiteral> {
  protected repository: Repository<T>;
  protected entity: new () => T;

  constructor(entity: new () => T) {
    this.entity = entity;
    this.repository = AppDataSource.getRepository(entity);
  }

  abstract generateData(count: number): Partial<T>[];

  async seed(count: number = 10): Promise<void> {
    try {
      // Check if data already exists
      const existingCount = await this.repository.count();
      if (existingCount > 0) {
        console.log(`⚠️ ${this.entity.name} data already exists (${existingCount} records). Skipping seeding.`);
        return;
      }

      // Generate data
      const data = this.generateData(count);
      
      // Insert data
      await this.repository.insert(data as any);
      
      console.log(`✅ Seeded ${count} ${this.entity.name} records`);
    } catch (error) {
      console.error(`❌ Error seeding ${this.entity.name}:`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.repository.clear();
      console.log(`✅ Cleared all ${this.entity.name} records`);
    } catch (error) {
      console.error(`❌ Error clearing ${this.entity.name}:`, error);
      throw error;
    }
  }
} 