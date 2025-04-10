import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product';
import { User } from './User';
import { FarmerProfile } from './FarmerProfile';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column()
  product_id!: number;

  @Column()
  user_id!: number;

  @Column()
  farmer_id!: number;

  @Column()
  rating!: number;

  @Column({ type: 'text', nullable: true })
  comment!: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @ManyToOne(() => Product, product => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => FarmerProfile, farmer => farmer.reviews)
  @JoinColumn({ name: 'farmer_id' })
  farmer!: FarmerProfile;
  
}