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

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "agribridge",
    synchronize: true,
    logging: true,
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