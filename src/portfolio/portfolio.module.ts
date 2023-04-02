import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Portfolio } from './entity/portfolio.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Portfolio]), FilesModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
