import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { Work } from './entity/work.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Work])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
