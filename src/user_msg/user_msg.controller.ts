import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserMsg } from './entity/user_msg.entity';
import { CreateUserMsgDto } from './dto/create-user_msg.dto';
import { UpdateUserMsgDto } from './dto/update-user_msg.dto';
import { UserMsgService } from './user_msg.service';

@Controller('msg')
@ApiTags('UserMsg')
export class UserMsgController {
  constructor(private readonly userMsgService: UserMsgService) {}

  // Create UserMsg Controller
  @ApiOperation({ summary: 'Create UserMsg' })
  @ApiResponse({ status: 201, type: UserMsg })
  @Post()
  create(@Body() createBody: CreateUserMsgDto) {
    return this.userMsgService.create(createBody);
  }

  // Get all UserMsg Controller
  @ApiOperation({ summary: 'Get all UserMsg' })
  @ApiResponse({ status: 200, type: [UserMsg] })
  @Get()
  getAll() {
    return this.userMsgService.getAll();
  }

  // Get one UserMsg Controller
  @ApiOperation({ summary: 'Get one UserMsg' })
  @ApiResponse({ status: 200, type: UserMsg })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userMsgService.getOne(+id);
  }

  // Update UserMsg Controller
  @ApiOperation({ summary: 'Update UserMsg' })
  @ApiResponse({ status: 200, type: UserMsg })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateUserMsgDto) {
    return this.userMsgService.update(+id, updateBody);
  }

  // Delete UserMsg Controller
  @ApiOperation({ summary: 'Delete UserMsg' })
  @ApiResponse({ status: 200, type: UserMsg })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userMsgService.delete(+id);
  }
}
