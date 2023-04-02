import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'About VueX', description: 'Blog title' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'Blog description',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: 'https://maqola.uz/AscsW34',
    description: 'Link to Blog article',
  })
  @IsString()
  @IsNotEmpty()
  readonly link: string;

  @ApiProperty({ example: 'en', description: 'Blog language' })
  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}
