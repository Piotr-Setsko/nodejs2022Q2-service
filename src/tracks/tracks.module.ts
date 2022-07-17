import { Module } from '@nestjs/common';
import { InMemoryDB } from 'src/db';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService, InMemoryDB],
})
export class TracksModule {}
