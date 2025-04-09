import { Request, Response, NextFunction } from 'express';
import { DeliveryService } from '../services/DeliveryService';

export class DeliveryController {
  private deliveryService: DeliveryService;

  constructor() {
    this.deliveryService = new DeliveryService();
  }

  createDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const delivery = await this.deliveryService.createDelivery(req.body);
      res.status(201).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  getDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const delivery = await this.deliveryService.getDelivery(id);
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  updateDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const delivery = await this.deliveryService.updateDelivery(id, req.body);
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  deleteDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.deliveryService.deleteDelivery(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getDeliveriesByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = parseInt(req.params.orderId);
      const deliveries = await this.deliveryService.getDeliveriesByOrderId(orderId);
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  getDeliveriesByDeliveryPerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deliveryPersonId = parseInt(req.params.deliveryPersonId);
      const deliveries = await this.deliveryService.getDeliveriesByDeliveryPerson(deliveryPersonId);
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  getDeliveriesByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.params;
      const deliveries = await this.deliveryService.getDeliveriesByStatus(status);
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  getDeliveryByTrackingNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trackingNumber } = req.params;
      const delivery = await this.deliveryService.getDeliveryByTrackingNumber(trackingNumber);
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  getDeliveriesByDateRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;
      const deliveries = await this.deliveryService.getDeliveriesByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  getPendingDeliveries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deliveries = await this.deliveryService.getPendingDeliveries();
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  getInTransitDeliveries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deliveries = await this.deliveryService.getInTransitDeliveries();
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  getCompletedDeliveries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deliveries = await this.deliveryService.getCompletedDeliveries();
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  getFailedDeliveries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deliveries = await this.deliveryService.getFailedDeliveries();
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  getDeliveriesByArea = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { latitude, longitude, radius } = req.query;
      const deliveries = await this.deliveryService.getDeliveriesByArea(
        parseFloat(latitude as string),
        parseFloat(longitude as string),
        parseFloat(radius as string)
      );
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };

  assignDeliveryPerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const { deliveryPersonId } = req.body;
      const delivery = await this.deliveryService.assignDeliveryPerson(id, deliveryPersonId);
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  startDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const delivery = await this.deliveryService.startDelivery(id);
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  completeDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const delivery = await this.deliveryService.completeDelivery(id, req.body);
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  failDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const { failureReason } = req.body;
      const delivery = await this.deliveryService.failDelivery(id, failureReason);
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  updateDeliveryLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const { latitude, longitude } = req.body;
      const delivery = await this.deliveryService.updateDeliveryLocation(id, latitude, longitude);
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };

  rescheduleDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const { newDate } = req.body;
      const delivery = await this.deliveryService.rescheduleDelivery(id, new Date(newDate));
      res.status(200).json(delivery);
    } catch (error) {
      next(error);
    }
  };
} 