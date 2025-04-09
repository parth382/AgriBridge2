import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  order_item_id!: number;

  @Column()
  order_id!: number;

  @Column()
  product_id!: number;

  @Column()
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  // Relationships
  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @ManyToOne(() => Product, product => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  product!: Product;
} 