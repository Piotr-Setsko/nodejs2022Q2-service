import { ArtistEntity } from './../../artists/entities/artist.entity';
import { TrackEntity } from './../../tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'remove', 'update'],
  })
  artist: string;

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];

  @Column({
    nullable: true,
  })
  artistId: string | null;
}
