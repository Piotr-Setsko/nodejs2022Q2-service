import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string;

  @IsString()
  @IsOptional()
  albumId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID(4)
  @IsOptional()
  artistId: string;

  @IsString()
  @IsUUID(4)
  @IsOptional()
  albumId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
