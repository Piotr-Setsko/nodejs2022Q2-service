import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InMemoryDB } from 'src/db';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDB],
})
export class ArtistsModule {}
