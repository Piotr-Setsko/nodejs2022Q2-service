import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import { Track } from './interfaces/track.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getTracks(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async getTrack(id): Promise<Track> {
    const tracks = await this.trackRepository.findOneBy({ id: id });

    if (!tracks) {
      throw new NotFoundException();
    }

    return tracks;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    await this.trackRepository.create(createTrackDto);

    return await this.trackRepository.save(createTrackDto);
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id: id });

    if (!track) {
      throw new NotFoundException();
    }

    await this.trackRepository.update({ id }, updateTrackDto);

    return await this.trackRepository.findOneBy({ id: id });
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.trackRepository.findOneBy({ id: id });

    if (!track) {
      throw new NotFoundException();
    }

    // this.inMemoryDB.favorites.tracks = this.inMemoryDB.favorites.tracks.filter(
    //   (item) => !(item.id === id),
    // );

    await this.trackRepository.delete({ id });

    return;
  }
}
