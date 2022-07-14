import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/users.dto';
import { User } from './interfaces/user.intarface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUser(id): Promise<User> {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.users.push(newUser);

    return newUser;
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password === updatePasswordDto.oldPassword) {
      user.password = updatePasswordDto.newPassword;
      user.version += 1;
      user.updatedAt = new Date().getTime();
    } else {
      throw new ForbiddenException('Wrong password!');
    }

    return user;
  }

  async deleteUser(id: string) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    this.users = this.users.filter((item) => !(item.id === id));

    return;
  }
}
