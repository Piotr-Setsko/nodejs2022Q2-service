import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.intarface';
import { CreateUserDto, UpdatePasswordDto } from './dto/users.dto';
import { UserOutputEntity } from './entities/userOutput.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.userService.getUsers();
    return users.map((item) => new UserOutputEntity({ ...item }));
  }

  @Get(':id')
  async getUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserOutputEntity> {
    const user = await this.userService.getUser(id);
    return new UserOutputEntity({ ...user });
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return new UserOutputEntity({ ...user });
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updatePasswordDto);
    return new UserOutputEntity({ ...user });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
