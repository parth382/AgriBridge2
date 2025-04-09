import { Request, Response, NextFunction } from 'express';
import { format } from 'date-fns';

/**
 * Middleware to log HTTP requests with details
 * Logs method, URL, status code, response time, and timestamp
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Store the start time of the request
  const startTime = Date.now();
  
  // Get the original send function
  const originalSend = res.send;
  
  // Override the send function to log the response
  res.send = function (body) {
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Get the status code
    const statusCode = res.statusCode;
    
    // Format the timestamp
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    
    // Create log message
    const logMessage = `[${timestamp}] ${req.method} ${req.originalUrl} ${statusCode} ${responseTime}ms`;
    
    // Log based on status code
    if (statusCode >= 500) {
      console.error(logMessage);
    } else if (statusCode >= 400) {
      console.warn(logMessage);
    } else {
      console.log(logMessage);
    }
    
    // Call the original send function
    return originalSend.call(this, body);
  };
  
  // Continue to the next middleware
  next();
}; 