import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Admin } from './entity/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminService } from './admin.service';
import { Token } from '../common/types';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Create Admin Controller
  @ApiOperation({ summary: 'Create Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post()
  create(@Body() createBody: CreateAdminDto) {
    return this.adminService.signup(createBody);
  }

  // Login Admin Controller
  @ApiOperation({ summary: 'Login Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signin')
  login(
    @Body() createBody: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Token> {
    return this.adminService.signin(createBody, res);
  }

  // Get all Admin Controller
  @ApiOperation({ summary: 'Get all Admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get()
  getAll() {
    return this.adminService.getAll();
  }

  // Get one Admin Controller
  @ApiOperation({ summary: 'Get one Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.adminService.getOne(+id);
  }

  // Update Admin Controller
  @ApiOperation({ summary: 'Update Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateAdminDto) {
    return this.adminService.update(+id, updateBody);
  }

  // Delete Admin Controller
  @ApiOperation({ summary: 'Delete Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.adminService.delete(+id);
  }
}
