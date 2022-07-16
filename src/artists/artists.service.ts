import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
import { Artist } from './interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDB } from 'src/db';

@Injectable()
export class ArtistsService {
  constructor(private inMemoryDB: InMemoryDB) {}

  async getArtists(): Promise<Artist[]> {
    return this.inMemoryDB.artists;
  }

  async getArtist(id): Promise<Artist> {
    const artist = this.inMemoryDB.artists.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    this.inMemoryDB.artists.push(newArtist);

    return newArtist;
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = this.inMemoryDB.artists.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  async deleteArtist(id: string) {
    const artist = this.inMemoryDB.artists.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    this.inMemoryDB.tracks = this.inMemoryDB.tracks.map((item) => {
      const result = item.artistId === id ? { ...item, artistId: null } : item;

      return result;
    });

    this.inMemoryDB.albums = this.inMemoryDB.albums.map((item) => {
      const result = item.artistId === id ? { ...item, artistId: null } : item;

      return result;
    });

    this.inMemoryDB.favorites.artists =
      this.inMemoryDB.favorites.artists.filter((item) => !(item.id === id));

    this.inMemoryDB.artists = this.inMemoryDB.artists.filter(
      (item) => !(item.id === id),
    );

    return;
  }
}
