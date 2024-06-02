import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { User } from '@user/entities/user.entity';

export class CreateUserDto extends PickType(User, ['email', 'password'])
{
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public password: string;
}
