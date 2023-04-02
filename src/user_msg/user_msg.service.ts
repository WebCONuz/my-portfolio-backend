import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserMsg } from './entity/user_msg.entity';
import { CreateUserMsgDto } from './dto/create-user_msg.dto';
import { UpdateUserMsgDto } from './dto/update-user_msg.dto';

@Injectable()
export class UserMsgService {
  constructor(
    @InjectModel(UserMsg) private userMsgRepository: typeof UserMsg,
  ) {}

  // Create UserMsg UserMsg
  async create(createBody: CreateUserMsgDto) {
    try {
      const nowDate = new Date();
      return await this.userMsgRepository.create({
        ...createBody,
        send_date: nowDate,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all UserMsg UserMsg
  async getAll() {
    try {
      return await this.userMsgRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one UserMsg by Id UserMsg
  async getOne(id: number) {
    try {
      const data = await this.userMsgRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!data) {
        return new BadRequestException('Bunday userMsg mavjud emas');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update UserMsg UserMsg
  async update(id: number, updateBody: UpdateUserMsgDto) {
    try {
      const oldUserMsg = await this.userMsgRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!oldUserMsg) {
        throw new BadRequestException('Bunday userMsg mavjud emas');
      }

      return this.userMsgRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete UserMsg UserMsg
  async delete(id: number) {
    try {
      return await this.userMsgRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
