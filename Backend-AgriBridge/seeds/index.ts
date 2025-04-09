import { AppDataSource } from '../config/data-source';
import { UserSeeder } from './UserSeeder';
import { FarmerProfileSeeder } from './FarmerProfileSeeder';
import { FarmSeeder } from './FarmSeeder';
import { ProductSeeder } from './ProductSeeder';
import { OrderSeeder } from './OrderSeeder';
import { CommunityPostSeeder } from './CommunityPostSeeder';
import { SubscriptionPlanSeeder } from './SubscriptionPlanSeeder';
import { UserSubscriptionSeeder } from './UserSubscriptionSeeder';
import { ReviewSeeder } from './ReviewSeeder';
import { NotificationSeeder } from './NotificationSeeder';
import { AdminTaskSeeder } from './AdminTaskSeeder';
import { FeedbackSurveySeeder } from './FeedbackSurveySeeder';
import { PostCommentSeeder } from './PostCommentSeeder';
import { PostLikeSeeder } from './PostLikeSeeder';
import { CommentLikeSeeder } from './CommentLikeSeeder';
import { PaymentSeeder } from './PaymentSeeder';
import { DeliverySeeder } from './DeliverySeeder';
import { QRTraceabilitySeeder } from './QRTraceabilitySeeder';
import { AuditLogSeeder } from './AuditLogSeeder';
import { FarmingActivityLogSeeder } from './FarmingActivityLogSeeder';
import { LogisticsSeeder } from './LogisticsSeeder';
import { OrderItemSeeder } from './OrderItemSeeder';

// Main function to run all seeders
async function runSeeders() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    // Run seeders in order of dependencies
    console.log('🌱 Starting seeding process...');

    // 1. Users (base entity)
    await UserSeeder.seed();
    
    // 2. Subscription Plans (independent)
    await SubscriptionPlanSeeder.seed();
    
    // 3. User Subscriptions (depends on Users and Subscription Plans)
    await UserSubscriptionSeeder.seed();
    
    // 4. Farmer Profiles (depends on Users)
    await FarmerProfileSeeder.seed();
    
    // 5. Farms (depends on Farmer Profiles)
    await FarmSeeder.seed();
    
    // 6. Products (depends on Farms)
    await ProductSeeder.seed();
    
    // 7. Orders (depends on Users)
    await OrderSeeder.seed();
    
    // 8. Order Items (depends on Orders and Products)
    await OrderItemSeeder.seed();
    
    // 9. QR Traceability (depends on Products)
    await QRTraceabilitySeeder.seed();
    
    // 10. Reviews (depends on Users and Products)
    await ReviewSeeder.seed();
    
    // 11. Audit Logs (independent)
    await AuditLogSeeder.seed();
    
    // 12. Logistics (depends on Orders)
    await LogisticsSeeder.seed();
    
    // 13. Farming Activity Logs (depends on Farms)
    await FarmingActivityLogSeeder.seed();
    
    // 14. Admin Tasks (independent)
    await AdminTaskSeeder.seed();
    
    // 15. Feedback Surveys (depends on Users)
    await FeedbackSurveySeeder.seed();
    
    // 16. Community Posts (depends on Users)
    await CommunityPostSeeder.seed();
    
    // 17. Post Comments (depends on Community Posts and Users)
    await PostCommentSeeder.seed();
    
    // 18. Post Likes (depends on Community Posts and Users)
    await PostLikeSeeder.seed();
    
    // 19. Comment Likes (depends on Post Comments and Users)
    await CommentLikeSeeder.seed();
    
    // 20. Payments (depends on Orders)
    await PaymentSeeder.seed();
    
    // 21. Deliveries (depends on Orders)
    await DeliverySeeder.seed();
    
    // 22. Notifications (depends on Users)
    await NotificationSeeder.seed();

    console.log('✅ Seeding completed successfully');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    // Close the database connection
    await AppDataSource.destroy();
    console.log('Database connection closed');
  }
}

// Run the seeders
runSeeders(); 