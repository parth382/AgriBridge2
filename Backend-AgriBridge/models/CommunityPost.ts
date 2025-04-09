import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { PostComment } from './PostComment';
import { PostLike } from './PostLike';
import { CommentLike } from './CommentLike';
import { Product } from './Product';

@Entity('community_posts')
export class CommunityPost {
  @PrimaryGeneratedColumn()
  post_id!: number;

  @Column()
  user_id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ length: 100 })
  post_type!: string;

  @Column({ default: 0 })
  likes_count!: number;

  @Column({ default: 0 })
  comments_count!: number;

  @Column()
  category!: string;

@Column({ default: false })
isTrending: boolean;


  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
  // Relationships
  @ManyToOne(() => User, (user) => user.communityPosts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => PostComment, (comment) => comment.post, { cascade: true })
  comments!: PostComment[];

  @OneToMany(() => PostLike, like => like.post, { cascade: true })
  likes!: PostLike[];

  @OneToMany(() => CommentLike, like => like.comment, { cascade: true })
  commentLikes!: CommentLike[];

  @ManyToMany(() => Product)
  @JoinTable()
  products!: Product[];
    author: any;
}