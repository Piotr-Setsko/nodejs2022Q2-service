import { Module } from '@nestjs/common';
import { InMemoryDB } from 'src/db';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, InMemoryDB],
})
export class UsersModule {}
