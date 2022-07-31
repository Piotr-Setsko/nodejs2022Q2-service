import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, (artist) => artist, { cascade: true })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, (album) => album, { cascade: true })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, (track) => track, { cascade: true })
  @JoinTable()
  tracks: TrackEntity[];
}
