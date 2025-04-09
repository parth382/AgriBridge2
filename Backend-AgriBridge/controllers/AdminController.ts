import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User, UserType } from '../models/User';
import bcrypt from 'bcryptjs';
import { validate } from 'class-validator';

export class AdminController {
  private userRepository = AppDataSource.getRepository(User);

  async createAdmin(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Check if user already exists
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new admin user
      const user = new User();
      user.email = email;
      user.password = await bcrypt.hash(password, 10);
      user.firstName = firstName;
      user.lastName = lastName;
      user.userType = UserType.ADMIN;

      // Validate user
      const errors = await validate(user);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Save user
      await this.userRepository.save(user);

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error('Create admin error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAdmins(req: Request, res: Response) {
    try {
      const admins = await this.userRepository.find({
        where: { userType: UserType.ADMIN },
        select: ['id', 'email', 'firstName', 'lastName', 'userType', 'createdAt', 'updatedAt']
      });
      res.json(admins);
    } catch (error) {
      console.error('Get admins error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const admin = await this.userRepository.findOne({
        where: { id: parseInt(id), userType: UserType.ADMIN }
      });

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      await this.userRepository.remove(admin);
      res.status(204).send();
    } catch (error) {
      console.error('Delete admin error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 