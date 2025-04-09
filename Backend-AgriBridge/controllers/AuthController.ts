import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {
  private userRepository: Repository<User>;

  constructor() {
    // Initialize the repository once (synchronously)
    if (AppDataSource.isInitialized) {
      this.userRepository = AppDataSource.getRepository(User);
    } else {
      AppDataSource.initialize()
        .then(() => {
          console.log('Database connection initialized');
          this.userRepository = AppDataSource.getRepository(User);
        })
        .catch((error) => {
          console.error('Error initializing DB:', error);
        });
    }
  }

  // Register user
  register = async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName, userType } = req.body;

      if (!email || !password || !firstName || !lastName || !userType) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userType,
        isActive: true
      });

      await this.userRepository.save(user);

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        },
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Error registering user' });
    }
  };

  // Login user
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Find user
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Error logging in' });
    }
  };

  // Get current user
  getCurrentUser = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
      });
    } catch (error) {
      console.error('Get current user error:', error);
      return res.status(500).json({ message: 'Error fetching user' });
    }
  };

  // Placeholder: Forgot Password
  forgotPassword = async (req: Request, res: Response) => {
    return res.status(501).json({ message: 'Not implemented' });
  };

  // Placeholder: Reset Password
  resetPassword = async (req: Request, res: Response) => {
    return res.status(501).json({ message: 'Not implemented' });
  };
}
