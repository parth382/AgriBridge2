import { BaseSeeder } from './BaseSeeder';
import { AdminTask } from '../models/AdminTask';
import { generateAdminTaskData } from './utils';
import { AppDataSource } from '../config/data-source';

export class AdminTaskSeeder extends BaseSeeder<AdminTask> {
  constructor() {
    super(AdminTask);
  }
  generateData(count: number): Partial<AdminTask>[] {
    return generateAdminTaskData(count).map(task => ({
      ...task,
      assigned_to: parseInt(task.assigned_to)
    }));
  }

  static async seed(count: number = 20): Promise<void> {
    const seeder = new AdminTaskSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new AdminTaskSeeder();
    await seeder.clear();
  }
} 