import { Injectable } from '@nestjs/common';
import { Album } from './albums/interfaces/album.interface';
import { Artist } from './artists/interfaces/artist.interface';
import { Track } from './tracks/interfaces/track.interface';
import { User } from './users/interfaces/user.intarface';

@Injectable()
export class InMemoryDB {
  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  users: User[] = [];

  private static instance;
  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }
    // return InMemoryDB.instance;
    Object.assign(this, InMemoryDB.instance);
  }
}
