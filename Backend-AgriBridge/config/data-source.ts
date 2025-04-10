import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import {
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
} from "../models";

dotenv.config();

// Parse DATABASE_URL for Render
const getDatabaseConfig = () => {
  if (process.env.DATABASE_URL) {
    // Parse the DATABASE_URL for Render
    const url = new URL(process.env.DATABASE_URL);
    return {
      host: url.hostname,
      port: parseInt(url.port),
      username: url.username,
      password: url.password,
      database: url.pathname.substring(1),
      ssl: {
        rejectUnauthorized: false
      }
    };
  }
  
  // Fallback to local development config
  return {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "agribridge"
  };
};

const dbConfig = getDatabaseConfig();

export const AppDataSource = new DataSource({
    type: "postgres",
    ...dbConfig,
    synchronize: process.env.NODE_ENV !== 'production', // Only synchronize in development
    logging: process.env.NODE_ENV !== 'production', // Only log in development
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
});

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