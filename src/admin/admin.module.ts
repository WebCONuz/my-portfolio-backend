import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entity/admin.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
