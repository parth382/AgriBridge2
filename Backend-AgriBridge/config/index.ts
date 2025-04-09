import dotenv from 'dotenv';
import path from 'path';
import { serverConfig } from './server';
import { AppDataSource, initializeDatabase } from './data-source';

// Load environment variables from .env file in the config directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Main configuration object
export const config = {
  server: serverConfig,
  database: {
    initialize: initializeDatabase,
    dataSource: AppDataSource,
  },
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
  email: {
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '',
    },
    from: process.env.EMAIL_FROM || 'noreply@agribridge.com',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET || '',
  },
};

// Export individual configurations
export {
  serverConfig,
  AppDataSource,
  initializeDatabase,
};

// Export default configuration
export default config;