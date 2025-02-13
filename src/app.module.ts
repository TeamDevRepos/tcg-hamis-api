import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxesModule } from './boxes/boxes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb+srv://diegodevcg:VxkEBzrMDncBTtqG@tcg-hamis-api.4ddca.mongodb.net/tcg-hamis-db'),
    CardsModule,
    BoxesModule,
  ],
})
export class AppModule {}
