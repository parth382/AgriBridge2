import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';

export enum DeliveryStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  FAILED = 'failed'
}

@Entity('logistics')
export class Logistics {
  @PrimaryGeneratedColumn()
  logistics_id!: number;

  @Column()
  order_id!: number;

  @Column({ length: 255, nullable: true })
  delivery_partner!: string;

  @Column({ length: 100, nullable: true })
  tracking_number!: string;

  @Column({ type: 'date', nullable: true })
  estimated_delivery_date!: Date;

  @Column({ type: 'date', nullable: true })
  actual_delivery_date!: Date;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING
  })
  delivery_status!: DeliveryStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @OneToOne(() => Order, order => order.logistics)
  @JoinColumn({ name: 'order_id' })
  order!: Order;
} 