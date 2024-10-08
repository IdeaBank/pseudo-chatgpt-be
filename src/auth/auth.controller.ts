import { Body, Controller, Get, Post, Req, Request, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { Public } from '@common/public.annotation';
import { LoginDto } from '@user/dto/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(readonly authService: AuthService) { }

    @Public()
    @UsePipes(ValidationPipe)
    @Post('login')
    public async login(@Body() loginDto: LoginDto): Promise<any> {
        return await this.authService.login(loginDto);
    }
}
