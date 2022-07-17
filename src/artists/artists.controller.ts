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
import { ArtistsService } from './artists.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
import { Artist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  async getArtists(): Promise<Artist[]> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  async getArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    return this.artistService.getArtist(id);
  }

  @Post()
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}
