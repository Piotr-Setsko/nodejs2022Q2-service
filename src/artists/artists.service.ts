import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
import { Artist } from './interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  async getArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtist(id): Promise<Artist> {
    const artist = this.artists.find((item) => item.id === id);

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
    this.artists.push(newArtist);

    return newArtist;
  }

  async updateArtist(
    id: string,
    updatePasswordDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = this.artists.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = updatePasswordDto.name;
    artist.grammy = updatePasswordDto.grammy;

    return artist;
  }

  async deleteArtist(id: string) {
    const artist = this.artists.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    this.artists = this.artists.filter((item) => !(item.id === id));

    return;
  }
}
