import { BaseSeeder } from './BaseSeeder';
import { FarmerProfile } from '../models/FarmerProfile';
import { User, UserType } from '../models/User';
import { AppDataSource } from '../config/data-source';
import { faker } from '@faker-js/faker';

export class FarmerProfileSeeder extends BaseSeeder<FarmerProfile> {
  constructor() {
    super(FarmerProfile);
  }

  generateData(count: number): Partial<FarmerProfile>[] {
    // Generate farmer profiles with random user IDs
    return Array.from({ length: count }, () => ({
      user_id: faker.number.int({ min: 1, max: 100 }), // This will be replaced with actual user IDs
      bio: faker.lorem.paragraph(),
      farming_experience_years: faker.number.int({ min: 0, max: 50 }),
      organic_certification_status: faker.datatype.boolean({ probability: 0.7 }),
      certification_body: faker.company.name(),
      certification_date: faker.date.past(),
      certification_expiry_date: faker.date.future(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent()
    }));
  }

  static async seed(count: number = 10): Promise<void> {
    const seeder = new FarmerProfileSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new FarmerProfileSeeder();
    await seeder.clear();
  }
} 