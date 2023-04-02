import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateServicesDto {
  @ApiProperty({ example: 'Building web app', description: 'Service title' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'Service description',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ example: 'en', description: 'Service language' })
  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}
