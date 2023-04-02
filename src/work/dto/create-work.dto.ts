import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWorkDto {
  @ApiProperty({
    example: 'HomeDev',
    description: 'Place of work',
  })
  @IsString()
  @IsNotEmpty()
  readonly work_place: string;

  @ApiProperty({
    example: 'Toshkent',
    description: 'Work address: city',
  })
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({
    example: 'Frontend Dev',
    description: 'Work position',
  })
  @IsString()
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({
    example: 'Sep 2021',
    description: 'Start time of work',
  })
  @IsString()
  @IsNotEmpty()
  readonly start_time: string;

  @ApiProperty({
    example: 'Aug 2022',
    description: 'Start time of work',
  })
  @IsString()
  @IsNotEmpty()
  readonly end_time: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'About work',
  })
  @IsString()
  @IsNotEmpty()
  readonly about_text: string;

  @ApiProperty({ example: 'en', description: 'Work language' })
  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}
