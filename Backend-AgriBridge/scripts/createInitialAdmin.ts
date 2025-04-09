import { AppDataSource } from '../config/data-source';
import { User, UserType } from '../models/User';
import bcrypt from 'bcryptjs';

async function createInitialAdmin() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');

    const userRepository = AppDataSource.getRepository(User);

    // Check if admin already exists
    const existingAdmin = await userRepository.findOne({
      where: { userType: UserType.ADMIN }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const admin = new User();
    admin.email = 'admin@agribridge.com';
    admin.password = await bcrypt.hash('Admin@123', 10);
    admin.firstName = 'Admin';
    admin.lastName = 'User';
    admin.userType = UserType.ADMIN;

    await userRepository.save(admin);
    console.log('Initial admin user created successfully');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

createInitialAdmin(); 