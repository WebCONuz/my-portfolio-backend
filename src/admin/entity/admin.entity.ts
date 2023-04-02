import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminCreationAttr {
  full_name: string;
  email: string;
  passsword: string;
  lang: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Saidaxmad Mirsaidov',
    description: 'Admin fullname',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Admin email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'qwer1234',
    description: 'Admin password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passsword: string;

  @ApiProperty({
    example: 'false',
    description: 'Admin is_creator',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: 'Lorem ipsum ...',
    description: 'Description',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({ example: 'uz', description: 'Admin language' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lang: string;
}
