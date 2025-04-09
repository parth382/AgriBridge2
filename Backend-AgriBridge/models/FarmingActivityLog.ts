import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Farm } from './Farm';

@Entity('farming_activity_logs')
export class FarmingActivityLog {
  @PrimaryGeneratedColumn()
  activity_id!: number;

  @Column()
  farm_id!: number;

  @Column({ length: 100 })
  activity_type!: string;

  @Column({ type: 'date' })
  activity_date!: Date;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'jsonb', nullable: true })
  input_materials!: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  weather_conditions!: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @ManyToOne(() => Farm, farm => farm.activityLogs)
  @JoinColumn({ name: 'farm_id' })
  farm!: Farm;
} 