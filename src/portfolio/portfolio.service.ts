import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Portfolio } from './entity/portfolio.entity';
import { FilesService } from '../files/files.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio) private portfolioRepository: typeof Portfolio,
    private readonly filesService: FilesService,
  ) {}

  // Create Portfolio Service
  async create(createBody: CreatePortfolioDto, image: any) {
    try {
      const fileName = await this.filesService.createImage(image);
      const imgUrl = process.env.API_URL + '/images/' + fileName;
      return await this.portfolioRepository.create({
        ...createBody,
        image_url: imgUrl,
        image_name: fileName,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Portfolio Service
  async getAll() {
    try {
      return await this.portfolioRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Portfolio by Id Service
  async getOne(id: number) {
    try {
      const data = await this.portfolioRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!data) {
        return new BadRequestException('Bunday portfolio mavjud emas');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Portfolio Service
  async update(id: number, updateBody: UpdatePortfolioDto, file: any) {
    try {
      const oldService = await this.portfolioRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!oldService) {
        throw new BadRequestException('Bunday portfolio mavjud emas');
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
        return await this.portfolioRepository.update(
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

      return this.portfolioRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Portfolio Service
  async delete(id: number) {
    try {
      const delService = await this.portfolioRepository.findOne({
        where: { id },
        include: { all: true },
      });
      const imgName = delService.image_name;
      fs.unlinkSync(path.join(__dirname, '../', '/static', '/images', imgName));

      return await this.portfolioRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
