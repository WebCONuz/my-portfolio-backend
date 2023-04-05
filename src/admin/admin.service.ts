import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entity/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { Token } from 'src/common/types';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private jwtService: JwtService,
  ) {}

  // Signup Admin Service
  async signup(authBody: CreateAdminDto) {
    try {
      const condidate = await this.adminRepository.findOne({
        where: { email: authBody.email },
      });
      if (condidate) {
        throw new BadRequestException('Bunday admin bazada mavjud');
      }

      const hashedPassword = await bcrypt.hash(authBody.password, 7);
      const newAdmin = await this.adminRepository.create({
        ...authBody,
        password: hashedPassword,
      });

      return newAdmin;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Signin Admin Service
  async signin(authBody: LoginAdminDto, res: Response): Promise<Token> {
    try {
      const admin = await this.adminRepository.findOne({
        where: { email: authBody.email },
      });
      if (!admin) {
        throw new BadRequestException('Login1 yoki parol xato!');
      }

      // Compare two Passwords
      const passwordMatches = await bcrypt.compare(
        authBody.password,
        admin.password,
      );
      if (!passwordMatches) {
        throw new BadRequestException('Login yoki parol1 xato!');
      }

      // Generate Access & Refresh Tokens
      const tokenObj = await this.getToken(
        admin.id,
        admin.email,
        admin.is_creator,
      );

      // Write Refresh Token to Cookie
      res.cookie('access_token', tokenObj.access_token, {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      });

      return tokenObj;
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

  // Access Token Generator
  async getToken(
    id: number,
    email: string,
    is_creator: boolean,
  ): Promise<Token> {
    // Create Payload
    const jwtPayload = {
      sub: id,
      email,
      is_creator,
      is_admin: true,
    };

    // Create Access & Refresh Token
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    return {
      access_token: accessToken,
      expired_time: process.env.ACCESS_TOKEN_TIME,
    };
  }
}
