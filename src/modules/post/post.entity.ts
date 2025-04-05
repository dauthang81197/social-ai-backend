import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comment/comment.entity';
import { AbstractEntityWithAudit } from 'src/database';

@Entity('posts')
export class PostEntity extends AbstractEntityWithAudit {
  @Column()
  content: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
