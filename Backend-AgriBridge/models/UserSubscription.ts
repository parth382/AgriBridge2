import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { SubscriptionPlan } from './SubscriptionPlan';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

@Entity('user_subscriptions')
export class UserSubscription {
  @PrimaryGeneratedColumn()
  subscription_id!: number;

  @Column()
  user_id!: number;

  @Column()
  plan_id!: number;

  @Column({ type: 'date' })
  start_date!: Date;

  @Column({ type: 'date' })
  end_date!: Date;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE
  })
  status!: SubscriptionStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @ManyToOne(() => User, user => user.subscriptions)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => SubscriptionPlan, plan => plan.subscriptions)
  @JoinColumn({ name: 'plan_id' })
  plan!: SubscriptionPlan;
}