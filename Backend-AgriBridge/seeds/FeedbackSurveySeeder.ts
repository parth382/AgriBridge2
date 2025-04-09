import { BaseSeeder } from './BaseSeeder';
import { FeedbackSurvey } from '../models/FeedbackSurvey';
import { generateFeedbackSurveyData } from './utils';
import { AppDataSource } from '../config/data-source';

export class FeedbackSurveySeeder extends BaseSeeder<FeedbackSurvey> {
  constructor() {
    super(FeedbackSurvey);
  }

  generateData(count: number): Partial<FeedbackSurvey>[] {
    // Get all user IDs from the database
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1); // Placeholder until we have actual user IDs
    return generateFeedbackSurveyData(userIds, count);
  }

  static async seed(count: number = 25): Promise<void> {
    const seeder = new FeedbackSurveySeeder();
    await seeder.seed(count);
  }

  static async clear(): Promise<void> {
    const seeder = new FeedbackSurveySeeder();
    await seeder.clear();
  }
} 