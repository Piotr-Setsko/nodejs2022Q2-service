import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getArtists(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getArtist(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    await this.artistRepository.create(createArtistDto);

    return await this.artistRepository.save(createArtistDto);
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException();
    }

    await this.artistRepository.update({ id }, updateArtistDto);

    return await this.artistRepository.findOne({ where: { id } });
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.artistRepository.findOneBy({ id: id });

    if (!artist) {
      throw new NotFoundException();
    }

    // this.inMemoryDB.tracks = this.inMemoryDB.tracks.map((item) => {
    //   const result = item.artistId === id ? { ...item, artistId: null } : item;

    //   return result;
    // });

    // this.inMemoryDB.albums = this.inMemoryDB.albums.map((item) => {
    //   const result = item.artistId === id ? { ...item, artistId: null } : item;

    //   return result;
    // });

    // this.inMemoryDB.favorites.artists =
    //   this.inMemoryDB.favorites.artists.filter((item) => !(item.id === id));

    await this.artistRepository.delete({ id });

    return;
  }
}
