import { PaymentRepository } from '../repositories/PaymentRepository';
import { Payment } from '../models/Payment';
import { AppError } from '../utils/AppError';
import Stripe from 'stripe';
import { config } from '../config';

export class PaymentService {
  private paymentRepository: PaymentRepository;
  private stripe: Stripe;

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  async createPayment(data: Partial<Payment>): Promise<Payment> {
    // Validate required fields
    if (!data.user_id) {
      throw new AppError('User ID is required for creating a payment', 400);
    }
    
    if (!data.order_id) {
      throw new AppError('Order ID is required for creating a payment', 400);
    }
    
    if (!data.amount || data.amount <= 0) {
      throw new AppError('Valid amount is required for creating a payment', 400);
    }

    // Set default values
    const paymentData = {
      ...data,
      status: 'pending',
      created_at: new Date()
    };

    return this.paymentRepository.create(paymentData);
  }

  async getPayment(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(id);
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }
    return payment;
  }

  async updatePayment(id: number, data: Partial<Payment>): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(id);
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }
    return payment;
  }

  async deletePayment(id: number): Promise<void> {
    const payment = await this.paymentRepository.findOne(id);
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }
    await this.paymentRepository.delete(id);
  }

  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    return this.paymentRepository.findByUserId(userId);
  }

  async getPaymentsByOrderId(orderId: number): Promise<Payment[]> {
    return this.paymentRepository.findByOrderId(orderId);
  }

  async getPaymentsByStatus(status: string): Promise<Payment[]> {
    return this.paymentRepository.findByStatus(status);
  }

  async getPaymentsByDateRange(startDate: Date, endDate: Date): Promise<Payment[]> {
    return this.paymentRepository.findByDateRange(startDate, endDate);
  }

  async getRecentPayments(days: number): Promise<Payment[]> {
    return this.paymentRepository.findRecentPayments(days);
  }

  async getOldPayments(days: number): Promise<Payment[]> {
    return this.paymentRepository.findOldPayments(days);
  }

  async getSuccessfulPayments(): Promise<Payment[]> {
    return this.paymentRepository.findSuccessfulPayments();
  }

  async getFailedPayments(): Promise<Payment[]> {
    return this.paymentRepository.findFailedPayments();
  }

  async getPendingPayments(): Promise<Payment[]> {
    return this.paymentRepository.findPendingPayments();
  }

  async getTotalAmountByUserId(userId: number): Promise<number> {
    return this.paymentRepository.getTotalAmountByUserId(userId);
  }

  async getTotalAmountByOrderId(orderId: number): Promise<number> {
    return this.paymentRepository.getTotalAmountByOrderId(orderId);
  }

  // Stripe integration methods
  async createStripePaymentIntent(paymentId: number, currency: string = 'usd'): Promise<{ clientSecret: string }> {
    const payment = await this.getPayment(paymentId);
    
    if (payment.status !== 'pending') {
      throw new AppError('Payment is not in pending status', 400);
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(payment.amount * 100), // Convert to cents
        currency,
        metadata: {
          payment_id: payment.id.toString(),
          user_id: payment.user_id.toString(),
          order_id: payment.order_id.toString()
        }
      });

      // Update payment with Stripe payment intent ID
      await this.paymentRepository.updatePaymentStatus(
        payment.id, 
        'pending', 
        paymentIntent.id
      );

      return { clientSecret: paymentIntent.client_secret! };
    } catch (error) {
      console.error('Stripe payment intent creation error:', error);
      throw new AppError('Failed to create payment intent', 500);
    }
  }

  async confirmStripePayment(paymentId: number): Promise<Payment> {
    const payment = await this.getPayment(paymentId);
    
    if (!payment.stripe_payment_id) {
      throw new AppError('No Stripe payment ID found for this payment', 400);
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(payment.stripe_payment_id);
      
      if (paymentIntent.status === 'succeeded') {
        const updatedPayment = await this.paymentRepository.updatePaymentStatus(payment.id, 'succeeded');
        if (!updatedPayment) throw new AppError('Payment not found', 404);
        return updatedPayment;
      } else if (paymentIntent.status === 'canceled') {
        const updatedPayment = await this.paymentRepository.updatePaymentStatus(payment.id, 'failed');
        if (!updatedPayment) throw new AppError('Payment not found', 404);
        return updatedPayment;
      } else {
        const updatedPayment = await this.paymentRepository.updatePaymentStatus(payment.id, 'pending');
        if (!updatedPayment) throw new AppError('Payment not found', 404);
        return updatedPayment;
      }
    } catch (error) {
      console.error('Stripe payment confirmation error:', error);
      throw new AppError('Failed to confirm payment', 500);
    }
  }

  async cancelStripePayment(paymentId: number): Promise<Payment> {
    const payment = await this.getPayment(paymentId);
    
    if (!payment.stripe_payment_id) {
      throw new AppError('No Stripe payment ID found for this payment', 400);
    }

    if (payment.status !== 'pending') {
      throw new AppError('Only pending payments can be canceled', 400);
    }

    try {
      await this.stripe.paymentIntents.cancel(payment.stripe_payment_id);
      const updatedPayment = await this.paymentRepository.updatePaymentStatus(payment.id, 'canceled');
      if (!updatedPayment) {
        throw new AppError('Payment not found', 404);
      }
      return updatedPayment;
    } catch (error) {
      console.error('Stripe payment cancellation error:', error);
      throw new AppError('Failed to cancel payment', 500);
    }
  }

  async refundStripePayment(paymentId: number, amount?: number): Promise<Payment> {
    const payment = await this.getPayment(paymentId);
    
    if (!payment.stripe_payment_id) {
      throw new AppError('No Stripe payment ID found for this payment', 400);
    }

    if (payment.status !== 'succeeded') {
      throw new AppError('Only succeeded payments can be refunded', 400);
    }

    try {
      const refundParams: Stripe.RefundCreateParams = {
        payment_intent: payment.stripe_payment_id
      };
      
      if (amount) {
        refundParams.amount = Math.round(amount * 100); // Convert to cents
      }
      await this.stripe.refunds.create(refundParams);
      const updatedPayment = await this.paymentRepository.updatePaymentStatus(payment.id, 'refunded');
      if (!updatedPayment) {
        throw new AppError('Payment not found', 404);
      }
      return updatedPayment;
    } catch (error) {
      console.error('Stripe payment refund error:', error);
      throw new AppError('Failed to refund payment', 500);
    }
  }

  async handleStripeWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.canceled':
        await this.handlePaymentIntentCanceled(event.data.object as Stripe.PaymentIntent);
        break;
      case 'charge.refunded':
        await this.handleChargeRefunded(event.data.object as Stripe.Charge);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const paymentId = parseInt(paymentIntent.metadata.payment_id);
    if (isNaN(paymentId)) return;
    
    await this.paymentRepository.updatePaymentStatus(paymentId, 'succeeded');
  }

  private async handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const paymentId = parseInt(paymentIntent.metadata.payment_id);
    if (isNaN(paymentId)) return;
    
    await this.paymentRepository.updatePaymentStatus(paymentId, 'failed');
  }

  private async handlePaymentIntentCanceled(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const paymentId = parseInt(paymentIntent.metadata.payment_id);
    if (isNaN(paymentId)) return;
    
    await this.paymentRepository.updatePaymentStatus(paymentId, 'canceled');
  }

  private async handleChargeRefunded(charge: Stripe.Charge): Promise<void> {
    if (!charge.payment_intent) return;
    
    const paymentIntent = await this.stripe.paymentIntents.retrieve(charge.payment_intent as string);
    const paymentId = parseInt(paymentIntent.metadata.payment_id);
    if (isNaN(paymentId)) return;
    
    await this.paymentRepository.updatePaymentStatus(paymentId, 'refunded');
  }
} 