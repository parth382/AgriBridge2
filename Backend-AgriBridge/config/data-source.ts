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

const getDatabaseConfig = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "agribridge",
    ssl: isProduction ? { rejectUnauthorized: false } : false
  };
};

const dbConfig = getDatabaseConfig();

export const AppDataSource = new DataSource({
  type: "postgres",
  ...dbConfig,
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
});

export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ Database connection established');
    }
    return AppDataSource;
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    throw error;
  }
};
