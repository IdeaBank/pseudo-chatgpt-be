import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { User } from '@user/entities/user.entity';

export class CreateUserDto extends PickType(User, ['email', 'password'])
{
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public password: string;
}
