import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './User';
import { CommunityPost } from './CommunityPost';

@Entity('post_likes')
@Index(['post_id', 'user_id'], { unique: true })
export class PostLike {
  @PrimaryGeneratedColumn()
  like_id!: number;

  @Column()
  post_id!: number;

  @Column()
  user_id!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  // Relationships
  @ManyToOne(() => CommunityPost, post => post.likes)
  @JoinColumn({ name: 'post_id' })
  post!: CommunityPost;

  @ManyToOne(() => User, user => user.postLikes)
  @JoinColumn({ name: 'user_id' })
  user!: User;
} 