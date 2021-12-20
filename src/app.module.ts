import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { ProductModule } from './api/product/product.module';
import { PhotoModule } from './api/photo/photo.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './core/config/configuration';
import { SocialsModule } from './api/socials/socials.module';
import { CategoryModule } from './api/category/category.module';
import { PortfolioModule } from './api/portfolio/portfolio.module';
import { EventsModule } from './events/events.module';
import { IntroductionModule } from './api/introduction/introduction.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT') ?? 3306,
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),

    MulterModule.register({
      dest: './tmp',
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    ProductModule,
    PortfolioModule,
    PhotoModule,
    SocialsModule,
    CategoryModule,
    EventsModule,
    IntroductionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
