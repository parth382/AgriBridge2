import { BaseRepository } from './base/BaseRepository';
import { User } from '../../models/User';

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }

    async findActiveUsers(): Promise<User[]> {
        return this.repository.find({ where: { is_active: true } });
    }

    async findUsersByType(userType: string): Promise<User[]> {
        return this.repository.find({ where: { user_type: userType } });
    }
} 