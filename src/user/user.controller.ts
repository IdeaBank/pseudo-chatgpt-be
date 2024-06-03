import { Public } from '@common/public.annotation';
import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserService } from '@user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
