import { Injectable } from '@nestjs/common';
import { Album } from './albums/interfaces/album.interface';
import { Artist } from './artists/interfaces/artist.interface';
import { User } from './users/interfaces/user.intarface';

@Injectable()
export class InMemoryDB {
  favorites = {
    artists: [],
    albums: [],
    traks: [],
  };
  artists: Artist[] = [];
  albums: Album[] = [];
  traks = [];
  users: User[] = [];

  private static instance;
  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }
    return InMemoryDB.instance;
  }
}
