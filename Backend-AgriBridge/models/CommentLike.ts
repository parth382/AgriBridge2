import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './User';
import { PostComment } from './PostComment';

@Entity('comment_likes')
@Index(['comment_id', 'user_id'], { unique: true })
export class CommentLike {
    @PrimaryGeneratedColumn()
    like_id!: number;

    @Column()
    comment_id!: number;

    @Column()
    user_id!: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    // Relationships
    @ManyToOne(() => PostComment, comment => comment.likes)
    @JoinColumn({ name: 'comment_id' })
    comment!: PostComment;

    @ManyToOne(() => User, user => user.commentLikes)
    @JoinColumn({ name: 'user_id' })
    user!: User;
} 