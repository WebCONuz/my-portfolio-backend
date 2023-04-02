import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserMsgCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  send_date: Date;
}

@Table({ tableName: 'user_message' })
export class UserMsg extends Model<UserMsg, UserMsgCreationAttr> {
  @ApiProperty({ example: 'Axmat', description: 'User firstname' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Dolimov',
    description: 'User lastname',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'UserMsg description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '99-123-45-67', description: 'User phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: 'true',
    description: 'UserMsg active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({ example: '99-123-45-67', description: 'User message' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @ApiProperty({
    example: '12.12.2031',
    description: 'Message date',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  send_date: Date;
}
