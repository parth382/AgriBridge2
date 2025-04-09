import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './Product';

@Entity('qr_traceability')
export class QRTraceability {
  @PrimaryGeneratedColumn()
  qr_id!: number;

  @Column()
  product_id!: number;

  @Column({ length: 255 })
  qr_code_url!: string;

  @Column({ length: 100, nullable: true })
  batch_number!: string;

  @Column({ type: 'date', nullable: true })
  production_date!: Date;

  @Column({ type: 'date', nullable: true })
  expiry_date!: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @OneToOne(() => Product, product => product.qrTraceability)
  @JoinColumn({ name: 'product_id' })
  product!: Product;
} 