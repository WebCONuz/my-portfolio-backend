import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface WorkCreationAttr {
  work_place: string;
  position: string;
  city: string;
  start_time: string;
  end_time: string;
  about_text: string;
  lang: string;
}

@Table({ tableName: 'work' })
export class Work extends Model<Work, WorkCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'HomeDev',
    description: 'Place of work',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  work_place: string;

  @ApiProperty({
    example: 'Toshkent',
    description: 'Work address: city',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @ApiProperty({
    example: 'Frontend Dev',
    description: 'Work position',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position: string;

  @ApiProperty({
    example: 'Sep 2021',
    description: 'Start time of work',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty({
    example: 'Aug 2022',
    description: 'Start time of work',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  end_time: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'About work',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  about_text: string;

  @ApiProperty({
    example: 'true',
    description: 'Work active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({ example: 'uz', description: 'Work language' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lang: string;
}
