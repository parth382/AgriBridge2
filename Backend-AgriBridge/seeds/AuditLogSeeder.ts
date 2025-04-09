import { BaseSeeder } from './BaseSeeder';
import { AuditLog } from '../models/AuditLog';
import { generateAuditLogData } from './utils';
import { AppDataSource } from '../config/data-source';

export class AuditLogSeeder extends BaseSeeder<AuditLog> {
  constructor() {
    super(AuditLog);
  }

  generateData(count: number): Partial<AuditLog>[] {
    return generateAuditLogData(count);
  }

  static async seed(count: number = 50): Promise<void> {
    const seeder = new AuditLogSeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new AuditLogSeeder();
    await seeder.clear();
  }
} 