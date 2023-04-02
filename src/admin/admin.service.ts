import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entity/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}

  // Create Admin Admin
  async create(createBody: CreateAdminDto) {
    try {
      return await this.adminRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Admin Admin
  async getAll() {
    try {
      return await this.adminRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Admin by Id Admin
  async getOne(id: number) {
    try {
      const data = await this.adminRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!data) {
        return new BadRequestException('Bunday admin mavjud emas');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Admin Admin
  async update(id: number, updateBody: UpdateAdminDto) {
    try {
      const oldAdmin = await this.adminRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!oldAdmin) {
        throw new BadRequestException('Bunday admin mavjud emas');
      }

      return this.adminRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Admin Admin
  async delete(id: number) {
    try {
      return await this.adminRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
