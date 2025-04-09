import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  audit_id!: number;

  @Column()
  user_id!: number;

  @Column({ length: 100 })
  action_type!: string;

  @Column({ length: 100 })
  entity_type!: string;

  @Column()
  entity_id!: number;

  @Column({ type: 'jsonb', nullable: true })
  action_details!: Record<string, any>;

  @Column({ length: 45, nullable: true })
  ip_address!: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  // Relationships
  @ManyToOne(() => User, user => user.auditLogs)
  @JoinColumn({ name: 'user_id' })
  user!: User;
} 