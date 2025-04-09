import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { AppError } from '../utils/AppError';

export class UserService {
    private userRepository: Repository<User>;
    private orderRepository: Repository<Order>;
    private productRepository: Repository<Product>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.orderRepository = AppDataSource.getRepository(Order);
        this.productRepository = AppDataSource.getRepository(Product);
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new AppError('Email already exists', 400);
        }

        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email }
        });
    }

    async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        Object.assign(user, userData);
        return await this.userRepository.save(user);
    }

    async updatePassword(id: number, hashedPassword: string): Promise<void> {
        const user = await this.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        user.password = hashedPassword;
        await this.userRepository.save(user);
    }

    async saveResetToken(id: number, resetToken: string): Promise<void> {
        const user = await this.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        user.resetToken = resetToken;
        user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
        await this.userRepository.save(user);
    }

    async clearResetToken(id: number): Promise<void> {
        const user = await this.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        user.resetToken = null;
        user.resetTokenExpiry = null;
        await this.userRepository.save(user);
    }

    async getUserOrders(userId: number): Promise<Order[]> {
        return await this.orderRepository.find({
            where: { user: { id: userId } },
            relations: ['products', 'farmer']
        });
    }

    async getUserFavorites(userId: number): Promise<Product[]> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['favorites']
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user.favorites;
    }

    async addToFavorites(userId: number, productId: number): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['favorites']
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const product = await this.productRepository.findOne({
            where: { id: productId }
        });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        if (!user.favorites.some((fav: Product) => fav.id === productId)) {
            user.favorites.push(product);
            await this.userRepository.save(user);
        }
    }

    async removeFromFavorites(userId: number, productId: number): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['favorites']
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        user.favorites = user.favorites.filter((product: Product) => product.id !== productId);
        await this.userRepository.save(user);
    }
} 