import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Work } from './entity/work.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

@Injectable()
export class WorkService {
  constructor(@InjectModel(Work) private workRepository: typeof Work) {}

  // Create Work Work
  async create(createBody: CreateWorkDto) {
    try {
      return await this.workRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Work Work
  async getAll() {
    try {
      return await this.workRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Work by Id Work
  async getOne(id: number) {
    try {
      const data = await this.workRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!data) {
        return new BadRequestException('Bunday work mavjud emas');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Work Work
  async update(id: number, updateBody: UpdateWorkDto) {
    try {
      const oldWork = await this.workRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!oldWork) {
        throw new BadRequestException('Bunday work mavjud emas');
      }

      return this.workRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Work Work
  async delete(id: number) {
    try {
      return await this.workRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
