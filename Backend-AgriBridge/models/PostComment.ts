import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { CommunityPost } from './CommunityPost';
import { CommentLike } from './CommentLike';

@Entity('post_comments')
export class PostComment {
  @PrimaryGeneratedColumn()
  comment_id!: number;

  @Column()
  post_id!: number;

  @Column()
  user_id!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ default: 0 })
  likes_count!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // Relationships
  @ManyToOne(() => CommunityPost, post => post.comments)
  @JoinColumn({ name: 'post_id' })
  post!: CommunityPost;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => CommentLike, like => like.comment)
  likes!: CommentLike[];
    author: any;
} 