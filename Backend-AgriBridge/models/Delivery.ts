import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Order } from './Order';

@Entity('deliveries')
export class Delivery {
  update(data: Partial<Delivery>): Delivery | PromiseLike<Delivery> {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'order_id', type: 'integer' })
  order_id!: number;

  @ManyToOne(() => Order, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ name: 'delivery_person_id', nullable: true })
  delivery_person_id!: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'delivery_person_id' })
  delivery_person!: User | null;

  @Column()
  status!: string;

  @Column({ type: 'text', nullable: true })
  tracking_number!: string | null;

  @Column({ type: 'text', nullable: true })
  tracking_url!: string | null;

  @Column({ type: 'text' })
  delivery_address!: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  delivery_latitude!: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  delivery_longitude!: number | null;

  @Column({ type: 'text', nullable: true })
  delivery_notes!: string | null;

  @Column({ name: 'estimated_delivery_date', type: 'timestamp', nullable: true })
  estimated_delivery_date!: Date | null;

  @Column({ name: 'actual_delivery_date', type: 'timestamp', nullable: true })
  actual_delivery_date!: Date | null;

  @Column({ name: 'delivery_attempts', default: 0 })
  delivery_attempts!: number;

  @Column({ type: 'text', nullable: true })
  failure_reason!: string | null;

  @Column({ type:'json',name: 'recipient_name', nullable: true })
  recipient_name!: string | null;

  @Column({ type:'json',name: 'recipient_phone', nullable: true })
  recipient_phone!: string | null;

  @Column({ name: 'proof_of_delivery', type: 'text', nullable: true })
  proof_of_delivery!: string | null;

  @Column({ name: 'signature_required', default: false })
  signature_required!: boolean;

  @Column({ name: 'signature_image', type: 'text', nullable: true })
  signature_image!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at!: Date;
}