import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'argon2';

import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginDto } from '@user/dto/user-login.dto';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  public async create(createUserDto: CreateUserDto) {
    await this.ckeckUserDuplicate(createUserDto);

    let user: User = this.userRepository.create(createUserDto);
    await this.userRepository.insert(user);

    // TODO: return status true
    return;
  }

  remove() {
  }

  public async tryLogin(loginDto: LoginDto): Promise<User> {
    let user: User = await this.getUser(loginDto);

    let isPasswordCorrect = await verify(user.password, loginDto.password);

    if (!isPasswordCorrect)
      throw new Error();

    return user;
  }

  private async ckeckUserDuplicate(userDto: any): Promise<any> {
    let email_duplicate: boolean = false;

    if (userDto.email) {
      email_duplicate = await this.userRepository.exists({
        where: { email: userDto.email }
      });
    }

    if (email_duplicate)
      throw new Error();

    return;
  }

  private async getUser(userDto: any): Promise<any> {
    let user: User = await this.userRepository.findOne({
      where: { email: userDto.email }
    });

    if(!user)
      throw new Error();

    return user;
  }
}
