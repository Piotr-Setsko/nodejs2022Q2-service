import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/albums.dto';
import { Album } from './interfaces/album.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async getAlbum(id): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id: id });

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    await this.albumRepository.create(createAlbumDto);

    return await this.albumRepository.save(createAlbumDto);
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id: id });

    if (!album) {
      throw new NotFoundException();
    }

    await this.albumRepository.update({ id }, updateAlbumDto);

    return await this.albumRepository.findOneBy({ id: id });
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.albumRepository.findOneBy({ id: id });

    if (!album) {
      throw new NotFoundException();
    }

    // this.inMemoryDB.tracks = this.inMemoryDB.tracks.map((item) => {
    //   const result = item.albumId === id ? { ...item, albumId: null } : item;

    //   return result;
    // });

    // this.inMemoryDB.favorites.albums = this.inMemoryDB.favorites.albums.filter(
    //   (item) => !(item.id === id),
    // );

    await this.albumRepository.delete({ id });

    return;
  }
}
