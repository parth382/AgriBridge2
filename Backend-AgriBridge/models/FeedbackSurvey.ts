import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('feedback_surveys')
export class FeedbackSurvey {
  @PrimaryGeneratedColumn()
  survey_id!: number;

  @Column()
  user_id!: number;

  @Column({ length: 100 })
  survey_type!: string;

  @Column({ type: 'jsonb' })
  responses!: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @ManyToOne(() => User, user => user.surveys)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}