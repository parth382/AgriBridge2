import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';
import { Logistics } from './Logistics';
import { Farm } from './Farm';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  COMPLETED = "COMPLETED"
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column()
  consumer_id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount!: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status!: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  payment_status!: PaymentStatus;

  @Column({ type: 'text' })
  shipping_address!: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'consumer_id' })
  consumer!: User;

  @Column()
  user_id!: number;

  // @ManyToOne(() => Farm, farm => farm.orders)
  // @JoinColumn({ name: 'farm_id' })
  // farm!: Farm;

@Column()
farm_id: number;

@ManyToOne(() => Farm, farm => farm.orders)
@JoinColumn({ name: 'farm_id' }) // optional, if you want to control the column name
farm!: Farm;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems!: OrderItem[];

  @OneToOne(() => Logistics, logistics => logistics.order)
  logistics!: Logistics;
    user: any;
} 