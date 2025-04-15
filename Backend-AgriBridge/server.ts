import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { AppDataSource , initializeDatabase} from './config/data-source';
import { corsConfig } from './config/serverConfig';
import { serverConfig } from './config/serverConfig';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { authMiddleware } from './middleware/authMiddleware';
import { setupWebSocketHandlers } from './websocket/handlers';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import farmerRoutes from './routes/farmerRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import communityRoutes from './routes/communityRoutes';
import adminRoutes from './routes/adminRoutes';
//import healthRoutes from './routes/healthRoutes';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors(corsConfig));

// Configure Socket.IO
const io = new Server(server, {
  cors: corsConfig,
  transports: ['polling', 'websocket'],
  pingTimeout: 30000,
  pingInterval: 10000,
  connectTimeout: 10000,
  path: '/socket.io',
  allowEIO3: true,
  allowUpgrades: true,
  maxHttpBufferSize: 1e8,
  serveClient: false,
  cookie: false
});

// Initialize WebSocket handlers
setupWebSocketHandlers(io);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
//app.use(`${serverConfig.apiPrefix}/health`, healthRoutes);
app.use(`${serverConfig.apiPrefix}/auth`, authRoutes);
app.use(`${serverConfig.apiPrefix}/users`, userRoutes);
app.use(`${serverConfig.apiPrefix}/farmers`, authMiddleware, farmerRoutes);
app.use(`${serverConfig.apiPrefix}/products`, productRoutes);
app.use(`${serverConfig.apiPrefix}/orders`, authMiddleware, orderRoutes);
app.use(`${serverConfig.apiPrefix}/community`, communityRoutes);
app.use(`${serverConfig.apiPrefix}/admin`, authMiddleware, adminRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
initializeDatabase()
  .then(() => {
    console.log('Database connection established');
    server.listen(serverConfig.port, () => {
      console.log(`Server running on ${serverConfig.host}:${serverConfig.port}`);
      console.log(`WebSocket server is running on path: /socket.io`);
    });
  })
  .catch((error: Error) => {
    console.error('Error initializing database:', error);
    process.exit(1);
  });

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
}); 