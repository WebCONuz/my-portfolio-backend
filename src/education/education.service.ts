import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Education } from './entity/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education) private educationRepository: typeof Education,
  ) {}

  // Create Education Education
  async create(createBody: CreateEducationDto) {
    try {
      return await this.educationRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Education Education
  async getAll() {
    try {
      return await this.educationRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Education by Id Education
  async getOne(id: number) {
    try {
      const data = await this.educationRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!data) {
        return new BadRequestException('Bunday education mavjud emas');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Education Education
  async update(id: number, updateBody: UpdateEducationDto) {
    try {
      const oldEducation = await this.educationRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!oldEducation) {
        throw new BadRequestException('Bunday education mavjud emas');
      }

      return this.educationRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Education Education
  async delete(id: number) {
    try {
      return await this.educationRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
