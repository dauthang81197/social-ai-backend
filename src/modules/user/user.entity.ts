import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';
import { AbstractEntityWithAudit } from 'src/database';
import { RolesEntity } from '../roles/roles.entity';

@Entity('users')
export class UserEntity extends AbstractEntityWithAudit {
  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @ManyToMany(() => RolesEntity)
  @JoinTable({
    name: 'user_role_xref',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RolesEntity[];
}
