import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { InMemoryDB } from 'src/db';
import { Track } from 'src/tracks/interfaces/track.interface';
import { FavoritesRepsonse } from './interfaces/favorite.interface';

@Injectable()
export class FavoritesService {
  constructor(private inMemoryDB: InMemoryDB) {}

  async getFavorites(): Promise<FavoritesRepsonse> {
    return this.inMemoryDB.favorites;
  }

  async addTrack(id: string): Promise<Track> {
    const track = this.inMemoryDB.tracks.find((item) => item.id === id);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    if (!this.inMemoryDB.favorites.tracks.find((item) => item.id === id)) {
      this.inMemoryDB.favorites.tracks.push(track);
    }

    return track;
  }

  async addAlbum(id: string): Promise<Album> {
    const album = this.inMemoryDB.albums.find((item) => item.id === id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    if (!this.inMemoryDB.favorites.albums.find((item) => item.id === id)) {
      this.inMemoryDB.favorites.albums.push(album);
    }

    return album;
  }

  async addArtist(id: string): Promise<Artist> {
    const artist = this.inMemoryDB.artists.find((item) => item.id === id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    if (!this.inMemoryDB.favorites.artists.find((item) => item.id === id)) {
      this.inMemoryDB.favorites.artists.push(artist);
    }

    return artist;
  }

  async deleteTrack(id: string): Promise<void> {
    const track = this.inMemoryDB.favorites.tracks.find(
      (item) => item.id === id,
    );

    if (!track) {
      throw new UnprocessableEntityException();
    }

    this.inMemoryDB.favorites.tracks = this.inMemoryDB.favorites.tracks.filter(
      (item) => !(item.id === id),
    );

    return;
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = this.inMemoryDB.favorites.albums.find(
      (item) => item.id === id,
    );

    if (!album) {
      throw new UnprocessableEntityException();
    }

    this.inMemoryDB.favorites.albums = this.inMemoryDB.favorites.albums.filter(
      (item) => !(item.id === id),
    );

    return;
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = this.inMemoryDB.artists.find((item) => item.id === id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    this.inMemoryDB.favorites.artists =
      this.inMemoryDB.favorites.artists.filter((item) => !(item.id === id));

    return;
  }
}
