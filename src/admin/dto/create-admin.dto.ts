import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'Saidaxmad Mirsaidov',
    description: 'Admin fullname',
  })
  @IsString()
  @IsNotEmpty()
  readonly full_name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Admin email',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'qwer1234',
    description: 'Admin password',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: 'false',
    description: 'Admin is_creator',
  })
  @IsBoolean()
  @IsOptional()
  readonly is_creator: boolean;

  @ApiProperty({
    example: 'Lorem ipsum ...',
    description: 'Description',
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ example: 'en', description: 'Admin language' })
  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}
