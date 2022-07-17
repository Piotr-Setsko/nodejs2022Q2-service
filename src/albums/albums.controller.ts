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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/albums.dto';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  async getAlbums(): Promise<Album[]> {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    return this.albumService.getAlbum(id);
  }

  @Post()
  async createArtist(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}
