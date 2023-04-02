import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({
    example: 'TATU Samarkand branch',
    description: 'Place of study',
  })
  @IsString()
  @IsNotEmpty()
  readonly study_place: string;

  @ApiProperty({
    example: 'Software engineering',
    description: 'Faculty',
  })
  @IsString()
  @IsNotEmpty()
  readonly faculty: string;

  @ApiProperty({
    example: 'Bachelor, student',
    description: 'Education position',
  })
  @IsString()
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({
    example: 'Sep 2018',
    description: 'Start time of education',
  })
  @IsString()
  @IsNotEmpty()
  readonly start_time: string;

  @ApiProperty({
    example: 'June 2022',
    description: 'Start time of education',
  })
  @IsString()
  @IsNotEmpty()
  readonly end_time: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'About education',
  })
  @IsString()
  @IsNotEmpty()
  readonly about_text: string;

  @ApiProperty({ example: 'en', description: 'Education language' })
  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}
