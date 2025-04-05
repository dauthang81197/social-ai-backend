import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { FriendEntity } from './friend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FriendEntity])],
  providers: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
