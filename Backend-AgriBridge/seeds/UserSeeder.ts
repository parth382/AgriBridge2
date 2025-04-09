import { BaseSeeder } from './BaseSeeder';
import { User } from '../models/User';
import { generateUserData } from './utils';
import bcrypt from 'bcryptjs';

export class UserSeeder extends BaseSeeder<User> {
  constructor() {
    super(User);
  }

  generateData(count: number): Partial<User>[] {
    const users = generateUserData(count);
    
    // Hash passwords
    return users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    }));
  }

  static async seed(count: number = 20): Promise<void> {
    const seeder = new UserSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new UserSeeder();
    await seeder.clear();
  }
} 