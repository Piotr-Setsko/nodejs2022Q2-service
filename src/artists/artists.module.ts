import { Module } from '@nestjs/common';
import { InMemoryDB } from 'src/db';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDB],
})
export class ArtistsModule {}
