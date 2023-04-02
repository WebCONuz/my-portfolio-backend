import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface EducationCreationAttr {
  study_place: string;
  faculty: string;
  position: string;
  start_time: string;
  end_time: string;
  about_text: string;
  lang: string;
}

@Table({ tableName: 'education' })
export class Education extends Model<Education, EducationCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'TATU Samarkand branch',
    description: 'Place of study',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  study_place: string;

  @ApiProperty({
    example: 'Software engineering',
    description: 'Faculty',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  faculty: string;

  @ApiProperty({
    example: 'Bachelor, student',
    description: 'Education position',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position: string;

  @ApiProperty({
    example: 'Sep 2018',
    description: 'Start time of education',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty({
    example: 'June 2022',
    description: 'End time of education',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  end_time: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'About education',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  about_text: string;

  @ApiProperty({
    example: 'true',
    description: 'Education active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({ example: 'uz', description: 'Education language' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lang: string;
}
