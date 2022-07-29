import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];
}
