import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './entity/blog.entity';
import { FilesService } from '../files/files.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog) private blogRepository: typeof Blog,
    private readonly filesService: FilesService,
  ) {}

  // Create Blog Service
  async create(createBody: CreateBlogDto, image: any) {
    try {
      const fileName = await this.filesService.createImage(image);
      const imgUrl = process.env.API_URL + '/images/' + fileName;
      return await this.blogRepository.create({
        ...createBody,
        image_url: imgUrl,
        image_name: fileName,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Blog Service
  async getAll() {
    try {
      return await this.blogRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Blog by Id Service
  async getOne(id: number) {
    try {
      const data = await this.blogRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!data) {
        return new BadRequestException('Bunday blog mavjud emas');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Blog Service
  async update(id: number, updateBody: UpdateBlogDto, file: any) {
    try {
      const oldService = await this.blogRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!oldService) {
        throw new BadRequestException('Bunday blog mavjud emas');
      }

      if (file) {
        // Delete old file & Create new file
        const imgName = oldService.image_name;
        fs.unlinkSync(
          path.join(__dirname, '../', '/static', '/images', imgName),
        );

        let fileName: string;
        fileName = await this.filesService.createImage(file);

        // Create new Service
        return await this.blogRepository.update(
          {
            ...updateBody,
            image_url: process.env.API_URL + '/images/' + fileName,
            image_name: fileName,
          },
          {
            where: { id },
            returning: true,
          },
        );
      }

      return this.blogRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Blog Service
  async delete(id: number) {
    try {
      const delService = await this.blogRepository.findOne({
        where: { id },
        include: { all: true },
      });
      const imgName = delService.image_name;
      fs.unlinkSync(path.join(__dirname, '../', '/static', '/images', imgName));

      return await this.blogRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
