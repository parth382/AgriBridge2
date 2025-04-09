import { OrderRepository } from '../repositories/OrderRepository';
import { Order } from '../models/Order';
import { AppError } from '../utils/AppError';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(data: Partial<Order>): Promise<Order> {
    return this.orderRepository.create(data);
  }

  async getOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    return order;
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
  
    if (!order) {
      throw new AppError('Order not found', 404);
    }
  
    await this.orderRepository.update(id, data);
  
    // Fetch the updated order and return it
    const updatedOrder = await this.orderRepository.findOne(id);
  
    if (!updatedOrder) {
      throw new AppError('Failed to fetch updated order', 500);
    }
  
    return updatedOrder;
  }
  

  async deleteOrder(id: number): Promise<void> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    await this.orderRepository.delete(id);
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }

  async getOrdersByFarmId(farmId: number): Promise<Order[]> {
    return this.orderRepository.findByFarmId(farmId);
  }

  async getPendingOrders(): Promise<Order[]> {
    return this.orderRepository.findPendingOrders();
  }

  async getCompletedOrders(): Promise<Order[]> {
    return this.orderRepository.findCompletedOrders();
  }

  async getOrdersByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    return this.orderRepository.findOrdersByDateRange(startDate, endDate);
  }
} 