import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
