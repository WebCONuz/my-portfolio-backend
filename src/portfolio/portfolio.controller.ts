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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Portfolio } from './entity/portfolio.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
@ApiTags('Portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  // Create Portfolio Controller
  @ApiOperation({ summary: 'Create Portfolio' })
  @ApiResponse({ status: 201, type: Portfolio })
  @Post()
  @UseInterceptors(FileInterceptor('portfolio_img'))
  create(
    @Body() createBody: CreatePortfolioDto,
    @UploadedFile() portfolio_img,
  ) {
    return this.portfolioService.create(createBody, portfolio_img);
  }

  // Get all Portfolio Controller
  @ApiOperation({ summary: 'Get all Portfolio' })
  @ApiResponse({ status: 200, type: [Portfolio] })
  @Get()
  getAll() {
    return this.portfolioService.getAll();
  }

  // Get one Portfolio Controller
  @ApiOperation({ summary: 'Get one Portfolio' })
  @ApiResponse({ status: 200, type: Portfolio })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.portfolioService.getOne(+id);
  }

  // Update Portfolio Controller
  @ApiOperation({ summary: 'Update Portfolio' })
  @ApiResponse({ status: 200, type: Portfolio })
  @Put(':id')
  @UseInterceptors(FileInterceptor('portfolio_img'))
  update(
    @Param('id') id: number,
    @Body() updateBody: UpdatePortfolioDto,
    @UploadedFile() portfolio_img,
  ) {
    return this.portfolioService.update(+id, updateBody, portfolio_img);
  }

  // Delete Portfolio Controller
  @ApiOperation({ summary: 'Delete Portfolio' })
  @ApiResponse({ status: 200, type: Portfolio })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.portfolioService.delete(+id);
  }
}
