import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServicesDto } from './dto/create-services.dto';
import { Services } from './entity/services.entity';
import { FilesService } from '../files/files.service';
import { UpdateServicesDto } from './dto/update-services.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services) private servicesRepository: typeof Services,
    private readonly filesService: FilesService,
  ) {}

  // Create Services Service
  async create(createBody: CreateServicesDto, image: any) {
    try {
      const fileName = await this.filesService.createImage(image);
      const imgUrl = process.env.API_URL + '/images/' + fileName;
      return await this.servicesRepository.create({
        ...createBody,
        image_url: imgUrl,
        image_name: fileName,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Services Service
  async getAll() {
    try {
      return await this.servicesRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Services by Id Service
  async getOne(id: number) {
    try {
      const data = await this.servicesRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!data) {
        return new BadRequestException('Bunday service mavjud emas');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Services Service
  async update(id: number, updateBody: UpdateServicesDto, file: any) {
    try {
      const oldService = await this.servicesRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!oldService) {
        throw new BadRequestException('Bunday service mavjud emas');
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
        return await this.servicesRepository.update(
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

      return this.servicesRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Services Service
  async delete(id: number) {
    try {
      const delService = await this.servicesRepository.findOne({
        where: { id },
        include: { all: true },
      });
      const imgName = delService.image_name;
      fs.unlinkSync(path.join(__dirname, '../', '/static', '/images', imgName));

      return await this.servicesRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
