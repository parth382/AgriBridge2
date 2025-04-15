import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/PaymentService';
import Stripe from 'stripe';
import { stripeConfig } from '../config/serverConfig';

export class PaymentController {
  private paymentService: PaymentService;
  private stripe: Stripe;

  constructor() {
    this.paymentService = new PaymentService();
    if (!stripeConfig.secretKey) {
      throw new Error('Stripe secret key is not configured');
    }
    this.stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await this.paymentService.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  };

  getPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const payment = await this.paymentService.getPayment(id);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  };

  updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const payment = await this.paymentService.updatePayment(id, req.body);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  };

  deletePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.paymentService.deletePayment(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getPaymentsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const payments = await this.paymentService.getPaymentsByUserId(userId);
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getPaymentsByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = parseInt(req.params.orderId);
      const payments = await this.paymentService.getPaymentsByOrderId(orderId);
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getPaymentsByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.params;
      const payments = await this.paymentService.getPaymentsByStatus(status);
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getPaymentsByDateRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;
      const payments = await this.paymentService.getPaymentsByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getRecentPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { days } = req.query;
      const payments = await this.paymentService.getRecentPayments(parseInt(days as string));
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getOldPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { days } = req.query;
      const payments = await this.paymentService.getOldPayments(parseInt(days as string));
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getSuccessfulPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await this.paymentService.getSuccessfulPayments();
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getFailedPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await this.paymentService.getFailedPayments();
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getPendingPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await this.paymentService.getPendingPayments();
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  };

  getTotalAmountByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const total = await this.paymentService.getTotalAmountByUserId(userId);
      res.status(200).json({ total });
    } catch (error) {
      next(error);
    }
  };

  getTotalAmountByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = parseInt(req.params.orderId);
      const total = await this.paymentService.getTotalAmountByOrderId(orderId);
      res.status(200).json({ total });
    } catch (error) {
      next(error);
    }
  };

  // Stripe integration endpoints
  createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = parseInt(req.params.paymentId);
      const { currency } = req.body;
      const result = await this.paymentService.createStripePaymentIntent(paymentId, currency);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = parseInt(req.params.paymentId);
      const payment = await this.paymentService.confirmStripePayment(paymentId);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  };

  cancelPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = parseInt(req.params.paymentId);
      const payment = await this.paymentService.cancelStripePayment(paymentId);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  };

  refundPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = parseInt(req.params.paymentId);
      const { amount } = req.body;
      const payment = await this.paymentService.refundStripePayment(paymentId, amount);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  };

  handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sig = req.headers['stripe-signature'];
      
      if (!sig) {
        return res.status(400).json({ error: 'Missing stripe-signature header' });
      }

      let event: Stripe.Event;
      
      try {
        event = this.stripe.webhooks.constructEvent(
          req.body,
          sig,
          stripeConfig.webhookSecret as string
        );
      } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).json({ error: 'Webhook signature verification failed' });
      }

      await this.paymentService.handleStripeWebhook(event);
      
      res.status(200).json({ received: true });
    } catch (error) {
      next(error);
    }
  };
} 