import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Education } from './entity/education.entity';

@Module({
  imports: [SequelizeModule.forFeature([Education])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
