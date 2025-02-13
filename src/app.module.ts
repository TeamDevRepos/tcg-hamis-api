import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/tcg-hamis-db'),
    CardsModule,
  ],
})
export class AppModule {}
