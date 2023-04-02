import { ServicesModule } from './services/services.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { MyBotName } from './app.constants';
import { BlogModule } from './blog/blog.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { UserMsgModule } from './user_msg/user_msg.module';
import { EducationModule } from './education/education.module';
import { WorkModule } from './work/work.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // Read environment variables
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    // Telegram Bot
    TelegrafModule.forRootAsync({
      botName: MyBotName,
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN,
        middlewares: [],
        include: [TelegramBotModule],
      }),
    }),

    // Static Folder
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    // Connect to PostgreSQL database
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      // models: [User, UserAddress, Region, District, CreditCard],
      models: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      autoLoadModels: true,
      logging: false,
    }),

    // Custom modules
    ServicesModule,
    TelegramBotModule,
    BlogModule,
    PortfolioModule,
    UserMsgModule,
    EducationModule,
    WorkModule,
    AdminModule,
  ],
})
export class AppModule {}
