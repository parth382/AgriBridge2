import dotenv from 'dotenv';
import path from 'path';
import { CorsOptions } from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import Stripe from 'stripe';

// Load environment variables
dotenv.config();

// CORS Configuration
export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:3000'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// JWT Configuration
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  issuer: process.env.JWT_ISSUER || 'agribridge',
  audience: process.env.JWT_AUDIENCE || 'agribridge-users'
};

// Cloudinary Configuration
export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

// Initialize Cloudinary
cloudinary.config(cloudinaryConfig);
export { cloudinary };

// Stripe Configuration
export const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: 'usd',
  paymentMethods: ['card']
};

// Initialize Stripe
export const stripe = new Stripe(stripeConfig.secretKey || '', {
  apiVersion: '2025-03-31.basil'
});

// Main Server Configuration
export const serverConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',
  environment: process.env.NODE_ENV || 'development',
  apiPrefix: '/api',
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif']
  }
}; 