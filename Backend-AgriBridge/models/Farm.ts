import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { FarmerProfile } from './FarmerProfile';
import { Product } from './Product';
import { FarmingActivityLog } from './FarmingActivityLog';
import { Order } from './Order';

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn()
  farm_id!: number;

  @Column()
  farmer_id!: number;

  @Column({ length: 255 })
  farm_name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  location_lat!: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  location_lng!: number;

  @Column({ type: 'text' })
  address!: string;

  @OneToMany(() => Order, order => order.farm)
  orders: Order[];

  @Column({ type: 'boolean', default: false })
  organic_certification_status: boolean;


  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_area!: number;

  @Column({ length: 20, nullable: true })
  area_unit!: string;

  @Column({ length: 100, nullable: true })
  soil_type!: string;

  @Column({ length: 100, nullable: true })
  water_source!: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @ManyToOne(() => FarmerProfile, farmer => farmer.farms)
  @JoinColumn({ name: 'farmer_id' })
  farmer!: FarmerProfile;

  @OneToMany(() => Product, product => product.farm)
  products!: Product[];

  @OneToMany(() => FarmingActivityLog, activityLog => activityLog.farm)
  activityLogs!: FarmingActivityLog[];
  
  // @OneToMany(() => Order, order => order.farm)
  // orders!: Order[];
}