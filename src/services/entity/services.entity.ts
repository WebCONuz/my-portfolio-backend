import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ServicesCreationAttr {
  title: string;
  description: string;
  lang: string;
  image_url: string;
  image_name: string;
}

@Table({ tableName: 'services' })
export class Services extends Model<Services, ServicesCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Building web app', description: 'Service title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'Service description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 'uz', description: 'Service language' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lang: string;

  @ApiProperty({
    example: 'true',
    description: 'Service active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: '/static/images/crm.png',
    description: 'Service image url',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @ApiProperty({
    example: 'crm.png',
    description: 'Service image name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_name: string;
}
