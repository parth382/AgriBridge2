import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { AppError } from '../utils/AppError';
import { validateOrReject } from 'class-validator';
import { User } from '../models/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email, password, firstName, lastName, phoneNumber } = req.body;
          const user = new User();
          Object.assign(user, { email, password, firstName, lastName, phoneNumber });
      
          // 👇 Add this to log input before validation
          console.log("Incoming User Data:", user);
      
          // 👇 Catch validation errors directly
          await validateOrReject(user).catch((validationErrors) => {
            console.error("Validation Errors:", validationErrors);
            throw new AppError("Invalid input data", 400); // Bad Request
          });
      
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
      
          const savedUser = await this.userService.createUser(user);
      
          const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '24h',
          });
      
          res.status(201).json({
            status: 'success',
            data: {
              user: {
                id: savedUser.id,
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                phoneNumber: savedUser.phoneNumber,
              },
              token,
            },
          });
        } catch (error) {
          console.error("🔥 Registration Error:", error);
          next(error);
        }
      };
      

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new AppError('Invalid email or password', 401);
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new AppError('Invalid email or password', 401);
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            res.json({
                status: 'success',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber
                    },
                    token
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError('User not authenticated', 401);
            }

            const user = await this.userService.findById(userId);
            if (!user) {
                throw new AppError('User not found', 404);
            }

            res.json({
                status: 'success',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber
                    }
                }
            });
        } catch (error) {
            next(error);
        }
    };

    updateProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError('User not authenticated', 401);
            }

            const { firstName, lastName, phoneNumber } = req.body;
            const updatedUser = await this.userService.updateUser(userId, {
                firstName,
                lastName,
                phoneNumber
            });

            res.json({
                status: 'success',
                data: {
                    user: {
                        id: updatedUser.id,
                        email: updatedUser.email,
                        firstName: updatedUser.firstName,
                        lastName: updatedUser.lastName,
                        phoneNumber: updatedUser.phoneNumber
                    }
                }
            });
        } catch (error) {
            next(error);
        }
    };

    changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError('User not authenticated', 401);
            }

            const { currentPassword, newPassword } = req.body;
            const user = await this.userService.findById(userId);

            if (!user) {
                throw new AppError('User not found', 404);
            }

            // Verify current password
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                throw new AppError('Current password is incorrect', 401);
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.userService.updatePassword(userId, hashedPassword);

            res.json({
                status: 'success',
                message: 'Password updated successfully'
            });
        } catch (error) {
            next(error);
        }
    };

    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            const user = await this.userService.findByEmail(email);

            if (!user) {
                // For security reasons, we still return success even if email doesn't exist
                return res.json({
                    status: 'success',
                    message: 'If the email exists, password reset instructions will be sent'
                });
            }

            // Generate reset token
            const resetToken = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '1h' }
            );

            // Save reset token to user
            await this.userService.saveResetToken(user.id, resetToken);

            // TODO: Send reset password email
            // This should be implemented with your email service

            res.json({
                status: 'success',
                message: 'If the email exists, password reset instructions will be sent'
            });
        } catch (error) {
            next(error);
        }
    };

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token, newPassword } = req.body;

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number };
            const user = await this.userService.findById(decoded.userId);

            if (!user || user.resetToken !== token) {
                throw new AppError('Invalid or expired reset token', 400);
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.userService.updatePassword(user.id, hashedPassword);
            await this.userService.clearResetToken(user.id);

            res.json({
                status: 'success',
                message: 'Password has been reset successfully'
            });
        } catch (error) {
            next(error);
        }
    };

    getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError('User not authenticated', 401);
            }

            const orders = await this.userService.getUserOrders(userId);
            res.json({
                status: 'success',
                data: { orders }
            });
        } catch (error) {
            next(error);
        }
    };

    getFavorites = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError('User not authenticated', 401);
            }

            const favorites = await this.userService.getUserFavorites(userId);
            res.json({
                status: 'success',
                data: { favorites }
            });
        } catch (error) {
            next(error);
        }
    };

    addToFavorites = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError('User not authenticated', 401);
            }

            const { productId } = req.params;
            await this.userService.addToFavorites(userId, parseInt(productId));

            res.json({
                status: 'success',
                message: 'Product added to favorites'
            });
        } catch (error) {
            next(error);
        }
    };

    removeFromFavorites = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError('User not authenticated', 401);
            }

            const { productId } = req.params;
            await this.userService.removeFromFavorites(userId, parseInt(productId));

            res.json({
                status: 'success',
                message: 'Product removed from favorites'
            });
        } catch (error) {
            next(error);
        }
    };
} 