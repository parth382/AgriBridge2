import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Order } from './Order';
import { Product } from './Product';
import { Review } from './Review';
import { FarmerProfile } from './FarmerProfile';
import { AuditLog } from './AuditLog';
import { CommunityPost } from './CommunityPost';
import { PostComment } from './PostComment';
import { PostLike } from './PostLike';
import { CommentLike } from './CommentLike';
import { UserSubscription } from './UserSubscription';
import { AdminTask } from './AdminTask';
import { FeedbackSurvey } from './FeedbackSurvey';
import { json } from 'stream/consumers';

export enum UserType {
    CONSUMER = 'consumer',
    FARMER = 'farmer',
    ADMIN = 'admin'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ type: 'json', nullable: true })
    resetToken: string | null;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiry: Date | null;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.CONSUMER
    })
    userType: UserType;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isAdmin: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => FarmerProfile, farmerProfile => farmerProfile.user)
    farmerProfile: FarmerProfile;

    @OneToMany(() => Order, order => order.consumer)
    orders: Order[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @OneToMany(() => AuditLog, auditLog => auditLog.user)
    auditLogs: AuditLog[];

    @OneToMany(() => CommunityPost, post => post.user)
    communityPosts: CommunityPost[];

    @OneToMany(() => PostComment, comment => comment.user)
    comments: PostComment[];

    @OneToMany(() => PostLike, like => like.user)
    postLikes: PostLike[];

    @OneToMany(() => CommentLike, like => like.user)
    commentLikes: CommentLike[];

    @OneToMany(() => AdminTask, task => task.user)
    adminTasks: AdminTask[];

    @OneToMany(() => FeedbackSurvey, survey => survey.user)
    surveys: FeedbackSurvey[];

    @OneToMany(() => UserSubscription, subscription => subscription.user)
    subscriptions: UserSubscription[];

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'user_favorites',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        }
    })
    favorites: Product[];
}