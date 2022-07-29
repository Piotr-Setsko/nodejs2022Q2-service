import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'remove', 'update'],
  })
  artist: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'remove', 'update'],
  })
  album: string | null;

  @Column({
    nullable: true,
  })
  artistId: string | null;

  @Column({
    nullable: true,
  })
  albumId: string | null;

  @Column({
    nullable: false,
  })
  duration: number;
}
