import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { FarmerProfile } from '../models/FarmerProfile';
import { Farm } from '../models/Farm';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { QRTraceability } from '../models/QRTraceability';
import { Review } from '../models/Review';
import { AuditLog } from '../models/AuditLog';
import { Logistics } from '../models/Logistics';
import { FarmingActivityLog } from '../models/FarmingActivityLog';
import { SubscriptionPlan } from '../models/SubscriptionPlan';
import { UserSubscription } from '../models/UserSubscription';
import { Notification } from '../models/Notification';
import { AdminTask } from '../models/AdminTask';
import { FeedbackSurvey } from '../models/FeedbackSurvey';
import { CommunityPost } from '../models/CommunityPost';
import { PostComment } from '../models/PostComment';
import { PostLike } from '../models/PostLike';
import { CommentLike } from '../models/CommentLike';
import { Payment } from '../models/Payment';
import { Delivery } from '../models/Delivery';

// Database Configuration
export const databaseConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'agribridge',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: [
    User,
    FarmerProfile,
    Farm,
    Product,
    Order,
    OrderItem,
    QRTraceability,
    Review,
    AuditLog,
    Logistics,
    FarmingActivityLog,
    SubscriptionPlan,
    UserSubscription,
    Notification,
    AdminTask,
    FeedbackSurvey,
    CommunityPost,
    PostComment,
    PostLike,
    CommentLike,
    Payment,
    Delivery
  ],
  migrations: [],
  subscribers: []
};

// Create DataSource instance
export const AppDataSource = new DataSource(databaseConfig);

// Database initialization helper
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connection established');
    }
    return AppDataSource;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}; 