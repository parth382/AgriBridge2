import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Order } from './Order';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id' })
  user_id!: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'order_id' })
  order_id!: number;

  @ManyToOne(() => Order, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ default: 'usd' })
  currency!: string;

  @Column({ default: 'pending' })
  status!: string;

  @Column({ type:'json' , name: 'stripe_payment_id', nullable: true })
  stripe_payment_id!: string | null;

  @Column({ type:'json', name: 'payment_method', nullable: true })
  payment_method!: string | null;

  @Column({ name: 'payment_details', type: 'text', nullable: true })
  payment_details!: string | null;

  @Column({ type : 'json',name: 'refund_reason', nullable: true })
  refund_reason!: string | null;

  @Column({ name: 'refunded_amount', type: 'decimal', precision: 10, scale: 2, nullable: true })
  refunded_amount!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
} 