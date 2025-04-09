import { AppDataSource } from '../config/data-source';
import { UserSeeder } from './UserSeeder';
import { FarmerProfileSeeder } from './FarmerProfileSeeder';
import { FarmSeeder } from './FarmSeeder';
import { ProductSeeder } from './ProductSeeder';
import { OrderSeeder } from './OrderSeeder';
import { OrderItemSeeder } from './OrderItemSeeder';
import { QRTraceabilitySeeder } from './QRTraceabilitySeeder';
import { ReviewSeeder } from './ReviewSeeder';
import { AuditLogSeeder } from './AuditLogSeeder';
import { LogisticsSeeder } from './LogisticsSeeder';
import { FarmingActivityLogSeeder } from './FarmingActivityLogSeeder';
import { SubscriptionPlanSeeder } from './SubscriptionPlanSeeder';
import { UserSubscriptionSeeder } from './UserSubscriptionSeeder';
import { NotificationSeeder } from './NotificationSeeder';
import { AdminTaskSeeder } from './AdminTaskSeeder';
import { FeedbackSurveySeeder } from './FeedbackSurveySeeder';
import { CommunityPostSeeder } from './CommunityPostSeeder';
import { PostCommentSeeder } from './PostCommentSeeder';
import { PostLikeSeeder } from './PostLikeSeeder';
import { CommentLikeSeeder } from './CommentLikeSeeder';
import { PaymentSeeder } from './PaymentSeeder';
import { DeliverySeeder } from './DeliverySeeder';

async function runSeeders() {
  try {
    console.log('Initializing database connection...');
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    // Run seeders in order of dependencies
    const seeders = [
      // 1. Base entities
      new UserSeeder(),
      new SubscriptionPlanSeeder(),

      // 2. User-related entities
      new UserSubscriptionSeeder(),
      new FarmerProfileSeeder(),
      new FarmSeeder(),

      // 3. Product and order-related entities
      new ProductSeeder(),
      new OrderSeeder(),
      new OrderItemSeeder(),
      new QRTraceabilitySeeder(),
      new ReviewSeeder(),

      // 4. Logistics and delivery
      new LogisticsSeeder(),
      new DeliverySeeder(),
      new PaymentSeeder(),

      // 5. Activity and audit logs
      new AuditLogSeeder(),
      new FarmingActivityLogSeeder(),

      // 6. Community and social features
      new CommunityPostSeeder(),
      new PostCommentSeeder(),
      new PostLikeSeeder(),
      new CommentLikeSeeder(),

      // 7. Administrative and feedback
      new AdminTaskSeeder(),
      new FeedbackSurveySeeder(),
      new NotificationSeeder(),
    ];

    for (const seeder of seeders) {
      console.log(`Running ${seeder.constructor.name}...`);
      await seeder.seed();
      console.log(`${seeder.constructor.name} completed`);
    }

    console.log('All seeders completed successfully');
  } catch (error) {
    console.error('Error running seeders:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Database connection closed');
    }
  }
}

// Run the seeders
runSeeders().catch((error) => {
  console.error('Failed to run seeders:', error);
  process.exit(1);
}); 