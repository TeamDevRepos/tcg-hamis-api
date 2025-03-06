import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxesModule } from './boxes/boxes.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.DB_HOST || ''),
    CardsModule,
    BoxesModule,
    AuthModule,
    CommonModule,
  ],
})
export class AppModule {}
