import { Module } from '@nestjs/common';
import { UserMsgController } from './user_msg.controller';
import { UserMsgService } from './user_msg.service';
import { UserMsg } from './entity/user_msg.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([UserMsg])],
  controllers: [UserMsgController],
  providers: [UserMsgService],
})
export class UserMsgModule {}
