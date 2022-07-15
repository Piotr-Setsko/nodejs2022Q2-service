import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/albums.dto';
import { Album } from './interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDB } from 'src/db';

@Injectable()
export class AlbumsService {
  constructor(private inMemoryDB: InMemoryDB) {}

  async getAlbums(): Promise<Album[]> {
    return this.inMemoryDB.albums;
  }

  async getAlbum(id): Promise<Album> {
    const albums = this.inMemoryDB.albums.find((item) => item.id === id);

    if (!albums) {
      throw new NotFoundException();
    }

    return albums;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
    };
    this.inMemoryDB.albums.push(newAlbum);

    return newAlbum;
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = this.inMemoryDB.albums.find((item) => item.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  async deleteAlbum(id: string) {
    const album = this.inMemoryDB.albums.find((item) => item.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    this.inMemoryDB.albums = this.inMemoryDB.albums.filter(
      (item) => !(item.id === id),
    );

    return;
  }
}
