import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import { Track } from './interfaces/track.interface';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  albumService: any;
  constructor(private readonly trackService: TracksService) {}

  @Get()
  async getTracks(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  @Get(':id')
  async getTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @Post()
  async createTrack(@Body() createAlbumDto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(createAlbumDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateTrack(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.trackService.deleteTrack(id);
  }
}
