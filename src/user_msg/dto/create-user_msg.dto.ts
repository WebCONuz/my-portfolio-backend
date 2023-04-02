import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserMsgDto {
  @ApiProperty({ example: 'Axmat', description: 'User firstname' })
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @ApiProperty({
    example: 'Dolimov',
    description: 'User lastname',
  })
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '99-123-45-67', description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({ example: '99-123-45-67', description: 'User message' })
  @IsString()
  @IsNotEmpty()
  readonly message: string;
}
