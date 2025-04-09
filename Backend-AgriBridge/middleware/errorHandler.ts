import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

/**
 * Custom error handler middleware
 * Handles different types of errors and sends appropriate responses
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // If it's our custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.statusCode
    });
  }

  // Handle TypeORM errors
  if (err.name === 'QueryFailedError') {
    return res.status(400).json({
      status: 'error',
      message: 'Database operation failed',
      code: 400
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      code: 400
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
      code: 401
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired',
      code: 401
    });
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    code: 500
  });
}; 