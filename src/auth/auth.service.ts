import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from '@user/dto/user-login.dto';
import { User } from '@user/entities/user.entity';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async validateUser(loginDto: LoginDto): Promise<any> {
        const user = await this.userService.tryLogin(loginDto);

        if (user instanceof User) {
            const { ...result } = user;

            return result;
        }

        throw user;
    }

    public async login(loginDto: any): Promise<any> {
        let result = await this.validateUser(loginDto);

        if (result instanceof HttpException)
            throw result;

        let email = loginDto.email;

        return { access_token: this.jwtService.sign({ email }) };
    }
}