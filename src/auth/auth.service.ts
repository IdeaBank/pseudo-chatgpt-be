import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from '@user/dto/user-login.dto';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async validateUser(loginDto: LoginDto): Promise<any> {
        const user = await this.userService.tryLogin(loginDto);
        const { ...result } = user;

        return result;
    }

    public async login(loginDto: any): Promise<any> {
        let result = await this.validateUser(loginDto);
        let uuid = result.uuid;

        return { access_token: this.jwtService.sign({ uuid }) };
    }
}