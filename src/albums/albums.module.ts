import { Module } from '@nestjs/common';
import { InMemoryDB } from 'src/db';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDB],
})
export class AlbumsModule {}
