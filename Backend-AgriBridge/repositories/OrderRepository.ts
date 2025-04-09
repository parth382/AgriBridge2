import { BaseRepository } from './base/BaseRepository';
import { Order, OrderStatus } from '../models/Order';
import { Between } from 'typeorm';

export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super(Order);
  }
  async findByUserId(userId: number): Promise<Order[]> {
    return this.repository.find({ where: { user_id: userId } });
  }

  async findByFarmId(farmId: number): Promise<Order[]> {
    return this.repository.find({ where: { farm_id: farmId } });
  }

  async findPendingOrders(): Promise<Order[]> {
    return this.repository.find({ where: { status: OrderStatus.PENDING } });
  }

  async findCompletedOrders(): Promise<Order[]> {
    return this.repository.find({ where: { status: OrderStatus.COMPLETED } });
  }

  async findOrdersByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    return this.repository.find({
      where: {
        created_at: Between(startDate, endDate)
      }
    });
  }
} 