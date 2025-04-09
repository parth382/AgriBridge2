import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/OrderService';
import { AppError } from '../utils/AppError';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  };

  getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const order = await this.orderService.getOrder(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const order = await this.orderService.updateOrder(id, req.body);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.orderService.deleteOrder(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const orders = await this.orderService.getOrdersByUserId(userId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getOrdersByFarmId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmId = parseInt(req.params.farmId);
      const orders = await this.orderService.getOrdersByFarmId(farmId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getPendingOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.getPendingOrders();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getCompletedOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.getCompletedOrders();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getOrdersByDateRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;
      const orders = await this.orderService.getOrdersByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };
} 