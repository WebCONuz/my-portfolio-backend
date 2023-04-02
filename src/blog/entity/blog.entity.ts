import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface BlogCreationAttr {
  title: string;
  description: string;
  lang: string;
  link: string;
  image_url: string;
  image_name: string;
}

@Table({ tableName: 'blog' })
export class Blog extends Model<Blog, BlogCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'About VueX', description: 'Blog title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor ...',
    description: 'Blog description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'https://maqola.uz/AscsW34',
    description: 'Link to Blog article',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;

  @ApiProperty({ example: 'uz', description: 'Blog language' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lang: string;

  @ApiProperty({
    example: 'true',
    description: 'Blog active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: '/static/images/vuex.png',
    description: 'Blog image url',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @ApiProperty({
    example: 'vuex.png',
    description: 'Blog image name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_name: string;
}
