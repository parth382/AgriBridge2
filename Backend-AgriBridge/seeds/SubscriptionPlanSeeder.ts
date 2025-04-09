import { BaseSeeder } from './BaseSeeder';
import { SubscriptionPlan } from '../models/SubscriptionPlan';
import { generateSubscriptionPlanData } from './utils';
import { AppDataSource } from '../config/data-source';

export class SubscriptionPlanSeeder extends BaseSeeder<SubscriptionPlan> {
  constructor() {
    super(SubscriptionPlan);
  }
  generateData(count: number): Partial<SubscriptionPlan>[] {
    const data = generateSubscriptionPlanData(count);
    return data.map(plan => ({
      ...plan,
      features: JSON.parse(plan.features) // Convert features string to object
    }));
  }

  static async seed(count: number = 5): Promise<void> {
    const seeder = new SubscriptionPlanSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new SubscriptionPlanSeeder();
    await seeder.clear();
  }
} 