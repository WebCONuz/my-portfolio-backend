import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PortfolioCreationAttr {
  title: string;
  image_url: string;
  portfolio_link: string;
  description: string;
  lang: string;
  company: string;
  image_name: string;
}

@Table({ tableName: 'portfolio' })
export class Portfolio extends Model<Portfolio, PortfolioCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Buyuk Bilim web site',
    description: 'Portfolio title',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'Portfolio description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'https://buyuk-bilim.uz',
    description: 'Link to Portfolio',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  portfolio_link: string;

  @ApiProperty({
    example: 'https://github.com/AscsW34',
    description: 'Link to Portfolio article',
  })
  @Column({
    type: DataType.STRING,
  })
  github_link: string;

  @ApiProperty({ example: 'uz', description: 'Portfolio language' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lang: string;

  @ApiProperty({
    example: 'true',
    description: 'Portfolio active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: '"Buyuk Bilim" education center',
    description: 'For which company',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  company: string;

  @ApiProperty({
    example: '/static/images/portfolio1.png',
    description: 'Portfolio image url',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @ApiProperty({
    example: 'portfolio1.png',
    description: 'Portfolio image name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_name: string;
}
