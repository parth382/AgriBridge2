import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Farm } from './Farm';
import { OrderItem } from './OrderItem';
import { QRTraceability } from './QRTraceability';
import { Review } from './Review';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  farm_id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ length: 100 })
  category!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ length: 20 })
  unit!: string;

  @Column()
  stock_quantity!: number;

  @Column({ default: false })
  is_organic!: boolean;

  @Column({ type: 'date', nullable: true })
  harvest_date!: Date;

  @Column({ type: 'date', nullable: true })
  expiry_date!: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date;

  // Relationships
  @ManyToOne(() => Farm, farm => farm.products)
  @JoinColumn({ name: 'farm_id' })
  farm!: Farm;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems!: OrderItem[];

  @OneToOne(() => QRTraceability, qrTraceability => qrTraceability.product)
  qrTraceability!: QRTraceability;

  @OneToMany(() => Review, review => review.product)
  reviews!: Review[];
} 