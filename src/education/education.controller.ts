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
import { Education } from './entity/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { EducationService } from './education.service';

@Controller('education')
@ApiTags('Education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  // Create Education Controller
  @ApiOperation({ summary: 'Create Education' })
  @ApiResponse({ status: 201, type: Education })
  @Post()
  create(@Body() createBody: CreateEducationDto) {
    return this.educationService.create(createBody);
  }

  // Get all Education Controller
  @ApiOperation({ summary: 'Get all Education' })
  @ApiResponse({ status: 200, type: [Education] })
  @Get()
  getAll() {
    return this.educationService.getAll();
  }

  // Get one Education Controller
  @ApiOperation({ summary: 'Get one Education' })
  @ApiResponse({ status: 200, type: Education })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.educationService.getOne(+id);
  }

  // Update Education Controller
  @ApiOperation({ summary: 'Update Education' })
  @ApiResponse({ status: 200, type: Education })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateEducationDto) {
    return this.educationService.update(+id, updateBody);
  }

  // Delete Education Controller
  @ApiOperation({ summary: 'Delete Education' })
  @ApiResponse({ status: 200, type: Education })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.educationService.delete(+id);
  }
}
