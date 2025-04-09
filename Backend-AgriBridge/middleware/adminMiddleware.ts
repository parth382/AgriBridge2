import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { User, UserType } from '../models/User';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user || user.userType !== UserType.ADMIN) {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 