import { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer } from '../server';
import { AppDataSource } from '../config/data-source';

const { app } = createServer();

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established');
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
  });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
} 