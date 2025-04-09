import { DeliveryRepository } from '../repositories/DeliveryRepository';
import { Delivery } from '../models/Delivery';
import { AppError } from '../utils/AppError';

export class DeliveryService {
  private deliveryRepository: DeliveryRepository;

  constructor() {
    this.deliveryRepository = new DeliveryRepository();
  }

  async createDelivery(data: Partial<Delivery>): Promise<Delivery> {
    if (!data.order_id) {
      throw new AppError('Order ID is required for creating a delivery', 400);
    }

    if (!data.delivery_address) {
      throw new AppError('Delivery address is required', 400);
    }

    const deliveryData = {
      ...data,
      status: 'pending',
      delivery_attempts: 0,
      created_at: new Date()
    };

    return this.deliveryRepository.create(deliveryData);
  }

  async getDelivery(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne(id);
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }
    return delivery;
  }

  async updateDelivery(id: number, data: Partial<Delivery>): Promise<Delivery> {
    const delivery = await this.getDelivery(id); // Verify delivery exists
    return delivery.update(data);
  }

  async deleteDelivery(id: number): Promise<void> {
    const delivery = await this.getDelivery(id); // Verify delivery exists
    await this.deliveryRepository.delete(id);
  }

  async getDeliveriesByOrderId(orderId: number): Promise<Delivery[]> {
    return this.deliveryRepository.findByOrderId(orderId);
  }

  async getDeliveriesByDeliveryPerson(deliveryPersonId: number): Promise<Delivery[]> {
    return this.deliveryRepository.findByDeliveryPersonId(deliveryPersonId);
  }

  async getDeliveriesByStatus(status: string): Promise<Delivery[]> {
    return this.deliveryRepository.findByStatus(status);
  }

  async getDeliveryByTrackingNumber(trackingNumber: string): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findByTrackingNumber(trackingNumber);
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }
    return delivery;
  }

  async getDeliveriesByDateRange(startDate: Date, endDate: Date): Promise<Delivery[]> {
    return this.deliveryRepository.findByDateRange(startDate, endDate);
  }

  async getPendingDeliveries(): Promise<Delivery[]> {
    return this.deliveryRepository.findPendingDeliveries();
  }

  async getInTransitDeliveries(): Promise<Delivery[]> {
    return this.deliveryRepository.findInTransitDeliveries();
  }

  async getCompletedDeliveries(): Promise<Delivery[]> {
    return this.deliveryRepository.findCompletedDeliveries();
  }

  async getFailedDeliveries(): Promise<Delivery[]> {
    return this.deliveryRepository.findFailedDeliveries();
  }

  async getDeliveriesByArea(latitude: number, longitude: number, radiusKm: number): Promise<Delivery[]> {
    return this.deliveryRepository.findDeliveriesByArea(latitude, longitude, radiusKm);
  }

  async assignDeliveryPerson(id: number, deliveryPersonId: number): Promise<Delivery> {
    const delivery = await this.getDelivery(id);
    if (delivery.status !== 'pending') {
      throw new AppError('Can only assign delivery person to pending deliveries', 400);
    }

    const updatedDelivery = await this.deliveryRepository.updateDeliveryStatus(id, 'assigned', {
      delivery_person_id: deliveryPersonId
    });

    if (!updatedDelivery) {
      throw new AppError('Failed to update delivery', 500);
    }

    return updatedDelivery;
  }

  async startDelivery(id: number): Promise<Delivery> {
    const delivery = await this.getDelivery(id);
    if (delivery.status !== 'assigned') {
      throw new AppError('Can only start assigned deliveries', 400);
    }

    if (!delivery.delivery_person_id) {
      throw new AppError('No delivery person assigned', 400);
    }

    const updatedDelivery = await this.deliveryRepository.updateDeliveryStatus(id, 'in_transit', {
      estimated_delivery_date: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    });

    if (!updatedDelivery) {
      throw new AppError('Failed to update delivery', 500);
    }

    return updatedDelivery;
  }

  async completeDelivery(id: number, data: {
    proof_of_delivery?: string;
    signature_image?: string;
    recipient_name?: string;
    recipient_phone?: string;
  }): Promise<Delivery> {
    const delivery = await this.getDelivery(id);
    if (delivery.status !== 'in_transit') {
      throw new AppError('Can only complete deliveries that are in transit', 400);
    }

    if (delivery.signature_required && !data.signature_image) {
      throw new AppError('Signature is required for this delivery', 400);
    }

    const updatedDelivery = await this.deliveryRepository.updateDeliveryStatus(id, 'delivered', {
      ...data,
      actual_delivery_date: new Date()
    });

    if (!updatedDelivery) {
      throw new AppError('Failed to update delivery', 500);
    }

    return updatedDelivery;
  }

  async failDelivery(id: number, failureReason: string): Promise<Delivery> {
    const delivery = await this.getDelivery(id);
    if (delivery.status !== 'in_transit') {
      throw new AppError('Can only fail deliveries that are in transit', 400);
    }
    await this.deliveryRepository.incrementDeliveryAttempts(id, failureReason);
    const updatedDelivery = await this.deliveryRepository.updateDeliveryStatus(id, 'failed');
    if (!updatedDelivery) {
      throw new AppError('Failed to update delivery', 500);
    }
    return updatedDelivery;
  }

  async updateDeliveryLocation(id: number, latitude: number, longitude: number): Promise<Delivery> {
    const delivery = await this.getDelivery(id);
    if (delivery.status !== 'in_transit') {
      throw new AppError('Can only update location for deliveries in transit', 400);
    }

    const updatedDelivery = await this.deliveryRepository.updateDeliveryLocation(id, latitude, longitude);
    if (!updatedDelivery) {
      throw new AppError('Failed to update delivery location', 500);
    }
    return updatedDelivery;
  }

  async rescheduleDelivery(id: number, newDate: Date): Promise<Delivery> {
    const delivery = await this.getDelivery(id);
    if (!['failed', 'pending'].includes(delivery.status)) {
      throw new AppError('Can only reschedule failed or pending deliveries', 400);
    }

    const updatedDelivery = await this.deliveryRepository.updateDeliveryStatus(id, 'pending', {
      estimated_delivery_date: newDate
    });

    if (!updatedDelivery) {
      throw new AppError('Failed to update delivery', 500);
    }

    return updatedDelivery;
  }
}