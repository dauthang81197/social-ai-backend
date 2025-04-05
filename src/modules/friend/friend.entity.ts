import { AbstractEntityWithAudit } from 'src/database';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('friends')
export class FriendEntity extends AbstractEntityWithAudit {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'requester_id' })
  requester: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'recipient_id' })
  recipient: UserEntity;
}
