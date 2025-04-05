import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';
import { AbstractEntityWithAudit } from 'src/database';

@Entity('comments')
export class CommentEntity extends AbstractEntityWithAudit {
  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    nullable: true,
  })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @Column({ name: 'post_id' })
  postId: number;
}
