import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Farm } from './Farm';

@Entity('farmer_profiles')
export class FarmerProfile {
  @PrimaryGeneratedColumn()
  farmer_id!: number;

  @Column()
  user_id!: number;

  @Column({ length: 255 })
  farm_name!: string;

  @Column({ type: 'integer', nullable: true })
  farming_experience_years!: number | null;

  @Column('text', { array: true, nullable: true })
  farming_methods!: string[] | null;

  @Column({ default: false })
  organic_certification_status!: boolean;

  @Column({ type: 'varchar', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website_url!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  social_media_links!: Record<string, string> | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @ManyToOne(() => User, user => user.farmerProfile)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Farm, farm => farm.farmer)
  farms!: Farm[];
}
