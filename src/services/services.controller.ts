import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateServicesDto } from './dto/create-services.dto';
import { Services } from './entity/services.entity';
import { ServicesService } from './services.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateServicesDto } from './dto/update-services.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Create Services Controller
  @ApiOperation({ summary: 'Create Services' })
  @ApiResponse({ status: 201, type: Services })
  @Post()
  @UseInterceptors(FileInterceptor('service_img'))
  create(@Body() createBody: CreateServicesDto, @UploadedFile() service_img) {
    return this.servicesService.create(createBody, service_img);
  }

  // Get all Services Controller
  @ApiOperation({ summary: 'Get all Services' })
  @ApiResponse({ status: 200, type: [Services] })
  @Get()
  getAll() {
    return this.servicesService.getAll();
  }

  // Get one Services Controller
  @ApiOperation({ summary: 'Get one Services' })
  @ApiResponse({ status: 200, type: Services })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.servicesService.getOne(+id);
  }

  // Update Services Controller
  @ApiOperation({ summary: 'Update Services' })
  @ApiResponse({ status: 200, type: Services })
  @Put(':id')
  @UseInterceptors(FileInterceptor('service_img'))
  update(
    @Param('id') id: number,
    @Body() updateBody: UpdateServicesDto,
    @UploadedFile() service_img,
  ) {
    return this.servicesService.update(+id, updateBody, service_img);
  }

  // Delete Services Controller
  @ApiOperation({ summary: 'Delete Services' })
  @ApiResponse({ status: 200, type: Services })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.servicesService.delete(+id);
  }
}
