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
import { Blog } from './entity/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Create Blog Controller
  @ApiOperation({ summary: 'Create Blog' })
  @ApiResponse({ status: 201, type: Blog })
  @Post()
  @UseInterceptors(FileInterceptor('blog_img'))
  create(@Body() createBody: CreateBlogDto, @UploadedFile() blog_img) {
    return this.blogService.create(createBody, blog_img);
  }

  // Get all Blog Controller
  @ApiOperation({ summary: 'Get all Blog' })
  @ApiResponse({ status: 200, type: [Blog] })
  @Get()
  getAll() {
    return this.blogService.getAll();
  }

  // Get one Blog Controller
  @ApiOperation({ summary: 'Get one Blog' })
  @ApiResponse({ status: 200, type: Blog })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.blogService.getOne(+id);
  }

  // Update Blog Controller
  @ApiOperation({ summary: 'Update Blog' })
  @ApiResponse({ status: 200, type: Blog })
  @Put(':id')
  @UseInterceptors(FileInterceptor('blog_img'))
  update(
    @Param('id') id: number,
    @Body() updateBody: UpdateBlogDto,
    @UploadedFile() blog_img,
  ) {
    return this.blogService.update(+id, updateBody, blog_img);
  }

  // Delete Blog Controller
  @ApiOperation({ summary: 'Delete Blog' })
  @ApiResponse({ status: 200, type: Blog })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.blogService.delete(+id);
  }
}
