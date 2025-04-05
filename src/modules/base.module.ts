import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthCheckerModule } from './health-checker/health-checker.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { FriendModule } from './friend/friend.module';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

export const BASE_PLATFORM_IMPORTS = [
  HealthCheckerModule,
  UserModule,
  PostModule,
  CommentModule,
  LikeModule,
  FriendModule,
  NotificationModule,
  MessageModule,
  RolesModule,
  PermissionsModule,
];
@Module({
  imports: [...BASE_PLATFORM_IMPORTS],
  providers: [
    //   {
    //     provide: APP_INTERCEPTOR,
    //     useClass: ActivityLogInterceptor,
    //   },
  ],
})
export class BaseModule {}
