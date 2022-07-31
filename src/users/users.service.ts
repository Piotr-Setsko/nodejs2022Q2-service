import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/users.dto';
import { User } from './interfaces/user.intarface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    await this.userRepository.create(createUserDto);

    return await this.userRepository.save(createUserDto);
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password === updatePasswordDto.oldPassword) {
      user.password = updatePasswordDto.newPassword;
      await this.userRepository.save(user);
    } else {
      throw new ForbiddenException('Wrong password!');
    }

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.delete({ id });

    return;
  }
}
