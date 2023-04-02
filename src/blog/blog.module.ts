import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './entity/blog.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Blog]), FilesModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
