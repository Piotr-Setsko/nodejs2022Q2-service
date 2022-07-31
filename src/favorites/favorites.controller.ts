import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { FavoritesService } from './favorites.service';
import { FavoritesRepsonse } from './interfaces/favorite.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  async getTracks(): Promise<FavoritesRepsonse> {
    return this.favoriteService.getFavorites();
  }

  @Post('track/:id')
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return this.favoriteService.addTrack(id);
  }

  @Post('album/:id')
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    return this.favoriteService.addAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    return this.favoriteService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoriteService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoriteService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoriteService.deleteArtist(id);
  }
}
