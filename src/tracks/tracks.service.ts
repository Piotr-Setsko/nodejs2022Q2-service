import { Injectable, NotFoundException } from '@nestjs/common';
import { InMemoryDB } from 'src/db';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import { Track } from './interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  constructor(private inMemoryDB: InMemoryDB) {}

  async getTracks(): Promise<Track[]> {
    return this.inMemoryDB.tracks;
  }

  async getTrack(id): Promise<Track> {
    const tracks = this.inMemoryDB.tracks.find((item) => item.id === id);

    if (!tracks) {
      throw new NotFoundException();
    }

    return tracks;
  }

  async createTrack(createAlbumDto: CreateTrackDto): Promise<Track> {
    const newTrack = {
      ...createAlbumDto,
      id: uuidv4(),
      artistId: createAlbumDto?.artistId || null,
      albumId: createAlbumDto?.albumId || null,
    };
    this.inMemoryDB.tracks.push(newTrack);

    return newTrack;
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = this.inMemoryDB.tracks.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.artistId = updateTrackDto?.artistId || null;
    track.albumId = updateTrackDto?.albumId || null;

    return track;
  }

  async deleteTrack(id: string) {
    const track = this.inMemoryDB.tracks.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    this.inMemoryDB.favorites.tracks = this.inMemoryDB.favorites.tracks.filter(
      (item) => !(item.id === id),
    );

    this.inMemoryDB.tracks = this.inMemoryDB.tracks.filter(
      (item) => !(item.id === id),
    );

    return;
  }
}
