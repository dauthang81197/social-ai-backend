import { AbstractEntityWithAudit } from 'src/database';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('notifications')
export class NotificationEntity extends AbstractEntityWithAudit {
  @Column()
  type: string; // like, comment, friend_request

  @Column()
  content: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ default: false, name: 'is_read' })
  isRead: boolean;
}
