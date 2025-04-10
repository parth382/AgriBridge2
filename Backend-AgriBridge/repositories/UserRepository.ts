import { BaseRepository } from './base/BaseRepository';
import { User, UserType } from '../models/User';

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }

    async findActiveUsers(): Promise<User[]> {
        return this.repository.find({ where: { isActive: true } });
    }

    async findUsersByType(userType: string): Promise<User[]> {
        return this.repository.find({ where: { userType: userType as UserType } });
    }
} 