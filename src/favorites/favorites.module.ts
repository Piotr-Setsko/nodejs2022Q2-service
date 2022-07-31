import { Module } from '@nestjs/common';
import { InMemoryDB } from 'src/db';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryDB],
})
export class FavoritesModule {}
