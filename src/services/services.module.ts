import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Services } from './entity/services.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Services]), FilesModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
