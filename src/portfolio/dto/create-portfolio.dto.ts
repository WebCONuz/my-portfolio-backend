import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    example: 'Buyuk Bilim web site',
    description: 'Portfolio title',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'Portfolio description',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: 'https://buyuk-bilim.uz',
    description: 'Link to Portfolio',
  })
  @IsString()
  @IsNotEmpty()
  readonly portfolio_link: string;

  @ApiProperty({
    example: 'https://github.com/AscsW34',
    description: 'Github link to Portfolio',
  })
  @IsString()
  @IsOptional()
  readonly github_link: string;

  @ApiProperty({
    example: '"Buyuk Bilim" education center',
    description: 'For which company',
  })
  @IsString()
  @IsNotEmpty()
  readonly company: string;

  @ApiProperty({ example: 'en', description: 'Portfolio language' })
  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}
