import { BaseRepository } from './base/BaseRepository';
import { Delivery } from '../models/Delivery';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class DeliveryRepository extends BaseRepository<Delivery> {
  constructor() {
    super(Delivery);
  }

  async findByOrderId(orderId: number): Promise<Delivery[]> {
    return this.repository.find({
      where: { order_id: orderId },
      order: { created_at: 'DESC' }
    });
  }

  async findByDeliveryPersonId(deliveryPersonId: number): Promise<Delivery[]> {
    return this.repository.find({
      where: { delivery_person_id: deliveryPersonId },
      order: { created_at: 'DESC' }
    });
  }

  async findByStatus(status: string): Promise<Delivery[]> {
    return this.repository.find({
      where: { status },
      order: { created_at: 'DESC' }
    });
  }

  async findByTrackingNumber(trackingNumber: string): Promise<Delivery | null> {
    return this.repository.findOne({
      where: { tracking_number: trackingNumber }
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Delivery[]> {
    return this.repository.find({
      where: {
        created_at: Between(startDate, endDate)
      },
      order: { created_at: 'DESC' }
    });
  }

  async findPendingDeliveries(): Promise<Delivery[]> {
    return this.repository.find({
      where: { status: 'pending' },
      order: { created_at: 'DESC' }
    });
  }

  async findInTransitDeliveries(): Promise<Delivery[]> {
    return this.repository.find({
      where: { status: 'in_transit' },
      order: { created_at: 'DESC' }
    });
  }

  async findCompletedDeliveries(): Promise<Delivery[]> {
    return this.repository.find({
      where: { status: 'delivered' },
      order: { created_at: 'DESC' }
    });
  }

  async findFailedDeliveries(): Promise<Delivery[]> {
    return this.repository.find({
      where: { status: 'failed' },
      order: { created_at: 'DESC' }
    });
  }

  async findDeliveriesByArea(latitude: number, longitude: number, radiusKm: number): Promise<Delivery[]> {
    // Using Haversine formula to calculate distance
    return this.repository.createQueryBuilder('delivery')
      .where('delivery.delivery_latitude IS NOT NULL')
      .andWhere('delivery.delivery_longitude IS NOT NULL')
      .andWhere(`
        (6371 * acos(
          cos(radians(:latitude)) * 
          cos(radians(delivery.delivery_latitude)) * 
          cos(radians(delivery.delivery_longitude) - radians(:longitude)) + 
          sin(radians(:latitude)) * 
          sin(radians(delivery.delivery_latitude))
        )) <= :radius`, 
        { latitude, longitude, radius: radiusKm }
      )
      .orderBy('delivery.created_at', 'DESC')
      .getMany();
  }

  async updateDeliveryStatus(id: number, status: string, additionalData: Partial<Delivery> = {}): Promise<Delivery | null> {
    const delivery = await this.repository.findOne({ where: { id } });
    if (!delivery) return null;

    Object.assign(delivery, { status, ...additionalData });
    return this.repository.save(delivery);
  }

  async incrementDeliveryAttempts(id: number, failureReason?: string): Promise<Delivery | null> {
    const delivery = await this.repository.findOne({ where: { id } });
    if (!delivery) return null;

    delivery.delivery_attempts += 1;
    if (failureReason) {
      delivery.failure_reason = failureReason;
    }

    return this.repository.save(delivery);
  }

  async updateDeliveryLocation(id: number, latitude: number, longitude: number): Promise<Delivery | null> {
    const delivery = await this.repository.findOne({ where: { id } });
    if (!delivery) return null;

    delivery.delivery_latitude = latitude;
    delivery.delivery_longitude = longitude;

    return this.repository.save(delivery);
  }
} 