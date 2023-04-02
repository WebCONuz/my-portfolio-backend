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
import { Work } from './entity/work.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { WorkService } from './work.service';

@Controller('work')
@ApiTags('Work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  // Create Work Controller
  @ApiOperation({ summary: 'Create Work' })
  @ApiResponse({ status: 201, type: Work })
  @Post()
  create(@Body() createBody: CreateWorkDto) {
    return this.workService.create(createBody);
  }

  // Get all Work Controller
  @ApiOperation({ summary: 'Get all Work' })
  @ApiResponse({ status: 200, type: [Work] })
  @Get()
  getAll() {
    return this.workService.getAll();
  }

  // Get one Work Controller
  @ApiOperation({ summary: 'Get one Work' })
  @ApiResponse({ status: 200, type: Work })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.workService.getOne(+id);
  }

  // Update Work Controller
  @ApiOperation({ summary: 'Update Work' })
  @ApiResponse({ status: 200, type: Work })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateWorkDto) {
    return this.workService.update(+id, updateBody);
  }

  // Delete Work Controller
  @ApiOperation({ summary: 'Delete Work' })
  @ApiResponse({ status: 200, type: Work })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.workService.delete(+id);
  }
}
