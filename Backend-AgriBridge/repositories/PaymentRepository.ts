import { BaseRepository } from './base/BaseRepository';
import { Payment } from '../models/Payment';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class PaymentRepository extends BaseRepository<Payment> {
  constructor() {
    super(Payment);
  }

  async findByUserId(userId: number): Promise<Payment[]> {
    return this.repository.find({ 
      where: { user_id: userId },
      order: { created_at: 'DESC' }
    });
  }

  async findByOrderId(orderId: number): Promise<Payment[]> {
    return this.repository.find({ 
      where: { order_id: orderId },
      order: { created_at: 'DESC' }
    });
  }

  async findByStatus(status: string): Promise<Payment[]> {
    return this.repository.find({ 
      where: { status },
      order: { created_at: 'DESC' }
    });
  }

  async findByStripePaymentId(stripePaymentId: string): Promise<Payment | null> {
    return this.repository.findOne({ 
      where: { stripe_payment_id: stripePaymentId }
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]> {
    return this.repository.find({
      where: {
        created_at: Between(startDate, endDate)
      },
      order: { created_at: 'DESC' }
    });
  }

  async findRecentPayments(days: number): Promise<Payment[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    return this.repository.find({
      where: {
        created_at: MoreThanOrEqual(date)
      },
      order: { created_at: 'DESC' }
    });
  }

  async findOldPayments(days: number): Promise<Payment[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    return this.repository.find({
      where: {
        created_at: LessThanOrEqual(date)
      },
      order: { created_at: 'DESC' }
    });
  }

  async findSuccessfulPayments(): Promise<Payment[]> {
    return this.repository.find({
      where: { status: 'succeeded' },
      order: { created_at: 'DESC' }
    });
  }

  async findFailedPayments(): Promise<Payment[]> {
    return this.repository.find({
      where: { status: 'failed' },
      order: { created_at: 'DESC' }
    });
  }

  async findPendingPayments(): Promise<Payment[]> {
    return this.repository.find({
      where: { status: 'pending' },
      order: { created_at: 'DESC' }
    });
  }

  async updatePaymentStatus(id: number, status: string, stripePaymentId?: string): Promise<Payment | null> {
    const payment = await this.repository.findOne({ where: { id } });
    if (!payment) return null;
    
    payment.status = status;
    if (stripePaymentId) {
      payment.stripe_payment_id = stripePaymentId;
    }
    
    return this.repository.save(payment);
  }

  async getTotalAmountByUserId(userId: number): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .where('payment.user_id = :userId', { userId })
      .andWhere('payment.status = :status', { status: 'succeeded' })
      .getRawOne();
    
    return result?.total || 0;
  }

  async getTotalAmountByOrderId(orderId: number): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .where('payment.order_id = :orderId', { orderId })
      .andWhere('payment.status = :status', { status: 'succeeded' })
      .getRawOne();
    
    return result?.total || 0;
  }
}